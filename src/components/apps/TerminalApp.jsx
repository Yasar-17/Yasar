import React, { useState, useRef, useEffect } from 'react';
import { usePhone } from '../../context/PhoneContext';
import { AppWindow } from '../screen/AppWindow';
import { playSound } from '../../audio/soundEngine';

export const TerminalApp = () => {
  const { soundEnabled } = usePhone();
  const [history, setHistory] = useState([
    { type: 'system', text: 'Yasar OS Shell [v3.0.0-release]' },
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
          '  about       - Summary of background and profile',
          '  skills      - Technical toolbelt and proficiencies',
          '  projects    - Active repositories and production deployments',
          '  experience  - Academic and professional timeline',
          '  telemetry   - Status of SIH26162 classifier streams',
          '  contact     - Communication links and email address',
          '  date        - Current system timestamp',
          '  clear       - Clear terminal buffer',
        ];
        break;
      case 'about':
      case 'whoami':
        response = [
          'Mohammed Yasar',
          'Data Analyst & Builder',
          'Third-year B.Tech AI & Data Science | Chennai, India',
          'Focus: Machine learning classification, spatial telemetry, and 3D web systems.',
        ];
        break;
      case 'skills':
        response = [
          'Technical Toolbelt:',
          '  Languages: Python, SQL, JavaScript',
          '  Data/ML:   NumPy, Pandas, Scikit-Learn, NASA FIRMS, OpenStreetMap',
          '  Frontend:  React 18, Three.js, React Three Fiber, Tailwind CSS',
          '  Systems:   Git, Linux, Bash, REST APIs, Web Audio API',
        ];
        break;
      case 'projects':
        response = [
          '1. Zenny Studios — Production Client Site (React, Tailwind)',
          '2. SIH26162 Wildfire Classifier — Spatial Satellite Telemetry (Python, GIS)',
          '3. 3D Phone Portfolio — Physical WebGL Unibody & OS (Three.js, R3F)',
        ];
        break;
      case 'experience':
        response = [
          'Timeline:',
          '  2024-Present : Freelance Full-Stack Developer @ Zenny Studios',
          '  2024         : National Finalist @ Smart India Hackathon (SIH26162)',
          '  2022-2026    : B.Tech AI & Data Science Undergraduate @ Chennai',
        ];
        break;
      case 'telemetry':
        response = [
          'SIH26162 Stream Status:',
          '  Satellite Feeds: ACTIVE (NASA FIRMS MODIS/VIIRS)',
          '  Vector Cache:    SYNCHRONIZED (OpenStreetMap GIS)',
          '  Suppression:     84.6% false-positive reduction',
          '  Batch Throughput: 14,800 telemetry points verified',
        ];
        break;
      case 'contact':
        response = [
          'Direct Inquiries:',
          '  Email:  mohammedyasar990@gmail.com',
          '  GitHub: https://github.com/Yasar-17',
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
    }

    setHistory((prev) => [...prev, newEntry, ...response.map((r) => ({ type: 'res', text: r }))]);
    setInputVal('');
  };

  return (
    <AppWindow title="Terminal" subtitle="Interactive CLI">
      <div 
        className="h-full flex flex-col justify-between font-mono text-[11.5px] cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="space-y-1.5 leading-relaxed overflow-y-auto pr-1">
          {history.map((line, i) => (
            <div
              key={i}
              className={`${
                line.type === 'cmd'
                  ? 'text-[#7CF2C9] font-bold'
                  : line.type === 'system'
                  ? 'text-[#626e7e]'
                  : 'text-[#C5CED8]'
              }`}
            >
              {line.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Line */}
        <form onSubmit={handleCommand} className="flex items-center space-x-1.5 pt-3 mt-2 border-t border-[#1b222d]">
          <span className="text-[#7CF2C9] font-bold shrink-0">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help'..."
            className="flex-1 bg-transparent text-[#E8EDF2] focus:outline-none placeholder-[#3d4756] font-mono text-[11.5px]"
            autoFocus
          />
        </form>
      </div>
    </AppWindow>
  );
};

export default TerminalApp;
