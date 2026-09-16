import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Globe,
  Target,
  Share2,
  PenTool,
  Mail,
  TrendingUp,
  Sliders,
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
    id: 'seo-ai',
    number: '01',
    title: 'SEO & AI VISIBILITY',
    shortDesc: 'Get discovered across search engines, maps and AI-powered platforms.',
    capabilities: ['SEO', 'AEO', 'GEO', 'Local SEO', 'Google Business Profile'],
    colorName: 'Blue / Cyan',
    primaryColor: '#0066FF',
    secondaryColor: '#00D2FF',
    borderHover: 'hover:border-[#00D2FF]/80',
    bgGlow: 'from-[#0066FF]/15 to-[#00D2FF]/5',
    icon: Globe,
  },
  {
    id: 'paid-ads',
    number: '02',
    title: 'PAID ADVERTISING',
    shortDesc: 'Reach the right audience and turn attention into measurable growth.',
    capabilities: ['Google Ads', 'Meta Ads', 'YouTube Ads', 'Remarketing', 'Campaign Optimization'],
    colorName: 'Orange / Red',
    primaryColor: '#FF5E1E',
    secondaryColor: '#FF3366',
    borderHover: 'hover:border-[#FF5E1E]/80',
    bgGlow: 'from-[#FF5E1E]/15 to-[#FF3366]/5',
    icon: Target,
  },
  {
    id: 'social-media',
    number: '03',
    title: 'SOCIAL MEDIA MANAGEMENT',
    shortDesc: 'Build an active social presence that creates attention and trust.',
    capabilities: ['Strategy', 'Content', 'Creative', 'Community', 'Engagement'],
    colorName: 'Violet / Magenta',
    primaryColor: '#7928CA',
    secondaryColor: '#FF0080',
    borderHover: 'hover:border-[#FF0080]/80',
    bgGlow: 'from-[#7928CA]/15 to-[#FF0080]/5',
    icon: Share2,
  },
  {
    id: 'content-marketing',
    number: '04',
    title: 'CONTENT MARKETING',
    shortDesc: 'Create content that educates, engages and moves customers forward.',
    capabilities: ['Content Strategy', 'Copywriting', 'Visual Content', 'Video', 'Distribution'],
    colorName: 'Royal Blue',
    primaryColor: '#0066FF',
    secondaryColor: '#2563EB',
    borderHover: 'hover:border-[#0066FF]/80',
    bgGlow: 'from-[#0066FF]/15 to-[#2563EB]/5',
    icon: PenTool,
  },
  {
    id: 'email-marketing',
    number: '05',
    title: 'EMAIL MARKETING',
    shortDesc: 'Build relationships and turn leads into long-term customers.',
    capabilities: ['Campaigns', 'Automation', 'Lead Nurturing', 'Personalization', 'Retention'],
    colorName: 'Orange / Amber',
    primaryColor: '#FF5E1E',
    secondaryColor: '#F59E0B',
    borderHover: 'hover:border-[#F59E0B]/80',
    bgGlow: 'from-[#FF5E1E]/15 to-[#F59E0B]/5',
    icon: Mail,
  },
  {
    id: 'lead-generation',
    number: '06',
    title: 'LEAD GENERATION',
    shortDesc: 'Build predictable systems for attracting and nurturing qualified leads.',
    capabilities: ['Lead Campaigns', 'Landing Pages', 'Lead Funnels', 'Lead Nurturing', 'CRM Integration'],
    colorName: 'Pink / Violet',
    primaryColor: '#EC4899',
    secondaryColor: '#8B5CF6',
    borderHover: 'hover:border-[#EC4899]/80',
    bgGlow: 'from-[#EC4899]/15 to-[#8B5CF6]/5',
    icon: TrendingUp,
  },
  {
    id: 'conversion-cro',
    number: '07',
    title: 'CONVERSION OPTIMIZATION',
    shortDesc: 'Turn more visitors into customers through smarter experiences.',
    capabilities: ['CRO', 'A/B Testing', 'UX Optimization', 'Landing Pages', 'Conversion Tracking'],
    colorName: 'Cyan / Blue',
    primaryColor: '#0066FF',
    secondaryColor: '#06B6D4',
    borderHover: 'hover:border-[#06B6D4]/80',
    bgGlow: 'from-[#0066FF]/15 to-[#06B6D4]/5',
    icon: Sliders,
  },
  {
    id: 'analytics-tracking',
    number: '08',
    title: 'ANALYTICS & TRACKING',
    shortDesc: 'Measure what matters and use data to make better growth decisions.',
    capabilities: ['GA4', 'Search Console', 'Tag Manager', 'Looker Studio', 'Attribution'],
    colorName: 'Purple / Indigo',
    primaryColor: '#7928CA',
    secondaryColor: '#6366F1',
    borderHover: 'hover:border-[#7928CA]/80',
    bgGlow: 'from-[#7928CA]/15 to-[#6366F1]/5',
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
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const diff = e.clientX - dragStartXRef.current;
    dragStartXRef.current = e.clientX;
    currentAngleRef.current += diff * 0.005;
    setOrbitAngle(currentAngleRef.current);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
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

      {/* 3. 3D SOLAR SYSTEM CONTAINER */}
      <div
        className="relative w-full max-w-7xl mx-auto h-[580px] sm:h-[680px] lg:h-[720px] flex items-center justify-center select-none"
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
          className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          style={{ width: '280px', height: '280px' }}
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
            className="absolute -inset-3 rounded-full border border-dashed border-[#0066FF]/25 animate-[spin_40s_linear_infinite] pointer-events-none"
            style={{ animationDuration: isHovered ? '80s' : '40s' }}
          />
          <div
            className="absolute -inset-8 rounded-full border border-[#7928CA]/15 animate-[spin_60s_linear_infinite_reverse] pointer-events-none"
            style={{ animationDuration: isHovered ? '110s' : '60s' }}
          />

          {/* Central Glass Orb Structure */}
          <div
            className="relative w-full h-full rounded-full bg-white/85 backdrop-blur-xl border border-white/90 shadow-2xl shadow-blue-900/10 p-6 flex flex-col items-center justify-center text-center transition-all duration-500 hover:shadow-blue-500/20"
            style={{
              boxShadow: activeOrHoveredService
                ? `0 20px 50px -10px ${activeOrHoveredService.primaryColor}30, 0 0 35px -5px ${activeOrHoveredService.secondaryColor}25, inset 0 1px 2px rgba(255,255,255,0.9)`
                : '0 20px 50px -10px rgba(0,102,255,0.15), 0 0 30px -5px rgba(0,210,255,0.15), inset 0 1px 2px rgba(255,255,255,0.9)',
            }}
          >
            {/* Center Official CRIVORRA Brand Logo */}
            <div className="transition-transform duration-300 transform group-hover:scale-105 flex flex-col items-center justify-center">
              <BrandLogo size="lg" className="items-center text-center" showTagline={false} />
            </div>

            {/* Central Status Indicator */}
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/80">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{
                  backgroundColor: activeOrHoveredService
                    ? activeOrHoveredService.primaryColor
                    : '#0066FF',
                }}
              />
              <span className="font-mono-code text-[9px] uppercase font-bold tracking-widest text-slate-700">
                {activeOrHoveredService
                  ? `ACTIVATING: ${activeOrHoveredService.title.split(' ')[0]}`
                  : 'GROWTH ENGINE ACTIVE'}
              </span>
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
          const fallbackX = 450 + Math.cos(fallbackAngle) * 320;
          const fallbackY = 320 + Math.sin(fallbackAngle) * 160;

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
              {/* Circular Box Node */}
              <div
                className={`relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full p-2 flex flex-col items-center justify-center text-center cursor-pointer group select-none shadow-md backdrop-blur-xl transition-all duration-300 ${
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

                {/* Service Number Tag at top */}
                <span className="font-mono-code text-[9px] sm:text-[10px] font-extrabold text-slate-400 leading-none mb-1">
                  {service.number}
                </span>

                {/* Icon in mini circular colored container */}
                <div
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white shadow-xs transition-transform duration-300 group-hover:scale-110 mb-1"
                  style={{
                    background: `linear-gradient(135deg, ${service.primaryColor}, ${service.secondaryColor})`,
                  }}
                >
                  <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </div>

                {/* Service Name in Circular Box */}
                <span className="font-display font-extrabold text-[9px] sm:text-[10px] md:text-[11px] leading-[1.15] text-[#0A0F1D] tracking-tight group-hover:text-[#0066FF] transition-colors max-w-[85px] sm:max-w-[95px] line-clamp-2">
                  {service.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
