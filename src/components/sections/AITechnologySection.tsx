import React, { useState } from 'react';
import { AICoreCanvas } from '../3d/AICoreCanvas';

export const AITechnologySection: React.FC<{ onOpenProjectPlanner?: () => void }> = () => {
  const [selectedNode, setSelectedNode] = useState<string>('AI');

  return (
    <section id="technology" className="py-0 bg-[#070B19] text-white relative overflow-hidden bg-grid-dark">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-[#0066FF]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-[#7928CA]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 3D AI Core Canvas Container */}
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent">
          <AICoreCanvas activeNode={selectedNode} onNodeSelect={(node) => setSelectedNode(node)} />
        </div>
      </div>
    </section>
  );
};

