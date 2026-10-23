import React, { useState, useEffect } from 'react';
import {
  Atom,
  Sliders,
  Layers,
  Activity,
  CheckCircle2,
  TrendingDown,
  Compass,
  Zap,
  BarChart2,
  Info,
  RefreshCw,
  GitCompare,
} from 'lucide-react';
import {
  SemiEmpiricalMethod,
  SemiEmpiricalPresetMolecule,
  SemiEmpiricalCalculationResult,
  PesScanPoint,
  MolecularOrbitalLevel,
} from '../../../types/semiEmpirical';
import {
  SemiEmpiricalService,
  FALLBACK_PRESETS,
} from '../../../services/semiEmpiricalService';

export const SemiEmpiricalWorkstation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scf' | 'orbitals' | 'charges' | 'pes' | 'benchmarks'>('scf');
  const [presets, setPresets] = useState<SemiEmpiricalPresetMolecule[]>(FALLBACK_PRESETS);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('water');
  const [method, setMethod] = useState<SemiEmpiricalMethod>('AM1');
  const [maxIterations, setMaxIterations] = useState<number>(50);

  // Results state
  const [result, setResult] = useState<SemiEmpiricalCalculationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOrbital, setSelectedOrbital] = useState<MolecularOrbitalLevel | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');

  // PES Scan state
  const [pesPoints, setPesPoints] = useState<PesScanPoint[]>([]);
  const [pesEquilibrium, setPesEquilibrium] = useState<number | null>(null);
  const [pesScanning, setPesScanning] = useState<boolean>(false);
  const [pesAtom1, setPesAtom1] = useState<number>(0);
  const [pesAtom2, setPesAtom2] = useState<number>(1);
  const [pesStartDist, setPesStartDist] = useState<number>(0.7);
  const [pesEndDist, setPesEndDist] = useState<number>(2.2);

  // Method comparison state
  const [benchmarkData, setBenchmarkData] = useState<Record<string, SemiEmpiricalCalculationResult | null>>({});
  const [benchmarking, setBenchmarking] = useState<boolean>(false);

  useEffect(() => {
    async function initPresets() {
      const p = await SemiEmpiricalService.fetchPresets();
      setPresets(p);
    }
    initPresets();
  }, []);

  const runCalculation = async () => {
    setLoading(true);
    setStatusMessage('');
    try {
      const res = await SemiEmpiricalService.calculate({
        preset_id: selectedPresetId,
        method,
        max_iterations: maxIterations,
      });
      if (res.result) {
        setResult(res.result);
        const homo = res.result.molecular_orbitals.find((mo) => mo.is_homo) || res.result.molecular_orbitals[0];
        setSelectedOrbital(homo);
        setStatusMessage(res.message || 'Calculation completed successfully.');
      }
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runCalculation();
  }, [selectedPresetId, method]);

  const handleRunPesScan = async () => {
    setPesScanning(true);
    try {
      const res = await SemiEmpiricalService.scanPes({
        preset_id: selectedPresetId,
        atom_idx_1: pesAtom1,
        atom_idx_2: pesAtom2,
        start_distance: pesStartDist,
        end_distance: pesEndDist,
        steps: 12,
        method,
      });
      if (res.points) {
        setPesPoints(res.points);
        setPesEquilibrium(res.equilibrium_distance_angstrom || null);
      }
    } catch (err: any) {
      setStatusMessage(`PES scan error: ${err.message}`);
    } finally {
      setPesScanning(false);
    }
  };

  const handleRunBenchmarkComparison = async () => {
    setBenchmarking(true);
    const methods: SemiEmpiricalMethod[] = ['MNDO', 'AM1', 'PM3'];
    const results: Record<string, SemiEmpiricalCalculationResult | null> = {};

    for (const m of methods) {
      try {
        const resp = await SemiEmpiricalService.calculate({
          preset_id: selectedPresetId,
          method: m,
          max_iterations: 40,
        });
        results[m] = resp.result || null;
      } catch {
        results[m] = null;
      }
    }
    setBenchmarkData(results);
    setBenchmarking(false);
  };

  const currentPreset = presets.find((p) => p.id === selectedPresetId) || presets[0];

  return (
    <div className="space-y-6 text-slate-100">
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg shadow-indigo-500/20">
                <Atom className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Semi-Empirical Quantum Chemistry Workstation
                </h1>
                <p className="text-sm text-slate-400">
                  MNDO, AM1, and PM3 NDDO Hamiltonians, Roothaan-Hall SCF with Pulay DIIS, and Frontier MO Theory
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-slate-800/80 border border-slate-700/60 rounded-full text-xs font-medium text-slate-300">
              Hamiltonian: <strong className="text-indigo-400">{method}</strong>
            </span>
            <span className="px-3 py-1 bg-slate-800/80 border border-slate-700/60 rounded-full text-xs font-medium text-slate-300">
              Point Group: <strong className="text-emerald-400">{currentPreset?.point_group || 'C1'}</strong>
            </span>
            <span className="px-3 py-1 bg-slate-800/80 border border-slate-700/60 rounded-full text-xs font-medium text-slate-300">
              Basis: <strong className="text-purple-400">{result?.number_of_basis_functions || 0} STOs</strong>
            </span>
          </div>
        </div>

        {/* Global Controls */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Reference Molecule
            </label>
            <select
              value={selectedPresetId}
              onChange={(e) => setSelectedPresetId(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {presets.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.formula})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Semi-Empirical Method
            </label>
            <div className="grid grid-cols-3 gap-1 bg-slate-800/90 border border-slate-700 p-1 rounded-lg">
              {(['MNDO', 'AM1', 'PM3'] as SemiEmpiricalMethod[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    method === m
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Max SCF Cycles
            </label>
            <input
              type="number"
              min={10}
              max={150}
              value={maxIterations}
              onChange={(e) => setMaxIterations(parseInt(e.target.value) || 50)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={runCalculation}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Solving SCF...' : 'Recompute SCF'}
            </button>
          </div>
        </div>

        {statusMessage && (
          <div className="mt-3 text-xs text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-indigo-400" />
            <span>{statusMessage}</span>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 space-x-2">
        {[
          { id: 'scf', label: 'SCF & Energetics', icon: Activity },
          { id: 'orbitals', label: 'Molecular Orbitals', icon: Layers },
          { id: 'charges', label: 'Mulliken & Dipole', icon: Compass },
          { id: 'pes', label: '1D Potential Energy Surface', icon: TrendingDown },
          { id: 'benchmarks', label: 'Method Comparison', icon: GitCompare },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                isActive
                  ? 'border-indigo-500 text-indigo-400 bg-slate-900/40'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: SCF & Energetics */}
      {activeTab === 'scf' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-base font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                SCF Self-Consistent Field Convergence History
              </h3>

              {result ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                        <th className="py-2.5 px-3">Iteration</th>
                        <th className="py-2.5 px-3">E(Electronic) [eV]</th>
                        <th className="py-2.5 px-3">E(Total) [eV]</th>
                        <th className="py-2.5 px-3">ΔE [eV]</th>
                        <th className="py-2.5 px-3">Max ΔP</th>
                        <th className="py-2.5 px-3">DIIS Dim</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono">
                      {result.scf_history.map((step) => (
                        <tr key={step.iteration} className="hover:bg-slate-800/40">
                          <td className="py-2 px-3 text-slate-300 font-semibold">{step.iteration}</td>
                          <td className="py-2 px-3 text-slate-300">{step.electronic_energy_ev.toFixed(6)}</td>
                          <td className="py-2 px-3 text-slate-200">{step.total_energy_ev.toFixed(6)}</td>
                          <td className="py-2 px-3 text-indigo-400">
                            {step.iteration > 1 ? step.energy_change_ev.toExponential(3) : '-'}
                          </td>
                          <td className="py-2 px-3 text-purple-400">{step.density_change_max.toExponential(3)}</td>
                          <td className="py-2 px-3 text-slate-400">{step.diis_dimension}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 text-sm">No SCF calculation loaded.</div>
              )}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-base font-semibold text-slate-200 mb-3 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-400" />
                Conceptual DFT & Chemical Reactivity Indices
              </h3>
              {result && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-800">
                    <div className="text-xs text-slate-400">Ionization Potential (IP)</div>
                    <div className="text-lg font-bold text-slate-100 font-mono mt-1">
                      {result.frontier_indices.ionization_potential_ev.toFixed(2)} eV
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Koopmans: -ε(HOMO)</div>
                  </div>
                  <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-800">
                    <div className="text-xs text-slate-400">Electron Affinity (EA)</div>
                    <div className="text-lg font-bold text-slate-100 font-mono mt-1">
                      {result.frontier_indices.electron_affinity_ev.toFixed(2)} eV
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Koopmans: -ε(LUMO)</div>
                  </div>
                  <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-800">
                    <div className="text-xs text-slate-400">HOMO-LUMO Gap</div>
                    <div className="text-lg font-bold text-emerald-400 font-mono mt-1">
                      {result.frontier_indices.gap_ev.toFixed(2)} eV
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Fundamental electronic gap</div>
                  </div>
                  <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-800">
                    <div className="text-xs text-slate-400">Electronegativity (χ)</div>
                    <div className="text-lg font-bold text-amber-400 font-mono mt-1">
                      {result.frontier_indices.electronegativity_ev.toFixed(2)} eV
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">(IP + EA) / 2</div>
                  </div>
                  <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-800">
                    <div className="text-xs text-slate-400">Chemical Hardness (η)</div>
                    <div className="text-lg font-bold text-indigo-400 font-mono mt-1">
                      {result.frontier_indices.hardness_ev.toFixed(2)} eV
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">(IP - EA) / 2</div>
                  </div>
                  <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-800">
                    <div className="text-xs text-slate-400">Electrophilicity Index (ω)</div>
                    <div className="text-lg font-bold text-purple-400 font-mono mt-1">
                      {result.frontier_indices.electrophilicity_index_ev.toFixed(2)} eV
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">χ² / (2η)</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Energetics Breakdown */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-base font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Thermochemical Energy Breakdown
              </h3>

              {result && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Electronic Energy:</span>
                    <span className="text-slate-200">{result.electronic_energy_ev.toFixed(3)} eV</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Core Repulsion:</span>
                    <span className="text-slate-200">{result.core_repulsion_energy_ev.toFixed(3)} eV</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-800 font-bold">
                    <span className="text-slate-300">Total Molecular Energy:</span>
                    <span className="text-indigo-400">{result.total_energy_ev.toFixed(3)} eV</span>
                  </div>
                  <div className="flex justify-between items-center py-2 bg-indigo-950/40 px-3 rounded border border-indigo-900/60 mt-3 font-bold">
                    <span className="text-indigo-300">Heat of Formation (ΔH_f):</span>
                    <span className="text-indigo-200 text-sm">{result.heat_of_formation_kcal_mol.toFixed(1)} kcal/mol</span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-800 space-y-2 text-[11px] font-sans">
                    <div className="text-slate-400 font-semibold uppercase tracking-wider">Literature Benchmarks</div>
                    {currentPreset && Object.entries(currentPreset.literature_heat_of_formation_kcal_mol).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-slate-400">
                        <span>{k}:</span>
                        <span className="font-mono text-slate-300">{v.toFixed(1)} kcal/mol</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-base font-semibold text-slate-200 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-indigo-400" />
                Hamiltonian Scientific Model
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The <strong>{method}</strong> (Neglect of Diatomic Differential Overlap) model approximates the Roothaan-Hall
                equations by assuming zero overlap in two-center two-electron integrals, evaluating one-center terms analytically
                from atomic spectra, and representing two-center repulsion with Klopman-Ohno multipole expansions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Molecular Orbitals Ladder */}
      {activeTab === 'orbitals' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-base font-semibold text-slate-200 mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Molecular Orbital Energy Ladder
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Valence molecular orbital eigenvalues. Click any orbital line to inspect its atomic basis expansion coefficients.
            </p>

            {result && (
              <div className="space-y-2">
                {result.molecular_orbitals.slice().reverse().map((mo) => {
                  const isSelected = selectedOrbital?.index === mo.index;
                  return (
                    <div
                      key={mo.index}
                      onClick={() => setSelectedOrbital(mo)}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-slate-800 border-indigo-500 shadow-md'
                          : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-3 h-3 rounded-full ${
                            mo.occupancy === 2.0 ? 'bg-indigo-500' : 'bg-slate-600'
                          }`}
                        />
                        <span className="text-xs font-mono font-bold text-slate-300">
                          MO #{mo.index}
                        </span>
                        {mo.is_homo && (
                          <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded text-[10px] font-bold">
                            HOMO
                          </span>
                        )}
                        {mo.is_lumo && (
                          <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded text-[10px] font-bold">
                            LUMO
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-6 font-mono text-xs">
                        <span className="text-slate-400">
                          Occ: <strong className="text-slate-200">{mo.occupancy.toFixed(1)}</strong>
                        </span>
                        <span className={`font-bold ${mo.energy_ev < 0 ? 'text-indigo-400' : 'text-purple-400'}`}>
                          {mo.energy_ev.toFixed(3)} eV
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: Selected Orbital Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-base font-semibold text-slate-200 mb-3 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-purple-400" />
              Orbital Coefficients C_μ,i
            </h3>

            {selectedOrbital ? (
              <div className="space-y-4">
                <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-400">Selected Level</div>
                  <div className="text-lg font-bold text-slate-200 font-mono">
                    MO #{selectedOrbital.index} ({selectedOrbital.energy_ev.toFixed(3)} eV)
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Occupancy: {selectedOrbital.occupancy === 2.0 ? 'Doubly occupied (Closed shell)' : 'Unoccupied (Virtual)'}
                  </div>
                </div>

                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Valence STO Basis Contributions
                </div>

                <div className="space-y-2 max-h-80 overflow-y-auto font-mono text-xs pr-1">
                  {selectedOrbital.coefficients.map((coeff, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-slate-800/40 rounded border border-slate-800/60">
                      <span className="text-slate-400">χ_{idx + 1}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-700 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${coeff >= 0 ? 'bg-indigo-500' : 'bg-rose-500'}`}
                            style={{ width: `${Math.min(100, Math.abs(coeff) * 100)}%` }}
                          />
                        </div>
                        <span className={coeff >= 0 ? 'text-indigo-300' : 'text-rose-300'}>
                          {coeff >= 0 ? `+${coeff.toFixed(3)}` : coeff.toFixed(3)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 text-sm">Select an orbital to inspect coefficients.</div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Mulliken Charges & Dipole Moment */}
      {activeTab === 'charges' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-base font-semibold text-slate-200 mb-3 flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-400" />
              Mulliken Atomic Population Analysis
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Net atomic partial charges derived from diagonal density matrix components Q_A = Z_A - Σ P_μμ.
            </p>

            {result && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                      <th className="py-2.5 px-3">Atom</th>
                      <th className="py-2.5 px-3">Element</th>
                      <th className="py-2.5 px-3">Valence e⁻</th>
                      <th className="py-2.5 px-3">s-Pop</th>
                      <th className="py-2.5 px-3">p-Pop</th>
                      <th className="py-2.5 px-3">Net Charge (q)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {result.atomic_populations.map((pop) => (
                      <tr key={pop.atom_index} className="hover:bg-slate-800/40">
                        <td className="py-2 px-3 text-slate-400 font-semibold">#{pop.atom_index + 1}</td>
                        <td className="py-2 px-3 text-slate-200 font-bold">{pop.symbol}</td>
                        <td className="py-2 px-3 text-slate-300">{pop.total_valence_electrons.toFixed(3)}</td>
                        <td className="py-2 px-3 text-slate-400">{pop.s_population.toFixed(3)}</td>
                        <td className="py-2 px-3 text-slate-400">{pop.p_population.toFixed(3)}</td>
                        <td className={`py-2 px-3 font-bold ${pop.net_charge >= 0 ? 'text-indigo-400' : 'text-rose-400'}`}>
                          {pop.net_charge >= 0 ? `+${pop.net_charge.toFixed(3)}` : pop.net_charge.toFixed(3)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg space-y-4">
            <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-400" />
              Molecular Dipole Moment
            </h3>

            {result && (
              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-900/60 text-center">
                  <div className="text-xs text-indigo-300 font-sans uppercase tracking-wider mb-1">
                    Total Dipole Magnitude
                  </div>
                  <div className="text-3xl font-extrabold text-white">
                    {result.dipole_moment.magnitude.toFixed(2)} D
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Lit. Exp: {currentPreset?.literature_dipole_debye?.Exp ?? 1.85} Debye
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">μ_x:</span>
                    <span className="text-slate-200">{result.dipole_moment.dx.toFixed(3)} D</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">μ_y:</span>
                    <span className="text-slate-200">{result.dipole_moment.dy.toFixed(3)} D</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">μ_z:</span>
                    <span className="text-slate-200">{result.dipole_moment.dz.toFixed(3)} D</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Point Charge Dipole:</span>
                    <span className="text-slate-300">{result.dipole_moment.point_charge_contribution.toFixed(3)} D</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Hybridization (sp) Dipole:</span>
                    <span className="text-slate-300">{result.dipole_moment.hybridization_contribution.toFixed(3)} D</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: 1D Potential Energy Surface (PES) Scan */}
      {activeTab === 'pes' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-base font-semibold text-slate-200 mb-2 flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
              1D Potential Energy Surface (PES) Bond Coordinate Scan
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Translates a selected atom along the internuclear axis to compute the potential energy surface curve,
              identifying the equilibrium bond length R_eq and dissociation well depth.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Fixed Atom Index
                </label>
                <input
                  type="number"
                  min={0}
                  max={(currentPreset?.atoms.length || 1) - 1}
                  value={pesAtom1}
                  onChange={(e) => setPesAtom1(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Displaced Atom Index
                </label>
                <input
                  type="number"
                  min={0}
                  max={(currentPreset?.atoms.length || 1) - 1}
                  value={pesAtom2}
                  onChange={(e) => setPesAtom2(parseInt(e.target.value) || 1)}
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Scan Range (Å)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    value={pesStartDist}
                    onChange={(e) => setPesStartDist(parseFloat(e.target.value) || 0.7)}
                    className="w-1/2 bg-slate-800/90 border border-slate-700 rounded px-2 py-2 text-xs text-slate-200"
                  />
                  <span className="text-slate-500">to</span>
                  <input
                    type="number"
                    step="0.1"
                    value={pesEndDist}
                    onChange={(e) => setPesEndDist(parseFloat(e.target.value) || 2.2)}
                    className="w-1/2 bg-slate-800/90 border border-slate-700 rounded px-2 py-2 text-xs text-slate-200"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleRunPesScan}
                  disabled={pesScanning}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-50"
                >
                  {pesScanning ? 'Scanning...' : 'Run PES Scan'}
                </button>
              </div>
            </div>

            {pesPoints.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-800 text-xs">
                  <span className="text-slate-300">
                    Equilibrium Minimum Bond Length: <strong className="text-emerald-400 font-mono text-sm">{pesEquilibrium} Å</strong>
                  </span>
                  <span className="text-slate-400">
                    Points: <strong className="text-slate-200 font-mono">{pesPoints.length}</strong>
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-sans font-semibold uppercase tracking-wider">
                        <th className="py-2.5 px-3">Distance (Å)</th>
                        <th className="py-2.5 px-3">Total Energy (eV)</th>
                        <th className="py-2.5 px-3">Relative Energy (kcal/mol)</th>
                        <th className="py-2.5 px-3">ΔH_f (kcal/mol)</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {pesPoints.map((pt, idx) => (
                        <tr
                          key={idx}
                          className={`hover:bg-slate-800/40 ${
                            pt.coordinate_value === pesEquilibrium ? 'bg-emerald-950/30' : ''
                          }`}
                        >
                          <td className="py-2 px-3 text-slate-200 font-bold">{pt.coordinate_value.toFixed(2)}</td>
                          <td className="py-2 px-3 text-slate-300">{pt.total_energy_ev.toFixed(3)}</td>
                          <td className="py-2 px-3 text-emerald-400 font-bold">+{pt.relative_energy_kcal_mol.toFixed(1)}</td>
                          <td className="py-2 px-3 text-indigo-400">{pt.heat_of_formation_kcal_mol.toFixed(1)}</td>
                          <td className="py-2 px-3">
                            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-sans">
                              Converged
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Method Benchmarking Comparison */}
      {activeTab === 'benchmarks' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2">
                <GitCompare className="w-4 h-4 text-indigo-400" />
                MNDO vs AM1 vs PM3 Side-by-Side Comparison
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Comparative benchmarks across Hamiltonians for {currentPreset?.name} ({currentPreset?.formula}).
              </p>
            </div>

            <button
              onClick={handleRunBenchmarkComparison}
              disabled={benchmarking}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${benchmarking ? 'animate-spin' : ''}`} />
              {benchmarking ? 'Comparing...' : 'Run All 3 Methods'}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-sans font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Property</th>
                  <th className="py-3 px-4 text-indigo-400">MNDO (1977)</th>
                  <th className="py-3 px-4 text-purple-400">AM1 (1985)</th>
                  <th className="py-3 px-4 text-emerald-400">PM3 (1989)</th>
                  <th className="py-3 px-4 text-amber-400">Literature / Exp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 text-slate-300 font-semibold font-mono">Heat of Formation (ΔH_f)</td>
                  <td className="py-3 px-4 text-indigo-300 font-mono">
                    {benchmarkData['MNDO'] ? `${benchmarkData['MNDO']?.heat_of_formation_kcal_mol.toFixed(1)} kcal/mol` : '-'}
                  </td>
                  <td className="py-3 px-4 text-purple-300 font-mono">
                    {benchmarkData['AM1'] ? `${benchmarkData['AM1']?.heat_of_formation_kcal_mol.toFixed(1)} kcal/mol` : '-'}
                  </td>
                  <td className="py-3 px-4 text-emerald-300 font-mono">
                    {benchmarkData['PM3'] ? `${benchmarkData['PM3']?.heat_of_formation_kcal_mol.toFixed(1)} kcal/mol` : '-'}
                  </td>
                  <td className="py-3 px-4 text-amber-300 font-mono font-bold">
                    {currentPreset?.literature_heat_of_formation_kcal_mol?.Exp ?? '-'} kcal/mol
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 text-slate-300 font-semibold font-mono">Dipole Moment (|μ|)</td>
                  <td className="py-3 px-4 text-indigo-300 font-mono">
                    {benchmarkData['MNDO'] ? `${benchmarkData['MNDO']?.dipole_moment.magnitude.toFixed(2)} D` : '-'}
                  </td>
                  <td className="py-3 px-4 text-purple-300 font-mono">
                    {benchmarkData['AM1'] ? `${benchmarkData['AM1']?.dipole_moment.magnitude.toFixed(2)} D` : '-'}
                  </td>
                  <td className="py-3 px-4 text-emerald-300 font-mono">
                    {benchmarkData['PM3'] ? `${benchmarkData['PM3']?.dipole_moment.magnitude.toFixed(2)} D` : '-'}
                  </td>
                  <td className="py-3 px-4 text-amber-300 font-mono font-bold">
                    {currentPreset?.literature_dipole_debye?.Exp ?? '-'} D
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 text-slate-300 font-semibold font-mono">HOMO-LUMO Gap</td>
                  <td className="py-3 px-4 text-indigo-300 font-mono">
                    {benchmarkData['MNDO'] ? `${benchmarkData['MNDO']?.frontier_indices.gap_ev.toFixed(2)} eV` : '-'}
                  </td>
                  <td className="py-3 px-4 text-purple-300 font-mono">
                    {benchmarkData['AM1'] ? `${benchmarkData['AM1']?.frontier_indices.gap_ev.toFixed(2)} eV` : '-'}
                  </td>
                  <td className="py-3 px-4 text-emerald-300 font-mono">
                    {benchmarkData['PM3'] ? `${benchmarkData['PM3']?.frontier_indices.gap_ev.toFixed(2)} eV` : '-'}
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono">-</td>
                </tr>

                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 text-slate-300 font-semibold font-mono">SCF Cycles to Convergence</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">
                    {benchmarkData['MNDO'] ? `${benchmarkData['MNDO']?.scf_iterations} cycles` : '-'}
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-mono">
                    {benchmarkData['AM1'] ? `${benchmarkData['AM1']?.scf_iterations} cycles` : '-'}
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-mono">
                    {benchmarkData['PM3'] ? `${benchmarkData['PM3']?.scf_iterations} cycles` : '-'}
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
