import React, { useState, useEffect, useMemo } from 'react';
import {
  Sun,
  Sparkles,
  RotateCcw,
  Activity,
  Sliders,
  TrendingUp,
  Cpu,
  Info,
  CheckCircle2,
  Atom,
  Clock,
  Compass,
  Zap,
} from 'lucide-react';
import {
  photochemistryService,
  CURATED_FLUOROPHORES,
  CURATED_QUENCHERS,
  CURATED_FRET_PAIRS,
} from '../../../services/photochemistryService';
import {
  JablonskiSimulationResponse,
  SternVolmerResult,
  FretSimulationResult,
} from '../../../types/photochemistry';

export const PhotochemistryWorkstation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jablonski' | 'stern_volmer' | 'fret'>('jablonski');

  // Jablonski parameters
  const [selectedFluorId, setSelectedFluorId] = useState<string>('fluorescein');
  const [krScale, setKrScale] = useState<number>(1.0);
  const [kicScale, setKicScale] = useState<number>(1.0);
  const [kiscScale, setKiscScale] = useState<number>(1.0);
  const [temperatureK, setTemperatureK] = useState<number>(298.15);
  const [jablonskiResult, setJablonskiResult] = useState<JablonskiSimulationResponse | null>(null);

  // Stern-Volmer parameters
  const [selectedQuencherId, setSelectedQuencherId] = useState<string>('iodide_anion');
  const [maxQuencherConcMM, setMaxQuencherConcMM] = useState<number>(50.0);
  const [svResult, setSvResult] = useState<SternVolmerResult | null>(null);

  // FRET parameters
  const [selectedFretPairId, setSelectedFretPairId] = useState<string>('CFP_YFP');
  const [currentDistanceAngstrom, setCurrentDistanceAngstrom] = useState<number>(49.2);
  const [fretResult, setFretResult] = useState<FretSimulationResult | null>(null);

  // Run Jablonski simulation
  useEffect(() => {
    try {
      const res = photochemistryService.simulateJablonskiLocally({
        fluorophore_id: selectedFluorId,
        kr_scaling_factor: krScale,
        kic_scaling_factor: kicScale,
        kisc_scaling_factor: kiscScale,
        temperature_k: temperatureK,
      });
      setJablonskiResult(res);
    } catch (err) {
      console.error('Jablonski simulation error:', err);
    }
  }, [selectedFluorId, krScale, kicScale, kiscScale, temperatureK]);

  // Run Stern-Volmer simulation
  useEffect(() => {
    try {
      const res = photochemistryService.calculateSternVolmerLocally({
        fluorophore_id: selectedFluorId,
        quencher_id: selectedQuencherId,
        max_quencher_conc_mM: maxQuencherConcMM,
        points_count: 11,
        temperature_k: temperatureK,
      });
      setSvResult(res.result);
    } catch (err) {
      console.error('Stern-Volmer calculation error:', err);
    }
  }, [selectedFluorId, selectedQuencherId, maxQuencherConcMM, temperatureK]);

  // Run FRET simulation
  useEffect(() => {
    try {
      const res = photochemistryService.simulateFretLocally({
        fret_pair_id: selectedFretPairId,
        current_distance_r_angstrom: currentDistanceAngstrom,
        min_distance_angstrom: 15.0,
        max_distance_angstrom: 95.0,
        steps_count: 35,
      });
      setFretResult(res.result);
    } catch (err) {
      console.error('FRET calculation error:', err);
    }
  }, [selectedFretPairId, currentDistanceAngstrom]);

  const selectedFluor = useMemo(
    () => CURATED_FLUOROPHORES.find((f) => f.id === selectedFluorId) || CURATED_FLUOROPHORES[0],
    [selectedFluorId]
  );

  const selectedQuencher = useMemo(
    () => CURATED_QUENCHERS.find((q) => q.id === selectedQuencherId) || CURATED_QUENCHERS[0],
    [selectedQuencherId]
  );

  const handleReset = () => {
    setSelectedFluorId('fluorescein');
    setKrScale(1.0);
    setKicScale(1.0);
    setKiscScale(1.0);
    setTemperatureK(298.15);
    setSelectedQuencherId('iodide_anion');
    setMaxQuencherConcMM(50.0);
    setSelectedFretPairId('CFP_YFP');
    setCurrentDistanceAngstrom(49.2);
  };

  // SVG Data for Stern-Volmer plot
  const svSvgData = useMemo(() => {
    if (!svResult || svResult.points.length === 0) return null;
    const pts = svResult.points;
    const maxQ = Math.max(...pts.map((p) => p.quencherConcentrationMM), 1.0);
    const maxF0OverF = Math.max(...pts.map((p) => p.f0OverF), 1.0);

    const width = 560;
    const height = 260;
    const padding = { top: 25, right: 35, bottom: 45, left: 55 };
    const plotW = width - padding.left - padding.right;
    const plotH = height - padding.top - padding.bottom;

    const toX = (q: number) => padding.left + (q / maxQ) * plotW;
    const toY = (val: number) => padding.top + plotH - ((val - 1.0) / (maxF0OverF - 1.0 || 1.0)) * plotH;

    const pathLine = pts
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.quencherConcentrationMM).toFixed(1)} ${toY(p.f0OverF).toFixed(1)}`)
      .join(' ');

    return { width, height, padding, plotW, plotH, maxQ, maxF0OverF, toX, toY, pathLine, pts };
  }, [svResult]);

  // SVG Data for FRET curve
  const fretSvgData = useMemo(() => {
    if (!fretResult || fretResult.distancePoints.length === 0) return null;
    const pts = fretResult.distancePoints;
    const minR = pts[0].distanceRAngstrom;
    const maxR = pts[pts.length - 1].distanceRAngstrom;

    const width = 560;
    const height = 260;
    const padding = { top: 25, right: 35, bottom: 45, left: 55 };
    const plotW = width - padding.left - padding.right;
    const plotH = height - padding.top - padding.bottom;

    const toX = (r: number) => padding.left + ((r - minR) / (maxR - minR)) * plotW;
    const toY = (eff: number) => padding.top + plotH - eff * plotH;

    const pathCurve = pts
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.distanceRAngstrom).toFixed(1)} ${toY(p.fretEfficiency).toFixed(1)}`)
      .join(' ');

    const curX = toX(fretResult.currentDistanceRAngstrom);
    const curY = toY(fretResult.efficiencyAtCurrentDistance);
    const r0X = toX(fretResult.forsterDistanceR0Angstrom);

    return { width, height, padding, plotW, plotH, minR, maxR, toX, toY, pathCurve, curX, curY, r0X };
  }, [fretResult]);

  return (
    <div className="flex flex-col w-full space-y-4">
      {/* Workstation Header Bar */}
      <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
            <Sun className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-on-surface">
                Photochemistry & Jablonski Energy Diagram
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-xs font-semibold">
                Rig #14
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Electronic state manifolds (S₀, S₁, T₁), fluorescence quantum yields, Stern-Volmer quenching, and FRET nanoruler dynamics
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2">
          <div className="flex bg-surface-container-low p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('jablonski')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeTab === 'jablonski'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Jablonski Diagram
            </button>
            <button
              onClick={() => setActiveTab('stern_volmer')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeTab === 'stern_volmer'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Stern-Volmer Quenching
            </button>
            <button
              onClick={() => setActiveTab('fret')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeTab === 'fret'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              FRET Spectroscopic Ruler
            </button>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition text-xs font-semibold"
            title="Reset default simulation parameters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* TAB 1: JABLONSKI DIAGRAM & PHOTOPHYSICAL MANIFOLD */}
      {activeTab === 'jablonski' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Controls Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-4 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
                <Sliders className="w-4 h-4 text-primary" />
                <span>Fluorophore & Rate Scaling</span>
              </h3>

              {/* Fluorophore Selector */}
              <div>
                <label className="text-xs font-medium text-on-surface-variant block mb-1">
                  Target Fluorophore
                </label>
                <select
                  value={selectedFluorId}
                  onChange={(e) => setSelectedFluorId(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg bg-surface-container border border-surface-container-high text-on-surface focus:outline-hidden focus:ring-1 focus:ring-primary"
                >
                  {CURATED_FLUOROPHORES.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} (λ_em = {f.emissionMaxNm} nm)
                    </option>
                  ))}
                </select>
              </div>

              {/* Radiative Rate kr Multiplier */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant">Radiative Rate (kr) Multiplier</span>
                  <span className="font-mono font-bold text-primary">{krScale.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={krScale}
                  onChange={(e) => setKrScale(parseFloat(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              {/* Internal Conversion kic Multiplier */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant">Internal Conversion (k_ic) Multiplier</span>
                  <span className="font-mono font-bold text-primary">{kicScale.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="5.0"
                  step="0.1"
                  value={kicScale}
                  onChange={(e) => setKicScale(parseFloat(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              {/* Intersystem Crossing kisc (Heavy Atom Effect) */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant">Intersystem Crossing (k_isc) Multiplier</span>
                  <span className="font-mono font-bold text-secondary">{kiscScale.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="30.0"
                  step="0.5"
                  value={kiscScale}
                  onChange={(e) => setKiscScale(parseFloat(e.target.value))}
                  className="w-full accent-secondary"
                />
                <span className="text-[10px] text-on-surface-variant/80 block mt-0.5">
                  Simulates external heavy atom effect (I⁻, Br⁻, organometallics)
                </span>
              </div>

              {/* Temperature */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant">Temperature (K)</span>
                  <span className="font-mono font-bold text-on-surface">{temperatureK.toFixed(1)} K</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="373"
                  step="5"
                  value={temperatureK}
                  onChange={(e) => setTemperatureK(parseFloat(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            </div>

            {/* Photophysical Description Card */}
            <div className="bg-primary-container/20 border border-primary/20 rounded-xl p-3 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-primary">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Photophysical Profile</span>
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                {selectedFluor.description}
              </p>
            </div>
          </div>

          {/* Jablonski Diagram & State Manifold (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Telemetry Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-3 shadow-xs">
                <span className="text-xs text-on-surface-variant block mb-1">Fluorescence Lifetime</span>
                <span className="font-mono text-base font-bold text-primary">
                  {jablonskiResult ? `${jablonskiResult.rates.fluorescenceLifetimeTau0Ns.toFixed(2)} ns` : '—'}
                </span>
                <span className="text-[10px] text-on-surface-variant/80 block mt-0.5">Singlet decay τ₀</span>
              </div>

              <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-3 shadow-xs">
                <span className="text-xs text-on-surface-variant block mb-1">Quantum Yield (Φ_F)</span>
                <span className="font-mono text-base font-bold text-secondary">
                  {jablonskiResult ? `${(jablonskiResult.rates.fluorescenceQuantumYieldPhiF * 100).toFixed(1)}%` : '—'}
                </span>
                <span className="text-[10px] text-on-surface-variant/80 block mt-0.5">Radiative efficiency</span>
              </div>

              <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-3 shadow-xs">
                <span className="text-xs text-on-surface-variant block mb-1">Triplet Yield (Φ_ISC)</span>
                <span className="font-mono text-base font-bold text-tertiary">
                  {jablonskiResult ? `${(jablonskiResult.rates.tripletYieldPhiIsc * 100).toFixed(1)}%` : '—'}
                </span>
                <span className="text-[10px] text-on-surface-variant/80 block mt-0.5">Intersystem crossing</span>
              </div>

              <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-3 shadow-xs">
                <span className="text-xs text-on-surface-variant block mb-1">Stokes Shift</span>
                <span className="font-mono text-base font-bold text-on-surface">
                  {selectedFluor.stokesShiftCmInv.toFixed(0)} cm⁻¹
                </span>
                <span className="text-[10px] text-on-surface-variant/80 block mt-0.5">
                  λ_abs {selectedFluor.absorptionMaxNm} → {selectedFluor.emissionMaxNm} nm
                </span>
              </div>
            </div>

            {/* Jablonski Electronic Manifold SVG */}
            <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  <span>Jablonski Energy State Diagram</span>
                </h3>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1 text-[#3b82f6]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]" /> Abs (hν)
                  </span>
                  <span className="flex items-center gap-1 text-[#10b981]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" /> Fluor (hν_F)
                  </span>
                  <span className="flex items-center gap-1 text-[#f59e0b]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" /> ISC (S₁→T₁)
                  </span>
                  <span className="flex items-center gap-1 text-[#ef4444]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" /> Phos (hν_P)
                  </span>
                </div>
              </div>

              {/* SVG Jablonski Manifold */}
              <div className="w-full overflow-x-auto flex justify-center py-2 bg-surface-container-low/30 rounded-lg">
                <svg viewBox="0 0 600 280" className="w-full max-w-[620px] h-auto select-none">
                  {/* Energy Axis */}
                  <line x1="45" y1="240" x2="45" y2="35" stroke="currentColor" className="text-on-surface-variant/40" strokeWidth="1.5" />
                  <polygon points="45,28 42,38 48,38" className="fill-on-surface-variant" />
                  <text x="32" y="32" className="fill-on-surface-variant text-[10px]" textAnchor="end">Energy (eV)</text>

                  {/* S0 Energy Level (Ground) */}
                  <line x1="80" y1="230" x2="280" y2="230" stroke="#0ea5e9" strokeWidth="3" />
                  <text x="85" y="222" className="fill-on-surface text-[11px] font-bold">S₀ (Ground Singlet, 0.0 eV)</text>

                  {/* S1 Energy Level */}
                  <line x1="80" y1="120" x2="280" y2="120" stroke="#0ea5e9" strokeWidth="3" />
                  <text x="85" y="112" className="fill-on-surface text-[11px] font-bold">
                    S₁ ({selectedFluor.singletEnergyS1Ev.toFixed(2)} eV)
                  </text>

                  {/* S2 Energy Level */}
                  <line x1="80" y1="55" x2="280" y2="55" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="85" y="47" className="fill-on-surface-variant text-[10px]">S₂ (Franck-Condon)</text>

                  {/* T1 Triplet Energy Level */}
                  <line x1="360" y1="160" x2="540" y2="160" stroke="#f59e0b" strokeWidth="3" />
                  <text x="365" y="152" className="fill-[#f59e0b] text-[11px] font-bold">
                    T₁ (Triplet State, {selectedFluor.tripletEnergyT1Ev.toFixed(2)} eV)
                  </text>

                  {/* Absorption Arrow (S0 -> S2/S1) */}
                  <line x1="120" y1="230" x2="120" y2="58" stroke="#3b82f6" strokeWidth="2.5" />
                  <polygon points="120,55 116,65 124,65" fill="#3b82f6" />
                  <text x="110" y="145" textAnchor="end" className="fill-[#3b82f6] text-[10px] font-bold">Abs (hν)</text>

                  {/* Internal Conversion / Vibrational Relaxation (S2 -> S1) */}
                  <path d="M 120 58 Q 128 85, 135 118" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="2 2" />
                  <text x="140" y="85" className="fill-on-surface-variant text-[9px]">VR (Kasha)</text>

                  {/* Fluorescence Arrow (S1 -> S0) */}
                  <line x1="180" y1="120" x2="180" y2="225" stroke="#10b981" strokeWidth="2.5" />
                  <polygon points="180,230 176,220 184,220" fill="#10b981" />
                  <text x="190" y="175" className="fill-[#10b981] text-[10px] font-bold">
                    Fluor (k_r = {(jablonskiResult?.rates.radiativeKrSInv ?? 0).toExponential(1)})
                  </text>

                  {/* Internal Conversion (S1 -> S0 non-radiative) */}
                  <path d="M 230 120 Q 240 170, 245 225" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="250" y="165" className="fill-on-surface-variant text-[9px]">IC (k_ic)</text>

                  {/* Intersystem Crossing (S1 -> T1) */}
                  <path d="M 280 120 Q 320 135, 360 160" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 2" />
                  <polygon points="360,160 350,154 353,164" fill="#f59e0b" />
                  <text x="320" y="125" textAnchor="middle" className="fill-[#f59e0b] text-[10px] font-bold">ISC (k_isc)</text>

                  {/* Phosphorescence Arrow (T1 -> S0) */}
                  <line x1="450" y1="160" x2="450" y2="225" stroke="#ef4444" strokeWidth="2.5" />
                  <polygon points="450,230 446,220 454,220" fill="#ef4444" />
                  <text x="460" y="195" className="fill-[#ef4444] text-[10px] font-bold">Phos (hν_P)</text>
                </svg>
              </div>

              {/* Explanatory pedagogical text */}
              <div className="text-xs text-on-surface-variant p-3 bg-surface-container rounded-lg flex items-start gap-2">
                <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{jablonskiResult?.jablonski_summary}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STERN-VOLMER QUENCHING */}
      {activeTab === 'stern_volmer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Quenching Controls (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-4 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>Quencher & Concentrations</span>
              </h3>

              <div>
                <label className="text-xs font-medium text-on-surface-variant block mb-1">
                  Collisional Quencher
                </label>
                <select
                  value={selectedQuencherId}
                  onChange={(e) => setSelectedQuencherId(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg bg-surface-container border border-surface-container-high text-on-surface"
                >
                  {CURATED_QUENCHERS.map((q) => (
                    <option key={q.id} value={q.id}>
                      {q.name} ({q.quencherType})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant">Maximum Quencher Conc [Q]</span>
                  <span className="font-mono font-bold text-primary">{maxQuencherConcMM.toFixed(0)} mM</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="10"
                  value={maxQuencherConcMM}
                  onChange={(e) => setMaxQuencherConcMM(parseFloat(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              {/* Quencher Mechanism Card */}
              <div className="bg-surface-container p-3 rounded-lg text-xs space-y-1">
                <span className="font-bold text-on-surface block">{selectedQuencher.name}</span>
                <span className="text-on-surface-variant text-[11px] block">
                  Typical k_q: {selectedQuencher.typicalBimolecularKqMInvSInv.toExponential(2)} M⁻¹s⁻¹
                </span>
                <p className="text-on-surface-variant/90 text-[11px] leading-relaxed pt-1">
                  {selectedQuencher.description}
                </p>
              </div>
            </div>
          </div>

          {/* Stern-Volmer Plot (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span>Stern-Volmer Plot (F₀/F vs. [Q])</span>
                </h3>
                <span className="font-mono text-xs text-primary font-bold">
                  K_SV = {svResult?.sternVolmerConstantKsvMInv.toFixed(1)} M⁻¹
                </span>
              </div>

              {/* Live SVG Graph */}
              {svSvgData && (
                <div className="w-full overflow-x-auto flex justify-center py-2">
                  <svg viewBox={`0 0 ${svSvgData.width} ${svSvgData.height}`} className="w-full max-w-[580px] h-auto select-none">
                    {/* Axes */}
                    <line
                      x1={svSvgData.padding.left}
                      y1={svSvgData.padding.top + svSvgData.plotH}
                      x2={svSvgData.padding.left + svSvgData.plotW}
                      y2={svSvgData.padding.top + svSvgData.plotH}
                      stroke="currentColor"
                      className="text-on-surface-variant/40"
                      strokeWidth="1.5"
                    />
                    <line
                      x1={svSvgData.padding.left}
                      y1={svSvgData.padding.top}
                      x2={svSvgData.padding.left}
                      y2={svSvgData.padding.top + svSvgData.plotH}
                      stroke="currentColor"
                      className="text-on-surface-variant/40"
                      strokeWidth="1.5"
                    />

                    {/* Linear Regression Line */}
                    <path d={svSvgData.pathLine} fill="none" stroke="#0ea5e9" strokeWidth="2.5" />

                    {/* Data Points */}
                    {svSvgData.pts.map((pt, i) => (
                      <circle
                        key={i}
                        cx={svSvgData.toX(pt.quencherConcentrationMM)}
                        cy={svSvgData.toY(pt.f0OverF)}
                        r="4.5"
                        fill="#0ea5e9"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                    ))}

                    {/* Labels */}
                    <text
                      x={svSvgData.padding.left + svSvgData.plotW / 2}
                      y={svSvgData.height - 10}
                      textAnchor="middle"
                      className="fill-on-surface-variant text-[11px]"
                    >
                      Quencher Concentration [Q] (mM)
                    </text>
                    <text
                      x={-(svSvgData.padding.top + svSvgData.plotH / 2)}
                      y={18}
                      transform="rotate(-90)"
                      textAnchor="middle"
                      className="fill-on-surface-variant text-[11px]"
                    >
                      F₀ / F (Intensity Ratio)
                    </text>
                  </svg>
                </div>
              )}

              {/* Quenching Telemetry HUD */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-surface-container-low p-2.5 rounded-lg">
                  <span className="text-[10px] text-on-surface-variant block">Stern-Volmer K_SV</span>
                  <span className="font-mono text-sm font-bold text-on-surface">
                    {svResult?.sternVolmerConstantKsvMInv.toFixed(1)} M⁻¹
                  </span>
                </div>
                <div className="bg-surface-container-low p-2.5 rounded-lg">
                  <span className="text-[10px] text-on-surface-variant block">Bimolecular Rate (k_q)</span>
                  <span className="font-mono text-sm font-bold text-primary">
                    {svResult?.bimolecularQuenchingRateKqMInvSInv.toExponential(2)} M⁻¹s⁻¹
                  </span>
                </div>
                <div className="bg-surface-container-low p-2.5 rounded-lg col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-on-surface-variant block">Diffusion-Limited</span>
                  <span className="font-mono text-sm font-bold text-secondary">
                    {svResult?.isDiffusionLimited ? 'Yes (~10¹⁰ M⁻¹s⁻¹)' : 'No (Sub-diffusion)'}
                  </span>
                </div>
              </div>

              <div className="text-xs text-on-surface-variant p-3 bg-surface-container rounded-lg">
                {svResult?.explanation}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FRET SPECTROSCOPIC NANORULER */}
      {activeTab === 'fret' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* FRET Controls (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-4 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
                <Compass className="w-4 h-4 text-primary" />
                <span>FRET Donor-Acceptor Parameters</span>
              </h3>

              <div>
                <label className="text-xs font-medium text-on-surface-variant block mb-1">
                  FRET Pair System
                </label>
                <select
                  value={selectedFretPairId}
                  onChange={(e) => setSelectedFretPairId(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg bg-surface-container border border-surface-container-high text-on-surface"
                >
                  {CURATED_FRET_PAIRS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (R₀ = {p.forsterDistanceR0Angstrom} Å)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface-variant">Inter-Fluorophore Distance (r)</span>
                  <span className="font-mono font-bold text-secondary">{currentDistanceAngstrom.toFixed(1)} Å</span>
                </div>
                <input
                  type="range"
                  min="20.0"
                  max="90.0"
                  step="0.5"
                  value={currentDistanceAngstrom}
                  onChange={(e) => setCurrentDistanceAngstrom(parseFloat(e.target.value))}
                  className="w-full accent-secondary"
                />
                <span className="text-[10px] text-on-surface-variant/80 block mt-0.5">
                  Förster critical distance R₀ = {fretResult?.forsterDistanceR0Angstrom.toFixed(1)} Å
                </span>
              </div>

              {/* FRET Visual Nanoruler Graphic */}
              <div className="bg-surface-container p-4 rounded-lg text-center space-y-3">
                <span className="text-[11px] font-bold text-on-surface block">Nanoruler Proximity Gauge</span>
                <div className="flex items-center justify-between px-4 py-2 bg-surface-container-low rounded-md">
                  {/* Donor */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#06b6d4] flex items-center justify-center text-white text-[10px] font-bold shadow-md">
                      D*
                    </div>
                    <span className="text-[10px] font-mono text-on-surface-variant mt-1">Donor</span>
                  </div>

                  {/* Energy Transfer Beam */}
                  <div className="flex-1 px-3 flex flex-col items-center">
                    <span className="text-[10px] font-mono text-secondary font-bold">
                      {fretResult ? `${(fretResult.efficiencyAtCurrentDistance * 100).toFixed(1)}% FRET` : '—'}
                    </span>
                    <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden my-1">
                      <div
                        className="h-full bg-gradient-to-r from-[#06b6d4] to-[#f59e0b] transition-all"
                        style={{ width: `${(fretResult?.efficiencyAtCurrentDistance ?? 0) * 100}%` }}
                      />
                    </div>
                    <span className="text-[9px] font-mono text-on-surface-variant/80">
                      r = {currentDistanceAngstrom.toFixed(1)} Å
                    </span>
                  </div>

                  {/* Acceptor */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#f59e0b] flex items-center justify-center text-white text-[10px] font-bold shadow-md">
                      A
                    </div>
                    <span className="text-[10px] font-mono text-on-surface-variant mt-1">Acceptor</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FRET 1/r^6 Efficiency Curve (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span>Förster Distance-Dependent Transfer Efficiency (E = R₀⁶ / (R₀⁶ + r⁶))</span>
                </h3>
                <span className="font-mono text-xs text-secondary font-bold">
                  E = {fretResult ? `${(fretResult.efficiencyAtCurrentDistance * 100).toFixed(1)}%` : '—'}
                </span>
              </div>

              {/* FRET SVG Curve */}
              {fretSvgData && (
                <div className="w-full overflow-x-auto flex justify-center py-2">
                  <svg viewBox={`0 0 ${fretSvgData.width} ${fretSvgData.height}`} className="w-full max-w-[580px] h-auto select-none">
                    {/* 50% Threshold Line */}
                    <line
                      x1={fretSvgData.padding.left}
                      y1={fretSvgData.toY(0.5)}
                      x2={fretSvgData.padding.left + fretSvgData.plotW}
                      y2={fretSvgData.toY(0.5)}
                      stroke="#f59e0b"
                      strokeDasharray="4 4"
                      strokeWidth="1.5"
                    />
                    <text
                      x={fretSvgData.padding.left + fretSvgData.plotW - 5}
                      y={fretSvgData.toY(0.5) - 6}
                      textAnchor="end"
                      className="fill-[#f59e0b] text-[10px] font-bold"
                    >
                      E = 50% (at R₀)
                    </text>

                    {/* Axes */}
                    <line
                      x1={fretSvgData.padding.left}
                      y1={fretSvgData.padding.top + fretSvgData.plotH}
                      x2={fretSvgData.padding.left + fretSvgData.plotW}
                      y2={fretSvgData.padding.top + fretSvgData.plotH}
                      stroke="currentColor"
                      className="text-on-surface-variant/40"
                      strokeWidth="1.5"
                    />
                    <line
                      x1={fretSvgData.padding.left}
                      y1={fretSvgData.padding.top}
                      x2={fretSvgData.padding.left}
                      y2={fretSvgData.padding.top + fretSvgData.plotH}
                      stroke="currentColor"
                      className="text-on-surface-variant/40"
                      strokeWidth="1.5"
                    />

                    {/* Curve */}
                    <path d={fretSvgData.pathCurve} fill="none" stroke="#6366f1" strokeWidth="3" />

                    {/* Current Operating Distance Marker */}
                    <circle
                      cx={fretSvgData.curX}
                      cy={fretSvgData.curY}
                      r="6"
                      fill="#f59e0b"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />

                    {/* Labels */}
                    <text
                      x={fretSvgData.padding.left + fretSvgData.plotW / 2}
                      y={fretSvgData.height - 10}
                      textAnchor="middle"
                      className="fill-on-surface-variant text-[11px]"
                    >
                      Distance r (Å)
                    </text>
                    <text
                      x={-(fretSvgData.padding.top + fretSvgData.plotH / 2)}
                      y={18}
                      transform="rotate(-90)"
                      textAnchor="middle"
                      className="fill-on-surface-variant text-[11px]"
                    >
                      FRET Efficiency (E)
                    </text>
                  </svg>
                </div>
              )}

              <div className="text-xs text-on-surface-variant p-3 bg-surface-container rounded-lg">
                {fretResult?.r0ValidationSummary}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
