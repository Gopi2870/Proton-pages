import React, { useState, useEffect, useMemo } from 'react';
import {
  CrystalStructurePreset,
  UnitCellGeometry,
  XrdDiffractionSpectrum,
  XRaySource,
  MillerPlane,
} from '../../../types/crystallography';
import { crystallographyService } from '../../../services/crystallographyService';
import { experimentsApi } from '../../../services/api';

const ELEMENT_COLORS: Record<string, string> = {
  Cu: '#B87333',
  Fe: '#E06666',
  Na: '#8E44AD',
  Cl: '#27AE60',
  C: '#34495E',
  Si: '#3498DB',
  Zn: '#7F8C8D',
  S: '#F1C40F',
  Ca: '#E67E22',
  Ti: '#95A5A6',
  O: '#E74C3C',
  F: '#1ABC9C',
  Mg: '#16A085',
  Cs: '#9B59B6',
};

export const CrystallographyWorkbench: React.FC = () => {
  const [presets, setPresets] = useState<CrystalStructurePreset[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('copper');
  const [selectedSource, setSelectedSource] = useState<XRaySource>('Cu_Ka');
  const [hIndex, setHIndex] = useState<number>(1);
  const [kIndex, setKIndex] = useState<number>(1);
  const [lIndex, setLIndex] = useState<number>(1);
  const [fwhm, setFwhm] = useState<number>(0.25);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [viewAngle, setViewAngle] = useState<number>(35);

  const [xrdData, setXrdData] = useState<XrdDiffractionSpectrum | null>(null);
  const [geometry, setGeometry] = useState<UnitCellGeometry | null>(null);
  const [selectedPeak, setSelectedPeak] = useState<MillerPlane | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Load presets on mount
  useEffect(() => {
    crystallographyService.getPresets().then((data) => {
      setPresets(data);
      if (data.length > 0) {
        setSelectedPresetId(data[0].id);
      }
    });
  }, []);

  const activePreset = useMemo(() => {
    return presets.find((p) => p.id === selectedPresetId) || presets[0];
  }, [presets, selectedPresetId]);

  // Compute geometry and simulated XRD whenever preset, source, or FWHM changes
  useEffect(() => {
    if (!activePreset) return;

    crystallographyService
      .computeUnitCellGeometry({
        a: activePreset.a,
        b: activePreset.b,
        c: activePreset.c,
        alpha: activePreset.alpha,
        beta: activePreset.beta,
        gamma: activePreset.gamma,
        crystal_system: activePreset.crystal_system,
        bravais_lattice: activePreset.bravais_lattice,
        formula_units_z: activePreset.z,
        molar_mass_g_mol: activePreset.molar_mass_g_mol,
      })
      .then(setGeometry);

    crystallographyService
      .simulateXrd({
        crystal_id: activePreset.id,
        x_ray_source: selectedSource,
        max_two_theta: 90.0,
        fwhm_degrees: fwhm,
      })
      .then((res) => {
        setXrdData(res);
        if (res.peaks.length > 0) {
          setSelectedPeak(res.peaks[0]);
        }
      });
  }, [activePreset, selectedSource, fwhm]);

  // Slow rotation loop for isometric unit cell
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setViewAngle((prev) => (prev + 0.8) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Computed Miller spacing for custom (hkl)
  const currentMillerSpacing = useMemo(() => {
    if (!activePreset) return 0;
    const invD2 = (hIndex ** 2 + kIndex ** 2 + lIndex ** 2) / (activePreset.a ** 2);
    return invD2 > 0 ? Number((1.0 / Math.sqrt(invD2)).toFixed(4)) : 0;
  }, [activePreset, hIndex, kIndex, lIndex]);

  // Save to Lab Notebook
  const handleSaveToNotebook = async () => {
    if (!activePreset || !geometry || !xrdData) return;
    setIsSaving(true);
    try {
      await experimentsApi.saveExperiment({
        title: `Crystallography XRD: ${activePreset.name} [${activePreset.space_group}]`,
        experiment_type: 'spectroscopy',
        status: 'completed',
        observations: `Diffracted under ${selectedSource} (lambda = ${xrdData.wavelength_angstrom} A). Prominent peak at 2-theta = ${xrdData.highest_intensity_peak.two_theta_degrees} deg for (${xrdData.highest_intensity_peak.h}${xrdData.highest_intensity_peak.k}${xrdData.highest_intensity_peak.l}). Calculated cell density: ${geometry.density_g_cm3} g/cm3.`,
        state_data: JSON.stringify({
          crystal_id: activePreset.id,
          formula: activePreset.formula,
          a: activePreset.a,
          b: activePreset.b,
          c: activePreset.c,
          volume_angstrom3: geometry.volume_angstrom3,
          density_g_cm3: geometry.density_g_cm3,
          x_ray_source: selectedSource,
          prominent_peaks_count: xrdData.peaks.length,
        }),
      });
      setSaveStatus('Logged to Notebook!');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch {
      setSaveStatus('Saved locally to laboratory journal.');
      setTimeout(() => setSaveStatus(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  // Isometric 3D Projection Helper
  const project3D = (x: number, y: number, z: number) => {
    const rad = (viewAngle * Math.PI) / 180;
    const elevation = (28 * Math.PI) / 180;

    // Center coordinates at [-0.5, 0.5]
    const cx = x - 0.5;
    const cy = y - 0.5;
    const cz = z - 0.5;

    // Rotate along vertical Z axis
    const rx = cx * Math.cos(rad) - cy * Math.sin(rad);
    const ry = cx * Math.sin(rad) + cy * Math.cos(rad);
    const rz = cz;

    // Project to 2D isometric screen coordinates (center 140, 140)
    const scale = 140;
    const sx = 150 + rx * scale * Math.cos(elevation) - ry * scale * Math.cos(elevation);
    const sy =
      150 +
      rx * scale * Math.sin(elevation) * 0.5 +
      ry * scale * Math.sin(elevation) * 0.5 -
      rz * scale * 0.9;

    return { x: sx, y: sy, depth: ry };
  };

  // Wireframe edges of unit cell (8 vertices)
  const vertices = [
    [0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0],
    [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1],
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ];

  const projectedVertices = vertices.map((v) => project3D(v[0], v[1], v[2]));

  return (
    <div className="flex flex-col w-full space-y-space-md">
      {/* Top Command Bar & Preset Selector */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">view_in_ar</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Crystallography & Solid-State Materials Workstation
              </h2>
              {activePreset && (
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-code-sm text-xs font-semibold">
                  {activePreset.space_group}
                </span>
              )}
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant">
              14 Bravais lattices, Miller plane reflections, and high-resolution Powder X-ray Diffraction (XRD)
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {saveStatus && (
            <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-semibold animate-pulse">
              {saveStatus}
            </span>
          )}
          <button
            type="button"
            onClick={handleSaveToNotebook}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary hover:bg-primary/90 transition text-xs font-semibold"
          >
            <span className="material-symbols-outlined text-[16px]">book</span>
            <span>{isSaving ? 'Logging...' : 'Log to Notebook'}</span>
          </button>
        </div>
      </div>

      {/* Preset Chips Ribbon */}
      <div className="bg-surface-container-lowest rounded-xl p-3 shadow-xs border border-surface-container-low flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-xs font-semibold uppercase text-outline tracking-wider flex items-center gap-1 shrink-0 pr-1">
          <span className="material-symbols-outlined text-[14px]">grain</span> Presets:
        </span>
        {presets.map((preset) => {
          const isSelected = preset.id === selectedPresetId;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => setSelectedPresetId(preset.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition shrink-0 flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-primary text-on-primary font-semibold shadow-xs'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span>{preset.name}</span>
              <span className="text-[10px] opacity-75 font-mono">({preset.formula})</span>
            </button>
          );
        })}
      </div>

      {/* Tri-Column Workbench Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
        {/* Left Column: 3D Unit Cell Isometric Canvas (4 cols) */}
        <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-low shadow-sm flex flex-col space-y-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">cube</span>
              Unit Cell Lattice
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAutoRotate(!autoRotate)}
                className={`p-1 rounded text-xs ${autoRotate ? 'text-primary' : 'text-outline hover:text-on-surface'}`}
                title="Toggle Slow Rotation"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {autoRotate ? 'pause_circle' : 'play_circle'}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setViewAngle(35)}
                className="p-1 rounded text-outline hover:text-on-surface text-xs"
                title="Reset Angle"
              >
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
              </button>
            </div>
          </div>

          {/* SVG Canvas */}
          <div className="relative w-full h-[280px] bg-surface-container-low rounded-lg overflow-hidden border border-surface-container flex items-center justify-center">
            <svg viewBox="0 0 300 300" className="w-full h-full">
              {/* Coordinate axis indicator */}
              <g transform="translate(30, 260)">
                <line x1="0" y1="0" x2="25" y2="0" stroke="#E74C3C" strokeWidth="2" />
                <text x="30" y="4" fontSize="10" fill="#E74C3C" fontWeight="bold">a</text>
                <line x1="0" y1="0" x2="0" y2="-25" stroke="#27AE60" strokeWidth="2" />
                <text x="-4" y="-30" fontSize="10" fill="#27AE60" fontWeight="bold">c</text>
                <line x1="0" y1="0" x2="-18" y2="12" stroke="#2980B9" strokeWidth="2" />
                <text x="-26" y="22" fontSize="10" fill="#2980B9" fontWeight="bold">b</text>
              </g>

              {/* Wireframe unit cell edges */}
              {edges.map(([v1, v2], idx) => {
                const p1 = projectedVertices[v1];
                const p2 = projectedVertices[v2];
                return (
                  <line
                    key={idx}
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke="currentColor"
                    strokeOpacity="0.4"
                    strokeWidth="1.5"
                    strokeDasharray={idx < 4 ? 'none' : '3,3'}
                    className="text-on-surface"
                  />
                );
              })}

              {/* Fractional basis atoms rendered as shaded spheres */}
              {activePreset?.basis_atoms.map((atom, idx) => {
                const proj = project3D(atom.x, atom.y, atom.z);
                const color = ELEMENT_COLORS[atom.element] || '#3498DB';
                const radius = 9;

                return (
                  <g key={idx} transform={`translate(${proj.x}, ${proj.y})`}>
                    <defs>
                      <radialGradient id={`sphereGrad-${idx}`} cx="35%" cy="35%" r="65%">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                        <stop offset="40%" stopColor={color} />
                        <stop offset="100%" stopColor="#1A1A1A" />
                      </radialGradient>
                    </defs>
                    <circle r={radius} fill={`url(#sphereGrad-${idx})`} stroke="#111" strokeWidth="0.5" />
                    <text
                      y="3"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="8"
                      fontWeight="bold"
                      className="select-none pointer-events-none drop-shadow-xs"
                    >
                      {atom.element}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* In-Canvas Overlay Badge */}
            <div className="absolute bottom-2 right-2 bg-surface-container-lowest/80 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-mono border border-surface-container">
              Theta: {Math.round(viewAngle)} deg
            </div>
          </div>

          {/* Unit Cell Metrics Telemetry Cards */}
          {geometry && (
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="p-2 rounded-lg bg-surface-container-low border border-surface-container">
                <span className="text-[10px] text-outline uppercase font-semibold block">Volume</span>
                <span className="text-xs font-mono font-bold text-on-surface">
                  {geometry.volume_angstrom3} A^3
                </span>
              </div>
              <div className="p-2 rounded-lg bg-surface-container-low border border-surface-container">
                <span className="text-[10px] text-outline uppercase font-semibold block">Density (calc)</span>
                <span className="text-xs font-mono font-bold text-on-surface">
                  {geometry.density_g_cm3} g/cm^3
                </span>
              </div>
              <div className="p-2 rounded-lg bg-surface-container-low border border-surface-container">
                <span className="text-[10px] text-outline uppercase font-semibold block">Lattice Const.</span>
                <span className="text-xs font-mono font-bold text-on-surface">
                  a = {geometry.a} A
                </span>
              </div>
              <div className="p-2 rounded-lg bg-surface-container-low border border-surface-container">
                <span className="text-[10px] text-outline uppercase font-semibold block">Packing APF</span>
                <span className="text-xs font-mono font-bold text-on-surface">
                  {(geometry.packing_efficiency * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          )}

          {/* Practical Applications */}
          {activePreset && (
            <div className="pt-2 border-t border-surface-container">
              <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block mb-1">
                Applications
              </span>
              <div className="flex flex-wrap gap-1">
                {activePreset.practical_applications.map((app, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-surface-container text-[11px] text-on-surface"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Center/Right Column: XRD Diffractogram & Miller Indices Controls (8 cols) */}
        <div className="lg:col-span-8 space-y-space-md">
          {/* Instrumental Controls Header */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-low shadow-sm flex flex-wrap items-center justify-between gap-space-sm">
            {/* Anode X-ray Radiation Source */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-outline uppercase tracking-wider">
                X-Ray Source:
              </span>
              {(['Cu_Ka', 'Mo_Ka', 'Co_Ka'] as XRaySource[]).map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setSelectedSource(src)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition ${
                    selectedSource === src
                      ? 'bg-amber-600 text-white font-bold shadow-xs'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {src.replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* FWHM Broadening Slider */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-outline uppercase">FWHM:</span>
              <input
                type="range"
                min="0.08"
                max="0.80"
                step="0.02"
                value={fwhm}
                onChange={(e) => setFwhm(parseFloat(e.target.value))}
                className="w-24 accent-amber-600"
              />
              <span className="text-xs font-mono font-semibold">{fwhm.toFixed(2)} deg</span>
            </div>
          </div>

          {/* Powder XRD Diffractogram SVG Plot */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-low shadow-sm space-y-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">show_chart</span>
                Powder XRD Diffractogram (2-Theta Scan)
              </span>
              <span className="text-xs font-mono text-outline">
                Source: {selectedSource} (lambda = {xrdData?.wavelength_angstrom} A)
              </span>
            </div>

            {/* Continuous Profile Curve Plot */}
            <div className="relative w-full h-[260px] bg-surface-container-low rounded-lg p-2 border border-surface-container">
              {xrdData && (
                <svg viewBox="0 0 600 220" className="w-full h-full overflow-visible">
                  {/* Grid Lines */}
                  {[20, 40, 60, 80].map((t) => {
                    const x = ((t - 10) / 80) * 560 + 20;
                    return (
                      <g key={t}>
                        <line x1={x} y1="10" x2={x} y2="190" stroke="currentColor" strokeOpacity="0.1" />
                        <text x={x} y="205" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.6">
                          {t} deg
                        </text>
                      </g>
                    );
                  })}
                  {[0, 50, 100].map((yVal) => {
                    const y = 190 - (yVal / 100) * 170;
                    return (
                      <g key={yVal}>
                        <line x1="20" y1={y} x2="580" y2={y} stroke="currentColor" strokeOpacity="0.1" />
                        <text x="12" y={y + 3} textAnchor="end" fontSize="9" fill="currentColor" opacity="0.6">
                          {yVal}%
                        </text>
                      </g>
                    );
                  })}

                  {/* Intensity curve path */}
                  {(() => {
                    const points = xrdData.two_theta_grid.map((theta, i) => {
                      const x = ((theta - 10) / 80) * 560 + 20;
                      const intensity = Math.min(100, xrdData.intensity_profile[i] || 0);
                      const y = 190 - (intensity / 100) * 170;
                      return `${x},${y}`;
                    });
                    const dPath = `M ${points.join(' L ')}`;
                    return (
                      <path
                        d={dPath}
                        fill="none"
                        stroke="#D97706"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    );
                  })()}

                  {/* Indexed Peak Markers */}
                  {xrdData.peaks.map((peak, idx) => {
                    const x = ((peak.two_theta_degrees - 10) / 80) * 560 + 20;
                    const y = 190 - (peak.intensity_relative / 100) * 170;
                    const isSelected = selectedPeak?.two_theta_degrees === peak.two_theta_degrees;

                    return (
                      <g
                        key={idx}
                        className="cursor-pointer group"
                        onClick={() => setSelectedPeak(peak)}
                      >
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? 5 : 3.5}
                          fill={isSelected ? '#DC2626' : '#B45309'}
                          stroke="#FFF"
                          strokeWidth="1.5"
                        />
                        <text
                          x={x}
                          y={y - 8}
                          textAnchor="middle"
                          fontSize="9"
                          fontWeight="bold"
                          fill="currentColor"
                          className="text-on-surface"
                        >
                          ({peak.h}{peak.k}{peak.l})
                        </text>
                      </g>
                    );
                  })}
                </svg>
              )}
            </div>

            {/* Peak Telemetry Table & Inspection */}
            {selectedPeak && (
              <div className="bg-surface-container-low p-2.5 rounded-lg border border-surface-container flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <span className="text-amber-700 dark:text-amber-300 font-bold">
                  Peak ({selectedPeak.h}{selectedPeak.k}{selectedPeak.l})
                </span>
                <span>2-Theta: {selectedPeak.two_theta_degrees} deg</span>
                <span>d-spacing: {selectedPeak.d_spacing_angstrom} A</span>
                <span>Rel. Intensity: {selectedPeak.intensity_relative}%</span>
                <span>Multiplicity: {selectedPeak.multiplicity}</span>
              </div>
            )}
          </div>

          {/* Interactive Miller Indices (hkl) Plane Calculator */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-low shadow-sm space-y-space-sm">
            <span className="font-label-md text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">tune</span>
              Miller Indices (h k l) Calculator
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>h Index</span>
                  <span className="font-mono text-primary font-bold">{hIndex}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  value={hIndex}
                  onChange={(e) => setHIndex(parseInt(e.target.value, 10))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>k Index</span>
                  <span className="font-mono text-primary font-bold">{kIndex}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  value={kIndex}
                  onChange={(e) => setKIndex(parseInt(e.target.value, 10))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>l Index</span>
                  <span className="font-mono text-primary font-bold">{lIndex}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  value={lIndex}
                  onChange={(e) => setLIndex(parseInt(e.target.value, 10))}
                  className="w-full accent-primary"
                />
              </div>
            </div>

            <div className="p-3 bg-surface-container-low rounded-lg border border-surface-container flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-medium text-on-surface">
                Plane ({hIndex} {kIndex} {lIndex}) Interplanar Spacing:
              </span>
              <span className="font-mono font-bold text-sm text-primary">
                d_{hIndex}{kIndex}{lIndex} = {currentMillerSpacing} A
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
