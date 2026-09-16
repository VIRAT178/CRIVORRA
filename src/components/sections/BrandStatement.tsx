import React from 'react';
import { Layers, Construction } from 'lucide-react';

const DYNAMIC_WORDS = [
  'IMPACT TOMORROW.',
  'GROWTH TOMORROW.',
  'SCALE TOMORROW.',
  'RESULTS TOMORROW.',
  'INNOVATION TOMORROW.',
];

export const BrandStatement: React.FC<{ onOpenProjectPlanner: () => void }> = ({ onOpenProjectPlanner }) => {
  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [currentText, setCurrentText] = React.useState('IMPACT TOMORROW.');
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const currentTarget = DYNAMIC_WORDS[phraseIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (currentText !== currentTarget) {
        timer = setTimeout(() => {
          setCurrentText(currentTarget.slice(0, currentText.length + 1));
        }, 85);
      } else {
        // Pause when fully typed
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2400);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, 45);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % DYNAMIC_WORDS.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex]);

  return (
    <section id="about" className="relative py-16 sm:py-20 lg:py-24 bg-white overflow-hidden text-center">
      {/* Huge abstract CRIVORRA C-shaped graphic in the background with subtle opacity */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <svg
          viewBox="0 0 800 800"
          className="w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] opacity-[0.035] -rotate-12 transition-transform duration-1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 620 180 C 510 70, 260 85, 150 210 C 35 340, 35 500, 150 630 C 260 760, 530 760, 660 630 C 710 580, 690 520, 630 520 C 565 520, 550 570, 500 600 C 390 680, 230 650, 165 550 C 100 450, 100 360, 165 260 C 230 165, 390 150, 500 215 C 550 250, 600 250, 640 215 Z"
            fill="url(#brandStatementCGradient)"
          />
          <defs>
            <linearGradient id="brandStatementCGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0066FF" />
              <stop offset="50%" stopColor="#7928CA" />
              <stop offset="100%" stopColor="#FF0080" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">
        {/* Large Whitespace-Driven Headline */}
        <div className="space-y-2">
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#0A0F1D] leading-[1.05]">
            IDEAS TODAY.
            <br />
            <span className="inline-block min-h-[1.15em] align-top">
              <span className="crivorra-gradient-vibrant">
                {currentText || '\u00A0'}
              </span>
              <span
                className="inline-block w-[3px] sm:w-[5px] md:w-[6px] h-[0.78em] align-baseline ml-1 sm:ml-2 bg-gradient-to-b from-[#0066FF] via-[#7928CA] to-[#FF0080] animate-pulse rounded-xs"
                aria-hidden="true"
              />
            </span>
          </h2>
        </div>

      

        {/* Two Unified Operational Divisions - Compact & Balanced */}
        <div className="pt-6 sm:pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-3xl mx-auto text-left">
          {/* CRIVORRA DIGITALS */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/90 border border-slate-200/80 hover:border-[#0066FF]/40 hover:bg-white transition-all duration-300 group shadow-xs hover:shadow-lg hover:shadow-blue-500/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0066FF] group-hover:scale-105 transition-transform">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0066FF] border border-blue-200/60 text-[10px] font-mono-code font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse" />
                  ACTIVE
                </span>
              </div>
              <div className="font-mono-code text-[11px] font-bold text-[#0066FF] uppercase tracking-wider mb-0.5">
                DIVISION 01
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 mb-3.5">
                CRIVORRA DIGITALS
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5 text-[10px] font-mono-code text-slate-600">
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200">Performance Ads</span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200">Social Strategy</span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200">AI Visibility</span>
            </div>
          </div>

          {/* DIVISION 02 - WORK UNDER CONSTRUCTION */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 border border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 mb-3">
              <Construction className="w-5 h-5" />
            </div>
            <p className="font-display text-sm sm:text-base font-bold text-slate-700 uppercase tracking-wider">
              Work under construction
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
