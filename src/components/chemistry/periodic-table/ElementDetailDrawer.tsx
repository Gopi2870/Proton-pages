import React from 'react';
import { ChemicalElement } from '../../../types/chemistry';
import { ELEMENT_CATEGORIES_CONFIG } from '../../../data/periodicTableData';

interface ElementDetailDrawerProps {
  element: ChemicalElement | null;
  onClose: () => void;
  onAskAi: (element: ChemicalElement) => void;
}

export const ElementDetailDrawer: React.FC<ElementDetailDrawerProps> = ({
  element,
  onClose,
  onAskAi,
}) => {
  if (!element) return null;

  const categoryStyle = ELEMENT_CATEGORIES_CONFIG[element.category] || ELEMENT_CATEGORIES_CONFIG['unknown'];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-surface-container-lowest shadow-2xl border-l border-surface-container-high flex flex-col transform transition-transform duration-300">
      {/* Header */}
      <div className="p-space-md border-b border-surface-container-low flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">grid_view</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
            Element Inspector
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-space-md overflow-y-auto flex-1 space-y-space-md">
        {/* Giant Element Card Showcase */}
        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-surface-container-low via-surface-container-lowest to-surface-container border border-surface-container-high flex flex-col items-center justify-center text-center shadow-xs">
          <div className="absolute top-3 left-4 font-code-sm text-headline-sm font-bold text-outline">
            {element.number}
          </div>
          <div className="absolute top-3 right-4 font-code-sm text-body-sm font-semibold text-outline">
            {element.atomicMass} u
          </div>

          <div className="text-6xl font-bold font-headline-lg text-primary tracking-tight my-2">
            {element.symbol}
          </div>

          <div className="text-xl font-bold text-on-surface font-headline-sm">
            {element.name}
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full font-code-sm text-[11px] font-semibold ${categoryStyle.bg} ${categoryStyle.text} border ${categoryStyle.border}`}
            >
              {categoryStyle.label}
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container font-code-sm text-[11px] text-on-surface-variant">
              Period {element.period} • Group {element.group}
            </span>
          </div>
        </div>

        {/* AI Co-Pilot Query Action */}
        <button
          onClick={() => onAskAi(element)}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-tertiary-container to-tertiary text-on-tertiary font-label-md text-label-md font-semibold shadow-sm hover:opacity-95 transition-opacity"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">psychology</span>
          <span>Ask AI Chemistry Tutor About {element.name}</span>
        </button>

        {/* Overview Summary */}
        <div className="p-3.5 rounded-xl bg-surface-container-low">
          <h4 className="font-label-sm text-label-sm uppercase tracking-wider text-outline mb-1">
            Chemical Summary
          </h4>
          <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
            {element.summary}
          </p>
          {element.discoveredBy && (
            <p className="font-code-sm text-[11px] text-outline mt-2">
              Discovered by: {element.discoveredBy}
            </p>
          )}
        </div>

        {/* Electron Configuration & Orbital Specs */}
        <div className="space-y-2">
          <h4 className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
            Electronic Structure
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-lg bg-surface-container border border-surface-container-high">
              <span className="font-label-sm text-[10px] text-outline uppercase">Configuration</span>
              <div className="font-code-md text-code-md font-bold text-primary mt-0.5">
                {element.electronConfiguration}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-surface-container border border-surface-container-high">
              <span className="font-label-sm text-[10px] text-outline uppercase">Block & States</span>
              <div className="font-code-md text-code-md font-bold text-on-surface mt-0.5">
                {element.block.toUpperCase()}-block ({element.oxidationStates || '0'})
              </div>
            </div>
          </div>
        </div>

        {/* Physical & Thermodynamic Properties */}
        <div className="space-y-2">
          <h4 className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
            Physical Properties
          </h4>
          <div className="space-y-1.5 font-body-sm text-body-sm">
            <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest border border-surface-container-low">
              <span className="text-on-surface-variant">Electronegativity (Pauling)</span>
              <span className="font-code-sm text-code-sm font-bold text-on-surface">
                {element.electronegativity !== undefined ? element.electronegativity : 'N/A'}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest border border-surface-container-low">
              <span className="text-on-surface-variant">Density</span>
              <span className="font-code-sm text-code-sm font-bold text-on-surface">
                {element.density !== undefined ? `${element.density} g/cm³` : 'N/A'}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest border border-surface-container-low">
              <span className="text-on-surface-variant">Melting Point</span>
              <span className="font-code-sm text-code-sm font-bold text-on-surface">
                {element.meltingPoint !== undefined ? `${element.meltingPoint} K` : 'N/A'}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest border border-surface-container-low">
              <span className="text-on-surface-variant">Boiling Point</span>
              <span className="font-code-sm text-code-sm font-bold text-on-surface">
                {element.boilingPoint !== undefined ? `${element.boilingPoint} K` : 'N/A'}
              </span>
            </div>
            {element.crystalStructure && (
              <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest border border-surface-container-low">
                <span className="text-on-surface-variant">Crystal Lattice</span>
                <span className="font-code-sm text-code-sm font-bold text-on-surface">
                  {element.crystalStructure}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
