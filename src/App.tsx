import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { DigitalGrowthEcosystem } from './components/sections/DigitalGrowthEcosystem';
import { FrequentlyNotAskedQuestions } from './components/sections/FrequentlyNotAskedQuestions';
import { BrandStatement } from './components/sections/BrandStatement';
import { GrowthEngineSection } from './components/sections/GrowthEngineSection';
import { AITechnologySection } from './components/sections/AITechnologySection';
import { FinalCTASection } from './components/sections/FinalCTASection';
import { Footer } from './components/layout/Footer';
import { ProjectPlannerModal } from './components/modals/ProjectPlannerModal';
import { CrivorraLoader } from './components/CrivorraLoader';

export default function App() {
  const [isProjectPlannerOpen, setIsProjectPlannerOpen] = useState(false);
  const [loaderKey, setLoaderKey] = useState(1);
  const [isLoaderActive, setIsLoaderActive] = useState(true);

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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const handleReplayIntro = () => {
    setIsLoaderActive(true);
    setLoaderKey((prev) => prev + 1);
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
      <Navbar onOpenProjectPlanner={() => setIsProjectPlannerOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Full-Screen Premium Hero with 3D CRIVORRA C Growth Engine */}
        <HeroSection onOpenProjectPlanner={() => setIsProjectPlannerOpen(true)} />

        {/* 3D DIGITAL GROWTH ECOSYSTEM: Central CRIVORRA Hub & 8 Orbiting Services */}
        <DigitalGrowthEcosystem onOpenProjectPlanner={() => setIsProjectPlannerOpen(true)} />

        {/* FREQUENTLY NOT ASKED QUESTIONS (Visual & Interactive Video Vault) */}
        <FrequentlyNotAskedQuestions />

        {/* Large Whitespace-Driven Brand Statement (About) */}
        <BrandStatement onOpenProjectPlanner={() => setIsProjectPlannerOpen(true)} />

        {/* 3D AI Core Technology Animation Canvas */}
        <AITechnologySection onOpenProjectPlanner={() => setIsProjectPlannerOpen(true)} />

        {/* The CRIVORRA Growth Engine Flowing System (Approach) */}
        <GrowthEngineSection />

        {/* Final CTA with Rotating 3D C Symbol */}
        <FinalCTASection onOpenProjectPlanner={() => setIsProjectPlannerOpen(true)} />
      </main>

      {/* Light Footer with Dark Navy Typography & Divisions */}
      <Footer
        onOpenProjectPlanner={() => setIsProjectPlannerOpen(true)}
        onReplayIntro={handleReplayIntro}
      />

      {/* Interactive Project Initiation & Scope Planner Drawer */}
      <ProjectPlannerModal
        isOpen={isProjectPlannerOpen}
        onClose={() => setIsProjectPlannerOpen(false)}
      />
    </div>
  );
}
