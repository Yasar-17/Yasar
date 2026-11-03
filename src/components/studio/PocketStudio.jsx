import React, { useState, useEffect } from 'react';
import { usePhone } from '../../context/PhoneContext';
import { PhoneCanvas, FINISH_CONFIGS } from './PhoneCanvas';
import { PROFILE } from '../../data';
import { 
  RotateIcon, 
  VolumeIcon, 
  VolumeMuteIcon, 
  ExternalLinkIcon,
  MenuIcon,
  CloseIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from '../../ui/Icons';
import { HomeScreen } from '../screen/HomeScreen';
import { AppDrawer } from '../screen/AppDrawer';
import { QuickPanel } from '../screen/QuickPanel';
import { AppContainer } from '../screen/AppContainer';
import { LockScreen } from '../screen/LockScreen';

export const PocketStudio = () => {
  const { 
    isLocked, 
    setIsLocked,
    activeApp, 
    openApp, 
    closeApp, 
    soundEnabled, 
    toggleSound, 
    activeWallpaper,
    setActiveWallpaper,
    isSnapshotting,
    triggerSnapshot
  } = usePhone();

  const [finish, setFinish] = useState('silver');
  const [flipped, setFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [show3DOnMobile, setShow3DOnMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mouseEnv, setMouseEnv] = useState({ x: 50, y: 45 });

  // Sync wallpaper when finish changes
  const handleFinishChange = (key) => {
    setFinish(key);
    if (key === 'copper') setActiveWallpaper('warm-copper');
    else if (key === 'obsidian') setActiveWallpaper('obsidian');
    else setActiveWallpaper('silver');
  };

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShow3DOnMobile(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Subtle mouse movement influence on the background environmental lighting
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = 50 + ((e.clientX / window.innerWidth) - 0.5) * 14;
      const y = 45 + ((e.clientY / window.innerHeight) - 0.5) * 12;
      setMouseEnv({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Screen contents (rendered inside CSS3D surface on desktop, or directly on mobile)
  const renderPhoneScreen = () => (
    <div className="relative w-full h-full overflow-hidden bg-[#0B0F14] select-none text-[#E8EDF2] flex flex-col">
      {/* 2.5D Optical Glass Sheen */}
      <div 
        className="absolute inset-0 pointer-events-none z-50 opacity-25"
        style={{
          background: 'linear-gradient(115deg, rgba(255,255,255,0.35) 0%, transparent 40%, rgba(255,255,255,0.04) 100%)',
        }}
      />

      {/* Snapshot Shutter Flash */}
      {isSnapshotting && (
        <div className="absolute inset-0 bg-white z-[90] animate-ping opacity-90 pointer-events-none" />
      )}

      {isLocked ? (
        <LockScreen />
      ) : (
        <>
          <HomeScreen />
          <AppDrawer />
          <QuickPanel />
          <AppContainer />
        </>
      )}
    </div>
  );

  // ---------------------------------------------------------------------------
  // MOBILE EXPERIENCE: The phone interface becomes the main full-screen experience
  // ---------------------------------------------------------------------------
  if (isMobile) {
    if (show3DOnMobile) {
      // Mobile 3D Inspection Viewer
      return (
        <div className="relative w-screen h-screen mobile-viewport overflow-hidden bg-[#090b0e] text-[#E8EDF2] font-sans antialiased select-none flex flex-col justify-between">
          {/* Mobile 3D Top Header */}
          <header className="relative z-30 flex items-center justify-between px-4 py-3 safe-top pointer-events-auto border-b border-[#1b222d] bg-[#0c0f15]/80 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setShow3DOnMobile(false)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#151a22] border border-[#232c3a] text-xs font-mono text-[#7CF2C9] hover:bg-[#1f2633] active:scale-95 transition-all"
            >
              <ArrowLeftIcon className="w-3.5 h-3.5" />
              <span>Return to Screen</span>
            </button>
            <span className="font-mono text-xs text-[#9AA6B2] tracking-wider uppercase">
              3D Device Inspection
            </span>
          </header>

          {/* Centered Mobile 3D Canvas */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-auto">
            <PhoneCanvas finish={finish} flipped={flipped} onFlipChange={setFlipped}>
              {renderPhoneScreen()}
            </PhoneCanvas>
          </div>

          {/* Mobile 3D Bottom Floating Control Pill */}
          <footer className="relative z-30 flex flex-col items-center mb-3 safe-bottom pointer-events-auto px-4">
            <div className="flex items-center space-x-1.5 bg-[#131720]/90 backdrop-blur-md border border-[#232c3a] rounded-full p-1 shadow-xl">
              <button
                type="button"
                onClick={() => setFlipped(!flipped)}
                className="flex items-center space-x-1.5 text-xs font-mono text-[#E8EDF2] hover:text-[#7CF2C9] px-3 py-1 rounded-full hover:bg-white/5 active:scale-95 transition-all"
              >
                <RotateIcon className="w-3.5 h-3.5" />
                <span>{flipped ? 'Front' : 'Rear'}</span>
              </button>
              <div className="w-[1px] h-3 bg-[#232b36]" />
              <button
                type="button"
                onClick={() => { setFlipped(false); }}
                className="text-xs font-mono text-[#9AA6B2] hover:text-[#E8EDF2] px-3 py-1 rounded-full hover:bg-white/5 transition-colors"
              >
                Reset
              </button>
              <div className="w-[1px] h-3 bg-[#232b36]" />
              <button
                type="button"
                onClick={() => setShow3DOnMobile(false)}
                className="text-xs font-mono text-[#7CF2C9] hover:text-white px-3 py-1 rounded-full bg-[#7CF2C9]/15 border border-[#7CF2C9]/30 transition-colors"
              >
                Use Screen
              </button>
            </div>
          </footer>
        </div>
      );
    }

    // Default Mobile Mode: Edge-to-Edge Full-Screen Smartphone Interface
    return (
      <div className="relative w-screen h-screen mobile-viewport overflow-hidden bg-[#0B0F14] text-[#E8EDF2] font-sans antialiased select-none flex flex-col justify-between">
        {/* Minimal Floating 3D Device View Trigger (bottom right corner, never obstructing status bar) */}
        <div className="absolute right-3.5 bottom-3.5 safe-bottom z-40 pointer-events-auto">
          <button
            type="button"
            onClick={() => setShow3DOnMobile(true)}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#141820]/80 backdrop-blur-md border border-[#232c3a] text-[10px] font-mono text-[#9AA6B2] hover:text-[#7CF2C9] hover:border-[#374457] transition-all shadow-sm active:scale-95 cursor-pointer"
            aria-label="Inspect physical 3D phone model"
          >
            <RotateIcon className="w-3 h-3 text-[#7CF2C9]" />
            <span>3D View</span>
          </button>
        </div>

        {/* Full-bleed Native-Proportioned Screen */}
        <div className="w-full h-full flex flex-col">
          {renderPhoneScreen()}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // DESKTOP & TABLET EXPERIENCE: Full 3D Pocket Studio Stage
  // ---------------------------------------------------------------------------
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#090b0e] text-[#E8EDF2] font-sans antialiased select-none flex flex-col justify-between">
      
      {/* 1. Subtle Environmental Lighting (Deep Graphite to Almost-Black, responds to mouse) */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out"
        style={{
          background: `radial-gradient(circle 880px at ${mouseEnv.x}% ${mouseEnv.y}%, rgba(32, 41, 54, 0.45) 0%, rgba(13, 16, 21, 0.85) 55%, rgba(9, 11, 14, 1) 100%)`,
        }}
      />

      {/* 2. Restrained Texture Overlay (Ultra-fine 24px industrial grid) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      {/* TOP BAR: Clean, supporting elements only */}
      <header className="relative z-30 flex items-center justify-between px-8 sm:px-12 pt-7 pointer-events-auto">
        {/* TOP LEFT: YASAR.DEV */}
        <div className="flex flex-col">
          <button
            type="button"
            onClick={() => {
              closeApp();
              setFlipped(false);
            }}
            className="text-left font-mono text-base sm:text-lg font-bold tracking-[0.22em] text-[#E8EDF2] hover:text-[#7CF2C9] transition-colors cursor-pointer focus:outline-none"
          >
            YASAR.DEV
          </button>
          <span className="font-mono text-[10px] text-[#626e7e] tracking-widest uppercase mt-0.5">
            {PROFILE.role}
          </span>
        </div>

        {/* TOP RIGHT: Available for opportunities + Minimal menu */}
        <div className="flex items-center space-x-5 sm:space-x-7">
          {/* Availability Status Badge */}
          <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-[#9AA6B2]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7CF2C9] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7CF2C9]" />
            </span>
            <span className="tracking-wide">{PROFILE.availability}</span>
          </div>

          {/* Minimal Menu Trigger */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#151a22]/80 hover:bg-[#1f2633] border border-[#232b36] hover:border-[#374457] text-xs font-mono text-[#E8EDF2] hover:text-[#7CF2C9] transition-all shadow-sm"
            aria-label="Open minimal menu"
          >
            <MenuIcon className="w-3.5 h-3.5 text-[#9AA6B2]" />
            <span>Menu</span>
          </button>
        </div>
      </header>

      {/* CENTRE: 3D Smartphone - Dominating the Screen, Large & Visually Impressive */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-auto">
        <PhoneCanvas finish={finish} flipped={flipped} onFlipChange={setFlipped}>
          {renderPhoneScreen()}
        </PhoneCanvas>
      </div>

      {/* BOTTOM: "An interactive portfolio." + "Drag to explore. Tap to unlock." */}
      <footer className="relative z-30 flex flex-col items-center mb-6 pointer-events-auto px-6 text-center">
        <p className="font-grotesk text-sm sm:text-base font-medium text-[#C5CED8] tracking-tight">
          An interactive portfolio.
        </p>
        <p className="font-mono text-[11px] text-[#626e7e] tracking-widest uppercase mt-1">
          {isLocked ? 'Drag to explore. Tap to unlock.' : 'Drag to explore. Tap apps to navigate.'}
        </p>

        {/* Minimalist Device Hardware Controls Pill */}
        <div className="flex items-center space-x-1.5 mt-3 bg-[#131720]/80 backdrop-blur-md border border-[#232b36] rounded-full p-1 shadow-lg">
          <button
            type="button"
            onClick={() => setFlipped(!flipped)}
            className="flex items-center space-x-2 text-[11px] font-mono text-[#E8EDF2] hover:text-[#7CF2C9] px-3.5 py-1 rounded-full hover:bg-white/5 transition-all"
          >
            <RotateIcon className="w-3.5 h-3.5" />
            <span>{flipped ? 'Front' : 'Rear'}</span>
          </button>

          <div className="w-[1px] h-3 bg-[#232b36]" />

          <button
            type="button"
            onClick={() => { setFlipped(false); }}
            className="text-[11px] font-mono text-[#9AA6B2] hover:text-[#E8EDF2] px-3 py-1 rounded-full hover:bg-white/5 transition-colors"
          >
            Reset
          </button>

          <div className="w-[1px] h-3 bg-[#232b36]" />

          <button
            type="button"
            onClick={triggerSnapshot}
            className="text-[11px] font-mono text-[#FFB86B] hover:text-[#ffd29d] px-2.5 py-1 rounded-full hover:bg-white/5 transition-colors"
            title="Camera Shutter"
            aria-label="Camera Shutter"
          >
            Snapshot
          </button>

          <div className="w-[1px] h-3 bg-[#232b36]" />

          <button
            type="button"
            onClick={toggleSound}
            className="text-[#9AA6B2] hover:text-[#E8EDF2] px-2.5 py-1 rounded-full hover:bg-white/5 transition-colors"
            title={soundEnabled ? 'Mute' : 'Unmute'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <VolumeIcon className="w-3.5 h-3.5 text-[#7CF2C9]" /> : <VolumeMuteIcon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </footer>

      {/* MINIMAL SLIDE-OVER MENU (Clean, never obstructs when closed) */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className="w-full max-w-sm h-full bg-[#0d1016]/98 border-l border-[#232b36] p-8 flex flex-col justify-between shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between border-b border-[#1f2633] pb-5">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#7CF2C9]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#9AA6B2]">
                  PORTFOLIO INDEX
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/5 text-[#9AA6B2] hover:text-[#E8EDF2] transition-colors"
                aria-label="Close menu"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="my-auto py-6">
              <ul className="flex flex-col space-y-4">
                {[
                  { id: 'projects', number: '01', title: 'Projects', desc: 'Featured applications & client systems' },
                  { id: 'case-studies', number: '02', title: 'Case Studies', desc: 'SIH wildfire classifier & analytics' },
                  { id: 'terminal', number: '03', title: 'Terminal', desc: 'Interactive developer console' },
                  { id: 'resume', number: '04', title: 'Resume', desc: 'Background, stack & credentials' },
                  { id: 'contact', number: '05', title: 'Contact', desc: 'Direct communication link' },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setIsLocked(false);
                        openApp(item.id);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left group flex items-start justify-between p-3 rounded-xl hover:bg-[#151a22] transition-all border border-transparent hover:border-[#232b36]"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-3">
                          <span className="font-mono text-xs text-[#7CF2C9] opacity-70 group-hover:opacity-100">
                            {item.number}
                          </span>
                          <span className="font-grotesk text-lg font-bold text-[#E8EDF2] group-hover:text-[#7CF2C9] transition-colors">
                            {item.title}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-[#626e7e] mt-1 pl-7">
                          {item.desc}
                        </span>
                      </div>
                      <ArrowRightIcon className="w-4 h-4 text-[#626e7e] group-hover:text-[#7CF2C9] group-hover:translate-x-1 transition-all mt-1 opacity-0 group-hover:opacity-100" />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Menu Footer */}
            <div className="border-t border-[#1f2633] pt-5 space-y-3 font-mono text-xs text-[#9AA6B2]">
              <div className="flex items-center justify-between">
                <span className="text-[#626e7e]">STATUS</span>
                <span className="text-[#7CF2C9]">{PROFILE.availability}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#626e7e]">LOCATION</span>
                <span>{PROFILE.location}</span>
              </div>
              <div className="pt-2">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex items-center justify-between text-[#C5CED8] hover:text-[#7CF2C9] transition-colors bg-[#151a22] p-2.5 rounded-lg border border-[#232b36]"
                >
                  <span className="text-xs">{PROFILE.email}</span>
                  <ExternalLinkIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PocketStudio;
