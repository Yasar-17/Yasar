import React from 'react';
import { usePhone } from '../context/PhoneContext';
import { HelpIcon, CloseIcon, RotateIcon, PowerIcon, SparklesIcon, FileTextIcon, FolderIcon, BookOpenIcon } from './Icons';

export const HelpDrawer = () => {
  const { isHelpOpen, setIsHelpOpen, openApp, resetRotation } = usePhone();

  return (
    <>
      {/* LEFT-SIDE FLOATING HELP BUTTON */}
      <button
        type="button"
        id="helpToggleBtn"
        onClick={() => setIsHelpOpen(!isHelpOpen)}
        className="fixed top-6 left-6 z-50 flex items-center space-x-2.5 bg-[#151B23]/90 hover:bg-[#1f2933] text-[#E8EDF2] border border-[#1B222B] backdrop-blur-md px-3.5 py-2 rounded-full shadow-lg transition-all active:scale-95 group focus:outline-none"
        aria-label="Toggle Help and Navigation Guide"
      >
        <div className="w-5 h-5 rounded-full bg-[#7CF2C9] text-[#0B0F14] flex items-center justify-center">
          <HelpIcon className="w-3.5 h-3.5" />
        </div>
        <span className="text-[12px] font-medium tracking-wide">Help & Controls</span>
      </button>

      {/* EXPANDABLE LEFT PANEL */}
      {isHelpOpen && (
        <div 
          id="helpModalPanel"
          className="fixed top-20 left-6 z-50 w-[310px] bg-[#151B23]/95 border border-[#1B222B] backdrop-blur-xl rounded-[24px] p-5 shadow-2xl animate-in fade-in slide-in-from-left-4 duration-200 text-[#E8EDF2]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#1B222B] pb-3 mb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#7CF2C9]" />
              <h3 className="font-grotesk text-[14px] font-bold uppercase tracking-wider">
                Interactive Controls
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsHelpOpen(false)}
              className="text-[#9AA6B2] hover:text-[#E8EDF2] p-1 rounded-full"
              aria-label="Close Help Panel"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Guide Sections */}
          <div className="space-y-3 text-[12px]">
            <div>
              <div className="flex items-center space-x-1.5 text-[#7CF2C9] font-semibold mb-1">
                <RotateIcon className="w-3.5 h-3.5" />
                <span>3D Orbit Physics</span>
              </div>
              <p className="text-[#C5CED8] text-[11.5px] leading-relaxed">
                Click and drag anywhere on the canvas to rotate the device in 3D. Double-click to reset viewing angle.
              </p>
            </div>

            <div className="pt-2 border-t border-[#1F2933]">
              <div className="flex items-center space-x-1.5 text-[#FFB86B] font-semibold mb-1">
                <PowerIcon className="w-3.5 h-3.5" />
                <span>Hardware Rail Triggers</span>
              </div>
              <p className="text-[#C5CED8] text-[11.5px] leading-relaxed">
                Right Power button sleeps/wakes device. Left Essential Key triggers high-speed snapshot shutter flash.
              </p>
            </div>

            <div className="pt-2 border-t border-[#1F2933]">
              <div className="flex items-center space-x-1.5 text-[#8AB4FF] font-semibold mb-1">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span>Glyph & Audio Synthesizer</span>
              </div>
              <p className="text-[#C5CED8] text-[11.5px] leading-relaxed">
                Rear 137 mini-LED matrix runs dynamic audio equalizer waveforms. Tap matrix to cycle light patterns.
              </p>
            </div>

            {/* Quick Navigation Fast-Track */}
            <div className="pt-2 border-t border-[#1F2933]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#9AA6B2] block mb-1.5">
                Fast-Track Navigation
              </span>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <button
                  type="button"
                  onClick={() => { setIsHelpOpen(false); openApp('case-studies'); }}
                  className="bg-[#1F2933] hover:bg-[#283644] text-[#E8EDF2] text-[10px] font-medium py-1.5 rounded-[12px] border border-[#2B3542]"
                >
                  Case Studies
                </button>
                <button
                  type="button"
                  onClick={() => { setIsHelpOpen(false); openApp('projects'); }}
                  className="bg-[#1F2933] hover:bg-[#283644] text-[#E8EDF2] text-[10px] font-medium py-1.5 rounded-[12px] border border-[#2B3542]"
                >
                  Projects
                </button>
                <button
                  type="button"
                  onClick={() => { setIsHelpOpen(false); openApp('resume'); }}
                  className="bg-[#1F2933] hover:bg-[#283644] text-[#E8EDF2] text-[10px] font-medium py-1.5 rounded-[12px] border border-[#2B3542]"
                >
                  Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
