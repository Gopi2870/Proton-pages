"""
Unit tests for Semi-Empirical Quantum Chemistry Engine (PR #057).
Tests STO overlap integrals, Klopman-Ohno screening, core-core repulsions,
RHF SCF Roothaan-Hall convergence with DIIS, Mulliken populations,
dipole moments, frontier indices, and potential energy surfaces.
"""
import math
import numpy as np
import pytest

from app.models.semi_empirical import (
    AtomCoordinate,
    OrbitalType,
    SemiEmpiricalMethod,
)
from app.services.semi_empirical_parameters import (
    AM1_PARAMETERS,
    MNDO_PARAMETERS,
    PM3_PARAMETERS,
    PRESET_MOLECULES,
)
from app.services.semi_empirical_service import (
    SemiEmpiricalEngine,
    _sto_overlap_1s_1s,
    _sto_overlap_2s_2s,
    _sto_overlap_2p_2p_sigma,
    _sto_overlap_2p_2p_pi,
)


class TestSemiEmpiricalBasics:
    def test_parameter_catalogues_contain_required_elements(self):
        for method, params in [
            (SemiEmpiricalMethod.MNDO, MNDO_PARAMETERS),
            (SemiEmpiricalMethod.AM1, AM1_PARAMETERS),
            (SemiEmpiricalMethod.PM3, PM3_PARAMETERS),
        ]:
            for sym in ["H", "C", "N", "O", "F"]:
                assert sym in params, f"Missing element {sym} in {method.value}"
                ep = params[sym]
                assert ep.valence_charge > 0
                assert ep.zeta_s > 0.0
                assert ep.beta_s < 0.0
                assert ep.g_ss > 0.0

    def test_sto_overlap_integrals_physical_properties(self):
        s_0 = _sto_overlap_1s_1s(1.2, 1.2, 0.0)
        assert pytest.approx(s_0, abs=1e-5) == 1.0

        s_1 = _sto_overlap_1s_1s(1.2, 1.2, 0.74)
        s_2 = _sto_overlap_1s_1s(1.2, 1.2, 1.5)
        s_3 = _sto_overlap_1s_1s(1.2, 1.2, 3.0)
        assert 0.0 < s_3 < s_2 < s_1 < 1.0

        s_2s = _sto_overlap_2s_2s(1.8, 1.8, 1.4)
        s_pi = _sto_overlap_2p_2p_pi(1.8, 1.8, 1.4)
        assert 0.0 < s_2s < 1.0
        assert 0.0 < s_pi < 1.0

    def test_build_basis_and_valence_electrons(self):
        water_atoms = PRESET_MOLECULES["water"].atoms
        basis, n_val_e = SemiEmpiricalEngine.build_basis(water_atoms, SemiEmpiricalMethod.AM1)
        assert len(basis) == 6
        assert n_val_e == 8

        methane_atoms = PRESET_MOLECULES["methane"].atoms
        m_basis, m_val_e = SemiEmpiricalEngine.build_basis(methane_atoms, SemiEmpiricalMethod.PM3)
        assert len(m_basis) == 8
        assert m_val_e == 8

    def test_overlap_matrix_is_symmetric_and_normalized(self):
        water_atoms = PRESET_MOLECULES["water"].atoms
        basis, _ = SemiEmpiricalEngine.build_basis(water_atoms, SemiEmpiricalMethod.MNDO)
        s_mat = SemiEmpiricalEngine.calculate_overlap_matrix(water_atoms, basis)

        np.testing.assert_allclose(np.diag(s_mat), 1.0, atol=1e-6)
        np.testing.assert_allclose(s_mat, s_mat.T, atol=1e-6)

    def test_klopman_ohno_gamma_matrix(self):
        water_atoms = PRESET_MOLECULES["water"].atoms
        d_mat = SemiEmpiricalEngine.calculate_distance_matrix(water_atoms)
        gamma = SemiEmpiricalEngine.calculate_gamma_matrix(water_atoms, d_mat, AM1_PARAMETERS)

        assert gamma[0, 0] == AM1_PARAMETERS["O"].g_ss
        assert gamma[1, 1] == AM1_PARAMETERS["H"].g_ss
        assert gamma[2, 2] == AM1_PARAMETERS["H"].g_ss
        assert gamma[0, 1] == gamma[1, 0]
        assert 0.0 < gamma[0, 1] < gamma[0, 0]


