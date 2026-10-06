import React from 'react';

interface MechanismCardProps {
  title: string;
  reactionEquation: string;
  simpleExplanation: string;
  molecularExplanation: string;
  relatedConcepts: string[];
}

export const MechanismCard: React.FC<MechanismCardProps> = ({
  title,
  reactionEquation,
  simpleExplanation,
  molecularExplanation,
  relatedConcepts,
}) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-high shadow-sm space-y-3">
      {/* Title */}
      <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary-container text-[20px]">
            bubble_chart
          </span>
          <h4 className="font-headline-sm text-body-md font-bold text-on-surface">
            {title}
          </h4>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-code-sm text-[10px] font-bold">
          Reaction Pathway
        </span>
      </div>

      {/* Equation display */}
      <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-center text-center font-code-md text-body-md font-bold text-primary">
        {reactionEquation}
      </div>

      {/* Simple explanation */}
      <div>
        <span className="font-label-sm text-[10px] uppercase text-outline font-semibold">
          Simple Overview
        </span>
        <p className="font-body-sm text-body-sm text-on-surface mt-0.5 leading-relaxed">
          {simpleExplanation}
        </p>
      </div>

      {/* Molecular & Curved arrow explanation */}
      <div className="p-3 rounded-lg bg-surface-container space-y-1">
        <div className="flex items-center gap-1.5 font-label-sm text-[11px] font-semibold text-tertiary">
          <span className="material-symbols-outlined text-[15px]">trending_flat</span>
          <span>Orbital Symmetry & Electron Flow</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          {molecularExplanation}
        </p>
      </div>

      {/* Related Concepts */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="font-label-sm text-[10px] text-outline uppercase font-semibold mr-1">
          Related:
        </span>
        {relatedConcepts.map((concept, i) => (
          <span
            key={i}
            className="px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface-variant font-code-sm text-[10px]"
          >
            {concept}
          </span>
        ))}
      </div>
    </div>
  );
};
