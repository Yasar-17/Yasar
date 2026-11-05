import * as THREE from 'three';
import { GLYPH_LEDS, TOTAL_LEDS } from '../glyph/glyphPatterns';
import { glyphController } from '../glyph/glyphController';

const CANVAS_SIZE = 512;

export class GlyphTextureManager {
  constructor(controller = glyphController) {
    this.controller = controller;
    this.canvas = document.createElement('canvas');
    this.canvas.width = CANVAS_SIZE;
    this.canvas.height = CANVAS_SIZE;
    this.ctx = this.canvas.getContext('2d');

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.generateMipmaps = true;
    this.texture.minFilter = THREE.LinearMipmapLinearFilter;
    this.texture.magFilter = THREE.LinearFilter;

    this.lastRenderTime = 0;
    this.isDirty = true;

    // Subscribe to controller brightness updates
    this.unsubscribe = this.controller.subscribe(() => {
      this.isDirty = true;
    });

    this.render();
  }

  setPattern(patternIndexOrName) {
    if (typeof patternIndexOrName === 'string') {
      this.controller.setPattern(patternIndexOrName);
    } else {
      const patterns = ['idle', 'projects', 'about', 'contact', 'progress', 'equalizer'];
      this.controller.setPattern(patterns[patternIndexOrName % patterns.length]);
    }
  }

  update(time) {
    // Drive the physics and animation loop of the 137 LEDs
    const changed = this.controller.update(time);
    if (changed || this.isDirty) {
      this.render();
      this.texture.needsUpdate = true;
      this.isDirty = false;
    }
  }

  render() {
    const { ctx, canvas } = this;
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = w * 0.46;

    // 1. Dark Circular Aperture Chamber
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0a0d12';
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    // 2. CNC Chamfered Outer Bezel Ring
    ctx.strokeStyle = '#1b222c';
    ctx.lineWidth = 8;
    ctx.stroke();

    ctx.strokeStyle = '#283445';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 3. Render Each of the 137 Discrete Mini-LED Elements
    const leds = GLYPH_LEDS;
    const brightnessArray = this.controller.getBrightnessArray();
    const cellSize = (w * 0.74) / 13;
    const diodeSize = cellSize * 0.72;

    for (let i = 0; i < TOTAL_LEDS; i++) {
      const led = leds[i];
      const brightness = brightnessArray[i] || 0.0;

      // Coordinate mapping from normalized [-1, 1] to canvas pixel space
      const px = cx + (led.col * cellSize);
      const py = cy + (led.row * cellSize);

      const x = px - diodeSize / 2;
      const y = py - diodeSize / 2;

      if (brightness > 0.04) {
        // Active Illuminated Diode matching the reference image bright white soundwave
        ctx.save();

        // Layer 1: Soft Ambient Phosphor Halo Falloff
        const glowRadius = diodeSize * 1.6;
        const glowGrad = ctx.createRadialGradient(px, py, diodeSize * 0.2, px, py, glowRadius);
        glowGrad.addColorStop(0, `rgba(255, 255, 255, ${Math.min(1.0, brightness * 0.9)})`);
        glowGrad.addColorStop(0.5, `rgba(240, 248, 255, ${brightness * 0.4})`);
        glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(px, py, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Layer 2: Core Square Diode - Pure Brilliant White Pixel
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#FFFFFF';
        ctx.shadowBlur = 10 * brightness;

        ctx.beginPath();
        ctx.roundRect(x, y, diodeSize, diodeSize, 1.5);
        ctx.fill();

        ctx.restore();
      } else {
        // Unlit Silicon Diode
        ctx.fillStyle = '#141a22';
        ctx.beginPath();
        ctx.roundRect(x, y, diodeSize, diodeSize, 1.5);
        ctx.fill();

        ctx.strokeStyle = '#202936';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  getTexture() {
    return this.texture;
  }

  dispose() {
    if (this.unsubscribe) this.unsubscribe();
    this.texture.dispose();
  }
}
