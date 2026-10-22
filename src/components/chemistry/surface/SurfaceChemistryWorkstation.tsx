import React, { useState, useEffect, useMemo } from 'react';
import {
  Layers,
  Sparkles,
  RotateCcw,
  Info,
  BarChart2,
  Activity,
  Flame,
  Scale,
  Maximize2,
  CheckCircle2,
} from 'lucide-react';
import {
  surfaceChemistryService,
  FALLBACK_MATERIALS,
} from '../../../services/surfaceChemistryService';
import {
  MaterialSummary,
  BetCalculationResponse,
  IsothermComparisonResponse,
  CatalysisSimulationResponse,
} from '../../../types/surfaceChemistry';

export const SurfaceChemistryWorkstation: React.FC = () => {
  const [activeSubMode, setActiveSubMode] = useState<'bet' | 'catalysis'>('bet');
  const [materials, setMaterials] = useState<MaterialSummary[]>([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('mcm_41');
  const [sampleMass, setSampleMass] = useState<number>(1.0);
  const [crossSection, setCrossSection] = useState<number>(0.162);

  // Catalysis parameters
  const [rateConstantK, setRateConstantK] = useState<number>(1.5e-3);
  const [adsorptionKa, setAdsorptionKa] = useState<number>(0.08);
  const [adsorptionKb, setAdsorptionKb] = useState<number>(0.02);
  const [fixedPressureB, setFixedPressureB] = useState<number>(20.0);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [betResult, setBetResult] = useState<BetCalculationResponse | null>(null);
  const [isothermResult, setIsothermResult] = useState<IsothermComparisonResponse | null>(null);
  const [catalysisResult, setCatalysisResult] = useState<CatalysisSimulationResponse | null>(null);

  // Load materials catalog
  useEffect(() => {
    surfaceChemistryService.getMaterials().then((list) => {
      if (list && list.length > 0) setMaterials(list);
    });
  }, []);

  // Run BET and Isotherm calculations when material changes
  useEffect(() => {
    const runAnalysis = async () => {
      setIsLoading(true);
      try {
        const [bRes, iRes] = await Promise.all([
          surfaceChemistryService.calculateBet({
            material_id: selectedMaterialId,
            sample_mass_g: sampleMass,
            adsorbate_cross_section_nm2: crossSection,
          }),
          surfaceChemistryService.compareIsotherms(selectedMaterialId),
        ]);
        setBetResult(bRes);
        setIsothermResult(iRes);
      } catch (err) {
        console.error('BET analysis error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    runAnalysis();
  }, [selectedMaterialId, sampleMass, crossSection]);

  // Run catalysis simulation
  useEffect(() => {
    const runCatalysis = async () => {
      try {
        const cRes = await surfaceChemistryService.simulateCatalysis({
          mechanism: 'both',
          rate_constant_k: rateConstantK,
          adsorption_constant_ka: adsorptionKa,
          adsorption_constant_kb: adsorptionKb,
          fixed_partial_pressure_b_kpa: fixedPressureB,
          max_pressure_a_kpa: 100.0,
          points_count: 50,
        });
        setCatalysisResult(cRes);
      } catch (err) {
        console.error('Catalysis error:', err);
      }
    };
    runCatalysis();
  }, [rateConstantK, adsorptionKa, adsorptionKb, fixedPressureB]);

  const activeMaterial = FALLBACK_MATERIALS[selectedMaterialId];

  // SVG dimensions for plots
  const svgWidth = 480;
  const svgHeight = 260;
  const pad = { top: 20, right: 25, bottom: 40, left: 55 };
  const plotW = svgWidth - pad.left - pad.right;
  const plotH = svgHeight - pad.top - pad.bottom;

  // Adsorption Isotherm SVG path
  const isothermSvg = useMemo(() => {
    if (!isothermResult || isothermResult.experimental_points.length === 0) return null;
    const pts = isothermResult.experimental_points;
    const maxV = Math.max(...pts.map((p) => p.volume_adsorbed), 100);

    const getX = (x: number) => pad.left + (x / 1.0) * plotW;
    const getY = (v: number) => pad.top + plotH - (v / maxV) * plotH;

    let expD = '';
    pts.forEach((p, i) => {
      const x = getX(p.relative_pressure);
      const y = getY(p.volume_adsorbed);
      expD += i === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    });

    return { maxV, getX, getY, expD };
  }, [isothermResult]);

  // BET Linear Transform SVG path
  const betLinearSvg = useMemo(() => {
    if (!betResult || betResult.linear_plot_points.length === 0) return null;
    const pts = betResult.linear_plot_points.filter((p) => p.is_in_bet_range);
    if (pts.length < 2) return null;

    const minX = 0.0;
    const maxX = 0.4;
    const maxY = Math.max(...pts.map((p) => p.bet_transform_y)) * 1.25 || 0.003;

    const getX = (x: number) => pad.left + ((x - minX) / (maxX - minX)) * plotW;
    const getY = (y: number) => pad.top + plotH - (y / maxY) * plotH;

    const slope = betResult.bet_fit.slope;
    const intercept = betResult.bet_fit.intercept;

    const x1 = 0.02;
    const y1 = slope * x1 + intercept;
    const x2 = 0.38;
    const y2 = slope * x2 + intercept;

    const regLineD = `M ${getX(x1).toFixed(1)} ${getY(y1).toFixed(1)} L ${getX(x2).toFixed(1)} ${getY(y2).toFixed(1)}`;

    return { maxX, maxY, getX, getY, regLineD };
  }, [betResult]);

  // Catalysis Kinetics SVG path
  const catalysisSvg = useMemo(() => {
    if (!catalysisResult || catalysisResult.kinetics_curve.length === 0) return null;
    const pts = catalysisResult.kinetics_curve;
    const maxRate = Math.max(...pts.map((p) => Math.max(p.rate_langmuir_hinshelwood, p.rate_eley_rideal)), 1e-6);
    const maxP = 100.0;

    const getX = (p: number) => pad.left + (p / maxP) * plotW;
    const getY = (r: number) => pad.top + plotH - (r / maxRate) * plotH;

    let lhD = '';
    let erD = '';
    pts.forEach((pt, i) => {
      const x = getX(pt.partial_pressure_a_kpa);
      const yLh = getY(pt.rate_langmuir_hinshelwood);
      const yEr = getY(pt.rate_eley_rideal);

      lhD += i === 0 ? `M ${x.toFixed(1)} ${yLh.toFixed(1)}` : ` L ${x.toFixed(1)} ${yLh.toFixed(1)}`;
      erD += i === 0 ? `M ${x.toFixed(1)} ${yEr.toFixed(1)}` : ` L ${x.toFixed(1)} ${yEr.toFixed(1)}`;
    });

    return { maxRate, maxP, getX, getY, lhD, erD };
  }, [catalysisResult]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-low border border-surface-container">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
              PR #041 Scientific Workstation
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
              Multi-Point BET & Rouquerol Criteria
            </span>
          </div>
          <h2 className="text-display-xs font-bold text-on-surface">
            Surface Chemistry, Heterogeneous Catalysis & Adsorption
          </h2>
          <p className="text-body-sm text-on-surface-variant max-w-2xl mt-1">
            Calculate specific surface areas ($S_{'{'}BET{'}'}$), monolayer capacities, and model Langmuir-Hinshelwood catalytic kinetics with competitive self-poisoning.
          </p>
        </div>

        {/* Sub-mode Toggles */}
        <div className="flex rounded-xl bg-surface-container border border-surface-container-high p-1 shrink-0">
          <button
            onClick={() => setActiveSubMode('bet')}
            className={`px-4 py-2 text-label-sm font-bold rounded-lg transition ${
              activeSubMode === 'bet'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            BET & Isotherms
          </button>
          <button
            onClick={() => setActiveSubMode('catalysis')}
            className={`px-4 py-2 text-label-sm font-bold rounded-lg transition ${
              activeSubMode === 'catalysis'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Catalytic Kinetics
          </button>
        </div>
      </div>

      {activeSubMode === 'bet' ? (
        <>
          {/* Controls Panel */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-surface-container-low border border-surface-container">
            <div>
              <label className="text-[12px] font-semibold text-on-surface-variant mb-1.5 block">
                Porous Adsorbent Material
              </label>
              <select
                value={selectedMaterialId}
                onChange={(e) => setSelectedMaterialId(e.target.value)}
                className="w-full bg-surface-container border border-surface-container-high rounded-xl px-3 py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary font-medium"
              >
                {(materials.length > 0 ? materials : Object.values(FALLBACK_MATERIALS)).map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-on-surface-variant mb-1.5 block">
                Sample Dry Mass (g)
              </label>
              <input
                type="number"
                step="0.05"
                min="0.01"
                max="10.0"
                value={sampleMass}
                onChange={(e) => setSampleMass(parseFloat(e.target.value) || 1.0)}
                className="w-full bg-surface-container border border-surface-container-high rounded-xl px-3 py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-[12px] font-semibold text-on-surface-variant mb-1.5 block">
                Adsorbate Cross Section σ (nm²)
              </label>
              <input
                type="number"
                step="0.005"
                min="0.05"
                max="0.5"
                value={crossSection}
                onChange={(e) => setCrossSection(parseFloat(e.target.value) || 0.162)}
                className="w-full bg-surface-container border border-surface-container-high rounded-xl px-3 py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary font-mono"
              />
            </div>

            <div className="flex flex-col justify-end">
              <div className="p-2.5 rounded-xl bg-surface-container border border-surface-container-high text-[11px] text-on-surface-variant">
                <span className="font-bold text-primary block">IUPAC Classification:</span>
                {activeMaterial?.isotherm_type} (
                {activeMaterial?.isotherm_type === 'Type I'
                  ? 'Microporous Rouquerol range 0.01-0.15'
                  : 'Mesoporous BET range 0.05-0.35'}
                )
              </div>
            </div>
          </div>

          {/* Key BET Physical Properties HUD */}
          {betResult && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container">
                <div className="text-[11px] font-bold text-on-surface-variant">BET Specific Surface Area</div>
                <div className="text-display-xs font-bold text-primary mt-1">
                  {betResult.bet_fit.specific_surface_area_m2_g} <span className="text-body-sm font-normal text-on-surface-variant">m²/g</span>
                </div>
                <div className="text-[10px] text-on-surface-variant mt-1">
                  Lit: ~{activeMaterial?.literature_bet_surface_area_m2_g} m²/g
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container">
                <div className="text-[11px] font-bold text-on-surface-variant">Monolayer Capacity (V_m)</div>
                <div className="text-display-xs font-bold text-tertiary mt-1">
                  {betResult.bet_fit.monolayer_capacity_vm} <span className="text-body-sm font-normal text-on-surface-variant">cm³(STP)/g</span>
                </div>
                <div className="text-[10px] text-on-surface-variant mt-1">
                  V_m = 1 / (slope + intercept)
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container">
                <div className="text-[11px] font-bold text-on-surface-variant">BET Parameter (C)</div>
                <div className="text-display-xs font-bold text-amber-600 dark:text-amber-400 mt-1">
                  {betResult.bet_fit.c_parameter}
                </div>
                <div className="text-[10px] text-on-surface-variant mt-1">
                  {betResult.bet_fit.is_c_positive ? 'C > 0 (Physically Valid)' : 'C < 0 (Unphysical)'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container">
                <div className="text-[11px] font-bold text-on-surface-variant">Regression Quality (R²)</div>
                <div className="text-display-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                  {betResult.bet_fit.r_squared}
                </div>
                <div className="text-[10px] text-on-surface-variant mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  {betResult.bet_fit.is_valid_bet_range ? 'Meets IUPAC Criteria' : 'Sub-optimal range'}
                </div>
              </div>
            </div>
          )}

          {/* Dual Charts: Adsorption Isotherm & BET Linear Transform */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Physisorption Isotherm Plot */}
            <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-on-surface">Adsorption Isotherm V(P/P₀)</h3>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-surface-container-high text-on-surface">
                  N₂ at 77.35 K
                </span>
              </div>

              {isothermSvg && (
                <div className="relative w-full overflow-x-auto">
                  <svg
                    viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                    className="w-full h-auto bg-surface-container-lowest rounded-xl border border-surface-container"
                  >
                    {/* Grid */}
                    {[0.25, 0.5, 0.75, 1.0].map((frac) => {
                      const y = pad.top + plotH - frac * plotH;
                      return (
                        <g key={frac}>
                          <line
                            x1={pad.left}
                            y1={y}
                            x2={pad.left + plotW}
                            y2={y}
                            stroke="#8B572A"
                            strokeOpacity="0.15"
                            strokeDasharray="4 4"
                          />
                          <text
                            x={pad.left - 8}
                            y={y + 4}
                            textAnchor="end"
                            fontSize="10"
                            fill="#8B572A"
                            fontFamily="monospace"
                          >
                            {(isothermSvg.maxV * frac).toFixed(0)}
                          </text>
                        </g>
                      );
                    })}

                    {/* Axes */}
                    <line
                      x1={pad.left}
                      y1={pad.top + plotH}
                      x2={pad.left + plotW}
                      y2={pad.top + plotH}
                      stroke="#2C302E"
                      strokeWidth="1.5"
                    />
                    <line
                      x1={pad.left}
                      y1={pad.top}
                      x2={pad.left}
                      y2={pad.top + plotH}
                      stroke="#2C302E"
                      strokeWidth="1.5"
                    />

                    {/* Experimental Curve */}
                    <path
                      d={isothermSvg.expD}
                      fill="none"
                      stroke="#D47942"
                      strokeWidth="2.5"
                    />

                    {/* Experimental Points */}
                    {isothermResult?.experimental_points.map((p, i) => (
                      <circle
                        key={i}
                        cx={isothermSvg.getX(p.relative_pressure)}
                        cy={isothermSvg.getY(p.volume_adsorbed)}
                        r="4"
                        fill="#2563EB"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      />
                    ))}

                    <text
                      x={pad.left + plotW / 2}
                      y={svgHeight - 8}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="bold"
                      fill="#2C302E"
                    >
                      Relative Pressure P / P₀
                    </text>
                    <text
                      x={-pad.top - plotH / 2}
                      y={18}
                      transform="rotate(-90)"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="bold"
                      fill="#2C302E"
                    >
                      Volume Adsorbed (cm³/g)
                    </text>
                  </svg>
                </div>
              )}
            </div>

            {/* BET Linear Transform Plot */}
            <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-tertiary" />
                  <h3 className="font-bold text-on-surface">BET Linear Transform</h3>
                </div>
                <span className="text-[10px] font-mono text-on-surface-variant">
                  y = (P/P₀) / [V(1 - P/P₀)]
                </span>
              </div>

              {betLinearSvg && (
                <div className="relative w-full overflow-x-auto">
                  <svg
                    viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                    className="w-full h-auto bg-surface-container-lowest rounded-xl border border-surface-container"
                  >
                    {/* Grid */}
                    {[0.25, 0.5, 0.75, 1.0].map((frac) => {
                      const y = pad.top + plotH - frac * plotH;
                      return (
                        <g key={frac}>
                          <line
                            x1={pad.left}
                            y1={y}
                            x2={pad.left + plotW}
                            y2={y}
                            stroke="#8B572A"
                            strokeOpacity="0.15"
                            strokeDasharray="4 4"
                          />
                          <text
                            x={pad.left - 8}
                            y={y + 4}
                            textAnchor="end"
                            fontSize="10"
                            fill="#8B572A"
                            fontFamily="monospace"
                          >
                            {(betLinearSvg.maxY * frac).toExponential(1)}
                          </text>
                        </g>
                      );
                    })}

                    {/* Axes */}
                    <line
                      x1={pad.left}
                      y1={pad.top + plotH}
                      x2={pad.left + plotW}
                      y2={pad.top + plotH}
                      stroke="#2C302E"
                      strokeWidth="1.5"
                    />
                    <line
                      x1={pad.left}
                      y1={pad.top}
                      x2={pad.left}
                      y2={pad.top + plotH}
                      stroke="#2C302E"
                      strokeWidth="1.5"
                    />

                    {/* Regression Line */}
                    <path
                      d={betLinearSvg.regLineD}
                      fill="none"
                      stroke="#059669"
                      strokeWidth="2.5"
                    />

                    {/* BET Data Points */}
                    {betResult?.linear_plot_points
                      .filter((p) => p.is_in_bet_range)
                      .map((p, i) => (
                        <circle
                          key={i}
                          cx={betLinearSvg.getX(p.relative_pressure)}
                          cy={betLinearSvg.getY(p.bet_transform_y)}
                          r="4"
                          fill="#D47942"
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                        />
                      ))}

                    <text
                      x={pad.left + plotW / 2}
                      y={svgHeight - 8}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="bold"
                      fill="#2C302E"
                    >
                      Relative Pressure P / P₀ (Linear Region)
                    </text>
                    <text
                      x={-pad.top - plotH / 2}
                      y={18}
                      transform="rotate(-90)"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="bold"
                      fill="#2C302E"
                    >
                      BET Transform y
                    </text>
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Model Fit Comparison Table */}
          {isothermResult && (
            <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-on-surface">Isotherm Model Comparison (Langmuir vs Freundlich vs BET)</h3>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                  Best Fit: {isothermResult.best_fitting_model}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-body-sm">
                  <thead>
                    <tr className="border-b border-surface-container">
                      <th className="p-3 font-bold text-on-surface">Isotherm Model</th>
                      <th className="p-3 font-bold text-on-surface">Governing Equation</th>
                      <th className="p-3 font-bold text-on-surface">Fitted Parameters</th>
                      <th className="p-3 font-bold text-on-surface">Correlation (R²)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-surface-container/60 hover:bg-surface-container/30">
                      <td className="p-3 font-bold text-primary">Langmuir (Monolayer)</td>
                      <td className="p-3 font-mono text-[12px]">{isothermResult.langmuir_fit.equation_display}</td>
                      <td className="p-3 font-mono text-[12px]">
                        V_m = {isothermResult.langmuir_fit.parameters.V_m}, K_L = {isothermResult.langmuir_fit.parameters.K_L}
                      </td>
                      <td className="p-3 font-bold font-mono text-emerald-600">{isothermResult.langmuir_fit.r_squared}</td>
                    </tr>
                    <tr className="border-b border-surface-container/60 hover:bg-surface-container/30">
                      <td className="p-3 font-bold text-tertiary">Freundlich (Heterogeneous)</td>
                      <td className="p-3 font-mono text-[12px]">{isothermResult.freundlich_fit.equation_display}</td>
                      <td className="p-3 font-mono text-[12px]">
                        K_F = {isothermResult.freundlich_fit.parameters.K_F}, 1/n = {isothermResult.freundlich_fit.parameters['1/n']}
                      </td>
                      <td className="p-3 font-bold font-mono text-emerald-600">{isothermResult.freundlich_fit.r_squared}</td>
                    </tr>
                    <tr className="hover:bg-surface-container/30">
                      <td className="p-3 font-bold text-amber-600 dark:text-amber-400">BET (Multilayer)</td>
                      <td className="p-3 font-mono text-[12px]">{isothermResult.bet_fit.equation_display}</td>
                      <td className="p-3 font-mono text-[12px]">
                        V_m = {isothermResult.bet_fit.parameters.V_m}, C = {isothermResult.bet_fit.parameters.C}
                      </td>
                      <td className="p-3 font-bold font-mono text-emerald-600">{isothermResult.bet_fit.r_squared}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Heterogeneous Catalysis Mode */
        <div className="space-y-6">
          {/* Catalysis Parameters Form */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-surface-container-low border border-surface-container">
            <div>
              <label className="text-[12px] font-semibold text-on-surface-variant mb-1.5 block">
                Rate Constant k
              </label>
              <input
                type="number"
                step="0.0005"
                min="0.0001"
                max="0.05"
                value={rateConstantK}
                onChange={(e) => setRateConstantK(parseFloat(e.target.value) || 0.001)}
                className="w-full bg-surface-container border border-surface-container-high rounded-xl px-3 py-2 text-body-sm text-on-surface font-mono"
              />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-on-surface-variant mb-1.5 block">
                K_A (Adsorption A, kPa⁻¹)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.001"
                max="1.0"
                value={adsorptionKa}
                onChange={(e) => setAdsorptionKa(parseFloat(e.target.value) || 0.05)}
                className="w-full bg-surface-container border border-surface-container-high rounded-xl px-3 py-2 text-body-sm text-on-surface font-mono"
              />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-on-surface-variant mb-1.5 block">
                K_B (Adsorption B, kPa⁻¹)
              </label>
              <input
                type="number"
                step="0.005"
                min="0.001"
                max="1.0"
                value={adsorptionKb}
                onChange={(e) => setAdsorptionKb(parseFloat(e.target.value) || 0.02)}
                className="w-full bg-surface-container border border-surface-container-high rounded-xl px-3 py-2 text-body-sm text-on-surface font-mono"
              />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-on-surface-variant mb-1.5 block">
                Coreactant P_B (kPa)
              </label>
              <input
                type="number"
                step="5"
                min="1"
                max="100"
                value={fixedPressureB}
                onChange={(e) => setFixedPressureB(parseFloat(e.target.value) || 20.0)}
                className="w-full bg-surface-container border border-surface-container-high rounded-xl px-3 py-2 text-body-sm text-on-surface font-mono"
              />
            </div>
          </div>

          {/* Catalysis Curve Chart */}
          <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-on-surface">Catalytic Reaction Rate vs Reactant Pressure P_A</h3>
              </div>
              <div className="flex items-center gap-4 text-label-sm font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-on-surface">Langmuir-Hinshelwood (Dual-Site)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-tertiary" />
                  <span className="text-on-surface">Eley-Rideal (Gas Impact)</span>
                </div>
              </div>
            </div>

            {catalysisSvg && (
              <div className="relative w-full overflow-x-auto">
                <svg
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  className="w-full h-auto bg-surface-container-lowest rounded-xl border border-surface-container"
                >
                  {[0.25, 0.5, 0.75, 1.0].map((frac) => {
                    const y = pad.top + plotH - frac * plotH;
                    return (
                      <g key={frac}>
                        <line
                          x1={pad.left}
                          y1={y}
                          x2={pad.left + plotW}
                          y2={y}
                          stroke="#8B572A"
                          strokeOpacity="0.15"
                          strokeDasharray="4 4"
                        />
                        <text
                          x={pad.left - 8}
                          y={y + 4}
                          textAnchor="end"
                          fontSize="10"
                          fill="#8B572A"
                          fontFamily="monospace"
                        >
                          {(catalysisSvg.maxRate * frac).toExponential(1)}
                        </text>
                      </g>
                    );
                  })}

                  <line
                    x1={pad.left}
                    y1={pad.top + plotH}
                    x2={pad.left + plotW}
                    y2={pad.top + plotH}
                    stroke="#2C302E"
                    strokeWidth="1.5"
                  />
                  <line
                    x1={pad.left}
                    y1={pad.top}
                    x2={pad.left}
                    y2={pad.top + plotH}
                    stroke="#2C302E"
                    strokeWidth="1.5"
                  />

                  {/* Langmuir-Hinshelwood path */}
                  <path
                    d={catalysisSvg.lhD}
                    fill="none"
                    stroke="#D47942"
                    strokeWidth="3.0"
                  />

                  {/* Eley-Rideal path */}
                  <path
                    d={catalysisSvg.erD}
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="2.5"
                    strokeDasharray="5 3"
                  />

                  <text
                    x={pad.left + plotW / 2}
                    y={svgHeight - 8}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="bold"
                    fill="#2C302E"
                  >
                    Partial Pressure P_A (kPa)
                  </text>
                  <text
                    x={-pad.top - plotH / 2}
                    y={18}
                    transform="rotate(-90)"
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="bold"
                    fill="#2C302E"
                  >
                    Reaction Rate r (mol / g·s)
                  </text>
                </svg>
              </div>
            )}

            {catalysisResult && (
              <div className="mt-4 p-3.5 rounded-xl bg-surface-container/60 border border-surface-container text-body-sm text-on-surface">
                {catalysisResult.summary}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
