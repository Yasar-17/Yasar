import React, { useState, useMemo } from 'react';
import { usePhone } from '../../context/PhoneContext';
import { 
  SearchIcon, CloseIcon,
  FolderIcon, BookOpenIcon, CpuIcon, BriefcaseIcon, FileTextIcon, 
  MailIcon, GithubIcon, LinkIcon, BarChartIcon, GraduationCapIcon, 
  GitBranchIcon, UserIcon, TerminalIcon, SettingsIcon
} from '../../ui/Icons';

export const AppDrawer = () => {
  const { isDrawerOpen, setIsDrawerOpen, openApp } = usePhone();
  const [query, setQuery] = useState('');

  const allApps = [
    { id: 'about', name: 'About', icon: UserIcon, bg: 'bg-[#7CF2C9]', fg: 'text-[#0B0F14]' },
    { id: 'case-studies', name: 'Case Studies', icon: BookOpenIcon, bg: 'bg-[#8AB4FF]', fg: 'text-[#0B0F14]' },
    { id: 'contact', name: 'Contact', icon: MailIcon, bg: 'bg-[#FFB86B]', fg: 'text-[#0B0F14]' },
    { id: 'dashboards', name: 'Dashboards', icon: BarChartIcon, bg: 'bg-[#8AB4FF]', fg: 'text-[#0B0F14]' },
    { id: 'experience', name: 'Experience', icon: BriefcaseIcon, bg: 'bg-[#F4A0C0]', fg: 'text-[#0B0F14]' },
    { id: 'github', name: 'GitHub', icon: GithubIcon, bg: 'bg-[#151B23]', fg: 'text-[#E8EDF2]', border: 'border border-[#2B3542]' },
    { id: 'learning', name: 'Learning', icon: GraduationCapIcon, bg: 'bg-[#C9B8FF]', fg: 'text-[#0B0F14]' },
    { id: 'links', name: 'Links', icon: LinkIcon, bg: 'bg-[#7CF2C9]', fg: 'text-[#0B0F14]' },
    { id: 'opensource', name: 'Open Source', icon: GitBranchIcon, bg: 'bg-[#FFB86B]', fg: 'text-[#0B0F14]' },
    { id: 'projects', name: 'Projects', icon: FolderIcon, bg: 'bg-[#FFB86B]', fg: 'text-[#0B0F14]' },
    { id: 'resume', name: 'Resume', icon: FileTextIcon, bg: 'bg-[#7CF2C9]', fg: 'text-[#0B0F14]' },
    { id: 'skills', name: 'Skills', icon: CpuIcon, bg: 'bg-[#7CF2C9]', fg: 'text-[#0B0F14]' },
    { id: 'terminal', name: 'Terminal', icon: TerminalIcon, bg: 'bg-[#1E293B]', fg: 'text-[#7CF2C9]', border: 'border border-[#334155]' },
    { id: 'settings', name: 'Settings', icon: SettingsIcon, bg: 'bg-[#C9B8FF]', fg: 'text-[#0B0F14]' },
  ];

  const filteredApps = useMemo(() => {
    if (!query.trim()) return allApps;
    return allApps.filter(a => a.name.toLowerCase().includes(query.toLowerCase()));
  }, [query, allApps]);

  if (!isDrawerOpen) return null;

  const handleAppClick = (appId, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    openApp(appId, {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    });
  };

  return (
    <div 
      className="absolute inset-0 z-40 bg-[#0B0F14]/95 backdrop-blur-xl flex flex-col justify-between p-5 pt-12 pb-6 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-200"
    >
      {/* HEADER: Search & Close Button */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="flex-1 flex items-center space-x-2 bg-[#151B23] border border-[#1B222B] rounded-full px-4 py-2">
          <SearchIcon className="w-4 h-4 text-[#9AA6B2]" />
          <input 
            type="text" 
            placeholder="Search all apps..." 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent text-[13px] text-[#E8EDF2] focus:outline-none w-full placeholder-[#9AA6B2]"
            autoFocus
          />
        </div>

        <button
          type="button"
          onClick={() => setIsDrawerOpen(false)}
          className="w-9 h-9 rounded-full bg-[#151B23] border border-[#1B222B] text-[#9AA6B2] hover:text-[#E8EDF2] flex items-center justify-center transition-colors"
          aria-label="Close App Drawer"
        >
          <CloseIcon className="w-4 h-4" />
        </button>
      </div>

      {/* START HERE FOR INTERVIEWS BANNER */}
      {!query && (
        <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#7CF2C9] font-medium">
              Start Here For Interviews
            </span>
            <span className="text-[10px] text-[#9AA6B2]">Curated Path</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={(e) => handleAppClick('case-studies', e)}
              className="bg-[#1F2933] hover:bg-[#25323e] border border-[#2B3542] rounded-[16px] py-2 px-1 text-center transition-colors focus:outline-none"
            >
              <span className="text-[11px] font-medium text-[#E8EDF2] block">Case Studies</span>
              <span className="text-[9px] text-[#9AA6B2] block">SIH26162</span>
            </button>

            <button
              type="button"
              onClick={(e) => handleAppClick('projects', e)}
              className="bg-[#1F2933] hover:bg-[#25323e] border border-[#2B3542] rounded-[16px] py-2 px-1 text-center transition-colors focus:outline-none"
            >
              <span className="text-[11px] font-medium text-[#E8EDF2] block">Projects</span>
              <span className="text-[9px] text-[#9AA6B2] block">Zenny Studios</span>
            </button>

            <button
              type="button"
              onClick={(e) => handleAppClick('resume', e)}
              className="bg-[#1F2933] hover:bg-[#25323e] border border-[#2B3542] rounded-[16px] py-2 px-1 text-center transition-colors focus:outline-none"
            >
              <span className="text-[11px] font-medium text-[#E8EDF2] block">Resume</span>
              <span className="text-[9px] text-[#9AA6B2] block">B.Tech AI & DS</span>
            </button>
          </div>
        </div>
      )}

      {/* 4-COLUMN ALL APPS GRID */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="grid grid-cols-4 gap-y-4 gap-x-2 py-2">
          {filteredApps.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                type="button"
                onClick={(e) => handleAppClick(app.id, e)}
                className="flex flex-col items-center group focus:outline-none"
              >
                <div className={`w-[52px] h-[52px] rounded-[18px] ${app.bg} ${app.fg} ${app.border || ''} flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-medium text-[#E8EDF2] mt-1.5 text-center leading-tight truncate max-w-[68px]">
                  {app.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* BOTTOM PULL-DOWN HANDLE */}
      <div 
        onClick={() => setIsDrawerOpen(false)}
        className="flex flex-col items-center pt-2 cursor-pointer group"
      >
        <div className="w-[36px] h-[4px] rounded-full bg-[#1F2933] group-hover:bg-[#7CF2C9] transition-colors" />
      </div>

    </div>
  );
};
