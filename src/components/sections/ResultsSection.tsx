import React, { useState, useEffect, useRef } from 'react';
import { Award, TrendingUp, Users, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';

export const ResultsSection: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      value: 50,
      suffix: '+',
      label: 'Happy Clients',
      sublabel: 'Global Enterprises & Scale-Ups',
      icon: Users,
      color: '#0066FF',
    },
    {
      value: 200,
      suffix: '+',
      label: 'Projects Delivered',
      sublabel: 'Web, Marketing & AI Deployments',
      icon: CheckCircle2,
      color: '#00D2FF',
    },
    {
      value: 5,
      suffix: '+',
      label: 'Industries Served',
      sublabel: 'Deep Cross-Sector Domain Expertise',
      icon: Award,
      color: '#7928CA',
    },
    {
      display: '2X–5X',
      label: 'ROI Improvement',
      sublabel: 'Consistent Multi-Channel Revenue Lift',
      icon: TrendingUp,
      color: '#FF0080',
    },
    {
      value: 90,
      suffix: '%+',
      label: 'Client Retention',
      sublabel: 'Multi-Year Growth Partnerships',
      icon: HeartHandshake,
      color: '#FF5E1E',
    },
    {
      value: 100,
      suffix: '%',
      label: 'Commitment to Quality',
      sublabel: 'Zero-Compromise Engineering & SLAs',
      icon: ShieldCheck,
      color: '#0066FF',
    },
  ];

  return (
    <section
      id="insights"
      ref={sectionRef}
      className="py-28 sm:py-36 bg-white relative overflow-hidden border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono-code font-bold uppercase tracking-widest">
            <span>MEASURABLE BUSINESS IMPACT</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#0A0F1D] tracking-tight">
            PROVEN RESULTS AT SCALE
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            We judge our success by one metric alone: verifiable, compounding revenue expansion for the brands we partner with.
          </p>
        </div>

        {/* 6 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="group p-8 rounded-3xl bg-[#FAFBFD] border border-slate-200/80 hover:border-slate-300 hover:bg-white transition-all duration-300 shadow-xs hover:shadow-xl hover:shadow-blue-500/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: stat.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono-code text-xs font-bold text-slate-400">
                      METRIC 0{i + 1}
                    </span>
                  </div>

                  <div className="font-display text-4xl sm:text-5xl font-black text-[#0A0F1D] tracking-tight mb-2 group-hover:text-[#0066FF] transition-colors">
                    {stat.display || `${stat.value}${stat.suffix}`}
                  </div>

                  <div className="font-display text-lg font-bold text-slate-800">
                    {stat.label}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 text-xs text-slate-500 font-medium">
                  {stat.sublabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
