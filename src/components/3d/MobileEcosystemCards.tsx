import React, { useState, useEffect } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { EcosystemServiceItem } from '../sections/DigitalGrowthEcosystem';

interface MobileEcosystemCardsProps {
  services: EcosystemServiceItem[];
}

export const MobileEcosystemCards: React.FC<MobileEcosystemCardsProps> = ({
  services,
}) => {
  // Batch 0 = Services 1, 2, 3, 4 (indices 0..3)
  // Batch 1 = Services 5, 6, 7, 8 (indices 4..7)
  const [activeBatch, setActiveBatch] = useState<0 | 1>(0);

  // Auto flip every 6 seconds (6000ms) smoothly without cluttered UI details
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBatch((prev) => (prev === 0 ? 1 : 0));
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  // Card slots mapping:
  // Slot 0 (Top-Left): Front = Service 0, Back = Service 4
  // Slot 1 (Top-Right): Front = Service 1, Back = Service 5
  // Slot 2 (Bottom-Left): Front = Service 2, Back = Service 6
  // Slot 3 (Bottom-Right): Front = Service 3, Back = Service 7
  const slots = [
    { frontIndex: 0, backIndex: 4, label: 'TOP-LEFT', delay: 0 },
    { frontIndex: 1, backIndex: 5, label: 'TOP-RIGHT', delay: 80 },
    { frontIndex: 2, backIndex: 6, label: 'BOTTOM-LEFT', delay: 160 },
    { frontIndex: 3, backIndex: 7, label: 'BOTTOM-RIGHT', delay: 240 },
  ];

  const isFlipped = activeBatch === 1;

  return (
    <div className="w-full max-w-lg mx-auto px-2 py-2 flex flex-col items-center select-none">
      {/* 3D Container with Central Brand Hub & 4 Rectangular Flipping Cards */}
      <div className="relative w-full min-h-[440px] flex flex-col justify-between items-center py-2">
        {/* SVG Dynamic Connectors from Central Logo Hub to the 4 Cards */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="beamGrad1" x1="50%" y1="50%" x2="25%" y2="15%">
              <stop offset="0%" stopColor="#0066FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0066FF" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="beamGrad2" x1="50%" y1="50%" x2="75%" y2="15%">
              <stop offset="0%" stopColor="#7928CA" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7928CA" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="beamGrad3" x1="50%" y1="50%" x2="25%" y2="85%">
              <stop offset="0%" stopColor="#FF0080" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF0080" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="beamGrad4" x1="50%" y1="50%" x2="75%" y2="85%">
              <stop offset="0%" stopColor="#FF5E1E" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF5E1E" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Connection Lines from Center (50%, 50%) to 4 card positions */}
          <line
            x1="50%"
            y1="50%"
            x2="25%"
            y2="18%"
            stroke="url(#beamGrad1)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
          <line
            x1="50%"
            y1="50%"
            x2="75%"
            y2="18%"
            stroke="url(#beamGrad2)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
          <line
            x1="50%"
            y1="50%"
            x2="25%"
            y2="82%"
            stroke="url(#beamGrad3)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
          <line
            x1="50%"
            y1="50%"
            x2="75%"
            y2="82%"
            stroke="url(#beamGrad4)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
        </svg>

        {/* TWO CARDS ABOVE LOGO (Top Row) */}
        <div className="grid grid-cols-2 gap-3 xs:gap-4 w-full relative z-10 mb-4">
          <FlipCard
            frontService={services[slots[0].frontIndex]}
            backService={services[slots[0].backIndex]}
            isFlipped={isFlipped}
            delay={slots[0].delay}
          />
          <FlipCard
            frontService={services[slots[1].frontIndex]}
            backService={services[slots[1].backIndex]}
            isFlipped={isFlipped}
            delay={slots[1].delay}
          />
        </div>

        {/* CENTER BRAND LOGO HUB (Significantly Increased Logo Size) */}
        <div className="relative z-20 my-2 flex flex-col items-center justify-center">
          {/* Outer Pulsing Glow Aura */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#0066FF]/25 via-[#7928CA]/25 to-[#FF0080]/25 blur-xl animate-pulse pointer-events-none" />

          {/* Rotating Orbital Track */}
          <div className="absolute -inset-3.5 rounded-full border border-dashed border-[#0066FF]/35 animate-[spin_25s_linear_infinite] pointer-events-none" />

          {/* Center Circular/Oval Hub Container with Enlarged Logo */}
          <div className="relative px-7 py-5 xs:px-9 xs:py-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-white shadow-xl shadow-blue-900/10 flex flex-col items-center justify-center text-center">
            <BrandLogo
              size="xl"
              imgClassName="h-16 xs:h-20 sm:h-24 w-auto max-w-[210px] xs:max-w-[260px]"
              className="items-center text-center"
              showTagline={false}
            />
          </div>
        </div>

        {/* TWO CARDS BELOW LOGO (Bottom Row) */}
        <div className="grid grid-cols-2 gap-3 xs:gap-4 w-full relative z-10 mt-4">
          <FlipCard
            frontService={services[slots[2].frontIndex]}
            backService={services[slots[2].backIndex]}
            isFlipped={isFlipped}
            delay={slots[2].delay}
          />
          <FlipCard
            frontService={services[slots[3].frontIndex]}
            backService={services[slots[3].backIndex]}
            isFlipped={isFlipped}
            delay={slots[3].delay}
          />
        </div>
      </div>
    </div>
  );
};

interface FlipCardProps {
  frontService?: EcosystemServiceItem;
  backService?: EcosystemServiceItem;
  isFlipped: boolean;
  delay: number;
}

const FlipCard: React.FC<FlipCardProps> = ({
  frontService,
  backService,
  isFlipped,
  delay,
}) => {
  if (!frontService || !backService) return null;

  return (
    <div
      className="w-full h-[120px] xs:h-[128px] select-none"
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transitionDelay: `${delay}ms`,
        }}
      >
        {/* FRONT FACE */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md p-3 flex flex-col justify-between"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* Card Header: Service Icon (Number badge removed) */}
          <div className="flex items-center justify-start">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-xs"
              style={{
                background: `linear-gradient(135deg, ${frontService.primaryColor}, ${frontService.secondaryColor})`,
              }}
            >
              <frontService.icon className="w-4 h-4" />
            </div>
          </div>

          {/* Card Body: Service Title in bold display font */}
          <div className="my-auto py-1">
            <h3 className="font-display font-black text-[13.5px] xs:text-[15px] text-slate-900 leading-snug tracking-tight line-clamp-2">
              {frontService.title}
            </h3>
          </div>
        </div>

        {/* BACK FACE (Rotated 180deg) */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md p-3 flex flex-col justify-between"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Card Header: Service Icon (Number badge removed) */}
          <div className="flex items-center justify-start">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-xs"
              style={{
                background: `linear-gradient(135deg, ${backService.primaryColor}, ${backService.secondaryColor})`,
              }}
            >
              <backService.icon className="w-4 h-4" />
            </div>
          </div>

          {/* Card Body: Service Title in bold display font */}
          <div className="my-auto py-1">
            <h3 className="font-display font-black text-[13.5px] xs:text-[15px] text-slate-900 leading-snug tracking-tight line-clamp-2">
              {backService.title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
