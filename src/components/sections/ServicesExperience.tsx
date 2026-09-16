import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Share2,
  Search,
  Target,
  Sparkles,
  Cpu,
  Code2,
  CheckCircle,
  BarChart3,
  Layers,
} from 'lucide-react';
import { ServiceFlowItem } from '../../types';

export const ServicesExperience: React.FC<{ onOpenProjectPlanner: () => void }> = ({
  onOpenProjectPlanner,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const servicesFlow: ServiceFlowItem[] = [
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      subtitle: 'End-to-End Growth Architecture',
      division: 'CRIVORRA DIGITALS',
      deliverables: [
        'Omnichannel acquisition funnels',
        'Data-backed customer persona modeling',
        'Lifecycle retention & email automation',
        'Cohort lifetime value (LTV) maximization',
      ],
      tools: ['Google Analytics 4', 'Looker Studio', 'Klaviyo', 'Segment'],
      impactMetric: '3.8X',
      impactLabel: 'Average Return on Ad Spend (ROAS)',
    },
    {
      id: 'social-media',
      title: 'Social Media',
      subtitle: 'High-Impact Brand Distribution',
      division: 'CRIVORRA DIGITALS',
      deliverables: [
        'Short-form motion video systems',
        'Founder personal branding playbooks',
        'Community moderation & brand voice guidelines',
        'Influencer & creator partnership funnels',
      ],
      tools: ['CapCut Pro', 'Figma', 'Sprout Social', 'Brand24'],
      impactMetric: '15M+',
      impactLabel: 'Organic Social Impressions Generated',
    },
    {
      id: 'seo',
      title: 'SEO & Generative Search',
      subtitle: 'Answer Engine (AEO) & GEO Domination',
      division: 'CRIVORRA DIGITALS',
      deliverables: [
        'Perplexity & ChatGPT AI citation architecture',
        'Entity-first semantic schema markup',
        'Technical crawl-budget & Core Web Vitals optimization',
        'High-authority editorial link acquisition',
      ],
      tools: ['Semrush', 'Ahrefs', 'Google Search Console', 'Schema.org'],
      impactMetric: '#1',
      impactLabel: 'Rankings for High-Intent Commercial Queries',
    },
    {
      id: 'performance-marketing',
      title: 'Performance Marketing',
      subtitle: 'Algorithmic Media Buying & Scale',
      division: 'CRIVORRA DIGITALS',
      deliverables: [
        'Dynamic creative testing (DCT) matrix',
        'First-party server-side tracking (CAPI)',
        'Lookalike & predictive bidding strategies',
        'Ad spend scale with zero fatigue bleed',
      ],
      tools: ['Meta Ads Manager', 'Google Ads 360', 'TikTok Ads', 'Triple Whale'],
      impactMetric: '$12M+',
      impactLabel: 'Profitable Media Spend Managed',
    },
    {
      id: 'branding',
      title: 'Branding & Identity',
      subtitle: 'Market-Leading Visual Systems',
      division: 'CRIVORRA DIGITALS',
      deliverables: [
        'Core positioning & narrative frameworks',
        'Comprehensive multi-platform design systems',
        'Custom 3D brand assets & motion graphics',
        'Brand governance & typography standards',
      ],
      tools: ['Figma', 'Cinema 4D', 'After Effects', 'Spline'],
      impactMetric: '100%',
      impactLabel: 'Distinctive Market Recognition',
    },
    {
      id: 'ai',
      title: 'AI Solutions & Agents',
      subtitle: 'Autonomous Business Intelligence',
      division: 'CRIVORRA TECHNOLOGIES',
      deliverables: [
        'Custom enterprise Gemini & OpenAI agent models',
        'Autonomous customer support triage pipelines',
        'Internal document vector search & RAG architectures',
        'Automated multi-step workflow orchestration',
      ],
      tools: ['Google GenAI SDK', 'LangChain', 'Pinecone', 'Make / n8n'],
      impactMetric: '70%',
      impactLabel: 'Reduction in Manual Operational Cycles',
    },
    {
      id: 'technology',
      title: 'Technology & Platforms',
      subtitle: 'Modern Scalable Digital Infrastructure',
      division: 'CRIVORRA TECHNOLOGIES',
      deliverables: [
        'High-performance Next.js / React web applications',
        'Headless e-commerce & API-first CMS',
        'Bespoke CRM & lead pipeline integration',
        'Cloud Run & serverless microservices deployment',
      ],
      tools: ['TypeScript', 'Next.js', 'PostgreSQL', 'Docker / Cloud Run'],
      impactMetric: '99.99%',
      impactLabel: 'Platform Reliability & Sub-second Response',
    },
  ];

  const current = servicesFlow[activeIdx];

  const nextStep = () => {
    setActiveIdx((prev) => (prev + 1) % servicesFlow.length);
  };

  const prevStep = () => {
    setActiveIdx((prev) => (prev - 1 + servicesFlow.length) % servicesFlow.length);
  };

  return (
    <section className="py-28 sm:py-36 bg-white border-y border-slate-200/80 relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#0066FF]/5 via-[#7928CA]/4 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={containerRef}>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono-code font-bold uppercase tracking-wider">
            <span>INTERACTIVE STACK EVOLUTION</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#0A0F1D] tracking-tight">
            THE SERVICES EXPERIENCE
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Explore how CRIVORRA orchestrates each dimension of digital growth, transitioning seamlessly from creative acquisition to deep technology engineering.
          </p>
        </div>

        {/* Horizontal Stepper Indicator */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-6 mb-10 scrollbar-none">
          {servicesFlow.map((srv, idx) => (
            <button
              key={srv.id}
              onClick={() => setActiveIdx(idx)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-2 border ${
                idx === activeIdx
                  ? 'bg-[#0A0F1D] text-white border-[#0A0F1D] shadow-md shadow-slate-900/10 scale-105'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  idx === activeIdx ? 'bg-[#00D2FF]' : 'bg-slate-300'
                }`}
              />
              <span>{srv.title}</span>
            </button>
          ))}
        </div>

        {/* Central Interactive Display Card */}
        <div className="bg-[#FAFBFD] rounded-3xl border border-slate-200/90 p-6 sm:p-10 lg:p-14 shadow-xl shadow-slate-200/50 relative overflow-hidden transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Strategy & Deliverables */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex items-center gap-3">
                <span className="font-mono-code text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] border border-blue-200">
                  {current.division}
                </span>
                <span className="font-mono-code text-xs text-slate-400">
                  STAGE 0{activeIdx + 1} OF 0{servicesFlow.length}
                </span>
              </div>

              <div>
                <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0A0F1D]">
                  {current.title}
                </h3>
                <p className="text-slate-500 font-medium text-base mt-1">{current.subtitle}</p>
              </div>

              {/* Deliverables List */}
              <div className="space-y-3 pt-2">
                <div className="font-mono-code text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Core Implementation Scope
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {current.deliverables.map((del, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools Ecosystem */}
              <div className="pt-2">
                <div className="font-mono-code text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Integrated Tooling & Frameworks
                </div>
                <div className="flex flex-wrap gap-2">
                  {current.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-mono-code"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={onOpenProjectPlanner}
                  className="px-6 py-3 rounded-full bg-[#0066FF] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#0052cc] transition-colors shadow-md shadow-blue-500/20"
                >
                  Deploy This Service
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevStep}
                    className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                    aria-label="Previous service"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextStep}
                    className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                    aria-label="Next service"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Central Visual Holographic Stage & Stat Box */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[380px] rounded-3xl bg-white p-8 border border-slate-200/90 shadow-lg flex flex-col justify-between items-center text-center overflow-hidden group">
                {/* Gradient ring */}
                <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-gradient-to-br from-[#0066FF]/20 to-[#7928CA]/20 blur-2xl" />

                {/* Animated C emblem wireframe */}
                <div className="w-32 h-32 relative flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow" fill="none">
                    <circle cx="50" cy="50" r="44" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="6 4" />
                    <circle
                      cx="50"
                      cy="50"
                      r="36"
                      stroke="#0066FF"
                      strokeWidth="3"
                      strokeDasharray="160"
                      strokeDashoffset={160 - (activeIdx + 1) * 22}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-mono-code text-xs font-bold text-slate-400">STAGE</span>
                    <span className="font-display text-2xl font-black text-[#0A0F1D]">
                      0{activeIdx + 1}
                    </span>
                  </div>
                </div>

                {/* Impact Stat */}
                <div className="space-y-1 my-4">
                  <div className="font-display text-4xl sm:text-5xl font-black crivorra-gradient-text">
                    {current.impactMetric}
                  </div>
                  <div className="text-xs font-medium text-slate-600 max-w-[200px] leading-tight">
                    {current.impactLabel}
                  </div>
                </div>

                <div className="w-full pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono-code text-slate-500">
                  <span>CRIVORRA ENGINE</span>
                  <span className="text-[#0066FF] font-semibold">SYNCHRONIZED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
