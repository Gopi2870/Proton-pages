import React, { useState } from 'react';
import { Activity, Sparkles, Sliders } from 'lucide-react';

interface SpectroscopyViewerProps {
  moleculeName?: string;
}

export const SpectroscopyViewer: React.FC<SpectroscopyViewerProps> = ({ moleculeName = 'Ethanol (C2H6O)' }) => {
  const [activeMode, setActiveMode] = useState<'FTIR' | 'UV-Vis' | '1H-NMR'>('FTIR');

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-400" /> Analytical Spectroscopy Interactive Viewer
          </h3>
          <p className="text-xs text-slate-400">Target Molecule: <span className="text-teal-300 font-semibold">{moleculeName}</span></p>
        </div>
        <div className="flex gap-2">
          {(['FTIR', 'UV-Vis', '1H-NMR'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setActiveMode(m)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                activeMode === m ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Mock Spectral Canvas */}
      <div className="h-64 rounded-xl bg-slate-950 border border-slate-800 p-4 flex flex-col justify-between font-mono text-[10px] text-slate-500">
        <div className="flex justify-between text-slate-400">
          <span>% Transmittance (T)</span>
          <span>Mode: {activeMode} • Baseline Normalized</span>
        </div>
        <div className="h-40 flex items-end justify-around border-b border-slate-800">
          <div className="w-2 bg-teal-500/70 h-32 rounded-t" title="3350 cm⁻¹ (O-H broad stretch)" />
          <div className="w-1 bg-slate-700 h-12 rounded-t" />
          <div className="w-2 bg-primary-500/70 h-28 rounded-t" title="2970 cm⁻¹ (C-H stretch)" />
          <div className="w-1 bg-slate-700 h-8 rounded-t" />
          <div className="w-2 bg-amber-500/70 h-24 rounded-t" title="1050 cm⁻¹ (C-O stretch)" />
        </div>
        <div className="flex justify-between text-slate-400 pt-1">
          <span>4000 cm⁻¹</span>
          <span>3000 cm⁻¹</span>
          <span>2000 cm⁻¹</span>
          <span>1000 cm⁻¹</span>
          <span>400 cm⁻¹</span>
        </div>
      </div>
    </div>
  );
};
