import React, { useState } from 'react';
import { usePhone } from '../../context/PhoneContext';
import { AppWindow } from '../screen/AppWindow';
import { CheckIcon, VolumeIcon, VolumeMuteIcon, SparklesIcon, CpuIcon, CameraIcon } from '../../ui/Icons';
import { playSound } from '../../audio/soundEngine';
import { NothingProductModal } from '../showcase/NothingProductModal';

export const SettingsApp = () => {
  const { 
    activeWallpaper, setActiveWallpaper, 
    soundEnabled, toggleSound, 
    activeGlyphPattern, cycleGlyph,
    openApp
  } = usePhone();

  const [showModal, setShowModal] = useState(false);

  const wallpapers = [
    { id: 'obsidian', name: 'Pure Obsidian', bg: 'bg-[#080a0f]' },
    { id: 'silver', name: 'Monochrome Silver', bg: 'bg-[#1b222d]' },
    { id: 'carbon', name: 'Carbon Matrix', bg: 'bg-[#111620]' },
    { id: 'graphite', name: 'Graphite Glass', bg: 'bg-[#1e2736]' },
  ];

  return (
    <AppWindow title="Settings" subtitle="System & Hardware Specs">
      {/* 1. Wallpaper Selector */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#7CF2C9] font-semibold block">
          Display Wallpaper
        </span>

        <div className="grid grid-cols-2 gap-2">
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
                className={`flex items-center space-x-2.5 p-2 rounded-xl border transition-all text-left ${
                  isSelected ? 'border-[#7CF2C9] bg-[#1d2633]' : 'border-[#222c3a] hover:border-white/20'
                }`}
              >
                <div className={`w-7 h-7 rounded-full ${wp.bg} border border-white/20 flex items-center justify-center shrink-0`}>
                  {isSelected && <CheckIcon className="w-3.5 h-3.5 text-[#7CF2C9]" />}
                </div>
                <span className="font-mono text-[11px] text-[#E8EDF2] truncate">
                  {wp.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Audio & Haptics Toggle */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${soundEnabled ? 'bg-[#7CF2C9] text-[#0B0F14]' : 'bg-[#1b222d] text-[#626e7e]'}`}>
            {soundEnabled ? <VolumeIcon className="w-4 h-4" /> : <VolumeMuteIcon className="w-4 h-4" />}
          </div>
          <div>
            <span className="font-mono text-xs font-bold text-[#E8EDF2] block">Web Audio Haptics</span>
            <span className="font-mono text-[10px] text-[#626e7e] block">Procedural synthesizer clicks</span>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleSound}
          className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${soundEnabled ? 'bg-[#7CF2C9]' : 'bg-[#1b222d]'}`}
          aria-label="Toggle Sound"
        >
          <div className={`w-5 h-5 rounded-full bg-[#0B0F14] transition-transform ${soundEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
      </div>

      {/* 3. Rear Glyph Matrix Toggle */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono text-xs font-bold text-[#E8EDF2] block">Rear Glyph Interface</span>
            <span className="font-mono text-[10px] text-[#626e7e] block">137-LED circular rear matrix pattern</span>
          </div>
          <span className="font-mono text-xs text-[#7CF2C9] bg-[#0e1219] px-2.5 py-0.5 rounded-full border border-[#1b222d]">
            Mode {activeGlyphPattern + 1}
          </span>
        </div>

        <button
          type="button"
          onClick={cycleGlyph}
          className="w-full py-2 px-3 rounded-xl bg-[#1b222d] hover:bg-[#253040] border border-[#283547] text-xs font-mono text-[#E8EDF2] hover:text-[#7CF2C9] transition-all flex items-center justify-center space-x-2"
        >
          <SparklesIcon className="w-3.5 h-3.5" />
          <span>Cycle 137-LED Matrix Animation</span>
        </button>
      </div>

      {/* 4. Hardware Showcase Launcher */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono text-xs font-bold text-[#E8EDF2] block">Phone (4a) Pro Launch Tech</span>
            <span className="font-mono text-[10px] text-[#626e7e] block">140x Periscope Ultra Zoom & 137 Glyph LEDs</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-[#7CF2C9] animate-pulse" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              setShowModal(true);
              playSound('tick', soundEnabled);
            }}
            className="py-2 px-3 rounded-xl bg-[#1b222d] hover:bg-[#253040] border border-[#283547] text-xs font-mono text-[#7CF2C9] hover:text-white transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <CpuIcon className="w-3.5 h-3.5" />
            <span>Launch Specs</span>
          </button>

          <button
            type="button"
            onClick={() => {
              openApp('camera');
              playSound('click', soundEnabled);
            }}
            className="py-2 px-3 rounded-xl bg-[#1b222d] hover:bg-[#253040] border border-[#283547] text-xs font-mono text-[#E8EDF2] hover:text-white transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <CameraIcon className="w-3.5 h-3.5" />
            <span>Open Camera</span>
          </button>
        </div>
      </div>

      {/* 5. Hardware & OS Specifications */}
      <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#626e7e] font-semibold block">
          Official Hardware Specifications
        </span>

        <div className="space-y-1.5 font-mono text-[11px] text-[#9AA6B2]">
          <div className="flex justify-between py-1 border-b border-[#1f2633]">
            <span>Device</span>
            <span className="text-[#E8EDF2]">Phone (4a) Pro</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#1f2633]">
            <span>Periscope</span>
            <span className="text-[#7CF2C9]">World’s 1st 140x Zoom</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#1f2633]">
            <span>Glyph Matrix</span>
            <span className="text-[#E8EDF2]">137 Mini-LED Array</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#1f2633]">
            <span>Processor</span>
            <span className="text-[#E8EDF2]">Snapdragon 7 Gen 4 (4nm)</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#1f2633]">
            <span>Display</span>
            <span className="text-[#E8EDF2]">6.83" 1.5K AMOLED (5,000 Nits)</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#1f2633]">
            <span>Battery</span>
            <span className="text-[#E8EDF2]">5,080 mAh (65W Fast Charge)</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Dimensions</span>
            <span className="text-[#E8EDF2]">161.7 × 76.3 × 8.55 mm</span>
          </div>
        </div>
      </div>

      {/* Nothing Product Showcase Modal */}
      <NothingProductModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </AppWindow>
  );
};

export default SettingsApp;
