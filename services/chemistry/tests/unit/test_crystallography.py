"""
Unit tests for Crystallography & Solid-State Materials Science Service.
Tests metric tensors, cell volumes, density, Miller d-spacings, extinction rules, and XRD synthesis.
"""

import math
import pytest
from app.models.crystallography import (
    CrystalSystem,
    BravaisLatticeType,
    XRaySource,
)
from app.services.crystallography_service import CrystallographyService, CRYSTAL_PRESETS


class TestCrystallographyService:
    def test_presets_loading(self):
        presets = CrystallographyService.get_presets()
        assert len(presets) >= 10
        copper = CrystallographyService.get_preset_by_id("copper")
        assert copper is not None
        assert copper.formula == "Cu"
        assert copper.crystal_system == CrystalSystem.CUBIC
        assert copper.bravais_lattice == BravaisLatticeType.FACE_CENTERED_CUBIC

    def test_cell_volume_cubic(self):
        # Cubic with a = 4.0 Angstroms
        vol = CrystallographyService.calculate_cell_volume(4.0, 4.0, 4.0, 90.0, 90.0, 90.0)
        assert pytest.approx(vol, rel=1e-4) == 64.0

    def test_cell_volume_hexagonal(self):
        # Hexagonal with a = 3.0, c = 5.0, alpha=90, beta=90, gamma=120
        # V = a^2 * c * sin(60) = 9 * 5 * (sqrt(3)/2) = 45 * 0.866025 = 38.9711
        vol = CrystallographyService.calculate_cell_volume(3.0, 3.0, 5.0, 90.0, 90.0, 120.0)
        assert pytest.approx(vol, rel=1e-3) == 38.9711

    def test_density_calculation_copper(self):
        # Copper: FCC (Z = 4), a = 3.615 A, M = 63.546 g/mol
        # V = 3.615^3 = 47.238 A^3
        # rho = (4 * 63.546) / (47.238 * 0.602214) = 8.93 g/cm^3
        vol = 3.615**3
        density = CrystallographyService.calculate_density(4, 63.546, vol)
        assert pytest.approx(density, rel=1e-2) == 8.93

    def test_miller_d_spacing_cubic(self):
        # Copper {111} plane with a = 3.615 A
        # d_111 = 3.615 / sqrt(1^2 + 1^2 + 1^2) = 3.615 / sqrt(3) = 2.0871 A
        d = CrystallographyService.calculate_d_spacing(
            1, 1, 1, 3.615, 3.615, 3.615, 90.0, 90.0, 90.0, CrystalSystem.CUBIC
        )
        assert pytest.approx(d, rel=1e-3) == 2.0871

        # {200} plane: d = 3.615 / 2 = 1.8075 A
        d_200 = CrystallographyService.calculate_d_spacing(
            2, 0, 0, 3.615, 3.615, 3.615, 90.0, 90.0, 90.0, CrystalSystem.CUBIC
        )
        assert pytest.approx(d_200, rel=1e-3) == 1.8075

    def test_extinction_rules(self):
        # FCC allows only unmixed (all even or all odd)
        assert CrystallographyService.is_diffraction_allowed(1, 1, 1, BravaisLatticeType.FACE_CENTERED_CUBIC)
        assert CrystallographyService.is_diffraction_allowed(2, 0, 0, BravaisLatticeType.FACE_CENTERED_CUBIC)
        assert not CrystallographyService.is_diffraction_allowed(1, 0, 0, BravaisLatticeType.FACE_CENTERED_CUBIC)
        assert not CrystallographyService.is_diffraction_allowed(2, 1, 0, BravaisLatticeType.FACE_CENTERED_CUBIC)

        # BCC allows only h + k + l even
        assert CrystallographyService.is_diffraction_allowed(1, 1, 0, BravaisLatticeType.BODY_CENTERED_CUBIC)
        assert CrystallographyService.is_diffraction_allowed(2, 0, 0, BravaisLatticeType.BODY_CENTERED_CUBIC)
        assert not CrystallographyService.is_diffraction_allowed(1, 1, 1, BravaisLatticeType.BODY_CENTERED_CUBIC)

    def test_simulate_xrd_copper(self):
        spectrum = CrystallographyService.simulate_xrd(
            preset_id="copper",
            x_ray_source=XRaySource.CU_KA,
            max_two_theta=90.0,
        )
        assert spectrum.chemical_formula == "Cu"
        assert len(spectrum.peaks) >= 3

        # First peak should be (1, 1, 1) around 2-theta = 43.3 deg for Cu-Ka (lambda = 1.5406 A)
        p1 = spectrum.peaks[0]
        assert (p1.h, p1.k, p1.l) == (1, 1, 1)
        assert pytest.approx(p1.two_theta_degrees, abs=1.0) == 43.3
        assert len(spectrum.two_theta_grid) == len(spectrum.intensity_profile)
        assert max(spectrum.intensity_profile) > 50.0

    def test_simulate_xrd_nacl(self):
        spectrum = CrystallographyService.simulate_xrd(
            preset_id="nacl",
            x_ray_source=XRaySource.CU_KA,
            max_two_theta=80.0,
        )
        assert spectrum.chemical_formula == "NaCl"
        assert len(spectrum.peaks) >= 4
        # Peak 200 should be prominent
        hkls = [(p.h, p.k, p.l) for p in spectrum.peaks]
        assert (2, 0, 0) in hkls or (1, 1, 1) in hkls
