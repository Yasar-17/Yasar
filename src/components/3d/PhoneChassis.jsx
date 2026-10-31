import React from 'react';
import { usePhone } from '../../context/PhoneContext';
import { SideRails } from './SideRails';
import { RearFace } from './RearFace';
import { LockScreen } from '../screen/LockScreen';
import { HomeScreen } from '../screen/HomeScreen';
import { AppDrawer } from '../screen/AppDrawer';
import { QuickPanel } from '../screen/QuickPanel';
import { AppContainer } from '../screen/AppContainer';

// 17 solid micro-slices for seamless 48px corner metallic extrusion in 3D
const SLICE_COUNT = 17;
const SLICES = Array.from({ length: SLICE_COUNT }, (_, i) => i - 8); // -8px to +8px

export const PhoneChassis = () => {
  const { isLocked, isSnapshotting } = usePhone();

  return (
    <div 
      className="relative w-[390px] h-[844px] pointer-events-auto"
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Dynamic Ground Ambient Drop Shadow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[870px] rounded-[56px] pointer-events-none"
        style={{
          transform: 'translateZ(-45px)',
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 45%, transparent 75%)',
          filter: 'blur(24px)',
        }}
      />

      {/* 17 SOLID ALUMINUM UNIBODY EXTRUSION SLICES */}
      {SLICES.map((z, idx) => {
        const isBackEdge = idx === 0;
        const isFrontEdge = idx === SLICE_COUNT - 1;
        const isMid = idx === 8;

        return (
          <div
            key={z}
            className="absolute inset-0 rounded-[48px] pointer-events-none"
            style={{
              transform: `translateZ(${z}px)`,
              background: isMid 
                ? 'linear-gradient(135deg, #a0aab6 0%, #cbd4de 40%, #e8edf3 60%, #919ba7 100%)' 
                : 'linear-gradient(135deg, #b0bac5 0%, #dbe2e9 40%, #f3f6f9 60%, #9fa8b4 100%)',
              border: isFrontEdge || isBackEdge 
                ? '1px solid rgba(255,255,255,0.75)' 
                : '1px solid #7e8793',
              boxShadow: isFrontEdge 
                ? 'inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.3)' 
                : isBackEdge 
                ? 'inset 0 -1px 0 rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.5)' 
                : 'none',
            }}
          />
        );
      })}

      {/* PHYSICAL SIDE RAILS (Buttons, Essential Key, Ports, Antennas) */}
      <SideRails />

      {/* REAR FACE (Dual-Zone Glass Deck, Cameras, Glyph Matrix) */}
      <RearFace />

      {/* FRONT FACE: OLED Glass Screen Assembly */}
      <div 
        className="absolute inset-0 rounded-[48px] overflow-hidden bg-[#0B0F14] select-none"
        style={{
          transform: 'translateZ(8px)',
          backfaceVisibility: 'hidden',
          boxShadow: 'inset 0 0 0 4px #12171e, 0 0 0 1px rgba(255,255,255,0.3)',
        }}
      >
        {/* Anti-Reflective Glass Sheen */}
        <div 
          className="absolute inset-0 pointer-events-none z-50 opacity-20"
          style={{
            background: 'linear-gradient(115deg, rgba(255,255,255,0.3) 0%, transparent 40%, rgba(255,255,255,0.05) 100%)',
          }}
        />

        {/* Centered Punch-Hole Camera */}
        <div className="absolute top-[13px] left-1/2 -translate-x-1/2 w-[12px] h-[12px] rounded-full bg-[#05070a] border border-[#232c37] z-50 flex items-center justify-center shadow-inner pointer-events-none">
          <div className="w-[4px] h-[4px] rounded-full bg-[#0d1622] border border-[#404c5d]" />
        </div>

        {/* Snapshot Shutter Flash Effect */}
        {isSnapshotting && (
          <div className="absolute inset-0 bg-white z-[90] animate-ping opacity-90 pointer-events-none" />
        )}

        {/* SCREEN CONTENT AREA */}
        <div className="relative w-full h-full overflow-hidden flex flex-col">
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
      </div>
    </div>
  );
};
