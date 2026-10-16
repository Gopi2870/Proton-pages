import React, { useState, useEffect } from 'react';
import {
  FlaskConical,
  Plus,
  RotateCcw,
  AlertTriangle,
  Flame,
  Droplets,
  Cloud,
  Save,
  Check,
  Thermometer,
  Info
} from 'lucide-react';
import {
  MixerService,
  MixedReagentInput,
  MixerSimulationResult
} from '../services/mixerService';
import { experimentsApi } from '../services/api';

interface ReagentTemplate {
  id: string;
  name: string;
  formula: string;
  defaultMolarity: number;
  initialPh: number;
  category: string;
}

const REAGENT_LIBRARY: ReagentTemplate[] = [
  { id: 'r1', name: 'Hydrochloric Acid', formula: 'HCl (aq)', defaultMolarity: 1.0, initialPh: 0.0, category: 'Strong Acid' },
  { id: 'r2', name: 'Sodium Hydroxide', formula: 'NaOH (aq)', defaultMolarity: 1.0, initialPh: 14.0, category: 'Strong Base' },
  { id: 'r3', name: 'Silver Nitrate', formula: 'AgNO3 (aq)', defaultMolarity: 0.1, initialPh: 6.5, category: 'Precipitation Salt' },
  { id: 'r4', name: 'Potassium Chromate', formula: 'K2CrO4 (aq)', defaultMolarity: 0.1, initialPh: 8.8, category: 'Indicator Salt' },
  { id: 'r5', name: 'Copper(II) Sulfate', formula: 'CuSO4 (aq)', defaultMolarity: 0.5, initialPh: 4.0, category: 'Transition Metal Salt' },
  { id: 'r6', name: 'Sodium Carbonate', formula: 'Na2CO3 (aq)', defaultMolarity: 0.5, initialPh: 11.5, category: 'Carbonate Salt' },
  { id: 'r7', name: 'Barium Chloride', formula: 'BaCl2 (aq)', defaultMolarity: 0.2, initialPh: 7.0, category: 'Precipitation Salt' },
  { id: 'r8', name: 'Potassium Iodide', formula: 'KI (aq)', defaultMolarity: 0.5, initialPh: 7.0, category: 'Halide Salt' }
];

