import React, { useState } from 'react';
import { Flame, Play, RotateCcw, Activity } from 'lucide-react';

export const CalorimeterRig: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [tempC, setTempC] = useState(25.0);

  const handleIgnite = () => {
    setRunning(true);
    setTempC(29.4);
  };

  const handleReset = () => {
    setRunning(false);
    setTempC(25.0);
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" /> Constant-Volume Bomb Calorimeter
          </h3>
          <p className="text-xs text-slate-400">Measure heat of combustion (ΔH_comb) and system heat capacity (C_cal).</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleIgnite}
            disabled={running}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-500 text-white transition disabled:opacity-50 flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5" /> Ignite Sample
          </button>
          <button
            onClick={handleReset}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
          <span className="text-[10px] uppercase text-slate-500 font-semibold">Water Bath Temp</span>
          <div className="text-lg font-mono font-bold text-teal-400 mt-1">{tempC.toFixed(2)} °C</div>
        </div>
        <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
          <span className="text-[10px] uppercase text-slate-500 font-semibold">Calorimeter Constant C</span>
          <div className="text-lg font-mono font-bold text-slate-200 mt-1">10.25 kJ/°C</div>
        </div>
        <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
          <span className="text-[10px] uppercase text-slate-500 font-semibold">Calculated Heat Release</span>
          <div className="text-lg font-mono font-bold text-amber-400 mt-1">
            {running ? ((tempC - 25.0) * 10.25).toFixed(2) : '0.00'} kJ
          </div>
        </div>
      </div>
    </div>
  );
};
