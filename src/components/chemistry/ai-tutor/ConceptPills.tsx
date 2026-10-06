import React from 'react';

interface ConceptPillsProps {
  onSelectPrompt: (promptText: string) => void;
}

export const ConceptPills: React.FC<ConceptPillsProps> = ({ onSelectPrompt }) => {
  const suggestedPrompts = [
    { text: 'Show Grignard mechanism with formaldehyde', icon: 'bubble_chart' },
    { text: 'Why are ether solvents strictly anhydrous?', icon: 'water_drop' },
    { text: 'Compare organolithium vs Grignard reactivity', icon: 'compare_arrows' },
    { text: 'Predict product for RMgX + CO₂ (Dry ice)', icon: 'co2' },
  ];

  const recentSessions = [
    { title: 'VSEPR & Water Dipole Moment', count: '14 msgs', time: 'Yesterday' },
    { title: 'S_N1 vs S_N2 Kinetic Solvent Effects', count: '9 msgs', time: '3 days ago' },
    { title: 'Henderson-Hasselbalch derivation', count: '22 msgs', time: 'May 12' },
  ];

  return (
    <div className="space-y-4">
      {/* Current Academic Module Context */}
      <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container-high space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-[10px] uppercase text-outline font-semibold">
            Active Academic Topic
          </span>
          <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-code-sm text-[10px]">
            Lesson 4.2
          </span>
        </div>
        <div className="flex items-center gap-2 font-headline-sm text-body-md font-bold text-primary">
          <span className="w-2 h-2 rounded-full bg-primary-container animate-ping" />
          <span>Grignard Reagent Synthesis & Additions</span>
        </div>
      </div>

      {/* Suggested Prompts */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
            Suggested Prompts
          </span>
          <span className="material-symbols-outlined text-outline text-[16px]">bolt</span>
        </div>
        <div className="flex flex-col gap-1.5">
          {suggestedPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => onSelectPrompt(p.text)}
              type="button"
              className="w-full text-left p-2.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container border border-surface-container-low transition-colors text-on-surface font-body-sm text-body-sm shadow-xs flex items-start gap-2 group"
            >
              <span className="material-symbols-outlined text-tertiary-container text-[16px] mt-0.5 shrink-0 group-hover:scale-110 transition-transform">
                {p.icon}
              </span>
              <span className="line-clamp-2">{p.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between px-1">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
            Recent Sessions
          </span>
          <span className="material-symbols-outlined text-outline text-[16px]">history</span>
        </div>
        <div className="space-y-1.5">
          {recentSessions.map((session, i) => (
            <div
              key={i}
              onClick={() => onSelectPrompt(`Continue discussion on: ${session.title}`)}
              className="p-2.5 rounded-lg bg-surface-container-lowest/80 hover:bg-surface-container transition-colors cursor-pointer border border-surface-container-low shadow-xs"
            >
              <p className="font-label-md text-label-md text-on-surface truncate font-semibold">
                {session.title}
              </p>
              <div className="flex items-center justify-between text-outline font-code-sm text-[11px] mt-0.5">
                <span>{session.count}</span>
                <span>{session.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
