import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { playSound } from '../audio/soundEngine';

const PhoneContext = createContext(null);

export const PhoneProvider = ({ children }) => {
  const [isLocked, setIsLocked] = useState(false);
  const [activeApp, setActiveApp] = useState(null);
  const [appOriginRect, setAppOriginRect] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isQuickPanelOpen, setIsQuickPanelOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [rotation, setRotation] = useState({ x: -6, y: 12 });
  const [activeWallpaper, setActiveWallpaper] = useState('warm-copper');
  const [activeGlyphPattern, setActiveGlyphPattern] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isSnapshotting, setIsSnapshotting] = useState(false);

  const openApp = useCallback((appId, originRect = null) => {
    playSound('click', soundEnabled);
    setAppOriginRect(originRect);
    setActiveApp(appId);
    setIsDrawerOpen(false);
    setIsQuickPanelOpen(false);
  }, [soundEnabled]);

  const closeApp = useCallback(() => {
    playSound('click', soundEnabled);
    setActiveApp(null);
    setAppOriginRect(null);
  }, [soundEnabled]);

  const toggleDrawer = useCallback(() => {
    playSound('click', soundEnabled);
    setIsDrawerOpen(prev => !prev);
    setIsQuickPanelOpen(false);
  }, [soundEnabled]);

  const toggleQuickPanel = useCallback(() => {
    playSound('click', soundEnabled);
    setIsQuickPanelOpen(prev => !prev);
    setIsDrawerOpen(false);
  }, [soundEnabled]);

  const toggleHelp = useCallback(() => {
    playSound('click', soundEnabled);
    setIsHelpOpen(prev => !prev);
  }, [soundEnabled]);

  const toggleLock = useCallback(() => {
    playSound('power', soundEnabled);
    setIsLocked(prev => !prev);
    setActiveApp(null);
    setIsDrawerOpen(false);
    setIsQuickPanelOpen(false);
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) playSound('click', true);
  }, [soundEnabled]);

  const cycleGlyph = useCallback(() => {
    playSound('tick', soundEnabled);
    setActiveGlyphPattern(prev => (prev + 1) % 3);
  }, [soundEnabled]);

  const resetRotation = useCallback(() => {
    playSound('tick', soundEnabled);
    setRotation({ x: -6, y: 12 });
  }, [soundEnabled]);

  const triggerSnapshot = useCallback(() => {
    playSound('shutter', soundEnabled);
    setIsSnapshotting(true);
    setTimeout(() => {
      setIsSnapshotting(false);
    }, 400);
  }, [soundEnabled]);

  // Keyboard shortcut support: Escape closes current modal/app/drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isHelpOpen) {
          setIsHelpOpen(false);
        } else if (activeApp) {
          closeApp();
        } else if (isDrawerOpen) {
          setIsDrawerOpen(false);
        } else if (isQuickPanelOpen) {
          setIsQuickPanelOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeApp, isDrawerOpen, isQuickPanelOpen, isHelpOpen, closeApp]);

  const value = {
    isLocked,
    setIsLocked,
    activeApp,
    appOriginRect,
    isDrawerOpen,
    setIsDrawerOpen,
    isQuickPanelOpen,
    setIsQuickPanelOpen,
    isHelpOpen,
    setIsHelpOpen,
    rotation,
    setRotation,
    activeWallpaper,
    setActiveWallpaper,
    activeGlyphPattern,
    soundEnabled,
    isSnapshotting,
    openApp,
    closeApp,
    toggleDrawer,
    toggleQuickPanel,
    toggleHelp,
    toggleLock,
    toggleSound,
    cycleGlyph,
    resetRotation,
    triggerSnapshot,
  };

  return (
    <PhoneContext.Provider value={value}>
      {children}
    </PhoneContext.Provider>
  );
};

export const usePhone = () => {
  const context = useContext(PhoneContext);
  if (!context) {
    throw new Error('usePhone must be used within a PhoneProvider');
  }
  return context;
};
