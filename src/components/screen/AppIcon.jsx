import React from 'react';
import { motion } from 'framer-motion';
import { usePhone } from '../../context/PhoneContext';

export const AppIcon = ({
  id,
  label,
  icon: Icon,
  shape = 'rounded', // 'rounded' (squircle) | 'circle'
  badge = null,
  accentColor = '#FFFFFF',
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
      {/* Icon Housing (Nothing OS Monochrome Aesthetic) */}
      <div className={`relative w-[56px] h-[56px] ${shapeClass} bg-[#141820] border border-[#232c3a] group-hover:border-[#38465c] text-white flex items-center justify-center shadow-md transition-colors`}>
        
        {/* Subtle Inner Reflection Sheen */}
        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

        {/* Icon Glyph */}
        {Icon && (
          <Icon className="w-6 h-6 text-[#E8EDF2] group-hover:text-white transition-colors" />
        )}

        {/* Status Dot / Badge */}
        {badge && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#FF453A] border-2 border-[#141820]" />
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
