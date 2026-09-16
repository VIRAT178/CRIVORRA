import React, { useState } from 'react';
import { Sparkles, CheckCircle, ExternalLink, Cpu, Layers } from 'lucide-react';
import { TechNodeItem } from '../../types';

export const TechStackSection: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>('Google Analytics');

  const tools = [
    {
      name: 'Google Analytics',
      category: 'Analytics & Attribution',
      description: 'Advanced GA4 event modeling, server-side data collection, and predictive conversion tracking.',
      icon: '📊',
    },
    {
      name: 'Google Search Console',
      category: 'Organic Intelligence',
      description: 'Deep indexation monitoring, Core Web Vitals telemetry, and semantic query performance tracking.',
      icon: '🔍',
    },
    {
      name: 'Google Tag Manager',
      category: 'Event Orchestration',
      description: 'Zero-latency server-side container orchestration and privacy-compliant consent mode v2 integration.',
      icon: '🏷️',
    },
    {
      name: 'Looker Studio',
      category: 'Executive BI',
      description: 'Custom real-time multi-source data warehouses and executive ROI visualization boards.',
      icon: '📈',
    },
    {
      name: 'Microsoft Clarity',
      category: 'Behavioral UX',
      description: 'Session replay forensics, friction heatmaps, and funnel drop-off behavioral diagnostic intelligence.',
      icon: '👁️',
    },
    {
      name: 'Semrush',
      category: 'Competitive Search',
      description: 'Cross-competitor keyword gap analysis, backlink authority scoring, and SERP feature monitoring.',
      icon: '🎯',
    },
    {
      name: 'Google Ads',
      category: 'Performance Media',
      description: 'Performance Max, Search, YouTube, and smart bidding models aligned with strict ROAS thresholds.',
      icon: '📢',
    },
    {
      name: 'Meta Ads',
      category: 'Social Acquisition',
      description: 'Full-funnel Conversions API (CAPI) and dynamic creative rotation tailored to high-LTV cohorts.',
      icon: '📱',
    },
    {
      name: 'HubSpot',
      category: 'CRM & Automation',
      description: 'Inbound marketing workflows, automated lead scoring, pipeline attribution, and sales enablement.',
      icon: '🧲',
    },
    {
      name: 'AI Visibility Tools',
      category: 'Generative Search & AEO',
      description: 'Perplexity, ChatGPT, and Google SGE citation indexing with schema-driven generative optimization.',
      icon: '🤖',
    },
  ];

  const currentTool = tools.find((t) => t.name === selectedTool) || tools[0];

  return (
    <section className="py-28 sm:py-36 bg-[#FCFCFD] border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono-code font-bold uppercase tracking-widest">
            <span>INTEGRATED ECOSYSTEM</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#0A0F1D] tracking-tight">
            TECHNOLOGY STACK
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            CRIVORRA unifies market-leading analytics, performance advertising, and generative AI platforms into one cohesive growth engine.
          </p>
        </div>

        {/* Orbit Visualization Arena */}
        <div className="relative rounded-3xl bg-white border border-slate-200/80 p-8 sm:p-12 lg:p-16 shadow-xl shadow-slate-200/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left/Center Visual Orbit Interactive Area */}
            <div className="lg:col-span-8 flex flex-col items-center justify-center relative min-h-[420px]">
              {/* Concentric Orbit Rings in background */}
              <div className="absolute w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] rounded-full border border-dashed border-slate-200 pointer-events-none" />
              <div className="absolute w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] rounded-full border border-slate-100 pointer-events-none" />

              {/* Center Node: CRIVORRA GROWTH ENGINE */}
              <div className="relative z-20 w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#0A0F1D] text-white flex flex-col items-center justify-center text-center p-4 shadow-2xl shadow-blue-500/20 border-4 border-white group">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00D2FF] mb-1.5 animate-pulse" />
                <span className="font-display font-extrabold text-sm sm:text-base leading-tight">
                  CRIVORRA
                </span>
                <span className="font-mono-code text-[10px] text-blue-300 font-bold uppercase tracking-wider mt-0.5">
                  GROWTH ENGINE
                </span>
              </div>

              {/* Floating Orbiting Satellite Nodes around center */}
              <div className="w-full flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-10 relative z-20">
                {tools.map((tool) => {
                  const isSelected = selectedTool === tool.name;
                  return (
                    <button
                      key={tool.name}
                      onClick={() => setSelectedTool(tool.name)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all duration-200 border ${
                        isSelected
                          ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-md shadow-blue-500/25 scale-105'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <span>{tool.icon}</span>
                      <span>{tool.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Side: Selected Tool Deep-Dive Card */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-slate-50 border border-slate-200/90 p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{currentTool.icon}</span>
                  <span className="font-mono-code text-[10px] uppercase font-bold text-[#0066FF] px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100">
                    {currentTool.category}
                  </span>
                </div>

                <div>
                  <h4 className="font-display text-2xl font-extrabold text-slate-900">
                    {currentTool.name}
                  </h4>
                  <p className="text-slate-500 text-xs font-mono-code mt-0.5">
                    CRIVORRA INTEGRATION MODULE
                  </p>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {currentTool.description}
                </p>

                <div className="pt-3 border-t border-slate-200/80 flex items-center gap-2 text-xs font-semibold text-emerald-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Fully Automated Webhook & API Sync</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
