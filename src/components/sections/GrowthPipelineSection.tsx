import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import {
  GrowthPipelineCanvas,
  PIPELINE_STAGES,
  PipelineStageData,
} from '../3d/GrowthPipelineCanvas';

export const GrowthPipelineSection: React.FC<{
  onOpenProjectPlanner?: () => void;
}> = ({ onOpenProjectPlanner }) => {
  const [selectedStage, setSelectedStage] = useState<PipelineStageData>(
    PIPELINE_STAGES[0]
  );

  return (
    <section
      id="approach"
      className="relative py-16 sm:py-24 lg:py-28 bg-[#FCFCFD] overflow-hidden text-[#0A0F1D] border-t border-slate-200/80"
    >
      {/* Background Soft Gradients & Studio Ambient Glow (No dark background) */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[28rem] h-[28rem] rounded-full bg-purple-100/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full bg-orange-100/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Minimalist Keynote Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200/90 shadow-xs text-[#0066FF] text-xs font-mono-code font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
            <span>OUR APPROACH</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#0A0F1D] leading-[1.08]">
            From Visibility to{' '}
            <span className="bg-gradient-to-r from-[#0066FF] via-[#7928CA] to-[#FF0080] bg-clip-text text-transparent">
              Growth
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-500 font-medium max-w-xl mx-auto">
            A continuous, closed-loop 3D digital pipeline transforming market presence into compounding enterprise revenue.
          </p>
        </div>
      </div>
    </section>
  );
};
