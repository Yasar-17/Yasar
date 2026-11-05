/**
 * Nothing Phone (4a) Pro 137 Mini-LED Glyph Matrix Patterns
 * 
 * Hardware Layout:
 * 137 discrete mini-LED diodes arranged in a symmetric 13-row circular array:
 * Rows: [-6, 6] with LED counts: 5, 9, 11, 11, 13, 13, 13, 13, 13, 11, 11, 9, 5
 * Total: 137 LEDs
 */

export const TOTAL_LEDS = 137;

// Generate the 137 hardware LED positions
export const GLYPH_LEDS = (() => {
  const leds = [];
  const rLimit = 6.6;
  let id = 0;

  for (let r = -6; r <= 6; r++) {
    for (let c = -6; c <= 6; c++) {
      const d = Math.hypot(c, r);
      if (d <= rLimit) {
        leds.push({
          id,
          row: r,
          col: c,
          // Normalized coordinates: -1.0 to +1.0
          x: c / 6.0,
          y: r / 6.0,
          dist: d / 6.6,
          angle: Math.atan2(r, c), // -PI to +PI
        });
        id++;
      }
    }
  }
  return leds;
})();

/**
 * Pattern Generators
 * Each generator receives: (led, timeSec, options) -> returns target brightness (0.0 to 1.0)
 */
