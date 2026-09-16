import React, { useState } from 'react';
import {
  TrendingUp,
  Share2,
  Search,
  Sparkles,
  Cpu,
  Code2,
  ArrowRight,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { ServiceCardItem } from '../../types';

interface WhatWeDoProps {
  onSelectService: (serviceName: string) => void;
}

export const WhatWeDo: React.FC<WhatWeDoProps> = ({ onSelectService }) => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const cards: ServiceCardItem[] = [
    {
      number: '01',
      title: 'DIGITAL MARKETING',
      division: 'DIGITALS',
      tags: ['Strategy', 'Campaigns', 'Growth', 'Performance'],
      description:
        'High-precision performance media buying, multichannel audience orchestration, and conversion rate optimization that turn customer acquisition into a predictable mathematical engine.',
      iconName: 'TrendingUp',
      gradient: 'from-[#0066FF] to-[#00D2FF]',
      highlightMetric: '+310% Avg. Qualified Lead Growth',
    },
    {
      number: '02',
      title: 'SOCIAL MEDIA',
      division: 'DIGITALS',
      tags: ['Content', 'Community', 'Creative', 'Engagement'],
      description:
        'Impactful social architectures, viral distribution playbooks, and high-production motion assets built to establish category leadership and foster loyal community advocacy.',
      iconName: 'Share2',
      gradient: 'from-[#00D2FF] to-[#7928CA]',
      highlightMetric: '15M+ Organic Impressions Generated',
    },
    {
      number: '03',
      title: 'SEO & AI VISIBILITY',
      division: 'DIGITALS',
      tags: ['SEO', 'AEO', 'GEO', 'Local Search'],
      description:
        'Next-generation Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO). We engineer your brand to be the authoritative citation across Google, Perplexity, and OpenAI Search.',
      iconName: 'Search',
      gradient: 'from-[#7928CA] to-[#FF0080]',
      highlightMetric: '#1 Citations in Generative Overviews',
    },
    {
      number: '04',
      title: 'BRANDING',
      division: 'DIGITALS',
      tags: ['Brand Strategy', 'Identity', 'Creative', 'Personal Branding'],
      description:
        'Comprehensive brand positioning, distinctive typography hierarchies, design systems, and executive thought leadership that make your company unmistakable in crowded markets.',
      iconName: 'Sparkles',
      gradient: 'from-[#FF0080] to-[#FF5E1E]',
      highlightMetric: 'Iconic Multi-Platform Identity',
    },
    {
      number: '05',
      title: 'AI SOLUTIONS',
      division: 'TECHNOLOGIES',
      tags: ['AI Automation', 'AI Assistants', 'AI Content', 'AI Visibility'],
      description:
        'Custom enterprise generative AI agents, intelligent triage bots, programmatic content pipelines, and internal knowledge bases that multiply operational velocity by 10x.',
      iconName: 'Cpu',
      gradient: 'from-[#0066FF] to-[#7928CA]',
      highlightMetric: '70% Reduction in Manual Ops',
    },
    {
      number: '06',
      title: 'TECHNOLOGY',
      division: 'TECHNOLOGIES',
      tags: ['Web Development', 'Software', 'CRM', 'Business Automation'],
      description:
        'Production-grade modern web applications, bespoke SaaS platforms, headless architectures, and integrated CRM workflows engineered for blistering speed, security, and scale.',
      iconName: 'Code2',
      gradient: 'from-[#00D2FF] to-[#0066FF]',
      highlightMetric: '99.99% Uptime & Sub-second Speeds',
    },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6" />;
      case 'Share2':
        return <Share2 className="w-6 h-6" />;
      case 'Search':
        return <Search className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6" />;
      case 'Code2':
        return <Code2 className="w-6 h-6" />;
      default:
        return <Zap className="w-6 h-6" />;
    }
  };

  return (
    <section id="capabilities" className="py-16 sm:py-20 bg-[#FCFCFD] relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-[#0066FF]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-[#7928CA]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0066FF] text-xs font-mono-code font-bold uppercase tracking-wider">
              <span>END-TO-END CAPABILITIES</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0A0F1D]">
              WHAT WE BUILD
            </h2>
          </div>
          <p className="max-w-md text-slate-600 text-sm sm:text-base leading-relaxed">
            Six interconnected disciplines spanning growth marketing and advanced technology engineering, coordinated to build high-yield digital assets.
          </p>
        </div>

        {/* Six Premium Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card) => {
            const isHovered = activeCard === card.number;

            return (
              <div
                key={card.number}
                onMouseEnter={() => setActiveCard(card.number)}
                onMouseLeave={() => setActiveCard(null)}
                onClick={() => onSelectService(card.title)}
                className="group relative rounded-3xl bg-white p-8 border border-slate-200/90 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
                style={{
                  boxShadow: isHovered
                    ? '0 20px 40px -15px rgba(0, 102, 255, 0.12), 0 0 0 1px rgba(0, 102, 255, 0.3)'
                    : '0 4px 20px -2px rgba(10, 15, 29, 0.03)',
                }}
              >
                {/* Background Glow on Hover */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none`}
                />

                <div>
                  {/* Top row: Number and 3D Animated Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono-code text-sm font-extrabold text-slate-400 group-hover:text-[#0066FF] transition-colors">
                      {card.number}
                    </span>

                    {/* 3D Icon Container */}
                    <div className="relative w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-gradient-to-br group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-blue-500/25">
                      <div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      />
                      <span className="relative z-10">{getIcon(card.iconName)}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#0066FF] transition-colors">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                    {card.description}
                  </p>

                  {/* Tags Pill List */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-slate-100/80 text-slate-700 text-xs font-mono-code font-medium group-hover:bg-blue-50 group-hover:text-[#0066FF] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Highlight Metric and Animated Arrow */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{card.highlightMetric}</span>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#0066FF] group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
