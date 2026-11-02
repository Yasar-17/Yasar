import React, { useState } from 'react';
import { usePhone } from '../../context/PhoneContext';
import { AppWindow } from '../screen/AppWindow';
import { ExternalLinkIcon, GithubIcon, ArrowRightIcon } from '../../ui/Icons';
import { playSound } from '../../audio/soundEngine';

export const ProjectsApp = () => {
  const { soundEnabled, openApp } = usePhone();
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 'zenny',
      title: 'Zenny Studios Platform',
      category: 'web',
      tags: ['React 18', 'Tailwind CSS', 'Vite', '3D Previews'],
      desc: 'Live production client site crafted for an architecture and creative portfolio showcase. Built with fluid layouts, minimal layout shift, and clean typography.',
      status: 'Live Production',
      action: () => openApp('case-studies'),
      actionLabel: 'View Case Study',
    },
    {
      id: 'sih',
      title: 'SIH26162 Wildfire Classifier',
      category: 'data',
      tags: ['Python', 'NASA FIRMS', 'OpenStreetMap', 'Spatial ML'],
      desc: 'Autonomous spatial classification engine ingesting streaming NASA FIRMS thermal telemetry and filtering industrial false alarms against OpenStreetMap infrastructure records.',
      status: 'Active Prototype',
      action: () => openApp('case-studies'),
      actionLabel: 'Telemetry Telemetry',
    },
    {
      id: 'portfolio',
      title: '3D Nothing Phone Portfolio Engine',
      category: 'web',
      tags: ['Three.js', 'React Three Fiber', 'GLTF/GLB', 'CSS3D'],
      desc: 'High-performance interactive 3D product showcase running in real-time WebGL with ACES Filmic tone mapping, PBR materials, and an embedded operating system interface.',
      status: 'Verified Project',
      action: () => openApp('about'),
      actionLabel: 'Architecture Specs',
    },
    {
      id: 'telemetry',
      title: 'Geospatial Telemetry Pipeline',
      category: 'data',
      tags: ['Python', 'SQL', 'PostgreSQL', 'Outlier Detection'],
      desc: 'Automated high-throughput data extraction and cleaning routine for sensor clusters with outlier suppression algorithms and spatial risk scoring.',
      status: 'Research Pipeline',
      action: () => openApp('case-studies'),
      actionLabel: 'Pipeline Details',
    },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter((p) => p.category === filter);

  return (
    <AppWindow title="Projects" subtitle="Featured Systems & Builds">
      {/* Category Filter Chips */}
      <div className="flex items-center space-x-1.5 bg-[#141820] border border-[#232c3a] rounded-xl p-1 mb-1">
        {[
          { id: 'all', label: 'All Projects' },
          { id: 'data', label: 'Data & ML' },
          { id: 'web', label: 'Web & 3D' },
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => { setFilter(cat.id); playSound('tick', soundEnabled); }}
            className={`flex-1 py-1.5 px-2 rounded-lg font-mono text-[11px] transition-all text-center ${
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
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] text-[#7CF2C9] bg-[#1a2330] px-2 py-0.5 rounded-full border border-[#263447]">
                  {p.status}
                </span>
                <span className="font-mono text-[10px] text-[#626e7e]">
                  {p.category.toUpperCase()}
                </span>
              </div>

              <h3 className="font-grotesk text-sm font-bold text-[#F0F4F8] leading-tight mb-1.5">
                {p.title}
              </h3>

              <div className="flex flex-wrap gap-1 mb-2">
                {p.tags.map((t, i) => (
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
              <button
                type="button"
                onClick={p.action}
                className="text-xs font-mono text-[#7CF2C9] hover:underline flex items-center space-x-1"
              >
                <span>{p.actionLabel}</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </button>

              <a
                href="https://github.com/Yasar-17"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9AA6B2] hover:text-[#E8EDF2] p-1 transition-colors"
                aria-label="View on GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </AppWindow>
  );
};

export default ProjectsApp;
