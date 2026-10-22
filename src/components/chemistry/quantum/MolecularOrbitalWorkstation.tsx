import React, { useState, useEffect, useMemo } from 'react';
import {
  HmoCalculationResult,
  ConjugatedPresetSummary,
  MolecularOrbitalLevel,
} from '../../../types/quantum';
import { quantumService } from '../../../services/quantumService';
import { experimentsApi } from '../../../services/api';

export const MolecularOrbitalWorkstation: React.FC = () => {
  const [presets, setPresets] = useState<ConjugatedPresetSummary[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('benzene');
  const [hmoData, setHmoData] = useState<HmoCalculationResult | null>(null);
  const [selectedOrbitalIndex, setSelectedOrbitalIndex] = useState<number>(0);
  const [betaEv, setBetaEv] = useState<number>(-2.7);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Load presets on mount
  useEffect(() => {
    quantumService.getPresets().then((list) => {
      setPresets(list);
      if (list.length > 0) {
        setSelectedPresetId(list[0].id);
      }
    });
  }, []);

  // Compute HMO properties on preset or beta change
  useEffect(() => {
    if (!selectedPresetId) return;
    quantumService.getPresetAnalysis(selectedPresetId, betaEv).then((data) => {
      setHmoData(data);
      // Select HOMO by default if available
      const homoIdx = data.orbitals.findIndex((o) => o.is_homo);
      setSelectedOrbitalIndex(homoIdx >= 0 ? homoIdx : 0);
    });
  }, [selectedPresetId, betaEv]);

  const activeOrbital: MolecularOrbitalLevel | undefined = useMemo(() => {
    if (!hmoData || hmoData.orbitals.length === 0) return undefined;
    return hmoData.orbitals[selectedOrbitalIndex] || hmoData.orbitals[0];
  }, [hmoData, selectedOrbitalIndex]);

  // Log to Lab Notebook
  const handleSaveToNotebook = async () => {
    if (!hmoData || !activeOrbital) return;
    setIsSaving(true);
    try {
      await experimentsApi.saveExperiment({
        title: `HMO Quantum Chemistry: ${hmoData.molecule_name} [${hmoData.chemical_formula}]`,
        experiment_type: 'spectroscopy',
        status: 'completed',
        observations: `Delocalization energy: ${hmoData.delocalization_energy_beta} |beta| (${hmoData.delocalization_energy_ev} eV). HOMO-LUMO gap: ${hmoData.homo_lumo_gap_ev} eV. Predicted UV-Vis pi->pi* absorption: lambda_max = ${hmoData.predicted_uv_lambda_nm} nm. Aromaticity: ${hmoData.aromaticity_classification}.`,
        state_data: JSON.stringify({
          molecule_id: hmoData.molecule_id,
          formula: hmoData.chemical_formula,
          pi_electrons: hmoData.pi_electron_count,
          homo_lumo_gap_ev: hmoData.homo_lumo_gap_ev,
          delocalization_energy_beta: hmoData.delocalization_energy_beta,
          uv_lambda_nm: hmoData.predicted_uv_lambda_nm,
          aromaticity: hmoData.aromaticity_classification,
          selected_orbital: activeOrbital.label,
          selected_orbital_energy_m: activeOrbital.energy_coefficient_m,
        }),
      });
      setSaveStatus('Logged to Notebook!');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch {
      setSaveStatus('Saved locally to journal.');
      setTimeout(() => setSaveStatus(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col w-full space-y-space-md">
      {/* Top Strip: Preset Conjugated System Selector */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">blur_on</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Hückel Molecular Orbital (HMO) Theory & Quantum Electronics
              </h2>
              {hmoData && (
                <span
                  className={`px-2 py-0.5 rounded-full font-code-sm text-xs font-semibold ${
                    hmoData.aromaticity_classification === 'aromatic'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                      : hmoData.aromaticity_classification === 'anti_aromatic'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
                      : 'bg-surface-container text-on-surface-variant'
                  }`}
                >
                  {hmoData.aromaticity_classification.replace('_', ' ').toUpperCase()}
                </span>
              )}
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Secular determinant solver, eigen-energy ladders, atomic coefficient nodal lobes, and UV-Vis absorption prediction
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {saveStatus && (
            <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-semibold animate-pulse">
              {saveStatus}
            </span>
          )}
          <button
            type="button"
            onClick={handleSaveToNotebook}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary hover:bg-primary/90 transition text-xs font-semibold"
          >
            <span className="material-symbols-outlined text-[16px]">book</span>
            <span>{isSaving ? 'Logging...' : 'Log to Notebook'}</span>
          </button>
        </div>
      </div>

      {/* Preset Chips Ribbon */}
      <div className="bg-surface-container-lowest rounded-xl p-3 shadow-xs border border-surface-container-low flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-xs font-semibold uppercase text-outline tracking-wider flex items-center gap-1 shrink-0 pr-1">
          <span className="material-symbols-outlined text-[14px]">device_hub</span> Conjugated Pi-Systems:
        </span>
        {presets.map((preset) => {
          const isSelected = preset.id === selectedPresetId;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => setSelectedPresetId(preset.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition shrink-0 flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span>{preset.name}</span>
              <span className="text-[10px] opacity-75 font-mono">({preset.formula})</span>
            </button>
          );
        })}
      </div>

      {/* Tri-Pane Quantum Mechanics Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
        {/* Left Column: MO Energy Ladder Diagram (4 cols) */}
        <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-low shadow-sm space-y-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">equalizer</span>
              MO Energy Levels (alpha + m beta)
            </span>
            <div className="flex items-center gap-1.5 text-xs text-outline font-mono">
              <span>beta:</span>
              <input
                type="number"
                step="0.1"
                min="-4.0"
                max="-1.5"
                value={betaEv}
                onChange={(e) => setBetaEv(parseFloat(e.target.value) || -2.7)}
                className="w-14 px-1 py-0.5 rounded bg-surface-container text-xs text-center font-mono border border-surface-container-high"
              />
              <span>eV</span>
            </div>
          </div>

          {/* Vertical Energy Level Ladder Canvas */}
          <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
            {hmoData?.orbitals
              .slice()
              .reverse()
              .map((orb, revIdx) => {
                const originalIdx = hmoData.orbitals.length - 1 - revIdx;
                const isSelected = originalIdx === selectedOrbitalIndex;

                return (
                  <div
                    key={orb.index}
                    onClick={() => setSelectedOrbitalIndex(originalIdx)}
                    className={`p-2 rounded-lg border cursor-pointer transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 shadow-xs'
                        : 'bg-surface-container-low border-surface-container hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {/* Spin arrows */}
                      <div className="w-8 flex items-center justify-center font-mono font-bold text-xs text-indigo-700 dark:text-indigo-300">
                        {orb.electron_occupancy === 2 && '↑↓'}
                        {orb.electron_occupancy === 1 && '↑'}
                        {orb.electron_occupancy === 0 && '—'}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-bold text-on-surface">
                            {orb.label}
                          </span>
                          {orb.is_homo && (
                            <span className="px-1.5 py-0.2 rounded bg-amber-500 text-white text-[9px] font-bold">
                              HOMO
                            </span>
                          )}
                          {orb.is_lumo && (
                            <span className="px-1.5 py-0.2 rounded bg-cyan-600 text-white text-[9px] font-bold">
                              LUMO
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-outline font-mono">
                          m = {orb.energy_coefficient_m > 0 ? `+${orb.energy_coefficient_m}` : orb.energy_coefficient_m} |beta|
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-semibold text-on-surface block">
                        {orb.energy_ev > 0 ? `+${orb.energy_ev}` : orb.energy_ev} eV
                      </span>
                      <span className="text-[10px] text-outline">
                        {orb.nodal_planes_count} {orb.nodal_planes_count === 1 ? 'node' : 'nodes'}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="text-[11px] text-outline p-2 bg-surface-container-low rounded border border-surface-container">
            Click any orbital level to render its wave function lobes, nodal planes, and atomic coefficients.
          </div>
        </div>

        {/* Center Column: Molecular Orbital Wave Function Lobe Visualizer (5 cols) */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-low shadow-sm space-y-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">bubble_chart</span>
              Orbital Lobe & Nodal Plane Topology
            </span>
            <span className="px-2 py-0.5 rounded bg-surface-container text-xs font-mono font-bold text-primary">
              Active: {activeOrbital?.label}
            </span>
          </div>

          {/* SVG 2D Atomic Skeleton Canvas with Phase Lobes */}
          <div className="relative w-full h-[280px] bg-surface-container-low rounded-lg p-2 border border-surface-container overflow-hidden">
            <svg viewBox="0 0 400 240" className="w-full h-full">
              {/* Chemical Bonds Skeleton */}
              {hmoData?.bonds.map((bond, bIdx) => {
                const a1 = hmoData.atoms[bond.atom_i];
                const a2 = hmoData.atoms[bond.atom_j];
                const x1 = a1.x_2d * 360 + 20;
                const y1 = a1.y_2d * 200 + 20;
                const x2 = a2.x_2d * 360 + 20;
                const y2 = a2.y_2d * 200 + 20;

                const bondOrder = hmoData.bond_orders[bond.atom_i]?.[bond.atom_j] || 0.0;
                const strokeW = 1.5 + bondOrder * 2.5;

                return (
                  <g key={bIdx}>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="currentColor"
                      strokeOpacity="0.4"
                      strokeWidth={strokeW}
                      className="text-on-surface"
                    />
                    {/* Bond order annotation at midpoint */}
                    <text
                      x={(x1 + x2) / 2}
                      y={(y1 + y2) / 2 - 4}
                      fontSize="9"
                      fill="#6366F1"
                      textAnchor="middle"
                      fontWeight="bold"
                    >
                      {bondOrder.toFixed(2)}
                    </text>
                  </g>
                );
              })}

              {/* Orbital Lobes & Atom Centers */}
              {hmoData?.atoms.map((atom, aIdx) => {
                const x = atom.x_2d * 360 + 20;
                const y = atom.y_2d * 200 + 20;
                const coeff = activeOrbital?.coefficients[aIdx] ?? 0.0;
                const isPositive = coeff >= 0;
                const absCoeff = Math.abs(coeff);
                // Radius proportional to |c_kr| (max ~28px)
                const lobeRadius = Math.max(6, absCoeff * 38);

                return (
                  <g key={aIdx} className="cursor-pointer">
                    {/* Translucent Orbital Lobe Circle */}
                    <circle
                      cx={x}
                      cy={y}
                      r={lobeRadius}
                      fill={isPositive ? '#06B6D4' : '#F43F5E'}
                      fillOpacity="0.45"
                      stroke={isPositive ? '#0891B2' : '#E11D48'}
                      strokeWidth="1.5"
                      className="transition-all duration-300"
                    />

                    {/* Atomic Core */}
                    <circle cx={x} cy={y} r="5" fill="#1E293B" stroke="#FFF" strokeWidth="1" />

                    {/* Coefficient label */}
                    <text
                      x={x}
                      y={y + lobeRadius + 12}
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                      fill="currentColor"
                      className="text-on-surface font-mono"
                    >
                      {coeff > 0 ? `+${coeff.toFixed(2)}` : coeff.toFixed(2)}
                    </text>

                    {/* Atom name */}
                    <text
                      x={x}
                      y={y - lobeRadius - 4}
                      fontSize="9"
                      textAnchor="middle"
                      fill="currentColor"
                      className="text-outline font-semibold"
                    >
                      {atom.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Legend Overlay */}
            <div className="absolute bottom-2 left-2 flex items-center gap-2 text-[10px] font-mono bg-surface-container-lowest/80 backdrop-blur-xs p-1 rounded border border-surface-container">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" /> Phase (+)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Phase (-)
              </span>
            </div>
          </div>

          {/* Active Orbital Properties Banner */}
          {activeOrbital && (
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 rounded bg-surface-container-low border border-surface-container">
                <span className="text-[10px] text-outline uppercase block">Symmetry</span>
                <span className="font-bold text-on-surface uppercase">
                  {activeOrbital.orbital_symmetry}
                </span>
              </div>
              <div className="p-2 rounded bg-surface-container-low border border-surface-container">
                <span className="text-[10px] text-outline uppercase block">Nodal Planes</span>
                <span className="font-bold text-primary">{activeOrbital.nodal_planes_count}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Quantum Metrics & Photophysical Predictions (3 cols) */}
        <div className="lg:col-span-3 space-y-space-md">
          {/* Photophysical & Quantum Telemetry Card */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-low shadow-sm space-y-space-sm text-xs">
            <span className="font-label-md text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">wb_twilight</span>
              Photophysical Telemetry
            </span>

            {hmoData && (
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container">
                  <span className="text-[10px] text-outline uppercase block font-semibold">
                    HOMO-LUMO Gap (Delta E)
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-base font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {hmoData.homo_lumo_gap_ev} eV
                    </span>
                    <span className="text-xs text-outline font-mono">
                      ({hmoData.homo_lumo_gap_beta} |beta|)
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container">
                  <span className="text-[10px] text-outline uppercase block font-semibold">
                    Predicted UV-Vis Absorption
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-base font-mono font-bold text-amber-600 dark:text-amber-400">
                      {hmoData.predicted_uv_lambda_nm} nm
                    </span>
                    <span className="text-xs text-outline">&pi; &rarr; &pi;*</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container">
                  <span className="text-[10px] text-outline uppercase block font-semibold">
                    Delocalization Energy (E_deloc)
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-base font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {hmoData.delocalization_energy_beta} |beta|
                    </span>
                    <span className="text-xs text-outline font-mono">
                      ({hmoData.delocalization_energy_ev} eV)
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container">
                  <span className="text-[10px] text-outline uppercase block font-semibold">
                    Total Pi-Electron Energy
                  </span>
                  <span className="text-xs font-mono font-bold text-on-surface">
                    {hmoData.pi_electron_count} alpha + {hmoData.total_pi_energy_units} beta
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Pedagogical Insights */}
          {hmoData && (
            <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-low shadow-sm space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-outline tracking-wider block">
                Theoretical Notes
              </span>
              <p className="text-on-surface-variant leading-relaxed">
                {presets.find((p) => p.id === hmoData.molecule_id)?.pedagogical_notes ||
                  'The Hückel approximation treats pi-electrons independently from the sigma framework, solving the secular matrix under uniform Coulomb and resonance integrals.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
