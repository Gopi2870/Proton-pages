import React, { useState } from 'react';
import { Search, Filter, BookOpen, Flame, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { COMPREHENSIVE_REACTIONS } from '../data/reactionsComprehensive';
import { ComprehensiveReaction } from '../types/comprehensiveChemistry';

export const ReactionDatabasePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedReaction, setSelectedReaction] = useState<ComprehensiveReaction>(COMPREHENSIVE_REACTIONS[0]);

  const categories = ['all', 'Organic Synthesis', 'Inorganic Redox', 'Organometallic Catalysis', 'Biochemical Pathway'];

  const filteredReactions = COMPREHENSIVE_REACTIONS.filter((rxn) => {
    const matchesSearch =
      rxn.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rxn.balancedEquation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || rxn.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Flame className="w-6 h-6 text-amber-400" /> Reaction Reference Database
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Comprehensive repository of verified reaction mechanisms, thermodynamic state values, and kinetic rate laws.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search equations, reactants..."
              className="bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-primary-500 w-64"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-primary-500"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Reaction List */}
        <div className="lg:col-span-1 bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[700px]">
          <div className="p-3 bg-slate-950/60 border-b border-slate-800 text-xs font-semibold text-slate-400 flex justify-between">
            <span>Reactions Found</span>
            <span className="text-primary-400">{filteredReactions.length}</span>
          </div>
          <div className="overflow-y-auto divide-y divide-slate-800/60 flex-1">
            {filteredReactions.map((rxn) => {
              const isSelected = rxn.id === selectedReaction.id;
              return (
                <button
                  key={rxn.id}
                  onClick={() => setSelectedReaction(rxn)}
                  className={`w-full p-4 text-left transition flex flex-col gap-1 ${
                    isSelected ? 'bg-primary-500/10 border-l-4 border-primary-500' : 'hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200">{rxn.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {rxn.category}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-teal-400 truncate">{rxn.balancedEquation}</div>
                  <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-1">
                    <span>ΔH°: {rxn.deltaH0KjMol} kJ/mol</span>
                    <span>Ea: {rxn.activationEnergyKjMol} kJ/mol</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Reaction Dossier */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6 overflow-y-auto h-[700px]">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
              {selectedReaction.category} • {selectedReaction.subCategory}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">{selectedReaction.title}</h2>
            <div className="mt-3 p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-sm text-teal-300">
              {selectedReaction.balancedEquation}
            </div>
          </div>

          {/* Thermodynamics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Standard Enthalpy ΔH°</span>
              <div className="text-sm font-bold text-slate-200 mt-1">{selectedReaction.deltaH0KjMol} kJ/mol</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Standard Entropy ΔS°</span>
              <div className="text-sm font-bold text-slate-200 mt-1">{selectedReaction.deltaS0JmolK} J/(mol·K)</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Gibbs Free Energy ΔG°</span>
              <div className="text-sm font-bold text-slate-200 mt-1">{selectedReaction.deltaG0KjMol} kJ/mol</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Activation Energy Ea</span>
              <div className="text-sm font-bold text-slate-200 mt-1">{selectedReaction.activationEnergyKjMol} kJ/mol</div>
            </div>
          </div>

          {/* Elementary Steps */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Step-by-Step Reaction Mechanism
            </h3>
            <div className="space-y-3">
              {selectedReaction.mechanismSteps.map((step) => (
                <div key={step.stepNumber} className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-300">Step {step.stepNumber}: {step.intermediateName}</span>
                    {step.isRateDeterminingStep && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-semibold">
                        Rate Determining Step
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-teal-400">{step.elementaryEquation}</div>
                  <p className="text-slate-400 text-[11px]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Conditions & Safety */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-slate-950/40 border border-slate-800">
              <h4 className="text-xs font-semibold text-slate-300 mb-2">Process Conditions & Catalysis</h4>
              <ul className="text-xs text-slate-400 space-y-1">
                <li>• Solvent: <span className="text-slate-200">{selectedReaction.solvent}</span></li>
                <li>• Catalyst: <span className="text-slate-200">{selectedReaction.catalyst || 'None (Thermal)'}</span></li>
                <li>• Temperature: <span className="text-slate-200">{selectedReaction.temperatureK} K</span></li>
                <li>• Pressure: <span className="text-slate-200">{selectedReaction.pressureAtm} atm</span></li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-slate-950/40 border border-slate-800">
              <h4 className="text-xs font-semibold text-rose-400 mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" /> Safety & Containment
              </h4>
              <ul className="text-xs text-slate-400 space-y-1">
                {selectedReaction.safetyHazards.map((h, i) => (
                  <li key={i}>• {h}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
