import React, { useState, useEffect } from 'react';
import { usePhone } from '../../context/PhoneContext';
import { StatusBar } from './StatusBar';
import { AppIcon } from './AppIcon';
import { 
  UserIcon, 
  FolderIcon, 
  CpuIcon, 
  BriefcaseIcon, 
  BookOpenIcon, 
  FileTextIcon, 
  TerminalIcon, 
  SettingsIcon, 
  GithubIcon, 
  MailIcon 
} from '../../ui/Icons';

export const HomeScreen = () => {
  const { activeWallpaper } = usePhone();
  const [time, setTime] = useState('10:30');
  const [dateInfo, setDateInfo] = useState({ day: 'MON', date: '02', month: 'NOV' });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setTime(`${h}:${m}`);

      const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      setDateInfo({
        day: days[now.getDay()],
        date: String(now.getDate()).padStart(2, '0'),
        month: months[now.getMonth()],
      });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Wallpaper backgrounds (Monochrome Nothing OS aesthetic)
  const getWallpaperClass = () => {
    switch (activeWallpaper) {
      case 'obsidian':
        return 'bg-[#080a0f]';
      case 'silver':
        return 'bg-[#151a22]';
      case 'carbon':
        return 'bg-[#0e1219]';
      case 'graphite':
        return 'bg-[#1a212c]';
      default:
        return 'bg-[#080a0f]';
    }
  };

  return (
    <div className={`relative w-full h-full flex flex-col justify-between ${getWallpaperClass()} text-[#E8EDF2] p-4 pt-1.5 pb-3 select-none overflow-hidden transition-colors duration-500 font-sans`}>
      
      {/* 1. Status Bar */}
      <StatusBar />

      {/* Subtle Monochrome Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      {/* 2. Clock & Date Bento Widgets */}
      <div className="relative z-10 grid grid-cols-2 gap-2.5 mt-2 mb-1">
        
        {/* Widget 1: Digital Clock Widget */}
        <div className="bg-[#121620]/90 border border-[#202937] rounded-[24px] p-3.5 shadow-md flex flex-col justify-between">
          <span className="font-mono text-[10px] text-[#626e7e] uppercase tracking-wider">
            LOCAL TIME
          </span>
          <span className="font-mono text-[34px] font-bold text-[#F0F4F8] leading-none tracking-tight my-1">
            {time}
          </span>
          <div className="flex items-center space-x-1.5 text-[10px] font-mono text-[#7CF2C9]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7CF2C9] animate-pulse" />
            <span>IST · Bengaluru</span>
          </div>
        </div>

        {/* Widget 2: Date & Status Widget */}
        <div className="bg-[#121620]/90 border border-[#202937] rounded-[24px] p-3.5 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#626e7e] uppercase tracking-wider">
              CALENDAR
            </span>
            <span className="w-2 h-2 rounded-full bg-[#FF453A]" />
          </div>

          <div className="flex items-baseline space-x-1.5 my-1">
            <span className="font-mono text-[32px] font-bold text-[#F0F4F8] leading-none">
              {dateInfo.date}
            </span>
            <span className="font-mono text-xs font-bold text-[#7CF2C9]">
              {dateInfo.day}
            </span>
          </div>

          <span className="font-mono text-[10px] text-[#9AA6B2] uppercase tracking-wider">
            {dateInfo.month} 2026
          </span>
        </div>

      </div>

      {/* 3. 8 Nothing-Inspired Monochrome App Icons Grid */}
      <div className="relative z-10 grid grid-cols-4 gap-y-3.5 gap-x-2 px-1 my-auto">
        <AppIcon id="about" label="About" icon={UserIcon} />
        <AppIcon id="projects" label="Projects" icon={FolderIcon} badge />
        <AppIcon id="skills" label="Skills" icon={CpuIcon} />
        <AppIcon id="experience" label="Timeline" icon={BriefcaseIcon} />
        <AppIcon id="case-studies" label="Studies" icon={BookOpenIcon} />
        <AppIcon id="resume" label="Resume" icon={FileTextIcon} />
        <AppIcon id="terminal" label="Terminal" icon={TerminalIcon} />
        <AppIcon id="settings" label="Settings" icon={SettingsIcon} />
      </div>

      {/* 4. App Page Indicators */}
      <div className="relative z-10 flex items-center justify-center space-x-1.5 my-1">
        <span className="w-1.5 h-1.5 rounded-full bg-white" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
      </div>

      {/* 5. Minimal Dock with 4 Core Apps */}
      <div className="relative z-10 bg-[#121620]/80 backdrop-blur-md border border-[#202937] rounded-[26px] p-2 px-3 shadow-lg flex items-center justify-around">
        <AppIcon id="terminal" label="CLI" icon={TerminalIcon} shape="circle" />
        <AppIcon id="projects" label="Work" icon={FolderIcon} shape="circle" />
        <AppIcon id="github" label="GitHub" icon={GithubIcon} shape="circle" />
        <AppIcon id="contact" label="Contact" icon={MailIcon} shape="circle" badge />
      </div>

    </div>
  );
};

export default HomeScreen;
