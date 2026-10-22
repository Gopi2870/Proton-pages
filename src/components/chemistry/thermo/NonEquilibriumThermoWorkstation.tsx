import React, { useState, useEffect, useMemo } from 'react';
import {
  Activity,
  Flame,
  Zap,
  Layers,
  RotateCcw,
  Info,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Cpu,
  Compass,
  Sliders,
  Scale,
} from 'lucide-react';
import {
  nonEquilibriumThermoService,
  CURATED_THERMOELECTRIC_MATERIALS,
  CURATED_ELECTROKINETIC_MEDIUMS,
  CURATED_THERMODIFFUSION_MIXTURES,
} from '../../../services/nonEquilibriumThermoService';
import {
  TransportCouplingResponse,
  ThermoelectricAnalysisResponse,
  ElectrokineticAnalysisResponse,
  ThermodiffusionAnalysisResponse,
} from '../../../types/nonEquilibriumThermo';

export const NonEquilibriumThermoWorkstation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'thermoelectric' | 'thermodiffusion' | 'electrokinetic'>('matrix');

  // --- 1. Matrix & Dissipation State ---
  const [matrixL, setMatrixL] = useState<number[][]>([
    [5.0, 2.0],
    [2.0, 8.0],
  ]);
  const [forces, setForces] = useState<number[]>([3.0, -1.0]);
  const [matrixTempK, setMatrixTempK] = useState<number>(300.0);
  const [matrixResult, setMatrixResult] = useState<TransportCouplingResponse | null>(null);

  // --- 2. Thermoelectric State ---
  const [selectedMatId, setSelectedMatId] = useState<string>('bi2te3_n_type');
  const [thermoTempK, setThermoTempK] = useState<number>(300.0);
  const [voltageGradVM, setVoltageGradVM] = useState<number>(10.0);
  const [tempGradKM, setTempGradKM] = useState<number>(500.0);
  const [thermoResult, setThermoResult] = useState<ThermoelectricAnalysisResponse | null>(null);

  // --- 3. Thermodiffusion State ---
  const [selectedMixId, setSelectedMixId] = useState<string>('toluene_cyclohexane');
  const [diffTempK, setDiffTempK] = useState<number>(298.15);
  const [diffTempGradKM, setDiffTempGradKM] = useState<number>(200.0);
  const [diffMassGradMinv, setDiffMassGradMinv] = useState<number>(0.5);
  const [diffSoluteW1, setDiffSoluteW1] = useState<number>(0.5);
  const [diffResult, setDiffResult] = useState<ThermodiffusionAnalysisResponse | null>(null);

  // --- 4. Electrokinetic State ---
  const [selectedMedId, setSelectedMedId] = useState<string>('glass_capillary_water');
  const [pressureDropKpa, setPressureDropKpa] = useState<number>(50.0);
  const [voltageDiffV, setVoltageDiffV] = useState<number>(100.0);
  const [electroResult, setElectroResult] = useState<ElectrokineticAnalysisResponse | null>(null);

  // Run Matrix calculation
  useEffect(() => {
    try {
      const res = nonEquilibriumThermoService.evaluateTransportLocally({
        matrixL,
        drivingForces: forces,
        temperatureK: matrixTempK,
        forceLabels: ['Force X₁', 'Force X₂'],
        fluxLabels: ['Flux J₁', 'Flux J₂'],
      });
      setMatrixResult(res);
    } catch (err) {
      console.error('Matrix evaluation error:', err);
    }
  }, [matrixL, forces, matrixTempK]);

  // Run Thermoelectric calculation
  useEffect(() => {
    try {
      const res = nonEquilibriumThermoService.evaluateThermoelectricLocally({
        materialId: selectedMatId,
        temperatureK: thermoTempK,
        voltageGradientVM: voltageGradVM,
        temperatureGradientKM: tempGradKM,
      });
      setThermoResult(res);
    } catch (err) {
      console.error('Thermoelectric evaluation error:', err);
    }
  }, [selectedMatId, thermoTempK, voltageGradVM, tempGradKM]);

  // Run Thermodiffusion calculation
  useEffect(() => {
    try {
      const res = nonEquilibriumThermoService.evaluateThermodiffusionLocally({
        mixtureId: selectedMixId,
        temperatureK: diffTempK,
        temperatureGradientKM: diffTempGradKM,
        massFractionGradientMInv: diffMassGradMinv,
        massFractionSolute: diffSoluteW1,
      });
      setDiffResult(res);
    } catch (err) {
      console.error('Thermodiffusion evaluation error:', err);
    }
  }, [selectedMixId, diffTempK, diffTempGradKM, diffMassGradMinv, diffSoluteW1]);

  // Run Electrokinetic calculation
  useEffect(() => {
    try {
      const res = nonEquilibriumThermoService.evaluateElectrokineticLocally({
        mediumId: selectedMedId,
        pressureDropKpa,
        voltageDifferenceV: voltageDiffV,
      });
      setElectroResult(res);
    } catch (err) {
      console.error('Electrokinetic evaluation error:', err);
    }
  }, [selectedMedId, pressureDropKpa, voltageDiffV]);

  const handleReset = () => {
    setMatrixL([
      [5.0, 2.0],
      [2.0, 8.0],
    ]);
    setForces([3.0, -1.0]);
    setMatrixTempK(300.0);
    setSelectedMatId('bi2te3_n_type');
    setThermoTempK(300.0);
    setVoltageGradVM(10.0);
    setTempGradKM(500.0);
    setSelectedMixId('toluene_cyclohexane');
    setDiffTempK(298.15);
    setDiffTempGradKM(200.0);
    setDiffMassGradMinv(0.5);
    setDiffSoluteW1(0.5);
    setSelectedMedId('glass_capillary_water');
    setPressureDropKpa(50.0);
    setVoltageDiffV(100.0);
  };

  // Matrix edit helpers
  const updateMatrixCell = (r: number, c: number, val: number) => {
    const next = matrixL.map((row, ri) =>
      row.map((cell, ci) => (ri === r && ci === c ? val : cell))
    );
    setMatrixL(next);
  };

  const setSymmetricPreset = () => {
    setMatrixL([
      [5.0, 2.0],
      [2.0, 8.0],
    ]);
  };

  const setAsymmetricPreset = () => {
    // Breaks Onsager symmetry: L_12 != L_21
    setMatrixL([
      [5.0, 3.5],
      [1.0, 8.0],
    ]);
  };

  const setUnphysicalPreset = () => {
    // Violates positive semi-definiteness: det < 0, q > 1
    setMatrixL([
      [2.0, 5.0],
      [5.0, 2.0],
    ]);
  };

  return (
    <div className="flex flex-col w-full space-y-4">
      {/* Top Banner & Mode Tabs */}
      <div className="bg-[#FDF8F5] border border-[#8B572A]/20 rounded-xl p-4 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-[#D47942]/10 text-[#D47942]">
              <Activity className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-[#2C302E]">
              Non-Equilibrium Thermodynamics & Onsager Relations
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-[#D47942] text-white">
              PR #044
            </span>
          </div>
          <p className="text-xs text-[#8B572A] mt-1">
            Entropy production rate (σ = ∑ JᵢXᵢ ≥ 0), Onsager reciprocity (L_ik = L_ki), Seebeck-Peltier Kelvin laws, Soret-Dufour demixing, and Saxén electrokinetics
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-[#8B572A]/10 p-1 rounded-lg flex flex-wrap items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeTab === 'matrix'
                  ? 'bg-white text-[#D47942] shadow-xs'
                  : 'text-[#2C302E] hover:text-[#D47942]'
              }`}
            >
              Matrix & Dissipation
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('thermoelectric')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeTab === 'thermoelectric'
                  ? 'bg-white text-[#D47942] shadow-xs'
                  : 'text-[#2C302E] hover:text-[#D47942]'
              }`}
            >
              Thermoelectric (Seebeck/Peltier)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('thermodiffusion')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeTab === 'thermodiffusion'
                  ? 'bg-white text-[#D47942] shadow-xs'
                  : 'text-[#2C302E] hover:text-[#D47942]'
              }`}
            >
              Thermodiffusion (Soret/Dufour)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('electrokinetic')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeTab === 'electrokinetic'
                  ? 'bg-white text-[#D47942] shadow-xs'
                  : 'text-[#2C302E] hover:text-[#D47942]'
              }`}
            >
              Electrokinetic & Saxén
            </button>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="p-2 text-[#8B572A] hover:text-[#2C302E] hover:bg-[#8B572A]/10 rounded-lg transition"
            title="Reset to default conditions"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mode 1: Generalized Matrix & Entropy Production */}
      {activeTab === 'matrix' && matrixResult && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8B572A] flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" /> Phenomenological Matrix L [2×2]
                </label>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={setSymmetricPreset}
                    className="text-[10px] px-2 py-0.5 rounded border border-[#8B572A]/20 bg-[#FDF8F5] hover:bg-[#D47942]/10 text-[#8B572A]"
                  >
                    Symmetric
                  </button>
                  <button
                    type="button"
                    onClick={setAsymmetricPreset}
                    className="text-[10px] px-2 py-0.5 rounded border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800"
                  >
                    Break Reciprocity
                  </button>
                  <button
                    type="button"
                    onClick={setUnphysicalPreset}
                    className="text-[10px] px-2 py-0.5 rounded border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-800"
                  >
                    Violate 2nd Law
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-[#FDF8F5] rounded-lg border border-[#8B572A]/10">
                <div>
                  <span className="text-[11px] text-[#8B572A] font-medium">L₁₁ (Direct)</span>
                  <input
                    type="number"
                    step="0.5"
                    value={matrixL[0][0]}
                    onChange={(e) => updateMatrixCell(0, 0, parseFloat(e.target.value) || 0)}
                    className="w-full mt-1 px-2.5 py-1.5 text-xs font-mono rounded border border-[#8B572A]/20 bg-white"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-[#8B572A] font-medium">L₁₂ (Cross-coupling)</span>
                  <input
                    type="number"
                    step="0.5"
                    value={matrixL[0][1]}
                    onChange={(e) => updateMatrixCell(0, 1, parseFloat(e.target.value) || 0)}
                    className="w-full mt-1 px-2.5 py-1.5 text-xs font-mono rounded border border-[#8B572A]/20 bg-white"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-[#8B572A] font-medium">L₂₁ (Cross-coupling)</span>
                  <input
                    type="number"
                    step="0.5"
                    value={matrixL[1][0]}
                    onChange={(e) => updateMatrixCell(1, 0, parseFloat(e.target.value) || 0)}
                    className="w-full mt-1 px-2.5 py-1.5 text-xs font-mono rounded border border-[#8B572A]/20 bg-white"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-[#8B572A] font-medium">L₂₂ (Direct)</span>
                  <input
                    type="number"
                    step="0.5"
                    value={matrixL[1][1]}
                    onChange={(e) => updateMatrixCell(1, 1, parseFloat(e.target.value) || 0)}
                    className="w-full mt-1 px-2.5 py-1.5 text-xs font-mono rounded border border-[#8B572A]/20 bg-white"
                  />
                </div>
              </div>

              {/* Driving Forces Inputs */}
              <div className="space-y-2 pt-2 border-t border-[#8B572A]/10">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8B572A] flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" /> Generalized Thermodynamic Forces Xᵢ
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-xs text-[#2C302E]">
                      <span>Force X₁</span>
                      <span className="font-mono font-bold">{forces[0]}</span>
                    </div>
                    <input
                      type="range"
                      min="-10"
                      max="10"
                      step="0.5"
                      value={forces[0]}
                      onChange={(e) => setForces([parseFloat(e.target.value), forces[1]])}
                      className="w-full accent-[#D47942] mt-1"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-[#2C302E]">
                      <span>Force X₂</span>
                      <span className="font-mono font-bold">{forces[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="-10"
                      max="10"
                      step="0.5"
                      value={forces[1]}
                      onChange={(e) => setForces([forces[0], parseFloat(e.target.value)])}
                      className="w-full accent-[#D47942] mt-1"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between text-xs text-[#2C302E]">
                    <span>Temperature T</span>
                    <span className="font-mono font-bold">{matrixTempK} K</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="600"
                    step="10"
                    value={matrixTempK}
                    onChange={(e) => setMatrixTempK(parseFloat(e.target.value))}
                    className="w-full accent-[#D47942] mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Matrix Properties HUD */}
            <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8B572A]">
                Mathematical & Physical Diagnostics
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                  <div className="text-[10px] text-[#8B572A]">Onsager Symmetry</div>
                  <div className="font-bold flex items-center gap-1 mt-0.5">
                    {matrixResult.transportMatrix.isSymmetric ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> L₁₂ = L₂₁ (Holds)
                      </span>
                    ) : (
                      <span className="text-rose-700 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Broken (Δ = {matrixResult.transportMatrix.asymmetryNorm})
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                  <div className="text-[10px] text-[#8B572A]">Positive Semi-Definite</div>
                  <div className="font-bold flex items-center gap-1 mt-0.5">
                    {matrixResult.transportMatrix.isPositiveSemidefinite ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> PSD (λ ≥ 0)
                      </span>
                    ) : (
                      <span className="text-rose-700 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Non-PSD (Unstable)
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                  <div className="text-[10px] text-[#8B572A]">Coupling Factor q</div>
                  <div className="font-mono font-bold text-[#2C302E] mt-0.5">
                    {matrixResult.transportMatrix.couplingFactorQ !== null
                      ? matrixResult.transportMatrix.couplingFactorQ
                      : 'N/A'}
                    <span className="text-[10px] text-[#8B572A] font-normal ml-1">
                      {Math.abs(matrixResult.transportMatrix.couplingFactorQ || 0) <= 1.0 ? '(|q| ≤ 1)' : '(|q| > 1)'}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                  <div className="text-[10px] text-[#8B572A]">Eigenvalues (λ₁, λ₂)</div>
                  <div className="font-mono font-bold text-[#2C302E] mt-0.5">
                    [{matrixResult.transportMatrix.eigenvalues.join(', ')}]
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Results & Visualizer (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Dissipation & Entropy Production Card */}
            <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B572A] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" /> Dissipation & Entropy Production (σ)
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    matrixResult.entropyProduction.secondLawSatisfied
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {matrixResult.entropyProduction.secondLawSatisfied ? '2nd Law Satisfied (σ ≥ 0)' : '2nd Law Violated (σ < 0)'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                  <div className="text-[10px] text-[#8B572A]">Energy Dissipation Φ</div>
                  <div className="text-lg font-mono font-bold text-[#D47942] mt-0.5">
                    {matrixResult.entropyProduction.dissipationRateWM3.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-[#8B572A]">W / m³</div>
                </div>

                <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                  <div className="text-[10px] text-[#8B572A]">Entropy Production σ</div>
                  <div className="text-lg font-mono font-bold text-[#2C302E] mt-0.5">
                    {matrixResult.entropyProduction.entropyProductionWM3K.toExponential(3)}
                  </div>
                  <div className="text-[10px] text-[#8B572A]">W / (m³ K)</div>
                </div>

                <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                  <div className="text-[10px] text-[#8B572A]">Flux Vector [J₁, J₂]</div>
                  <div className="text-sm font-mono font-bold text-[#2C302E] mt-1">
                    [{matrixResult.entropyProduction.fluxes.join(', ')}]
                  </div>
                </div>
              </div>

              <div className="text-xs text-[#2C302E] p-2.5 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10 font-mono">
                {matrixResult.entropyProduction.validationMessage}
              </div>
            </div>

            {/* SVG Visualizer: Force-Flux Vectors and Dissipation Ellipse */}
            <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8B572A] mb-2 flex items-center justify-between">
                <span>Phase Space: Generalized Forces X & Fluxes J</span>
                <span className="text-[10px] text-stone-500 font-normal">Interactive Projection</span>
              </div>

              <div className="relative w-full h-64 bg-[#FDF8F5] rounded-lg border border-[#8B572A]/15 overflow-hidden flex items-center justify-center">
                <svg viewBox="-120 -120 240 240" className="w-full h-full">
                  {/* Grid lines */}
                  <line x1="-120" y1="0" x2="120" y2="0" stroke="#8B572A" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.3" />
                  <line x1="0" y1="-120" x2="0" y2="120" stroke="#8B572A" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.3" />
                  <circle cx="0" cy="0" r="40" stroke="#8B572A" strokeWidth="0.5" fill="none" opacity="0.2" />
                  <circle cx="0" cy="0" r="80" stroke="#8B572A" strokeWidth="0.5" fill="none" opacity="0.2" />

                  {/* Force Vector X */}
                  <line
                    x1="0"
                    y1="0"
                    x2={forces[0] * 8}
                    y2={-forces[1] * 8}
                    stroke="#D47942"
                    strokeWidth="3"
                    markerEnd="url(#arrow-force)"
                  />
                  <circle cx={forces[0] * 8} cy={-forces[1] * 8} r="4" fill="#D47942" />
                  <text
                    x={forces[0] * 8 + 8}
                    y={-forces[1] * 8 - 4}
                    fill="#D47942"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    Force X ({forces[0]}, {forces[1]})
                  </text>

                  {/* Flux Vector J */}
                  <line
                    x1="0"
                    y1="0"
                    x2={Math.min(90, Math.max(-90, matrixResult.entropyProduction.fluxes[0] * 1.5))}
                    y2={Math.min(90, Math.max(-90, -matrixResult.entropyProduction.fluxes[1] * 1.5))}
                    stroke="#2C302E"
                    strokeWidth="2.5"
                    strokeDasharray="4,2"
                  />
                  <circle
                    cx={Math.min(90, Math.max(-90, matrixResult.entropyProduction.fluxes[0] * 1.5))}
                    cy={Math.min(90, Math.max(-90, -matrixResult.entropyProduction.fluxes[1] * 1.5))}
                    r="3.5"
                    fill="#2C302E"
                  />
                  <text
                    x={Math.min(90, Math.max(-90, matrixResult.entropyProduction.fluxes[0] * 1.5)) + 8}
                    y={Math.min(90, Math.max(-90, -matrixResult.entropyProduction.fluxes[1] * 1.5)) + 12}
                    fill="#2C302E"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    Flux J ({matrixResult.entropyProduction.fluxes[0].toFixed(1)}, {matrixResult.entropyProduction.fluxes[1].toFixed(1)})
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Thermoelectric Transport */}
      {activeTab === 'thermoelectric' && thermoResult && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Controls (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8B572A] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> Thermoelectric Material
              </label>

              <div className="space-y-1.5">
                {CURATED_THERMOELECTRIC_MATERIALS.map((mat) => (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() => setSelectedMatId(mat.id)}
                    className={`w-full p-2.5 rounded-lg border text-left transition ${
                      selectedMatId === mat.id
                        ? 'border-[#D47942] bg-[#D47942]/5'
                        : 'border-[#8B572A]/10 hover:border-[#8B572A]/30 bg-[#FDF8F5]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#2C302E]">{mat.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-[#8B572A]/15">
                        S = {mat.seebeckUvK > 0 ? '+' : ''}{mat.seebeckUvK} μV/K
                      </span>
                    </div>
                    <div className="text-[10px] text-[#8B572A] truncate mt-1">{mat.description}</div>
                  </button>
                ))}
              </div>

              {/* Gradient Controls */}
              <div className="pt-2 space-y-3 border-t border-[#8B572A]/10">
                <div>
                  <div className="flex justify-between text-xs text-[#2C302E]">
                    <span>Temperature T</span>
                    <span className="font-mono font-bold">{thermoTempK} K</span>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="1000"
                    step="10"
                    value={thermoTempK}
                    onChange={(e) => setThermoTempK(parseFloat(e.target.value))}
                    className="w-full accent-[#D47942] mt-1"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-[#2C302E]">
                    <span>Voltage Gradient -∇φ</span>
                    <span className="font-mono font-bold">{voltageGradVM} V/m</span>
                  </div>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    step="1"
                    value={voltageGradVM}
                    onChange={(e) => setVoltageGradVM(parseFloat(e.target.value))}
                    className="w-full accent-[#D47942] mt-1"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-[#2C302E]">
                    <span>Temperature Gradient -∇T</span>
                    <span className="font-mono font-bold">{tempGradKM} K/m</span>
                  </div>
                  <input
                    type="range"
                    min="-2000"
                    max="2000"
                    step="50"
                    value={tempGradKM}
                    onChange={(e) => setTempGradKM(parseFloat(e.target.value))}
                    className="w-full accent-[#D47942] mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Results & Kelvin Law Verification (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B572A] flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" /> Second Kelvin Relation & Onsager Reciprocity
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Π = S·T Analytically Enforced
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                  <div className="text-[10px] text-[#8B572A]">Seebeck Coeff (S)</div>
                  <div className="text-base font-mono font-bold text-[#2C302E] mt-0.5">
                    {thermoResult.system.seebeckCoefficientUvK > 0 ? '+' : ''}
                    {thermoResult.system.seebeckCoefficientUvK} μV/K
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                  <div className="text-[10px] text-[#8B572A]">Peltier Coeff (Π)</div>
                  <div className="text-base font-mono font-bold text-[#D47942] mt-0.5">
                    {thermoResult.system.peltierCoefficientMv > 0 ? '+' : ''}
                    {thermoResult.system.peltierCoefficientMv} mV
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                  <div className="text-[10px] text-[#8B572A]">Figure of Merit ZT</div>
                  <div className="text-base font-mono font-bold text-emerald-700 mt-0.5">
                    {thermoResult.system.figureOfMeritZt.toFixed(3)}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                  <div className="text-[10px] text-[#8B572A]">Current Density j</div>
                  <div className="text-base font-mono font-bold text-[#2C302E] mt-0.5">
                    {thermoResult.currentDensityAM2.toLocaleString()} A/m²
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#2C302E] p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10 font-mono">
                {thermoResult.explanation}
              </p>
            </div>

            {/* SVG Thermoelectric Couple Diagram */}
            <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8B572A] mb-2 flex items-center justify-between">
                <span>Solid-State Thermocouple / Peltier Element Visualizer</span>
                <span className="text-[10px] text-stone-500 font-normal">Heat Absorption & Electrical Work</span>
              </div>

              <div className="relative w-full h-52 bg-[#FDF8F5] rounded-lg border border-[#8B572A]/15 overflow-hidden flex items-center justify-center p-4">
                <svg viewBox="0 0 400 180" className="w-full h-full">
                  {/* Top Hot/Cold Junction */}
                  <rect x="50" y="20" width="300" height="20" rx="3" fill="#D47942" fillOpacity="0.8" />
                  <text x="200" y="34" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Hot Junction (T_hot = {(thermoTempK + tempGradKM * 0.01).toFixed(0)} K)
                  </text>

                  {/* Thermoelectric Pellets (n-type and p-type) */}
                  <rect x="90" y="50" width="70" height="70" rx="4" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2" />
                  <text x="125" y="80" fill="#1E40AF" fontSize="11" fontWeight="bold" textAnchor="middle">
                    n-type leg
                  </text>
                  <text x="125" y="96" fill="#1E40AF" fontSize="9" textAnchor="middle">
                    Electrons (e⁻)
                  </text>

                  <rect x="240" y="50" width="70" height="70" rx="4" fill="#EC4899" fillOpacity="0.2" stroke="#EC4899" strokeWidth="2" />
                  <text x="275" y="80" fill="#9D174D" fontSize="11" fontWeight="bold" textAnchor="middle">
                    p-type leg
                  </text>
                  <text x="275" y="96" fill="#9D174D" fontSize="9" textAnchor="middle">
                    Holes (h⁺)
                  </text>

                  {/* Bottom Cold/Contact Plates */}
                  <rect x="70" y="130" width="110" height="18" rx="3" fill="#64748B" />
                  <text x="125" y="143" fill="#FFFFFF" fontSize="10" textAnchor="middle">
                    (-) Terminal
                  </text>

                  <rect x="220" y="130" width="110" height="18" rx="3" fill="#64748B" />
                  <text x="275" y="143" fill="#FFFFFF" fontSize="10" textAnchor="middle">
                    (+) Terminal
                  </text>

                  {/* Flow Arrows */}
                  <path d="M 125 110 L 125 60" stroke="#3B82F6" strokeWidth="2" strokeDasharray="3,3" />
                  <path d="M 275 60 L 275 110" stroke="#EC4899" strokeWidth="2" strokeDasharray="3,3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Thermodiffusion (Soret & Dufour) */}
      {activeTab === 'thermodiffusion' && diffResult && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Controls (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8B572A] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> Binary Fluid Mixture
              </label>

              <div className="space-y-1.5">
                {CURATED_THERMODIFFUSION_MIXTURES.map((mix) => (
                  <button
                    key={mix.id}
                    type="button"
                    onClick={() => setSelectedMixId(mix.id)}
                    className={`w-full p-2.5 rounded-lg border text-left transition ${
                      selectedMixId === mix.id
                        ? 'border-[#D47942] bg-[#D47942]/5'
                        : 'border-[#8B572A]/10 hover:border-[#8B572A]/30 bg-[#FDF8F5]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#2C302E]">{mix.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-[#8B572A]/15">
                        S_T = {mix.soretKInv > 0 ? '+' : ''}{mix.soretKInv} K⁻¹
                      </span>
                    </div>
                    <div className="text-[10px] text-[#8B572A] truncate mt-1">{mix.description}</div>
                  </button>
                ))}
              </div>

              {/* Gradient Controls */}
              <div className="pt-2 space-y-3 border-t border-[#8B572A]/10">
                <div>
                  <div className="flex justify-between text-xs text-[#2C302E]">
                    <span>Temperature Gradient ∇T</span>
                    <span className="font-mono font-bold">{diffTempGradKM} K/m</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="25"
                    value={diffTempGradKM}
                    onChange={(e) => setDiffTempGradKM(parseFloat(e.target.value))}
                    className="w-full accent-[#D47942] mt-1"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-[#2C302E]">
                    <span>Mass Fraction Gradient ∇w₁</span>
                    <span className="font-mono font-bold">{diffMassGradMinv} m⁻¹</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2.0"
                    step="0.05"
                    value={diffMassGradMinv}
                    onChange={(e) => setDiffMassGradMinv(parseFloat(e.target.value))}
                    className="w-full accent-[#D47942] mt-1"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-[#2C302E]">
                    <span>Solute Mass Fraction w₁</span>
                    <span className="font-mono font-bold">{diffSoluteW1}</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.95"
                    step="0.05"
                    value={diffSoluteW1}
                    onChange={(e) => setDiffSoluteW1(parseFloat(e.target.value))}
                    className="w-full accent-[#D47942] mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Results & Concentration Profile (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B572A] flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" /> Soret Demixing & Dufour Reciprocal Flux
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Onsager Cross-Ratio = 1.000
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                  <div className="text-[10px] text-[#8B572A]">Soret Coeff (S_T)</div>
                  <div className="text-base font-mono font-bold text-[#2C302E] mt-0.5">
                    {diffResult.system.soretCoefficientKInv > 0 ? '+' : ''}
                    {diffResult.system.soretCoefficientKInv.toExponential(2)} K⁻¹
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                  <div className="text-[10px] text-[#8B572A]">Thermal Diff (D_T)</div>
                  <div className="text-base font-mono font-bold text-[#D47942] mt-0.5">
                    {diffResult.system.thermalDiffusionCoeffM2SK.toExponential(2)}
                  </div>
                  <div className="text-[10px] text-[#8B572A]">m²/(s K)</div>
                </div>

                <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                  <div className="text-[10px] text-[#8B572A]">5 mm Steady-State Sep.</div>
                  <div className="text-base font-mono font-bold text-emerald-700 mt-0.5">
                    {diffResult.steadyStateSeparationPct > 0 ? '+' : ''}
                    {diffResult.steadyStateSeparationPct.toFixed(2)}%
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                  <div className="text-[10px] text-[#8B572A]">Dufour Cross-Ratio</div>
                  <div className="text-base font-mono font-bold text-[#2C302E] mt-0.5">
                    {(diffResult.system.dufourHeatFluxRatio * 100).toFixed(3)}%
                  </div>
                  <div className="text-[10px] text-[#8B572A]">of Fourier conduction</div>
                </div>
              </div>

              <p className="text-xs text-[#2C302E] p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10 font-mono">
                {diffResult.explanation}
              </p>
            </div>

            {/* SVG Steady State Separation Profile */}
            <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8B572A] mb-2 flex items-center justify-between">
                <span>Steady-State Demixing Profile Across 5 mm Diffusion Gap</span>
                <span className="text-[10px] text-stone-500 font-normal">Cold Wall vs Warm Wall</span>
              </div>

              <div className="relative w-full h-52 bg-[#FDF8F5] rounded-lg border border-[#8B572A]/15 overflow-hidden flex items-center justify-center p-4">
                <svg viewBox="0 0 400 160" className="w-full h-full">
                  {/* Left Cold Wall */}
                  <rect x="40" y="20" width="20" height="120" fill="#3B82F6" rx="2" />
                  <text x="50" y="15" fill="#1E40AF" fontSize="10" textAnchor="middle" fontWeight="bold">
                    Cold Wall
                  </text>

                  {/* Right Warm Wall */}
                  <rect x="340" y="20" width="20" height="120" fill="#EF4444" rx="2" />
                  <text x="350" y="15" fill="#B91C1C" fontSize="10" textAnchor="middle" fontWeight="bold">
                    Warm Wall
                  </text>

                  {/* Temperature Gradient Line */}
                  <line x1="60" y1="120" x2="340" y2="40" stroke="#EF4444" strokeWidth="2" strokeDasharray="3,3" />
                  <text x="200" y="70" fill="#EF4444" fontSize="9" textAnchor="middle">
                    Temperature T(x)
                  </text>

                  {/* Concentration Curve w_1(x) */}
                  {diffResult.system.soretCoefficientKInv > 0 ? (
                    // Thermophobic: Enriched at cold wall (left), depleted at warm wall (right)
                    <path
                      d="M 60 40 Q 200 80 340 120"
                      fill="none"
                      stroke="#D47942"
                      strokeWidth="3"
                    />
                  ) : (
                    // Thermophilic: Enriched at warm wall (right)
                    <path
                      d="M 60 120 Q 200 80 340 40"
                      fill="none"
                      stroke="#D47942"
                      strokeWidth="3"
                    />
                  )}
                  <text x="200" y="105" fill="#D47942" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Mass Fraction w₁(x)
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 4: Electrokinetic & Saxén Reciprocity */}
      {activeTab === 'electrokinetic' && electroResult && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Controls (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8B572A] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> Porous Membrane Medium
              </label>

              <div className="space-y-1.5">
                {CURATED_ELECTROKINETIC_MEDIUMS.map((med) => (
                  <button
                    key={med.id}
                    type="button"
                    onClick={() => setSelectedMedId(med.id)}
                    className={`w-full p-2.5 rounded-lg border text-left transition ${
                      selectedMedId === med.id
                        ? 'border-[#D47942] bg-[#D47942]/5'
                        : 'border-[#8B572A]/10 hover:border-[#8B572A]/30 bg-[#FDF8F5]'
                    }`}
                  >
                    <div className="font-bold text-xs text-[#2C302E]">{med.name}</div>
                    <div className="text-[10px] text-[#8B572A] truncate mt-1">{med.description}</div>
                  </button>
                ))}
              </div>

              {/* Driving Controls */}
              <div className="pt-2 space-y-3 border-t border-[#8B572A]/10">
                <div>
                  <div className="flex justify-between text-xs text-[#2C302E]">
                    <span>Pressure Drop ΔP</span>
                    <span className="font-mono font-bold">{pressureDropKpa} kPa</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="200"
                    step="5"
                    value={pressureDropKpa}
                    onChange={(e) => setPressureDropKpa(parseFloat(e.target.value))}
                    className="w-full accent-[#D47942] mt-1"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-[#2C302E]">
                    <span>Electric Potential Difference ΔV</span>
                    <span className="font-mono font-bold">{voltageDiffV} V</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={voltageDiffV}
                    onChange={(e) => setVoltageDiffV(parseFloat(e.target.value))}
                    className="w-full accent-[#D47942] mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Results & Saxén Reciprocity (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B572A] flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5" /> Saxén Reciprocal Relations Verification
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> (Iv/I)ΔP=0 = -(ΔV/ΔP)I=0
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                  <div className="text-[10px] text-[#8B572A]">Volume Flow (Iv)</div>
                  <div className="text-base font-mono font-bold text-[#2C302E] mt-0.5">
                    {electroResult.volumeFlowRateM3S.toExponential(2)}
                  </div>
                  <div className="text-[10px] text-[#8B572A]">m³/s</div>
                </div>

                <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                  <div className="text-[10px] text-[#8B572A]">Electric Current (I)</div>
                  <div className="text-base font-mono font-bold text-[#D47942] mt-0.5">
                    {electroResult.electricCurrentA.toExponential(2)}
                  </div>
                  <div className="text-[10px] text-[#8B572A]">A</div>
                </div>

                <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                  <div className="text-[10px] text-[#8B572A]">Streaming Potential</div>
                  <div className="text-base font-mono font-bold text-emerald-700 mt-0.5">
                    {electroResult.system.streamingPotentialPerBar.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-[#8B572A]">V / bar</div>
                </div>

                <div className="p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10">
                  <div className="text-[10px] text-[#8B572A]">Electro-osmotic Ratio</div>
                  <div className="text-base font-mono font-bold text-[#2C302E] mt-0.5">
                    {electroResult.system.electroosmoticVelocityPerVolt.toExponential(2)}
                  </div>
                  <div className="text-[10px] text-[#8B572A]">m³/C</div>
                </div>
              </div>

              <p className="text-xs text-[#2C302E] p-3 rounded-lg bg-[#FDF8F5] border border-[#8B572A]/10 font-mono">
                {electroResult.explanation}
              </p>
            </div>

            {/* SVG Electro-osmosis & Streaming Potential Diagram */}
            <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8B572A] mb-2 flex items-center justify-between">
                <span>Porous Nanochannel Double Layer Cross-Section</span>
                <span className="text-[10px] text-stone-500 font-normal">Streaming Potential & Electro-osmosis</span>
              </div>

              <div className="relative w-full h-52 bg-[#FDF8F5] rounded-lg border border-[#8B572A]/15 overflow-hidden flex items-center justify-center p-4">
                <svg viewBox="0 0 400 160" className="w-full h-full">
                  {/* Top Wall (Negatively charged) */}
                  <rect x="40" y="20" width="320" height="15" fill="#64748B" rx="2" />
                  <text x="200" y="32" fill="#FFFFFF" fontSize="9" textAnchor="middle" fontWeight="bold">
                    Negatively Charged Pore Wall (- - - - - - - - - - -)
                  </text>

                  {/* Electrical Double Layer Cations */}
                  <g fill="#3B82F6" fontSize="10" fontWeight="bold">
                    <text x="60" y="50">+</text>
                    <text x="100" y="50">+</text>
                    <text x="140" y="50">+</text>
                    <text x="180" y="50">+</text>
                    <text x="220" y="50">+</text>
                    <text x="260" y="50">+</text>
                    <text x="300" y="50">+</text>
                    <text x="340" y="50">+</text>
                  </g>

                  {/* Fluid Flow Arrow (Plug Flow) */}
                  <path d="M 60 80 L 330 80" stroke="#D47942" strokeWidth="3" markerEnd="url(#arrow-flow)" />
                  <text x="200" y="75" fill="#D47942" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Electro-osmotic Plug Flow Iv
                  </text>

                  {/* Electrical Double Layer Cations Bottom */}
                  <g fill="#3B82F6" fontSize="10" fontWeight="bold">
                    <text x="60" y="115">+</text>
                    <text x="100" y="115">+</text>
                    <text x="140" y="115">+</text>
                    <text x="180" y="115">+</text>
                    <text x="220" y="115">+</text>
                    <text x="260" y="115">+</text>
                    <text x="300" y="115">+</text>
                    <text x="340" y="115">+</text>
                  </g>

                  {/* Bottom Wall */}
                  <rect x="40" y="125" width="320" height="15" fill="#64748B" rx="2" />
                  <text x="200" y="137" fill="#FFFFFF" fontSize="9" textAnchor="middle" fontWeight="bold">
                    Negatively Charged Pore Wall (- - - - - - - - - - -)
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
