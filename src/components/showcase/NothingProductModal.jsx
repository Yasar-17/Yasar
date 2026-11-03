import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CameraIcon, 
  SparklesIcon, 
  CpuIcon, 
  CheckIcon, 
  CloseIcon, 
  RotateIcon, 
  VolumeIcon,
  ChevronDownIcon
} from '../../ui/Icons';
import { playSound } from '../../audio/soundEngine';
import { glyphController } from '../glyph/glyphController';
import { GLYPH_LEDS, TOTAL_LEDS } from '../glyph/glyphPatterns';

const SPEC_SECTIONS = [
  {
    title: 'Camera System',
    specs: [
      { label: 'Ultra Zoom', val: 'World’s first 140x periscope ultra zoom' },
      { label: 'Optical Periscope', val: '50MP Sony sensor · 3.5x optical tetraprism (85mm)' },
      { label: 'Main Wide', val: '50MP Sony IMX customized sensor · f/1.88 · Dual OIS' },
      { label: 'Ultra-Wide', val: '50MP 114° field of view · 4cm macro capability' },
      { label: 'Video Light', val: 'Film camera-inspired physical red recording tally LED' },
      { label: 'Camera Housing', val: 'Transparent nano-injection molded enclosure' },
    ],
  },
  {
    title: 'Glyph Matrix Interface',
    specs: [
      { label: 'LED Count', val: '137 individually addressable mini-LED elements' },
      { label: 'Matrix Area', val: '57% larger circular dome array · 2x peak brightness' },
      { label: 'Light Diffusion', val: 'Phosphor micro-diffuser layer with soft light falloff' },
      { label: 'Signature Modes', val: 'Solar path, camera countdown, progress dial, music visualizer' },
      { label: 'Interaction', val: 'Flip to Glyph silent light notification system' },
    ],
  },
  {
    title: 'Performance & Silicon',
    specs: [
      { label: 'Processor', val: 'Snapdragon 7 Gen 4 · 4nm high-efficiency architecture' },
      { label: 'AI Acceleration', val: 'Qualcomm Hexagon NPU for real-time 140x zoom reconstruction' },
      { label: 'Cooling System', val: 'High-thermal-conductivity vapor chamber with graphite heat spreader' },
    ],
  },
  {
    title: 'Display & Design',
    specs: [
      { label: 'Display Panel', val: '6.83-inch 1.5K (2800 × 1260) Flexible AMOLED' },
      { label: 'Peak Brightness', val: '5,000 nits outdoor peak brightness' },
      { label: 'Refresh Rate', val: '1–120Hz LTPO adaptive refresh · 2160Hz high-frequency PWM' },
      { label: 'Bezel Symmetry', val: '1.3mm ultra-thin four-sided uniform borders' },
      { label: 'Chassis Frame', val: '100% recycled 6000-series anodized aluminum midframe' },
      { label: 'Battery & Power', val: '5,080 mAh high-density cell · 65W wired fast charging' },
    ],
  },
];