class TestSemiEmpiricalConvergenceAndMolecules:
    @pytest.mark.parametrize("method", [
        SemiEmpiricalMethod.MNDO,
        SemiEmpiricalMethod.AM1,
        SemiEmpiricalMethod.PM3,
    ])
    def test_water_scf_converges_and_reproduces_literature(self, method):
        water = PRESET_MOLECULES["water"]
        result = SemiEmpiricalEngine.solve(water.atoms, method=method, max_iterations=50)

        assert result.scf_converged is True
        assert result.scf_iterations < 25
        assert result.total_valence_electrons == 8
        assert result.number_of_basis_functions == 6

        # Water heat of formation is exothermic
        assert result.heat_of_formation_kcal_mol < 0.0

        # Dipole moment for water
        assert 1.5 < result.dipole_moment.magnitude < 3.5

        # Mulliken charge on oxygen must be negative, hydrogens positive
        o_charge = result.atomic_populations[0].net_charge
        h1_charge = result.atomic_populations[1].net_charge
        h2_charge = result.atomic_populations[2].net_charge
        assert o_charge < -0.2
        assert h1_charge > 0.1
        assert h2_charge > 0.1
        # Net molecule charge should be zero
        assert pytest.approx(o_charge + h1_charge + h2_charge, abs=1e-3) == 0.0

        # Frontier orbitals: HOMO energy negative, LUMO energy > HOMO
        assert result.frontier_indices.homo_energy_ev < -8.0
        assert result.frontier_indices.gap_ev > 6.0
        assert result.frontier_indices.ionization_potential_ev > 8.0

    def test_methane_dipole_is_zero_by_symmetry(self):
        methane = PRESET_MOLECULES["methane"]
        result = SemiEmpiricalEngine.solve(methane.atoms, method=SemiEmpiricalMethod.AM1)

        assert result.scf_converged is True
        # Td symmetry implies vanishing dipole moment
        assert pytest.approx(result.dipole_moment.magnitude, abs=0.05) == 0.0
        # Carbon has negative net charge in methane
        assert result.atomic_populations[0].net_charge < 0.0

    def test_formaldehyde_carbonyl_polarization(self):
        form = PRESET_MOLECULES["formaldehyde"]
        result = SemiEmpiricalEngine.solve(form.atoms, method=SemiEmpiricalMethod.PM3)

        assert result.scf_converged is True
        # Formaldehyde dipole moment
        assert result.dipole_moment.magnitude > 1.5
        # Oxygen is more electronegative than carbon
        o_charge = result.atomic_populations[1].net_charge
        assert o_charge < 0.0

    def test_potential_energy_surface_scan_oh_bond(self):
        water = PRESET_MOLECULES["water"]
        # Scan O-H bond (atom 0 is O, atom 1 is H)
        points = SemiEmpiricalEngine.scan_potential_energy_surface(
            atoms=water.atoms,
            atom_idx_1=0,
            atom_idx_2=1,
            start_distance=0.7,
            end_distance=2.2,
            steps=10,
            method=SemiEmpiricalMethod.AM1,
        )

        assert len(points) == 10
        converged = [p for p in points if p.converged]
        assert len(converged) >= 8

        # Find distance with minimum energy
        min_pt = min(converged, key=lambda p: p.total_energy_ev)
        # Equilibrium O-H distance should be in physical range (0.8 - 1.2 Angstroms)
        assert 0.8 <= min_pt.coordinate_value <= 1.2
        # Relative energy at minimum is 0.0 kcal/mol
        assert pytest.approx(min_pt.relative_energy_kcal_mol, abs=1e-3) == 0.0


class TestSemiEmpiricalEdgeCases:
    def test_odd_electron_count_raises_value_error(self):
        oh_radical = [
            AtomCoordinate(index=0, symbol="O", x=0.0, y=0.0, z=0.0),
            AtomCoordinate(index=1, symbol="H", x=0.0, y=0.0, z=0.97),
        ]
        with pytest.raises(ValueError, match="odd"):
            SemiEmpiricalEngine.solve(oh_radical, method=SemiEmpiricalMethod.AM1)

    def test_unsupported_element_raises_value_error(self):
        iron_cluster = [
            AtomCoordinate(index=0, symbol="Fe", x=0.0, y=0.0, z=0.0),
        ]
        with pytest.raises(ValueError, match="not parameterized"):
            SemiEmpiricalEngine.solve(iron_cluster, method=SemiEmpiricalMethod.MNDO)
