import React, { useState } from 'react';
import { usePhone } from '../../context/PhoneContext';
import { 
  ArrowLeftIcon, MailIcon, GithubIcon, ExternalLinkIcon, 
  DownloadIcon, CheckIcon, CpuIcon, BriefcaseIcon, FileTextIcon, 
  GraduationCapIcon, BarChartIcon, GitBranchIcon, UserIcon, LinkIcon
} from '../../ui/Icons';
import { playSound } from '../../audio/soundEngine';

export const SimpleApp = ({ appId }) => {
  const { closeApp, soundEnabled, openApp } = usePhone();
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const renderContent = () => {
    switch (appId) {
      case 'about':
        return (
          <div className="space-y-3">
            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#7CF2C9] block mb-1">
                Background
              </span>
              <h3 className="font-grotesk text-[17px] font-bold text-[#E8EDF2] mb-1.5">
                Yasar
              </h3>
              <p className="text-[13px] text-[#C5CED8] leading-relaxed">
                Third-year B.Tech Artificial Intelligence and Data Science student, data analyst, and builder. Focused on converting messy, noisy real-world data streams into robust decisions, spatial tools, and reliable user interfaces.
              </p>
            </div>

            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFB86B] block mb-1">
                Engineering Philosophy
              </span>
              <p className="text-[13px] text-[#C5CED8] leading-relaxed">
                Simplicity, performance, and empirical validation over hype. Whether classifying satellite thermal events or architecting client websites, precision and tactile user experience come first.
              </p>
            </div>

            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8AB4FF] block mb-2">
                Quick Facts
              </span>
              <div className="space-y-1.5 text-[12px] font-mono text-[#9AA6B2]">
                <div className="flex justify-between">
                  <span>Degree</span>
                  <span className="text-[#E8EDF2]">B.Tech AI & Data Science (3rd Yr)</span>
                </div>
                <div className="flex justify-between">
                  <span>Location</span>
                  <span className="text-[#E8EDF2]">Chennai, India</span>
                </div>
                <div className="flex justify-between">
                  <span>Primary Languages</span>
                  <span className="text-[#7CF2C9]">Python, SQL, JavaScript</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-3">
            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#7CF2C9] block mb-2 font-medium">
                Data Science & Analytics
              </span>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {['Python', 'SQL', 'NASA FIRMS', 'OpenStreetMap', 'Pandas', 'NumPy'].map((s) => (
                  <span key={s} className="text-[11px] font-mono bg-[#1F2933] text-[#7CF2C9] px-2.5 py-1 rounded-full border border-[#2B3542]">
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-[12px] text-[#9AA6B2] leading-snug">
                Geospatial extraction, anomaly classification, telemetry noise suppression, exploratory data analysis.
              </p>
            </div>

            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8AB4FF] block mb-2 font-medium">
                Frontend & UI Engineering
              </span>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {['React', 'Tailwind CSS', 'HTML', 'JavaScript', 'Vite', 'Framer Motion'].map((s) => (
                  <span key={s} className="text-[11px] font-mono bg-[#1F2933] text-[#8AB4FF] px-2.5 py-1 rounded-full border border-[#2B3542]">
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-[12px] text-[#9AA6B2] leading-snug">
                Responsive layouts, accessibility standards, 60fps physics animations, clean semantic architecture.
              </p>
            </div>

            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFB86B] block mb-2 font-medium">
                Tools & Workflows
              </span>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {['Git & GitHub', 'VS Code', 'Linux / Bash', 'Cloudflare Pages', 'Vercel'].map((s) => (
                  <span key={s} className="text-[11px] font-mono bg-[#1F2933] text-[#FFB86B] px-2.5 py-1 rounded-full border border-[#2B3542]">
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-[12px] text-[#9AA6B2] leading-snug">
                Continuous deployment, version control, reproducible analysis environments.
              </p>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-3">
            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-[#7CF2C9] bg-[#1F2933] px-2 py-0.5 rounded-full border border-[#2B3542]">
                  Real-World Client Work
                </span>
                <span className="text-[11px] text-[#9AA6B2]">Recent</span>
              </div>
              <h3 className="font-grotesk text-[15px] font-bold text-[#E8EDF2]">
                Web Developer — Zenny Studios
              </h3>
              <p className="text-[12px] text-[#9AA6B2] font-mono mb-2">HTML, Tailwind CSS, JavaScript</p>
              <p className="text-[12.5px] text-[#C5CED8] leading-relaxed">
                Architected and deployed responsive client website. Optimized asset loading, mobile performance, and responsive layout hierarchy for high-resolution portfolio presentation.
              </p>
            </div>

            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-[#FFB86B] bg-[#1F2933] px-2 py-0.5 rounded-full border border-[#2B3542]">
                  Prototype & Research
                </span>
                <span className="text-[11px] text-[#9AA6B2]">Academic</span>
              </div>
              <h3 className="font-grotesk text-[15px] font-bold text-[#E8EDF2]">
                Spatial ML Developer — SIH26162
              </h3>
              <p className="text-[12px] text-[#9AA6B2] font-mono mb-2">Python, NASA FIRMS, OpenStreetMap</p>
              <p className="text-[12.5px] text-[#C5CED8] leading-relaxed">
                Constructed thermal anomaly classification pipeline integrating real-time NASA satellite sensor feeds with geospatial vector infrastructure layers to filter false alarms.
              </p>
            </div>

            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-[#8AB4FF] bg-[#1F2933] px-2 py-0.5 rounded-full border border-[#2B3542]">
                  Education
                </span>
                <span className="text-[11px] text-[#9AA6B2]">2022 - Present</span>
              </div>
              <h3 className="font-grotesk text-[15px] font-bold text-[#E8EDF2]">
                B.Tech in Artificial Intelligence & Data Science
              </h3>
              <p className="text-[12px] text-[#9AA6B2] font-mono mb-1">Third Year Undergraduate</p>
              <p className="text-[12.5px] text-[#C5CED8] leading-relaxed">
                Focus on machine learning, statistical computing, distributed data pipelines, and algorithm design.
              </p>
            </div>
          </div>
        );

      case 'resume':
        return (
          <div className="space-y-3">
            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="font-grotesk text-[16px] font-bold text-[#E8EDF2]">
                  Yasar - Resume
                </h3>
                <p className="text-[11px] text-[#9AA6B2] font-mono">Data Analyst & Builder</p>
              </div>

              <a
                href="mailto:mohammedyasar990@gmail.com?subject=Resume%20Request%20-%20Yasar"
                className="flex items-center space-x-1.5 bg-[#7CF2C9] text-[#0B0F14] text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-sm hover:bg-[#6ee0b8]"
              >
                <DownloadIcon className="w-3.5 h-3.5" />
                <span>Request PDF</span>
              </a>
            </div>

            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#7CF2C9] block">
                Education
              </span>
              <p className="text-[13px] font-semibold text-[#E8EDF2]">
                B.Tech AI and Data Science — Third Year
              </p>
              <p className="text-[11px] text-[#9AA6B2] font-mono">Relevant: ML, Spatial Analytics, Algorithms, SQL</p>
            </div>

            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFB86B] block">
                Key Projects & Experience
              </span>
              <div>
                <h4 className="text-[12.5px] font-semibold text-[#E8EDF2]">Zenny Studios Client Site</h4>
                <p className="text-[11px] text-[#C5CED8]">Production web system built with HTML, Tailwind CSS, JavaScript.</p>
              </div>
              <div className="pt-1.5 border-t border-[#1F2933]">
                <h4 className="text-[12.5px] font-semibold text-[#E8EDF2]">SIH26162 Thermal Classifier</h4>
                <p className="text-[11px] text-[#C5CED8]">NASA FIRMS & OpenStreetMap spatial analysis pipeline in Python.</p>
              </div>
            </div>

            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8AB4FF] block">
                Core Competencies
              </span>
              <div className="flex flex-wrap gap-1">
                {['Python', 'SQL', 'NASA FIRMS', 'OpenStreetMap', 'JavaScript', 'HTML', 'Tailwind CSS', 'React'].map((s) => (
                  <span key={s} className="text-[10px] font-mono bg-[#1F2933] text-[#C5CED8] px-2 py-0.5 rounded-full border border-[#2B3542]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-3">
            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#7CF2C9] block mb-1">
                Get In Touch
              </span>
              <h3 className="font-grotesk text-[16px] font-bold text-[#E8EDF2] mb-1">
                Let's discuss opportunities
              </h3>
              <p className="text-[12.5px] text-[#C5CED8] leading-relaxed">
                Open for internships, data analytics roles, and creative engineering collaborations.
              </p>
            </div>

            <div className="space-y-2">
              <a
                href="mailto:mohammedyasar990@gmail.com"
                className="flex items-center justify-between bg-[#151B23] hover:bg-[#1a232e] border border-[#1B222B] rounded-[18px] p-3 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <MailIcon className="w-5 h-5 text-[#7CF2C9]" />
                  <div>
                    <span className="text-[13px] font-medium text-[#E8EDF2] block">Email</span>
                    <span className="text-[11px] text-[#9AA6B2] font-mono">mohammedyasar990@gmail.com</span>
                  </div>
                </div>
                <ExternalLinkIcon className="w-4 h-4 text-[#9AA6B2]" />
              </a>

              <a
                href="https://github.com/Yasar-17"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-[#151B23] hover:bg-[#1a232e] border border-[#1B222B] rounded-[18px] p-3 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <GithubIcon className="w-5 h-5 text-[#FFB86B]" />
                  <div>
                    <span className="text-[13px] font-medium text-[#E8EDF2] block">GitHub Profile</span>
                    <span className="text-[11px] text-[#9AA6B2] font-mono">github.com/Yasar-17</span>
                  </div>
                </div>
                <ExternalLinkIcon className="w-4 h-4 text-[#9AA6B2]" />
              </a>
            </div>

            {/* Quick Contact Message Form */}
            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8AB4FF] block mb-2 font-medium">
                Send Direct Message
              </span>

              {formSent ? (
                <div className="p-3 bg-[#1F2933] border border-[#7CF2C9]/40 rounded-[14px] text-center">
                  <span className="text-[13px] font-semibold text-[#7CF2C9] block">Message Prepared!</span>
                  <p className="text-[11px] text-[#9AA6B2] mt-0.5">Opening your default mail client...</p>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    playSound('click', soundEnabled);
                    setFormSent(true);
                    window.location.href = `mailto:mohammedyasar990@gmail.com?subject=Portfolio%20Message%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.email)}`;
                  }} 
                  className="space-y-2.5"
                >
                  <input 
                    type="text" 
                    required 
                    placeholder="Your Name" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1F2933] border border-[#2B3542] rounded-[12px] px-3 py-2 text-[12px] text-[#E8EDF2] placeholder-[#9AA6B2] focus:outline-none focus:border-[#7CF2C9]"
                  />
                  <input 
                    type="email" 
                    required 
                    placeholder="Your Email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#1F2933] border border-[#2B3542] rounded-[12px] px-3 py-2 text-[12px] text-[#E8EDF2] placeholder-[#9AA6B2] focus:outline-none focus:border-[#7CF2C9]"
                  />
                  <textarea 
                    required 
                    rows={3} 
                    placeholder="Your Message..." 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#1F2933] border border-[#2B3542] rounded-[12px] px-3 py-2 text-[12px] text-[#E8EDF2] placeholder-[#9AA6B2] focus:outline-none focus:border-[#7CF2C9] resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#7CF2C9] hover:bg-[#6ee0b8] text-[#0B0F14] font-semibold text-[12px] py-2.5 rounded-full transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        );

      case 'dashboards':
        return (
          <div className="space-y-3">
            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#7CF2C9] block mb-1">
                Telemetry Analytics
              </span>
              <h3 className="font-grotesk text-[16px] font-bold text-[#E8EDF2] mb-2">
                Spatial Anomaly Streams
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[12px]">
                  <span className="text-[#9AA6B2]">FIRMS Ingestion</span>
                  <span className="font-mono text-[#7CF2C9] font-semibold">[N] pts/sec</span>
                </div>
                <div className="w-full h-1.5 bg-[#1F2933] rounded-full overflow-hidden">
                  <div className="h-full bg-[#7CF2C9] rounded-full w-[82%]" />
                </div>

                <div className="flex justify-between items-center text-[12px] pt-1">
                  <span className="text-[#9AA6B2]">OSM Node Match Rate</span>
                  <span className="font-mono text-[#8AB4FF] font-semibold">[X]%</span>
                </div>
                <div className="w-full h-1.5 bg-[#1F2933] rounded-full overflow-hidden">
                  <div className="h-full bg-[#8AB4FF] rounded-full w-[94%]" />
                </div>

                <div className="flex justify-between items-center text-[12px] pt-1">
                  <span className="text-[#9AA6B2]">Pipeline Latency</span>
                  <span className="font-mono text-[#FFB86B] font-semibold">[N] ms</span>
                </div>
                <div className="w-full h-1.5 bg-[#1F2933] rounded-full overflow-hidden">
                  <div className="h-full bg-[#FFB86B] rounded-full w-[45%]" />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openApp('case-studies')}
              className="w-full p-3 bg-[#1F2933] hover:bg-[#25323e] border border-[#2B3542] rounded-[18px] text-center text-[12px] font-medium text-[#7CF2C9] transition-colors"
            >
              Open Interactive SIH26162 Simulator
            </button>
          </div>
        );

      case 'learning':
        return (
          <div className="space-y-3">
            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#C9B8FF] block mb-1">
                Continuous Education
              </span>
              <h3 className="font-grotesk text-[16px] font-bold text-[#E8EDF2] mb-1">
                Curriculum & Self-Direction
              </h3>
              <p className="text-[12.5px] text-[#C5CED8]">
                B.Tech Artificial Intelligence and Data Science coursework combined with hands-on open data engineering.
              </p>
            </div>

            <div className="space-y-2">
              <div className="bg-[#151B23] border border-[#1B222B] rounded-[18px] p-3">
                <span className="text-[11px] font-mono text-[#7CF2C9] block">Spatial Data Science</span>
                <p className="text-[12px] text-[#E8EDF2] font-medium">NASA FIRMS, GIS & Geospatial Coordinates</p>
              </div>
              <div className="bg-[#151B23] border border-[#1B222B] rounded-[18px] p-3">
                <span className="text-[11px] font-mono text-[#8AB4FF] block">Modern Web Systems</span>
                <p className="text-[12px] text-[#E8EDF2] font-medium">React, Vite, Tailwind CSS, Component Architecture</p>
              </div>
              <div className="bg-[#151B23] border border-[#1B222B] rounded-[18px] p-3">
                <span className="text-[11px] font-mono text-[#FFB86B] block">Database & Queries</span>
                <p className="text-[12px] text-[#E8EDF2] font-medium">SQL Schema Design, Query Optimization, ETL</p>
              </div>
            </div>
          </div>
        );

      case 'links':
        return (
          <div className="space-y-2.5">
            <a
              href="https://github.com/Yasar-17"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-[#151B23] hover:bg-[#1a232e] border border-[#1B222B] rounded-[20px] p-3.5 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <GithubIcon className="w-5 h-5 text-[#7CF2C9]" />
                <div>
                  <span className="text-[13px] font-semibold text-[#E8EDF2] block">GitHub</span>
                  <span className="text-[11px] text-[#9AA6B2] font-mono">github.com/Yasar-17</span>
                </div>
              </div>
              <ExternalLinkIcon className="w-4 h-4 text-[#9AA6B2]" />
            </a>

            <a
              href="mailto:mohammedyasar990@gmail.com"
              className="flex items-center justify-between bg-[#151B23] hover:bg-[#1a232e] border border-[#1B222B] rounded-[20px] p-3.5 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <MailIcon className="w-5 h-5 text-[#FFB86B]" />
                <div>
                  <span className="text-[13px] font-semibold text-[#E8EDF2] block">Email Direct</span>
                  <span className="text-[11px] text-[#9AA6B2] font-mono">mohammedyasar990@gmail.com</span>
                </div>
              </div>
              <ExternalLinkIcon className="w-4 h-4 text-[#9AA6B2]" />
            </a>

            <button
              type="button"
              onClick={() => openApp('case-studies')}
              className="w-full flex items-center justify-between bg-[#151B23] hover:bg-[#1a232e] border border-[#1B222B] rounded-[20px] p-3.5 transition-colors text-left"
            >
              <div className="flex items-center space-x-3">
                <BarChartIcon className="w-5 h-5 text-[#8AB4FF]" />
                <div>
                  <span className="text-[13px] font-semibold text-[#E8EDF2] block">Case Studies</span>
                  <span className="text-[11px] text-[#9AA6B2] font-mono">SIH26162 & Client Work</span>
                </div>
              </div>
              <ArrowLeftIcon className="w-4 h-4 rotate-180 text-[#9AA6B2]" />
            </button>
          </div>
        );

      case 'opensource':
        return (
          <div className="space-y-3">
            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFB86B] block mb-1">
                Open Source & Public Tools
              </span>
              <h3 className="font-grotesk text-[16px] font-bold text-[#E8EDF2] mb-1">
                Open Code Commitments
              </h3>
              <p className="text-[12.5px] text-[#C5CED8] leading-relaxed">
                Publishing clean, reproducible prototypes for spatial anomaly classification and modern web systems.
              </p>
            </div>

            <div className="bg-[#151B23] border border-[#1B222B] rounded-[20px] p-3.5 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-grotesk text-[14px] font-semibold text-[#8AB4FF]">
                  SIH26162 Classifier
                </span>
                <span className="text-[10px] font-mono text-[#7CF2C9] bg-[#1F2933] px-2 py-0.5 rounded-full">
                  Python
                </span>
              </div>
              <p className="text-[12px] text-[#9AA6B2]">
                Open-source telemetry filtering pipeline against NASA FIRMS public endpoints.
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4 text-center text-[#9AA6B2]">
            App content coming soon.
          </div>
        );
    }
  };

  const getTitle = () => {
    switch (appId) {
      case 'about': return 'About';
      case 'skills': return 'Skills';
      case 'experience': return 'Experience';
      case 'resume': return 'Resume';
      case 'contact': return 'Contact';
      case 'dashboards': return 'Dashboards';
      case 'learning': return 'Learning';
      case 'links': return 'Links';
      case 'opensource': return 'Open Source';
      default: return 'App';
    }
  };

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
          <h2 className="font-grotesk text-[17px] font-semibold text-[#E8EDF2] leading-none">
            {getTitle()}
          </h2>
        </div>

        <button
          type="button"
          onClick={closeApp}
          className="text-[12px] font-medium text-[#7CF2C9] px-2.5 py-1 bg-[#151B23] border border-[#1B222B] rounded-full hover:bg-[#1a232e]"
        >
          Home
        </button>
      </div>

      {/* CONTENT BODY */}
      <div className="flex-1 overflow-y-auto no-scrollbar py-3 pr-0.5">
        {renderContent()}
      </div>

      {/* FOOTER */}
      <div className="pt-3 border-t border-[#1B222B] flex items-center justify-between">
        <span className="text-[11px] font-mono text-[#9AA6B2]">
          Yasar Portfolio OS
        </span>
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

