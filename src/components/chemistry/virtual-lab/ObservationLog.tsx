import React from 'react';
import { TitrationSession } from '../../../types/chemistry';

interface ObservationLogProps {
  session: TitrationSession;
  onReset: () => void;
  onAskAi: () => void;
}

export const ObservationLog: React.FC<ObservationLogProps> = ({
  session,
  onReset,
  onAskAi,
}) => {
  const isEndpoint = session.currentPh >= 8.2;
  const isNeutral = Math.abs(session.currentPh - 7.0) < 0.2;

  return (
    <aside className="flex flex-col gap-space-sm bg-surface-container-lowest p-space-sm rounded-xl shadow-sm border border-surface-container-low h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">
            analytics
          </span>
          <span className="font-headline-sm text-label-md font-bold text-on-surface">
            Analytical Readout Deck
          </span>
        </div>
        <button
          onClick={onReset}
          className="text-outline hover:text-on-surface p-1 rounded hover:bg-surface-container transition-colors"
          title="Reset Simulation Setup"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">restart_alt</span>
        </button>
      </div>

      {/* Main Sensor Meters */}
      <div className="grid grid-cols-3 gap-2">
        {/* pH Probe */}
        <div className="p-2.5 rounded-lg bg-surface-container flex flex-col justify-between">
          <span className="text-[10px] font-label-sm text-outline uppercase font-semibold">
            pH Probe
          </span>
          <div
            className={`font-code-md text-headline-sm font-bold mt-1 ${
              isEndpoint
                ? 'text-pink-600'
                : isNeutral
                ? 'text-emerald-600'
                : 'text-primary'
            }`}
          >
            {session.currentPh.toFixed(2)}
          </div>
          <span className="font-code-sm text-[9px] text-outline">±0.01 pH</span>
        </div>

        {/* Conductivity */}
        <div className="p-2.5 rounded-lg bg-surface-container flex flex-col justify-between">
          <span className="text-[10px] font-label-sm text-outline uppercase font-semibold">
            Conductivity
          </span>
          <div className="font-code-md text-headline-sm font-bold text-secondary mt-1">
            {(
              session.dataPoints[session.dataPoints.length - 1]?.conductivity || 15.0
            ).toFixed(1)}
          </div>
          <span className="font-code-sm text-[9px] text-outline">mS/cm</span>
        </div>

        {/* Temperature */}
        <div className="p-2.5 rounded-lg bg-surface-container flex flex-col justify-between">
          <span className="text-[10px] font-label-sm text-outline uppercase font-semibold">
            Temperature
          </span>
          <div className="font-code-md text-headline-sm font-bold text-on-surface mt-1">
            {(
              session.dataPoints[session.dataPoints.length - 1]?.temperature || 25.0
            ).toFixed(1)}
          </div>
          <span className="font-code-sm text-[9px] text-outline">°C (PT100)</span>
        </div>
      </div>

      {/* Endpoint Alert Banner */}
      {isEndpoint && (
        <div className="p-3 rounded-xl bg-pink-50 border border-pink-200 text-pink-900 space-y-1 animate-pulse">
          <div className="flex items-center gap-1.5 font-bold font-headline-sm text-xs text-pink-700">
            <span className="material-symbols-outlined text-[16px]">celebration</span>
            <span>Phenolphthalein Endpoint Reached!</span>
          </div>
          <p className="text-[11px] leading-tight text-pink-800">
            Persistent faint pink coloration observed (pH &gt; 8.2). Titrant volume added: {session.titrantVolumeAdded.toFixed(2)} mL.
          </p>
        </div>
      )}

      {/* Observation History Feed */}
      <div className="space-y-2 flex-1 overflow-y-auto max-h-[340px] pr-1">
        <span className="font-label-sm text-[10px] uppercase text-outline font-semibold">
          Experiment Log ({session.dataPoints.length} points)
        </span>
        <div className="space-y-1.5">
          {session.dataPoints.slice(-5).reverse().map((pt, i) => (
            <div
              key={i}
              className="p-2 rounded-lg bg-surface-container-low text-body-sm font-body-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="font-code-sm text-[11px] font-bold text-on-surface">
                  +{pt.volumeAdded} mL
                </span>
                <span className="text-outline text-xs">➔</span>
                <span
                  className={`font-code-sm text-[11px] font-bold ${
                    pt.pH >= 8.2 ? 'text-pink-600' : 'text-primary'
                  }`}
                >
                  pH {pt.pH.toFixed(2)}
                </span>
              </div>
              <span className="font-code-sm text-[10px] text-outline">
                {pt.conductivity} mS/cm
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Safety & AI Consultation */}
      <div className="pt-2 border-t border-surface-container-low space-y-2 shrink-0">
        <button
          onClick={onAskAi}
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gradient-to-r from-tertiary-container to-tertiary text-on-tertiary font-label-md text-label-md font-semibold shadow-xs hover:opacity-95"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">psychology</span>
          <span>Analyze Curve with AI Tutor</span>
        </button>

        <div className="p-2 rounded-lg bg-surface-container-low text-[11px] text-on-surface-variant flex items-center gap-2">
          <span className="material-symbols-outlined text-amber-500 text-[18px]">
            warning
          </span>
          <span>Safety: Wear nitrile gloves and splash goggles for 0.1 M NaOH & HCl handling.</span>
        </div>
      </div>
    </aside>
  );
};
