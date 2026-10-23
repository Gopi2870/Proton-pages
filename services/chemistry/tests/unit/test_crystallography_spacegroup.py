"""
Unit tests for Crystallographic Space Groups, Wyckoff Positions,
Symmetry Operations, Metric Tensors, and Powder XRD Bragg Diffraction.
"""

import math
import pytest
from app.models.crystallography_spacegroup import (
    CrystalSystem,
    CenteringType,
    XRayRadiationSource,
    UnitCellParameters,
    FractionalSiteCoordinate,
)
from app.services.crystallography_spacegroup_service import (
    CrystallographySpaceGroupService,
    parse_jones_faithful_string,
    SPACE_GROUPS_REGISTRY,
)
from app.services.crystallography_scattering import (
    calculate_atomic_form_factor,
    CROMER_MANN_COEFFICIENTS,
)


class TestJonesFaithfulParser:
    def test_identity_operation(self):
        op = parse_jones_faithful_string("x, y, z")
        assert op.is_identity is True
        assert op.is_inversion is False
        assert op.rotation_order == 1
        assert op.determinant == 1.0
        assert op.rotation_matrix == [[1.0, 0.0, 0.0], [0.0, 1.0, 0.0], [0.0, 0.0, 1.0]]
        assert op.translation_vector == [0.0, 0.0, 0.0]

    def test_inversion_center(self):
        op = parse_jones_faithful_string("-x, -y, -z")
        assert op.is_identity is False
        assert op.is_inversion is True
        assert op.determinant == -1.0
        assert op.rotation_matrix == [[-1.0, 0.0, 0.0], [0.0, -1.0, 0.0], [0.0, 0.0, -1.0]]
        assert op.translation_vector == [0.0, 0.0, 0.0]

    def test_screw_axis_and_glide_plane(self):
        # 2_1 screw axis: -x, y+1/2, -z
        op_screw = parse_jones_faithful_string("-x, y+1/2, -z")
        assert op_screw.is_identity is False
        assert op_screw.rotation_matrix[0][0] == -1.0
        assert op_screw.rotation_matrix[1][1] == 1.0
        assert op_screw.rotation_matrix[2][2] == -1.0
        assert op_screw.translation_vector == [0.0, 0.5, 0.0]
        assert op_screw.determinant == 1.0  # Proper rotation

        # Axial glide plane perpendicular to x with translation along z: -x, y, z+1/2
        op_glide = parse_jones_faithful_string("-x, y, z+1/2")
        assert op_glide.determinant == -1.0  # Reflection/glide
        assert op_glide.rotation_matrix[0][0] == -1.0
        assert op_glide.rotation_matrix[1][1] == 1.0
        assert op_glide.rotation_matrix[2][2] == 1.0
        assert op_glide.translation_vector == [0.0, 0.0, 0.5]

    def test_hexagonal_trigonal_rotations(self):
        # 3-fold rotation: -y, x-y, z
        op_3fold = parse_jones_faithful_string("-y, x-y, z")
        assert op_3fold.rotation_matrix[0] == [0.0, -1.0, 0.0]
        assert op_3fold.rotation_matrix[1] == [1.0, -1.0, 0.0]
        assert op_3fold.rotation_matrix[2] == [0.0, 0.0, 1.0]
        assert op_3fold.rotation_order == 3
        assert abs(op_3fold.determinant - 1.0) < 1e-4


