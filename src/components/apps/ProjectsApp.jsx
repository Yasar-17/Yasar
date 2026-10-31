import React, { useState } from 'react';
import { usePhone } from '../../context/PhoneContext';
import { ArrowLeftIcon, ExternalLinkIcon, GithubIcon, FolderIcon } from '../../ui/Icons';
import { playSound } from '../../audio/soundEngine';

export const ProjectsApp = () => {
  const { closeApp, soundEnabled, openApp } = usePhone();
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 'zenny',
      title: 'Zenny Studios Client Site',
      category: 'web',
      tags: ['HTML', 'Tailwind CSS', 'JavaScript'],
      tagColor: 'text-[#FFB86B]',
      desc: 'Live production client site crafted for an architecture and creative portfolio showcase. Built with fluid layouts, minimal layout shift, and clean typography.',
      status: 'Live in Production',
      isReal: true,
      linkText: 'View Case Study',
      action: () => openApp('case-studies'),
    },
    {
      id: 'sih',
      title: 'SIH26162 Thermal Anomaly Classifier',
      category: 'ai',
      tags: ['Python', 'NASA FIRMS', 'OpenStreetMap', 'Spatial ML'],
      tagColor: 'text-[#7CF2C9]',
      desc: 'Autonomous spatial classification engine ingesting streaming NASA FIRMS thermal telemetry and filtering industrial false alarms against OpenStreetMap infrastructure records.',
      status: 'Active Prototype',
      isReal: true,
      linkText: 'Open Telemetry Simulator',
      action: () => openApp('case-studies'),
    },
    {
      id: 'telemetry',
      title: 'Geospatial Telemetry Pipeline [N]',
      category: 'ai',
      tags: ['Python', 'SQL', 'Data Pipelines'],
      tagColor: 'text-[#8AB4FF]',
      desc: 'Automated high-throughput data extraction and cleaning routine for sensor clusters with outlier suppression algorithms achieving [X]% execution speedup.',
      status: 'Under Development',
      isReal: false,
      linkText: 'Explore Details',
      action: () => openApp('case-studies'),
    },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

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
          <div>
            <h2 className="font-grotesk text-[17px] font-semibold text-[#E8EDF2] leading-none">
              Projects
            </h2>
            <span className="text-[11px] text-[#9AA6B2] font-mono">Real Work & Prototypes</span>
          </div>
        </div>

        <button
          type="button"
          onClick={closeApp}
          className="text-[12px] font-medium text-[#7CF2C9] px-2 py-1 bg-[#151B23] border border-[#1B222B] rounded-full hover:bg-[#1a232e]"
        >
          Home
        </button>
      </div>

      {/* FILTER CHIPS */}
      <div className="flex items-center space-x-1.5 my-3">
        {['all', 'ai', 'web'].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => { setFilter(cat); playSound('tick', soundEnabled); }}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
              filter === cat 
                ? 'bg-[#7CF2C9] text-[#0B0F14] font-semibold shadow-sm' 
                : 'bg-[#151B23] text-[#9AA6B2] border border-[#1B222B] hover:text-[#E8EDF2]'
            }`}
          >
            {cat === 'all' ? 'All Work' : cat === 'ai' ? 'AI & Data Science' : 'Web Systems'}
          </button>
        ))}
      </div>

      {/* PROJECTS LIST */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pr-0.5">
        {filteredProjects.map((p) => (
          <div key={p.id} className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#7CF2C9] bg-[#1F2933] px-2 py-0.5 rounded-full border border-[#2B3542]">
                  {p.status}
                </span>
                <span className="text-[10px] text-[#9AA6B2] font-mono">
                  {p.isReal ? 'Verified' : 'Concept'}
                </span>
              </div>

              <h3 className="font-grotesk text-[15px] font-semibold text-[#E8EDF2] leading-tight mb-2">
                {p.title}
              </h3>

              <div className="flex flex-wrap gap-1 mb-2.5">
                {p.tags.map((t, i) => (
                  <span key={i} className="text-[10px] font-mono bg-[#1F2933] text-[#C5CED8] px-2 py-0.5 rounded-full border border-[#2B3542]">
                    {t}
                  </span>
                ))}
              </div>

              <p className="text-[12.5px] text-[#C5CED8] leading-relaxed mb-3">
                {p.desc}
              </p>
            </div>

            <div className="pt-2 border-t border-[#1F2933] flex items-center justify-between">
              <button
                type="button"
                onClick={p.action}
                className="text-[11.5px] font-medium text-[#7CF2C9] hover:underline flex items-center space-x-1"
              >
                <span>{p.linkText}</span>
                <ArrowLeftIcon className="w-3.5 h-3.5 rotate-180" />
              </button>

              <a
                href="https://github.com/Yasar-17"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9AA6B2] hover:text-[#E8EDF2] p-1"
                aria-label="View on GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="pt-3 border-t border-[#1B222B] flex items-center justify-between">
        <a
          href="https://github.com/Yasar-17"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-[#151B23] hover:bg-[#1f2933] border border-[#1B222B] rounded-full px-4 py-2 text-[12px] font-medium text-[#E8EDF2] transition-colors"
        >
          <GithubIcon className="w-4 h-4 text-[#7CF2C9]" />
          <span>github.com/Yasar-17</span>
        </a>

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

