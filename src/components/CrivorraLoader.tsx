import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

// ============================================================================
// TIMING CONSTANTS (Easily tunable)
// ============================================================================
export const LOADER_CONFIG = {
  // Duration in milliseconds each word stays on screen during the rapid sequence
  WORD_DISPLAY_MS: 100,
  // Duration of subtle opacity switch between words
  WORD_FADE_MS: 35,
  // Total duration of the rapid word sequence before locking to final brand (approx 3.3s)
  SEQUENCE_DURATION_MS: 2300,
  // Duration for the final CRIVORRA word to shrink and move to upper-center (approx 650ms)
  BRAND_MOVE_DURATION_SEC: 0.65,
  // Duration of the black overlay fade reveal (approx 750ms)
  OVERLAY_FADE_DURATION_SEC: 0.75,
  // Total time until loader is completely unmounted from DOM (approx 4.4s)
  TOTAL_LIFETIME_MS: 4000,
};

// Precise word sequence from user specification
const CRIVORRA_WORDS = [
  'CRIVORRA',
  'CREATE',
  'EVOLVE',
  'GROW',
  'DIGITAL',
  'STRATEGY',
  'CREATIVE',
  'PERFORMANCE',
  'BRANDING',
  'MARKETING',
  'INNOVATION',
  'IMPACT',
  'GROWTH',
  'DIGITAL',
  'CRIVORRA', // Final anchor word
];

interface CrivorraLoaderProps {
  onComplete?: () => void;
  // Optional flag to manually replay if triggered
  isReplay?: boolean;
}

export const CrivorraLoader: React.FC<CrivorraLoaderProps> = ({ onComplete }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isFinalPhase, setIsFinalPhase] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  const overlayRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const wordContainerRef = useRef<HTMLDivElement>(null);
  const timerIdsRef = useRef<number[]>([]);

  useEffect(() => {
    // 1. Lock scrolling on body and html
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // 2. Accessibility: Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Reduced motion fast path: brief brand display, fade out, unmount
      setCurrentWordIndex(CRIVORRA_WORDS.length - 1);
      const quickTimer = window.setTimeout(() => {
        if (overlayRef.current) {
          gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.35,
            ease: 'power2.out',
            onComplete: () => {
              document.body.style.overflow = originalBodyOverflow;
              document.documentElement.style.overflow = originalHtmlOverflow;
              setIsMounted(false);
              onComplete?.();
            },
          });
        }
      }, 400);
      timerIdsRef.current.push(quickTimer);
      return;
    }

    // 3. PHASE 2: Rapid Word Sequence
    const totalWords = CRIVORRA_WORDS.length;
    // Calculate interval so all words cycle nicely within SEQUENCE_DURATION_MS
    const wordInterval = Math.max(
      85,
      Math.floor(LOADER_CONFIG.SEQUENCE_DURATION_MS / (totalWords - 1))
    );

    let step = 0;
    const intervalId = window.setInterval(() => {
      step++;
      if (step < totalWords - 1) {
        // Quick subtle opacity flicker for word replacement (30-50ms)
        if (wordRef.current) {
          wordRef.current.style.opacity = '0.4';
          setTimeout(() => {
            setCurrentWordIndex(step);
            if (wordRef.current) wordRef.current.style.opacity = '1';
          }, LOADER_CONFIG.WORD_FADE_MS);
        } else {
          setCurrentWordIndex(step);
        }
      } else {
        // Final word reached: CRIVORRA
        clearInterval(intervalId);
        setCurrentWordIndex(totalWords - 1);
        setIsFinalPhase(true);
        triggerFinalCinematicPhase();
      }
    }, wordInterval);

    // 4. PHASE 3 & 4: Final Word Upward Motion + Website Reveal
    const triggerFinalCinematicPhase = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          // PHASE 5: Unmount loader completely from DOM
          document.body.style.overflow = originalBodyOverflow;
          document.documentElement.style.overflow = originalHtmlOverflow;
          setIsMounted(false);
          onComplete?.();
        },
      });

      // Target elements
      const targetWord = wordRef.current;
      const targetOverlay = overlayRef.current;

      if (!targetWord || !targetOverlay) return;

      // Elegant pause on the final CRIVORRA before gliding up (approx 180ms)
      tl.to({}, { duration: 0.18 });

      // Move CRIVORRA word upward, reduce size, and track spacing
      tl.to(
        targetWord,
        {
          y: '-38vh', // Smoothly elevates toward upper-center
          scale: 0.28, // Shrinks from 72px down to a refined brand header mark
          letterSpacing: '0.28em',
          opacity: 0.9,
          duration: LOADER_CONFIG.BRAND_MOVE_DURATION_SEC,
          ease: 'power3.out',
        },
        '+=0.02'
      );

      // Simultaneously begin fading out the black overlay to reveal the vibrant CRIVORRA website
      tl.to(
        targetOverlay,
        {
          opacity: 0,
          duration: LOADER_CONFIG.OVERLAY_FADE_DURATION_SEC,
          ease: 'power2.inOut',
        },
        '-=0.35' // Gracefully overlaps with the upward movement
      );

      // Subtle fade out of the upper label right as website becomes fully interactive
      tl.to(
        targetWord,
        {
          opacity: 0,
          duration: 0.25,
          ease: 'power1.out',
        },
        '-=0.15'
      );
    };

    return () => {
      window.clearInterval(intervalId);
      timerIdsRef.current.forEach(window.clearTimeout);
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [onComplete]);

  if (!isMounted) return null;

  return (
    <div
      ref={overlayRef}
      id="crivorra-fullscreen-loader"
      aria-live="polite"
      aria-label="Loading CRIVORRA"
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#050505] text-[#E5E5E7] select-none pointer-events-auto"
      style={{
        margin: 0,
        padding: 0,
        touchAction: 'none',
      }}
    >
      {/* Center Word Container */}
      <div
        ref={wordContainerRef}
        className="relative flex items-center justify-center px-4 w-full text-center"
      >
        <h1
          ref={wordRef}
          className="font-display font-bold uppercase tracking-[-0.02em] text-[52px] sm:text-[68px] md:text-[80px] lg:text-[88px] text-[#E5E5E7] leading-none will-change-transform transform-gpu transition-opacity duration-75"
          style={{
            fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            textRendering: 'optimizeLegibility',
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          {CRIVORRA_WORDS[currentWordIndex]}
        </h1>
      </div>
    </div>
  );
};