class TestSpaceGroupRegistry:
    def test_full_230_catalog_coverage(self):
        assert len(SPACE_GROUPS_REGISTRY) == 230
        for num in range(1, 231):
            assert num in SPACE_GROUPS_REGISTRY
            sg = SPACE_GROUPS_REGISTRY[num]
            assert sg.number == num
            assert sg.crystal_system in list(CrystalSystem)

    def test_all_seven_crystal_systems_present(self):
        systems = {sg.crystal_system for sg in SPACE_GROUPS_REGISTRY.values()}
        assert len(systems) == 7
        assert systems == {
            CrystalSystem.TRICLINIC,
            CrystalSystem.MONOCLINIC,
            CrystalSystem.ORTHORHOMBIC,
            CrystalSystem.TETRAGONAL,
            CrystalSystem.TRIGONAL,
            CrystalSystem.HEXAGONAL,
            CrystalSystem.CUBIC,
        }

    def test_key_archetype_space_groups(self):
        # 1: P1
        p1 = CrystallographySpaceGroupService.get_space_group(1)
        assert p1.hermann_mauguin == "P1"
        assert p1.is_centrosymmetric is False
        assert len(p1.symmetry_operations) == 1

        # 2: P-1
        p_1 = CrystallographySpaceGroupService.get_space_group(2)
        assert p_1.hermann_mauguin == "P-1"
        assert p_1.is_centrosymmetric is True
        assert len(p_1.symmetry_operations) == 2

        # 14: P2_1/c
        p21c = CrystallographySpaceGroupService.get_space_group(14)
        assert p21c.hermann_mauguin == "P2_1/c"
        assert p21c.is_centrosymmetric is True
        assert len(p21c.symmetry_operations) == 4

        # 136: P4_2/mnm (Rutile)
        rutile = CrystallographySpaceGroupService.get_space_group(136)
        assert rutile.hermann_mauguin == "P4_2/mnm"
        assert rutile.crystal_system == CrystalSystem.TETRAGONAL
        assert len(rutile.symmetry_operations) == 16

        # 194: P6_3/mmc (HCP Mg)
        hcp = CrystallographySpaceGroupService.get_space_group(194)
        assert hcp.hermann_mauguin == "P6_3/mmc"
        assert hcp.crystal_system == CrystalSystem.HEXAGONAL
        assert len(hcp.symmetry_operations) == 24

        # 221: Pm-3m (Perovskite)
        pm3m = CrystallographySpaceGroupService.get_space_group(221)
        assert pm3m.hermann_mauguin == "Pm-3m"
        assert len(pm3m.symmetry_operations) == 48

        # 225: Fm-3m (Rocksalt NaCl)
        fm3m = CrystallographySpaceGroupService.get_space_group(225)
        assert fm3m.hermann_mauguin == "Fm-3m"
        assert fm3m.centering == CenteringType.FACE_CENTERED
        assert len(fm3m.symmetry_operations) == 192

        # 229: Im-3m (BCC Fe)
        im3m = CrystallographySpaceGroupService.get_space_group(229)
        assert im3m.hermann_mauguin == "Im-3m"
        assert im3m.centering == CenteringType.BODY_CENTERED
        assert len(im3m.symmetry_operations) == 96


