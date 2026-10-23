import React, { useState, useEffect, useMemo } from 'react';
import {
  MolecularGraph,
  MorganFingerprint,
  SimilarityResult,
  SubstructureMatch,
  LibraryScreeningHit,
  SimilarityMatrixResult,
  SimilarityMetric,
  CircularEnvironment
} from '../../../types/cheminformatics';
import {
  cheminformaticsService,
  CURATED_LIBRARY,
  CURATED_FRAGMENTS
} from '../../../services/cheminformaticsService';

export const CheminformaticsWorkstation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fingerprints' | 'similarity' | 'substructure' | 'heatmap' | 'screening'>('fingerprints');
  const [library, setLibrary] = useState<MolecularGraph[]>(CURATED_LIBRARY);
  const [fragments, setFragments] = useState<MolecularGraph[]>(CURATED_FRAGMENTS);
  const [loading, setLoading] = useState(false);

  // Tab 1: Fingerprints state
  const [selectedMolId, setSelectedMolId] = useState<string>(CURATED_LIBRARY[0].id);
  const [fpRadius, setFpRadius] = useState<number>(2);
  const [fpNBits, setFpNBits] = useState<number>(1024);
  const [fingerprint, setFingerprint] = useState<MorganFingerprint | null>(null);
  const [selectedAtomIndex, setSelectedAtomIndex] = useState<number | null>(null);

  // Tab 2: Pairwise similarity state
  const [molAId, setMolAId] = useState<string>('aspirin');
  const [molBId, setMolBId] = useState<string>('benzoic_acid');
  const [similarity, setSimilarity] = useState<SimilarityResult | null>(null);
  const [tverskyAlpha, setTverskyAlpha] = useState<number>(0.5);

  // Tab 3: Substructure search state
  const [subTargetId, setSubTargetId] = useState<string>('aspirin');
  const [subFragmentId, setSubFragmentId] = useState<string>('frag_carboxylic_acid');
  const [subMatch, setSubMatch] = useState<SubstructureMatch | null>(null);

  // Tab 4: Heatmap state
  const [matrixMetric, setMatrixMetric] = useState<SimilarityMetric>('tanimoto');
  const [matrixData, setMatrixData] = useState<SimilarityMatrixResult | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number; val: number } | null>(null);

  // Tab 5: Screening state
  const [screenQueryId, setScreenQueryId] = useState<string>('aspirin');
  const [screenThreshold, setScreenThreshold] = useState<number>(0.15);
  const [screenMetric, setScreenMetric] = useState<SimilarityMetric>('tanimoto');
  const [screeningHits, setScreeningHits] = useState<LibraryScreeningHit[]>([]);

  // Load initial data
  useEffect(() => {
    async function init() {
      setLoading(true);
      try {
        const [libData, fragData] = await Promise.all([
          cheminformaticsService.getLibrary(),
          cheminformaticsService.getFragments()
        ]);
        setLibrary(libData);
        setFragments(fragData);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  // Update Fingerprint when molecule, radius, or nBits change
  useEffect(() => {
    const mol = library.find((m) => m.id === selectedMolId);
    if (!mol) return;
    cheminformaticsService.computeFingerprint(mol, fpRadius, fpNBits).then((fp) => {
      setFingerprint(fp);
    });
  }, [selectedMolId, fpRadius, fpNBits, library]);

  // Update Similarity when A or B change
  useEffect(() => {
    const mA = library.find((m) => m.id === molAId);
    const mB = library.find((m) => m.id === molBId);
    if (!mA || !mB) return;
    cheminformaticsService.calculateSimilarity(mA, mB, 2, 1024).then((res) => {
      setSimilarity(res);
    });
  }, [molAId, molBId, library]);

  // Update Substructure match when target or fragment change
  useEffect(() => {
    const target = library.find((m) => m.id === subTargetId);
    const fragment = fragments.find((f) => f.id === subFragmentId);
    if (!target || !fragment) return;
    cheminformaticsService.searchSubstructure(target, fragment).then((res) => {
      setSubMatch(res);
    });
  }, [subTargetId, subFragmentId, library, fragments]);

  // Update Heatmap when tab or metric change
  useEffect(() => {
    if (activeTab === 'heatmap') {
      cheminformaticsService.computeSimilarityMatrix(undefined, matrixMetric).then((res) => {
        setMatrixData(res);
      });
    }
  }, [activeTab, matrixMetric]);

  // Update Screening hits
  useEffect(() => {
    if (activeTab === 'screening') {
      const qMol = library.find((m) => m.id === screenQueryId);
      if (!qMol) return;
      cheminformaticsService.screenLibrary(qMol, screenMetric, screenThreshold).then((res) => {
        setScreeningHits(res.hits);
      });
    }
  }, [activeTab, screenQueryId, screenThreshold, screenMetric, library]);

  const currentMol = useMemo(
    () => library.find((m) => m.id === selectedMolId) || library[0],
    [selectedMolId, library]
  );

  const subTargetMol = useMemo(
    () => library.find((m) => m.id === subTargetId) || library[0],
    [subTargetId, library]
  );

  const selectedAtomEnv = useMemo(() => {
    if (!fingerprint || selectedAtomIndex === null) return [];
    return fingerprint.environments.filter((e) => e.atom_index === selectedAtomIndex);
  }, [fingerprint, selectedAtomIndex]);

  // Helper to scale 2D molecular coordinates into SVG canvas
  const render2DMoleculeSvg = (
    mol: MolecularGraph,
    width = 440,
    height = 300,
    highlightedAtoms: number[] = [],
    highlightedBonds: [number, number][] = [],
    selectedAtom: number | null = null,
    onAtomClick?: (idx: number) => void
  ) => {
    if (!mol || mol.atoms.length === 0) return null;

    const xs = mol.atoms.map((a) => a.x);
    const ys = mol.atoms.map((a) => a.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const spanX = maxX - minX || 1.0;
    const spanY = maxY - minY || 1.0;
    const pad = 50;

    const scale = Math.min((width - pad * 2) / spanX, (height - pad * 2) / spanY);
    const offsetX = (width - spanX * scale) / 2 - minX * scale;
    const offsetY = (height - spanY * scale) / 2 - minY * scale;

    const transformX = (x: number) => x * scale + offsetX;
    const transformY = (y: number) => height - (y * scale + offsetY); // Invert Y for cartesian

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full select-none"
        style={{ background: 'rgba(15, 23, 42, 0.7)' }}
      >
        <defs>
          <radialGradient id="highlightGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
          </radialGradient>
          <radialGradient id="subMatchGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.0" />
          </radialGradient>
        </defs>

        {/* Bonds */}
        {mol.bonds.map((b, idx) => {
          const a1 = mol.atoms[b.source];
          const a2 = mol.atoms[b.target];
          if (!a1 || !a2) return null;

          const x1 = transformX(a1.x);
          const y1 = transformY(a1.y);
          const x2 = transformX(a2.x);
          const y2 = transformY(a2.y);

          const isHighlighted = highlightedBonds.some(
            ([u, v]) => (u === b.source && v === b.target) || (u === b.target && v === b.source)
          );

          const strokeColor = isHighlighted
            ? '#34d399'
            : b.aromatic
            ? '#a78bfa'
            : '#64748b';
          const strokeWidth = isHighlighted ? 3.5 : b.order === 2.0 ? 3.0 : 2.0;

          return (
            <g key={`bond-${idx}`}>
              {isHighlighted && (
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#34d399"
                  strokeWidth="8"
                  strokeOpacity="0.3"
                  strokeLinecap="round"
                />
              )}
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={b.order === 1.5 ? '4 3' : undefined}
                strokeLinecap="round"
              />
            </g>
          );
        })}

        {/* Atom Nodes */}
        {mol.atoms.map((a) => {
          const cx = transformX(a.x);
          const cy = transformY(a.y);
          const isSelected = selectedAtom === a.index;
          const isSubMatched = highlightedAtoms.includes(a.index);

          let elemColor = '#94a3b8'; // default C
          if (a.element === 'O') elemColor = '#f87171'; // Red
          else if (a.element === 'N') elemColor = '#60a5fa'; // Blue
          else if (a.element === 'S') elemColor = '#facc15'; // Yellow
          else if (a.element === 'F' || a.element === 'Cl') elemColor = '#4ade80'; // Green

          return (
            <g
              key={`atom-${a.index}`}
              className="cursor-pointer transition-transform hover:scale-125"
              onClick={() => onAtomClick && onAtomClick(a.index)}
            >
              {/* Halos */}
              {isSubMatched && (
                <circle cx={cx} cy={cy} r="18" fill="url(#subMatchGlow)" />
              )}
              {isSelected && (
                <circle cx={cx} cy={cy} r="20" fill="url(#highlightGlow)" />
              )}

              {/* Atom Circle */}
              <circle
                cx={cx}
                cy={cy}
                r={a.element === 'C' ? '9' : '11'}
                fill={isSelected ? '#0284c7' : isSubMatched ? '#059669' : '#1e293b'}
                stroke={elemColor}
                strokeWidth={isSelected || isSubMatched ? '2.5' : '1.5'}
              />

              {/* Element Label */}
              <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                fontSize={a.element.length > 1 ? '10' : '11'}
                fontWeight="bold"
                fill={isSelected || isSubMatched ? '#ffffff' : elemColor}
                pointerEvents="none"
              >
                {a.element}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl">
      {/* Workstation Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800/50 flex items-center justify-center text-cyan-400">
              <span className="material-symbols-outlined text-2xl">network_intelligence</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-white">Cheminformatics & Chemical Space Engine</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/40 font-mono">
                  ECFP4 · VF2 · Tanimoto
                </span>
              </div>
              <p className="text-sm text-slate-400">
                Topological Graph Canonicalization, Morgan Circular Fingerprints, Tanimoto / Dice Similarity, and Substructure Isomorphism.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Metrics Header Pill */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl p-2 px-3 text-xs">
          <div className="flex flex-col">
            <span className="text-slate-500 uppercase tracking-wider text-[10px]">Reference Library</span>
            <span className="font-semibold text-cyan-400">{library.length} Compounds</span>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div className="flex flex-col">
            <span className="text-slate-500 uppercase tracking-wider text-[10px]">Fingerprint Size</span>
            <span className="font-semibold text-emerald-400">{fpNBits} bits (R={fpRadius})</span>
          </div>
        </div>
      </div>

      {/* Main Mode Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl">
        {[
          { id: 'fingerprints', label: 'Morgan Fingerprints', icon: 'fingerprint' },
          { id: 'similarity', label: 'Chemical Similarity', icon: 'compare' },
          { id: 'substructure', label: 'Substructure Search', icon: 'filter_alt' },
          { id: 'heatmap', label: 'Library Heatmap', icon: 'grid_view' },
          { id: 'screening', label: 'Analog Screening', icon: 'troubleshoot' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition ${
              activeTab === tab.id
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/30 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: MORGAN CIRCULAR FINGERPRINTS */}
      {activeTab === 'fingerprints' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls & 2D Viewer (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl flex flex-col gap-3">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Select Compound</label>
              <select
                value={selectedMolId}
                onChange={(e) => setSelectedMolId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-lg p-2.5 text-sm focus:border-cyan-500 focus:outline-none"
              >
                {library.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.formula})
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-3 mt-1">
                <div>
                  <label className="text-xs text-slate-400">Radius (ECFP2R)</label>
                  <select
                    value={fpRadius}
                    onChange={(e) => setFpRadius(Number(e.target.value))}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs focus:border-cyan-500 focus:outline-none"
                  >
                    <option value={0}>R=0 (ECFP0 - Atoms)</option>
                    <option value={1}>R=1 (ECFP2)</option>
                    <option value={2}>R=2 (ECFP4 - Standard)</option>
                    <option value={3}>R=3 (ECFP6 - Extended)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400">Bit Length</label>
                  <select
                    value={fpNBits}
                    onChange={(e) => setFpNBits(Number(e.target.value))}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs focus:border-cyan-500 focus:outline-none"
                  >
                    <option value={512}>512 bits</option>
                    <option value={1024}>1024 bits</option>
                    <option value={2048}>2048 bits</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2D Molecular Graph Viewer */}
            <div className="h-[340px] rounded-xl overflow-hidden border border-slate-800 relative bg-slate-950 flex flex-col">
              <div className="absolute top-3 left-3 z-10 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-mono border border-slate-800 text-cyan-300">
                {currentMol.name} · {currentMol.formula}
              </div>
              <div className="flex-1 w-full h-full">
                {render2DMoleculeSvg(
                  currentMol,
                  440,
                  340,
                  [],
                  [],
                  selectedAtomIndex,
                  (idx) => setSelectedAtomIndex(idx === selectedAtomIndex ? null : idx)
                )}
              </div>
              <div className="p-2.5 bg-slate-900/90 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between items-center px-4">
                <span>Click any atom node to inspect circular feature shells</span>
                <span className="font-mono text-cyan-400">{currentMol.atoms.length} atoms · {currentMol.bonds.length} bonds</span>
              </div>
            </div>
          </div>

          {/* Fingerprint Metrics & Bit Inspector (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Quick Metrics Tiles */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 bg-slate-900/60 border border-slate-800/80 rounded-xl flex flex-col">
                <span className="text-xs text-slate-500 uppercase tracking-wider">Active Bits</span>
                <span className="text-xl font-bold font-mono text-cyan-400 mt-1">
                  {fingerprint?.active_bits.length || 0}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">out of {fpNBits} total bits</span>
              </div>
              <div className="p-3.5 bg-slate-900/60 border border-slate-800/80 rounded-xl flex flex-col">
                <span className="text-xs text-slate-500 uppercase tracking-wider">Bit Density</span>
                <span className="text-xl font-bold font-mono text-emerald-400 mt-1">
                  {fingerprint ? `${(fingerprint.density * 100).toFixed(2)}%` : '0.00%'}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">Sparsity ratio</span>
              </div>
              <div className="p-3.5 bg-slate-900/60 border border-slate-800/80 rounded-xl flex flex-col">
                <span className="text-xs text-slate-500 uppercase tracking-wider">Unique Shells</span>
                <span className="text-xl font-bold font-mono text-purple-400 mt-1">
                  {fingerprint?.environments.length || 0}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">Circular fragments</span>
              </div>
            </div>

            {/* Selected Atom Circular Environment Detail */}
            {selectedAtomIndex !== null && (
              <div className="p-4 bg-cyan-950/20 border border-cyan-800/50 rounded-xl flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-cyan-300">
                    Inspecting Atom #{selectedAtomIndex} ({currentMol.atoms[selectedAtomIndex]?.element}) Environments
                  </span>
                  <button
                    onClick={() => setSelectedAtomIndex(null)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Clear Selection
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-1">
                  {selectedAtomEnv.map((env) => (
                    <div key={`env-${env.radius}`} className="p-2 bg-slate-900/80 border border-slate-800 rounded-lg text-xs">
                      <div className="flex justify-between font-mono font-semibold text-cyan-400">
                        <span>Radius {env.radius}</span>
                        <span>Bit #{env.bit_index}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Atoms: [{env.participating_atoms.join(', ')}]
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono truncate mt-0.5">
                        Hash: {env.feature_id.toString(16)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Circular Environments Explorer Table */}
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Circular Feature Environments (Sorted by Bit Index)
              </h3>
              <div className="max-h-[220px] overflow-y-auto pr-2 flex flex-col gap-1.5 custom-scrollbar">
                {fingerprint?.environments.slice(0, 40).map((env, idx) => (
                  <div
                    key={`env-item-${idx}`}
                    className="flex justify-between items-center p-2 rounded-lg bg-slate-950/60 border border-slate-800/50 text-xs hover:border-cyan-800/50 transition cursor-pointer"
                    onClick={() => setSelectedAtomIndex(env.atom_index)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center font-mono text-[11px] font-bold text-cyan-300">
                        {currentMol.atoms[env.atom_index]?.element}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-200">
                          Atom #{env.atom_index} · Radius {env.radius} ({env.notation})
                        </span>
                        <span className="text-[10px] text-slate-500">
                          Sub-graph: {env.participating_atoms.length} atoms, {env.participating_bonds.length} bonds
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-right">
                      <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40 text-[11px]">
                        Bit {env.bit_index}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {env.feature_id.toString(16)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CHEMICAL SIMILARITY (TANIMOTO & GAUGES) */}
      {activeTab === 'similarity' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Pair Selectors & 2D Comparison (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col gap-2">
                <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Molecule A</label>
                <select
                  value={molAId}
                  onChange={(e) => setMolAId(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-slate-100 rounded-lg p-2 text-xs focus:border-cyan-500 focus:outline-none"
                >
                  {library.map((m) => (
                    <option key={`a-${m.id}`} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
                <div className="h-[140px] rounded-lg overflow-hidden border border-slate-800/80 bg-slate-950">
                  {render2DMoleculeSvg(library.find((m) => m.id === molAId)!, 220, 140)}
                </div>
              </div>

              <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col gap-2">
                <label className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Molecule B</label>
                <select
                  value={molBId}
                  onChange={(e) => setMolBId(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-slate-100 rounded-lg p-2 text-xs focus:border-emerald-500 focus:outline-none"
                >
                  {library.map((m) => (
                    <option key={`b-${m.id}`} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
                <div className="h-[140px] rounded-lg overflow-hidden border border-slate-800/80 bg-slate-950">
                  {render2DMoleculeSvg(library.find((m) => m.id === molBId)!, 220, 140)}
                </div>
              </div>
            </div>

            {/* Venn Bit Breakdown Visualizer */}
            {similarity && (
              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col gap-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Fingerprint Bit Intersection Decomposition
                </h4>
                <div className="flex h-6 rounded-lg overflow-hidden border border-slate-800 font-mono text-[11px] font-bold text-center">
                  <div
                    style={{ width: `${(similarity.bits_a_only.length / (similarity.shared_bits.length + similarity.bits_a_only.length + similarity.bits_b_only.length || 1)) * 100}%` }}
                    className="bg-cyan-600/80 text-white flex items-center justify-center"
                    title={`Only in Molecule A: ${similarity.bits_a_only.length} bits`}
                  >
                    {similarity.bits_a_only.length > 0 && `A: ${similarity.bits_a_only.length}`}
                  </div>
                  <div
                    style={{ width: `${(similarity.shared_bits.length / (similarity.shared_bits.length + similarity.bits_a_only.length + similarity.bits_b_only.length || 1)) * 100}%` }}
                    className="bg-purple-600/80 text-white flex items-center justify-center"
                    title={`Shared in Both: ${similarity.shared_bits.length} bits`}
                  >
                    {similarity.shared_bits.length > 0 && `Shared: ${similarity.shared_bits.length}`}
                  </div>
                  <div
                    style={{ width: `${(similarity.bits_b_only.length / (similarity.shared_bits.length + similarity.bits_a_only.length + similarity.bits_b_only.length || 1)) * 100}%` }}
                    className="bg-emerald-600/80 text-white flex items-center justify-center"
                    title={`Only in Molecule B: ${similarity.bits_b_only.length} bits`}
                  >
                    {similarity.bits_b_only.length > 0 && `B: ${similarity.bits_b_only.length}`}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
                  <div className="p-2 rounded bg-cyan-950/40 border border-cyan-800/30 text-cyan-400 font-mono">
                    <span className="block text-[10px] text-slate-400 uppercase">Only In A</span>
                    {similarity.bits_a_only.length} bits
                  </div>
                  <div className="p-2 rounded bg-purple-950/40 border border-purple-800/30 text-purple-400 font-mono">
                    <span className="block text-[10px] text-slate-400 uppercase">Shared Intersect</span>
                    {similarity.shared_bits.length} bits
                  </div>
                  <div className="p-2 rounded bg-emerald-950/40 border border-emerald-800/30 text-emerald-400 font-mono">
                    <span className="block text-[10px] text-slate-400 uppercase">Only In B</span>
                    {similarity.bits_b_only.length} bits
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Similarity Gauges & Mathematical Formulations (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {similarity && (
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tanimoto Coefficient</span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800/40">Jaccard</span>
                  </div>
                  <span className="text-3xl font-extrabold font-mono text-cyan-400 my-2">
                    {(similarity.tanimoto * 100).toFixed(1)}%
                  </span>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full rounded-full transition-all duration-500" style={{ width: `${similarity.tanimoto * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-2 font-mono">a / (a + b + c) = {similarity.tanimoto}</span>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Dice Index</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800/40">Sørensen</span>
                  </div>
                  <span className="text-3xl font-extrabold font-mono text-emerald-400 my-2">
                    {(similarity.dice * 100).toFixed(1)}%
                  </span>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${similarity.dice * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-2 font-mono">2a / (2a + b + c) = {similarity.dice}</span>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cosine Similarity</span>
                    <span className="text-[10px] font-mono text-purple-400 bg-purple-950 px-1.5 py-0.5 rounded border border-purple-800/40">Ochiai</span>
                  </div>
                  <span className="text-3xl font-extrabold font-mono text-purple-400 my-2">
                    {(similarity.cosine * 100).toFixed(1)}%
                  </span>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full transition-all duration-500" style={{ width: `${similarity.cosine * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-2 font-mono">a / sqrt((a+b)(a+c)) = {similarity.cosine}</span>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tversky (α=0.5)</span>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-950 px-1.5 py-0.5 rounded border border-amber-800/40">Asymmetric</span>
                  </div>
                  <span className="text-3xl font-extrabold font-mono text-amber-400 my-2">
                    {(similarity.tversky * 100).toFixed(1)}%
                  </span>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${similarity.tversky * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-2 font-mono">Distance: L2={similarity.euclidean_distance}, L1={similarity.manhattan_distance}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: SUBSTRUCTURE SEARCH & GRAPH ISOMORPHISM */}
      {activeTab === 'substructure' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Query Selector (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col gap-3">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Select Query Fragment</label>
              <select
                value={subFragmentId}
                onChange={(e) => setSubFragmentId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-lg p-2.5 text-xs focus:border-cyan-500 focus:outline-none"
              >
                {fragments.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>

              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mt-2">Target Molecule</label>
              <select
                value={subTargetId}
                onChange={(e) => setSubTargetId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-lg p-2.5 text-xs focus:border-cyan-500 focus:outline-none"
              >
                {library.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.formula})
                  </option>
                ))}
              </select>
            </div>

            {/* Match Status Card */}
            {subMatch && (
              <div
                className={`p-4 rounded-xl border flex flex-col gap-2 ${
                  subMatch.matched
                    ? 'bg-emerald-950/20 border-emerald-800/60 text-emerald-300'
                    : 'bg-rose-950/20 border-rose-800/60 text-rose-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl">
                    {subMatch.matched ? 'check_circle' : 'cancel'}
                  </span>
                  <span className="text-sm font-bold">
                    {subMatch.matched ? 'Substructure Found' : 'No Substructure Match'}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {subMatch.matched
                    ? `Query fragment is an isomorphic subgraph of ${subMatch.target_molecule_name}. Matched ${subMatch.matched_target_atoms.length} atoms.`
                    : `${subMatch.query_fragment_name} cannot be mapped onto ${subMatch.target_molecule_name}.`}
                </p>
                <div className="flex justify-between items-center text-[11px] font-mono border-t border-slate-800/60 pt-2 mt-1 text-slate-400">
                  <span>Pre-filter: {subMatch.filter_passed ? 'PASSED' : 'REJECTED'}</span>
                  <span>Execution: {subMatch.execution_time_ms} ms</span>
                </div>
              </div>
            )}
          </div>

          {/* Highlighted Target 2D Viewport (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            <div className="h-[380px] rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative">
              <div className="absolute top-3 left-3 z-10 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono">
                <span className="text-slate-400">Substructure Mapping: </span>
                <span className="text-emerald-400 font-bold">
                  {subMatch?.matched ? `${subMatch.matched_target_atoms.length} Target Atoms Highlighted` : 'No Match'}
                </span>
              </div>
              {render2DMoleculeSvg(
                subTargetMol,
                600,
                380,
                subMatch?.matched_target_atoms || [],
                subMatch?.matched_target_bonds || []
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ALL-AGAINST-ALL LIBRARY HEATMAP */}
      {activeTab === 'heatmap' && matrixData && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center bg-slate-900 p-3 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-300 font-semibold">
              Pairwise Chemical Similarity Distance Matrix ({matrixData.molecule_names.length} × {matrixData.molecule_names.length})
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Metric:</span>
              <select
                value={matrixMetric}
                onChange={(e) => setMatrixMetric(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded p-1.5 focus:border-cyan-500 focus:outline-none"
              >
                <option value="tanimoto">Tanimoto</option>
                <option value="dice">Dice</option>
                <option value="cosine">Cosine</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4">
            <table className="border-collapse text-xs">
              <thead>
                <tr>
                  <th className="p-2 text-left font-mono text-slate-500">Compound</th>
                  {matrixData.molecule_names.map((name, idx) => (
                    <th key={`hdr-${idx}`} className="p-2 font-mono text-slate-400 text-center truncate max-w-[80px]" title={name}>
                      {name.split(' ')[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrixData.matrix.map((row, rIdx) => (
                  <tr key={`row-${rIdx}`} className="border-t border-slate-900">
                    <td className="p-2 font-mono text-slate-300 whitespace-nowrap font-semibold">
                      {matrixData.molecule_names[rIdx].split(' ')[0]}
                    </td>
                    {row.map((val, cIdx) => {
                      const pct = Math.round(val * 100);
                      const bg = rIdx === cIdx
                        ? 'rgba(16, 185, 129, 0.6)'
                        : `rgba(6, 182, 212, ${Math.max(0.05, val * 0.7)})`;

                      return (
                        <td
                          key={`cell-${rIdx}-${cIdx}`}
                          className="p-2 text-center font-mono cursor-pointer transition hover:scale-110"
                          style={{ background: bg }}
                          onClick={() => setSelectedCell({ row: rIdx, col: cIdx, val })}
                          title={`${matrixData.molecule_names[rIdx]} vs ${matrixData.molecule_names[cIdx]}: ${val.toFixed(4)}`}
                        >
                          <span className="text-[11px] font-bold text-white drop-shadow">
                            {pct}%
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedCell && (
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs flex justify-between items-center text-slate-300">
              <span>
                Comparison: <strong className="text-cyan-400">{matrixData.molecule_names[selectedCell.row]}</strong> vs{' '}
                <strong className="text-emerald-400">{matrixData.molecule_names[selectedCell.col]}</strong>
              </span>
              <span className="font-mono font-bold text-cyan-300 text-sm">
                Score: {(selectedCell.val * 100).toFixed(2)}%
              </span>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: ANALOG SCREENING */}
      {activeTab === 'screening' && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div>
              <label className="text-xs text-slate-400">Query Compound</label>
              <select
                value={screenQueryId}
                onChange={(e) => setScreenQueryId(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 text-xs rounded p-2 focus:border-cyan-500 focus:outline-none"
              >
                {library.map((m) => (
                  <option key={`scr-${m.id}`} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400">Similarity Metric</label>
              <select
                value={screenMetric}
                onChange={(e) => setScreenMetric(e.target.value as any)}
                className="w-full mt-1 bg-slate-950 border border-slate-800 text-xs rounded p-2 focus:border-cyan-500 focus:outline-none"
              >
                <option value="tanimoto">Tanimoto</option>
                <option value="dice">Dice</option>
                <option value="cosine">Cosine</option>
              </select>
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Cutoff Threshold:</span>
                <span className="font-mono text-cyan-400">{Math.round(screenThreshold * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.9"
                step="0.05"
                value={screenThreshold}
                onChange={(e) => setScreenThreshold(Number(e.target.value))}
                className="w-full mt-2 accent-cyan-500"
              />
            </div>
          </div>

          {/* Hits List */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Screening Results ({screeningHits.length} Hits Found)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {screeningHits.map((hit) => (
                <div
                  key={`hit-${hit.molecule_id}`}
                  className="p-3.5 bg-slate-900/70 border border-slate-800 rounded-xl flex flex-col justify-between hover:border-cyan-700/60 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-semibold text-sm text-slate-100">{hit.molecule_name}</span>
                      <span className="block text-[11px] text-slate-500 font-mono mt-0.5">{hit.formula} · {hit.smiles}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40 font-mono text-xs font-bold">
                      # {hit.rank}
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                      <span>Similarity</span>
                      <span className="text-cyan-400 font-bold">{(hit.score * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full"
                        style={{ width: `${hit.score * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
