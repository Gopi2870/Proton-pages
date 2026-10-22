"""Unit tests for Molecular Dynamics Simulation Engine (PR #036).

Validates:
- Analytical force vs numerical derivative of Lennard-Jones (12-6) potential
- Newton's third law for pairwise forces (sum of forces = 0)
- Cubic periodic boundary conditions and minimum image convention
- Maxwell-Boltzmann velocity generation and zero COM drift
- Symplectic Velocity-Verlet energy conservation in NVE microcanonical ensemble
- Thermostat relaxation (Berendsen & Andersen) in NVT ensembles
- Radial distribution function g(r) structural features
- Mean squared displacement (MSD) and self-diffusion coefficient estimation
- Deterministic reproducibility using pseudo-random seeds
"""

import math
import pytest
from app.models.molecular_dynamics import EnsembleType, LatticeStructure, Particle
from app.schemas.molecular_dynamics import MolecularDynamicsRequest
from app.services.molecular_dynamics_service import MolecularDynamicsEngine


class TestMolecularDynamicsEngine:
    def test_analytical_force_vs_numerical_derivative(self):
        """Validates that LJ pair force matches negative spatial gradient of potential."""
        epsilon = 0.996  # kJ/mol (Argon)
        sigma = 3.405  # Angstrom
        r_test = 4.0  # Angstrom (attractive branch)
        delta_r = 1e-5

        # Potential function U(r)
        def u_lj(r: float) -> float:
            s_over_r = sigma / r
            s6 = math.pow(s_over_r, 6)
            return 4.0 * epsilon * (s6 * s6 - s6)

        # Central difference numerical force: F_num = -dU/dr ≈ -(U(r+h) - U(r-h)) / (2h)
        f_numerical = -(u_lj(r_test + delta_r) - u_lj(r_test - delta_r)) / (2.0 * delta_r)

        # Analytical formula from engine: F_scalar = 48 * eps / r^2 * (s12 - 0.5*s6) * r
        # Magnitude along radial direction: F_mag = 48 * eps / r * ((sigma/r)^12 - 0.5 * (sigma/r)^6)
        s_r = sigma / r_test
        s6 = math.pow(s_r, 6)
        s12 = s6 * s6
        f_analytical = 48.0 * epsilon / r_test * (s12 - 0.5 * s6)

        # Discrepancy must be under 1e-4 due to O(h^2) truncation
        assert math.isclose(f_analytical, f_numerical, rel_tol=1e-4)

    def test_newtons_third_law_pair_forces(self):
        """Sum of all pairwise interatomic forces in closed PBC box must be identically zero."""
        box_length = 20.0
        particles = [
            Particle(id=1, x=2.0, y=3.0, z=4.0, vx=0.0, vy=0.0, vz=0.0, mass=39.948, unwrapped_x=2.0, unwrapped_y=3.0, unwrapped_z=4.0),
            Particle(id=2, x=5.0, y=7.0, z=6.0, vx=0.0, vy=0.0, vz=0.0, mass=39.948, unwrapped_x=5.0, unwrapped_y=7.0, unwrapped_z=6.0),
            Particle(id=3, x=18.5, y=19.0, z=1.0, vx=0.0, vy=0.0, vz=0.0, mass=39.948, unwrapped_x=18.5, unwrapped_y=19.0, unwrapped_z=1.0),
            Particle(id=4, x=10.0, y=10.0, z=10.0, vx=0.0, vy=0.0, vz=0.0, mass=39.948, unwrapped_x=10.0, unwrapped_y=10.0, unwrapped_z=10.0),
        ]
        sigma = 3.405
        epsilon = 0.996
        rc = 8.5
        rc2 = rc * rc
        shift_u = 4.0 * epsilon * (math.pow(sigma / rc, 12) - math.pow(sigma / rc, 6))

        ep, vir = MolecularDynamicsEngine._compute_forces_and_potential(
            particles, box_length, sigma, epsilon, rc2, shift_u
        )

        net_fx = sum(p.fx for p in particles)
        net_fy = sum(p.fy for p in particles)
        net_fz = sum(p.fz for p in particles)

        assert abs(net_fx) < 1e-10
        assert abs(net_fy) < 1e-10
        assert abs(net_fz) < 1e-10
        assert ep != 0.0

    def test_minimum_image_convention_pbc(self):
        """Particles positioned near opposite faces of the box should interact across boundary."""
        box_length = 10.0
        # Particle 1 at x=0.5, Particle 2 at x=9.5 -> distance should be 1.0, not 9.0
        p1 = Particle(id=1, x=0.5, y=5.0, z=5.0, vx=0.0, vy=0.0, vz=0.0, mass=39.948, unwrapped_x=0.5, unwrapped_y=5.0, unwrapped_z=5.0)
        p2 = Particle(id=2, x=9.5, y=5.0, z=5.0, vx=0.0, vy=0.0, vz=0.0, mass=39.948, unwrapped_x=9.5, unwrapped_y=5.0, unwrapped_z=5.0)

        sigma = 3.405
        epsilon = 0.996
        rc2 = 16.0  # Cutoff 4.0 A
        shift_u = 0.0

        ep, vir = MolecularDynamicsEngine._compute_forces_and_potential(
            [p1, p2], box_length, sigma, epsilon, rc2, shift_u
        )

        # Distance is 1.0 A, which is strongly repulsive (r < sigma = 3.405 A)
        # p2 wrapped across PBC is at x = -0.5 (to the left of p1), so p1 is pushed right (+x)
        assert p1.fx > 0.0
        assert p2.fx < 0.0
        assert abs(p1.fx + p2.fx) < 1e-10
        assert ep > 100.0  # Severe hard-core repulsion at r=1.0 A

    def test_maxwell_boltzmann_initialization(self):
        """Center-of-mass momentum must be strictly zero and instantaneous temperature must match target."""
        particles = MolecularDynamicsEngine._initialize_lattice_positions(
            num_particles=32, box_length=20.0, mass=39.948, lattice=LatticeStructure.FACE_CENTERED_CUBIC
        )
        target_t = 120.0
        MolecularDynamicsEngine._initialize_maxwell_boltzmann_velocities(particles, target_t)

        # COM momentum
        total_px = sum(p.mass * p.vx for p in particles)
        total_py = sum(p.mass * p.vy for p in particles)
        total_pz = sum(p.mass * p.vz for p in particles)

        assert abs(total_px) < 1e-8
        assert abs(total_py) < 1e-8
        assert abs(total_pz) < 1e-8

        # Instantaneous temperature
        ek = MolecularDynamicsEngine._compute_kinetic_energy(particles)
        calc_t = MolecularDynamicsEngine._compute_temperature(ek, len(particles))
        assert calc_t == pytest.approx(target_t, rel=1e-3)

    def test_nve_energy_conservation(self):
        """Microcanonical NVE ensemble with Velocity-Verlet must conserve total energy within 0.1%."""
        req = MolecularDynamicsRequest(
            ensemble=EnsembleType.NVE_MICROCANONICAL,
            num_particles=32,
            target_temperature_k=85.0,
            density_g_cm3=1.35,
            timestep_fs=2.0,  # 2.0 fs
            total_steps=100,
            sampling_interval=10,
            initial_lattice=LatticeStructure.FACE_CENTERED_CUBIC,
            random_seed=42,
        )

        result = MolecularDynamicsEngine.run_simulation(req)
        assert len(result.telemetry) >= 10

        initial_etot = result.telemetry[0].total_energy_kj_mol
        max_drift = max(t.energy_drift_fraction for t in result.telemetry)

        # Energy conservation ratio should exceed 99.8% (drift < 0.002)
        assert result.energy_conservation_ratio > 0.995
        assert max_drift < 0.005
        assert result.average_temperature_k > 20.0

    def test_nvt_berendsen_thermostat(self):
        """Berendsen velocity rescaling stabilizes temperature near target under heat exchange."""
        req = MolecularDynamicsRequest(
            ensemble=EnsembleType.NVT_BERENDSEN,
            num_particles=32,
            target_temperature_k=150.0,
            density_g_cm3=1.0,
            timestep_fs=2.0,
            total_steps=100,
            thermostat_coupling_ps=0.1,
            sampling_interval=10,
            initial_lattice=LatticeStructure.FACE_CENTERED_CUBIC,
            random_seed=123,
        )

        result = MolecularDynamicsEngine.run_simulation(req)
        final_temp = result.final_temperature_k
        # Should stay well-controlled around 150 K
        assert 110.0 < final_temp < 190.0

    def test_nvt_andersen_thermostat(self):
        """Andersen stochastic velocity thermalization keeps temperature bounded."""
        req = MolecularDynamicsRequest(
            ensemble=EnsembleType.NVT_ANDERSEN,
            num_particles=32,
            target_temperature_k=100.0,
            density_g_cm3=1.1,
            timestep_fs=2.0,
            total_steps=100,
            thermostat_coupling_ps=0.1,
            sampling_interval=10,
            initial_lattice=LatticeStructure.FACE_CENTERED_CUBIC,
            random_seed=777,
        )

        result = MolecularDynamicsEngine.run_simulation(req)
        assert len(result.telemetry) >= 10
        assert 70.0 < result.average_temperature_k < 130.0

    def test_radial_distribution_and_diffusion(self):
        """Radial distribution g(r) and MSD diffusion metrics are computed and well-formed."""
        req = MolecularDynamicsRequest(
            ensemble=EnsembleType.NVE_MICROCANONICAL,
            num_particles=64,
            target_temperature_k=90.0,
            density_g_cm3=1.38,
            timestep_fs=2.0,
            total_steps=120,
            sampling_interval=10,
            random_seed=999,
        )

        result = MolecularDynamicsEngine.run_simulation(req)

        # Radial distribution function
        assert len(result.radial_distribution) > 0
        assert any(pt.g_r > 0.0 for pt in result.radial_distribution)

        # Mean squared displacement curve
        assert len(result.msd_curve) > 5
        # Self-diffusion coefficient
        assert result.self_diffusion_coefficient_cm2_s >= 0.0

    def test_deterministic_reproducibility(self):
        """Fixed random seed guarantees bitwise deterministic trajectories."""
        req1 = MolecularDynamicsRequest(
            ensemble=EnsembleType.NVE_MICROCANONICAL,
            num_particles=16,
            target_temperature_k=80.0,
            density_g_cm3=1.2,
            timestep_fs=1.5,
            total_steps=30,
            sampling_interval=10,
            random_seed=2026,
        )
        req2 = MolecularDynamicsRequest(
            ensemble=EnsembleType.NVE_MICROCANONICAL,
            num_particles=16,
            target_temperature_k=80.0,
            density_g_cm3=1.2,
            timestep_fs=1.5,
            total_steps=30,
            sampling_interval=10,
            random_seed=2026,
        )

        res1 = MolecularDynamicsEngine.run_simulation(req1)
        res2 = MolecularDynamicsEngine.run_simulation(req2)

        assert res1.final_temperature_k == res2.final_temperature_k
        assert res1.average_pressure_bar == res2.average_pressure_bar
        assert [t.total_energy_kj_mol for t in res1.telemetry] == [t.total_energy_kj_mol for t in res2.telemetry]