class TestWyckoffOrbitGeneration:
    def test_nacl_rocksalt_sites(self):
        # SG 225 (Fm-3m)
        # Na at 4a (0,0,0) -> 4 positions in unit cell
        na_orbit = CrystallographySpaceGroupService.generate_wyckoff_orbit(
            space_group_number=225, element="Na", x=0.0, y=0.0, z=0.0
        )
        assert len(na_orbit) == 4
        coords = {(at.x, at.y, at.z) for at in na_orbit}
        assert (0.0, 0.0, 0.0) in coords
        assert (0.0, 0.5, 0.5) in coords
        assert (0.5, 0.0, 0.5) in coords
        assert (0.5, 0.5, 0.0) in coords

        # Cl at 4b (0.5, 0.5, 0.5) -> 4 positions in unit cell
        cl_orbit = CrystallographySpaceGroupService.generate_wyckoff_orbit(
            space_group_number=225, element="Cl", x=0.5, y=0.5, z=0.5
        )
        assert len(cl_orbit) == 4
        coords_cl = {(at.x, at.y, at.z) for at in cl_orbit}
        assert (0.5, 0.5, 0.5) in coords_cl
        assert (0.5, 0.0, 0.0) in coords_cl
        assert (0.0, 0.5, 0.0) in coords_cl
        assert (0.0, 0.0, 0.5) in coords_cl

    def test_perovskite_srtio3_sites(self):
        # SG 221 (Pm-3m)
        # Sr at 1a (0,0,0) -> 1 position
        sr_orbit = CrystallographySpaceGroupService.generate_wyckoff_orbit(
            space_group_number=221, element="Sr", x=0.0, y=0.0, z=0.0
        )
        assert len(sr_orbit) == 1
        assert (sr_orbit[0].x, sr_orbit[0].y, sr_orbit[0].z) == (0.0, 0.0, 0.0)

        # Ti at 1b (0.5, 0.5, 0.5) -> 1 position
        ti_orbit = CrystallographySpaceGroupService.generate_wyckoff_orbit(
            space_group_number=221, element="Ti", x=0.5, y=0.5, z=0.5
        )
        assert len(ti_orbit) == 1
        assert (ti_orbit[0].x, ti_orbit[0].y, ti_orbit[0].z) == (0.5, 0.5, 0.5)

        # O at 3c (0, 0.5, 0.5) -> 3 positions
        o_orbit = CrystallographySpaceGroupService.generate_wyckoff_orbit(
            space_group_number=221, element="O", x=0.0, y=0.5, z=0.5
        )
        assert len(o_orbit) == 3
        o_coords = {(at.x, at.y, at.z) for at in o_orbit}
        assert (0.0, 0.5, 0.5) in o_coords
        assert (0.5, 0.0, 0.5) in o_coords
        assert (0.5, 0.5, 0.0) in o_coords

    def test_alpha_iron_bcc_sites(self):
        # SG 229 (Im-3m)
        # Fe at 2a (0,0,0) -> 2 positions: (0,0,0) and (0.5, 0.5, 0.5)
        fe_orbit = CrystallographySpaceGroupService.generate_wyckoff_orbit(
            space_group_number=229, element="Fe", x=0.0, y=0.0, z=0.0
        )
        assert len(fe_orbit) == 2
        fe_coords = {(at.x, at.y, at.z) for at in fe_orbit}
        assert (0.0, 0.0, 0.0) in fe_coords
        assert (0.5, 0.5, 0.5) in fe_coords

    def test_rutile_tio2_sites(self):
        # SG 136 (P4_2/mnm)
        # Ti at 2a (0,0,0) -> 2 positions: (0,0,0) and (0.5, 0.5, 0.5)
        ti_orbit = CrystallographySpaceGroupService.generate_wyckoff_orbit(
            space_group_number=136, element="Ti", x=0.0, y=0.0, z=0.0
        )
        assert len(ti_orbit) == 2

        # O at 4f (0.305, 0.305, 0) -> 4 positions
        o_orbit = CrystallographySpaceGroupService.generate_wyckoff_orbit(
            space_group_number=136, element="O", x=0.305, y=0.305, z=0.0
        )
        assert len(o_orbit) == 4


class TestMetricTensorAndCoordinates:
    def test_cubic_metric_tensor(self):
        cell = UnitCellParameters(a=5.0, b=5.0, c=5.0, alpha=90.0, beta=90.0, gamma=90.0)
        res = CrystallographySpaceGroupService.calculate_metric_tensor(cell)
        assert res.volume_angstrom3 == 125.0
        assert res.direct_metric_tensor[0][0] == 25.0
        assert res.direct_metric_tensor[1][1] == 25.0
        assert res.direct_metric_tensor[2][2] == 25.0
        assert res.direct_metric_tensor[0][1] == 0.0
        assert abs(res.reciprocal_a_star - 0.2) < 1e-4
        assert abs(res.reciprocal_b_star - 0.2) < 1e-4
        assert abs(res.reciprocal_c_star - 0.2) < 1e-4

    def test_hexagonal_metric_tensor(self):
        # a=b=3.0, c=5.0, gamma=120
        cell = UnitCellParameters(a=3.0, b=3.0, c=5.0, alpha=90.0, beta=90.0, gamma=120.0)
        res = CrystallographySpaceGroupService.calculate_metric_tensor(cell)
        expected_vol = 3.0 * 3.0 * 5.0 * math.sin(math.radians(120.0))
        assert abs(res.volume_angstrom3 - expected_vol) < 1e-2

    def test_cartesian_round_trip(self):
        cell = UnitCellParameters(a=4.5, b=5.2, c=6.1, alpha=85.0, beta=102.0, gamma=94.0)
        res = CrystallographySpaceGroupService.calculate_metric_tensor(cell)
        m = res.direct_to_cartesian_matrix
        m_inv = res.cartesian_to_direct_matrix

        # Verify identity M * M^-1 = I
        for i in range(3):
            for j in range(3):
                dot = sum(m[i][k] * m_inv[k][j] for k in range(3))
                expected = 1.0 if i == j else 0.0
                assert abs(dot - expected) < 1e-4

    def test_minimum_image_periodic_distance(self):
        cell = UnitCellParameters(a=10.0, b=10.0, c=10.0, alpha=90.0, beta=90.0, gamma=90.0)
        p1 = (0.05, 0.5, 0.5)
        p2 = (0.95, 0.5, 0.5)
        # Direct distance in unit cell would be (0.95 - 0.05)*10 = 9.0 Angstrom
        # With periodic boundary wrap across cell border: distance is (1.0 - 0.90)*10 = 1.0 Angstrom!
        dist = CrystallographySpaceGroupService.calculate_minimum_image_distance(p1, p2, cell)
        assert abs(dist - 1.0) < 1e-4


