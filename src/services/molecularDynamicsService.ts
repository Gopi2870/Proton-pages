import {
  EnsembleType,
  LatticeStructure,
  ParticleState,
  SimulationTelemetryPoint,
  RadialDistributionPoint,
  MeanSquaredDisplacementPoint,
  MolecularDynamicsPresetSummary,
  MolecularDynamicsRequest,
  MolecularDynamicsResponse,
} from '../types/molecularDynamics';

const API_BASE = '/api/v1/chemistry/dynamics';

export const FALLBACK_MD_PRESETS: MolecularDynamicsPresetSummary[] = [
  {
    id: 'liquid_argon',
    name: 'Liquid Argon at Triple Point',
    state_of_matter: 'Liquid',
    default_ensemble: 'nve_microcanonical',
    target_temperature_k: 84.0,
    density_g_cm3: 1.40,
    description:
      'Classical noble gas liquid near triple point (T=84K, rho=1.40 g/cm³). Displays prominent first and second coordination shells in g(r) at r ≈ 3.7 Å and r ≈ 7.0 Å.',
  },
  {
    id: 'supercritical_argon',
    name: 'Dense Supercritical Argon Fluid',
    state_of_matter: 'Supercritical Fluid',
    default_ensemble: 'nvt_berendsen',
    target_temperature_k: 160.0,
    density_g_cm3: 0.85,
    description:
      'High-temperature supercritical fluid with elevated kinetic energy, rapid particle dispersion, and high virial pressure.',
  },
  {
    id: 'dilute_argon_gas',
    name: 'Dilute Argon Gas',
    state_of_matter: 'Gas',
    default_ensemble: 'nve_microcanonical',
    target_temperature_k: 300.0,
    density_g_cm3: 0.05,
    description:
      'Near-ideal gas behavior. Negligible structural ordering (g(r) ≈ 1.0 for r > sigma) and ballistic/linear MSD trajectories.',
  },
  {
    id: 'argon_crystal',
    name: 'Argon Solid Crystal Lattice',
    state_of_matter: 'Solid',
    default_ensemble: 'nvt_andersen',
    target_temperature_k: 20.0,
    density_g_cm3: 1.65,
    description:
      'Low-temperature solid phase displaying sharp crystalline Bragg-like peaks in the pair distribution function and bounded MSD oscillation.',
  },
  {
    id: 'nanoparticle_cluster',
    name: 'Argon Nanoparticle Cluster in Vacuum',
    state_of_matter: 'Isolated Cluster',
    default_ensemble: 'nve_microcanonical',
    target_temperature_k: 50.0,
    density_g_cm3: 0.40,
    description:
      'Finite cluster of argon atoms illustrating surface tension, evaporation dynamics, and collective breathing vibrational modes.',
  },
];

// Physical constants
const R_KJ_MOL_K = 8.314462618e-3;
const FORCE_TO_ACCEL = 100.0;
const VEL_SQ_TO_KJ_MOL = 0.01;
const VIRIAL_TO_BAR = 16605.3907;
const MASS_ARGON = 39.948;

/** Box volume and length calculated from density and particle count */
export function calculateBoxDimensions(
  numParticles: number,
  densityGPerCm3: number,
  massGPerMol: number = MASS_ARGON
): { volumeAngstrom3: number; boxLength: number } {
  const totalMassG = (numParticles * massGPerMol) / 6.02214076e23;
  const volumeCm3 = totalMassG / Math.max(1e-4, densityGPerCm3);
  const volumeAngstrom3 = volumeCm3 * 1.0e24;
  const boxLength = Math.cbrt(volumeAngstrom3);
  return { volumeAngstrom3, boxLength };
}

