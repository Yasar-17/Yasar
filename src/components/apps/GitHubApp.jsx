import React from 'react';
import { AppWindow } from '../screen/AppWindow';
import { GithubIcon, ExternalLinkIcon, GitBranchIcon } from '../../ui/Icons';
import { PROFILE, PROJECTS } from '../../data';

export const GitHubApp = () => {
  const headerAction = (
    <a
      href={PROFILE.github}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[#1b222d] hover:bg-[#253040] text-xs font-mono text-[#7CF2C9] border border-[#263447] transition-all"
    >
      <span>Open Profile</span>
      <ExternalLinkIcon className="w-3 h-3" />
    </a>
  );

  return (
    <AppWindow title="GitHub" subtitle={PROFILE.handle} headerAction={headerAction}>
      {/* Profile Card */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm flex items-center space-x-3.5">
        <div className="w-12 h-12 rounded-full bg-[#1b222d] border border-[#2d3848] flex items-center justify-center text-[#7CF2C9] shrink-0">
          <GithubIcon className="w-6 h-6" />
        </div>
        <div className="overflow-hidden">
          <h3 className="font-grotesk text-sm font-bold text-[#F0F4F8] leading-tight">
            {PROFILE.name}
          </h3>
          <p className="font-mono text-xs text-[#7CF2C9]">{PROFILE.handle}</p>
          <p className="text-[11px] text-[#9AA6B2] mt-0.5">
            {PROFILE.headline}
          </p>
        </div>
      </div>

      {/* Verified Stack Distribution */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#7CF2C9] font-semibold block">
          Primary Ecosystems
        </span>
        <div className="w-full h-2 rounded-full bg-[#0e1219] overflow-hidden flex">
          <div className="h-full bg-[#3572A5]" style={{ width: '45%' }} title="Python" />
          <div className="h-full bg-[#3178C6]" style={{ width: '30%' }} title="TypeScript" />
          <div className="h-full bg-[#F7DF1E]" style={{ width: '15%' }} title="JavaScript" />
          <div className="h-full bg-[#06B6D4]" style={{ width: '10%' }} title="Tailwind / HTML" />
        </div>
        <div className="grid grid-cols-2 gap-2 font-mono text-[11px] text-[#9AA6B2] pt-1">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3572A5]" />
            <span>Python (ML & Telemetry)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#3178C6]" />
            <span>TypeScript (Web & Agents)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#F7DF1E]" />
            <span>JavaScript (Web & 3D)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#06B6D4]" />
            <span>Tailwind CSS & HTML5</span>
          </div>
        </div>
      </div>

      {/* Verified Repositories */}
      <div className="space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#626e7e] px-1 block">
          Public Repositories
        </span>

        <div className="space-y-2">
          {PROJECTS.map((repo) => (
            <div key={repo.id} className="bg-[#141820] border border-[#232c3a] rounded-[18px] p-3.5 space-y-2">
              <div className="flex items-start justify-between">
                <a
                  href={repo.repoUrl || PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs font-bold text-[#E8EDF2] hover:text-[#7CF2C9] transition-colors flex items-center space-x-1.5"
                >
                  <GitBranchIcon className="w-3.5 h-3.5 text-[#7CF2C9]" />
                  <span>{repo.title}</span>
                </a>
                <span className="font-mono text-[10px] text-[#7CF2C9] bg-[#1a2330] px-2 py-0.5 rounded-full border border-[#263447]">
                  {repo.status}
                </span>
              </div>

              <p className="text-xs text-[#9AA6B2] leading-snug">
                {repo.desc}
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-[#1f2633] font-mono text-[10px]">
                <div className="flex flex-wrap gap-1">
                  {repo.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-[#C5CED8] bg-[#0e1219] px-1.5 py-0.5 rounded border border-[#1b222d]">
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={repo.repoUrl || PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#7CF2C9] hover:underline flex items-center space-x-1 shrink-0"
                >
                  <span>Repository</span>
                  <ExternalLinkIcon className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppWindow>
  );
};

export default GitHubApp;
