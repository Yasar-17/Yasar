import React from 'react';
import { AppWindow } from '../screen/AppWindow';
import { BriefcaseIcon, GraduationCapIcon, CheckIcon } from '../../ui/Icons';

const EXPERIENCES = [
  {
    role: 'Freelance Full-Stack Engineer',
    organization: 'Zenny Studios',
    period: '2024 — Present',
    type: 'Client Production',
    badgeColor: 'text-[#7CF2C9] bg-[#1a2330] border-[#263447]',
    highlights: [
      'Architected responsive client web platforms with React 18, Tailwind CSS, and Vite.',
      'Engineered interactive 3D product previews and optimized asset loading pipelines.',
      'Delivered 100% responsive cross-platform viewports with accessible semantic HTML.',
    ],
    tech: ['React', 'Three.js', 'Tailwind CSS', 'Vite', 'Framer Motion'],
  },
  {
    role: 'National Finalist (SIH26162)',
    organization: 'Smart India Hackathon (SIH 2024)',
    period: 'Aug 2024 — Dec 2024',
    type: 'National Hackathon',
    badgeColor: 'text-[#FFB86B] bg-[#2b2116] border-[#3d2f1f]',
    highlights: [
      'Engineered geospatial wildfire anomaly classification pipeline combining NASA FIRMS satellite thermal feeds and OpenStreetMap spatial data.',
      'Implemented automated telemetry noise suppression reducing false positive alarm triggers.',
      'Selected as National Finalist among thousands of competitive engineering submissions across India.',
    ],
    tech: ['Python', 'NASA FIRMS API', 'OpenStreetMap', 'Scikit-Learn', 'Pandas'],
  },
  {
    role: 'B.Tech AI & Data Science (3rd Year)',
    organization: 'Undergraduate Program',
    period: '2022 — 2026',
    type: 'Academic & Research',
    badgeColor: 'text-[#8AB4FF] bg-[#1a2133] border-[#25314d]',
    highlights: [
      'Specialized in statistical analysis, machine learning algorithms, and spatial analytics.',
      'Maintained consistent strong academic standing across algorithms, mathematics, and database management.',
      'Led technical development for multi-disciplinary student data projects.',
    ],
    tech: ['Python', 'SQL', 'PostgreSQL', 'Data Structures', 'Statistical Inference'],
  },
];

export const ExperienceApp = () => {
  return (
    <AppWindow title="Experience" subtitle="Career & Research Timeline">
      <div className="space-y-3">
        {EXPERIENCES.map((exp, idx) => (
          <div key={idx} className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2.5">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${exp.badgeColor} inline-block mb-1 font-medium`}>
                  {exp.type}
                </span>
                <h3 className="font-grotesk text-sm font-bold text-[#F0F4F8] leading-tight">
                  {exp.role}
                </h3>
                <span className="font-mono text-xs text-[#9AA6B2]">
                  {exp.organization}
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#626e7e] shrink-0">
                {exp.period}
              </span>
            </div>

            {/* Highlights */}
            <ul className="space-y-1.5 text-xs text-[#C5CED8] pt-1 border-t border-[#1f2633]">
              {exp.highlights.map((h, hIdx) => (
                <li key={hIdx} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7CF2C9] mt-1.5 shrink-0" />
                  <span className="leading-snug">{h}</span>
                </li>
              ))}
            </ul>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1 pt-1">
              {exp.tech.map((t) => (
                <span key={t} className="font-mono text-[10px] text-[#9AA6B2] bg-[#0e1219] px-2 py-0.5 rounded border border-[#1b222d]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppWindow>
  );
};

export default ExperienceApp;
