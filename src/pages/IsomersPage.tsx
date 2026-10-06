import React, { useState } from 'react';
import { COMPREHENSIVE_ISOMERS } from '../data/isomersComprehensive';
import { IsomerPair } from '../types/isomers';
import { GitCompare, Sparkles, BookOpen } from 'lucide-react';

export const IsomersPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState('All');
  const [activePair, setActivePair] = useState<IsomerPair>(COMPREHENSIVE_ISOMERS[0]);

  const types = ['All', 'Constitutional (Positional)', 'Constitutional (Functional)', 'Stereoisomer (Enantiomer)'];

  const filtered = COMPREHENSIVE_ISOMERS.filter((item) => {
    return selectedType === 'All' || item.type.includes(selectedType);
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <GitCompare className="w-6 h-6 text-indigo-400" /> Isomer Differentiation Laboratory
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Comparative physical property spectroscopy and stereochemical relationship analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-3 overflow-y-auto max-h-[700px]">
          {filtered.map((pair) => {
            const isSelected = pair.id === activePair.id;
            return (
              <div
                key={pair.id}
                onClick={() => setActivePair(pair)}
                className={`p-4 rounded-xl border transition cursor-pointer ${
                  isSelected ? 'bg-indigo-500/10 border-indigo-500 shadow-sm' : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white">{pair.title}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300">
                    {pair.molecularFormula}
                  </span>
                </div>
                <div className="mt-2 text-xs text-slate-400">
                  <span>{pair.compoundA.name}</span> vs <span>{pair.compoundB.name}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Compound A */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-primary-500/10 text-primary-400 border border-primary-500/20">
                Isomer Form A
              </span>
              <h3 className="text-base font-bold text-white">{activePair.compoundA.name}</h3>
              <p className="text-xs text-slate-400 font-mono">IUPAC: {activePair.compoundA.iupac}</p>
              <div className="pt-2 border-t border-slate-800/80 space-y-1 text-xs text-slate-300">
                <div>• Boiling Point: <span className="font-semibold text-white">{activePair.compoundA.boilingPointC} °C</span></div>
                <div>• Melting Point: <span className="font-semibold text-white">{activePair.compoundA.meltingPointC} °C</span></div>
                <div>• Density: <span className="font-semibold text-white">{activePair.compoundA.densityGml} g/mL</span></div>
                <div>• Specific Rotation: <span className="font-semibold text-teal-400">{activePair.compoundA.specificRotation}</span></div>
              </div>
            </div>

            {/* Compound B */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                Isomer Form B
              </span>
              <h3 className="text-base font-bold text-white">{activePair.compoundB.name}</h3>
              <p className="text-xs text-slate-400 font-mono">IUPAC: {activePair.compoundB.iupac}</p>
              <div className="pt-2 border-t border-slate-800/80 space-y-1 text-xs text-slate-300">
                <div>• Boiling Point: <span className="font-semibold text-white">{activePair.compoundB.boilingPointC} °C</span></div>
                <div>• Melting Point: <span className="font-semibold text-white">{activePair.compoundB.meltingPointC} °C</span></div>
                <div>• Density: <span className="font-semibold text-white">{activePair.compoundB.densityGml} g/mL</span></div>
                <div>• Specific Rotation: <span className="font-semibold text-teal-400">{activePair.compoundB.specificRotation}</span></div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Differentiation Mechanism & Spectroscopy</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{activePair.mechanismOfDifferentiation}</p>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300">
              <span className="font-semibold text-indigo-400">Analytical Signature:</span> {activePair.spectroscopyDifference}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