/** Arranges particles on an FCC or SC lattice to prevent overlap */
export function initializeParticles(
  numParticles: number,
  boxLength: number,
  lattice: LatticeStructure = 'face_centered_cubic',
  mass: number = MASS_ARGON
): ParticleState[] {
  const particles: ParticleState[] = [];

  if (lattice === 'face_centered_cubic') {
    const m = Math.max(1, Math.ceil(Math.cbrt(numParticles / 4.0)));
    const a = boxLength / m;
    const basis = [
      [0.25, 0.25, 0.25],
      [0.75, 0.75, 0.25],
      [0.75, 0.25, 0.75],
      [0.25, 0.75, 0.75],
    ];

    let count = 0;
    for (let ix = 0; ix < m; ix++) {
      for (let iy = 0; iy < m; iy++) {
        for (let iz = 0; iz < m; iz++) {
          for (const [bx, by, bz] of basis) {
            if (count >= numParticles) break;
            const x = (ix + bx) * a;
            const y = (iy + by) * a;
            const z = (iz + bz) * a;
            particles.push({
              id: count + 1,
              x,
              y,
              z,
              vx: 0,
              vy: 0,
              vz: 0,
              fx: 0,
              fy: 0,
              fz: 0,
              mass,
              speed: 0,
              unwrappedX: x,
              unwrappedY: y,
              unwrappedZ: z,
            });
            count++;
          }
          if (count >= numParticles) break;
        }
        if (count >= numParticles) break;
      }
      if (count >= numParticles) break;
    }
    return particles;
  }

  // Simple Cubic
  const nSide = Math.ceil(Math.cbrt(numParticles));
  const spacing = boxLength / nSide;
  let count = 0;
  for (let ix = 0; ix < nSide; ix++) {
    for (let iy = 0; iy < nSide; iy++) {
      for (let iz = 0; iz < nSide; iz++) {
        if (count >= numParticles) break;
        const x = (ix + 0.5) * spacing;
        const y = (iy + 0.5) * spacing;
        const z = (iz + 0.5) * spacing;
        particles.push({
          id: count + 1,
          x,
          y,
          z,
          vx: 0,
          vy: 0,
          vz: 0,
          fx: 0,
          fy: 0,
          fz: 0,
          mass,
          speed: 0,
          unwrappedX: x,
          unwrappedY: y,
          unwrappedZ: z,
        });
        count++;
      }
      if (count >= numParticles) break;
    }
    if (count >= numParticles) break;
  }
  return particles;
}

// Pseudo-random Gaussian using Box-Muller transform
function sampleGaussian(mean: number, stdDev: number): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return mean + stdDev * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

/** Samples Maxwell-Boltzmann velocities at target T and cancels COM drift */
export function initializeMaxwellBoltzmann(
  particles: ParticleState[],
  targetTemperatureK: number
): void {
  if (particles.length === 0) return;
  const mass = particles[0].mass;
  const sigmaV = Math.sqrt((R_KJ_MOL_K * targetTemperatureK) / (mass * VEL_SQ_TO_KJ_MOL));

  let vcomX = 0;
  let vcomY = 0;
  let vcomZ = 0;

  for (const p of particles) {
    p.vx = sampleGaussian(0, sigmaV);
    p.vy = sampleGaussian(0, sigmaV);
    p.vz = sampleGaussian(0, sigmaV);
    vcomX += p.vx;
    vcomY += p.vy;
    vcomZ += p.vz;
  }

  const n = particles.length;
  vcomX /= n;
  vcomY /= n;
  vcomZ /= n;

  for (const p of particles) {
    p.vx -= vcomX;
    p.vy -= vcomY;
    p.vz -= vcomZ;
  }

  const ek = computeKineticEnergy(particles);
  const currentT = computeTemperature(ek, n);
  if (currentT > 1e-4) {
    const scale = Math.sqrt(targetTemperatureK / currentT);
    for (const p of particles) {
      p.vx *= scale;
      p.vy *= scale;
      p.vz *= scale;
      p.speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy + p.vz * p.vz);
    }
  }
}

/** Computes kinetic energy in kJ/mol */
export function computeKineticEnergy(particles: ParticleState[]): number {
  let sumMv2 = 0;
  for (const p of particles) {
    sumMv2 += p.mass * (p.vx * p.vx + p.vy * p.vy + p.vz * p.vz);
  }
  return 0.5 * sumMv2 * VEL_SQ_TO_KJ_MOL;
}

