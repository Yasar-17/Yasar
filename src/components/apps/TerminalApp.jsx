import React, { useState, useRef, useEffect } from 'react';
import { usePhone } from '../../context/PhoneContext';
import { AppWindow } from '../screen/AppWindow';
import { playSound } from '../../audio/soundEngine';
import { PROFILE, PROJECTS, EXPERIENCES, EDUCATION, SKILL_CATEGORIES } from '../../data';

export const TerminalApp = () => {
  const { soundEnabled } = usePhone();
  const [history, setHistory] = useState([
    { type: 'system', text: 'Yasar OS Shell [v3.1.0-release]' },
    { type: 'system', text: 'Type "help" to display available commands.' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    playSound('tick', soundEnabled);
    const newEntry = { type: 'cmd', text: `guest@yasar.dev:~$ ${cmd}` };
    const lower = cmd.toLowerCase();
    let response = [];

    switch (lower) {
      case 'help':
        response = [
          'Available commands:',
          '  about       - Summary of background and verified profile',
          '  skills      - Technical capabilities and toolbelt',
          '  projects    - Active repositories and live deployments',
          '  experience  - Professional, internship & hackathon history',
          '  education   - Academic degree, institution and standing',
          '  telemetry   - Status of SIH-26 thermal classifier pipeline',
          '  contact     - Working communication channels (email, linkedin, github)',
          '  date        - Current system timestamp',
          '  clear       - Clear terminal buffer',
        ];
        break;
      case 'about':
      case 'whoami':
        response = [
          `${PROFILE.name} (${PROFILE.fullName})`,
          PROFILE.role,
          `${EDUCATION.shortDegree} | ${PROFILE.location}`,
          `Status: ${PROFILE.availability}`,
          `Interests: ${PROFILE.interests.join(', ')}`,
        ];
        break;
      case 'skills':
        response = [
          'Verified Technical Capabilities:',
          ...SKILL_CATEGORIES.map(
            (c) => `  ${c.title}: ${c.skills.map((s) => s.name).join(', ')}`
          ),
        ];
        break;
      case 'projects':
        response = [
          'Featured Repositories & Deployments:',
          ...PROJECTS.slice(0, 5).map(
            (p, idx) => `  ${idx + 1}. ${p.title} [${p.status}]${p.liveUrl ? ` - ${p.liveUrl}` : ''}`
          ),
        ];
        break;
      case 'experience':
        response = [
          'Timeline & Achievements:',
          ...EXPERIENCES.map(
            (exp) => `  * ${exp.role} @ ${exp.organization} (${exp.period})`
          ),
        ];
        break;
      case 'education':
        response = [
          `${EDUCATION.degree} in ${EDUCATION.major}`,
          `Institution: ${EDUCATION.institution} (${EDUCATION.affiliation})`,
          `Academic Standing: GPA ${EDUCATION.gpa}`,
          `Period: ${EDUCATION.period} | Expected: ${EDUCATION.expectedGraduation}`,
        ];
        break;
      case 'telemetry':
        response = [
          'SIH-26 Classifier Status:',
          '  Feeds:       ACTIVE (NASA FIRMS MODIS/VIIRS)',
          '  Topology:    SYNCHRONIZED (OpenStreetMap GIS)',
          '  Suppression: 84.6% false-positive reduction',
          '  Status:      National Finalist (Smart India Hackathon 2024)',
        ];
        break;
      case 'contact':
        response = [
          'Working Contact Options:',
          `  Email:    ${PROFILE.email}`,
          `  LinkedIn: ${PROFILE.linkedin}`,
          `  GitHub:   ${PROFILE.github}`,
        ];
        break;
      case 'date':
        response = [new Date().toUTCString()];
        break;
      case 'sudo':
        response = ['Permission denied: user guest is not in sudoers file.'];
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      default:
        response = [`Command not found: "${cmd}". Type "help" for a list of commands.`];
        break;
    }

    setHistory((prev) => [...prev, newEntry, ...response.map((r) => ({ type: 'out', text: r }))]);
    setInputVal('');
  };

  return (
    <AppWindow title="Terminal" subtitle="CLI Interface">
      <div 
        className="bg-[#080B10] border border-[#1b222d] rounded-[22px] p-3.5 shadow-inner flex flex-col font-mono text-xs text-[#E8EDF2] h-full min-h-[360px]"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex-1 space-y-1.5 overflow-y-auto no-scrollbar pb-2">
          {history.map((item, index) => (
            <div key={index} className="leading-snug">
              {item.type === 'cmd' ? (
                <span className="text-[#7CF2C9]">{item.text}</span>
              ) : item.type === 'system' ? (
                <span className="text-[#626e7e]">{item.text}</span>
              ) : (
                <span className="text-[#C5CED8] whitespace-pre-wrap">{item.text}</span>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input prompt line */}
        <form onSubmit={handleCommand} className="flex items-center space-x-2 pt-2 border-t border-[#141922]">
          <span className="text-[#7CF2C9] shrink-0">guest@yasar:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[#F0F4F8] font-mono text-xs focus:ring-0 p-0"
            autoFocus
            spellCheck={false}
          />
        </form>
      </div>
    </AppWindow>
  );
};

export default TerminalApp;
