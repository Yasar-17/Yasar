import React from 'react';
import { PhoneProvider } from './context/PhoneContext';
import { PhoneStage } from './components/3d/PhoneStage';
import { HelpDrawer } from './ui/HelpDrawer';

export const App = () => {
  return (
    <PhoneProvider>
      <main className="relative w-screen h-screen overflow-hidden bg-[#0B0F14] flex items-center justify-center select-none">
        
        {/* Studio Ambient Background Lighting */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#7CF2C9]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#FFB86B]/5 blur-[120px] pointer-events-none" />

        {/* Studio Grid Floor Subtle Accent */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Left Floating Help & Controls */}
        <HelpDrawer />

        {/* 3D Phone Stage */}
        <PhoneStage />

      </main>
    </PhoneProvider>
  );
};

export default App;
