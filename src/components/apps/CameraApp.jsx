import React, { useState, useEffect, useRef } from 'react';
import { usePhone } from '../../context/PhoneContext';
import { AppWindow } from '../screen/AppWindow';
import { 
  CameraIcon, 
  RotateIcon, 
  SparklesIcon, 
  CheckIcon, 
  CloseIcon,
  ChevronUpIcon
} from '../../ui/Icons';
import { playSound } from '../../audio/soundEngine';
import { glyphController } from '../glyph/glyphController';

const ZOOM_PRESETS = [
  { level: 0.6, label: '0.6x', name: 'Ultra-Wide', focal: '14mm', fov: '114°' },
  { level: 1.0, label: '1x', name: '50MP Sony Main', focal: '24mm', fov: '84°' },
  { level: 3.5, label: '3.5x', name: 'Tetraprism Periscope', focal: '85mm', fov: '28°' },
  { level: 140, label: '140x', name: 'Ultra Zoom', focal: '3360mm', fov: '0.7°' },
];

export const CameraApp = () => {
  const { soundEnabled } = usePhone();
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [timerActive, setTimerActive] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [mode, setMode] = useState('photo'); // 'photo' | 'video'
  const [isRecording, setIsRecording] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [lastShotThumb, setLastShotThumb] = useState(null);
  const countdownIntervalRef = useRef(null);

  const activePreset = ZOOM_PRESETS.reduce((prev, curr) => {
    return Math.abs(curr.level - zoomLevel) < Math.abs(prev.level - zoomLevel) ? curr : prev;
  }, ZOOM_PRESETS[0]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, []);

  const handleZoomSelect = (level) => {
    setZoomLevel(level);
    playSound('tick', soundEnabled);
  };

  const handleShutter = () => {
    if (mode === 'video') {
      const next = !isRecording;
      setIsRecording(next);
      playSound(next ? 'power' : 'tick', soundEnabled);
      if (next) {
        // Red tally light active, glyph breathing
        glyphController.playPattern('notificationPulse', 12000, 'idle');
      } else {
        glyphController.setPattern('idle');
      }
      return;
    }

    if (timerActive && countdown === null) {
      // Start 3-second radial countdown with the 137-LED Glyph Matrix!
      let remaining = 3;
      setCountdown(remaining);
      playSound('tick', soundEnabled);

      // Trigger 137-LED cameraTimer pattern on rear Glyph
      glyphController.playPattern('cameraTimer', 3400, 'idle');

      countdownIntervalRef.current = setInterval(() => {
        remaining -= 1;
        if (remaining > 0) {
          setCountdown(remaining);
          playSound('tick', soundEnabled);
        } else {
          clearInterval(countdownIntervalRef.current);
          countdownIntervalRef.current = null;
          setCountdown(null);
          executeCapture();
        }
      }, 1000);
    } else if (countdown === null) {
      executeCapture();
    }
  };

  const executeCapture = () => {
    playSound('shutter', soundEnabled);
    setIsFlashing(true);
    setLastShotThumb(activePreset.level);

    // Short Glyph flash
    glyphController.playPattern('notificationPulse', 500, 'idle');

    setTimeout(() => {
      setIsFlashing(false);
    }, 280);
  };

  // Viewfinder scene visuals based on zoom level
  const getViewfinderStyle = () => {
    let scale = 1;
    if (zoomLevel <= 1.0) {
      scale = 0.8 + ((zoomLevel - 0.6) / 0.4) * 0.2;
    } else if (zoomLevel <= 3.5) {
      scale = 1.0 + ((zoomLevel - 1.0) / 2.5) * 0.8;
    } else {
      scale = 1.8 + Math.min(2.5, Math.log10(zoomLevel / 3.5) * 1.5);
    }
    return {
      transform: `scale(${scale})`,
      transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    };
  };

  return (
    <AppWindow title="Camera" subtitle="World's First 140x Ultra Zoom">
      <div className="flex flex-col h-full justify-between pb-3 select-none font-sans">
        
        {/* 1. Top HUD Controls */}
        <div className="flex items-center justify-between px-2 py-1 bg-[#121620]/90 backdrop-blur-md rounded-2xl border border-[#202937] text-xs font-mono">
          <button
            type="button"
            data-testid="glyph-timer-btn"
            onClick={() => {
              setTimerActive((prev) => !prev);
              playSound('tick', soundEnabled);
            }}
            className={`px-2.5 py-1 rounded-xl transition-all flex items-center space-x-1.5 ${
              timerActive 
                ? 'bg-[#7CF2C9] text-[#0B0F14] font-bold' 
                : 'text-[#9AA6B2] hover:text-white bg-white/5'
            }`}
          >
            <span>Glyph 3s Timer</span>
            {timerActive && <span className="w-1.5 h-1.5 rounded-full bg-[#0B0F14]" />}
          </button>

          <div className="flex items-center space-x-2 text-[10px] text-[#626e7e]">
            <span className="text-[#7CF2C9] font-bold">50MP</span>
            <span>·</span>
            <span>OIS DUAL</span>
            <span>·</span>
            <span className={mode === 'video' ? 'text-[#FF453A] font-bold animate-pulse' : ''}>
              {mode === 'video' ? 'REC TALLY ON' : 'RAW 14-BIT'}
            </span>
          </div>

          <div className="flex items-center space-x-1 bg-[#18202c] p-0.5 rounded-lg border border-[#283547]">
            <button
              type="button"
              onClick={() => { setMode('photo'); playSound('tick', soundEnabled); }}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                mode === 'photo' ? 'bg-[#7CF2C9] text-[#0B0F14] font-bold' : 'text-[#9AA6B2]'
              }`}
            >
              Photo
            </button>
            <button
              type="button"
              onClick={() => { setMode('video'); playSound('tick', soundEnabled); }}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                mode === 'video' ? 'bg-[#FF453A] text-white font-bold' : 'text-[#9AA6B2]'
              }`}
            >
              Video
            </button>
          </div>
        </div>

        {/* 2. Interactive Viewfinder Chamber */}
        <div className="relative my-2 w-full aspect-[4/5] rounded-[24px] overflow-hidden bg-[#07090d] border border-[#232c3a] shadow-inner flex items-center justify-center">
          
          {/* Shutter White Flash Overlay */}
          {isFlashing && (
            <div className="absolute inset-0 bg-white z-50 animate-ping opacity-95 pointer-events-none" />
          )}

          {/* Large Countdown Overlay */}
          {countdown !== null && (
            <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white pointer-events-none">
              <span className="font-mono text-7xl font-extrabold tracking-tighter text-[#7CF2C9] animate-pulse">
                {countdown}
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#9AA6B2] mt-2">
                137-LED Glyph Countdown
              </span>
            </div>
          )}

          {/* Viewfinder Target Scene Graphic */}
          <div 
            className="w-full h-full relative flex items-center justify-center overflow-hidden"
            style={getViewfinderStyle()}
          >
            {/* Architectural & Space Graphic Simulating Real Telephoto Imagery */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#111622] via-[#090c12] to-[#040608]" />
            
            {/* Geometric Grid simulating Camera Sensor Array */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(124, 242, 201, 0.4) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* Target Telemetric Subject */}
            <div className="relative z-10 flex flex-col items-center text-center p-4">
              <div className="w-24 h-24 rounded-full border border-dashed border-[#7CF2C9]/60 flex items-center justify-center relative mb-3">
                <div className="w-12 h-12 rounded-full border border-[#7CF2C9] flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-[#7CF2C9]" />
                </div>
                {/* Crosshairs */}
                <div className="absolute -top-2 w-[1px] h-4 bg-[#7CF2C9]" />
                <div className="absolute -bottom-2 w-[1px] h-4 bg-[#7CF2C9]" />
                <div className="absolute -left-2 h-[1px] w-4 bg-[#7CF2C9]" />
                <div className="absolute -right-2 h-[1px] w-4 bg-[#7CF2C9]" />
              </div>

              <div className="bg-[#0b0f14]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#232c3a]">
                <div className="font-mono text-xs font-bold text-[#E8EDF2]">
                  {activePreset.name}
                </div>
                <div className="font-mono text-[10px] text-[#7CF2C9]">
                  {activePreset.focal} · FOV {activePreset.fov}
                </div>
              </div>
            </div>

            {/* Horizon Level Indicator */}
            <div className="absolute inset-x-8 h-[1px] bg-white/20 flex items-center justify-center pointer-events-none">
              <div className="w-6 h-[2px] bg-[#7CF2C9]" />
            </div>
          </div>

          {/* Telemetry Corner HUD Overlays */}
          <div className="absolute top-3 left-3 font-mono text-[9px] text-[#7CF2C9] bg-black/60 px-2 py-0.5 rounded border border-white/10 pointer-events-none">
            {zoomLevel >= 140 ? '140X PERISCOPE ACTIVE' : zoomLevel >= 3.5 ? 'TETRAPRISM OPTICAL' : 'SONY 50MP MAIN'}
          </div>
          <div className="absolute top-3 right-3 font-mono text-[9px] text-[#9AA6B2] bg-black/60 px-2 py-0.5 rounded border border-white/10 pointer-events-none">
            1/2000s · f/1.88 · ISO 64
          </div>
        </div>

        {/* 3. Zoom Selector Presets Pill */}
        <div className="flex items-center justify-center space-x-1.5 py-1">
          {ZOOM_PRESETS.map((p) => {
            const isSelected = Math.abs(zoomLevel - p.level) < 0.1;
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => handleZoomSelect(p.level)}
                className={`px-3 py-1.5 rounded-full font-mono text-xs transition-all ${
                  isSelected
                    ? 'bg-[#7CF2C9] text-[#0B0F14] font-bold shadow-md scale-105'
                    : 'bg-[#141820] text-[#9AA6B2] hover:text-white border border-[#222c3a] hover:border-[#374457]'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {/* 4. Zoom Slider Dial (0.6x to 140x) */}
        <div className="px-4 py-1.5 bg-[#121620]/70 rounded-xl border border-[#1f2633] flex items-center space-x-3">
          <span className="font-mono text-[10px] text-[#626e7e]">0.6x</span>
          <input
            type="range"
            min="0.6"
            max="140"
            step="0.1"
            value={zoomLevel}
            onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
            className="w-full accent-[#7CF2C9] h-1.5 bg-[#1b222d] rounded-lg cursor-pointer"
            aria-label="Periscope Zoom Slider"
          />
          <span className="font-mono text-[10px] text-[#7CF2C9] font-bold w-12 text-right">
            {zoomLevel.toFixed(1)}x
          </span>
        </div>

        {/* 5. Bottom Shutter Bar */}
        <div className="flex items-center justify-around pt-2">
          {/* Last Shot Thumbnail */}
          <div className="w-10 h-10 rounded-full border border-[#232c3a] bg-[#141820] flex items-center justify-center overflow-hidden">
            {lastShotThumb ? (
              <span className="font-mono text-[9px] text-[#7CF2C9] font-bold">
                {lastShotThumb}x
              </span>
            ) : (
              <span className="w-2 h-2 rounded-full bg-[#202937]" />
            )}
          </div>

          {/* Shutter Button */}
          <button
            type="button"
            data-testid="camera-shutter-btn"
            onClick={handleShutter}
            className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all active:scale-95 shadow-xl ${
              mode === 'video'
                ? isRecording
                  ? 'border-[#FF453A] bg-[#FF453A]/20'
                  : 'border-white bg-[#FF453A]'
                : 'border-white hover:border-[#7CF2C9] bg-white/10 hover:bg-white/20'
            }`}
            aria-label={mode === 'video' ? (isRecording ? 'Stop Recording' : 'Start Recording') : 'Take Photo'}
          >
            <div 
              className={`transition-all ${
                mode === 'video'
                  ? isRecording ? 'w-5 h-5 rounded-sm bg-[#FF453A]' : 'w-11 h-11 rounded-full bg-[#FF453A]'
                  : 'w-12 h-12 rounded-full bg-white active:bg-[#7CF2C9]'
              }`}
            />
          </button>

          {/* Lens Switcher / Info */}
          <div className="w-10 h-10 rounded-full border border-[#232c3a] bg-[#141820] flex items-center justify-center text-[#9AA6B2]">
            <CameraIcon className="w-4 h-4" />
          </div>
        </div>

      </div>
    </AppWindow>
  );
};

export default CameraApp;
