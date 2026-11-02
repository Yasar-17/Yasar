import { TOTAL_LEDS, GLYPH_LEDS, PATTERN_GENERATORS } from './glyphPatterns';

export class GlyphController {
  constructor() {
    this.totalLeds = TOTAL_LEDS;
    this.leds = GLYPH_LEDS;

    // Buffer arrays for high-performance memory management
    this.brightness = new Float32Array(TOTAL_LEDS);
    this.targetBrightness = new Float32Array(TOTAL_LEDS);

    this.globalBrightness = 1.0;
    this.activePattern = 'idle';
    this.patternStartTime = performance.now();
    this.temporaryTimeout = null;
    this.progressValue = 0.0;
    this.isPoweredOn = true;

    this.lastUpdateTime = performance.now();
    this.listeners = new Set();
    this.customOverrides = new Map(); // id -> targetBrightness

    // Initialize with idle pattern
    this.setPattern('idle');
  }

  // 1. Individual LED Activation & Override
  setLed(id, brightness) {
    if (id >= 0 && id < this.totalLeds) {
      const clamped = Math.max(0, Math.min(1, brightness));
      this.customOverrides.set(id, clamped);
      this.targetBrightness[id] = clamped;
    }
  }

  clearLed(id) {
    this.customOverrides.delete(id);
  }

  clearAllOverrides() {
    this.customOverrides.clear();
  }

  // 2. Configurable Global Brightness (0.0 to 1.0)
  setGlobalBrightness(val) {
    this.globalBrightness = Math.max(0, Math.min(1, val));
  }

  getGlobalBrightness() {
    return this.globalBrightness;
  }

  // 3. Pattern Switching & Portfolios Interactions
  setPattern(patternName, options = {}) {
    if (!PATTERN_GENERATORS[patternName]) {
      console.warn(`[GlyphController] Unknown pattern: ${patternName}`);
      return;
    }

    if (this.temporaryTimeout) {
      clearTimeout(this.temporaryTimeout);
      this.temporaryTimeout = null;
    }

    this.activePattern = patternName;
    this.patternStartTime = performance.now();
    this.patternOptions = options;
  }

  // Play a transient pattern (e.g. on opening Projects, About, Contact) then return to idle
  playPattern(patternName, durationMs = 2400, fallback = 'idle') {
    if (!this.isPoweredOn) return;

    this.setPattern(patternName);

    if (this.temporaryTimeout) clearTimeout(this.temporaryTimeout);
    this.temporaryTimeout = setTimeout(() => {
      this.setPattern(fallback);
      this.temporaryTimeout = null;
    }, durationMs);
  }

  // 4. Progress Dial Control (0.0 to 1.0)
  setProgress(fraction) {
    this.progressValue = Math.max(0, Math.min(1, fraction));
    if (this.activePattern !== 'progress') {
      this.setPattern('progress', { progress: this.progressValue });
    } else {
      this.patternOptions = { ...this.patternOptions, progress: this.progressValue };
    }
  }

  // 5. Power States
  powerOff() {
    this.isPoweredOn = false;
    this.setPattern('off');
  }

  powerOn() {
    this.isPoweredOn = true;
    this.setPattern('idle');
  }

  togglePower() {
    if (this.isPoweredOn) {
      this.powerOff();
    } else {
      this.powerOn();
    }
  }

  // 6. Frame Update Loop with Smooth Spring Damping
  update(currentTimeMs = performance.now()) {
    const dt = Math.max(0.001, (currentTimeMs - this.lastUpdateTime) / 1000.0);
    this.lastUpdateTime = currentTimeMs;

    const elapsed = (currentTimeMs - this.patternStartTime) / 1000.0;
    const timeSec = currentTimeMs / 1000.0;
    const generator = PATTERN_GENERATORS[this.activePattern] || PATTERN_GENERATORS.idle;
    const options = { ...this.patternOptions, elapsed, progress: this.progressValue };

    let hasChanged = false;

    for (let i = 0; i < this.totalLeds; i++) {
      const led = this.leds[i];

      // If manual override exists, respect it; otherwise use pattern generator
      let target = this.customOverrides.has(i)
        ? this.customOverrides.get(i)
        : generator(led, timeSec, options);

      // Apply master global brightness
      target *= this.globalBrightness;

      this.targetBrightness[i] = target;

      // Smooth exponential damping: b = b + (target - b) * (1 - e^(-lambda * dt))
      const prev = this.brightness[i];
      const dampingSpeed = 14.0;
      const next = prev + (target - prev) * Math.min(1, dt * dampingSpeed);
      this.brightness[i] = next;

      if (Math.abs(next - prev) > 0.003) {
        hasChanged = true;
      }
    }

    if (hasChanged) {
      this.notifyListeners();
    }

    return hasChanged;
  }

  // 7. Observer Subscriptions
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners() {
    for (const cb of this.listeners) {
      cb(this.brightness);
    }
  }

  getBrightnessArray() {
    return this.brightness;
  }

  getLedBrightness(id) {
    return this.brightness[id] || 0.0;
  }

  dispose() {
    if (this.temporaryTimeout) clearTimeout(this.temporaryTimeout);
    this.listeners.clear();
  }
}

// Global shared singleton controller for hardware sync
export const glyphController = new GlyphController();
export default glyphController;
