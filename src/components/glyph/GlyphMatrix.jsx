import React, { useRef, useEffect, useState } from 'react';
import { TOTAL_LEDS, GLYPH_LEDS } from './glyphPatterns';
import { glyphController } from './glyphController';
import { PowerIcon, SparklesIcon } from '../../ui/Icons';

export const GlyphMatrix = ({
  size = 180,
  interactive = true,
  showControls = true,
  className = '',
}) => {
  const canvasRef = useRef(null);
  const [activePattern, setActivePattern] = useState(glyphController.activePattern);
  const [brightness, setBrightness] = useState(glyphController.getGlobalBrightness());
  const [isPowerOn, setIsPowerOn] = useState(glyphController.isPoweredOn);

  // Render loop directly updating canvas without causing React state updates on every frame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animId;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const radius = w * 0.46;

      ctx.clearRect(0, 0, w, h);

      // 1. Dark Circular Aperture Background
      ctx.fillStyle = '#0a0d12';
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Circular Chamfer Border
      ctx.strokeStyle = '#1e2633';
      ctx.lineWidth = 4;
      ctx.stroke();

      // 2. Render 137 Mini-LED Elements
      const leds = GLYPH_LEDS;
      const brightnessArray = glyphController.getBrightnessArray();
      const cellSize = (w * 0.74) / 13;
      const diodeSize = cellSize * 0.72;

      for (let i = 0; i < TOTAL_LEDS; i++) {
        const led = leds[i];
        const b = brightnessArray[i] || 0.0;

        const px = cx + led.col * cellSize;
        const py = cy + led.row * cellSize;
        const x = px - diodeSize / 2;
        const y = py - diodeSize / 2;

        if (b > 0.04) {
          ctx.save();
          // Soft ambient phosphor halo
          const glowRadius = diodeSize * (1.2 + b * 0.8);
          const grad = ctx.createRadialGradient(px, py, diodeSize * 0.2, px, py, glowRadius);
          grad.addColorStop(0, `rgba(255, 255, 255, ${b * 0.8})`);
          grad.addColorStop(0.5, `rgba(240, 245, 255, ${b * 0.3})`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(px, py, glowRadius, 0, Math.PI * 2);
          ctx.fill();

          // Core Diode
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1.0, 0.4 + b * 0.6)})`;
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 6 * b;
          ctx.beginPath();
          ctx.roundRect(x, y, diodeSize, diodeSize, 1.5);
          ctx.fill();
          ctx.restore();
        } else {
          ctx.fillStyle = '#141a22';
          ctx.beginPath();
          ctx.roundRect(x, y, diodeSize, diodeSize, 1.5);
          ctx.fill();

          ctx.strokeStyle = '#1e2633';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  // Handle pointer interactions for activating individual LEDs
  const handlePointerAction = (e) => {
    if (!interactive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scale = canvas.width / rect.width;
    const clickX = (e.clientX - rect.left) * scale;
    const clickY = (e.clientY - rect.top) * scale;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const cellSize = (canvas.width * 0.74) / 13;

    // Find closest LED
    let closestId = -1;
    let minDist = 9999;

    for (let i = 0; i < TOTAL_LEDS; i++) {
      const led = GLYPH_LEDS[i];
      const px = cx + led.col * cellSize;
      const py = cy + led.row * cellSize;
      const d = Math.hypot(clickX - px, clickY - py);
      if (d < minDist && d < cellSize * 0.9) {
        minDist = d;
        closestId = i;
      }
    }

    if (closestId !== -1) {
      glyphController.setLed(closestId, 1.0);
    }
  };

  const handleSelectPattern = (pattern) => {
    glyphController.setPattern(pattern);
    setActivePattern(pattern);
    setIsPowerOn(pattern !== 'off');
  };

  const handleTogglePower = () => {
    glyphController.togglePower();
    setIsPowerOn(glyphController.isPoweredOn);
    setActivePattern(glyphController.activePattern);
  };

  const handleBrightnessChange = (e) => {
    const val = parseFloat(e.target.value);
    glyphController.setGlobalBrightness(val);
    setBrightness(val);
  };

  return (
    <div className={`flex flex-col items-center space-y-3 select-none font-sans ${className}`}>
      {/* 137-LED Matrix Canvas Display */}
      <div 
        className="relative rounded-full p-2 bg-[#0c1015] border border-[#1f2835] shadow-2xl flex items-center justify-center cursor-crosshair group"
        onPointerDown={handlePointerAction}
        onPointerMove={(e) => { if (e.buttons === 1) handlePointerAction(e); }}
        title="137-LED Glyph Matrix: Click or drag to activate individual diodes"
      >
        <canvas
          ref={canvasRef}
          width={size * 2}
          height={size * 2}
          style={{ width: `${size}px`, height: `${size}px` }}
          className="rounded-full"
        />

        {/* Outer CNC chamfer highlight */}
        <div className="absolute inset-1 rounded-full border border-white/5 pointer-events-none" />
      </div>

      {/* Hardware Matrix Controls Toolbar */}
      {showControls && (
        <div className="w-full max-w-xs flex flex-col space-y-2.5 bg-[#121620] border border-[#1f2633] rounded-2xl p-3 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#1b222d] pb-2">
            <div className="flex items-center space-x-1.5 font-mono text-xs text-[#E8EDF2] font-bold">
              <SparklesIcon className="w-3.5 h-3.5 text-[#7CF2C9]" />
              <span>137-LED Matrix</span>
            </div>
            <button
              type="button"
              onClick={handleTogglePower}
              className={`p-1.5 rounded-lg border transition-colors ${
                isPowerOn
                  ? 'bg-[#1a2330] border-[#7CF2C9] text-[#7CF2C9]'
                  : 'bg-[#151a22] border-[#232c3a] text-[#626e7e]'
              }`}
              title={isPowerOn ? 'Power Off' : 'Power On'}
              aria-label="Toggle Matrix Power"
            >
              <PowerIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interactive Pattern Selectors */}
          <div className="flex flex-wrap gap-1">
            {[
              { id: 'idle', label: 'Idle' },
              { id: 'projects', label: 'Projects' },
              { id: 'about', label: 'About' },
              { id: 'contact', label: 'Contact' },
              { id: 'progress', label: 'Progress' },
              { id: 'notification', label: 'Strobe' },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectPattern(p.id)}
                className={`px-2.5 py-1 rounded-lg font-mono text-[10px] transition-all ${
                  activePattern === p.id && isPowerOn
                    ? 'bg-[#232d3d] text-[#7CF2C9] font-bold border border-[#2b374a]'
                    : 'bg-[#151a22] text-[#9AA6B2] hover:text-[#E8EDF2] border border-transparent'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Master Luminance Slider */}
          <div className="flex items-center space-x-2 pt-1">
            <span className="font-mono text-[10px] text-[#626e7e] uppercase shrink-0">Luminance</span>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={brightness}
              onChange={handleBrightnessChange}
              className="flex-1 accent-[#7CF2C9] cursor-pointer h-1.5"
            />
            <span className="font-mono text-[10px] text-[#7CF2C9] w-7 text-right">
              {Math.round(brightness * 100)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlyphMatrix;
