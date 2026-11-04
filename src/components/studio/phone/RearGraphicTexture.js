import * as THREE from 'three';

const W = 1024;
const H = 2048;

/**
 * Procedural high-resolution texture generator for Nothing Phone (4a) Pro internal back architecture.
 * Generates dot-matrix typography, micro-perforated graphite battery shield, copper busbars,
 * alignment crosshairs, and authentic Nothing industrial markings.
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

  // Draw dot-matrix style text using small circular dots
  drawDotMatrixText(text, startX, startY, dotSize = 2.5, dotSpacing = 4.2, color = '#E8EDF2') {
    const { ctx } = this;
    ctx.fillStyle = color;

    // Simple 5x7 dot-matrix font definitions for standard characters
    const GLYPHS = {
      '0': ['11111', '10001', '10011', '10101', '11001', '10001', '11111'],
      '1': ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
      '2': ['11111', '00001', '00001', '11111', '10000', '10000', '11111'],
      '3': ['11111', '00001', '00001', '11111', '00001', '00001', '11111'],
      '4': ['10001', '10001', '10001', '11111', '00001', '00001', '00001'],
      '5': ['11111', '10000', '10000', '11111', '00001', '00001', '11111'],
      '6': ['11111', '10000', '10000', '11111', '10001', '10001', '11111'],
      '7': ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
      '8': ['11111', '10001', '10001', '11111', '10001', '10001', '11111'],
      '9': ['11111', '10001', '10001', '11111', '00001', '00001', '11111'],
      'A': ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
      'B': ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
      'C': ['01111', '10000', '10000', '10000', '10000', '10000', '01111'],
      'D': ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
      'E': ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
      'F': ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
      'G': ['01111', '10000', '10000', '10111', '10001', '10001', '01111'],
      'H': ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
      'I': ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
      'L': ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
      'M': ['10001', '11011', '10101', '10001', '10001', '10001', '10001'],
      'N': ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
      'O': ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
      'P': ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
      'R': ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
      'S': ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
      'T': ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
      'U': ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
      'X': ['10001', '01010', '00100', '00100', '01010', '10001', '10001'],
      'Y': ['10001', '01010', '00100', '00100', '00100', '00100', '00100'],
      'Z': ['11111', '00001', '00010', '00100', '01000', '10000', '11111'],
      '(': ['00011', '00100', '01000', '01000', '01000', '00100', '00011'],
      ')': ['11000', '00100', '00010', '00010', '00010', '00100', '11000'],
      '.': ['00000', '00000', '00000', '00000', '00000', '01100', '01100'],
      ':': ['00000', '01100', '01100', '00000', '01100', '01100', '00000'],
      '-': ['00000', '00000', '00000', '11111', '00000', '00000', '00000'],
      ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000'],
    };

    let curX = startX;
    const str = text.toUpperCase();

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      const matrix = GLYPHS[char] || GLYPHS[' '];
      for (let r = 0; r < 7; r++) {
        const row = matrix[r];
        for (let c = 0; c < 5; c++) {
          if (row[c] === '1') {
            const px = curX + c * dotSpacing;
            const py = startY + r * dotSpacing;
            ctx.beginPath();
            ctx.arc(px, py, dotSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      curX += 6 * dotSpacing;
    }
  }

  render() {
    const { ctx } = this;
    const isObsidian = this.finishConfig.id === 'obsidian';
    const isCopper = this.finishConfig.id === 'copper';

    // 1. Deep Substrate Base Plate
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = isObsidian ? '#090b0e' : isCopper ? '#120d09' : '#0e1218';
    ctx.fillRect(0, 0, W, H);

    // 2. Micro Carbon / Graphite Shield Pattern (Over Battery Area: Y 750 to 1650)
    const dotSpacing = 16;
    ctx.fillStyle = isObsidian ? 'rgba(255, 255, 255, 0.025)' : 'rgba(255, 255, 255, 0.04)';
    for (let y = 820; y < 1620; y += dotSpacing) {
      for (let x = 80; x < W - 80; x += dotSpacing) {
        ctx.beginPath();
        ctx.arc(x, y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 3. Copper / Golden Conductive Circuit Traces & Busbars
    const copperColor = isCopper ? '#e59353' : isObsidian ? '#8f6838' : '#c89d55';
    ctx.strokeStyle = copperColor;
    ctx.lineWidth = 3;
    ctx.shadowColor = copperColor;
    ctx.shadowBlur = 4;

    // Upper Motherboard Circuit Traces (Y 150 to 600)
    ctx.beginPath();
    // Trace 1: Camera busbar
    ctx.moveTo(120, 240);
    ctx.lineTo(240, 240);
    ctx.lineTo(310, 310);
    ctx.lineTo(440, 310);
    ctx.stroke();

    // Trace 2: Power rail
    ctx.beginPath();
    ctx.moveTo(140, 280);
    ctx.lineTo(220, 280);
    ctx.lineTo(280, 340);
    ctx.lineTo(430, 340);
    ctx.stroke();

    // Trace 3: Glyph connection traces (top right)
    ctx.beginPath();
    ctx.moveTo(680, 240);
    ctx.lineTo(760, 240);
    ctx.lineTo(820, 300);
    ctx.lineTo(900, 300);
    ctx.stroke();

    // Lower Daughterboard Circuit Traces (Y 1650 to 1950)
    ctx.beginPath();
    ctx.moveTo(200, 1720);
    ctx.lineTo(320, 1720);
    ctx.lineTo(380, 1780);
    ctx.lineTo(512, 1780);
    ctx.lineTo(512, 1920);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(824, 1720);
    ctx.lineTo(704, 1720);
    ctx.lineTo(644, 1780);
    ctx.lineTo(512, 1780);
    ctx.stroke();

    ctx.shadowBlur = 0; // Reset shadow

    // 4. Gold Surface-Mount Contact Pads & Alignment Vias
    ctx.fillStyle = copperColor;
    const viaCoords = [
      [240, 240], [310, 310], [440, 310], [220, 280], [280, 340],
      [760, 240], [820, 300], [900, 300], [320, 1720], [704, 1720],
      [512, 1850], [480, 1890], [544, 1890],
    ];
    viaCoords.forEach(([vx, vy]) => {
      ctx.beginPath();
      ctx.arc(vx, vy, 4.5, 0, Math.PI * 2);
      ctx.fill();
      // Internal hole
      ctx.fillStyle = '#0a0d12';
      ctx.beginPath();
      ctx.arc(vx, vy, 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = copperColor;
    });

    // 5. Authentic Nothing Red Accent Status Elements
    ctx.fillStyle = '#D71921';
    // Red indicator square in upper visor chamber
    ctx.fillRect(720, 520, 32, 32);

    // Red telemetry stripe beside periscope
    ctx.fillRect(110, 480, 6, 90);

    // 6. Dot-Matrix Typography & Branding
    // Top Chamber Marking: "(4a) PRO"
    this.drawDotMatrixText('(4A) PRO', 130, 620, 3.2, 5.5, '#FFFFFF');

    // Telephoto & Sensor Specs
    this.drawDotMatrixText('140X ULTRA ZOOM', 130, 675, 1.8, 3.2, '#9AA6B2');
    this.drawDotMatrixText('50MP OIS 1.56', 130, 705, 1.6, 3.0, '#7CF2C9');

    // Central Battery Shield Markings
    this.drawDotMatrixText('5080 MAH', 140, 1420, 2.2, 3.8, '#E8EDF2');
    this.drawDotMatrixText('65W SUPER FAST CHARGE', 140, 1455, 1.6, 2.8, '#8898AA');

    // Silicon & Architecture Specs
    this.drawDotMatrixText('SNAPDRAGON 7 GEN 4', 140, 1495, 1.8, 3.2, '#7CF2C9');
    this.drawDotMatrixText('QUALCOMM AI ENGINE', 140, 1525, 1.5, 2.7, '#6B7C93');

    // Lower Footer Markings
    this.drawDotMatrixText('DESIGNED IN LONDON', 140, 1840, 1.6, 2.8, '#6B7C93');
    this.drawDotMatrixText('MODEL A142P', 140, 1868, 1.4, 2.5, '#4B5868');

    // 7. Mechanical Alignment Crosshairs & Engineering Brackets
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1.5;

    // Crosshairs
    const crosshairs = [
      [140, 180], [884, 180], [140, 1920], [884, 1920],
      [512, 700], [512, 1350],
    ];
    crosshairs.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.moveTo(cx - 10, cy);
      ctx.lineTo(cx + 10, cy);
      ctx.moveTo(cx, cy - 10);
      ctx.lineTo(cx, cy + 10);
      ctx.stroke();
    });

    // 8. Warning Hash Lines (Near Battery FPC)
    ctx.strokeStyle = '#D71921';
    ctx.lineWidth = 2.5;
    for (let i = 0; i < 7; i++) {
      ctx.beginPath();
      ctx.moveTo(760 + i * 14, 1430);
      ctx.lineTo(772 + i * 14, 1460);
      ctx.stroke();
    }
  }

  dispose() {
    this.texture.dispose();
  }
}
