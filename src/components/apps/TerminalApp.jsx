import React, { useState, useRef, useEffect } from 'react';
import { usePhone } from '../../context/PhoneContext';
import { ArrowLeftIcon } from '../../ui/Icons';
import { playSound } from '../../audio/soundEngine';

export const TerminalApp = () => {
  const { closeApp, soundEnabled } = usePhone();
  const [history, setHistory] = useState([
    { type: 'system', text: 'Yasar OS Terminal [Version 2.0.4]' },
    { type: 'system', text: 'Type "help" to see available telemetry commands.' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    playSound('tick', soundEnabled);
    const newEntry = { type: 'cmd', text: `yasar@portfolio:~$ ${inputVal}` };
    let response = [];

    switch (cmd) {
      case 'help':
        response = [
          'Available commands:',
          '  about       - Summary of background and focus',
          '  skills      - Technical toolbelt and proficiencies',
          '  projects    - Active repositories and production deployments',
          '  telemetry   - Status of SIH26162 classifier streams',
          '  contact     - Communication links and email address',
          '  clear       - Clear terminal buffer',
        ];
        break;
      case 'about':
      case 'whoami':
        response = [
          'Name: Yasar',
          'Role: Data Analyst & Builder',
          'Education: Third-year B.Tech in Artificial Intelligence & Data Science',
          'Location: Chennai, India',
          'Focus: Real-world geospatial analytics, spatial classification, client systems',
        ];
        break;
      case 'skills':
        response = [
          'Core Technical Proficiencies:',
          '  Languages: Python, SQL, JavaScript',
          '  Data & ML: NASA FIRMS, OpenStreetMap, Spatial ML, Pandas, NumPy',
          '  Web & UI:  HTML5, Tailwind CSS, React, Framer Motion, Vite',
        ];
        break;
      case 'projects':
        response = [
          '1. Zenny Studios Client Site',
          '   - Tech: HTML, Tailwind CSS, JavaScript',
          '   - Status: Live in production',
          '2. SIH26162 Thermal Anomaly Classifier',
          '   - Tech: Python, NASA FIRMS, OpenStreetMap',
          '   - Status: Prototype active on streaming satellite feeds',
        ];
        break;
      case 'telemetry':
        response = [
          'Telemetry Stream SIH26162 Status:',
          '  Sensor Ingestion: ACTIVE (NASA FIRMS MODIS/VIIRS)',
          '  Geospatial Cache: SYNCHRONIZED (OpenStreetMap)',
          '  Anomaly Noise Suppression: [X]%',
          '  Records Ingested: [N] stream points',
        ];
        break;
      case 'contact':
        response = [
          'Direct Contact Channels:',
          '  Email:  mohammedyasar990@gmail.com',
          '  GitHub: https://github.com/Yasar-17',
        ];
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
    <div className="w-full h-full bg-[#0a0d12] text-[#E8EDF2] flex flex-col justify-between p-4 pt-12 pb-6 overflow-hidden font-mono text-[12px]">
      
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-[#1f2835] pb-3">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={closeApp}
            className="w-8 h-8 rounded-full bg-[#151d26] border border-[#232f3e] text-[#9AA6B2] hover:text-[#E8EDF2] flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Back to Home"
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </button>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#7CF2C9] animate-pulse" />
            <span className="text-[#7CF2C9] font-semibold text-[13px]">cli.yasar.dev</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => { setHistory([]); playSound('tick', soundEnabled); }}
          className="text-[10px] text-[#9AA6B2] hover:text-[#E8EDF2] px-2 py-1 bg-[#151d26] rounded border border-[#232f3e]"
        >
          Clear
        </button>
      </div>

      {/* TERMINAL OUTPUT BUFFER */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-1 py-3 pr-1">
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`${
              line.type === 'cmd' 
                ? 'text-[#7CF2C9] font-medium' 
                : line.type === 'system' 
                ? 'text-[#9AA6B2]' 
                : 'text-[#C5CED8]'
            } leading-relaxed`}
          >
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* CLI INPUT PROMPT */}
      <form onSubmit={handleCommand} className="flex items-center space-x-2 border-t border-[#1f2835] pt-3">
        <span className="text-[#7CF2C9] font-semibold">yasar@os:~$</span>
        <input 
          type="text" 
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="type a command..."
          className="flex-1 bg-transparent text-[#E8EDF2] focus:outline-none text-[12px] font-mono placeholder-[#4a586a]"
          autoFocus
        />
      </form>

    </div>
  );
};

