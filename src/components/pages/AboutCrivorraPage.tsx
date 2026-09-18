import React, { useEffect } from 'react';
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Building2,
  Globe2,
  ArrowUpRight,
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

interface AboutCrivorraPageProps {
  onBackToHome: () => void;
  onOpenProjectPlanner: () => void;
}

export const AboutCrivorraPage: React.FC<AboutCrivorraPageProps> = ({
  onBackToHome,
  onOpenProjectPlanner,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { number: '8', label: 'Integrated Ecosystem Services' },
    { number: '4.8x', label: 'Average Client ROAS' },
    { number: '99.2%', label: 'Retention & Growth Rate' },
    { number: '24/7', label: 'Continuous Funnel Monitoring' },
  ];

  return (
    <div className="min-h-screen bg-[#FCFCFD] text-[#0A0F1D] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
        {/* TOP BAR / BACK NAVIGATION */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-6">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-[#0066FF] hover:border-blue-200 hover:bg-blue-50/50 transition-all font-semibold text-sm cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0066FF] font-mono-code text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Information & Blueprint</span>
          </div>
        </div>

        {/* HERO HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex justify-center mb-2">
            <BrandLogo size="lg" imgClassName="h-16 sm:h-20 w-auto" showTagline={false} />
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-slate-900">
            YOUR DIGITAL{' '}
            <span className="bg-gradient-to-r from-[#0066FF] via-[#7928CA] to-[#FF0080] bg-clip-text text-transparent">
              GROWTH PARTNER
            </span>
          </h1>

          <p className="text-lg sm:text-xl font-medium text-slate-600 leading-relaxed">
            &ldquo;We don't Sell our Services — We Optimize Your Business!&rdquo;
          </p>

          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Crivorra was founded on the conviction that modern businesses don’t need disconnected agency
            tactics. They need an integrated, data-driven operating system engineered to capture market
            attention, dominate organic & AI search, and accelerate scalable revenue.
          </p>
        </div>

        {/* STATS STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-2">
              <div className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
                {stat.number}
              </div>
              <div className="font-mono-code text-[11px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* OUR STORY & MISSION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono-code text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>The Crivorra Standard</span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
              A Complete Ecosystem, Not Fragmented Agencies.
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Traditional marketing agencies operate in silos: your SEO provider never speaks with your media buyer,
              and your social media team has no insight into your bottom-line analytics. This fragmentation drains capital
              and stalls momentum.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              At Crivorra, we architected the <strong>Digital Growth Engine</strong>: eight interconnected capabilities—from
              high-impact brand storytelling and social presence to AI-first GEO search citations and precise Meta/Google
              ad attribution. Every discipline strengthens the other.
            </p>
          </div>

          <div className="lg:col-span-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 sm:p-10 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="text-xs font-mono-code font-bold uppercase tracking-widest text-blue-400">
              CORE PHILOSOPHY
            </div>
            <blockquote className="text-lg sm:text-xl font-medium text-slate-200 leading-relaxed italic">
              &ldquo;True digital growth is not about spending more on ad clicks. It is about removing every friction point
              between your brand’s value and your customer’s decision.&rdquo;
            </blockquote>
            <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between">
              <div>
                <div className="font-display font-bold text-white text-sm">CRIVORRA DIGITALS</div>
                <div className="text-xs text-slate-400 font-mono-code">Enterprise Growth Intelligence</div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* FINAL CALL TO ACTION CARD */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0066FF] via-[#7928CA] to-[#FF0080] p-[1px] shadow-xl">
          <div className="rounded-[23px] bg-white p-8 sm:p-12 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0066FF] font-mono-code text-xs font-bold uppercase tracking-wider">
              <span>Ready for Measurable Growth?</span>
            </div>

            <h3 className="font-display font-black text-2xl sm:text-4xl text-slate-900 tracking-tight max-w-2xl mx-auto">
              Let’s Architect Your Business Optimization Strategy.
            </h3>

            <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
              Speak with our growth strategists to audit your current channels, identify untapped market opportunities, and map your custom growth engine.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={onOpenProjectPlanner}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#7928CA] text-white font-bold text-sm shadow-md hover:shadow-lg shadow-blue-500/20 hover:scale-105 transition-all cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start a Project</span>
              </button>

              <button
                onClick={onBackToHome}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Explore Main Website</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
