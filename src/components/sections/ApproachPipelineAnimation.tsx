import React, { useState, useEffect, useRef } from 'react';
import { Step3DCanvas } from '../3d/Step3DCanvas';

export interface PipelineStep {
  id: string;
  number: string;
  name: string;
  color: string;
  glowColor: string;
  bgLight: string;
}

export const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: 'discover',
    number: '01',
    name: 'DISCOVER',
    color: '#0066FF',
    glowColor: 'rgba(0, 102, 255, 0.45)',
    bgLight: '#EFF6FF',
  },
  {
    id: 'analysis',
    number: '02',
    name: 'ANALYSIS',
    color: '#7928CA',
    glowColor: 'rgba(121, 40, 202, 0.45)',
    bgLight: '#FAF5FF',
  },
  {
    id: 'design',
    number: '03',
    name: 'DESIGN & DRAFTING',
    color: '#D946EF',
    glowColor: 'rgba(217, 70, 239, 0.45)',
    bgLight: '#FDF4FF',
  },
  {
    id: 'execution',
    number: '04',
    name: 'EXECUTION',
    color: '#0EA5E9',
    glowColor: 'rgba(14, 165, 233, 0.45)',
    bgLight: '#F0F9FF',
  },
  {
    id: 'analytics',
    number: '05',
    name: 'ANALYTICS',
    color: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    bgLight: '#FFFBEB',
  },
  {
    id: 'growth',
    number: '06',
    name: 'GROWTH',
    color: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    bgLight: '#ECFDF5',
  },
];

interface ApproachPipelineAnimationProps {
  onOpenProjectPlanner?: () => void;
}

