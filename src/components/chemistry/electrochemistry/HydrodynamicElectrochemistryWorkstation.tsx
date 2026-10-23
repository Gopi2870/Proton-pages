import React, { useState, useEffect, useMemo } from 'react';
import {
  RotateCw,
  Zap,
  Activity,
  Sliders,
  TrendingUp,
  Cpu,
  Info,
  CheckCircle2,
  Atom,
  Clock,
  Compass,
  Gauge,
  Layers,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import {
  hydrodynamicElectrochemistryService,
  CURATED_METALS,
  ELECTRODES_INFO,
} from '../../../services/hydrodynamicElectrochemistryService';
import {
  ElectrodeType,
  StrippingMode,
  RdeSimulationResult,
  StrippingVoltammetryResult,
  ChronocoulometryResult,
} from '../../../types/hydrodynamicElectrochemistry';

export const HydrodynamicElectrochemistryWorkstation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rde' | 'asv_stripping' | 'chronocoulometry'>('rde');

  // RDE state
  const [selectedElectrode, setSelectedElectrode] = useState<ElectrodeType>('platinum_disk');
  const [electrodeRadiusMm, setElectrodeRadiusMm] = useState<number>(2.5);
  const [concentrationMm, setConcentrationMm] = useState<number>(5.0);
  const [activeRpm, setActiveRpm] = useState<number>(1600.0);
  const [k0Rate, setK0Rate] = useState<number>(0.05);
  const [rdeResult, setRdeResult] = useState<RdeSimulationResult | null>(null);

  // ASV state
  const [depositionTimeS, setDepositionTimeS] = useState<number>(120.0);
  const [strippingElectrode, setStrippingElectrode] = useState<ElectrodeType>('bismuth_film');
  const [znPpb, setZnPpb] = useState<number>(45.0);
  const [cdPpb, setCdPpb] = useState<number>(12.0);
  const [pbPpb, setPbPpb] = useState<number>(18.0);
  const [cuPpb, setCuPpb] = useState<number>(30.0);
  const [asvResult, setAsvResult] = useState<StrippingVoltammetryResult | null>(null);

  // Chronocoulometry state
  const [gammaMolCm2, setGammaMolCm2] = useState<number>(2.5e-10);
  const [potentialStepV, setPotentialStepV] = useState<number>(0.5);
  const [ccResult, setCcResult] = useState<ChronocoulometryResult | null>(null);

  // Run RDE simulation
  useEffect(() => {
    try {
      const res = hydrodynamicElectrochemistryService.simulateRdeLocally({
        system_name: 'Ferrocyanide RDE Oxidation',
        electrode_type: selectedElectrode,
        electrode_radius_mm: electrodeRadiusMm,
        concentration_mm: concentrationMm,
        n_electrons: 1,
        diffusion_coefficient_cm2_s: 6.5e-6,
        kinematic_viscosity_cm2_s: 0.010,
        rotation_speeds_rpm: [400.0, 900.0, 1600.0, 2500.0, 3600.0],
        overpotential_mv: 250.0,
        heterogeneous_rate_constant_k0_cm_s: k0Rate,
        transfer_coefficient_alpha: 0.5,
      });
      setRdeResult(res);
    } catch (err) {
      console.error('RDE simulation error:', err);
    }
  }, [selectedElectrode, electrodeRadiusMm, concentrationMm, k0Rate]);

  // Run ASV simulation
  useEffect(() => {
    try {
      const res = hydrodynamicElectrochemistryService.simulateStrippingLocally({
        sample_name: 'Environmental Potable Water Sample',
        deposition_potential_v: -1.25,
        deposition_time_s: depositionTimeS,
        stripping_mode: 'square_wave',
        electrode_type: strippingElectrode,
        zn_concentration_ppb: znPpb,
        cd_concentration_ppb: cdPpb,
        pb_concentration_ppb: pbPpb,
        cu_concentration_ppb: cuPpb,
      });
      setAsvResult(res);
    } catch (err) {
      console.error('ASV simulation error:', err);
    }
  }, [depositionTimeS, strippingElectrode, znPpb, cdPpb, pbPpb, cuPpb]);

  // Run Chronocoulometry simulation
  useEffect(() => {
    try {
      const res = hydrodynamicElectrochemistryService.simulateChronocoulometryLocally({
        system_name: 'Anthraquinone-2-Sulfonate Monolayer Adsorption',
        concentration_mm: 1.0,
        electrode_area_cm2: Math.PI * Math.pow(electrodeRadiusMm * 0.1, 2),
        step_duration_s: 0.25,
        n_electrons: 2,
        surface_excess_gamma_mol_cm2: gammaMolCm2,
        double_layer_capacitance_uf_cm2: 20.0,
        potential_step_v: potentialStepV,
        diffusion_coefficient_cm2_s: 5.2e-6,
      });
      setCcResult(res);
    } catch (err) {
      console.error('Chronocoulometry simulation error:', err);
    }
  }, [electrodeRadiusMm, gammaMolCm2, potentialStepV]);

  return (
    <div className="flex flex-col gap-6 p-6 bg-surface-container-lowest/60 rounded-2xl border border-outline-variant/30 backdrop-blur-xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
            <RotateCw className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-on-surface">
                Electroanalytical Stripping & RDE Hydrodynamics
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                Rig #16
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Rotating Disk Electrode (RDE) Levich boundary layers, Koutecký-Levich kinetics, and Anodic Stripping Voltammetry (ASV)
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-surface-container-low rounded-xl border border-outline-variant/40">
          <button
            type="button"
            onClick={() => setActiveTab('rde')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'rde'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>RDE & Levich</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('asv_stripping')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'asv_stripping'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Trace Stripping (ASV)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('chronocoulometry')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'chronocoulometry'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Anson Plot (Q vs √t)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: RDE & LEVICH */}
      {activeTab === 'rde' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column Controls (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Hydrodynamic RDE Parameters
              </span>

              {/* Working Electrode Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-on-surface-variant">Working Electrode Substrate</label>
                <select
                  value={selectedElectrode}
                  onChange={(e) => setSelectedElectrode(e.target.value as ElectrodeType)}
                  className="w-full px-3 py-2 rounded-lg bg-surface-container border border-outline-variant/40 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {ELECTRODES_INFO.map((el) => (
                    <option key={el.type} value={el.type}>
                      {el.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Radius Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">Electrode Disk Radius (r)</span>
                  <span className="font-mono font-semibold text-primary">{electrodeRadiusMm.toFixed(1)} mm</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={electrodeRadiusMm}
                  onChange={(e) => setElectrodeRadiusMm(parseFloat(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />
              </div>

              {/* Concentration Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">Redox Substrate [Fe(CN)₆⁴⁻]</span>
                  <span className="font-mono font-semibold text-primary">{concentrationMm.toFixed(1)} mM</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="20.0"
                  step="0.5"
                  value={concentrationMm}
                  onChange={(e) => setConcentrationMm(parseFloat(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />
              </div>

              {/* Heterogeneous Rate Constant k0 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">Heterogeneous Rate (k₀)</span>
                  <span className="font-mono font-semibold text-primary">{k0Rate.toFixed(3)} cm/s</span>
                </div>
                <input
                  type="range"
                  min="0.005"
                  max="0.500"
                  step="0.005"
                  value={k0Rate}
                  onChange={(e) => setK0Rate(parseFloat(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />
              </div>

              {/* Active RPM selector buttons */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-on-surface-variant">Rotation Speed Telemetry Focus</label>
                <div className="grid grid-cols-5 gap-1">
                  {[400, 900, 1600, 2500, 3600].map((rpm) => (
                    <button
                      key={rpm}
                      type="button"
                      onClick={() => setActiveRpm(rpm)}
                      className={`py-1.5 text-[11px] font-mono rounded-md font-semibold transition-all ${
                        activeRpm === rpm
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    >
                      {rpm}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Telemetry card */}
            {rdeResult && (
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold">Levich Slope (B)</span>
                  <span className="text-base font-bold text-primary font-mono mt-0.5">
                    {rdeResult.levich_slope_ua_s_half.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-on-surface-variant">μA / (rad/s)½</span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold">Boundary Layer (δ)</span>
                  <span className="text-base font-bold text-secondary font-mono mt-0.5">
                    {rdeResult.levich_points.find((p) => p.rotation_speed_rpm === activeRpm)?.hydrodynamic_boundary_layer_um.toFixed(1)} μm
                  </span>
                  <span className="text-[10px] text-on-surface-variant">at {activeRpm} RPM</span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold">Limiting Current</span>
                  <span className="text-base font-bold text-tertiary font-mono mt-0.5">
                    {rdeResult.levich_points.find((p) => p.rotation_speed_rpm === activeRpm)?.limiting_current_ua.toFixed(1)} μA
                  </span>
                  <span className="text-[10px] text-on-surface-variant">Total Faradaic i_L</span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold">RRDE Collection</span>
                  <span className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                    {(rdeResult.rrde_collection_efficiency_theoretical * 100).toFixed(0)}%
                  </span>
                  <span className="text-[10px] text-on-surface-variant">Theoretical N</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Visualization & Levich Curves (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                <RotateCw className="w-4 h-4 text-primary" />
                Rotating Disk Electrode Hydrodynamics & Levich Plot
              </span>

              {/* Live SVG Rotating Disk Animation & Streamlines */}
              <div className="w-full bg-surface-container-lowest/80 rounded-xl p-4 border border-outline-variant/20 flex flex-col items-center justify-center">
                <svg className="w-full h-48" viewBox="0 0 500 180">
                  <defs>
                    <linearGradient id="shaftGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#64748b" />
                      <stop offset="50%" stopColor="#94a3b8" />
                      <stop offset="100%" stopColor="#475569" />
                    </linearGradient>
                    <linearGradient id="diskFace" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#e2e8f0" />
                      <stop offset="100%" stopColor="#cbd5e1" />
                    </linearGradient>
                  </defs>

                  {/* Cell Electrolyte Background */}
                  <rect x="30" y="20" width="440" height="150" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1" />

                  {/* Cylindrical RDE Shaft */}
                  <rect x="220" y="20" width="60" height="75" fill="url(#shaftGrad)" stroke="#334155" strokeWidth="1.5" />
                  {/* Rotating Disk Tip */}
                  <ellipse cx="250" cy="95" rx="40" ry="12" fill="url(#diskFace)" stroke="#0284c7" strokeWidth="2" />

                  {/* Rotation Indicator Arrows */}
                  <path d="M 230 45 C 240 38, 260 38, 270 45" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                  <polygon points="270,45 264,40 266,48" fill="#38bdf8" />
                  <text x="250" y="32" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">
                    {activeRpm} RPM (ω = {((activeRpm * 2 * Math.PI) / 60).toFixed(0)} rad/s)
                  </text>

                  {/* Upward Convective Suction Streamlines */}
                  <path d="M 250 160 L 250 115" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />
                  <polygon points="250,113 246,120 254,120" fill="#38bdf8" />
                  <text x="250" y="172" fill="#94a3b8" fontSize="9" textAnchor="middle">
                    Forced Convective Axial Suction vz(z)
                  </text>

                  {/* Radial Centrifugal Flow Ejected Horizontally */}
                  <path d="M 210 100 Q 150 102 90 130" fill="none" stroke="#0284c7" strokeWidth="2" strokeDasharray="3,3" />
                  <polygon points="90,130 96,124 99,131" fill="#0284c7" />
                  <path d="M 290 100 Q 350 102 410 130" fill="none" stroke="#0284c7" strokeWidth="2" strokeDasharray="3,3" />
                  <polygon points="410,130 404,124 401,131" fill="#0284c7" />

                  {/* Diffusion boundary layer delta_H representation */}
                  <ellipse cx="250" cy="104" rx="48" ry="15" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2,2" />
                  <text x="360" y="92" fill="#f59e0b" fontSize="9">
                    Boundary layer δ = {rdeResult?.levich_points.find((p) => p.rotation_speed_rpm === activeRpm)?.hydrodynamic_boundary_layer_um.toFixed(1)} μm
                  </text>
                </svg>
              </div>

              {/* Levich Plot i_L vs sqrt(omega) */}
              {rdeResult && (
                <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-on-surface flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-primary" />
                      Levich Limiting Current vs ω½ (R² &gt; 0.999)
                    </span>
                    <span className="text-xs font-mono text-primary">
                      i_L = 0.620 n F A D⅔ ν⁻⅙ C* ω½
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-2 mt-2">
                    {rdeResult.levich_points.map((pt) => (
                      <div key={pt.rotation_speed_rpm} className="p-2 rounded-lg bg-surface-container-low border border-outline-variant/20 flex flex-col items-center text-center">
                        <span className="text-[10px] text-on-surface-variant">{pt.rotation_speed_rpm} RPM</span>
                        <span className="text-xs font-bold text-primary font-mono mt-0.5">{pt.limiting_current_ua.toFixed(1)} μA</span>
                        <span className="text-[9px] text-on-surface-variant font-mono">ω½: {pt.sqrt_angular_velocity.toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ANODIC STRIPPING VOLTAMMETRY (ASV) */}
      {activeTab === 'asv_stripping' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Stripping Parameters & Preconcentration
              </span>

              {/* Working Electrode Film */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-on-surface-variant">Working Film Electrode</label>
                <select
                  value={strippingElectrode}
                  onChange={(e) => setStrippingElectrode(e.target.value as ElectrodeType)}
                  className="w-full px-3 py-2 rounded-lg bg-surface-container border border-outline-variant/40 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="bismuth_film">Bismuth Film Electrode (Green BiFE)</option>
                  <option value="mercury_film">Mercury Film Electrode (MFE)</option>
                  <option value="glassy_carbon">Bare Glassy Carbon (GC)</option>
                </select>
              </div>

              {/* Deposition Time */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">Preconcentration Deposition (t_dep)</span>
                  <span className="font-mono font-semibold text-primary">{depositionTimeS.toFixed(0)} s</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="300"
                  step="10"
                  value={depositionTimeS}
                  onChange={(e) => setDepositionTimeS(parseFloat(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />
              </div>

              {/* Heavy Metal Concentration Sliders */}
              <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/30">
                <span className="text-xs font-bold text-on-surface">Target Heavy Metals (ppb / μg·L⁻¹)</span>

                {/* Zinc */}
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">Zinc (Zn²⁺ @ -1.02 V)</span>
                  <span className="font-mono font-semibold text-amber-400">{znPpb.toFixed(1)} ppb</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={znPpb}
                  onChange={(e) => setZnPpb(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />

                {/* Cadmium */}
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">Cadmium (Cd²⁺ @ -0.64 V)</span>
                  <span className="font-mono font-semibold text-blue-400">{cdPpb.toFixed(1)} ppb</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="0.5"
                  value={cdPpb}
                  onChange={(e) => setCdPpb(parseFloat(e.target.value))}
                  className="w-full accent-blue-400 h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />

                {/* Lead */}
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">Lead (Pb²⁺ @ -0.44 V)</span>
                  <span className="font-mono font-semibold text-rose-400">{pbPpb.toFixed(1)} ppb</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="0.5"
                  value={pbPpb}
                  onChange={(e) => setPbPpb(parseFloat(e.target.value))}
                  className="w-full accent-rose-400 h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />

                {/* Copper */}
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">Copper (Cu²⁺ @ +0.02 V)</span>
                  <span className="font-mono font-semibold text-purple-400">{cuPpb.toFixed(1)} ppb</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={cuPpb}
                  onChange={(e) => setCuPpb(parseFloat(e.target.value))}
                  className="w-full accent-purple-400 h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Preconcentration Factor card */}
            {asvResult && (
              <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-on-surface-variant">Preconcentration Factor</span>
                  <span className="text-lg font-bold text-primary font-mono mt-0.5">
                    {asvResult.preconcentration_factor}× Enhancement
                  </span>
                </div>
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
            )}
          </div>

          {/* Right Column: Multi-Element Stripping Voltammogram (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-primary" />
                  Square-Wave Anodic Stripping Voltammogram (SW-ASV)
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-mono">
                  E_dep = -1.25 V
                </span>
              </div>

              {/* Stripping Curve SVG Plot */}
              {asvResult && (
                <div className="w-full bg-surface-container-lowest/80 rounded-xl p-4 border border-outline-variant/20 flex flex-col items-center">
                  <svg className="w-full h-56" viewBox="0 0 600 200">
                    <line x1="50" y1="20" x2="50" y2="160" stroke="#334155" strokeWidth="1" />
                    <line x1="50" y1="160" x2="560" y2="160" stroke="#334155" strokeWidth="1" />

                    {/* Y-Axis Label */}
                    <text x="40" y="24" fill="#94a3b8" fontSize="10" textAnchor="end">i (μA)</text>
                    <text x="40" y="164" fill="#94a3b8" fontSize="10" textAnchor="end">0.0</text>

                    {/* X-Axis Potential Labels (-1.25V to +0.25V) */}
                    <text x="50" y="178" fill="#94a3b8" fontSize="10" textAnchor="middle">-1.25 V</text>
                    <text x="142" y="178" fill="#f59e0b" fontSize="10" textAnchor="middle">Zn (-1.02 V)</text>
                    <text x="296" y="178" fill="#38bdf8" fontSize="10" textAnchor="middle">Cd (-0.64 V)</text>
                    <text x="377" y="178" fill="#f43f5e" fontSize="10" textAnchor="middle">Pb (-0.44 V)</text>
                    <text x="520" y="178" fill="#c084fc" fontSize="10" textAnchor="middle">Cu (+0.02 V)</text>

                    {/* Background baseline curve */}
                    <path
                      d={asvResult.stripping_curve.map((p, idx) => {
                        const x = 50 + ((p.potential_v + 1.25) / 1.5) * 510;
                        const y = 160 - (p.current_background_ua / 5.0) * 140;
                        return `${idx === 0 ? 'M' : 'L'} ${x} ${Math.max(20, Math.min(160, y))}`;
                      }).join(' ')}
                      fill="none"
                      stroke="#475569"
                      strokeWidth="1.5"
                      strokeDasharray="3,3"
                    />

                    {/* Total stripping current with Gaussian peaks */}
                    <path
                      d={asvResult.stripping_curve.map((p, idx) => {
                        const x = 50 + ((p.potential_v + 1.25) / 1.5) * 510;
                        const y = 160 - (p.current_total_ua / 5.0) * 140;
                        return `${idx === 0 ? 'M' : 'L'} ${x} ${Math.max(20, Math.min(160, y))}`;
                      }).join(' ')}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                    />
                  </svg>

                  {/* Resolved Peaks Summary Badges */}
                  <div className="grid grid-cols-4 gap-2 w-full mt-3">
                    {asvResult.peaks_detected.map((pk) => {
                      const exceedsWho =
                        (pk.symbol === 'Pb' && pk.concentration_ppb > 10.0) ||
                        (pk.symbol === 'Cd' && pk.concentration_ppb > 3.0);
                      return (
                        <div
                          key={pk.symbol}
                          className={`p-2 rounded-lg border flex flex-col ${
                            exceedsWho
                              ? 'bg-rose-500/10 border-rose-500/30'
                              : 'bg-surface-container border-outline-variant/30'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-on-surface">{pk.symbol} Peak</span>
                            {exceedsWho && <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />}
                          </div>
                          <span className="text-xs font-mono text-primary mt-0.5">
                            {pk.peak_current_ua.toFixed(2)} μA
                          </span>
                          <span className="text-[10px] text-on-surface-variant font-mono">
                            {pk.concentration_ppb} ppb ({pk.peak_potential_v} V)
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CHRONOCOULOMETRY & ANSON PLOT */}
      {activeTab === 'chronocoulometry' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Adsorption & Charge Step Parameters
              </span>

              {/* Surface Excess Gamma */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">Surface Excess Adsorption (Γ)</span>
                  <span className="font-mono font-semibold text-primary">{(gammaMolCm2 * 1e10).toFixed(2)} × 10⁻¹⁰ mol/cm²</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="8.0"
                  step="0.1"
                  value={gammaMolCm2 * 1e10}
                  onChange={(e) => setGammaMolCm2((parseFloat(e.target.value) * 1e-10))}
                  className="w-full accent-primary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />
              </div>

              {/* Potential Step V */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">Potential Step Amplitude (ΔE)</span>
                  <span className="font-mono font-semibold text-primary">{potentialStepV.toFixed(2)} V</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.5"
                  step="0.05"
                  value={potentialStepV}
                  onChange={(e) => setPotentialStepV(parseFloat(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Charge decomposition card */}
            {ccResult && (
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-2">
                <span className="text-xs font-bold text-on-surface">Charge Component Separation</span>
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant">Double-Layer Charge (Q_dl):</span>
                  <span className="font-mono text-cyan-400">{ccResult.double_layer_charge_uc.toFixed(2)} μC</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant">Anson Slope (S):</span>
                  <span className="font-mono text-primary">{ccResult.anson_slope_uc_s_half.toFixed(2)} μC·s⁻½</span>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-primary" />
                Anson Plot: Total Charge vs Square Root of Time (Q vs t½)
              </span>

              {ccResult && (
                <div className="w-full bg-surface-container-lowest/80 rounded-xl p-4 border border-outline-variant/20 flex flex-col items-center">
                  <svg className="w-full h-52" viewBox="0 0 500 180">
                    <line x1="50" y1="20" x2="50" y2="150" stroke="#334155" strokeWidth="1" />
                    <line x1="50" y1="150" x2="460" y2="150" stroke="#334155" strokeWidth="1" />

                    <text x="40" y="24" fill="#94a3b8" fontSize="10" textAnchor="end">Q (μC)</text>
                    <text x="50" y="166" fill="#94a3b8" fontSize="10" textAnchor="middle">0</text>
                    <text x="460" y="166" fill="#94a3b8" fontSize="10" textAnchor="middle">t½ (s½)</text>

                    {/* Linear Anson curve */}
                    <path
                      d={ccResult.anson_points.map((p, idx) => {
                        const x = 50 + (p.sqrt_time_s / 0.5) * 410;
                        const y = 150 - (p.charge_total_uc / 10.0) * 130;
                        return `${idx === 0 ? 'M' : 'L'} ${x} ${Math.max(20, Math.min(150, y))}`;
                      }).join(' ')}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                    />

                    {/* Q_dl intercept dashed line */}
                    <line
                      x1="50"
                      y1={150 - (ccResult.double_layer_charge_uc / 10.0) * 130}
                      x2="460"
                      y2={150 - (ccResult.double_layer_charge_uc / 10.0) * 130}
                      stroke="#f59e0b"
                      strokeWidth="1.5"
                      strokeDasharray="3,3"
                    />
                    <text x="455" y={145 - (ccResult.double_layer_charge_uc / 10.0) * 130} fill="#f59e0b" fontSize="9" textAnchor="end">
                      Intercept Q(0) = Q_dl + nFA·Γ
                    </text>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
