import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePhone } from '../../context/PhoneContext';
import { CaseStudiesApp } from '../apps/CaseStudiesApp';
import { ProjectsApp } from '../apps/ProjectsApp';
import { TerminalApp } from '../apps/TerminalApp';
import { SettingsApp } from '../apps/SettingsApp';
import { GitHubApp } from '../apps/GitHubApp';
import { SimpleApp } from '../apps/SimpleApps';

export const AppContainer = () => {
  const { activeApp } = usePhone();

  const renderAppContent = () => {
    switch (activeApp) {
      case 'case-studies':
        return <CaseStudiesApp />;
      case 'projects':
        return <ProjectsApp />;
      case 'terminal':
        return <TerminalApp />;
      case 'settings':
        return <SettingsApp />;
      case 'github':
        return <GitHubApp />;
      default:
        return <SimpleApp appId={activeApp} />;
    }
  };

  return (
    <AnimatePresence>
      {activeApp && (
        <motion.div
          key={activeApp}
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 28,
            mass: 0.8,
          }}
          className="absolute inset-0 z-30 bg-[#0B0F14] overflow-hidden"
          style={{ willChange: 'transform, opacity' }}
        >
          {renderAppContent()}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

