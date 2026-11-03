import React, { useState, useEffect } from 'react';
import { usePhone } from '../../context/PhoneContext';
import { StatusBar } from './StatusBar';
import { ChevronUpIcon, SparklesIcon, CheckIcon } from '../../ui/Icons';
import { playSound } from '../../audio/soundEngine';
import { PROFILE, PROJECTS } from '../../data';

export const LockScreen = () => {
  const { setIsLocked, openApp, soundEnabled } = usePhone();
  const [timeData, setTimeData] = useState({
    time: '10:30',
    date: 'Monday, Nov 2',
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      setTimeData({
        time: `${hours}:${minutes}`,
        date: `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`,
      });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleUnlock = () => {
    playSound('power', soundEnabled);
    setIsLocked(false);
  };

  return (
    <div 
      className="relative w-full h-full bg-[#080b10] text-[#E8EDF2] flex flex-col justify-between p-4 pt-1.5 pb-4 select-none cursor-pointer overflow-hidden font-sans"
      onClick={handleUnlock}
    >
      {/* 1. Top Hardware Status Bar */}
      <StatusBar />

      {/* Subtle Monochrome Environmental Depth */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
        }}
      />

      {/* 2. Clock & Date Display (Nothing OS Industrial Monospace) */}
      <div className="flex flex-col items-center text-center mt-6 z-10">
        <div className="flex items-center space-x-2 text-[11px] tracking-widest text-[#7CF2C9] uppercase font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7CF2C9] animate-pulse" />
          <span>{PROFILE.availability}</span>
        </div>

        {/* Large Digital Clock */}
        <h1 className="font-mono text-[84px] leading-none font-bold tracking-tighter text-[#F0F4F8] mt-2 drop-shadow-md">
          {timeData.time}
        </h1>

        <p className="font-mono text-xs text-[#9AA6B2] tracking-wider uppercase mt-2">
          {timeData.date}
        </p>
      </div>

      {/* 3. Notification Stack */}
      <div className="flex flex-col space-y-2.5 my-auto z-10 px-1" onClick={(e) => e.stopPropagation()}>
        {/* Notification 1: Zenny Studios */}
        <div 
          onClick={() => { setIsLocked(false); openApp('projects'); }}
          className="bg-[#12161f]/90 hover:bg-[#181f2b] border border-[#1f2633] rounded-[20px] p-3 shadow-lg cursor-pointer transition-all active:scale-[0.98]"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#7CF2C9]" />
              <span className="text-xs font-mono font-bold text-[#E8EDF2]">Zenny Studios</span>
            </div>
            <span className="text-[10px] font-mono text-[#626e7e]">Live Production</span>
          </div>
          <p className="text-xs text-[#9AA6B2] leading-snug">
            Client platform deployed with 98/100 performance score.
          </p>
        </div>

        {/* Notification 2: SIH Wildfire Classifier */}
        <div 
          onClick={() => { setIsLocked(false); openApp('case-studies'); }}
          className="bg-[#12161f]/90 hover:bg-[#181f2b] border border-[#1f2633] rounded-[20px] p-3 shadow-lg cursor-pointer transition-all active:scale-[0.98]"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#FFB86B]" />
              <span className="text-xs font-mono font-bold text-[#E8EDF2]">SIH-26 Classifier</span>
            </div>
            <span className="text-[10px] font-mono text-[#626e7e]">National Finalist</span>
          </div>
          <p className="text-xs text-[#9AA6B2] leading-snug">
            NASA satellite thermal feed filtered with 84.6% false-alarm reduction.
          </p>
        </div>
      </div>

      {/* 4. Bottom Swipe or Tap to Unlock Hint */}
      <div 
        onClick={handleUnlock}
        className="flex flex-col items-center space-y-1.5 mb-1 z-10 cursor-pointer group"
      >
        <ChevronUpIcon className="w-4 h-4 text-[#7CF2C9] animate-bounce" />
        <span className="font-mono text-[11px] text-[#9AA6B2] group-hover:text-[#E8EDF2] tracking-widest uppercase transition-colors">
          Tap or swipe to unlock
        </span>
        <div className="w-[120px] h-[4px] rounded-full bg-white/40 group-hover:bg-[#7CF2C9] transition-colors mt-1" />
      </div>

    </div>
  );
};

export default LockScreen;
