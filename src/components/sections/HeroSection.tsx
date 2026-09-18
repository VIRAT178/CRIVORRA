import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

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
      className="relative h-full min-h-[90vh] lg:min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 overflow-hidden bg-[#FCFCFD] bg-grid-subtle flex flex-col justify-center"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center space-y-10 mt-6 sm:mt-10 lg:mt-14">
        {/* CENTER BRAND HEADING WITH DYNAMICALLY TYPED LINE */}
        <div className="max-w-4xl mx-auto space-y-7">
          {/* Brand Name Crivorra (Exact official wordmark font style) + Dynamically Typed Line */}
          <div className="flex flex-col items-center justify-center">
            <h1 className="sr-only">CRIVORRA – Digital Growth Agency, AI Solutions &amp; Enterprise Technology</h1>
            <div className="flex justify-center items-center w-full px-2">
              <img
                src="/crivorra-wordmark@2x.png"
                srcSet="/crivorra-wordmark.png 1x, /crivorra-wordmark@2x.png 2x"
                alt="CRIVORRA – Digital Growth Agency, AI Solutions & Enterprise Technology"
                className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-auto max-w-[92vw] sm:max-w-[85vw] object-contain select-none transition-transform duration-300 hover:scale-[1.01]"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
              />
            </div>
            <div className="mt-4 sm:mt-5 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-display uppercase tracking-tight min-h-[1.3em]">
              <span className="crivorra-gradient-vibrant inline-block pb-1">
                {displayText}
              </span>
              <span className="inline-block w-[3px] sm:w-[4px] h-[0.9em] bg-[#0066FF] ml-2 align-baseline animate-pulse shadow-sm" />
            </div>
          </div>

          {/* Secondary Subtitle */}
          <p className="text-base sm:text-xl font-medium text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We don't Sell our Services
            <br />
            We Optimize Your Business!
          </p>

          {/* Centered Animated CTA Button */}
          <div className="pt-2 flex justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              animate={{
                boxShadow: [
                  '0 10px 30px -10px rgba(0, 102, 255, 0.4)',
                  '0 10px 35px -5px rgba(121, 40, 202, 0.45)',
                  '0 10px 30px -10px rgba(0, 102, 255, 0.4)',
                ],
              }}
              transition={{
                boxShadow: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
              }}
              onClick={onOpenProjectPlanner}
              className="relative group overflow-hidden inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-4.5 rounded-full bg-gradient-to-r from-[#0066FF] via-[#7928CA] to-[#FF0080] text-white font-display font-extrabold text-base sm:text-lg tracking-wide shadow-xl cursor-pointer select-none"
            >
              {/* Dynamic light shimmer sweep */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse shrink-0" />
              <span>Want to Grow Your Business</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform shrink-0" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};
