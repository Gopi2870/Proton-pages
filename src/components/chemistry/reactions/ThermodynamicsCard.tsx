import React from 'react';
import { ChemicalReaction } from '../../../types/chemistry';

interface ThermodynamicsCardProps {
  reaction: ChemicalReaction;
}

export const ThermodynamicsCard: React.FC<ThermodynamicsCardProps> = ({
  reaction,
}) => {
  const isSpontaneous = reaction.deltaG < 0;
  const isExothermic = reaction.deltaH < 0;

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-low space-y-space-md">
      {/* Header */}
      <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-low">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-tertiary">thermostat</span>
          <h4 className="font-headline-sm text-label-md font-bold text-on-surface">
            Thermodynamic State Functions
          </h4>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-[11px] font-bold">
          T = {reaction.conditions.temperature} K
        </span>
      </div>

      {/* Grid of Thermodynamic Properties */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Delta H */}
        <div className="p-3 rounded-xl bg-surface-container flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline text-[11px] uppercase font-semibold">
            <span>Enthalpy (ΔH°)</span>
            <span
              className={`px-1.5 py-0.2 rounded font-code-sm text-[10px] ${
                isExothermic ? 'bg-error-container text-error' : 'bg-blue-100 text-blue-700'
              }`}
            >
              {isExothermic ? 'Exothermic' : 'Endothermic'}
            </span>
          </div>
          <div className="font-code-md text-headline-sm font-bold text-on-surface mt-1">
            {reaction.deltaH > 0 ? `+${reaction.deltaH}` : reaction.deltaH}{' '}
            <span className="text-xs font-normal text-outline">kJ/mol</span>
          </div>
        </div>

        {/* Delta S */}
        <div className="p-3 rounded-xl bg-surface-container flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline text-[11px] uppercase font-semibold">
            <span>Entropy (ΔS°)</span>
            <span className="px-1.5 py-0.2 rounded bg-surface-container-high text-on-surface-variant font-code-sm text-[10px]">
              {reaction.deltaS > 0 ? 'Disorder ↑' : 'Disorder ↓'}
            </span>
          </div>
          <div className="font-code-md text-headline-sm font-bold text-on-surface mt-1">
            {reaction.deltaS > 0 ? `+${reaction.deltaS}` : reaction.deltaS}{' '}
            <span className="text-xs font-normal text-outline">J/(mol·K)</span>
          </div>
        </div>

        {/* Delta G */}
        <div className="p-3 rounded-xl bg-surface-container flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline text-[11px] uppercase font-semibold">
            <span>Gibbs Free Energy (ΔG°)</span>
            <span
              className={`px-1.5 py-0.2 rounded font-code-sm text-[10px] font-bold ${
                isSpontaneous ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}
            >
              {isSpontaneous ? 'Spontaneous' : 'Non-spontaneous'}
            </span>
          </div>
          <div className="font-code-md text-headline-sm font-bold text-primary mt-1">
            {reaction.deltaG > 0 ? `+${reaction.deltaG}` : reaction.deltaG}{' '}
            <span className="text-xs font-normal text-outline">kJ/mol</span>
          </div>
        </div>

        {/* Equilibrium Constant Keq */}
        <div className="p-3 rounded-xl bg-surface-container flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline text-[11px] uppercase font-semibold">
            <span>Equilibrium Constant (Keq)</span>
            <span className="px-1.5 py-0.2 rounded bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-[10px]">
              K {'>'} 1 Products
            </span>
          </div>
          <div className="font-code-md text-headline-sm font-bold text-secondary mt-1 truncate">
            {reaction.keq}
          </div>
        </div>
      </div>

      {/* Conditions summary */}
      <div className="p-3 rounded-lg bg-surface-container-low flex flex-wrap items-center justify-between gap-2 text-body-sm font-body-sm">
        <div className="flex items-center gap-1.5 text-on-surface">
          <span className="material-symbols-outlined text-[16px] text-outline">speed</span>
          <span className="font-semibold">P = {reaction.conditions.pressure} atm</span>
        </div>
        {reaction.conditions.catalyst && (
          <div className="flex items-center gap-1.5 text-on-surface">
            <span className="material-symbols-outlined text-[16px] text-tertiary">bolt</span>
            <span>Catalyst: <strong className="font-code-sm text-primary">{reaction.conditions.catalyst}</strong></span>
          </div>
        )}
      </div>
    </div>
  );
};
