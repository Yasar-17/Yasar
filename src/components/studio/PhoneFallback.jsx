import React, { useState } from 'react';
import { RotateIcon, ExternalLinkIcon, CheckIcon } from '../../ui/Icons';

export const PhoneFallback = ({
  missingAsset = 'public/models/nothing-phone-4a-pro/phone.glb',
  webglError = false,
  onRetry,
  errorMessage = null,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPath = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(missingAsset);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[520px] flex items-center justify-center p-6 select-none font-sans">
      {/* Background Architectural Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(124, 242, 201, 0.08) 0%, transparent 70%),
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 32px 32px, 32px 32px',
        }}
      />

      {/* Blueprint Spec Card */}
      <div className="relative z-10 w-full max-w-xl bg-[#12161f]/95 border border-[#232b36] rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl text-[#E8EDF2] flex flex-col space-y-6">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-[#232b36] pb-4">
          <div className="flex items-center space-x-3">
            <span className={`w-2.5 h-2.5 rounded-full ${webglError ? 'bg-red-450 animate-ping' : 'bg-[#FFB86B] animate-pulse'}`} />
            <span className="font-mono text-xs uppercase tracking-widest text-[#9AA6B2]">
              {webglError ? 'HARDWARE_ACCELERATION_FAULT' : '3D_PIPELINE: ASSET_PENDING'}
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#626e7e] px-2.5 py-1 rounded bg-[#181e28] border border-[#232b36]">
            SPEC REV: 4A-PRO
          </span>
        </div>

        {/* Diagnostic Message */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F0F4F8]">
            {webglError ? 'WebGL Context Unavailable' : 'Awaiting 3D Model Asset'}
          </h2>
          <p className="text-sm text-[#9AA6B2] leading-relaxed">
            {webglError
              ? 'Hardware 3D acceleration could not be initialized in this browser environment. Check browser WebGL settings or GPU drivers.'
              : 'The Three.js rendering engine is configured and awaiting the physical GLTF/GLB unibody model export.'}
          </p>
        </div>

        {/* Target Asset Path Box */}
        <div className="bg-[#0b0e14] border border-[#1f2633] rounded-xl p-4 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-col space-y-1 overflow-hidden">
            <span className="text-[10px] text-[#626e7e] uppercase tracking-wider">Target Model Filepath</span>
            <span className="text-[#7CF2C9] truncate font-medium">{missingAsset}</span>
          </div>
          <button
            type="button"
            onClick={handleCopyPath}
            className="flex items-center justify-center space-x-2 px-3 py-1.5 rounded-lg bg-[#181f2a] hover:bg-[#232d3d] border border-[#2d3848] text-[#C5CED8] hover:text-[#FFFFFF] transition-colors shrink-0 text-xs font-mono"
          >
            {copied ? (
              <>
                <CheckIcon className="w-3.5 h-3.5 text-[#7CF2C9]" />
                <span className="text-[#7CF2C9]">Copied</span>
              </>
            ) : (
              <>
                <span>Copy Path</span>
              </>
            )}
          </button>
        </div>

        {/* Blueprint CAD Schematic Preview (2px stroke SVGs, no emojis) */}
        <div className="bg-[#0d1117] border border-[#1f2633] rounded-xl p-5 flex flex-col sm:flex-row items-center justify-around gap-6">
          {/* Front Elevation Outline */}
          <div className="flex flex-col items-center space-y-2">
            <svg
              width="90"
              height="180"
              viewBox="0 0 90 180"
              fill="none"
              stroke="#7CF2C9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80"
            >
              {/* Phone Outer Chassis */}
              <rect x="5" y="5" width="80" height="170" rx="16" />
              {/* Display Bezel */}
              <rect x="9" y="9" width="72" height="162" rx="12" stroke="#394b5e" />
              {/* Centered Punch-Hole Camera */}
              <circle cx="45" cy="18" r="3" stroke="#7CF2C9" />
              {/* Ear Speaker Micro-slit */}
              <line x1="39" y1="9" x2="51" y2="9" stroke="#9AA6B2" />
            </svg>
            <span className="font-mono text-[10px] text-[#9AA6B2] uppercase tracking-wider">Front: 6.7" OLED</span>
          </div>

          {/* Technical Dimensions Callout */}
          <div className="flex flex-col space-y-2 text-xs font-mono text-[#9AA6B2] border-y sm:border-y-0 sm:border-x border-[#1f2633] py-3 sm:py-0 sm:px-6">
            <div className="text-[11px] font-semibold text-[#E8EDF2] uppercase tracking-wider mb-1">
              Engineering Specs
            </div>
            <div className="flex justify-between space-x-4">
              <span className="text-[#626e7e]">Width:</span>
              <span className="text-[#E8EDF2]">76.3 mm</span>
            </div>
            <div className="flex justify-between space-x-4">
              <span className="text-[#626e7e]">Height:</span>
              <span className="text-[#E8EDF2]">161.7 mm</span>
            </div>
            <div className="flex justify-between space-x-4">
              <span className="text-[#626e7e]">Depth:</span>
              <span className="text-[#E8EDF2]">8.55 mm</span>
            </div>
            <div className="flex justify-between space-x-4">
              <span className="text-[#626e7e]">Finish:</span>
              <span className="text-[#7CF2C9]">Natural Silver</span>
            </div>
          </div>

          {/* Rear Elevation Outline */}
          <div className="flex flex-col items-center space-y-2">
            <svg
              width="90"
              height="180"
              viewBox="0 0 90 180"
              fill="none"
              stroke="#9AA6B2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80"
            >
              {/* Outer Rail */}
              <rect x="5" y="5" width="80" height="170" rx="16" stroke="#7CF2C9" />
              {/* Upper Transparent Visor Division */}
              <line x1="5" y1="85" x2="85" y2="85" stroke="#394b5e" strokeDasharray="3 3" />
              {/* Dual Horizontal Camera Pill */}
              <rect x="22" y="24" width="46" height="24" rx="12" stroke="#7CF2C9" />
              <circle cx="34" cy="36" r="6" stroke="#7CF2C9" />
              <circle cx="56" cy="36" r="6" stroke="#7CF2C9" />
              {/* Circular Glyph Matrix Window */}
              <circle cx="45" cy="115" r="28" stroke="#394b5e" strokeDasharray="2 4" />
              <circle cx="45" cy="115" r="18" stroke="#7CF2C9" strokeDasharray="3 3" />
            </svg>
            <span className="font-mono text-[10px] text-[#9AA6B2] uppercase tracking-wider">Rear: Dual 50MP</span>
          </div>
        </div>

        {/* Instructions Checklist */}
        <div className="space-y-2 text-xs text-[#9AA6B2]">
          <div className="font-mono text-[11px] text-[#E8EDF2] uppercase tracking-wider">
            Integration Pipeline:
          </div>
          <ol className="list-decimal list-inside space-y-1 text-[#9AA6B2] font-mono leading-relaxed text-[11px]">
            <li>Export the textured model as a single binary GLB from Blender.</li>
            <li>Place <code className="text-[#7CF2C9] bg-[#0b0e14] px-1 py-0.5 rounded">phone.glb</code> into <code className="text-[#7CF2C9] bg-[#0b0e14] px-1 py-0.5 rounded">public/models/nothing-phone-4a-pro/</code>.</li>
            <li>The R3F viewport automatically initializes PBR shaders, reflections, and damping.</li>
          </ol>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center justify-between pt-2 border-t border-[#232b36]">
          <span className="font-mono text-[10px] text-[#626e7e]">
            {errorMessage ? `ERR: ${errorMessage}` : 'AWAITING_FILE_DROP'}
          </span>

          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#181f2a] hover:bg-[#232d3d] border border-[#2d3848] text-[#E8EDF2] hover:text-[#7CF2C9] transition-all text-xs font-medium"
            >
              <RotateIcon className="w-3.5 h-3.5" />
              <span>Check for Asset</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default PhoneFallback;

