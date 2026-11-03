import React, { useState, useEffect } from 'react';
import { usePhone } from '../../context/PhoneContext';

export const StatusBar = ({ variant = 'light' }) => {
  const { soundEnabled } = usePhone();
  const [time, setTime] = useState('16:20');

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
    <div className={`relative z-20 flex items-center justify-between px-3 pt-1 safe-top min-h-[30px] select-none ${textColor} text-xs font-mono`}>
      {/* 1. System Time */}
      <span className="font-semibold text-[12px] tracking-tight text-[#E8EDF2]">
        {time}
      </span>

      {/* 2. Centered Nothing Phone (4a) Pro Hardware Punch-Hole Camera */}
      <div className="punch-hole" aria-hidden="true">
        <div className="w-[11px] h-[11px] rounded-full bg-[#05080c] border border-[#1f2836] mx-auto mt-[1px] flex items-center justify-center">
          <div className="w-[4px] h-[4px] rounded-full bg-[#0f1724]" />
        </div>
      </div>

      {/* 3. Hardware Status Indicators */}
      <div className="flex items-center space-x-1.5">
        {/* 5G Label */}
        <span className="text-[10px] font-bold tracking-wider text-[#9AA6B2]">5G</span>

        {/* Cellular Signal Bars */}
        <div className="flex items-end space-x-0.5 h-2.5" aria-hidden="true">
          <span className="w-0.5 h-1 bg-current rounded-sm" />
          <span className="w-0.5 h-1.5 bg-current rounded-sm" />
          <span className="w-0.5 h-2 bg-current rounded-sm" />
          <span className="w-0.5 h-2.5 bg-current rounded-sm" />
        </div>

        {/* WiFi Icon */}
        <svg className="w-3.5 h-3.5 text-[#E8EDF2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <line x1="12" y1="20" x2="12.01" y2="20" />
        </svg>

        {/* Battery Icon */}
        <div className="flex items-center" aria-hidden="true">
          <div className="w-4 h-2.5 border border-current rounded-sm p-[1px] flex items-center">
            <div className="h-full w-full bg-[#7CF2C9] rounded-[0.5px]" />
          </div>
          <div className="w-[1.5px] h-1 bg-current rounded-r-sm" />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
