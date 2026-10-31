import React from 'react';
import { usePhone } from '../../context/PhoneContext';

export const SideRails = () => {
  const { toggleLock, triggerSnapshot } = usePhone();

  return (
    <>
      {/* LEFT RAIL: Volume Up, Volume Down, Essential Key */}
      <div 
        className="absolute top-0 bottom-0 left-0 w-[14px] -translate-x-[14px] pointer-events-auto"
        style={{
          transform: 'rotateY(-90deg) translateZ(0px)',
          transformOrigin: 'right center',
          background: 'linear-gradient(to right, #8a939f 0%, #b8c1cc 35%, #e2e8ef 65%, #9fa8b4 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.3)',
        }}
      >
        {/* Antenna break upper */}
        <div className="absolute top-[85px] left-0 right-0 h-[2.5px] bg-[#68707a] opacity-80" />

        {/* Volume Up */}
        <div 
          className="absolute top-[210px] left-[-3px] w-[3px] h-[48px] bg-gradient-to-r from-[#d8e0e8] to-[#9aa3ae] rounded-l-[2px] shadow-sm cursor-pointer active:translate-x-[1px] transition-transform"
          title="Volume Up"
        />

        {/* Volume Down */}
        <div 
          className="absolute top-[268px] left-[-3px] w-[3px] h-[48px] bg-gradient-to-r from-[#d8e0e8] to-[#9aa3ae] rounded-l-[2px] shadow-sm cursor-pointer active:translate-x-[1px] transition-transform"
          title="Volume Down"
        />

        {/* Essential Key */}
        <button
          type="button"
          onClick={triggerSnapshot}
          className="absolute top-[355px] left-[-4px] w-[4px] h-[52px] bg-gradient-to-r from-[#eef3f8] via-[#cbd4de] to-[#88929e] rounded-l-[2.5px] shadow-md cursor-pointer active:translate-x-[1.5px] transition-all group focus:outline-none"
          title="Essential Key: Trigger Snapshot"
          aria-label="Essential Key: Trigger Snapshot"
        >
          {/* Subtle micro-ridged tactile texture */}
          <div className="w-full h-full opacity-40 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#555_2px,#555_3px)]" />
        </button>

        {/* Antenna break lower */}
        <div className="absolute bottom-[95px] left-0 right-0 h-[2.5px] bg-[#68707a] opacity-80" />
      </div>

      {/* RIGHT RAIL: Power button */}
      <div 
        className="absolute top-0 bottom-0 right-0 w-[14px] translate-x-[14px] pointer-events-auto"
        style={{
          transform: 'rotateY(90deg) translateZ(0px)',
          transformOrigin: 'left center',
          background: 'linear-gradient(to right, #9fa8b4 0%, #e2e8ef 35%, #b8c1cc 65%, #8a939f 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.3)',
        }}
      >
        {/* Antenna break upper */}
        <div className="absolute top-[85px] left-0 right-0 h-[2.5px] bg-[#68707a] opacity-80" />

        {/* Power Button */}
        <button
          type="button"
          onClick={toggleLock}
          className="absolute top-[230px] right-[-3px] w-[3px] h-[64px] bg-gradient-to-l from-[#d8e0e8] to-[#9aa3ae] rounded-r-[2px] shadow-sm cursor-pointer active:-translate-x-[1px] transition-transform focus:outline-none"
          title="Power Button: Toggle Lock"
          aria-label="Power Button: Toggle Lock"
        />

        {/* Antenna break lower */}
        <div className="absolute bottom-[95px] left-0 right-0 h-[2.5px] bg-[#68707a] opacity-80" />
      </div>

      {/* TOP RAIL: Mic hole & antenna */}
      <div 
        className="absolute top-0 left-0 right-0 h-[14px] -translate-y-[14px] flex items-center justify-center pointer-events-none"
        style={{
          transform: 'rotateX(90deg) translateZ(0px)',
          transformOrigin: 'center bottom',
          background: 'linear-gradient(to bottom, #8a939f 0%, #b8c1cc 35%, #e2e8ef 65%, #9fa8b4 100%)',
        }}
      >
        {/* Antenna break */}
        <div className="absolute left-[70px] top-0 bottom-0 w-[2.5px] bg-[#68707a] opacity-80" />
        {/* Mic hole */}
        <div className="w-[3px] h-[3px] rounded-full bg-[#11161d] shadow-inner" />
        {/* Antenna break */}
        <div className="absolute right-[70px] top-0 bottom-0 w-[2.5px] bg-[#68707a] opacity-80" />
      </div>

      {/* BOTTOM RAIL: USB-C, Speaker slits, Primary Mic, SIM Tray */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[14px] translate-y-[14px] flex items-center justify-between px-7 pointer-events-none"
        style={{
          transform: 'rotateX(-90deg) translateZ(0px)',
          transformOrigin: 'center top',
          background: 'linear-gradient(to bottom, #9fa8b4 0%, #e2e8ef 35%, #b8c1cc 65%, #8a939f 100%)',
        }}
      >
        {/* SIM Tray Slot with Pinhole */}
        <div className="flex items-center space-x-1.5 opacity-75">
          <div className="w-[18px] h-[2px] bg-[#4a525d] rounded-sm" />
          <div className="w-[1.5px] h-[1.5px] rounded-full bg-[#11161d]" />
        </div>

        {/* Center USB-C Port */}
        <div className="w-[28px] h-[6px] bg-[#0c1015] rounded-[3px] border border-[#6b7582] flex items-center justify-center shadow-inner">
          <div className="w-[18px] h-[1.5px] bg-[#a99252] rounded-[1px] opacity-75" />
        </div>

        {/* CNC Speaker Acoustic Slits */}
        <div className="flex items-center space-x-1">
          <div className="w-[4px] h-[2px] bg-[#11161d] rounded-full" />
          <div className="w-[4px] h-[2px] bg-[#11161d] rounded-full" />
          <div className="w-[4px] h-[2px] bg-[#11161d] rounded-full" />
          <div className="w-[4px] h-[2px] bg-[#11161d] rounded-full" />
        </div>
      </div>
    </>
  );
};
