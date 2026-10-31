import React, { useState } from 'react';
import { usePhone } from '../../context/PhoneContext';
import { 
  SearchIcon, ChevronUpIcon, ChevronDownIcon,
  FolderIcon, BookOpenIcon, CpuIcon, BriefcaseIcon, FileTextIcon, 
  MailIcon, GithubIcon, LinkIcon, TerminalIcon, SettingsIcon,
  BarChartIcon, UserIcon, GridIcon, HeadphonesIcon
} from '../../ui/Icons';

export const HomeScreen = () => {
  const { 
    openApp, toggleDrawer, toggleQuickPanel, 
    activeWallpaper, cycleGlyph, activeGlyphPattern 
  } = usePhone();

  const [hoveredCell, setHoveredCell] = useState(null);

  // GitHub 18 cols x 7 rows sample activity data
  const githubCols = 18;
  const githubRows = 7;
  // Deterministic sample pattern
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

  // Dynamic wallpaper styling
  const getWallpaperStyle = () => {
    switch (activeWallpaper) {
      case 'warm-copper':
        return 'bg-gradient-to-b from-[#2b160b] via-[#613014] to-[#120a06]';
      case 'obsidian':
        return 'bg-gradient-to-b from-[#0e141b] via-[#0B0F14] to-[#05070a]';
      case 'midnight':
        return 'bg-gradient-to-b from-[#181528] via-[#100e1c] to-[#07060d]';
      case 'silver':
        return 'bg-gradient-to-b from-[#3a4450] via-[#1e252e] to-[#0c1015]';
      default:
        return 'bg-gradient-to-b from-[#2b160b] via-[#613014] to-[#120a06]';
    }
  };

  return (
    <div className={`relative w-full h-full flex flex-col justify-between p-4 pt-10 pb-5 overflow-hidden select-none transition-colors duration-500 ${getWallpaperStyle()}`}>
      
      {/* Dynamic fluid wallpaper curves (as seen on reference device) */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg className="w-full h-full" viewBox="0 0 390 844" fill="none">
          <path d="M-50 200 C 150 150, 250 450, 450 350" stroke="#ffaa5a" strokeWidth="120" strokeLinecap="round" opacity="0.35" filter="blur(60px)" />
          <path d="M-20 600 C 180 500, 280 800, 450 700" stroke="#d97724" strokeWidth="100" strokeLinecap="round" opacity="0.25" filter="blur(70px)" />
        </svg>
      </div>

      {/* TOP BAR / QUICK PANEL HINT */}
      <div className="relative z-10 flex flex-col space-y-2">
        {/* Swipe down / click hint for Quick Panel */}
        <div 
          onClick={toggleQuickPanel}
          className="flex items-center justify-between px-2 cursor-pointer group py-1"
          title="Click to open Quick Panel"
        >
          <div className="flex items-center space-x-1.5 text-[11px] font-mono tracking-wider text-[#C5CED8]/80">
            <span className="w-2 h-2 rounded-full bg-[#7CF2C9]" />
            <span>YASAR OS</span>
          </div>
          <div className="flex items-center space-x-1 text-[11px] text-[#9AA6B2] group-hover:text-[#7CF2C9] transition-colors">
            <span>Quick Panel</span>
            <ChevronDownIcon className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Minimalist Search Bar */}
        <div 
          onClick={toggleDrawer}
          className="flex items-center space-x-2.5 bg-[#151B23]/80 hover:bg-[#151B23] backdrop-blur-md border border-[#1B222B] rounded-full px-4 py-2.5 shadow-sm cursor-pointer transition-all active:scale-[0.98]"
        >
          <SearchIcon className="w-4 h-4 text-[#9AA6B2]" />
          <span className="text-[13px] text-[#9AA6B2]">Search apps, case studies, skills...</span>
        </div>
      </div>

      {/* BENTO WIDGETS SECTION */}
      <div className="relative z-10 flex flex-col space-y-2.5 my-2">
        
        {/* Row 1: About Me Bento + Equalizer Widget */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* About Me Bento Card */}
          <div 
            onClick={(e) => handleAppClick('about', e)}
            className="bg-[#151B23]/85 hover:bg-[#151B23] backdrop-blur-md border border-[#1B222B] rounded-[22px] p-3.5 shadow-md cursor-pointer transition-all active:scale-[0.98] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#7CF2C9]">Builder</span>
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[#E8EDF2]">
                <UserIcon className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="font-grotesk text-[15px] font-semibold text-[#E8EDF2] leading-tight">
                Yasar
              </h3>
              <p className="text-[11px] text-[#9AA6B2] leading-tight mt-0.5">
                Data Analyst & AI Student
              </p>
            </div>
          </div>

          {/* Equalizer Waveform Bento Card (Linked to Glyph Matrix) */}
          <div 
            onClick={cycleGlyph}
            className="bg-[#151B23]/85 hover:bg-[#151B23] backdrop-blur-md border border-[#1B222B] rounded-[22px] p-3.5 shadow-md cursor-pointer transition-all active:scale-[0.98] flex flex-col justify-between"
            title="Tap to toggle rear Glyph equalizer mode"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFB86B]">Glyph Live</span>
              <HeadphonesIcon className="w-4 h-4 text-[#E8EDF2]" />
            </div>
            <div className="flex items-end space-x-1.5 h-[24px]">
              <span className="w-1.5 bg-[#FFB86B] rounded-full animate-pulse h-[60%]" />
              <span className="w-1.5 bg-[#FFB86B] rounded-full animate-pulse h-[100%]" />
              <span className="w-1.5 bg-[#FFB86B] rounded-full animate-pulse h-[40%]" />
              <span className="w-1.5 bg-[#FFB86B] rounded-full animate-pulse h-[80%]" />
              <span className="w-1.5 bg-[#FFB86B] rounded-full animate-pulse h-[50%]" />
            </div>
            <p className="text-[10px] font-mono text-[#9AA6B2]">
              Pattern: #{activeGlyphPattern + 1}
            </p>
          </div>
        </div>

        {/* Row 2: GitHub Activity Heatmap Bento */}
        <div 
          onClick={(e) => handleAppClick('github', e)}
          className="bg-[#151B23]/85 hover:bg-[#151B23] backdrop-blur-md border border-[#1B222B] rounded-[22px] p-3 shadow-md cursor-pointer transition-all active:scale-[0.99]"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <GithubIcon className="w-3.5 h-3.5 text-[#E8EDF2]" />
              <span className="text-[11px] font-semibold text-[#E8EDF2]">GitHub Activity</span>
            </div>
            <span className="text-[10px] font-mono text-[#9AA6B2]">sample data</span>
          </div>

          {/* 18-column heatmap matrix */}
          <div className="grid grid-flow-col grid-rows-7 gap-1">
            {Array.from({ length: githubCols * githubRows }).map((_, idx) => {
              const col = Math.floor(idx / githubRows);
              const row = idx % githubRows;
              const level = getActivityLevel(col, row);
              const colors = [
                'bg-[#1F2933]',
                'bg-[#7CF2C9]/30',
                'bg-[#7CF2C9]/65',
                'bg-[#7CF2C9]',
              ];

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredCell({ col, row, level })}
                  onMouseLeave={() => setHoveredCell(null)}
                  className={`w-[13px] h-[10px] rounded-[2px] transition-transform hover:scale-125 ${colors[level]}`}
                />
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#9AA6B2] mt-2">
            <span>[N] contributions</span>
            <div className="flex items-center space-x-1">
              <span>Less</span>
              <span className="w-2 h-2 rounded-[1px] bg-[#1F2933]" />
              <span className="w-2 h-2 rounded-[1px] bg-[#7CF2C9]/30" />
              <span className="w-2 h-2 rounded-[1px] bg-[#7CF2C9]/65" />
              <span className="w-2 h-2 rounded-[1px] bg-[#7CF2C9]" />
              <span>More</span>
            </div>
          </div>
        </div>

      </div>

      {/* 8 APPS GRID */}
      <div className="relative z-10 grid grid-cols-4 gap-y-3.5 gap-x-2 px-1 my-1">
        
        {/* 1. Projects */}
        <button
          type="button"
          onClick={(e) => handleAppClick('projects', e)}
          className="flex flex-col items-center group focus:outline-none"
        >
          <div className="w-[54px] h-[54px] rounded-[18px] bg-[#FFB86B] text-[#0B0F14] flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-transform">
            <FolderIcon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-medium text-[#E8EDF2] mt-1 tracking-tight truncate max-w-[64px]">
            Projects
          </span>
        </button>

        {/* 2. Case Studies */}
        <button
          type="button"
          onClick={(e) => handleAppClick('case-studies', e)}
          className="flex flex-col items-center group focus:outline-none"
        >
          <div className="w-[54px] h-[54px] rounded-[18px] bg-[#8AB4FF] text-[#0B0F14] flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-transform">
            <BookOpenIcon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-medium text-[#E8EDF2] mt-1 tracking-tight truncate max-w-[64px]">
            Case Studies
          </span>
        </button>

        {/* 3. Skills */}
        <button
          type="button"
          onClick={(e) => handleAppClick('skills', e)}
          className="flex flex-col items-center group focus:outline-none"
        >
          <div className="w-[54px] h-[54px] rounded-[18px] bg-[#7CF2C9] text-[#0B0F14] flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-transform">
            <CpuIcon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-medium text-[#E8EDF2] mt-1 tracking-tight truncate max-w-[64px]">
            Skills
          </span>
        </button>

        {/* 4. Experience */}
        <button
          type="button"
          onClick={(e) => handleAppClick('experience', e)}
          className="flex flex-col items-center group focus:outline-none"
        >
          <div className="w-[54px] h-[54px] rounded-[18px] bg-[#F4A0C0] text-[#0B0F14] flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-transform">
            <BriefcaseIcon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-medium text-[#E8EDF2] mt-1 tracking-tight truncate max-w-[64px]">
            Experience
          </span>
        </button>

        {/* 5. Terminal CLI */}
        <button
          type="button"
          onClick={(e) => handleAppClick('terminal', e)}
          className="flex flex-col items-center group focus:outline-none"
        >
          <div className="w-[54px] h-[54px] rounded-[18px] bg-[#1E293B] border border-[#334155] text-[#7CF2C9] flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-transform">
            <TerminalIcon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-medium text-[#E8EDF2] mt-1 tracking-tight truncate max-w-[64px]">
            Terminal
          </span>
        </button>

        {/* 6. Settings */}
        <button
          type="button"
          onClick={(e) => handleAppClick('settings', e)}
          className="flex flex-col items-center group focus:outline-none"
        >
          <div className="w-[54px] h-[54px] rounded-[18px] bg-[#C9B8FF] text-[#0B0F14] flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-transform">
            <SettingsIcon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-medium text-[#E8EDF2] mt-1 tracking-tight truncate max-w-[64px]">
            Settings
          </span>
        </button>

        {/* 7. Dashboards */}
        <button
          type="button"
          onClick={(e) => handleAppClick('dashboards', e)}
          className="flex flex-col items-center group focus:outline-none"
        >
          <div className="w-[54px] h-[54px] rounded-[18px] bg-[#8AB4FF] text-[#0B0F14] flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-transform">
            <BarChartIcon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-medium text-[#E8EDF2] mt-1 tracking-tight truncate max-w-[64px]">
            Dashboards
          </span>
        </button>

        {/* 8. Links */}
        <button
          type="button"
          onClick={(e) => handleAppClick('links', e)}
          className="flex flex-col items-center group focus:outline-none"
        >
          <div className="w-[54px] h-[54px] rounded-[18px] bg-[#7CF2C9] text-[#0B0F14] flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-transform">
            <LinkIcon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-medium text-[#E8EDF2] mt-1 tracking-tight truncate max-w-[64px]">
            Links
          </span>
        </button>

      </div>

      {/* DOCK (4 stark monochrome circular icons matching reference device) */}
      <div className="relative z-10 pt-2 border-t border-white/5">
        <div className="grid grid-cols-4 gap-2 items-center justify-items-center">
          
          {/* Dock 1: App Drawer */}
          <button
            type="button"
            onClick={toggleDrawer}
            className="flex flex-col items-center group focus:outline-none"
            aria-label="Open App Drawer"
            title="App Drawer"
          >
            <div className="w-[52px] h-[52px] rounded-full bg-white text-[#0B0F14] flex items-center justify-center shadow-lg group-hover:scale-105 active:scale-95 transition-transform">
              <GridIcon className="w-6 h-6" />
            </div>
          </button>

          {/* Dock 2: Contact */}
          <button
            type="button"
            onClick={(e) => handleAppClick('contact', e)}
            className="flex flex-col items-center group focus:outline-none"
            aria-label="Contact App"
            title="Contact"
          >
            <div className="w-[52px] h-[52px] rounded-full bg-white text-[#0B0F14] flex items-center justify-center shadow-lg group-hover:scale-105 active:scale-95 transition-transform">
              <MailIcon className="w-6 h-6" />
            </div>
          </button>

          {/* Dock 3: Resume */}
          <button
            type="button"
            onClick={(e) => handleAppClick('resume', e)}
            className="flex flex-col items-center group focus:outline-none"
            aria-label="Resume App"
            title="Resume"
          >
            <div className="w-[52px] h-[52px] rounded-full bg-white text-[#0B0F14] flex items-center justify-center shadow-lg group-hover:scale-105 active:scale-95 transition-transform">
              <FileTextIcon className="w-6 h-6" />
            </div>
          </button>

          {/* Dock 4: GitHub */}
          <button
            type="button"
            onClick={(e) => handleAppClick('github', e)}
            className="flex flex-col items-center group focus:outline-none"
            aria-label="GitHub App"
            title="GitHub"
          >
            <div className="w-[52px] h-[52px] rounded-full bg-white text-[#0B0F14] flex items-center justify-center shadow-lg group-hover:scale-105 active:scale-95 transition-transform">
              <GithubIcon className="w-6 h-6" />
            </div>
          </button>

        </div>
      </div>

    </div>
  );
};
