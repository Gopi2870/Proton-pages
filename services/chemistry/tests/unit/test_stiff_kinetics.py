"""Unit tests for Stiff Kinetics Reaction Networks & Stiff ODE Solvers (PR #040)."""

import pytest
from app.models.stiff_kinetics import KineticSpecies, ElementaryReaction
from app.schemas.stiff_kinetics import StiffKineticsSimulationRequest
from app.services.stiff_kinetics_service import StiffKineticsEngine, PRESET_NETWORKS


class TestStiffKineticsEngine:
    """Scientific validation suite for stiff chemical reaction network ODE integration."""

    def test_presets_registered(self):
        """Verifies curated stiff benchmark presets exist."""
        presets = StiffKineticsEngine.get_presets()
        assert len(presets) >= 4
        preset_ids = [p.id for p in presets]
        assert "robertson_stiff" in preset_ids
        assert "chapman_ozone" in preset_ids
        assert "oregonator_bz" in preset_ids
        assert "zeldovich_nox" in preset_ids

    def test_solve_linear_system_identity(self):
        """Verifies solve_linear_system returns correct vector for identity matrix."""
        identity = [
            [1.0, 0.0, 0.0],
            [0.0, 1.0, 0.0],
            [0.0, 0.0, 1.0],
        ]
        b = [2.5, -1.0, 4.0]
        x = StiffKineticsEngine.solve_linear_system(identity, b)
        assert x[0] == pytest.approx(2.5)
        assert x[1] == pytest.approx(-1.0)
        assert x[2] == pytest.approx(4.0)

    def test_solve_linear_system_pivoting(self):
        """Verifies solve_linear_system with row exchange / pivoting."""
        # 0*x + 2*y = 4 => y = 2
        # 3*x + 1*y = 5 => 3*x + 2 = 5 => x = 1
        a = [
            [0.0, 2.0],
            [3.0, 1.0],
        ]
        b = [4.0, 5.0]
        x = StiffKineticsEngine.solve_linear_system(a, b)
        assert x[0] == pytest.approx(1.0, abs=1e-6)
        assert x[1] == pytest.approx(2.0, abs=1e-6)

    def test_analytic_jacobian_evaluation(self):
        """Verifies evaluation of derivatives and analytic Jacobian for elementary reaction."""
        # A -> B with k = 2.0
        species_names = ["A", "B"]
        reactions = [
            ElementaryReaction(
                id="r1",
                equation_str="A -> B",
                reactants={"A": 1.0},
                products={"B": 1.0},
                rate_constant=2.0,
            )
        ]
        concs = {"A": 0.5, "B": 0.0}
        f_vec, j_mat = StiffKineticsEngine.evaluate_derivatives(species_names, reactions, concs)

        # dA/dt = -2.0 * [A] = -1.0
        # dB/dt = +2.0 * [A] = +1.0
        assert f_vec[0] == pytest.approx(-1.0)
        assert f_vec[1] == pytest.approx(1.0)

        # J_AA = d(dA/dt)/dA = -2.0, J_AB = 0.0
        # J_BA = d(dB/dt)/dA = +2.0, J_BB = 0.0
        assert j_mat[0][0] == pytest.approx(-2.0)
        assert j_mat[0][1] == pytest.approx(0.0)
        assert j_mat[1][0] == pytest.approx(2.0)
        assert j_mat[1][1] == pytest.approx(0.0)

    def test_robertson_stiff_system_conservation_and_asymptote(self):
        """Validates Rosenbrock-W ROS2 integrator on the classic Robertson stiff benchmark."""
        req = StiffKineticsSimulationRequest(
            preset_id="robertson_stiff",
            total_time_s=50.0,
            initial_step_s=1e-4,
            solver_method="rosenbrock_stiff",
            max_steps=200,
        )
        res = StiffKineticsEngine.simulate(req)

        assert res.network_name == "Robertson Autocatalytic Stiff System (1966)"
        assert res.is_stiff is True
        assert res.time_points_count > 10

        # Check total mass conservation [A] + [B] + [C] == 1.0 at every trajectory point
        for pt in res.trajectory:
            tot = pt["A"] + pt["B"] + pt["C"]
            assert tot == pytest.approx(1.0, abs=1e-3)
            # Concentrations must remain strictly physical (non-negative)
            assert pt["A"] >= 0.0
            assert pt["B"] >= 0.0
            assert pt["C"] >= 0.0

        # At t=50s, [A] has depleted and [C] has accumulated
        final_a = res.final_concentrations["A"]
        final_c = res.final_concentrations["C"]
        assert final_a < 1.0
        assert final_c > 0.0
        # Highly reactive intermediate B remains in quasi-steady state (very low concentration)
        assert res.final_concentrations["B"] < 1e-3

    def test_chapman_ozone_cycle_simulation(self):
        """Validates simulation of stratospheric photochemistry."""
        req = StiffKineticsSimulationRequest(
            preset_id="chapman_ozone",
            total_time_s=100.0,
            initial_step_s=1e-3,
            solver_method="rosenbrock_stiff",
            max_steps=100,
        )
        res = StiffKineticsEngine.simulate(req)

        assert res.network_name == "Chapman Photochemical Stratospheric Ozone Cycle"
        assert res.time_points_count > 5
        for pt in res.trajectory:
            assert pt["O2"] > 0.0
            assert pt["O3"] >= 0.0
            assert pt["O"] >= 0.0

    def test_oregonator_bz_oscillator(self):
        """Validates simulation of the Oregonator Belousov-Zhabotinsky oscillating network."""
        req = StiffKineticsSimulationRequest(
            preset_id="oregonator_bz",
            total_time_s=10.0,
            initial_step_s=1e-4,
            solver_method="rosenbrock_stiff",
            max_steps=100,
        )
        res = StiffKineticsEngine.simulate(req)

        assert "Oregonator" in res.network_name
        assert "X" in res.species_names
        assert "Y" in res.species_names
        assert "Z" in res.species_names
        assert len(res.trajectory) > 5

    def test_zeldovich_nox_simulation(self):
        """Validates high-temperature thermal NOx combustion mechanism."""
        req = StiffKineticsSimulationRequest(
            preset_id="zeldovich_nox",
            total_time_s=0.05,
            initial_step_s=1e-5,
            solver_method="rosenbrock_stiff",
            max_steps=100,
        )
        res = StiffKineticsEngine.simulate(req)

        assert "Zeldovich" in res.network_name
        assert "NO" in res.species_names
        assert res.final_concentrations["NO"] > 0.0

    def test_custom_reaction_network(self):
        """Validates simulation of custom user-defined reaction network."""
        species = [
            KineticSpecies(name="X", initial_concentration_m=2.0),
            KineticSpecies(name="Y", initial_concentration_m=0.0),
        ]
        reactions = [
            ElementaryReaction(
                id="rxn1",
                equation_str="X -> Y",
                reactants={"X": 1.0},
                products={"Y": 1.0},
                rate_constant=0.5,
            )
        ]
        req = StiffKineticsSimulationRequest(
            preset_id=None,
            species=species,
            reactions=reactions,
            total_time_s=2.0,
            initial_step_s=0.05,
            solver_method="rosenbrock_stiff",
        )
        res = StiffKineticsEngine.simulate(req)
        assert res.network_name == "Custom Reaction Network"
        # Exact solution at t=2: [X] = 2.0 * exp(-0.5 * 2) = 2.0 * exp(-1) = 0.73576
        assert res.final_concentrations["X"] == pytest.approx(0.7358, abs=0.05)
        assert res.final_concentrations["Y"] == pytest.approx(1.2642, abs=0.05)
