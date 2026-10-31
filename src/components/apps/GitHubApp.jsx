import React from 'react';
import { usePhone } from '../../context/PhoneContext';
import { ArrowLeftIcon, GithubIcon, ExternalLinkIcon, GitBranchIcon, SparklesIcon } from '../../ui/Icons';

export const GitHubApp = () => {
  const { closeApp } = usePhone();

  const repos = [
    {
      name: 'Yasar',
      desc: 'Interactive 3D smartphone portfolio built with React, Vite, Framer Motion, and Tailwind CSS.',
      lang: 'JavaScript / React',
      stars: '[N]',
      forks: '[N]',
      isPrimary: true,
    },
    {
      name: 'SIH26162-classifier',
      desc: 'Spatial anomaly filtering pipeline using NASA FIRMS satellite data and OpenStreetMap vector nodes.',
      lang: 'Python',
      stars: '[N]',
      forks: '[N]',
      isPrimary: true,
    },
    {
      name: 'zenny-studios-web',
      desc: 'Modern responsive architecture portfolio client site.',
      lang: 'HTML / CSS / JS',
      stars: '[N]',
      forks: '[N]',
      isPrimary: true,
    },
  ];

  return (
    <div className="w-full h-full bg-[#0B0F14] text-[#E8EDF2] flex flex-col justify-between p-4 pt-12 pb-6 overflow-hidden">
      
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-[#1B222B] pb-3">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={closeApp}
            className="w-9 h-9 rounded-full bg-[#151B23] border border-[#1B222B] text-[#9AA6B2] hover:text-[#E8EDF2] flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Back to Home"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <GithubIcon className="w-5 h-5 text-[#E8EDF2]" />
            <h2 className="font-grotesk text-[17px] font-semibold text-[#E8EDF2] leading-none">
              GitHub
            </h2>
          </div>
        </div>

        <a
          href="https://github.com/Yasar-17"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-[11px] font-medium text-[#7CF2C9] px-2.5 py-1 bg-[#151B23] border border-[#1B222B] rounded-full hover:bg-[#1f2933]"
        >
          <span>Open Profile</span>
          <ExternalLinkIcon className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 py-3 pr-0.5">
        
        {/* Profile Card */}
        <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-full bg-[#1F2933] border border-[#2B3542] flex items-center justify-center text-[#7CF2C9]">
            <GithubIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-grotesk text-[16px] font-bold text-[#E8EDF2] leading-tight">
              Yasar
            </h3>
            <p className="text-[11px] text-[#9AA6B2] font-mono">@Yasar-17</p>
            <p className="text-[12px] text-[#C5CED8] mt-1">Data analyst and builder | 3rd-year B.Tech AI & DS</p>
          </div>
        </div>

        {/* Language Breakdown */}
        <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#7CF2C9] block mb-2 font-medium">
            Language Composition
          </span>
          <div className="w-full h-2 rounded-full bg-[#1F2933] overflow-hidden flex mb-2">
            <div className="h-full bg-[#7CF2C9]" style={{ width: '45%' }} title="Python 45%" />
            <div className="h-full bg-[#8AB4FF]" style={{ width: '35%' }} title="JavaScript 35%" />
            <div className="h-full bg-[#FFB86B]" style={{ width: '15%' }} title="SQL 15%" />
            <div className="h-full bg-[#C9B8FF]" style={{ width: '5%' }} title="HTML/CSS 5%" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#9AA6B2]">
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
              <span className="w-2 h-2 rounded-full bg-[#C9B8FF]" />
              <span>HTML/CSS 5%</span>
            </div>
          </div>
        </div>

        {/* Repositories */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#9AA6B2] px-1 block">
            Featured Repositories
          </span>

          {repos.map((r, i) => (
            <a
              key={i}
              href={`https://github.com/Yasar-17/${r.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#151B23] hover:bg-[#1a232e] border border-[#1B222B] rounded-[20px] p-3.5 transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-grotesk text-[14px] font-semibold text-[#8AB4FF]">
                  {r.name}
                </span>
                <span className="text-[10px] font-mono text-[#7CF2C9] bg-[#1F2933] px-2 py-0.5 rounded-full">
                  Public
                </span>
              </div>
              <p className="text-[12px] text-[#C5CED8] leading-snug mb-2">
                {r.desc}
              </p>
              <div className="flex items-center space-x-3 text-[11px] font-mono text-[#9AA6B2]">
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-[#7CF2C9]" />
                  <span>{r.lang}</span>
                </div>
                <span>Stars: {r.stars}</span>
                <span>Forks: {r.forks}</span>
              </div>
            </a>
          ))}
        </div>

      </div>

      {/* FOOTER */}
      <div className="pt-3 border-t border-[#1B222B] flex items-center justify-between">
        <span className="text-[11px] font-mono text-[#9AA6B2]">
          Total Repositories: [N]
        </span>
        <button
          type="button"
          onClick={closeApp}
          className="bg-[#7CF2C9] text-[#0B0F14] text-[12px] font-semibold px-4 py-2 rounded-full hover:bg-[#6ee0b8]"
        >
          Close
        </button>
      </div>

    </div>
  );
};
