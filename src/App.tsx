import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { DigitalGrowthEcosystem } from './components/sections/DigitalGrowthEcosystem';
import { FrequentlyNotAskedQuestions } from './components/sections/FrequentlyNotAskedQuestions';
import { OurApproachSection } from './components/sections/OurApproachSection';
import { FinalCTASection } from './components/sections/FinalCTASection';
import { Footer } from './components/layout/Footer';
import { ProjectPlannerModal } from './components/modals/ProjectPlannerModal';
import { CrivorraLoader } from './components/CrivorraLoader';
import { AboutCrivorraPage } from './components/pages/AboutCrivorraPage';

export default function App() {
  const [isProjectPlannerOpen, setIsProjectPlannerOpen] = useState(false);
  const [loaderKey, setLoaderKey] = useState(1);
  const [isLoaderActive, setIsLoaderActive] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'about-crivorra'>(() => {
    if (typeof window !== 'undefined' && window.location.hash.includes('about-crivorra')) {
      return 'about-crivorra';
    }
    return 'home';
  });

  // Synchronize browser URL hash with currentPage
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.includes('about-crivorra')) {
        setCurrentPage('about-crivorra');
        window.scrollTo(0, 0);
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const lenisRef = React.useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll with support for prefers-reduced-motion
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Pause Lenis smooth scroll when Project Planner Modal is open so modal content scrolls normally
  useEffect(() => {
    if (!lenisRef.current) return;
    if (isProjectPlannerOpen) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isProjectPlannerOpen]);

  const handleReplayIntro = () => {
    setIsLoaderActive(true);
    setLoaderKey((prev) => prev + 1);
  };

  const handleNavigateToAbout = () => {
    setCurrentPage('about-crivorra');
    window.location.hash = '#/about-crivorra';
    window.scrollTo(0, 0);
  };

  const handleNavigateToHome = () => {
    setCurrentPage('home');
    window.location.hash = '';
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#FCFCFD] text-[#0A0F1D] flex flex-col selection:bg-[#0066FF] selection:text-white relative">
      {/* Fullscreen Typographic Loader */}
      {isLoaderActive && (
        <CrivorraLoader
          key={loaderKey}
          onComplete={() => setIsLoaderActive(false)}
        />
      )}

      {/* Premium Transparent-to-Glass Navigation */}
      <Navbar
        onOpenProjectPlanner={() => setIsProjectPlannerOpen(true)}
        currentPage={currentPage}
        onNavigateToAbout={handleNavigateToAbout}
        onNavigateToHome={handleNavigateToHome}
      />

      {/* Main Content: About Crivorra Page or Homepage Ecosystem */}
      <main className="flex-1">
        {currentPage === 'about-crivorra' ? (
          <AboutCrivorraPage
            onBackToHome={handleNavigateToHome}
            onOpenProjectPlanner={() => setIsProjectPlannerOpen(true)}
          />
        ) : (
          <>
            {/* Full-Screen Premium Hero with 3D CRIVORRA C Growth Engine */}
            <HeroSection onOpenProjectPlanner={() => setIsProjectPlannerOpen(true)} />

            {/* 3D DIGITAL GROWTH ECOSYSTEM: Central CRIVORRA Hub & 8 Orbiting Services */}
            <DigitalGrowthEcosystem onOpenProjectPlanner={() => setIsProjectPlannerOpen(true)} />

            {/* FREQUENTLY NOT ASKED QUESTIONS (Visual & Interactive Video Vault) */}
            <FrequentlyNotAskedQuestions />

            {/* OUR APPROACH: 3D Central Brand Logo Connected to 6 Steps with Automatic 3-Second Light-Up */}
            <OurApproachSection onOpenProjectPlanner={() => setIsProjectPlannerOpen(true)} />

            {/* Final CTA with Rotating 3D C Symbol */}
            <FinalCTASection onOpenProjectPlanner={() => setIsProjectPlannerOpen(true)} />
          </>
        )}
      </main>

      {/* Light Footer with Dark Navy Typography & Divisions */}
      <Footer
        onOpenProjectPlanner={() => setIsProjectPlannerOpen(true)}
        onReplayIntro={handleReplayIntro}
        onNavigateToAbout={handleNavigateToAbout}
      />

      {/* Interactive Project Initiation & Scope Planner Drawer */}
      <ProjectPlannerModal
        isOpen={isProjectPlannerOpen}
        onClose={() => setIsProjectPlannerOpen(false)}
      />
    </div>
  );
}
