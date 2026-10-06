import React, { useState } from 'react';
import { COMPREHENSIVE_FUNCTIONAL_GROUPS } from '../data/functionalGroupsComprehensive';
import { FunctionalGroup } from '../types/functionalGroups';
import { FlaskConical, Search, Sparkles } from 'lucide-react';

export const FunctionalGroupsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeGroup, setActiveGroup] = useState<FunctionalGroup>(COMPREHENSIVE_FUNCTIONAL_GROUPS[0]);

  const filtered = COMPREHENSIVE_FUNCTIONAL_GROUPS.filter((fg) => {
    return fg.name.toLowerCase().includes(searchTerm.toLowerCase()) || fg.formula.includes(searchTerm);
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-teal-400" /> Functional Groups Library
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            IR vibrational modes, 1H/13C NMR chemical shifts, and canonical reaction pathways.
          </p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search functional groups..."
            className="bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500 w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-3 overflow-y-auto max-h-[700px]">
          {filtered.map((fg) => {
            const isSelected = fg.id === activeGroup.id;
            return (
              <div
                key={fg.id}
                onClick={() => setActiveGroup(fg)}
                className={`p-4 rounded-xl border transition cursor-pointer ${
                  isSelected ? 'bg-teal-500/10 border-teal-500 shadow-sm' : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white">{fg.name}</h3>
                  <span className="text-xs font-mono text-teal-400 font-bold">{fg.formula}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Class: {fg.groupClass}</div>
              </div>
            );
          })}
        </div>

        <div className="md:col-span-2 bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase text-teal-400">{activeGroup.groupClass}</span>
            <h2 className="text-2xl font-bold text-white mt-1">{activeGroup.name}</h2>
            <div className="mt-2 flex gap-4 text-xs font-mono text-slate-300">
              <span>Formula: {activeGroup.formula}</span>
              <span>Prefix: {activeGroup.iupacPrefix}</span>
              <span>Suffix: {activeGroup.iupacSuffix}</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Characteristic Infrared (IR) Bands</h4>
            <div className="space-y-2">
              {activeGroup.characteristicIR.map((ir, i) => (
                <div key={i} className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-mono text-teal-300 font-semibold">{ir.peakCm} cm⁻¹</span>
                  <span className="text-slate-400">{ir.vibrationType}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">{ir.intensity}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Nuclear Magnetic Resonance (NMR) Shifts</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs">
                <span className="text-slate-400 block mb-1">¹H-NMR Typical Shift</span>
                <span className="font-mono text-slate-200">{activeGroup.nmrShiftPpm.protonH1}</span>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs">
                <span className="text-slate-400 block mb-1">¹³C-NMR Typical Shift</span>
                <span className="font-mono text-slate-200">{activeGroup.nmrShiftPpm.carbonC13}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Key Synthetic Transformations</h4>
            <div className="space-y-2">
              {activeGroup.keyReactions.map((rxn, i) => (
                <div key={i} className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs space-y-1">
                  <div className="font-semibold text-white">{rxn.title}</div>
                  <div className="font-mono text-teal-400 text-[11px]">{rxn.equation}</div>
                  <p className="text-slate-400 text-[11px]">{rxn.outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