export const NothingProductModal = ({ isOpen, onClose, onFlipPhone }) => {
  const [activeTab, setActiveTab] = useState('camera'); // 'camera' | 'glyph' | 'craft' | 'specs'
  const [zoomLevel, setZoomLevel] = useState(3.5);
  const [activePattern, setActivePattern] = useState('solarPath');
  const [glyphBrightness, setGlyphBrightness] = useState(1.0);
  const canvasRef = useRef(null);

  // Synchronize 2D matrix canvas preview
  useEffect(() => {
    if (!isOpen || activeTab !== 'glyph') return;

    let animId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const cellSize = (w * 0.76) / 13;
    const diodeSize = cellSize * 0.68;

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // Dark Dome Background
      ctx.fillStyle = '#080c12';
      ctx.beginPath();
      ctx.arc(cx, cy, w * 0.46, 0, Math.PI * 2);
      ctx.fill();

      // Outer CNC chamfered ring
      ctx.strokeStyle = '#1d2735';
      ctx.lineWidth = 4;
      ctx.stroke();

      const brightnessArray = glyphController.getBrightnessArray();

      for (let i = 0; i < TOTAL_LEDS; i++) {
        const led = GLYPH_LEDS[i];
        const b = brightnessArray[i] || 0.05;
        const px = cx + led.col * cellSize;
        const py = cy + led.row * cellSize;

        if (b > 0.08) {
          // Glow
          const grad = ctx.createRadialGradient(px, py, diodeSize * 0.1, px, py, diodeSize * 1.5);
          grad.addColorStop(0, `rgba(255, 255, 255, ${b * 0.9})`);
          grad.addColorStop(0.6, `rgba(220, 235, 255, ${b * 0.3})`);
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(px, py, diodeSize * 1.5, 0, Math.PI * 2);
          ctx.fill();

          // Diode Core
          ctx.fillStyle = `rgb(${Math.round(200 + b * 55)}, ${Math.round(220 + b * 35)}, 255)`;
        } else {
          ctx.fillStyle = '#141a24';
        }

        ctx.beginPath();
        ctx.arc(px, py, diodeSize / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const handlePatternSelect = (name) => {
    setActivePattern(name);
    playSound('tick', true);
    if (name === 'cameraTimer') {
      glyphController.playPattern('cameraTimer', 3400, 'idle');
    } else {
      glyphController.setPattern(name);
    }
  };

  const handleBrightnessChange = (val) => {
    setGlyphBrightness(val);
    glyphController.setGlobalBrightness(val);
  };

  const inspectOn3DModel = () => {
    playSound('tick', true);
    if (onFlipPhone) {
      onFlipPhone(true);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md font-sans select-none overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Phone (4a) Pro Official Product Showcase"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#0C1017] border border-[#232d3d] rounded-[28px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1b2330] bg-[#10151f]/80 backdrop-blur-md">
            <div>
              <div className="flex items-center space-x-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7CF2C9] animate-pulse" />
                <h2 className="font-mono text-base font-bold text-[#E8EDF2] tracking-wide uppercase">
                  Phone (4a) Pro · Architecture & Specifications
                </h2>
              </div>
              <p className="font-mono text-[11px] text-[#6b7c93] mt-0.5">
                140x Periscope Ultra Zoom · 137-LED Glyph Matrix · 5,000 Nits AMOLED
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-[#161c27] hover:bg-[#202938] text-[#9AA6B2] hover:text-white border border-[#273244] transition-all cursor-pointer"
              aria-label="Close Showcase"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-2 px-6 pt-3 pb-2 bg-[#0e121a] border-b border-[#1b2330] overflow-x-auto">
            {[
              { id: 'camera', label: '140x Ultra Zoom', icon: CameraIcon },
              { id: 'glyph', label: '137-LED Glyph Matrix', icon: SparklesIcon },
              { id: 'craft', label: 'Craft & Engineering', icon: CpuIcon },
              { id: 'specs', label: 'Full Tech Specs', icon: CheckIcon },
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    playSound('tick', true);
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-mono text-xs transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#7CF2C9] text-[#0B0F14] font-bold shadow-md'
                      : 'text-[#9AA6B2] hover:text-white bg-[#141a24] hover:bg-[#1b2330] border border-[#232c3a]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Modal Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-[#E8EDF2]">
            
            {/* TAB 1: 140x Ultra Zoom Camera System */}
            {activeTab === 'camera' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* Left: Viewfinder Simulator */}
                  <div className="flex flex-col space-y-3">
                    <div className="relative aspect-[4/3] rounded-2xl bg-[#05070a] border border-[#222c3c] overflow-hidden flex items-center justify-center shadow-inner">
                      {/* Dynamic Background Telephoto Scale */}
                      <div 
                        className="w-full h-full flex items-center justify-center relative overflow-hidden transition-transform duration-300 ease-out"
                        style={{
                          transform: `scale(${zoomLevel <= 1 ? 1 : 1 + Math.log10(zoomLevel) * 1.8})`,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#121926] via-[#090d14] to-[#040609]" />
                        <div 
                          className="absolute inset-0 opacity-25"
                          style={{
                            backgroundImage: 'radial-gradient(circle, rgba(124, 242, 201, 0.4) 1px, transparent 1px)',
                            backgroundSize: '24px 24px',
                          }}
                        />

                        {/* Subject target */}
                        <div className="relative z-10 flex flex-col items-center">
                          <div className="w-20 h-20 rounded-full border border-dashed border-[#7CF2C9] flex items-center justify-center">
                            <span className="w-3 h-3 rounded-full bg-[#7CF2C9] animate-ping" />
                          </div>
                          <span className="mt-2 font-mono text-[10px] text-[#7CF2C9] bg-black/60 px-2 py-0.5 rounded border border-[#7CF2C9]/30">
                            SONY 50MP OIS · {zoomLevel.toFixed(1)}x
                          </span>
                        </div>
                      </div>

                      {/* HUD Overlay */}
                      <div className="absolute top-3 left-3 font-mono text-[9px] text-[#7CF2C9] bg-black/70 px-2 py-1 rounded border border-white/10">
                        {zoomLevel >= 140 ? '140X PERISCOPE ULTRA ZOOM' : zoomLevel >= 3.5 ? '3.5X TETRAPRISM OPTICAL' : '1X SONY SENSOR'}
                      </div>
                      <div className="absolute bottom-3 right-3 font-mono text-[9px] text-[#9AA6B2] bg-black/70 px-2 py-1 rounded border border-white/10">
                        f/1.88 · 1/2500s · ISO 50
                      </div>
                    </div>

                    {/* Zoom Presets Buttons */}
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { val: 0.6, label: '0.6x Ultra-Wide' },
                        { val: 1.0, label: '1x Main 50MP' },
                        { val: 3.5, label: '3.5x Tetraprism' },
                        { val: 140, label: '140x Ultra Zoom' },
                      ].map((p) => (
                        <button
                          key={p.val}
                          type="button"
                          onClick={() => {
                            setZoomLevel(p.val);
                            playSound('tick', true);
                          }}
                          className={`py-2 px-2 rounded-xl font-mono text-[11px] text-center transition-all cursor-pointer ${
                            Math.abs(zoomLevel - p.val) < 0.2
                              ? 'bg-[#7CF2C9] text-[#0B0F14] font-bold shadow'
                              : 'bg-[#141b26] text-[#9AA6B2] hover:text-white border border-[#232c3a]'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>

                    {/* Continuous Slider */}
                    <div className="px-3 py-2 bg-[#121722] rounded-xl border border-[#1f2737] flex items-center space-x-3">
                      <span className="font-mono text-[10px] text-[#6b7c93]">0.6x</span>
                      <input
                        type="range"
                        min="0.6"
                        max="140"
                        step="0.1"
                        value={zoomLevel}
                        onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                        className="w-full accent-[#7CF2C9] h-1.5 bg-[#1b2332] rounded cursor-pointer"
                        aria-label="Zoom Level Slider"
                      />
                      <span className="font-mono text-xs text-[#7CF2C9] font-bold w-12 text-right">
                        {zoomLevel.toFixed(1)}x
                      </span>
                    </div>
                  </div>

                  {/* Right: Architectural Breakdown */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-[#121722] border border-[#222d3d] space-y-2">
                      <span className="font-mono text-[10px] text-[#7CF2C9] uppercase tracking-wider font-semibold block">
                        Breakthrough Periscope Optics
                      </span>
                      <h3 className="font-mono text-sm font-bold text-[#E8EDF2]">
                        World’s First 140x Ultra Zoom Periscope
                      </h3>
                      <p className="font-sans text-xs text-[#9AA6B2] leading-relaxed">
                        Combines a 50MP Sony periscope sensor with a 3.5x optical tetraprism mechanism. Light folds through high-grade optical glass four times before reaching the sensor, delivering extreme focal reach in an ultra-slim 8.55mm chassis.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                      <div className="p-3 rounded-xl bg-[#10141d] border border-[#1d2634]">
                        <span className="text-[#6b7c93] block text-[10px]">Focal Length Equivalent</span>
                        <strong className="text-[#E8EDF2] text-sm">14mm – 3360mm</strong>
                      </div>
                      <div className="p-3 rounded-xl bg-[#10141d] border border-[#1d2634]">
                        <span className="text-[#6b7c93] block text-[10px]">Stabilization</span>
                        <strong className="text-[#7CF2C9] text-sm">Dual Hardware OIS</strong>
                      </div>
                      <div className="p-3 rounded-xl bg-[#10141d] border border-[#1d2634]">
                        <span className="text-[#6b7c93] block text-[10px]">Tally Recording Light</span>
                        <strong className="text-[#FF453A] text-sm">Classic Film Red LED</strong>
                      </div>
                      <div className="p-3 rounded-xl bg-[#10141d] border border-[#1d2634]">
                        <span className="text-[#6b7c93] block text-[10px]">Housing Finish</span>
                        <strong className="text-[#E8EDF2] text-sm">Nano-Injected Clear</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: 137-LED Glyph Matrix Interactive Console */}
            {activeTab === 'glyph' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* Left: Real-time 2D Canvas of the 137 LEDs */}
                  <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#080c12] border border-[#222c3c] shadow-inner space-y-4">
                    <canvas 
                      ref={canvasRef} 
                      width={280} 
                      height={280} 
                      className="w-[240px] h-[240px] rounded-full shadow-2xl"
                      aria-label="137-LED Glyph Matrix Simulation"
                    />

                    <div className="flex items-center space-x-2 text-xs font-mono text-[#9AA6B2]">
                      <span className="w-2 h-2 rounded-full bg-[#7CF2C9]" />
                      <span>137 Addressable Mini-LEDs · Live State</span>
                    </div>

                    <button
                      type="button"
                      onClick={inspectOn3DModel}
                      className="px-4 py-2 rounded-xl bg-[#1b2332] hover:bg-[#253246] border border-[#2b3a4f] text-xs font-mono text-[#7CF2C9] hover:text-white transition-all flex items-center space-x-2 cursor-pointer"
                    >
                      <RotateIcon className="w-3.5 h-3.5" />
                      <span>Flip Phone to Inspect in 3D</span>
                    </button>
                  </div>

                  {/* Right: Pattern Trigger Palette */}
                  <div className="space-y-4">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider text-[#7CF2C9] font-bold block mb-1">
                        Select Glyph Matrix Animation
                      </span>
                      <p className="font-sans text-xs text-[#9AA6B2]">
                        Trigger official Phone (4a) Pro patterns. Each pattern is rendered across the 137 physical LED elements on the 3D model.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { id: 'solarPath', label: 'Solar Path', desc: 'Solar arc across dome' },
                        { id: 'cameraTimer', label: 'Camera Countdown', desc: '3s radial countdown' },
                        { id: 'progress', label: 'Progress Dial', desc: 'Notification meter' },
                        { id: 'notificationPulse', label: 'Notification Pulse', desc: 'Alert phosphor glow' },
                        { id: 'equalizer', label: 'Music Equalizer', desc: 'Dynamic acoustic waves' },
                        { id: 'idle', label: 'Idle Breathing', desc: 'Gentle ambient pulse' },
                      ].map((p) => {
                        const isSelected = activePattern === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => handlePatternSelect(p.id)}
                            className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#1b2535] border-[#7CF2C9] shadow-md'
                                : 'bg-[#111621] border-[#1e2736] hover:border-white/20'
                            }`}
                          >
                            <span className="font-mono text-xs font-bold text-[#E8EDF2] block">
                              {p.label}
                            </span>
                            <span className="font-mono text-[10px] text-[#6b7c93] block mt-0.5">
                              {p.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Global Brightness Slider */}
                    <div className="p-3 bg-[#111621] rounded-xl border border-[#1e2736] space-y-2">
                      <div className="flex justify-between items-center font-mono text-xs">
                        <span className="text-[#9AA6B2]">LED Peak Brightness</span>
                        <span className="text-[#7CF2C9] font-bold">{Math.round(glyphBrightness * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={glyphBrightness}
                        onChange={(e) => handleBrightnessChange(parseFloat(e.target.value))}
                        className="w-full accent-[#7CF2C9] h-1.5 bg-[#1b2332] rounded cursor-pointer"
                        aria-label="Glyph Matrix Brightness"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Craft & Engineering */}
            {activeTab === 'craft' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#121722] border border-[#222d3d] space-y-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1a2332] text-[#7CF2C9] flex items-center justify-center font-mono text-sm font-bold">
                    01
                  </div>
                  <h4 className="font-mono text-sm font-bold text-[#E8EDF2]">
                    Transparent Camera Island
                  </h4>
                  <p className="font-sans text-xs text-[#9AA6B2] leading-relaxed">
                    Precision nano-injection molding produces a seamless, bubble-free transparent housing. The tetraprism optics and red tally light sit exposed under crystal-clear toughened mineral glass.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#121722] border border-[#222d3d] space-y-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1a2332] text-[#7CF2C9] flex items-center justify-center font-mono text-sm font-bold">
                    02
                  </div>
                  <h4 className="font-mono text-sm font-bold text-[#E8EDF2]">
                    100% Recycled Aluminum Frame
                  </h4>
                  <p className="font-sans text-xs text-[#9AA6B2] leading-relaxed">
                    CNC-machined 6000-series aerospace alloy with bead-blasted satin finish and diamond-cut chamfered edges. Exceptional torsional rigidity with zero added weight.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#121722] border border-[#222d3d] space-y-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1a2332] text-[#7CF2C9] flex items-center justify-center font-mono text-sm font-bold">
                    03
                  </div>
                  <h4 className="font-mono text-sm font-bold text-[#E8EDF2]">
                    Film Camera Tally Light
                  </h4>
                  <p className="font-sans text-xs text-[#9AA6B2] leading-relaxed">
                    A physical miniature red indicator LED situated beside the periscope chamber activates during video capture, paying homage to vintage 16mm film cinema cameras.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 4: Full Tech Specs */}
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SPEC_SECTIONS.map((sec) => (
                  <div key={sec.title} className="p-4 rounded-2xl bg-[#121722] border border-[#222d3d] space-y-3">
                    <h4 className="font-mono text-xs font-bold text-[#7CF2C9] uppercase tracking-wider border-b border-[#1f2837] pb-1.5">
                      {sec.title}
                    </h4>
                    <div className="space-y-2">
                      {sec.specs.map((item) => (
                        <div key={item.label} className="flex justify-between items-start text-xs font-mono">
                          <span className="text-[#6b7c93] shrink-0 w-28">{item.label}</span>
                          <span className="text-[#E8EDF2] text-right">{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="px-6 py-3.5 bg-[#0e121a] border-t border-[#1b2330] flex items-center justify-between font-mono text-xs">
            <span className="text-[#6b7c93]">
              Official Phone (4a) Pro Launch Hardware Integration
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-[#19212d] hover:bg-[#222c3d] text-[#E8EDF2] border border-[#283548] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default NothingProductModal;
