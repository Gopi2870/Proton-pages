import React, { useState, useEffect } from 'react';
import {
  CoordinationCftService,
  FALLBACK_METALS,
  FALLBACK_LIGANDS,
  FALLBACK_PRESETS,
} from '../../../services/coordinationCftService';
import {
  TransitionMetalSummary,
  LigandSummary,
  ComplexPresetSummary,
  CoordinationAnalysisResponse,
} from '../../../types/coordinationCft';
import {
  Layers,
  Sparkles,
  Zap,
  Compass,
  Eye,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Info,
} from 'lucide-react';

export const CoordinationCftWorkstation: React.FC = () => {
  const [metals, setMetals] = useState<TransitionMetalSummary[]>(FALLBACK_METALS);
  const [ligands, setLigands] = useState<LigandSummary[]>(FALLBACK_LIGANDS);
  const [presets, setPresets] = useState<ComplexPresetSummary[]>(FALLBACK_PRESETS);

  const [selectedMetalSymbol, setSelectedMetalSymbol] = useState<string>('Fe');
  const [selectedOxidationState, setSelectedOxidationState] = useState<number>(2);
  const [selectedLigandId, setSelectedLigandId] = useState<string>('cn');
  const [selectedGeometry, setSelectedGeometry] = useState<string>('octahedral');
  const [forcedSpinState, setForcedSpinState] = useState<string>('');

  const [analysisResult, setAnalysisResult] = useState<CoordinationAnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load catalogs on mount
  useEffect(() => {
    CoordinationCftService.getMetals().then(setMetals);
    CoordinationCftService.getLigands().then(setLigands);
    CoordinationCftService.getPresets().then(setPresets);
  }, []);

  // Compute analysis whenever selections change
  useEffect(() => {
    handleAnalyze();
  }, [selectedMetalSymbol, selectedOxidationState, selectedLigandId, selectedGeometry, forcedSpinState]);

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const res = await CoordinationCftService.analyzeComplex({
        metal_symbol: selectedMetalSymbol,
        oxidation_state: selectedOxidationState,
        ligand_id: selectedLigandId,
        geometry: selectedGeometry,
        forced_spin_state: forcedSpinState ? forcedSpinState : undefined,
      });
      setAnalysisResult(res);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPreset = (preset: ComplexPresetSummary) => {
    if (preset.id === 'fe_cn6_4') {
      setSelectedMetalSymbol('Fe');
      setSelectedOxidationState(2);
      setSelectedLigandId('cn');
      setSelectedGeometry('octahedral');
      setForcedSpinState('');
    } else if (preset.id === 'fe_h2o6_2') {
      setSelectedMetalSymbol('Fe');
      setSelectedOxidationState(2);
      setSelectedLigandId('h2o');
      setSelectedGeometry('octahedral');
      setForcedSpinState('');
    } else if (preset.id === 'co_nh36_3') {
      setSelectedMetalSymbol('Co');
      setSelectedOxidationState(3);
      setSelectedLigandId('nh3');
      setSelectedGeometry('octahedral');
      setForcedSpinState('');
    } else if (preset.id === 'cu_h2o6_2') {
      setSelectedMetalSymbol('Cu');
      setSelectedOxidationState(2);
      setSelectedLigandId('h2o');
      setSelectedGeometry('octahedral');
      setForcedSpinState('');
    } else if (preset.id === 'ni_cl4_2') {
      setSelectedMetalSymbol('Ni');
      setSelectedOxidationState(2);
      setSelectedLigandId('cl');
      setSelectedGeometry('tetrahedral');
      setForcedSpinState('');
    } else if (preset.id === 'pt_nh32_cl2') {
      setSelectedMetalSymbol('Pt');
      setSelectedOxidationState(2);
      setSelectedLigandId('cl');
      setSelectedGeometry('square_planar');
      setForcedSpinState('');
    }
  };

  return (
    <div className="bg-surface-container-lowest border border-surface-container-low rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-surface-container-low gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[24px]">hub</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold font-headline-sm text-on-surface">
                Coordination Chemistry & Crystal Field Theory (CFT)
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-[11px] font-semibold">
                PR #039 Workstation
              </span>
            </div>
            <p className="text-body-sm text-on-surface-variant">
              d-orbital splitting manifold, Crystal Field Stabilization Energy (CFSE), High/Low-Spin states, Jahn-Teller effect, and optical color.
            </p>
          </div>
        </div>

        {/* Preset Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-on-surface-variant">Presets:</span>
          {presets.slice(0, 4).map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelectPreset(p)}
              className="px-2.5 py-1 rounded-lg text-xs font-code-sm font-semibold border border-surface-container-high bg-surface-container-low hover:bg-surface-container text-on-surface transition flex items-center gap-1.5"
            >
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: p.perceived_color_hex }}
              />
              <span>{p.formula}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Controls & Telemetry, Right Energy Diagram & Sphere */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Parameter Selectors & Telemetry (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Controls Box */}
          <div className="bg-surface-container-low/40 border border-surface-container rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold font-headline-sm text-on-surface flex items-center gap-2">
              <Compass className="w-4 h-4 text-primary" />
              <span>Complex Configuration</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {/* Metal Picker */}
              <div>
                <label className="text-xs font-semibold text-on-surface">Transition Metal</label>
                <select
                  value={selectedMetalSymbol}
                  onChange={(e) => setSelectedMetalSymbol(e.target.value)}
                  className="w-full mt-1 bg-surface-container-low border border-surface-container-high rounded-xl px-3 py-2 text-xs font-semibold text-on-surface focus:outline-none focus:border-primary"
                >
                  {Array.from(new Set(metals.map((m) => m.symbol))).map((sym) => (
                    <option key={sym} value={sym}>
                      {sym} — {metals.find((m) => m.symbol === sym)?.name.split('(')[0]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Oxidation State */}
              <div>
                <label className="text-xs font-semibold text-on-surface">Oxidation State</label>
                <select
                  value={selectedOxidationState}
                  onChange={(e) => setSelectedOxidationState(parseInt(e.target.value))}
                  className="w-full mt-1 bg-surface-container-low border border-surface-container-high rounded-xl px-3 py-2 text-xs font-semibold text-on-surface focus:outline-none focus:border-primary"
                >
                  <option value={2}>+2 (divalent)</option>
                  <option value={3}>+3 (trivalent)</option>
                </select>
              </div>
            </div>

            {/* Ligand Picker from Spectrochemical Series */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-on-surface">
                <span>Ligand (Spectrochemical Series)</span>
                <span className="text-[10px] text-on-surface-variant font-code-sm">
                  Weak I⁻ → Strong CO
                </span>
              </div>
              <select
                value={selectedLigandId}
                onChange={(e) => setSelectedLigandId(e.target.value)}
                className="w-full mt-1 bg-surface-container-low border border-surface-container-high rounded-xl px-3 py-2 text-xs font-semibold text-on-surface focus:outline-none focus:border-primary"
              >
                {ligands.map((lig) => (
                  <option key={lig.id} value={lig.id}>
                    {lig.formula} — {lig.name} ({lig.field_strength.replace('_', ' ')})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Geometry */}
              <div>
                <label className="text-xs font-semibold text-on-surface">Geometry</label>
                <select
                  value={selectedGeometry}
                  onChange={(e) => setSelectedGeometry(e.target.value)}
                  className="w-full mt-1 bg-surface-container-low border border-surface-container-high rounded-xl px-3 py-2 text-xs font-semibold text-on-surface focus:outline-none focus:border-primary"
                >
                  <option value="octahedral">Octahedral (Oh, CN=6)</option>
                  <option value="tetrahedral">Tetrahedral (Td, CN=4)</option>
                  <option value="square_planar">Square Planar (D4h, CN=4)</option>
                </select>
              </div>

              {/* Spin State Override */}
              <div>
                <label className="text-xs font-semibold text-on-surface">Spin State Mode</label>
                <select
                  value={forcedSpinState}
                  onChange={(e) => setForcedSpinState(e.target.value)}
                  className="w-full mt-1 bg-surface-container-low border border-surface-container-high rounded-xl px-3 py-2 text-xs font-semibold text-on-surface focus:outline-none focus:border-primary"
                >
                  <option value="">Auto (Δ vs P)</option>
                  <option value="high_spin">Force High-Spin</option>
                  <option value="low_spin">Force Low-Spin</option>
                </select>
              </div>
            </div>
          </div>

          {/* Telemetry HUD Cards */}
          {analysisResult && (
            <div className="space-y-3">
              <div className="bg-surface-container-low/40 border border-surface-container rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
                  <span className="text-xs font-bold text-on-surface uppercase font-code-sm">
                    {analysisResult.formula}
                  </span>
                  <span className="text-xs font-bold text-primary">
                    d^{analysisResult.metal.d_electron_count} Configuration
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="bg-surface-container-lowest border border-surface-container-low p-2 rounded-xl">
                    <span className="text-[10px] text-on-surface-variant font-semibold">CFSE (Energy)</span>
                    <div className="text-sm font-extrabold text-primary mt-0.5">
                      {analysisResult.cfse_delta_units > 0 ? '+' : ''}{analysisResult.cfse_delta_units} Δ
                    </div>
                    <div className="text-[10px] text-outline font-code-sm mt-0.5">
                      {analysisResult.cfse_kj_mol > 0 ? '+' : ''}{analysisResult.cfse_kj_mol} kJ/mol
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest border border-surface-container-low p-2 rounded-xl">
                    <span className="text-[10px] text-on-surface-variant font-semibold">Splitting Δ</span>
                    <div className="text-sm font-extrabold text-on-surface mt-0.5">
                      {analysisResult.delta_cm_inv.toLocaleString()} cm⁻¹
                    </div>
                    <div className="text-[10px] text-outline font-code-sm mt-0.5">
                      P = {analysisResult.pairing_energy_cm_inv.toLocaleString()} cm⁻¹
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest border border-surface-container-low p-2 rounded-xl">
                    <span className="text-[10px] text-on-surface-variant font-semibold">Magnetic Moment μ</span>
                    <div className="text-sm font-extrabold text-amber-600 mt-0.5">
                      {analysisResult.magnetic_moment_bm} μB
                    </div>
                    <div className="text-[10px] text-outline font-code-sm mt-0.5">
                      {analysisResult.unpaired_electrons} unpaired e⁻
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest border border-surface-container-low p-2 rounded-xl">
                    <span className="text-[10px] text-on-surface-variant font-semibold">Magnetic State</span>
                    <div
                      className={`text-sm font-extrabold mt-0.5 ${
                        analysisResult.is_paramagnetic ? 'text-emerald-600' : 'text-blue-600'
                      }`}
                    >
                      {analysisResult.is_paramagnetic ? 'Paramagnetic' : 'Diamagnetic'}
                    </div>
                    <div className="text-[10px] text-outline font-code-sm mt-0.5">
                      {analysisResult.spin_state.replace('_', ' ').toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Jahn Teller Badge */}
                <div className="flex items-center justify-between bg-surface-container-lowest border border-surface-container-low px-3 py-2 rounded-xl text-xs">
                  <span className="font-semibold text-on-surface">Jahn-Teller Distortion:</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                      analysisResult.jahn_teller_distortion === 'strong_elongation'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : analysisResult.jahn_teller_distortion === 'weak_compression'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {analysisResult.jahn_teller_distortion.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: d-Orbital Splitting Diagram & Coordination Sphere (7 cols) */}
        <div className="lg:col-span-7 bg-surface-container-low/40 border border-surface-container rounded-2xl p-5 space-y-5">
          {/* Top Bar with Perceived Color Swatch */}
          {analysisResult && (
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-on-surface">Optical Appearance:</span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full border border-surface-container-high shadow-xs"
                    style={{ backgroundColor: analysisResult.perceived_color_hex }}
                  />
                  <span className="text-xs font-semibold text-on-surface">
                    {analysisResult.perceived_color_name}
                  </span>
                </div>
              </div>

              {analysisResult.absorption_wavelength_nm && (
                <div className="text-xs font-code-sm text-outline">
                  λ_abs ≈ {analysisResult.absorption_wavelength_nm} nm
                </div>
              )}
            </div>
          )}

          {/* Crystal Field Splitting Energy Diagram */}
          <div className="bg-surface-container-lowest border border-surface-container-low rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center text-xs font-bold text-on-surface">
              <span>Crystal Field d-Orbital Energy Diagram</span>
              <span className="text-primary font-code-sm">
                Symmetry: {selectedGeometry.toUpperCase()}
              </span>
            </div>

            {/* Orbital Level Visualization */}
            <div className="relative h-64 border-l-2 border-surface-container-high ml-6 pl-4 flex flex-col justify-between py-2">
              {/* Energy Axis Arrow */}
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold text-outline uppercase tracking-wider">
                Energy (Δ)
              </div>

              {analysisResult?.orbital_levels.slice().reverse().map((level, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-code-sm">
                    <span className="font-bold text-primary">
                      {level.label} ({level.orbitals.join(', ')})
                    </span>
                    <span className="text-on-surface-variant font-semibold">
                      {level.energy_delta > 0 ? '+' : ''}{level.energy_delta} Δ ({level.energy_cm_inv} cm⁻¹)
                    </span>
                  </div>

                  {/* Orbital Boxes with Electron Arrows */}
                  <div className="flex items-center gap-2">
                    {level.orbitals.map((orbName, oIdx) => {
                      // Determine electrons in this specific orbital
                      const tot = level.electron_count;
                      const deg = level.degeneracy;
                      // Hund's rule: 1 in each first, then pairs
                      const hasFirst = tot > oIdx;
                      const hasSecond = tot > deg + oIdx;

                      return (
                        <div
                          key={oIdx}
                          className="w-12 h-12 rounded-lg border-2 border-primary/40 bg-surface-container-low flex items-center justify-center gap-1 shadow-xs"
                        >
                          {hasFirst && (
                            <span className="text-blue-600 font-extrabold text-sm select-none">
                              ↑
                            </span>
                          )}
                          {hasSecond && (
                            <span className="text-[#D47942] font-extrabold text-sm select-none">
                              ↓
                            </span>
                          )}
                          {!hasFirst && (
                            <span className="text-surface-container-high text-xs select-none">
                              —
                            </span>
                          )}
                        </div>
                      );
                    })}

                    <span className="text-xs font-code-sm text-outline ml-3">
                      {level.electron_count} e⁻ ({level.unpaired_electrons} unpaired)
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Barycenter Legend */}
            <div className="text-[11px] text-outline text-center border-t border-surface-container-low pt-2">
              Barycenter (Spherical Free Ion Reference Energy = 0 Δ)
            </div>
          </div>

          {/* Pedagogical Commentary */}
          {analysisResult && (
            <div className="p-4 rounded-xl bg-surface-container-low/60 border border-surface-container text-xs text-on-surface-variant leading-relaxed">
              <span className="font-bold text-on-surface">Scientific Insights: </span>
              {analysisResult.pedagogical_notes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
