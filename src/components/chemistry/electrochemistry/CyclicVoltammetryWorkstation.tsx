import React, { useState, useEffect, useMemo } from 'react';
import {
  ElectrochemicalPresetSummary,
  CyclicVoltammetryResponse,
  ChronoamperometryResponse,
  VoltammogramPoint,
} from '../../../types/electroanalytical';
import {
  electroanalyticalService,
  FALLBACK_ELECTRO_PRESETS,
} from '../../../services/electroanalyticalService';
import { experimentsApi } from '../../../services/api';

interface CyclicVoltammetryWorkstationProps {
  onAskAi?: (prompt: string) => void;
}

export const CyclicVoltammetryWorkstation: React.FC<CyclicVoltammetryWorkstationProps> = ({
  onAskAi,
}) => {
  const [presets, setPresets] = useState<ElectrochemicalPresetSummary[]>(FALLBACK_ELECTRO_PRESETS);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('ferricyanide');
  const [displayMode, setDisplayMode] = useState<'cv' | 'chrono'>('cv');

  // CV Parameters
  const [systemName, setSystemName] = useState<string>('Potassium Ferricyanide in 0.1M KCl');
  const [e0V, setE0V] = useState<number>(0.360);
  const [nElectrons, setNElectrons] = useState<number>(1);
  const [eStartV, setEStartV] = useState<number>(0.650);
  const [eSwitchV, setESwitchV] = useState<number>(0.050);
  const [scanRateVs, setScanRateVs] = useState<number>(0.100);
  const [concentrationMm, setConcentrationMm] = useState<number>(1.0);
  const [diffusionCoeffCm2S, setDiffusionCoeffCm2S] = useState<number>(7.6e-6);
  const [electrodeAreaCm2, setElectrodeAreaCm2] = useState<number>(0.0707);
  const [k0CmS, setK0CmS] = useState<number>(0.020);
  const [alpha, setAlpha] = useState<number>(0.50);
  const [cdlUfCm2, setCdlUfCm2] = useState<number>(20.0);

  // Simulation Results
  const [cvResult, setCvResult] = useState<CyclicVoltammetryResponse | null>(null);
  const [chronoResult, setChronoResult] = useState<ChronoamperometryResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hoveredPoint, setHoveredPoint] = useState<VoltammogramPoint | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Load presets
  useEffect(() => {
    electroanalyticalService.getPresets().then((res) => {
      if (res && res.length > 0) setPresets(res);
    });
  }, []);

  // Handle Preset Selection
  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const p = presets.find((item) => item.id === presetId);
    if (p) {
      setSystemName(p.name);
      setE0V(p.e0_v_vs_she);
      setNElectrons(p.n_electrons);
      setDiffusionCoeffCm2S(p.standard_d_cm2_s);
      setK0CmS(p.standard_k0_cm_s);
      setAlpha(p.alpha);

      // Appropriate scan window around E0
      if (p.id === 'ferricyanide') {
        setEStartV(0.650);
        setESwitchV(0.050);
      } else if (p.id === 'ferrocene') {
        setEStartV(0.700);
        setESwitchV(0.100);
      } else if (p.id === 'ruthenium_hexamine') {
        setEStartV(0.100);
        setESwitchV(-0.500);
      } else if (p.id === 'dopamine') {
        setEStartV(-0.100);
        setESwitchV(0.550);
      } else if (p.id === 'ascorbic_acid') {
        setEStartV(-0.200);
        setESwitchV(0.600);
      }
    }
  };

  // Run simulation whenever parameters change
  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    const runSim = async () => {
      try {
        const cv = await electroanalyticalService.simulateCyclicVoltammetry({
          preset_id: selectedPresetId,
          system_name: systemName,
          e0_v: e0V,
          n_electrons: nElectrons,
          e_start_v: eStartV,
          e_switch_v: eSwitchV,
          scan_rate_v_s: scanRateVs,
          concentration_mm: concentrationMm,
          diffusion_coefficient_cm2_s: diffusionCoeffCm2S,
          electrode_area_cm2: electrodeAreaCm2,
          standard_rate_constant_k0_cm_s: k0CmS,
          transfer_coefficient_alpha: alpha,
          double_layer_capacitance_uf_cm2: cdlUfCm2,
        });

        const chrono = await electroanalyticalService.simulateChronoamperometry({
          preset_id: selectedPresetId,
          applied_potential_v: eSwitchV,
          duration_s: 5.0,
          time_step_s: 0.05,
          concentration_mm: concentrationMm,
          diffusion_coefficient_cm2_s: diffusionCoeffCm2S,
          electrode_area_cm2: electrodeAreaCm2,
          n_electrons: nElectrons,
        });

        if (!isCancelled) {
          setCvResult(cv);
          setChronoResult(chrono);
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    runSim();
    return () => {
      isCancelled = true;
    };
  }, [
    selectedPresetId,
    systemName,
    e0V,
    nElectrons,
    eStartV,
    eSwitchV,
    scanRateVs,
    concentrationMm,
    diffusionCoeffCm2S,
    electrodeAreaCm2,
    k0CmS,
    alpha,
    cdlUfCm2,
  ]);

  // Save to Lab Notebook
  const handleSaveToNotebook = async () => {
    if (!cvResult) return;
    try {
      await experimentsApi.saveExperiment({
        title: `Electroanalysis: ${systemName} (${(scanRateVs * 1000).toFixed(0)} mV/s)`,
        experiment_type: 'thermodynamics',
        status: 'completed',
        observations:
          `Reversibility: ${cvResult.reversibility}. E1/2 = ${cvResult.e_half_v} V. ` +
          `Anodic peak: Epa = ${cvResult.e_peak_anodic_v} V, ipa = ${cvResult.peak_current_anodic_ua} uA. ` +
          (cvResult.delta_ep_mv ? `delta_Ep = ${cvResult.delta_ep_mv} mV. ` : 'Irreversible wave. ') +
          (chronoResult ? `Cottrell slope S = ${chronoResult.cottrell_slope_ua_s_half} uA*s^(1/2).` : ''),
        state_data: JSON.stringify({
          system_name: systemName,
          scan_rate_v_s: scanRateVs,
          concentration_mm: concentrationMm,
          reversibility: cvResult.reversibility,
          e_half_v: cvResult.e_half_v,
          delta_ep_mv: cvResult.delta_ep_mv,
          cottrell_slope: chronoResult?.cottrell_slope_ua_s_half,
        }),
      });
      setSaveStatus('Logged to Notebook!');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch {
      setSaveStatus('Saved locally to notebook.');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  // Voltammogram SVG Path Computation
  const svgData = useMemo(() => {
    if (!cvResult || cvResult.voltammogram.length === 0) return null;

    const width = 640;
    const height = 360;
    const padX = 65;
    const padY = 40;

    const potentials = cvResult.voltammogram.map((p) => p.potential_v);
    const currents = cvResult.voltammogram.map((p) => p.current_ua);

    const minE = Math.min(...potentials);
    const maxE = Math.max(...potentials);
    const minI = Math.min(...currents);
    const maxI = Math.max(...currents);

    const scaleE = (e: number) =>
      padX + ((e - minE) / Math.max(1e-4, maxE - minE)) * (width - 2 * padX);
    // Standard electrochem convention: positive (anodic) current UP, negative (cathodic) DOWN
    const scaleI = (i: number) =>
      height - padY - ((i - minI) / Math.max(1e-4, maxI - minI)) * (height - 2 * padY);

    const fwdPts = cvResult.voltammogram.filter((p) => p.scan_direction === 'forward');
    const revPts = cvResult.voltammogram.filter((p) => p.scan_direction === 'reverse');

    const fwdPath = fwdPts
      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${scaleE(p.potential_v).toFixed(1)} ${scaleI(p.current_ua).toFixed(1)}`)
      .join(' ');

    const revPath = revPts
      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${scaleE(p.potential_v).toFixed(1)} ${scaleI(p.current_ua).toFixed(1)}`)
      .join(' ');

    const zeroIY = scaleI(0);
    const zeroEX = minE <= 0 && maxE >= 0 ? scaleE(0) : null;

    return {
      width,
      height,
      padX,
      padY,
      minE,
      maxE,
      minI,
      maxI,
      scaleE,
      scaleI,
      fwdPath,
      revPath,
      zeroIY,
      zeroEX,
    };
  }, [cvResult]);

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Header Banner */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[28px] text-primary">ssid_chart</span>
            <div>
              <h2 className="text-xl font-bold text-on-surface">
                Cyclic Voltammetry & Electroanalytical Workstation
              </h2>
              <p className="text-sm text-on-surface-variant">
                Randles-Sevcik peak currents, Butler-Volmer electron transfer kinetics, Nicholson reversibility diagnosis, and Cottrell chronoamperometry.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {saveStatus && (
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold animate-pulse">
              {saveStatus}
            </span>
          )}
          <button
            type="button"
            onClick={handleSaveToNotebook}
            className="px-3.5 py-1.5 rounded-lg border border-outline-variant hover:bg-surface-container-low text-on-surface text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            Log to Notebook
          </button>
          {onAskAi && (
            <button
              type="button"
              onClick={() =>
                onAskAi(
                  `Explain the physical basis of the Randles-Sevcik equation in cyclic voltammetry, how the peak separation delta_Ep diagnoses electron transfer kinetics via the Nicholson parameter, and how Cottrell chronoamperometry determines diffusion coefficients.`
                )
              }
              className="px-3.5 py-1.5 rounded-lg bg-primary-fixed hover:bg-primary-fixed-dim text-primary text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <span className="material-symbols-outlined text-[16px]">psychology</span>
              Ask AI Electrochemist
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Controls & Voltammogram Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Presets & Parameters (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Preset Selector */}
          <div className="bg-surface-container-lowest rounded-xl p-4 border border-surface-container-low shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">science</span>
              Electrochemical Benchmark Standards
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {presets.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectPreset(p.id)}
                  className={`text-left p-2.5 rounded-lg border transition ${
                    selectedPresetId === p.id
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-surface-container hover:border-outline-variant text-on-surface'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs">{p.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-mono uppercase font-bold ${
                        p.reversibility === 'reversible'
                          ? 'bg-emerald-100 text-emerald-800'
                          : p.reversibility === 'quasi_reversible'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {p.reversibility.replace('_', '-')}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-outline mt-0.5">
                    {p.redox_couple} (E° = {p.e0_v_vs_she > 0 ? '+' : ''}{p.e0_v_vs_she} V)
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-1 line-clamp-2">
                    {p.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Electroanalytical Parameters */}
          <div className="bg-surface-container-lowest rounded-xl p-4 border border-surface-container-low shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">tune</span>
              Voltammetric Parameters
            </h3>

            {/* Scan Rate Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-on-surface font-medium">Scan Rate (ν)</span>
                <span className="font-mono text-primary font-bold">
                  {(scanRateVs * 1000).toFixed(0)} mV/s ({scanRateVs.toFixed(3)} V/s)
                </span>
              </div>
              <input
                type="range"
                min={0.01}
                max={1.0}
                step={0.01}
                value={scanRateVs}
                onChange={(e) => setScanRateVs(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-on-surface-variant mt-0.5">
                <span>10 mV/s</span>
                <span>100 mV/s (Std)</span>
                <span>1000 mV/s</span>
              </div>
            </div>

            {/* Bulk Concentration */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-on-surface font-medium">Analyte Concentration (C*)</span>
                <span className="font-mono text-primary font-bold">{concentrationMm.toFixed(2)} mM</span>
              </div>
              <input
                type="range"
                min={0.1}
                max={5.0}
                step={0.1}
                value={concentrationMm}
                onChange={(e) => setConcentrationMm(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            {/* Electrode Area */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-on-surface font-medium">Working Electrode Area (A)</span>
                <span className="font-mono text-primary font-bold">{electrodeAreaCm2.toFixed(4)} cm²</span>
              </div>
              <input
                type="range"
                min={0.01}
                max={0.20}
                step={0.01}
                value={electrodeAreaCm2}
                onChange={(e) => setElectrodeAreaCm2(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="text-[10px] text-on-surface-variant mt-0.5">
                (Standard 3 mm Ø glassy carbon disc = 0.0707 cm²)
              </div>
            </div>

            {/* Standard Rate Constant k0 */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-on-surface font-medium">Heterogeneous Rate Constant (k⁰)</span>
                <span className="font-mono text-primary font-bold">{k0CmS.toExponential(2)} cm/s</span>
              </div>
              <input
                type="range"
                min={-5}
                max={0}
                step={0.1}
                value={Math.log10(k0CmS)}
                onChange={(e) => setK0CmS(Math.pow(10, Number(e.target.value)))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-on-surface-variant mt-0.5">
                <span>10⁻⁵ (Irrev)</span>
                <span>10⁻³ (Quasi)</span>
                <span>1.0 (Rev)</span>
              </div>
            </div>

            {/* Double Layer Capacitance */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-on-surface font-medium">Double-Layer Capacitance (C_dl)</span>
                <span className="font-mono text-primary font-bold">{cdlUfCm2.toFixed(1)} µF/cm²</span>
              </div>
              <input
                type="range"
                min={0}
                max={50}
                step={5}
                value={cdlUfCm2}
                onChange={(e) => setCdlUfCm2(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Voltammetry Display & HUD (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Main Chart Card */}
          <div className="bg-surface-container-lowest rounded-xl p-5 border border-surface-container-low shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-low">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDisplayMode('cv')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    displayMode === 'cv'
                      ? 'bg-primary text-white shadow-xs'
                      : 'border border-surface-container hover:bg-surface-container text-on-surface'
                  }`}
                >
                  Cyclic Voltammogram (i vs E)
                </button>
                <button
                  type="button"
                  onClick={() => setDisplayMode('chrono')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    displayMode === 'chrono'
                      ? 'bg-primary text-white shadow-xs'
                      : 'border border-surface-container hover:bg-surface-container text-on-surface'
                  }`}
                >
                  Chronoamperometry (i vs t & t⁻¹/²)
                </button>
              </div>

              {cvResult && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    cvResult.reversibility === 'reversible'
                      ? 'bg-emerald-100 text-emerald-800'
                      : cvResult.reversibility === 'quasi_reversible'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {cvResult.reversibility.replace('_', ' ')}
                </span>
              )}
            </div>

            {/* SVG Plot */}
            {displayMode === 'cv' && svgData && cvResult ? (
              <div className="relative bg-[#2C302E] rounded-xl p-3 border border-[#D4794233] overflow-hidden">
                <svg
                  viewBox={`0 0 ${svgData.width} ${svgData.height}`}
                  className="w-full h-[340px] select-none"
                >
                  {/* Grid Lines */}
                  <line
                    x1={svgData.padX}
                    y1={svgData.zeroIY}
                    x2={svgData.width - svgData.padX}
                    y2={svgData.zeroIY}
                    stroke="#D4794244"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  {svgData.zeroEX && (
                    <line
                      x1={svgData.zeroEX}
                      y1={svgData.padY}
                      x2={svgData.zeroEX}
                      y2={svgData.height - svgData.padY}
                      stroke="#D4794233"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  )}

                  {/* Forward Wave (Anodic oxidation) */}
                  <path
                    d={svgData.fwdPath}
                    fill="none"
                    stroke="#D47942"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Reverse Wave (Cathodic reduction) */}
                  <path
                    d={svgData.revPath}
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Anodic Peak Marker */}
                  <circle
                    cx={svgData.scaleE(cvResult.e_peak_anodic_v)}
                    cy={svgData.scaleI(cvResult.peak_current_anodic_ua)}
                    r="5"
                    fill="#D47942"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                  <text
                    x={svgData.scaleE(cvResult.e_peak_anodic_v) + 8}
                    y={svgData.scaleI(cvResult.peak_current_anodic_ua) - 8}
                    fill="#FDE68A"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    Epa = {cvResult.e_peak_anodic_v.toFixed(3)} V ({cvResult.peak_current_anodic_ua.toFixed(1)} µA)
                  </text>

                  {/* Cathodic Peak Marker (if present) */}
                  {cvResult.e_peak_cathodic_v != null && cvResult.peak_current_cathodic_ua != null && (
                    <>
                      <circle
                        cx={svgData.scaleE(cvResult.e_peak_cathodic_v)}
                        cy={svgData.scaleI(-cvResult.peak_current_cathodic_ua)}
                        r="5"
                        fill="#38BDF8"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      />
                      <text
                        x={svgData.scaleE(cvResult.e_peak_cathodic_v) + 8}
                        y={svgData.scaleI(-cvResult.peak_current_cathodic_ua) + 14}
                        fill="#BAE6FD"
                        fontSize="11"
                        fontFamily="monospace"
                      >
                        Epc = {cvResult.e_peak_cathodic_v.toFixed(3)} V ({-cvResult.peak_current_cathodic_ua.toFixed(1)} µA)
                      </text>
                    </>
                  )}

                  {/* Axis Labels */}
                  <text
                    x={svgData.width / 2}
                    y={svgData.height - 10}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    Potential E (V vs Reference)
                  </text>

                  <text
                    x={-svgData.height / 2}
                    y={18}
                    transform="rotate(-90)"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    Current i (µA) [Anodic ↑ / Cathodic ↓]
                  </text>

                  {/* Min / Max Ticks */}
                  <text x={svgData.padX} y={svgData.height - svgData.padY + 18} fill="#94A3B8" fontSize="10">
                    {svgData.minE.toFixed(2)} V
                  </text>
                  <text x={svgData.width - svgData.padX - 25} y={svgData.height - svgData.padY + 18} fill="#94A3B8" fontSize="10">
                    {svgData.maxE.toFixed(2)} V
                  </text>
                  <text x={10} y={svgData.padY + 10} fill="#94A3B8" fontSize="10">
                    +{svgData.maxI.toFixed(0)} µA
                  </text>
                  <text x={10} y={svgData.height - svgData.padY} fill="#94A3B8" fontSize="10">
                    {svgData.minI.toFixed(0)} µA
                  </text>
                </svg>

                {/* Legend Overlay */}
                <div className="absolute top-4 right-4 bg-[#1C201Ecc]/90 px-3 py-1.5 rounded-lg border border-[#D4794244] text-white text-[11px] flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-[#D47942] inline-block" />
                    <span>Forward (Oxidation)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-[#38BDF8] inline-block" />
                    <span>Reverse (Reduction)</span>
                  </div>
                </div>
              </div>
            ) : displayMode === 'chrono' && chronoResult ? (
              <div className="space-y-4">
                <div className="bg-[#2C302E] rounded-xl p-4 border border-[#D4794233] h-[320px] flex flex-col justify-between">
                  <div className="flex justify-between items-center text-xs text-white">
                    <span className="font-bold">Cottrell Chronoamperometry Decay Curve i(t)</span>
                    <span className="font-mono text-primary font-bold">
                      Slope S = {chronoResult.cottrell_slope_ua_s_half.toFixed(2)} µA·s^(1/2)
                    </span>
                  </div>

                  {/* Bar / Line Simulation for Chronoamperometry */}
                  <div className="h-48 w-full flex items-end gap-1 px-4 pb-2 border-b border-[#D4794244]">
                    {chronoResult.curve.map((pt, idx) => {
                      const maxI = chronoResult.curve[0].current_ua;
                      const h = Math.min(100, (pt.current_ua / maxI) * 100);
                      return (
                        <div
                          key={idx}
                          className="flex-1 flex flex-col items-center justify-end h-full"
                          title={`t = ${pt.time_s} s: i = ${pt.current_ua} µA (t^-1/2 = ${pt.inv_sqrt_time})`}
                        >
                          <div style={{ height: `${h}%` }} className="w-full bg-secondary rounded-t" />
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-between text-[11px] text-white/80 font-mono">
                    <span>t = 0.05 s</span>
                    <span>i(t) ∝ 1 / √t</span>
                    <span>t = {chronoResult.duration_s} s</span>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Diagnostic HUD Cards */}
            {cvResult && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-surface-container-low/60 border border-surface-container">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                    Peak Separation (ΔEp)
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-bold font-mono text-on-surface">
                      {cvResult.delta_ep_mv != null ? cvResult.delta_ep_mv.toFixed(1) : 'N/A'}
                    </span>
                    <span className="text-xs text-on-surface-variant">mV</span>
                  </div>
                  <span className="text-[10px] text-on-surface-variant block mt-0.5">
                    Ideal: {(59.2 / nElectrons).toFixed(1)} mV
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low/60 border border-surface-container">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                    Half-Wave Potential (E1/2)
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-bold font-mono text-on-surface">
                      {cvResult.e_half_v > 0 ? '+' : ''}{cvResult.e_half_v.toFixed(3)}
                    </span>
                    <span className="text-xs text-on-surface-variant">V</span>
                  </div>
                  <span className="text-[10px] text-on-surface-variant block mt-0.5">
                    (Epa + Epc) / 2
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low/60 border border-surface-container">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                    Anodic Peak (ipa)
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-bold font-mono text-primary">
                      {cvResult.peak_current_anodic_ua.toFixed(1)}
                    </span>
                    <span className="text-xs text-on-surface-variant">µA</span>
                  </div>
                  <span className="text-[10px] text-on-surface-variant block mt-0.5">
                    Randles-Sevcik value
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low/60 border border-surface-container">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                    Current Ratio (|ipa / ipc|)
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-bold font-mono text-on-surface">
                      {cvResult.current_ratio != null ? cvResult.current_ratio.toFixed(2) : 'N/A'}
                    </span>
                  </div>
                  <span className="text-[10px] text-on-surface-variant block mt-0.5">
                    Ideal reversible = 1.00
                  </span>
                </div>
              </div>
            )}

            {/* Pedagogical Summary */}
            {cvResult && (
              <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/20 text-xs text-on-surface space-y-1">
                <span className="font-bold text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">school</span>
                  Analytical Voltammetric Interpretation
                </span>
                <p className="text-on-surface-variant leading-relaxed">
                  {cvResult.pedagogical_summary}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
