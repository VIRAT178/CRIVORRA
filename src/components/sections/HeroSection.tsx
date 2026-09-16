import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass } from 'lucide-react';

interface HeroSectionProps {
  onOpenProjectPlanner: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenProjectPlanner }) => {
  // Dynamically typed line logic for single line loop
  const PHRASE = 'YOUR DIGITAL GROWTH PARTNER';
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 38 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < PHRASE.length) {
          setDisplayText(PHRASE.substring(0, displayText.length + 1));
        } else {
          // Hold full phrase before backspacing
          setTimeout(() => setIsDeleting(true), 2500);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(PHRASE.substring(0, displayText.length - 1));
        } else {
          // Pause before typing again
          setTimeout(() => setIsDeleting(false), 450);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting]);

  return (
    <section
      id="home"
      className="relative pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 overflow-hidden bg-[#FCFCFD] bg-grid-subtle flex flex-col justify-center"
    >
      {/* Abstract subtle background brand shapes */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-[#0066FF]/10 via-[#00D2FF]/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#7928CA]/8 via-[#FF0080]/5 to-transparent blur-3xl pointer-events-none" />

      {/* Subtle architectural decorative C curve in background */}
      <svg
        className="absolute right-10 top-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-[0.03] pointer-events-none select-none"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M 80 15 C 40 10, 10 35, 10 60 C 10 85, 45 95, 80 85"
          stroke="#0066FF"
          strokeWidth="14"
          strokeLinecap="round"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center space-y-10">
        {/* CENTER BRAND HEADING WITH DYNAMICALLY TYPED LINE */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Brand Name Crivorra (Exact official wordmark font style) + Dynamically Typed Line */}
          <div className="flex flex-col items-center justify-center">
            <h1 className="sr-only">CRIVORRA</h1>
            <div className="flex justify-center items-center w-full px-2">
              <img
                src="/crivorra-wordmark@2x.png"
                srcSet="/crivorra-wordmark.png 1x, /crivorra-wordmark@2x.png 2x"
                alt="CRIVORRA"
                className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-auto max-w-[92vw] sm:max-w-[85vw] object-contain select-none transition-transform duration-300 hover:scale-[1.01]"
                loading="eager"
                decoding="sync"
              />
            </div>
            <div className="mt-4 sm:mt-5 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-display uppercase tracking-tight text-[#0066FF] min-h-[1.3em]">
              {displayText}
              <span className="inline-block w-[3px] sm:w-[4px] h-[0.9em] bg-[#0066FF] ml-2 align-baseline animate-pulse shadow-sm" />
            </div>
          </div>

          {/* Secondary Subtitle */}
          <p className="text-base sm:text-xl font-medium text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We build digital systems that turn ideas into measurable growth.
          </p>

          {/* Centered CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenProjectPlanner}
              className="group px-8 py-4 rounded-full bg-[#0A0F1D] text-white font-bold text-sm tracking-wide hover:bg-[#0066FF] hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-3 active:scale-98"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#services"
              className="px-7 py-4 rounded-full bg-white border border-slate-300/80 text-slate-800 font-bold text-sm hover:border-[#0066FF] hover:bg-blue-50/40 transition-all duration-200 flex items-center justify-center gap-2 shadow-xs"
            >
              <Compass className="w-4 h-4 text-[#0066FF]" />
              <span>Explore Our Services</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
