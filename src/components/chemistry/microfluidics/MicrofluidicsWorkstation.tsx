import React, { useState, useEffect, useMemo } from 'react';
import {
  Waves,
  Droplets,
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
  Gauge,
  Flame,
  Layers,
  ArrowRight,
} from 'lucide-react';
import {
  microfluidicsService,
  CURATED_CHIPS,
  CURATED_REACTIONS,
} from '../../../services/microfluidicsService';
import {
  HydrodynamicResult,
  DropletGenerationResult,
  FlowReactionResult,
  JunctionGeometry,
} from '../../../types/microfluidics';

export const MicrofluidicsWorkstation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'droplets' | 'flow_reactor' | 'hydrodynamics'>('droplets');

  // Droplet generation parameters
  const [selectedChipId, setSelectedChipId] = useState<string>('chip_pdms_t_junction');
  const [geometry, setGeometry] = useState<JunctionGeometry>('t_junction');
  const [qdUlMin, setQdUlMin] = useState<number>(5.0);
  const [qcUlMin, setQcUlMin] = useState<number>(25.0);
  const [channelWidthUm, setChannelWidthUm] = useState<number>(100.0);
  const [channelHeightUm, setChannelHeightUm] = useState<number>(50.0);
  const [interfacialTensionNm, setInterfacialTensionNm] = useState<number>(0.025);
  const [continuousViscosity, setContinuousViscosity] = useState<number>(0.015);
  const [dropletResult, setDropletResult] = useState<DropletGenerationResult | null>(null);

  // Flow reactor parameters
  const [selectedRxnId, setSelectedRxnId] = useState<string>('rxn_aunp_synthesis');
  const [channelLengthMm, setChannelLengthMm] = useState<number>(500.0);
  const [totalFlowRateUlMin, setTotalFlowRateUlMin] = useState<number>(50.0);
  const [initialConcM, setInitialConcM] = useState<number>(1.0);
  const [tempC, setTempC] = useState<number>(35.0);
  const [reactorResult, setReactorResult] = useState<FlowReactionResult | null>(null);

  // Channel hydrodynamics parameters
  const [viscosityPaS, setViscosityPaS] = useState<number>(0.001);
  const [densityKgM3, setDensityKgM3] = useState<number>(1000.0);
  const [hydroResult, setHydroResult] = useState<HydrodynamicResult | null>(null);

  // Current reaction info
  const currentReaction = useMemo(() => {
    return CURATED_REACTIONS.find((r) => r.id === selectedRxnId) || CURATED_REACTIONS[0];
  }, [selectedRxnId]);

  // Update chip parameters when selection changes
  const handleChipChange = (chipId: string) => {
    setSelectedChipId(chipId);
    const chip = CURATED_CHIPS.find((c) => c.id === chipId);
    if (chip) {
      setGeometry(chip.geometry);
      setChannelWidthUm(chip.channel_width_um);
      setChannelHeightUm(chip.channel_height_um);
    }
  };

  // Run droplet simulation
  useEffect(() => {
    try {
      const res = microfluidicsService.simulateDropletsLocally({
        geometry,
        channel_width_um: channelWidthUm,
        channel_height_um: channelHeightUm,
        dispersed_flow_rate_ul_min: qdUlMin,
        continuous_flow_rate_ul_min: qcUlMin,
        continuous_viscosity_pa_s: continuousViscosity,
        dispersed_viscosity_pa_s: 0.001,
        interfacial_tension_n_m: interfacialTensionNm,
        diffusion_coefficient_m2_s: 1e-9,
      });
      setDropletResult(res);
    } catch (err) {
      console.error('Droplet simulation error:', err);
    }
  }, [
    geometry,
    channelWidthUm,
    channelHeightUm,
    qdUlMin,
    qcUlMin,
    continuousViscosity,
    interfacialTensionNm,
  ]);

  // Run flow reactor simulation
  useEffect(() => {
    try {
      const res = microfluidicsService.simulateFlowReactorLocally({
        channel_width_um: channelWidthUm,
        channel_height_um: channelHeightUm,
        channel_length_mm: channelLengthMm,
        total_flow_rate_ul_min: totalFlowRateUlMin,
        initial_concentration_m: initialConcM,
        rate_constant_k1: currentReaction.k1_at_ref_temp,
        rate_constant_k2: currentReaction.k2_at_ref_temp,
        temperature_k: tempC + 273.15,
        molecular_weight_g_mol: 150.0,
      });
      setReactorResult(res);
    } catch (err) {
      console.error('Flow reactor simulation error:', err);
    }
  }, [
    channelWidthUm,
    channelHeightUm,
    channelLengthMm,
    totalFlowRateUlMin,
    initialConcM,
    tempC,
    currentReaction,
  ]);

  // Run hydrodynamics simulation
  useEffect(() => {
    try {
      const res = microfluidicsService.calculateHydrodynamicsLocally({
        channel_width_um: channelWidthUm,
        channel_height_um: channelHeightUm,
        channel_length_mm: channelLengthMm,
        flow_rate_ul_min: totalFlowRateUlMin,
        viscosity_pa_s: viscosityPaS,
        density_kg_m3: densityKgM3,
        diffusion_coefficient_m2_s: 1e-9,
        interfacial_tension_n_m: interfacialTensionNm,
      });
      setHydroResult(res);
    } catch (err) {
      console.error('Hydrodynamics calculation error:', err);
    }
  }, [
    channelWidthUm,
    channelHeightUm,
    channelLengthMm,
    totalFlowRateUlMin,
    viscosityPaS,
    densityKgM3,
    interfacialTensionNm,
  ]);

  return (
    <div className="flex flex-col gap-6 p-6 bg-surface-container-lowest/60 rounded-2xl border border-outline-variant/30 backdrop-blur-xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
            <Droplets className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-on-surface">
                Microfluidics, Droplet Chemistry & Continuous-Flow Reactor
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                Rig #15
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Low-Reynolds laminar regimes, Garstecki droplet pinch-off, chaotic recirculation vortices, and axial dispersion PFRs
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-surface-container-low rounded-xl border border-outline-variant/40">
          <button
            type="button"
            onClick={() => setActiveTab('droplets')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'droplets'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>Droplet Generation</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('flow_reactor')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'flow_reactor'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Flow Reactor & RTD</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('hydrodynamics')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'hydrodynamics'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>Hydrodynamics & Re</span>
          </button>
        </div>
      </div>

      {/* TAB 1: DROPLET GENERATION */}
      {activeTab === 'droplets' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Chip & Junction Architecture
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-mono">
                  {geometry.toUpperCase()}
                </span>
              </div>

              {/* Chip Presets */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-on-surface-variant">Curated Microfluidic Chip</label>
                <select
                  value={selectedChipId}
                  onChange={(e) => handleChipChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-surface-container border border-outline-variant/40 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {CURATED_CHIPS.map((chip) => (
                    <option key={chip.id} value={chip.id}>
                      {chip.name} ({chip.geometry})
                    </option>
                  ))}
                </select>
              </div>

              {/* Dispersed Flow Rate Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">Dispersed Aqueous Flow (Q_d)</span>
                  <span className="font-mono font-semibold text-primary">{qdUlMin.toFixed(1)} μL/min</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="50.0"
                  step="0.5"
                  value={qdUlMin}
                  onChange={(e) => setQdUlMin(parseFloat(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />
              </div>

              {/* Continuous Flow Rate Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">Continuous Oil Flow (Q_c)</span>
                  <span className="font-mono font-semibold text-primary">{qcUlMin.toFixed(1)} μL/min</span>
                </div>
                <input
                  type="range"
                  min="5.0"
                  max="200.0"
                  step="1.0"
                  value={qcUlMin}
                  onChange={(e) => setQcUlMin(parseFloat(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />
              </div>

              {/* Interfacial Tension Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">Interfacial Tension (γ)</span>
                  <span className="font-mono font-semibold text-primary">{(interfacialTensionNm * 1000).toFixed(1)} mN/m</span>
                </div>
                <input
                  type="range"
                  min="5.0"
                  max="50.0"
                  step="1.0"
                  value={interfacialTensionNm * 1000}
                  onChange={(e) => setInterfacialTensionNm(parseFloat(e.target.value) / 1000.0)}
                  className="w-full accent-primary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />
              </div>

              {/* Oil Phase Viscosity */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">Carrier Oil Viscosity (μ_c)</span>
                  <span className="font-mono font-semibold text-primary">{(continuousViscosity * 1000).toFixed(1)} mPa·s</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="50.0"
                  step="1.0"
                  value={continuousViscosity * 1000}
                  onChange={(e) => setContinuousViscosity(parseFloat(e.target.value) / 1000.0)}
                  className="w-full accent-primary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Quick Metrics */}
            {dropletResult && (
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold">Droplet Volume</span>
                  <span className="text-base font-bold text-primary font-mono mt-0.5">
                    {dropletResult.droplet_volume_pl.toFixed(1)} pL
                  </span>
                  <span className="text-[10px] text-on-surface-variant">
                    Ø {dropletResult.droplet_diameter_um.toFixed(1)} μm
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold">Frequency</span>
                  <span className="text-base font-bold text-tertiary font-mono mt-0.5">
                    {dropletResult.generation_frequency_hz.toFixed(1)} Hz
                  </span>
                  <span className="text-[10px] text-on-surface-variant">
                    {dropletResult.regime.toUpperCase()} regime
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold">Mixing Time</span>
                  <span className="text-base font-bold text-secondary font-mono mt-0.5">
                    {dropletResult.mixing_time_ms.toFixed(1)} ms
                  </span>
                  <span className="text-[10px] text-on-surface-variant">
                    {dropletResult.mixing_acceleration_fold.toFixed(0)}× faster than bulk
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold">Slug Speed</span>
                  <span className="text-base font-bold text-on-surface font-mono mt-0.5">
                    {(dropletResult.slug_velocity_m_s * 1000).toFixed(1)} mm/s
                  </span>
                  <span className="text-[10px] text-on-surface-variant">
                    Length: {dropletResult.droplet_length_um.toFixed(0)} μm
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Microchannel Canvas & Visualization (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-primary" />
                  Live Segmented Microchannel Flow Simulation
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  dropletResult?.regime === 'squeezing'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : dropletResult?.regime === 'dripping'
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  Regime: {dropletResult?.regime.toUpperCase()}
                </span>
              </div>

              {/* Dynamic SVG Microfluidic Visualizer */}
              <div className="w-full bg-surface-container-lowest/80 rounded-xl p-4 border border-outline-variant/20 flex flex-col items-center justify-center min-h-[280px]">
                <svg className="w-full h-56" viewBox="0 0 650 200">
                  <defs>
                    <linearGradient id="oilCarrier" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                    <linearGradient id="waterAqueous" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#0284c7" />
                    </linearGradient>
                    <radialGradient id="dropletGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.9" />
                      <stop offset="70%" stopColor="#0284c7" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#0369a1" stopOpacity="0.9" />
                    </radialGradient>
                  </defs>

                  {/* Channel Boundaries (PDMS Walls) */}
                  <rect x="20" y="30" width="610" height="140" rx="10" fill="url(#oilCarrier)" stroke="#334155" strokeWidth="2" />

                  {/* Main Horizontal Flow Channel */}
                  <rect x="20" y="70" width="610" height="60" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />

                  {/* Perpendicular Dispersed Inlet (T-junction or Cross) */}
                  <rect x="120" y="20" width="40" height="50" fill="#0369a1" opacity="0.3" stroke="#0284c7" strokeWidth="1.5" />
                  <path d="M 140 25 L 140 65" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />
                  <text x="140" y="16" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">
                    Q_d (Aqueous)
                  </text>

                  {/* Carrier Oil Flow Arrow */}
                  <text x="40" y="60" fill="#94a3b8" fontSize="10" fontWeight="bold">
                    Q_c (Oil)
                  </text>
                  <path d="M 30 100 L 90 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* T-Junction Breakup Neck */}
                  <path
                    d="M 120 70 Q 140 90 160 70"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                  />

                  {/* Segmented Droplets Moving Right */}
                  {/* Droplet 1 (Forming) */}
                  <ellipse cx="155" cy="100" rx="20" ry="22" fill="url(#dropletGlow)" stroke="#38bdf8" strokeWidth="1.5" />
                  {/* Droplet 2 */}
                  <g transform="translate(240, 75)">
                    <rect x="0" y="0" width="55" height="50" rx="18" fill="url(#dropletGlow)" stroke="#38bdf8" strokeWidth="1.5" />
                    {/* Internal twin recirculating vortices (Dean circulation) */}
                    <path d="M 15 15 C 20 8, 35 8, 40 15 C 42 20, 38 24, 30 24" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.8" />
                    <path d="M 15 35 C 20 42, 35 42, 40 35 C 42 30, 38 26, 30 26" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.8" />
                  </g>
                  {/* Droplet 3 */}
                  <g transform="translate(360, 75)">
                    <rect x="0" y="0" width="55" height="50" rx="18" fill="url(#dropletGlow)" stroke="#38bdf8" strokeWidth="1.5" />
                    <path d="M 15 15 C 20 8, 35 8, 40 15 C 42 20, 38 24, 30 24" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.8" />
                    <path d="M 15 35 C 20 42, 35 42, 40 35 C 42 30, 38 26, 30 26" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.8" />
                  </g>
                  {/* Droplet 4 */}
                  <g transform="translate(480, 75)">
                    <rect x="0" y="0" width="55" height="50" rx="18" fill="url(#dropletGlow)" stroke="#38bdf8" strokeWidth="1.5" />
                    <path d="M 15 15 C 20 8, 35 8, 40 15 C 42 20, 38 24, 30 24" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.8" />
                    <path d="M 15 35 C 20 42, 35 42, 40 35 C 42 30, 38 26, 30 26" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="2,2" opacity="0.8" />
                  </g>

                  {/* Channel Annotations */}
                  <text x="310" y="150" fill="#94a3b8" fontSize="10" textAnchor="middle">
                    Chaotic Taylor Vortex Recirculation Inside Segmented Droplet Slugs
                  </text>
                  <text x="590" y="104" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">
                    → Outlet
                  </text>
                </svg>
              </div>

              {/* Explanatory Callout */}
              <div className="p-3.5 rounded-xl bg-surface-container border border-outline-variant/30 text-xs text-on-surface-variant flex items-start gap-2.5">
                <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-on-surface">Garstecki Scaling Law & Confinement:</span> In microfluidic T-junctions at low Capillary numbers (<span className="font-mono text-primary">Ca &lt; 0.015</span>), droplet size is strictly governed by channel geometry and volumetric flow ratio: <span className="font-mono text-primary">L_drop / w = 1 + α(Q_d / Q_c)</span>. Segmented slugs isolate reaction mixtures from channel walls, completely preventing fouling and residence-time dispersion.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONTINUOUS FLOW REACTOR & RTD */}
      {activeTab === 'flow_reactor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Reaction Controls (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Benchmark Flow Synthesis Reaction
              </span>

              {/* Reaction Preset Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-on-surface-variant">Reaction System</label>
                <select
                  value={selectedRxnId}
                  onChange={(e) => setSelectedRxnId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-surface-container border border-outline-variant/40 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {CURATED_REACTIONS.map((rxn) => (
                    <option key={rxn.id} value={rxn.id}>
                      {rxn.name}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-on-surface-variant mt-1">
                  {currentReaction.description}
                </p>
              </div>

              {/* Reactor Length Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">Capillary Channel Length (L)</span>
                  <span className="font-mono font-semibold text-primary">{channelLengthMm.toFixed(0)} mm</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="25"
                  value={channelLengthMm}
                  onChange={(e) => setChannelLengthMm(parseFloat(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />
              </div>

              {/* Total Flow Rate */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">Total Flow Rate (Q)</span>
                  <span className="font-mono font-semibold text-primary">{totalFlowRateUlMin.toFixed(1)} μL/min</span>
                </div>
                <input
                  type="range"
                  min="5.0"
                  max="200.0"
                  step="5.0"
                  value={totalFlowRateUlMin}
                  onChange={(e) => setTotalFlowRateUlMin(parseFloat(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />
              </div>

              {/* Temperature Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">Reactor Temperature (T)</span>
                  <span className="font-mono font-semibold text-primary">{tempC.toFixed(1)} °C</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="120.0"
                  step="1.0"
                  value={tempC}
                  onChange={(e) => setTempC(parseFloat(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Performance Telemetry */}
            {reactorResult && (
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold">Space Time (τ)</span>
                  <span className="text-base font-bold text-primary font-mono mt-0.5">
                    {reactorResult.residence_time_s.toFixed(2)} s
                  </span>
                  <span className="text-[10px] text-on-surface-variant">
                    Bodenstein Bo: {reactorResult.bodenstein_number.toFixed(0)}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold">Conversion (X)</span>
                  <span className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                    {(reactorResult.conversion * 100).toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-on-surface-variant">
                    Reactant consumption
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold">Target Yield</span>
                  <span className="text-base font-bold text-blue-400 font-mono mt-0.5">
                    {(reactorResult.intermediate_yield * 100).toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-on-surface-variant">
                    Byproduct: {(reactorResult.byproduct_yield * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold">Space-Time Yield</span>
                  <span className="text-base font-bold text-purple-400 font-mono mt-0.5">
                    {reactorResult.space_time_yield_kg_m3_h.toFixed(1)}
                  </span>
                  <span className="text-[10px] text-on-surface-variant">
                    kg / (m³ · h)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Axial Profiles & RTD Plots (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-primary" />
                Axial Reaction Progress along Microchannel Length (z / L)
              </span>

              {/* Axial Concentration SVG Graph */}
              {reactorResult && (
                <div className="w-full bg-surface-container-lowest/80 rounded-xl p-4 border border-outline-variant/20 flex flex-col items-center">
                  <svg className="w-full h-56" viewBox="0 0 600 200">
                    {/* Grid lines */}
                    <line x1="50" y1="20" x2="50" y2="160" stroke="#334155" strokeWidth="1" />
                    <line x1="50" y1="160" x2="560" y2="160" stroke="#334155" strokeWidth="1" />
                    <line x1="50" y1="90" x2="560" y2="90" stroke="#1e293b" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="50" y1="20" x2="560" y2="20" stroke="#1e293b" strokeWidth="1" strokeDasharray="3,3" />

                    {/* Y-Axis Labels */}
                    <text x="40" y="24" fill="#94a3b8" fontSize="10" textAnchor="end">1.0 M</text>
                    <text x="40" y="94" fill="#94a3b8" fontSize="10" textAnchor="end">0.5 M</text>
                    <text x="40" y="164" fill="#94a3b8" fontSize="10" textAnchor="end">0.0 M</text>

                    {/* X-Axis Labels */}
                    <text x="50" y="178" fill="#94a3b8" fontSize="10" textAnchor="middle">0 (Inlet)</text>
                    <text x="305" y="178" fill="#94a3b8" fontSize="10" textAnchor="middle">0.5 L</text>
                    <text x="560" y="178" fill="#94a3b8" fontSize="10" textAnchor="middle">1.0 L (Outlet)</text>

                    {/* Reactant curve (Amber) */}
                    <path
                      d={reactorResult.axial_concentration_profile.map((p, idx) => {
                        const x = 50 + p.fractional_length * 510;
                        const y = 160 - (p.c_reactant_m / initialConcM) * 140;
                        return `${idx === 0 ? 'M' : 'L'} ${x} ${Math.max(20, Math.min(160, y))}`;
                      }).join(' ')}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                    />

                    {/* Product intermediate curve (Cyan) */}
                    <path
                      d={reactorResult.axial_concentration_profile.map((p, idx) => {
                        const x = 50 + p.fractional_length * 510;
                        const y = 160 - (p.c_product_m / initialConcM) * 140;
                        return `${idx === 0 ? 'M' : 'L'} ${x} ${Math.max(20, Math.min(160, y))}`;
                      }).join(' ')}
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="2.5"
                    />

                    {/* Byproduct over-reaction curve (Rose) */}
                    <path
                      d={reactorResult.axial_concentration_profile.map((p, idx) => {
                        const x = 50 + p.fractional_length * 510;
                        const y = 160 - (p.c_byproduct_m / initialConcM) * 140;
                        return `${idx === 0 ? 'M' : 'L'} ${x} ${Math.max(20, Math.min(160, y))}`;
                      }).join(' ')}
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                    />
                  </svg>

                  {/* Legend */}
                  <div className="flex items-center gap-6 mt-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-500" />
                      <span className="text-on-surface-variant">Reactant [A]</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-cyan-500" />
                      <span className="text-on-surface-variant">Desired Product [P]</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500" />
                      <span className="text-on-surface-variant">Over-reaction Byproduct [S]</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Residence Time Distribution (RTD) */}
              {reactorResult && (
                <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-on-surface flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      Residence Time Distribution E(θ) — Taylor-Aris Axial Dispersion
                    </span>
                    <span className="text-xs font-mono text-primary">
                      Bo = {reactorResult.bodenstein_number.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant">
                    High Bodenstein number indicates minimal back-mixing, approaching an ideal Plug Flow Reactor (PFR) with tight residence time control.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HYDRODYNAMICS & DIMENSIONLESS NUMBERS */}
      {activeTab === 'hydrodynamics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Channel Dimensions & Fluid Parameters
              </span>

              {/* Width Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">Channel Width (w)</span>
                  <span className="font-mono font-semibold text-primary">{channelWidthUm.toFixed(0)} μm</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="1000"
                  step="10"
                  value={channelWidthUm}
                  onChange={(e) => setChannelWidthUm(parseFloat(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />
              </div>

              {/* Height Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">Channel Height (h)</span>
                  <span className="font-mono font-semibold text-primary">{channelHeightUm.toFixed(0)} μm</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={channelHeightUm}
                  onChange={(e) => setChannelHeightUm(parseFloat(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />
              </div>

              {/* Flow Rate */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">Total Flow Rate (Q)</span>
                  <span className="font-mono font-semibold text-primary">{totalFlowRateUlMin.toFixed(1)} μL/min</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  value={totalFlowRateUlMin}
                  onChange={(e) => setTotalFlowRateUlMin(parseFloat(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />
              </div>

              {/* Viscosity */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">Dynamic Viscosity (μ)</span>
                  <span className="font-mono font-semibold text-primary">{(viscosityPaS * 1000).toFixed(2)} mPa·s</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="10.0"
                  step="0.5"
                  value={viscosityPaS * 1000}
                  onChange={(e) => setViscosityPaS(parseFloat(e.target.value) / 1000.0)}
                  className="w-full accent-primary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-4">
            {hydroResult && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                  <span className="text-xs text-on-surface-variant uppercase font-bold">Reynolds Number</span>
                  <span className="text-xl font-bold text-primary font-mono mt-1">
                    Re = {hydroResult.reynolds_number.toFixed(4)}
                  </span>
                  <span className="text-xs text-on-surface-variant mt-0.5">
                    Regime: {hydroResult.flow_regime.toUpperCase()}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                  <span className="text-xs text-on-surface-variant uppercase font-bold">Capillary Number</span>
                  <span className="text-xl font-bold text-secondary font-mono mt-1">
                    Ca = {hydroResult.capillary_number.toFixed(5)}
                  </span>
                  <span className="text-xs text-on-surface-variant mt-0.5">
                    Viscous vs Interfacial
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                  <span className="text-xs text-on-surface-variant uppercase font-bold">Péclet Number</span>
                  <span className="text-xl font-bold text-tertiary font-mono mt-1">
                    Pe = {hydroResult.peclet_number.toFixed(0)}
                  </span>
                  <span className="text-xs text-on-surface-variant mt-0.5">
                    Advection vs Diffusion
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                  <span className="text-xs text-on-surface-variant uppercase font-bold">Pressure Drop (ΔP)</span>
                  <span className="text-xl font-bold text-emerald-400 font-mono mt-1">
                    {hydroResult.pressure_drop_kpa.toFixed(2)} kPa
                  </span>
                  <span className="text-xs text-on-surface-variant mt-0.5">
                    {(hydroResult.pressure_drop_kpa / 100.0).toFixed(4)} bar
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                  <span className="text-xs text-on-surface-variant uppercase font-bold">Linear Velocity</span>
                  <span className="text-xl font-bold text-purple-400 font-mono mt-1">
                    {(hydroResult.mean_velocity_m_s * 1000).toFixed(1)} mm/s
                  </span>
                  <span className="text-xs text-on-surface-variant mt-0.5">
                    Mean channel velocity
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                  <span className="text-xs text-on-surface-variant uppercase font-bold">Wall Shear Stress</span>
                  <span className="text-xl font-bold text-rose-400 font-mono mt-1">
                    {hydroResult.wall_shear_stress_pa.toFixed(2)} Pa
                  </span>
                  <span className="text-xs text-on-surface-variant mt-0.5">
                    τ_wall at channel boundary
                  </span>
                </div>
              </div>
            )}

            {/* Microfluidic Poiseuille Velocity Profile Illustration */}
            <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Laminar Parabolic Velocity Profile (Poiseuille Flow)
              </span>
              <div className="w-full bg-surface-container-lowest/80 rounded-xl p-4 border border-outline-variant/20 flex flex-col items-center">
                <svg className="w-full h-36" viewBox="0 0 500 120">
                  {/* Channel walls */}
                  <line x1="40" y1="20" x2="460" y2="20" stroke="#64748b" strokeWidth="3" />
                  <line x1="40" y1="100" x2="460" y2="100" stroke="#64748b" strokeWidth="3" />

                  {/* Parabolic arrows */}
                  {[-30, -20, -10, 0, 10, 20, 30].map((yOffset, i) => {
                    const y = 60 + yOffset;
                    const rNorm = yOffset / 40.0;
                    const vNorm = 1.0 - rNorm * rNorm;
                    const arrowLen = 140 * vNorm;
                    return (
                      <g key={i}>
                        <line
                          x1="120"
                          y1={y}
                          x2={120 + arrowLen}
                          y2={y}
                          stroke="#38bdf8"
                          strokeWidth="2"
                        />
                        <polygon
                          points={`${120 + arrowLen},${y - 3} ${120 + arrowLen + 6},${y} ${120 + arrowLen},${y + 3}`}
                          fill="#38bdf8"
                        />
                      </g>
                    );
                  })}

                  <path
                    d="M 120 20 Q 266 60 120 100"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                  />

                  <text x="320" y="64" fill="#94a3b8" fontSize="11" fontWeight="bold">
                    v(r) = v_max · [1 - (r/R)²]
                  </text>
                  <text x="40" y="15" fill="#64748b" fontSize="9">Upper Wall (No-Slip: v = 0)</text>
                  <text x="40" y="112" fill="#64748b" fontSize="9">Lower Wall (No-Slip: v = 0)</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
