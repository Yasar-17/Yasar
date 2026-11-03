import React from 'react';
import { AppWindow } from '../screen/AppWindow';
import { EXPERIENCES, EDUCATION } from '../../data';

export const ExperienceApp = () => {
  return (
    <AppWindow title="Experience" subtitle="Career, Hackathons & Internships">
      <div className="space-y-3">
        {EXPERIENCES.map((exp) => (
          <div key={exp.id} className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2.5">
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
              {exp.technologies.map((t) => (
                <span key={t} className="font-mono text-[10px] text-[#9AA6B2] bg-[#0e1219] px-2 py-0.5 rounded border border-[#1b222d]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Academic Program Timeline Entry */}
        <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2.5">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border text-[#8AB4FF] bg-[#1a2133] border-[#25314d] inline-block mb-1 font-medium">
                Academic Program
              </span>
              <h3 className="font-grotesk text-sm font-bold text-[#F0F4F8] leading-tight">
                {EDUCATION.degree}
              </h3>
              <span className="font-mono text-xs text-[#9AA6B2]">
                {EDUCATION.institution}
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#626e7e] shrink-0">
              {EDUCATION.period}
            </span>
          </div>

          <p className="text-xs text-[#C5CED8] pt-1 border-t border-[#1f2633] leading-relaxed">
            Specializing in Artificial Intelligence and Data Science. Academic standing: GPA {EDUCATION.gpa}. Coursework across algorithms, machine learning, and database systems.
          </p>

          <div className="flex flex-wrap gap-1 pt-1">
            {EDUCATION.coursework.slice(0, 5).map((cw) => (
              <span key={cw} className="font-mono text-[10px] text-[#9AA6B2] bg-[#0e1219] px-2 py-0.5 rounded border border-[#1b222d]">
                {cw}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AppWindow>
  );
};

export default ExperienceApp;
