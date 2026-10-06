import React, { useState, useEffect } from 'react';
import { MoleculeData } from '../types/chemistry';
import { MOLECULES_DATA } from '../data/moleculesData';
import { MolecularViewer3D } from '../components/chemistry/molecules/MolecularViewer3D';
import { IsomerLibrary } from '../components/chemistry/molecules/IsomerLibrary';
import { ConformationPanel } from '../components/chemistry/molecules/ConformationPanel';

interface MolecularExplorerPageProps {
  initialMoleculeId?: string;
  onAskAi: (prompt: string) => void;
}

export const MolecularExplorerPage: React.FC<MolecularExplorerPageProps> = ({
  initialMoleculeId,
  onAskAi,
}) => {
  const [molecules] = useState<MoleculeData[]>(MOLECULES_DATA);
  const [selectedMolecule, setSelectedMolecule] = useState<MoleculeData>(
    molecules.find((m) => m.id === initialMoleculeId) || molecules[0]
  );
  const [searchQuery, setSearchQuery] = useState(selectedMolecule.name);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [displayMode, setDisplayMode] = useState<'3d-ball-and-stick' | '3d-space-filling' | '2d-skeletal'>(
    '3d-ball-and-stick'
  );

  useEffect(() => {
    if (initialMoleculeId) {
      const found = molecules.find((m) => m.id === initialMoleculeId);
      if (found) {
        setSelectedMolecule(found);
        setSearchQuery(found.name);
      }
    }
  }, [initialMoleculeId, molecules]);

  const handleSelectMolecule = (m: MoleculeData) => {
    setSelectedMolecule(m);
    setSearchQuery(m.name);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchQuery.toLowerCase().trim();
    const matched = molecules.find(
      (m) =>
        m.name.toLowerCase().includes(clean) ||
        m.formula.toLowerCase().includes(clean) ||
        m.smiles.toLowerCase().includes(clean)
    );
    if (matched) {
      setSelectedMolecule(matched);
    }
  };

  return (
    <div className="flex flex-col w-full p-space-md lg:p-space-lg space-y-space-md">
      {/* Top Command Strip matching Stitch */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-low space-y-space-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-sm">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">hub</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Molecular Explorer
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-code-sm font-semibold">
                  v4.8-GPU
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Real-time quantum-mechanical topology, conformational analysis & ligand informatics
              </p>
            </div>
          </div>

          {/* In-App Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-space-sm flex-1 max-w-xl"
          >
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                biotech
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search molecule by name, formula, SMILES, or InChIKey..."
                className="w-full pl-11 pr-20 py-2.5 rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container focus:bg-surface-container-lowest transition-all"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button
                  type="submit"
                  className="p-1 rounded text-primary hover:bg-primary-fixed/50 transition-colors"
                  title="Execute Query"
                >
                  <span className="material-symbols-outlined text-[18px]">search</span>
                </button>
              </div>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setDisplayMode('3d-ball-and-stick')}
                className={`px-2.5 py-1 rounded font-code-sm text-[11px] font-semibold transition-all ${
                  displayMode === '3d-ball-and-stick'
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant'
                }`}
                title="Ball and Stick"
              >
                3D Stick
              </button>
              <button
                type="button"
                onClick={() => setDisplayMode('3d-space-filling')}
                className={`px-2.5 py-1 rounded font-code-sm text-[11px] font-semibold transition-all ${
                  displayMode === '3d-space-filling'
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant'
                }`}
                title="Space-filling Van der Waals spheres"
              >
                3D Space
              </button>
            </div>
          </form>
        </div>

        {/* Quick Molecule Chips Ribbon matching Stitch */}
        <div className="pt-space-xs flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-nowrap">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline flex items-center gap-1 pr-1">
            <span className="material-symbols-outlined text-[14px]">bolt</span> Presets:
          </span>
          {molecules.map((m) => {
            const isSelected = selectedMolecule.id === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleSelectMolecule(m)}
                className={`px-3 py-1 rounded-full font-code-sm text-code-sm flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-primary-container text-on-primary shadow-xs font-semibold'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                }`}
              >
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-pulse" />
                )}
                <span>{m.name}</span>
                <span className="text-[10px] opacity-80 font-normal">({m.formula})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tri-Pane Viewport Grid matching Stitch */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
        {/* Left Panel: Library & Isomers (3 cols) */}
        <div className="lg:col-span-3">
          <IsomerLibrary
            molecules={molecules}
            selectedMolecule={selectedMolecule}
            onSelect={handleSelectMolecule}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Center Panel: 3D Molecular Simulation Canvas (6 cols) */}
        <div className="lg:col-span-6 h-[580px]">
          <MolecularViewer3D
            molecule={selectedMolecule}
            displayMode={displayMode}
            autoRotate={true}
          />
        </div>

        {/* Right Panel: Conformation & Topology Descriptors (3 cols) */}
        <div className="lg:col-span-3">
          <ConformationPanel
            molecule={selectedMolecule}
            onAskAi={(m) => onAskAi(`Explain the molecular conformation and pharmacophore properties of ${m.name}`)}
          />
        </div>
      </div>
    </div>
  );
};
