import React from 'react';
import { GlyphMatrix } from '../glyph/GlyphMatrix';

export const RearFace = () => {
  return (
    <div 
      className="absolute inset-0 rounded-[48px] overflow-hidden select-none pointer-events-auto"
      style={{
        transform: 'rotateY(180deg) translateZ(8px)',
        backfaceVisibility: 'hidden',
        background: 'linear-gradient(155deg, #e6ecf2 0%, #cbd5df 24%, #f4f7fa 45%, #b3bfcc 72%, #d5dde6 100%)',
        boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.9), inset 0 -2px 3px rgba(0,0,0,0.25)',
      }}
    >
      {/* Outer specular chamfer highlight */}
      <div className="absolute inset-0 rounded-[48px] border border-white/60 pointer-events-none" />

      {/* TOP ZONE: Transparent crystal glass chamber */}
      <div className="relative mx-3.5 mt-3.5 h-[285px] rounded-[36px] bg-[#0c1015] border border-[#2d3744] shadow-[inset_0_2px_12px_rgba(0,0,0,0.95)] overflow-hidden p-4">
        {/* Transparent glass dome gloss reflection */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 30%, transparent 60%)',
          }}
        />

        {/* Internal micro-circuit accents & Torx screw fasteners */}
        <div className="absolute top-3 left-4 w-[6px] h-[6px] rounded-full bg-[#3a4452] border border-[#1d242e] shadow-sm flex items-center justify-center">
          <div className="w-[3px] h-[0.8px] bg-[#11161d]" />
        </div>
        <div className="absolute top-3 right-4 w-[6px] h-[6px] rounded-full bg-[#3a4452] border border-[#1d242e] shadow-sm flex items-center justify-center">
          <div className="w-[3px] h-[0.8px] bg-[#11161d]" />
        </div>
        <div className="absolute bottom-3 left-4 w-[6px] h-[6px] rounded-full bg-[#3a4452] border border-[#1d242e] shadow-sm flex items-center justify-center">
          <div className="w-[3px] h-[0.8px] bg-[#11161d]" />
        </div>

        {/* Red Status Element */}
        <div className="absolute right-5 bottom-8 w-[10px] h-[10px] rounded-[2px] bg-[#D71921] shadow-[0_0_6px_rgba(215,25,33,0.7)]" />

        {/* Upper Module Layout: Left Cameras, Right Glyph */}
        <div className="relative z-10 flex items-start justify-between">
          
          {/* CAMERA CLUSTER (Left) */}
          <div className="flex flex-col space-y-3">
            {/* 1. Large 50MP Main Camera Island */}
            <div className="relative w-[96px] h-[96px] rounded-full bg-[#12171e] p-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.3)] border border-[#2b3542]">
              {/* Concentric CD-milled metallic ring */}
              <div 
                className="w-full h-full rounded-full p-2 flex items-center justify-center shadow-inner"
                style={{
                  background: 'repeating-radial-gradient(circle, #242c37 0px, #1a212a 2px, #283340 3px)',
                }}
              >
                {/* Deep multi-coated sapphire glass element */}
                <div className="relative w-[52px] h-[52px] rounded-full bg-[#05070a] border border-[#3b4756] flex items-center justify-center overflow-hidden shadow-2xl">
                  {/* Cyan / Magenta anti-reflective coating glare */}
                  <div 
                    className="absolute inset-0 opacity-45 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 35% 30%, rgba(98,222,255,0.45) 0%, rgba(186,85,211,0.25) 50%, transparent 80%)',
                    }}
                  />
                  {/* Aperture iris */}
                  <div className="w-[20px] h-[20px] rounded-full bg-[#000000] border border-[#202731] shadow-inner" />
                </div>
              </div>
            </div>

            {/* 2. Secondary Pill Dual-Camera Island */}
            <div className="relative w-[138px] h-[64px] rounded-full bg-[#12171e] p-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.3)] border border-[#2b3542] flex items-center justify-around px-2">
              {/* Lens 2 */}
              <div className="relative w-[44px] h-[44px] rounded-full bg-[#05070a] border border-[#3b4756] flex items-center justify-center overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-45 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 35% 30%, rgba(98,222,255,0.4) 0%, rgba(186,85,211,0.2) 50%, transparent 80%)',
                  }}
                />
                <div className="w-[16px] h-[16px] rounded-full bg-[#000000] border border-[#202731]" />
              </div>

              {/* Lens 3 */}
              <div className="relative w-[44px] h-[44px] rounded-full bg-[#05070a] border border-[#3b4756] flex items-center justify-center overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-45 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 35% 30%, rgba(98,222,255,0.4) 0%, rgba(186,85,211,0.2) 50%, transparent 80%)',
                  }}
                />
                <div className="w-[16px] h-[16px] rounded-full bg-[#000000] border border-[#202731]" />
              </div>
            </div>
          </div>

          {/* GLYPH MATRIX (Right) */}
          <div className="pt-1">
            <GlyphMatrix />
          </div>

        </div>

        {/* Lower module accent lines */}
        <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[9px] font-mono tracking-wider text-[#525f70]">
          <span>50MP OIS</span>
          <span>MULTI-COAT SAPPHIRE</span>
          <span>137-LED MATRIX</span>
        </div>
      </div>

      {/* LOWER ZONE: Satin Bead-Blasted Anodized Aluminum Plate */}
      <div className="relative mx-3.5 mt-4 flex-1 h-[495px] flex flex-col justify-between p-6">
        
        {/* Subtle horizontal micro-seam */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#a8b4c0] to-transparent opacity-50" />

        {/* Center Minimalist Spec Monogram */}
        <div className="text-center opacity-60">
          <p className="font-grotesk text-[11px] font-medium tracking-[0.25em] text-[#4f5b68] uppercase">
            Designed for Precision
          </p>
          <p className="font-mono text-[9px] tracking-widest text-[#728090] mt-0.5">
            MODEL SIH-26162
          </p>
        </div>

        {/* Circular indentation detail at bottom left */}
        <div className="flex items-end justify-between">
          <div className="w-[54px] h-[54px] rounded-full bg-gradient-to-br from-[#bcc7d3] to-[#e4ebf2] border border-[#a2afbc] shadow-[inset_0_2px_4px_rgba(0,0,0,0.25),0_1px_1px_rgba(255,255,255,0.8)]" />

          {/* Regulatory & Certification Glyph Markings */}
          <div className="text-right text-[8px] font-mono tracking-wider text-[#637282] opacity-70 leading-tight">
            <div>AI & DATA SCIENCE</div>
            <div>THIRD-YEAR B.TECH</div>
            <div>CHENNAI, IN</div>
          </div>
        </div>

      </div>
    </div>
  );
};

