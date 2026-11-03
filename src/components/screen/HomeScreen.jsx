import React, { useState, useEffect } from 'react';
import { usePhone } from '../../context/PhoneContext';
import { StatusBar } from './StatusBar';
import { AppIcon } from './AppIcon';
import { PROFILE } from '../../data';
import { GITHUB_ACTIVITY } from '../../data/githubContributions';
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
  MailIcon,
  ExternalLinkIcon 
} from '../../ui/Icons';

export const HomeScreen = () => {
  const { activeWallpaper, openApp } = usePhone();
  const [time, setTime] = useState('16:20');
  const [dateInfo, setDateInfo] = useState({ day: 'TUE', date: '03', month: 'NOV', year: '2026' });

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
        year: String(now.getFullYear()),
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
    <div className={`relative w-full h-full flex flex-col justify-between ${getWallpaperClass()} text-[#E8EDF2] p-3 sm:p-3.5 pt-1 pb-2 safe-bottom select-none overflow-hidden transition-colors duration-500 font-sans`}>
      
      {/* 1. Status Bar */}
      <StatusBar />

      {/* Subtle Environmental Grid Texture */}
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

      {/* 2. TOP BENTO WIDGETS SECTION (prsd.dev style adapted for Nothing OS) */}
      <div className="relative z-10 home-widgets my-0.5">
        
        {/* Widget A: GitHub 16-Week Activity Heatmap */}
        <button
          type="button"
          onClick={() => openApp('github')}
          className="github-widget text-left group cursor-pointer focus:outline-none"
          aria-label={`GitHub contributions, 16 weeks ending today. Total ${GITHUB_ACTIVITY.totalContributions} contributions.`}
        >
          <div className="github-widget-heading">
            <GithubIcon className="w-3.5 h-3.5 text-[#E8EDF2] group-hover:text-[#7CF2C9] transition-colors" />
            <span className="font-mono tracking-tight text-[#E8EDF2] group-hover:text-white">GitHub Activity</span>
            <small>16 wks · @{GITHUB_ACTIVITY.username}</small>
          </div>

          {/* 16-Week Heatmap Grid (112 tiles) */}
          <div className="contribution-grid" aria-hidden="true">
            {GITHUB_ACTIVITY.days.map((d) => (
              <i 
                key={d.date} 
                data-level={d.level} 
                title={`${d.date}: ${d.level > 0 ? `${d.level * 2} commits` : 'No contributions'}`}
              />
            ))}
          </div>
        </button>

        {/* Widgets Row B: Local Time Widget + Availability / Quick Contact Widget */}
        <div className="widgets-row">
          
          {/* Sub-widget 1: Bengaluru Local Time */}
          <div className="time-widget">
            <span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#7CF2C9] animate-pulse shrink-0" />
              <span>IST · Bengaluru</span>
            </span>
            <strong>{time}</strong>
            <small>{dateInfo.day}, {dateInfo.month} {dateInfo.date}</small>
          </div>

          {/* Sub-widget 2: Availability & Direct Contact Trigger */}
          <button
            type="button"
            onClick={() => openApp('contact')}
            className="call-widget focus:outline-none group"
            aria-label="Direct contact and availability status"
          >
            <div className="call-head">
              <span className="call-badge">Status</span>
              <small>Available</small>
            </div>
            <div className="call-event">
              <strong>Open for roles</strong>
              <span>AI/ML & Frontend</span>
            </div>
          </button>

        </div>

      </div>

      {/* 3. 8 Nothing-Inspired Monochrome App Icons Grid */}
      <nav className="relative z-10 grid grid-cols-4 gap-y-2 gap-x-1.5 px-0.5 my-auto" aria-label="Applications">
        <AppIcon id="about" label="About" icon={UserIcon} />
        <AppIcon id="projects" label="Projects" icon={FolderIcon} badge />
        <AppIcon id="skills" label="Skills" icon={CpuIcon} />
        <AppIcon id="experience" label="Timeline" icon={BriefcaseIcon} />
        <AppIcon id="case-studies" label="Studies" icon={BookOpenIcon} />
        <AppIcon id="resume" label="Resume" icon={FileTextIcon} />
        <AppIcon id="terminal" label="Terminal" icon={TerminalIcon} />
        <AppIcon id="settings" label="Settings" icon={SettingsIcon} />
      </nav>

      {/* 4. Minimal Dock with 4 Core Apps */}
      <nav className="relative z-10 bg-[#121620]/80 backdrop-blur-md border border-[#202937] rounded-[24px] sm:rounded-[26px] p-1.5 px-2.5 shadow-lg flex items-center justify-around" aria-label="Quick Dock">
        <AppIcon id="terminal" label="CLI" icon={TerminalIcon} shape="circle" />
        <AppIcon id="projects" label="Work" icon={FolderIcon} shape="circle" />
        <AppIcon id="github" label="GitHub" icon={GithubIcon} shape="circle" />
        <AppIcon id="contact" label="Contact" icon={MailIcon} shape="circle" badge />
      </nav>

    </div>
  );
};

export default HomeScreen;
