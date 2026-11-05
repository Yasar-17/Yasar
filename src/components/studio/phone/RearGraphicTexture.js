import * as THREE from 'three';

const W = 1024;
const H = 2048;

/**
 * Procedural texture generator matching the exact Nothing Phone (4a) reference image:
 * Clean satin-matte unibody backplate with bottom-left tactile dial,
 * vertical left-edge debossed dot-matrix branding, and subtle regulatory markings.
 */
export class RearGraphicTexture {
  constructor(finishConfig = {}) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = W;
    this.canvas.height = H;
    this.ctx = this.canvas.getContext('2d');

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.generateMipmaps = true;
    this.texture.minFilter = THREE.LinearMipmapLinearFilter;
    this.texture.magFilter = THREE.LinearFilter;

    this.finishConfig = finishConfig;
    this.render();
  }

  updateFinish(finishConfig) {
    this.finishConfig = finishConfig;
    this.render();
    this.texture.needsUpdate = true;
  }

  getTexture() {
    return this.texture;
  }

  // Draw dot-matrix style text rotated vertically along left edge
  drawVerticalDotMatrix(text, startX, startY, dotSize = 2.4, dotSpacing = 4.4, color = '#2C3440') {
    const { ctx } = this;
    ctx.save();
    ctx.translate(startX, startY);
    ctx.rotate(-Math.PI / 2); // Rotate 90 degrees CCW (vertical reading upwards)

    ctx.fillStyle = color;

    const GLYPHS = {
      'N': ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
      'O': ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
      'T': ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
      'H': ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
      'I': ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
      'G': ['01111', '10000', '10000', '10111', '10001', '10001', '01111'],
      '(': ['00011', '00100', '01000', '01000', '01000', '00100', '00011'],
      ')': ['11000', '00100', '00010', '00010', '00010', '00100', '11000'],
      '4': ['10001', '10001', '10001', '11111', '00001', '00001', '00001'],
      'A': ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
      'P': ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
      'R': ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
      ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000'],
    };

    let curX = 0;
    const str = text.toUpperCase();

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      const matrix = GLYPHS[char] || GLYPHS[' '];
      for (let r = 0; r < 7; r++) {
        const row = matrix[r];
        for (let c = 0; c < 5; c++) {
          if (row[c] === '1') {
            const px = curX + c * dotSpacing;
            const py = r * dotSpacing;
            ctx.beginPath();
            ctx.arc(px, py, dotSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      curX += 6 * dotSpacing;
    }
    ctx.restore();
  }

  render() {
    const { ctx } = this;
    const isObsidian = this.finishConfig.id === 'obsidian' || !this.finishConfig.id;
    const isCopper = this.finishConfig.id === 'copper';

    // 1. Clean Satin-Matte Unibody Base Plate matching reference image
    ctx.clearRect(0, 0, W, H);
    const baseBg = isObsidian ? '#181b22' : isCopper ? '#b55822' : '#d8dce2';
    ctx.fillStyle = baseBg;
    ctx.fillRect(0, 0, W, H);

    // Subtle Satin Depth Sheen
    const sheen = ctx.createLinearGradient(0, 0, W, H);
    sheen.addColorStop(0, 'rgba(255, 255, 255, 0.04)');
    sheen.addColorStop(0.5, 'rgba(255, 255, 255, 0.0)');
    sheen.addColorStop(1, 'rgba(0, 0, 0, 0.08)');
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, W, H);

    // 2. Vertical Dot-Matrix Branding on Left Edge (matching reference image)
    const brandColor = isObsidian ? '#384353' : isCopper ? '#7a3915' : '#88909e';
    this.drawVerticalDotMatrix('(4A) PRO', 125, 1480, 2.8, 5.2, brandColor);

    // 3. Subtle Regulatory Markings at Bottom-Right (matching reference image)
    const regColor = isObsidian ? '#2c3543' : isCopper ? '#5e2c10' : '#9ca6b5';
    ctx.strokeStyle = regColor;
    ctx.lineWidth = 3;

    // CE Mark
    ctx.beginPath();
    ctx.arc(840, 1720, 26, 0.5 * Math.PI, 1.5 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(880, 1720, 26, 0.5 * Math.PI, 1.5 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(862, 1720);
    ctx.lineTo(884, 1720);
    ctx.stroke();

    // Wheelie Bin symbol
    ctx.strokeRect(848, 1775, 30, 36);
    ctx.beginPath();
    ctx.moveTo(842, 1775);
    ctx.lineTo(884, 1775);
    ctx.moveTo(853, 1775);
    ctx.lineTo(873, 1811);
    ctx.moveTo(873, 1775);
    ctx.lineTo(853, 1811);
    ctx.stroke();
  }

  dispose() {
    this.texture.dispose();
  }
}
