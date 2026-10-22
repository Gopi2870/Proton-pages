import React, { useState, useEffect } from 'react';
import {
  ColligativeService,
  FALLBACK_COLLIGATIVE_PRESETS,
  FALLBACK_SOLVENTS,
  FALLBACK_SOLUTES,
} from '../../../services/colligativeService';
import {
  ColligativePresetSummary,
  SolventProperties,
  SoluteProperties,
  VaporPressureResponse,
  BoilingFreezingResponse,
  OsmoticPressureResponse,
  IonicStrengthResponse,
} from '../../../types/colligative';
import { experimentsApi } from '../../../services/api';
import {
  Flame,
  Thermometer,
  Layers,
  Activity,
  Droplets,
  Bookmark,
  Check,
  AlertTriangle,
  Info,
  Scale,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const ColligativeWorkstation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vapor' | 'boiling_freezing' | 'osmosis' | 'ionic_strength'>('vapor');
  const [presets, setPresets] = useState<ColligativePresetSummary[]>(FALLBACK_COLLIGATIVE_PRESETS);
  const [solvents, setSolvents] = useState<SolventProperties[]>(FALLBACK_SOLVENTS);
  const [solutes, setSolutes] = useState<SoluteProperties[]>(FALLBACK_SOLUTES);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('ethanol_water_vle');

  // Notebook persistence
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // --- Tab 1: Vapor Pressure State ---
  const [vleSolvent1, setVleSolvent1] = useState('ethanol');
  const [vleSolvent2, setVleSolvent2] = useState('water');
  const [vleTempC, setVleTempC] = useState(78.15);
  const [vleX1, setVleX1] = useState(0.40);
  const [vleA12, setVleA12] = useState(1.25);
  const [vleResult, setVleResult] = useState<VaporPressureResponse | null>(null);

  // --- Tab 2: Boiling/Freezing State ---
  const [colligSolventId, setColligSolventId] = useState('water');
  const [colligSoluteId, setColligSoluteId] = useState('nacl');
  const [colligSoluteMass, setColligSoluteMass] = useState(5.844);
  const [colligSolventMass, setColligSolventMass] = useState(1000.0);
  const [customVanTHoffI, setCustomVanTHoffI] = useState<number | undefined>(undefined);
  const [observedDeltaTf, setObservedDeltaTf] = useState<number | undefined>(undefined);
  const [colligResult, setColligResult] = useState<BoilingFreezingResponse | null>(null);

  // --- Tab 3: Osmotic Pressure State ---
  const [osmoSoluteName, setOsmoSoluteName] = useState('Normal Saline (0.9% NaCl)');
  const [osmoTempC, setOsmoTempC] = useState(37.0);
  const [osmoSoluteMass, setOsmoSoluteMass] = useState(9.0);
  const [osmoSolVolumeL, setOsmoSolVolumeL] = useState(1.0);
  const [osmoSoluteMw, setOsmoSoluteMw] = useState<number>(58.443);
  const [osmoVanTHoffI, setOsmoVanTHoffI] = useState(2.0);
  const [osmoResult, setOsmoResult] = useState<OsmoticPressureResponse | null>(null);

  // --- Tab 4: Ionic Strength State ---
  const [electrolyteId, setElectrolyteId] = useState('cacl2');
  const [electrolyteMolarity, setElectrolyteMolarity] = useState(0.05);
  const [electrolyteTempC, setElectrolyteTempC] = useState(25.0);
  const [ionicResult, setIonicResult] = useState<IonicStrengthResponse | null>(null);

  // Load catalogs on mount
  useEffect(() => {
    ColligativeService.getPresets().then((list) => {
      if (list && list.length > 0) setPresets(list);
    });
    ColligativeService.getSolvents().then((list) => {
      if (list && list.length > 0) setSolvents(list);
    });
    ColligativeService.getSolutes().then((list) => {
      if (list && list.length > 0) setSolutes(list);
    });
  }, []);

  // Compute VLE
  useEffect(() => {
    ColligativeService.calculateVaporPressure({
      solvent1_id: vleSolvent1,
      solvent2_id: vleSolvent2,
      temperature_c: vleTempC,
      x1_mole_fraction: vleX1,
      non_ideal_parameter_a12: vleA12,
    }).then((res) => setVleResult(res));
  }, [vleSolvent1, vleSolvent2, vleTempC, vleX1, vleA12]);

  // Compute Boiling/Freezing
  useEffect(() => {
    ColligativeService.calculateBoilingFreezing({
      solvent_id: colligSolventId,
      solute_id: colligSoluteId,
      solute_mass_g: colligSoluteMass,
      solvent_mass_g: colligSolventMass,
      custom_van_t_hoff_i: customVanTHoffI,
      observed_delta_tf_c: observedDeltaTf,
    }).then((res) => setColligResult(res));
  }, [colligSolventId, colligSoluteId, colligSoluteMass, colligSolventMass, customVanTHoffI, observedDeltaTf]);

  // Compute Osmotic Pressure
  useEffect(() => {
    ColligativeService.calculateOsmoticPressure({
      solute_name: osmoSoluteName,
      temperature_c: osmoTempC,
      solute_mass_g: osmoSoluteMass,
      solution_volume_l: osmoSolVolumeL,
      solute_molar_mass_g_mol: osmoSoluteMw,
      van_t_hoff_i: osmoVanTHoffI,
    }).then((res) => setOsmoResult(res));
  }, [osmoSoluteName, osmoTempC, osmoSoluteMass, osmoSolVolumeL, osmoSoluteMw, osmoVanTHoffI]);

  // Compute Ionic Strength
  useEffect(() => {
    ColligativeService.calculateIonicStrength({
      electrolyte_id: electrolyteId,
      molarity_m: electrolyteMolarity,
      temperature_c: electrolyteTempC,
    }).then((res) => setIonicResult(res));
  }, [electrolyteId, electrolyteMolarity, electrolyteTempC]);

  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    if (presetId === 'ethanol_water_vle') {
      setActiveTab('vapor');
      setVleSolvent1('ethanol');
      setVleSolvent2('water');
      setVleTempC(78.15);
      setVleX1(0.40);
      setVleA12(1.25);
    } else if (presetId === 'acetone_chloroform_vle') {
      setActiveTab('vapor');
      setVleSolvent1('acetone');
      setVleSolvent2('chloroform');
      setVleTempC(56.0);
      setVleX1(0.40);
      setVleA12(-0.75);
    } else if (presetId === 'benzene_toluene_ideal') {
      setActiveTab('vapor');
      setVleSolvent1('benzene');
      setVleSolvent2('toluene');
      setVleTempC(80.0);
      setVleX1(0.50);
      setVleA12(0.0);
    } else if (presetId === 'seawater_freezing') {
      setActiveTab('boiling_freezing');
      setColligSolventId('water');
      setColligSoluteId('nacl');
      setColligSoluteMass(35.0);
      setColligSolventMass(1000.0);
      setCustomVanTHoffI(1.9);
      setObservedDeltaTf(undefined);
    } else if (presetId === 'antifreeze_glycol') {
      setActiveTab('boiling_freezing');
      setColligSolventId('water');
      setColligSoluteId('ethylene_glycol');
      setColligSoluteMass(300.0);
      setColligSolventMass(700.0);
      setCustomVanTHoffI(1.0);
      setObservedDeltaTf(undefined);
    } else if (presetId === 'camphor_rast_method') {
      setActiveTab('boiling_freezing');
      setColligSolventId('camphor');
      setColligSoluteId('glucose');
      setColligSoluteMass(1.0);
      setColligSolventMass(10.0);
      setCustomVanTHoffI(1.0);
      setObservedDeltaTf(19.85);
    } else if (presetId === 'blood_isotonic_saline') {
      setActiveTab('osmosis');
      setOsmoSoluteName('Physiological Saline (0.9% NaCl)');
      setOsmoTempC(37.0);
      setOsmoSoluteMass(9.0);
      setOsmoSolVolumeL(1.0);
      setOsmoSoluteMw(58.443);
      setOsmoVanTHoffI(2.0);
    } else if (presetId === 'bsa_osmotic_pressure') {
      setActiveTab('osmosis');
      setOsmoSoluteName('Bovine Serum Albumin (BSA)');
      setOsmoTempC(25.0);
      setOsmoSoluteMass(20.0);
      setOsmoSolVolumeL(1.0);
      setOsmoSoluteMw(66500.0);
      setOsmoVanTHoffI(1.0);
    } else if (presetId === 'cacl2_ionic_strength') {
      setActiveTab('ionic_strength');
      setElectrolyteId('cacl2');
      setElectrolyteMolarity(0.05);
      setElectrolyteTempC(25.0);
    }
  };

  const handleSaveToNotebook = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      let title = 'Colligative Properties & Solution Thermodynamics';
      let obs = '';

      if (activeTab === 'vapor' && vleResult) {
        title = `VLE: ${vleResult.solvent1_name} + ${vleResult.solvent2_name} (${vleResult.temperature_c} °C)`;
        obs = `x1=${vleResult.x1_mole_fraction}, P_total=${vleResult.total_vapor_pressure_kpa} kPa (${vleResult.total_vapor_pressure_mmhg} mmHg), y1=${vleResult.y1_vapor_mole_fraction}. γ1=${vleResult.activity_coeff_1}, γ2=${vleResult.activity_coeff_2}. Azeotrope: ${vleResult.azeotrope_detected ? `Detected at x1=${vleResult.azeotrope_x1}` : 'None'}.`;
      } else if (activeTab === 'boiling_freezing' && colligResult) {
        title = `Colligative: ${colligResult.solute_name} in ${colligResult.solvent_name}`;
        obs = `Molality m=${colligResult.molality_m} mol/kg (i=${colligResult.van_t_hoff_factor_i}). ΔTb=+${colligResult.delta_tb_c} °C (Tb=${colligResult.solution_boiling_point_c} °C), ΔTf=-${colligResult.delta_tf_c} °C (Tf=${colligResult.solution_freezing_point_c} °C). ${colligResult.estimated_molar_mass_g_mol ? `Molar Mass Est: ${colligResult.estimated_molar_mass_g_mol} g/mol` : ''}`;
      } else if (activeTab === 'osmosis' && osmoResult) {
        title = `Osmometry: ${osmoResult.solute_name}`;
        obs = `Osmotic Pressure Π=${osmoResult.osmotic_pressure_atm} atm (${osmoResult.osmotic_pressure_kpa} kPa). Morse corrected=${osmoResult.morse_corrected_pressure_atm} atm. Tonicity: ${osmoResult.tonicity_category}. ${osmoResult.macromolecule_mw_estimate ? `Estimated MW: ${osmoResult.macromolecule_mw_estimate} g/mol` : ''}`;
      } else if (activeTab === 'ionic_strength' && ionicResult) {
        title = `Debye-Hückel: ${ionicResult.electrolyte_formula} (${ionicResult.molarity_m} M)`;
        obs = `Ionic Strength I=${ionicResult.ionic_strength_i} M. γ±(DHLL)=${ionicResult.dhll_gamma_plus_minus}, γ±(Extended)=${ionicResult.extended_dh_gamma_plus_minus}, γ±(Davies)=${ionicResult.davies_gamma_plus_minus}. Selected γ±=${ionicResult.selected_gamma}. ${ionicResult.regime_description}`;
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
      console.error('Failed to save colligative experiment', e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Benchmarks */}
      <div className="bg-[#FDF8F5] dark:bg-stone-900 border border-[#D47942]/30 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#D47942]/20">
          <div>
            <div className="flex items-center gap-2">
              <Droplets className="w-6 h-6 text-[#D47942]" />
              <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                Rig #6: Colligative Properties & Non-Ideal Solution Chemistry
              </h2>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
              Raoult's law VLE diagrams, Margules azeotropic activity models, ebullioscopy, cryoscopy, van 't Hoff / Morse osmometry, and Debye-Hückel ionic strength.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveToNotebook}
              disabled={isSaving}
              className="px-3.5 py-1.5 bg-[#D47942] hover:bg-[#8B572A] text-white text-xs font-semibold rounded-lg shadow-sm transition flex items-center gap-1.5"
            >
              {saveSuccess ? <Check className="w-4 h-4 text-emerald-200" /> : <Bookmark className="w-4 h-4" />}
              {saveSuccess ? 'Saved to Lab Notebook' : isSaving ? 'Saving...' : 'Save to Lab Notebook'}
            </button>
          </div>
        </div>

        {/* Benchmark Chips */}
        <div className="pt-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8B572A] dark:text-[#D47942] block mb-2">
            Curated Benchmark Systems:
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
                {preset.title.split(' ')[0]} ({preset.category.split('&')[0].trim()})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-stone-200 dark:border-stone-700 space-x-1">
        {[
          { id: 'vapor', label: "Vapor Pressure & Raoult's Law", icon: Flame },
          { id: 'boiling_freezing', label: 'Boiling Elevation & Cryoscopy', icon: Thermometer },
          { id: 'osmosis', label: 'Osmotic Pressure & Tonicity', icon: Activity },
          { id: 'ionic_strength', label: 'Ionic Strength & Debye-Hückel', icon: Sparkles },
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

      {/* TAB 1: Vapor Pressure & Raoult's Law */}
      {activeTab === 'vapor' && vleResult && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4 bg-white dark:bg-stone-800 p-5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#D47942]" />
              Binary Solution Parameters
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-stone-600 dark:text-stone-400 block font-semibold mb-1">Component 1:</label>
                <select
                  value={vleSolvent1}
                  onChange={(e) => setVleSolvent1(e.target.value)}
                  className="w-full px-2 py-1.5 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded font-mono"
                >
                  {solvents.map((s) => (
                    <option key={s.formula} value={s.formula.toLowerCase()}>
                      {s.name} ({s.formula})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-stone-600 dark:text-stone-400 block font-semibold mb-1">Component 2:</label>
                <select
                  value={vleSolvent2}
                  onChange={(e) => setVleSolvent2(e.target.value)}
                  className="w-full px-2 py-1.5 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded font-mono"
                >
                  {solvents.map((s) => (
                    <option key={s.formula} value={s.formula.toLowerCase()}>
                      {s.name} ({s.formula})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-700 dark:text-stone-300">
                <span>System Temperature:</span>
                <span className="font-mono text-[#D47942]">{vleTempC.toFixed(1)} °C</span>
              </div>
              <input
                type="range"
                min="0"
                max="120"
                step="0.5"
                value={vleTempC}
                onChange={(e) => setVleTempC(parseFloat(e.target.value))}
                className="w-full mt-1.5 accent-[#D47942]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-700 dark:text-stone-300">
                <span>Mole Fraction x₁ ({vleResult.solvent1_name}):</span>
                <span className="font-mono text-[#D47942]">{vleX1.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.02"
                value={vleX1}
                onChange={(e) => setVleX1(parseFloat(e.target.value))}
                className="w-full mt-1.5 accent-[#D47942]"
              />
              <span className="text-[11px] text-stone-500 block text-right font-mono">
                x₂ ({vleResult.solvent2_name}) = {(1.0 - vleX1).toFixed(2)}
              </span>
            </div>

            <div className="pt-2 border-t border-stone-200 dark:border-stone-700">
              <div className="flex justify-between text-xs font-semibold text-stone-700 dark:text-stone-300">
                <span>Margules A₁₂ Parameter:</span>
                <span className="font-mono text-[#D47942]">{vleA12.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-2.0"
                max="2.5"
                step="0.05"
                value={vleA12}
                onChange={(e) => setVleA12(parseFloat(e.target.value))}
                className="w-full mt-1.5 accent-[#D47942]"
              />
              <span className="text-[11px] text-stone-500 block">
                {vleA12 === 0
                  ? 'A12 = 0.0: Ideal solution (Raoult\'s Law, γ = 1.0)'
                  : vleA12 > 0
                  ? 'A12 > 0: Positive deviation (Repulsive, minimum-boiling azeotrope)'
                  : 'A12 < 0: Negative deviation (Attractive, maximum-boiling azeotrope)'}
              </span>
            </div>

            <div className="p-3 bg-[#FDF8F5] dark:bg-stone-900 border border-[#D47942]/30 rounded-lg text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-stone-600 dark:text-stone-400">Total Vapor Pressure:</span>
                <span className="font-mono font-bold text-[#D47942]">{vleResult.total_vapor_pressure_kpa.toFixed(2)} kPa</span>
              </div>
              <div className="flex justify-between text-stone-500 text-[11px]">
                <span>In mmHg:</span>
                <span className="font-mono font-bold">{vleResult.total_vapor_pressure_mmhg.toFixed(1)} mmHg</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-stone-200 dark:border-stone-700">
                <span>Vapor Mole Fraction y₁:</span>
                <span className="font-mono font-bold">{vleResult.y1_vapor_mole_fraction.toFixed(3)}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span>Activity Coeffs (γ₁, γ₂):</span>
                <span className="font-mono font-bold">{vleResult.activity_coeff_1.toFixed(3)}, {vleResult.activity_coeff_2.toFixed(3)}</span>
              </div>
            </div>
          </div>

          {/* VLE P-x-y Phase Diagram */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-stone-800 p-5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  Vapor-Liquid Equilibrium (P-x-y) Diagram at {vleTempC} °C
                </h3>
                {vleResult.azeotrope_detected && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 font-bold">
                    Azeotrope at x₁ ≈ {vleResult.azeotrope_x1}
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500 mb-4">
                Solid line: Bubble point pressure P vs liquid mole fraction x₁. Dashed line: Dew point pressure P vs vapor mole fraction y₁.
              </p>

              <div className="w-full h-56 bg-stone-50 dark:bg-stone-900 rounded-lg p-3 relative flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 160">
                  {/* Grid Lines */}
                  {[0, 40, 80, 120, 160].map((y) => (
                    <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="currentColor" className="text-stone-200 dark:text-stone-800" strokeDasharray="3 3" />
                  ))}

                  {/* Bubble Point Curve P(x1) */}
                  {(() => {
                    const maxP = Math.max(...vleResult.vle_curve.map((p) => p.pressure_kpa), 1.0) * 1.1;
                    const ptsBubble = vleResult.vle_curve
                      .map((p) => {
                        const x = p.x1_liquid * 400;
                        const y = 150 - (p.pressure_kpa / maxP) * 140;
                        return `${x.toFixed(1)},${y.toFixed(1)}`;
                      })
                      .join(' ');
                    const ptsDew = vleResult.vle_curve
                      .map((p) => {
                        const x = p.y1_vapor * 400;
                        const y = 150 - (p.pressure_kpa / maxP) * 140;
                        return `${x.toFixed(1)},${y.toFixed(1)}`;
                      })
                      .join(' ');

                    const currentX = vleX1 * 400;
                    const currentY = 150 - (vleResult.total_vapor_pressure_kpa / maxP) * 140;

                    return (
                      <g>
                        <polyline fill="none" stroke="#D47942" strokeWidth="2.5" points={ptsBubble} />
                        <polyline fill="none" stroke="#8B572A" strokeWidth="1.8" strokeDasharray="4 2" points={ptsDew} />
                        <circle cx={currentX} cy={currentY} r="5" fill="#D47942" />
                      </g>
                    );
                  })()}
                </svg>
              </div>

              <div className="flex justify-between text-[11px] text-stone-500 mt-2 font-mono">
                <span>Pure {vleResult.solvent2_name} (x₁ = 0.0)</span>
                <span>Operating State (x₁ = {vleX1.toFixed(2)})</span>
                <span>Pure {vleResult.solvent1_name} (x₁ = 1.0)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Boiling Elevation & Freezing Depression */}
      {activeTab === 'boiling_freezing' && colligResult && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4 bg-white dark:bg-stone-800 p-5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-[#D47942]" />
              Colligative Solution Setup
            </h3>

            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">Select Solvent:</label>
              <select
                value={colligSolventId}
                onChange={(e) => setColligSolventId(e.target.value)}
                className="w-full px-2 py-1.5 text-xs bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded font-mono"
              >
                {solvents.map((s) => (
                  <option key={s.formula} value={s.formula.toLowerCase()}>
                    {s.name} (Kb={s.kb_c_kg_mol}, Kf={s.kf_c_kg_mol} °C*kg/mol)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">Select Solute:</label>
              <select
                value={colligSoluteId}
                onChange={(e) => setColligSoluteId(e.target.value)}
                className="w-full px-2 py-1.5 text-xs bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded font-mono"
              >
                {solutes.map((s) => (
                  <option key={s.formula} value={s.formula.toLowerCase()}>
                    {s.name} (MW={s.molar_mass_g_mol} g/mol, i={s.van_t_hoff_i})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-stone-600 dark:text-stone-400 block font-semibold mb-1">Solute Mass (g):</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.01"
                  value={colligSoluteMass}
                  onChange={(e) => setColligSoluteMass(parseFloat(e.target.value) || 0.1)}
                  className="w-full px-2 py-1 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded font-mono"
                />
              </div>
              <div>
                <label className="text-stone-600 dark:text-stone-400 block font-semibold mb-1">Solvent Mass (g):</label>
                <input
                  type="number"
                  step="10"
                  min="1"
                  value={colligSolventMass}
                  onChange={(e) => setColligSolventMass(parseFloat(e.target.value) || 100.0)}
                  className="w-full px-2 py-1 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded font-mono"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-stone-200 dark:border-stone-700">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                Cryoscopic Molar Mass Determination (Rast Method):
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="Observed ΔTf (°C)"
                value={observedDeltaTf ?? ''}
                onChange={(e) => setObservedDeltaTf(e.target.value ? parseFloat(e.target.value) : undefined)}
                className="w-full px-2 py-1 text-xs bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded font-mono"
              />
              <span className="text-[11px] text-stone-500 block mt-1">
                Enter experimental freezing point drop to back-calculate solute molar mass.
              </span>
            </div>

            {colligResult.applicability_warning && (
              <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded text-xs text-amber-800 dark:text-amber-200 flex items-start gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{colligResult.applicability_warning}</span>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-stone-800 p-5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-4">
                Colligative Elevation & Depression Summary
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Ebullioscopy Card */}
                <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-xs uppercase text-amber-700 dark:text-amber-400">
                    <Flame className="w-4 h-4" />
                    <span>Boiling-Point Elevation (ΔTb)</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-stone-900 dark:text-stone-100">
                    +{colligResult.delta_tb_c.toFixed(4)} °C
                  </div>
                  <div className="text-xs text-stone-600 dark:text-stone-400 font-mono">
                    Solution Tb: <span className="font-bold">{colligResult.solution_boiling_point_c.toFixed(3)} °C</span> (Pure: {colligResult.pure_boiling_point_c} °C)
                  </div>
                </div>

                {/* Cryoscopy Card */}
                <div className="p-4 bg-[#FDF8F5] dark:bg-stone-900 rounded-xl border border-[#D47942]/30 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-xs uppercase text-[#8B572A] dark:text-[#D47942]">
                    <Thermometer className="w-4 h-4" />
                    <span>Freezing-Point Depression (ΔTf)</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#D47942]">
                    -{colligResult.delta_tf_c.toFixed(4)} °C
                  </div>
                  <div className="text-xs text-stone-600 dark:text-stone-400 font-mono">
                    Solution Tf: <span className="font-bold">{colligResult.solution_freezing_point_c.toFixed(3)} °C</span> (Pure: {colligResult.pure_freezing_point_c} °C)
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-stone-50 dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800 text-xs font-mono flex justify-between">
                <span>Solution Molality m: <strong>{colligResult.molality_m} mol/kg</strong></span>
                <span>van 't Hoff Factor i: <strong>{colligResult.van_t_hoff_factor_i}</strong></span>
                {colligResult.estimated_molar_mass_g_mol && (
                  <span className="text-[#D47942]">Calculated MW: <strong>{colligResult.estimated_molar_mass_g_mol} g/mol</strong></span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Osmotic Pressure & Tonicity */}
      {activeTab === 'osmosis' && osmoResult && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4 bg-white dark:bg-stone-800 p-5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-[#D47942]" />
              Osmometer Solution Controls
            </h3>

            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">Solute Label:</label>
              <input
                type="text"
                value={osmoSoluteName}
                onChange={(e) => setOsmoSoluteName(e.target.value)}
                className="w-full px-2 py-1 text-xs bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-stone-600 dark:text-stone-400 block font-semibold mb-1">Solute Mass (g):</label>
                <input
                  type="number"
                  step="0.5"
                  value={osmoSoluteMass}
                  onChange={(e) => setOsmoSoluteMass(parseFloat(e.target.value) || 1.0)}
                  className="w-full px-2 py-1 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded font-mono"
                />
              </div>
              <div>
                <label className="text-stone-600 dark:text-stone-400 block font-semibold mb-1">Volume (L):</label>
                <input
                  type="number"
                  step="0.1"
                  value={osmoSolVolumeL}
                  onChange={(e) => setOsmoSolVolumeL(parseFloat(e.target.value) || 1.0)}
                  className="w-full px-2 py-1 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-stone-600 dark:text-stone-400 block font-semibold mb-1">Molar Mass (g/mol):</label>
                <input
                  type="number"
                  step="1"
                  value={osmoSoluteMw}
                  onChange={(e) => setOsmoSoluteMw(parseFloat(e.target.value) || 58.44)}
                  className="w-full px-2 py-1 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded font-mono"
                />
              </div>
              <div>
                <label className="text-stone-600 dark:text-stone-400 block font-semibold mb-1">van 't Hoff (i):</label>
                <input
                  type="number"
                  step="0.1"
                  value={osmoVanTHoffI}
                  onChange={(e) => setOsmoVanTHoffI(parseFloat(e.target.value) || 1.0)}
                  className="w-full px-2 py-1 bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-700 dark:text-stone-300">
                <span>Temperature:</span>
                <span className="font-mono text-[#D47942]">{osmoTempC.toFixed(1)} °C</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="1"
                value={osmoTempC}
                onChange={(e) => setOsmoTempC(parseFloat(e.target.value))}
                className="w-full mt-1.5 accent-[#D47942]"
              />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-stone-800 p-5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-4">
                Osmotic Pressure & Biological Tonicity
              </h3>

              <div className="p-4 bg-[#FDF8F5] dark:bg-stone-900 rounded-xl border border-[#D47942]/30 mb-4 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B572A] dark:text-[#D47942] block">
                  van 't Hoff Osmotic Pressure (Π)
                </span>
                <div className="text-3xl font-bold font-mono text-[#D47942]">
                  {osmoResult.osmotic_pressure_atm.toFixed(3)} atm
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono text-stone-600 dark:text-stone-400 pt-2 border-t border-[#D47942]/20">
                  <span>{osmoResult.osmotic_pressure_bar.toFixed(3)} bar</span>
                  <span>{osmoResult.osmotic_pressure_kpa.toFixed(1)} kPa</span>
                  <span>{osmoResult.osmotic_pressure_mmhg.toFixed(0)} mmHg</span>
                </div>
              </div>

              <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="font-semibold text-stone-700 dark:text-stone-300">Biological Tonicity (Erythrocyte Stability):</span>
                  <span className={`font-bold ${osmoResult.is_isotonic_blood ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {osmoResult.tonicity_category}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-stone-500 font-mono">
                  <span>Morse Density-Corrected Pressure: {osmoResult.morse_corrected_pressure_atm.toFixed(3)} atm</span>
                  {osmoResult.macromolecule_mw_estimate && (
                    <span>Estimated Biomolecule MW: {osmoResult.macromolecule_mw_estimate} g/mol</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Ionic Strength & Debye-Hückel Activity */}
      {activeTab === 'ionic_strength' && ionicResult && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4 bg-white dark:bg-stone-800 p-5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D47942]" />
              Electrolyte Solution Setup
            </h3>

            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">Electrolyte Salt:</label>
              <select
                value={electrolyteId}
                onChange={(e) => setElectrolyteId(e.target.value)}
                className="w-full px-2 py-1.5 text-xs bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded font-mono"
              >
                {solutes.filter((s) => s.is_electrolyte).map((s) => (
                  <option key={s.formula} value={s.formula.toLowerCase()}>
                    {s.name} ({s.formula}, {s.cation_charge}:{s.anion_charge})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-700 dark:text-stone-300">
                <span>Concentration M (mol/L):</span>
                <span className="font-mono text-[#D47942]">{electrolyteMolarity.toFixed(3)} M</span>
              </div>
              <input
                type="range"
                min="0.001"
                max="0.50"
                step="0.005"
                value={electrolyteMolarity}
                onChange={(e) => setElectrolyteMolarity(parseFloat(e.target.value))}
                className="w-full mt-1.5 accent-[#D47942]"
              />
            </div>

            <div className="p-3 bg-[#FDF8F5] dark:bg-stone-900 border border-[#D47942]/30 rounded-lg text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-stone-600 dark:text-stone-400">Ionic Strength (I):</span>
                <span className="font-mono font-bold text-lg text-[#D47942]">{ionicResult.ionic_strength_i.toFixed(4)} M</span>
              </div>
              <div className="text-[11px] text-stone-500">
                I = ½ (c₊z₊² + c₋z₋²) for |z₊·z₋| = {Math.abs(ionicResult.cation_charge_z_plus * ionicResult.anion_charge_z_minus)}
              </div>
            </div>

            {ionicResult.validity_warning && (
              <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded text-xs text-amber-800 dark:text-amber-200 flex items-start gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{ionicResult.validity_warning}</span>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-stone-800 p-5 rounded-xl border border-stone-200 dark:border-stone-700 shadow-sm">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-4">
                Mean Ionic Activity Coefficient (γ±) Comparison
              </h3>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800 text-xs space-y-1">
                  <span className="text-stone-500 font-bold block">Debye-Hückel Limiting (DHLL)</span>
                  <div className="text-lg font-bold font-mono text-stone-900 dark:text-stone-100">
                    {ionicResult.dhll_gamma_plus_minus.toFixed(4)}
                  </div>
                  <span className="text-[10px] text-stone-400 block">Accurate for I ≤ 0.01 M</span>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800 text-xs space-y-1">
                  <span className="text-stone-500 font-bold block">Extended Debye-Hückel</span>
                  <div className="text-lg font-bold font-mono text-stone-900 dark:text-stone-100">
                    {ionicResult.extended_dh_gamma_plus_minus.toFixed(4)}
                  </div>
                  <span className="text-[10px] text-stone-400 block">Accurate for I ≤ 0.10 M</span>
                </div>

                <div className="p-3 bg-[#FDF8F5] dark:bg-stone-900 rounded-lg border border-[#D47942]/30 text-xs space-y-1">
                  <span className="text-[#8B572A] dark:text-[#D47942] font-bold block">Davies Semi-Empirical</span>
                  <div className="text-lg font-bold font-mono text-[#D47942]">
                    {ionicResult.davies_gamma_plus_minus.toFixed(4)}
                  </div>
                  <span className="text-[10px] text-stone-400 block">Accurate for I ≤ 0.50 M</span>
                </div>
              </div>

              {/* Activity vs Concentration Curve */}
              <div className="w-full h-44 bg-stone-50 dark:bg-stone-900 rounded-lg p-3 relative flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120">
                  {/* Grid Lines */}
                  {[0, 30, 60, 90, 120].map((y) => (
                    <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="currentColor" className="text-stone-200 dark:text-stone-800" strokeDasharray="3 3" />
                  ))}

                  {/* Gamma curve */}
                  {(() => {
                    const pts = ionicResult.activity_curve
                      .map((pt) => {
                        const x = (pt.concentration_m / 0.5) * 400;
                        const y = 110 - pt.gamma_plus_minus * 100;
                        return `${x.toFixed(1)},${y.toFixed(1)}`;
                      })
                      .join(' ');
                    const currentX = (electrolyteMolarity / 0.5) * 400;
                    const currentY = 110 - ionicResult.selected_gamma * 100;
                    return (
                      <g>
                        <polyline fill="none" stroke="#D47942" strokeWidth="2.5" points={pts} />
                        <circle cx={currentX} cy={currentY} r="4" fill="#D47942" />
                      </g>
                    );
                  })()}
                </svg>
              </div>

              <div className="flex justify-between text-[11px] text-stone-500 mt-2 font-mono">
                <span>0.001 M</span>
                <span>Operating Molarity ({electrolyteMolarity.toFixed(3)} M, γ± = {ionicResult.selected_gamma})</span>
                <span>0.50 M</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
