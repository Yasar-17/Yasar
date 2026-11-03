import React, { useState } from 'react';
import { AppWindow } from '../screen/AppWindow';
import { DownloadIcon, CheckIcon, MailIcon, ExternalLinkIcon } from '../../ui/Icons';
import { PROFILE, EDUCATION, EXPERIENCES, PROJECTS, SKILL_CATEGORIES } from '../../data';

export const ResumeApp = () => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    try {
      // Check if actual resume.pdf exists in public/
      const res = await fetch('/resume.pdf', { method: 'HEAD' });
      if (res.ok && res.headers.get('content-type')?.includes('pdf')) {
        const a = document.createElement('a');
        a.href = '/resume.pdf';
        a.download = `${PROFILE.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
        a.click();
        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 2500);
        return;
      }
    } catch {
      // Fallback to structured plain text curriculum vitae
    }

    // Export authentic curriculum vitae text formatted directly from central data files
    const resumeText = `${PROFILE.fullName.toUpperCase()}
${PROFILE.role} | ${PROFILE.headline}
Location: ${PROFILE.location}
Email: ${PROFILE.email}
GitHub: ${PROFILE.github}
LinkedIn: ${PROFILE.linkedin}

================================================================================
SUMMARY
================================================================================
${PROFILE.aboutText}

================================================================================
EDUCATION
================================================================================
${EDUCATION.degree} in ${EDUCATION.major}
${EDUCATION.institution} (${EDUCATION.affiliation})
Period: ${EDUCATION.period} | Academic Standing: GPA ${EDUCATION.gpa}
Relevant Coursework: ${EDUCATION.coursework.join(', ')}

================================================================================
EXPERIENCE & ACHIEVEMENTS
================================================================================
${EXPERIENCES.map((exp) => `${exp.role} — ${exp.organization} (${exp.period})
${exp.highlights.map((h) => `  * ${h}`).join('\n')}
Technologies: ${exp.technologies.join(', ')}
`).join('\n')}

================================================================================
KEY PROJECTS
================================================================================
${PROJECTS.slice(0, 5).map((p) => `${p.title} (${p.status})
  ${p.desc}
  Stack: ${p.technologies.join(', ')}
  Repository: ${p.repoUrl || 'N/A'}${p.liveUrl ? `\n  Live: ${p.liveUrl}` : ''}
`).join('\n')}

================================================================================
TECHNICAL CAPABILITIES
================================================================================
${SKILL_CATEGORIES.map((cat) => `${cat.title}:
  ${cat.skills.map((s) => `${s.name} (${s.level}) [${s.tags.join(', ')}]`).join('; ')}
`).join('\n')}
`;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${PROFILE.fullName.replace(/\s+/g, '_')}_Resume.txt`;
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
      aria-label="Download Curriculum Vitae"
    >
      {downloaded ? (
        <>
          <CheckIcon className="w-3.5 h-3.5" />
          <span>Exported</span>
        </>
      ) : (
        <>
          <DownloadIcon className="w-3.5 h-3.5" />
          <span>Export CV</span>
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
              {PROFILE.name}
            </h3>
            <span className="font-mono text-xs text-[#7CF2C9] block">
              {PROFILE.headline}
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#9AA6B2] bg-[#0e1219] px-2 py-0.5 rounded border border-[#1b222d]">
            {EDUCATION.expectedGraduation} B.Tech
          </span>
        </div>
        <p className="text-xs text-[#C5CED8] leading-relaxed pt-1 border-t border-[#1f2633]">
          {PROFILE.aboutText}
        </p>
      </div>

      {/* Education */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#8AB4FF] font-semibold block">
            Education
          </span>
          <span className="font-mono text-[11px] text-[#7CF2C9] font-bold">
            GPA: {EDUCATION.gpa}
          </span>
        </div>

        <div>
          <h4 className="font-grotesk text-xs font-bold text-[#E8EDF2]">
            {EDUCATION.degree} in {EDUCATION.major}
          </h4>
          <span className="font-mono text-[11px] text-[#9AA6B2] block">
            {EDUCATION.institution} ({EDUCATION.affiliation})
          </span>
          <span className="font-mono text-[10px] text-[#626e7e]">
            {EDUCATION.period} · {EDUCATION.location}
          </span>
        </div>

        <div className="pt-1.5 border-t border-[#1f2633]">
          <span className="font-mono text-[10px] text-[#626e7e] block mb-1">Key Coursework:</span>
          <div className="flex flex-wrap gap-1">
            {EDUCATION.coursework.slice(0, 6).map((cw) => (
              <span key={cw} className="font-mono text-[10px] text-[#9AA6B2] bg-[#0e1219] px-1.5 py-0.5 rounded border border-[#1b222d]">
                {cw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Highlights */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#FFB86B] font-semibold block">
          Key Experience & Achievements
        </span>

        <div className="space-y-3 font-sans text-xs">
          {EXPERIENCES.slice(0, 3).map((exp) => (
            <div key={exp.id} className="space-y-1">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="font-bold text-[#E8EDF2]">{exp.role}</span>
                <span className="text-[#626e7e]">{exp.period}</span>
              </div>
              <span className="font-mono text-[10px] text-[#7CF2C9] block">{exp.organization}</span>
              <p className="text-[#9AA6B2] text-[11px] leading-snug">
                {exp.highlights[0]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Technical Stack */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#7CF2C9] font-semibold block">
          Technical Capabilities
        </span>
        <div className="space-y-1.5 font-mono text-[11px] text-[#C5CED8]">
          <div className="flex justify-between">
            <span className="text-[#626e7e]">Languages:</span>
            <span>Python, JavaScript, TypeScript, SQL</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#626e7e]">AI & ML:</span>
            <span>Pandas, NumPy, Scikit-Learn, Telemetry</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#626e7e]">Frontend / Web:</span>
            <span>React, Tailwind CSS, HTML5, Three.js</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#626e7e]">Systems:</span>
            <span>Git, GitHub, Linux, Vercel, Colab</span>
          </div>
        </div>
      </div>

      {/* Contact & Verification Footer */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-3 shadow-sm flex items-center justify-between font-mono text-[11px]">
        <span className="text-[#9AA6B2]">Need verified PDF?</span>
        <a
          href={`mailto:${PROFILE.email}?subject=Resume%20Request%20-%20${encodeURIComponent(PROFILE.name)}`}
          className="text-[#7CF2C9] hover:underline flex items-center space-x-1"
        >
          <span>Request via Email</span>
          <MailIcon className="w-3.5 h-3.5" />
        </a>
      </div>
    </AppWindow>
  );
};

export default ResumeApp;
