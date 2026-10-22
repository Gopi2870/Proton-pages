"""
Unit tests for Quantum Chemistry & Hückel Molecular Orbital (HMO) Service.
Verifies secular determinant diagonalization, HOMO-LUMO gaps, delocalization energy, and aromaticity.
"""

import pytest
from app.models.quantum_chemistry import AromaticityType, OrbitalSymmetry
from app.services.hmo_service import HmoService, CONJUGATED_PRESETS


class TestHmoService:
    def test_presets_loading(self):
        presets = HmoService.get_presets()
        assert len(presets) >= 5
        benzene = HmoService.get_preset_by_id("benzene")
        assert benzene is not None
        assert benzene.formula == "C6H6"
        assert benzene.expected_aromaticity == AromaticityType.AROMATIC

    def test_jacobi_eigen_solver(self):
        # 2x2 symmetric matrix [[0, 1], [1, 0]]
        # Eigenvalues should be +1 and -1
        matrix = [[0.0, 1.0], [1.0, 0.0]]
        vals, vecs = HmoService.jacobi_eigen_solver(matrix)
        assert len(vals) == 2
        sorted_vals = sorted(vals, reverse=True)
        assert pytest.approx(sorted_vals[0], abs=1e-5) == 1.0
        assert pytest.approx(sorted_vals[1], abs=1e-5) == -1.0

    def test_ethylene_hmo(self):
        res = HmoService.calculate_hmo(preset_id="ethylene")
        assert res.atom_count == 2
        assert res.pi_electron_count == 2
        assert len(res.orbitals) == 2

        # Most bonding m1 = +1.0, antibonding m2 = -1.0
        psi1 = res.orbitals[0]
        psi2 = res.orbitals[1]
        assert pytest.approx(psi1.energy_coefficient_m, abs=1e-3) == 1.0
        assert pytest.approx(psi2.energy_coefficient_m, abs=1e-3) == -1.0
        assert psi1.electron_occupancy == 2
        assert psi2.electron_occupancy == 0
        assert psi1.is_homo
        assert psi2.is_lumo

        # HOMO-LUMO gap = 2.0 beta
        assert pytest.approx(res.homo_lumo_gap_beta, abs=1e-3) == 2.0
        # Pi-bond order should be 1.0
        assert pytest.approx(res.bond_orders[0][1], abs=1e-3) == 1.0

    def test_butadiene_hmo_delocalization(self):
        res = HmoService.calculate_hmo(preset_id="1_3_butadiene")
        assert res.atom_count == 4
        assert res.pi_electron_count == 4

        # Eigen-coefficients: 1.618, 0.618, -0.618, -1.618
        m_vals = [o.energy_coefficient_m for o in res.orbitals]
        assert pytest.approx(m_vals[0], abs=1e-3) == 1.618
        assert pytest.approx(m_vals[1], abs=1e-3) == 0.618
        assert pytest.approx(m_vals[2], abs=1e-3) == -0.618
        assert pytest.approx(m_vals[3], abs=1e-3) == -1.618

        # Delocalization energy ~ 0.472 beta
        assert pytest.approx(res.delocalization_energy_beta, abs=0.01) == 0.472
        # C1-C2 has higher double-bond character than central C2-C3
        assert res.bond_orders[0][1] > res.bond_orders[1][2]

    def test_benzene_aromaticity_and_degeneracy(self):
        res = HmoService.calculate_hmo(preset_id="benzene")
        assert res.aromaticity_classification == AromaticityType.AROMATIC
        assert res.is_closed_shell
        # Delocalization energy = 2.00 beta
        assert pytest.approx(res.delocalization_energy_beta, abs=0.01) == 2.00

        # Energy levels: +2.0, +1.0, +1.0, -1.0, -1.0, -2.0
        m_vals = [o.energy_coefficient_m for o in res.orbitals]
        assert pytest.approx(m_vals[0], abs=1e-3) == 2.0
        assert pytest.approx(m_vals[1], abs=1e-3) == 1.0
        assert pytest.approx(m_vals[2], abs=1e-3) == 1.0
        assert pytest.approx(m_vals[3], abs=1e-3) == -1.0
        assert pytest.approx(m_vals[4], abs=1e-3) == -1.0
        assert pytest.approx(m_vals[5], abs=1e-3) == -2.0

        # Uniform aromatic bond order = 2/3 = 0.667
        for i in range(5):
            assert pytest.approx(res.bond_orders[i][i + 1], abs=1e-2) == 0.667
        assert pytest.approx(res.bond_orders[5][0], abs=1e-2) == 0.667

    def test_cyclobutadiene_antiaromatic(self):
        res = HmoService.calculate_hmo(preset_id="cyclobutadiene")
        assert res.aromaticity_classification == AromaticityType.ANTI_AROMATIC
        # Non-bonding degenerate orbitals at 0.0 beta
        m_vals = [o.energy_coefficient_m for o in res.orbitals]
        assert pytest.approx(m_vals[1], abs=1e-3) == 0.0
        assert pytest.approx(m_vals[2], abs=1e-3) == 0.0
