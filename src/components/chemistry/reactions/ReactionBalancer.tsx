import React, { useState, useEffect } from 'react';
import { ChemicalReaction } from '../../../types/chemistry';
import { reactionsService } from '../../../services/reactions';
import { ThermodynamicsCard } from './ThermodynamicsCard';
import { AtomConservationTable } from './AtomConservationTable';

export const ReactionBalancer: React.FC = () => {
  const [reactions, setReactions] = useState<ChemicalReaction[]>([]);
  const [currentReaction, setCurrentReaction] = useState<ChemicalReaction | null>(null);
  const [inputFormula, setInputFormula] = useState('Fe2O3 + 3CO -> 2Fe + 3CO2');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    reactionsService.getAllReactions().then((data) => {
      setReactions(data);
      if (data.length > 0) {
        setCurrentReaction(data[0]); // Blast Furnace
      }
    });
  }, []);

  const handleSelectPreset = (reaction: ChemicalReaction) => {
    setInputFormula(reaction.rawInput);
    setCurrentReaction(reaction);
  };

  const handleInsertSymbol = (symbol: string) => {
    setInputFormula((prev) => prev + symbol);
  };

  const handleBalance = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputFormula.trim()) return;
    const balanced = await reactionsService.balanceReaction(inputFormula);
    setCurrentReaction(balanced);
  };

  const handleCopy = () => {
    if (!currentReaction) return;
    navigator.clipboard.writeText(currentReaction.balancedEquation);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full p-space-md lg:p-space-lg space-y-space-md">
      {/* Top Command Strip & Keypad */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-low space-y-space-md">
        {/* Title & Subtitle */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm pb-1">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">balance</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Chemical Reaction Balancer & Stoichiometry Engine
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-code-sm font-semibold">
                  ΔG / Matrix Solver
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Stoichiometric yield, matrix inversion balance, enthalpy, entropy & Gibbs free energy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
            <span className="material-symbols-outlined text-[18px] text-primary">verified</span>
            <span>Gaussian Elimination Matrix Inversion Active</span>
          </div>
        </div>

        {/* Reaction Input Form */}
        <form onSubmit={handleBalance} className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-outline text-[22px] pointer-events-none">
            science
          </span>
          <input
            type="text"
            value={inputFormula}
            onChange={(e) => setInputFormula(e.target.value)}
            placeholder="Type reactants and products (e.g., Fe2O3 + 3CO -> 2Fe + 3CO2 or CH4 + O2 -> CO2 + H2O)..."
            className="w-full pl-12 pr-28 py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline font-code-md text-headline-sm focus:outline-none focus:ring-2 focus:ring-primary-container focus:bg-surface-container-lowest transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:bg-primary transition-colors shadow-xs"
          >
            Balance
          </button>
        </form>

        {/* Quick Subscript & Operators Palette */}
        <div className="flex flex-wrap items-center justify-between gap-space-sm pt-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline mr-1">
              Insert Symbol:
            </span>
            {['₂', '₃', '₄', '₅'].map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => handleInsertSymbol(sub)}
                className="w-8 h-8 rounded bg-surface-container-low hover:bg-surface-container-high text-on-surface font-code-md text-body-md transition-colors"
              >
                {sub}
              </button>
            ))}
            <span className="w-px h-5 bg-surface-container-high mx-1" />
            <button
              type="button"
              onClick={() => handleInsertSymbol(' + ')}
              className="px-2.5 h-8 rounded bg-surface-container-low hover:bg-surface-container-high text-on-surface font-code-md text-body-sm transition-colors"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => handleInsertSymbol(' ➔ ')}
              className="px-2.5 h-8 rounded bg-surface-container-low hover:bg-surface-container-high text-on-surface font-code-md text-body-sm transition-colors"
            >
              ➔
            </button>
            <button
              type="button"
              onClick={() => handleInsertSymbol(' ⇄ ')}
              className="px-2.5 h-8 rounded bg-surface-container-low hover:bg-surface-container-high text-on-surface font-code-md text-body-sm transition-colors"
            >
              ⇄
            </button>
            <button
              type="button"
              onClick={() => handleInsertSymbol(' Δ ')}
              className="px-2.5 h-8 rounded bg-surface-container-low hover:bg-surface-container-high text-tertiary-container text-on-tertiary font-code-md text-body-sm transition-colors"
            >
              Δ (Heat)
            </button>
            <span className="w-px h-5 bg-surface-container-high mx-1" />
            {['(s)', '(l)', '(g)', '(aq)'].map((phase) => (
              <button
                key={phase}
                type="button"
                onClick={() => handleInsertSymbol(phase)}
                className="px-2 h-8 rounded bg-surface-container-low hover:bg-surface-container-high text-on-surface font-code-sm text-code-sm transition-colors"
              >
                {phase}
              </button>
            ))}
          </div>
        </div>

        {/* Standard Presets Ribbon */}
        <div className="pt-1 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-nowrap">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
            Standard Presets:
          </span>
          {reactions.map((r) => {
            const isSelected = currentReaction?.id === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => handleSelectPreset(r)}
                className={`px-3 py-1.5 rounded-full font-code-sm text-code-sm transition-all ${
                  isSelected
                    ? 'bg-primary-container text-on-primary font-semibold shadow-xs'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                }`}
              >
                <span className="font-semibold">{r.title.split(' ')[0]}:</span> {r.rawInput}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      {currentReaction && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* Left Column: Balanced Equation Hero Card & Atom Table (7 cols) */}
          <div className="lg:col-span-7 space-y-space-lg">
            {/* Balanced Equation Showcase Hero Card */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container-low overflow-hidden p-space-md lg:p-space-lg relative">
              <div className="flex items-center justify-between mb-space-md">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-code-sm text-code-sm font-bold uppercase tracking-wider">
                    Balanced State
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Stoichiometric coefficients: ({currentReaction.stoichiometryRatio})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-1.5 rounded text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
                  title="Copy Balanced Equation"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isCopied ? 'check' : 'content_copy'}
                  </span>
                </button>
              </div>

              {/* Formula Render Box */}
              <div className="bg-surface-container-low rounded-xl p-space-md lg:p-space-lg my-space-sm flex flex-col items-center justify-center text-center">
                <div className="font-code-md text-headline-sm lg:text-headline-lg font-bold text-on-surface tracking-tight flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                  <span>{currentReaction.balancedEquation}</span>
                </div>
                <span className="font-body-sm text-body-sm text-outline mt-2 font-medium">
                  {currentReaction.description}
                </span>
              </div>

              {/* Property Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-space-xs">
                <div className="p-2.5 rounded-lg bg-surface-container flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">sync_alt</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider">
                      Classification
                    </span>
                    <span className="font-headline-sm text-body-md font-semibold text-on-surface truncate">
                      {currentReaction.category}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-surface-container flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-secondary-fixed text-on-secondary-fixed-variant flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">layers</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider">
                      Phase System
                    </span>
                    <span className="font-headline-sm text-body-md font-semibold text-on-surface truncate">
                      {currentReaction.phaseSystem}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-surface-container flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider">
                      Stoichiometry
                    </span>
                    <span className="font-headline-sm text-body-md font-semibold text-on-surface truncate">
                      {currentReaction.stoichiometryRatio}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Atom Conservation Matrix Table */}
            <AtomConservationTable reaction={currentReaction} />
          </div>

          {/* Right Column: Thermodynamics Card & Reactant Molar Details (5 cols) */}
          <div className="lg:col-span-5 space-y-space-md">
            <ThermodynamicsCard reaction={currentReaction} />

            {/* Molar masses of participants */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-low space-y-3">
              <h4 className="font-headline-sm text-label-md font-bold text-on-surface">
                Participant Molar Masses
              </h4>
              <div className="space-y-1.5 font-body-sm text-body-sm">
                {[...currentReaction.reactants, ...currentReaction.products].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-code-md font-bold text-primary">{item.formula}</span>
                      <span className="text-on-surface-variant font-medium">({item.name})</span>
                    </div>
                    <span className="font-code-sm text-code-sm font-semibold text-on-surface">
                      {item.molarMass} g/mol
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
