import React from 'react';
import { ApproachPipelineAnimation } from './ApproachPipelineAnimation';
import { Sparkles } from 'lucide-react';

interface OurApproachSectionProps {
  onOpenProjectPlanner?: () => void;
}

export const OurApproachSection: React.FC<OurApproachSectionProps> = ({
  onOpenProjectPlanner,
}) => {
  return (
    <section
      id="approach"
      className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9] select-none"
    >
      {/* Background Soft Studio Ambient Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-400/5 via-cyan-300/6 to-purple-400/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Clean, Bold Main Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700">
              Systematic Execution Engine
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 uppercase">
            OUR{' '}
            <span className="bg-gradient-to-r from-[#FF4500] via-[#FF0080] via-[#7928CA] to-[#00D2FF] bg-clip-text text-transparent">
              APPROACH
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Six interconnected engineering stages executing in synchronization to accelerate growth, acquisition, and compounding valuation.
          </p>
        </div>

        {/* 3D Animated Six Steps Connected Pipeline */}
        <ApproachPipelineAnimation onOpenProjectPlanner={onOpenProjectPlanner} />
      </div>
    </section>
  );
};
