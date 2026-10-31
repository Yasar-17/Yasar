import React, { useState } from 'react';
import { usePhone } from '../../context/PhoneContext';
import { ArrowLeftIcon, GithubIcon, SparklesIcon, ExternalLinkIcon } from '../../ui/Icons';
import { playSound } from '../../audio/soundEngine';

export const CaseStudiesApp = () => {
  const { closeApp, soundEnabled } = usePhone();
  const [activeTab, setActiveTab] = useState('sih');
  const [confidenceThreshold, setConfidenceThreshold] = useState(78);

  const handleSliderChange = (e) => {
    setConfidenceThreshold(Number(e.target.value));
    playSound('tick', soundEnabled);
  };

  // Calculated simulation metrics based on confidence slider
  const falsePositiveSuppression = Math.min(99.2, +(62 + (confidenceThreshold * 0.38)).toFixed(1));
  const detectionLatencyMs = Math.round(140 + (100 - confidenceThreshold) * 1.8);

  return (
    <div className="w-full h-full bg-[#0B0F14] text-[#E8EDF2] flex flex-col justify-between p-4 pt-12 pb-6 overflow-hidden">
      
      {/* HEADER: Back Button & Title */}
      <div className="flex items-center justify-between border-b border-[#1B222B] pb-3">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={closeApp}
            className="w-9 h-9 rounded-full bg-[#151B23] border border-[#1B222B] text-[#9AA6B2] hover:text-[#E8EDF2] flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Back to Home"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-grotesk text-[17px] font-semibold text-[#E8EDF2] leading-none">
              Case Studies
            </h2>
            <span className="text-[11px] text-[#9AA6B2] font-mono">Telemetry & Real Work</span>
          </div>
        </div>

        <button
          type="button"
          onClick={closeApp}
          className="text-[12px] font-medium text-[#7CF2C9] px-2 py-1 bg-[#151B23] border border-[#1B222B] rounded-full hover:bg-[#1a232e]"
        >
          Home
        </button>
      </div>

      {/* TABS */}
      <div className="flex items-center space-x-1.5 my-3 bg-[#151B23] p-1 rounded-full border border-[#1B222B]">
        <button
          type="button"
          onClick={() => { setActiveTab('sih'); playSound('tick', soundEnabled); }}
          className={`flex-1 py-1.5 text-[11px] font-medium rounded-full transition-all ${
            activeTab === 'sih' 
              ? 'bg-[#7CF2C9] text-[#0B0F14] font-semibold shadow-sm' 
              : 'text-[#9AA6B2] hover:text-[#E8EDF2]'
          }`}
        >
          SIH26162
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab('zenny'); playSound('tick', soundEnabled); }}
          className={`flex-1 py-1.5 text-[11px] font-medium rounded-full transition-all ${
            activeTab === 'zenny' 
              ? 'bg-[#FFB86B] text-[#0B0F14] font-semibold shadow-sm' 
              : 'text-[#9AA6B2] hover:text-[#E8EDF2]'
          }`}
        >
          Zenny Studios
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab('placeholder'); playSound('tick', soundEnabled); }}
          className={`flex-1 py-1.5 text-[11px] font-medium rounded-full transition-all ${
            activeTab === 'placeholder' 
              ? 'bg-[#8AB4FF] text-[#0B0F14] font-semibold shadow-sm' 
              : 'text-[#9AA6B2] hover:text-[#E8EDF2]'
          }`}
        >
          [Case title]
        </button>
      </div>

      {/* TAB CONTENT: Scrollable Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pr-0.5">
        
        {activeTab === 'sih' && (
          <>
            {/* CARD 1: PROBLEM */}
            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFB86B] block mb-1">
                Problem
              </span>
              <p className="text-[13px] text-[#C5CED8] leading-relaxed">
                Raw thermal satellite anomaly streams contain industrial noise and false positives, overwhelming field response teams. Ground-truth validation required autonomous cross-referencing with spatial infrastructure metadata.
              </p>
            </div>

            {/* CARD 2: APPROACH */}
            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#7CF2C9] block mb-1.5">
                Approach
              </span>
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                <span className="bg-[#1F2933] text-[#7CF2C9] text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#2B3542]">Python</span>
                <span className="bg-[#1F2933] text-[#8AB4FF] text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#2B3542]">NASA FIRMS</span>
                <span className="bg-[#1F2933] text-[#FFB86B] text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#2B3542]">OpenStreetMap</span>
                <span className="bg-[#1F2933] text-[#C9B8FF] text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#2B3542]">Spatial ML</span>
              </div>
              <p className="text-[13px] text-[#C5CED8] leading-relaxed">
                Constructed an automated processing pipeline ingesting NASA FIRMS near-real-time thermal radiance telemetry. Correlated geospatial vector nodes from OpenStreetMap to classify industrial flares against genuine thermal anomalies.
              </p>
            </div>

            {/* CARD 3: RESULT */}
            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8AB4FF] block mb-1">
                Result
              </span>
              <div className="flex items-baseline space-x-2 my-1">
                <span className="font-grotesk text-[32px] font-bold text-[#7CF2C9] leading-none">[X]%</span>
                <span className="text-[12px] text-[#9AA6B2] font-medium">reduction in false-alarm verification delays</span>
              </div>
              <p className="text-[12px] text-[#9AA6B2] mt-1 leading-snug">
                Demonstrated on [N] square kilometer regional sector test datasets.
              </p>
            </div>

            {/* INTERACTIVE TELEMETRY CONFIDENCE SIMULATOR */}
            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#7CF2C9] flex items-center space-x-1.5">
                  <SparklesIcon className="w-3.5 h-3.5 text-[#7CF2C9]" />
                  <span>Interactive Confidence Simulator</span>
                </span>
                <span className="text-[11px] font-mono text-[#E8EDF2] bg-[#1F2933] px-2 py-0.5 rounded-full">
                  {confidenceThreshold}%
                </span>
              </div>

              <input 
                type="range" 
                min="30" 
                max="95" 
                value={confidenceThreshold} 
                onChange={handleSliderChange}
                className="w-full accent-[#7CF2C9] cursor-pointer mb-3"
              />

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-[#1F2933] p-2.5 rounded-[14px]">
                  <span className="text-[10px] font-mono text-[#9AA6B2] block">Noise Suppression</span>
                  <span className="font-grotesk text-[16px] font-bold text-[#7CF2C9]">{falsePositiveSuppression}%</span>
                </div>
                <div className="bg-[#1F2933] p-2.5 rounded-[14px]">
                  <span className="text-[10px] font-mono text-[#9AA6B2] block">Telemetry Latency</span>
                  <span className="font-grotesk text-[16px] font-bold text-[#8AB4FF]">{detectionLatencyMs} ms</span>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'zenny' && (
          <>
            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFB86B] block mb-1">
                Problem
              </span>
              <p className="text-[13px] text-[#C5CED8] leading-relaxed">
                A creative studio required a client-facing web showcase highlighting architectural portfolios with fast load times and clean, fluid typography.
              </p>
            </div>

            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#7CF2C9] block mb-1.5">
                Approach
              </span>
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                <span className="bg-[#1F2933] text-[#7CF2C9] text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#2B3542]">HTML</span>
                <span className="bg-[#1F2933] text-[#8AB4FF] text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#2B3542]">Tailwind CSS</span>
                <span className="bg-[#1F2933] text-[#FFB86B] text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#2B3542]">JavaScript</span>
              </div>
              <p className="text-[13px] text-[#C5CED8] leading-relaxed">
                Engineered a modular responsive layout featuring optimized media delivery and fluid touch navigation. Designed custom transitions prioritizing accessibility and minimal layout shifts.
              </p>
            </div>

            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8AB4FF] block mb-1">
                Result
              </span>
              <div className="flex items-baseline space-x-2 my-1">
                <span className="font-grotesk text-[32px] font-bold text-[#FFB86B] leading-none">[N] / 100</span>
                <span className="text-[12px] text-[#9AA6B2] font-medium">Performance score across mobile audits</span>
              </div>
              <p className="text-[12px] text-[#9AA6B2] mt-1 leading-snug">
                Client site is live in production.
              </p>
            </div>
          </>
        )}

        {activeTab === 'placeholder' && (
          <>
            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFB86B] block mb-1">
                Problem
              </span>
              <p className="text-[13px] text-[#C5CED8] leading-relaxed">
                High-dimensional telemetry dataset required automated clustering to isolate anomaly signatures from ambient noise.
              </p>
            </div>

            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#7CF2C9] block mb-1.5">
                Approach
              </span>
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                <span className="bg-[#1F2933] text-[#7CF2C9] text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#2B3542]">Python</span>
                <span className="bg-[#1F2933] text-[#8AB4FF] text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#2B3542]">SQL</span>
                <span className="bg-[#1F2933] text-[#FFB86B] text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#2B3542]">Data Pipelines</span>
              </div>
              <p className="text-[13px] text-[#C5CED8] leading-relaxed">
                Formulated automated ETL routines with SQL aggregations and Python feature transformations to standardize sensor feeds. Applied distance metric validation to flag outlier distributions.
              </p>
            </div>

            <div className="bg-[#151B23] border border-[#1B222B] rounded-[22px] p-4 shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8AB4FF] block mb-1">
                Result
              </span>
              <div className="flex items-baseline space-x-2 my-1">
                <span className="font-grotesk text-[32px] font-bold text-[#8AB4FF] leading-none">[X]%</span>
                <span className="text-[12px] text-[#9AA6B2] font-medium">pipeline execution speedup on test batches</span>
              </div>
              <p className="text-[12px] text-[#9AA6B2] mt-1 leading-snug">
                Processed across [N] simulated streaming records.
              </p>
            </div>
          </>
        )}

      </div>

      {/* FOOTER ACTIONS */}
      <div className="pt-3 border-t border-[#1B222B] flex items-center justify-between">
        <a
          href="https://github.com/Yasar-17"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-[#151B23] hover:bg-[#1f2933] border border-[#1B222B] rounded-full px-4 py-2 text-[12px] font-medium text-[#E8EDF2] transition-colors"
        >
          <GithubIcon className="w-4 h-4 text-[#7CF2C9]" />
          <span>View code on GitHub</span>
        </a>

        <button
          type="button"
          onClick={closeApp}
          className="bg-[#7CF2C9] hover:bg-[#6ee0b8] text-[#0B0F14] text-[12px] font-semibold px-4 py-2 rounded-full transition-colors"
        >
          Home
        </button>
      </div>

    </div>
  );
};

