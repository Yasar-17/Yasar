import React from 'react';
import { usePhone } from '../../context/PhoneContext';
import { 
  VolumeIcon, VolumeMuteIcon, PowerIcon, RotateIcon,
  CloseIcon, SparklesIcon, CameraIcon
} from '../../ui/Icons';
import { StatusBar } from './StatusBar';
import { Navigation } from './Navigation';
import { glyphController } from '../glyph/glyphController';

export const QuickPanel = () => {
  const { 
    isQuickPanelOpen, setIsQuickPanelOpen, 
    soundEnabled, toggleSound, 
    toggleLock, resetRotation, 
    cycleGlyph, activeGlyphPattern,
    openApp,
  } = usePhone();

  if (!isQuickPanelOpen) return null;

  return (
    <div 
      className="absolute inset-0 z-40 bg-[#080b10]/95 backdrop-blur-xl flex flex-col justify-between p-4 pt-1.5 pb-2 overflow-hidden animate-in fade-in slide-in-from-top-8 duration-200 select-none font-sans"
    >
      <StatusBar />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1f2633] pb-2 my-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#7CF2C9]" />
          <span className="text-xs font-mono uppercase tracking-wider text-[#E8EDF2] font-semibold">
            Quick Settings
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsQuickPanelOpen(false)}
          className="p-1.5 rounded-lg bg-[#141820] hover:bg-[#1b222d] border border-[#232c3a] text-[#9AA6B2] hover:text-white transition-colors"
          aria-label="Close Quick Panel"
        >
          <CloseIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Tiles */}
      <div className="grid grid-cols-2 gap-2.5 my-auto">
        {/* Toggle Sound */}
        <button
          type="button"
          onClick={toggleSound}
          className={`flex items-center space-x-3 p-3 rounded-[20px] border transition-all text-left ${
            soundEnabled 
              ? 'bg-[#141820] border-[#7CF2C9]/50 text-[#E8EDF2]' 
              : 'bg-[#141820]/50 border-[#1f2633] text-[#9AA6B2]'
          }`}
        >
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${soundEnabled ? 'bg-[#7CF2C9] text-[#0B0F14]' : 'bg-[#1b222d] text-[#626e7e]'}`}>
            {soundEnabled ? <VolumeIcon className="w-4 h-4" /> : <VolumeMuteIcon className="w-4 h-4" />}
          </div>
          <div>
            <span className="text-xs font-mono font-bold block">Audio FX</span>
            <span className="text-[10px] font-mono text-[#626e7e] block">{soundEnabled ? 'Active' : 'Muted'}</span>
          </div>
        </button>

        {/* Lock Phone */}
        <button
          type="button"
          onClick={() => { toggleLock(); setIsQuickPanelOpen(false); }}
          className="flex items-center space-x-3 p-3 rounded-[20px] bg-[#141820] border border-[#1f2633] hover:border-[#FF453A]/40 text-left transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#1b222d] group-hover:bg-[#FF453A]/20 flex items-center justify-center text-[#9AA6B2] group-hover:text-[#FF453A] shrink-0 transition-colors">
            <PowerIcon className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold block text-[#E8EDF2]">Lock Phone</span>
            <span className="text-[10px] font-mono text-[#626e7e] block">Standby mode</span>
          </div>
        </button>

        {/* Cycle Glyph Matrix */}
        <button
          type="button"
          onClick={cycleGlyph}
          className="flex items-center space-x-3 p-3 rounded-[20px] bg-[#141820] border border-[#1f2633] hover:border-[#7CF2C9]/40 text-left transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#1b222d] group-hover:bg-[#7CF2C9]/20 flex items-center justify-center text-[#9AA6B2] group-hover:text-[#7CF2C9] shrink-0 transition-colors">
            <SparklesIcon className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold block text-[#E8EDF2]">Glyph LEDs</span>
            <span className="text-[10px] font-mono text-[#626e7e] block">Pattern {activeGlyphPattern + 1}</span>
          </div>
        </button>

        {/* Quick Launch Camera */}
        <button
          type="button"
          onClick={() => { openApp('camera'); setIsQuickPanelOpen(false); }}
          className="flex items-center space-x-3 p-3 rounded-[20px] bg-[#141820] border border-[#1f2633] hover:border-[#7CF2C9]/40 text-left transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#1b222d] group-hover:bg-[#7CF2C9]/20 flex items-center justify-center text-[#9AA6B2] group-hover:text-[#7CF2C9] shrink-0 transition-colors">
            <CameraIcon className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold block text-[#E8EDF2]">140x Camera</span>
            <span className="text-[10px] font-mono text-[#626e7e] block">Sony periscope</span>
          </div>
        </button>

        {/* Solar Path Glyph */}
        <button
          type="button"
          onClick={() => {
            glyphController.playPattern('solarPath', 4000, 'idle');
            setIsQuickPanelOpen(false);
          }}
          className="flex items-center space-x-3 p-3 rounded-[20px] bg-[#141820] border border-[#1f2633] hover:border-[#FFD166]/40 text-left transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#1b222d] group-hover:bg-[#FFD166]/20 flex items-center justify-center text-[#9AA6B2] group-hover:text-[#FFD166] shrink-0 transition-colors">
            <SparklesIcon className="w-4 h-4 text-[#FFD166]" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold block text-[#E8EDF2]">Solar Path</span>
            <span className="text-[10px] font-mono text-[#626e7e] block">137-LED solar arc</span>
          </div>
        </button>

        {/* Reset 3D Rotation */}
        <button
          type="button"
          onClick={() => { resetRotation(); setIsQuickPanelOpen(false); }}
          className="flex items-center space-x-3 p-3 rounded-[20px] bg-[#141820] border border-[#1f2633] hover:border-[#8AB4FF]/40 text-left transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#1b222d] group-hover:bg-[#8AB4FF]/20 flex items-center justify-center text-[#9AA6B2] group-hover:text-[#8AB4FF] shrink-0 transition-colors">
            <RotateIcon className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold block text-[#E8EDF2]">Reset Angle</span>
            <span className="text-[10px] font-mono text-[#626e7e] block">Center phone</span>
          </div>
        </button>
      </div>

      <Navigation />
    </div>
  );
};

export default QuickPanel;
