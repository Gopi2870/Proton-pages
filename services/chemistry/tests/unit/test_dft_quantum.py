"""
Unit tests for Computational Quantum Chemistry & DFT Kohn-Sham Solver (PR #052).
"""
import pytest
from app.schemas.dft_quantum import (
    DftCalculationRequest,
    TdDftRequest,
    MepSurfaceRequest,
)
from app.services.dft_quantum_service import DftKohnShamEngine


class TestDftKohnShamEngine:
    def test_get_presets(self):
        presets = DftKohnShamEngine.get_preset_molecules()
        assert len(presets) >= 4
        ids = [m.id for m in presets]
        assert "benzene" in ids
        assert "water" in ids
        assert "formaldehyde" in ids
        assert "ethylene" in ids

    def test_scf_convergence_benzene(self):
        req = DftCalculationRequest(molecule_id="benzene", functional="B3LYP", enable_diis=True)
        res = DftKohnShamEngine.solve_dft(req)
        assert res.molecule_name == "Benzene"
        assert res.scf_converged is True
        assert res.iterations_count <= 20
        assert res.total_energy_hartree < -200.0
        assert res.homo_lumo_gap_ev > 5.0
        assert res.chemical_hardness_ev > 2.0
        assert len(res.scf_history) >= 5

        # Check orbital labels
        homo = next(o for o in res.orbitals if o.is_homo)
        lumo = next(o for o in res.orbitals if o.is_lumo)
        assert homo.energy_ev < lumo.energy_ev
        assert homo.occupation == 2.0
        assert lumo.occupation == 0.0

    def test_functional_variation(self):
        req_b3lyp = DftCalculationRequest(molecule_id="water", functional="B3LYP")
        req_lda = DftCalculationRequest(molecule_id="water", functional="LDA")
        res_b3lyp = DftKohnShamEngine.solve_dft(req_b3lyp)
        res_lda = DftKohnShamEngine.solve_dft(req_lda)
        assert res_b3lyp.total_energy_hartree != res_lda.total_energy_hartree
        assert res_b3lyp.functional == "B3LYP"
        assert res_lda.functional == "LDA"

    def test_td_dft_excitations(self):
        req = TdDftRequest(molecule_id="benzene", n_excited_states=5)
        res = DftKohnShamEngine.calculate_td_dft(req)
        assert len(res.states) == 5
        assert res.absorption_max_wavelength_nm > 0.0
        for s in res.states:
            assert s.excitation_energy_ev > 0.0
            assert s.wavelength_nm > 0.0
            assert s.oscillator_strength_f >= 0.0

    def test_mep_surface_generation(self):
        req = MepSurfaceRequest(molecule_id="water", grid_resolution=16)
        res = DftKohnShamEngine.generate_mep_surface(req)
        assert len(res.points) > 20
        assert res.min_potential_au < res.max_potential_au
        # Water oxygen creates negative MEP region
        assert res.min_potential_au < 0.0