/** Instantaneous temperature from kinetic energy: T = 2 Ek / (3 (N - 1) R) */
export function computeTemperature(kineticEnergyKjMol: number, numParticles: number): number {
  const dof = Math.max(1, 3 * numParticles - 3);
  return (2.0 * kineticEnergyKjMol) / (dof * R_KJ_MOL_K);
}

/** Virial equation of state pressure in bar */
export function computePressure(
  temperatureK: number,
  virial: number,
  numParticles: number,
  volumeAngstrom3: number
): number {
  if (volumeAngstrom3 <= 0) return 0;
  const idealTerm = numParticles * R_KJ_MOL_K * temperatureK;
  const virialTerm = virial / 3.0;
  return ((idealTerm + virialTerm) / volumeAngstrom3) * VIRIAL_TO_BAR;
}

/** Computes Lennard-Jones (12-6) pair forces and potential with PBC */
export function computeForcesAndPotential(
  particles: ParticleState[],
  boxLength: number,
  sigma: number,
  epsilon: number,
  rc2: number,
  shiftU: number
): { potentialEnergy: number; virial: number } {
  for (const p of particles) {
    p.fx = 0;
    p.fy = 0;
    p.fz = 0;
  }

  let potentialEnergy = 0;
  let virial = 0;
  const n = particles.length;

  for (let i = 0; i < n; i++) {
    const pi = particles[i];
    for (let j = i + 1; j < n; j++) {
      const pj = particles[j];

      let dx = pi.x - pj.x;
      let dy = pi.y - pj.y;
      let dz = pi.z - pj.z;

      // Minimum Image Convention
      dx -= boxLength * Math.round(dx / boxLength);
      dy -= boxLength * Math.round(dy / boxLength);
      dz -= boxLength * Math.round(dz / boxLength);

      const r2 = dx * dx + dy * dy + dz * dz;

      if (r2 < rc2 && r2 > 1e-6) {
        const invR2 = 1.0 / r2;
        const s2 = (sigma * sigma) * invR2;
        const s6 = s2 * s2 * s2;
        const s12 = s6 * s6;

        potentialEnergy += 4.0 * epsilon * (s12 - s6) - shiftU;

        // Force scalar: F_ij = 48 * epsilon / r^2 * (s12 - 0.5 * s6)
        const fScalar = 48.0 * epsilon * invR2 * (s12 - 0.5 * s6);

        const fx = fScalar * dx;
        const fy = fScalar * dy;
        const fz = fScalar * dz;

        pi.fx = (pi.fx ?? 0) + fx;
        pi.fy = (pi.fy ?? 0) + fy;
        pi.fz = (pi.fz ?? 0) + fz;

        pj.fx = (pj.fx ?? 0) - fx;
        pj.fy = (pj.fy ?? 0) - fy;
        pj.fz = (pj.fz ?? 0) - fz;

        virial += fScalar * r2;
      }
    }
  }

  return { potentialEnergy, virial };
}

