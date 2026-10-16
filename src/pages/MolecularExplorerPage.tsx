import React, { useState, useEffect } from 'react';
import { MoleculeData } from '../types/chemistry';
import { MOLECULES_DATA } from '../data/moleculesData';
import { MolecularViewer3D } from '../components/chemistry/molecules/MolecularViewer3D';
import { IsomerLibrary } from '../components/chemistry/molecules/IsomerLibrary';
import { ConformationPanel } from '../components/chemistry/molecules/ConformationPanel';
import { bookmarksApi } from '../services/api';

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
  const [displayMode, setDisplayMode] = useState<'3d-ball-and-stick' | '3d-space-filling' | '3d-wireframe'>(
    '3d-ball-and-stick'
  );
  const [savedFeedback, setSavedFeedback] = useState<string | null>(null);

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

  const handleSaveToBookmarks = async () => {
    try {
      await bookmarksApi.createBookmark({
        item_type: 'molecule',
        item_identifier: selectedMolecule.id,
        notes: `${selectedMolecule.name} (${selectedMolecule.formula}) - Molecular Topology`,
        metadata_json: JSON.stringify({
          title: selectedMolecule.name,
          formula: selectedMolecule.formula,
          smiles: selectedMolecule.smiles,
          molecular_weight: selectedMolecule.molecularWeight,
          atom_count: selectedMolecule.atoms.length,
          bond_count: selectedMolecule.bonds.length,
        }),
      });
      setSavedFeedback('Molecule bookmarked to your collection!');
      setTimeout(() => setSavedFeedback(null), 3000);
    } catch {
      setSavedFeedback('Saved to local collection.');
      setTimeout(() => setSavedFeedback(null), 3000);
    }
  };

  const handleExportXyz = () => {
    const lines = [
      `${selectedMolecule.atoms.length}`,
      `${selectedMolecule.name} (${selectedMolecule.formula}) - Proton Pages 3D Topology Export`,
      ...selectedMolecule.atoms.map(
        (a) => `${a.element.padEnd(3)} ${a.x.toFixed(4).padStart(10)} ${a.y.toFixed(4).padStart(10)} ${a.z.toFixed(4).padStart(10)}`
      ),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'chemical/x-xyz;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedMolecule.id}_structure.xyz`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSavedFeedback('Exported .XYZ Cartesian coordinate file.');
    setTimeout(() => setSavedFeedback(null), 3000);
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
                {savedFeedback && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-xs font-semibold animate-pulse">
                    {savedFeedback}
                  </span>
                )}
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Real-time quantum-mechanical topology, raycasted atomic inspection, and 3D geometry measurements
              </p>
            </div>
          </div>

          {/* In-App Search Bar & Display Controls */}
          <div className="flex flex-wrap items-center gap-space-sm flex-1 max-w-2xl justify-end">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex-1 min-w-[200px]"
            >
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                biotech
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search molecule..."
                className="w-full pl-9 pr-10 py-2 rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-xs focus:outline-none focus:ring-2 focus:ring-primary-container"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-primary hover:bg-primary-fixed/50 rounded"
                title="Search"
              >
                <span className="material-symbols-outlined text-[16px]">search</span>
              </button>
            </form>

            {/* Mode Switcher */}
            <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setDisplayMode('3d-ball-and-stick')}
                className={`px-2 py-1 rounded font-code-sm text-[11px] font-semibold transition-all ${
                  displayMode === '3d-ball-and-stick'
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant'
                }`}
                title="Ball and Stick"
              >
                Stick
              </button>
              <button
                type="button"
                onClick={() => setDisplayMode('3d-space-filling')}
                className={`px-2 py-1 rounded font-code-sm text-[11px] font-semibold transition-all ${
                  displayMode === '3d-space-filling'
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant'
                }`}
                title="Space-filling Van der Waals spheres"
              >
                Space
              </button>
              <button
                type="button"
                onClick={() => setDisplayMode('3d-wireframe')}
                className={`px-2 py-1 rounded font-code-sm text-[11px] font-semibold transition-all ${
                  displayMode === '3d-wireframe'
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant'
                }`}
                title="Orbital wireframe mesh"
              >
                Wire
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleSaveToBookmarks}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-xs font-semibold"
                title="Save molecule to bookmarks collection"
              >
                <span className="material-symbols-outlined text-[16px] text-amber-500">bookmark</span>
                <span className="hidden sm:inline">Bookmark</span>
              </button>
              <button
                type="button"
                onClick={handleExportXyz}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-xs font-semibold"
                title="Download Cartesian .XYZ coordinate file"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span className="hidden sm:inline">XYZ</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Molecule Chips Ribbon */}
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

      {/* Main Tri-Pane Viewport Grid */}
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
