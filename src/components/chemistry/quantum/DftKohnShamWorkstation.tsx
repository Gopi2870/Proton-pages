import React, { useState, useEffect } from 'react';
import {
  Atom,
  Sliders,
  Sparkles,
  Layers,
  Activity,
  CheckCircle2,
  TrendingDown,
  Compass,
} from 'lucide-react';
import {
  DftPresetMolecule,
  DftCalculationResponse,
  TdDftResponse,
  MepSurfaceResponse,
  KohnShamOrbital,
} from '../../../types/dftQuantum';
import { dftQuantumService } from '../../../services/dftQuantumService';

export const DftKohnShamWorkstation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scf' | 'orbitals' | 'mep' | 'tddft'>('scf');
  const [presets, setPresets] = useState<DftPresetMolecule[]>([]);
  const [selectedMoleculeId, setSelectedMoleculeId] = useState<string>('benzene');
  const [functional, setFunctional] = useState<string>('B3LYP');
  const [basisSet, setBasisSet] = useState<string>('6-31G(d)');
  const [enableDiis, setEnableDiis] = useState<boolean>(true);

  // Results state
  const [scfResult, setScfResult] = useState<DftCalculationResponse | null>(null);
  const [tddftResult, setTddftResult] = useState<TdDftResponse | null>(null);
  const [mepResult, setMepResult] = useState<MepSurfaceResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOrbital, setSelectedOrbital] = useState<KohnShamOrbital | null>(null);

  useEffect(() => {
    async function loadPresets() {
      const p = await dftQuantumService.getPresets();
      setPresets(p);
    }
    loadPresets();
  }, []);

  useEffect(() => {
    async function runCalculation() {
      setLoading(true);
      const scf = await dftQuantumService.calculateScf({
        molecule_id: selectedMoleculeId,
        functional,
        basis_set: basisSet,
        enable_diis: enableDiis,
      });
      setScfResult(scf);
      const homo = scf.orbitals.find((o) => o.is_homo) || scf.orbitals[0];
      setSelectedOrbital(homo);

      const td = await dftQuantumService.calculateTdDft({
        molecule_id: selectedMoleculeId,
        functional,
      });
      setTddftResult(td);

      const mep = await dftQuantumService.generateMepSurface({
        molecule_id: selectedMoleculeId,
      });
      setMepResult(mep);

      setLoading(false);
    }
    runCalculation();
  }, [selectedMoleculeId, functional, basisSet, enableDiis]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 text-slate-100">
      {/* Top Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2">
              <Atom className="w-3.5 h-3.5" />
              <span>Computational Chemistry • PR #052</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
              Density Functional Theory (DFT) Kohn-Sham Workstation
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Solve Self-Consistent Field (SCF) Roothaan-Kohn-Sham equations with Pulay DIIS damping, compute frontier orbital energy ladders, Molecular Electrostatic Potential (MEP) surfaces, and TD-DFT electronic excitations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('scf')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'scf'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              SCF Convergence
            </button>
            <button
              onClick={() => setActiveTab('orbitals')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'orbitals'
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Orbital Spectrum
            </button>
            <button
              onClick={() => setActiveTab('mep')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'mep'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              MEP Surface
            </button>
            <button
              onClick={() => setActiveTab('tddft')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'tddft'
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              TD-DFT Excitations
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Sidebar (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Benchmark Molecular System
            </label>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMoleculeId(m.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedMoleculeId === m.id
                      ? 'bg-cyan-950/40 border-cyan-500/60 text-white shadow-md shadow-cyan-950/30'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="font-bold text-sm text-slate-100">{m.name}</div>
                  <div className="text-xs font-mono text-cyan-400">{m.formula}</div>
                  <div className="text-[10px] text-slate-500 mt-1">Group: {m.point_group}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Functional Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Exchange-Correlation Functional</label>
            <div className="grid grid-cols-3 gap-2">
              {['B3LYP', 'BLYP', 'LDA'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFunctional(f)}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                    functional === f
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                      : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Basis Set Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Gaussian Basis Set</label>
            <div className="grid grid-cols-3 gap-2">
              {['6-31G(d)', '6-31G', 'STO-3G'].map((b) => (
                <button
                  key={b}
                  onClick={() => setBasisSet(b)}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                    basisSet === b
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                      : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* DIIS Acceleration Toggle */}
          <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-200">Pulay DIIS Acceleration</div>
              <div className="text-[11px] text-slate-400">Direct Inversion in Subspace damping</div>
            </div>
            <input
              type="checkbox"
              checked={enableDiis}
              onChange={(e) => setEnableDiis(e.target.checked)}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-800 border-slate-700"
            />
          </div>

          {/* Thermochemical Summary Box */}
          {scfResult && (
            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2 text-xs">
              <div className="font-semibold text-cyan-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>SCF State Convergence</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div>
                  <span className="text-slate-500 block">Total Energy (E_tot)</span>
                  <span className="font-mono text-slate-100 font-bold">{scfResult.total_energy_hartree} Eh</span>
                </div>
                <div>
                  <span className="text-slate-500 block">HOMO-LUMO Gap</span>
                  <span className="font-mono text-cyan-300 font-bold">{scfResult.homo_lumo_gap_ev} eV</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Chemical Hardness</span>
                  <span className="font-mono text-slate-300">{scfResult.chemical_hardness_ev} eV</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Dipole Moment</span>
                  <span className="font-mono text-slate-300">{scfResult.dipole_moment_debye} D</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Viewport (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {activeTab === 'scf' && scfResult && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Kohn-Sham SCF Iterative Convergence</h3>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    {scfResult.molecule_name} • {scfResult.functional} / {scfResult.basis_set} • {scfResult.iterations_count} iterations
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 border border-emerald-800 text-emerald-300">
                  Converged (1e-6 threshold)
                </span>
              </div>

              {/* Convergence Trajectory Chart */}
              <div className="h-64 bg-slate-950/80 rounded-xl border border-slate-800 p-4 flex items-end justify-between gap-1">
                {scfResult.scf_history.map((step) => {
                  const errorLog = Math.max(12, Math.min(220, (Math.log10(step.diis_error_norm) + 8) * 25));
                  return (
                    <div key={step.iteration} className="flex-1 flex flex-col items-center group relative">
                      <div
                        style={{ height: `${errorLog}px` }}
                        className="w-full bg-cyan-500 hover:bg-cyan-400 rounded-t transition-all"
                      />
                      <span className="text-[9px] font-mono text-slate-500 mt-1">k={step.iteration}</span>
                    </div>
                  );
                })}
              </div>

              {/* Iterations Log Table */}
              <div className="border border-slate-800 rounded-xl overflow-hidden max-h-48 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 sticky top-0">
                    <tr>
                      <th className="p-2.5">Iteration (k)</th>
                      <th className="p-2.5">Electronic Energy (Eh)</th>
                      <th className="p-2.5">Delta E (Eh)</th>
                      <th className="p-2.5">DIIS Error Norm</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {scfResult.scf_history.map((s) => (
                      <tr key={s.iteration} className="hover:bg-slate-800/30">
                        <td className="p-2.5 font-mono text-slate-300">{s.iteration}</td>
                        <td className="p-2.5 font-mono text-slate-200">{s.electronic_energy_hartree}</td>
                        <td className="p-2.5 font-mono text-cyan-300">{s.energy_change_hartree.toExponential(3)}</td>
                        <td className="p-2.5 font-mono text-emerald-400">{s.diis_error_norm.toExponential(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orbitals' && scfResult && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Frontier Kohn-Sham Molecular Orbitals</h3>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    HOMO-LUMO Gap: {scfResult.homo_lumo_gap_ev} eV • Hardness: {scfResult.chemical_hardness_ev} eV
                  </div>
                </div>
              </div>

              {/* Orbital Energy Ladder */}
              <div className="h-64 bg-slate-950/80 rounded-xl border border-slate-800 p-4 flex items-end justify-between gap-2 overflow-x-auto">
                {scfResult.orbitals.map((o) => {
                  const isHomo = o.is_homo;
                  const isLumo = o.is_lumo;
                  const isSelected = selectedOrbital?.orbital_index === o.orbital_index;

                  return (
                    <div
                      key={o.orbital_index}
                      onClick={() => setSelectedOrbital(o)}
                      className={`flex-1 flex flex-col items-center cursor-pointer p-2 rounded-xl transition-all ${
                        isSelected ? 'bg-slate-800/80' : 'hover:bg-slate-900'
                      }`}
                    >
                      <span className="text-xs font-mono font-bold text-slate-300 mb-2">{o.energy_ev} eV</span>
                      <div
                        className={`w-full h-2 rounded transition-all ${
                          isHomo
                            ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50'
                            : isLumo
                            ? 'bg-amber-400 shadow-lg shadow-amber-400/50'
                            : o.occupation > 0
                            ? 'bg-cyan-500'
                            : 'bg-slate-600'
                        }`}
                      />
                      <span className="text-xs font-mono font-bold text-slate-200 mt-2">{o.symmetry_label}</span>
                      <span className="text-[10px] text-slate-500">
                        {isHomo ? 'HOMO' : isLumo ? 'LUMO' : `${o.occupation}e⁻`}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Selected Orbital Description */}
              {selectedOrbital && (
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white text-sm">Orbital #{selectedOrbital.orbital_index} ({selectedOrbital.symmetry_label})</span>
                    <div className="text-slate-400 mt-0.5">
                      Character: {selectedOrbital.dominant_atomic_orbitals.join(', ')} • Occupation: {selectedOrbital.occupation} electrons
                    </div>
                  </div>
                  <div className="font-mono text-base font-bold text-cyan-300">
                    {selectedOrbital.energy_ev} eV
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'mep' && mepResult && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Molecular Electrostatic Potential (MEP)</h3>
                  <p className="text-xs text-slate-400">
                    Red indicates electron-rich nucleophilic potential (lone pairs); Blue indicates electrophilic potential.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-red-400 font-bold">{mepResult.min_potential_au} a.u.</span>
                  <span className="w-16 h-2 rounded bg-gradient-to-r from-red-500 via-emerald-400 to-blue-500" />
                  <span className="text-blue-400 font-bold">+{mepResult.max_potential_au} a.u.</span>
                </div>
              </div>

              {/* MEP 2D Grid Visualizer */}
              <div className="h-64 bg-slate-950/90 rounded-xl border border-slate-800 p-4 grid grid-cols-10 gap-1 items-center justify-items-center">
                {mepResult.points.slice(0, 80).map((pt, i) => {
                  const pot = pt.electrostatic_potential_au;
                  const color =
                    pot < -0.02
                      ? 'bg-red-500/80 shadow-sm shadow-red-500'
                      : pot > 0.03
                      ? 'bg-blue-500/80 shadow-sm shadow-blue-500'
                      : 'bg-emerald-500/50';

                  return (
                    <div
                      key={i}
                      title={`(${pt.x}, ${pt.y}) V: ${pt.electrostatic_potential_au} a.u.`}
                      className={`w-3.5 h-3.5 rounded-full ${color} transition-transform hover:scale-150 cursor-pointer`}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'tddft' && tddftResult && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div>
                <h3 className="text-lg font-bold text-white">Time-Dependent DFT (TD-DFT) Excitations</h3>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  Peak Absorption Wavelength: {tddftResult.absorption_max_wavelength_nm} nm
                </div>
              </div>

              <div className="border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">State</th>
                      <th className="p-3">Excitation Energy (eV)</th>
                      <th className="p-3">Wavelength (nm)</th>
                      <th className="p-3">Oscillator Strength (f)</th>
                      <th className="p-3">Dominant Transition</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {tddftResult.states.map((st) => (
                      <tr key={st.state_index} className="hover:bg-slate-800/30">
                        <td className="p-3 font-bold text-cyan-300">S{st.state_index}</td>
                        <td className="p-3 font-mono text-slate-200">{st.excitation_energy_ev} eV</td>
                        <td className="p-3 font-mono text-violet-300 font-bold">{st.wavelength_nm} nm</td>
                        <td className="p-3 font-mono text-amber-300">{st.oscillator_strength_f}</td>
                        <td className="p-3 text-slate-300">{st.dominant_transition}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
