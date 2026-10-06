import React from 'react';
import { TitrationSession } from '../../../types/chemistry';
import { TitrationChart } from './TitrationChart';

interface TitrationRigProps {
  session: TitrationSession;
  onDispense: (volumeMl: number) => void;
  onToggleStirrer: () => void;
}

export const TitrationRig: React.FC<TitrationRigProps> = ({
  session,
  onDispense,
  onToggleStirrer,
}) => {
  const currentVolume = session.titrantVolumeAdded;
  const currentPh = session.currentPh;
  const isStirring = session.stirrerActive;

  // Burette fluid height (50 mL capacity)
  const buretteRemainingMl = Math.max(0, 50 - currentVolume);
  const fluidHeightPercent = (buretteRemainingMl / 50) * 100;

  // Flask liquid color based on indicator (Phenolphthalein) & pH
  const getFlaskColor = () => {
    if (currentPh < 8.2) {
      return 'rgba(235, 248, 255, 0.5)'; // Crystal clear watery solution
    } else if (currentPh < 9.0) {
      return 'rgba(244, 114, 182, 0.45)'; // Faint pink endpoint
    } else {
      return 'rgba(219, 39, 119, 0.75)'; // Vibrant deep fuchsia excess base
    }
  };

  return (
    <div className="flex flex-col bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container-low h-full justify-between gap-space-md">
      {/* Viewport Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">biotech</span>
          <span className="font-headline-sm text-label-md font-bold text-on-surface">
            Analytical Titration Workcell #2
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-code-sm font-semibold">
            {session.analyte.formula} vs {session.titrant.formula}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 font-code-sm text-[11px] font-bold">
            {session.indicator}
          </span>
        </div>
      </div>

      {/* Main Visual Laboratory Rig Viewport */}
      <div className="relative w-full min-h-[380px] bg-gradient-to-b from-surface-container-low via-surface-container-lowest to-surface-container rounded-xl border border-surface-container-high p-4 flex flex-col items-center justify-between overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 chem-grid-pattern pointer-events-none opacity-40" />

        {/* Burette Top Clamp & Glass Column */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Clamp stand */}
          <div className="w-48 h-3 rounded bg-slate-700 shadow-sm" />
          <div className="w-2.5 h-10 bg-slate-500 -mt-1" />

          {/* Graduated Burette Tube */}
          <div className="relative w-7 h-48 rounded-t-sm rounded-b-md border-2 border-slate-400 bg-white/70 backdrop-blur-xs flex flex-col justify-end overflow-hidden shadow-inner">
            {/* Liquid inside burette */}
            <div
              className="w-full bg-cyan-500/80 transition-all duration-300"
              style={{ height: `${fluidHeightPercent}%` }}
            />
            {/* Ticks on burette */}
            <div className="absolute inset-y-0 right-0 w-2 flex flex-col justify-between py-1 pointer-events-none">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-full h-px bg-slate-400" />
              ))}
            </div>
          </div>

          {/* Stopcock valve */}
          <div className="w-8 h-4 bg-slate-800 rounded-sm flex items-center justify-center my-0.5 shadow-xs">
            <div className="w-3 h-1.5 bg-red-400 rounded-xs" />
          </div>

          {/* Tip with falling droplet */}
          <div className="w-1.5 h-5 bg-slate-400" />
          {session.buretteDripRate > 0 && (
            <div className="w-2 h-2.5 rounded-full bg-cyan-400 animate-bounce mt-1" />
          )}
        </div>

        {/* Erlenmeyer Flask on Stirrer */}
        <div className="relative z-10 flex flex-col items-center mt-2">
          {/* Erlenmeyer Flask Body (SVG) */}
          <div className="relative w-36 h-32 flex items-center justify-center">
            <svg
              viewBox="0 0 100 90"
              className="w-full h-full drop-shadow-md overflow-visible"
            >
              {/* Glass flask outline */}
              <polygon
                points="40,5 60,5 60,25 90,82 10,82 40,25"
                fill="none"
                stroke="#64748b"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {/* Liquid fill in flask */}
              <polygon
                points="30,45 70,45 88,80 12,80"
                fill={getFlaskColor()}
                className="transition-colors duration-500"
              />
              {/* Stirring vortex */}
              {isStirring && (
                <ellipse
                  cx="50"
                  cy="75"
                  rx="14"
                  ry="4"
                  fill="#ffffff"
                  opacity="0.4"
                  className="animate-spin"
                />
              )}
            </svg>

            {/* Submerged pH Electrode */}
            <div className="absolute top-2 right-12 w-1.5 h-20 bg-slate-600 rounded-full rotate-12 shadow-sm" />
          </div>

          {/* Magnetic Stirrer Platform */}
          <div
            onClick={onToggleStirrer}
            className={`w-44 h-8 rounded-lg border flex items-center justify-between px-3 cursor-pointer transition-all shadow-sm ${
              isStirring
                ? 'bg-slate-800 text-white border-slate-700'
                : 'bg-surface-container-high text-on-surface border-slate-300'
            }`}
          >
            <div className="flex items-center gap-1.5 font-code-sm text-[11px]">
              <span
                className={`w-2 h-2 rounded-full ${
                  isStirring ? 'bg-emerald-400 animate-ping' : 'bg-slate-400'
                }`}
              />
              <span>{isStirring ? 'Stirrer: 450 RPM' : 'Stirrer: OFF'}</span>
            </div>
            <span className="font-label-sm text-[10px] text-outline">Click toggle</span>
          </div>
        </div>
      </div>

      {/* Titration Real-time Curve preview embedded */}
      <TitrationChart
        dataPoints={session.dataPoints}
        currentVolume={currentVolume}
        currentPh={currentPh}
      />

      {/* Continuous Volume Slider & Incremental Drop Controls */}
      <div className="p-3 bg-surface-container-low rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface font-semibold">
            Burette Fluid Dispenser ({session.titrant.name})
          </span>
          <span className="font-code-sm text-code-sm font-bold text-primary">
            {currentVolume.toFixed(2)} / 50.00 mL Added
          </span>
        </div>

        {/* Continuous slider */}
        <input
          type="range"
          min="0"
          max="50"
          step="0.05"
          value={currentVolume}
          onChange={(e) => {
            const targetVal = Number(e.target.value);
            const delta = targetVal - currentVolume;
            if (delta > 0) onDispense(delta);
          }}
          className="w-full accent-secondary h-2 bg-surface-container-high rounded-lg cursor-pointer"
        />

        {/* Incremental Dispense Buttons */}
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => onDispense(0.1)}
            disabled={buretteRemainingMl <= 0}
            className="py-1.5 px-2 rounded-lg bg-surface-container-lowest border border-surface-container-high hover:bg-surface-container font-code-sm text-[11px] font-bold text-on-surface transition-all active:scale-95 disabled:opacity-50"
          >
            +0.1 mL (Micro)
          </button>
          <button
            onClick={() => onDispense(0.5)}
            disabled={buretteRemainingMl <= 0}
            className="py-1.5 px-2 rounded-lg bg-secondary-fixed text-on-secondary-fixed-variant hover:bg-secondary-fixed/80 font-code-sm text-[11px] font-bold transition-all active:scale-95 disabled:opacity-50"
          >
            +0.5 mL (Drop)
          </button>
          <button
            onClick={() => onDispense(1.0)}
            disabled={buretteRemainingMl <= 0}
            className="py-1.5 px-2 rounded-lg bg-primary-fixed text-on-primary-fixed hover:bg-primary-fixed/80 font-code-sm text-[11px] font-bold transition-all active:scale-95 disabled:opacity-50"
          >
            +1.0 mL (Stream)
          </button>
          <button
            onClick={() => onDispense(5.0)}
            disabled={buretteRemainingMl <= 0}
            className="py-1.5 px-2 rounded-lg bg-primary-container text-on-primary hover:bg-primary font-code-sm text-[11px] font-bold transition-all active:scale-95 disabled:opacity-50"
          >
            +5.0 mL (Rapid)
          </button>
        </div>
      </div>
    </div>
  );
};
