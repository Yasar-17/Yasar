import React, { useState, useEffect } from 'react';
import { usePhone } from '../../context/PhoneContext';
import { 
  SearchIcon, ChevronDownIcon,
  FolderIcon, BookOpenIcon, CpuIcon, BriefcaseIcon, FileTextIcon, 
  MailIcon, GithubIcon, LinkIcon, TerminalIcon, SettingsIcon,
  BarChartIcon, UserIcon, GridIcon, HeadphonesIcon
} from '../../ui/Icons';

export const HomeScreen = () => {
  const { 
    openApp, toggleDrawer, toggleQuickPanel, 
    activeWallpaper, cycleGlyph, activeGlyphPattern 
  } = usePhone();

  const [time, setTime] = useState('9:41');

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

  // 16 columns x 7 rows GitHub sample activity data (matching prsd.dev widget)
  const githubCols = 16;
  const githubRows = 7;
  const getActivityLevel = (col, row) => {
    const val = (col * 3 + row * 7 + (col * row) % 5) % 10;
    if (val < 4) return 0;
    if (val < 7) return 1;
    if (val < 9) return 2;
    return 3;
  };

  const handleAppClick = (appId, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    openApp(appId, {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    });
  };

  const getWallpaperStyle = () => {
    switch (activeWallpaper) {
      case 'warm-copper':
        return 'from-[#2b160b] via-[#613014] to-[#120a06]';
      case 'obsidian':
        return 'from-[#141922] via-[#0B0F14] to-[#040608]';
      case 'midnight':
        return 'from-[#1b152b] via-[#100e1c] to-[#07060d]';
      case 'silver':
        return 'from-[#323a46] via-[#1e252e] to-[#0c1015]';
      default:
        return 'from-[#2b160b] via-[#613014] to-[#120a06]';
    }
  };

  return (
    <div className={`relative w-full h-full flex flex-col justify-between bg-gradient-to-b ${getWallpaperStyle()} text-[#E8EDF2] p-4 pt-3 pb-3 overflow-hidden select-none transition-colors duration-500`}>
      
      {/* Background organic glow waves */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" viewBox="0 0 372 806" fill="none">
          <circle cx="100" cy="180" r="160" fill="#d76c2d" opacity="0.3" filter="blur(60px)" />
          <circle cx="280" cy="620" r="180" fill="#b85822" opacity="0.25" filter="blur(70px)" />
        </svg>
      </div>

      {/* 1. TOP STATUS BAR & DYNAMIC ISLAND */}
      <div className="relative z-20 flex items-center justify-between px-2 pt-1 h-[34px]">
        {/* Time */}
        <span className="font-semibold text-[13px] tracking-tight text-white/90">
          {time}
        </span>

        {/* Dynamic Island Pill */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1 w-[96px] h-[26px] bg-[#000000] rounded-full border border-white/10 shadow-md flex items-center justify-between px-2.5">
          <div className="w-[8px] h-[8px] rounded-full bg-[#0a121c] border border-[#232c37] flex items-center justify-center">
            <div className="w-[3px] h-[3px] rounded-full bg-[#1b2d42]" />
          </div>
          <div className="flex items-center space-x-0.5">
            <span className="w-1 h-2 bg-[#7CF2C9] rounded-full animate-pulse" />
            <span className="w-1 h-3 bg-[#7CF2C9] rounded-full animate-pulse" />
            <span className="w-1 h-1.5 bg-[#7CF2C9] rounded-full animate-pulse" />
          </div>
        </div>

        {/* Status Signals: Cellular, WiFi, Battery */}
        <div className="flex items-center space-x-1.5 text-white/90">
          {/* Signal Bars */}
          <div className="flex items-end space-x-0.5 h-2.5">
            <span className="w-0.5 h-1 bg-current rounded-sm" />
            <span className="w-0.5 h-1.5 bg-current rounded-sm" />
            <span className="w-0.5 h-2 bg-current rounded-sm" />
            <span className="w-0.5 h-2.5 bg-current rounded-sm" />
          </div>

          {/* Battery */}
          <div className="w-4 h-2.5 rounded-[3px] border border-current p-0.5 flex items-center">
            <div className="w-full h-full bg-current rounded-[1px]" />
          </div>
        </div>
      </div>

      {/* 2. BENTO WIDGETS SECTION */}
      <div className="relative z-10 flex flex-col space-y-2 mt-2 mb-1">
        
        {/* GitHub Contribution Heatmap Widget */}
        <div 
          onClick={(e) => handleAppClick('github', e)}
          className="bg-[#151B23]/80 hover:bg-[#151B23] backdrop-blur-xl border border-white/10 rounded-[24px] p-3 shadow-lg cursor-pointer transition-all active:scale-[0.98]"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <GithubIcon className="w-3.5 h-3.5 text-[#E8EDF2]" />
              <span className="text-[12px] font-semibold text-[#E8EDF2]">GitHub Activity</span>
            </div>
            <span className="text-[10px] font-mono text-[#7CF2C9] bg-[#1F2933] px-2 py-0.5 rounded-full border border-[#2B3542]">
              sample data
            </span>
          </div>

          {/* 16-col Heatmap */}
          <div className="grid grid-flow-col grid-rows-7 gap-1">
            {Array.from({ length: githubCols * githubRows }).map((_, idx) => {
              const col = Math.floor(idx / githubRows);
              const row = idx % githubRows;
              const level = getActivityLevel(col, row);
              const colors = [
                'bg-white/5',
                'bg-[#7CF2C9]/35',
                'bg-[#7CF2C9]/70',
                'bg-[#7CF2C9]',
              ];

              return (
                <div
                  key={idx}
                  className={`w-[14px] h-[9px] rounded-[2px] transition-transform hover:scale-125 ${colors[level]}`}
                />
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#9AA6B2] mt-2">
            <span>[N] contributions</span>
            <span className="text-[10px] text-[#7CF2C9] font-medium">16 weeks ending Oct 31</span>
          </div>
        </div>

        {/* Intro & Book a Call Bento Card */}
        <div 
          onClick={(e) => handleAppClick('about', e)}
          className="bg-[#151B23]/80 hover:bg-[#151B23] backdrop-blur-xl border border-white/10 rounded-[24px] p-3.5 shadow-lg cursor-pointer transition-all active:scale-[0.98] flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-[14px] bg-[#7CF2C9] text-[#0B0F14] flex items-center justify-center font-bold font-grotesk text-[16px] shadow-md">
              Y
            </div>
            <div>
              <h3 className="font-grotesk text-[14px] font-bold text-[#E8EDF2] leading-tight">
                Yasar — Data Analyst & Builder
              </h3>
              <p className="text-[11px] text-[#9AA6B2] leading-tight mt-0.5">
                3rd-Year B.Tech AI & Data Science
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-[11px] font-medium text-[#7CF2C9] bg-[#1F2933] px-2.5 py-1 rounded-full border border-[#2B3542]">
            <span>About</span>
          </div>
        </div>

      </div>

      {/* 3. 8 APPS GRID */}
      <div className="relative z-10 grid grid-cols-4 gap-y-3.5 gap-x-2 px-1 my-1">
        
        {/* Projects */}
        <button
          type="button"
          onClick={(e) => handleAppClick('projects', e)}
          className="flex flex-col items-center group focus:outline-none"
        >
          <div className="w-[56px] h-[56px] rounded-[18px] bg-gradient-to-br from-[#FFB86B] to-[#e68a35] text-[#0B0F14] flex items-center justify-center shadow-lg group-hover:scale-105 active:scale-95 transition-transform border border-white/20">
            <FolderIcon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-medium text-white/95 mt-1 tracking-tight truncate max-w-[64px]">
            Projects
          </span>
        </button>

        {/* Case Studies */}
        <button
          type="button"
          onClick={(e) => handleAppClick('case-studies', e)}
          className="flex flex-col items-center group focus:outline-none"
        >
          <div className="w-[56px] h-[56px] rounded-[18px] bg-gradient-to-br from-[#8AB4FF] to-[#508bf0] text-[#0B0F14] flex items-center justify-center shadow-lg group-hover:scale-105 active:scale-95 transition-transform border border-white/20">
            <BookOpenIcon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-medium text-white/95 mt-1 tracking-tight truncate max-w-[64px]">
            Case Studies
          </span>
        </button>

        {/* Skills */}
        <button
          type="button"
          onClick={(e) => handleAppClick('skills', e)}
          className="flex flex-col items-center group focus:outline-none"
        >
          <div className="w-[56px] h-[56px] rounded-[18px] bg-gradient-to-br from-[#7CF2C9] to-[#4dd4a5] text-[#0B0F14] flex items-center justify-center shadow-lg group-hover:scale-105 active:scale-95 transition-transform border border-white/20">
            <CpuIcon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-medium text-white/95 mt-1 tracking-tight truncate max-w-[64px]">
            Skills
          </span>
        </button>

        {/* Experience */}
        <button
          type="button"
          onClick={(e) => handleAppClick('experience', e)}
          className="flex flex-col items-center group focus:outline-none"
        >
          <div className="w-[56px] h-[56px] rounded-[18px] bg-gradient-to-br from-[#F4A0C0] to-[#df729b] text-[#0B0F14] flex items-center justify-center shadow-lg group-hover:scale-105 active:scale-95 transition-transform border border-white/20">
            <BriefcaseIcon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-medium text-white/95 mt-1 tracking-tight truncate max-w-[64px]">
            Experience
          </span>
        </button>

        {/* Terminal */}
        <button
          type="button"
          onClick={(e) => handleAppClick('terminal', e)}
          className="flex flex-col items-center group focus:outline-none"
        >
          <div className="w-[56px] h-[56px] rounded-[18px] bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-[#334155] text-[#7CF2C9] flex items-center justify-center shadow-lg group-hover:scale-105 active:scale-95 transition-transform">
            <TerminalIcon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-medium text-white/95 mt-1 tracking-tight truncate max-w-[64px]">
            Terminal
          </span>
        </button>

        {/* Settings */}
        <button
          type="button"
          onClick={(e) => handleAppClick('settings', e)}
          className="flex flex-col items-center group focus:outline-none"
        >
          <div className="w-[56px] h-[56px] rounded-[18px] bg-gradient-to-br from-[#C9B8FF] to-[#9e85f5] text-[#0B0F14] flex items-center justify-center shadow-lg group-hover:scale-105 active:scale-95 transition-transform border border-white/20">
            <SettingsIcon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-medium text-white/95 mt-1 tracking-tight truncate max-w-[64px]">
            Settings
          </span>
        </button>

        {/* Dashboards */}
        <button
          type="button"
          onClick={(e) => handleAppClick('dashboards', e)}
          className="flex flex-col items-center group focus:outline-none"
        >
          <div className="w-[56px] h-[56px] rounded-[18px] bg-gradient-to-br from-[#8AB4FF] to-[#457de3] text-[#0B0F14] flex items-center justify-center shadow-lg group-hover:scale-105 active:scale-95 transition-transform border border-white/20">
            <BarChartIcon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-medium text-white/95 mt-1 tracking-tight truncate max-w-[64px]">
            Dashboards
          </span>
        </button>

        {/* Links */}
        <button
          type="button"
          onClick={(e) => handleAppClick('links', e)}
          className="flex flex-col items-center group focus:outline-none"
        >
          <div className="w-[56px] h-[56px] rounded-[18px] bg-gradient-to-br from-[#7CF2C9] to-[#39ba8d] text-[#0B0F14] flex items-center justify-center shadow-lg group-hover:scale-105 active:scale-95 transition-transform border border-white/20">
            <LinkIcon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-medium text-white/95 mt-1 tracking-tight truncate max-w-[64px]">
            Links
          </span>
        </button>

      </div>

      {/* 4. SEARCH PILL (Spotlight search) */}
      <div 
        onClick={toggleDrawer}
        className="relative z-10 flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-full py-1.5 px-4 mx-auto cursor-pointer transition-all active:scale-95 shadow-sm border border-white/10"
      >
        <SearchIcon className="w-3.5 h-3.5 text-white/80" />
        <span className="text-[12px] text-white/80 font-medium">Search</span>
      </div>

      {/* 5. FLOATING GLASS DOCK (prsd.dev style) */}
      <div className="relative z-10 pt-1">
        <div className="bg-white/15 backdrop-blur-2xl border border-white/20 rounded-[30px] p-2 px-3 shadow-xl flex items-center justify-between">
          
          {/* Dock 1: App Drawer */}
          <button
            type="button"
            onClick={toggleDrawer}
            className="w-[50px] h-[50px] rounded-[16px] bg-white text-[#0B0F14] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform"
            aria-label="Open App Drawer"
            title="App Drawer"
          >
            <GridIcon className="w-6 h-6" />
          </button>

          {/* Dock 2: Contact */}
          <button
            type="button"
            onClick={(e) => handleAppClick('contact', e)}
            className="w-[50px] h-[50px] rounded-[16px] bg-white text-[#0B0F14] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform"
            aria-label="Contact App"
            title="Contact"
          >
            <MailIcon className="w-6 h-6 text-[#0B0F14]" />
          </button>

          {/* Dock 3: Resume */}
          <button
            type="button"
            onClick={(e) => handleAppClick('resume', e)}
            className="w-[50px] h-[50px] rounded-[16px] bg-white text-[#0B0F14] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform"
            aria-label="Resume App"
            title="Resume"
          >
            <FileTextIcon className="w-6 h-6 text-[#0B0F14]" />
          </button>

          {/* Dock 4: GitHub */}
          <button
            type="button"
            onClick={(e) => handleAppClick('github', e)}
            className="w-[50px] h-[50px] rounded-[16px] bg-white text-[#0B0F14] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform"
            aria-label="GitHub App"
            title="GitHub"
          >
            <GithubIcon className="w-6 h-6 text-[#0B0F14]" />
          </button>

        </div>
      </div>

      {/* 6. BOTTOM HOME INDICATOR BAR */}
      <div className="relative z-20 flex justify-center pt-2">
        <button
          type="button"
          onClick={() => {}}
          className="w-[120px] h-[4px] rounded-full bg-white/70 hover:bg-white transition-colors focus:outline-none cursor-pointer"
          aria-label="Home"
        />
      </div>

    </div>
  );
};
