import React, { useState, useEffect, useMemo } from 'react';
import {
  ChromatographySimulationResult,
  ChromatographyPresetSummary,
  AnalytePeak,
} from '../../../types/chromatography';
import { chromatographyService } from '../../../services/chromatographyService';
import { experimentsApi } from '../../../services/api';

const PEAK_COLORS = [
  '#0284c7', // Sky Blue
  '#d97706', // Amber
  '#059669', // Emerald
  '#7c3aed', // Violet
  '#e11d48', // Rose
  '#0891b2', // Cyan
];

export const ChromatographyWorkstation: React.FC = () => {
  const [presets, setPresets] = useState<ChromatographyPresetSummary[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('analgesics_hplc');
  const [simulation, setSimulation] = useState<ChromatographySimulationResult | null>(null);

  // Operating condition adjustments
  const [flowRate, setFlowRate] = useState<number>(1.0);
  const [organicPercent, setOrganicPercent] = useState<number>(45.0);
  const [temperatureC, setTemperatureC] = useState<number>(30.0);

  // Active highlighted peak
  const [hoveredPeakId, setHoveredPeakId] = useState<string | null>(null);

  // Electronic Lab Notebook state
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Load preset catalog on mount
  useEffect(() => {
    chromatographyService.getPresets().then((list) => {
      setPresets(list);
    });
  }, []);

  // Sync simulation whenever preset or operating conditions change
  useEffect(() => {
    chromatographyService
      .getPresetSimulation(selectedPresetId, flowRate, organicPercent, temperatureC)
      .then((res) => {
        setSimulation(res);
      });
  }, [selectedPresetId, flowRate, organicPercent, temperatureC]);

  // When selecting a new preset, reset conditions to preset defaults
  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    if (presetId === 'analgesics_hplc') {
      setFlowRate(1.0);
      setOrganicPercent(45.0);
      setTemperatureC(30.0);
    } else if (presetId === 'parabens_hplc') {
      setFlowRate(1.2);
      setOrganicPercent(50.0);
      setTemperatureC(35.0);
    } else if (presetId === 'nucleobases_hplc') {
      setFlowRate(0.8);
      setOrganicPercent(5.0);
      setTemperatureC(25.0);
    } else if (presetId === 'btex_gc') {
      setFlowRate(1.2);
      setOrganicPercent(100.0);
      setTemperatureC(45.0);
    } else if (presetId === 'alcohols_gc') {
      setFlowRate(1.5);
      setOrganicPercent(100.0);
      setTemperatureC(85.0);
    }
  };

  // Electronic Lab Notebook saving
  const handleSaveToNotebook = async () => {
    if (!simulation) return;
    setIsSaving(true);
    setSaveStatus(null);
    try {
      await experimentsApi.saveExperiment({
        title: `Chromatography: ${simulation.sample_name}`,
        experiment_type: 'chromatography',
        status: 'completed',
        observations: `Simulated ${simulation.modality.toUpperCase()} run. Plates N=${simulation.mean_theoretical_plates}, Min Rs=${simulation.minimum_resolution}. Status: ${simulation.separation_quality}. Conditions: Flow=${simulation.conditions.flow_rate_ml_min} mL/min, Temp=${simulation.conditions.temperature_c}°C.`,
        state_data: JSON.stringify({
          modality: simulation.modality,
          column: simulation.column.name,
          min_resolution: simulation.minimum_resolution,
          peaks: simulation.peaks.map((p) => ({
            compound: p.compound_name,
            tr_min: p.retention_time_min,
            k: p.retention_factor_k,
            plates: p.theoretical_plates_n,
            resolution: p.resolution_with_previous,
          })),
        }),
      });
      setSaveStatus('Logged to Lab Notebook');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch {
      setSaveStatus('Failed to log');
    } finally {
      setIsSaving(false);
    }
  };

  // SVG dimensions and scaling for chromatogram trace
  const svgWidth = 800;
  const svgHeight = 280;
  const padding = { top: 25, right: 30, bottom: 45, left: 60 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  const maxTime = simulation?.run_time_min || 10;
  const maxSignal = useMemo(() => {
    if (!simulation || simulation.chromatogram_trace.length === 0) return 50;
    const maxVal = Math.max(...simulation.chromatogram_trace.map((pt) => pt.signal_intensity));
    return Math.max(maxVal * 1.15, 10);
  }, [simulation]);

  const scaleX = (t: number) => padding.left + (t / maxTime) * plotWidth;
  const scaleY = (s: number) => padding.top + plotHeight - (s / maxSignal) * plotHeight;

  // Path data for the chromatogram signal
  const chromatogramPath = useMemo(() => {
    if (!simulation || simulation.chromatogram_trace.length === 0) return '';
    return simulation.chromatogram_trace
      .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(pt.time_min).toFixed(1)} ${scaleY(pt.signal_intensity).toFixed(1)}`)
      .join(' ');
  }, [simulation, maxTime, maxSignal]);

  const chromatogramAreaPath = useMemo(() => {
    if (!simulation || simulation.chromatogram_trace.length === 0) return '';
    const baselineY = scaleY(0).toFixed(1);
    const trace = simulation.chromatogram_trace
      .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(pt.time_min).toFixed(1)} ${scaleY(pt.signal_intensity).toFixed(1)}`)
      .join(' ');
    const firstX = scaleX(simulation.chromatogram_trace[0].time_min).toFixed(1);
    const lastX = scaleX(simulation.chromatogram_trace[simulation.chromatogram_trace.length - 1].time_min).toFixed(1);
    return `${trace} L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;
  }, [simulation, maxTime, maxSignal]);

  // Quality badge styling
  const qualityBadge = useMemo(() => {
    if (!simulation) return null;
    if (simulation.separation_quality === 'baseline_resolved') {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">check_circle</span>
          Baseline Resolved (Rs &ge; 1.5)
        </span>
      );
    }
    if (simulation.separation_quality === 'partial_overlap') {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800 flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">warning</span>
          Partial Overlap (1.0 &le; Rs &lt; 1.5)
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-300 dark:border-rose-800 flex items-center gap-1">
        <span className="material-symbols-outlined text-[14px]">error</span>
        Co-eluting (Rs &lt; 1.0)
      </span>
    );
  }, [simulation]);

  return (
    <div className="flex flex-col w-full space-y-space-md">
      {/* Top Header Command Strip */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-headline-md text-base sm:text-lg text-on-surface font-bold">
              Rig #5: Analytical Chromatography & Separation Science
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-code-sm text-xs font-semibold uppercase">
              {simulation?.modality.toUpperCase()} &bull; {simulation?.elution_mode.replace('_', ' ').toUpperCase()}
            </span>
            {qualityBadge}
          </div>
          <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
            van Deemter column kinetics, theoretical plate integrals, Snyder-Soczewinski solvent selectivity, and Gaussian peak integration
          </p>
        </div>

        {/* Notebook & Action Bar */}
        <div className="flex items-center gap-2">
          {saveStatus && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {saveStatus}
            </span>
          )}
          <button
            type="button"
            onClick={handleSaveToNotebook}
            disabled={isSaving || !simulation}
            className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container border border-surface-container text-xs font-semibold text-on-surface flex items-center gap-1 transition"
          >
            <span className="material-symbols-outlined text-[16px]">bookmark_add</span>
            {isSaving ? 'Logging...' : 'Log to Notebook'}
          </button>
        </div>
      </div>

      {/* Preset Application Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {presets.map((preset) => {
          const isSelected = preset.id === selectedPresetId;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectPreset(preset.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap flex items-center gap-1.5 border ${
                isSelected
                  ? 'bg-primary text-on-primary border-primary shadow-xs'
                  : 'bg-surface-container-lowest text-on-surface-variant border-surface-container hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">
                {preset.modality === 'hplc' ? 'water_drop' : 'air'}
              </span>
              <span>{preset.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Analysis Grid: 8 cols (Chromatogram & Table) + 4 cols (Controls & van Deemter) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
        {/* Left Column (8 cols): Interactive Chromatogram & Peak Integration Table */}
        <div className="lg:col-span-8 space-y-space-md">
          {/* Chromatogram Canvas Card */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-low shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">ssid_chart</span>
                Detector Response Profile ({simulation?.detector === 'fid' ? 'pA' : 'mAU'} vs Time)
              </span>
              {simulation && (
                <div className="flex items-center gap-3 text-xs text-outline">
                  <span>Dead Time (t<sub>0</sub>): <strong className="text-on-surface font-mono">{simulation.dead_time_t0_min} min</strong></span>
                  <span>Run Time: <strong className="text-on-surface font-mono">{simulation.run_time_min} min</strong></span>
                </div>
              )}
            </div>

            {/* SVG Chromatogram Plot */}
            <div className="w-full overflow-x-auto bg-surface-container-low/40 rounded-lg p-2 border border-surface-container">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto min-w-[500px]">
                <defs>
                  <linearGradient id="chromGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1.0].map((frac) => {
                  const y = padding.top + plotHeight * frac;
                  return (
                    <line
                      key={frac}
                      x1={padding.left}
                      y1={y}
                      x2={svgWidth - padding.right}
                      y2={y}
                      stroke="currentColor"
                      strokeOpacity="0.1"
                      strokeDasharray="3 3"
                    />
                  );
                })}

                {/* Dead time t0 marker */}
                {simulation && (
                  <g>
                    <line
                      x1={scaleX(simulation.dead_time_t0_min)}
                      y1={padding.top}
                      x2={scaleX(simulation.dead_time_t0_min)}
                      y2={padding.top + plotHeight}
                      stroke="#94a3b8"
                      strokeDasharray="4 3"
                      strokeWidth="1.5"
                    />
                    <text
                      x={scaleX(simulation.dead_time_t0_min) + 4}
                      y={padding.top + 14}
                      fill="#64748b"
                      fontSize="10"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      t0 ({simulation.dead_time_t0_min}m)
                    </text>
                  </g>
                )}

                {/* Shaded Area Under Trace */}
                {chromatogramAreaPath && <path d={chromatogramAreaPath} fill="url(#chromGradient)" />}

                {/* Signal Line */}
                {chromatogramPath && (
                  <path d={chromatogramPath} fill="none" stroke="#0284c7" strokeWidth="2" strokeLinejoin="round" />
                )}

                {/* Peak Apex Markers & Labels */}
                {simulation?.peaks.map((peak, idx) => {
                  const peakX = scaleX(peak.retention_time_min);
                  const peakY = scaleY(peak.peak_height_mau);
                  const isHovered = hoveredPeakId === peak.compound_id;
                  const color = PEAK_COLORS[idx % PEAK_COLORS.length];

                  return (
                    <g
                      key={peak.compound_id}
                      onMouseEnter={() => setHoveredPeakId(peak.compound_id)}
                      onMouseLeave={() => setHoveredPeakId(null)}
                      className="cursor-pointer transition"
                    >
                      {/* Apex circle */}
                      <circle
                        cx={peakX}
                        cy={peakY}
                        r={isHovered ? 6 : 4}
                        fill={color}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                      {/* Peak Label above apex */}
                      <text
                        x={peakX}
                        y={Math.max(peakY - 10, 15)}
                        textAnchor="middle"
                        fill={color}
                        fontSize={isHovered ? '11' : '10'}
                        fontWeight="bold"
                        fontFamily="sans-serif"
                      >
                        #{idx + 1} ({peak.retention_time_min}m)
                      </text>
                    </g>
                  );
                })}

                {/* X Axis */}
                <line
                  x1={padding.left}
                  y1={padding.top + plotHeight}
                  x2={svgWidth - padding.right}
                  y2={padding.top + plotHeight}
                  stroke="currentColor"
                  strokeOpacity="0.4"
                  strokeWidth="1.5"
                />
                <text
                  x={padding.left + plotWidth / 2}
                  y={svgHeight - 8}
                  textAnchor="middle"
                  fill="currentColor"
                  opacity="0.7"
                  fontSize="11"
                  fontWeight="bold"
                >
                  Elution Retention Time (min)
                </text>

                {/* X Axis Ticks */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const t = (maxTime / 5) * i;
                  const x = scaleX(t);
                  return (
                    <g key={i}>
                      <line x1={x} y1={padding.top + plotHeight} x2={x} y2={padding.top + plotHeight + 4} stroke="currentColor" strokeOpacity="0.5" />
                      <text x={x} y={padding.top + plotHeight + 16} textAnchor="middle" fill="currentColor" opacity="0.7" fontSize="10" fontFamily="monospace">
                        {t.toFixed(1)}
                      </text>
                    </g>
                  );
                })}

                {/* Y Axis */}
                <line
                  x1={padding.left}
                  y1={padding.top}
                  x2={padding.left}
                  y2={padding.top + plotHeight}
                  stroke="currentColor"
                  strokeOpacity="0.4"
                  strokeWidth="1.5"
                />
                <text
                  x={-(padding.top + plotHeight / 2)}
                  y={18}
                  transform="rotate(-90)"
                  textAnchor="middle"
                  fill="currentColor"
                  opacity="0.7"
                  fontSize="11"
                  fontWeight="bold"
                >
                  Signal ({simulation?.detector === 'fid' ? 'pA' : 'mAU'})
                </text>
              </svg>
            </div>
          </div>

          {/* Peak Integration & Retention Parameters Table */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-low shadow-sm overflow-x-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-outline block mb-2">
              Peak Integration & Chromatographic Parameters
            </span>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-surface-container text-outline">
                  <th className="py-2 px-2 font-semibold">#</th>
                  <th className="py-2 px-2 font-semibold">Compound</th>
                  <th className="py-2 px-2 font-semibold">Formula</th>
                  <th className="py-2 px-2 font-semibold font-mono">t<sub>r</sub> (min)</th>
                  <th className="py-2 px-2 font-semibold font-mono">k&apos;</th>
                  <th className="py-2 px-2 font-semibold font-mono">Plates (N)</th>
                  <th className="py-2 px-2 font-semibold font-mono">W<sub>1/2</sub> (min)</th>
                  <th className="py-2 px-2 font-semibold font-mono">Area</th>
                  <th className="py-2 px-2 font-semibold font-mono">Tailing (T<sub>f</sub>)</th>
                  <th className="py-2 px-2 font-semibold font-mono">R<sub>s</sub></th>
                  <th className="py-2 px-2 font-semibold font-mono">&alpha;</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container/60">
                {simulation?.peaks.map((peak, idx) => {
                  const isHovered = hoveredPeakId === peak.compound_id;
                  const color = PEAK_COLORS[idx % PEAK_COLORS.length];

                  return (
                    <tr
                      key={peak.compound_id}
                      onMouseEnter={() => setHoveredPeakId(peak.compound_id)}
                      onMouseLeave={() => setHoveredPeakId(null)}
                      className={`transition ${isHovered ? 'bg-surface-container' : 'hover:bg-surface-container-low/50'}`}
                    >
                      <td className="py-2 px-2 font-bold" style={{ color }}>
                        #{idx + 1}
                      </td>
                      <td className="py-2 px-2 font-semibold text-on-surface">
                        {peak.compound_name}
                      </td>
                      <td className="py-2 px-2 font-mono text-outline">
                        {peak.chemical_formula}
                      </td>
                      <td className="py-2 px-2 font-mono font-bold text-on-surface">
                        {peak.retention_time_min}
                      </td>
                      <td className="py-2 px-2 font-mono text-on-surface-variant">
                        {peak.retention_factor_k}
                      </td>
                      <td className="py-2 px-2 font-mono text-on-surface-variant">
                        {peak.theoretical_plates_n.toLocaleString()}
                      </td>
                      <td className="py-2 px-2 font-mono text-on-surface-variant">
                        {peak.peak_width_half_min}
                      </td>
                      <td className="py-2 px-2 font-mono text-on-surface-variant">
                        {peak.peak_area_mau_s}
                      </td>
                      <td className="py-2 px-2 font-mono text-on-surface-variant">
                        {peak.tailing_factor}
                      </td>
                      <td className="py-2 px-2 font-mono font-bold">
                        {peak.resolution_with_previous !== null && peak.resolution_with_previous !== undefined ? (
                          <span
                            className={
                              peak.resolution_with_previous >= 1.5
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : peak.resolution_with_previous >= 1.0
                                ? 'text-amber-600 dark:text-amber-400'
                                : 'text-rose-600 dark:text-rose-400'
                            }
                          >
                            {peak.resolution_with_previous}
                          </span>
                        ) : (
                          <span className="text-outline">&mdash;</span>
                        )}
                      </td>
                      <td className="py-2 px-2 font-mono text-on-surface-variant">
                        {peak.selectivity_with_previous ?? <span className="text-outline">&mdash;</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (4 cols): Instrumental Controls, van Deemter & Insights */}
        <div className="lg:col-span-4 space-y-space-md">
          {/* Instrumental Controls Card */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-low shadow-sm space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">tune</span>
              Instrument Operating Parameters
            </span>

            {/* Flow Rate Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant font-medium">Mobile Phase Flow Rate</span>
                <span className="font-mono font-bold text-on-surface">{flowRate.toFixed(2)} mL/min</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="2.5"
                step="0.05"
                value={flowRate}
                onChange={(e) => setFlowRate(parseFloat(e.target.value))}
                className="w-full accent-primary h-1.5 bg-surface-container rounded-lg cursor-pointer"
              />
            </div>

            {/* % Organic (HPLC) or Temperature (GC) */}
            {simulation?.modality === 'hplc' ? (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant font-medium">Solvent B (% Organic)</span>
                  <span className="font-mono font-bold text-primary">{organicPercent.toFixed(0)}% B</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="95"
                  step="1"
                  value={organicPercent}
                  onChange={(e) => setOrganicPercent(parseFloat(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-surface-container rounded-lg cursor-pointer"
                />
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant font-medium">Oven Initial Temperature</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{temperatureC.toFixed(0)}°C</span>
                </div>
                <input
                  type="range"
                  min="35"
                  max="180"
                  step="5"
                  value={temperatureC}
                  onChange={(e) => setTemperatureC(parseFloat(e.target.value))}
                  className="w-full accent-amber-600 h-1.5 bg-surface-container rounded-lg cursor-pointer"
                />
              </div>
            )}

            {/* Column Temperature Slider */}
            {simulation?.modality === 'hplc' && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant font-medium">Column Compartment Temp</span>
                  <span className="font-mono font-bold text-on-surface">{temperatureC.toFixed(0)}°C</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="60"
                  step="1"
                  value={temperatureC}
                  onChange={(e) => setTemperatureC(parseFloat(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-surface-container rounded-lg cursor-pointer"
                />
              </div>
            )}

            {/* Column & Mobile Phase Specs Box */}
            {simulation && (
              <div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-outline">Column:</span>
                  <span className="font-semibold text-on-surface text-right">{simulation.column.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Dimensions:</span>
                  <span className="font-mono text-on-surface">
                    {simulation.column.length_mm} x {simulation.column.inner_diameter_mm} mm
                    {simulation.column.particle_size_um > 0 ? ` (${simulation.column.particle_size_um} µm)` : ''}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Carrier / Mobile A:</span>
                  <span className="text-on-surface font-mono">{simulation.conditions.solvent_a_name}</span>
                </div>
                {simulation.modality === 'hplc' && (
                  <div className="flex justify-between">
                    <span className="text-outline">Solvent B:</span>
                    <span className="text-on-surface font-mono">{simulation.conditions.solvent_b_name}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* van Deemter Equation Efficiency Card */}
          {simulation && (
            <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-low shadow-sm space-y-2 text-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">speed</span>
                van Deemter Column Kinetics (H vs u)
              </span>

              <div className="p-2 rounded-lg bg-surface-container-low border border-surface-container font-mono text-[11px] text-center text-on-surface">
                H = A + B/u + C&middot;u
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-surface-container-low border border-surface-container">
                  <span className="text-[10px] text-outline uppercase block font-semibold">Operating H</span>
                  <span className="font-mono font-bold text-on-surface text-sm">
                    {simulation.van_deemter.operating_plate_height_um} &micro;m
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-low border border-surface-container">
                  <span className="text-[10px] text-outline uppercase block font-semibold">Minimum H<sub>min</sub></span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    {simulation.van_deemter.minimum_plate_height_um} &micro;m
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-low border border-surface-container">
                  <span className="text-[10px] text-outline uppercase block font-semibold">Linear Velocity (u)</span>
                  <span className="font-mono font-bold text-on-surface text-sm">
                    {simulation.van_deemter.tested_velocity_mm_s} mm/s
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-low border border-surface-container">
                  <span className="text-[10px] text-outline uppercase block font-semibold">Optimal u<sub>opt</sub></span>
                  <span className="font-mono font-bold text-primary text-sm">
                    {simulation.van_deemter.optimal_velocity_mm_s} mm/s
                  </span>
                </div>
              </div>

              <div className="pt-1 text-[11px] text-outline space-y-0.5">
                <div>Eddy diffusion A = {simulation.van_deemter.term_a_um} &micro;m</div>
                <div>Longitudinal diffusion B = {simulation.van_deemter.term_b_um_mm_s} &micro;m&middot;mm/s</div>
                <div>Mass transfer resistance C = {simulation.van_deemter.term_c_s} s</div>
              </div>
            </div>
          )}

          {/* Pedagogical Insights Card */}
          {simulation && (
            <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-low shadow-sm space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-outline tracking-wider block">
                Separation Mechanism & Theory
              </span>
              <p className="text-on-surface-variant leading-relaxed">
                {simulation.pedagogical_notes ||
                  'Separation occurs due to differential partitioning between the mobile phase and stationary phase. Retention is modeled via the fundamental resolution equation and capacity factors.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
