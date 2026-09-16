import React, { useState } from 'react';
import {
  Compass,
  Magnet,
  CheckCircle2,
  Workflow,
  BarChart4,
  Rocket,
  ArrowRight,
} from 'lucide-react';
import { GrowthEngineStep } from '../../types';

export const GrowthEngineSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps: GrowthEngineStep[] = [
    {
      id: 'discover',
      number: '01',
      name: 'DISCOVER',
      tagline: 'Deep Market & Customer Intelligence',
      items: ['Market research', 'Competitor analysis', 'Customer insights'],
      metric: '360° Data Audit',
      color: '#0066FF',
    },
    {
      id: 'attract',
      number: '02',
      name: 'ATTRACT',
      tagline: 'High-Velocity Multi-Channel Attention',
      items: ['SEO & GEO', 'Content engine', 'Social distribution', 'Paid ad blitz', 'AI visibility'],
      metric: '+400% Target Reach',
      color: '#00D2FF',
    },
    {
      id: 'convert',
      number: '03',
      name: 'CONVERT',
      tagline: 'Frictionless Customer Acquisition',
      items: ['High-converting landing pages', 'Lead generation funnels', 'Conversion Rate Optimization (CRO)'],
      metric: '3.5x Conversion Uplift',
      color: '#7928CA',
    },
    {
      id: 'automate',
      number: '04',
      name: 'AUTOMATE',
      tagline: 'Autonomous Nurturing & Ops',
      items: ['Enterprise CRM sync', 'WhatsApp bots & flows', 'Predictive email loops', 'Custom AI automation'],
      metric: '24/7 Zero-Touch Leads',
      color: '#FF0080',
    },
    {
      id: 'measure',
      number: '05',
      name: 'MEASURE',
      tagline: 'Full-Funnel Real-Time Attribution',
      items: ['Cross-platform analytics', 'Multi-touch attribution', 'Custom executive reporting'],
      metric: '100% Attribution Clarity',
      color: '#FF5E1E',
    },
    {
      id: 'scale',
      number: '06',
      name: 'SCALE',
      tagline: 'Compounding Revenue & Expansion',
      items: ['Budget optimization', 'Retention playbooks', 'New market rollout', 'Continuous growth loops'],
      metric: '5X Compounding ROI',
      color: '#0066FF',
    },
  ];

  const getStepIcon = (id: string) => {
    switch (id) {
      case 'discover':
        return <Compass className="w-5 h-5" />;
      case 'attract':
        return <Magnet className="w-5 h-5" />;
      case 'convert':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'automate':
        return <Workflow className="w-5 h-5" />;
      case 'measure':
        return <BarChart4 className="w-5 h-5" />;
      case 'scale':
        return <Rocket className="w-5 h-5" />;
      default:
        return <Compass className="w-5 h-5" />;
    }
  };

  return (
    <section id="approach" className="py-28 sm:py-36 bg-[#FCFCFD] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono-code font-bold uppercase tracking-widest">
            <span>METHODOLOGY & ARCHITECTURE</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0A0F1D] tracking-tight">
            THE CRIVORRA GROWTH ENGINE
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            A closed-loop, six-stage digital growth system engineered to take ideas from market validation to compounding scale.
          </p>
        </div>

        {/* Animated Connecting Flow Line & Flowing System */}
        <div className="relative mb-16">
          {/* Horizontal connecting background line for desktop */}
          <div className="hidden lg:block absolute top-7 inset-x-12 h-1 bg-slate-200 rounded-full z-0">
            <div
              className="h-full bg-gradient-to-r from-[#0066FF] via-[#7928CA] to-[#FF0080] rounded-full transition-all duration-500"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {/* Six Step Nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`flex flex-col items-center text-center p-4 rounded-2xl transition-all duration-300 group ${
                    isActive
                      ? 'bg-white shadow-xl shadow-blue-500/10 border-2 border-[#0066FF] scale-105'
                      : 'bg-white/60 hover:bg-white border border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  {/* Step Node Circle */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 mb-3 ${
                      isActive
                        ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/30 rotate-6'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                    }`}
                  >
                    {getStepIcon(step.id)}
                  </div>

                  <span className="font-mono-code text-[11px] font-bold text-slate-400 group-hover:text-slate-600">
                    STEP {step.number}
                  </span>
                  <span className="font-display font-extrabold text-sm text-slate-900 mt-0.5">
                    {step.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Detailed Breakdown Panel */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl shadow-slate-200/60 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code font-bold uppercase tracking-wider bg-blue-50 text-[#0066FF]">
                STAGE {steps[activeStep].number} IN-DEPTH
              </div>
              <div>
                <h3 className="font-display text-3xl sm:text-4xl font-black text-[#0A0F1D]">
                  {steps[activeStep].name}
                </h3>
                <p className="text-slate-600 text-base font-medium mt-1">
                  {steps[activeStep].tagline}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="font-mono-code text-xs font-bold text-slate-400 uppercase tracking-wider">
                  ACTIVATION CHECKLIST
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {steps[activeStep].items.map((item, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3 text-sm font-semibold text-slate-800"
                    >
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">
                        ✓
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Metric Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full max-w-sm rounded-2xl bg-gradient-to-br from-slate-900 to-[#0B132B] p-8 text-white text-center shadow-xl space-y-4">
                <div className="font-mono-code text-xs text-blue-300 uppercase tracking-widest">
                  BENCHMARK OUTCOME
                </div>
                <div className="font-display text-4xl font-extrabold text-[#00D2FF]">
                  {steps[activeStep].metric}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every stage of the CRIVORRA Growth Engine feeds continuous attribution telemetry into the next stage for self-improving unit economics.
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono-code text-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    AUTONOMOUS FEEDBACK LOOP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
