import React from 'react';
import { motion } from 'framer-motion';
import { usePhone } from '../../context/PhoneContext';
import { ChevronDownIcon } from '../../ui/Icons';

export const Navigation = ({ showBackHint = true, className = '' }) => {
  const { closeApp } = usePhone();

  return (
    <div className={`relative z-40 w-full flex flex-col items-center justify-center pt-2 pb-2 select-none ${className}`}>
      {/* Home Gesture Pill */}
      <motion.button
        type="button"
        onClick={closeApp}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        className="group flex flex-col items-center justify-center py-1 px-6 focus:outline-none cursor-pointer"
        aria-label="Return to Home Screen"
      >
        <div className="w-[124px] h-[4.5px] rounded-full bg-white/40 group-hover:bg-[#7CF2C9] transition-colors shadow-sm" />
      </motion.button>
    </div>
  );
};

export default Navigation;

