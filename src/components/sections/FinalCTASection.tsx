import React from 'react';
import { ArrowRight, Sparkles, Mail, Phone, Calendar, ShieldCheck, Clock } from 'lucide-react';
import { RotatingCSymbol } from '../3d/RotatingCSymbol';

interface FinalCTASectionProps {
  onOpenProjectPlanner: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenProjectPlanner }) => {
  return (
    <section
      id="contact"
      className="py-32 sm:py-40 bg-[#070B19] text-white relative overflow-hidden text-center bg-grid-dark"
    >
      {/* 3D CRIVORRA C symbol rotating slowly behind the CTA */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 z-0 pointer-events-none">
        <RotatingCSymbol className="w-[500px] sm:w-[700px] h-[500px] sm:h-[700px]" />
      </div>

      {/* Atmospheric ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#0066FF]/20 via-[#7928CA]/20 to-[#FF0080]/10 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-cyan-300 text-xs font-mono-code font-bold uppercase tracking-widest backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#00D2FF]" />
          <span>INITIATE ENGAGEMENT</span>
        </div>

        {/* Large Headline */}
        <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.98]">
          READY TO
          <br />
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            CREATE WHAT'S
          </span>{' '}
          <span className="crivorra-gradient-vibrant">NEXT?</span>
        </h2>

        {/* Supporting Text */}
        <p className="max-w-2xl mx-auto text-lg sm:text-2xl text-slate-300 font-normal leading-relaxed">
          Let's turn your next idea into measurable digital growth.
        </p>

        {/* Big CTA Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenProjectPlanner}
            className="group px-10 py-5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#7928CA] text-white text-base font-extrabold tracking-wider uppercase hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 border border-white/20 active:scale-95"
          >
            <span>START YOUR PROJECT</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <a
            href="mailto:contact@crivorra.com"
            className="px-8 py-5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white text-sm font-bold tracking-wide transition-colors backdrop-blur-sm flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>contact@crivorra.com</span>
          </a>
        </div>

        {/* Trust Guarantees */}
        <div className="pt-12 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-xs font-mono-code text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Strict NDA Protection Guaranteed</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#00D2FF]" />
            <span>24-Hour Executive Proposal Response</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#7928CA]" />
            <span>Flexible Growth Sprint Deployments</span>
          </div>
        </div>
      </div>
    </section>
  );
};
