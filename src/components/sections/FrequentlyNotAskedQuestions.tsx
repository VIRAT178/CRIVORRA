import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  ChevronDown,
  ChevronUp,
  X,
  Maximize2,
  Volume2,
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
  // Start with null so no video plays on initial web page load
  const [activeOpenIdx, setActiveOpenIdx] = useState<number | null>(null);
  const [popupVideoItem, setPopupVideoItem] = useState<FNAQItem | null>(null);
  const inlineVideoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const popupVideoRef = useRef<HTMLVideoElement | null>(null);

  const handleToggleQuestion = (idx: number) => {
    if (activeOpenIdx === idx) {
      setActiveOpenIdx(null);
    } else {
      setActiveOpenIdx(idx);
    }
  };

  // Close popup modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPopupVideoItem(null);
      }
    };
    if (popupVideoItem) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [popupVideoItem]);

  const isDirectVideo = (url: string) =>
    url?.endsWith('.mp4') || url?.startsWith('/digitalmarketing');

  const getEmbedUrl = (url: string) => {
    if (url.includes('autoplay=')) return url;
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}autoplay=1&mute=0`;
  };

  return (
    <section
      id="fnaq"
      className="py-16 sm:py-24 bg-[#FCFCFD] border-b border-slate-200/80 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-[#0066FF]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#7928CA]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading: Eye-catching highlighted text with attractive background */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="relative inline-block max-w-full">
            {/* Ambient Multi-Hue Pulsing Aura */}
            <div className="absolute -inset-2 sm:-inset-5 rounded-3xl bg-gradient-to-r from-[#0066FF]/30 via-[#7928CA]/30 to-[#FF0080]/30 blur-2xl -z-10 animate-pulse pointer-events-none" />

            {/* Glowing Accent Border & Frosted Glass Container */}
            <div className="relative px-3.5 xs:px-5 py-3.5 sm:px-10 sm:py-6 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl shadow-blue-900/10 overflow-hidden">
              {/* Subtle tech dot matrix watermark in background */}
              <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(#0066FF 1.5px, transparent 1.5px)',
                  backgroundSize: '16px 16px',
                }}
              />

              {/* Gradient Accent Flare Top Border */}
              <div className="absolute top-0 left-1/6 right-1/6 h-[2px] bg-gradient-to-r from-transparent via-[#0066FF] to-transparent pointer-events-none" />

              <h2 className="relative z-10 font-display text-base xs:text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#0A0F1D] leading-[1.2] whitespace-nowrap flex items-center justify-center">
                <span>Frequently</span>&nbsp;
                <span className="relative inline-block">
                  <span className="crivorra-gradient-vibrant">Not Asked</span>
                  {/* Subtle highlight underline glow under "Not Asked" */}
                  <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] sm:h-[3px] rounded-full bg-gradient-to-r from-[#0066FF] via-[#7928CA] to-[#FF0080] opacity-90 shadow-xs" />
                </span>&nbsp;
                <span className="inline-flex items-center gap-1 mx-1 sm:mx-2 select-none text-lg xs:text-2xl sm:text-3xl md:text-4xl transition-transform hover:scale-125 cursor-default" title="Playful Questions">
                  <span>😊</span>
                  <span>🤪</span>
                </span>&nbsp;
                <span>Questions</span>
              </h2>
            </div>
          </div>
        </div>

        {/* CENTER-ALIGNED QUESTIONS LIST */}
        <div className="max-w-3xl sm:max-w-4xl mx-auto space-y-3.5 sm:space-y-4">
          {FNAQ_DATA.map((item, idx) => {
            const isOpen = activeOpenIdx === idx;
            const directVideo = isDirectVideo(item.videoUrl);

            return (
              <div
                key={item.id}
                className={`rounded-2xl sm:rounded-3xl transition-all duration-300 ${
                  isOpen
                    ? 'shadow-xl shadow-blue-900/8 ring-1 ring-[#0066FF]/40'
                    : 'shadow-xs hover:shadow-md'
                }`}
              >
                {/* QUESTION ACCORDION HEADER BUTTON */}
                <button
                  onClick={() => handleToggleQuestion(idx)}
                  className={`w-full text-left px-5 sm:px-7 py-4 sm:py-5 rounded-2xl sm:rounded-3xl transition-all duration-200 flex items-center justify-between gap-4 border cursor-pointer ${
                    isOpen
                      ? 'bg-white border-[#0066FF] text-[#0A0F1D]'
                      : 'bg-white hover:bg-slate-50/70 border-slate-200/90 hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    <span
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-mono-code text-xs sm:text-sm font-bold flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-[#0066FF] text-white shadow-sm'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {item.number}
                    </span>

                    <span className="font-display text-base sm:text-lg lg:text-xl font-bold leading-snug">
                      {item.question}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isOpen ? (
                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0066FF] text-xs font-mono-code font-bold">
                          <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                          Playing Video
                        </span>
                        <span className="w-8 h-8 rounded-full bg-blue-50 text-[#0066FF] flex items-center justify-center">
                          <ChevronUp className="w-4 h-4" />
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-mono-code font-medium group-hover:bg-blue-50 group-hover:text-[#0066FF] transition-colors">
                          <Play className="w-3 h-3 fill-current" />
                          Watch Video
                        </span>
                        <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                          <ChevronDown className="w-4 h-4" />
                        </span>
                      </div>
                    )}
                  </div>
                </button>

                {/* HORIZONTAL VIDEO FRAME (Opens directly below clicked question with autoplay, 50% screen size) */}
                {isOpen && (
                  <div className="pt-3 pb-2 flex justify-center animate-in fade-in slide-in-from-top-3 duration-300">
                    <div className="relative w-full sm:w-[50vw] sm:max-w-[50vw] h-[50vh] max-h-[50vh] rounded-2xl sm:rounded-3xl bg-[#0A0F1D] border-2 border-slate-800 shadow-2xl overflow-hidden flex flex-col mx-auto">
                      {/* Video Player Device Bar */}
                      <div className="px-4 py-2 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between z-20 shrink-0">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/90" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
                          </div>
                          <span className="ml-1 text-[11px] sm:text-xs font-mono-code font-bold text-slate-300 tracking-wider flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                            <span>PLAYING #{item.number}</span>
                          </span>
                        </div>

                        {/* Top Action Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPopupVideoItem(item);
                            }}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-mono-code transition-colors cursor-pointer"
                            title="Open in Popup Frame"
                          >
                            <Maximize2 className="w-3.5 h-3.5 text-[#0066FF]" />
                            <span className="hidden sm:inline">Popup Frame</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveOpenIdx(null);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-300 text-xs font-mono-code transition-colors cursor-pointer"
                            title="Close Video"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Close</span>
                          </button>
                        </div>
                      </div>

                      {/* Video Canvas constrained to 50% screen size with guaranteed Autoplay */}
                      <div className="relative flex-1 w-full h-full bg-black flex items-center justify-center overflow-hidden">
                        {directVideo ? (
                          <video
                            ref={(el) => {
                              inlineVideoRefs.current[item.id] = el;
                              if (el) {
                                el.play().catch(() => {});
                              }
                            }}
                            key={`inline-${item.id}`}
                            src={item.videoUrl}
                            controls
                            autoPlay
                            playsInline
                            className="w-full h-full object-contain bg-black"
                          />
                        ) : (
                          <iframe
                            key={`inline-iframe-${item.id}`}
                            src={getEmbedUrl(item.videoUrl)}
                            title={item.question}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* POPUP FRAME VIDEO MODAL LIGHTBOX (50% screen size) */}
      {popupVideoItem && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 bg-[#0A0F1D]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setPopupVideoItem(null)}
        >
          <div
            data-lenis-prevent="true"
            className="relative w-full sm:w-[50vw] sm:max-w-[50vw] h-[50vh] max-h-[50vh] bg-slate-950 rounded-2xl sm:rounded-3xl border-2 border-slate-700 shadow-2xl overflow-hidden flex flex-col my-auto mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-md bg-[#0066FF] text-white font-mono-code text-xs font-bold flex items-center justify-center">
                  {popupVideoItem.number}
                </span>
                <span className="font-display font-bold text-white text-xs sm:text-sm line-clamp-1">
                  {popupVideoItem.question}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setPopupVideoItem(null)}
                className="p-1 rounded-md bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Close Popup (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Video Frame (50% screen size) with Autoplay */}
            <div className="relative flex-1 w-full h-full bg-black flex items-center justify-center overflow-hidden">
              {isDirectVideo(popupVideoItem.videoUrl) ? (
                <video
                  ref={(el) => {
                    popupVideoRef.current = el;
                    if (el) {
                      el.play().catch(() => {});
                    }
                  }}
                  key={`popup-${popupVideoItem.id}`}
                  src={popupVideoItem.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain bg-black"
                />
              ) : (
                <iframe
                  key={`popup-iframe-${popupVideoItem.id}`}
                  src={getEmbedUrl(popupVideoItem.videoUrl)}
                  title={popupVideoItem.question}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

