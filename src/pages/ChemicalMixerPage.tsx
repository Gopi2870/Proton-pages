import React, { useState } from 'react';
import { FlaskConical, Plus, RotateCcw, AlertCircle, Sparkles } from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';

interface ReagentItem {
  id: string;
  name: string;
  formula: string;
  color: string;
  molarity: number;
  ph: number;
}

const AVAILABLE_REAGENTS: ReagentItem[] = [
  { id: 'r1', name: 'Hydrochloric Acid', formula: 'HCl (aq)', color: 'bg-blue-500/20 text-blue-400', molarity: 1.0, ph: 0.0 },
  { id: 'r2', name: 'Sodium Hydroxide', formula: 'NaOH (aq)', color: 'bg-emerald-500/20 text-emerald-400', molarity: 1.0, ph: 14.0 },
  { id: 'r3', name: 'Silver Nitrate', formula: 'AgNO3 (aq)', color: 'bg-slate-400/20 text-slate-300', molarity: 0.1, ph: 6.5 },
  { id: 'r4', name: 'Potassium Chromate', formula: 'K2CrO4 (aq)', color: 'bg-amber-500/20 text-amber-400', molarity: 0.1, ph: 8.8 },
  { id: 'r5', name: 'Copper(II) Sulfate', formula: 'CuSO4 (aq)', color: 'bg-cyan-500/20 text-cyan-400', molarity: 0.5, ph: 4.0 },
  { id: 'r6', name: 'Phenolphthalein Indicator', formula: 'C20H14O4', color: 'bg-fuchsia-500/20 text-fuchsia-400', molarity: 0.01, ph: 7.0 }
];

export const ChemicalMixerPage: React.FC = () => {
  const [selectedReagents, setSelectedReagents] = useState<ReagentItem[]>([]);
  const [beakerPh, setBeakerPh] = useState<number>(7.0);
  const [precipitate, setPrecipitate] = useState<string | null>(null);

  const handleAddReagent = (reagent: ReagentItem) => {
    const updated = [...selectedReagents, reagent];
    setSelectedReagents(updated);

    // Compute dynamic beaker pH simulation
    const avgPh = Number((updated.reduce((acc, r) => acc + r.ph, 0) / updated.length).toFixed(2));
    setBeakerPh(avgPh);

    // Check for precipitation triggers
    const formulas = updated.map(r => r.formula);
    if (formulas.includes('AgNO3 (aq)') && formulas.includes('HCl (aq)')) {
      setPrecipitate('AgCl(s) - Dense Curdy White Precipitate');
    } else if (formulas.includes('AgNO3 (aq)') && formulas.includes('K2CrO4 (aq)')) {
      setPrecipitate('Ag2CrO4(s) - Brick Red Precipitate');
    } else if (formulas.includes('CuSO4 (aq)') && formulas.includes('NaOH (aq)')) {
      setPrecipitate('Cu(OH)2(s) - Pale Blue Gelatinous Precipitate');
    }
  };

  const handleReset = () => {
    setSelectedReagents([]);
    setBeakerPh(7.0);
    setPrecipitate(null);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-teal-400" /> Virtual Chemical Mixer & Precipitation Chamber
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Simulate reagent additions, solubility product constants (Ksp), and aqueous ionic equilibria in real-time.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition flex items-center gap-2"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Reaction Beaker
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Reagent Shelf */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-semibold text-slate-200">Reagent Dispensary</h3>
          <p className="text-[11px] text-slate-400">Click a reagent to pipette 10 mL into the central reaction beaker.</p>
          <div className="space-y-2 pt-2">
            {AVAILABLE_REAGENTS.map((r) => (
              <button
                key={r.id}
                onClick={() => handleAddReagent(r)}
                className="w-full p-3 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between text-left group"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-200 group-hover:text-teal-300 transition">{r.name}</div>
                  <div className="text-[10px] font-mono text-slate-500">{r.formula} • {r.molarity} M</div>
                </div>
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-teal-500/20 group-hover:text-teal-400 transition">
                  <Plus className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Reaction Beaker Chamber */}
        <div className="md:col-span-2 bg-slate-900/60 border border-slate-800 rounded-xl p-6 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono text-slate-400">Active Vessel Volume: {selectedReagents.length * 10} mL</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Measured pH:</span>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${beakerPh < 7 ? 'bg-rose-500/10 text-rose-400' : beakerPh > 7 ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                {beakerPh}
              </span>
            </div>
          </div>

          {/* Visual Beaker Mock */}
          <div className="relative h-64 rounded-2xl bg-slate-950 border-2 border-slate-800 flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 bg-teal-500/15 border-t border-teal-500/30 transition-all duration-500" style={{ height: `${Math.min(90, selectedReagents.length * 15 + 10)}%` }} />
            {selectedReagents.length === 0 ? (
              <span className="text-xs text-slate-600 z-10">Beaker Empty. Add reagents to initiate simulation.</span>
            ) : (
              <div className="z-10 text-center space-y-2">
                <span className="text-xs font-semibold text-teal-300">Solution Active</span>
                {precipitate && (
                  <div className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold animate-pulse">
                    ✨ Precipitate Formed: {precipitate}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Ingredients Log */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase mb-2">Mixed Species in Vessel</h4>
            {selectedReagents.length === 0 ? (
              <p className="text-xs text-slate-500">No chemical reagents added yet.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedReagents.map((r, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {r.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
