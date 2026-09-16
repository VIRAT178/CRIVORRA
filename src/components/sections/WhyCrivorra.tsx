import React from 'react';
import { Check, ShieldCheck, Sparkles, BrainCircuit, BarChart3, Workflow, Palette, FileText, Target } from 'lucide-react';
import { PrincipleItem } from '../../types';

export const WhyCrivorra: React.FC = () => {
  const principles: PrincipleItem[] = [
    {
      number: '01',
      title: 'AI-Powered Thinking',
      description:
        'We don’t treat AI as a superficial gimmick. We embed generative reasoning and automated workflows into the very foundation of your marketing and operations.',
      points: ['Custom fine-tuned agent models', 'Autonomous workflow pipelines', 'Predictive audience modeling'],
    },
    {
      number: '02',
      title: 'Data-Driven Decisions',
      description:
        'Zero guesswork. Every ad dollar, code commit, and content angle is guided by first-party attribution data and statistical significance testing.',
      points: ['Clean first-party tracking (CAPI)', 'Multi-touch attribution models', 'Cohort LTV analytics'],
    },
    {
      number: '03',
      title: 'Automation First',
      description:
        'If a high-value process can be executed by machines 24/7 without error, we automate it, freeing your leadership to focus on product and strategic expansion.',
      points: ['Instant lead capture & enrichment', 'Omnichannel CRM triggers', 'Self-healing marketing funnels'],
    },
    {
      number: '04',
      title: 'Creative Strategy',
      description:
        'Algorithms demand creative volume and emotional distinction. We pair analytical rigor with cinematic visual execution that stops the infinite scroll.',
      points: ['High-production visual identity', 'Rapid creative testing frameworks', 'Compelling brand narratives'],
    },
    {
      number: '05',
      title: 'Transparent Reporting',
      description:
        'No vanity metrics or smoke screens. Real-time executive dashboards give you 100% visibility into pipeline progression, blended ROAS, and customer CAC.',
      points: ['Live 24/7 client dashboards', 'Dedicated Slack communication', 'Bi-weekly strategic reviews'],
    },
    {
      number: '06',
      title: 'Growth Focused',
      description:
        'We operate as an aligned equity-level growth partner, continuously optimizing retention, unit economics, and compounding enterprise enterprise value.',
      points: ['Shared upside alignment', 'Full-stack engineering execution', 'Scalable growth roadmaps'],
    },
  ];

  return (
    <section className="py-28 sm:py-36 bg-[#FCFCFD] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono-code font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>OPERATIONAL PRINCIPLES</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0A0F1D] tracking-tight">
            WHY CRIVORRA?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Six foundational tenets that separate high-yield digital engineering from generic marketing agencies.
          </p>
        </div>

        {/* Six Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {principles.map((pr) => (
            <div
              key={pr.number}
              className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:shadow-blue-500/5 hover:border-[#0066FF]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono-code text-xs font-bold text-slate-400 group-hover:text-[#0066FF] transition-colors">
                    PRINCIPLE {pr.number}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold text-xs group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                    <Check className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#0066FF] transition-colors">
                  {pr.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {pr.description}
                </p>
              </div>

              {/* Sub points with elegant animated checkmarks */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                {pr.points.map((pt, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-[10px] shrink-0 font-bold">
                      ✓
                    </span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
