import React, { useState, useEffect } from 'react';
import {
  EquilibriumService,
  FALLBACK_EQUILIBRIUM_PRESETS,
} from '../../../services/equilibriumService';
import {
  EquilibriumPresetSummary,
  RiceTableResponse,
  PolyproticAcidResponse,
  BufferCapacityResponse,
  SolubilityKspResponse,
  LeChatelierResponse,
  PerturbationType,
} from '../../../types/equilibrium';
import { experimentsApi } from '../../../services/api';
import {
  Scale,
  Activity,
  Layers,
  Thermometer,
  RotateCcw,
  Zap,
  Bookmark,
  Check,
  ArrowRight,
  Sparkles,
  Info,
} from 'lucide-react';

export const EquilibriumWorkstation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rice' | 'polyprotic' | 'buffer' | 'solubility' | 'le_chatelier'>('rice');
  const [presets, setPresets] = useState<EquilibriumPresetSummary[]>(FALLBACK_EQUILIBRIUM_PRESETS);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('haber_bosch');

  // Notebook persistence
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // --- RICE Table State ---
  const [riceK, setRiceK] = useState<number>(0.50);
  const [riceParticipants, setRiceParticipants] = useState([
    { formula: 'N2', name: 'Nitrogen gas', coefficient: 1, is_product: false, initial_concentration: 1.0 },
    { formula: 'H2', name: 'Hydrogen gas', coefficient: 3, is_product: false, initial_concentration: 1.0 },
    { formula: 'NH3', name: 'Ammonia gas', coefficient: 2, is_product: true, initial_concentration: 0.0 },
  ]);
  const [riceResult, setRiceResult] = useState<RiceTableResponse | null>(null);

  // --- Polyprotic Acid State ---
  const [polyAcidName, setPolyAcidName] = useState<string>('Phosphoric Acid');
  const [polyFormula, setPolyFormula] = useState<string>('H3PO4');
  const [polyCa, setPolyCa] = useState<number>(0.10);
  const [polyKas, setPolyKas] = useState<number[]>([7.11e-3, 6.32e-8, 4.49e-13]);
  const [polyResult, setPolyResult] = useState<PolyproticAcidResponse | null>(null);

  // --- Buffer Capacity State ---
  const [bufferName, setBufferName] = useState<string>('Acetic Acid / Acetate Buffer');
  const [bufferAcid, setBufferAcid] = useState<string>('CH3COOH');
  const [bufferBase, setBufferBase] = useState<string>('CH3COO-');
  const [bufferPka, setBufferPka] = useState<number>(4.756);
  const [bufferCtot, setBufferCtot] = useState<number>(0.10);
  const [bufferRatio, setBufferRatio] = useState<number>(1.0);
  const [bufferAddAcid, setBufferAddAcid] = useState<number>(0.01);
  const [bufferAddBase, setBufferAddBase] = useState<number>(0.01);
  const [bufferResult, setBufferResult] = useState<BufferCapacityResponse | null>(null);

  // --- Solubility Ksp State ---
  const [saltName, setSaltName] = useState<string>('Lead(II) Iodide');
  const [saltFormula, setSaltFormula] = useState<string>('PbI2');
  const [saltKsp, setSaltKsp] = useState<number>(9.8e-9);
  const [saltMw, setSaltMw] = useState<number>(461.01);
  const [cationFormula, setCationFormula] = useState<string>('Pb2+');
  const [cationCoeff, setCationCoeff] = useState<number>(1);
  const [anionFormula, setAnionFormula] = useState<string>('I-');
  const [anionCoeff, setAnionCoeff] = useState<number>(2);
  const [commonIonFormula, setCommonIonFormula] = useState<string>('I-');
  const [commonIonConc, setCommonIonConc] = useState<number>(0.05);
  const [solubilityResult, setSolubilityResult] = useState<SolubilityKspResponse | null>(null);

  // --- Le Chatelier State ---
  const [lePerturbationType, setLePerturbationType] = useState<PerturbationType>('temperature_shift');
  const [leTemperatureK, setLeTemperatureK] = useState<number>(450.0);
  const [lePressureMult, setLePressureMult] = useState<number>(2.0);
  const [leConcChanges, setLeConcChanges] = useState<Record<string, number>>({ N2: 0.5 });
  const [leResult, setLeResult] = useState<LeChatelierResponse | null>(null);

  // Load presets on mount
  useEffect(() => {
    EquilibriumService.getPresets().then((res) => {
      if (res && res.length > 0) setPresets(res);
    });
  }, []);

  // Compute RICE whenever inputs change
  useEffect(() => {
    EquilibriumService.solveRiceTable({
      equilibrium_constant_k: riceK,
      participants: riceParticipants,
    }).then((res) => setRiceResult(res));
  }, [riceK, riceParticipants]);

  // Compute Polyprotic speciation
  useEffect(() => {
    EquilibriumService.solvePolyprotic({
      acid_name: polyAcidName,
      acid_formula: polyFormula,
      total_concentration_ca: polyCa,
      dissociation_constants_ka: polyKas,
    }).then((res) => setPolyResult(res));
  }, [polyAcidName, polyFormula, polyCa, polyKas]);

  // Compute Buffer Capacity
  useEffect(() => {
    EquilibriumService.calculateBufferCapacity({
      buffer_name: bufferName,
      acid_component: bufferAcid,
      base_component: bufferBase,
      pka: bufferPka,
      total_buffer_concentration_m: bufferCtot,
      ratio_base_to_acid: bufferRatio,
      added_strong_acid_m: bufferAddAcid,
      added_strong_base_m: bufferAddBase,
    }).then((res) => setBufferResult(res));
  }, [bufferName, bufferAcid, bufferBase, bufferPka, bufferCtot, bufferRatio, bufferAddAcid, bufferAddBase]);

  // Compute Solubility Ksp
  useEffect(() => {
    EquilibriumService.calculateSolubilityKsp({
      salt_name: saltName,
      salt_formula: saltFormula,
      ksp_value: saltKsp,
      molar_mass_g_mol: saltMw,
      cation_formula: cationFormula,
      cation_coefficient: cationCoeff,
      anion_formula: anionFormula,
      anion_coefficient: anionCoeff,
      common_ion_formula: commonIonFormula,
      common_ion_concentration: commonIonConc,
    }).then((res) => setSolubilityResult(res));
  }, [saltName, saltFormula, saltKsp, saltMw, cationFormula, cationCoeff, anionFormula, anionCoeff, commonIonFormula, commonIonConc]);

  // Compute Le Chatelier
  useEffect(() => {
    EquilibriumService.simulateLeChatelier({
      preset_reaction_id: selectedPresetId,
      perturbation_type: lePerturbationType,
      concentration_changes: leConcChanges,
      pressure_multiplier: lePressureMult,
      temperature_k: leTemperatureK,
    }).then((res) => setLeResult(res));
  }, [selectedPresetId, lePerturbationType, leConcChanges, lePressureMult, leTemperatureK]);

  // Handle Preset Selection
  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    if (presetId === 'haber_bosch') {
      setRiceK(0.50);
      setRiceParticipants([
        { formula: 'N2', name: 'Nitrogen gas', coefficient: 1, is_product: false, initial_concentration: 1.0 },
        { formula: 'H2', name: 'Hydrogen gas', coefficient: 3, is_product: false, initial_concentration: 1.0 },
        { formula: 'NH3', name: 'Ammonia gas', coefficient: 2, is_product: true, initial_concentration: 0.0 },
      ]);
      setLeConcChanges({ N2: 0.5 });
    } else if (presetId === 'no2_dimerization') {
      setRiceK(6.80);
      setRiceParticipants([
        { formula: 'NO2', name: 'Nitrogen dioxide', coefficient: 2, is_product: false, initial_concentration: 0.5 },
        { formula: 'N2O4', name: 'Dinitrogen tetroxide', coefficient: 1, is_product: true, initial_concentration: 0.0 },
      ]);
      setLeConcChanges({ NO2: 0.2 });
    } else if (presetId === 'hi_synthesis') {
      setRiceK(50.0);
      setRiceParticipants([
        { formula: 'H2', name: 'Hydrogen gas', coefficient: 1, is_product: false, initial_concentration: 1.0 },
        { formula: 'I2', name: 'Iodine gas', coefficient: 1, is_product: false, initial_concentration: 1.0 },
        { formula: 'HI', name: 'Hydrogen iodide', coefficient: 2, is_product: true, initial_concentration: 0.0 },
      ]);
      setLeConcChanges({ H2: 0.5 });
    } else if (presetId === 'acetic_acid') {
      setActiveTab('buffer');
      setBufferName('Acetic Acid / Acetate Buffer');
      setBufferAcid('CH3COOH');
      setBufferBase('CH3COO-');
      setBufferPka(4.756);
      setBufferCtot(0.10);
      setBufferRatio(1.0);
    } else if (presetId === 'phosphoric_acid') {
      setActiveTab('polyprotic');
      setPolyAcidName('Phosphoric Acid');
      setPolyFormula('H3PO4');
      setPolyCa(0.10);
      setPolyKas([7.11e-3, 6.32e-8, 4.49e-13]);
    } else if (presetId === 'lead_iodide') {
      setActiveTab('solubility');
      setSaltName('Lead(II) Iodide');
      setSaltFormula('PbI2');
      setSaltKsp(9.8e-9);
      setSaltMw(461.01);
      setCationFormula('Pb2+');
      setCationCoeff(1);
      setAnionFormula('I-');
      setAnionCoeff(2);
      setCommonIonFormula('I-');
      setCommonIonConc(0.05);
    }
  };

  const handleSaveExperiment = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      let title = 'Chemical Equilibrium Analysis';
      let obs = '';

      if (activeTab === 'rice' && riceResult) {
        title = `ICE/RICE Equilibrium: K=${riceResult.equilibrium_constant_k}`;
        obs = `Initial Q=${riceResult.reaction_quotient_q.toFixed(4)}, Shift: ${riceResult.shift_direction}, Extent xi=${riceResult.extent_of_reaction_xi.toFixed(4)}. Residual=${riceResult.residual_error.toExponential(3)}.`;
      } else if (activeTab === 'polyprotic' && polyResult) {
        title = `Polyprotic Speciation: ${polyResult.acid_name} (${polyResult.acid_formula})`;
        obs = `Total Ca=${polyResult.total_concentration_ca} M, pH=${polyResult.ph.toFixed(2)}, [H+]=${polyResult.h_plus_concentration.toExponential(3)} M. Species: ${polyResult.species_fractions.map(s => `${s.species_formula}: ${(s.fraction_alpha * 100).toFixed(1)}%`).join(', ')}`;
      } else if (activeTab === 'buffer' && bufferResult) {
        title = `van Slyke Buffer: ${bufferResult.buffer_name}`;
        obs = `pKa=${bufferResult.pka}, Ctot=${bufferResult.total_buffer_concentration_m} M, HH pH=${bufferResult.henderson_hasselbalch_ph.toFixed(2)}, Max Beta=${bufferResult.maximum_buffer_capacity.toFixed(3)}. pH after +0.01M acid: ${bufferResult.ph_after_acid_addition.toFixed(2)}, after +0.01M base: ${bufferResult.ph_after_base_addition.toFixed(2)}.`;
      } else if (activeTab === 'solubility' && solubilityResult) {
        title = `Ksp Solubility: ${solubilityResult.salt_name}`;
        obs = `Formula: ${solubilityResult.salt_formula}, Ksp=${solubilityResult.ksp_value.toExponential(2)}, Molar solubility s=${solubilityResult.molar_solubility_mol_l.toExponential(4)} mol/L (${solubilityResult.mass_solubility_g_l.toFixed(3)} g/L). Common ion: ${solubilityResult.common_ion_concentration} M.`;
      } else if (activeTab === 'le_chatelier' && leResult) {
        title = `Le Chatelier: ${leResult.reaction_title}`;
        obs = `Perturbation: ${leResult.perturbation_description}. Shift: ${leResult.le_chatelier_shift}. ${leResult.pedagogical_explanation}`;
      }

      await experimentsApi.saveExperiment({
        title,
        experiment_type: 'analytical',
        status: 'completed',
        observations: obs,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      console.error('Failed to save equilibrium experiment', e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Preset Selector */}
      <div className="bg-[#FDF8F5] dark:bg-stone-900 border border-[#D47942]/30 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#D47942]/20">
          <div>
            <div className="flex items-center gap-2">
              <Scale className="w-6 h-6 text-[#D47942]" />
              <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                Chemical Equilibrium, Buffer Capacity & Le Chatelier Engine
              </h2>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
              Rigorous bracketed root solving, multi-step polyprotic speciation, van Slyke buffer curves, and thermodynamic perturbation kinetics.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveExperiment}
              disabled={isSaving}
              className="px-3.5 py-1.5 bg-[#D47942] hover:bg-[#8B572A] text-white text-xs font-semibold rounded-lg shadow-sm transition flex items-center gap-1.5"
            >
              {saveSuccess ? <Check className="w-4 h-4 text-emerald-200" /> : <Bookmark className="w-4 h-4" />}
              {saveSuccess ? 'Saved to Lab Notebook' : isSaving ? 'Saving...' : 'Save to Lab Notebook'}
            </button>
          </div>
        </div>

        {/* Preset Chips */}
        <div className="pt-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8B572A] dark:text-[#D47942] block mb-2">
            Curated Equilibrium Benchmarks:
          </span>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                className={`px-3 py-1 text-xs rounded-full border transition font-mono ${
                  selectedPresetId === preset.id
                    ? 'bg-[#D47942] text-white border-[#D47942] shadow-xs'
                    : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-[#D47942]'
                }`}
              >
                {preset.title.split(' ')[0]} ({preset.equation.split('<=>')[0].trim()})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Tab Navigation */}
      <div className="flex border-b border-stone-200 dark:border-stone-700 space-x-1">
        {[
          { id: 'rice', label: 'ICE/RICE Solver', icon: Layers },
          { id: 'polyprotic', label: 'Polyprotic Speciation', icon: Activity },
          { id: 'buffer', label: 'van Slyke Buffer Capacity', icon: Scale },
          { id: 'solubility', label: 'Ksp & Common-Ion', icon: Sparkles },
          { id: 'le_chatelier', label: 'Le Chatelier Simulator', icon: RotateCcw },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition border-b-2 ${
                isActive
                  ? 'border-[#D47942] text-[#D47942] bg-[#FDF8F5]/80 dark:bg-stone-800/80 rounded-t-lg'
                  : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-[#D47942]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: RICE Table Solver */}
      {activeTab === 'rice' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4 bg-white dark:bg-stone-800 p-5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#D47942]" />
              Reaction & Equilibrium Constant
            </h3>
            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Equilibrium Constant (K):
              </label>
              <input
                type="number"
                step="any"
                min="1e-15"
                value={riceK}
                onChange={(e) => setRiceK(parseFloat(e.target.value) || 1.0)}
                className="w-full mt-1 px-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded font-mono"
              />
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 block">
                Initial Species Concentrations:
              </span>
              {riceParticipants.map((p, idx) => (
                <div key={idx} className="p-2.5 bg-stone-50 dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-800 text-xs space-y-1.5">
                  <div className="flex justify-between items-center font-mono">
                    <span className="font-bold text-[#8B572A] dark:text-[#D47942]">
                      {p.coefficient} {p.formula} ({p.is_product ? 'Product' : 'Reactant'})
                    </span>
                    <span className="text-stone-500">{p.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-stone-500">Initial [C]₀ (M):</span>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={p.initial_concentration}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        setRiceParticipants((prev) =>
                          prev.map((item, i) => (i === idx ? { ...item, initial_concentration: val } : item))
                        );
                      }}
                      className="w-24 px-2 py-1 text-xs bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded font-mono text-right"
                    />
                  </div>
                </div>
              ))}
            </div>

            {riceResult && (
              <div className="p-3 bg-[#FDF8F5] dark:bg-stone-900 border border-[#D47942]/30 rounded-lg text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-600 dark:text-stone-400">Reaction Quotient (Q):</span>
                  <span className="font-mono font-bold">{riceResult.reaction_quotient_q.toFixed(4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600 dark:text-stone-400">Predicted Shift:</span>
                  <span
                    className={`font-bold uppercase ${
                      riceResult.shift_direction === 'forward'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : riceResult.shift_direction === 'reverse'
                        ? 'text-rose-600 dark:text-rose-400'
                        : 'text-stone-600'
                    }`}
                  >
                    {riceResult.shift_direction}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600 dark:text-stone-400">Extent of Reaction (ξ):</span>
                  <span className="font-mono font-bold text-[#D47942]">{riceResult.extent_of_reaction_xi.toFixed(5)} mol/L</span>
                </div>
                <div className="flex justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-200 dark:border-stone-700">
                  <span>Iterations: {riceResult.iterations}</span>
                  <span>Residual: {riceResult.residual_error.toExponential(2)}</span>
                </div>
              </div>
            )}
          </div>

          {/* RICE Matrix Table Display */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-stone-800 p-5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center justify-between">
                <span>RICE Matrix (Reaction, Initial, Change, Equilibrium)</span>
                {riceResult && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    Converged (Exact Root)
                  </span>
                )}
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-700 font-serif">
                      <th className="p-2.5">Row Stage</th>
                      {riceParticipants.map((p, idx) => (
                        <th key={idx} className="p-2.5 font-mono text-center">
                          {p.coefficient} {p.formula}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 dark:divide-stone-700 font-mono">
                    <tr className="hover:bg-stone-50 dark:hover:bg-stone-900/50">
                      <td className="p-2.5 font-bold text-[#8B572A] dark:text-[#D47942]">Initial [C]₀</td>
                      {riceParticipants.map((p, idx) => (
                        <td key={idx} className="p-2.5 text-center">
                          {p.initial_concentration.toFixed(3)} M
                        </td>
                      ))}
                    </tr>
                    <tr className="hover:bg-stone-50 dark:hover:bg-stone-900/50">
                      <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">Change (ΔC)</td>
                      {riceResult?.rows.map((row, idx) => (
                        <td key={idx} className="p-2.5 text-center">
                          {row.change >= 0 ? `+${row.change.toFixed(4)}` : row.change.toFixed(4)} M
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-[#FDF8F5] dark:bg-stone-900 font-bold">
                      <td className="p-2.5 text-emerald-700 dark:text-emerald-400">Equilibrium [C]eq</td>
                      {riceResult?.rows.map((row, idx) => (
                        <td key={idx} className="p-2.5 text-center text-emerald-700 dark:text-emerald-400">
                          {row.equilibrium.toFixed(4)} M
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Visual Concentration Comparison Bars */}
            {riceResult && (
              <div className="bg-white dark:bg-stone-800 p-5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-3">
                  Initial vs Equilibrium Concentration Profile
                </h4>
                <div className="space-y-4">
                  {riceResult.rows.map((row, idx) => {
                    const maxConc = Math.max(...riceResult.rows.map((r) => Math.max(r.initial, r.equilibrium, 0.01)));
                    const initPct = (row.initial / maxConc) * 100;
                    const eqPct = (row.equilibrium / maxConc) * 100;
                    return (
                      <div key={idx} className="space-y-1 text-xs">
                        <div className="flex justify-between font-mono">
                          <span className="font-bold text-stone-800 dark:text-stone-200">{row.species_formula} ({row.species_name})</span>
                          <span className="text-stone-500">
                            {row.initial.toFixed(3)} M → <span className="font-bold text-emerald-600 dark:text-emerald-400">{row.equilibrium.toFixed(3)} M</span>
                          </span>
                        </div>
                        <div className="h-4 bg-stone-100 dark:bg-stone-900 rounded-full overflow-hidden relative flex">
                          <div
                            style={{ width: `${initPct}%` }}
                            className="h-full bg-stone-400/40 dark:bg-stone-600/40"
                            title={`Initial: ${row.initial} M`}
                          />
                          <div
                            style={{ width: `${eqPct}%` }}
                            className="h-full bg-[#D47942] opacity-80"
                            title={`Equilibrium: ${row.equilibrium} M`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Polyprotic Acid Speciation */}
      {activeTab === 'polyprotic' && polyResult && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4 bg-white dark:bg-stone-800 p-5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-[#D47942]" />
              Acid Parameters & Ka Dissociation Steps
            </h3>
            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">Total Acid Molarity Ca (M):</label>
              <input
                type="number"
                step="0.01"
                min="0.0001"
                max="5.0"
                value={polyCa}
                onChange={(e) => setPolyCa(parseFloat(e.target.value) || 0.1)}
                className="w-full mt-1 px-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded font-mono"
              />
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 block">
                Successive Dissociation Constants (Ka):
              </span>
              {polyKas.map((ka, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-stone-600 dark:text-stone-400">Ka{idx + 1}:</span>
                    <span className="font-bold text-[#8B572A] dark:text-[#D47942]">
                      pKa{idx + 1} = {(-Math.log10(ka)).toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="number"
                    step="any"
                    value={ka}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 1e-14;
                      setPolyKas((prev) => prev.map((k, i) => (i === idx ? val : k)));
                    }}
                    className="w-full px-3 py-1 text-xs bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded font-mono"
                  />
                </div>
              ))}
            </div>

            <div className="p-3 bg-[#FDF8F5] dark:bg-stone-900 border border-[#D47942]/30 rounded-lg text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-600 dark:text-stone-400">Solution pH:</span>
                <span className="font-mono font-bold text-lg text-[#D47942]">{polyResult.ph.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600 dark:text-stone-400">Solution pOH:</span>
                <span className="font-mono font-bold">{polyResult.poh.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-stone-500">[H+] = {polyResult.h_plus_concentration.toExponential(3)} M</span>
                <span className="text-stone-500">[OH-] = {polyResult.oh_minus_concentration.toExponential(3)} M</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-stone-800 p-5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-4">
                Speciation Alpha Fractions (Electroneutrality Equilibrium)
              </h3>
              <div className="space-y-4">
                {polyResult.species_fractions.map((sp, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="font-bold text-stone-800 dark:text-stone-200">
                        α{idx} ({sp.species_formula})
                      </span>
                      <span className="text-stone-600 dark:text-stone-400">
                        {(sp.fraction_alpha * 100).toFixed(2)}% | {sp.equilibrium_concentration.toExponential(3)} M
                      </span>
                    </div>
                    <div className="h-5 bg-stone-100 dark:bg-stone-900 rounded-md overflow-hidden relative">
                      <div
                        style={{ width: `${Math.min(100, Math.max(0, sp.fraction_alpha * 100))}%` }}
                        className="h-full bg-gradient-to-r from-[#D47942] to-[#8B572A]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-xs space-y-2 text-stone-600 dark:text-stone-400">
              <div className="flex items-center gap-1.5 font-bold text-stone-800 dark:text-stone-200">
                <Info className="w-4 h-4 text-[#D47942]" />
                Scientific Note on Polyprotic Electroneutrality
              </div>
              <p>
                Calculated by exact root-finding on the charge-balance condition:
                <code className="block my-1 font-mono text-[11px] bg-stone-200 dark:bg-stone-800 p-1.5 rounded">
                  [H⁺] - [OH⁻] - Σ [i · αᵢ · Cₐ] = 0
                </code>
                where denominator D = [H⁺]ⁿ + Kₐ₁[H⁺]ⁿ⁻¹ + ... + Kₐ₁···Kₐₙ, avoiding monoprotic approximations that fail for moderately strong first dissociation steps like phosphoric acid.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: van Slyke Buffer Capacity */}
      {activeTab === 'buffer' && bufferResult && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4 bg-white dark:bg-stone-800 p-5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-[#D47942]" />
              Buffer Formulation Controls
            </h3>
            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">Acid pKa:</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="14"
                value={bufferPka}
                onChange={(e) => setBufferPka(parseFloat(e.target.value) || 4.756)}
                className="w-full mt-1 px-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">Total Buffer Concentration Ctot (M):</label>
              <input
                type="number"
                step="0.01"
                min="0.001"
                max="5"
                value={bufferCtot}
                onChange={(e) => setBufferCtot(parseFloat(e.target.value) || 0.1)}
                className="w-full mt-1 px-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded font-mono"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-700 dark:text-stone-300">
                <span>Base/Acid Ratio:</span>
                <span className="font-mono text-[#D47942]">{bufferRatio.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="10.0"
                step="0.1"
                value={bufferRatio}
                onChange={(e) => setBufferRatio(parseFloat(e.target.value) || 1.0)}
                className="w-full mt-1.5 accent-[#D47942]"
              />
            </div>

            <div className="pt-2 border-t border-stone-200 dark:border-stone-700 space-y-3">
              <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block">Strong Acid / Base Perturbation:</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-stone-500 block text-[11px]">+ Strong Acid (M):</label>
                  <input
                    type="number"
                    step="0.005"
                    min="0"
                    max="0.5"
                    value={bufferAddAcid}
                    onChange={(e) => setBufferAddAcid(parseFloat(e.target.value) || 0.01)}
                    className="w-full px-2 py-1 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="text-stone-500 block text-[11px]">+ Strong Base (M):</label>
                  <input
                    type="number"
                    step="0.005"
                    min="0"
                    max="0.5"
                    value={bufferAddBase}
                    onChange={(e) => setBufferAddBase(parseFloat(e.target.value) || 0.01)}
                    className="w-full px-2 py-1 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#FDF8F5] dark:bg-stone-900 border border-[#D47942]/30 rounded-lg text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-stone-600 dark:text-stone-400">Henderson-Hasselbalch pH:</span>
                <span className="font-mono font-bold text-[#D47942]">{bufferResult.henderson_hasselbalch_ph.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600 dark:text-stone-400">van Slyke Index (β):</span>
                <span className="font-mono font-bold">{bufferResult.van_slyke_buffer_capacity_beta.toFixed(4)} M/pH</span>
              </div>
              <div className="flex justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-200 dark:border-stone-700">
                <span>After +{bufferAddAcid}M Acid: pH {bufferResult.ph_after_acid_addition.toFixed(2)}</span>
                <span>After +{bufferAddBase}M Base: pH {bufferResult.ph_after_base_addition.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Buffer Capacity Curve SVG */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-stone-800 p-5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-2">
                Analytical van Slyke Buffer Capacity Curve β(pH)
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                Shows buffer resistance β = dC_base/dpH across pH 1 to 13. Peak buffer capacity occurs exactly at pH = pKa ({bufferPka}).
              </p>

              <div className="w-full h-56 bg-stone-50 dark:bg-stone-900 rounded-lg p-3 relative flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 160">
                  {/* Grid Lines */}
                  {[0, 40, 80, 120, 160].map((y) => (
                    <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="currentColor" className="text-stone-200 dark:text-stone-800" strokeDasharray="3 3" />
                  ))}

                  {/* Curve polyline */}
                  {(() => {
                    const maxBeta = Math.max(...bufferResult.buffer_curve.map((pt) => pt.buffer_capacity_beta), 0.05);
                    const points = bufferResult.buffer_curve
                      .map((pt) => {
                        const x = ((pt.ph - 1.0) / 12.0) * 400;
                        const y = 150 - (Math.min(pt.buffer_capacity_beta, maxBeta) / maxBeta) * 140;
                        return `${x.toFixed(1)},${y.toFixed(1)}`;
                      })
                      .join(' ');
                    return (
                      <polyline
                        fill="none"
                        stroke="#D47942"
                        strokeWidth="2.5"
                        points={points}
                      />
                    );
                  })()}

                  {/* pKa marker line */}
                  {(() => {
                    const markerX = ((bufferPka - 1.0) / 12.0) * 400;
                    return (
                      <g>
                        <line x1={markerX} y1="0" x2={markerX} y2="160" stroke="#8B572A" strokeWidth="1.5" strokeDasharray="4 2" />
                        <text x={markerX + 4} y="20" fill="#8B572A" fontSize="9" fontWeight="bold">
                          pKa ({bufferPka})
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>

              <div className="flex justify-between text-[11px] text-stone-500 mt-2 font-mono">
                <span>pH 1.0</span>
                <span>pH 7.0 (Neutral)</span>
                <span>pH 13.0</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Solubility Ksp & Common Ion */}
      {activeTab === 'solubility' && solubilityResult && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4 bg-white dark:bg-stone-800 p-5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D47942]" />
              Sparingly Soluble Salt & Common Ion
            </h3>
            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">Salt Formula & Name:</label>
              <input
                type="text"
                value={`${saltName} (${saltFormula})`}
                readOnly
                className="w-full mt-1 px-3 py-1.5 text-xs bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded font-mono text-stone-600 dark:text-stone-400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">Solubility Product Constant (Ksp):</label>
              <input
                type="number"
                step="any"
                value={saltKsp}
                onChange={(e) => setSaltKsp(parseFloat(e.target.value) || 1e-9)}
                className="w-full mt-1 px-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Added Common-Ion [{commonIonFormula}] (M):
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="5.0"
                value={commonIonConc}
                onChange={(e) => setCommonIonConc(parseFloat(e.target.value) || 0.0)}
                className="w-full mt-1 px-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded font-mono"
              />
            </div>

            <div className="p-3 bg-[#FDF8F5] dark:bg-stone-900 border border-[#D47942]/30 rounded-lg text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-600 dark:text-stone-400">Saturation State:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{solubilityResult.saturation_state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600 dark:text-stone-400">Ion Product Qsp:</span>
                <span className="font-mono font-bold">{solubilityResult.ion_product_qsp.toExponential(3)}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-stone-800 p-5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-4">
                Solubility Comparison: Pure Water vs Common-Ion Effect
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2">
                  <span className="text-xs font-bold text-stone-600 dark:text-stone-400 block uppercase">
                    Pure Water Solubility
                  </span>
                  <div className="text-xl font-bold font-mono text-stone-900 dark:text-stone-100">
                    {Math.pow(saltKsp / (Math.pow(cationCoeff, cationCoeff) * Math.pow(anionCoeff, anionCoeff)), 1.0 / (cationCoeff + anionCoeff)).toExponential(4)} M
                  </div>
                  <span className="text-xs text-stone-500 font-mono">
                    {(
                      Math.pow(saltKsp / (Math.pow(cationCoeff, cationCoeff) * Math.pow(anionCoeff, anionCoeff)), 1.0 / (cationCoeff + anionCoeff)) * saltMw
                    ).toFixed(3)}{' '}
                    g/L
                  </span>
                </div>

                <div className="p-4 bg-[#FDF8F5] dark:bg-stone-900 rounded-xl border border-[#D47942]/30 space-y-2">
                  <span className="text-xs font-bold text-[#8B572A] dark:text-[#D47942] block uppercase">
                    Common-Ion Depressed Solubility
                  </span>
                  <div className="text-xl font-bold font-mono text-[#D47942]">
                    {solubilityResult.molar_solubility_mol_l.toExponential(4)} M
                  </div>
                  <span className="text-xs text-stone-500 font-mono">
                    {solubilityResult.mass_solubility_g_l.toFixed(5)} g/L
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg text-xs text-amber-900 dark:text-amber-200">
                <strong>Le Chatelier Solubility Principle:</strong> Dissolving common ion {commonIonFormula} drives the equilibrium{' '}
                <code>{saltFormula}(s) ⇌ {cationFormula} + {anionCoeff} {anionFormula}</code> in the reverse direction, dramatically decreasing solubility by several orders of magnitude.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Le Chatelier Perturbation Simulator */}
      {activeTab === 'le_chatelier' && leResult && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4 bg-white dark:bg-stone-800 p-5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-[#D47942]" />
              Perturbation Vector
            </h3>

            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                Select Stress / Perturbation:
              </label>
              <div className="grid grid-cols-1 gap-1.5 text-xs">
                {[
                  { id: 'temperature_shift', label: 'Temperature Shift (van \'t Hoff)', icon: Thermometer },
                  { id: 'pressure_volume', label: 'Pressure / Volume Scaling (Δng)', icon: Scale },
                  { id: 'concentration_spike', label: 'Concentration Spike (ΔC)', icon: Zap },
                ].map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setLePerturbationType(type.id as PerturbationType)}
                      className={`flex items-center gap-2 p-2 rounded border text-left transition ${
                        lePerturbationType === type.id
                          ? 'bg-[#D47942] text-white border-[#D47942]'
                          : 'bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {type.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {lePerturbationType === 'temperature_shift' && (
              <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-700">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Perturbed Temperature:</span>
                  <span className="font-mono text-[#D47942]">{leTemperatureK.toFixed(1)} K</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="1000"
                  step="10"
                  value={leTemperatureK}
                  onChange={(e) => setLeTemperatureK(parseFloat(e.target.value))}
                  className="w-full accent-[#D47942]"
                />
                <span className="text-[11px] text-stone-500 block">
                  Reference T = 298.15 K. Reaction ΔH° = {leResult.delta_h_standard_kj_mol} kJ/mol.
                </span>
              </div>
            )}

            {lePerturbationType === 'pressure_volume' && (
              <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-700">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Total Pressure Multiplier:</span>
                  <span className="font-mono text-[#D47942]">{lePressureMult.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="5.0"
                  step="0.1"
                  value={lePressureMult}
                  onChange={(e) => setLePressureMult(parseFloat(e.target.value))}
                  className="w-full accent-[#D47942]"
                />
                <span className="text-[11px] text-stone-500 block">
                  Gas mole change Δng = {leResult.delta_ng_gas}.
                </span>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-stone-800 p-5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">{leResult.reaction_title}</h3>
                  <code className="text-xs font-mono text-[#8B572A] dark:text-[#D47942]">{leResult.equation_string}</code>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    leResult.le_chatelier_shift === 'forward'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : leResult.le_chatelier_shift === 'reverse'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-300'
                  }`}
                >
                  Shift: {leResult.le_chatelier_shift}
                </div>
              </div>

              <div className="p-4 bg-[#FDF8F5] dark:bg-stone-900 rounded-xl border border-[#D47942]/30 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-800 dark:text-stone-200">
                  <ArrowRight className="w-4 h-4 text-[#D47942]" />
                  <span>Pedagogical Le Chatelier Explanation</span>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                  {leResult.pedagogical_explanation}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs font-mono">
                <div className="p-2.5 bg-stone-50 dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-800">
                  <span className="text-stone-500 block text-[10px]">Initial K</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">{leResult.initial_k.toFixed(4)}</span>
                </div>
                <div className="p-2.5 bg-stone-50 dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-800">
                  <span className="text-stone-500 block text-[10px]">Perturbed K</span>
                  <span className="font-bold text-[#D47942]">{leResult.perturbed_k.toFixed(4)}</span>
                </div>
                <div className="p-2.5 bg-stone-50 dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-800">
                  <span className="text-stone-500 block text-[10px]">Initial Q</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">{leResult.initial_q.toFixed(4)}</span>
                </div>
                <div className="p-2.5 bg-stone-50 dark:bg-stone-900 rounded border border-stone-200 dark:border-stone-800">
                  <span className="text-stone-500 block text-[10px]">Perturbed Q</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{leResult.perturbed_q.toFixed(4)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