/** Single step of Velocity-Verlet symplectic integration */
export function stepVelocityVerlet(
  particles: ParticleState[],
  boxLength: number,
  dtPs: number,
  sigma: number,
  epsilon: number,
  rc2: number,
  shiftU: number,
  ensemble: EnsembleType = 'nve_microcanonical',
  targetTempK: number = 84.0,
  tauPs: number = 0.1
): { potentialEnergy: number; virial: number; kineticEnergy: number; temperature: number } {
  // Step 1: Update velocities by half-step and positions by full-step
  for (const p of particles) {
    const ax = ((p.fx ?? 0) * FORCE_TO_ACCEL) / p.mass;
    const ay = ((p.fy ?? 0) * FORCE_TO_ACCEL) / p.mass;
    const az = ((p.fz ?? 0) * FORCE_TO_ACCEL) / p.mass;

    p.vx += 0.5 * ax * dtPs;
    p.vy += 0.5 * ay * dtPs;
    p.vz += 0.5 * az * dtPs;

    const dx = p.vx * dtPs;
    const dy = p.vy * dtPs;
    const dz = p.vz * dtPs;

    p.x += dx;
    p.y += dy;
    p.z += dz;

    p.unwrappedX += dx;
    p.unwrappedY += dy;
    p.unwrappedZ += dz;

    // Periodic Boundary Conditions
    p.x -= boxLength * Math.floor(p.x / boxLength);
    p.y -= boxLength * Math.floor(p.y / boxLength);
    p.z -= boxLength * Math.floor(p.z / boxLength);
  }

  // Step 2: Calculate new forces
  const { potentialEnergy, virial } = computeForcesAndPotential(
    particles,
    boxLength,
    sigma,
    epsilon,
    rc2,
    shiftU
  );

  // Step 3: Complete velocity update by second half-step
  for (const p of particles) {
    const ax = ((p.fx ?? 0) * FORCE_TO_ACCEL) / p.mass;
    const ay = ((p.fy ?? 0) * FORCE_TO_ACCEL) / p.mass;
    const az = ((p.fz ?? 0) * FORCE_TO_ACCEL) / p.mass;

    p.vx += 0.5 * ax * dtPs;
    p.vy += 0.5 * ay * dtPs;
    p.vz += 0.5 * az * dtPs;
    p.speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy + p.vz * p.vz);
  }

  // Step 4: Apply Thermostat
  if (ensemble === 'nvt_berendsen') {
    const ekTemp = computeKineticEnergy(particles);
    const tInst = computeTemperature(ekTemp, particles.length);
    if (tInst > 1e-4 && tauPs > 0) {
      const lambda = Math.sqrt(
        Math.max(0.1, 1.0 + (dtPs / tauPs) * (targetTempK / tInst - 1.0))
      );
      for (const p of particles) {
        p.vx *= lambda;
        p.vy *= lambda;
        p.vz *= lambda;
        p.speed *= lambda;
      }
    }
  } else if (ensemble === 'nvt_andersen') {
    const collisionProb = dtPs / tauPs;
    const sigmaV = Math.sqrt(
      (R_KJ_MOL_K * targetTempK) / (MASS_ARGON * VEL_SQ_TO_KJ_MOL)
    );
    for (const p of particles) {
      if (Math.random() < collisionProb) {
        p.vx = sampleGaussian(0, sigmaV);
        p.vy = sampleGaussian(0, sigmaV);
        p.vz = sampleGaussian(0, sigmaV);
        p.speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy + p.vz * p.vz);
      }
    }
  }

  const kineticEnergy = computeKineticEnergy(particles);
  const temperature = computeTemperature(kineticEnergy, particles.length);

  return { potentialEnergy, virial, kineticEnergy, temperature };
}

