import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  SpaceGroupSummary,
  SpaceGroupDetail,
  FractionalCoordinate,
  UnitCellParameters,
  MetricTensorResult,
  PowderDiffractionPattern,
  SpaceGroupPreset,
  CrystalSystem,
  XRayRadiationSource,
} from '../../../types/crystallographySpaceGroup';
import {
  crystallographySpaceGroupService,
  SPACE_GROUP_PRESETS,
} from '../../../services/crystallographySpaceGroupService';

const ELEMENT_COLORS: Record<string, string> = {
  H: '#f8fafc',
  C: '#64748b',
  N: '#3b82f6',
  O: '#ef4444',
  Na: '#8b5cf6',
  Mg: '#06b6d4',
  Al: '#94a3b8',
  Si: '#eab308',
  Cl: '#10b981',
  Ca: '#14b8a6',
  Ti: '#0284c7',
  Fe: '#f59e0b',
  Cu: '#f97316',
  Sr: '#6366f1',
  Cs: '#a855f7',
};

export const SpaceGroupWyckoffWorkbench: React.FC = () => {
  const [presets] = useState<SpaceGroupPreset[]>(crystallographySpaceGroupService.getPresets());
  const [selectedPresetId, setSelectedPresetId] = useState<string>('nacl_rocksalt');
  const [spaceGroups, setSpaceGroups] = useState<SpaceGroupSummary[]>([]);
  const [selectedSgNumber, setSelectedSgNumber] = useState<number>(225);
  const [activeTab, setActiveTab] = useState<'3d_cell' | 'wyckoff_sites' | 'symmetry_ops' | 'metric_tensor' | 'powder_xrd'>('3d_cell');

  // Space Group Detail state
  const [sgDetail, setSgDetail] = useState<SpaceGroupDetail | null>(null);
  const [unitCell, setUnitCell] = useState<UnitCellParameters>({
    a: 5.64,
    b: 5.64,
    c: 5.64,
    alpha: 90,
    beta: 90,
    gamma: 90,
  });
  const [atomSites, setAtomSites] = useState<FractionalCoordinate[]>([]);
  const [metricResult, setMetricResult] = useState<MetricTensorResult | null>(null);
  const [xrdPattern, setXrdPattern] = useState<PowderDiffractionPattern | null>(null);
  const [xraySource, setXraySource] = useState<XRayRadiationSource>('Cu_Ka');
  const [filterSystem, setFilterSystem] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive Wyckoff Orbit Generator inputs
  const [orbitElement, setOrbitElement] = useState<string>('Na');
  const [orbitX, setOrbitX] = useState<number>(0.0);
  const [orbitY, setOrbitY] = useState<number>(0.0);
  const [orbitZ, setOrbitZ] = useState<number>(0.0);
  const [generatedOrbit, setGeneratedOrbit] = useState<FractionalCoordinate[] | null>(null);

  // 3D Isometric Canvas rotation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotAngleX, setRotAngleX] = useState<number>(25);
  const [rotAngleY, setRotAngleY] = useState<number>(35);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [showSupercell, setShowSupercell] = useState<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Load space group directory
  useEffect(() => {
    crystallographySpaceGroupService.listSpaceGroups().then((groups) => {
      setSpaceGroups(groups);
    });
  }, []);

  // Preset Selection Handler
  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const p = crystallographySpaceGroupService.getPresetById(presetId);
    if (p) {
      setSelectedSgNumber(p.space_group_number);
      setUnitCell({ ...p.unit_cell });
      setAtomSites([...p.basis_sites]);
      setGeneratedOrbit(null);
    }
  };

  // Load detailed Space Group information
  useEffect(() => {
    crystallographySpaceGroupService.getSpaceGroupDetails(selectedSgNumber).then((detail) => {
      setSgDetail(detail);
    });
  }, [selectedSgNumber]);

  // Compute Metric Tensor & Powder XRD
  useEffect(() => {
    crystallographySpaceGroupService.computeMetricTensor(unitCell).then((res) => {
      setMetricResult(res);
    });

    const activeAtoms = generatedOrbit && generatedOrbit.length > 0 ? generatedOrbit : atomSites;
    if (activeAtoms.length > 0) {
      crystallographySpaceGroupService
        .simulatePowderXrd({
          space_group_number: selectedSgNumber,
          unit_cell: unitCell,
          atoms: activeAtoms,
          radiation_source: xraySource,
        })
        .then((pattern) => {
          setXrdPattern(pattern);
        });
    }
  }, [unitCell, selectedSgNumber, atomSites, generatedOrbit, xraySource]);

  // Generate Wyckoff Orbit
  const handleGenerateOrbit = async () => {
    const coords = await crystallographySpaceGroupService.generateWyckoffOrbit({
      space_group_number: selectedSgNumber,
      element: orbitElement,
      x: orbitX,
      y: orbitY,
      z: orbitZ,
    });
    setGeneratedOrbit(coords);
  };

  // Canvas 3D Rendering Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#090d16');
      bgGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const radX = (rotAngleX * Math.PI) / 180.0;
      const radY = (rotAngleY * Math.PI) / 180.0;

      const project = (x: number, y: number, z: number): [number, number, number] => {
        // Centered around 0.5, 0.5, 0.5
        const cx = x - 0.5;
        const cy = y - 0.5;
        const cz = z - 0.5;

        // Rotation around Y
        const x1 = cx * Math.cos(radY) + cz * Math.sin(radY);
        const y1 = cy;
        const z1 = -cx * Math.sin(radY) + cz * Math.cos(radY);

        // Rotation around X
        const x2 = x1;
        const y2 = y1 * Math.cos(radX) - z1 * Math.sin(radX);
        const z2 = y1 * Math.sin(radX) + z1 * Math.cos(radX);

        const scale = 220;
        const scrX = width / 2 + x2 * scale;
        const scrY = height / 2 - y2 * scale;
        return [scrX, scrY, z2];
      };

      // Draw Unit Cell Bounding Box
      const vertices = [
        [0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0],
        [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1],
      ];
      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0], // bottom
        [4, 5], [5, 6], [6, 7], [7, 4], // top
        [0, 4], [1, 5], [2, 6], [3, 7], // pillars
      ];

      ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.lineWidth = 1.5;
      edges.forEach(([v1, v2]) => {
        const [p1x, p1y] = project(vertices[v1][0], vertices[v1][1], vertices[v1][2]);
        const [p2x, p2y] = project(vertices[v2][0], vertices[v2][1], vertices[v2][2]);
        ctx.beginPath();
        ctx.moveTo(p1x, p1y);
        ctx.lineTo(p2x, p2y);
        ctx.stroke();
      });

      // Collect atoms to project
      const activeAtoms = generatedOrbit && generatedOrbit.length > 0 ? generatedOrbit : atomSites;
      const atomPoints: Array<{ x: number; y: number; z: number; element: string; scrX: number; scrY: number; depth: number }> = [];

      const maxReps = showSupercell ? 1 : 0;
      for (let ix = 0; ix <= maxReps; ix++) {
        for (let iy = 0; iy <= maxReps; iy++) {
          for (let iz = 0; iz <= maxReps; iz++) {
            activeAtoms.forEach((at) => {
              const fx = (at.x + ix) / (maxReps + 1);
              const fy = (at.y + iy) / (maxReps + 1);
              const fz = (at.z + iz) / (maxReps + 1);
              const [scrX, scrY, depth] = project(fx, fy, fz);
              atomPoints.push({ x: fx, y: fy, z: fz, element: at.element, scrX, scrY, depth });
            });
          }
        }
      }

      // Sort by depth for correct 3D occlusion
      atomPoints.sort((a, b) => b.depth - a.depth);

      atomPoints.forEach((pt) => {
        const radius = pt.element === 'O' ? 9 : pt.element === 'Cl' ? 12 : pt.element === 'Na' ? 10 : 11;
        const col = ELEMENT_COLORS[pt.element] || '#38bdf8';

        // Outer glow
        const glow = ctx.createRadialGradient(pt.scrX - 2, pt.scrY - 2, 1, pt.scrX, pt.scrY, radius);
        glow.addColorStop(0, '#ffffff');
        glow.addColorStop(0.4, col);
        glow.addColorStop(1, '#0f172a');

        ctx.beginPath();
        ctx.arc(pt.scrX, pt.scrY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = glow;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Label
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(pt.element, pt.scrX, pt.scrY + 3);
      });

      if (isAutoRotate) {
        setRotAngleY((prev) => (prev + 0.3) % 360);
      }
    };

    render();
    if (isAutoRotate) {
      animId = requestAnimationFrame(render);
    }
    return () => cancelAnimationFrame(animId);
  }, [rotAngleX, rotAngleY, isAutoRotate, atomSites, generatedOrbit, showSupercell]);

  // Mouse drag rotation
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    setRotAngleY((prev) => (prev + dx * 0.6) % 360);
    setRotAngleX((prev) => Math.max(-80, Math.min(80, prev - dy * 0.6)));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Filtered Space Groups for directory
  const filteredSpaceGroups = useMemo(() => {
    return spaceGroups.filter((g) => {
      if (filterSystem !== 'all' && g.crystal_system !== filterSystem) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          String(g.number).includes(q) ||
          g.hermann_mauguin.toLowerCase().includes(q) ||
          g.point_group.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [spaceGroups, filterSystem, searchQuery]);

  return (
    <div className="space-group-workbench rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 shadow-2xl p-6 backdrop-blur-xl">
      {/* Top Banner & Preset Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              PR #055 Symmetry Engine
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              230 Space Groups
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              Wyckoff Positions
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Crystallographic Space Groups & 230 Symmetry Operators
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Affine coordinate transformations, Wyckoff site multiplicities, Busing-Levy metric tensors, and authentic powder XRD Bragg diffraction.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-slate-400 whitespace-nowrap">Crystal Preset:</label>
          <select
            className="bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={selectedPresetId}
            onChange={(e) => handleSelectPreset(e.target.value)}
          >
            {presets.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} [{p.space_group_symbol} #{p.space_group_number}]
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Controls & 3D Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Control Column (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Space Group Directory Card */}
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-4 shadow-lg">
            <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center justify-between">
              <span>Space Group Directory (1-230)</span>
              <span className="text-xs text-slate-400 font-normal">
                {filteredSpaceGroups.length} available
              </span>
            </h3>

            {/* Filter and Search */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <select
                className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-300 focus:ring-1 focus:ring-emerald-500"
                value={filterSystem}
                onChange={(e) => setFilterSystem(e.target.value)}
              >
                <option value="all">All Systems</option>
                <option value="cubic">Cubic</option>
                <option value="tetragonal">Tetragonal</option>
                <option value="hexagonal">Hexagonal</option>
                <option value="trigonal">Trigonal</option>
                <option value="orthorhombic">Orthorhombic</option>
                <option value="monoclinic">Monoclinic</option>
                <option value="triclinic">Triclinic</option>
              </select>

              <input
                type="text"
                placeholder="Search symbol/No..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-300 placeholder-slate-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Scrollable list */}
            <div className="h-36 overflow-y-auto pr-1 space-y-1.5 custom-scrollbar">
              {filteredSpaceGroups.map((g) => (
                <button
                  key={g.number}
                  onClick={() => setSelectedSgNumber(g.number)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    selectedSgNumber === g.number
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                      : 'bg-slate-900/60 text-slate-300 hover:bg-slate-700/50'
                  }`}
                >
                  <span className="font-mono">#{g.number} {g.hermann_mauguin}</span>
                  <span className="text-[10px] uppercase tracking-wide text-slate-400">{g.crystal_system}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Space Group Metadata Card */}
          {sgDetail && (
            <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-4 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <span>#{sgDetail.number} {sgDetail.hermann_mauguin}</span>
                    {sgDetail.is_centrosymmetric && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        Centrosymmetric
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">{sgDetail.schoenflies} | Point Group {sgDetail.point_group}</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 rounded bg-slate-700 text-xs font-mono font-bold text-emerald-400">
                    Lattice {sgDetail.centering}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-2.5 rounded-lg border border-slate-800">
                {sgDetail.description}
              </p>

              {/* Unit Cell Parameters Sliders */}
              <div className="border-t border-slate-700/60 pt-3">
                <span className="text-xs font-semibold text-slate-300 block mb-2">Unit Cell Parameters (Å / °)</span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400">a (Å): {unitCell.a}</label>
                    <input
                      type="range"
                      min="2.0"
                      max="12.0"
                      step="0.05"
                      value={unitCell.a}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setUnitCell((prev) => ({
                          ...prev,
                          a: val,
                          b: prev.b === prev.a ? val : prev.b,
                          c: prev.c === prev.a ? val : prev.c,
                        }));
                      }}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400">b (Å): {unitCell.b}</label>
                    <input
                      type="range"
                      min="2.0"
                      max="12.0"
                      step="0.05"
                      value={unitCell.b}
                      onChange={(e) => setUnitCell((prev) => ({ ...prev, b: parseFloat(e.target.value) }))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400">c (Å): {unitCell.c}</label>
                    <input
                      type="range"
                      min="2.0"
                      max="12.0"
                      step="0.05"
                      value={unitCell.c}
                      onChange={(e) => setUnitCell((prev) => ({ ...prev, c: parseFloat(e.target.value) }))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Wyckoff Orbit Generator */}
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-4 shadow-lg space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center justify-between">
              <span>Generate Wyckoff Orbit</span>
              {generatedOrbit && (
                <span className="text-emerald-400 font-mono font-bold text-xs">
                  Multiplicity: {generatedOrbit.length}
                </span>
              )}
            </h4>

            <div className="grid grid-cols-4 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Element</label>
                <input
                  type="text"
                  value={orbitElement}
                  onChange={(e) => setOrbitElement(e.target.value.toUpperCase())}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-center font-bold text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">x</label>
                <input
                  type="number"
                  step="0.05"
                  value={orbitX}
                  onChange={(e) => setOrbitX(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-center text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">y</label>
                <input
                  type="number"
                  step="0.05"
                  value={orbitY}
                  onChange={(e) => setOrbitY(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-center text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">z</label>
                <input
                  type="number"
                  step="0.05"
                  value={orbitZ}
                  onChange={(e) => setOrbitZ(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-center text-slate-200"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleGenerateOrbit}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium py-1.5 rounded-lg text-xs transition-all shadow-md active:scale-95"
              >
                Apply Symmetry & Expand Orbit
              </button>
              {generatedOrbit && (
                <button
                  onClick={() => setGeneratedOrbit(null)}
                  className="px-2.5 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-xs"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Tabbed Display Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Sub-Tabs Selector */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            {[
              { id: '3d_cell', label: '3D Unit Cell Visualizer' },
              { id: 'wyckoff_sites', label: 'Wyckoff Sites' },
              { id: 'symmetry_ops', label: 'Symmetry Operators' },
              { id: 'metric_tensor', label: 'Metric Tensor & Metric' },
              { id: 'powder_xrd', label: 'Powder XRD Bragg Diffractogram' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: 3D Unit Cell */}
          {activeTab === '3d_cell' && (
            <div className="relative bg-slate-950/80 rounded-xl border border-slate-800 overflow-hidden shadow-inner flex flex-col items-center justify-center p-2">
              <canvas
                ref={canvasRef}
                width={650}
                height={400}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                className="cursor-grab active:cursor-grabbing w-full h-[380px] rounded-lg"
              />

              {/* Floating Controls Overlay */}
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setIsAutoRotate(!isAutoRotate)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    isAutoRotate ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isAutoRotate ? 'Auto-Rotate: ON' : 'Auto-Rotate: OFF'}
                </button>
                <button
                  onClick={() => setShowSupercell(!showSupercell)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    showSupercell ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {showSupercell ? '2x2x2 Supercell' : '1x1x1 Unit Cell'}
                </button>
              </div>

              <div className="absolute bottom-4 left-4 text-[11px] text-slate-400 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded border border-slate-800 flex items-center gap-3">
                <span>Drag mouse to rotate</span>
                <span>•</span>
                <span>Cell Volume: {metricResult?.volume_angstrom3 ?? 0} Å³</span>
              </div>
            </div>
          )}

          {/* TAB 2: Wyckoff Sites */}
          {activeTab === 'wyckoff_sites' && sgDetail && (
            <div className="bg-slate-800/40 rounded-xl border border-slate-800 p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="text-sm font-semibold text-slate-200">
                  Wyckoff Positions for #{sgDetail.number} {sgDetail.hermann_mauguin}
                </h4>
                <span className="text-xs text-slate-400">
                  Total positions: {sgDetail.wyckoff_sites.length}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-700/60">
                    <tr>
                      <th className="py-2 px-3">Mult.</th>
                      <th className="py-2 px-3">Letter</th>
                      <th className="py-2 px-3">Site Symmetry</th>
                      <th className="py-2 px-3">Coordinate Generator</th>
                      <th className="py-2 px-3">Provenance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {sgDetail.wyckoff_sites.map((w, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                        <td className="py-2 px-3 font-mono font-bold text-emerald-400">{w.multiplicity}</td>
                        <td className="py-2 px-3 font-mono text-cyan-300 font-semibold">{w.letter}</td>
                        <td className="py-2 px-3 font-mono text-slate-300">{w.site_symmetry}</td>
                        <td className="py-2 px-3 font-mono text-amber-300">{w.coordinate_generator}</td>
                        <td className="py-2 px-3 text-slate-500 text-[10px]">{w.provenance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Symmetry Operators */}
          {activeTab === 'symmetry_ops' && sgDetail && (
            <div className="bg-slate-800/40 rounded-xl border border-slate-800 p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="text-sm font-semibold text-slate-200">
                  Affine Symmetry Operations (Total: {sgDetail.symmetry_operations.length})
                </h4>
                <span className="text-xs text-slate-400 font-mono">r' = W·r + w (mod 1)</span>
              </div>

              <div className="max-h-[360px] overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 gap-2 custom-scrollbar">
                {sgDetail.symmetry_operations.map((op, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-emerald-400">#{idx + 1}</span>
                        <span className="text-xs font-mono text-slate-200">{op.jones_faithful}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-2">
                        <span>Order: {op.rotation_order}</span>
                        <span>•</span>
                        <span>Det: {op.determinant}</span>
                        {op.is_identity && (
                          <span className="px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300">Identity</span>
                        )}
                        {op.is_inversion && (
                          <span className="px-1 py-0.2 rounded bg-indigo-500/20 text-indigo-300">Inversion</span>
                        )}
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-slate-400 bg-slate-950 p-1.5 rounded border border-slate-800">
                      t: [{op.translation_vector.map((v) => v.toFixed(2)).join(', ')}]
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Metric Tensor */}
          {activeTab === 'metric_tensor' && metricResult && (
            <div className="bg-slate-800/40 rounded-xl border border-slate-800 p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="text-sm font-semibold text-slate-200">
                  Unit Cell Geometry & Busing-Levy Metric Tensor
                </h4>
                <span className="text-xs text-emerald-400 font-mono">
                  Volume: {metricResult.volume_angstrom3} Å³
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Direct Metric Tensor G */}
                <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-800">
                  <h5 className="text-xs font-semibold text-slate-300 mb-2">Direct Metric Tensor G (Å²)</h5>
                  <div className="font-mono text-xs text-emerald-300 space-y-1 bg-slate-950 p-2.5 rounded border border-slate-800">
                    {metricResult.direct_metric_tensor.map((row, rIdx) => (
                      <div key={rIdx} className="flex justify-between">
                        {row.map((val, cIdx) => (
                          <span key={cIdx} className="w-20 text-right">{val.toFixed(3)}</span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reciprocal Metric Tensor G* */}
                <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-800">
                  <h5 className="text-xs font-semibold text-slate-300 mb-2">Reciprocal Metric Tensor G* (Å⁻²)</h5>
                  <div className="font-mono text-xs text-cyan-300 space-y-1 bg-slate-950 p-2.5 rounded border border-slate-800">
                    {metricResult.reciprocal_metric_tensor.map((row, rIdx) => (
                      <div key={rIdx} className="flex justify-between">
                        {row.map((val, cIdx) => (
                          <span key={cIdx} className="w-20 text-right">{val.toFixed(4)}</span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct-to-Cartesian Matrix M */}
                <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-800">
                  <h5 className="text-xs font-semibold text-slate-300 mb-2">Direct-to-Cartesian Matrix M (Busing-Levy)</h5>
                  <div className="font-mono text-xs text-amber-300 space-y-1 bg-slate-950 p-2.5 rounded border border-slate-800">
                    {metricResult.direct_to_cartesian_matrix.map((row, rIdx) => (
                      <div key={rIdx} className="flex justify-between">
                        {row.map((val, cIdx) => (
                          <span key={cIdx} className="w-20 text-right">{val.toFixed(3)}</span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reciprocal Cell Parameters */}
                <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-800 flex flex-col justify-between">
                  <h5 className="text-xs font-semibold text-slate-300 mb-2">Reciprocal Parameters</h5>
                  <div className="grid grid-cols-3 gap-2 text-xs font-mono bg-slate-950 p-2.5 rounded border border-slate-800">
                    <div>a*: {metricResult.reciprocal_a_star}</div>
                    <div>b*: {metricResult.reciprocal_b_star}</div>
                    <div>c*: {metricResult.reciprocal_c_star}</div>
                    <div>α*: {metricResult.reciprocal_alpha_star}°</div>
                    <div>β*: {metricResult.reciprocal_beta_star}°</div>
                    <div>γ*: {metricResult.reciprocal_gamma_star}°</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Powder XRD Bragg Diffractogram */}
          {activeTab === 'powder_xrd' && (
            <div className="bg-slate-800/40 rounded-xl border border-slate-800 p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">
                    Powder X-ray Diffraction (XRD) Spectrum
                  </h4>
                  <p className="text-xs text-slate-400">
                    Bragg's Law: λ = 2d·sinθ with Cromer-Mann form factors and Lorentz-polarization.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-slate-400">Radiation:</label>
                  <select
                    value={xraySource}
                    onChange={(e) => setXraySource(e.target.value as XRayRadiationSource)}
                    className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-200 font-mono"
                  >
                    <option value="Cu_Ka">Cu Kα (1.5406 Å)</option>
                    <option value="Mo_Ka">Mo Kα (0.7107 Å)</option>
                    <option value="Co_Ka">Co Kα (1.7890 Å)</option>
                    <option value="Cr_Ka">Cr Kα (2.2897 Å)</option>
                    <option value="Fe_Ka">Fe Kα (1.9360 Å)</option>
                  </select>
                </div>
              </div>

              {/* Diffractogram Plot (SVG) */}
              {xrdPattern && (
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <svg className="w-full h-44" viewBox="0 0 600 160">
                    {/* Axis lines */}
                    <line x1="40" y1="130" x2="580" y2="130" stroke="#475569" strokeWidth="1.5" />
                    <line x1="40" y1="10" x2="40" y2="130" stroke="#475569" strokeWidth="1.5" />

                    {/* X axis labels */}
                    {[10, 20, 30, 40, 50, 60, 70, 80].map((th) => {
                      const x = 40 + ((th - 10) / 70) * 540;
                      return (
                        <g key={th}>
                          <line x1={x} y1="130" x2={x} y2="135" stroke="#64748b" strokeWidth="1" />
                          <text x={x} y="148" fill="#94a3b8" fontSize="9" textAnchor="middle">
                            {th}°
                          </text>
                        </g>
                      );
                    })}

                    {/* Bragg Peak Sticks */}
                    {xrdPattern.peaks
                      .filter((p) => !p.is_systematic_absence && p.intensity_relative > 1)
                      .map((p, idx) => {
                        const px = 40 + ((p.two_theta_degrees - 10) / 70) * 540;
                        const py = 130 - (p.intensity_relative / 100) * 115;
                        return (
                          <g key={idx}>
                            <line
                              x1={px}
                              y1="130"
                              x2={px}
                              y2={py}
                              stroke="#10b981"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                            {p.intensity_relative > 15 && (
                              <text
                                x={px}
                                y={py - 4}
                                fill="#38bdf8"
                                fontSize="8"
                                textAnchor="middle"
                                fontFamily="monospace"
                              >
                                ({p.h}{p.k}{p.l})
                              </text>
                            )}
                          </g>
                        );
                      })}
                  </svg>
                  <div className="text-center text-[10px] text-slate-400 mt-1">2θ Diffraction Angle (degrees)</div>
                </div>
              )}

              {/* Peak Table */}
              {xrdPattern && (
                <div className="max-h-48 overflow-y-auto">
                  <table className="w-full text-xs text-left font-mono">
                    <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-700/60 sticky top-0">
                      <tr>
                        <th className="py-1.5 px-2.5">(h k l)</th>
                        <th className="py-1.5 px-2.5">d (Å)</th>
                        <th className="py-1.5 px-2.5">2θ (°)</th>
                        <th className="py-1.5 px-2.5">|F(hkl)|</th>
                        <th className="py-1.5 px-2.5">Mult.</th>
                        <th className="py-1.5 px-2.5">Rel. Int. (%)</th>
                        <th className="py-1.5 px-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {xrdPattern.peaks.slice(0, 15).map((p, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/40">
                          <td className="py-1.5 px-2.5 text-cyan-300 font-bold">({p.h} {p.k} {p.l})</td>
                          <td className="py-1.5 px-2.5 text-slate-300">{p.d_spacing_angstrom.toFixed(3)}</td>
                          <td className="py-1.5 px-2.5 text-emerald-400">{p.two_theta_degrees.toFixed(2)}</td>
                          <td className="py-1.5 px-2.5 text-slate-300">{p.structure_factor_magnitude.toFixed(1)}</td>
                          <td className="py-1.5 px-2.5 text-slate-400">{p.multiplicity}</td>
                          <td className="py-1.5 px-2.5 font-bold text-amber-400">{p.intensity_relative.toFixed(1)}</td>
                          <td className="py-1.5 px-2.5">
                            {p.is_systematic_absence ? (
                              <span className="text-[10px] text-red-400">Extinct</span>
                            ) : (
                              <span className="text-[10px] text-emerald-400 font-semibold">Allowed</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
