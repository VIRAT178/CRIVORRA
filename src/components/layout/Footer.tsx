import React from 'react';
import { Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';

export const Footer: React.FC<{
  onOpenProjectPlanner: () => void;
  onReplayIntro?: () => void;
  onNavigateToAbout?: () => void;
}> = ({ onOpenProjectPlanner, onReplayIntro, onNavigateToAbout }) => {
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Questions', href: '#fnaq' },
    { label: 'Approach', href: '#approach' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/crivorra-digital-899230436/' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/crivorra?stkn=MTBkOWc3dWpxaHN4Zg==' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/crivorra' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@crivorra' },
  ];

  return (
    <footer className="bg-white border-t border-slate-200 text-[#0A0F1D] py-16 sm:py-20 relative overflow-hidden">
      {/* Background subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/40 via-white to-white pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        {/* 1. Center Brand Logo */}
        <div className="mb-5 flex items-center justify-center">
          <img
            src="/Crivorra Digitals.png"
            alt="CRIVORRA DIGITALS"
            className="h-18 sm:h-22 md:h-26 w-auto object-contain transition-transform duration-300 hover:scale-105"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* 2. Tagline of CRIVORRA DIGITALS */}
        <div className="max-w-xl mx-auto space-y-2 mb-8">
          <div className="font-mono-code text-xs sm:text-sm font-bold tracking-[0.25em] text-[#0066FF] uppercase">
            CREATE. EVOLVE. GROW.
          </div>
          <p className="font-display text-base sm:text-lg font-bold text-[#0A0F1D] tracking-tight">
            IDEAS TODAY. IMPACT TOMORROW.
          </p>
          <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-md mx-auto">
            Digital systems that turn ideas into measurable growth.
          </p>
        </div>

        {/* 3. Social Icons - Prominently sized with smooth hover elevation */}
        <div className="flex items-center justify-center gap-3.5 sm:gap-4.5 mb-10">
          {socialLinks.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs flex items-center justify-center text-slate-700 hover:text-white hover:bg-[#0066FF] hover:border-[#0066FF] hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1 transition-all duration-300"
                aria-label={s.name}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />
              </a>
            );
          })}
        </div>

        {/* 4. Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 mb-8 text-xs sm:text-sm font-semibold text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#0066FF] transition-colors"
            >
              {link.label}
            </a>
          ))}
          {onNavigateToAbout && (
            <button
              onClick={onNavigateToAbout}
              className="hover:text-[#0066FF] text-[#0066FF] font-bold transition-colors cursor-pointer"
            >
              About Crivorra
            </button>
          )}
          <button
            onClick={onOpenProjectPlanner}
            className="hover:text-[#0066FF] text-[#0066FF] font-bold transition-colors cursor-pointer"
          >
            Project Proposal
          </button>
        </div>

        {/* Subtle Divider */}
        <div className="w-full max-w-md border-t border-slate-200/80 mb-8" />

        {/* 5. Copyright etc. */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs text-slate-500 font-mono-code">
          <div>
            © 2026 <strong className="text-[#0A0F1D]">CRIVORRA DIGITALS</strong>. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hover:text-slate-800 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-slate-300">•</span>
            <span className="hover:text-slate-800 cursor-pointer transition-colors">Terms of Service</span>
            {onReplayIntro && (
              <>
                <span className="text-slate-300">•</span>
                <button
                  onClick={onReplayIntro}
                  className="hover:text-[#0066FF] text-slate-500 font-bold transition-colors cursor-pointer"
                  title="Replay opening brand animation"
                >
                  Replay Intro
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
