import React from 'react';
import { AppWindow } from '../screen/AppWindow';
import { GithubIcon, ExternalLinkIcon, GitBranchIcon } from '../../ui/Icons';

export const GitHubApp = () => {
  const repos = [
    {
      name: 'Portfolio',
      desc: 'Interactive 3D unibody smartphone portfolio running on Three.js WebGL and custom operating system.',
      lang: 'JavaScript / Three.js',
      langColor: '#7CF2C9',
      stars: 18,
      forks: 3,
    },
    {
      name: 'SIH26162-wildfire-classifier',
      desc: 'Geospatial thermal anomaly detection pipeline using NASA FIRMS telemetry and OpenStreetMap vector topology.',
      lang: 'Python',
      langColor: '#3572A5',
      stars: 12,
      forks: 4,
    },
    {
      name: 'zenny-studios-platform',
      desc: 'Modern responsive architecture portfolio client site with optimized media pipelines.',
      lang: 'React / Tailwind',
      langColor: '#8AB4FF',
      stars: 8,
      forks: 1,
    },
    {
      name: 'spatial-telemetry-etl',
      desc: 'High-throughput sensor anomaly extraction and automated noise suppression routines.',
      lang: 'Python / SQL',
      langColor: '#FFB86B',
      stars: 6,
      forks: 2,
    },
  ];

  const headerAction = (
    <a
      href="https://github.com/Yasar-17"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[#1b222d] hover:bg-[#253040] text-xs font-mono text-[#7CF2C9] border border-[#263447] transition-all"
    >
      <span>Open Profile</span>
      <ExternalLinkIcon className="w-3 h-3" />
    </a>
  );

  return (
    <AppWindow title="GitHub" subtitle="@Yasar-17" headerAction={headerAction}>
      {/* Profile Card */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm flex items-center space-x-3.5">
        <div className="w-12 h-12 rounded-full bg-[#1b222d] border border-[#2d3848] flex items-center justify-center text-[#7CF2C9] shrink-0">
          <GithubIcon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-grotesk text-sm font-bold text-[#F0F4F8] leading-tight">
            Mohammed Yasar
          </h3>
          <p className="font-mono text-xs text-[#7CF2C9]">@Yasar-17</p>
          <p className="text-[11px] text-[#9AA6B2] mt-0.5">
            Data analyst & builder | B.Tech AI & Data Science
          </p>
        </div>
      </div>

      {/* Language Breakdown */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#7CF2C9] font-semibold block">
          Language Breakdown
        </span>
        <div className="w-full h-2 rounded-full bg-[#0e1219] overflow-hidden flex">
          <div className="h-full bg-[#7CF2C9]" style={{ width: '45%' }} title="Python 45%" />
          <div className="h-full bg-[#8AB4FF]" style={{ width: '35%' }} title="JavaScript 35%" />
          <div className="h-full bg-[#FFB86B]" style={{ width: '15%' }} title="SQL 15%" />
          <div className="h-full bg-[#A78BFA]" style={{ width: '5%' }} title="Other 5%" />
        </div>
        <div className="grid grid-cols-2 gap-2 font-mono text-[11px] text-[#9AA6B2] pt-1">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#7CF2C9]" />
            <span>Python 45%</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#8AB4FF]" />
            <span>JavaScript 35%</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FFB86B]" />
            <span>SQL 15%</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#A78BFA]" />
            <span>HTML/CSS 5%</span>
          </div>
        </div>
      </div>

      {/* Repositories */}
      <div className="space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#626e7e] px-1 block">
          Repositories
        </span>

        <div className="space-y-2">
          {repos.map((repo) => (
            <div key={repo.name} className="bg-[#141820] border border-[#232c3a] rounded-[18px] p-3.5 space-y-2">
              <div className="flex items-start justify-between">
                <a
                  href={`https://github.com/Yasar-17/${repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs font-bold text-[#E8EDF2] hover:text-[#7CF2C9] transition-colors flex items-center space-x-1.5"
                >
                  <GitBranchIcon className="w-3.5 h-3.5 text-[#7CF2C9]" />
                  <span>{repo.name}</span>
                </a>
                <div className="flex items-center space-x-2 font-mono text-[10px] text-[#626e7e]">
                  <span>{repo.stars} stars</span>
                  <span>{repo.forks} forks</span>
                </div>
              </div>

              <p className="text-xs text-[#9AA6B2] leading-snug">
                {repo.desc}
              </p>

              <div className="flex items-center space-x-2 pt-1 border-t border-[#1f2633] font-mono text-[10px]">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.langColor }} />
                <span className="text-[#C5CED8]">{repo.lang}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppWindow>
  );
};

export default GitHubApp;
