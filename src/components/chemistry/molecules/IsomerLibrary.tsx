import React from 'react';
import { MoleculeData } from '../../../types/chemistry';

interface IsomerLibraryProps {
  molecules: MoleculeData[];
  selectedMolecule: MoleculeData;
  onSelect: (molecule: MoleculeData) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const IsomerLibrary: React.FC<IsomerLibraryProps> = ({
  molecules,
  selectedMolecule,
  onSelect,
  selectedCategory,
  onSelectCategory,
}) => {
  const categories = ['All', 'Bioactive', 'Pharma', 'Industrial', 'Neuro'];

  const filtered = molecules.filter(
    (m) => selectedCategory === 'All' || m.category === selectedCategory
  );

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-low flex flex-col gap-space-sm">
      {/* Box Header */}
      <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-low">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-primary">lan</span>
          <span className="font-headline-sm text-label-md font-bold text-on-surface">
            Isomer Library
          </span>
        </div>
        <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-code-sm text-[11px] font-semibold">
          {filtered.length} Compounds
        </span>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-2.5 py-1 rounded-md font-label-sm text-[11px] font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Compound Mini Cards List */}
      <div className="space-y-2 mt-1 max-h-[520px] overflow-y-auto pr-0.5">
        {filtered.map((mol) => {
          const isSelected = selectedMolecule.id === mol.id;
          return (
            <div
              key={mol.id}
              onClick={() => onSelect(mol)}
              className={`p-2.5 rounded-lg cursor-pointer transition-all flex items-center justify-between group border ${
                isSelected
                  ? 'bg-primary-fixed/30 border-primary shadow-xs'
                  : 'bg-surface-container-low border-transparent hover:bg-surface-container'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {/* 2D Mini Icon */}
                <div
                  className={`w-8 h-8 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                    isSelected
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-primary group-hover:bg-primary group-hover:text-on-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">hub</span>
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md font-semibold text-on-surface truncate group-hover:text-primary transition-colors">
                    {mol.name}
                  </span>
                  <div className="flex items-center gap-1.5 font-code-sm text-[11px] text-on-surface-variant">
                    <span>{mol.formula}</span>
                    <span className="text-outline">•</span>
                    <span>{mol.molecularWeight} g/mol</span>
                  </div>
                </div>
              </div>

              <span
                className={`material-symbols-outlined text-[16px] transition-transform ${
                  isSelected ? 'text-primary' : 'text-outline opacity-0 group-hover:opacity-100'
                }`}
              >
                chevron_right
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
