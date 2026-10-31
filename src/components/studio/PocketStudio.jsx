import React, { useState, useEffect } from 'react';
import { usePhone } from '../../context/PhoneContext';
import { PhoneCanvas, FINISH_CONFIGS } from './PhoneCanvas';
import { RotateIcon, VolumeIcon, VolumeMuteIcon, ExternalLinkIcon } from '../../ui/Icons';
import { HomeScreen } from '../screen/HomeScreen';
import { AppDrawer } from '../screen/AppDrawer';
import { QuickPanel } from '../screen/QuickPanel';
import { AppContainer } from '../screen/AppContainer';
import { LockScreen } from '../screen/LockScreen';

export const PocketStudio = () => {
  const { 
    isLocked, 
    activeApp, 
    openApp, 
    closeApp, 
    soundEnabled, 
    toggleSound, 
    activeWallpaper,
    setActiveWallpaper 
  } = usePhone();

  const [finish, setFinish] = useState('silver');
  const [flipped, setFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Sync wallpaper when finish changes
  const handleFinishChange = (key) => {
    setFinish(key);
    if (key === 'copper') setActiveWallpaper('warm-copper');
    else if (key === 'obsidian') setActiveWallpaper('obsidian');
    else setActiveWallpaper('silver');
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Screen contents (rendered inside CSS3D surface on desktop, or directly on mobile)
  const renderPhoneScreen = () => (
    <div className="relative w-full h-full overflow-hidden bg-[#0B0F14] select-none text-[#E8EDF2] flex flex-col">
      {/* 2.5D Optical Glass Glare Sheen */}
      <div 
        className="absolute inset-0 pointer-events-none z-50 opacity-25"
        style={{
          background: 'linear-gradient(115deg, rgba(255,255,255,0.4) 0%, transparent 40%, rgba(255,255,255,0.05) 100%)',
        }}
      />

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

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0c0e12] text-[#E8EDF2] font-sans antialiased select-none flex flex-col justify-between">
      
      {/* Ambient Radial Studio Lighting */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(42, 52, 68, 0.45) 0%, rgba(12, 14, 18, 0.95) 75%)',
        }}
      />

      {/* DESKTOP STUDIO CHROME */}
      {!isMobile && (
        <>
          {/* 1. STUDIO HEADER */}
          <header className="relative z-30 flex items-center justify-between px-10 pt-7 pointer-events-auto">
            {/* Finish Picker Swatches */}
            <div className="flex items-center space-x-2.5 bg-[#151a22]/80 backdrop-blur-md border border-[#232b36] rounded-full px-3 py-1.5 shadow-sm">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#9AA6B2] mr-1">Finish:</span>
              {Object.keys(FINISH_CONFIGS).map((key) => {
                const conf = FINISH_CONFIGS[key];
                const isSelected = finish === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleFinishChange(key)}
                    className={`w-6 h-6 rounded-full transition-all flex items-center justify-center ${
                      isSelected ? 'ring-2 ring-[#7CF2C9] scale-110' : 'opacity-70 hover:opacity-100'
                    }`}
                    title={conf.name}
                    aria-label={conf.name}
                  >
                    <span 
                      className="w-5 h-5 rounded-full shadow-inner block border border-white/20" 
                      style={{ background: conf.swatch }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Direct Contact Top Link */}
            <a
              href="mailto:mohammedyasar990@gmail.com"
              className="flex items-center space-x-2 text-[12px] font-medium text-[#C5CED8] hover:text-[#7CF2C9] transition-colors bg-[#151a22]/80 backdrop-blur-md border border-[#232b36] rounded-full px-4 py-2"
            >
              <span>mohammedyasar990@gmail.com</span>
              <ExternalLinkIcon className="w-3.5 h-3.5" />
            </a>
          </header>

          {/* 2. STUDIO RIGHT NAVIGATION (prsd.dev style) */}
          <nav className="absolute top-1/2 right-12 -translate-y-1/2 z-30 text-right flex flex-col items-end pointer-events-auto">
            <button
              type="button"
              onClick={closeApp}
              className="font-grotesk text-[34px] font-bold tracking-tight text-[#E8EDF2] hover:text-[#7CF2C9] transition-colors leading-none mb-6 cursor-pointer focus:outline-none"
            >
              Yasar
            </button>

            <ul className="flex flex-col space-y-3.5 text-right font-grotesk text-[18px]">
              {[
                { id: 'projects', label: 'Projects' },
                { id: 'case-studies', label: 'Case Studies' },
                { id: 'terminal', label: 'Terminal' },
                { id: 'resume', label: 'Resume' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => {
                const isActive = activeApp === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => openApp(item.id)}
                      className={`transition-colors cursor-pointer focus:outline-none ${
                        isActive 
                          ? 'text-[#7CF2C9] font-bold' 
                          : 'text-[#9AA6B2] hover:text-[#E8EDF2]'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* 3. STUDIO BOTTOM CONTROLS (prsd.dev style) */}
          <div className="relative z-30 flex flex-col items-center mb-8 pointer-events-auto">
            <p className="text-[12px] text-[#9AA6B2] tracking-wider mb-2.5">
              Hold and drag anywhere to rotate 3D phone
            </p>

            <div className="flex items-center space-x-1.5 bg-[#151a22]/90 backdrop-blur-md border border-[#232b36] rounded-full p-1.5 shadow-lg">
              <button
                type="button"
                onClick={() => setFlipped(!flipped)}
                className="flex items-center space-x-2 text-[12px] font-medium text-[#E8EDF2] hover:text-[#7CF2C9] px-3.5 py-1.5 rounded-full hover:bg-white/5 transition-all"
              >
                <RotateIcon className="w-3.5 h-3.5" />
                <span>Flip Phone</span>
              </button>

              <div className="w-[1px] h-3 bg-[#232b36]" />

              <button
                type="button"
                onClick={() => { setFlipped(false); }}
                className="text-[12px] font-medium text-[#9AA6B2] hover:text-[#E8EDF2] px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors"
              >
                Reset Angle
              </button>

              <div className="w-[1px] h-3 bg-[#232b36]" />

              <button
                type="button"
                onClick={toggleSound}
                className="text-[#9AA6B2] hover:text-[#E8EDF2] px-2.5 py-1.5 rounded-full hover:bg-white/5 transition-colors"
                title={soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
                aria-label="Toggle Sound"
              >
                {soundEnabled ? <VolumeIcon className="w-4 h-4 text-[#7CF2C9]" /> : <VolumeMuteIcon className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* 4. STUDIO FOOTER */}
          <footer className="relative z-20 flex items-center justify-between px-10 pb-4 text-[11px] font-mono text-[#626e7e]">
            <div>Yasar - Data Analyst & Builder</div>
            <div>Chennai, IN · Third-Year B.Tech AI & Data Science</div>
          </footer>
        </>
      )}

      {/* CENTER: 3D PHONE WORLD OR MOBILE FULLSCREEN */}
      {isMobile ? (
        // Mobile Mode: Screen fills 100% of viewport
        <div className="w-full h-full max-w-[440px] mx-auto overflow-hidden bg-[#0B0F14]">
          {renderPhoneScreen()}
        </div>
      ) : (
        // Desktop Mode: True Three.js WebGL + CSS3DRenderer Stage
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <PhoneCanvas finish={finish} flipped={flipped} onFlipChange={setFlipped}>
            {renderPhoneScreen()}
          </PhoneCanvas>
        </div>
      )}

    </div>
  );
};
