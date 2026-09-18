import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Globe,
  Target,
  Share2,
  Sparkles,
  MapPin,
  TrendingUp,
  Cpu,
  BarChart3,
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { EcosystemCanvas, ServicePosition3D } from '../3d/EcosystemCanvas';

interface DigitalGrowthEcosystemProps {
  onOpenProjectPlanner?: () => void;
}

export interface EcosystemServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  capabilities: string[];
  colorName: string;
  primaryColor: string;
  secondaryColor: string;
  borderHover: string;
  bgGlow: string;
  icon: React.ElementType;
}

export const ECOSYSTEM_SERVICES: EcosystemServiceItem[] = [
  {
    id: 'social-media-management',
    number: '01',
    title: 'Social Media Management',
    shortDesc: 'Build an active social presence that creates attention and brand trust.',
    capabilities: ['Content Strategy', 'Creative Design', 'Community Management', 'Reels & Viral Copy', 'Brand Engagement'],
    colorName: 'Violet / Magenta',
    primaryColor: '#7928CA',
    secondaryColor: '#FF0080',
    borderHover: 'hover:border-[#FF0080]/80',
    bgGlow: 'from-[#7928CA]/15 to-[#FF0080]/5',
    icon: Share2,
  },
  {
    id: 'brand-management',
    number: '02',
    title: 'Brand Management',
    shortDesc: 'Define a memorable identity and positioning that dominates market mindshare.',
    capabilities: ['Brand Identity', 'Visual Guidelines', 'Reputation Management', 'Brand Storytelling', 'Asset Architecture'],
    colorName: 'Royal Blue / Cyan',
    primaryColor: '#0066FF',
    secondaryColor: '#00D2FF',
    borderHover: 'hover:border-[#00D2FF]/80',
    bgGlow: 'from-[#0066FF]/15 to-[#00D2FF]/5',
    icon: Sparkles,
  },
  {
    id: 'search-engine-optimisation',
    number: '03',
    title: 'Search Engine Optimisation',
    shortDesc: 'Rank at the top of organic search queries and drive qualified buyer intent.',
    capabilities: ['Technical SEO', 'On-Page Optimization', 'High-Authority Backlinks', 'Keyword Clustering', 'Core Web Vitals'],
    colorName: 'Blue / Indigo',
    primaryColor: '#0066FF',
    secondaryColor: '#2563EB',
    borderHover: 'hover:border-[#0066FF]/80',
    bgGlow: 'from-[#0066FF]/15 to-[#2563EB]/5',
    icon: Globe,
  },
  {
    id: 'google-my-business',
    number: '04',
    title: 'Google my business',
    shortDesc: 'Capture high-converting local foot-traffic, phone inquiries, and map rankings.',
    capabilities: ['GMB Setup & Audit', 'Local Map 3-Pack', 'Review Generation', 'Local Citations', 'Geo-Targeted Content'],
    colorName: 'Orange / Red',
    primaryColor: '#FF5E1E',
    secondaryColor: '#FF3366',
    borderHover: 'hover:border-[#FF5E1E]/80',
    bgGlow: 'from-[#FF5E1E]/15 to-[#FF3366]/5',
    icon: MapPin,
  },
  {
    id: 'meta-ad-run',
    number: '05',
    title: 'Meta Ad run',
    shortDesc: 'Precision customer acquisition on Instagram and Facebook with high ROAS.',
    capabilities: ['Direct Response Ads', 'Lookalike Audiences', 'Dynamic Retargeting', 'Video Ad Creatives', 'CBO Optimization'],
    colorName: 'Royal Blue / Cyan',
    primaryColor: '#0080FB',
    secondaryColor: '#00D2FF',
    borderHover: 'hover:border-[#0080FB]/80',
    bgGlow: 'from-[#0080FB]/15 to-[#00D2FF]/5',
    icon: Target,
  },
  {
    id: 'google-ad-run',
    number: '06',
    title: 'Google Ad run',
    shortDesc: 'Convert high-intent searchers at the exact moment they need your product.',
    capabilities: ['Search Ads', 'Performance Max (PMax)', 'YouTube Ads', 'Shopping Ads', 'High Intent Bidding'],
    colorName: 'Amber / Red',
    primaryColor: '#EA4335',
    secondaryColor: '#FBBC05',
    borderHover: 'hover:border-[#EA4335]/80',
    bgGlow: 'from-[#EA4335]/15 to-[#FBBC05]/5',
    icon: TrendingUp,
  },
  {
    id: 'geo-aeo',
    number: '07',
    title: 'GEO I AEO',
    shortDesc: 'Optimize for Generative Engine & Answer Engine Optimization (ChatGPT, Perplexity, Gemini).',
    capabilities: ['AI Answer Citations', 'Knowledge Graph Optimization', 'Entity SEO', 'LLM Search Visibility', 'Structured Data'],
    colorName: 'Violet / Cyan',
    primaryColor: '#7928CA',
    secondaryColor: '#00D2FF',
    borderHover: 'hover:border-[#7928CA]/80',
    bgGlow: 'from-[#7928CA]/15 to-[#00D2FF]/5',
    icon: Cpu,
  },
  {
    id: 'google-analytics',
    number: '08',
    title: 'Google Analytics',
    shortDesc: 'Full-funnel tracking, attribution models, and conversion intelligence with GA4.',
    capabilities: ['GA4 Deep Configuration', 'Google Tag Manager', 'Server-Side Tracking', 'Custom Dashboards', 'Conversion Attribution'],
    colorName: 'Amber / Orange',
    primaryColor: '#F59E0B',
    secondaryColor: '#FF5E1E',
    borderHover: 'hover:border-[#F59E0B]/80',
    bgGlow: 'from-[#F59E0B]/15 to-[#FF5E1E]/5',
    icon: BarChart3,
  },
];

