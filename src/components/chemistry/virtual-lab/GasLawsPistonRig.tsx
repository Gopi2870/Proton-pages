import React, { useState, useEffect, useMemo } from 'react';
import {
  Wind,
  Thermometer,
  Gauge,
  Sliders,
  TrendingDown,
  Layers,
  Save,
  CheckCircle2,
  RefreshCw,
  Info,
  Maximize2
} from 'lucide-react';
import {
  GasLawsService,
  FALLBACK_GAS_CONSTANTS
} from '../../../services/gasLawsService';
import {
  RealGasConstants,
  IdealGasResult,
  VanDerWaalsResult,
  MaxwellBoltzmannResult
} from '../../../types/gasLaws';
import { experimentsApi } from '../../../services/api';

export const GasLawsPistonRig: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'piston' | 'isotherm' | 'maxwell'>('piston');
  const [constants, setConstants] = useState<RealGasConstants[]>(FALLBACK_GAS_CONSTANTS);
  const [selectedGasId, setSelectedGasId] = useState<string>('co2');

  // Parameters
  const [moles, setMoles] = useState<number>(1.0);
  const [volumeLiters, setVolumeLiters] = useState<number>(2.0);
  const [temperatureK, setTemperatureK] = useState<number>(298.15);
  const [useVdw, setUseVdw] = useState<boolean>(true);

  // Results
  const [vdwResult, setVdwResult] = useState<VanDerWaalsResult | null>(null);
  const [idealResult, setIdealResult] = useState<IdealGasResult | null>(null);
  const [mbResult, setMbResult] = useState<MaxwellBoltzmannResult | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Load constants
  useEffect(() => {
    GasLawsService.getConstants().then((data) => setConstants(data));
  }, []);

  // Compute Ideal & VdW states
  useEffect(() => {
    GasLawsService.calculateIdealGas(undefined, volumeLiters, moles, temperatureK).then((res) =>
      setIdealResult(res)
    );

    GasLawsService.simulateVanDerWaals(selectedGasId, moles, temperatureK, volumeLiters).then((res) =>
      setVdwResult(res)
    );

    const gas = constants.find((g) => g.id === selectedGasId) || constants[0];
    GasLawsService.calculateMaxwellBoltzmann(gas.name, gas.molar_mass_g_mol, temperatureK).then((res) =>
      setMbResult(res)
    );
  }, [selectedGasId, moles, volumeLiters, temperatureK, constants]);

  // Active gas object
  const currentGas = useMemo(() => {
    return constants.find((g) => g.id === selectedGasId) || constants[0];
  }, [constants, selectedGasId]);

  // Current displayed pressure
  const currentPressure = useMemo(() => {
    if (useVdw && vdwResult) return vdwResult.p_vdw_atm;
    if (idealResult) return idealResult.pressure_atm;
    return 1.0;
  }, [useVdw, vdwResult, idealResult]);

  // Save to lab notebook
  const handleSaveToNotebook = async () => {
    if (!vdwResult || !idealResult) return;
    setSaveStatus('saving');
    try {
      await experimentsApi.saveExperiment({
        title: `Gas Laws & Thermodynamics: ${currentGas.name} (${moles} mol at ${temperatureK} K)`,
        experiment_type: 'gas_laws_thermodynamics',
        status: 'completed',
        state_data: JSON.stringify({
          gas_id: selectedGasId,
          moles,
          volume_liters: volumeLiters,
          temperature_k: temperatureK,
          pressure_ideal: idealResult.pressure_atm,
          pressure_vdw: vdwResult.p_vdw_atm,
          compressibility_z: vdwResult.compressibility_z,
        }),
        observations: `Simulated ${currentGas.name} in piston chamber. Volume = ${volumeLiters} L, T = ${temperatureK} K. Ideal pressure: ${idealResult.pressure_atm.toFixed(3)} atm; Van der Waals pressure: ${vdwResult.p_vdw_atm.toFixed(3)} atm. Compressibility Z = ${vdwResult.compressibility_z.toFixed(4)} (${vdwResult.regime}).`,
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
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Wind className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-stone-100 font-serif">
                Workstation #4: Gas Laws & Piston Chamber
              </h2>
              <span className="px-2 py-0.5 rounded text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                PV = nRT & Van der Waals
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Real gas compressibility Z, kinetic molecular speeds, and isothermal compression
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-stone-900/60 p-1 rounded-lg border border-stone-800 text-xs">
          <button
            onClick={() => setActiveTab('piston')}
            className={`px-3 py-1.5 rounded font-medium transition-colors ${
              activeTab === 'piston' ? 'bg-cyan-600 text-white' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Piston Chamber
          </button>
          <button
            onClick={() => setActiveTab('isotherm')}
            className={`px-3 py-1.5 rounded font-medium transition-colors ${
              activeTab === 'isotherm' ? 'bg-cyan-600 text-white' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            P-V Isotherm
          </button>
          <button
            onClick={() => setActiveTab('maxwell')}
            className={`px-3 py-1.5 rounded font-medium transition-colors ${
              activeTab === 'maxwell' ? 'bg-cyan-600 text-white' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Maxwell-Boltzmann
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Control Panel (4 cols) */}
        <div className="lg:col-span-4 p-5 border-b lg:border-b-0 lg:border-r border-stone-800 bg-[#1F2220] flex flex-col gap-5">
          {/* Gas Selector */}
          <div>
            <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2 block flex items-center justify-between">
              <span>Working Gas Substance</span>
              <span className="text-[10px] text-cyan-400 font-mono">vdW Parameters</span>
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {constants.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGasId(g.id)}
                  className={`p-2 rounded-lg border text-left text-xs transition-all ${
                    selectedGasId === g.id
                      ? 'bg-stone-800 border-cyan-500/60 text-white shadow-md'
                      : 'bg-stone-900/40 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="font-semibold text-stone-200">{g.name}</div>
                  <div className="text-[10px] text-stone-400 font-mono flex justify-between">
                    <span>{g.formula}</span>
                    <span className="text-cyan-400">{g.molar_mass_g_mol.toFixed(1)} g/mol</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Model Toggle: Ideal vs Van der Waals */}
          <div className="bg-stone-900/50 p-3.5 rounded-lg border border-stone-800">
            <span className="text-xs font-medium text-stone-300 block mb-2">Equation of State Model</span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                onClick={() => setUseVdw(false)}
                className={`py-1.5 rounded border transition-colors ${
                  !useVdw
                    ? 'bg-amber-600/30 border-amber-500 text-amber-300'
                    : 'bg-stone-800/40 border-stone-700 text-stone-400 hover:text-stone-200'
                }`}
              >
                Ideal Gas (PV=nRT)
              </button>
              <button
                onClick={() => setUseVdw(true)}
                className={`py-1.5 rounded border transition-colors ${
                  useVdw
                    ? 'bg-cyan-600/30 border-cyan-500 text-cyan-300'
                    : 'bg-stone-800/40 border-stone-700 text-stone-400 hover:text-stone-200'
                }`}
              >
                Van der Waals (Real)
              </button>
            </div>
          </div>

          {/* Sliders */}
          <div className="bg-stone-900/50 p-3.5 rounded-lg border border-stone-800 space-y-3 text-xs">
            {/* Volume */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-stone-300">Cylinder Volume (V)</span>
                <span className="font-mono text-cyan-400 font-semibold">{volumeLiters.toFixed(2)} L</span>
              </div>
              <input
                type="range"
                min={0.3}
                max={6.0}
                step={0.1}
                value={volumeLiters}
                onChange={(e) => setVolumeLiters(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-stone-700 rounded-lg accent-cyan-500"
              />
            </div>

            {/* Temperature */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-stone-300">Thermal Temperature (T)</span>
                <span className="font-mono text-cyan-400 font-semibold">
                  {temperatureK.toFixed(1)} K ({(temperatureK - 273.15).toFixed(1)}°C)
                </span>
              </div>
              <input
                type="range"
                min={180}
                max={550}
                step={5}
                value={temperatureK}
                onChange={(e) => setTemperatureK(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-stone-700 rounded-lg accent-cyan-500"
              />
            </div>

            {/* Moles */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-stone-300">Gas Substance (n)</span>
                <span className="font-mono text-cyan-400 font-semibold">{moles.toFixed(2)} moles</span>
              </div>
              <input
                type="range"
                min={0.2}
                max={3.0}
                step={0.1}
                value={moles}
                onChange={(e) => setMoles(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-stone-700 rounded-lg accent-cyan-500"
              />
            </div>
          </div>

          {/* Digital Telemetry Gauge Box */}
          <div className="bg-gradient-to-br from-stone-900 to-black p-4 rounded-xl border border-stone-800 shadow-inner">
            <div className="text-[10px] uppercase font-mono text-stone-400 tracking-wider mb-2 flex items-center justify-between">
              <span>Thermodynamic State</span>
              <span className="text-cyan-400 flex items-center gap-1 font-mono text-[11px]">
                {useVdw ? 'Van der Waals' : 'Ideal Gas'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-stone-800/40 p-2.5 rounded-lg border border-stone-700/40">
                <div className="text-[10px] text-stone-400">Total Pressure (P)</div>
                <div className="text-xl font-bold font-mono text-cyan-300">
                  {currentPressure.toFixed(3)} atm
                </div>
                <div className="text-[9px] text-stone-400 font-mono mt-0.5">
                  {(currentPressure * 101.325).toFixed(1)} kPa
                </div>
              </div>

              <div className="bg-stone-800/40 p-2.5 rounded-lg border border-stone-700/40">
                <div className="text-[10px] text-stone-400">Compressibility (Z)</div>
                <div
                  className={`text-xl font-bold font-mono ${
                    vdwResult && vdwResult.compressibility_z < 0.98
                      ? 'text-amber-400'
                      : vdwResult && vdwResult.compressibility_z > 1.02
                      ? 'text-purple-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {vdwResult ? vdwResult.compressibility_z.toFixed(4) : '1.0000'}
                </div>
                <div className="text-[9px] text-stone-400 font-mono mt-0.5">Z = PV / nRT</div>
              </div>
            </div>

            {vdwResult && (
              <div className="mt-3 pt-2.5 border-t border-stone-800/60 text-[11px] font-mono text-stone-400">
                <div>Deviation from Ideal: <span className="text-white font-semibold">{vdwResult.deviation_percent.toFixed(2)}%</span></div>
                <div className="text-[10px] text-stone-400 mt-0.5">{vdwResult.regime}</div>
              </div>
            )}
          </div>

          {/* Lab Notebook Action */}
          <button
            onClick={handleSaveToNotebook}
            disabled={saveStatus === 'saving'}
            className={`w-full py-2.5 px-4 rounded-lg font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
              saveStatus === 'saved'
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 text-white'
            }`}
          >
            {saveStatus === 'saving' ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Logging Run...
              </>
            ) : saveStatus === 'saved' ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> Gas State Logged!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Gas Run to Notebook
              </>
            )}
          </button>
        </div>

        {/* Right Visualizer (8 cols) */}
        <div className="lg:col-span-8 p-5 flex flex-col gap-5 bg-[#171918]">
          {/* Animated Piston Cylinder Chamber */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-4 shadow-md relative overflow-hidden">
            <div className="text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Interactive Piston Cylinder Viewport</span>
              <span className="text-[11px] font-mono text-cyan-400">
                Piston Height ∝ V ({volumeLiters} L)
              </span>
            </div>

            <div className="h-44 bg-black/70 rounded-lg border border-stone-800 relative flex items-center justify-center p-4">
              {/* Cylinder Outer Walls */}
              <div className="w-48 h-36 border-x-4 border-b-4 border-stone-500 rounded-b-xl relative bg-stone-950/80 overflow-hidden flex flex-col justify-end">
                {/* Gas Molecules Canvas (Simulated with bouncing dots) */}
                <div
                  className="w-full relative transition-all duration-300 bg-gradient-to-t from-cyan-950/50 to-transparent flex items-center justify-center"
                  style={{ height: `${Math.min(100, Math.max(20, (volumeLiters / 6.0) * 100))}%` }}
                >
                  {/* Piston Head */}
                  <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-stone-400 via-stone-200 to-stone-400 border-b border-stone-700 shadow-md flex items-center justify-center">
                    <div className="w-2.5 h-16 bg-stone-300 absolute -top-16 shadow" />
                  </div>

                  {/* Gas particles */}
                  <div className="absolute inset-0 p-2 overflow-hidden flex flex-wrap gap-2 justify-center items-center opacity-80">
                    {Array.from({ length: Math.min(25, Math.round(moles * 8)) }).map((_, i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)] animate-pulse"
                        style={{
                          animationDuration: `${Math.max(0.3, 1200 / temperatureK)}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bunsen Burner Flame below cylinder */}
              <div className="absolute bottom-1 flex flex-col items-center">
                <div
                  className="w-4 h-4 rounded-full bg-orange-500 blur-[2px] animate-ping"
                  style={{ opacity: Math.min(1, Math.max(0.1, (temperatureK - 200) / 300)) }}
                />
              </div>
            </div>
          </div>

          {/* Dynamic SVG Graphs based on Active Tab */}
          <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-4 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-cyan-400" />
                <span>
                  {activeTab === 'piston' || activeTab === 'isotherm'
                    ? `P-V Isotherm Comparison (${currentGas.name} at ${temperatureK} K)`
                    : `Maxwell-Boltzmann Speed Distribution f(v) at ${temperatureK} K`}
                </span>
              </div>
            </div>

            {/* SVG Plot */}
            <div className="relative w-full h-64 bg-stone-950 rounded-lg border border-stone-800 p-2 overflow-hidden flex flex-col justify-end">
              {activeTab !== 'maxwell' && vdwResult && (
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200" preserveAspectRatio="none">
                  {/* Grid */}
                  <line x1="0" y1="50" x2="400" y2="50" stroke="#333" strokeDasharray="3 3" />
                  <line x1="0" y1="100" x2="400" y2="100" stroke="#333" strokeDasharray="3 3" />
                  <line x1="0" y1="150" x2="400" y2="150" stroke="#333" strokeDasharray="3 3" />

                  {/* VdW Curve (cyan) vs Ideal Curve (amber dashed) */}
                  {(() => {
                    const pts = vdwResult.isotherm_points;
                    const maxP = Math.max(50, pts[0].pressure_ideal_atm);
                    const idealStr = pts
                      .map((p, i) => `${(i / (pts.length - 1)) * 400},${190 - (p.pressure_ideal_atm / maxP) * 170}`)
                      .join(' ');
                    const vdwStr = pts
                      .map((p, i) => `${(i / (pts.length - 1)) * 400},${190 - (p.pressure_vdw_atm / maxP) * 170}`)
                      .join(' ');

                    return (
                      <>
                        <polyline points={idealStr} fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 2" />
                        <polyline points={vdwStr} fill="none" stroke="#06B6D4" strokeWidth="2.5" />
                      </>
                    );
                  })()}
                </svg>
              )}

              {activeTab === 'maxwell' && mbResult && (
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200" preserveAspectRatio="none">
                  <line x1="0" y1="100" x2="400" y2="100" stroke="#333" strokeDasharray="3 3" />

                  {(() => {
                    const pts = mbResult.distribution_points;
                    const maxProb = Math.max(...pts.map((p) => p.probability_density));
                    const curveStr = pts
                      .map((p, i) => `${(i / (pts.length - 1)) * 400},${190 - (p.probability_density / (maxProb * 1.15)) * 170}`)
                      .join(' ');

                    return (
                      <>
                        <polyline points={curveStr} fill="none" stroke="#06B6D4" strokeWidth="2.5" />
                        {/* Peak v_mp vertical line */}
                        <line
                          x1={((mbResult.v_mp_m_s / 2000) * 400).toFixed(1)}
                          y1="10"
                          x2={((mbResult.v_mp_m_s / 2000) * 400).toFixed(1)}
                          y2="190"
                          stroke="#F59E0B"
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                        />
                      </>
                    );
                  })()}
                </svg>
              )}
            </div>

            {/* Legend */}
            <div className="mt-3 flex items-center justify-between text-xs text-stone-400 font-mono">
              {activeTab === 'maxwell' && mbResult ? (
                <div className="flex gap-4">
                  <span className="text-amber-400">v_mp (Most Probable): {mbResult.v_mp_m_s} m/s</span>
                  <span className="text-cyan-400">v_avg (Mean): {mbResult.v_avg_m_s} m/s</span>
                  <span className="text-purple-400">v_rms: {mbResult.v_rms_m_s} m/s</span>
                </div>
              ) : (
                <div className="flex gap-4">
                  <span className="text-cyan-400 flex items-center gap-1">
                    <span className="w-2.5 h-0.5 bg-cyan-400" /> Van der Waals Real Gas
                  </span>
                  <span className="text-amber-400 flex items-center gap-1">
                    <span className="w-2.5 h-0.5 bg-amber-400 border-t border-dashed" /> Ideal Gas (PV=nRT)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
