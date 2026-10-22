import React, { useState, useEffect, useMemo } from 'react';
import {
  Flame,
  Zap,
  TrendingDown,
  Layers,
  Save,
  CheckCircle2,
  RefreshCw,
  Clock,
  Gauge,
  Info,
  Sliders
} from 'lucide-react';
import {
  KineticsService,
  FALLBACK_PRESET_REACTIONS
} from '../../../services/kineticsService';
import {
  RateLawSimulationResult,
  ArrheniusResult,
  MichaelisMentenResult,
  ConsecutiveKineticsResult,
  PresetKineticsReaction
} from '../../../types/kinetics';
import { experimentsApi } from '../../../services/api';

export const KineticsReactorRig: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rate_laws' | 'arrhenius' | 'enzyme' | 'consecutive'>('rate_laws');
  const [presets, setPresets] = useState<PresetKineticsReaction[]>(FALLBACK_PRESET_REACTIONS);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('h2o2_decomp');

  // Rate law state
  const [order, setOrder] = useState<number>(1);
  const [initialConcM, setInitialConcM] = useState<number>(1.0);
  const [rateConstantK, setRateConstantK] = useState<number>(0.05);
  const [totalTimeSeconds, setTotalTimeSeconds] = useState<number>(60.0);
  const [plotMode, setPlotMode] = useState<'conc_vs_t' | 'linearized' | 'rate_vs_c'>('conc_vs_t');
  const [rateLawResult, setRateLawResult] = useState<RateLawSimulationResult | null>(null);

  // Arrhenius state
  const [t1C, setT1C] = useState<number>(20.0);
  const [k1Val, setK1Val] = useState<number>(0.02);
  const [t2C, setT2C] = useState<number>(40.0);
  const [k2Val, setK2Val] = useState<number>(0.08);
  const [targetTC, setTargetTC] = useState<number>(60.0);
  const [arrheniusResult, setArrheniusResult] = useState<ArrheniusResult | null>(null);

  // Enzyme kinetics state
  const [vMax, setVMax] = useState<number>(100.0);
  const [kM, setKM] = useState<number>(15.0);
  const [inhibitionType, setInhibitionType] = useState<string>('none');
  const [inhibitorConc, setInhibitorConc] = useState<number>(3.0);
  const [kI, setKI] = useState<number>(1.5);
  const [enzymeResult, setEnzymeResult] = useState<MichaelisMentenResult | null>(null);

  // Consecutive reactions state
  const [k1Step, setK1Step] = useState<number>(0.15);
  const [k2Step, setK2Step] = useState<number>(0.04);
  const [consecutiveResult, setConsecutiveResult] = useState<ConsecutiveKineticsResult | null>(null);

  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Load presets
  useEffect(() => {
    KineticsService.getPresetReactions().then((data) => setPresets(data));
  }, []);

  // Update parameters when preset changes
  useEffect(() => {
    const p = presets.find((pr) => pr.id === selectedPresetId);
    if (p) {
      if (p.order !== undefined) setOrder(p.order);
      if (p.typical_k !== undefined) setRateConstantK(p.typical_k);
      if (p.v_max !== undefined) setVMax(p.v_max);
      if (p.k_m !== undefined) setKM(p.k_m);
    }
  }, [selectedPresetId, presets]);

  // Run rate law simulation
  useEffect(() => {
    const p = presets.find((pr) => pr.id === selectedPresetId);
    const reactionName = p ? p.name : `Order ${order} Reaction`;
    KineticsService.simulateRateLaw(
      reactionName,
      order,
      initialConcM,
      rateConstantK,
      totalTimeSeconds,
      50
    ).then((res) => setRateLawResult(res));
  }, [order, initialConcM, rateConstantK, totalTimeSeconds, selectedPresetId]);

  // Run Arrhenius solver
  useEffect(() => {
    if (activeTab === 'arrhenius') {
      KineticsService.calculateArrhenius(t1C, k1Val, t2C, k2Val, targetTC).then((res) =>
        setArrheniusResult(res)
      );
    }
  }, [activeTab, t1C, k1Val, t2C, k2Val, targetTC]);

  // Run Enzyme kinetics
  useEffect(() => {
    if (activeTab === 'enzyme') {
      const inhib = inhibitionType === 'none' ? undefined : inhibitionType;
      KineticsService.simulateMichaelisMenten(
        'Enzyme System',
        vMax,
        kM,
        inhib,
        inhibitorConc,
        kI
      ).then((res) => setEnzymeResult(res));
    }
  }, [activeTab, vMax, kM, inhibitionType, inhibitorConc, kI]);

  // Run Consecutive reaction dynamics
  useEffect(() => {
    if (activeTab === 'consecutive') {
      KineticsService.simulateConsecutive(initialConcM, k1Step, k2Step, 60.0, 60).then((res) =>
        setConsecutiveResult(res)
      );
    }
  }, [activeTab, initialConcM, k1Step, k2Step]);

  // Save kinetics run to notebook
  const handleSaveToNotebook = async () => {
    if (!rateLawResult) return;
    setSaveStatus('saving');
    try {
      await experimentsApi.saveExperiment({
        title: `Chemical Kinetics: ${rateLawResult.reaction_name} (Order ${rateLawResult.order})`,
        experiment_type: 'reaction_kinetics',
        status: 'completed',
        state_data: JSON.stringify({
          order: rateLawResult.order,
          initial_conc_m: rateLawResult.initial_conc_m,
          rate_constant_k: rateLawResult.rate_constant_k,
          k_units: rateLawResult.k_units,
          half_life_seconds: rateLawResult.half_life_seconds,
        }),
        observations: `Order ${rateLawResult.order} kinetics with k = ${rateLawResult.rate_constant_k} ${rateLawResult.k_units}. Measured half-life t1/2 = ${rateLawResult.half_life_seconds.toFixed(2)} s. Rate equation: ${rateLawResult.differential_rate_equation}.`,
      });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  return (
    <div className="bg-[#242725] border border-stone-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Workstation Header */}
      <div className="bg-[#1C1E1D] border-b border-stone-800 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-stone-100 font-serif">
                Reaction Kinetics & Catalytic Dynamics Reactor
              </h2>
              <span className="px-2 py-0.5 rounded text-xs font-mono bg-amber-500/10 border border-amber-500/30 text-amber-400">
                Rate Laws & Arrhenius
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Integrated rate equations, collision theory activation barrier, and enzyme saturation mechanics
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-stone-900/60 p-1 rounded-lg border border-stone-800 text-xs">
          <button
            onClick={() => setActiveTab('rate_laws')}
            className={`px-3 py-1.5 rounded font-medium transition-colors ${
              activeTab === 'rate_laws' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Integrated Rate Laws
          </button>
          <button
            onClick={() => setActiveTab('arrhenius')}
            className={`px-3 py-1.5 rounded font-medium transition-colors ${
              activeTab === 'arrhenius' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Arrhenius & Ea
          </button>
          <button
            onClick={() => setActiveTab('enzyme')}
            className={`px-3 py-1.5 rounded font-medium transition-colors ${
              activeTab === 'enzyme' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Enzyme Kinetics
          </button>
          <button
            onClick={() => setActiveTab('consecutive')}
            className={`px-3 py-1.5 rounded font-medium transition-colors ${
              activeTab === 'consecutive' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Consecutive (A→B→C)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Controls (4 cols) */}
        <div className="lg:col-span-4 p-5 border-b lg:border-b-0 lg:border-r border-stone-800 bg-[#1F2220] flex flex-col gap-5">
          {activeTab === 'rate_laws' && (
            <>
              {/* Preset Selection */}
              <div>
                <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2 block">
                  Benchmark Reaction Preset
                </label>
                <div className="space-y-1.5">
                  {presets
                    .filter((p) => !p.is_enzyme)
                    .map((pr) => (
                      <button
                        key={pr.id}
                        onClick={() => setSelectedPresetId(pr.id)}
                        className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all ${
                          selectedPresetId === pr.id
                            ? 'bg-stone-800 border-amber-500/50 text-white shadow-md'
                            : 'bg-stone-900/40 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                        }`}
                      >
                        <div className="font-semibold text-stone-200">{pr.name}</div>
                        <div className="text-[10px] text-amber-400/90 font-mono mt-0.5">
                          Order {pr.order} | k = {pr.typical_k} {pr.k_units}
                        </div>
                      </button>
                    ))}
                </div>
              </div>

              {/* Order Switcher */}
              <div className="bg-stone-900/50 p-3.5 rounded-lg border border-stone-800">
                <span className="text-xs font-medium text-stone-300 block mb-2">Reaction Order (n)</span>
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((ord) => (
                    <button
                      key={ord}
                      onClick={() => setOrder(ord)}
                      className={`py-1.5 rounded text-xs font-mono font-bold border transition-colors ${
                        order === ord
                          ? 'bg-amber-600/30 border-amber-500 text-amber-300'
                          : 'bg-stone-800/50 border-stone-700 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {ord === 0 ? 'Zero (0)' : ord === 1 ? '1st Order' : '2nd Order'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div className="bg-stone-900/50 p-3.5 rounded-lg border border-stone-800 space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-stone-300">Initial Concentration [A]₀</span>
                    <span className="font-mono text-amber-400 font-semibold">{initialConcM.toFixed(2)} M</span>
                  </div>
                  <input
                    type="range"
                    min={0.1}
                    max={3.0}
                    step={0.1}
                    value={initialConcM}
                    onChange={(e) => setInitialConcM(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-stone-300">Rate Constant (k)</span>
                    <span className="font-mono text-amber-400 font-semibold">
                      {rateConstantK.toFixed(3)} {rateLawResult?.k_units}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.005}
                    max={0.25}
                    step={0.005}
                    value={rateConstantK}
                    onChange={(e) => setRateConstantK(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>
              </div>

              {/* Analytical Summary Card */}
              {rateLawResult && (
                <div className="bg-stone-900/90 p-4 rounded-xl border border-stone-800 space-y-2.5">
                  <div className="text-[10px] uppercase font-mono text-stone-400 tracking-wider">
                    Rate Law Analytics
                  </div>
                  <div className="font-mono text-xs text-amber-300 bg-black/40 p-2 rounded border border-stone-800">
                    <div>{rateLawResult.differential_rate_equation}</div>
                    <div className="text-stone-400 text-[11px] mt-0.5">{rateLawResult.integrated_rate_equation}</div>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono pt-1 border-t border-stone-800 text-stone-300">
                    <span>Half-Life (t₁/₂):</span>
                    <span className="text-emerald-400 font-bold">{rateLawResult.half_life_seconds.toFixed(2)} s</span>
                  </div>
                </div>
              )}

              {/* Save Experiment */}
              <button
                onClick={handleSaveToNotebook}
                disabled={saveStatus === 'saving'}
                className={`w-full py-2.5 px-4 rounded-lg font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                  saveStatus === 'saved'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 text-white'
                }`}
              >
                {saveStatus === 'saving' ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Logging...
                  </>
                ) : saveStatus === 'saved' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Experiment Logged!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Log Kinetics Run to Notebook
                  </>
                )}
              </button>
            </>
          )}

          {activeTab === 'arrhenius' && (
            /* Arrhenius Inputs */
            <div className="space-y-4">
              <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                Two-Point Arrhenius Parameters
              </span>
              <div className="bg-stone-900/60 p-3 rounded-lg border border-stone-800 space-y-3 text-xs">
                <div>
                  <label className="text-stone-400 block mb-1">State 1 (Low Temp):</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={t1C}
                      onChange={(e) => setT1C(parseFloat(e.target.value))}
                      className="bg-stone-950 border border-stone-700 rounded p-1.5 font-mono text-white text-xs"
                      placeholder="T1 (°C)"
                    />
                    <input
                      type="number"
                      step={0.005}
                      value={k1Val}
                      onChange={(e) => setK1Val(parseFloat(e.target.value))}
                      className="bg-stone-950 border border-stone-700 rounded p-1.5 font-mono text-white text-xs"
                      placeholder="k1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-stone-400 block mb-1">State 2 (High Temp):</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={t2C}
                      onChange={(e) => setT2C(parseFloat(e.target.value))}
                      className="bg-stone-950 border border-stone-700 rounded p-1.5 font-mono text-white text-xs"
                      placeholder="T2 (°C)"
                    />
                    <input
                      type="number"
                      step={0.005}
                      value={k2Val}
                      onChange={(e) => setK2Val(parseFloat(e.target.value))}
                      className="bg-stone-950 border border-stone-700 rounded p-1.5 font-mono text-white text-xs"
                      placeholder="k2"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-stone-400 block mb-1">Target Temp to Predict k:</label>
                  <input
                    type="number"
                    value={targetTC}
                    onChange={(e) => setTargetTC(parseFloat(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-700 rounded p-1.5 font-mono text-white text-xs"
                  />
                </div>
              </div>

              {arrheniusResult && (
                <div className="bg-stone-900/90 p-4 rounded-xl border border-stone-800 space-y-2">
                  <div className="text-[10px] uppercase font-mono text-stone-400">Solved Energetics</div>
                  <div className="text-xs font-mono text-amber-300">
                    <div>Activation Energy (Ea): <span className="font-bold text-white">{arrheniusResult.activation_energy_kj_mol} kJ/mol</span></div>
                    <div className="mt-1">Pre-exp Factor (A): <span className="text-stone-300">{arrheniusResult.pre_exponential_factor_a.toExponential(2)}</span></div>
                    {arrheniusResult.predicted_k_at_target && (
                      <div className="mt-2 pt-2 border-t border-stone-800 text-emerald-400 font-semibold">
                        Predicted k at {targetTC}°C: {arrheniusResult.predicted_k_at_target.toExponential(4)}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'enzyme' && (
            /* Enzyme Inputs */
            <div className="space-y-4 text-xs">
              <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                Michaelis-Menten Parameters
              </span>
              <div className="bg-stone-900/60 p-3 rounded-lg border border-stone-800 space-y-2.5">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-stone-400">Max Velocity (Vmax)</span>
                    <span className="font-mono text-amber-400">{vMax} µM/s</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={300}
                    value={vMax}
                    onChange={(e) => setVMax(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-stone-700 rounded-lg accent-amber-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-stone-400">Michaelis Constant (Km)</span>
                    <span className="font-mono text-amber-400">{kM} µM</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={50}
                    value={kM}
                    onChange={(e) => setKM(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-stone-700 rounded-lg accent-amber-500"
                  />
                </div>

                <div>
                  <label className="text-stone-400 block mb-1">Inhibition Mode:</label>
                  <select
                    value={inhibitionType}
                    onChange={(e) => setInhibitionType(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded p-1.5 font-mono text-white text-xs"
                  >
                    <option value="none">None (Uninhibited)</option>
                    <option value="competitive">Competitive (Km increases)</option>
                    <option value="noncompetitive">Non-Competitive (Vmax decreases)</option>
                    <option value="uncompetitive">Uncompetitive (Both decrease)</option>
                  </select>
                </div>

                {inhibitionType !== 'none' && (
                  <div className="pt-2 border-t border-stone-800 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Inhibitor [I]</span>
                      <span className="font-mono text-cyan-400">{inhibitorConc} µM</span>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={10}
                      step={0.5}
                      value={inhibitorConc}
                      onChange={(e) => setInhibitorConc(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-stone-700 rounded-lg accent-cyan-500"
                    />
                  </div>
                )}
              </div>

              {enzymeResult && (
                <div className="bg-stone-900/90 p-3 rounded-lg border border-stone-800 font-mono text-xs">
                  <div className="text-stone-400">Apparent Vmax: <span className="text-white font-bold">{enzymeResult.apparent_v_max.toFixed(2)} µM/s</span></div>
                  <div className="text-stone-400 mt-1">Apparent Km: <span className="text-white font-bold">{enzymeResult.apparent_k_m.toFixed(2)} µM</span></div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'consecutive' && (
            /* Consecutive Inputs */
            <div className="space-y-4 text-xs">
              <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                Sequential Rate Constants (A → B → C)
              </span>
              <div className="bg-stone-900/60 p-3 rounded-lg border border-stone-800 space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-stone-400">Step 1 Rate (k₁): A → B</span>
                    <span className="font-mono text-amber-400">{k1Step} s⁻¹</span>
                  </div>
                  <input
                    type="range"
                    min={0.02}
                    max={0.5}
                    step={0.01}
                    value={k1Step}
                    onChange={(e) => setK1Step(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-stone-700 rounded-lg accent-amber-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-stone-400">Step 2 Rate (k₂): B → C</span>
                    <span className="font-mono text-cyan-400">{k2Step} s⁻¹</span>
                  </div>
                  <input
                    type="range"
                    min={0.01}
                    max={0.2}
                    step={0.005}
                    value={k2Step}
                    onChange={(e) => setK2Step(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-stone-700 rounded-lg accent-cyan-500"
                  />
                </div>
              </div>

              {consecutiveResult && (
                <div className="bg-stone-900/90 p-3 rounded-lg border border-stone-800 font-mono text-xs">
                  <div className="text-amber-300">
                    Max Intermediate [B]: <span className="font-bold text-white">{consecutiveResult.max_intermediate_conc_m.toFixed(4)} M</span>
                  </div>
                  <div className="text-stone-400 mt-1">
                    Peak Time (t_max): <span className="text-white font-bold">{consecutiveResult.t_max_intermediate_seconds.toFixed(2)} s</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Visualizer (8 cols) */}
        <div className="lg:col-span-8 p-5 flex flex-col gap-5 bg-[#171918]">
          {/* Animated Stirred Tank Reactor */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-4 shadow-md relative overflow-hidden">
            <div className="text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Automated CSTR Reactor Vessel</span>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Impeller Active
              </span>
            </div>

            <div className="h-28 bg-black/60 rounded-lg border border-stone-800 relative flex items-center justify-around px-6 overflow-hidden">
              {/* Reactant Inlet A */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/60 flex items-center justify-center font-mono font-bold text-amber-300 text-xs">
                  [A]
                </div>
                <span className="text-[10px] text-stone-400 font-mono mt-1">Inlet</span>
              </div>

              {/* Reactor Core with animated stirring blades */}
              <div className="w-24 h-24 rounded-2xl border-2 border-stone-600 bg-gradient-to-b from-stone-800/80 to-amber-950/40 relative flex items-center justify-center overflow-hidden shadow-inner">
                {/* Stirring shaft */}
                <div className="absolute top-0 w-1.5 h-16 bg-stone-400" />
                {/* Stirring blade with rotation */}
                <div className="w-14 h-2.5 bg-amber-400/80 rounded animate-spin shadow-md" style={{ animationDuration: '1.2s' }} />
                {/* Bubbles */}
                <div className="absolute bottom-2 left-4 w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" />
                <div className="absolute bottom-4 right-5 w-2 h-2 rounded-full bg-white/30 animate-pulse" />
              </div>

              {/* Product Outlet */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/60 flex items-center justify-center font-mono font-bold text-emerald-300 text-xs">
                  [P]
                </div>
                <span className="text-[10px] text-stone-400 font-mono mt-1">Yield</span>
              </div>
            </div>
          </div>

          {/* Dynamic SVG Graphs based on Active Tab */}
          <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-4 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-amber-400" />
                <span>
                  {activeTab === 'rate_laws'
                    ? 'Time-Course Decay Curve [A](t)'
                    : activeTab === 'arrhenius'
                    ? 'Temperature Dependence k(T)'
                    : activeTab === 'enzyme'
                    ? 'Saturation Velocity v₀ vs [S]'
                    : 'Sequential Species Evolution'}
                </span>
              </div>

              {activeTab === 'rate_laws' && (
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <button
                    onClick={() => setPlotMode('conc_vs_t')}
                    className={`px-2 py-1 rounded text-[11px] ${
                      plotMode === 'conc_vs_t' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    [A] vs t
                  </button>
                  <button
                    onClick={() => setPlotMode('linearized')}
                    className={`px-2 py-1 rounded text-[11px] ${
                      plotMode === 'linearized' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Linearized
                  </button>
                </div>
              )}
            </div>

            {/* SVG Canvas */}
            <div className="relative w-full h-64 bg-stone-950 rounded-lg border border-stone-800 p-2 overflow-hidden flex flex-col justify-end">
              {activeTab === 'rate_laws' && rateLawResult && (
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200" preserveAspectRatio="none">
                  {/* Grid */}
                  <line x1="0" y1="50" x2="400" y2="50" stroke="#333" strokeDasharray="3 3" />
                  <line x1="0" y1="100" x2="400" y2="100" stroke="#333" strokeDasharray="3 3" />
                  <line x1="0" y1="150" x2="400" y2="150" stroke="#333" strokeDasharray="3 3" />

                  {/* Curve */}
                  {(() => {
                    const series = rateLawResult.time_series;
                    const maxVal = plotMode === 'conc_vs_t' ? initialConcM : series[0].inv_conc || 5.0;
                    const pts = series
                      .map((p, i) => {
                        const x = (i / (series.length - 1)) * 400;
                        const yVal =
                          plotMode === 'conc_vs_t'
                            ? p.concentration_m
                            : order === 1
                            ? Math.abs(p.ln_conc || 0)
                            : p.inv_conc || 0;
                        const y = Math.max(10, Math.min(190, 190 - (yVal / (maxVal * 1.1)) * 170));
                        return `${x.toFixed(1)},${y.toFixed(1)}`;
                      })
                      .join(' ');

                    return (
                      <>
                        <polyline points={pts} fill="none" stroke="#F59E0B" strokeWidth="2.5" />
                        {/* Half-life dot */}
                        {rateLawResult.half_life_seconds <= totalTimeSeconds && (
                          <circle
                            cx={((rateLawResult.half_life_seconds / totalTimeSeconds) * 400).toFixed(1)}
                            cy="105"
                            r="4"
                            fill="#10B981"
                          />
                        )}
                      </>
                    );
                  })()}
                </svg>
              )}

              {activeTab === 'consecutive' && consecutiveResult && (
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200" preserveAspectRatio="none">
                  {/* Grid */}
                  <line x1="0" y1="100" x2="400" y2="100" stroke="#333" strokeDasharray="3 3" />

                  {/* Species A (amber), Intermediate B (cyan), Product C (emerald) */}
                  {(() => {
                    const s = consecutiveResult.time_series;
                    const aPts = s.map((p, i) => `${(i / (s.length - 1)) * 400},${190 - (p.conc_a / initialConcM) * 170}`).join(' ');
                    const bPts = s.map((p, i) => `${(i / (s.length - 1)) * 400},${190 - (p.conc_b / initialConcM) * 170}`).join(' ');
                    const cPts = s.map((p, i) => `${(i / (s.length - 1)) * 400},${190 - (p.conc_c / initialConcM) * 170}`).join(' ');

                    return (
                      <>
                        <polyline points={aPts} fill="none" stroke="#F59E0B" strokeWidth="2" />
                        <polyline points={bPts} fill="none" stroke="#06B6D4" strokeWidth="2.5" />
                        <polyline points={cPts} fill="none" stroke="#10B981" strokeWidth="2" />
                      </>
                    );
                  })()}
                </svg>
              )}

              {activeTab === 'enzyme' && enzymeResult && (
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200" preserveAspectRatio="none">
                  <line x1="0" y1="50" x2="400" y2="50" stroke="#333" strokeDasharray="3 3" />
                  <line x1="0" y1="100" x2="400" y2="100" stroke="#333" strokeDasharray="3 3" />

                  {(() => {
                    const s = enzymeResult.saturation_points;
                    const maxV = enzymeResult.v_max * 1.1;
                    const pts = s.map((p, i) => `${(i / (s.length - 1)) * 400},${190 - (p.velocity_um_s / maxV) * 170}`).join(' ');
                    return <polyline points={pts} fill="none" stroke="#10B981" strokeWidth="2.5" />;
                  })()}
                </svg>
              )}

              {activeTab === 'arrhenius' && arrheniusResult && (
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200" preserveAspectRatio="none">
                  {(() => {
                    const c = arrheniusResult.temp_curve;
                    const maxK = c[c.length - 1].rate_constant_k;
                    const pts = c.map((p, i) => `${(i / (c.length - 1)) * 400},${190 - (p.rate_constant_k / (maxK || 1)) * 170}`).join(' ');
                    return <polyline points={pts} fill="none" stroke="#EF4444" strokeWidth="2.5" />;
                  })()}
                </svg>
              )}
            </div>

            {/* Legend */}
            <div className="mt-3 flex items-center justify-between text-xs text-stone-400 font-mono">
              {activeTab === 'consecutive' ? (
                <div className="flex gap-4">
                  <span className="flex items-center gap-1 text-amber-400">
                    <span className="w-2 h-2 rounded-full bg-amber-400" /> Reactant [A]
                  </span>
                  <span className="flex items-center gap-1 text-cyan-400">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" /> Intermediate [B]
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" /> Product [C]
                  </span>
                </div>
              ) : (
                <span>Analytical simulation points generated across continuous temporal domain</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
