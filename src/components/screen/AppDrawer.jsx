import React, { useState, useMemo } from 'react';
import { usePhone } from '../../context/PhoneContext';
import { 
  SearchIcon, CloseIcon,
  FolderIcon, BookOpenIcon, CpuIcon, BriefcaseIcon, FileTextIcon, 
  MailIcon, GithubIcon, UserIcon, TerminalIcon, SettingsIcon
} from '../../ui/Icons';
import { StatusBar } from './StatusBar';
import { Navigation } from './Navigation';

export const AppDrawer = () => {
  const { isDrawerOpen, setIsDrawerOpen, openApp } = usePhone();
  const [query, setQuery] = useState('');

  const allApps = [
    { id: 'about', name: 'About', icon: UserIcon },
    { id: 'projects', name: 'Projects', icon: FolderIcon },
    { id: 'skills', name: 'Skills', icon: CpuIcon },
    { id: 'experience', name: 'Experience', icon: BriefcaseIcon },
    { id: 'case-studies', name: 'Case Studies', icon: BookOpenIcon },
    { id: 'github', name: 'GitHub', icon: GithubIcon },
    { id: 'terminal', name: 'Terminal', icon: TerminalIcon },
    { id: 'resume', name: 'Resume', icon: FileTextIcon },
    { id: 'contact', name: 'Contact', icon: MailIcon },
    { id: 'settings', name: 'Settings', icon: SettingsIcon },
  ];

  const filteredApps = useMemo(() => {
    if (!query.trim()) return allApps;
    return allApps.filter((a) => a.name.toLowerCase().includes(query.toLowerCase()));
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
      className="absolute inset-0 z-40 bg-[#080b10]/95 backdrop-blur-xl flex flex-col justify-between p-4 pt-1.5 pb-2 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-200 select-none font-sans"
    >
      <StatusBar />

      {/* Search Bar Header */}
      <div className="flex items-center space-x-2 my-2">
        <div className="flex-1 bg-[#141820] border border-[#232c3a] rounded-xl px-3 py-2 flex items-center space-x-2 text-xs font-mono">
          <SearchIcon className="w-4 h-4 text-[#626e7e]" />
          <input
            type="text"
            placeholder="Search applications..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-[#E8EDF2] placeholder-[#626e7e] focus:outline-none"
            autoFocus
          />
        </div>
        <button
          type="button"
          onClick={() => setIsDrawerOpen(false)}
          className="p-2 rounded-xl bg-[#141820] hover:bg-[#1b222d] border border-[#232c3a] text-[#9AA6B2] hover:text-white transition-colors"
          aria-label="Close Drawer"
        >
          <CloseIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of Apps */}
      <div className="flex-1 overflow-y-auto py-2 grid grid-cols-4 gap-y-4 gap-x-2">
        {filteredApps.map((app) => {
          const Icon = app.icon;
          return (
            <button
              key={app.id}
              type="button"
              onClick={(e) => handleAppClick(app.id, e)}
              className="flex flex-col items-center group focus:outline-none"
            >
              <div className="w-[52px] h-[52px] rounded-[18px] bg-[#141820] border border-[#232c3a] group-hover:border-[#38465c] text-white flex items-center justify-center shadow-md transition-colors group-hover:scale-105 active:scale-95">
                <Icon className="w-5 h-5 text-[#E8EDF2] group-hover:text-[#7CF2C9] transition-colors" />
              </div>
              <span className="font-mono text-[10px] text-[#9AA6B2] group-hover:text-[#E8EDF2] mt-1.5 truncate max-w-[62px]">
                {app.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom Home Pill */}
      <Navigation />
    </div>
  );
};

export default AppDrawer;
