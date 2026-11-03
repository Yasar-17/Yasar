import React, { useState } from 'react';
import { usePhone } from '../../context/PhoneContext';
import { AppWindow } from '../screen/AppWindow';
import { ExternalLinkIcon, GithubIcon, ArrowRightIcon } from '../../ui/Icons';
import { playSound } from '../../audio/soundEngine';
import { PROJECTS } from '../../data';

export const ProjectsApp = () => {
  const { soundEnabled, openApp } = usePhone();
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  return (
    <AppWindow title="Projects" subtitle="Verified Repositories & Deployments">
      {/* Category Filter Chips */}
      <div className="flex items-center space-x-1.5 bg-[#141820] border border-[#232c3a] rounded-xl p-1 mb-1">
        {[
          { id: 'all', label: 'All' },
          { id: 'ai', label: 'AI & Agents' },
          { id: 'data', label: 'Data & ML' },
          { id: 'web', label: 'Web Apps' },
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => { setFilter(cat.id); playSound('tick', soundEnabled); }}
            className={`flex-1 py-1.5 px-1.5 rounded-lg font-mono text-[11px] transition-all text-center ${
              filter === cat.id
                ? 'bg-[#232d3d] text-[#7CF2C9] font-bold shadow-sm'
                : 'text-[#9AA6B2] hover:text-[#E8EDF2]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="space-y-3">
        {filteredProjects.map((p) => (
          <div key={p.id} className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm flex flex-col justify-between space-y-2.5">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[10px] text-[#7CF2C9] bg-[#1a2330] px-2 py-0.5 rounded-full border border-[#263447] font-medium">
                  {p.status}
                </span>
                <span className="font-mono text-[10px] text-[#626e7e]">
                  {p.categoryLabel}
                </span>
              </div>

              <h3 className="font-grotesk text-sm font-bold text-[#F0F4F8] leading-tight mb-1.5">
                {p.title}
              </h3>

              <div className="flex flex-wrap gap-1 mb-2">
                {p.technologies.map((t, i) => (
                  <span key={i} className="font-mono text-[10px] bg-[#0e1219] text-[#9AA6B2] px-2 py-0.5 rounded border border-[#1b222d]">
                    {t}
                  </span>
                ))}
              </div>

              <p className="text-xs text-[#C5CED8] leading-relaxed">
                {p.desc}
              </p>
            </div>

            <div className="pt-2 border-t border-[#1f2633] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#7CF2C9] hover:underline flex items-center space-x-1"
                  >
                    <span>Live Site</span>
                    <ExternalLinkIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                {p.id === 'sih-26' && (
                  <button
                    type="button"
                    onClick={() => openApp('case-studies')}
                    className="text-xs font-mono text-[#FFB86B] hover:underline flex items-center space-x-1"
                  >
                    <span>Telemetry</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {p.repoUrl && (
                <a
                  href={p.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-[#0e1219] hover:bg-[#181f2b] border border-[#1b222d] text-[#9AA6B2] hover:text-[#E8EDF2] transition-colors font-mono text-[11px]"
                  aria-label={`View ${p.title} repository on GitHub`}
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Code</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </AppWindow>
  );
};

export default ProjectsApp;
