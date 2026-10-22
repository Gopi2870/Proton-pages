import React, { useState, useEffect, useMemo } from 'react';
import {
  Activity,
  Layers,
  Sparkles,
  RotateCcw,
  Info,
  Clock,
  Calendar,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Compass,
} from 'lucide-react';
import {
  nuclearChemistryService,
  CURATED_DECAY_PRESETS,
  CAMBRIDGE_HALF_LIFE_YR,
  LIBBY_HALF_LIFE_YR,
  MODERN_14C_DPM_PER_G,
} from '../../../services/nuclearChemistryService';
import {
  ChainPresetSummary,
  BatemanSimulationResult,
  RadiocarbonDatingResult,
  TimeUnit,
} from '../../../types/nuclearChemistry';

const ISOTOPE_COLORS = [
  '#D47942', // Copper Reaction
  '#8B572A', // Amber Bottle
  '#2C302E', // Charcoal Ash
  '#4A7C59', // Jade Forest
  '#3A6B88', // Cobalt Slate
  '#9C4146', // Brick Crimson
];

export const NuclearDecayWorkstation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'decay' | 'radiocarbon'>('decay');

  // Decay Chain State
  const [presets, setPresets] = useState<ChainPresetSummary[]>([]);
  const [selectedChainId, setSelectedChainId] = useState<string>('molybdenum_technetium');
  const [timeHorizon, setTimeHorizon] = useState<number>(72.0);
  const [timeUnit, setTimeUnit] = useState<TimeUnit>('hours');
  const [initialParentPop, setInitialParentPop] = useState<number>(1.0e12);
  const [metricView, setMetricView] = useState<'activity' | 'population'>('activity');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<BatemanSimulationResult | null>(null);

  // Radiocarbon Dating State
  const [fractionModern, setFractionModern] = useState<number>(0.5);
  const [useCambridge, setUseCambridge] = useState<boolean>(true);
  const [radiocarbonResult, setRadiocarbonResult] = useState<RadiocarbonDatingResult | null>(null);

  // Hover state for SVG chart
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Initialize presets
  useEffect(() => {
    const list = nuclearChemistryService.getPresetSummaries();
    setPresets(list);
  }, []);

  // Update time horizon when preset changes
  useEffect(() => {
    const preset = nuclearChemistryService.getPreset(selectedChainId);
    if (preset) {
      setTimeUnit(preset.defaultTimeUnit);
      if (preset.defaultTimeUnit === 'hours') {
        setTimeHorizon(preset.defaultTimeHorizonS / 3600.0);
      } else if (preset.defaultTimeUnit === 'days') {
        setTimeHorizon(preset.defaultTimeHorizonS / 86400.0);
      } else if (preset.defaultTimeUnit === 'years') {
        setTimeHorizon(preset.defaultTimeHorizonS / 31557600.0);
      } else {
        setTimeHorizon(preset.defaultTimeHorizonS);
      }
    }
  }, [selectedChainId]);

  // Run Bateman simulation
  useEffect(() => {
    let isCancelled = false;
    const runSim = async () => {
      setIsLoading(true);
      try {
        const preset = nuclearChemistryService.getPreset(selectedChainId);
        const parentSym = preset?.isotopes[0]?.symbol || 'Parent';
        const initPops: Record<string, number> = { [parentSym]: initialParentPop };

        const res = await nuclearChemistryService.simulate({
          chainId: selectedChainId,
          timeHorizon,
          timeUnit,
          pointsCount: 100,
          initialPopulations: initPops,
        });
        if (!isCancelled) {
          setSimulationResult(res);
        }
      } catch (err) {
        console.error('Bateman simulation error:', err);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    runSim();
    return () => {
      isCancelled = true;
    };
  }, [selectedChainId, timeHorizon, timeUnit, initialParentPop]);

  // Run Radiocarbon Calculation
  useEffect(() => {
    let isCancelled = false;
    const runDating = async () => {
      try {
        const res = await nuclearChemistryService.calculateRadiocarbonAge({
          fractionModernCarbon: fractionModern,
          useCambridgeHalfLife: useCambridge,
        });
        if (!isCancelled) {
          setRadiocarbonResult(res);
        }
      } catch (err) {
        console.error('Radiocarbon calculation error:', err);
      }
    };

    runDating();
    return () => {
      isCancelled = true;
    };
  }, [fractionModern, useCambridge]);

  // Reset parameters
  const handleReset = () => {
    setSelectedChainId('molybdenum_technetium');
    setTimeHorizon(72.0);
    setTimeUnit('hours');
    setInitialParentPop(1.0e12);
    setFractionModern(0.5);
    setUseCambridge(true);
  };

  // SVG Chart bounds and scales
  const chartData = useMemo(() => {
    if (!simulationResult || simulationResult.trajectory.length === 0) return null;

    const traj = simulationResult.trajectory;
    const maxX = Math.max(...traj.map((p) => p.timeDisplay), 1e-6);

    let maxY = 0;
    const isotopeSymbols = simulationResult.isotopes.map((iso) => iso.symbol);

    for (const pt of traj) {
      for (const sym of isotopeSymbols) {
        const val = metricView === 'activity' ? pt.activitiesBq[sym] || 0 : pt.populations[sym] || 0;
        if (val > maxY) maxY = val;
      }
    }
    if (maxY <= 0) maxY = 1.0;

    const width = 640;
    const height = 300;
    const padding = { top: 20, right: 30, bottom: 40, left: 75 };
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = height - padding.top - padding.bottom;

    const scaleX = (x: number) => padding.left + (x / maxX) * plotWidth;
    const scaleY = (y: number) => padding.top + plotHeight - (y / maxY) * plotHeight;

    const paths: { symbol: string; color: string; pathD: string }[] = [];

    isotopeSymbols.forEach((sym, idx) => {
      const color = ISOTOPE_COLORS[idx % ISOTOPE_COLORS.length];
      const pts = traj.map((pt) => {
        const x = scaleX(pt.timeDisplay);
        const yVal = metricView === 'activity' ? pt.activitiesBq[sym] || 0 : pt.populations[sym] || 0;
        const y = scaleY(yVal);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      });
      paths.push({
        symbol: sym,
        color,
        pathD: `M ${pts.join(' L ')}`,
      });
    });

    return {
      width,
      height,
      padding,
      plotWidth,
      plotHeight,
      maxX,
      maxY,
      scaleX,
      scaleY,
      paths,
      traj,
      isotopeSymbols,
    };
  }, [simulationResult, metricView]);

  return (
    <div className="flex flex-col w-full space-y-4">
      {/* Top Banner & Mode Tabs */}
      <div className="bg-[#FDF8F5] border border-[#8B572A]/20 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-[#D47942]/10 text-[#D47942]">
              <Activity className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-[#2C302E]">
              Nuclear Chemistry & Radiochemical Kinetics Workstation
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-[#D47942] text-white">
              PR #042
            </span>
          </div>
          <p className="text-xs text-[#8B572A] mt-1">
            Analytical Bateman cascade equations, secular & transient equilibria, and calibrated radiocarbon dating
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-[#8B572A]/10 p-1 rounded-lg flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('decay')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeTab === 'decay'
                  ? 'bg-white text-[#D47942] shadow-xs'
                  : 'text-[#2C302E] hover:text-[#D47942]'
              }`}
            >
              Bateman Decay Simulator
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('radiocarbon')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeTab === 'radiocarbon'
                  ? 'bg-white text-[#D47942] shadow-xs'
                  : 'text-[#2C302E] hover:text-[#D47942]'
              }`}
            >
              Radiocarbon Dating Lab
            </button>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="p-2 text-[#8B572A] hover:text-[#2C302E] hover:bg-[#8B572A]/10 rounded-lg transition"
            title="Reset workstation parameters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Mode View */}
      {activeTab === 'decay' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Controls Column */}
          <div className="lg:col-span-4 space-y-4">
            {/* Decay Chain Preset Selector */}
            <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8B572A] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> Curated Radionuclide Series
              </label>

              <div className="space-y-1.5">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setSelectedChainId(preset.id)}
                    className={`w-full text-left p-2.5 rounded-lg border transition ${
                      selectedChainId === preset.id
                        ? 'border-[#D47942] bg-[#D47942]/5'
                        : 'border-[#8B572A]/10 hover:border-[#8B572A]/30 bg-[#FDF8F5]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#2C302E]">
                        {preset.name}
                      </span>
                      <span
                        className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                          preset.equilibriumType === 'transient'
                            ? 'bg-amber-100 text-amber-800'
                            : preset.equilibriumType === 'secular'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {preset.equilibriumType}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8B572A] mt-1 line-clamp-2">
                      {preset.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulation Parameters Form */}
            <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8B572A] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Simulation Controls
              </label>

              {/* Time Horizon Slider */}
              <div>
                <div className="flex justify-between text-xs text-[#2C302E] font-medium mb-1">
                  <span>Time Horizon</span>
                  <span className="font-mono text-[#D47942]">
                    {timeHorizon.toFixed(1)} {timeUnit}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={timeUnit === 'years' ? 1000 : 200}
                  step={0.5}
                  value={timeHorizon}
                  onChange={(e) => setTimeHorizon(parseFloat(e.target.value))}
                  className="w-full accent-[#D47942] h-1.5 bg-[#8B572A]/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Time Unit Selector */}
              <div>
                <label className="text-[11px] font-medium text-[#8B572A] block mb-1">
                  Time Unit
                </label>
                <div className="grid grid-cols-4 gap-1">
                  {(['minutes', 'hours', 'days', 'years'] as TimeUnit[]).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setTimeUnit(u)}
                      className={`text-[11px] py-1 capitalize rounded border transition ${
                        timeUnit === u
                          ? 'border-[#D47942] bg-[#D47942] text-white font-semibold'
                          : 'border-[#8B572A]/20 bg-white text-[#2C302E] hover:border-[#D47942]'
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              {/* Initial Parent Atoms */}
              <div>
                <label className="text-[11px] font-medium text-[#8B572A] block mb-1">
                  Initial Parent Atoms (N₀)
                </label>
                <select
                  value={initialParentPop}
                  onChange={(e) => setInitialParentPop(parseFloat(e.target.value))}
                  className="w-full text-xs p-2 rounded border border-[#8B572A]/20 bg-white text-[#2C302E]"
                >
                  <option value={1e10}>1.0 × 10¹⁰ atoms</option>
                  <option value={1e12}>1.0 × 10¹² atoms (Default)</option>
                  <option value={1e15}>1.0 × 10¹⁵ atoms (MBq level)</option>
                  <option value={6.022e23}>6.022 × 10²³ atoms (1 mole)</option>
                </select>
              </div>

              {/* Metric View Toggle */}
              <div>
                <label className="text-[11px] font-medium text-[#8B572A] block mb-1">
                  Display Metric
                </label>
                <div className="grid grid-cols-2 gap-1 bg-[#8B572A]/10 p-0.5 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setMetricView('activity')}
                    className={`text-xs py-1 rounded transition font-medium ${
                      metricView === 'activity'
                        ? 'bg-white text-[#D47942] shadow-xs font-semibold'
                        : 'text-[#2C302E]'
                    }`}
                  >
                    Radioactivity A(t) [Bq]
                  </button>
                  <button
                    type="button"
                    onClick={() => setMetricView('population')}
                    className={`text-xs py-1 rounded transition font-medium ${
                      metricView === 'population'
                        ? 'bg-white text-[#D47942] shadow-xs font-semibold'
                        : 'text-[#2C302E]'
                    }`}
                  >
                    Population N(t) [atoms]
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visualizer Column */}
          <div className="lg:col-span-8 space-y-4">
            {/* Interactive SVG Bateman Trajectory Plot */}
            <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D47942]" />
                  <h3 className="text-sm font-bold text-[#2C302E]">
                    Bateman Cascade Dynamics: {metricView === 'activity' ? 'Activity A(t) [Bq]' : 'Population N(t)'}
                  </h3>
                </div>
                {simulationResult && (
                  <span className="text-xs text-[#8B572A] font-mono">
                    {simulationResult.trajectory.length} timepoints
                  </span>
                )}
              </div>

              {isLoading ? (
                <div className="h-[300px] flex items-center justify-center text-xs text-[#8B572A]">
                  Computing analytical Bateman trajectory...
                </div>
              ) : chartData ? (
                <div className="relative">
                  <svg
                    viewBox={`0 0 ${chartData.width} ${chartData.height}`}
                    className="w-full h-auto bg-[#FDF8F5]/60 rounded-lg border border-[#8B572A]/10"
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    {/* Gridlines */}
                    {[0, 0.25, 0.5, 0.75, 1.0].map((frac) => {
                      const y = chartData.padding.top + frac * chartData.plotHeight;
                      const val = (1 - frac) * chartData.maxY;
                      return (
                        <g key={frac}>
                          <line
                            x1={chartData.padding.left}
                            y1={y}
                            x2={chartData.width - chartData.padding.right}
                            y2={y}
                            stroke="#8B572A"
                            strokeOpacity={0.1}
                            strokeDasharray="2,2"
                          />
                          <text
                            x={chartData.padding.left - 8}
                            y={y + 3}
                            fill="#8B572A"
                            fontSize={9}
                            textAnchor="end"
                            fontFamily="monospace"
                          >
                            {val.toExponential(1)}
                          </text>
                        </g>
                      );
                    })}

                    {/* X-axis ticks */}
                    {[0, 0.25, 0.5, 0.75, 1.0].map((frac) => {
                      const x = chartData.padding.left + frac * chartData.plotWidth;
                      const val = frac * chartData.maxX;
                      return (
                        <g key={frac}>
                          <line
                            x1={x}
                            y1={chartData.padding.top}
                            x2={x}
                            y2={chartData.padding.top + chartData.plotHeight}
                            stroke="#8B572A"
                            strokeOpacity={0.1}
                            strokeDasharray="2,2"
                          />
                          <text
                            x={x}
                            y={chartData.padding.top + chartData.plotHeight + 16}
                            fill="#8B572A"
                            fontSize={9}
                            textAnchor="middle"
                            fontFamily="monospace"
                          >
                            {val.toFixed(1)}
                          </text>
                        </g>
                      );
                    })}

                    {/* X and Y Axis Titles */}
                    <text
                      x={chartData.width / 2}
                      y={chartData.height - 6}
                      fill="#2C302E"
                      fontSize={11}
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      Elapsed Time [{timeUnit}]
                    </text>
                    <text
                      transform={`rotate(-90) translate(-${chartData.height / 2}, 16)`}
                      fill="#2C302E"
                      fontSize={11}
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {metricView === 'activity' ? 'Activity [Bq]' : 'Nuclide Population [atoms]'}
                    </text>

                    {/* Isotope Curves */}
                    {chartData.paths.map((p) => (
                      <path
                        key={p.symbol}
                        d={p.pathD}
                        fill="none"
                        stroke={p.color}
                        strokeWidth={2.2}
                      />
                    ))}

                    {/* Hover vertical line */}
                    {hoverIndex !== null && chartData.traj[hoverIndex] && (
                      <line
                        x1={chartData.scaleX(chartData.traj[hoverIndex].timeDisplay)}
                        y1={chartData.padding.top}
                        x2={chartData.scaleX(chartData.traj[hoverIndex].timeDisplay)}
                        y2={chartData.padding.top + chartData.plotHeight}
                        stroke="#D47942"
                        strokeWidth={1.5}
                        strokeDasharray="3,3"
                      />
                    )}

                    {/* Interactive overlay for hover detection */}
                    <rect
                      x={chartData.padding.left}
                      y={chartData.padding.top}
                      width={chartData.plotWidth}
                      height={chartData.plotHeight}
                      fill="transparent"
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const frac = (e.clientX - rect.left) / rect.width;
                        const idx = Math.min(
                          chartData.traj.length - 1,
                          Math.max(0, Math.round(frac * (chartData.traj.length - 1)))
                        );
                        setHoverIndex(idx);
                      }}
                    />
                  </svg>

                  {/* Chart Legend */}
                  <div className="flex flex-wrap items-center gap-3 mt-3 pt-2 border-t border-[#8B572A]/10 text-xs">
                    {chartData.paths.map((p) => (
                      <div key={p.symbol} className="flex items-center gap-1.5">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: p.color }}
                        />
                        <span className="font-semibold text-[#2C302E]">{p.symbol}</span>
                      </div>
                    ))}
                  </div>

                  {/* Hover tooltip values */}
                  {hoverIndex !== null && chartData.traj[hoverIndex] && (
                    <div className="mt-2 p-2 bg-[#FDF8F5] border border-[#D47942]/30 rounded-lg text-xs grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="font-semibold text-[#2C302E]">
                        t = {chartData.traj[hoverIndex].timeDisplay} {timeUnit}
                      </div>
                      {chartData.isotopeSymbols.map((sym, idx) => {
                        const val =
                          metricView === 'activity'
                            ? chartData.traj[hoverIndex].activitiesBq[sym] || 0
                            : chartData.traj[hoverIndex].populations[sym] || 0;
                        return (
                          <div key={sym} className="text-[#8B572A]">
                            <span
                              className="inline-block w-2 h-2 rounded-full mr-1"
                              style={{ backgroundColor: ISOTOPE_COLORS[idx % ISOTOPE_COLORS.length] }}
                            />
                            {sym}:{' '}
                            <span className="font-mono font-medium text-[#2C302E]">
                              {val.toExponential(2)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            {/* Decay Series Flow Diagram */}
            {simulationResult && (
              <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B572A] flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" /> Nuclide Cascade Architecture
                </h4>

                <div className="flex flex-wrap items-center gap-2 overflow-x-auto py-2">
                  {simulationResult.isotopes.map((iso, idx) => (
                    <React.Fragment key={iso.symbol}>
                      <div className="p-3 rounded-lg border border-[#8B572A]/20 bg-[#FDF8F5] min-w-[130px] flex-shrink-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-[#2C302E]">
                            {iso.symbol}
                          </span>
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: ISOTOPE_COLORS[idx % ISOTOPE_COLORS.length] }}
                          />
                        </div>
                        <div className="text-[10px] text-[#8B572A] mt-0.5">
                          Z = {iso.atomicNumber}, A = {iso.massNumber}
                        </div>
                        <div className="text-[11px] font-mono text-[#D47942] font-semibold mt-1">
                          t½: {iso.halfLifeDisplay}
                        </div>
                        <div className="text-[10px] text-stone-500 capitalize">
                          Mode: {iso.decayMode.replace('_', ' ')}
                        </div>
                      </div>

                      {idx < simulationResult.isotopes.length - 1 && (
                        <div className="flex flex-col items-center justify-center px-1 text-[#D47942]">
                          <ArrowRight className="w-4 h-4" />
                          <span className="text-[9px] uppercase font-bold mt-0.5">
                            {iso.decayMode === 'beta_minus' ? 'β⁻' : iso.decayMode === 'alpha' ? 'α' : 'γ'}
                          </span>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Pedagogical Commentary */}
                <div className="p-3 bg-[#FDF8F5] rounded-lg border border-[#8B572A]/15 text-xs text-[#2C302E] leading-relaxed">
                  <div className="font-semibold text-[#8B572A] mb-1 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5" /> Bateman Solution Analysis
                  </div>
                  {simulationResult.pedagogicalSummary}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Radiocarbon Dating Workstation */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8B572A] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Sample ¹⁴C Activity Measurement
              </label>

              {/* Fraction Modern Carbon Slider */}
              <div>
                <div className="flex justify-between text-xs text-[#2C302E] font-medium mb-1">
                  <span>Fraction Modern Carbon (A / A₀)</span>
                  <span className="font-mono text-[#D47942] font-bold">
                    {(fractionModern * 100).toFixed(1)}% ({fractionModern.toFixed(3)})
                  </span>
                </div>
                <input
                  type="range"
                  min={0.005}
                  max={1.1}
                  step={0.005}
                  value={fractionModern}
                  onChange={(e) => setFractionModern(parseFloat(e.target.value))}
                  className="w-full accent-[#D47942] h-1.5 bg-[#8B572A]/10 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#8B572A] mt-1">
                  <span>0.5% (~43,000 BP Limit)</span>
                  <span>50% (5,730 BP)</span>
                  <span>100% (Modern Baseline)</span>
                </div>
              </div>

              {/* Sample Activity in dpm/g */}
              <div className="p-3 bg-[#FDF8F5] rounded-lg border border-[#8B572A]/15 text-xs space-y-1">
                <div className="text-[#8B572A] font-medium">Equivalent Specific Activity:</div>
                <div className="font-mono text-sm text-[#2C302E] font-bold">
                  {(fractionModern * MODERN_14C_DPM_PER_G).toFixed(2)} dpm / g Carbon
                </div>
                <div className="text-[10px] text-[#8B572A]">
                  (Modern pre-industrial benchmark: {MODERN_14C_DPM_PER_G} dpm/g)
                </div>
              </div>

              {/* Half-Life Standard Selector */}
              <div>
                <label className="text-xs font-bold text-[#8B572A] block mb-2">
                  Half-Life Convention Standard
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-[#8B572A]/20 bg-[#FDF8F5] cursor-pointer">
                    <input
                      type="radio"
                      name="halfLife"
                      checked={useCambridge}
                      onChange={() => setUseCambridge(true)}
                      className="accent-[#D47942]"
                    />
                    <div>
                      <div className="text-xs font-semibold text-[#2C302E]">
                        Cambridge Physical Half-Life (5,730 ± 40 yr)
                      </div>
                      <div className="text-[10px] text-[#8B572A]">
                        IUPAC accepted physical half-life for true nuclear decay calculations.
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-lg border border-[#8B572A]/20 bg-[#FDF8F5] cursor-pointer">
                    <input
                      type="radio"
                      name="halfLife"
                      checked={!useCambridge}
                      onChange={() => setUseCambridge(false)}
                      className="accent-[#D47942]"
                    />
                    <div>
                      <div className="text-xs font-semibold text-[#2C302E]">
                        Libby Conventional Half-Life (5,568 ± 30 yr)
                      </div>
                      <div className="text-[10px] text-[#8B572A]">
                        Radiocarbon journal standard for reporting uncalibrated BP ages.
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Preset Archaeological Case Studies */}
              <div>
                <label className="text-xs font-bold text-[#8B572A] block mb-1">
                  Reference Case Studies
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setFractionModern(0.5)}
                    className="p-2 border border-[#8B572A]/20 rounded bg-white hover:border-[#D47942] text-left"
                  >
                    <div className="font-semibold text-[#2C302E]">1 Half-Life (50%)</div>
                    <div className="text-[10px] text-[#8B572A]">c. 3780 BCE</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFractionModern(0.25)}
                    className="p-2 border border-[#8B572A]/20 rounded bg-white hover:border-[#D47942] text-left"
                  >
                    <div className="font-semibold text-[#2C302E]">2 Half-Lives (25%)</div>
                    <div className="text-[10px] text-[#8B572A]">c. 9510 BCE (Younger Dryas)</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFractionModern(0.584)}
                    className="p-2 border border-[#8B572A]/20 rounded bg-white hover:border-[#D47942] text-left"
                  >
                    <div className="font-semibold text-[#2C302E]">Ötzi the Iceman</div>
                    <div className="text-[10px] text-[#8B572A]">~4,400 BP (~58% modern)</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFractionModern(0.015)}
                    className="p-2 border border-[#8B572A]/20 rounded bg-white hover:border-[#D47942] text-left"
                  >
                    <div className="font-semibold text-[#2C302E]">Chauvet Cave Charcoal</div>
                    <div className="text-[10px] text-[#8B572A]">~35,000 BP (~1.5% modern)</div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Radiocarbon Results Column */}
          <div className="lg:col-span-7 space-y-4">
            {radiocarbonResult && (
              <>
                {/* Age Result Big Card */}
                <div className="bg-white border border-[#8B572A]/20 rounded-xl p-5 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#8B572A]/10 pb-3 mb-4">
                    <div>
                      <div className="text-xs uppercase tracking-wider font-bold text-[#8B572A]">
                        Uncalibrated Radiometric Age
                      </div>
                      <div className="text-3xl font-bold font-mono text-[#D47942] mt-1">
                        {radiocarbonResult.uncalibratedAgeYearsBp.toLocaleString()} ± {radiocarbonResult.uncertaintyYears} BP
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#8B572A]">Nominal Calendar Era</div>
                      <div className="text-lg font-bold text-[#2C302E] mt-1">
                        {radiocarbonResult.approximateCalendarEra}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-2 bg-[#FDF8F5] rounded border border-[#8B572A]/15">
                      <div className="text-[#8B572A]">Decay Constant λ</div>
                      <div className="font-mono font-bold text-[#2C302E]">
                        {radiocarbonResult.decayConstantYrInv.toExponential(3)} yr⁻¹
                      </div>
                    </div>
                    <div className="p-2 bg-[#FDF8F5] rounded border border-[#8B572A]/15">
                      <div className="text-[#8B572A]">Half-Life Used</div>
                      <div className="font-mono font-bold text-[#2C302E]">
                        {radiocarbonResult.halfLifeUsedYears.toLocaleString()} yr
                      </div>
                    </div>
                    <div className="p-2 bg-[#FDF8F5] rounded border border-[#8B572A]/15">
                      <div className="text-[#8B572A]">Half-Lives Elapsed</div>
                      <div className="font-mono font-bold text-[#2C302E]">
                        {(radiocarbonResult.uncalibratedAgeYearsBp / radiocarbonResult.halfLifeUsedYears).toFixed(2)}
                      </div>
                    </div>
                    <div className="p-2 bg-[#FDF8F5] rounded border border-[#8B572A]/15">
                      <div className="text-[#8B572A]">Baseline Era</div>
                      <div className="font-mono font-bold text-[#2C302E]">
                        0 BP = 1950 CE
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exponential Decay Interactive SVG */}
                <div className="bg-white border border-[#8B572A]/20 rounded-xl p-4 shadow-xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B572A] mb-2 flex items-center gap-1.5">
                    <TrendingDown className="w-3.5 h-3.5 text-[#D47942]" /> ¹⁴C Exponential Decay Profile
                  </h4>

                  <svg viewBox="0 0 500 180" className="w-full h-auto bg-[#FDF8F5]/60 rounded-lg border border-[#8B572A]/10">
                    {/* Decay Curve */}
                    <path
                      d="M 50,20 Q 150,110 450,150"
                      fill="none"
                      stroke="#8B572A"
                      strokeWidth={2}
                    />

                    {/* Half-life markers */}
                    <circle cx="165" cy="85" r="4" fill="#8B572A" />
                    <text x="165" y="105" fill="#8B572A" fontSize={9} textAnchor="middle">
                      1 t½ (50%)
                    </text>

                    <circle cx="280" cy="118" r="4" fill="#8B572A" />
                    <text x="280" y="138" fill="#8B572A" fontSize={9} textAnchor="middle">
                      2 t½ (25%)
                    </text>

                    {/* Current Sample Marker */}
                    {(() => {
                      const tNorm = Math.min(
                        1.0,
                        radiocarbonResult.uncalibratedAgeYearsBp / (4 * radiocarbonResult.halfLifeUsedYears)
                      );
                      const sampleX = 50 + tNorm * 380;
                      const sampleY = 150 - fractionModern * 130;
                      return (
                        <g>
                          <circle cx={sampleX} cy={sampleY} r="6" fill="#D47942" />
                          <circle cx={sampleX} cy={sampleY} r="10" fill="#D47942" opacity={0.2} />
                          <text
                            x={sampleX}
                            y={Math.max(20, sampleY - 12)}
                            fill="#D47942"
                            fontSize={10}
                            fontWeight="bold"
                            textAnchor="middle"
                          >
                            Sample: {radiocarbonResult.uncalibratedAgeYearsBp.toLocaleString()} BP
                          </text>
                        </g>
                      );
                    })()}

                    {/* Axes */}
                    <line x1="50" y1="150" x2="450" y2="150" stroke="#2C302E" strokeWidth={1} />
                    <line x1="50" y1="20" x2="50" y2="150" stroke="#2C302E" strokeWidth={1} />
                    <text x="250" y="172" fill="#2C302E" fontSize={10} textAnchor="middle">
                      Elapsed Time (Years Before Present)
                    </text>
                    <text transform="rotate(-90) translate(-85, 20)" fill="#2C302E" fontSize={10} textAnchor="middle">
                      ¹⁴C / ¹²C Ratio
                    </text>
                  </svg>
                </div>

                {/* Critical Scientific Caveat & Calibration Notice */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                    Scientific Requirement: Calibration vs Uncalibrated Radiometric Age
                  </div>
                  <p className="text-amber-800 leading-relaxed">
                    {radiocarbonResult.scientificDisclaimer}
                  </p>
                  <div className="text-[11px] text-amber-900 font-medium pt-1 border-t border-amber-200">
                    {radiocarbonResult.calibrationNotes}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
