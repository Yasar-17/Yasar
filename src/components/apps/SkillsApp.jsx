import React, { useState } from 'react';
import { AppWindow } from '../screen/AppWindow';
import { SKILL_CATEGORIES } from '../../data';

export const SkillsApp = () => {
  const [filter, setFilter] = useState('all');

  const filteredData = filter === 'all'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter((item) => item.category === filter);

  return (
    <AppWindow title="Skills" subtitle="Verified Technical Capabilities">
      {/* Category Tabs */}
      <div className="flex items-center space-x-1.5 bg-[#141820] border border-[#232c3a] rounded-xl p-1 mb-1">
        {[
          { id: 'all', label: 'All' },
          { id: 'data', label: 'Data & ML' },
          { id: 'frontend', label: 'Frontend & 3D' },
          { id: 'backend', label: 'Tools & SQL' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            className={`flex-1 py-1.5 px-2 rounded-lg font-mono text-[11px] transition-all text-center ${
              filter === tab.id
                ? 'bg-[#232d3d] text-[#7CF2C9] font-bold shadow-sm'
                : 'text-[#9AA6B2] hover:text-[#E8EDF2]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Skill Sections */}
      {filteredData.map((section) => (
        <div key={section.category} className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-3">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#7CF2C9] font-semibold block mb-0.5">
              Domain
            </span>
            <h3 className="font-grotesk text-sm font-bold text-[#F0F4F8]">
              {section.title}
            </h3>
            <p className="text-[11px] text-[#9AA6B2] leading-tight mt-1">
              {section.description}
            </p>
          </div>

          <div className="space-y-2 pt-1 border-t border-[#1f2633]">
            {section.skills.map((skill) => (
              <div key={skill.name} className="bg-[#0e1219] border border-[#1b222d] rounded-xl p-2.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold text-[#E8EDF2]">{skill.name}</span>
                  <span className="font-mono text-[10px] text-[#7CF2C9] bg-[#1a2330] px-2 py-0.5 rounded-full border border-[#263447]">
                    {skill.level}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {skill.tags.map((t) => (
                    <span key={t} className="font-mono text-[10px] text-[#9AA6B2] bg-[#141922] px-2 py-0.5 rounded border border-[#202735]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </AppWindow>
  );
};

export default SkillsApp;
