import React, { useState, useEffect } from 'react';
import { usePhone } from '../../context/PhoneContext';
import { SparklesIcon, ChevronUpIcon } from '../../ui/Icons';

export const LockScreen = () => {
  const { setIsLocked, openApp } = usePhone();
  const [time, setTime] = useState({ timeStr: '10:30', dateStr: 'Wednesday, Oct 31' });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      setTime({
        timeStr: `${hours}:${minutes}`,
        dateStr: `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`,
      });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleUnlock = () => {
    setIsLocked(false);
  };

  return (
    <div 
      className="relative w-full h-full bg-[#0B0F14] text-[#E8EDF2] flex flex-col justify-between p-6 pt-12 cursor-pointer select-none"
      onClick={handleUnlock}
    >
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] h-[320px] rounded-full bg-[#7CF2C9]/5 blur-[80px] pointer-events-none" />

      {/* TOP: Name, Date, Clock */}
      <div className="flex flex-col items-center text-center mt-6 z-10">
        <div className="flex items-center space-x-2 text-[13px] tracking-wider text-[#9AA6B2] uppercase font-mono">
          <span className="font-semibold text-[#E8EDF2]">Yasar</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#7CF2C9]" />
          <span>Data Analyst & Builder</span>
        </div>

        {/* Big Clock */}
        <h1 className="font-grotesk text-[92px] leading-none font-bold tracking-tighter text-[#E8EDF2] mt-3 drop-shadow-md">
          {time.timeStr}
        </h1>

        <p className="font-sans text-[15px] font-medium text-[#C5CED8] mt-2">
          {time.dateStr}
        </p>
      </div>

      {/* CENTER: Notification Stack */}
      <div className="flex flex-col space-y-2.5 my-auto z-10" onClick={(e) => e.stopPropagation()}>
        
        {/* Notification 1: Zenny Studios */}
        <div 
          onClick={() => { setIsLocked(false); openApp('projects'); }}
          className="bg-[#151B23]/90 hover:bg-[#151B23] backdrop-blur-md border border-[#1B222B] rounded-[22px] p-3.5 shadow-lg cursor-pointer transition-all active:scale-[0.98]"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#7CF2C9]" />
              <span className="text-[12px] font-semibold text-[#E8EDF2]">Zenny Studios</span>
            </div>
            <span className="text-[11px] text-[#9AA6B2]">Just now</span>
          </div>
          <p className="text-[13px] text-[#C5CED8] leading-snug">
            Client site is live with modern responsive architecture.
          </p>
        </div>

        {/* Notification 2: SIH26162 */}
        <div 
          onClick={() => { setIsLocked(false); openApp('case-studies'); }}
          className="bg-[#151B23]/90 hover:bg-[#151B23] backdrop-blur-md border border-[#1B222B] rounded-[22px] p-3.5 shadow-lg cursor-pointer transition-all active:scale-[0.98]"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#FFB86B]" />
              <span className="text-[12px] font-semibold text-[#E8EDF2]">SIH26162 Classifier</span>
            </div>
            <span className="text-[11px] text-[#9AA6B2]">12m ago</span>
          </div>
          <p className="text-[13px] text-[#C5CED8] leading-snug">
            Prototype active on NASA FIRMS & OpenStreetMap spatial streams.
          </p>
        </div>

        {/* Notification 3: Case Studies */}
        <div 
          onClick={() => { setIsLocked(false); openApp('case-studies'); }}
          className="bg-[#151B23]/90 hover:bg-[#151B23] backdrop-blur-md border border-[#1B222B] rounded-[22px] p-3.5 shadow-lg cursor-pointer transition-all active:scale-[0.98]"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#8AB4FF]" />
              <span className="text-[12px] font-semibold text-[#E8EDF2]">Case Studies</span>
            </div>
            <span className="text-[11px] text-[#9AA6B2]">1h ago</span>
          </div>
          <p className="text-[13px] text-[#C5CED8] leading-snug">
            New case study [Case title] added to telemetry research hub.
          </p>
        </div>

      </div>

      {/* BOTTOM: Swipe / Click to unlock hint */}
      <div 
        onClick={handleUnlock}
        className="flex flex-col items-center space-y-2 mb-2 z-10 cursor-pointer group"
      >
        <div className="w-[42px] h-[4px] rounded-full bg-[#7CF2C9] opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center space-x-1.5 text-[12px] font-medium text-[#9AA6B2] tracking-wider uppercase">
          <ChevronUpIcon className="w-3.5 h-3.5 text-[#7CF2C9] animate-bounce" />
          <span>Swipe or click to unlock</span>
        </div>
      </div>
    </div>
  );
};
