import React, { useState, useEffect, useMemo } from 'react';
import {
  Activity,
  Zap,
  Sliders,
  Save,
  CheckCircle2,
  RefreshCw,
  TrendingUp,
  Info,
  Layers,
  HelpCircle
} from 'lucide-react';
import {
  SpectroscopyService,
  FALLBACK_UV_VIS_STANDARDS
} from '../../../services/spectroscopyService';
import {
  UvVisStandard,
  UvVisSimulationResult,
  CalibrationPoint,
  CalibrationCurveResult
} from '../../../types/spectroscopy';
import { experimentsApi } from '../../../services/api';

export const SpectrophotometerRig: React.FC = () => {
  const [standards, setStandards] = useState<UvVisStandard[]>(FALLBACK_UV_VIS_STANDARDS);
  const [selectedStandardId, setSelectedStandardId] = useState<string>('kmno4');
  const [concentrationM, setConcentrationM] = useState<number>(0.0002);
  const [pathLengthCm, setPathLengthCm] = useState<number>(1.0);
  const [cursorWavelength, setCursorWavelength] = useState<number>(525.0);
  const [activeTab, setActiveTab] = useState<'spectrum' | 'calibration' | 'challenge'>('spectrum');
  const [simulation, setSimulation] = useState<UvVisSimulationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Calibration curve state
  const [calibrationPoints, setCalibrationPoints] = useState<CalibrationPoint[]>([
    { concentration_m: 0.00005, absorbance: 0.119 },
    { concentration_m: 0.00010, absorbance: 0.238 },
    { concentration_m: 0.00015, absorbance: 0.357 },
    { concentration_m: 0.00020, absorbance: 0.476 },
  ]);
  const [unknownAbsorbance, setUnknownAbsorbance] = useState<number>(0.320);
  const [calibrationResult, setCalibrationResult] = useState<CalibrationCurveResult | null>(null);

  // Load standards
  useEffect(() => {
    SpectroscopyService.getStandards().then((data) => {
      setStandards(data);
    });
  }, []);

  // Run simulation
  const runSimulation = async () => {
    setLoading(true);
    try {
      const res = await SpectroscopyService.simulateUvVis(
        selectedStandardId,
        concentrationM,
        pathLengthCm,
        350,
        750,
        2
      );
      setSimulation(res);
      setCursorWavelength(res.lambda_max_nm);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runSimulation();
  }, [selectedStandardId, concentrationM, pathLengthCm]);

  // Compute calibration curve
  const handleComputeCalibration = async () => {
    const standardObj = standards.find((s) => s.id === selectedStandardId);
    const res = await SpectroscopyService.computeCalibrationCurve(
      standardObj?.name || 'Analyte',
      calibrationPoints,
      unknownAbsorbance
    );
    setCalibrationResult(res);
  };

  useEffect(() => {
    if (activeTab === 'calibration') {
      handleComputeCalibration();
    }
  }, [activeTab, calibrationPoints, unknownAbsorbance]);

  // Optical beam color by wavelength
  const beamColor = useMemo(() => {
    const wl = cursorWavelength;
    if (wl < 400) return '#8A2BE2'; // UV / violet
    if (wl < 440) return '#4B0082'; // Indigo
    if (wl < 490) return '#0000FF'; // Blue
    if (wl < 510) return '#00CED1'; // Cyan
    if (wl < 560) return '#00FF00'; // Green
    if (wl < 590) return '#FFFF00'; // Yellow
    if (wl < 640) return '#FFA500'; // Orange
    if (wl <= 750) return '#FF0000'; // Red
    return '#8B0000'; // Near IR
  }, [cursorWavelength]);

  // Current absorbance at cursor wavelength
  const currentCursorPoint = useMemo(() => {
    if (!simulation || !simulation.spectrum_points.length) return null;
    return (
      simulation.spectrum_points.find(
        (p) => Math.abs(p.wavelength_nm - cursorWavelength) < 1.1
      ) || simulation.spectrum_points[0]
    );
  }, [simulation, cursorWavelength]);

  // Save to lab notebook
  const handleSaveToNotebook = async () => {
    if (!simulation) return;
    setSaveStatus('saving');
    try {
      await experimentsApi.saveExperiment({
        title: `UV-Vis Spectrophotometry: ${simulation.analyte_name} (${(simulation.concentration_m * 1000).toFixed(2)} mM)`,
        experiment_type: 'spectroscopy_uv_vis',
        status: 'completed',
        state_data: JSON.stringify({
          analyte_id: simulation.analyte_id,
          concentration_m: simulation.concentration_m,
          path_length_cm: simulation.path_length_cm,
          lambda_max_nm: simulation.lambda_max_nm,
          absorbance_max: simulation.absorbance_at_lambda_max,
        }),
        observations: `Absorbance at λmax (${simulation.lambda_max_nm} nm) measured at ${simulation.absorbance_at_lambda_max.toFixed(4)}. Transmittance: ${simulation.transmittance_at_lambda_max.toFixed(2)}%. Verified Beer-Lambert Law A = εbc with molar absorptivity ε = ${simulation.molar_absorptivity_l_mol_cm} L/(mol·cm).`,
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
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-stone-100 font-serif">
                Workstation #3: UV-Vis Spectrophotometer
              </h2>
              <span className="px-2 py-0.5 rounded text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                Beer-Lambert Law
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Photometric absorbance A = ε·b·c quantification & molecular chromophore profiling
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 bg-stone-900/60 p-1 rounded-lg border border-stone-800">
          <button
            onClick={() => setActiveTab('spectrum')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              activeTab === 'spectrum'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Absorbance Scan
          </button>
          <button
            onClick={() => setActiveTab('calibration')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              activeTab === 'calibration'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Calibration Curve
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Control Panel (4 cols) */}
        <div className="lg:col-span-4 p-5 border-b lg:border-b-0 lg:border-r border-stone-800 bg-[#1F2220] flex flex-col gap-5">
          {/* Analyte Selection */}
          <div>
            <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2 block flex items-center justify-between">
              <span>Standard Chromophore</span>
              <span className="text-[10px] text-amber-400 lowercase">λmax database</span>
            </label>
            <div className="space-y-2">
              {standards.map((std) => (
                <button
                  key={std.id}
                  onClick={() => setSelectedStandardId(std.id)}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                    selectedStandardId === std.id
                      ? 'bg-stone-800 border-amber-500/50 text-white shadow-md'
                      : 'bg-stone-900/40 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: std.color }}
                    />
                    <div>
                      <div className="font-semibold text-stone-200">{std.name}</div>
                      <div className="text-[10px] text-stone-400 font-mono">{std.formula}</div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-[11px] text-amber-400/90">
                    {std.lambda_max_nm} nm
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Concentration Slider */}
          <div className="bg-stone-900/50 p-3.5 rounded-lg border border-stone-800">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-stone-300 font-medium">Concentration (c)</span>
              <span className="font-mono text-amber-400 font-semibold">
                {(concentrationM * 1000).toFixed(3)} mM ({concentrationM.toExponential(2)} M)
              </span>
            </div>
            <input
              type="range"
              min={0.00002}
              max={0.001}
              step={0.00002}
              value={concentrationM}
              onChange={(e) => setConcentrationM(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-1">
              <span>0.02 mM</span>
              <span>0.50 mM</span>
              <span>1.00 mM</span>
            </div>
          </div>

          {/* Cuvette Path Length */}
          <div className="bg-stone-900/50 p-3.5 rounded-lg border border-stone-800">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-stone-300 font-medium">Optical Path Length (b)</span>
              <span className="font-mono text-amber-400 font-semibold">{pathLengthCm.toFixed(1)} cm</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[0.5, 1.0, 2.0].map((len) => (
                <button
                  key={len}
                  onClick={() => setPathLengthCm(len)}
                  className={`py-1.5 rounded text-xs font-mono font-medium border transition-colors ${
                    pathLengthCm === len
                      ? 'bg-amber-600/30 border-amber-500 text-amber-300'
                      : 'bg-stone-800/50 border-stone-700 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {len.toFixed(1)} cm
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Photometric Readout Box */}
          {simulation && (
            <div className="bg-gradient-to-br from-stone-900 to-black p-4 rounded-xl border border-stone-800/80 shadow-inner">
              <div className="text-[10px] uppercase font-mono text-stone-400 tracking-wider mb-2 flex items-center justify-between">
                <span>Photometric Readout</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-stone-800/40 p-2.5 rounded-lg border border-stone-700/40">
                  <div className="text-[10px] text-stone-400">Absorbance (A)</div>
                  <div className="text-xl font-bold font-mono text-amber-300">
                    {currentCursorPoint ? currentCursorPoint.absorbance.toFixed(4) : simulation.absorbance_at_lambda_max.toFixed(4)}
                  </div>
                  <div className="text-[9px] text-stone-400 font-mono mt-0.5">at {cursorWavelength} nm</div>
                </div>

                <div className="bg-stone-800/40 p-2.5 rounded-lg border border-stone-700/40">
                  <div className="text-[10px] text-stone-400">Transmittance (%T)</div>
                  <div className="text-xl font-bold font-mono text-cyan-300">
                    {currentCursorPoint ? currentCursorPoint.transmittance_pct.toFixed(2) : simulation.transmittance_at_lambda_max.toFixed(2)}%
                  </div>
                  <div className="text-[9px] text-stone-400 font-mono mt-0.5">T = 10^-A × 100</div>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-stone-800/60 flex items-center justify-between text-[11px] font-mono text-stone-400">
                <span>Molar Absorptivity (ε):</span>
                <span className="text-stone-200 font-semibold">{simulation.molar_absorptivity_l_mol_cm} L/(mol·cm)</span>
              </div>
            </div>
          )}

          {/* Lab Notebook Action */}
          <button
            onClick={handleSaveToNotebook}
            disabled={saveStatus === 'saving' || !simulation}
            className={`w-full py-2.5 px-4 rounded-lg font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
              saveStatus === 'saved'
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white'
            }`}
          >
            {saveStatus === 'saving' ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Saving Run...
              </>
            ) : saveStatus === 'saved' ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> Run Logged in Lab Notebook!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Spectrum to Lab Notebook
              </>
            )}
          </button>
        </div>

        {/* Right Interactive Visualizer (8 cols) */}
        <div className="lg:col-span-8 p-5 flex flex-col gap-5 bg-[#171918]">
          {/* Animated Optical Ray Bench */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-4 shadow-md relative overflow-hidden">
            <div className="text-xs font-semibold text-stone-300 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Optomechanical Schematic & Monochromator Lightpath</span>
              <span className="text-[11px] font-mono text-amber-400">
                Selected Beam: {cursorWavelength} nm
              </span>
            </div>

            <div className="h-28 bg-black/60 rounded-lg border border-stone-800/80 relative flex items-center px-4 justify-between">
              {/* Light Source */}
              <div className="flex flex-col items-center z-10">
                <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                  <Zap className="w-5 h-5 animate-pulse" />
                </div>
                <span className="text-[10px] text-stone-400 mt-1 font-mono">Tungsten/D₂</span>
              </div>

              {/* Optical Ray 1 */}
              <div className="flex-1 h-1 bg-gradient-to-r from-amber-200 to-white opacity-80 relative mx-2">
                <div className="absolute inset-0 bg-white blur-[2px]" />
              </div>

              {/* Diffraction Grating Monochromator */}
              <div className="flex flex-col items-center z-10">
                <div className="w-4 h-14 bg-gradient-to-b from-purple-500 via-green-500 to-red-500 rounded border border-stone-600 shadow-md" />
                <span className="text-[10px] text-stone-400 mt-1 font-mono">Grating</span>
              </div>

              {/* Dispersed Monochromatic Ray */}
              <div
                className="flex-1 h-2 relative mx-2 transition-colors duration-300"
                style={{ backgroundColor: beamColor, boxShadow: `0 0 12px ${beamColor}` }}
              />

              {/* Cuvette Compartment */}
              <div className="flex flex-col items-center z-10">
                <div
                  className="w-10 h-16 rounded border-2 border-cyan-400/40 relative flex items-center justify-center overflow-hidden transition-all shadow-inner"
                  style={{
                    backgroundColor: simulation ? simulation.chemical_color + '99' : '#ffffff20',
                    boxShadow: `inset 0 0 15px ${simulation?.chemical_color || '#000'}`,
                  }}
                >
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-white/10" />
                  <span className="text-[9px] font-mono text-white/80 font-bold z-10">
                    {pathLengthCm}cm
                  </span>
                </div>
                <span className="text-[10px] text-stone-400 mt-1 font-mono">Cuvette</span>
              </div>

              {/* Attenuated Beam */}
              <div
                className="flex-1 h-1 relative mx-2 transition-colors duration-300"
                style={{
                  backgroundColor: beamColor,
                  opacity: currentCursorPoint ? Math.max(0.1, currentCursorPoint.transmittance_pct / 100) : 0.5,
                }}
              />

              {/* Photodiode Detector */}
              <div className="flex flex-col items-center z-10">
                <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)] font-mono text-xs font-bold">
                  PD
                </div>
                <span className="text-[10px] text-stone-400 mt-1 font-mono">Detector</span>
              </div>
            </div>
          </div>

          {activeTab === 'spectrum' ? (
            /* Spectrum Plot Tab */
            <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-4 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span>Absorption Spectrum A(λ)</span>
                </div>
                <div className="text-xs text-stone-400 font-mono flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" /> λmax: {simulation?.lambda_max_nm} nm
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" /> Cursor: {cursorWavelength} nm
                  </span>
                </div>
              </div>

              {/* SVG Absorption Spectrum Graph */}
              <div className="relative w-full h-64 bg-stone-950 rounded-lg border border-stone-800 p-2 overflow-hidden flex flex-col justify-end">
                {simulation && simulation.spectrum_points.length > 0 && (
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 400 200" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="0" y1="50" x2="400" y2="50" stroke="#333" strokeDasharray="3 3" />
                    <line x1="0" y1="100" x2="400" y2="100" stroke="#333" strokeDasharray="3 3" />
                    <line x1="0" y1="150" x2="400" y2="150" stroke="#333" strokeDasharray="3 3" />

                    {/* Wavelength Grid Labels */}
                    <text x="10" y="195" fill="#666" fontSize="9" fontFamily="monospace">350 nm</text>
                    <text x="140" y="195" fill="#666" fontSize="9" fontFamily="monospace">500 nm</text>
                    <text x="270" y="195" fill="#666" fontSize="9" fontFamily="monospace">650 nm</text>
                    <text x="365" y="195" fill="#666" fontSize="9" fontFamily="monospace">750 nm</text>

                    {/* Spectrum Polyline */}
                    {(() => {
                      const maxA = Math.max(1.0, simulation.absorbance_at_lambda_max * 1.15);
                      const pointsStr = simulation.spectrum_points
                        .map((p) => {
                          const x = ((p.wavelength_nm - 350) / (750 - 350)) * 400;
                          const y = 190 - (p.absorbance / maxA) * 170;
                          return `${x.toFixed(1)},${y.toFixed(1)}`;
                        })
                        .join(' ');

                      const cursorX = ((cursorWavelength - 350) / (750 - 350)) * 400;

                      return (
                        <>
                          {/* Gradient Fill under Curve */}
                          <defs>
                            <linearGradient id="specGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#D97706" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#D97706" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <polygon
                            points={`0,190 ${pointsStr} 400,190`}
                            fill="url(#specGrad)"
                          />
                          <polyline
                            points={pointsStr}
                            fill="none"
                            stroke="#F59E0B"
                            strokeWidth="2.5"
                          />

                          {/* Cursor Vertical Indicator */}
                          <line
                            x1={cursorX}
                            y1="10"
                            x2={cursorX}
                            y2="190"
                            stroke="#22D3EE"
                            strokeWidth="1.5"
                            strokeDasharray="4 2"
                          />
                        </>
                      );
                    })()}
                  </svg>
                )}

                {/* Click / Scrub Slider */}
                <input
                  type="range"
                  min={350}
                  max={750}
                  step={1}
                  value={cursorWavelength}
                  onChange={(e) => setCursorWavelength(parseInt(e.target.value))}
                  className="w-full absolute inset-x-0 bottom-0 opacity-0 cursor-ew-resize h-full"
                />
              </div>

              {/* Scrubber Legend */}
              <div className="mt-3 flex items-center justify-between text-xs text-stone-400">
                <span className="flex items-center gap-1 text-[11px]">
                  <Info className="w-3.5 h-3.5 text-amber-400" />
                  Drag across the graph to tune spectrophotometer wavelength (350–750 nm)
                </span>
                <button
                  onClick={() => simulation && setCursorWavelength(simulation.lambda_max_nm)}
                  className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 font-mono text-[11px] border border-stone-700"
                >
                  Snap to λmax ({simulation?.lambda_max_nm} nm)
                </button>
              </div>
            </div>
          ) : (
            /* Calibration Curve Tab */
            <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Beer-Lambert Standard Calibration Line (A vs c)</span>
                </div>
                <span className="text-xs font-mono text-emerald-400">
                  {calibrationResult?.equation}
                </span>
              </div>

              {/* Calibration Points Table & Unknown Input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-stone-950 p-3 rounded-lg border border-stone-800">
                  <span className="text-xs font-semibold text-stone-300 block mb-2">
                    Standard Series (KMnO₄ at 525 nm)
                  </span>
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="grid grid-cols-2 text-stone-400 pb-1 border-b border-stone-800">
                      <span>Concentration (mM)</span>
                      <span>Absorbance (A)</span>
                    </div>
                    {calibrationPoints.map((pt, idx) => (
                      <div key={idx} className="grid grid-cols-2 text-stone-300">
                        <span>{(pt.concentration_m * 1000).toFixed(3)} mM</span>
                        <span className="text-amber-400">{pt.absorbance.toFixed(3)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-stone-950 p-3 rounded-lg border border-stone-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-stone-300 block mb-1">
                      Unknown Sample Analysis
                    </span>
                    <p className="text-[11px] text-stone-400 mb-2">
                      Measure unknown absorbance to deduce sample concentration via least-squares line.
                    </p>
                    <label className="text-xs text-stone-300 block mb-1">Unknown Absorbance (A):</label>
                    <input
                      type="number"
                      step={0.01}
                      min={0}
                      max={2.0}
                      value={unknownAbsorbance}
                      onChange={(e) => setUnknownAbsorbance(parseFloat(e.target.value))}
                      className="w-full bg-stone-900 border border-stone-700 rounded p-1.5 text-xs font-mono text-white mb-2"
                    />
                  </div>

                  {calibrationResult?.calculated_concentration_m && (
                    <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono">
                      <div className="text-emerald-400 font-semibold">Calculated Concentration (c):</div>
                      <div className="text-lg font-bold text-white">
                        {(calibrationResult.calculated_concentration_m * 1000).toFixed(4)} mM
                      </div>
                      <div className="text-[10px] text-stone-400">
                        {calibrationResult.calculated_concentration_m.toExponential(4)} M
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-xs text-stone-400 bg-stone-950/60 p-3 rounded-lg border border-stone-800 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  The slope m = {calibrationResult?.slope.toFixed(1)} L/(mol·cm) reflects the molar absorptivity
                  (ε) multiplied by the 1.0 cm path length. High linearity (R² &gt; 0.999) verifies adherence
                  to Beer-Lambert criteria in dilute solution.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
