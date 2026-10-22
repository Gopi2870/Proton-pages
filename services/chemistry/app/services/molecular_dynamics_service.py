"""Scientific Molecular Dynamics Simulation Engine (PR #036).

Implements Lennard-Jones (12-6) pair potential, Velocity-Verlet symplectic integrator,
cubic periodic boundary conditions (PBC) with minimum image convention,
NVE microcanonical and NVT (Andersen/Berendsen) canonical ensembles,
radial distribution function g(r), and Einstein MSD diffusion.
"""

import math
import random
from typing import Dict, List, Optional, Tuple
from app.models.molecular_dynamics import (
    Particle,
    EnsembleType,
    LatticeStructure,
    SimulationTelemetryStep,
    RadialDistributionPoint,
    MeanSquaredDisplacementPoint,
    MolecularDynamicsResult,
)
from app.schemas.molecular_dynamics import MolecularDynamicsRequest


class MolecularDynamicsEngine:
    """Rigorous molecular dynamics simulation engine."""

    # Gas constant R in kJ/(mol*K)
    R_KJ_MOL_K: float = 8.314462618e-3
    # Conversion constant from (kJ/(mol*Angstrom)) / (g/mol) to Angstrom/ps^2
    FORCE_TO_ACCEL: float = 100.0
    # Conversion constant from (g/mol * (Angstrom/ps)^2) to kJ/mol
    VEL_SQ_TO_KJ_MOL: float = 0.01
    # Virial pressure conversion factor (kJ/mol / Angstrom^3 to bar)
    VIRIAL_TO_BAR: float = 16605.3907

    @classmethod
    def run_simulation(cls, req: MolecularDynamicsRequest) -> MolecularDynamicsResult:
        """Executes a full molecular dynamics trajectory."""
        if req.random_seed is not None:
            random.seed(req.random_seed)

        # 1. Determine Box Dimensions from Number of Particles & Density
        mass_argon = 39.948  # g/mol
        total_mass_g = (req.num_particles * mass_argon) / 6.02214076e23
        volume_cm3 = total_mass_g / req.density_g_cm3
        volume_angstrom3 = volume_cm3 * 1.0e24
        box_length = math.pow(volume_angstrom3, 1.0 / 3.0)

        # 2. Initialize Particles on Simple Cubic or FCC Lattice to prevent overlap
        particles = cls._initialize_lattice_positions(
            req.num_particles, box_length, mass_argon, req.initial_lattice
        )

        # 3. Initialize Velocities according to Maxwell-Boltzmann Distribution at T0
        cls._initialize_maxwell_boltzmann_velocities(particles, req.target_temperature_k)

        # 4. Simulation Parameters
        dt_ps = req.timestep_fs / 1000.0
        sigma = req.sigma_angstrom
        epsilon = req.epsilon_kj_mol
        rc = req.cutoff_radius_sigma * sigma
        rc2 = rc * rc
        shift_u = 4.0 * epsilon * (math.pow(sigma / rc, 12) - math.pow(sigma / rc, 6))

        # Initial Forces and Potential Energy
        ep_initial, virial_initial = cls._compute_forces_and_potential(particles, box_length, sigma, epsilon, rc2, shift_u)
        ek_initial = cls._compute_kinetic_energy(particles)
        total_energy_initial = ek_initial + ep_initial

        telemetry: List[SimulationTelemetryStep] = []
        msd_curve: List[MeanSquaredDisplacementPoint] = []

        # Radial distribution accumulator
        num_gr_bins = 50
        gr_max_r = min(box_length / 2.0, 10.0)
        dr = gr_max_r / num_gr_bins
        gr_histogram = [0] * num_gr_bins
        gr_sample_count = 0

        temp_sum = 0.0
        press_sum = 0.0
        sample_count = 0

        # Store initial positions for MSD
        initial_unwrapped = [(p.unwrapped_x, p.unwrapped_y, p.unwrapped_z) for p in particles]

        # 5. Integration Loop (Velocity-Verlet)
        for step in range(req.total_steps + 1):
            time_ps = step * dt_ps

            if step > 0:
                # Verlet Step 1: Update velocities by half-step and positions by full-step
                for p in particles:
                    ax = p.fx * cls.FORCE_TO_ACCEL / p.mass
                    ay = p.fy * cls.FORCE_TO_ACCEL / p.mass
                    az = p.fz * cls.FORCE_TO_ACCEL / p.mass

                    p.vx += 0.5 * ax * dt_ps
                    p.vy += 0.5 * ay * dt_ps
                    p.vz += 0.5 * az * dt_ps

                    dx = p.vx * dt_ps
                    dy = p.vy * dt_ps
                    dz = p.vz * dt_ps

                    p.x += dx
                    p.y += dy
                    p.z += dz

                    p.unwrapped_x += dx
                    p.unwrapped_y += dy
                    p.unwrapped_z += dz

                    # Periodic Boundary Conditions
                    p.x -= box_length * math.floor(p.x / box_length)
                    p.y -= box_length * math.floor(p.y / box_length)
                    p.z -= box_length * math.floor(p.z / box_length)

                # Verlet Step 2: Compute forces at new positions
                ep_curr, virial_curr = cls._compute_forces_and_potential(particles, box_length, sigma, epsilon, rc2, shift_u)

                # Verlet Step 3: Complete velocity update by second half-step
                for p in particles:
                    ax = p.fx * cls.FORCE_TO_ACCEL / p.mass
                    ay = p.fy * cls.FORCE_TO_ACCEL / p.mass
                    az = p.fz * cls.FORCE_TO_ACCEL / p.mass

                    p.vx += 0.5 * ax * dt_ps
                    p.vy += 0.5 * ay * dt_ps
                    p.vz += 0.5 * az * dt_ps

                # Apply Thermostat if selected
                if req.ensemble == EnsembleType.NVT_BERENDSEN:
                    ek_temp = cls._compute_kinetic_energy(particles)
                    t_inst = cls._compute_temperature(ek_temp, len(particles))
                    tau = req.thermostat_coupling_ps
                    if t_inst > 1e-4 and tau > 0:
                        lambda_factor = math.sqrt(max(0.1, 1.0 + (dt_ps / tau) * (req.target_temperature_k / t_inst - 1.0)))
                        for p in particles:
                            p.vx *= lambda_factor
                            p.vy *= lambda_factor
                            p.vz *= lambda_factor
                elif req.ensemble == EnsembleType.NVT_ANDERSEN:
                    collision_prob = dt_ps / req.thermostat_coupling_ps
                    sigma_v = math.sqrt(cls.R_KJ_MOL_K * req.target_temperature_k / (mass_argon * cls.VEL_SQ_TO_KJ_MOL))
                    for p in particles:
                        if random.random() < collision_prob:
                            p.vx = random.gauss(0.0, sigma_v)
                            p.vy = random.gauss(0.0, sigma_v)
                            p.vz = random.gauss(0.0, sigma_v)
            else:
                ep_curr, virial_curr = ep_initial, virial_initial

            # Telemetry Sampling
            if step % req.sampling_interval == 0:
                ek_curr = cls._compute_kinetic_energy(particles)
                etot_curr = ek_curr + ep_curr
                t_curr = cls._compute_temperature(ek_curr, len(particles))
                p_curr = cls._compute_pressure(t_curr, virial_curr, len(particles), volume_angstrom3)

                drift = abs(etot_curr - total_energy_initial) / max(1e-4, abs(total_energy_initial))

                telemetry.append(
                    SimulationTelemetryStep(
                        step=step,
                        time_ps=round(time_ps, 4),
                        kinetic_energy_kj_mol=round(ek_curr, 3),
                        potential_energy_kj_mol=round(ep_curr, 3),
                        total_energy_kj_mol=round(etot_curr, 3),
                        temperature_k=round(t_curr, 2),
                        pressure_bar=round(p_curr, 2),
                        energy_drift_fraction=round(drift, 5),
                    )
                )

                # Mean Squared Displacement
                msd_val = sum(
                    math.pow(p.unwrapped_x - initial_unwrapped[idx][0], 2)
                    + math.pow(p.unwrapped_y - initial_unwrapped[idx][1], 2)
                    + math.pow(p.unwrapped_z - initial_unwrapped[idx][2], 2)
                    for idx, p in enumerate(particles)
                ) / len(particles)

                msd_curve.append(
                    MeanSquaredDisplacementPoint(
                        time_ps=round(time_ps, 4),
                        msd_angstrom2=round(msd_val, 4),
                    )
                )

                # Radial Distribution Sampling (after step 10 to allow equilibration)
                if step >= 10:
                    cls._accumulate_radial_distribution(particles, box_length, gr_histogram, dr, num_gr_bins)
                    gr_sample_count += 1

                temp_sum += t_curr
                press_sum += p_curr
                sample_count += 1

        # 6. Post-Processing: Radial Distribution Function g(r)
        radial_distribution: List[RadialDistributionPoint] = []
        if gr_sample_count > 0:
            num_part = len(particles)
            density_num = num_part / volume_angstrom3
            for bin_idx in range(num_gr_bins):
                r_mid = (bin_idx + 0.5) * dr
                shell_vol = 4.0 * math.pi * r_mid * r_mid * dr
                ideal_counts = num_part * density_num * shell_vol * gr_sample_count
                g_r = (2.0 * gr_histogram[bin_idx]) / max(1e-6, ideal_counts)
                radial_distribution.append(
                    RadialDistributionPoint(
                        r_angstrom=round(r_mid, 2),
                        g_r=round(g_r, 4),
                    )
                )

        # 7. Post-Processing: Diffusion Coefficient D from MSD slope
        diff_coef_cm2_s = 0.0
        if len(msd_curve) > 5:
            # Linear fit on the second half of the MSD curve: MSD = 6Dt
            mid = len(msd_curve) // 2
            t_span_ps = msd_curve[-1].time_ps - msd_curve[mid].time_ps
            msd_span_ang2 = msd_curve[-1].msd_angstrom2 - msd_curve[mid].msd_angstrom2
            if t_span_ps > 0 and msd_span_ang2 > 0:
                # D in Angstrom^2 / ps = 10^-20 m^2 / 10^-12 s = 10^-8 m^2/s = 10^-4 cm^2/s
                d_ang2_ps = msd_span_ang2 / (6.0 * t_span_ps)
                diff_coef_cm2_s = d_ang2_ps * 1.0e-4

        avg_temp = temp_sum / sample_count if sample_count > 0 else req.target_temperature_k
        avg_press = press_sum / sample_count if sample_count > 0 else 1.0
        final_temp = telemetry[-1].temperature_k if telemetry else req.target_temperature_k
        drift_max = max((t.energy_drift_fraction for t in telemetry), default=0.0)

        # Final particle positions
        final_coords = [
            {
                "id": p.id,
                "x": round(p.x, 3),
                "y": round(p.y, 3),
                "z": round(p.z, 3),
                "vx": round(p.vx, 3),
                "vy": round(p.vy, 3),
                "vz": round(p.vz, 3),
                "speed": round(math.sqrt(p.vx * p.vx + p.vy * p.vy + p.vz * p.vz), 3),
            }
            for p in particles
        ]

        summary = (
            f"Molecular Dynamics simulation completed for {req.num_particles} Argon atoms in a cubic box (L = {box_length:.2f} Å) "
            f"under the {req.ensemble.value} ensemble. Initial T = {req.target_temperature_k} K, Final T = {final_temp:.2f} K, "
            f"Mean P = {avg_press:.1f} bar. Energy drift: {drift_max * 100:.3f}%. Estimated D = {diff_coef_cm2_s:.2e} cm²/s."
        )

        return MolecularDynamicsResult(
            system_name=f"Argon {req.num_particles} Particles ({req.ensemble.value})",
            ensemble=req.ensemble,
            num_particles=req.num_particles,
            box_length_angstrom=round(box_length, 3),
            volume_angstrom3=round(volume_angstrom3, 2),
            density_g_cm3=round(req.density_g_cm3, 3),
            timestep_fs=req.timestep_fs,
            total_steps=req.total_steps,
            initial_temperature_k=req.target_temperature_k,
            final_temperature_k=final_temp,
            average_temperature_k=round(avg_temp, 2),
            average_pressure_bar=round(avg_press, 2),
            energy_conservation_ratio=round(1.0 - drift_max, 5),
            self_diffusion_coefficient_cm2_s=round(diff_coef_cm2_s, 9),
            telemetry=telemetry,
            radial_distribution=radial_distribution,
            msd_curve=msd_curve,
            final_positions=final_coords,
            pedagogical_summary=summary,
        )

    @classmethod
    def _initialize_lattice_positions(
        cls, num_particles: int, box_length: float, mass: float, lattice: LatticeStructure
    ) -> List[Particle]:
        """Arranges particles on a grid to avoid initial hard-core overlap."""
        particles: List[Particle] = []

        if lattice == LatticeStructure.FACE_CENTERED_CUBIC:
            m = max(1, math.ceil(math.pow(num_particles / 4.0, 1.0 / 3.0)))
            a = box_length / m
            basis = [
                (0.25, 0.25, 0.25),
                (0.75, 0.75, 0.25),
                (0.75, 0.25, 0.75),
                (0.25, 0.75, 0.75),
            ]
            count = 0
            for ix in range(m):
                for iy in range(m):
                    for iz in range(m):
                        for bx, by, bz in basis:
                            if count >= num_particles:
                                break
                            x = (ix + bx) * a
                            y = (iy + by) * a
                            z = (iz + bz) * a
                            particles.append(
                                Particle(
                                    id=count + 1,
                                    x=x,
                                    y=y,
                                    z=z,
                                    vx=0.0,
                                    vy=0.0,
                                    vz=0.0,
                                    mass=mass,
                                    unwrapped_x=x,
                                    unwrapped_y=y,
                                    unwrapped_z=z,
                                )
                            )
                            count += 1
                        if count >= num_particles:
                            break
                    if count >= num_particles:
                        break
                if count >= num_particles:
                    break
            return particles

        # Default / SIMPLE_CUBIC:
        n_side = math.ceil(math.pow(num_particles, 1.0 / 3.0))
        spacing = box_length / n_side

        count = 0
        for ix in range(n_side):
            for iy in range(n_side):
                for iz in range(n_side):
                    if count >= num_particles:
                        break
                    x = (ix + 0.5) * spacing
                    y = (iy + 0.5) * spacing
                    z = (iz + 0.5) * spacing
                    particles.append(
                        Particle(
                            id=count + 1,
                            x=x,
                            y=y,
                            z=z,
                            vx=0.0,
                            vy=0.0,
                            vz=0.0,
                            mass=mass,
                            unwrapped_x=x,
                            unwrapped_y=y,
                            unwrapped_z=z,
                        )
                    )
                    count += 1
                if count >= num_particles:
                    break
            if count >= num_particles:
                break
        return particles

    @classmethod
    def _initialize_maxwell_boltzmann_velocities(cls, particles: List[Particle], target_temp_k: float):
        """Generates Gaussian velocities, cancels net center-of-mass momentum, and rescales to target T."""
        if not particles:
            return

        mass = particles[0].mass
        # Standard deviation in Angstrom/ps
        sigma_v = math.sqrt(cls.R_KJ_MOL_K * target_temp_k / (mass * cls.VEL_SQ_TO_KJ_MOL))

        # Sample Gaussian velocities
        v_com_x, v_com_y, v_com_z = 0.0, 0.0, 0.0
        for p in particles:
            p.vx = random.gauss(0.0, sigma_v)
            p.vy = random.gauss(0.0, sigma_v)
            p.vz = random.gauss(0.0, sigma_v)
            v_com_x += p.vx
            v_com_y += p.vy
            v_com_z += p.vz

        # Subtract COM drift
        n = len(particles)
        v_com_x /= n
        v_com_y /= n
        v_com_z /= n
        for p in particles:
            p.vx -= v_com_x
            p.vy -= v_com_y
            p.vz -= v_com_z

        # Rescale exactly to target temperature
        ek = cls._compute_kinetic_energy(particles)
        current_t = cls._compute_temperature(ek, n)
        if current_t > 1e-4:
            scale = math.sqrt(target_temp_k / current_t)
            for p in particles:
                p.vx *= scale
                p.vy *= scale
                p.vz *= scale

    @classmethod
    def _compute_forces_and_potential(
        cls, particles: List[Particle], box_length: float, sigma: float, epsilon: float, rc2: float, shift_u: float
    ) -> Tuple[float, float]:
        """Calculates pairwise Lennard-Jones forces, potential energy, and virial with PBC."""
        for p in particles:
            p.fx = 0.0
            p.fy = 0.0
            p.fz = 0.0

        potential_energy = 0.0
        virial = 0.0
        n = len(particles)

        for i in range(n):
            pi = particles[i]
            for j in range(i + 1, n):
                pj = particles[j]

                # Minimum Image Convention
                dx = pi.x - pj.x
                dy = pi.y - pj.y
                dz = pi.z - pj.z

                dx -= box_length * round(dx / box_length)
                dy -= box_length * round(dy / box_length)
                dz -= box_length * round(dz / box_length)

                r2 = dx * dx + dy * dy + dz * dz

                if r2 < rc2 and r2 > 1e-6:
                    inv_r2 = 1.0 / r2
                    s2 = (sigma * sigma) * inv_r2
                    s6 = s2 * s2 * s2
                    s12 = s6 * s6

                    # LJ Potential with shift at cutoff
                    u_pair = 4.0 * epsilon * (s12 - s6) - shift_u
                    potential_energy += u_pair

                    # Pair Force: F_ij = 48 * epsilon / r^2 * (s12 - 0.5 * s6) * r_vec
                    f_scalar = 48.0 * epsilon * inv_r2 * (s12 - 0.5 * s6)

                    fx = f_scalar * dx
                    fy = f_scalar * dy
                    fz = f_scalar * dz

                    # Newton's Third Law
                    pi.fx += fx
                    pi.fy += fy
                    pi.fz += fz

                    pj.fx -= fx
                    pj.fy -= fy
                    pj.fz -= fz

                    # Virial accumulator: W = sum (r_ij . F_ij)
                    virial += f_scalar * r2

        return potential_energy, virial

    @classmethod
    def _compute_kinetic_energy(cls, particles: List[Particle]) -> float:
        """Returns total kinetic energy in kJ/mol."""
        sum_mv2 = sum(p.mass * (p.vx * p.vx + p.vy * p.vy + p.vz * p.vz) for p in particles)
        return 0.5 * sum_mv2 * cls.VEL_SQ_TO_KJ_MOL

    @classmethod
    def _compute_temperature(cls, kinetic_energy_kj_mol: float, num_particles: int) -> float:
        """Instantaneous temperature from kinetic energy: T = 2 Ek / (3 (N - 1) R)."""
        dof = max(1, 3 * num_particles - 3)
        return (2.0 * kinetic_energy_kj_mol) / (dof * cls.R_KJ_MOL_K)

    @classmethod
    def _compute_pressure(
        cls, temperature_k: float, virial: float, num_particles: int, volume_angstrom3: float
    ) -> float:
        """Virial equation of state pressure in bar."""
        if volume_angstrom3 <= 0:
            return 0.0
        ideal_term = num_particles * cls.R_KJ_MOL_K * temperature_k
        virial_term = virial / 3.0
        return ((ideal_term + virial_term) / volume_angstrom3) * cls.VIRIAL_TO_BAR

    @classmethod
    def _accumulate_radial_distribution(
        cls, particles: List[Particle], box_length: float, gr_histogram: List[int], dr: float, num_bins: int
    ):
        """Accumulates pair distances into radial distribution histogram with PBC."""
        n = len(particles)
        max_r = num_bins * dr

        for i in range(n):
            pi = particles[i]
            for j in range(i + 1, n):
                pj = particles[j]
                dx = pi.x - pj.x - box_length * round((pi.x - pj.x) / box_length)
                dy = pi.y - pj.y - box_length * round((pi.y - pj.y) / box_length)
                dz = pi.z - pj.z - box_length * round((pi.z - pj.z) / box_length)
                r = math.sqrt(dx * dx + dy * dy + dz * dz)
                if r < max_r and dr > 0:
                    bin_idx = int(r / dr)
                    if 0 <= bin_idx < num_bins:
                        gr_histogram[bin_idx] += 1
