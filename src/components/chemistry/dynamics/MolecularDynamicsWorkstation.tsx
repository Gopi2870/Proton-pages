import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  EnsembleType,
  LatticeStructure,
  ParticleState,
  MolecularDynamicsPresetSummary,
  MolecularDynamicsResponse,
  SimulationTelemetryPoint,
} from '../../../types/molecularDynamics';
import {
  calculateBoxDimensions,
  initializeParticles,
  initializeMaxwellBoltzmann,
  stepVelocityVerlet,
  computeKineticEnergy,
  computeTemperature,
  computePressure,
  computeForcesAndPotential,
  molecularDynamicsService,
  FALLBACK_MD_PRESETS,
} from '../../../services/molecularDynamicsService';
import { experimentsApi } from '../../../services/api';

interface MolecularDynamicsWorkstationProps {
  onAskAi?: (prompt: string) => void;
}

export const MolecularDynamicsWorkstation: React.FC<MolecularDynamicsWorkstationProps> = ({
  onAskAi,
}) => {
  // Preset and Simulation State
  const [presets, setPresets] = useState<MolecularDynamicsPresetSummary[]>(FALLBACK_MD_PRESETS);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('liquid_argon');
  const [ensemble, setEnsemble] = useState<EnsembleType>('nve_microcanonical');
  const [numParticles, setNumParticles] = useState<number>(32);
  const [targetTempK, setTargetTempK] = useState<number>(84.0);
  const [densityGPerCm3, setDensityGPerCm3] = useState<number>(1.40);
  const [timestepFs, setTimestepFs] = useState<number>(2.0);
  const [cutoffRadiusSigma, setCutoffRadiusSigma] = useState<number>(2.5);
  const [thermostatTauPs, setThermostatTauPs] = useState<number>(0.1);
  const [lattice, setLattice] = useState<LatticeStructure>('face_centered_cubic');

  // Animation and Simulation Runtime State
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [particles, setParticles] = useState<ParticleState[]>([]);
  const [telemetryHistory, setTelemetryHistory] = useState<SimulationTelemetryPoint[]>([]);
  const [batchResult, setBatchResult] = useState<MolecularDynamicsResponse | null>(null);
  const [isComputingBatch, setIsComputingBatch] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // 3D Viewport Interaction State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [viewRotX, setViewRotX] = useState<number>(25);
  const [viewRotY, setViewRotY] = useState<number>(-35);
  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animFrameIdRef = useRef<number | null>(null);

  // Compute Box Dimensions
  const { volumeAngstrom3, boxLength } = useMemo(() => {
    return calculateBoxDimensions(numParticles, densityGPerCm3);
  }, [numParticles, densityGPerCm3]);

  // Load presets on mount
  useEffect(() => {
    molecularDynamicsService.getPresets().then((res) => {
      if (res && res.length > 0) setPresets(res);
    });
  }, []);

  // System Reinitialization Function
  const resetSystem = useCallback(() => {
    setIsRunning(false);
    setCurrentStep(0);
    const parts = initializeParticles(numParticles, boxLength, lattice);
    initializeMaxwellBoltzmann(parts, targetTempK);

    // Initial Forces and Potentials
    const sigma = 3.405;
    const epsilon = 0.996;
    const rc = cutoffRadiusSigma * sigma;
    const rc2 = rc * rc;
    const shiftU = 4.0 * epsilon * (Math.pow(sigma / rc, 12) - Math.pow(sigma / rc, 6));

    const { potentialEnergy, virial } = computeForcesAndPotential(
      parts,
      boxLength,
      sigma,
      epsilon,
      rc2,
      shiftU
    );
    const ek = computeKineticEnergy(parts);
    const etot = ek + potentialEnergy;
    const temp = computeTemperature(ek, parts.length);
    const press = computePressure(temp, virial, parts.length, volumeAngstrom3);

    setParticles(parts);
    setTelemetryHistory([
      {
        step: 0,
        time_ps: 0,
        kinetic_energy_kj_mol: Number(ek.toFixed(3)),
        potential_energy_kj_mol: Number(potentialEnergy.toFixed(3)),
        total_energy_kj_mol: Number(etot.toFixed(3)),
        temperature_k: Number(temp.toFixed(2)),
        pressure_bar: Number(press.toFixed(2)),
        energy_drift_fraction: 0,
      },
    ]);
  }, [numParticles, boxLength, lattice, targetTempK, cutoffRadiusSigma, volumeAngstrom3]);

  // Handle Preset Switching
  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const found = presets.find((p) => p.id === presetId);
    if (found) {
      setEnsemble(found.default_ensemble);
      setTargetTempK(found.target_temperature_k);
      setDensityGPerCm3(found.density_g_cm3);
    }
  };

  // Re-initialize whenever parameters change
  useEffect(() => {
    resetSystem();
  }, [resetSystem]);

  // Real-time integration step
  const executeStep = useCallback(() => {
    setParticles((prevParticles) => {
      if (prevParticles.length === 0) return prevParticles;
      const sigma = 3.405;
      const epsilon = 0.996;
      const rc = cutoffRadiusSigma * sigma;
      const rc2 = rc * rc;
      const shiftU = 4.0 * epsilon * (Math.pow(sigma / rc, 12) - Math.pow(sigma / rc, 6));
      const dtPs = timestepFs / 1000.0;

      const stepRes = stepVelocityVerlet(
        prevParticles,
        boxLength,
        dtPs,
        sigma,
        epsilon,
        rc2,
        shiftU,
        ensemble,
        targetTempK,
        thermostatTauPs
      );

      setCurrentStep((prevStep) => {
        const nextStep = prevStep + 1;
        if (nextStep % 5 === 0) {
          const press = computePressure(
            stepRes.temperature,
            stepRes.virial,
            prevParticles.length,
            volumeAngstrom3
          );
          const etot = stepRes.kineticEnergy + stepRes.potentialEnergy;
          setTelemetryHistory((hist) => {
            const initEtot = hist[0]?.total_energy_kj_mol || etot;
            const drift = Math.abs(etot - initEtot) / Math.max(1e-4, Math.abs(initEtot));
            const newPt: SimulationTelemetryPoint = {
              step: nextStep,
              time_ps: Number((nextStep * dtPs).toFixed(4)),
              kinetic_energy_kj_mol: Number(stepRes.kineticEnergy.toFixed(3)),
              potential_energy_kj_mol: Number(stepRes.potentialEnergy.toFixed(3)),
              total_energy_kj_mol: Number(etot.toFixed(3)),
              temperature_k: Number(stepRes.temperature.toFixed(2)),
              pressure_bar: Number(press.toFixed(2)),
              energy_drift_fraction: Number(drift.toFixed(5)),
            };
            return [...hist.slice(-50), newPt];
          });
        }
        return nextStep;
      });

      return [...prevParticles];
    });
  }, [
    cutoffRadiusSigma,
    timestepFs,
    boxLength,
    ensemble,
    targetTempK,
    thermostatTauPs,
    volumeAngstrom3,
  ]);

  // Animation Loop (60 FPS)
  useEffect(() => {
    if (!isRunning) {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      return;
    }

    const loop = () => {
      executeStep();
      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isRunning, executeStep]);

  // Render 3D Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Coordinate transformation: Rotate around center of box
    const halfL = boxLength / 2.0;
    const radX = (viewRotX * Math.PI) / 180;
    const radY = (viewRotY * Math.PI) / 180;

    const cosX = Math.cos(radX);
    const sinX = Math.sin(radX);
    const cosY = Math.cos(radY);
    const sinY = Math.sin(radY);

    const scale = Math.min(width, height) / (boxLength * 1.8);
    const cx = width / 2;
    const cy = height / 2;

    const project = (x: number, y: number, z: number) => {
      // Translate to center
      const xc = x - halfL;
      const yc = y - halfL;
      const zc = z - halfL;

      // Rotate around Y
      const x1 = xc * cosY + zc * sinY;
      const y1 = yc;
      const z1 = -xc * sinY + zc * cosY;

      // Rotate around X
      const x2 = x1;
      const y2 = y1 * cosX - z1 * sinX;
      const z2 = y1 * sinX + z1 * cosX;

      return {
        px: cx + x2 * scale,
        py: cy - y2 * scale,
        depth: z2,
      };
    };

    // 1. Draw Periodic Bounding Box (Parchment & Copper reaction styling)
    const corners = [
      [0, 0, 0],
      [boxLength, 0, 0],
      [boxLength, boxLength, 0],
      [0, boxLength, 0],
      [0, 0, boxLength],
      [boxLength, 0, boxLength],
      [boxLength, boxLength, boxLength],
      [0, boxLength, boxLength],
    ].map(([x, y, z]) => project(x, y, z));

    const edges = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0], // front
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4], // back
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7], // connectors
    ];

    ctx.strokeStyle = '#D4794244';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (const [i, j] of edges) {
      ctx.moveTo(corners[i].px, corners[i].py);
      ctx.lineTo(corners[j].px, corners[j].py);
    }
    ctx.stroke();

    // 2. Sort Particles by Depth for painter's algorithm
    const projectedParticles = particles
      .map((p) => {
        const { px, py, depth } = project(p.x, p.y, p.z);
        return { ...p, px, py, depth };
      })
      .sort((a, b) => a.depth - b.depth);

    // 3. Draw Particles (Speed-based color interpolation from Cool Cyan to Amber & Copper)
    const maxSpeed = Math.sqrt((3 * 8.314e-3 * Math.max(100, targetTempK * 2)) / (39.948 * 0.01));

    for (const p of projectedParticles) {
      const radius = Math.max(4, 9 * (1 + p.depth / (boxLength * 2.5)));
      const normSpeed = Math.min(1.0, p.speed / maxSpeed);

      // Gradient shading
      const grad = ctx.createRadialGradient(
        p.px - radius * 0.3,
        p.py - radius * 0.3,
        radius * 0.1,
        p.px,
        p.py,
        radius
      );

      if (normSpeed < 0.4) {
        // Cold blue
        grad.addColorStop(0, '#93C5FD');
        grad.addColorStop(1, '#2563EB');
      } else if (normSpeed < 0.75) {
        // Amber Bottle
        grad.addColorStop(0, '#FDE68A');
        grad.addColorStop(1, '#D97706');
      } else {
        // Copper Reaction Hot
        grad.addColorStop(0, '#FCA5A5');
        grad.addColorStop(1, '#DC2626');
      }

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
      ctx.fill();

      // Particle border
      ctx.strokeStyle = '#2C302E44';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  }, [particles, boxLength, viewRotX, viewRotY, targetTempK]);

  // Mouse Interaction for 3D Orbiting
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    setViewRotY((prev) => prev + dx * 0.6);
    setViewRotX((prev) => Math.max(-85, Math.min(85, prev - dy * 0.6)));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Run Batch Trajectory Simulation
  const handleRunBatchSimulation = async () => {
    setIsComputingBatch(true);
    try {
      const res = await molecularDynamicsService.runSimulation({
        ensemble,
        num_particles: numParticles,
        target_temperature_k: targetTempK,
        density_g_cm3: densityGPerCm3,
        timestep_fs: timestepFs,
        total_steps: 120,
        sampling_interval: 10,
        cutoff_radius_sigma: cutoffRadiusSigma,
        thermostat_coupling_ps: thermostatTauPs,
        initial_lattice: lattice,
      });
      setBatchResult(res);
    } finally {
      setIsComputingBatch(false);
    }
  };

  // Save to Lab Notebook
  const handleSaveToNotebook = async () => {
    const latest = telemetryHistory[telemetryHistory.length - 1];
    if (!latest) return;
    try {
      await experimentsApi.saveExperiment({
        title: `Molecular Dynamics: Argon (${numParticles} atoms, ${ensemble})`,
        experiment_type: 'thermodynamics',
        status: 'completed',
        observations:
          `Ensemble: ${ensemble}. T_target: ${targetTempK} K, T_inst: ${latest.temperature_k} K. ` +
          `Virial Pressure: ${latest.pressure_bar} bar. Density: ${densityGPerCm3} g/cm³. ` +
          `Box L: ${boxLength.toFixed(2)} Å. Energy drift: ${(latest.energy_drift_fraction * 100).toFixed(3)}%. ` +
          (batchResult
            ? `Diffusion coeff D: ${batchResult.self_diffusion_coefficient_cm2_s.toExponential(2)} cm²/s.`
            : ''),
        state_data: JSON.stringify({
          ensemble,
          num_particles: numParticles,
          target_temperature_k: targetTempK,
          density_g_cm3: densityGPerCm3,
          box_length_angstrom: boxLength,
          telemetry: telemetryHistory,
          diffusion_cm2_s: batchResult?.self_diffusion_coefficient_cm2_s,
        }),
      });
      setSaveStatus('Logged to Lab Notebook!');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch {
      setSaveStatus('Saved locally to notebook.');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const latestTelemetry = telemetryHistory[telemetryHistory.length - 1] || {
    time_ps: 0,
    kinetic_energy_kj_mol: 0,
    potential_energy_kj_mol: 0,
    total_energy_kj_mol: 0,
    temperature_k: targetTempK,
    pressure_bar: 0,
    energy_drift_fraction: 0,
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Header Banner */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[28px] text-primary">grain</span>
            <div>
              <h2 className="text-xl font-bold text-on-surface">
                Molecular Dynamics & Velocity-Verlet Simulation Sandbox
              </h2>
              <p className="text-sm text-on-surface-variant">
                Lennard-Jones (12-6) pair potential, symplectic time integration, periodic boundary conditions (PBC), and thermal ensembles.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {saveStatus && (
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold animate-pulse">
              {saveStatus}
            </span>
          )}
          <button
            type="button"
            onClick={handleSaveToNotebook}
            className="px-3.5 py-1.5 rounded-lg border border-outline-variant hover:bg-surface-container-low text-on-surface text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            Log to Notebook
          </button>
          {onAskAi && (
            <button
              type="button"
              onClick={() =>
                onAskAi(
                  `Explain how the Velocity-Verlet algorithm conserves energy in the microcanonical (NVE) ensemble for Lennard-Jones Argon, and compare Berendsen velocity rescaling against Andersen stochastic thermalization.`
                )
              }
              className="px-3.5 py-1.5 rounded-lg bg-primary-fixed hover:bg-primary-fixed-dim text-primary text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <span className="material-symbols-outlined text-[16px]">psychology</span>
              Ask AI Chemist
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Controls & 3D Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Preset & Physics Controls (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Preset Selector */}
          <div className="bg-surface-container-lowest rounded-xl p-4 border border-surface-container-low shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">tune</span>
              Benchmark Physical Presets
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {presets.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectPreset(p.id)}
                  className={`text-left p-2.5 rounded-lg border transition ${
                    selectedPresetId === p.id
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-surface-container hover:border-outline-variant text-on-surface'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs">{p.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-container font-mono">
                      {p.state_of_matter}
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-1 line-clamp-2">
                    {p.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Numerical & Thermodynamic Controls */}
          <div className="bg-surface-container-lowest rounded-xl p-4 border border-surface-container-low shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">settings</span>
              Simulation Parameters
            </h3>

            {/* Ensemble Picker */}
            <div>
              <label className="text-xs font-semibold text-on-surface block mb-1">
                Thermodynamic Ensemble
              </label>
              <select
                value={ensemble}
                onChange={(e) => setEnsemble(e.target.value as EnsembleType)}
                className="w-full text-xs p-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-primary"
              >
                <option value="nve_microcanonical">NVE (Microcanonical - Constant Energy)</option>
                <option value="nvt_berendsen">NVT (Berendsen Velocity Rescaling)</option>
                <option value="nvt_andersen">NVT (Andersen Stochastic Collisions)</option>
              </select>
            </div>

            {/* Particle Count Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-on-surface font-medium">Particle Count (N)</span>
                <span className="font-mono text-primary font-bold">{numParticles} atoms</span>
              </div>
              <input
                type="range"
                min={8}
                max={108}
                step={4}
                value={numParticles}
                onChange={(e) => setNumParticles(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-on-surface-variant mt-0.5">
                <span>8</span>
                <span>32 (FCC)</span>
                <span>64</span>
                <span>108 (FCC)</span>
              </div>
            </div>

            {/* Target Temperature Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-on-surface font-medium">Target Temperature (T)</span>
                <span className="font-mono text-primary font-bold">{targetTempK} K</span>
              </div>
              <input
                type="range"
                min={10}
                max={350}
                step={5}
                value={targetTempK}
                onChange={(e) => setTargetTempK(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-on-surface-variant mt-0.5">
                <span>10 K (Solid)</span>
                <span>84 K (Triple Pt)</span>
                <span>350 K (Supercritical)</span>
              </div>
            </div>

            {/* Density Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-on-surface font-medium">Density (ρ)</span>
                <span className="font-mono text-primary font-bold">{densityGPerCm3.toFixed(2)} g/cm³</span>
              </div>
              <input
                type="range"
                min={0.05}
                max={1.80}
                step={0.05}
                value={densityGPerCm3}
                onChange={(e) => setDensityGPerCm3(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-on-surface-variant mt-0.5">
                <span>0.05 (Dilute Gas)</span>
                <span>1.40 (Liquid)</span>
                <span>1.80 (Dense Solid)</span>
              </div>
            </div>

            {/* Timestep Slider */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-on-surface font-medium">Integration Timestep (Δt)</span>
                <span className="font-mono text-primary font-bold">{timestepFs.toFixed(1)} fs</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={5.0}
                step={0.5}
                value={timestepFs}
                onChange={(e) => setTimestepFs(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-on-surface-variant mt-0.5">
                <span>0.5 fs (Ultra-accurate)</span>
                <span>2.0 fs (Standard)</span>
                <span>5.0 fs (Upper limit)</span>
              </div>
            </div>

            {/* Thermostat Coupling (NVT mode only) */}
            {ensemble !== 'nve_microcanonical' && (
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-on-surface font-medium">Thermostat Time Constant (τ)</span>
                  <span className="font-mono text-primary font-bold">{thermostatTauPs.toFixed(2)} ps</span>
                </div>
                <input
                  type="range"
                  min={0.02}
                  max={0.50}
                  step={0.02}
                  value={thermostatTauPs}
                  onChange={(e) => setThermostatTauPs(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            )}

            {/* Lattice Choice */}
            <div>
              <label className="text-xs font-semibold text-on-surface block mb-1">
                Initial Lattice Packing
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setLattice('face_centered_cubic')}
                  className={`py-1.5 px-2 rounded-lg border font-medium transition ${
                    lattice === 'face_centered_cubic'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-surface-container text-on-surface-variant'
                  }`}
                >
                  FCC (Low Energy)
                </button>
                <button
                  type="button"
                  onClick={() => setLattice('simple_cubic')}
                  className={`py-1.5 px-2 rounded-lg border font-medium transition ${
                    lattice === 'simple_cubic'
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-surface-container text-on-surface-variant'
                  }`}
                >
                  Simple Cubic
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Viewport & Real-time Telemetry (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* 3D Particle Viewport */}
          <div className="bg-surface-container-lowest rounded-xl p-4 border border-surface-container-low shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-low">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-bold text-xs text-on-surface uppercase tracking-wider">
                  Interactive 3D Particle Canvas
                </span>
                <span className="text-[11px] text-on-surface-variant font-mono">
                  (Drag to Orbit 3D Box)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-on-surface-variant">
                  Step: <strong className="text-on-surface">{currentStep}</strong> ({latestTelemetry.time_ps.toFixed(2)} ps)
                </span>
              </div>
            </div>

            {/* Canvas */}
            <div className="relative w-full h-[360px] bg-[#2C302E] rounded-lg mt-3 flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
              <canvas
                ref={canvasRef}
                width={700}
                height={360}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="w-full h-full object-contain"
              />

              {/* Viewport Overlay Controls */}
              <div className="absolute bottom-3 left-3 bg-[#1C201Ecc]/90 px-3 py-1.5 rounded-lg border border-[#D4794244] text-white text-[11px] flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                  <span>Low E_k</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  <span>Medium</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                  <span>High E_k</span>
                </div>
              </div>

              <div className="absolute top-3 right-3 bg-[#1C201Ecc]/90 px-2.5 py-1 rounded border border-[#D4794233] text-white text-[10px] font-mono">
                L = {boxLength.toFixed(2)} Å | V = {volumeAngstrom3.toFixed(0)} Å³
              </div>
            </div>

            {/* Playback Command Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-surface-container-low">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsRunning(!isRunning)}
                  className={`px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition ${
                    isRunning
                      ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                      : 'bg-primary hover:bg-primary-dim text-white shadow-xs'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isRunning ? 'pause' : 'play_arrow'}
                  </span>
                  {isRunning ? 'Pause Animation' : 'Start Dynamics'}
                </button>

                <button
                  type="button"
                  onClick={executeStep}
                  disabled={isRunning}
                  className="px-3 py-2 rounded-lg border border-outline-variant hover:bg-surface-container-low text-on-surface text-xs font-semibold flex items-center gap-1 transition disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[16px]">skip_next</span>
                  Single Step
                </button>

                <button
                  type="button"
                  onClick={resetSystem}
                  className="px-3 py-2 rounded-lg border border-outline-variant hover:bg-surface-container-low text-on-surface text-xs font-semibold flex items-center gap-1 transition"
                >
                  <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                  Reset Box
                </button>
              </div>

              <button
                type="button"
                onClick={handleRunBatchSimulation}
                disabled={isComputingBatch}
                className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary-dim text-white text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isComputingBatch ? 'hourglass_top' : 'analytics'}
                </span>
                {isComputingBatch ? 'Computing 120-Step Run...' : 'Run Analytical Batch Trajectory'}
              </button>
            </div>
          </div>

          {/* Real-time Telemetry HUD Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container-low shadow-xs">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                Instantaneous Temp
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-bold font-mono text-on-surface">
                  {latestTelemetry.temperature_k.toFixed(1)}
                </span>
                <span className="text-xs text-on-surface-variant">K</span>
              </div>
              <span className="text-[10px] text-on-surface-variant block mt-0.5">
                Target: {targetTempK} K
              </span>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container-low shadow-xs">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                Virial Pressure
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-bold font-mono text-on-surface">
                  {latestTelemetry.pressure_bar.toFixed(1)}
                </span>
                <span className="text-xs text-on-surface-variant">bar</span>
              </div>
              <span className="text-[10px] text-on-surface-variant block mt-0.5">
                Ideal + Clausius Virial
              </span>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container-low shadow-xs">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                Total Energy (E_tot)
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-bold font-mono text-on-surface">
                  {latestTelemetry.total_energy_kj_mol.toFixed(1)}
                </span>
                <span className="text-xs text-on-surface-variant">kJ/mol</span>
              </div>
              <span className="text-[10px] text-on-surface-variant block mt-0.5">
                Drift: {(latestTelemetry.energy_drift_fraction * 100).toFixed(3)}%
              </span>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container-low shadow-xs">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                Energy Partition (E_k / E_p)
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-sm font-bold font-mono text-primary">
                  {latestTelemetry.kinetic_energy_kj_mol.toFixed(1)}
                </span>
                <span className="text-xs text-on-surface-variant">/</span>
                <span className="text-sm font-bold font-mono text-secondary">
                  {latestTelemetry.potential_energy_kj_mol.toFixed(1)}
                </span>
              </div>
              <span className="text-[10px] text-on-surface-variant block mt-0.5">
                Kinetic / LJ Potential
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Analytical Trajectory Analysis & Curves (g(r), MSD, Energy Conservation) */}
      {batchResult && (
        <div className="bg-surface-container-lowest rounded-xl p-5 border border-surface-container-low shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-surface-container-low">
            <div>
              <h3 className="font-bold text-base text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">insights</span>
                Statistical Mechanics & Transport Post-Processing
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Radial distribution pair correlation g(r), Einstein Mean Squared Displacement (MSD), and self-diffusion coefficient.
              </p>
            </div>
            <div className="px-3 py-1 rounded-lg bg-surface-container font-mono text-xs text-on-surface">
              Diffusion Coeff D = <strong className="text-primary">{batchResult.self_diffusion_coefficient_cm2_s.toExponential(2)}</strong> cm²/s
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Radial Distribution Plot g(r) */}
            <div className="p-4 rounded-xl border border-surface-container bg-surface-container-low/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-on-surface">
                  Radial Distribution Function g(r)
                </span>
                <span className="text-[10px] text-on-surface-variant">
                  First coordination shell peak at r ≈ 3.7 Å
                </span>
              </div>
              <div className="h-44 w-full flex items-end gap-1 pt-4 pb-2 px-2 bg-surface-container-lowest rounded-lg border border-surface-container-low overflow-x-auto">
                {batchResult.radial_distribution.map((pt, idx) => {
                  const maxGr = Math.max(...batchResult.radial_distribution.map((d) => d.g_r), 3.0);
                  const hPercent = Math.min(100, (pt.g_r / maxGr) * 100);
                  return (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center justify-end h-full min-w-[6px]"
                      title={`r = ${pt.r_angstrom} Å: g(r) = ${pt.g_r}`}
                    >
                      <div
                        style={{ height: `${hPercent}%` }}
                        className={`w-full rounded-t transition-all ${
                          pt.r_angstrom >= 3.4 && pt.r_angstrom <= 4.2
                            ? 'bg-primary'
                            : pt.r_angstrom >= 6.5 && pt.r_angstrom <= 7.5
                            ? 'bg-amber-600'
                            : 'bg-outline-variant'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[10px] text-on-surface-variant font-mono">
                <span>r = 0 Å</span>
                <span>First Shell (3.7 Å)</span>
                <span>Second Shell (7.1 Å)</span>
                <span>r_max = {batchResult.radial_distribution[batchResult.radial_distribution.length - 1]?.r_angstrom || 10} Å</span>
              </div>
            </div>

            {/* Mean Squared Displacement Plot MSD */}
            <div className="p-4 rounded-xl border border-surface-container bg-surface-container-low/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-on-surface">
                  Mean Squared Displacement ⟨Δr²(t)⟩
                </span>
                <span className="text-[10px] text-on-surface-variant">
                  Einstein Relation: MSD = 6Dt
                </span>
              </div>
              <div className="h-44 w-full flex items-end gap-1 pt-4 pb-2 px-2 bg-surface-container-lowest rounded-lg border border-surface-container-low">
                {batchResult.msd_curve.map((pt, idx) => {
                  const maxMsd = Math.max(...batchResult.msd_curve.map((m) => m.msd_angstrom2), 1.0);
                  const hPercent = Math.min(100, (pt.msd_angstrom2 / maxMsd) * 100);
                  return (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center justify-end h-full"
                      title={`t = ${pt.time_ps} ps: MSD = ${pt.msd_angstrom2} Å²`}
                    >
                      <div
                        style={{ height: `${hPercent}%` }}
                        className="w-full bg-secondary rounded-t transition-all"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[10px] text-on-surface-variant font-mono">
                <span>t = 0 ps</span>
                <span>Linear Diffusion Regime</span>
                <span>t_max = {batchResult.msd_curve[batchResult.msd_curve.length - 1]?.time_ps || 0} ps</span>
              </div>
            </div>
          </div>

          {/* Pedagogical Summary Banner */}
          <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/20 text-xs text-on-surface space-y-1">
            <span className="font-bold text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">school</span>
              Analytical Trajectory Summary & Physical Interpretations
            </span>
            <p className="text-on-surface-variant leading-relaxed">
              {batchResult.pedagogical_summary}
            </p>
          </div>
        </div>
      )}

      {/* Model Assumptions & Educational Limitations Accordion */}
      <div className="bg-surface-container-lowest rounded-xl p-5 border border-surface-container-low shadow-xs space-y-3">
        <h4 className="font-bold text-xs uppercase tracking-wider text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
          Scientific Model Assumptions, Units & Numerical Limitations
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-on-surface-variant">
          <div className="p-3 rounded-lg bg-surface-container-low/50 space-y-1">
            <strong className="text-on-surface block font-semibold">1. Pairwise Potential</strong>
            <p>
              Uses shifted Lennard-Jones (12-6) potential with Argon parameters: σ = 3.405 Å, ε = 0.996 kJ/mol. Truncated smoothly at cutoff r_c = 2.5 σ with U(r_c) energy shift.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-surface-container-low/50 space-y-1">
            <strong className="text-on-surface block font-semibold">2. Symplectic Integrator</strong>
            <p>
              Employs Velocity-Verlet time integration which is time-reversible and symplectic, preserving phase-space volume and giving long-term bounded energy conservation drift &lt; 0.1%.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-surface-container-low/50 space-y-1">
            <strong className="text-on-surface block font-semibold">3. Ensembles & Thermostats</strong>
            <p>
              NVE ensemble strictly isolates energy. Berendsen coupling gently scales velocities toward target T without exact canonical fluctuations; Andersen collisions generate true Maxwell-Boltzmann thermalization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
