import React, { useState, useEffect } from 'react';
import { ChemicalElement, ElementCategory } from '../../../types/chemistry';
import { chemistryService } from '../../../services/chemistry';
import { ELEMENT_CATEGORIES_CONFIG } from '../../../data/periodicTableData';
import { ElementDetailDrawer } from './ElementDetailDrawer';

interface PeriodicTableProps {
  onAskAi: (element: ChemicalElement) => void;
  initialSelectedElement?: ChemicalElement;
}

export const PeriodicTable: React.FC<PeriodicTableProps> = ({
  onAskAi,
  initialSelectedElement,
}) => {
  const [elements, setElements] = useState<ChemicalElement[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ElementCategory | 'all'>('all');
  const [activeElement, setActiveElement] = useState<ChemicalElement | null>(
    initialSelectedElement || null
  );

  useEffect(() => {
    chemistryService.getAllElements().then((data) => {
      setElements(data);
      if (!activeElement && data.length > 0) {
        setActiveElement(data[0]); // default Hydrogen or Carbon
      }
    });
  }, []);

  const filteredElements = elements.filter((el) => {
    const matchesCategory = selectedCategory === 'all' || el.category === selectedCategory;
    const clean = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !clean ||
      el.name.toLowerCase().includes(clean) ||
      el.symbol.toLowerCase().includes(clean) ||
      el.number.toString() === clean;
    return matchesCategory && matchesQuery;
  });

  // Map elements by grid coordinate: [period][group]
  const elementMap = new Map<string, ChemicalElement>();
  elements.forEach((el) => {
    elementMap.set(`${el.period}-${el.group}`, el);
  });

  const categories = Object.entries(ELEMENT_CATEGORIES_CONFIG);

  return (
    <div className="flex flex-col w-full h-full p-space-md lg:p-space-lg space-y-space-md">
      {/* Top Controls Strip */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-low flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline-md text-headline-md text-on-surface font-bold">
              Interactive Periodic Table
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-code-sm font-semibold">
              IUPAC 118 Elements
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Explore periodic trends, electronegativity gradients, orbital blocks, and electronic configurations.
          </p>
        </div>

        {/* Search & filter */}
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, symbol, or atomic number (e.g., Fe, Carbon, 79)..."
              className="w-full pl-9 pr-8 py-2 rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-nowrap">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1 rounded-full font-code-sm text-code-sm font-semibold transition-all ${
            selectedCategory === 'all'
              ? 'bg-primary-container text-on-primary shadow-xs'
              : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
          }`}
        >
          All Elements ({elements.length})
        </button>
        {categories.map(([key, config]) => {
          const isSelected = selectedCategory === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedCategory(key as ElementCategory)}
              className={`px-3 py-1 rounded-full font-code-sm text-code-sm flex items-center gap-1.5 transition-all ${
                isSelected
                  ? 'bg-primary-container text-on-primary font-semibold shadow-xs'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isSelected ? 'bg-secondary-fixed' : config.bg.replace('bg-', 'bg-')
                }`}
              />
              <span>{config.label}</span>
            </button>
          );
        })}
      </div>

      {/* Periodic Table Grid Container */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-low overflow-x-auto">
        <div className="min-w-[960px] pb-4">
          {/* Group numbers header (1-18) */}
          <div className="grid grid-cols-18 gap-1 mb-1 text-center font-code-sm text-[11px] text-outline">
            {Array.from({ length: 18 }, (_, i) => (
              <div key={i + 1} className="py-0.5">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Periods 1 to 7 */}
          {Array.from({ length: 7 }, (_, pIndex) => {
            const period = pIndex + 1;
            return (
              <div key={period} className="grid grid-cols-18 gap-1 mb-1 items-center">
                {Array.from({ length: 18 }, (_, gIndex) => {
                  const group = gIndex + 1;
                  const el = elementMap.get(`${period}-${group}`);

                  if (!el) {
                    return <div key={group} className="h-14 sm:h-16" />;
                  }

                  const isMatch = filteredElements.some((item) => item.number === el.number);
                  const isSelected = activeElement?.number === el.number;
                  const catConfig = ELEMENT_CATEGORIES_CONFIG[el.category] || ELEMENT_CATEGORIES_CONFIG['unknown'];

                  return (
                    <div
                      key={el.number}
                      onClick={() => setActiveElement(el)}
                      title={`${el.name} (${el.symbol}) - Atomic #${el.number}`}
                      className={`h-14 sm:h-16 p-1 rounded-lg border flex flex-col justify-between cursor-pointer select-none transition-all duration-150 ${
                        isSelected
                          ? 'ring-2 ring-primary-container bg-primary-fixed/40 shadow-sm scale-105 z-10'
                          : isMatch
                          ? 'hover:scale-105 hover:shadow-xs bg-surface-container-lowest border-surface-container-high'
                          : 'opacity-25 bg-surface-container-low border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-code-sm text-outline">
                        <span>{el.number}</span>
                        <span className="hidden sm:inline font-mono text-[9px] truncate">
                          {el.atomicMass.toFixed(1)}
                        </span>
                      </div>
                      <div className="text-center font-bold text-sm sm:text-base text-on-surface font-headline-sm">
                        {el.symbol}
                      </div>
                      <div className="text-[9px] font-medium text-center truncate text-on-surface-variant">
                        {el.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Slideout Drawer */}
      {activeElement && (
        <ElementDetailDrawer
          element={activeElement}
          onClose={() => setActiveElement(null)}
          onAskAi={onAskAi}
        />
      )}
    </div>
  );
};
