import * as THREE from 'three';

const GRID_SIZE = 11;
const CANVAS_SIZE = 512;

export class GlyphTextureManager {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = CANVAS_SIZE;
    this.canvas.height = CANVAS_SIZE;
    this.ctx = this.canvas.getContext('2d');

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.generateMipmaps = true;
    this.texture.minFilter = THREE.LinearMipmapLinearFilter;
    this.texture.magFilter = THREE.LinearFilter;

    this.frame = 0;
    this.activePattern = 0;
    this.lastRenderTime = 0;

    this.render();
  }

  setPattern(patternIndex) {
    this.activePattern = patternIndex % 3;
    this.render();
  }

  isLedOn(row, col, frame) {
    const cx = (GRID_SIZE - 1) / 2;
    const cy = (GRID_SIZE - 1) / 2;
    const dist = Math.hypot(col - cx, row - cy);

    if (dist > 5.1) return false;

    if (this.activePattern === 0) {
      // Audio Waveform Equalizer
      const heights = [
        Math.sin(frame * 0.35 + 0) * 2.5 + 3.2,
        Math.sin(frame * 0.35 + 1) * 3.5 + 4.2,
        Math.sin(frame * 0.35 + 2) * 4.5 + 5.2,
        Math.sin(frame * 0.35 + 3) * 5.0 + 5.5,
        Math.sin(frame * 0.35 + 4) * 4.2 + 4.5,
        Math.sin(frame * 0.35 + 5) * 3.5 + 4.0,
        Math.sin(frame * 0.35 + 6) * 4.8 + 5.2,
        Math.sin(frame * 0.35 + 7) * 3.8 + 4.2,
        Math.sin(frame * 0.35 + 8) * 2.5 + 3.2,
        Math.sin(frame * 0.35 + 9) * 2.0 + 2.5,
        Math.sin(frame * 0.35 + 10) * 1.5 + 2.0,
      ];
      const h = heights[col] || 3;
      const distFromCenterY = Math.abs(row - cy);
      return distFromCenterY <= h / 2;
    } else if (this.activePattern === 1) {
      // Radar sweep
      const waveRadius = (frame % 16) * 0.38;
      return Math.abs(dist - waveRadius) < 0.85;
    } else {
      // Sparkle Cross
      const isCross = (Math.abs(row - cy) < 1.1) || (Math.abs(col - cx) < 1.1);
      const isDiag = Math.abs(Math.abs(row - cy) - Math.abs(col - cx)) < 1.1;
      return (frame % 12 < 6 ? isCross : isDiag) && dist < 4.2;
    }
  }

  update(time) {
    if (time - this.lastRenderTime > 110) {
      this.frame++;
      this.lastRenderTime = time;
      this.render();
      this.texture.needsUpdate = true;
    }
  }

  render() {
    const { ctx, canvas } = this;
    const w = canvas.width;
    const h = canvas.height;

    // Dark circular aperture background
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0a0d12';
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, w / 2 - 4, 0, Math.PI * 2);
    ctx.fill();

    // Subtle track border
    ctx.strokeStyle = '#222b37';
    ctx.lineWidth = 6;
    ctx.stroke();

    const cellSize = (w * 0.72) / GRID_SIZE;
    const ledSize = cellSize * 0.72;
    const startX = (w - GRID_SIZE * cellSize) / 2;
    const startY = (h - GRID_SIZE * cellSize) / 2;

    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const cx = (GRID_SIZE - 1) / 2;
        const cy = (GRID_SIZE - 1) / 2;
        if (Math.hypot(c - cx, r - cy) > 5.1) continue;

        const x = startX + c * cellSize + (cellSize - ledSize) / 2;
        const y = startY + r * cellSize + (cellSize - ledSize) / 2;

        const on = this.isLedOn(r, c, this.frame);

        if (on) {
          ctx.save();
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 14;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(x, y, ledSize, ledSize);
          ctx.restore();
        } else {
          ctx.fillStyle = '#161d26';
          ctx.fillRect(x, y, ledSize, ledSize);
          ctx.strokeStyle = '#25303e';
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, ledSize, ledSize);
        }
      }
    }
  }

  getTexture() {
    return this.texture;
  }

  dispose() {
    this.texture.dispose();
  }
}
