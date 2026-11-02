import React, { useState, useEffect } from 'react';
import { usePhone } from '../../context/PhoneContext';

export const StatusBar = ({ variant = 'light', showDynamicIsland = true }) => {
  const { soundEnabled } = usePhone();
  const [time, setTime] = useState('10:30');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const textColor = variant === 'dark' ? 'text-[#0B0F14]' : 'text-white/90';

  return (
    <div className={`relative z-20 flex items-center justify-between px-3 pt-1.5 h-[34px] select-none ${textColor} text-xs font-mono`}>
      {/* 1. System Time */}
      <span className="font-semibold text-[13px] tracking-tight">
        {time}
      </span>

      {/* 2. Centered Punch-Hole & Dynamic Island */}
      {showDynamicIsland && (
        <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-[92px] h-[24px] bg-[#000000] rounded-full border border-white/10 shadow-sm flex items-center justify-between px-2.5 pointer-events-none">
          {/* Centered Camera Lens Aperture */}
          <div className="w-[8px] h-[8px] rounded-full bg-[#0a121c] border border-[#232c37] flex items-center justify-center">
            <div className="w-[3px] h-[3px] rounded-full bg-[#1b2d42]" />
          </div>

          {/* Active Audio / Haptics Status Indicator */}
          <div className="flex items-center space-x-0.5">
            <span className={`w-1 h-2 rounded-full ${soundEnabled ? 'bg-[#7CF2C9] animate-pulse' : 'bg-[#626e7e]'}`} />
            <span className={`w-1 h-3 rounded-full ${soundEnabled ? 'bg-[#7CF2C9] animate-pulse' : 'bg-[#626e7e]'}`} />
            <span className={`w-1 h-1.5 rounded-full ${soundEnabled ? 'bg-[#7CF2C9] animate-pulse' : 'bg-[#626e7e]'}`} />
          </div>
        </div>
      )}

      {/* 3. Hardware Status Indicators */}
      <div className="flex items-center space-x-1.5">
        {/* 5G Label */}
        <span className="text-[10px] font-bold tracking-wider opacity-80">5G</span>

        {/* Cellular Signal Bars */}
        <div className="flex items-end space-x-0.5 h-2.5">
          <span className="w-0.5 h-1 bg-current rounded-sm" />
          <span className="w-0.5 h-1.5 bg-current rounded-sm" />
          <span className="w-0.5 h-2 bg-current rounded-sm" />
          <span className="w-0.5 h-2.5 bg-current rounded-sm" />
        </div>

        {/* WiFi Icon (2px stroke SVG) */}
        <svg className="w-3.5 h-3.5 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="2.5" />
        </svg>

        {/* Battery Pill with charge level */}
        <div className="flex items-center space-x-1">
          <div className="w-4 h-2.5 rounded-[3px] border border-current p-0.5 flex items-center">
            <div className="w-[85%] h-full bg-current rounded-[1px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
