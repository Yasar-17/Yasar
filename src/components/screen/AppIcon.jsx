import React from 'react';
import { motion } from 'framer-motion';
import { usePhone } from '../../context/PhoneContext';

// Per-app color theming to make icons look like real phone app icons
const APP_THEMES = {
  about:      { bg: '#0d3b2e', border: '#1a6a4a', icon: '#34d399' },
  projects:   { bg: '#0a2a52', border: '#1a4a8a', icon: '#60a5fa' },
  skills:     { bg: '#2a1a52', border: '#4a2a8a', icon: '#a78bfa' },
  experience: { bg: '#3a1a08', border: '#6a3010', icon: '#fb923c' },
  education:  { bg: '#1a2a08', border: '#3a5010', icon: '#86efac' },
  github:     { bg: '#141414', border: '#2a2a2a', icon: '#e2e8f0' },
  contact:    { bg: '#3a0a1a', border: '#6a1030', icon: '#fb7185' },
  resume:     { bg: '#0a1a3a', border: '#1a2a6a', icon: '#7dd3fc' },
  camera:     { bg: '#0a1a14', border: '#1a3a2a', icon: '#6ee7b7' },
  settings:   { bg: '#1a1a1a', border: '#323232', icon: '#94a3b8' },
  terminal:   { bg: '#000a00', border: '#0a2a0a', icon: '#4ade80' },
  casestudies:{ bg: '#1a1a3a', border: '#2a2a6a', icon: '#c084fc' },
  default:    { bg: '#141820', border: '#232c3a', icon: '#E8EDF2' },
};

export const AppIcon = ({
  id,
  label,
  icon: Icon,
  shape = 'rounded',
  badge = null,
  accentColor = null,
  className = '',
}) => {
  const { openApp } = usePhone();

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    openApp(id, {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    });
  };

  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-[20px]';
  const theme = APP_THEMES[id] || APP_THEMES.default;

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      className={`flex flex-col items-center group focus:outline-none select-none ${className}`}
      aria-label={`Open ${label}`}
    >
      {/* Icon Housing with per-app color */}
      <div 
        className={`relative w-[56px] h-[56px] ${shapeClass} flex items-center justify-center shadow-md transition-colors`}
        style={{ 
          backgroundColor: theme.bg, 
          border: `1px solid ${theme.border}` 
        }}
      >
        {/* Subtle top sheen */}
        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/[0.10] to-transparent pointer-events-none" />

        {/* Icon Glyph */}
        {Icon && (
          <Icon 
            className="w-6 h-6 transition-colors" 
            style={{ color: theme.icon }}
          />
        )}

        {/* Badge */}
        {badge && (
          <span 
            className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full border-2"
            style={{ backgroundColor: '#FF453A', borderColor: theme.bg }}
          />
        )}
      </div>

      {/* Label */}
      <span className="text-[11px] font-mono text-[#9AA6B2] group-hover:text-[#E8EDF2] mt-1.5 tracking-tight truncate max-w-[66px] transition-colors">
        {label}
      </span>
    </motion.button>
  );
};

export default AppIcon;
