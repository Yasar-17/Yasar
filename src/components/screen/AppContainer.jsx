import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePhone } from '../../context/PhoneContext';
import { AboutApp } from '../apps/AboutApp';
import { ProjectsApp } from '../apps/ProjectsApp';
import { SkillsApp } from '../apps/SkillsApp';
import { ExperienceApp } from '../apps/ExperienceApp';
import { GitHubApp } from '../apps/GitHubApp';
import { TerminalApp } from '../apps/TerminalApp';
import { ResumeApp } from '../apps/ResumeApp';
import { ContactApp } from '../apps/ContactApp';
import { SettingsApp } from '../apps/SettingsApp';
import { CaseStudiesApp } from '../apps/CaseStudiesApp';
import { CameraApp } from '../apps/CameraApp';

export const AppContainer = () => {
  const { activeApp, appOriginRect } = usePhone();

  const renderAppContent = () => {
    switch (activeApp) {
      case 'about':
        return <AboutApp />;
      case 'projects':
        return <ProjectsApp />;
      case 'skills':
        return <SkillsApp />;
      case 'experience':
        return <ExperienceApp />;
      case 'github':
        return <GitHubApp />;
      case 'terminal':
        return <TerminalApp />;
      case 'resume':
        return <ResumeApp />;
      case 'contact':
        return <ContactApp />;
      case 'settings':
        return <SettingsApp />;
      case 'case-studies':
        return <CaseStudiesApp />;
      case 'camera':
        return <CameraApp />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {activeApp && (
        <motion.div
          key={activeApp}
          initial={{ opacity: 0, scale: 0.88, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
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

export default AppContainer;
