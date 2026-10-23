import React, { useState, useEffect } from 'react';
import {
  StructurePresetSummary,
  ProteinStructureDetail,
  RamachandranPoint,
  SecondaryStructureType,
  RamachandranRegion,
} from '../../../types/biomolecule';
import { BiomoleculeService, FALLBACK_CRAMBIN_DETAIL } from '../../../services/biomoleculeService';

export const BiomolecularStructureWorkstation: React.FC = () => {
  const [presets, setPresets] = useState<StructurePresetSummary[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('crambin-1crn');
  const [structureDetail, setStructureDetail] = useState<ProteinStructureDetail>(FALLBACK_CRAMBIN_DETAIL);
  const [ramachandranPoints, setRamachandranPoints] = useState<RamachandranPoint[]>([]);
  const [activeTab, setActiveTab] = useState<'ramachandran' | 'dssp_bonds' | 'sequence' | 'summary'>('ramachandran');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedResidueSeq, setSelectedResidueSeq] = useState<number | null>(null);

  // Custom PDB Input Modal / Drawer state
  const [customPdbText, setCustomPdbText] = useState<string>('');
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);

  useEffect(() => {
    loadPresets();
  }, []);

  useEffect(() => {
    if (selectedPresetId) {
      loadPresetData(selectedPresetId);
    }
  }, [selectedPresetId]);

  const loadPresets = async () => {
    try {
      const data = await BiomoleculeService.fetchPresets();
      setPresets(data);
    } catch {
      // Handled by service
    }
  };

  const loadPresetData = async (presetId: string) => {
    setLoading(true);
    try {
      const [detail, points] = await Promise.all([
        BiomoleculeService.fetchPresetDetail(presetId),
        BiomoleculeService.fetchRamachandranPoints(presetId),
      ]);
      setStructureDetail(detail);
      setRamachandranPoints(points);
    } finally {
      setLoading(false);
    }
  };

  const handleParseCustomPdb = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPdbText.trim()) return;
    setLoading(true);
    try {
      const detail = await BiomoleculeService.parsePdbContent(customPdbText);
      setStructureDetail(detail);
      const points: RamachandranPoint[] = detail.residues
        .filter((r) => r.phi !== null && r.psi !== null)
        .map((r) => ({
          chain_id: r.chain_id,
          res_seq: r.res_seq,
          res_name: r.res_name,
          phi: r.phi!,
          psi: r.psi!,
          region: r.ramachandran_region,
          is_general: r.res_name !== 'GLY' && r.res_name !== 'PRO',
          is_glycine: r.res_name === 'GLY',
          is_proline: r.res_name === 'PRO',
        }));
      setRamachandranPoints(points);
      setShowCustomModal(false);
    } finally {
      setLoading(false);
    }
  };

  // Ramachandran 2D Plot dimensions
  const plotSize = 360;
  const toSvgCoord = (phi: number, psi: number) => {
    // phi: -180 to 180 -> x: 0 to plotSize
    // psi: 180 to -180 -> y: 0 to plotSize (inverted y axis)
    const x = ((phi + 180) / 360) * plotSize;
    const y = ((180 - psi) / 360) * plotSize;
    return { x, y };
  };

  const getSecColor = (type: SecondaryStructureType) => {
    switch (type) {
      case 'Alpha Helix (4-turn)':
      case '3_10 Helix (3-turn)':
      case 'Pi Helix (5-turn)':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'Beta Sheet / Strand':
      case 'Beta Bridge':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'Hydrogen-Bonded Turn':
      case 'Geometric Bend':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40';
      default:
        return 'bg-surface-container text-on-surface-variant border-outline-variant/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Deck */}
      <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary font-semibold text-xs mb-1 uppercase tracking-wider">
            <span className="material-symbols-outlined text-[18px]">biotech</span>
            Biomolecular Structural Biology & DSSP
          </div>
          <h2 className="text-2xl font-bold text-on-surface">
            Protein Secondary Structure & Ramachandran Topology
          </h2>
          <p className="text-on-surface-variant text-xs mt-1 max-w-3xl">
            Atomic PDB coordinate parsing, backbone dihedral geometry ($\phi, \psi, \omega$),
            Kabsch-Sander electrostatic hydrogen-bond energy calculation, and conformational space validation.
          </p>
        </div>

        {/* Preset Selector & Custom Upload Button */}
        <div className="flex flex-wrap items-center gap-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => setSelectedPresetId(preset.id)}
              className={`px-3 py-1.5 rounded-xl font-label-md text-xs font-semibold transition border ${
                selectedPresetId === preset.id
                  ? 'bg-primary text-on-primary border-primary shadow-xs'
                  : 'bg-surface-container-lowest border-outline-variant/40 text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {preset.pdb_id} ({preset.name.split(' ')[0]})
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowCustomModal(true)}
            className="px-3 py-1.5 rounded-xl bg-surface-container border border-outline-variant/50 text-xs font-semibold text-on-surface hover:bg-surface-container-high transition flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">upload_file</span> Custom PDB
          </button>
        </div>
      </div>

      {/* Primary Telemetry Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
          <div className="text-[10px] text-outline uppercase font-semibold">Residues</div>
          <div className="text-xl font-bold text-on-surface mt-0.5">{structureDetail.summary.total_residues}</div>
          <div className="text-[10px] text-primary">{structureDetail.summary.chain_ids.join(', ')} chain(s)</div>
        </div>
        <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
          <div className="text-[10px] text-outline uppercase font-semibold">Total Atoms</div>
          <div className="text-xl font-bold text-on-surface mt-0.5">{structureDetail.summary.total_atoms}</div>
          <div className="text-[10px] text-outline">Coordinate records</div>
        </div>
        <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
          <div className="text-[10px] text-outline uppercase font-semibold">Alpha Helix Content</div>
          <div className="text-xl font-bold text-emerald-500 mt-0.5">{structureDetail.summary.helix_percentage}%</div>
          <div className="text-[10px] text-outline">{structureDetail.summary.helix_count} residues</div>
        </div>
        <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
          <div className="text-[10px] text-outline uppercase font-semibold">Beta Sheet Content</div>
          <div className="text-xl font-bold text-amber-500 mt-0.5">{structureDetail.summary.sheet_percentage}%</div>
          <div className="text-[10px] text-outline">{structureDetail.summary.sheet_count} residues</div>
        </div>
        <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
          <div className="text-[10px] text-outline uppercase font-semibold">Ramachandran Favored</div>
          <div className="text-xl font-bold text-primary mt-0.5">{structureDetail.summary.ramachandran_favored_percentage}%</div>
          <div className="text-[10px] text-outline">Stereochemically ideal</div>
        </div>
        <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
          <div className="text-[10px] text-outline uppercase font-semibold">DSSP H-Bonds</div>
          <div className="text-xl font-bold text-cyan-500 mt-0.5">{structureDetail.hydrogen_bonds.length}</div>
          <div className="text-[10px] text-outline">E ≤ -0.5 kcal/mol</div>
        </div>
      </div>

      {/* Main Workstation Tabs */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden">
        {/* Navigation Bar */}
        <div className="p-3 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('ramachandran')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'ramachandran'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">scatter_plot</span>
              Ramachandran Plot
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('dssp_bonds')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'dssp_bonds'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">hub</span>
              DSSP H-Bond Network
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('sequence')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'sequence'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">view_timeline</span>
              Secondary Structure Sequence
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('summary')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'summary'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">description</span>
              Structure Segments
            </button>
          </div>
        </div>

        {/* Tab 1: Ramachandran 2D Plot */}
        {activeTab === 'ramachandran' && (
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* SVG Plot Canvas (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="relative p-2 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-xs">
                <svg
                  width={plotSize}
                  height={plotSize}
                  viewBox={`0 0 ${plotSize} ${plotSize}`}
                  className="overflow-visible"
                >
                  {/* Background Grid */}
                  <rect width={plotSize} height={plotSize} fill="#0b1320" rx="12" />

                  {/* Core Alpha Helix Favored Region: phi in [-160, -20], psi in [-90, -10] */}
                  {(() => {
                    const tl = toSvgCoord(-160, -10);
                    const br = toSvgCoord(-20, -90);
                    return (
                      <rect
                        x={tl.x}
                        y={tl.y}
                        width={br.x - tl.x}
                        height={br.y - tl.y}
                        fill="rgba(16, 185, 129, 0.25)"
                        stroke="rgba(16, 185, 129, 0.6)"
                        strokeDasharray="3 3"
                        rx="8"
                      />
                    );
                  })()}

                  {/* Core Beta Sheet Favored Region: phi in [-180, -50], psi in [80, 180] */}
                  {(() => {
                    const tl = toSvgCoord(-180, 180);
                    const br = toSvgCoord(-50, 80);
                    return (
                      <rect
                        x={tl.x}
                        y={tl.y}
                        width={br.x - tl.x}
                        height={br.y - tl.y}
                        fill="rgba(245, 158, 11, 0.22)"
                        stroke="rgba(245, 158, 11, 0.6)"
                        strokeDasharray="3 3"
                        rx="8"
                      />
                    );
                  })()}

                  {/* Left-Handed Alpha Favored Region: phi in [30, 90], psi in [10, 80] */}
                  {(() => {
                    const tl = toSvgCoord(30, 80);
                    const br = toSvgCoord(90, 10);
                    return (
                      <rect
                        x={tl.x}
                        y={tl.y}
                        width={br.x - tl.x}
                        height={br.y - tl.y}
                        fill="rgba(6, 182, 212, 0.2)"
                        stroke="rgba(6, 182, 212, 0.6)"
                        strokeDasharray="3 3"
                        rx="8"
                      />
                    );
                  })()}

                  {/* Center Axes (phi = 0, psi = 0) */}
                  <line
                    x1={plotSize / 2}
                    y1={0}
                    x2={plotSize / 2}
                    y2={plotSize}
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="1.5"
                  />
                  <line
                    x1={0}
                    y1={plotSize / 2}
                    x2={plotSize}
                    y2={plotSize / 2}
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="1.5"
                  />

                  {/* Quadrant Text Labels */}
                  <text x={plotSize * 0.22} y={plotSize * 0.35} fill="rgba(245, 158, 11, 0.8)" fontSize="11" fontWeight="bold">
                    β-Sheet
                  </text>
                  <text x={plotSize * 0.22} y={plotSize * 0.68} fill="rgba(16, 185, 129, 0.8)" fontSize="11" fontWeight="bold">
                    Right α-Helix
                  </text>
                  <text x={plotSize * 0.62} y={plotSize * 0.42} fill="rgba(6, 182, 212, 0.8)" fontSize="11" fontWeight="bold">
                    Left α-Helix
                  </text>

                  {/* Axis Tick Marks & Labels */}
                  <text x={plotSize / 2 + 5} y={15} fill="rgba(255, 255, 255, 0.5)" fontSize="10">
                    ψ +180°
                  </text>
                  <text x={plotSize / 2 + 5} y={plotSize - 6} fill="rgba(255, 255, 255, 0.5)" fontSize="10">
                    ψ -180°
                  </text>
                  <text x={8} y={plotSize / 2 - 6} fill="rgba(255, 255, 255, 0.5)" fontSize="10">
                    ϕ -180°
                  </text>
                  <text x={plotSize - 55} y={plotSize / 2 - 6} fill="rgba(255, 255, 255, 0.5)" fontSize="10">
                    ϕ +180°
                  </text>

                  {/* Individual Residue Data Points */}
                  {ramachandranPoints.map((pt) => {
                    const pos = toSvgCoord(pt.phi, pt.psi);
                    const isSelected = selectedResidueSeq === pt.res_seq;
                    let fill = '#3b82f6';
                    if (pt.region === 'Favored Alpha Helix') fill = '#10b981';
                    else if (pt.region === 'Favored Beta Sheet') fill = '#f59e0b';
                    else if (pt.region === 'Favored Left-Handed Alpha') fill = '#06b6d4';
                    else if (pt.region === 'Steric Outlier') fill = '#ef4444';

                    return (
                      <g
                        key={`${pt.chain_id}-${pt.res_seq}`}
                        onClick={() => setSelectedResidueSeq(pt.res_seq)}
                        className="cursor-pointer"
                      >
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={isSelected ? 6 : pt.is_glycine ? 3 : 4}
                          fill={fill}
                          stroke={isSelected ? '#ffffff' : 'rgba(0,0,0,0.5)'}
                          strokeWidth={isSelected ? 2 : 1}
                          className="transition-transform hover:scale-150"
                        />
                        {isSelected && (
                          <text
                            x={pos.x + 8}
                            y={pos.y - 6}
                            fill="#ffffff"
                            fontSize="11"
                            fontWeight="bold"
                            className="drop-shadow-md"
                          >
                            {pt.res_name}{pt.res_seq} ({pt.phi.toFixed(1)}°, {pt.psi.toFixed(1)}°)
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs">
                <span className="flex items-center gap-1.5 text-on-surface">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Favored α-Helix
                </span>
                <span className="flex items-center gap-1.5 text-on-surface">
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" /> Favored β-Sheet
                </span>
                <span className="flex items-center gap-1.5 text-on-surface">
                  <span className="w-3 h-3 rounded-full bg-cyan-500 inline-block" /> Left-Handed α
                </span>
                <span className="flex items-center gap-1.5 text-on-surface">
                  <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /> Allowed
                </span>
                <span className="flex items-center gap-1.5 text-on-surface">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" /> Outlier
                </span>
              </div>
            </div>

            {/* Selected Residue Geometry Inspector (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-3">
                <h4 className="text-xs font-bold text-outline uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">analytics</span>
                  Dihedral Geometry Inspector
                </h4>

                {selectedResidueSeq !== null ? (
                  (() => {
                    const res = structureDetail.residues.find((r) => r.res_seq === selectedResidueSeq);
                    if (!res) return <p className="text-xs text-outline">Select a point on the plot.</p>;
                    return (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-on-surface">
                            {res.res_name} {res.res_seq} (Chain {res.chain_id})
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getSecColor(res.secondary_structure)}`}>
                            {res.secondary_structure}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="p-2.5 rounded-lg bg-surface-container-lowest text-center">
                            <div className="text-[10px] text-outline uppercase font-semibold">Phi (ϕ)</div>
                            <div className="text-sm font-bold text-primary mt-0.5">
                              {res.phi !== null ? `${res.phi.toFixed(1)}°` : 'N/A'}
                            </div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-surface-container-lowest text-center">
                            <div className="text-[10px] text-outline uppercase font-semibold">Psi (ψ)</div>
                            <div className="text-sm font-bold text-primary mt-0.5">
                              {res.psi !== null ? `${res.psi.toFixed(1)}°` : 'N/A'}
                            </div>
                          </div>
                          <div className="p-2.5 rounded-lg bg-surface-container-lowest text-center">
                            <div className="text-[10px] text-outline uppercase font-semibold">Omega (ω)</div>
                            <div className="text-sm font-bold text-primary mt-0.5">
                              {res.omega !== null ? `${res.omega.toFixed(1)}°` : 'N/A'}
                            </div>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-surface-container-lowest text-xs space-y-1">
                          <div className="flex justify-between">
                            <span className="text-outline">Ramachandran Class:</span>
                            <span className="font-semibold text-on-surface">{res.ramachandran_region}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-outline">Planar Peptide (ω):</span>
                            <span className="font-semibold text-on-surface">
                              {res.omega !== null && Math.abs(res.omega) > 150 ? 'trans-peptide' : 'cis-peptide'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <p className="text-xs text-on-surface-variant">
                    Click any residue circle in the Ramachandran scatter plot to inspect its exact $(\phi, \psi, \omega)$
                    backbone dihedral angles, secondary structure motif, and steric collision envelope.
                  </p>
                )}
              </div>

              {/* Ramachandran Educational Callout */}
              <div className="p-4 rounded-xl bg-surface-container-low/70 border border-outline-variant/20 text-xs text-on-surface-variant space-y-2">
                <span className="font-bold text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">info</span>
                  G.N. Ramachandran Principles (1963)
                </span>
                <p className="leading-relaxed">
                  Steric hindrance between the carbonyl oxygen $O_i$ and the subsequent residue's amide hydrogen or beta carbon
                  severely restricts permitted $(\phi, \psi)$ dihedral angles, clustering natural polypeptides into distinct
                  right-handed $\alpha$-helices, $\beta$-sheets, and collagen triple-helices.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: DSSP Hydrogen-Bonding Network */}
        {activeTab === 'dssp_bonds' && (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-on-surface">
                  Kabsch-Sander Electrostatic Hydrogen-Bond Register
                </h4>
                <p className="text-xs text-outline">
                  Identified donor C=O and acceptor N-H electrostatic interactions (E ≤ -0.5 kcal/mol).
                </p>
              </div>
              <span className="px-3 py-1 rounded-lg bg-surface-container text-xs font-semibold text-primary">
                {structureDetail.hydrogen_bonds.length} Active H-Bonds
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-outline-variant/30">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-container-low text-outline font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Donor (C=O)</th>
                    <th className="p-3">Acceptor (N-H)</th>
                    <th className="p-3">Pattern</th>
                    <th className="p-3">r(O-N) [Å]</th>
                    <th className="p-3">r(O-H) [Å]</th>
                    <th className="p-3">Energy [kcal/mol]</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {structureDetail.hydrogen_bonds.map((hb, idx) => {
                    const delta = hb.acceptor_res_seq - hb.donor_res_seq;
                    let pattern = 'Cross-Strand / Loop';
                    if (delta === 4) pattern = 'α-Helix Turn (i → i+4)';
                    else if (delta === 3) pattern = '3_10-Helix Turn (i → i+3)';
                    else if (delta === 5) pattern = 'π-Helix Turn (i → i+5)';
                    else if (Math.abs(delta) > 5) pattern = 'β-Sheet Antiparallel/Parallel';

                    return (
                      <tr key={idx} className="hover:bg-surface-container-low/40 transition">
                        <td className="p-3 font-semibold text-on-surface">
                          {hb.donor_res_name} {hb.donor_res_seq} ({hb.donor_chain})
                        </td>
                        <td className="p-3 font-semibold text-on-surface">
                          {hb.acceptor_res_name} {hb.acceptor_res_seq} ({hb.acceptor_chain})
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[11px] bg-surface-container text-primary font-medium">
                            {pattern}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-on-surface">{hb.distance_on.toFixed(2)} Å</td>
                        <td className="p-3 font-mono text-on-surface">{hb.distance_oh.toFixed(2)} Å</td>
                        <td className="p-3 font-mono font-bold text-emerald-500">{hb.energy_kcal_mol.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Secondary Structure Sequence */}
        {activeTab === 'sequence' && (
          <div className="p-6 space-y-4">
            <h4 className="text-sm font-bold text-on-surface">Residue-Level Secondary Structure Track</h4>
            <div className="flex flex-wrap gap-1.5 p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
              {structureDetail.residues.map((res) => {
                const isSelected = selectedResidueSeq === res.res_seq;
                return (
                  <button
                    key={`${res.chain_id}-${res.res_seq}`}
                    type="button"
                    onClick={() => setSelectedResidueSeq(res.res_seq)}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition min-w-[42px] ${
                      isSelected
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface-container-lowest'
                        : ''
                    } ${getSecColor(res.secondary_structure)}`}
                  >
                    <span className="text-[10px] text-outline font-mono">{res.res_seq}</span>
                    <span className="text-xs font-bold">{res.res_name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Segments Summary */}
        {activeTab === 'summary' && (
          <div className="p-6 space-y-4">
            <h4 className="text-sm font-bold text-on-surface">Identified Secondary Structure Segments</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {structureDetail.secondary_structure_segments.map((seg, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border space-y-1.5 ${getSecColor(seg.type)}`}
                >
                  <div className="text-xs font-bold">{seg.type}</div>
                  <div className="text-[11px] text-on-surface-variant">
                    Residues {seg.start_res_seq} - {seg.end_res_seq} (Length: {seg.length} residues)
                  </div>
                  <div className="text-[10px] text-outline">Chain {seg.chain_id}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Custom PDB Upload Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 max-w-2xl w-full space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">upload_file</span>
                Paste Custom PDB Coordinates
              </h3>
              <button
                type="button"
                onClick={() => setShowCustomModal(false)}
                className="text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleParseCustomPdb} className="space-y-4">
              <textarea
                rows={12}
                required
                placeholder="Paste PDB file content with ATOM and HETATM coordinate records..."
                value={customPdbText}
                onChange={(e) => setCustomPdbText(e.target.value)}
                className="w-full p-3 bg-surface-container-low rounded-xl font-mono text-xs text-on-surface border border-outline-variant/40 focus:outline-none focus:border-primary"
              />

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:text-on-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary/90 transition shadow-sm"
                >
                  {loading ? 'Parsing Coordinates...' : 'Run DSSP & Dihedrals'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
