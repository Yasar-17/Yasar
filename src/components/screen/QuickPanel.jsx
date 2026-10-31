import React from 'react';
import { usePhone } from '../../context/PhoneContext';
import { 
  VolumeIcon, VolumeMuteIcon, PowerIcon, RotateIcon,
  MailIcon, FileTextIcon, CloseIcon, SparklesIcon, ExternalLinkIcon
} from '../../ui/Icons';

export const QuickPanel = () => {
  const { 
    isQuickPanelOpen, setIsQuickPanelOpen, 
    soundEnabled, toggleSound, 
    toggleLock, resetRotation, 
    cycleGlyph, activeGlyphPattern,
    openApp 
  } = usePhone();

  if (!isQuickPanelOpen) return null;

  return (
    <div 
      className="absolute inset-0 z-40 bg-[#0B0F14]/95 backdrop-blur-xl flex flex-col justify-between p-5 pt-12 pb-6 overflow-hidden animate-in fade-in slide-in-from-top-8 duration-200"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-[#1B222B] pb-3">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#7CF2C9]" />
          <span className="text-[12px] font-mono uppercase tracking-wider text-[#E8EDF2] font-semibold">
            Quick Settings & Actions
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsQuickPanelOpen(false)}
          className="w-8 h-8 rounded-full bg-[#151B23] border border-[#1B222B] text-[#9AA6B2] hover:text-[#E8EDF2] flex items-center justify-center transition-colors"
          aria-label="Close Quick Panel"
        >
          <CloseIcon className="w-4 h-4" />
        </button>
      </div>

      {/* QUICK SYSTEM TILES (4x grid) */}
      <div className="grid grid-cols-2 gap-3 my-4">
        
        {/* Toggle Sound */}
        <button
          type="button"
          onClick={toggleSound}
          className={`flex items-center space-x-3 p-3.5 rounded-[20px] border transition-all text-left ${
            soundEnabled 
              ? 'bg-[#151B23] border-[#7CF2C9]/40 text-[#E8EDF2]' 
              : 'bg-[#151B23]/50 border-[#1B222B] text-[#9AA6B2]'
          }`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${soundEnabled ? 'bg-[#7CF2C9] text-[#0B0F14]' : 'bg-[#1F2933] text-[#9AA6B2]'}`}>
            {soundEnabled ? <VolumeIcon className="w-5 h-5" /> : <VolumeMuteIcon className="w-5 h-5" />}
          </div>
          <div>
            <span className="text-[13px] font-medium block">Sound FX</span>
            <span className="text-[10px] font-mono text-[#9AA6B2] block">{soundEnabled ? 'Synthesized' : 'Muted'}</span>
          </div>
        </button>

        {/* Lock Device */}
        <button
          type="button"
          onClick={toggleLock}
          className="flex items-center space-x-3 p-3.5 rounded-[20px] bg-[#151B23] border border-[#1B222B] hover:border-[#FFB86B]/40 transition-all text-left"
        >
          <div className="w-10 h-10 rounded-full bg-[#FFB86B] text-[#0B0F14] flex items-center justify-center">
            <PowerIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[13px] font-medium text-[#E8EDF2] block">Lock Screen</span>
            <span className="text-[10px] font-mono text-[#9AA6B2] block">Sleep Device</span>
          </div>
        </button>

        {/* Cycle Glyph Equalizer */}
        <button
          type="button"
          onClick={cycleGlyph}
          className="flex items-center space-x-3 p-3.5 rounded-[20px] bg-[#151B23] border border-[#1B222B] hover:border-[#8AB4FF]/40 transition-all text-left"
        >
          <div className="w-10 h-10 rounded-full bg-[#8AB4FF] text-[#0B0F14] flex items-center justify-center">
            <SparklesIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[13px] font-medium text-[#E8EDF2] block">Glyph Mode</span>
            <span className="text-[10px] font-mono text-[#9AA6B2] block">Pattern #{activeGlyphPattern + 1}</span>
          </div>
        </button>

        {/* Reset 3D Rotation */}
        <button
          type="button"
          onClick={resetRotation}
          className="flex items-center space-x-3 p-3.5 rounded-[20px] bg-[#151B23] border border-[#1B222B] hover:border-white/30 transition-all text-left"
        >
          <div className="w-10 h-10 rounded-full bg-[#1F2933] text-[#E8EDF2] flex items-center justify-center">
            <RotateIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[13px] font-medium text-[#E8EDF2] block">Reset 3D</span>
            <span className="text-[10px] font-mono text-[#9AA6B2] block">Center View</span>
          </div>
        </button>

      </div>

      {/* QUICK ACTIONS LIST */}
      <div className="flex flex-col space-y-2 mb-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#9AA6B2] px-1">
          Direct Connect
        </span>

        {/* Action 1: Contact Direct */}
        <button
          type="button"
          onClick={() => { setIsQuickPanelOpen(false); openApp('contact'); }}
          className="flex items-center justify-between bg-[#151B23] hover:bg-[#1a232e] border border-[#1B222B] rounded-[18px] p-3 transition-colors text-left"
        >
          <div className="flex items-center space-x-3">
            <MailIcon className="w-4 h-4 text-[#7CF2C9]" />
            <div>
              <span className="text-[13px] font-medium text-[#E8EDF2] block">Send Direct Message</span>
              <span className="text-[11px] text-[#9AA6B2] block">mohammedyasar990@gmail.com</span>
            </div>
          </div>
          <span className="text-[11px] text-[#7CF2C9] font-medium">Open</span>
        </button>

        {/* Action 2: Resume Download */}
        <button
          type="button"
          onClick={() => { setIsQuickPanelOpen(false); openApp('resume'); }}
          className="flex items-center justify-between bg-[#151B23] hover:bg-[#1a232e] border border-[#1B222B] rounded-[18px] p-3 transition-colors text-left"
        >
          <div className="flex items-center space-x-3">
            <FileTextIcon className="w-4 h-4 text-[#FFB86B]" />
            <div>
              <span className="text-[13px] font-medium text-[#E8EDF2] block">Download Resume</span>
              <span className="text-[11px] text-[#9AA6B2] block">Data Analyst & AI Builder</span>
            </div>
          </div>
          <span className="text-[11px] text-[#FFB86B] font-medium">View</span>
        </button>

        {/* Action 3: Book a Call */}
        <a
          href="mailto:mohammedyasar990@gmail.com?subject=Portfolio%20Inquiry%20-%20Schedule%20a%20Call"
          className="flex items-center justify-between bg-[#151B23] hover:bg-[#1a232e] border border-[#1B222B] rounded-[18px] p-3 transition-colors text-left"
        >
          <div className="flex items-center space-x-3">
            <ExternalLinkIcon className="w-4 h-4 text-[#8AB4FF]" />
            <div>
              <span className="text-[13px] font-medium text-[#E8EDF2] block">Book A Call</span>
              <span className="text-[11px] text-[#9AA6B2] block">Interviews & Collaboration</span>
            </div>
          </div>
          <span className="text-[11px] text-[#8AB4FF] font-medium">Email</span>
        </a>
      </div>

      {/* PULL UP HANDLE */}
      <div 
        onClick={() => setIsQuickPanelOpen(false)}
        className="flex flex-col items-center pt-2 cursor-pointer group"
      >
        <div className="w-[36px] h-[4px] rounded-full bg-[#1F2933] group-hover:bg-[#7CF2C9] transition-colors" />
      </div>

    </div>
  );
};