export const ApproachPipelineAnimation: React.FC<ApproachPipelineAnimationProps> = ({
  onOpenProjectPlanner,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [hoveredStepIndex, setHoveredStepIndex] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Automatic sequential light-up loop: 01 -> 02 -> 03 -> 04 -> 05 -> 06 -> repeat
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % PIPELINE_STEPS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, activeStepIndex]);

  const activeStep = PIPELINE_STEPS[activeStepIndex];

  return (
    <div
      className="relative w-full max-w-7xl mx-auto"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Soft Studio Ambient Glow matching active step */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-1000 opacity-20 -z-10"
        style={{
          background: `radial-gradient(circle, ${activeStep.color} 0%, transparent 70%)`,
        }}
      />

      {/* Main Framework Shell for the 6 Steps */}
      <div className="relative rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-2xl shadow-slate-200/50 p-6 sm:p-8 lg:p-10">
        
        {/* 
          =======================================================
          SIX STEPS CONNECTED IN ONE ROW (Desktop: 6 items in 1 row)
          MOBILE MENU / SCREENS: Row wraps after TWO steps (grid-cols-2)
          =======================================================
        */}
        <div className="relative my-2 sm:my-4">
          
          {/* DESKTOP CONNECTING CONDUIT (Behind the nodes in 1 row) */}
          <div className="hidden lg:block absolute top-[94px] left-[7%] right-[7%] h-[4px] bg-slate-100 rounded-full z-0 pointer-events-none">
            {/* Background glowing baseline */}
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${(activeStepIndex / 5) * 100}%`,
                background: 'linear-gradient(90deg, #0066FF 0%, #7928CA 20%, #D946EF 40%, #0EA5E9 60%, #F59E0B 80%, #10B981 100%)',
                boxShadow: `0 0 16px ${activeStep.glowColor}`,
              }}
            />
            {/* Moving Laser Energy Particle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full transition-all duration-700 ease-out flex items-center justify-center"
              style={{
                left: `calc(${(activeStepIndex / 5) * 100}% - 10px)`,
                backgroundColor: activeStep.color,
                boxShadow: `0 0 20px ${activeStep.color}, 0 0 40px ${activeStep.color}`,
              }}
            >
              <div className="w-2 h-2 rounded-full bg-white animate-ping" />
            </div>
          </div>

          {/* 
            GRID STRUCTURE:
            Mobile: grid-cols-2 (wraps after TWO steps)
            Tablet: md:grid-cols-3
            Desktop: lg:grid-cols-6 (CONNECTED IN ONE ROW)
          */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 relative z-10">
            {PIPELINE_STEPS.map((step, index) => {
              const isActive = index === activeStepIndex;
              const isPast = index < activeStepIndex;
              const isHovered = index === hoveredStepIndex;

              return (
                <div
                  key={step.id}
                  onClick={() => {
                    setActiveStepIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  onMouseEnter={() => setHoveredStepIndex(index)}
                  onMouseLeave={() => setHoveredStepIndex(null)}
                  className={`group relative flex flex-col items-center cursor-pointer transition-all duration-500 rounded-2xl p-4 sm:p-5 text-center select-none ${
                    isActive
                      ? 'bg-white shadow-2xl scale-105 sm:scale-108 -translate-y-2 ring-2 ring-offset-2 ring-offset-white z-20'
                      : 'bg-white/80 hover:bg-white hover:shadow-lg border border-slate-100 hover:border-slate-200 z-10'
                  }`}
                  style={{
                    borderColor: isActive ? step.color : undefined,
                    boxShadow: isActive
                      ? `0 20px 40px -10px ${step.glowColor}, 0 0 0 1px ${step.color}`
                      : undefined,
                  }}
                >
                  {/* MOBILE INTER-STEP CONDUIT: Connects pair 01->02, 03->04, 05->06 */}
                  {index % 2 === 0 && (
                    <div className="lg:hidden absolute top-[94px] -right-4 -translate-y-1/2 w-8 h-[3px] bg-slate-200 pointer-events-none z-0">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: (isActive || isPast) ? '100%' : '0%',
                          backgroundColor: step.color,
                          boxShadow: isActive ? `0 0 10px ${step.color}` : undefined,
                        }}
                      />
                    </div>
                  )}

                  {/* MOBILE WRAP CONDUIT: Vertical drop connector between Row 1 (02) -> Row 2 (03), and Row 2 (04) -> Row 3 (05) */}
                  {(index === 1 || index === 3) && (
                    <div className="lg:hidden absolute -bottom-5 left-1/2 -translate-x-1/2 w-[3px] h-5 bg-slate-200 pointer-events-none z-0">
                      <div
                        className="w-full transition-all duration-500"
                        style={{
                          height: (isPast || isActive) ? '100%' : '0%',
                          backgroundColor: step.color,
                        }}
                      />
                    </div>
                  )}

                  {/* STEP NUMBER PILL */}
                  <div
                    className={`font-mono text-[11px] sm:text-xs font-black tracking-widest px-3 py-1 rounded-full mb-2.5 transition-all duration-300 ${
                      isActive
                        ? 'text-white shadow-md'
                        : isPast
                        ? 'text-slate-800 bg-slate-100'
                        : 'text-slate-400 bg-slate-50 group-hover:text-slate-700'
                    }`}
                    style={{
                      backgroundColor: isActive ? step.color : undefined,
                      boxShadow: isActive ? `0 4px 12px ${step.glowColor}` : undefined,
                    }}
                  >
                    {step.number}
                  </div>

                  {/* 3D ANIMATED STEP POD (Interactive Three.js Canvas) */}
                  <div className="relative mb-2.5 flex items-center justify-center">
                    {/* Concentric Ambient Ring Pulse on Active */}
                    {isActive && (
                      <div
                        className="absolute -inset-1.5 rounded-2xl animate-ping opacity-25"
                        style={{ backgroundColor: step.color }}
                      />
                    )}

                    {/* 3D Canvas Container */}
                    <div
                      className={`w-20 h-20 sm:w-22 sm:h-22 rounded-2xl flex items-center justify-center transition-all duration-500 overflow-hidden ${
                        isActive
                          ? 'shadow-lg scale-105'
                          : 'border border-slate-200/80 bg-slate-50/60 group-hover:border-slate-300 group-hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: isActive ? step.bgLight : undefined,
                        border: isActive ? `2px solid ${step.color}` : undefined,
                        boxShadow: isActive ? `0 0 25px ${step.glowColor}` : undefined,
                      }}
                    >
                      {/* REAL 3D ANIMATED OBJECT */}
                      <Step3DCanvas
                        stepIndex={index}
                        color={step.color}
                        glowColor={step.glowColor}
                        isActive={isActive}
                        isHovered={isHovered}
                      />
                    </div>
                  </div>

                  {/* STEP NAME */}
                  <h3
                    className={`text-[11px] sm:text-xs lg:text-xs font-black tracking-wider uppercase transition-colors duration-300 min-h-[28px] sm:min-h-[32px] flex items-center justify-center leading-tight ${
                      isActive ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'
                    }`}
                  >
                    {step.name}
                  </h3>

                  {/* ACTIVE BOTTOM GLOW BAR */}
                  <div
                    className={`w-10 h-1 rounded-full mt-3 transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    }`}
                    style={{
                      backgroundColor: step.color,
                      boxShadow: `0 0 10px ${step.color}`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
