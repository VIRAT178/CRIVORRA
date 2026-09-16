import React, { useState } from 'react';
import {
  GraduationCap,
  HeartPulse,
  Building2,
  UtensilsCrossed,
  ShoppingBag,
  Factory,
  UserCheck,
  Rocket,
  ArrowRight,
} from 'lucide-react';
import { IndustryItem } from '../../types';

export const IndustriesSection: React.FC<{ onSelectIndustry: (ind: string) => void }> = ({
  onSelectIndustry,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const industries: IndustryItem[] = [
    {
      id: 'education',
      name: 'Education',
      icon: 'GraduationCap',
      description:
        'Student enrollment acquisition funnels, edtech platform development, and automated admission counseling pipelines.',
      keyMetric: '+240% Qualified Inquiries',
      featuredWork: 'Global University & EdTech LMS',
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      icon: 'HeartPulse',
      description:
        'HIPAA-conscious patient acquisition, clinic booking automation, and high-trust healthcare authority SEO.',
      keyMetric: '3.4X Patient Appointment Bookings',
      featuredWork: 'Multi-Specialty Clinic Network',
    },
    {
      id: 'real-estate',
      name: 'Real Estate',
      icon: 'Building2',
      description:
        'High-value property investor targeting, immersive 3D virtual tour landing systems, and automated WhatsApp lead qualification.',
      keyMetric: '$45M+ Inventory Sold via Paid Funnels',
      featuredWork: 'Luxury Residential Development',
    },
    {
      id: 'hospitality',
      name: 'Hospitality',
      icon: 'UtensilsCrossed',
      description:
        'Direct booking engines reducing OTA commissions, culinary event sellouts, and geo-targeted tourist awareness campaigns.',
      keyMetric: '62% Lift in Direct Bookings',
      featuredWork: 'Boutique Hotel Group & Fine Dining',
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      icon: 'ShoppingBag',
      description:
        'High-ROAS Meta/Google catalog ads, headless Shopify architecture, and AI-powered abandoned cart recovery sequences.',
      keyMetric: '4.6X Median Blended ROAS',
      featuredWork: 'Direct-to-Consumer Apparel & Tech',
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      icon: 'Factory',
      description:
        'B2B RFP capture systems, industrial supply chain distributor portals, and global search presence.',
      keyMetric: '180+ Enterprise RFPs Generated',
      featuredWork: 'Precision Equipment Manufacturer',
    },
    {
      id: 'coaching',
      name: 'Coaching & Training',
      icon: 'UserCheck',
      description:
        'High-ticket coaching webinar funnels, automated calendar scheduling, and executive personal branding.',
      keyMetric: '8.2X Coaching Program Scale',
      featuredWork: 'Executive Leadership Academy',
    },
    {
      id: 'startups',
      name: 'Startups & SMEs',
      icon: 'Rocket',
      description:
        'Go-to-market validation sprints, rapid MVP web deployment, and scalable investor-ready traction engines.',
      keyMetric: '0 to 10k Active Users in 90 Days',
      featuredWork: 'Seed-Stage AI SaaS Platform',
    },
  ];

  const getIndustryIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap':
        return <GraduationCap className="w-8 h-8" />;
      case 'HeartPulse':
        return <HeartPulse className="w-8 h-8" />;
      case 'Building2':
        return <Building2 className="w-8 h-8" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-8 h-8" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-8 h-8" />;
      case 'Factory':
        return <Factory className="w-8 h-8" />;
      case 'UserCheck':
        return <UserCheck className="w-8 h-8" />;
      case 'Rocket':
        return <Rocket className="w-8 h-8" />;
      default:
        return <Rocket className="w-8 h-8" />;
    }
  };

  return (
    <section id="industries" className="py-28 sm:py-36 bg-[#FCFCFD] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono-code font-bold uppercase tracking-wider">
              <span>VERTICAL SPECIALIZATION</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#0A0F1D] tracking-tight">
              INDUSTRIES WE EMPOWER
            </h2>
          </div>
          <p className="max-w-md text-slate-600 text-sm sm:text-base">
            Domain-tailored growth playbooks and technical architectures configured for your sector’s unique compliance and customer journeys.
          </p>
        </div>

        {/* 8 Interactive Industry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind) => {
            const isHovered = hoveredId === ind.id;
            return (
              <div
                key={ind.id}
                onMouseEnter={() => setHoveredId(ind.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectIndustry(ind.name)}
                className={`group p-8 rounded-3xl bg-white border border-slate-200/90 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isHovered
                    ? '-translate-y-2 border-[#0066FF] shadow-xl shadow-blue-500/10'
                    : 'hover:border-slate-300 shadow-xs'
                }`}
              >
                <div>
                  {/* Large Minimal Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 group-hover:text-[#0066FF] group-hover:bg-blue-50 group-hover:scale-105 transition-all duration-300 mb-6">
                    {getIndustryIcon(ind.icon)}
                  </div>

                  <h3 className="font-display text-2xl font-bold text-slate-900 mb-2 group-hover:text-[#0066FF] transition-colors">
                    {ind.name}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed mb-4">
                    {ind.description}
                  </p>
                </div>

                {/* Key Metric & Arrow */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono-code font-bold uppercase text-slate-400">
                      BENCHMARK
                    </div>
                    <div className="text-xs font-bold text-[#0066FF]">{ind.keyMetric}</div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
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
