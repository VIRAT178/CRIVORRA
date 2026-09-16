import React, { useState, useRef } from 'react';
import {
  Play,
  Lock,
  Sparkles,
  ChevronRight,
  X,
} from 'lucide-react';

export interface FNAQItem {
  id: string;
  number: string;
  question: string;
  videoUrl: string;
}

export const FNAQ_DATA: FNAQItem[] = [
  {
    id: 'q1',
    number: '01',
    question: 'What is Digital Marketing?',
    videoUrl: '/digitalmarketing.mp4',
  },
  {
    id: 'q2',
    number: '02',
    question: 'What is SEO and why it is Necessary?',
    videoUrl: 'https://www.youtube-nocookie.com/embed/DvwS7cV9GmQ?autoplay=1',
  },
  {
    id: 'q3',
    number: '03',
    question: 'What is GMB and why it is Necessary?',
    videoUrl: 'https://www.youtube-nocookie.com/embed/g2qJ1bXqGqE?autoplay=1',
  },
  {
    id: 'q4',
    number: '04',
    question: 'What is social media marketing and why it is Necessary?',
    videoUrl: 'https://www.youtube-nocookie.com/embed/F4q_3nO_F1o?autoplay=1',
  },
  {
    id: 'q5',
    number: '05',
    question: 'What is GEO/AEO and why it is Necessary?',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1',
  },
  {
    id: 'q6',
    number: '06',
    question: 'How to get maximum leads?',
    videoUrl: 'https://www.youtube-nocookie.com/embed/L_LUpnjgPso?autoplay=1',
  },
];

export const FrequentlyNotAskedQuestions: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [isFrameOpen, setIsFrameOpen] = useState<boolean>(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const activeQuestion = FNAQ_DATA[selectedIdx];

  const handleSelectQuestion = (idx: number) => {
    setSelectedIdx(idx);
  };

  const handleOpenFrame = () => {
    setIsFrameOpen(true);
    if (frameRef.current) {
      frameRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleCloseFrame = () => {
    setIsFrameOpen(false);
  };

  const isDirectVideo =
    activeQuestion.videoUrl?.endsWith('.mp4') ||
    activeQuestion.videoUrl?.startsWith('/digitalmarketing');

  return (
    <section
      id="fnaq"
      className="py-16 sm:py-24 bg-[#FCFCFD] border-b border-slate-200/80 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-[#0066FF]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#7928CA]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading: Bold, clean, minimal text */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0A0F1D] leading-[1.1]">
            Frequently <span className="crivorra-gradient-vibrant">Not Asked</span> Questions
          </h2>
        </div>

        {/* 2-Column Interactive Layout: Questions on left, Portrait Video Frame on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* LEFT SIDE: 6 Questions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-3">
            {FNAQ_DATA.map((item, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectQuestion(idx)}
                  className={`w-full text-left px-5 py-4 rounded-2xl transition-all duration-200 flex items-center justify-between gap-4 border group cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#0066FF] shadow-lg shadow-blue-500/10 scale-[1.01]'
                      : 'bg-white/80 hover:bg-white border-slate-200/90 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className={`w-9 h-9 rounded-xl font-mono-code text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#0066FF] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-800'
                      }`}
                    >
                      {item.number}
                    </span>

                    <span
                      className={`font-display text-base sm:text-lg font-bold leading-snug ${
                        isSelected ? 'text-[#0A0F1D]' : 'text-slate-700'
                      }`}
                    >
                      {item.question}
                    </span>
                  </div>

                  <ChevronRight
                    className={`w-5 h-5 shrink-0 transition-all duration-200 ${
                      isSelected
                        ? 'text-[#0066FF] translate-x-0.5 scale-110'
                        : 'text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* RIGHT SIDE: Portrait Video Frame */}
          <div className="lg:col-span-5 flex justify-center items-center" ref={frameRef}>
            <div className="relative w-full max-w-[260px] sm:max-w-[280px] aspect-[9/16] rounded-[26px] bg-[#0A0F1D] border-[3px] border-slate-800 shadow-2xl shadow-slate-900/30 overflow-hidden flex flex-col justify-between">
              {/* Top Device Bar */}
              <div className="px-3.5 py-2.5 bg-slate-900/95 border-b border-slate-800/80 flex items-center justify-between z-20 shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/80" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="ml-1 text-[10px] font-mono-code font-bold text-slate-400 tracking-wider">
                    {isFrameOpen ? `PLAYING #${activeQuestion.number}` : 'VAULT LOCKED 🔒'}
                  </span>
                </div>

                {isFrameOpen && (
                  <button
                    onClick={handleCloseFrame}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-mono-code transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                    <span>Close</span>
                  </button>
                )}
              </div>

              {/* PORTRAIT FRAME BODY */}
              <div className="relative flex-1 w-full bg-slate-950 flex items-center justify-center overflow-hidden">
                {isFrameOpen ? (
                  /* OPEN: Portrait Video Player */
                  <div className="relative w-full h-full flex items-center justify-center bg-black animate-in fade-in zoom-in-95 duration-200">
                    {isDirectVideo ? (
                      <video
                        key={activeQuestion.id}
                        src={activeQuestion.videoUrl}
                        controls
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <iframe
                        src={activeQuestion.videoUrl}
                        title={activeQuestion.question}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                  </div>
                ) : (
                  /* CLOSED: Funny, Playful Portrait Visual Hook */
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-4 text-center overflow-hidden bg-gradient-to-b from-slate-900 via-[#0C1222] to-[#0A0F1D]">
                    {/* Glowing ambient radial light */}
                    <div className="absolute inset-0 bg-radial from-blue-500/15 via-purple-500/5 to-transparent pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center space-y-4">
                      {/* Playful cartoon peeking eyes card */}
                      <div className="relative flex flex-col items-center">
                        <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-slate-900/90 border-2 border-slate-700/80 shadow-xl flex items-center justify-center relative">
                          {/* Animated peeking eyes */}
                          <div className="flex items-center gap-2.5">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white flex items-center justify-center shadow-inner overflow-hidden">
                              <div className="w-2.5 h-2.5 rounded-full bg-[#0A0F1D] animate-bounce" />
                            </div>
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white flex items-center justify-center shadow-inner overflow-hidden">
                              <div className="w-2.5 h-2.5 rounded-full bg-[#0A0F1D] animate-bounce [animation-delay:150ms]" />
                            </div>
                          </div>

                          {/* Lock badge */}
                          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-lg bg-[#0066FF] text-white flex items-center justify-center shadow-md">
                            <Lock className="w-3 h-3" />
                          </div>
                        </div>

                        {/* Top secret tape pill */}
                        <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-slate-300 text-[11px] font-mono-code font-bold">
                          <span>TOP SECRET TAPE #{activeQuestion.number}</span>
                          <span className="text-amber-400">🍿</span>
                        </div>
                      </div>

                      {/* Prominent CTA Button */}
                      <div className="w-full px-1">
                        <button
                          onClick={handleOpenFrame}
                          className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-[#0066FF] via-[#7928CA] to-[#FF0080] text-white font-display font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group"
                        >
                          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#0066FF] transition-colors shrink-0">
                            <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                          </span>
                          <span className="whitespace-nowrap">Click for Answer</span>
                          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
