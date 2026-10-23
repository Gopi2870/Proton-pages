import React, { useState, useEffect } from 'react';
import {
  Activity,
  Sliders,
  Sparkles,
  Zap,
  BarChart3,
  Layers,
  Search,
  CheckCircle2,
  Info,
  Maximize2,
} from 'lucide-react';
import {
  MsStandard,
  MsSimulationResponse,
  IsotopeEnvelopeResponse,
  VanDeemterResponse,
  ChromatogramSimulationResponse,
  MassPeak,
} from '../../../types/massSpectrometry';
import { massSpectrometryService } from '../../../services/massSpectrometryService';

export const MassSpectrometryWorkstation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'spectrum' | 'isotopes' | 'vandeemter' | 'chromatogram'>('spectrum');
  const [standards, setStandards] = useState<MsStandard[]>([]);
  const [selectedStandardId, setSelectedStandardId] = useState<string>('butylbenzene');

  // MS Spectrum simulation state
  const [msData, setMsData] = useState<MsSimulationResponse | null>(null);
  const [selectedPeak, setSelectedPeak] = useState<MassPeak | null>(null);
  const [electronEnergy, setElectronEnergy] = useState<number>(70);

  // Isotope envelope state
  const [isotopeFormula, setIsotopeFormula] = useState<string>('C6H5Cl');
  const [isotopeData, setIsotopeData] = useState<IsotopeEnvelopeResponse | null>(null);

  // Van Deemter state
  const [particleSize, setParticleSize] = useState<number>(3.5);
  const [colLength, setColLength] = useState<number>(150);
  const [vandeemterData, setVandeemterData] = useState<VanDeemterResponse | null>(null);

  // Chromatogram state
  const [selectedAnalytes, setSelectedAnalytes] = useState<string[]>(['benzene', 'toluene', 'butylbenzene']);
  const [chromatogramData, setChromatogramData] = useState<ChromatogramSimulationResponse | null>(null);
  const [columnTemp, setColumnTemp] = useState<number>(120);

  // Load standards
  useEffect(() => {
    async function init() {
      const cat = await massSpectrometryService.getCatalog();
      setStandards(cat);
    }
    init();
  }, []);

  // Update MS Simulation
  useEffect(() => {
    async function runMs() {
      const res = await massSpectrometryService.simulateMs({
        standard_id: selectedStandardId,
        electron_energy_ev: electronEnergy,
      });
      setMsData(res);
      if (res.spectrum.length > 0) {
        setSelectedPeak(res.spectrum[0]);
      }
    }
    runMs();
  }, [selectedStandardId, electronEnergy]);

  // Update Isotope Envelope
  useEffect(() => {
    async function runIso() {
      const res = await massSpectrometryService.calculateIsotopeEnvelope({ formula: isotopeFormula });
      setIsotopeData(res);
    }
    runIso();
  }, [isotopeFormula]);

  // Update Van Deemter
  useEffect(() => {
    async function runVd() {
      const res = await massSpectrometryService.calculateVanDeemter({
        particle_diameter_um: particleSize,
        column_length_mm: colLength,
      });
      setVandeemterData(res);
    }
    runVd();
  }, [particleSize, colLength]);

  // Update Chromatogram
  useEffect(() => {
    async function runChrom() {
      const res = await massSpectrometryService.simulateChromatogram({
        analyte_ids: selectedAnalytes,
        temperature_c: columnTemp,
      });
      setChromatogramData(res);
    }
    runChrom();
  }, [selectedAnalytes, columnTemp]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 text-slate-100">
      {/* Top Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-semibold mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>Rig #17 • PR #051 Analytical Suite</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-400">
              Analytical Chromatography & Quadrupole Mass Spectrometry
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Simulate 70eV Electron Ionization (EI) mass fragmentation, McLafferty rearrangements, exact isotopic envelopes, and Van Deemter chromatographic plate height hydrodynamics.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('spectrum')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'spectrum'
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EI Mass Spectrum
            </button>
            <button
              onClick={() => setActiveTab('isotopes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'isotopes'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Isotope Envelopes
            </button>
            <button
              onClick={() => setActiveTab('vandeemter')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'vandeemter'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Van Deemter Curve
            </button>
            <button
              onClick={() => setActiveTab('chromatogram')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'chromatogram'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Chromatogram (TIC)
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'spectrum' && msData && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls & Presets (4 cols) */}
          <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                Analyte Reference Library
              </label>
              <div className="space-y-2">
                {standards.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStandardId(s.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all ${
                      selectedStandardId === s.id
                        ? 'bg-violet-950/40 border-violet-500/60 text-white shadow-md shadow-violet-950/30'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-100">{s.name}</span>
                      <span className="text-xs font-mono text-cyan-400">{s.formula}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      MW: {s.molecular_weight} • Base: m/z {s.base_peak_mz}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Electron Energy Slider */}
            <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-semibold">Ionization Energy</span>
                <span className="font-mono text-violet-400 font-bold">{electronEnergy} eV</span>
              </div>
              <input
                type="range"
                min="15"
                max="85"
                step="5"
                value={electronEnergy}
                onChange={(e) => setElectronEnergy(parseInt(e.target.value))}
                className="w-full accent-violet-500"
              />
              <div className="text-[11px] text-slate-500">
                Standard library spectra recorded at 70 eV (reproducible cross-platform ionization benchmark).
              </div>
            </div>

            {/* Diagnostic Neutral Losses */}
            {msData.diagnostic_neutral_losses.length > 0 && (
              <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-xl space-y-2 text-xs">
                <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Observed Neutral Losses</span>
                </div>
                <ul className="space-y-1 text-slate-400 text-[11px]">
                  {msData.diagnostic_neutral_losses.map((loss, idx) => (
                    <li key={idx} className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{loss}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Mass Spectrum Stick Visualizer (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>{msData.analyte_name}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 font-mono">
                      EI 70 eV
                    </span>
                  </h3>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    Exact Mass: {msData.exact_mass} Da • Molecular Ion: m/z {msData.molecular_ion_mz} ({msData.molecular_ion_stability} stability)
                  </div>
                </div>
                <div className="text-xs text-slate-500">Click any peak bar to inspect fragmentation mechanism</div>
              </div>

              {/* Spectrum Chart */}
              <div className="h-64 w-full bg-slate-950/80 rounded-xl border border-slate-800 p-4 relative flex items-end justify-between gap-1 overflow-x-auto">
                {/* Horizontal baseline */}
                <div className="absolute bottom-6 left-0 right-0 h-px bg-slate-800" />

                {msData.spectrum.map((p) => {
                  const isSelected = selectedPeak?.mz === p.mz;
                  const isBase = p.relative_intensity === 100.0;
                  const heightPct = Math.max(8, p.relative_intensity);

                  return (
                    <div
                      key={p.mz}
                      onClick={() => setSelectedPeak(p)}
                      className="flex flex-col items-center flex-1 min-w-[28px] cursor-pointer group"
                    >
                      <div className="text-[10px] font-mono text-slate-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {p.mz}
                      </div>
                      <div
                        style={{ height: `${heightPct * 0.8}%` }}
                        className={`w-2.5 rounded-t transition-all ${
                          isSelected
                            ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50'
                            : isBase
                            ? 'bg-violet-500'
                            : p.is_molecular_ion
                            ? 'bg-emerald-500'
                            : 'bg-slate-700 hover:bg-slate-500'
                        }`}
                      />
                      <div className="text-[10px] font-mono text-slate-500 mt-1">{p.mz}</div>
                    </div>
                  );
                })}
              </div>

              {/* Peak Details Drawer */}
              {selectedPeak && (
                <div className="mt-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold font-mono text-cyan-300">m/z {selectedPeak.mz}</span>
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-800 text-slate-300 font-mono">
                        {selectedPeak.fragment_formula}
                      </span>
                      {selectedPeak.is_molecular_ion && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 border border-emerald-800 text-emerald-300">
                          Molecular Ion M+•
                        </span>
                      )}
                      {selectedPeak.relative_intensity === 100 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-violet-950 border border-violet-800 text-violet-300">
                          Base Peak (100%)
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-medium text-slate-200 mt-1">{selectedPeak.fragment_name}</div>
                    <div className="text-xs text-slate-400 mt-0.5 italic">{selectedPeak.mechanism}</div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Relative Intensity</span>
                    <span className="text-xl font-bold font-mono text-slate-200">{selectedPeak.relative_intensity}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Isotope Envelopes Tab */}
      {activeTab === 'isotopes' && isotopeData && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Formula Input</h3>
            <div className="space-y-2">
              <input
                type="text"
                value={isotopeFormula}
                onChange={(e) => setIsotopeFormula(e.target.value.trim())}
                placeholder="e.g. C6H5Cl, C6H5Br, C10H14, C8H8O"
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl font-mono text-sm text-cyan-300 focus:outline-none focus:border-cyan-500"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['C6H5Cl', 'C6H5Br', 'C7H7Cl', 'C10H14', 'C8H8O'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setIsotopeFormula(preset)}
                    className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition-colors"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-xl space-y-2 text-xs">
              <div className="text-cyan-400 font-semibold">Isotopic Signature</div>
              <p className="text-slate-300 text-xs">{isotopeData.pattern_signature}</p>
              <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-500 block">Expected M+1</span>
                  <span className="font-mono text-slate-200 font-semibold">{isotopeData.m_plus_1_expected_pct}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Expected M+2</span>
                  <span className="font-mono text-slate-200 font-semibold">{isotopeData.m_plus_2_expected_pct}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Isotope Abundance Distribution</h3>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  Monoisotopic Mass: {isotopeData.monoisotopic_mass} Da
                </div>
              </div>
            </div>

            {/* Isotope Sticks */}
            <div className="h-56 bg-slate-950/80 rounded-xl border border-slate-800 p-4 flex items-end justify-center gap-8 relative">
              {isotopeData.peaks.map((p) => (
                <div key={p.isotopic_label} className="flex flex-col items-center">
                  <span className="text-xs font-mono text-cyan-300 mb-1">{p.relative_abundance}%</span>
                  <div
                    style={{ height: `${Math.max(12, p.relative_abundance * 1.6)}px` }}
                    className="w-5 rounded-t bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-md shadow-cyan-500/20"
                  />
                  <span className="text-xs font-bold text-slate-200 mt-2">{p.isotopic_label}</span>
                  <span className="text-[10px] font-mono text-slate-500">{p.mass}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Van Deemter Tab */}
      {activeTab === 'vandeemter' && vandeemterData && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Column Hydrodynamics</h3>

            <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Particle Diameter (dp)</span>
                <span className="font-mono text-emerald-400 font-bold">{particleSize} µm</span>
              </div>
              <input
                type="range"
                min="1.7"
                max="5.0"
                step="0.1"
                value={particleSize}
                onChange={(e) => setParticleSize(parseFloat(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Column Length (L)</span>
                <span className="font-mono text-emerald-400 font-bold">{colLength} mm</span>
              </div>
              <input
                type="range"
                min="50"
                max="250"
                step="10"
                value={colLength}
                onChange={(e) => setColLength(parseInt(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-xl space-y-2 text-xs">
              <div className="text-emerald-400 font-semibold">Hydrodynamic Optima</div>
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div>
                  <span className="text-slate-500 block">Optimum Velocity (u_opt)</span>
                  <span className="font-mono text-slate-100 font-bold">{vandeemterData.optimum_velocity_cm_s} cm/s</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Min Plate Height (H_min)</span>
                  <span className="font-mono text-slate-100 font-bold">{vandeemterData.minimum_plate_height_um} µm</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Eddy Term (A)</span>
                  <span className="font-mono text-slate-300">{vandeemterData.a_term_um} µm</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Theoretical Plates (N)</span>
                  <span className="font-mono text-emerald-300 font-bold">{vandeemterData.maximum_theoretical_plates}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Van Deemter Curve: H = A + B/u + C·u</h3>
            <p className="text-xs text-slate-400">
              Demonstrates column plate height efficiency as a function of mobile phase linear velocity u.
            </p>

            <div className="h-64 bg-slate-950/80 rounded-xl border border-slate-800 p-4 flex items-end justify-between gap-1">
              {vandeemterData.curve.map((pt, i) => {
                const heightBar = Math.min(220, pt.plate_height_h_um * 4);
                return (
                  <div key={i} className="flex-1 flex flex-col items-center group relative">
                    <div
                      style={{ height: `${heightBar}px` }}
                      className="w-full bg-emerald-500/80 hover:bg-emerald-400 rounded-t transition-all"
                    />
                    <div className="text-[9px] font-mono text-slate-500 mt-1 opacity-0 group-hover:opacity-100">
                      {pt.linear_velocity_cm_s}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Chromatogram Tab */}
      {activeTab === 'chromatogram' && chromatogramData && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">Total Ion Chromatogram (TIC) Separation</h3>
              <div className="text-xs text-slate-400 font-mono">
                Column Dead Time t0: {chromatogramData.dead_time_t0_min} min • Total Run: {chromatogramData.total_run_time_min} min
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">Column Temp:</span>
              <input
                type="range"
                min="60"
                max="220"
                step="10"
                value={columnTemp}
                onChange={(e) => setColumnTemp(parseInt(e.target.value))}
                className="w-32 accent-amber-500"
              />
              <span className="text-xs font-mono text-amber-400 font-bold">{columnTemp} °C</span>
            </div>
          </div>

          {/* Peak Table */}
          <div className="border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Analyte</th>
                  <th className="p-3">Formula</th>
                  <th className="p-3">Retention Time (tr)</th>
                  <th className="p-3">Capacity Factor (k')</th>
                  <th className="p-3">Base m/z</th>
                  <th className="p-3">Peak Width (w)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {chromatogramData.peaks.map((p) => (
                  <tr key={p.analyte_name} className="hover:bg-slate-800/30">
                    <td className="p-3 font-bold text-white">{p.analyte_name}</td>
                    <td className="p-3 font-mono text-cyan-300">{p.formula}</td>
                    <td className="p-3 font-mono text-amber-300 font-semibold">{p.retention_time_min} min</td>
                    <td className="p-3 font-mono text-slate-300">{p.retention_factor_k}</td>
                    <td className="p-3 font-mono text-violet-300">{p.base_mz}</td>
                    <td className="p-3 font-mono text-slate-400">{p.peak_width_min} min</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
