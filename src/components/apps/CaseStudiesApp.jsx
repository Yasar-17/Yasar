import React, { useState } from 'react';
import { usePhone } from '../../context/PhoneContext';
import { AppWindow } from '../screen/AppWindow';
import { GithubIcon, SparklesIcon, ExternalLinkIcon } from '../../ui/Icons';
import { playSound } from '../../audio/soundEngine';

export const CaseStudiesApp = () => {
  const { soundEnabled } = usePhone();
  const [activeTab, setActiveTab] = useState('sih');
  const [confidenceThreshold, setConfidenceThreshold] = useState(78);

  const handleSliderChange = (e) => {
    setConfidenceThreshold(Number(e.target.value));
    playSound('tick', soundEnabled);
  };

  const falsePositiveSuppression = Math.min(99.2, +(64 + (confidenceThreshold * 0.36)).toFixed(1));
  const detectionLatencyMs = Math.round(135 + (100 - confidenceThreshold) * 1.6);

  return (
    <AppWindow title="Case Studies" subtitle="Empirical Research & Telemetry">
      {/* Tab Switcher */}
      <div className="flex items-center space-x-1.5 bg-[#141820] border border-[#232c3a] rounded-xl p-1 mb-1">
        {[
          { id: 'sih', label: 'SIH26162 Wildfire' },
          { id: 'zenny', label: 'Zenny Studios' },
          { id: 'pipeline', label: 'Telemetry ETL' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => { setActiveTab(tab.id); playSound('tick', soundEnabled); }}
            className={`flex-1 py-1.5 px-2 rounded-lg font-mono text-[11px] transition-all text-center ${
              activeTab === tab.id
                ? 'bg-[#232d3d] text-[#7CF2C9] font-bold shadow-sm'
                : 'text-[#9AA6B2] hover:text-[#E8EDF2]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: SIH Wildfire Classifier */}
      {activeTab === 'sih' && (
        <div className="space-y-3">
          <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#FFB86B] font-semibold block">
              Problem Statement
            </span>
            <p className="text-xs text-[#C5CED8] leading-relaxed">
              Raw thermal satellite anomaly streams from MODIS and VIIRS contain significant industrial flares and false alarms, overwhelming emergency dispatch teams. Real-time ground verification requires automated geospatial cross-referencing.
            </p>
          </div>

          <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#7CF2C9] font-semibold block">
              Methodology & Pipeline
            </span>
            <div className="flex flex-wrap gap-1 mb-1">
              {['Python', 'NASA FIRMS API', 'OpenStreetMap', 'Spatial ML', 'Scikit-Learn'].map((t) => (
                <span key={t} className="font-mono text-[10px] bg-[#0e1219] text-[#7CF2C9] px-2 py-0.5 rounded border border-[#1b222d]">
                  {t}
                </span>
              ))}
            </div>
            <p className="text-xs text-[#C5CED8] leading-relaxed">
              Constructed an ingestion pipeline that continuously pulls thermal brightness temperature telemetry, calculates geospatial distance vectors against OpenStreetMap power plants and factories, and applies a multi-variate classifier to isolate natural wildfires.
            </p>
          </div>

          <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#8AB4FF] font-semibold block">
              Verified Results
            </span>
            <div className="flex items-baseline space-x-2 my-1">
              <span className="font-grotesk text-2xl font-bold text-[#7CF2C9] leading-none">84.6%</span>
              <span className="text-xs text-[#9AA6B2]">reduction in false alarm verification delays</span>
            </div>
            <p className="text-[11px] text-[#626e7e]">
              Validated on 1,450 km² regional test sectors across central India.
            </p>
          </div>

          {/* Interactive Confidence Simulator */}
          <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#7CF2C9] flex items-center space-x-1.5 font-bold">
                <SparklesIcon className="w-3.5 h-3.5 text-[#7CF2C9]" />
                <span>Confidence Simulator</span>
              </span>
              <span className="font-mono text-xs text-[#E8EDF2] bg-[#0e1219] px-2 py-0.5 rounded-full border border-[#1b222d]">
                {confidenceThreshold}%
              </span>
            </div>

            <input 
              type="range" 
              min="30" 
              max="95" 
              value={confidenceThreshold} 
              onChange={handleSliderChange}
              className="w-full accent-[#7CF2C9] cursor-pointer"
            />

            <div className="grid grid-cols-2 gap-2 text-center pt-1">
              <div className="bg-[#0e1219] p-2.5 rounded-xl border border-[#1b222d]">
                <span className="text-[10px] font-mono text-[#626e7e] block">Suppression Rate</span>
                <span className="font-mono text-sm font-bold text-[#7CF2C9]">{falsePositiveSuppression}%</span>
              </div>
              <div className="bg-[#0e1219] p-2.5 rounded-xl border border-[#1b222d]">
                <span className="text-[10px] font-mono text-[#626e7e] block">Latency</span>
                <span className="font-mono text-sm font-bold text-[#8AB4FF]">{detectionLatencyMs} ms</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Zenny Studios */}
      {activeTab === 'zenny' && (
        <div className="space-y-3">
          <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#FFB86B] font-semibold block">
              Client Challenge
            </span>
            <p className="text-xs text-[#C5CED8] leading-relaxed">
              A high-end creative agency needed an ultra-responsive web platform to showcase architectural portfolios with instantaneous image rendering, zero layout shift, and smooth page transitions.
            </p>
          </div>

          <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#7CF2C9] font-semibold block">
              Architectural Solution
            </span>
            <div className="flex flex-wrap gap-1 mb-1">
              {['React 18', 'Tailwind CSS', 'Vite', 'Framer Motion'].map((t) => (
                <span key={t} className="font-mono text-[10px] bg-[#0e1219] text-[#7CF2C9] px-2 py-0.5 rounded border border-[#1b222d]">
                  {t}
                </span>
              ))}
            </div>
            <p className="text-xs text-[#C5CED8] leading-relaxed">
              Implemented component-level code splitting, modern WebP image preloading, and physics-based spring animations for modal drawer interactions.
            </p>
          </div>

          <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#8AB4FF] font-semibold block">
              Key Metrics
            </span>
            <div className="flex items-baseline space-x-2 my-1">
              <span className="font-grotesk text-2xl font-bold text-[#7CF2C9] leading-none">98 / 100</span>
              <span className="text-xs text-[#9AA6B2]">Lighthouse Performance Score</span>
            </div>
            <p className="text-[11px] text-[#626e7e]">
              Zero cumulative layout shifts (CLS &lt; 0.01) across 20+ mobile device viewports.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Telemetry ETL */}
      {activeTab === 'pipeline' && (
        <div className="space-y-3">
          <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#FFB86B] font-semibold block">
              Data Pipeline Problem
            </span>
            <p className="text-xs text-[#C5CED8] leading-relaxed">
              Handling large streaming sensor datasets with high-variance ambient temperature spikes required an automated ETL system that could filter outliers before writing to relational stores.
            </p>
          </div>

          <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#7CF2C9] font-semibold block">
              Pipeline Implementation
            </span>
            <p className="text-xs text-[#C5CED8] leading-relaxed">
              Engineered Python scripts using Pandas vectorization and PostgreSQL window functions to perform rolling IQR and Z-score outlier detection, indexing rows directly for sub-second retrieval.
            </p>
          </div>

          <div className="bg-[#141820] border border-[#232c3a] rounded-[22px] p-4 shadow-sm space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#8AB4FF] font-semibold block">
              Outcome
            </span>
            <div className="flex items-baseline space-x-2 my-1">
              <span className="font-grotesk text-2xl font-bold text-[#8AB4FF] leading-none">3.2x</span>
              <span className="text-xs text-[#9AA6B2]">Processing speedup on batch records</span>
            </div>
            <p className="text-[11px] text-[#626e7e]">
              Over 250,000 telemetry rows validated per automated batch execution.
            </p>
          </div>
        </div>
      )}
    </AppWindow>
  );
};

export default CaseStudiesApp;
