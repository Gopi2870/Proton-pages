import React, { useState, useEffect, useMemo } from 'react';
import {
  Activity,
  Play,
  RotateCcw,
  Sparkles,
  Info,
  Layers,
  BarChart2,
  Clock,
  Compass,
  Zap,
} from 'lucide-react';
import {
  stiffKineticsService,
  FALLBACK_PRESETS,
} from '../../../services/stiffKineticsService';
import {
  KineticsPresetSummary,
  StiffKineticsSimulationResponse,
} from '../../../types/stiffKinetics';

export const StiffKineticsWorkstation: React.FC = () => {
  const [presets, setPresets] = useState<KineticsPresetSummary[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('robertson_stiff');
  const [solverMethod, setSolverMethod] = useState<'rosenbrock_stiff' | 'explicit_rk4'>('rosenbrock_stiff');
  const [totalTime, setTotalTime] = useState<number>(100.0);
  const [useLogTime, setUseLogTime] = useState<boolean>(true);
  const [phaseXSpecies, setPhaseXSpecies] = useState<string>('');
  const [phaseYSpecies, setPhaseYSpecies] = useState<string>('');
  const [hoveredPoint, setHoveredPoint] = useState<Record<string, number> | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<StiffKineticsSimulationResponse | null>(null);

  // Load presets catalog
  useEffect(() => {
    stiffKineticsService.getPresets().then((list) => {
      if (list && list.length > 0) {
        setPresets(list);
      }
    });
  }, []);

  // Update total time when preset changes
  useEffect(() => {
    const preset = FALLBACK_PRESETS[selectedPresetId];
    if (preset) {
      setTotalTime(preset.default_total_time_s);
      if (selectedPresetId === 'oregonator_bz') {
        setPhaseXSpecies('X');
        setPhaseYSpecies('Z');
      } else if (preset.species.length >= 2) {
        setPhaseXSpecies(preset.species[0].name);
        setPhaseYSpecies(preset.species[1].name);
      }
    }
  }, [selectedPresetId]);

  // Execute simulation
  const handleRunSimulation = async () => {
    setIsLoading(true);
    try {
      const res = await stiffKineticsService.simulate({
        preset_id: selectedPresetId,
        total_time_s: totalTime,
        initial_step_s: selectedPresetId === 'zeldovich_nox' ? 1e-5 : 1e-4,
        solver_method: solverMethod,
        max_steps: 300,
      });
      setSimulationResult(res);
      if (res.species_names.length >= 2) {
        if (!phaseXSpecies || !res.species_names.includes(phaseXSpecies)) {
          setPhaseXSpecies(res.species_names[0]);
        }
        if (!phaseYSpecies || !res.species_names.includes(phaseYSpecies)) {
          setPhaseYSpecies(res.species_names[1]);
        }
      }
    } catch (err) {
      console.error('Stiff kinetics simulation failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial simulation on mount
  useEffect(() => {
    handleRunSimulation();
  }, [selectedPresetId, solverMethod]);

  const activePreset = FALLBACK_PRESETS[selectedPresetId];

  // SVG dimensions for concentration vs time chart
  const svgWidth = 640;
  const svgHeight = 280;
  const padding = { top: 20, right: 30, bottom: 40, left: 60 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  // Compute chart bounds and paths
  const chartData = useMemo(() => {
    if (!simulationResult || simulationResult.trajectory.length === 0) return null;

    const traj = simulationResult.trajectory;
    const species = simulationResult.species_names;

    let maxC = 1e-9;
    traj.forEach((pt) => {
      species.forEach((sp) => {
        if (pt[sp] > maxC) maxC = pt[sp];
      });
    });

    // Ensure non-zero scale
    maxC = Math.max(maxC, 1e-6);

    const minT = traj[1]?.time_s || 1e-5;
    const maxT = traj[traj.length - 1].time_s || 1.0;

    const getX = (t: number) => {
      if (useLogTime) {
        const safeT = Math.max(t, minT);
        const logMin = Math.log10(minT);
        const logMax = Math.log10(maxT);
        const logT = Math.log10(safeT);
        const frac = logMax > logMin ? (logT - logMin) / (logMax - logMin) : 0;
        return padding.left + frac * plotWidth;
      }
      return padding.left + (t / maxT) * plotWidth;
    };

    const getY = (c: number) => {
      const frac = Math.min(Math.max(c / maxC, 0.0), 1.0);
      return padding.top + plotHeight - frac * plotHeight;
    };

    // Color palette for species
    const speciesColors: Record<string, string> = {};
    const defaultPalette = ['#2563EB', '#D47942', '#059669', '#E11D48', '#8B572A', '#7C3AED'];
    species.forEach((sp, idx) => {
      const fallbackColor = activePreset?.species.find((s) => s.name === sp)?.color_hex;
      speciesColors[sp] = fallbackColor || defaultPalette[idx % defaultPalette.length];
    });

    // Generate SVG path for each species
    const paths: Record<string, string> = {};
    species.forEach((sp) => {
      let d = '';
      traj.forEach((pt, i) => {
        const x = getX(pt.time_s);
        const y = getY(pt[sp] || 0.0);
        if (i === 0) {
          d += `M ${x.toFixed(1)} ${y.toFixed(1)}`;
        } else {
          d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
        }
      });
      paths[sp] = d;
    });

    return { maxC, maxT, minT, getX, getY, paths, speciesColors };
  }, [simulationResult, useLogTime, activePreset]);

  // Phase-space limit cycle plot
  const phasePlotData = useMemo(() => {
    if (!simulationResult || !phaseXSpecies || !phaseYSpecies) return null;
    const traj = simulationResult.trajectory;
    let maxX = 1e-9;
    let maxY = 1e-9;
    traj.forEach((pt) => {
      if (pt[phaseXSpecies] > maxX) maxX = pt[phaseXSpecies];
      if (pt[phaseYSpecies] > maxY) maxY = pt[phaseYSpecies];
    });
    maxX = Math.max(maxX, 1e-8);
    maxY = Math.max(maxY, 1e-8);

    const pw = 280;
    const ph = 240;
    const pPad = { top: 15, right: 15, bottom: 35, left: 45 };
    const pWidth = pw - pPad.left - pPad.right;
    const pHeight = ph - pPad.top - pPad.bottom;

    let pathD = '';
    traj.forEach((pt, i) => {
      const x = pPad.left + (Math.max(0, pt[phaseXSpecies] || 0) / maxX) * pWidth;
      const y = pPad.top + pHeight - (Math.max(0, pt[phaseYSpecies] || 0) / maxY) * pHeight;
      if (i === 0) {
        pathD += `M ${x.toFixed(1)} ${y.toFixed(1)}`;
      } else {
        pathD += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
      }
    });

    return { pw, ph, pPad, maxX, maxY, pathD };
  }, [simulationResult, phaseXSpecies, phaseYSpecies]);

  return (
    <div className="space-y-6">
      {/* Workstation Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-surface-container-low border border-surface-container">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
              PR #040 Scientific Workstation
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-tertiary/10 text-tertiary border border-tertiary/20">
              Linearly-Implicit Rosenbrock (ROS2)
            </span>
          </div>
          <h2 className="text-display-xs font-bold text-on-surface">
            Stiff Reaction Networks & Multistage ODE Solvers
          </h2>
          <p className="text-body-sm text-on-surface-variant max-w-2xl mt-1">
            Simulate reaction kinetics spanning 9+ orders of magnitude in rate constants without explicit numerical blowup.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunSimulation}
            disabled={isLoading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-on-primary font-bold shadow-md transition disabled:opacity-50"
          >
            {isLoading ? (
              <RotateCcw className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4 fill-current" />
            )}
            Run Stiff ODE Solve
          </button>
        </div>
      </div>

      {/* Preset and Solver Selector Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-surface-container-low border border-surface-container">
        {/* Preset Selector */}
        <div>
          <label className="text-[12px] font-semibold text-on-surface-variant mb-1.5 block">
            Kinetic Benchmark Network
          </label>
          <select
            value={selectedPresetId}
            onChange={(e) => setSelectedPresetId(e.target.value)}
            className="w-full bg-surface-container border border-surface-container-high rounded-xl px-3 py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary font-medium"
          >
            {(presets.length > 0 ? presets : Object.values(FALLBACK_PRESETS)).map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Solver Integrator */}
        <div>
          <label className="text-[12px] font-semibold text-on-surface-variant mb-1.5 block">
            Numerical ODE Integrator
          </label>
          <select
            value={solverMethod}
            onChange={(e) => setSolverMethod(e.target.value as any)}
            className="w-full bg-surface-container border border-surface-container-high rounded-xl px-3 py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary font-medium"
          >
            <option value="rosenbrock_stiff">Rosenbrock-W (ROS2 A-Stable Stiff)</option>
            <option value="explicit_rk4">Explicit Runge-Kutta 4 (Classical)</option>
          </select>
        </div>

        {/* Time Horizon */}
        <div>
          <label className="text-[12px] font-semibold text-on-surface-variant mb-1.5 block">
            Time Horizon (s): {totalTime} s
          </label>
          <input
            type="number"
            step="any"
            min="0.001"
            max="10000"
            value={totalTime}
            onChange={(e) => setTotalTime(parseFloat(e.target.value) || 1.0)}
            className="w-full bg-surface-container border border-surface-container-high rounded-xl px-3 py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary"
          />
        </div>

        {/* Time Scale Switch */}
        <div className="flex flex-col justify-end">
          <label className="text-[12px] font-semibold text-on-surface-variant mb-1.5 block">
            Time Axis Scale
          </label>
          <div className="flex rounded-xl bg-surface-container border border-surface-container-high p-1">
            <button
              onClick={() => setUseLogTime(true)}
              className={`flex-1 py-1.5 text-label-sm font-bold rounded-lg transition ${
                useLogTime ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Log₁₀ (Stiff)
            </button>
            <button
              onClick={() => setUseLogTime(false)}
              className={`flex-1 py-1.5 text-label-sm font-bold rounded-lg transition ${
                !useLogTime ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Linear Time
            </button>
          </div>
        </div>
      </div>

      {/* Preset Details Banner */}
      {activePreset && (
        <div className="p-4 rounded-xl bg-surface-container/60 border border-surface-container flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-body-sm font-medium text-on-surface">{activePreset.description}</p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-surface-container-high text-on-surface">
                  Species: {activePreset.species.map((s) => s.name).join(', ')}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-surface-container-high text-on-surface">
                  Reactions: {activePreset.reactions_count} steps
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                  Stiffness Index: ~{activePreset.estimated_stiffness_ratio.toExponential(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Concentration vs Time Trajectory Chart (2 cols) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-on-surface">Kinetic Trajectory [C](t)</h3>
              </div>
              {chartData && (
                <div className="flex items-center gap-3">
                  {simulationResult?.species_names.map((sp) => (
                    <div key={sp} className="flex items-center gap-1.5 text-label-sm font-medium">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: chartData.speciesColors[sp] }}
                      />
                      <span className="text-on-surface font-semibold">[{sp}]</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SVG Plot */}
            <div className="relative w-full overflow-x-auto">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-auto bg-surface-container-lowest rounded-xl border border-surface-container"
              >
                {/* Grid Lines */}
                {[0.25, 0.5, 0.75, 1.0].map((frac) => {
                  const y = padding.top + plotHeight - frac * plotHeight;
                  return (
                    <g key={frac}>
                      <line
                        x1={padding.left}
                        y1={y}
                        x2={padding.left + plotWidth}
                        y2={y}
                        stroke="#8B572A"
                        strokeOpacity="0.15"
                        strokeDasharray="4 4"
                      />
                      <text
                        x={padding.left - 8}
                        y={y + 4}
                        textAnchor="end"
                        fontSize="10"
                        fill="#8B572A"
                        fontFamily="monospace"
                      >
                        {chartData ? (chartData.maxC * frac).toPrecision(2) : ''}
                      </text>
                    </g>
                  );
                })}

                {/* Axes */}
                <line
                  x1={padding.left}
                  y1={padding.top + plotHeight}
                  x2={padding.left + plotWidth}
                  y2={padding.top + plotHeight}
                  stroke="#2C302E"
                  strokeWidth="1.5"
                />
                <line
                  x1={padding.left}
                  y1={padding.top}
                  x2={padding.left}
                  y2={padding.top + plotHeight}
                  stroke="#2C302E"
                  strokeWidth="1.5"
                />

                {/* X Axis Label */}
                <text
                  x={padding.left + plotWidth / 2}
                  y={svgHeight - 8}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="bold"
                  fill="#2C302E"
                >
                  Time t (seconds) {useLogTime ? '[log₁₀ scale]' : '[linear scale]'}
                </text>

                {/* Y Axis Label */}
                <text
                  x={-padding.top - plotHeight / 2}
                  y={18}
                  transform="rotate(-90)"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="bold"
                  fill="#2C302E"
                >
                  Concentration (mol/L)
                </text>

                {/* Trajectory Paths */}
                {chartData &&
                  simulationResult?.species_names.map((sp) => (
                    <path
                      key={sp}
                      d={chartData.paths[sp] || ''}
                      fill="none"
                      stroke={chartData.speciesColors[sp]}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  ))}
              </svg>
            </div>
          </div>

          {/* Final Concentration Values */}
          {simulationResult && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-4 border-t border-surface-container">
              {simulationResult.species_names.map((sp) => (
                <div key={sp} className="p-2.5 rounded-xl bg-surface-container/50 border border-surface-container">
                  <div className="text-[11px] font-bold text-on-surface-variant">[{sp}] Final:</div>
                  <div className="font-mono text-label-md font-bold text-primary">
                    {simulationResult.final_concentrations[sp]?.toExponential(4)} M
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Phase Space / Limit Cycle Portrait (1 col) */}
        <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-tertiary" />
                <h3 className="font-bold text-on-surface">Phase-Space Orbit</h3>
              </div>
            </div>
            <p className="text-[11px] text-on-surface-variant mb-3">
              Parametric state-space portrait revealing limit cycles, dampening, and invariant manifolds.
            </p>

            {/* Select Phase Space Axes */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <label className="text-[10px] font-bold text-on-surface-variant block">X-Axis Species</label>
                <select
                  value={phaseXSpecies}
                  onChange={(e) => setPhaseXSpecies(e.target.value)}
                  className="w-full bg-surface-container border border-surface-container-high rounded-lg px-2 py-1 text-[12px] text-on-surface"
                >
                  {simulationResult?.species_names.map((sp) => (
                    <option key={sp} value={sp}>
                      [{sp}]
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-on-surface-variant block">Y-Axis Species</label>
                <select
                  value={phaseYSpecies}
                  onChange={(e) => setPhaseYSpecies(e.target.value)}
                  className="w-full bg-surface-container border border-surface-container-high rounded-lg px-2 py-1 text-[12px] text-on-surface"
                >
                  {simulationResult?.species_names.map((sp) => (
                    <option key={sp} value={sp}>
                      [{sp}]
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Phase Orbit SVG */}
            {phasePlotData && (
              <div className="w-full flex justify-center">
                <svg
                  viewBox={`0 0 ${phasePlotData.pw} ${phasePlotData.ph}`}
                  className="w-full max-w-[280px] h-auto bg-surface-container-lowest rounded-xl border border-surface-container"
                >
                  <line
                    x1={phasePlotData.pPad.left}
                    y1={phasePlotData.pPad.top + (phasePlotData.ph - phasePlotData.pPad.top - phasePlotData.pPad.bottom)}
                    x2={phasePlotData.pw - phasePlotData.pPad.right}
                    y2={phasePlotData.pPad.top + (phasePlotData.ph - phasePlotData.pPad.top - phasePlotData.pPad.bottom)}
                    stroke="#2C302E"
                    strokeWidth="1.2"
                  />
                  <line
                    x1={phasePlotData.pPad.left}
                    y1={phasePlotData.pPad.top}
                    x2={phasePlotData.pPad.left}
                    y2={phasePlotData.pPad.top + (phasePlotData.ph - phasePlotData.pPad.top - phasePlotData.pPad.bottom)}
                    stroke="#2C302E"
                    strokeWidth="1.2"
                  />
                  <path
                    d={phasePlotData.pathD}
                    fill="none"
                    stroke="#D47942"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <text
                    x={phasePlotData.pw / 2}
                    y={phasePlotData.ph - 6}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="bold"
                    fill="#2C302E"
                  >
                    [{phaseXSpecies}]
                  </text>
                  <text
                    x={-phasePlotData.ph / 2}
                    y={12}
                    transform="rotate(-90)"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="bold"
                    fill="#2C302E"
                  >
                    [{phaseYSpecies}]
                  </text>
                </svg>
              </div>
            )}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-surface-container/40 border border-surface-container text-[11px] text-on-surface-variant">
            {selectedPresetId === 'oregonator_bz' ? (
              <span className="text-tertiary font-medium">
                ★ Closed periodic limit cycle confirmed: characteristic relaxation oscillation of the Belousov-Zhabotinsky reaction.
              </span>
            ) : (
              <span>
                Asymptotic approach toward invariant manifold / chemical equilibrium point.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Analytic Jacobian Matrix & Elementary Reactions Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Elementary Reactions List */}
        <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-on-surface">Reaction Mechanism Steps</h3>
          </div>
          <div className="space-y-2">
            {activePreset?.reactions.map((rxn, idx) => (
              <div
                key={rxn.id}
                className="p-3 rounded-xl bg-surface-container/60 border border-surface-container flex items-center justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-primary mr-2">Step {idx + 1}:</span>
                  <span className="font-mono text-body-sm font-bold text-on-surface">{rxn.equation_str}</span>
                </div>
                <span className="font-mono text-label-sm font-semibold text-on-surface-variant">
                  k = {rxn.rate_constant.toExponential(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Analytic Jacobian Matrix */}
        <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-tertiary" />
              <h3 className="font-bold text-on-surface">Analytic Jacobian Sensitivity Matrix J</h3>
            </div>
            <span className="text-[10px] font-mono text-on-surface-variant">J_ik = ∂(dC_i/dt) / ∂C_k</span>
          </div>

          {simulationResult && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse font-mono text-[11px]">
                <thead>
                  <tr>
                    <th className="p-2 border border-surface-container text-left text-on-surface-variant">∂/∂C</th>
                    {simulationResult.species_names.map((sp) => (
                      <th key={sp} className="p-2 border border-surface-container text-center text-primary font-bold">
                        {sp}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {simulationResult.species_names.map((rSp, rIdx) => (
                    <tr key={rSp}>
                      <td className="p-2 border border-surface-container font-bold text-primary">{rSp}</td>
                      {simulationResult.jacobian_matrix[rIdx]?.map((val, cIdx) => {
                        const isNeg = val < 0;
                        const isPos = val > 0;
                        return (
                          <td
                            key={cIdx}
                            className={`p-2 border border-surface-container text-center font-bold ${
                              isNeg
                                ? 'bg-red-500/10 text-red-700 dark:text-red-300'
                                : isPos
                                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                                : 'text-on-surface-variant'
                            }`}
                          >
                            {val.toFixed(2)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
