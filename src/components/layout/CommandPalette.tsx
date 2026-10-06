import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '../common/Modal';
import { NavigationPath } from '../../types/navigation';
import { chemistryService } from '../../services/chemistry';
import { ChemicalElement, MoleculeData } from '../../types/chemistry';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: NavigationPath, meta?: any) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [elements, setElements] = useState<ChemicalElement[]>([]);
  const [molecules, setMolecules] = useState<MoleculeData[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      chemistryService.getAllElements().then(setElements);
      chemistryService.getAllMolecules().then(setMolecules);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const cleanQuery = query.toLowerCase().trim();

  const filteredElements = elements.filter(
    (e) =>
      !cleanQuery ||
      e.name.toLowerCase().includes(cleanQuery) ||
      e.symbol.toLowerCase().includes(cleanQuery) ||
      e.number.toString() === cleanQuery
  ).slice(0, 5);

  const filteredMolecules = molecules.filter(
    (m) =>
      !cleanQuery ||
      m.name.toLowerCase().includes(cleanQuery) ||
      m.formula.toLowerCase().includes(cleanQuery) ||
      m.smiles.toLowerCase().includes(cleanQuery)
  ).slice(0, 4);

  const standardActions = [
    { label: 'Open Virtual Lab Rig', path: 'virtual-lab' as NavigationPath, icon: 'experiment', badge: 'Active' },
    { label: 'Launch Reaction Engine', path: 'reaction-engine' as NavigationPath, icon: 'science' },
    { label: 'Explore 3D Molecule Models', path: 'molecular-explorer' as NavigationPath, icon: 'hub' },
    { label: 'Browse Interactive Periodic Table', path: 'periodic-table' as NavigationPath, icon: 'grid_view' },
    { label: 'Ask AI Chemistry Tutor', path: 'ai-tutor' as NavigationPath, icon: 'psychology', badge: 'AI' },
    { label: 'Organic Chemistry Foundations (CHEM 204)', path: 'learn-and-courses' as NavigationPath, icon: 'school' },
  ].filter((a) => !cleanQuery || a.label.toLowerCase().includes(cleanQuery));

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
      <div className="space-y-4 -mt-2">
        {/* Search Input */}
        <div className="relative flex items-center border-b border-surface-container-high pb-3">
          <span className="material-symbols-outlined text-primary text-[24px] mr-3">
            search
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search elements, molecules, reactions, or commands..."
            className="w-full bg-transparent text-headline-sm font-headline-sm text-on-surface placeholder:text-outline focus:outline-none"
          />
          <kbd className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-code-sm text-code-sm">
            ESC to close
          </kbd>
        </div>

        {/* Quick Categories Ribbon */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-nowrap">
          <span className="font-label-sm text-[10px] uppercase text-outline px-1">Filter:</span>
          {['All', 'Elements', 'Molecules', 'Reactions', 'Courses', 'Apparatus'].map((tab) => (
            <button
              key={tab}
              onClick={() => setQuery(tab === 'All' ? '' : tab.toLowerCase())}
              className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-code-sm text-[11px] hover:bg-secondary-fixed hover:text-on-secondary-fixed-variant transition-colors"
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results Sections */}
        <div className="max-h-[380px] overflow-y-auto space-y-4 pr-1">
          {/* Elements */}
          {filteredElements.length > 0 && (
            <div>
              <div className="text-label-sm font-label-sm uppercase tracking-wider text-outline px-2 mb-1.5">
                Elements ({filteredElements.length})
              </div>
              <div className="space-y-1">
                {filteredElements.map((el) => (
                  <div
                    key={el.number}
                    onClick={() => {
                      onNavigate('periodic-table', { element: el });
                      onClose();
                    }}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-surface-container cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center font-bold text-primary font-code-md">
                        {el.symbol}
                      </div>
                      <div>
                        <div className="font-label-md text-label-md font-semibold text-on-surface">
                          {el.name} <span className="text-outline font-normal">#{el.number}</span>
                        </div>
                        <div className="font-body-sm text-[11px] text-on-surface-variant line-clamp-1">
                          {el.summary}
                        </div>
                      </div>
                    </div>
                    <span className="font-code-sm text-[11px] px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                      {el.atomicMass} u
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Molecules */}
          {filteredMolecules.length > 0 && (
            <div>
              <div className="text-label-sm font-label-sm uppercase tracking-wider text-outline px-2 mb-1.5">
                Molecules ({filteredMolecules.length})
              </div>
              <div className="space-y-1">
                {filteredMolecules.map((mol) => (
                  <div
                    key={mol.id}
                    onClick={() => {
                      onNavigate('molecular-explorer', { moleculeId: mol.id });
                      onClose();
                    }}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-surface-container cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-[18px]">hub</span>
                      </div>
                      <div>
                        <div className="font-label-md text-label-md font-semibold text-on-surface">
                          {mol.name} <span className="text-outline font-normal">({mol.formula})</span>
                        </div>
                        <div className="font-code-sm text-[11px] text-on-surface-variant">
                          MW: {mol.molecularWeight} g/mol • {mol.category}
                        </div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline text-[18px]">
                      chevron_right
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation & Commands */}
          {standardActions.length > 0 && (
            <div>
              <div className="text-label-sm font-label-sm uppercase tracking-wider text-outline px-2 mb-1.5">
                Platform Workspaces
              </div>
              <div className="space-y-1">
                {standardActions.map((action) => (
                  <div
                    key={action.path}
                    onClick={() => {
                      onNavigate(action.path);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-surface-container cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[18px]">{action.icon}</span>
                      </div>
                      <span className="font-label-md text-label-md font-medium text-on-surface">
                        {action.label}
                      </span>
                    </div>
                    {action.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-[10px] font-bold">
                        {action.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
