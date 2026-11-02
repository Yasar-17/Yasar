import React from 'react';
import { usePhone } from '../../context/PhoneContext';
import { AppWindow } from '../screen/AppWindow';
import { UserIcon, FileTextIcon, MailIcon, ExternalLinkIcon } from '../../ui/Icons';

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
              Mohammed Yasar
            </h3>
            <span className="w-2 h-2 rounded-full bg-[#7CF2C9] shrink-0" title="Available for opportunities" />
          </div>
          <span className="font-mono text-xs text-[#7CF2C9] tracking-tight">
            Data Analyst & Builder
          </span>
          <span className="font-mono text-[11px] text-[#626e7e] mt-0.5">
            Chennai, IN · 3rd-Yr B.Tech AI & Data Science
          </span>
        </div>
      </div>

      {/* 2. Engineering Philosophy */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#FFB86B] font-semibold block">
          Core Philosophy
        </span>
        <h4 className="font-grotesk text-sm font-bold text-[#E8EDF2]">
          Empirical Rigor Over Hype
        </h4>
        <p className="text-xs text-[#9AA6B2] leading-relaxed">
          I build high-performance computational systems that translate noisy, real-world data into clear, reliable insights. Whether building predictive wildfire anomaly classifiers or engineering real-time 3D web applications, every interaction is built with precision, speed, and tactile craft.
        </p>
      </div>

      {/* 3. Three Core Pillars */}
      <div className="space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#626e7e] px-1 block">
          Key Disciplines
        </span>

        <div className="grid grid-cols-1 gap-2">
          {/* Pillar 1 */}
          <div className="bg-[#12161f] border border-[#1f2633] rounded-[18px] p-3 flex items-start space-x-3">
            <span className="font-mono text-xs text-[#7CF2C9] font-bold mt-0.5">01</span>
            <div>
              <h5 className="font-mono text-xs font-bold text-[#E8EDF2]">Data Analytics & ML</h5>
              <p className="text-[11px] text-[#9AA6B2] leading-snug mt-0.5">
                Geospatial extraction, anomaly classification, telemetry noise suppression, exploratory data analysis.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#12161f] border border-[#1f2633] rounded-[18px] p-3 flex items-start space-x-3">
            <span className="font-mono text-xs text-[#8AB4FF] font-bold mt-0.5">02</span>
            <div>
              <h5 className="font-mono text-xs font-bold text-[#E8EDF2]">3D & Interactive Web</h5>
              <p className="text-[11px] text-[#9AA6B2] leading-snug mt-0.5">
                Three.js, WebGL shader pipelines, CSS3DRenderer, spring physics, and fluid responsive UI architectures.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#12161f] border border-[#1f2633] rounded-[18px] p-3 flex items-start space-x-3">
            <span className="font-mono text-xs text-[#FFB86B] font-bold mt-0.5">03</span>
            <div>
              <h5 className="font-mono text-xs font-bold text-[#E8EDF2]">Systems & Automation</h5>
              <p className="text-[11px] text-[#9AA6B2] leading-snug mt-0.5">
                REST APIs, pipeline scripts, Web Audio procedural synthesis, and production Vite/React architectures.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Quick Specs */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#626e7e] font-semibold block">
          Quick Facts
        </span>
        <div className="space-y-1.5 font-mono text-xs text-[#9AA6B2]">
          <div className="flex justify-between py-1 border-b border-[#1f2633]">
            <span>Current Status</span>
            <span className="text-[#E8EDF2]">3rd-Year Undergraduate</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#1f2633]">
            <span>Degree</span>
            <span className="text-[#E8EDF2]">B.Tech AI & Data Science</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#1f2633]">
            <span>Primary Languages</span>
            <span className="text-[#7CF2C9]">Python, SQL, JavaScript</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Location</span>
            <span className="text-[#E8EDF2]">Chennai, India</span>
          </div>
        </div>
      </div>

      {/* 5. Navigation Buttons */}
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
