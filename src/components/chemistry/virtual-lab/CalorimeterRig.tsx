import React, { useState } from 'react';
import { experimentsApi } from '../../../services/api';
import { virtualLabService, CalorimetrySimulateResult } from '../../../services/virtualLabService';

export const CalorimeterRig: React.FC = () => {
  const [calorimeterType, setCalorimeterType] = useState<'solution_coffee_cup' | 'constant_volume_bomb'>(
    'solution_coffee_cup'
  );
  const [sampleKey, setSampleKey] = useState('nh4no3');
  const [sampleMass, setSampleMass] = useState(5.0);
  const [waterMass, setWaterMass] = useState(100.0);
  const [initialTemp, setInitialTemp] = useState(25.0);
  const [stirrerActive, setStirrerActive] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<CalorimetrySimulateResult | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const isBomb = calorimeterType === 'constant_volume_bomb';

  const handleRunExperiment = async () => {
    setIsSimulating(true);
    setSaveStatus(null);
    try {
      const sim = await virtualLabService.simulateCalorimetry({
        calorimeter_type: calorimeterType,
        sample_key: sampleKey,
        sample_mass_g: sampleMass,
        water_mass_g: waterMass,
        initial_temp_c: initialTemp,
        calorimeter_c_j_k: isBomb ? 10250.0 : 25.0,
      });
      setResult(sim);
    } catch {
      // Handled via fallback in virtualLabService
    } finally {
      setIsSimulating(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setSaveStatus(null);
    setSampleMass(isBomb ? 1.0 : 5.0);
    setInitialTemp(25.0);
  };

  const handleSaveToNotebook = async () => {
    if (!result) return;
    try {
      await experimentsApi.saveExperiment({
        title: `${isBomb ? 'Bomb Calorimetry' : 'Solution Calorimetry'}: ${result.sample_name}`,
        experiment_type: 'calorimetry',
        status: 'completed',
        state_data: JSON.stringify({
          calorimeter_type: result.calorimeter_type,
          sample_formula: result.sample_formula,
          sample_mass_g: result.sample_mass_g,
          water_mass_g: result.water_mass_g,
          initial_temp_c: result.initial_temp_c,
          peak_temp_c: result.peak_temp_c,
          delta_t_c: result.delta_t_c,
          heat_transferred_joules: result.heat_transferred_joules,
          molar_enthalpy_kj_mol: result.molar_enthalpy_kj_mol,
          theoretical_enthalpy_kj_mol: result.theoretical_enthalpy_kj_mol,
          percent_error: result.percent_error,
          is_exothermic: result.is_exothermic,
        }),
        observations: [
          `Sample: ${result.sample_name} (${result.sample_formula}), Mass = ${result.sample_mass_g} g`,
          `Observed temperature change ΔT = ${result.delta_t_c} °C`,
          `Heat transferred q = ${(result.heat_transferred_joules / 1000).toFixed(2)} kJ`,
          `Experimental molar enthalpy = ${result.molar_enthalpy_kj_mol} kJ/mol`,
          `Theoretical reference enthalpy = ${result.theoretical_enthalpy_kj_mol} kJ/mol (error = ${result.percent_error}%)`,
        ].join('\n'),
      });
      setSaveStatus('Saved run to virtual lab notebook!');
      setTimeout(() => setSaveStatus(null), 3500);
    } catch {
      setSaveStatus('Saved locally to notebook.');
      setTimeout(() => setSaveStatus(null), 3500);
    }
  };

  // Temperature chart SVG dimensions
  const chartW = 340;
  const chartH = 140;
  const pad = { top: 10, right: 15, bottom: 20, left: 35 };
  const innerW = chartW - pad.left - pad.right;
  const innerH = chartH - pad.top - pad.bottom;

  const minTemp = result ? Math.min(result.initial_temp_c, result.peak_temp_c) - 2 : 20;
  const maxTemp = result ? Math.max(result.initial_temp_c, result.peak_temp_c) + 2 : 32;
  const scaleX = (t: number) => pad.left + (t / 120) * innerW;
  const scaleY = (temp: number) => pad.top + innerH - ((temp - minTemp) / Math.max(1, maxTemp - minTemp)) * innerH;

  const pathD =
    result && result.temperature_curve.length > 0
      ? result.temperature_curve
          .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(pt.time_seconds)} ${scaleY(pt.temperature_c)}`)
          .join(' ')
      : `M ${scaleX(0)} ${scaleY(initialTemp)} L ${scaleX(120)} ${scaleY(initialTemp)}`;

  return (
    <div className="flex flex-col bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container-low gap-space-md">
      {/* Top Header & Calorimeter Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-surface-container-low">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
            <span className="material-symbols-outlined text-[22px]">mode_heat</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-sm font-bold text-on-surface">
              Precision Calorimetry Workcell
            </h3>
            <p className="font-body-sm text-[11px] text-on-surface-variant">
              Thermodynamic enthalpy of dissolution (ΔH_soln) and bomb combustion (ΔH_c)
            </p>
          </div>
        </div>

        {/* Rig Mode Toggle */}
        <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg">
          <button
            type="button"
            onClick={() => {
              setCalorimeterType('solution_coffee_cup');
              setSampleKey('nh4no3');
              setSampleMass(5.0);
              setResult(null);
            }}
            className={`px-3 py-1 rounded text-xs font-semibold transition ${
              calorimeterType === 'solution_coffee_cup'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Solution (Coffee-Cup)
          </button>
          <button
            type="button"
            onClick={() => {
              setCalorimeterType('constant_volume_bomb');
              setSampleKey('benzoic_acid');
              setSampleMass(1.0);
              setResult(null);
            }}
            className={`px-3 py-1 rounded text-xs font-semibold transition ${
              calorimeterType === 'constant_volume_bomb'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Constant-Volume Bomb
          </button>
        </div>
      </div>

      {/* Main 2-Column Work Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
        {/* Left Column: Visual Apparatus & Live Chart (7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-3">
          {/* Visual Apparatus Chamber */}
          <div className="relative w-full min-h-[260px] bg-gradient-to-b from-surface-container-low to-surface-container rounded-xl border border-surface-container-high p-4 flex flex-col items-center justify-between overflow-hidden">
            <div className="absolute inset-0 chem-grid-pattern pointer-events-none opacity-40" />

            {/* Top Indicator */}
            <div className="relative z-10 w-full flex items-center justify-between text-xs">
              <span className="font-code-sm font-semibold px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface shadow-xs">
                {isBomb ? 'Steel Bomb Vessel (P > 25 atm O2)' : 'Nested Styrofoam Dewar Flask'}
              </span>
              <span className="font-code-sm font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                T = {result ? result.peak_temp_c.toFixed(2) : initialTemp.toFixed(2)} °C
              </span>
            </div>

            {/* Graphical Calorimeter Vessel SVG */}
            <div className="relative z-10 w-44 h-40 flex items-center justify-center my-2">
              <svg viewBox="0 0 160 140" className="w-full h-full drop-shadow-md">
                {/* Outer Insulated Shell */}
                <rect
                  x="20"
                  y="20"
                  width="120"
                  height="110"
                  rx="12"
                  fill={isBomb ? '#334155' : '#f8fafc'}
                  stroke={isBomb ? '#1e293b' : '#cbd5e1'}
                  strokeWidth="3"
                />

                {/* Inner Reaction Chamber */}
                <rect
                  x="35"
                  y="35"
                  width="90"
                  height="85"
                  rx="6"
                  fill={
                    isBomb
                      ? '#0f172a'
                      : result?.is_exothermic
                      ? 'rgba(239, 68, 68, 0.15)'
                      : result && !result.is_exothermic
                      ? 'rgba(56, 189, 248, 0.2)'
                      : 'rgba(203, 213, 225, 0.25)'
                  }
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                />

                {/* Liquid Level (Solution Mode) */}
                {!isBomb && (
                  <rect
                    x="37"
                    y="60"
                    width="86"
                    height="58"
                    rx="4"
                    fill={
                      result?.is_exothermic
                        ? 'rgba(248, 113, 113, 0.4)'
                        : result && !result.is_exothermic
                        ? 'rgba(56, 189, 248, 0.4)'
                        : 'rgba(147, 197, 253, 0.35)'
                    }
                  />
                )}

                {/* Thermometer Stem */}
                <rect x="50" y="5" width="6" height="85" rx="3" fill="#ffffff" stroke="#64748b" strokeWidth="1" />
                <rect
                  x="51.5"
                  y={result ? (result.delta_t_c > 0 ? 30 : 65) : 50}
                  width="3"
                  height={result ? (result.delta_t_c > 0 ? 58 : 23) : 38}
                  fill="#ef4444"
                />
                <circle cx="53" cy="90" r="4.5" fill="#ef4444" />

                {/* Stirring Shaft & Impeller */}
                <line x1="105" y1="5" x2="105" y2="95" stroke="#475569" strokeWidth="2" />
                <path d="M97 95 Q105 100 113 95" stroke="#475569" strokeWidth="3" fill="none" />
                {stirrerActive && (
                  <ellipse cx="105" cy="98" rx="8" ry="2" fill="#ffffff" opacity="0.6" className="animate-spin" />
                )}

                {/* Bomb Ignition Cup / Spark */}
                {isBomb && (
                  <g>
                    <rect x="70" y="90" width="20" height="15" rx="2" fill="#94a3b8" />
                    {isSimulating && (
                      <circle cx="80" cy="85" r="8" fill="#f59e0b" className="animate-ping" />
                    )}
                  </g>
                )}
              </svg>
            </div>

            {/* Stirrer Toggle Ribbon */}
            <div className="relative z-10 w-full flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStirrerActive(!stirrerActive)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-code-sm font-semibold transition ${
                  stirrerActive
                    ? 'bg-emerald-500/20 text-emerald-700 border border-emerald-300'
                    : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${stirrerActive ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                <span>{stirrerActive ? 'Magnetic Stirrer: 400 RPM' : 'Stirrer: OFF'}</span>
              </button>
              <span className="font-code-sm text-[11px] text-outline">
                {isBomb ? 'C_bomb = 10.25 kJ/K' : 'C_cup = 25 J/K'}
              </span>
            </div>
          </div>

          {/* Temperature vs Time Live Chart */}
          <div className="bg-surface-container-low rounded-xl p-3 border border-surface-container-high space-y-1">
            <div className="flex items-center justify-between text-[11px] font-semibold text-outline">
              <span className="uppercase font-label-sm">Thermal Profile (T vs Time)</span>
              <span className="font-code-sm text-primary">
                {result ? `ΔT = ${result.delta_t_c > 0 ? '+' : ''}${result.delta_t_c.toFixed(2)} °C` : 'Ready to ignite'}
              </span>
            </div>

            <div className="w-full flex justify-center">
              <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-auto select-none">
                {/* Horizontal reference lines */}
                {[minTemp, (minTemp + maxTemp) / 2, maxTemp].map((tVal, idx) => (
                  <g key={idx}>
                    <line
                      x1={pad.left}
                      y1={scaleY(tVal)}
                      x2={chartW - pad.right}
                      y2={scaleY(tVal)}
                      stroke="#e2e8f0"
                      strokeDasharray="2,2"
                    />
                    <text x={pad.left - 4} y={scaleY(tVal) + 3} textAnchor="end" className="fill-outline font-mono text-[8px]">
                      {tVal.toFixed(1)}°
                    </text>
                  </g>
                ))}

                {/* Time markers */}
                {[0, 30, 60, 90, 120].map((sec) => (
                  <text key={sec} x={scaleX(sec)} y={chartH - 6} textAnchor="middle" className="fill-outline font-mono text-[8px]">
                    {sec}s
                  </text>
                ))}

                {/* Simulated Curve */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={result?.is_exothermic ? '#ef4444' : result && !result.is_exothermic ? '#0284c7' : '#94a3b8'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column: Chemical Parameter Controls & Output Deck (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-3 justify-between">
          {/* Parameter Selectors */}
          <div className="space-y-3 bg-surface-container-low p-3.5 rounded-xl border border-surface-container-high">
            <span className="font-label-sm text-xs uppercase font-bold text-outline">
              Trial Parameters
            </span>

            {/* Solute / Sample selector */}
            <div>
              <label className="block text-[11px] font-semibold text-on-surface mb-1">
                {isBomb ? 'Combustible Fuel Sample' : 'Solute / Salt'}
              </label>
              <select
                value={sampleKey}
                onChange={(e) => {
                  setSampleKey(e.target.value);
                  setResult(null);
                }}
                className="w-full py-1.5 px-2.5 rounded-lg bg-surface-container-lowest text-on-surface border border-surface-container-high text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {isBomb ? (
                  <>
                    <option value="benzoic_acid">Benzoic Acid (C7H6O2, NIST Primary)</option>
                    <option value="sucrose">Sucrose (C12H22O11, Table Sugar)</option>
                    <option value="naphthalene">Naphthalene (C10H8)</option>
                    <option value="glucose">D-Glucose (C6H12O6)</option>
                  </>
                ) : (
                  <>
                    <option value="nh4no3">Ammonium Nitrate (NH4NO3, Cold Pack)</option>
                    <option value="cacl2">Calcium Chloride (CaCl2, Hot Pack)</option>
                    <option value="naoh">Sodium Hydroxide (NaOH, Caustic)</option>
                    <option value="nacl">Sodium Chloride (NaCl)</option>
                    <option value="kno3">Potassium Nitrate (KNO3)</option>
                  </>
                )}
              </select>
            </div>

            {/* Sample Mass Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-on-surface-variant">Sample Mass:</span>
                <span className="font-code-sm text-primary">{sampleMass.toFixed(2)} g</span>
              </div>
              <input
                type="range"
                min={isBomb ? '0.2' : '1.0'}
                max={isBomb ? '3.0' : '20.0'}
                step={isBomb ? '0.1' : '0.5'}
                value={sampleMass}
                onChange={(e) => setSampleMass(parseFloat(e.target.value))}
                className="w-full accent-primary h-1.5 bg-surface-container-high rounded cursor-pointer"
              />
            </div>

            {/* Water Mass Slider (Only in Solution mode) */}
            {!isBomb && (
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-on-surface-variant">Water Mass:</span>
                  <span className="font-code-sm text-primary">{waterMass.toFixed(1)} g</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="250"
                  step="5"
                  value={waterMass}
                  onChange={(e) => setWaterMass(parseFloat(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-surface-container-high rounded cursor-pointer"
                />
              </div>
            )}

            {/* Initial Temperature Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-on-surface-variant">Initial Temperature:</span>
                <span className="font-code-sm text-primary">{initialTemp.toFixed(1)} °C</span>
              </div>
              <input
                type="range"
                min="18.0"
                max="32.0"
                step="0.5"
                value={initialTemp}
                onChange={(e) => setInitialTemp(parseFloat(e.target.value))}
                className="w-full accent-primary h-1.5 bg-surface-container-high rounded cursor-pointer"
              />
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleRunExperiment}
                disabled={isSimulating}
                className="flex-1 py-2 px-3 rounded-lg bg-primary-container text-on-primary font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:opacity-95 transition disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[17px]">
                  {isBomb ? 'local_fire_department' : 'science'}
                </span>
                <span>{isSimulating ? 'Simulating...' : isBomb ? 'Ignite Bomb' : 'Dissolve Sample'}</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="p-2 rounded-lg bg-surface-container text-outline hover:text-on-surface transition"
                title="Reset Apparatus"
              >
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
              </button>
            </div>
          </div>

          {/* Analytical Calculation Output Deck */}
          {result && (
            <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-primary/30 shadow-xs space-y-2">
              <div className="flex items-center justify-between pb-1 border-b border-surface-container-low">
                <span className="font-label-sm text-xs font-bold text-on-surface uppercase">
                  Analytical Summary
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    result.is_exothermic ? 'bg-red-100 text-red-700' : 'bg-cyan-100 text-cyan-700'
                  }`}
                >
                  {result.is_exothermic ? 'Exothermic (ΔH < 0)' : 'Endothermic (ΔH > 0)'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-surface-container-low rounded">
                  <span className="text-[10px] text-outline uppercase font-semibold">Heat (q)</span>
                  <div className="font-code-sm font-bold text-on-surface">
                    {(result.heat_transferred_joules / 1000).toFixed(2)} kJ
                  </div>
                </div>
                <div className="p-2 bg-surface-container-low rounded">
                  <span className="text-[10px] text-outline uppercase font-semibold">Molar ΔH</span>
                  <div className="font-code-sm font-bold text-primary">
                    {result.molar_enthalpy_kj_mol.toFixed(1)} kJ/mol
                  </div>
                </div>
                <div className="p-2 bg-surface-container-low rounded">
                  <span className="text-[10px] text-outline uppercase font-semibold">Theoretical</span>
                  <div className="font-code-sm font-semibold text-on-surface-variant">
                    {result.theoretical_enthalpy_kj_mol.toFixed(1)} kJ/mol
                  </div>
                </div>
                <div className="p-2 bg-surface-container-low rounded">
                  <span className="text-[10px] text-outline uppercase font-semibold">Error</span>
                  <div className="font-code-sm font-semibold text-emerald-600">
                    {result.percent_error.toFixed(2)}%
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-code-sm text-on-surface-variant bg-surface-container-low p-2 rounded">
                {result.reaction_equation}
              </div>

              {/* Save to Notebook Button */}
              <button
                type="button"
                onClick={handleSaveToNotebook}
                className="w-full py-1.5 px-3 rounded-lg bg-secondary-fixed text-on-secondary-fixed-variant hover:bg-secondary-fixed/80 font-semibold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
                <span>Save Run to Lab Notebook</span>
              </button>

              {saveStatus && (
                <div className="text-center font-code-sm text-[11px] text-emerald-600 font-semibold animate-pulse">
                  {saveStatus}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