export const PATTERN_GENERATORS = {
  // 1. Off State
  off: () => 0.0,

  // 2. Idle State: Exact Nothing Phone Double-Peak Soundwave / Equalizer Waveform from Reference Image
  idle: (led, t) => {
    // Exact symmetric dual-peak soundwave matching reference image:
    // Left peak centered at col -3, right peak centered at col +2 / +3
    const waveHeights = {
      '-5': 1,
      '-4': 2,
      '-3': 3,
      '-2': 2,
      '-1': 1,
      '0': 1,
      '1': 2,
      '2': 3,
      '3': 3,
      '4': 2,
      '5': 1,
    };

    const colStr = led.col.toString();
    const maxRow = waveHeights[colStr];

    if (maxRow !== undefined && Math.abs(led.row) <= maxRow) {
      // Crisp illuminated white diode with subtle organic breathing
      const breath = Math.sin(t * 1.8 + led.col * 0.2) * 0.05 + 0.95;
      return breath;
    }
    return 0.04; // Unlit phosphor diode background
  },

  // 3. Projects Pattern: Stepped digital cascade / build sequence from bottom to top
  projects: (led, t, options = {}) => {
    const elapsed = options.elapsed || 0;
    // Phase 1 (0 to 1.4s): Stepped vertical wipe from bottom (-1) to top (+1)
    if (elapsed < 1.4) {
      const progress = elapsed / 1.4;
      const targetY = (progress * 2.4) - 1.2;
      const distFromFront = Math.abs(led.y - targetY);
      if (distFromFront < 0.25) return 0.95;
      if (led.y < targetY) return 0.4;
      return 0.05;
    }
    // Phase 2 (1.4 to 2.2s): Double strobe confirmation flash
    const strobeTime = (elapsed - 1.4) * 8.0;
    const flash = Math.sin(strobeTime);
    return flash > 0.3 ? 0.9 : 0.15;
  },

  // 4. About Pattern: Geometric monogram & radiating bracket aperture
  about: (led, t, options = {}) => {
    const elapsed = options.elapsed || 0;
    // Central geometric 'Y' / diamond core
    const isCenterY = Math.abs(led.x) < 0.2 && led.y <= 0.1;
    const isBranchL = Math.abs(led.x + led.y) < 0.28 && led.y > 0;
    const isBranchR = Math.abs(led.x - led.y) < 0.28 && led.y > 0;
    const isMonogram = isCenterY || isBranchL || isBranchR;

    // Outer framing ring
    const isOuterRing = Math.abs(led.dist - 0.85) < 0.14;

    const pulse = Math.sin((elapsed + t) * 4.0) * 0.2 + 0.8;

    if (isMonogram) return Math.min(1.0, 0.95 * pulse);
    if (isOuterRing) return Math.min(0.8, 0.45 * pulse);

    // Inner gentle ambient fill
    return Math.max(0.02, 0.15 * (1.0 - led.dist));
  },

  // 5. Contact Pattern: Expanding beacon pulse (radio transmission rings)
  contact: (led, t, options = {}) => {
    const elapsed = options.elapsed || 0;
    // Center pulse beacon
    const isCenter = led.dist < 0.2;
    // Concentric expanding ripple rings
    const ringRadius = (elapsed * 1.5) % 1.2;
    const isRing = Math.abs(led.dist - ringRadius) < 0.12;

    if (isCenter) return 1.0;
    if (isRing) {
      // Fade out as ring expands outwards
      const fade = Math.max(0, 1.0 - (ringRadius / 1.2));
      return 0.9 * fade;
    }
    return 0.05;
  },

  // 6. Progress Pattern: Clockwise dial fill from 12 o'clock (0.0 to 1.0)
  progress: (led, t, options = {}) => {
    const value = options.progress != null ? options.progress : ((t * 0.2) % 1.0);
    // Convert angle to clockwise from 12 o'clock (-PI/2)
    // led.angle is Math.atan2(r, c) where (0, 1) is 12 o'clock in our grid
    let normAngle = (Math.PI / 2 - led.angle);
    if (normAngle < 0) normAngle += Math.PI * 2;
    const frac = normAngle / (Math.PI * 2);

    const isFilled = frac <= value;
    const isHead = Math.abs(frac - value) < 0.06;

    if (isHead) return 1.0;
    if (isFilled) return led.dist > 0.6 ? 0.85 : 0.35;
    return 0.06;
  },

  // 7. Notification Pattern: Triple rapid strobe with natural decay
  notification: (led, t, options = {}) => {
    const elapsed = options.elapsed || 0;
    // 3 pulses over 1.2s
    const cycle = (elapsed * 5.0) % 3.0;
    const flash = Math.sin(cycle * Math.PI * 2);
    const intensity = Math.max(0, flash) * Math.max(0, 1.0 - (elapsed / 2.0));
    return Math.min(1.0, intensity * 0.95 + 0.05);
  },

  // 8. Equalizer Pattern: 13 vertical frequency bars
  equalizer: (led, t) => {
    // 13 columns from col -6 to 6
    const colIdx = led.col + 6;
    const freq = Math.sin(t * 5.0 + colIdx * 0.6) * 0.5 + Math.cos(t * 3.2 - colIdx * 0.8) * 0.5;
    const barHeight = (freq * 0.5 + 0.5) * 1.1; // 0 to 1.1 normalized height
    const ledHeightNorm = Math.abs(led.y);

    if (ledHeightNorm <= barHeight) {
      // Top tip shines brightest
      const isTip = Math.abs(ledHeightNorm - barHeight) < 0.18;
      return isTip ? 1.0 : 0.65;
    }
    return 0.08;
  },

  // 9. Solar Path Pattern: Smooth solar arc across upper dome
  solarPath: (led, t) => {
    // Sun position traversing from left (-1) to right (+1) in an arc
    const sunX = Math.sin(t * 0.8) * 0.85;
    const sunY = Math.cos(t * 0.8) * 0.5 + 0.3;
    const distToSun = Math.hypot(led.x - sunX, led.y - sunY);
    if (distToSun < 0.28) return Math.max(0.2, 1.0 - (distToSun / 0.28));
    // Horizon glow
    if (Math.abs(led.y) < 0.15) return 0.25;
    return 0.05;
  },

  // 10. Camera Countdown Timer: 3s radial countdown with capture flash
  cameraTimer: (led, t, options = {}) => {
    const elapsed = options.elapsed || 0;
    if (elapsed > 3.0) {
      // Shutter flash
      const flashFade = Math.max(0, 1.0 - (elapsed - 3.0) * 4);
      return flashFade;
    }
    const remain = 3.0 - elapsed;
    const frac = remain / 3.0;
    let normAngle = (Math.PI / 2 - led.angle);
    if (normAngle < 0) normAngle += Math.PI * 2;
    const angleFrac = normAngle / (Math.PI * 2);
    if (angleFrac <= frac) return 0.95;
    return 0.05;
  },
};

