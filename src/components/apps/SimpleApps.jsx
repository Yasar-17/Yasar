import React from 'react';
import { AboutApp } from './AboutApp';
import { ProjectsApp } from './ProjectsApp';
import { SkillsApp } from './SkillsApp';
import { ExperienceApp } from './ExperienceApp';
import { GitHubApp } from './GitHubApp';
import { TerminalApp } from './TerminalApp';
import { ResumeApp } from './ResumeApp';
import { ContactApp } from './ContactApp';
import { SettingsApp } from './SettingsApp';
import { CaseStudiesApp } from './CaseStudiesApp';

export const SimpleApp = ({ appId }) => {
  switch (appId) {
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
    default:
      return null;
  }
};

export default SimpleApp;
