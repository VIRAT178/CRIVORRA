import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { CaseStudyItem } from '../../types';

export const CaseStudiesSection: React.FC<{ onOpenProjectPlanner: () => void }> = ({
  onOpenProjectPlanner,
}) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'DIGITALS' | 'TECHNOLOGIES'>('ALL');
  const [selectedCase, setSelectedCase] = useState<CaseStudyItem | null>(null);

  const cases: CaseStudyItem[] = [
    {
      id: 'lumina-health',
      client: 'Lumina Healthcare Network',
      industry: 'Healthcare & Telemedicine',
      division: 'CRIVORRA DIGITALS',
      challenge:
        'High patient acquisition costs across fragmented channels and poor organic visibility in competitive surgical categories.',
      solution:
        'Implemented generative engine optimization (GEO), localized HIPAA-compliant Google Ads campaigns, and automated WhatsApp appointment booking workflows.',
      services: ['SEO & AI Visibility', 'Performance Marketing', 'Lead Generation Funnels'],
      results: [
        { metric: '+340%', label: 'Monthly Organic Patients' },
        { metric: '-52%', label: 'Cost Per Acquisition (CPA)' },
        { metric: '$3.8M', label: 'Added Annual Practice Revenue' },
      ],
      accentColor: '#0066FF',
    },
    {
      id: 'apex-prop',
      client: 'Apex Living Developments',
      industry: 'Luxury Real Estate',
      division: 'CRIVORRA DIGITALS',
      challenge:
        'Slow qualified investor inquiry velocity for a $65M multi-tower luxury residential project.',
      solution:
        'Engineered an ultra-high-converting interactive 3D web showcase paired with hyper-targeted HNI Meta and programmatic ad funnels.',
      services: ['Digital Marketing', 'Branding & 3D Assets', 'Social Architecture'],
      results: [
        { metric: '$42M+', label: 'Inventory Sold in 6 Months' },
        { metric: '5.2X', label: 'Verified Return on Ad Spend' },
        { metric: '1,200+', label: 'Vetted High-Net-Worth Inquiries' },
      ],
      accentColor: '#7928CA',
    },
    {
      id: 'velos-cloud',
      client: 'Velos AI Logistics Platform',
      industry: 'Enterprise SaaS & AI',
      division: 'CRIVORRA TECHNOLOGIES',
      challenge:
        'Manual dispatching operations choking enterprise scale and dated web platform causing 60% onboarding drop-off.',
      solution:
        'Architected a next-generation high-performance Next.js application integrated with autonomous Gemini dispatching agents and automated HubSpot CRM pipelines.',
      services: ['AI Solutions & Agents', 'Custom Web Application', 'Workflow Automation'],
      results: [
        { metric: '74%', label: 'Reduction in Manual Dispatching' },
        { metric: '3.1X', label: 'Onboarding Completion Lift' },
        { metric: '99.99%', label: 'System Uptime SLA' },
      ],
      accentColor: '#00D2FF',
    },
    {
      id: 'aurora-fashion',
      client: 'Aurora Direct Apparel',
      industry: 'Direct-to-Consumer E-commerce',
      division: 'CRIVORRA DIGITALS',
      challenge:
        'Customer retention plateau and rising iOS ad tracking signal loss depressing seasonal campaign margins.',
      solution:
        'Deployed server-side conversion tracking (CAPI), AI-driven predictive retention email flows, and rapid dynamic creative testing.',
      services: ['Performance Media Buying', 'Social Video System', 'Retention Architecture'],
      results: [
        { metric: '4.8X', label: 'Blended Black Friday ROAS' },
        { metric: '+88%', label: 'Repeat Customer Purchase Rate' },
        { metric: '25M+', label: 'Viral Video Views' },
      ],
      accentColor: '#FF0080',
    },
  ];

  const filteredCases = cases.filter((item) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'DIGITALS') return item.division === 'CRIVORRA DIGITALS';
    if (activeFilter === 'TECHNOLOGIES') return item.division === 'CRIVORRA TECHNOLOGIES';
    return true;
  });

  return (
    <section id="work" className="py-28 sm:py-36 bg-white relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Division Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono-code font-bold uppercase tracking-wider">
              <span>FEATURED TRANSFORMATIONS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#0A0F1D] tracking-tight">
              CASE STUDIES
            </h2>
          </div>

          {/* Division Filter Pills */}
          <div className="flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-full border border-slate-200">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeFilter === 'ALL'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setActiveFilter('DIGITALS')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeFilter === 'DIGITALS'
                  ? 'bg-[#0066FF] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#0066FF]'
              }`}
            >
              CRIVORRA DIGITALS
            </button>
            <button
              onClick={() => setActiveFilter('TECHNOLOGIES')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeFilter === 'TECHNOLOGIES'
                  ? 'bg-[#7928CA] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#7928CA]'
              }`}
            >
              CRIVORRA TECHNOLOGIES
            </button>
          </div>
        </div>

        {/* Case Studies Storytelling Grid */}
        <div className="space-y-10">
          {filteredCases.map((cs) => (
            <div
              key={cs.id}
              className="rounded-3xl bg-[#FAFBFD] border border-slate-200/90 p-8 sm:p-12 lg:p-14 hover:border-slate-300 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left Col: Client & Story */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono-code text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700">
                      {cs.industry}
                    </span>
                    <span
                      className="font-mono-code text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: cs.accentColor }}
                    >
                      {cs.division}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0A0F1D]">
                    {cs.client}
                  </h3>

                  <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                    <div>
                      <strong className="text-slate-900 font-bold block mb-1">The Challenge:</strong>
                      {cs.challenge}
                    </div>
                    <div>
                      <strong className="text-slate-900 font-bold block mb-1">The CRIVORRA Solution:</strong>
                      {cs.solution}
                    </div>
                  </div>

                  {/* Services deployed */}
                  <div className="pt-2">
                    <div className="text-xs font-mono-code uppercase font-bold text-slate-400 mb-2">
                      SERVICES DEPLOYED
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cs.services.map((srv) => (
                        <span
                          key={srv}
                          className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-mono-code font-medium text-slate-700"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Col: Verified Results Breakdown */}
                <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="font-mono-code text-xs font-bold text-slate-400 uppercase tracking-wider">
                      VERIFIED OUTCOMES
                    </span>
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  </div>

                  <div className="space-y-4">
                    {cs.results.map((res, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-600">{res.label}</span>
                        <span className="font-display text-2xl font-black text-slate-900">
                          {res.metric}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={onOpenProjectPlanner}
                      className="w-full py-3 rounded-xl bg-[#0A0F1D] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#0066FF] transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Scale Similar Results</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
