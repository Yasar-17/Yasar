import React from 'react';
import { motion } from 'framer-motion';
import { usePhone } from '../../context/PhoneContext';
import { StatusBar } from './StatusBar';
import { Navigation } from './Navigation';
import { ArrowLeftIcon } from '../../ui/Icons';

export const AppWindow = ({
  title,
  subtitle = null,
  headerAction = null,
  children,
  className = '',
}) => {
  const { closeApp } = usePhone();

  return (
    <div className={`relative w-full h-full flex flex-col justify-between bg-[#0B0F14] text-[#E8EDF2] overflow-hidden select-none font-sans ${className}`}>
      
      {/* 1. Status Bar */}
      <StatusBar />

      {/* 2. App Navigation Header */}
      <header className="relative z-20 flex items-center justify-between px-4 py-2 border-b border-[#1b222d] bg-[#0E1219]/90 backdrop-blur-md">
        <div className="flex items-center space-x-2.5">
          {/* Back Gesture Button */}
          <motion.button
            type="button"
            onClick={closeApp}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#9AA6B2] hover:text-white transition-colors focus:outline-none"
            aria-label="Back to home screen"
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </motion.button>

          {/* Title and Subtitle */}
          <div className="flex flex-col">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#F0F4F8] leading-none">
              {title}
            </h2>
            {subtitle && (
              <span className="font-mono text-[10px] text-[#626e7e] tracking-tight mt-0.5">
                {subtitle}
              </span>
            )}
          </div>
        </div>

        {/* Optional Right Action Slot */}
        {headerAction && (
          <div className="flex items-center space-x-1.5">
            {headerAction}
          </div>
        )}
      </header>

      {/* 3. Scrollable App Content Surface */}
      <main className="flex-1 overflow-y-auto px-4 py-3 space-y-3 focus:outline-none overscroll-contain">
        {children}
      </main>

      {/* 4. Bottom Home Gesture Pill Navigation */}
      <Navigation />

    </div>
  );
};

export default AppWindow;

