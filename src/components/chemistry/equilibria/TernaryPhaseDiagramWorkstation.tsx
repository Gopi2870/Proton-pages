import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  TernaryLleService,
  ternaryToCartesian,
  cartesianToTernary,
} from '../../../services/ternaryLleService';
import {
  TernarySystemSummary,
  TernarySystemDetail,
  HunterNashResponse,
} from '../../../types/ternaryLle';
import {
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Info,
  Maximize2,
  FlaskConical,
  Scale,
} from 'lucide-react';

export const TernaryPhaseDiagramWorkstation: React.FC = () => {
  const [systems, setSystems] = useState<TernarySystemSummary[]>([]);
  const [selectedSystemId, setSelectedSystemId] = useState<string>('water_toluene_acetic_acid');
  const [systemDetail, setSystemDetail] = useState<TernarySystemDetail | null>(null);

  // Simulation inputs
  const [feedRate, setFeedRate] = useState<number>(1000);
  const [feedSoluteFraction, setFeedSoluteFraction] = useState<number>(0.30);
  const [solventRate, setSolventRate] = useState<number>(1200);
  const [targetRaffinateFraction, setTargetRaffinateFraction] = useState<number>(0.05);
  const [maxStages, setMaxStages] = useState<number>(15);

  const [simulationResult, setSimulationResult] = useState<HunterNashResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cursorTernary, setCursorTernary] = useState<{ x_a: number; x_b: number; x_c: number } | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);

  // Load systems list
  useEffect(() => {
    TernaryLleService.getSystems().then((list) => {
      if (list && list.length > 0) {
        setSystems(list);
      }
    });
  }, []);

  // Load system detail when selected
  useEffect(() => {
    TernaryLleService.getSystemDetail(selectedSystemId).then((detail) => {
      setSystemDetail(detail);
    });
  }, [selectedSystemId]);

  // Run simulation
  const handleRunSimulation = async () => {
    setIsLoading(true);
    try {
      const res = await TernaryLleService.simulateHunterNash({
        system_id: selectedSystemId,
        feed_rate_kg_h: feedRate,
        feed_x_carrier: 1.0 - feedSoluteFraction,
        feed_x_solvent: 0.0,
        feed_x_solute: feedSoluteFraction,
        solvent_rate_kg_h: solventRate,
        solvent_x_carrier: 0.0,
        solvent_x_solvent: 1.0,
        solvent_x_solute: 0.0,
        target_raffinate_solute_fraction: targetRaffinateFraction,
        max_stages: maxStages,
      });
      setSimulationResult(res);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-run simulation when system detail changes
  useEffect(() => {
    if (systemDetail) {
      handleRunSimulation();
    }
  }, [systemDetail]);

  // SVG Geometry Dimensions
  const SVG_W = 600;
  const SVG_H = 520;
  const MARGIN = 50;
  const SCALE_X = SVG_W - 2 * MARGIN;
  const SCALE_Y = SVG_H - 2 * MARGIN;

  const toSvgCoords = (cartX: number, cartY: number): [number, number] => {
    const sx = MARGIN + cartX * SCALE_X;
    const sy = SVG_H - MARGIN - (cartY / (Math.sqrt(3) / 2)) * SCALE_Y;
    return [sx, sy];
  };

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Normalize to SVG viewBox
    const scaleFactorX = SVG_W / rect.width;
    const scaleFactorY = SVG_H / rect.height;
    const svgX = clientX * scaleFactorX;
    const svgY = clientY * scaleFactorY;

    // Convert from SVG back to Cartesian [0, 1] x [0, sqrt(3)/2]
    const cartX = (svgX - MARGIN) / SCALE_X;
    const cartY = ((SVG_H - MARGIN - svgY) / SCALE_Y) * (Math.sqrt(3) / 2);

    if (cartX >= 0 && cartX <= 1 && cartY >= 0 && cartY <= Math.sqrt(3) / 2) {
      const [xa, xb, xc] = cartesianToTernary(cartX, cartY);
      if (xa >= 0 && xb >= 0 && xc >= 0) {
        setCursorTernary({ x_a: xa, x_b: xb, x_c: xc });
        return;
      }
    }
    setCursorTernary(null);
  };

  const handleSvgMouseLeave = () => {
    setCursorTernary(null);
  };

  // Binodal SVG path
  const binodalPathData = useMemo(() => {
    if (!systemDetail || !systemDetail.binodal_curve.length) return '';
    const pts = systemDetail.binodal_curve.map((p) => {
      const [sx, sy] = toSvgCoords(p.cartesian_x, p.cartesian_y);
      return `${sx.toFixed(1)},${sy.toFixed(1)}`;
    });
    return `M ${pts.join(' L ')}`;
  }, [systemDetail]);

  // Equilateral Grid lines (at 10%, 20%, ..., 90%)
  const gridLines = useMemo(() => {
    const lines: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
    for (let f = 0.1; f < 0.95; f += 0.1) {
      // 1. Constant Solute (horizontal lines)
      const [s1x, s1y] = toSvgCoords(ternaryToCartesian({ x_a: 1 - f, x_b: 0, x_c: f })[0], ternaryToCartesian({ x_a: 1 - f, x_b: 0, x_c: f })[1]);
      const [s2x, s2y] = toSvgCoords(ternaryToCartesian({ x_a: 0, x_b: 1 - f, x_c: f })[0], ternaryToCartesian({ x_a: 0, x_b: 1 - f, x_c: f })[1]);
      lines.push({ x1: s1x, y1: s1y, x2: s2x, y2: s2y });

      // 2. Constant Solvent
      const [b1x, b1y] = toSvgCoords(ternaryToCartesian({ x_a: 1 - f, x_b: f, x_c: 0 })[0], ternaryToCartesian({ x_a: 1 - f, x_b: f, x_c: 0 })[1]);
      const [b2x, b2y] = toSvgCoords(ternaryToCartesian({ x_a: 0, x_b: f, x_c: 1 - f })[0], ternaryToCartesian({ x_a: 0, x_b: f, x_c: 1 - f })[1]);
      lines.push({ x1: b1x, y1: b1y, x2: b2x, y2: b2y });

      // 3. Constant Carrier
      const [a1x, a1y] = toSvgCoords(ternaryToCartesian({ x_a: f, x_b: 1 - f, x_c: 0 })[0], ternaryToCartesian({ x_a: f, x_b: 1 - f, x_c: 0 })[1]);
      const [a2x, a2y] = toSvgCoords(ternaryToCartesian({ x_a: f, x_b: 0, x_c: 1 - f })[0], ternaryToCartesian({ x_a: f, x_b: 0, x_c: 1 - f })[1]);
      lines.push({ x1: a1x, y1: a1y, x2: a2x, y2: a2y });
    }
    return lines;
  }, []);

  const [vertexAx, vertexAy] = toSvgCoords(0, 0);
  const [vertexBx, vertexBy] = toSvgCoords(1, 0);
  const [vertexCx, vertexCy] = toSvgCoords(0.5, Math.sqrt(3) / 2);

  return (
    <div className="bg-surface-container-lowest border border-surface-container-low rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-surface-container-low gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[24px]">change_circle</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold font-headline-sm text-on-surface">
                Ternary Liquid-Liquid Extraction (LLE) & Phase Equilibria
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-[11px] font-semibold">
                PR #038 Rig
              </span>
            </div>
            <p className="text-body-sm text-on-surface-variant">
              Equilateral Gibbs triangular coordinate geometry, binodal miscibility gaps, tie-lines, and Hunter-Nash multistage countercurrent extraction.
            </p>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-on-surface-variant">Ternary System:</label>
          <select
            value={selectedSystemId}
            onChange={(e) => setSelectedSystemId(e.target.value)}
            className="bg-surface-container-low border border-surface-container-high rounded-xl px-3 py-2 text-xs font-semibold text-on-surface focus:outline-none focus:border-primary"
          >
            {systems.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Left Diagram Viewport, Right Controls & Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Gibbs Equilateral Diagram (7 cols) */}
        <div className="lg:col-span-7 bg-surface-container-low/40 border border-surface-container rounded-2xl p-4 flex flex-col items-center">
          <div className="w-full flex items-center justify-between px-2 mb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-on-surface">
              <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
              <span>Gibbs Triangular Phase Diagram</span>
            </div>
            {cursorTernary && (
              <div className="bg-surface-container-lowest border border-surface-container-high px-3 py-1 rounded-lg text-xs font-code-sm text-primary font-bold shadow-xs">
                {systemDetail?.carrier_name || 'Carrier'}: {(cursorTernary.x_a * 100).toFixed(1)}% |{' '}
                {systemDetail?.solvent_name || 'Solvent'}: {(cursorTernary.x_b * 100).toFixed(1)}% |{' '}
                {systemDetail?.solute_name || 'Solute'}: {(cursorTernary.x_c * 100).toFixed(1)}%
              </div>
            )}
          </div>

          <div className="relative w-full max-w-[560px] aspect-[600/520]">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              className="w-full h-full cursor-crosshair select-none"
              onMouseMove={handleSvgMouseMove}
              onMouseLeave={handleSvgMouseLeave}
            >
              {/* Outer Equilateral Triangle Base */}
              <polygon
                points={`${vertexAx},${vertexAy} ${vertexBx},${vertexBy} ${vertexCx},${vertexCy}`}
                fill="#FAF3ED"
                stroke="#2C302E"
                strokeWidth="2"
              />

              {/* Grid Lines */}
              {gridLines.map((gl, i) => (
                <line
                  key={i}
                  x1={gl.x1}
                  y1={gl.y1}
                  x2={gl.x2}
                  y2={gl.y2}
                  stroke="#E8DFD8"
                  strokeWidth="1"
                  strokeDasharray="2,3"
                />
              ))}

              {/* Binodal Miscibility Gap Curve */}
              {binodalPathData && (
                <path
                  d={binodalPathData}
                  fill="rgba(212, 121, 66, 0.12)"
                  stroke="#D47942"
                  strokeWidth="2.5"
                />
              )}

              {/* Plait Point */}
              {systemDetail?.plait_point && (
                <g>
                  {(() => {
                    const [px, py] = toSvgCoords(
                      systemDetail.plait_point.cartesian_x,
                      systemDetail.plait_point.cartesian_y
                    );
                    return (
                      <>
                        <circle cx={px} cy={py} r="5" fill="#8B572A" stroke="#FFFFFF" strokeWidth="1.5" />
                        <text
                          x={px}
                          y={py - 8}
                          textAnchor="middle"
                          className="text-[10px] font-bold fill-[#8B572A]"
                        >
                          Plait Point (P)
                        </text>
                      </>
                    );
                  })()}
                </g>
              )}

              {/* Experimental Tie-Lines */}
              {systemDetail?.tie_lines.map((tl) => {
                const [rx, ry] = toSvgCoords(tl.raffinate.cartesian_x, tl.raffinate.cartesian_y);
                const [ex, ey] = toSvgCoords(tl.extract.cartesian_x, tl.extract.cartesian_y);
                return (
                  <g key={tl.id}>
                    <line
                      x1={rx}
                      y1={ry}
                      x2={ex}
                      y2={ey}
                      stroke="#8B572A"
                      strokeWidth="1.5"
                      strokeDasharray="4,3"
                    />
                    <circle cx={rx} cy={ry} r="3" fill="#D47942" />
                    <circle cx={ex} cy={ey} r="3" fill="#8B572A" />
                  </g>
                );
              })}

              {/* Hunter-Nash Stepping Lines */}
              {simulationResult && (
                <g>
                  {/* Overall Mass Balance Line: F -> M -> S */}
                  {(() => {
                    const [fx, fy] = toSvgCoords(
                      simulationResult.feed_point.cartesian_x,
                      simulationResult.feed_point.cartesian_y
                    );
                    const [sx, sy] = toSvgCoords(
                      simulationResult.solvent_point.cartesian_x,
                      simulationResult.solvent_point.cartesian_y
                    );
                    const [mx, my] = toSvgCoords(
                      simulationResult.mixture_point.cartesian_x,
                      simulationResult.mixture_point.cartesian_y
                    );
                    return (
                      <>
                        <line x1={fx} y1={fy} x2={sx} y2={sy} stroke="#2C302E" strokeWidth="1.5" />
                        <circle cx={fx} cy={fy} r="5" fill="#D47942" stroke="#FFFFFF" strokeWidth="1.5" />
                        <text x={fx - 12} y={fy - 6} className="text-[11px] font-bold fill-[#D47942]">
                          F
                        </text>
                        <circle cx={sx} cy={sy} r="5" fill="#8B572A" stroke="#FFFFFF" strokeWidth="1.5" />
                        <text x={sx + 10} y={sy + 12} className="text-[11px] font-bold fill-[#8B572A]">
                          S
                        </text>
                        <circle cx={mx} cy={my} r="5" fill="#2C302E" stroke="#FFFFFF" strokeWidth="1.5" />
                        <text x={mx} y={my - 8} textAnchor="middle" className="text-[11px] font-bold fill-[#2C302E]">
                          M
                        </text>
                      </>
                    );
                  })()}

                  {/* Stepping stages */}
                  {simulationResult.stages.map((st, idx) => {
                    const [ex, ey] = toSvgCoords(st.extract.cartesian_x, st.extract.cartesian_y);
                    const [rx, ry] = toSvgCoords(st.raffinate.cartesian_x, st.raffinate.cartesian_y);
                    return (
                      <g key={idx}>
                        <line x1={ex} y1={ey} x2={rx} y2={ry} stroke="#2563EB" strokeWidth="2" />
                        <circle cx={ex} cy={ey} r="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1" />
                        <text x={ex + 8} y={ey + 4} className="text-[10px] font-bold fill-[#2563EB]">
                          E{st.stage_number}
                        </text>
                        <circle cx={rx} cy={ry} r="4" fill="#DC2626" stroke="#FFFFFF" strokeWidth="1" />
                        <text x={rx - 16} y={ry + 4} className="text-[10px] font-bold fill-[#DC2626]">
                          R{st.stage_number}
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* Triangle Apex Vertex Labels */}
              <text
                x={vertexAx - 15}
                y={vertexAy + 24}
                textAnchor="middle"
                className="text-xs font-bold fill-[#2C302E]"
              >
                A: {systemDetail?.carrier_name || 'Carrier'} (100%)
              </text>
              <text
                x={vertexBx + 15}
                y={vertexBy + 24}
                textAnchor="middle"
                className="text-xs font-bold fill-[#2C302E]"
              >
                B: {systemDetail?.solvent_name || 'Solvent'} (100%)
              </text>
              <text
                x={vertexCx}
                y={vertexCy - 16}
                textAnchor="middle"
                className="text-xs font-bold fill-[#2C302E]"
              >
                C: {systemDetail?.solute_name || 'Solute'} (100%)
              </text>
            </svg>
          </div>

          {/* Diagram Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-on-surface-variant mt-3 pt-3 border-t border-surface-container">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-[#D47942] rounded-full inline-block" />
              <span>Binodal Curve (2-Phase Boundary)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-t border-dashed border-[#8B572A] inline-block" />
              <span>Equilibrium Tie-Lines</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] inline-block" />
              <span>Extracts (E)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] inline-block" />
              <span>Raffinates (R)</span>
            </span>
          </div>
        </div>

        {/* Right Column: Parameters, Simulation, and Telemetry (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Controls Box */}
          <div className="bg-surface-container-low/40 border border-surface-container rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold font-headline-sm text-on-surface flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-primary" />
              <span>Extraction Operating Parameters</span>
            </h3>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold text-on-surface">
                  <span>Feed Flow Rate (F)</span>
                  <span className="text-primary font-bold">{feedRate} kg/h</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="5000"
                  step="100"
                  value={feedRate}
                  onChange={(e) => setFeedRate(parseFloat(e.target.value))}
                  className="w-full accent-primary mt-1"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-on-surface">
                  <span>Feed Solute Fraction (xC,F)</span>
                  <span className="text-primary font-bold">{(feedSoluteFraction * 100).toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="0.10"
                  max="0.45"
                  step="0.01"
                  value={feedSoluteFraction}
                  onChange={(e) => setFeedSoluteFraction(parseFloat(e.target.value))}
                  className="w-full accent-primary mt-1"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-on-surface">
                  <span>Solvent Flow Rate (S)</span>
                  <span className="text-primary font-bold">{solventRate} kg/h</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="6000"
                  step="100"
                  value={solventRate}
                  onChange={(e) => setSolventRate(parseFloat(e.target.value))}
                  className="w-full accent-secondary mt-1"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-on-surface">
                  <span>Target Raffinate Solute (xC,RN)</span>
                  <span className="text-primary font-bold">{(targetRaffinateFraction * 100).toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.10"
                  step="0.005"
                  value={targetRaffinateFraction}
                  onChange={(e) => setTargetRaffinateFraction(parseFloat(e.target.value))}
                  className="w-full accent-primary mt-1"
                />
              </div>
            </div>

            <button
              onClick={handleRunSimulation}
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-on-primary text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isLoading ? 'Computing Hunter-Nash...' : 'Calculate Equilibrium Stages'}</span>
            </button>
          </div>

          {/* Telemetry Cards */}
          {simulationResult && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-surface-container-low/50 border border-surface-container rounded-xl p-3 text-center">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                    Theoretical Stages
                  </span>
                  <div className="text-xl font-extrabold text-primary mt-0.5">
                    {simulationResult.theoretical_stages_count} Stages
                  </div>
                </div>

                <div className="bg-surface-container-low/50 border border-surface-container rounded-xl p-3 text-center">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                    Solute Recovery
                  </span>
                  <div className="text-xl font-extrabold text-emerald-600 mt-0.5">
                    {simulationResult.solute_recovery_percent}%
                  </div>
                </div>

                <div className="bg-surface-container-low/50 border border-surface-container rounded-xl p-3 text-center">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                    Solvent Ratio S/F
                  </span>
                  <div className="text-base font-bold text-on-surface mt-0.5">
                    {simulationResult.actual_solvent_ratio} (min {simulationResult.minimum_solvent_ratio})
                  </div>
                </div>

                <div className="bg-surface-container-low/50 border border-surface-container rounded-xl p-3 text-center">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                    Two-Phase Region
                  </span>
                  <div className="text-base font-bold text-emerald-600 mt-0.5 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Valid Split</span>
                  </div>
                </div>
              </div>

              {/* Stage Stepping Table */}
              <div className="bg-surface-container-low/30 border border-surface-container rounded-xl p-3">
                <span className="text-xs font-bold text-on-surface mb-2 block">
                  Equilibrium Stage Cascade:
                </span>
                <div className="max-h-36 overflow-y-auto divide-y divide-surface-container-low text-[11px] font-code-sm">
                  {simulationResult.stages.map((st) => (
                    <div key={st.stage_number} className="py-1.5 flex items-center justify-between">
                      <span className="font-bold text-primary">Stage {st.stage_number}</span>
                      <span className="text-on-surface">
                        E: {(st.extract.x_c * 100).toFixed(1)}% | R: {(st.raffinate.x_c * 100).toFixed(1)}%
                      </span>
                      <span className="text-emerald-600 font-semibold">{st.solute_recovery_percent}% rec</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Thermodynamic Consistency Status */}
              <div className="bg-surface-container-low/30 border border-surface-container rounded-xl p-3 text-xs space-y-1">
                <span className="font-bold text-on-surface block">Thermodynamic Consistency:</span>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Hand Correlation:</span>
                  <span className="font-code-sm font-bold text-primary">
                    R² = {simulationResult.hand_correlation.r_squared} (Pass)
                  </span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Othmer-Tobias:</span>
                  <span className="font-code-sm font-bold text-primary">
                    R² = {simulationResult.othmer_tobias_correlation.r_squared} (Pass)
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
