import React, { useState } from 'react';
import { AppWindow } from '../screen/AppWindow';
import { DownloadIcon, CheckIcon, ExternalLinkIcon } from '../../ui/Icons';

export const ResumeApp = () => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    // Generate text/markdown resume file blob for direct download
    const resumeText = `MOHAMMED YASAR
Data Analyst & Builder
Chennai, India | mohammedyasar990@gmail.com | github.com/Yasar-17

SUMMARY
Third-year B.Tech Artificial Intelligence and Data Science student with deep focus on empirical data modeling, geospatial anomaly detection, and interactive 3D web systems.

EDUCATION
Bachelor of Technology in Artificial Intelligence and Data Science
Undergraduate Program, Chennai, India (2022 - 2026)

TECHNICAL PROFICIENCIES
- Languages: Python, SQL, JavaScript, HTML5, CSS3
- Data Science & ML: Pandas, NumPy, Scikit-Learn, NASA FIRMS Telemetry, OpenStreetMap
- Frontend & 3D: React 18, Three.js, React Three Fiber, Tailwind CSS, Framer Motion, Vite
- Tools & Systems: Git, GitHub, Linux, Bash, REST APIs, Web Audio API

EXPERIENCE & PROJECTS
1. Zenny Studios — Freelance Full-Stack Engineer (2024 - Present)
   - Architected production client platforms with React, Tailwind CSS, and 3D preview pipelines.
2. Smart India Hackathon 2024 — National Finalist (SIH26162)
   - Engineered real-time geospatial wildfire anomaly classifier using NASA thermal satellite streams.
3. Interactive 3D Portfolio Platform (yasar.dev)
   - Designed and built physical unibody smartphone portfolio with Three.js WebGL and custom OS.
`;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Mohammed_Yasar_Resume.txt';
    a.click();
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const headerAction = (
    <button
      type="button"
      onClick={handleDownload}
      className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[#1b222d] hover:bg-[#253040] text-xs font-mono text-[#7CF2C9] border border-[#263447] transition-all"
      aria-label="Download Resume"
    >
      {downloaded ? (
        <>
          <CheckIcon className="w-3.5 h-3.5" />
          <span>Saved</span>
        </>
      ) : (
        <>
          <DownloadIcon className="w-3.5 h-3.5" />
          <span>Download</span>
        </>
      )}
    </button>
  );

  return (
    <AppWindow title="Resume" subtitle="Curriculum Vitae" headerAction={headerAction}>
      {/* Header Summary Card */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-grotesk text-base font-bold text-[#F0F4F8]">
              Mohammed Yasar
            </h3>
            <span className="font-mono text-xs text-[#7CF2C9] block">
              Data Analyst & Builder
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#9AA6B2] bg-[#0e1219] px-2 py-0.5 rounded border border-[#1b222d]">
            2026 B.Tech
          </span>
        </div>
        <p className="text-xs text-[#C5CED8] leading-relaxed pt-1 border-t border-[#1f2633]">
          Third-year AI & Data Science undergraduate passionate about building computational systems, anomaly detection pipelines, and high-fidelity interactive user interfaces.
        </p>
      </div>

      {/* Education */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#8AB4FF] font-semibold block">
          Education
        </span>
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-grotesk text-xs font-bold text-[#E8EDF2]">
              B.Tech in Artificial Intelligence & Data Science
            </h4>
            <span className="font-mono text-[11px] text-[#9AA6B2]">
              Undergraduate Degree · Chennai, India
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#626e7e]">2022 — 2026</span>
        </div>
      </div>

      {/* Experience Highlights */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#FFB86B] font-semibold block">
          Key Experience
        </span>

        <div className="space-y-2 font-sans text-xs">
          <div>
            <div className="flex justify-between font-mono text-[11px]">
              <span className="font-bold text-[#E8EDF2]">Freelance Full-Stack Engineer</span>
              <span className="text-[#626e7e]">Zenny Studios</span>
            </div>
            <p className="text-[#9AA6B2] text-[11px] mt-0.5">
              Production web applications with React, Tailwind CSS, and 3D preview systems.
            </p>
          </div>

          <div className="pt-2 border-t border-[#1f2633]">
            <div className="flex justify-between font-mono text-[11px]">
              <span className="font-bold text-[#E8EDF2]">SIH 2024 National Finalist</span>
              <span className="text-[#626e7e]">SIH26162</span>
            </div>
            <p className="text-[#9AA6B2] text-[11px] mt-0.5">
              Geospatial wildfire classification pipeline ingesting NASA satellite telemetry streams.
            </p>
          </div>
        </div>
      </div>

      {/* Skills Matrix */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#7CF2C9] font-semibold block">
          Technical Stack
        </span>
        <div className="space-y-1.5 font-mono text-[11px] text-[#C5CED8]">
          <div className="flex justify-between">
            <span className="text-[#626e7e]">Languages:</span>
            <span>Python, SQL, JavaScript</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#626e7e]">Data & ML:</span>
            <span>Pandas, NumPy, Scikit-Learn</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#626e7e]">Frontend / 3D:</span>
            <span>React, Three.js, R3F, Tailwind</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#626e7e]">Systems:</span>
            <span>Git, Linux, Bash, REST APIs</span>
          </div>
        </div>
      </div>
    </AppWindow>
  );
};

export default ResumeApp;

