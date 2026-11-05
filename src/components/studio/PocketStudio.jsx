import React, { useState, useEffect } from 'react';
import { usePhone } from '../../context/PhoneContext';
import { PhoneCanvas, FINISH_CONFIGS } from './PhoneCanvas';
import { PROFILE } from '../../data';
import { 
  RotateIcon, 
  VolumeIcon, 
  VolumeMuteIcon, 
  ArrowLeftIcon
} from '../../ui/Icons';
import { HomeScreen } from '../screen/HomeScreen';
import { AppDrawer } from '../screen/AppDrawer';
import { QuickPanel } from '../screen/QuickPanel';
import { AppContainer } from '../screen/AppContainer';
import { LockScreen } from '../screen/LockScreen';
import { NothingProductModal } from '../showcase/NothingProductModal';

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

  const [finish, setFinish] = useState('obsidian');
  const [flipped, setFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [show3DOnMobile, setShow3DOnMobile] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
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
            <button
              type="button"
              onClick={() => setShowProductModal(true)}
              className="px-3 py-1.5 rounded-full bg-[#151a22] border border-[#232c3a] text-xs font-mono text-[#7CF2C9] hover:bg-[#1f2633] active:scale-95 transition-all"
            >
              Phone Specs
            </button>
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

          <NothingProductModal 
            isOpen={showProductModal} 
            onClose={() => setShowProductModal(false)} 
            onFlipPhone={(flip) => setFlipped(flip)} 
          />
        </div>
      );
    }

    // Default Mobile Mode: Edge-to-Edge Full-Screen Smartphone Interface
    return (
      <div className="relative w-screen h-screen mobile-viewport overflow-hidden bg-[#0B0F14] text-[#E8EDF2] font-sans antialiased select-none flex flex-col justify-between">
        {/* Minimal Floating 3D Device View Trigger (bottom right corner, never obstructing status bar) */}
        <div className="absolute right-3.5 bottom-3.5 safe-bottom z-40 pointer-events-auto flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setShowProductModal(true)}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#141820]/80 backdrop-blur-md border border-[#232c3a] text-[10px] font-mono text-[#9AA6B2] hover:text-[#7CF2C9] hover:border-[#374457] transition-all shadow-sm active:scale-95 cursor-pointer"
            aria-label="View Hardware Specifications"
          >
            <span>Specs</span>
          </button>
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

        <NothingProductModal 
          isOpen={showProductModal} 
          onClose={() => setShowProductModal(false)} 
          onFlipPhone={(flip) => setFlipped(flip)} 
        />
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // DESKTOP EXPERIENCE: Exact prsd.dev Pocket Studio Architecture adapted for Nothing Phone (4a) Pro
  // ---------------------------------------------------------------------------
  return (
    <main className="pocket-studio studio-dark select-none">
      
      {/* 1. Subtle Environmental Background Lighting */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out"
        style={{
          background: `radial-gradient(circle 900px at ${mouseEnv.x}% ${mouseEnv.y}%, rgba(28, 36, 48, 0.45) 0%, rgba(13, 16, 22, 0.88) 55%, rgba(10, 12, 16, 1) 100%)`,
        }}
      />

      {/* 2. TOP-LEFT: Finish Picker (Exact prsd.dev radio swatches) */}
      <div className="finish-picker" role="radiogroup" aria-label="Phone colour">
        {Object.keys(FINISH_CONFIGS).map((key) => {
          const cfg = FINISH_CONFIGS[key];
          const isSelected = finish === key;
          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={cfg.name}
              title={cfg.name}
              onClick={() => handleFinishChange(key)}
            >
              <i style={{ background: cfg.swatch }} />
            </button>
          );
        })}
      </div>

      {/* 2B. TOP-RIGHT: Phone (4a) Pro Official Launch Showcase Trigger */}
      <div className="absolute top-6 right-8 z-30 hidden md:flex items-center space-x-3 pointer-events-auto">
        <button
          type="button"
          onClick={() => setShowProductModal(true)}
          className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-[#131822]/80 hover:bg-[#1a212e] backdrop-blur-md border border-[#222c3b] hover:border-[#7CF2C9]/60 text-xs font-mono text-[#9AA6B2] hover:text-[#7CF2C9] transition-all cursor-pointer shadow-sm active:scale-95 group"
          aria-label="View Phone (4a) Pro Official Launch Hardware Specifications & 140x Zoom"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#7CF2C9] animate-pulse" />
          <span className="font-semibold text-[#E8EDF2] group-hover:text-white">Phone (4a) Pro</span>
          <span className="text-[#3b4758]">·</span>
          <span className="text-[11px] text-[#7CF2C9]">140x Zoom & Glyph Matrix</span>
        </button>
      </div>

      {/* 3. RIGHT SIDE: Studio Navigation (Exact prsd.dev typography & section links) */}
      <nav className="studio-nav" aria-label="Portfolio sections">
        <button
          type="button"
          className="studio-nav-name"
          onClick={() => {
            closeApp();
            setFlipped(false);
          }}
          aria-label="Close the open app and return to the home screen"
          aria-current={!activeApp ? 'page' : undefined}
        >
          {PROFILE.name.toUpperCase()}
        </button>
        <span className="studio-nav-role">{PROFILE.role}</span>

        <ul>
          {[
            ['projects', 'Projects'],
            ['experience', 'Experience'],
            ['about', 'About'],
            ['contact', 'Contact'],
          ].map(([id, label]) => {
            const isCurrent = activeApp === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => openApp(id)}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 4. CENTRE: 3D Phone World & Stage */}
      <div 
        className="phone-world"
        aria-label={`Interactive Phone (4a) Pro ${FINISH_CONFIGS[finish]?.name || 'Silver'} portfolio`}
      >
        <div className="phone-stage">
          <PhoneCanvas finish={finish} flipped={flipped} onFlipChange={setFlipped}>
            {renderPhoneScreen()}
          </PhoneCanvas>
        </div>
      </div>

      {/* Rear 137-LED Glyph Matrix Active Hint */}
      {flipped && (
        <aside 
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 pointer-events-auto flex items-center space-x-2.5 bg-[#0e131b]/90 backdrop-blur-md border border-[#222e3e] px-4 py-1.5 rounded-full text-xs font-mono text-[#9AA6B2] shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200"
          aria-label="Rear Glyph Status"
        >
          <span className="w-2 h-2 rounded-full bg-[#7CF2C9] animate-pulse" />
          <span>137-LED Glyph Matrix Active</span>
          <span className="text-[#3b4758]">·</span>
          <button
            type="button"
            onClick={() => setShowProductModal(true)}
            className="text-[#7CF2C9] hover:underline cursor-pointer font-semibold"
          >
            Customize Patterns
          </button>
        </aside>
      )}

      {/* 5. BOTTOM: Studio Footer (Exact prsd.dev instructions & keyboard controls) */}
      <footer className="studio-footer">
        <span>Drag to rotate. Arrow keys to orbit.</span>
        
        <span className="flex items-center space-x-2">
          <span>
            <kbd>Space</kbd> or click to wake
          </span>
          <span>·</span>
          <span>
            <kbd>Esc</kbd> to close
          </span>
          <span>·</span>
          <button
            type="button"
            onClick={() => setShowProductModal(true)}
            className="hover:text-[#7CF2C9] transition-colors cursor-pointer"
            title="Phone (4a) Pro Official Hardware & Tech Specs"
          >
            Phone Specs
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={toggleSound}
            className="hover:text-white transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          >
            {soundEnabled ? 'Sound on' : 'Sound muted'}
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={() => setFlipped(!flipped)}
            className="hover:text-white transition-colors cursor-pointer"
            title="Inspect front or rear"
          >
            {flipped ? 'Show front' : 'Inspect rear'}
          </button>
        </span>
      </footer>

      {/* Official Phone (4a) Pro Launch Hardware Showcase Modal */}
      <NothingProductModal 
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        onFlipPhone={(flip) => setFlipped(flip)}
      />

    </main>
  );
};

export default PocketStudio;
