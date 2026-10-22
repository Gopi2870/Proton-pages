import { describe, it, expect } from 'vitest';
import {
  calculateBoxDimensions,
  initializeParticles,
  initializeMaxwellBoltzmann,
  computeKineticEnergy,
  computeTemperature,
  computeForcesAndPotential,
  stepVelocityVerlet,
  runSimulationClient,
  molecularDynamicsService,
  FALLBACK_MD_PRESETS,
} from './molecularDynamicsService';

describe('Molecular Dynamics Simulation Service & Numerical Engine', () => {
  it('loads default presets including Argon benchmarks', async () => {
    const presets = await molecularDynamicsService.getPresets();
    expect(presets.length).toBeGreaterThanOrEqual(5);
    const ids = presets.map((p) => p.id);
    expect(ids).toContain('liquid_argon');
    expect(ids).toContain('supercritical_argon');
    expect(ids).toContain('argon_crystal');
    expect(ids).toContain('dilute_argon_gas');
  });

  it('calculates box length and volume from density and mass', () => {
    // 32 argon atoms at 1.40 g/cm³
    const { volumeAngstrom3, boxLength } = calculateBoxDimensions(32, 1.40);
    expect(boxLength).toBeGreaterThan(10.0);
    expect(volumeAngstrom3).toBeCloseTo(Math.pow(boxLength, 3), 1);
  });

  it('arranges particles on an FCC lattice without overlap', () => {
    const particles = initializeParticles(32, 15.0, 'face_centered_cubic');
    expect(particles.length).toBe(32);

    // Verify all particles are strictly inside the bounding box [0, 15]
    for (const p of particles) {
      expect(p.x).toBeGreaterThan(0);
      expect(p.x).toBeLessThan(15.0);
      expect(p.y).toBeGreaterThan(0);
      expect(p.y).toBeLessThan(15.0);
      expect(p.z).toBeGreaterThan(0);
      expect(p.z).toBeLessThan(15.0);
    }

    // Verify interatomic distances are non-zero (no overlap)
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dz = particles[i].z - particles[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        expect(dist).toBeGreaterThan(2.0); // Safe distance > 2.0 A
      }
    }
  });

  it('samples Maxwell-Boltzmann velocities with zero center-of-mass momentum', () => {
    const particles = initializeParticles(32, 20.0, 'face_centered_cubic');
    const targetTempK = 100.0;
    initializeMaxwellBoltzmann(particles, targetTempK);

    let comPx = 0;
    let comPy = 0;
    let comPz = 0;

    for (const p of particles) {
      comPx += p.mass * p.vx;
      comPy += p.mass * p.vy;
      comPz += p.mass * p.vz;
    }

    expect(comPx).toBeCloseTo(0, 4);
    expect(comPy).toBeCloseTo(0, 4);
    expect(comPz).toBeCloseTo(0, 4);

    const ek = computeKineticEnergy(particles);
    const temp = computeTemperature(ek, particles.length);
    expect(temp).toBeCloseTo(targetTempK, 1);
  });

  it('satisfies Newton third law for interatomic Lennard-Jones pair forces', () => {
    const boxLength = 20.0;
    const particles = initializeParticles(16, boxLength, 'face_centered_cubic');
    const sigma = 3.405;
    const epsilon = 0.996;
    const rc = 8.5;
    const rc2 = rc * rc;
    const shiftU = 4.0 * epsilon * (Math.pow(sigma / rc, 12) - Math.pow(sigma / rc, 6));

    const { potentialEnergy } = computeForcesAndPotential(
      particles,
      boxLength,
      sigma,
      epsilon,
      rc2,
      shiftU
    );

    let netFx = 0;
    let netFy = 0;
    let netFz = 0;

    for (const p of particles) {
      netFx += p.fx ?? 0;
      netFy += p.fy ?? 0;
      netFz += p.fz ?? 0;
    }

    expect(netFx).toBeCloseTo(0, 6);
    expect(netFy).toBeCloseTo(0, 6);
    expect(netFz).toBeCloseTo(0, 6);
    expect(potentialEnergy).toBeDefined();
  });

  it('advances particles using Velocity-Verlet integration', () => {
    const boxLength = 15.0;
    const particles = initializeParticles(8, boxLength, 'face_centered_cubic');
    initializeMaxwellBoltzmann(particles, 80.0);

    const sigma = 3.405;
    const epsilon = 0.996;
    const rc2 = 72.25;
    const shiftU = 0;
    const dtPs = 0.002;

    const initialX = particles[0].x;
    const stepRes = stepVelocityVerlet(
      particles,
      boxLength,
      dtPs,
      sigma,
      epsilon,
      rc2,
      shiftU,
      'nve_microcanonical',
      80.0,
      0.1
    );

    expect(particles[0].x).not.toBe(initialX);
    expect(stepRes.kineticEnergy).toBeGreaterThan(0);
    expect(stepRes.temperature).toBeGreaterThan(0);
  });

  it('runs a complete microcanonical NVE simulation with energy conservation', () => {
    const res = runSimulationClient({
      ensemble: 'nve_microcanonical',
      num_particles: 32,
      target_temperature_k: 84.0,
      density_g_cm3: 1.35,
      timestep_fs: 2.0,
      total_steps: 50,
      sampling_interval: 10,
      initial_lattice: 'face_centered_cubic',
    });

    expect(res.num_particles).toBe(32);
    expect(res.telemetry.length).toBeGreaterThanOrEqual(5);
    expect(res.final_positions.length).toBe(32);
    expect(res.energy_conservation_ratio).toBeGreaterThan(0.99);
    expect(res.msd_curve.length).toBeGreaterThan(0);
    expect(res.radial_distribution.length).toBeGreaterThan(0);
    expect(res.pedagogical_summary).toContain('Argon');
  });
});