/** Executes a full client-side MD simulation */
export function runSimulationClient(req: MolecularDynamicsRequest): MolecularDynamicsResponse {
  const { volumeAngstrom3, boxLength } = calculateBoxDimensions(
    req.num_particles,
    req.density_g_cm3
  );

  const particles = initializeParticles(
    req.num_particles,
    boxLength,
    req.initial_lattice ?? 'face_centered_cubic'
  );

  initializeMaxwellBoltzmann(particles, req.target_temperature_k);

  const dtPs = req.timestep_fs / 1000.0;
  const sigma = req.sigma_angstrom ?? 3.405;
  const epsilon = req.epsilon_kj_mol ?? 0.996;
  const rc = (req.cutoff_radius_sigma ?? 2.5) * sigma;
  const rc2 = rc * rc;
  const shiftU = 4.0 * epsilon * (Math.pow(sigma / rc, 12) - Math.pow(sigma / rc, 6));

  const { potentialEnergy: epInit, virial: virInit } = computeForcesAndPotential(
    particles,
    boxLength,
    sigma,
    epsilon,
    rc2,
    shiftU
  );
  const ekInit = computeKineticEnergy(particles);
  const totalEnergyInitial = ekInit + epInit;

  const telemetry: SimulationTelemetryPoint[] = [];
  const msdCurve: MeanSquaredDisplacementPoint[] = [];

  const initialUnwrapped = particles.map((p) => ({
    x: p.unwrappedX,
    y: p.unwrappedY,
    z: p.unwrappedZ,
  }));

  const numGrBins = 50;
  const grMaxR = Math.min(boxLength / 2.0, 10.0);
  const dr = grMaxR / numGrBins;
  const grHistogram = new Array(numGrBins).fill(0);
  let grSampleCount = 0;

  let tempSum = 0;
  let pressSum = 0;
  let sampleCount = 0;

  for (let step = 0; step <= req.total_steps; step++) {
    const timePs = step * dtPs;
    let ep = epInit;
    let vir = virInit;
    let ek = ekInit;
    let temp = computeTemperature(ekInit, particles.length);

    if (step > 0) {
      const stepRes = stepVelocityVerlet(
        particles,
        boxLength,
        dtPs,
        sigma,
        epsilon,
        rc2,
        shiftU,
        req.ensemble,
        req.target_temperature_k,
        req.thermostat_coupling_ps ?? 0.1
      );
      ep = stepRes.potentialEnergy;
      vir = stepRes.virial;
      ek = stepRes.kineticEnergy;
      temp = stepRes.temperature;
    }

    if (step % req.sampling_interval === 0) {
      const etot = ek + ep;
      const press = computePressure(temp, vir, particles.length, volumeAngstrom3);
      const drift = Math.abs(etot - totalEnergyInitial) / Math.max(1e-4, Math.abs(totalEnergyInitial));

      telemetry.push({
        step,
        time_ps: Number(timePs.toFixed(4)),
        kinetic_energy_kj_mol: Number(ek.toFixed(3)),
        potential_energy_kj_mol: Number(ep.toFixed(3)),
        total_energy_kj_mol: Number(etot.toFixed(3)),
        temperature_k: Number(temp.toFixed(2)),
        pressure_bar: Number(press.toFixed(2)),
        energy_drift_fraction: Number(drift.toFixed(5)),
      });

      // MSD
      let msdSum = 0;
      for (let idx = 0; idx < particles.length; idx++) {
        const p = particles[idx];
        const init = initialUnwrapped[idx];
        msdSum +=
          Math.pow(p.unwrappedX - init.x, 2) +
          Math.pow(p.unwrappedY - init.y, 2) +
          Math.pow(p.unwrappedZ - init.z, 2);
      }
      const msdVal = msdSum / particles.length;
      msdCurve.push({
        time_ps: Number(timePs.toFixed(4)),
        msd_angstrom2: Number(msdVal.toFixed(4)),
      });

      // g(r) accumulation
      if (step >= 10) {
        for (let i = 0; i < particles.length; i++) {
          const pi = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const pj = particles[j];
            let dx = pi.x - pj.x;
            let dy = pi.y - pj.y;
            let dz = pi.z - pj.z;
            dx -= boxLength * Math.round(dx / boxLength);
            dy -= boxLength * Math.round(dy / boxLength);
            dz -= boxLength * Math.round(dz / boxLength);
            const r = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (r < grMaxR && dr > 0) {
              const binIdx = Math.floor(r / dr);
              if (binIdx >= 0 && binIdx < numGrBins) {
                grHistogram[binIdx] += 1;
              }
            }
          }
        }
        grSampleCount++;
      }

      tempSum += temp;
      pressSum += press;
      sampleCount++;
    }
  }

  // g(r) post-processing
  const radialDistribution: RadialDistributionPoint[] = [];
  if (grSampleCount > 0) {
    const numPart = particles.length;
    const densityNum = numPart / volumeAngstrom3;
    for (let bin = 0; bin < numGrBins; bin++) {
      const rMid = (bin + 0.5) * dr;
      const shellVol = 4.0 * Math.PI * rMid * rMid * dr;
      const idealCounts = numPart * densityNum * shellVol * grSampleCount;
      const gR = (2.0 * grHistogram[bin]) / Math.max(1e-6, idealCounts);
      radialDistribution.push({
        r_angstrom: Number(rMid.toFixed(2)),
        g_r: Number(gR.toFixed(4)),
      });
    }
  }

  // Self-diffusion coefficient
  let diffCoefCm2S = 0;
  if (msdCurve.length > 5) {
    const mid = Math.floor(msdCurve.length / 2);
    const tSpan = msdCurve[msdCurve.length - 1].time_ps - msdCurve[mid].time_ps;
    const msdSpan = msdCurve[msdCurve.length - 1].msd_angstrom2 - msdCurve[mid].msd_angstrom2;
    if (tSpan > 0 && msdSpan > 0) {
      const dAng2Ps = msdSpan / (6.0 * tSpan);
      diffCoefCm2S = dAng2Ps * 1.0e-4;
    }
  }

  const avgTemp = sampleCount > 0 ? tempSum / sampleCount : req.target_temperature_k;
  const avgPress = sampleCount > 0 ? pressSum / sampleCount : 1.0;
  const finalTemp = telemetry.length > 0 ? telemetry[telemetry.length - 1].temperature_k : req.target_temperature_k;
  const driftMax = Math.max(...telemetry.map((t) => t.energy_drift_fraction), 0);

  const finalPositions = particles.map((p) => ({
    id: p.id,
    x: Number(p.x.toFixed(3)),
    y: Number(p.y.toFixed(3)),
    z: Number(p.z.toFixed(3)),
    vx: Number(p.vx.toFixed(3)),
    vy: Number(p.vy.toFixed(3)),
    vz: Number(p.vz.toFixed(3)),
    speed: Number(p.speed.toFixed(3)),
  }));

  const summary =
    `Molecular Dynamics simulation completed for ${req.num_particles} Argon atoms in a cubic box (L = ${boxLength.toFixed(2)} Å) ` +
    `under ${req.ensemble}. Initial T = ${req.target_temperature_k} K, Final T = ${finalTemp.toFixed(2)} K, ` +
    `Mean P = ${avgPress.toFixed(1)} bar. Energy conservation drift: ${(driftMax * 100).toFixed(3)}%. ` +
    `Estimated self-diffusion D = ${diffCoefCm2S.toExponential(2)} cm²/s.`;

  return {
    system_name: `Argon ${req.num_particles} Particles (${req.ensemble})`,
    ensemble: req.ensemble,
    num_particles: req.num_particles,
    box_length_angstrom: Number(boxLength.toFixed(3)),
    volume_angstrom3: Number(volumeAngstrom3.toFixed(2)),
    density_g_cm3: req.density_g_cm3,
    timestep_fs: req.timestep_fs,
    total_steps: req.total_steps,
    initial_temperature_k: req.target_temperature_k,
    final_temperature_k: finalTemp,
    average_temperature_k: Number(avgTemp.toFixed(2)),
    average_pressure_bar: Number(avgPress.toFixed(2)),
    energy_conservation_ratio: Number((1.0 - driftMax).toFixed(5)),
    self_diffusion_coefficient_cm2_s: Number(diffCoefCm2S.toPrecision(4)),
    telemetry,
    radial_distribution: radialDistribution,
    msd_curve: msdCurve,
    final_positions: finalPositions,
    pedagogical_summary: summary,
  };
}

export const molecularDynamicsService = {
  async getPresets(): Promise<MolecularDynamicsPresetSummary[]> {
    try {
      const res = await fetch(`${API_BASE}/presets`);
      if (!res.ok) throw new Error('API fetch failed');
      return await res.json();
    } catch {
      return FALLBACK_MD_PRESETS;
    }
  },

  async runSimulation(req: MolecularDynamicsRequest): Promise<MolecularDynamicsResponse> {
    try {
      const res = await fetch(`${API_BASE}/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (!res.ok) throw new Error('Backend simulation failed');
      return await res.json();
    } catch {
      return runSimulationClient(req);
    }
  },
};
