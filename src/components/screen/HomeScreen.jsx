import React, { useState, useEffect, useRef } from 'react';
import { usePhone } from '../../context/PhoneContext';
import { StatusBar } from './StatusBar';
import { 
  PhoneIcon, 
  MessageIcon, 
  BrowserIcon, 
  CameraIcon, 
  SearchIcon,
  ChevronUpIcon,
  GridIcon,
  SparklesIcon
} from '../../ui/Icons';
import { playSound } from '../../audio/soundEngine';
import { GITHUB_ACTIVITY } from '../../data/githubContributions';

const CONTRIBUTION_COLORS = [
  'bg-[#161b22]',
  'bg-[#0e4429]',
  'bg-[#006d32]',
  'bg-[#26a641]',
  'bg-[#39d353]',
];

export const HomeScreen = () => {
  const { 
    openApp, 
    toggleDrawer,
    soundEnabled, 
    toggleSound, 
    activeGlyphPattern, 
    setGlyphPattern,
    activeWallpaper,
    setActiveWallpaper 
  } = usePhone();

  const [time, setTime] = useState('10:20');
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const containerRef = useRef(null);

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

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 4200);
    return () => clearInterval(blinkInterval);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const maxOffset = 5;
    const angle = Math.atan2(y, x);
    const dist = Math.min(maxOffset, Math.hypot(x, y) / 25);
    setEyePos({
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
    });
  };

  const handleToggleTheme = () => {
    playSound('click', soundEnabled);
    const wallpapers = ['obsidian', 'silver', 'carbon', 'graphite'];
    const nextIdx = (wallpapers.indexOf(activeWallpaper) + 1) % wallpapers.length;
    setActiveWallpaper(wallpapers[nextIdx]);
  };

  const handleToggleGlyph = () => {
    playSound('click', soundEnabled);
    const patterns = ['idle', 'projects', 'about', 'contact', 'equalizer'];
    const nextIdx = (patterns.indexOf(activeGlyphPattern) + 1) % patterns.length;
    setGlyphPattern(patterns[nextIdx]);
  };

  const days = GITHUB_ACTIVITY ? GITHUB_ACTIVITY.days : [];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full flex flex-col justify-between text-[#E8EDF2] p-3 sm:p-3.5 pt-1 pb-2 safe-bottom select-none overflow-hidden transition-all duration-500 font-sans"
      style={{
        background: 'radial-gradient(ellipse 110% 90% at 88% 22%, #084046 0%, #05262a 35%, #031417 65%, #02090b 100%)',
      }}
    >
      
      {/* 1. Hardware Status Bar */}
      <StatusBar />

      {/* Signature Teal / Cyan Flowing Waves */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80" 
        viewBox="0 0 375 812" 
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14838b" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#08383e" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#020d0f" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="waveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1ba5af" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#031518" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path 
          d="M 375,130 C 260,180 180,310 140,430 C 100,550 50,660 0,720 L 0,812 L 375,812 Z" 
          fill="url(#waveGrad1)" 
        />
        <path 
          d="M 375,210 C 280,260 210,380 170,490 C 130,600 70,710 0,770" 
          fill="none" 
          stroke="rgba(28, 175, 186, 0.45)" 
          strokeWidth="2" 
        />
        <path 
          d="M 375,280 C 295,330 235,440 200,540 C 165,640 100,740 0,800" 
          fill="none" 
          stroke="rgba(18, 125, 133, 0.35)" 
          strokeWidth="2" 
        />
      </svg>

      {/* 2. GitHub Contribution Graph — top of home screen */}
      <div className="relative z-10 mt-1 mb-1">
        <div className="flex items-center justify-between mb-1 px-0.5">
          <span className="text-[9px] font-mono text-[#1ba5af] tracking-widest uppercase">Contributions</span>
          <a
            href="https://github.com/Yasar-17"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] font-mono text-[#4a5a6a] hover:text-[#1ba5af] transition-colors tracking-tight"
            onClick={(e) => e.stopPropagation()}
          >
            @Yasar-17
          </a>
        </div>
        <div
          className="contribution-grid grid gap-[2px]"
          style={{
            gridTemplateColumns: 'repeat(16, minmax(0, 1fr))',
            gridTemplateRows: 'repeat(7, minmax(0, 1fr))',
            gridAutoFlow: 'column',
          }}
          aria-label="GitHub contribution activity"
        >
          {days.map((day, idx) => (
            <i
              key={idx}
              title={`${day.date}: ${day.count} contributions`}
              className={`block w-full aspect-square rounded-[1px] not-italic ${CONTRIBUTION_COLORS[Math.min(day.level ?? 0, 4)]}`}
              style={{ minWidth: '6px', minHeight: '6px' }}
            />
          ))}
        </div>
      </div>

      {/* 3. Bento Widgets — Stretch + open space */}
      <div className="relative z-10 grid grid-cols-2 gap-3 mt-1 px-0.5">
        
        {/* Left Widget: Stretch Media Player */}
        <button
          type="button"
          onClick={() => { playSound('click', soundEnabled); setIsPlayingMusic(!isPlayingMusic); }}
          className="h-[108px] rounded-[26px] bg-[#10141a]/85 backdrop-blur-md border border-white/10 p-3 flex flex-col justify-between text-left group hover:border-[#1ba5af]/40 hover:bg-[#141a22] transition-all cursor-pointer shadow-lg active:scale-98"
          aria-label="Stretch media widget"
        >
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-xl bg-[#090d13] border border-white/15 overflow-hidden flex items-center justify-center relative">
              <div className="w-full h-full bg-gradient-to-br from-[#1f2835] to-[#0c1016] flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-white/40 animate-ping" />
              </div>
            </div>
            <div className="text-right">
              <span className="block text-[8px] font-mono text-[#8a96a3] tracking-wider uppercase">PHOTO</span>
              <span className="block text-[8px] font-mono text-[#667382] tracking-widest">44MM · ST</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#7a8897] tracking-wider uppercase block">
              {isPlayingMusic ? 'NOW PLAYING' : 'TRACK'}
            </span>
            <strong className="text-sm font-sans font-medium tracking-tight text-white block mt-0.5">
              Stretch
            </strong>
          </div>
        </button>

        {/* Right: Open negative space with signature label */}
        <div className="h-[108px] flex items-center justify-center pointer-events-none opacity-35">
          <span className="text-[10px] font-mono tracking-widest text-[#1da8b3] uppercase">
            YASAR.DEV
          </span>
        </div>

      </div>

      {/* 4. Lower Section: 2x2 Quick Toggles + Eyes Widget */}
      <div className="relative z-10 grid grid-cols-2 gap-3 mb-1 px-0.5">
        
        {/* Lower-Left: 2x2 Circular Quick Toggle Buttons */}
        <div className="grid grid-cols-2 gap-2 h-[114px]">
          
          {/* 1. Red Contrast / Theme Toggle */}
          <button
            type="button"
            onClick={handleToggleTheme}
            className="w-full h-full rounded-full bg-[#D71921] hover:bg-[#eb1f28] flex items-center justify-center text-white shadow-md active:scale-90 transition-all cursor-pointer"
            aria-label="Toggle Color Theme"
            title="Toggle Finish / Theme"
          >
            <div className="w-4 h-4 rounded-full border border-white overflow-hidden flex" aria-hidden="true">
              <div className="w-1/2 h-full bg-white" />
              <div className="w-1/2 h-full bg-transparent" />
            </div>
          </button>

          {/* 2. Up Arrow Button (Open App Drawer) */}
          <button
            type="button"
            onClick={toggleDrawer}
            className="w-full h-full rounded-full bg-[#10141a]/90 hover:bg-[#18202a] border border-white/10 flex items-center justify-center text-white/90 active:scale-90 transition-all cursor-pointer"
            aria-label="Open Applications Drawer"
            title="All Applications"
          >
            <ChevronUpIcon className="w-4 h-4 text-[#E8EDF2]" strokeWidth="2" />
          </button>

          {/* 3. Grid Button (Open App Drawer) */}
          <button
            type="button"
            onClick={toggleDrawer}
            className="w-full h-full rounded-full bg-[#10141a]/90 hover:bg-[#18202a] border border-white/10 flex items-center justify-center text-white/90 active:scale-90 transition-all cursor-pointer"
            aria-label="View All Apps"
            title="All Apps"
          >
            <GridIcon className="w-4 h-4 text-[#E8EDF2]" strokeWidth="2" />
          </button>

          {/* 4. Glyph Pattern Toggle */}
          <button
            type="button"
            onClick={handleToggleGlyph}
            className="w-full h-full rounded-full bg-[#10141a]/90 hover:bg-[#18202a] border border-white/10 flex items-center justify-center text-white/90 active:scale-90 transition-all cursor-pointer"
            aria-label="Cycle Glyph Pattern"
            title="Cycle Glyph Pattern"
          >
            <SparklesIcon className="w-4 h-4 text-[#7CF2C9]" strokeWidth="2" />
          </button>

        </div>

        {/* Lower-Right: Interactive Eyes Widget */}
        <button
          type="button"
          onClick={() => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 200);
            playSound('click', soundEnabled);
          }}
          className="h-[114px] rounded-[26px] bg-[#10141a]/90 backdrop-blur-md border border-white/10 p-3 flex items-center justify-center group hover:border-[#1ba5af]/50 hover:bg-[#141a22] transition-all cursor-pointer shadow-lg active:scale-98 relative overflow-hidden"
          aria-label="Interactive Eyes Widget"
        >
          <div 
            className={`flex items-center space-x-4 transition-transform duration-100 ${isBlinking ? 'scale-y-[0.08]' : 'scale-y-100'}`}
            style={{
              transform: `translate(${eyePos.x}px, ${eyePos.y}px) ${isBlinking ? 'scaleY(0.08)' : 'scaleY(1)'}`,
            }}
          >
            <div className="w-5 h-5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.85)] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#0b0e14] opacity-20" />
            </div>
            <div className="w-5 h-5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.85)] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#0b0e14] opacity-20" />
            </div>
          </div>
        </button>

      </div>

      {/* 5. Bottom Dock with 4 Core Apps */}
      <nav 
        className="relative z-10 bg-[#10141a]/90 backdrop-blur-md border border-white/10 rounded-[28px] p-2 px-3 shadow-xl flex items-center justify-around my-1" 
        aria-label="Quick Applications Dock"
      >
        <button
          type="button"
          onClick={() => openApp('contact')}
          className="w-11 h-11 rounded-full bg-[#1a4a1f] hover:bg-[#1f5a25] border border-white/10 flex items-center justify-center text-[#4ade80] hover:text-white transition-all active:scale-90 shadow-sm"
          aria-label="Open Phone and Contact"
        >
          <PhoneIcon className="w-5 h-5" strokeWidth="2" />
        </button>

        <button
          type="button"
          onClick={() => openApp('contact')}
          className="w-11 h-11 rounded-full bg-[#1a3a5c] hover:bg-[#1f4a72] border border-white/10 flex items-center justify-center text-[#60a5fa] hover:text-white transition-all active:scale-90 shadow-sm"
          aria-label="Open Messages"
        >
          <MessageIcon className="w-5 h-5" strokeWidth="2" />
        </button>

        <button
          type="button"
          onClick={() => openApp('github')}
          className="w-11 h-11 rounded-full bg-[#1e1e1e] hover:bg-[#2a2a2a] border border-white/10 flex items-center justify-center text-[#E8EDF2] hover:text-white transition-all active:scale-90 shadow-sm"
          aria-label="Open Browser and GitHub"
        >
          <BrowserIcon className="w-5 h-5" strokeWidth="2" />
        </button>

        <button
          type="button"
          onClick={() => openApp('camera')}
          className="w-11 h-11 rounded-full bg-[#2a1a0a] hover:bg-[#3a220d] border border-white/10 flex items-center justify-center text-[#fb923c] hover:text-white transition-all active:scale-90 shadow-sm"
          aria-label="Open Camera"
        >
          <CameraIcon className="w-5 h-5" strokeWidth="2" />
        </button>
      </nav>

      {/* 6. Floating Search Bar Pill */}
      <div className="relative z-10 w-full flex items-center justify-center pt-0.5 pb-0.5">
        <button
          type="button"
          onClick={toggleDrawer}
          className="w-full flex items-center justify-center space-x-2 bg-[#10141a]/85 hover:bg-[#161c24] border border-white/10 py-2 px-4 rounded-full text-xs font-mono text-[#8a96a3] transition-all cursor-pointer shadow-md active:scale-98"
          aria-label="Search or Open Applications"
        >
          <SearchIcon className="w-3.5 h-3.5 text-[#7CF2C9]" strokeWidth="2" />
          <span className="text-[12px] font-mono tracking-tight text-[#9AA6B2]">Search apps...</span>
        </button>
      </div>

    </div>
  );
};

export default HomeScreen;