class TestCromerMannScattering:
    def test_forward_scattering_equals_atomic_number(self):
        elements = ["H", "C", "N", "O", "Na", "Si", "Cl", "Fe", "Cu"]
        for el in elements:
            # At s = 0 (sin(theta)/lambda = 0), f_0(0) = Z
            f0 = calculate_atomic_form_factor(el, sin_theta_over_lambda=0.0, thermal_b=0.0)
            a1, b1, a2, b2, a3, b3, a4, b4, c = CROMER_MANN_COEFFICIENTS[el]
            expected_z = a1 + a2 + a3 + a4 + c
            assert abs(f0 - expected_z) < 1e-3

    def test_form_factor_monotonic_decay(self):
        # Scattering decreases as s increases
        f_low = calculate_atomic_form_factor("Fe", 0.1)
        f_mid = calculate_atomic_form_factor("Fe", 0.3)
        f_high = calculate_atomic_form_factor("Fe", 0.6)
        assert f_low > f_mid > f_high


class TestPowderXrdSimulation:
    def test_nacl_diffraction_extinctions(self):
        cell = UnitCellParameters(a=5.64, b=5.64, c=5.64, alpha=90.0, beta=90.0, gamma=90.0)
        na_orbit = CrystallographySpaceGroupService.generate_wyckoff_orbit(225, "Na", 0.0, 0.0, 0.0)
        cl_orbit = CrystallographySpaceGroupService.generate_wyckoff_orbit(225, "Cl", 0.5, 0.5, 0.5)
        atoms = na_orbit + cl_orbit

        pattern = CrystallographySpaceGroupService.simulate_powder_xrd(
            space_group_number=225,
            unit_cell=cell,
            atoms=atoms,
            radiation_source=XRayRadiationSource.CU_KA,
            two_theta_min=10.0,
            two_theta_max=80.0,
        )

        assert pattern.total_allowed_reflections > 0
        assert pattern.total_extinct_reflections > 0
        assert len(pattern.two_theta_grid) > 0
        assert len(pattern.intensity_profile) == len(pattern.two_theta_grid)

        # In FCC (NaCl), planes with mixed parity like (100) and (110) must be systematic absences!
        extinct_planes = {(p.h, p.k, p.l) for p in pattern.peaks if p.is_systematic_absence}
        allowed_planes = {(p.h, p.k, p.l) for p in pattern.peaks if not p.is_systematic_absence}

        # Check {1, 1, 1} and {2, 0, 0} and {2, 2, 0} families are allowed
        has_111 = any(abs(p.h) == 1 and abs(p.k) == 1 and abs(p.l) == 1 for p in pattern.peaks if not p.is_systematic_absence)
        has_200 = any(
            (abs(p.h) == 2 and p.k == 0 and p.l == 0) or
            (p.h == 0 and abs(p.k) == 2 and p.l == 0) or
            (p.h == 0 and p.k == 0 and abs(p.l) == 2)
            for p in pattern.peaks if not p.is_systematic_absence
        )
        assert has_111 is True
        assert has_200 is True

        # Check (1, 0, 0) or (1, 1, 0) are absent
        has_100_extinct = any(abs(p.h) == 1 and p.k == 0 and p.l == 0 for p in pattern.peaks if p.is_systematic_absence)
        has_110_extinct = any(abs(p.h) == 1 and abs(p.k) == 1 and p.l == 0 for p in pattern.peaks if p.is_systematic_absence)
        assert has_100_extinct or has_110_extinct
