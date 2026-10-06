import React, { useState } from 'react';
import { LabReagent } from '../../../types/chemistry';
import { LAB_EQUIPMENT_ITEMS } from '../../../data/labReagentsData';

interface ReagentShelfProps {
  reagents: LabReagent[];
  activeTitrant: LabReagent;
  activeAnalyte: LabReagent;
  onSelectTitrant: (reagent: LabReagent) => void;
  onSelectAnalyte: (reagent: LabReagent) => void;
}

export const ReagentShelf: React.FC<ReagentShelfProps> = ({
  reagents,
  activeTitrant,
  activeAnalyte,
  onSelectTitrant,
  onSelectAnalyte,
}) => {
  const [activeCategory, setActiveCategory] = useState<'Reagents' | 'Glass' | 'Probes' | 'Heat/Stir'>('Reagents');

  return (
    <aside className="flex flex-col gap-space-sm bg-surface-container-lowest p-space-sm rounded-xl shadow-sm border border-surface-container-low overflow-hidden h-full">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-2 border-b-0">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">science</span>
          <span className="font-headline-sm text-label-md font-bold text-on-surface">
            Inventory & Reagents
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-[11px] font-semibold">
          Stock 5/12
        </span>
      </div>

      {/* Segmented Category Pill Tabs */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-surface-container-low rounded-lg text-center select-none">
        {(['Reagents', 'Glass', 'Probes', 'Heat/Stir'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`py-1 px-1 rounded-md font-label-sm text-[11px] font-medium transition-all ${
              activeCategory === cat
                ? 'bg-surface-container-lowest shadow-xs text-primary font-bold'
                : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Content Shelf */}
      <div className="flex flex-col gap-2.5 overflow-y-auto pr-1 flex-1 max-h-[580px]">
        {activeCategory === 'Reagents' ? (
          reagents.map((reagent) => {
            const isTitrant = activeTitrant.id === reagent.id;
            const isAnalyte = activeAnalyte.id === reagent.id;

            return (
              <div
                key={reagent.id}
                className={`p-2.5 rounded-lg border transition-all cursor-pointer group ${
                  isTitrant
                    ? 'bg-cyan-50/70 border-cyan-400'
                    : isAnalyte
                    ? 'bg-red-50/70 border-red-400'
                    : 'bg-surface-container-low border-transparent hover:bg-surface-container'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-md flex items-center justify-center font-code-md text-code-md font-bold ${
                        reagent.id === 'naoh'
                          ? 'bg-cyan-100 text-cyan-800'
                          : reagent.id === 'hcl'
                          ? 'bg-red-100 text-red-800'
                          : reagent.id === 'phenolphthalein'
                          ? 'bg-pink-100 text-pink-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {reagent.formula.slice(0, 2)}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-body-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                        {reagent.name}
                      </span>
                      <span className="font-code-sm text-[11px] text-on-surface-variant">
                        {reagent.formula} • {reagent.concentration} {reagent.unit}
                      </span>
                    </div>
                  </div>

                  {/* NFPA 704 simplified diamond */}
                  <div className="w-6 h-6 rotate-45 grid grid-cols-2 grid-rows-2 text-[7px] text-center font-code-sm font-bold shadow-xs shrink-0">
                    <span className="bg-red-500 text-white flex items-center justify-center -rotate-45">
                      {reagent.nfpa.flammability}
                    </span>
                    <span className="bg-blue-600 text-white flex items-center justify-center -rotate-45">
                      {reagent.nfpa.health}
                    </span>
                    <span className="bg-yellow-400 text-black flex items-center justify-center -rotate-45">
                      {reagent.nfpa.instability}
                    </span>
                    <span className="bg-white text-black flex items-center justify-center -rotate-45 font-bold">
                      {reagent.nfpa.special || ''}
                    </span>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between font-label-sm text-[11px]">
                  <span
                    className={`px-2 py-0.5 rounded-full ${
                      isTitrant
                        ? 'bg-cyan-100 text-cyan-800 font-semibold'
                        : isAnalyte
                        ? 'bg-red-100 text-red-800 font-semibold'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {isTitrant
                      ? 'In Titrant Burette'
                      : isAnalyte
                      ? 'In Analyte Flask'
                      : `${reagent.volumeAvailable} mL available`}
                  </span>
                  <span className="text-outline font-code-sm">pH ~{reagent.ph}</span>
                </div>

                {/* Quick select buttons */}
                {!isTitrant && !isAnalyte && (
                  <div className="mt-2 pt-1 border-t border-surface-container-high/40 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onSelectTitrant(reagent)}
                      className="px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 font-label-sm text-[10px] hover:bg-cyan-200"
                    >
                      Use as Titrant
                    </button>
                    <button
                      onClick={() => onSelectAnalyte(reagent)}
                      className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-label-sm text-[10px] hover:bg-red-200"
                    >
                      Use as Analyte
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          LAB_EQUIPMENT_ITEMS.filter((item) => item.category === activeCategory).map((eq) => (
            <div
              key={eq.id}
              className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container-high flex items-center justify-between"
            >
              <div>
                <div className="font-label-md text-label-md font-semibold text-on-surface">
                  {eq.name}
                </div>
                <div className="font-code-sm text-[11px] text-outline">
                  Status: {eq.status} • {eq.tolerance || eq.speedRange || eq.tempRange}
                </div>
              </div>
              <span className="material-symbols-outlined text-secondary text-[20px]">
                check_circle
              </span>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};
