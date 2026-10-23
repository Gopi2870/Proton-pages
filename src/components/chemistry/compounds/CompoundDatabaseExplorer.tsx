import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  Sparkles,
  Database,
  Activity,
  Layers,
  Thermometer,
  Scale,
  ShieldAlert,
  X,
  Eye,
  Info,
  CheckCircle2,
} from 'lucide-react';
import {
  DetailedCompound,
  CompoundSearchFilter,
  DatabaseStats,
  SpectralMatchRequest,
} from '../../../types/compoundDatabase';
import { compoundDatabaseService } from '../../../services/compoundDatabaseService';

export const CompoundDatabaseExplorer: React.FC = () => {
  const [stats, setStats] = useState<DatabaseStats | null>(null);
  const [compounds, setCompounds] = useState<DetailedCompound[]>([]);
  const [totalMatches, setTotalMatches] = useState<number>(0);
  const [queryTimeMs, setQueryTimeMs] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPhysicalState, setSelectedPhysicalState] = useState<string>('All');
  const [minMw, setMinMw] = useState<number>(0);
  const [maxMw, setMaxMw] = useState<number>(500);
  const [filterUv, setFilterUv] = useState<boolean>(false);
  const [filterIr, setFilterIr] = useState<boolean>(false);
  const [filterNmr, setFilterNmr] = useState<boolean>(false);

  // Mode: 'browse' | 'matcher'
  const [explorerMode, setExplorerMode] = useState<'browse' | 'matcher'>('browse');

  // Matcher state
  const [targetUv, setTargetUv] = useState<number>(273);
  const [targetIr, setTargetIr] = useState<number>(1715);
  const [targetNmr, setTargetNmr] = useState<number>(2.16);
  const [matchTolerance, setMatchTolerance] = useState<number>(5);
  const [useUvMatch, setUseUvMatch] = useState<boolean>(true);
  const [useIrMatch, setUseIrMatch] = useState<boolean>(false);
  const [useNmrMatch, setUseNmrMatch] = useState<boolean>(false);

  // Selected compound for detailed inspection
  const [selectedCompound, setSelectedCompound] = useState<DetailedCompound | null>(null);
  const [activeInspectorTab, setActiveInspectorTab] = useState<'overview' | 'uv' | 'ir' | 'nmr' | 'safety'>('overview');

  // Fetch initial stats
  useEffect(() => {
    async function loadStats() {
      const s = await compoundDatabaseService.getDatabaseStats();
      setStats(s);
    }
    loadStats();
  }, []);

  // Execute Search
  useEffect(() => {
    let isCancelled = false;

    async function executeQuery() {
      setLoading(true);
      if (explorerMode === 'browse') {
        const filter: CompoundSearchFilter = {
          query: searchQuery.trim() || undefined,
          category: selectedCategory === 'All' ? undefined : selectedCategory,
          physical_state: selectedPhysicalState === 'All' ? undefined : selectedPhysicalState,
          min_mw: minMw > 0 ? minMw : undefined,
          max_mw: maxMw < 500 ? maxMw : undefined,
          has_uv: filterUv || undefined,
          has_ir: filterIr || undefined,
          has_nmr: filterNmr || undefined,
        };
        const res = await compoundDatabaseService.searchCompounds(filter);
        if (!isCancelled) {
          setCompounds(res.compounds);
          setTotalMatches(res.total_matches);
          setQueryTimeMs(res.query_time_ms);
          setLoading(false);
        }
      } else {
        const req: SpectralMatchRequest = {
          target_uv_wavelength_nm: useUvMatch ? targetUv : undefined,
          target_ir_wavenumber_cm1: useIrMatch ? targetIr : undefined,
          target_nmr_1h_ppm: useNmrMatch ? targetNmr : undefined,
          tolerance_percent: matchTolerance,
        };
        const res = await compoundDatabaseService.matchSpectroscopy(req);
        if (!isCancelled) {
          setCompounds(res.compounds);
          setTotalMatches(res.total_matches);
          setQueryTimeMs(res.query_time_ms);
          setLoading(false);
        }
      }
    }

    executeQuery();
    return () => {
      isCancelled = true;
    };
  }, [
    explorerMode,
    searchQuery,
    selectedCategory,
    selectedPhysicalState,
    minMw,
    maxMw,
    filterUv,
    filterIr,
    filterNmr,
    targetUv,
    targetIr,
    targetNmr,
    matchTolerance,
    useUvMatch,
    useIrMatch,
    useNmrMatch,
  ]);

  const categories = useMemo(() => {
    if (!stats) return ['All', 'Pharmaceutical', 'Organic', 'Biochemical', 'Organometallic'];
    return ['All', ...Object.keys(stats.categories)];
  }, [stats]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 text-slate-100">
      {/* Top Banner & Stats */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2">
              <Database className="w-3.5 h-3.5" />
              <span>Curated Reference Library • PR #050</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              Chemical Compounds & Spectral Reference Database
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Deterministic IUPAC chemical profiles with thermochemical constants, aqueous solubility, acid-base dissociation (pKa), and analytical UV-Vis, FTIR, and 1H/13C-NMR spectroscopic fingerprints.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setExplorerMode('browse')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                explorerMode === 'browse'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Catalog Browser</span>
            </button>
            <button
              onClick={() => setExplorerMode('matcher')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                explorerMode === 'matcher'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Spectral Matcher</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-5 border-t border-slate-800/80">
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
              <div className="text-xs text-slate-400">Total Compounds</div>
              <div className="text-xl font-bold text-cyan-300">{stats.total_compounds}</div>
            </div>
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
              <div className="text-xs text-slate-400">Avg Mol Weight</div>
              <div className="text-xl font-bold text-teal-300">{stats.average_molecular_weight} <span className="text-xs font-normal text-slate-400">g/mol</span></div>
            </div>
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
              <div className="text-xs text-slate-400">UV-Vis Spectra</div>
              <div className="text-xl font-bold text-violet-300">{stats.compounds_with_uv}</div>
            </div>
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
              <div className="text-xs text-slate-400">FTIR Band Spectra</div>
              <div className="text-xl font-bold text-pink-300">{stats.compounds_with_ir}</div>
            </div>
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
              <div className="text-xs text-slate-400">1H/13C NMR Shifts</div>
              <div className="text-xl font-bold text-amber-300">{stats.compounds_with_nmr}</div>
            </div>
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
              <div className="text-xs text-slate-400">Query Latency</div>
              <div className="text-xl font-bold text-emerald-300">{queryTimeMs} <span className="text-xs font-normal text-slate-400">ms</span></div>
            </div>
          </div>
        )}
      </div>

      {/* Control Workstation */}
      {explorerMode === 'browse' ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by Compound Name, IUPAC name, SMILES, Formula, or CAS Number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm focus:outline-none focus:border-cyan-500 text-slate-200 placeholder-slate-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* State filter */}
            <select
              value={selectedPhysicalState}
              onChange={(e) => setSelectedPhysicalState(e.target.value)}
              className="px-3 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All States (Solid, Liquid, Gas)</option>
              <option value="Solid">Solid</option>
              <option value="Liquid">Liquid</option>
              <option value="Gas">Gas</option>
            </select>
          </div>

          {/* Category Pills & Spectral Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 text-slate-950 font-semibold'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-750 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span className="text-slate-400 font-semibold">Spectral Modality:</span>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterUv}
                  onChange={(e) => setFilterUv(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>UV-Vis</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterIr}
                  onChange={(e) => setFilterIr(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-pink-500 focus:ring-0"
                />
                <span>FTIR</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterNmr}
                  onChange={(e) => setFilterNmr(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0"
                />
                <span>NMR</span>
              </label>
            </div>
          </div>
        </div>
      ) : (
        /* Spectral Matcher Workstation */
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
            <Activity className="w-4 h-4" />
            <span>Analytical Unknown Detective: Match Peaks against Curated Standards</span>
          </div>
          <p className="text-xs text-slate-400">
            Input observed absorption wavelength, infrared vibrational band, or NMR resonance shift to discover candidate chemical identities within specified tolerance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* UV Input */}
            <div className={`p-4 rounded-xl border transition-all ${useUvMatch ? 'bg-violet-950/20 border-violet-500/40' : 'bg-slate-950/40 border-slate-800 opacity-60'}`}>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-violet-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useUvMatch}
                    onChange={(e) => setUseUvMatch(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-violet-500"
                  />
                  <span>UV-Vis λ_max Peak</span>
                </label>
                <span className="text-xs text-slate-400 font-mono">{targetUv} nm</span>
              </div>
              <input
                type="range"
                min="180"
                max="600"
                step="1"
                disabled={!useUvMatch}
                value={targetUv}
                onChange={(e) => setTargetUv(parseFloat(e.target.value))}
                className="w-full accent-violet-500"
              />
            </div>

            {/* IR Input */}
            <div className={`p-4 rounded-xl border transition-all ${useIrMatch ? 'bg-pink-950/20 border-pink-500/40' : 'bg-slate-950/40 border-slate-800 opacity-60'}`}>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-pink-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useIrMatch}
                    onChange={(e) => setUseIrMatch(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-pink-500"
                  />
                  <span>FTIR Wavenumber</span>
                </label>
                <span className="text-xs text-slate-400 font-mono">{targetIr} cm⁻¹</span>
              </div>
              <input
                type="range"
                min="400"
                max="3600"
                step="10"
                disabled={!useIrMatch}
                value={targetIr}
                onChange={(e) => setTargetIr(parseFloat(e.target.value))}
                className="w-full accent-pink-500"
              />
            </div>

            {/* NMR Input */}
            <div className={`p-4 rounded-xl border transition-all ${useNmrMatch ? 'bg-amber-950/20 border-amber-500/40' : 'bg-slate-950/40 border-slate-800 opacity-60'}`}>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-amber-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useNmrMatch}
                    onChange={(e) => setUseNmrMatch(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-amber-500"
                  />
                  <span>¹H-NMR Chemical Shift</span>
                </label>
                <span className="text-xs text-slate-400 font-mono">{targetNmr.toFixed(2)} ppm</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="14.0"
                step="0.05"
                disabled={!useNmrMatch}
                value={targetNmr}
                onChange={(e) => setTargetNmr(parseFloat(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span>Matching Tolerance Window:</span>
              <span className="font-mono text-cyan-400 font-bold">±{matchTolerance}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="0.5"
              value={matchTolerance}
              onChange={(e) => setMatchTolerance(parseFloat(e.target.value))}
              className="w-48 accent-cyan-500"
            />
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <div>
          Showing <span className="font-bold text-slate-200">{compounds.length}</span> of{' '}
          <span className="font-bold text-slate-200">{totalMatches}</span> matches
        </div>
        <div>
          Query completed in <span className="text-cyan-400 font-mono">{queryTimeMs} ms</span>
        </div>
      </div>

      {/* Compounds Card Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">Loading chemical reference catalog...</div>
      ) : compounds.length === 0 ? (
        <div className="py-16 text-center bg-slate-900/40 rounded-2xl border border-slate-800">
          <Info className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <div className="text-slate-300 font-semibold">No compounds match the selected criteria</div>
          <div className="text-xs text-slate-500 mt-1">Try widening your search keyword or relaxing spectral tolerance.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {compounds.map((c) => (
            <div
              key={c.id}
              className="bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between group"
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                    {c.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {c.physical_state_at_25c}
                  </span>
                </div>

                {/* Name & Formula */}
                <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {c.name}
                </h3>
                <div className="text-xs font-mono text-emerald-400 mt-0.5">{c.formula}</div>
                <div className="text-xs text-slate-400 mt-1 italic line-clamp-1">{c.iupac_name}</div>

                {/* Physicochemical stats pill row */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-xs">
                  <div>
                    <span className="text-slate-500 block">MW</span>
                    <span className="font-mono text-slate-300 font-semibold">{c.molecular_weight}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">LogP</span>
                    <span className="font-mono text-slate-300 font-semibold">{c.log_p !== undefined ? c.log_p : 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">pKa</span>
                    <span className="font-mono text-slate-300 font-semibold">
                      {c.pka_values.length > 0 ? c.pka_values.join(', ') : '—'}
                    </span>
                  </div>
                </div>

                {/* Spectral badges */}
                <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2">
                  {c.uv_vis_peaks.length > 0 && (
                    <span className="px-2 py-0.5 rounded bg-violet-950/50 border border-violet-800 text-[10px] text-violet-300 font-medium">
                      UV: {c.uv_vis_peaks[0].wavelength_nm} nm
                    </span>
                  )}
                  {c.ir_bands.length > 0 && (
                    <span className="px-2 py-0.5 rounded bg-pink-950/50 border border-pink-800 text-[10px] text-pink-300 font-medium">
                      IR: {c.ir_bands[0].wavenumber_cm1} cm⁻¹
                    </span>
                  )}
                  {c.nmr_1h_shifts.length > 0 && (
                    <span className="px-2 py-0.5 rounded bg-amber-950/50 border border-amber-800 text-[10px] text-amber-300 font-medium">
                      ¹H: {c.nmr_1h_shifts.length} shifts
                    </span>
                  )}
                </div>
              </div>

              {/* Action */}
              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">{c.cas_number || 'CAS: —'}</span>
                <button
                  onClick={() => {
                    setSelectedCompound(c);
                    setActiveInspectorTab('overview');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-cyan-600 text-slate-200 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Profile</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Inspector Modal */}
      {selectedCompound && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">{selectedCompound.name}</h2>
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {selectedCompound.category}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    {selectedCompound.formula} • {selectedCompound.iupac_name}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedCompound(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Inspector Navigation Tabs */}
            <div className="flex items-center gap-2 px-5 pt-3 border-b border-slate-800 bg-slate-900 text-xs font-semibold">
              <button
                onClick={() => setActiveInspectorTab('overview')}
                className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
                  activeInspectorTab === 'overview'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Overview & Thermodynamics</span>
              </button>
              <button
                onClick={() => setActiveInspectorTab('uv')}
                className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
                  activeInspectorTab === 'uv'
                    ? 'border-violet-400 text-violet-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>UV-Vis Spectrum ({selectedCompound.uv_vis_peaks.length})</span>
              </button>
              <button
                onClick={() => setActiveInspectorTab('ir')}
                className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
                  activeInspectorTab === 'ir'
                    ? 'border-pink-400 text-pink-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Thermometer className="w-3.5 h-3.5" />
                <span>FTIR Bands ({selectedCompound.ir_bands.length})</span>
              </button>
              <button
                onClick={() => setActiveInspectorTab('nmr')}
                className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
                  activeInspectorTab === 'nmr'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>NMR Shifts ({selectedCompound.nmr_1h_shifts.length + selectedCompound.nmr_13c_shifts.length})</span>
              </button>
              <button
                onClick={() => setActiveInspectorTab('safety')}
                className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
                  activeInspectorTab === 'safety'
                    ? 'border-red-400 text-red-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Hazards & Safety</span>
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 overflow-y-auto max-h-[60vh] space-y-5 text-sm">
              {activeInspectorTab === 'overview' && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                    <div className="text-xs font-semibold text-cyan-400 mb-1">Description & Pharmacology / Significance</div>
                    <p className="text-slate-300 text-xs leading-relaxed">{selectedCompound.description}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800">
                      <div className="text-[11px] text-slate-400">Molecular Weight</div>
                      <div className="text-base font-bold text-slate-100 font-mono">{selectedCompound.molecular_weight} g/mol</div>
                    </div>
                    <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800">
                      <div className="text-[11px] text-slate-400">Melting Point</div>
                      <div className="text-base font-bold text-slate-100 font-mono">
                        {selectedCompound.melting_point_c !== undefined ? `${selectedCompound.melting_point_c} °C` : '—'}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800">
                      <div className="text-[11px] text-slate-400">Boiling Point</div>
                      <div className="text-base font-bold text-slate-100 font-mono">
                        {selectedCompound.boiling_point_c !== undefined ? `${selectedCompound.boiling_point_c} °C` : '—'}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800">
                      <div className="text-[11px] text-slate-400">Density</div>
                      <div className="text-base font-bold text-slate-100 font-mono">
                        {selectedCompound.density_g_cm3 !== undefined ? `${selectedCompound.density_g_cm3} g/cm³` : '—'}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800">
                      <div className="text-[11px] text-slate-400">Aqueous Sol. (25°C)</div>
                      <div className="text-base font-bold text-slate-100 font-mono">
                        {selectedCompound.aqueous_solubility_g_l !== undefined ? `${selectedCompound.aqueous_solubility_g_l} g/L` : '—'}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800">
                      <div className="text-[11px] text-slate-400">Standard ΔHf°</div>
                      <div className="text-base font-bold text-slate-100 font-mono">
                        {selectedCompound.delta_h_f_kj_mol !== undefined ? `${selectedCompound.delta_h_f_kj_mol} kJ/mol` : '—'}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800">
                      <div className="text-[11px] text-slate-400">Standard Entropy S°</div>
                      <div className="text-base font-bold text-slate-100 font-mono">
                        {selectedCompound.entropy_s_j_mol_k !== undefined ? `${selectedCompound.entropy_s_j_mol_k} J/(mol·K)` : '—'}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800">
                      <div className="text-[11px] text-slate-400">Gibbs Energy ΔGf°</div>
                      <div className="text-base font-bold text-slate-100 font-mono">
                        {selectedCompound.delta_g_f_kj_mol !== undefined ? `${selectedCompound.delta_g_f_kj_mol} kJ/mol` : '—'}
                      </div>
                    </div>
                  </div>

                  {/* Structural strings */}
                  <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div>
                      <span className="text-slate-500 font-mono block">SMILES:</span>
                      <span className="font-mono text-cyan-300 break-all select-all">{selectedCompound.smiles}</span>
                    </div>
                    {selectedCompound.inchi && (
                      <div>
                        <span className="text-slate-500 font-mono block">InChI:</span>
                        <span className="font-mono text-slate-300 break-all select-all">{selectedCompound.inchi}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeInspectorTab === 'uv' && (
                <div className="space-y-4">
                  <div className="text-xs text-slate-400">
                    Electronic excitation transitions observed in ultraviolet-visible spectrophotometry.
                  </div>
                  {selectedCompound.uv_vis_peaks.length === 0 ? (
                    <div className="text-slate-500 text-xs py-8 text-center">No ultraviolet absorption peak data documented.</div>
                  ) : (
                    <div className="border border-slate-800 rounded-xl overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                          <tr>
                            <th className="p-3">Wavelength λ_max</th>
                            <th className="p-3">Molar Extinction ε</th>
                            <th className="p-3">Electronic Transition Assignment</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {selectedCompound.uv_vis_peaks.map((uv, i) => (
                            <tr key={i} className="hover:bg-slate-800/30">
                              <td className="p-3 font-mono text-violet-300 font-bold">{uv.wavelength_nm} nm</td>
                              <td className="p-3 font-mono text-slate-200">{uv.extinction_coeff_m_cm} M⁻¹·cm⁻¹</td>
                              <td className="p-3 text-slate-300">{uv.electronic_transition}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeInspectorTab === 'ir' && (
                <div className="space-y-4">
                  <div className="text-xs text-slate-400">
                    Characteristic Fourier-transform infrared (FTIR) absorption bands and vibrational modes.
                  </div>
                  {selectedCompound.ir_bands.length === 0 ? (
                    <div className="text-slate-500 text-xs py-8 text-center">No FTIR band data documented.</div>
                  ) : (
                    <div className="border border-slate-800 rounded-xl overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                          <tr>
                            <th className="p-3">Wavenumber ν̃ (cm⁻¹)</th>
                            <th className="p-3">Intensity</th>
                            <th className="p-3">Vibrational Assignment</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {selectedCompound.ir_bands.map((ir, i) => (
                            <tr key={i} className="hover:bg-slate-800/30">
                              <td className="p-3 font-mono text-pink-300 font-bold">{ir.wavenumber_cm1} cm⁻¹</td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
                                  {ir.intensity}
                                </span>
                              </td>
                              <td className="p-3 text-slate-300">{ir.vibrational_mode}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeInspectorTab === 'nmr' && (
                <div className="space-y-5">
                  <div>
                    <h4 className="text-xs font-bold text-amber-300 mb-2">¹H-NMR Resonance Shifts (ppm)</h4>
                    {selectedCompound.nmr_1h_shifts.length === 0 ? (
                      <div className="text-slate-500 text-xs">No ¹H-NMR data available.</div>
                    ) : (
                      <div className="border border-slate-800 rounded-xl overflow-hidden">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                            <tr>
                              <th className="p-2.5">Shift $\delta$</th>
                              <th className="p-2.5">Multiplicity</th>
                              <th className="p-2.5">Integral</th>
                              <th className="p-2.5">Proton Assignment</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60">
                            {selectedCompound.nmr_1h_shifts.map((s, i) => (
                              <tr key={i} className="hover:bg-slate-800/30">
                                <td className="p-2.5 font-mono text-amber-300 font-bold">{s.chemical_shift_ppm.toFixed(2)} ppm</td>
                                <td className="p-2.5 font-mono text-slate-300 font-semibold">{s.multiplicity}</td>
                                <td className="p-2.5 font-mono text-slate-300">{s.integration}H</td>
                                <td className="p-2.5 text-slate-300">{s.assignment}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-emerald-300 mb-2">¹³C-NMR Resonance Shifts (ppm)</h4>
                    {selectedCompound.nmr_13c_shifts.length === 0 ? (
                      <div className="text-slate-500 text-xs">No ¹³C-NMR data available.</div>
                    ) : (
                      <div className="border border-slate-800 rounded-xl overflow-hidden">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                            <tr>
                              <th className="p-2.5">Shift $\delta$</th>
                              <th className="p-2.5">Carbon Hybridization / Type</th>
                              <th className="p-2.5">Assignment</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60">
                            {selectedCompound.nmr_13c_shifts.map((s, i) => (
                              <tr key={i} className="hover:bg-slate-800/30">
                                <td className="p-2.5 font-mono text-emerald-300 font-bold">{s.chemical_shift_ppm.toFixed(1)} ppm</td>
                                <td className="p-2.5 font-mono text-slate-300">{s.carbon_type}</td>
                                <td className="p-2.5 text-slate-300">{s.assignment}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeInspectorTab === 'safety' && (
                <div className="space-y-4">
                  <div className="p-4 bg-red-950/20 border border-red-900/40 rounded-xl space-y-3">
                    <div className="flex items-center gap-2 text-red-400 font-semibold text-xs">
                      <ShieldAlert className="w-4 h-4" />
                      <span>GHS Classification & Hazard Statements</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {selectedCompound.safety_ghs_pictograms.map((pic, i) => (
                        <span key={i} className="px-3 py-1 rounded-lg bg-red-900/40 border border-red-700/60 text-red-200 text-xs font-semibold">
                          {pic}
                        </span>
                      ))}
                    </div>

                    <ul className="list-disc list-inside space-y-1 text-xs text-red-300/90 pt-1">
                      {selectedCompound.hazard_statements.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800 text-xs text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 inline mr-1" />
                    Always consult official Safety Data Sheets (SDS) and local laboratory environmental health protocols before handling concentrated chemical reagents.
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
              <button
                onClick={() => setSelectedCompound(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
