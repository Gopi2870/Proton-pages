import React from 'react';
import { NavigationPath } from '../types/navigation';

interface SavedItemsPageProps {
  onNavigate: (path: NavigationPath, meta?: any) => void;
}

export const SavedItemsPage: React.FC<SavedItemsPageProps> = ({ onNavigate }) => {
  const savedFormulas = [
    { title: 'Blast Furnace Hematite Reduction', formula: 'Fe₂O₃ + 3CO ➔ 2Fe + 3CO₂', type: 'Reaction', path: 'reaction-engine' as NavigationPath },
    { title: 'Caffeine Conformation (A2A Antagonist)', formula: 'C₈H₁₀N₄O₂', type: 'Molecule', path: 'molecular-explorer' as NavigationPath },
    { title: 'Haber-Bosch Ammonia Synthesis', formula: 'N₂ + 3H₂ ➔ 2NH₃', type: 'Reaction', path: 'reaction-engine' as NavigationPath },
    { title: 'Adenosine Triphosphate (ATP)', formula: 'C₁₀H₁₆N₅O₁₃P₃', type: 'Molecule', path: 'molecular-explorer' as NavigationPath },
  ];

  const recentSessions = [
    { title: 'Acid-Base Titration #2 Endpoint Run', date: 'Today, 10:30 AM', duration: '28 min', module: 'Virtual Lab', path: 'virtual-lab' as NavigationPath },
    { title: 'SN2 Stereochemical Inversion Practice', date: 'Yesterday', duration: '45 min', module: 'Quizzes', path: 'practice-and-quizzes' as NavigationPath },
    { title: 'VSEPR & Water Dipole Inquiry', date: '3 days ago', duration: '14 msgs', module: 'AI Tutor', path: 'ai-tutor' as NavigationPath },
  ];

  return (
    <div className="flex flex-col w-full p-space-md lg:p-space-lg space-y-space-md">
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
        <div>
          <h1 className="font-headline-md text-headline-md text-on-surface font-bold">
            Workspace: Saved Items & History
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Archived chemical formulas, bookmarks, experimental simulations, and analytical telemetry
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
        {/* Saved Formulas & Items */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-low shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">bookmark</span>
              <h3 className="font-headline-sm text-label-md font-bold text-on-surface">
                Saved Chemical Formulas
              </h3>
            </div>
            <span className="font-code-sm text-[11px] px-2 py-0.5 rounded bg-surface-container text-on-surface">
              {savedFormulas.length} Items
            </span>
          </div>

          <div className="space-y-2">
            {savedFormulas.map((item, i) => (
              <div
                key={i}
                onClick={() => onNavigate(item.path)}
                className="p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer border border-transparent hover:border-surface-container-high flex items-center justify-between"
              >
                <div>
                  <div className="font-label-md text-label-md font-semibold text-on-surface">
                    {item.title}
                  </div>
                  <div className="font-code-sm text-[11px] text-primary font-bold mt-0.5">
                    {item.formula}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-code-sm text-[10px] px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                    {item.type}
                  </span>
                  <span className="material-symbols-outlined text-outline text-[18px]">
                    arrow_forward
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Experimental Sessions */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-low shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">history</span>
              <h3 className="font-headline-sm text-label-md font-bold text-on-surface">
                Recent Laboratory & AI Sessions
              </h3>
            </div>
            <span className="font-code-sm text-[11px] px-2 py-0.5 rounded bg-surface-container text-on-surface">
              {recentSessions.length} Sessions
            </span>
          </div>

          <div className="space-y-2">
            {recentSessions.map((session, i) => (
              <div
                key={i}
                onClick={() => onNavigate(session.path)}
                className="p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer border border-transparent hover:border-surface-container-high flex items-center justify-between"
              >
                <div>
                  <div className="font-label-md text-label-md font-semibold text-on-surface">
                    {session.title}
                  </div>
                  <div className="font-code-sm text-[11px] text-outline mt-0.5">
                    {session.date} • {session.duration}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-code-sm text-[10px] px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant font-bold">
                    {session.module}
                  </span>
                  <span className="material-symbols-outlined text-outline text-[18px]">
                    arrow_forward
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