export const DigitalGrowthEcosystem: React.FC<DigitalGrowthEcosystemProps> = ({
  onOpenProjectPlanner,
}) => {
  // Check reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Orbit rotation state (radians)
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredServiceIndex, setHoveredServiceIndex] = useState<number | null>(null);
  const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(null);
  const [servicePositions, setServicePositions] = useState<ServicePosition3D[]>([]);

  // Drag interaction for touch and mouse
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const currentAngleRef = useRef(0);

  // Maintain smooth continuous rotation using requestAnimationFrame
  useEffect(() => {
    if (reducedMotion) return;

    let lastTime = performance.now();
    let animId: number;

    const tick = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Orbit speed: complete 360 rotation in approx 32 seconds
      // When hovered, slow to gentle glide
      const speed = isHovered ? 0.025 : 0.18;

      if (!isDraggingRef.current) {
        currentAngleRef.current += speed * delta;
        setOrbitAngle(currentAngleRef.current);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isHovered, reducedMotion]);

  // Touch / Drag Handlers to allow manual spinning
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragDistanceRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const diff = e.clientX - dragStartXRef.current;
    dragStartXRef.current = e.clientX;
    dragDistanceRef.current += Math.abs(diff);
    currentAngleRef.current += diff * 0.005;
    setOrbitAngle(currentAngleRef.current);
  };

  const handlePointerUp = () => {
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 50);
  };

  const activeOrHoveredService = useMemo(() => {
    if (activeServiceIndex !== null) return ECOSYSTEM_SERVICES[activeServiceIndex];
    if (hoveredServiceIndex !== null) return ECOSYSTEM_SERVICES[hoveredServiceIndex];
    return null;
  }, [activeServiceIndex, hoveredServiceIndex]);

  return (
    <section
      id="services"
      className="relative min-h-[700px] lg:min-h-[780px] pt-16 sm:pt-24 pb-2 sm:pb-4 overflow-hidden bg-white selection:bg-[#0066FF] selection:text-white flex flex-col items-center"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #FFFFFF 0%, #F8FAFC 60%, #F1F5F9 100%)',
      }}
    >
      {/* 1. BACKGROUND BRAND WATERMARK & GRID PATTERN */}
      <div className="absolute inset-0 bg-grid-subtle opacity-60 pointer-events-none" />

      {/* Giant subtle CRIVORRA 'C' Emblem Watermark in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] sm:w-[1100px] h-[850px] sm:h-[1100px] opacity-[0.025] pointer-events-none select-none">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path
            d="M 80 15 C 40 10, 10 35, 10 60 C 10 85, 45 95, 80 85"
            stroke="#0066FF"
            strokeWidth="16"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Soft radial aura highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#0066FF]/6 via-[#00D2FF]/4 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-gradient-to-tl from-[#7928CA]/5 via-[#FF0080]/3 to-transparent blur-3xl pointer-events-none" />

      {/* 2. SECTION HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center mb-2 sm:mb-4">
        {/* Main Heading in Theme Gradient */}
        <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15]">
          <span className="crivorra-gradient-vibrant inline-block pb-1">
            Explore Our Services
          </span>
        </h2>
      </div>

      {/* 3. RESPONSIVE 3D ECOSYSTEM (Unified across Mobile, Tablet, and Desktop) */}
      <div
        className="flex relative w-full max-w-7xl mx-auto h-[480px] sm:h-[560px] md:h-[640px] lg:h-[720px] items-center justify-center select-none touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* THREE.JS WebGL Background: Orbit rings, animated connection lines & energy particles */}
        <EcosystemCanvas
          orbitRotation={orbitAngle}
          hoveredServiceIndex={hoveredServiceIndex}
          activeServiceIndex={activeServiceIndex}
          onPositionsUpdate={setServicePositions}
          reducedMotion={reducedMotion}
        />

        {/* ========================================================================= */}
        {/* CENTRAL CRIVORRA CORE (Fixed center intelligence hub, z-index 20) */}
        {/* ========================================================================= */}
        <div
          className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto w-[140px] h-[140px] sm:w-[195px] sm:h-[195px] md:w-[245px] md:h-[245px] lg:w-[295px] lg:h-[295px] xl:w-[320px] xl:h-[320px]"
        >
          {/* Subtle pulsating outer halo */}
          <div
            className={`absolute inset-0 rounded-full blur-2xl transition-all duration-700 ${
              activeOrHoveredService
                ? 'opacity-80 scale-110'
                : 'opacity-40 scale-100'
            }`}
            style={{
              background: activeOrHoveredService
                ? `radial-gradient(circle, ${activeOrHoveredService.primaryColor} 0%, ${activeOrHoveredService.secondaryColor} 60%, transparent 85%)`
                : 'radial-gradient(circle, rgba(0,102,255,0.4) 0%, rgba(0,210,255,0.2) 50%, transparent 80%)',
            }}
          />

          {/* Rotating outer orbital track */}
          <div
            className="absolute -inset-2 sm:-inset-3 md:-inset-3.5 rounded-full border border-dashed border-[#0066FF]/25 animate-[spin_40s_linear_infinite] pointer-events-none"
            style={{ animationDuration: isHovered ? '80s' : '40s' }}
          />
          <div
            className="absolute -inset-4 sm:-inset-5 md:-inset-7 rounded-full border border-[#7928CA]/15 animate-[spin_60s_linear_infinite_reverse] pointer-events-none"
            style={{ animationDuration: isHovered ? '110s' : '60s' }}
          />

          {/* Central Glass Orb Structure with Large Brand Logo */}
          <div
            className="relative w-full h-full rounded-full bg-white/95 backdrop-blur-xl border border-white shadow-2xl shadow-blue-900/10 p-2 sm:p-3 md:p-4 flex flex-col items-center justify-center text-center transition-all duration-500 hover:shadow-blue-500/20"
            style={{
              boxShadow: activeOrHoveredService
                ? `0 20px 50px -10px ${activeOrHoveredService.primaryColor}30, 0 0 35px -5px ${activeOrHoveredService.secondaryColor}25, inset 0 1px 2px rgba(255,255,255,0.9)`
                : '0 20px 50px -10px rgba(0,102,255,0.15), 0 0 30px -5px rgba(0,210,255,0.15), inset 0 1px 2px rgba(255,255,255,0.9)',
            }}
          >
            {/* Center Official CRIVORRA Brand Logo (Enlarged across all screens) */}
            <div className="w-full h-full flex items-center justify-center transition-transform duration-300 transform group-hover:scale-105">
              <BrandLogo
                size="xl"
                imgClassName="w-[96px] sm:w-[138px] md:w-[175px] lg:w-[215px] xl:w-[235px] max-w-[78%] max-h-[78%] h-auto object-contain"
                className="w-full items-center justify-center text-center"
                showTagline={false}
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 8 FLOATING 3D ORBITING SERVICE NODES */}
        {/* Calculated via 3D projection, depth-sorted with z-indices 10 and 30 */}
        {/* ========================================================================= */}
        {ECOSYSTEM_SERVICES.map((service, index) => {
          const pos = servicePositions[index];
          const isCurrentHovered = hoveredServiceIndex === index;
          const isCurrentActive = activeServiceIndex === index;
          const isDimmed =
            (hoveredServiceIndex !== null && !isCurrentHovered) ||
            (activeServiceIndex !== null && !isCurrentActive);

          // If positions are not yet calculated on initial frame, provide fallback circular layout
          const fallbackAngle = (index * (Math.PI * 2)) / 8 + orbitAngle;
          const fallbackX = 350 + Math.cos(fallbackAngle) * 260;
          const fallbackY = 300 + Math.sin(fallbackAngle) * 140;

          const screenX = pos ? pos.screenX : fallbackX;
          const screenY = pos ? pos.screenY : fallbackY;
          const depthScale = pos ? pos.scale : 1;
          const depthOpacity = pos ? pos.opacity : 1;
          const zIndex = isCurrentHovered || isCurrentActive ? 50 : pos ? pos.zIndex : 25;

          const IconComponent = service.icon;

          return (
            <div
              key={service.id}
              id={`service-node-${service.id}`}
              className="absolute pointer-events-auto transition-transform duration-200"
              style={{
                left: `${screenX}px`,
                top: `${screenY}px`,
                transform: `translate(-50%, -50%) scale(${
                  isCurrentHovered ? depthScale * 1.18 : depthScale
                })`,
                opacity: isDimmed ? 0.35 : depthOpacity,
                zIndex: zIndex,
                transition: isDraggingRef.current
                  ? 'none'
                  : 'opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={() => {
                setIsHovered(true);
                setHoveredServiceIndex(index);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                setHoveredServiceIndex(null);
              }}
              onClick={() => {
                // Ignore accidental tap if user was dragging to spin
                if (dragDistanceRef.current > 8) return;
                setActiveServiceIndex(activeServiceIndex === index ? null : index);
              }}
              tabIndex={0}
              role="button"
              aria-label={`${service.number} ${service.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveServiceIndex(activeServiceIndex === index ? null : index);
                }
              }}
            >
              {/* Circular Box Node (Responsive from Mobile to Desktop) */}
              <div
                className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-34 lg:h-34 xl:w-38 xl:h-38 rounded-full p-1.5 sm:p-2 md:p-2.5 flex flex-col items-center justify-center text-center cursor-pointer group select-none shadow-md backdrop-blur-xl transition-all duration-300 ${
                  isCurrentHovered || isCurrentActive
                    ? 'bg-white shadow-xl ring-2 scale-105'
                    : 'bg-white/95 hover:bg-white border hover:border-slate-300'
                }`}
                style={{
                  boxShadow:
                    isCurrentHovered || isCurrentActive
                      ? `0 14px 30px -6px ${service.primaryColor}35, 0 0 16px -2px ${service.secondaryColor}25`
                      : '0 6px 20px -4px rgba(15, 23, 42, 0.08)',
                  borderColor:
                    isCurrentHovered || isCurrentActive
                      ? service.secondaryColor
                      : 'rgba(226, 232, 240, 0.85)',
                }}
              >
                {/* Ambient subtle glow inside the circle */}
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-b ${service.bgGlow} transition-opacity duration-300 pointer-events-none ${
                    isCurrentHovered || isCurrentActive ? 'opacity-100' : 'opacity-30'
                  }`}
                />

                {/* Icon in circular colored container */}
                <div
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center text-white shadow-xs transition-transform duration-300 group-hover:scale-110 mb-0.5 sm:mb-1 md:mb-1.5"
                  style={{
                    background: `linear-gradient(135deg, ${service.primaryColor}, ${service.secondaryColor})`,
                  }}
                >
                  <IconComponent className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5 text-white" />
                </div>

                {/* Service Name in Circular Box (Enlarged Outfit Display Typography) */}
                <span className="font-display font-black text-[9px] sm:text-[10.5px] md:text-[12px] lg:text-[14px] xl:text-[15px] leading-[1.12] text-[#0A0F1D] tracking-tight group-hover:text-[#0066FF] transition-colors max-w-[65px] sm:max-w-[80px] md:max-w-[98px] lg:max-w-[120px] line-clamp-2">
                  {service.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. INTERACTIVE SERVICE DETAILS TRAY & EXPLORATION HINT (Mobile & Desktop) */}
      <div className="w-full max-w-2xl mx-auto px-4 z-20 mt-2 sm:mt-3 min-h-[68px] flex items-center justify-center">
        {activeOrHoveredService ? (
          <div
            className="w-full rounded-2xl bg-white/95 border border-slate-200/90 shadow-lg shadow-slate-200/50 p-3 sm:p-4 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 transition-all duration-300"
            style={{
              borderLeftColor: activeOrHoveredService.primaryColor,
              borderLeftWidth: '4px',
            }}
          >
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
                style={{
                  background: `linear-gradient(135deg, ${activeOrHoveredService.primaryColor}, ${activeOrHoveredService.secondaryColor})`,
                }}
              >
                {React.createElement(activeOrHoveredService.icon, {
                  className: 'w-4 h-4 sm:w-5 sm:h-5 text-white',
                })}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono-code text-[11px] font-bold"
                    style={{ color: activeOrHoveredService.primaryColor }}
                  >
                    {activeOrHoveredService.number}
                  </span>
                  <span className="font-display font-bold text-sm sm:text-base text-[#0A0F1D] truncate">
                    {activeOrHoveredService.title}
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1 sm:line-clamp-2">
                  {activeOrHoveredService.shortDesc}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
              {onOpenProjectPlanner && (
                <button
                  type="button"
                  onClick={onOpenProjectPlanner}
                  className="px-3.5 py-1.5 rounded-xl bg-[#0A0F1D] text-white text-xs font-bold hover:bg-[#0066FF] transition-colors shadow-xs cursor-pointer"
                >
                  Plan Service
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setActiveServiceIndex(null);
                  setHoveredServiceIndex(null);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <span className="text-xs font-bold">✕</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 border border-slate-200/80 text-slate-500 text-xs font-medium shadow-2xs backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
            <span>Drag to rotate 3D ecosystem • Tap any service to explore</span>
          </div>
        )}
      </div>
    </section>
  );
};
