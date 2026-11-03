import React from 'react';
import { usePhone } from '../../context/PhoneContext';
import { AppWindow } from '../screen/AppWindow';
import { UserIcon, FileTextIcon, MailIcon, CheckIcon, SparklesIcon } from '../../ui/Icons';
import { PROFILE, EDUCATION } from '../../data';

export const AboutApp = () => {
  const { openApp } = usePhone();

  return (
    <AppWindow title="About" subtitle="Profile & Philosophy">
      {/* 1. Hero Identity Card */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm flex items-center space-x-3.5">
        <div className="w-12 h-12 rounded-[16px] bg-[#1a202c] border border-[#2d3848] flex items-center justify-center font-mono font-bold text-lg text-[#7CF2C9] shadow-inner shrink-0">
          Y
        </div>
        <div className="flex flex-col overflow-hidden">
          <div className="flex items-center space-x-2">
            <h3 className="font-grotesk text-base font-bold text-[#F0F4F8] leading-tight truncate">
              {PROFILE.name}
            </h3>
            <span className="w-2 h-2 rounded-full bg-[#7CF2C9] shrink-0" title={PROFILE.availability} />
          </div>
          <span className="font-mono text-xs text-[#7CF2C9] tracking-tight">
            {PROFILE.headline}
          </span>
          <span className="font-mono text-[11px] text-[#626e7e] mt-0.5">
            {PROFILE.location}
          </span>
        </div>
      </div>

      {/* 2. Interests Section */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#7CF2C9] font-semibold block">
          Core Interests
        </span>
        <div className="flex flex-wrap gap-1.5">
          {PROFILE.interests.map((interest, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-1.5 bg-[#0e1219] border border-[#1b222d] px-2.5 py-1 rounded-xl text-xs font-mono text-[#E8EDF2]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7CF2C9]" />
              <span>{interest}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Biography & Background */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#FFB86B] font-semibold block">
          Background
        </span>
        <p className="text-xs text-[#C5CED8] leading-relaxed">
          {PROFILE.aboutText}
        </p>
      </div>

      {/* 4. Disciplines */}
      <div className="space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#626e7e] px-1 block">
          Key Focus Areas
        </span>

        <div className="grid grid-cols-1 gap-2">
          {PROFILE.disciplines.map((disc) => (
            <div key={disc.number} className="bg-[#12161f] border border-[#1f2633] rounded-[18px] p-3 flex items-start space-x-3">
              <span className="font-mono text-xs text-[#7CF2C9] font-bold mt-0.5">{disc.number}</span>
              <div>
                <h5 className="font-mono text-xs font-bold text-[#E8EDF2]">{disc.title}</h5>
                <p className="text-[11px] text-[#9AA6B2] leading-snug mt-0.5">
                  {disc.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Verified Credentials & Facts */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#626e7e] font-semibold block">
          Academic & Location Details
        </span>
        <div className="space-y-1.5 font-mono text-xs text-[#9AA6B2]">
          <div className="flex justify-between py-1 border-b border-[#1f2633]">
            <span>Status</span>
            <span className="text-[#E8EDF2]">{EDUCATION.status}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#1f2633]">
            <span>Degree</span>
            <span className="text-[#E8EDF2]">{EDUCATION.shortDegree}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#1f2633]">
            <span>Institution</span>
            <span className="text-[#E8EDF2] text-right text-[11px]">CAHCET (Anna University)</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#1f2633]">
            <span>Academic Standing</span>
            <span className="text-[#7CF2C9] font-bold">GPA: {EDUCATION.gpa}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Location</span>
            <span className="text-[#E8EDF2]">{PROFILE.location}</span>
          </div>
        </div>
      </div>

      {/* 6. Navigation Triggers */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          type="button"
          onClick={() => openApp('resume')}
          className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-[#1b222d] hover:bg-[#253040] text-xs font-mono text-[#E8EDF2] border border-[#293545] transition-all"
        >
          <FileTextIcon className="w-3.5 h-3.5 text-[#7CF2C9]" />
          <span>View Resume</span>
        </button>

        <button
          type="button"
          onClick={() => openApp('contact')}
          className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-[#1b222d] hover:bg-[#253040] text-xs font-mono text-[#E8EDF2] border border-[#293545] transition-all"
        >
          <MailIcon className="w-3.5 h-3.5 text-[#FFB86B]" />
          <span>Contact</span>
        </button>
      </div>
    </AppWindow>
  );
};

export default AboutApp;