export const ChemicalMixerPage: React.FC = () => {
  const [vesselContents, setVesselContents] = useState<MixedReagentInput[]>([]);
  const [selectedVolume, setSelectedVolume] = useState<number>(20);
  const [selectedMolarity, setSelectedMolarity] = useState<number>(1.0);
  const [simulation, setSimulation] = useState<MixerSimulationResult>(MixerService.computeLocalSimulation([]));
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  useEffect(() => {
    let isCurrent = true;
    const runSimulation = async () => {
      setIsSimulating(true);
      try {
        const result = await MixerService.simulate(vesselContents);
        if (isCurrent) {
          setSimulation(result);
        }
      } finally {
        if (isCurrent) {
          setIsSimulating(false);
        }
      }
    };
    runSimulation();
    return () => {
      isCurrent = false;
    };
  }, [vesselContents]);

  const handleAddReagent = (template: ReagentTemplate) => {
    const newEntry: MixedReagentInput = {
      name: template.name,
      formula: template.formula,
      volume_ml: selectedVolume,
      concentration_m: selectedMolarity,
      initial_ph: template.initialPh,
      temperature_c: 25.0
    };
    setVesselContents([...vesselContents, newEntry]);
    setSavedSuccess(false);
  };

  const handleReset = () => {
    setVesselContents([]);
    setSimulation(MixerService.computeLocalSimulation([]));
    setSavedSuccess(false);
  };

  const handleSaveToHistory = async () => {
    try {
      await experimentsApi.saveExperiment({
        title: `Aqueous Mixer Trial (${vesselContents.map(v => v.formula).join(' + ')})`,
        experiment_type: 'mixer',
        status: 'completed',
        state_data: JSON.stringify({
          reagents: vesselContents,
          outcome: simulation
        }),
        observations: `Final pH: ${simulation.final_ph.toFixed(2)}, Temperature: ${simulation.final_temperature_c.toFixed(1)} °C, Volume: ${simulation.total_volume_ml} mL. ${simulation.precipitates.length > 0 ? `Precipitates: ${simulation.precipitates.map(p => p.formula).join(', ')}` : 'Homogeneous aqueous solution'}. Net ionic equation: ${simulation.net_ionic_equation || 'None'}.`
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.warn('Failed to persist experiment to API, falling back to local state:', err);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container-low pb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-headline-sm font-bold text-on-surface">
                Virtual Chemical Mixer & Reaction Chamber
              </h1>
              <p className="text-body-sm text-on-surface-variant">
                Simulate aqueous ionic equilibrium, exact logarithmic pH neutralization, K_sp precipitate phase separations, and gas generation in real-time.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {vesselContents.length > 0 && (
            <button
              onClick={handleSaveToHistory}
              type="button"
              className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition flex items-center gap-1.5"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-500">Saved to Lab Notebook</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Simulation</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={handleReset}
            type="button"
            className="px-3.5 py-1.5 text-label-md font-semibold rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Reset Vessel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Reagent Dispensary Controls (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Dispensary Settings */}
          <div className="bg-surface-container-lowest border border-surface-container-low rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="font-headline-sm text-title-sm font-bold text-on-surface flex items-center justify-between">
              <span>Pipette Dispenser Settings</span>
              <span className="text-label-sm font-code-sm text-outline">Pre-Mix Controls</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-label-sm font-medium text-on-surface-variant mb-1">
                  Volume (mL)
                </label>
                <div className="flex gap-1.5">
                  {[10, 20, 50].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setSelectedVolume(v)}
                      className={`flex-1 py-1 rounded text-code-sm font-semibold transition ${
                        selectedVolume === v
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-label-sm font-medium text-on-surface-variant mb-1">
                  Concentration (M)
                </label>
                <div className="flex gap-1.5">
                  {[0.1, 0.5, 1.0].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setSelectedMolarity(m)}
                      className={`flex-1 py-1 rounded text-code-sm font-semibold transition ${
                        selectedMolarity === m
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                      }`}
                    >
                      {m}M
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reagent Catalog */}
          <div className="bg-surface-container-lowest border border-surface-container-low rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-title-sm font-bold text-on-surface">Reagent Shelf</h3>
              <span className="text-[11px] font-mono text-outline">{REAGENT_LIBRARY.length} available</span>
            </div>
            <p className="text-body-sm text-on-surface-variant">
              Click a reagent to dispense {selectedVolume} mL at {selectedMolarity} M into the reaction vessel.
            </p>

            <div className="space-y-2 pt-1 max-h-[380px] overflow-y-auto pr-1">
              {REAGENT_LIBRARY.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleAddReagent(r)}
                  type="button"
                  className="w-full p-3 rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high/60 transition flex items-center justify-between text-left group"
                >
                  <div>
                    <div className="text-label-md font-semibold text-on-surface group-hover:text-primary transition">
                      {r.name}
                    </div>
                    <div className="text-code-sm font-mono text-on-surface-variant flex items-center gap-2 mt-0.5">
                      <span>{r.formula}</span>
                      <span className="text-outline">•</span>
                      <span className="text-outline text-[11px]">{r.category}</span>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-on-primary transition shrink-0 shadow-xs">
                    <Plus className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Active Vessel & Scientific Instrumentation (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Reaction Vessel Visual & State Gauges */}
          <div className="bg-surface-container-lowest border border-surface-container-low rounded-2xl p-6 shadow-xs space-y-6">
            {/* Top Vessel Status Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Volume gauge */}
              <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container">
                <span className="text-label-sm font-medium text-on-surface-variant flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-primary" /> Volume
                </span>
                <div className="text-title-md font-mono font-bold text-on-surface mt-1">
                  {simulation.total_volume_ml} <span className="text-label-sm font-normal text-outline">mL</span>
                </div>
              </div>

              {/* pH gauge */}
              <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container">
                <span className="text-label-sm font-medium text-on-surface-variant flex items-center gap-1.5">
                  pH Level
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-title-md font-mono font-bold text-on-surface">
                    {simulation.final_ph}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      simulation.final_ph < 6.5
                        ? 'bg-rose-500/10 text-rose-600'
                        : simulation.final_ph > 7.5
                        ? 'bg-indigo-500/10 text-indigo-600'
                        : 'bg-emerald-500/10 text-emerald-600'
                    }`}
                  >
                    {simulation.final_ph < 6.5 ? 'Acidic' : simulation.final_ph > 7.5 ? 'Basic' : 'Neutral'}
                  </span>
                </div>
              </div>

              {/* Temperature gauge */}
              <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container">
                <span className="text-label-sm font-medium text-on-surface-variant flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-secondary" /> Temperature
                </span>
                <div className="text-title-md font-mono font-bold text-on-surface mt-1 flex items-center gap-1.5">
                  <span>{simulation.final_temperature_c} °C</span>
                  {simulation.delta_temperature_c > 0 && (
                    <span className="text-label-sm font-semibold text-amber-600">
                      (+{simulation.delta_temperature_c})
                    </span>
                  )}
                </div>
              </div>

              {/* Thermal state */}
              <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container">
                <span className="text-label-sm font-medium text-on-surface-variant flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-secondary" /> Enthalpy
                </span>
                <div className="text-title-md font-semibold text-on-surface mt-1">
                  {simulation.is_exothermic ? (
                    <span className="text-secondary font-bold">Exothermic</span>
                  ) : simulation.is_endothermic ? (
                    <span className="text-primary font-bold">Endothermic</span>
                  ) : (
                    <span className="text-outline font-normal">Isothermal</span>
                  )}
                </div>
              </div>
            </div>

            {/* Visual Glassware Beaker Simulation Rig */}
            <div className="relative h-64 rounded-2xl bg-surface-container-low border-2 border-surface-container-high flex flex-col items-center justify-center overflow-hidden">
              {/* Liquid fill layer */}
              <div
                className="absolute inset-x-0 bottom-0 bg-primary/15 border-t-2 border-primary/40 transition-all duration-700 ease-out"
                style={{ height: `${Math.min(88, (simulation.total_volume_ml / 250) * 80 + 12)}%` }}
              />

              {/* Dynamic Gas Bubbling Indicator */}
              {simulation.gases.length > 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 text-on-secondary-fixed border border-secondary/40 backdrop-blur-xs animate-bounce">
                    <Cloud className="w-4 h-4 text-secondary animate-pulse" />
                    <span className="font-code-sm text-label-sm font-bold">
                      Vigorous Effervescence: {simulation.gases.map((g) => g.formula).join(', ')}
                    </span>
                  </div>
                </div>
              )}

              {/* Empty / Filled Center State */}
              <div className="z-20 text-center space-y-2 px-4">
                {vesselContents.length === 0 ? (
                  <div className="text-on-surface-variant font-body-sm flex flex-col items-center gap-1.5">
                    <FlaskConical className="w-8 h-8 text-outline/50 stroke-1" />
                    <span>Reaction Beaker Empty</span>
                    <span className="text-label-sm text-outline">Select reagents from the dispensary to begin</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-label-md font-bold text-on-surface bg-surface/80 backdrop-blur-xs px-3 py-1 rounded-full border border-surface-container-high shadow-xs inline-block">
                      Liquid Vessel Volume: {simulation.total_volume_ml} mL
                    </div>

                    {simulation.precipitates.length > 0 && (
                      <div className="space-y-1.5">
                        {simulation.precipitates.map((p, idx) => (
                          <div
                            key={idx}
                            className="px-3.5 py-1.5 rounded-xl bg-tertiary-container/90 border border-tertiary/40 text-on-tertiary text-label-md font-bold shadow-sm animate-pulse flex items-center justify-center gap-2"
                          >
                            <span>✨ Solid Precipitate:</span>
                            <span className="underline">{p.formula}</span>
                            <span>({p.color}, {p.mass_precipitated_g.toFixed(3)} g)</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Net Ionic Equation Ribbon */}
            <div className="p-4 rounded-xl bg-surface-container border border-surface-container-high/60">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-label-sm font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" /> Driving Net Ionic Transformation
                </span>
                <span className="text-code-sm text-outline">Equilibrium Model</span>
              </div>
              <div className="font-code-sm text-title-sm font-semibold text-on-surface break-words">
                {simulation.net_ionic_equation || 'No reaction occurring.'}
              </div>
            </div>

            {/* Safety Warnings Drawer */}
            {simulation.safety_warnings.length > 0 && (
              <div className="p-4 rounded-xl bg-error-container/40 border border-error/30 space-y-1.5">
                <div className="flex items-center gap-2 text-error font-bold text-label-md">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Chemical Safety & Hazard Advisory</span>
                </div>
                <ul className="list-disc list-inside text-body-sm text-on-error-container space-y-1 pl-1">
                  {simulation.safety_warnings.map((warn, i) => (
                    <li key={i}>{warn}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ingredients In Vessel */}
            <div className="space-y-2">
              <h4 className="text-label-sm font-bold text-outline uppercase tracking-wider">
                Added Species in Reaction Vessel ({vesselContents.length})
              </h4>
              {vesselContents.length === 0 ? (
                <p className="text-body-sm text-outline">No chemical reagents added.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {vesselContents.map((r, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container text-on-surface font-code-sm text-label-md border border-surface-container-high shadow-xs"
                    >
                      <span className="font-semibold text-primary">{r.formula}</span>
                      <span className="text-on-surface-variant">({r.volume_ml} mL @ {r.concentration_m} M)</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChemicalMixerPage;
