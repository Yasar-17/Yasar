import React from 'react';
import { usePhone } from '../../context/PhoneContext';
import { ArrowLeftIcon, CheckIcon, VolumeIcon, VolumeMuteIcon, SparklesIcon } from '../../ui/Icons';
import { playSound } from '../../audio/soundEngine';

export const SettingsApp = () => {
  const { 
    closeApp, 
    activeWallpaper, setActiveWallpaper, 
    soundEnabled, toggleSound, 
    activeGlyphPattern, cycleGlyph 
  } = usePhone();

  const wallpapers = [
    { id: 'warm-copper', name: 'Warm Copper', bg: 'bg-gradient-to-br from-[#8b4513] to-[#d97724]' },
    { id: 'obsidian', name: 'Deep Obsidian', bg: 'bg-gradient-to-br from-[#121922] to-[#05070a]' },
    { id: 'midnight', name: 'Midnight', bg: 'bg-gradient-to-br from-[#2a1b40] to-[#0a0712]' },
    { id: 'silver', name: 'Frosted Silver', bg: 'bg-gradient-to-br from-[#bcc7d3] to-[#485360]' },
  ];

  return (
    <div className="w-full h-full bg-[#0B0F14] text-[#E8EDF2] flex flex-col justify-between p-4 pt-12 pb-6 overflow-hidden">
      
      {/* HEADER */}
      <div className="flex items-center space-x-3 border-b border-[#1B222B] pb-3">
        <button
          type="button"
          onClick={closeApp}
          className="w-9 h-9 rounded-full bg-[#151B23] border border-[#1B222B] text-[#9AA6B2] hover:text-[#E8EDF2] flex items-center justify-center transition-colors focus:outline-none"
          aria-label="Back to Home"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <div>
          <h2 className="font-grotesk text-[17px] font-semibold text-[#E8EDF2] leading-none">
            Settings
          </h2>
          <span className="text-[11px] text-[#9AA6B2] font-mono">Personalization & Telemetry</span>
        </div>
      </div>

      {/* CONTENT LIST */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 py-3 pr-0.5">
        
        {/* WALLPAPER PICKER */}
        <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#7CF2C9] block mb-2 font-medium">
            System Wallpaper
          </span>

          <div className="grid grid-cols-2 gap-2.5">
            {wallpapers.map((wp) => {
              const isSelected = activeWallpaper === wp.id;
              return (
                <button
                  key={wp.id}
                  type="button"
                  onClick={() => {
                    setActiveWallpaper(wp.id);
                    playSound('tick', soundEnabled);
                  }}
                  className={`flex items-center space-x-2.5 p-2 rounded-[16px] border transition-all text-left ${
                    isSelected ? 'border-[#7CF2C9] bg-[#1F2933]' : 'border-[#2B3542] hover:border-white/20'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${wp.bg} shadow-inner flex items-center justify-center flex-shrink-0`}>
                    {isSelected && <CheckIcon className="w-4 h-4 text-white drop-shadow" />}
                  </div>
                  <span className="text-[12px] font-medium text-[#E8EDF2] truncate">
                    {wp.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* AUDIO ENGINE TOGGLE */}
        <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${soundEnabled ? 'bg-[#7CF2C9] text-[#0B0F14]' : 'bg-[#1F2933] text-[#9AA6B2]'}`}>
              {soundEnabled ? <VolumeIcon className="w-5 h-5" /> : <VolumeMuteIcon className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-[13px] font-medium text-[#E8EDF2] block">Web Audio Synthesizer</span>
              <span className="text-[11px] text-[#9AA6B2] block">Tactile clicks & mechanical haptics</span>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleSound}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${soundEnabled ? 'bg-[#7CF2C9]' : 'bg-[#1F2933]'}`}
            aria-label="Toggle Sound"
          >
            <div className={`w-5 h-5 rounded-full bg-[#0B0F14] transition-transform ${soundEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* GLYPH EQUALIZER PATTERN */}
        <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#FFB86B] text-[#0B0F14] flex items-center justify-center">
              <SparklesIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[13px] font-medium text-[#E8EDF2] block">Rear Glyph Matrix</span>
              <span className="text-[11px] text-[#9AA6B2] block">Pattern #{activeGlyphPattern + 1} active</span>
            </div>
          </div>

          <button
            type="button"
            onClick={cycleGlyph}
            className="text-[11px] font-mono text-[#7CF2C9] bg-[#1F2933] hover:bg-[#25323e] border border-[#2B3542] px-3 py-1.5 rounded-full transition-colors"
          >
            Cycle
          </button>
        </div>

        {/* HARDWARE SPECIFICATIONS SUMMARY */}
        <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#8AB4FF] block mb-2 font-medium">
            Hardware & Architecture Specs
          </span>
          <div className="space-y-1.5 text-[11px] font-mono text-[#9AA6B2]">
            <div className="flex justify-between">
              <span>Chassis Model</span>
              <span className="text-[#E8EDF2]">SIH-26162 Edition</span>
            </div>
            <div className="flex justify-between">
              <span>Body Material</span>
              <span className="text-[#E8EDF2]">Extruded Anodized Aluminum</span>
            </div>
            <div className="flex justify-between">
              <span>Corner Finish</span>
              <span className="text-[#E8EDF2]">Diamond-Cut CNC Chamfers</span>
            </div>
            <div className="flex justify-between">
              <span>Display Resolution</span>
              <span className="text-[#E8EDF2]">390 x 844 px OLED</span>
            </div>
            <div className="flex justify-between">
              <span>Rear Matrix</span>
              <span className="text-[#E8EDF2]">137 Mini-LED Realtime Array</span>
            </div>
            <div className="flex justify-between">
              <span>Developer Stack</span>
              <span className="text-[#7CF2C9]">React 18 + Vite + Tailwind</span>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <div className="pt-2 text-center text-[10px] font-mono text-[#637282]">
        Designed & Engineered by Yasar
      </div>

    </div>
  );
};
