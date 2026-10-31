import React, { useState, useEffect } from 'react';
import { usePhone } from '../../context/PhoneContext';

// 11 cols x 11 rows circular matrix grid (~97 active LED positions within circular crop)
const GRID_SIZE = 11;

export const GlyphMatrix = () => {
  const { activeGlyphPattern, cycleGlyph } = usePhone();
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame(f => (f + 1) % 60);
    }, 120);
    return () => clearInterval(timer);
  }, []);

  // Compute LED brightness (true/false) based on pattern and animation frame
  const isLedOn = (row, col) => {
    const cx = (GRID_SIZE - 1) / 2;
    const cy = (GRID_SIZE - 1) / 2;
    const dist = Math.hypot(col - cx, row - cy);

    // Keep within circular crop
    if (dist > 5.1) return false;

    if (activeGlyphPattern === 0) {
      // Audio Waveform Equalizer
      const heights = [
        Math.sin(frame * 0.4 + 0) * 2.5 + 3,
        Math.sin(frame * 0.4 + 1) * 3.5 + 4,
        Math.sin(frame * 0.4 + 2) * 4.5 + 5,
        Math.sin(frame * 0.4 + 3) * 5.0 + 5.5,
        Math.sin(frame * 0.4 + 4) * 4.2 + 4.5,
        Math.sin(frame * 0.4 + 5) * 3.5 + 4,
        Math.sin(frame * 0.4 + 6) * 4.8 + 5,
        Math.sin(frame * 0.4 + 7) * 3.8 + 4,
        Math.sin(frame * 0.4 + 8) * 2.5 + 3,
        Math.sin(frame * 0.4 + 9) * 2.0 + 2.5,
        Math.sin(frame * 0.4 + 10) * 1.5 + 2,
      ];
      const h = heights[col] || 3;
      const distFromCenterY = Math.abs(row - cy);
      return distFromCenterY <= h / 2;
    } else if (activeGlyphPattern === 1) {
      // Expanding Radar Pulse
      const waveRadius = (frame % 15) * 0.4;
      return Math.abs(dist - waveRadius) < 0.85;
    } else {
      // Geometric Sparkle Cross
      const isCross = (Math.abs(row - cy) < 1.1) || (Math.abs(col - cx) < 1.1);
      const isDiagonal = Math.abs(Math.abs(row - cy) - Math.abs(col - cx)) < 1.1;
      return (frame % 10 < 5 ? isCross : isDiagonal) && dist < 4.2;
    }
  };

  return (
    <div 
      onClick={cycleGlyph}
      className="relative w-[114px] h-[114px] rounded-full bg-[#0a0d11] border-[2px] border-[#222a35] shadow-[inset_0_2px_8px_rgba(0,0,0,0.9),0_0_12px_rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer overflow-hidden p-2 group"
      title="Glyph Matrix: Tap to cycle dynamic animation pattern"
    >
      {/* Subtle circular grid track highlight */}
      <div className="absolute inset-1 rounded-full border border-white/5 pointer-events-none" />

      {/* Mini-LED Grid */}
      <div className="grid grid-cols-11 gap-[3.5px] items-center justify-center">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const row = Math.floor(i / GRID_SIZE);
          const col = i % GRID_SIZE;
          const cx = (GRID_SIZE - 1) / 2;
          const cy = (GRID_SIZE - 1) / 2;
          const dist = Math.hypot(col - cx, row - cy);

          if (dist > 5.1) {
            return <div key={i} className="w-[5.5px] h-[5.5px] opacity-0" />;
          }

          const on = isLedOn(row, col);

          return (
            <div
              key={i}
              className={`w-[5.5px] h-[5.5px] rounded-[1px] transition-all duration-100 ${
                on
                  ? 'bg-white shadow-[0_0_5px_#ffffff,0_0_10px_rgba(255,255,255,0.7)] scale-105'
                  : 'bg-[#151c24] border border-[#212b37]'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

