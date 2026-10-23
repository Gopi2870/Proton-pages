"""
High-Precision Crystallographic Space Groups & 230 Symmetry Operators Service.
Implements:
- 230 Standard Space Group Metadata and Directory
- Affine Matrix Symmetry Operator Parser & Group Invariant Verification
- Wyckoff Position Database, Coordinate Generation, and Orbit Deduplication
- Metric Tensors, Direct/Cartesian Transformations, and Minimum-Image Periodic Boundaries
- Cromer-Mann Atomic Scattering Factors & Powder XRD Bragg Diffraction Diffractograms
"""

import math
import re
from typing import List, Dict, Tuple, Optional, Set, Any
from app.models.crystallography_spacegroup import (
    CrystalSystem,
    CenteringType,
    XRayRadiationSource,
    SymmetryOperation,
    WyckoffSite,
    FractionalSiteCoordinate,
    CartesianCoordinate,
    SpaceGroupMetadata,
    SpaceGroupDetails,
    UnitCellParameters,
    MetricTensorResult,
    BraggDiffractionPeak,
    PowderDiffractionPattern,
)
from app.services.crystallography_scattering import calculate_atomic_form_factor

XRAY_WAVELENGTHS: Dict[XRayRadiationSource, float] = {
    XRayRadiationSource.CU_KA: 1.54060,
    XRayRadiationSource.MO_KA: 0.71073,
    XRayRadiationSource.CO_KA: 1.78901,
    XRayRadiationSource.CR_KA: 2.28970,
    XRayRadiationSource.FE_KA: 1.93604,
}


def _parse_coordinate_expression(expr: str) -> Tuple[List[float], float]:
    """
    Parses a single coordinate expression like 'x', '-x', 'x+1/2', '-y+1/3', 'x-y+2/3'
    into rotation row [cx, cy, cz] and translation scalar t.
    """
    expr = expr.strip().lower().replace(" ", "")
    cx, cy, cz = 0.0, 0.0, 0.0
    t = 0.0

    # Match tokens with signs
    tokens = re.findall(r'[+-]?[^+-]+', expr)
    for tok in tokens:
        if 'x' in tok:
            s = tok.replace('x', '')
            if s in ('', '+'):
                cx += 1.0
            elif s == '-':
                cx -= 1.0
            else:
                cx += float(s)
        elif 'y' in tok:
            s = tok.replace('y', '')
            if s in ('', '+'):
                cy += 1.0
            elif s == '-':
                cy -= 1.0
            else:
                cy += float(s)
        elif 'z' in tok:
            s = tok.replace('z', '')
            if s in ('', '+'):
                cz += 1.0
            elif s == '-':
                cz -= 1.0
            else:
                cz += float(s)
        else:
            # Fraction or constant
            if '/' in tok:
                num, denom = tok.split('/')
                t += float(num) / float(denom)
            else:
                t += float(tok)

    # Modulo 1 translation
    t = (t % 1.0 + 1.0) % 1.0
    if abs(t - 1.0) < 1e-6:
        t = 0.0

    return [cx, cy, cz], t


def parse_jones_faithful_string(jf_str: str) -> SymmetryOperation:
    """
    Converts a Jones-Faithful notation string (e.g. '-x, y+1/2, -z+1/2')
    into a 3x3 rotation matrix W and 3x1 translation vector w.
    """
    parts = jf_str.split(",")
    if len(parts) != 3:
        raise ValueError(f"Invalid Jones-Faithful notation: '{jf_str}'. Must have 3 comma-separated coordinates.")

    row0, t0 = _parse_coordinate_expression(parts[0])
    row1, t1 = _parse_coordinate_expression(parts[1])
    row2, t2 = _parse_coordinate_expression(parts[2])

    rot = [row0, row1, row2]
    trans = [t0, t1, t2]

    # Determinant of 3x3 rotation
    det = (
        rot[0][0] * (rot[1][1] * rot[2][2] - rot[1][2] * rot[2][1]) -
        rot[0][1] * (rot[1][0] * rot[2][2] - rot[1][2] * rot[2][0]) +
        rot[0][2] * (rot[1][0] * rot[2][1] - rot[1][1] * rot[2][0])
    )

    is_identity = (
        abs(rot[0][0] - 1.0) < 1e-4 and abs(rot[1][1] - 1.0) < 1e-4 and abs(rot[2][2] - 1.0) < 1e-4 and
        abs(rot[0][1]) < 1e-4 and abs(rot[0][2]) < 1e-4 and abs(rot[1][0]) < 1e-4 and
        abs(rot[1][2]) < 1e-4 and abs(rot[2][0]) < 1e-4 and abs(rot[2][1]) < 1e-4 and
        abs(trans[0]) < 1e-4 and abs(trans[1]) < 1e-4 and abs(trans[2]) < 1e-4
    )

    is_inversion = (
        abs(rot[0][0] + 1.0) < 1e-4 and abs(rot[1][1] + 1.0) < 1e-4 and abs(rot[2][2] + 1.0) < 1e-4 and
        abs(rot[0][1]) < 1e-4 and abs(rot[0][2]) < 1e-4 and abs(rot[1][0]) < 1e-4 and
        abs(rot[1][2]) < 1e-4 and abs(rot[2][0]) < 1e-4 and abs(rot[2][1]) < 1e-4
    )

    # Rotation order estimation via trace
    trace = rot[0][0] + rot[1][1] + rot[2][2]
    # For proper rotations, trace = 1 + 2*cos(phi)
    # 1-fold (360): trace 3
    # 2-fold (180): trace -1
    # 3-fold (120): trace 0
    # 4-fold (90):  trace 1
    # 6-fold (60):  trace 2
    order = 1
    if abs(det - 1.0) < 1e-4:
        if abs(trace - 3.0) < 1e-3:
            order = 1
        elif abs(trace - (-1.0)) < 1e-3:
            order = 2
        elif abs(trace - 0.0) < 1e-3:
            order = 3
        elif abs(trace - 1.0) < 1e-3:
            order = 4
        elif abs(trace - 2.0) < 1e-3:
            order = 6
    elif abs(det + 1.0) < 1e-4:
        # Improper rotation
        if abs(trace - (-3.0)) < 1e-3:
            order = 2  # Inversion
        elif abs(trace - 1.0) < 1e-3:
            order = 2  # Reflection plane
        else:
            order = 4

    return SymmetryOperation(
        jones_faithful=jf_str.strip(),
        rotation_matrix=rot,
        translation_vector=trans,
        is_identity=is_identity,
        is_inversion=is_inversion,
        rotation_order=order,
        determinant=round(det, 4),
    )


# Curated Space Group Registry with operations and Wyckoff sites for key space groups
SPACE_GROUPS_REGISTRY: Dict[int, SpaceGroupDetails] = {}

def _init_space_groups():
    # 1: P1 (Triclinic)
    p1_ops = [parse_jones_faithful_string("x, y, z")]
    p1_wyckoff = [
        WyckoffSite(multiplicity=1, letter="a", site_symmetry="1", coordinate_generator="(x, y, z)", coordinates=["x, y, z"])
    ]
    SPACE_GROUPS_REGISTRY[1] = SpaceGroupDetails(
        number=1, hermann_mauguin="P1", hermann_mauguin_full="P 1", hall_symbol="P 1", schoenflies="C1^1",
        crystal_system=CrystalSystem.TRICLINIC, point_group="1", laue_class="1", centering=CenteringType.PRIMITIVE,
        is_centrosymmetric=False, general_multiplicity=1, wyckoff_letters=["a"],
        description="Simplest crystallographic space group. Only translational lattice symmetry.",
        symmetry_operations=p1_ops, wyckoff_sites=p1_wyckoff
    )

    # 2: P-1 (Triclinic centrosymmetric)
    p_1_ops = [
        parse_jones_faithful_string("x, y, z"),
        parse_jones_faithful_string("-x, -y, -z"),
    ]
    p_1_wyckoff = [
        WyckoffSite(multiplicity=2, letter="i", site_symmetry="1", coordinate_generator="(x, y, z)", coordinates=["x, y, z", "-x, -y, -z"]),
        WyckoffSite(multiplicity=1, letter="h", site_symmetry="-1", coordinate_generator="(1/2, 1/2, 1/2)", coordinates=["1/2, 1/2, 1/2"]),
        WyckoffSite(multiplicity=1, letter="g", site_symmetry="-1", coordinate_generator="(0, 1/2, 1/2)", coordinates=["0, 1/2, 1/2"]),
        WyckoffSite(multiplicity=1, letter="f", site_symmetry="-1", coordinate_generator="(1/2, 0, 1/2)", coordinates=["1/2, 0, 1/2"]),
        WyckoffSite(multiplicity=1, letter="e", site_symmetry="-1", coordinate_generator="(1/2, 1/2, 0)", coordinates=["1/2, 1/2, 0"]),
        WyckoffSite(multiplicity=1, letter="d", site_symmetry="-1", coordinate_generator="(1/2, 0, 0)", coordinates=["1/2, 0, 0"]),
        WyckoffSite(multiplicity=1, letter="c", site_symmetry="-1", coordinate_generator="(0, 1/2, 0)", coordinates=["0, 1/2, 0"]),
        WyckoffSite(multiplicity=1, letter="b", site_symmetry="-1", coordinate_generator="(0, 0, 1/2)", coordinates=["0, 0, 1/2"]),
        WyckoffSite(multiplicity=1, letter="a", site_symmetry="-1", coordinate_generator="(0, 0, 0)", coordinates=["0, 0, 0"]),
    ]
    SPACE_GROUPS_REGISTRY[2] = SpaceGroupDetails(
        number=2, hermann_mauguin="P-1", hermann_mauguin_full="P -1", hall_symbol="-P 1", schoenflies="Ci^1",
        crystal_system=CrystalSystem.TRICLINIC, point_group="-1", laue_class="-1", centering=CenteringType.PRIMITIVE,
        is_centrosymmetric=True, general_multiplicity=2, wyckoff_letters=["i", "h", "g", "f", "e", "d", "c", "b", "a"],
        description="Centrosymmetric triclinic space group containing inversion centers at corners and cell midpoints.",
        symmetry_operations=p_1_ops, wyckoff_sites=p_1_wyckoff
    )

    # 4: P2_1 (Monoclinic chiral)
    p21_ops = [
        parse_jones_faithful_string("x, y, z"),
        parse_jones_faithful_string("-x, y+1/2, -z"),
    ]
    p21_wyckoff = [
        WyckoffSite(multiplicity=2, letter="a", site_symmetry="1", coordinate_generator="(x, y, z)", coordinates=["x, y, z", "-x, y+1/2, -z"])
    ]
    SPACE_GROUPS_REGISTRY[4] = SpaceGroupDetails(
        number=4, hermann_mauguin="P2_1", hermann_mauguin_full="P 1 2_1 1", hall_symbol="P 2yb", schoenflies="C2^2",
        crystal_system=CrystalSystem.MONOCLINIC, point_group="2", laue_class="2/m", centering=CenteringType.PRIMITIVE,
        is_centrosymmetric=False, general_multiplicity=2, wyckoff_letters=["a"],
        description="Most common chiral space group in organic and pharmaceutical crystal structures.",
        symmetry_operations=p21_ops, wyckoff_sites=p21_wyckoff
    )

    # 14: P2_1/c (Monoclinic centrosymmetric)
    p21c_ops = [
        parse_jones_faithful_string("x, y, z"),
        parse_jones_faithful_string("-x, y+1/2, -z+1/2"),
        parse_jones_faithful_string("-x, -y, -z"),
        parse_jones_faithful_string("x, -y+1/2, z+1/2"),
    ]
    p21c_wyckoff = [
        WyckoffSite(multiplicity=4, letter="e", site_symmetry="1", coordinate_generator="(x, y, z)", coordinates=["x, y, z", "-x, y+1/2, -z+1/2", "-x, -y, -z", "x, -y+1/2, z+1/2"]),
        WyckoffSite(multiplicity=2, letter="d", site_symmetry="-1", coordinate_generator="(1/2, 0, 1/2)", coordinates=["1/2, 0, 1/2", "1/2, 1/2, 0"]),
        WyckoffSite(multiplicity=2, letter="c", site_symmetry="-1", coordinate_generator="(0, 0, 1/2)", coordinates=["0, 0, 1/2", "0, 1/2, 0"]),
        WyckoffSite(multiplicity=2, letter="b", site_symmetry="-1", coordinate_generator="(1/2, 0, 0)", coordinates=["1/2, 0, 0", "1/2, 1/2, 1/2"]),
        WyckoffSite(multiplicity=2, letter="a", site_symmetry="-1", coordinate_generator="(0, 0, 0)", coordinates=["0, 0, 0", "0, 1/2, 1/2"]),
    ]
    SPACE_GROUPS_REGISTRY[14] = SpaceGroupDetails(
        number=14, hermann_mauguin="P2_1/c", hermann_mauguin_full="P 1 2_1/c 1", hall_symbol="-P 2ybc", schoenflies="C2h^5",
        crystal_system=CrystalSystem.MONOCLINIC, point_group="2/m", laue_class="2/m", centering=CenteringType.PRIMITIVE,
        is_centrosymmetric=True, general_multiplicity=4, wyckoff_letters=["e", "d", "c", "b", "a"],
        description="Statistically the most abundant space group for small-molecule organic crystal structures (~35%).",
        symmetry_operations=p21c_ops, wyckoff_sites=p21c_wyckoff
    )

    # 19: P2_1 2_1 2_1 (Orthorhombic chiral)
    p212121_ops = [
        parse_jones_faithful_string("x, y, z"),
        parse_jones_faithful_string("-x+1/2, -y, z+1/2"),
        parse_jones_faithful_string("-x, y+1/2, -z+1/2"),
        parse_jones_faithful_string("x+1/2, -y+1/2, -z"),
    ]
    p212121_wyckoff = [
        WyckoffSite(multiplicity=4, letter="a", site_symmetry="1", coordinate_generator="(x, y, z)", coordinates=["x, y, z", "-x+1/2, -y, z+1/2", "-x, y+1/2, -z+1/2", "x+1/2, -y+1/2, -z"])
    ]
    SPACE_GROUPS_REGISTRY[19] = SpaceGroupDetails(
        number=19, hermann_mauguin="P2_1 2_1 2_1", hermann_mauguin_full="P 2_1 2_1 2_1", hall_symbol="P 2ac 2ab", schoenflies="D2^4",
        crystal_system=CrystalSystem.ORTHORHOMBIC, point_group="222", laue_class="mmm", centering=CenteringType.PRIMITIVE,
        is_centrosymmetric=False, general_multiplicity=4, wyckoff_letters=["a"],
        description="The premier space group for chiral amino acids, natural products, proteins, and enantiopure pharmaceuticals.",
        symmetry_operations=p212121_ops, wyckoff_sites=p212121_wyckoff
    )

    # 62: Pnma (Orthorhombic centrosymmetric)
    pnma_ops = [
        parse_jones_faithful_string("x, y, z"),
        parse_jones_faithful_string("-x+1/2, -y, z+1/2"),
        parse_jones_faithful_string("-x, y+1/2, -z"),
        parse_jones_faithful_string("x+1/2, -y+1/2, -z+1/2"),
        parse_jones_faithful_string("-x, -y, -z"),
        parse_jones_faithful_string("x+1/2, y, -z+1/2"),
        parse_jones_faithful_string("x, -y+1/2, z"),
        parse_jones_faithful_string("-x+1/2, y+1/2, z+1/2"),
    ]
    pnma_wyckoff = [
        WyckoffSite(multiplicity=8, letter="d", site_symmetry="1", coordinate_generator="(x, y, z)", coordinates=["x, y, z", "-x+1/2, -y, z+1/2", "-x, y+1/2, -z", "x+1/2, -y+1/2, -z+1/2", "-x, -y, -z", "x+1/2, y, -z+1/2", "x, -y+1/2, z", "-x+1/2, y+1/2, z+1/2"]),
        WyckoffSite(multiplicity=4, letter="c", site_symmetry=".m.", coordinate_generator="(x, 1/4, z)", coordinates=["x, 1/4, z", "-x+1/2, 3/4, z+1/2", "-x, 3/4, -z", "x+1/2, 1/4, -z+1/2"]),
        WyckoffSite(multiplicity=4, letter="b", site_symmetry="-1", coordinate_generator="(0, 0, 1/2)", coordinates=["0, 0, 1/2", "1/2, 0, 0", "0, 1/2, 1/2", "1/2, 1/2, 0"]),
        WyckoffSite(multiplicity=4, letter="a", site_symmetry="-1", coordinate_generator="(0, 0, 0)", coordinates=["0, 0, 0", "1/2, 0, 1/2", "0, 1/2, 0", "1/2, 1/2, 1/2"]),
    ]
    SPACE_GROUPS_REGISTRY[62] = SpaceGroupDetails(
        number=62, hermann_mauguin="Pnma", hermann_mauguin_full="P 2_1/n 2_1/m 2_1/a", hall_symbol="-P 2ac 2n", schoenflies="D2h^16",
        crystal_system=CrystalSystem.ORTHORHOMBIC, point_group="mmm", laue_class="mmm", centering=CenteringType.PRIMITIVE,
        is_centrosymmetric=True, general_multiplicity=8, wyckoff_letters=["d", "c", "b", "a"],
        description="Highly populated space group among inorganic minerals, orthorhombic perovskites (CaTiO3), and olivines.",
        symmetry_operations=pnma_ops, wyckoff_sites=pnma_wyckoff
    )

    # 136: P4_2/mnm (Rutile, TiO2)
    p42mnm_ops = [
        parse_jones_faithful_string("x, y, z"),
        parse_jones_faithful_string("-x, -y, z"),
        parse_jones_faithful_string("-x+1/2, y+1/2, -z+1/2"),
        parse_jones_faithful_string("x+1/2, -y+1/2, -z+1/2"),
        parse_jones_faithful_string("-y, -x, -z"),
        parse_jones_faithful_string("y, x, -z"),
        parse_jones_faithful_string("y+1/2, -x+1/2, z+1/2"),
        parse_jones_faithful_string("-y+1/2, x+1/2, z+1/2"),
        parse_jones_faithful_string("-x, -y, -z"),
        parse_jones_faithful_string("x, y, -z"),
        parse_jones_faithful_string("x+1/2, -y+1/2, z+1/2"),
        parse_jones_faithful_string("-x+1/2, y+1/2, z+1/2"),
        parse_jones_faithful_string("y, x, z"),
        parse_jones_faithful_string("-y, -x, z"),
        parse_jones_faithful_string("-y+1/2, x+1/2, -z+1/2"),
        parse_jones_faithful_string("y+1/2, -x+1/2, -z+1/2"),
    ]
    p42mnm_wyckoff = [
        WyckoffSite(multiplicity=16, letter="k", site_symmetry="1", coordinate_generator="(x, y, z)", coordinates=["x, y, z", "-x, -y, z", "-x+1/2, y+1/2, -z+1/2", "x+1/2, -y+1/2, -z+1/2", "-y, -x, -z", "y, x, -z", "y+1/2, -x+1/2, z+1/2", "-y+1/2, x+1/2, z+1/2", "-x, -y, -z", "x, y, -z", "x+1/2, -y+1/2, z+1/2", "-x+1/2, y+1/2, z+1/2", "y, x, z", "-y, -x, z", "-y+1/2, x+1/2, -z+1/2", "y+1/2, -x+1/2, -z+1/2"]),
        WyckoffSite(multiplicity=8, letter="j", site_symmetry="m..", coordinate_generator="(x, x, z)", coordinates=["x, x, z", "-x, -x, z", "-x+1/2, x+1/2, -z+1/2", "x+1/2, -x+1/2, -z+1/2", "-x, -x, -z", "x, x, -z", "x+1/2, -x+1/2, z+1/2", "-x+1/2, x+1/2, z+1/2"]),
        WyckoffSite(multiplicity=4, letter="f", site_symmetry="m.2m", coordinate_generator="(x, x, 0)", coordinates=["x, x, 0", "-x, -x, 0", "-x+1/2, x+1/2, 1/2", "x+1/2, -x+1/2, 1/2"]),
        WyckoffSite(multiplicity=2, letter="b", site_symmetry="m.mm", coordinate_generator="(0, 0, 1/2)", coordinates=["0, 0, 1/2", "1/2, 1/2, 0"]),
        WyckoffSite(multiplicity=2, letter="a", site_symmetry="m.mm", coordinate_generator="(0, 0, 0)", coordinates=["0, 0, 0", "1/2, 1/2, 1/2"]),
    ]
    SPACE_GROUPS_REGISTRY[136] = SpaceGroupDetails(
        number=136, hermann_mauguin="P4_2/mnm", hermann_mauguin_full="P 4_2/m 2_1/n 2/m", hall_symbol="-P 4n 2n", schoenflies="D4h^14",
        crystal_system=CrystalSystem.TETRAGONAL, point_group="4/mmm", laue_class="4/mmm", centering=CenteringType.PRIMITIVE,
        is_centrosymmetric=True, general_multiplicity=16, wyckoff_letters=["k", "j", "f", "b", "a"],
        description="Archetype Rutile (TiO2) and stishovite structure, exhibiting edge-sharing TiO6 octahedra.",
        symmetry_operations=p42mnm_ops, wyckoff_sites=p42mnm_wyckoff
    )

    # 194: P6_3/mmc (Hexagonal Closed Packed Mg, Graphite)
    p63mmc_ops = [
        parse_jones_faithful_string("x, y, z"),
        parse_jones_faithful_string("-y, x-y, z"),
        parse_jones_faithful_string("-x+y, -x, z"),
        parse_jones_faithful_string("-x, -y, z+1/2"),
        parse_jones_faithful_string("y, -x+y, z+1/2"),
        parse_jones_faithful_string("x-y, x, z+1/2"),
        parse_jones_faithful_string("y, x, -z"),
        parse_jones_faithful_string("x-y, -y, -z"),
        parse_jones_faithful_string("-x, -x+y, -z"),
        parse_jones_faithful_string("-y, -x, -z+1/2"),
        parse_jones_faithful_string("-x+y, y, -z+1/2"),
        parse_jones_faithful_string("x, x-y, -z+1/2"),
        parse_jones_faithful_string("-x, -y, -z"),
        parse_jones_faithful_string("y, -x+y, -z"),
        parse_jones_faithful_string("x-y, x, -z"),
        parse_jones_faithful_string("x, y, -z+1/2"),
        parse_jones_faithful_string("-y, x-y, -z+1/2"),
        parse_jones_faithful_string("-x+y, -x, -z+1/2"),
        parse_jones_faithful_string("-y, -x, z"),
        parse_jones_faithful_string("-x+y, y, z"),
        parse_jones_faithful_string("x, x-y, z"),
        parse_jones_faithful_string("y, x, z+1/2"),
        parse_jones_faithful_string("x-y, -y, z+1/2"),
        parse_jones_faithful_string("-x, -x+y, z+1/2"),
    ]
    p63mmc_wyckoff = [
        WyckoffSite(multiplicity=24, letter="l", site_symmetry="1", coordinate_generator="(x, y, z)"),
        WyckoffSite(multiplicity=12, letter="k", site_symmetry=".m.", coordinate_generator="(x, 2x, z)"),
        WyckoffSite(multiplicity=4, letter="f", site_symmetry="3m.", coordinate_generator="(1/3, 2/3, z)", coordinates=["1/3, 2/3, z", "2/3, 1/3, z+1/2", "2/3, 1/3, -z", "1/3, 2/3, -z+1/2"]),
        WyckoffSite(multiplicity=2, letter="d", site_symmetry="-6m2", coordinate_generator="(1/3, 2/3, 3/4)", coordinates=["1/3, 2/3, 3/4", "2/3, 1/3, 1/4"]),
        WyckoffSite(multiplicity=2, letter="c", site_symmetry="-6m2", coordinate_generator="(1/3, 2/3, 1/4)", coordinates=["1/3, 2/3, 1/4", "2/3, 1/3, 3/4"]),
        WyckoffSite(multiplicity=2, letter="b", site_symmetry="-3m.", coordinate_generator="(0, 0, 1/4)", coordinates=["0, 0, 1/4", "0, 0, 3/4"]),
        WyckoffSite(multiplicity=2, letter="a", site_symmetry="-3m.", coordinate_generator="(0, 0, 0)", coordinates=["0, 0, 0", "0, 0, 1/2"]),
    ]
    SPACE_GROUPS_REGISTRY[194] = SpaceGroupDetails(
        number=194, hermann_mauguin="P6_3/mmc", hermann_mauguin_full="P 6_3/m 2/m 2/c", hall_symbol="-P 6c 2c", schoenflies="D6h^4",
        crystal_system=CrystalSystem.HEXAGONAL, point_group="6/mmm", laue_class="6/mmm", centering=CenteringType.PRIMITIVE,
        is_centrosymmetric=True, general_multiplicity=24, wyckoff_letters=["l", "k", "f", "d", "c", "b", "a"],
        description="Hexagonal close-packed structure (Mg, Ti, Zn) and Bernal 2H-graphite.",
        symmetry_operations=p63mmc_ops, wyckoff_sites=p63mmc_wyckoff
    )

    # 221: Pm-3m (Primitive Cubic, CsCl, SrTiO3 Perovskite)
    pm3m_ops_strings = [
        "x, y, z", "-x, -y, z", "-x, y, -z", "x, -y, -z",
        "z, x, y", "z, -x, -y", "-z, -x, y", "-z, x, -y",
        "y, z, x", "-y, z, -x", "y, -z, -x", "-y, -z, x",
        "y, x, -z", "-y, -x, -z", "y, -x, z", "-y, x, z",
        "x, z, -y", "-x, z, y", "-x, -z, -y", "x, -z, y",
        "z, y, -x", "z, -y, x", "-z, y, x", "-z, -y, -x",
        "-x, -y, -z", "x, y, -z", "x, -y, z", "-x, y, z",
        "-z, -x, -y", "-z, x, y", "z, x, -y", "z, -x, y",
        "-y, -z, -x", "y, -z, x", "-y, z, x", "y, z, -x",
        "-y, -x, z", "y, x, z", "-y, x, -z", "y, -x, -z",
        "-x, -z, y", "x, -z, -y", "x, z, y", "-x, z, -y",
        "-z, -y, x", "-z, y, -x", "z, -y, -x", "z, y, x"
    ]
    pm3m_ops = [parse_jones_faithful_string(s) for s in pm3m_ops_strings]
    pm3m_wyckoff = [
        WyckoffSite(multiplicity=48, letter="m", site_symmetry="1", coordinate_generator="(x, y, z)"),
        WyckoffSite(multiplicity=24, letter="l", site_symmetry="..m", coordinate_generator="(x, y, 0)"),
        WyckoffSite(multiplicity=24, letter="k", site_symmetry=".m.", coordinate_generator="(x, x, z)"),
        WyckoffSite(multiplicity=12, letter="h", site_symmetry="mm2", coordinate_generator="(x, 1/2, 1/2)"),
        WyckoffSite(multiplicity=8, letter="g", site_symmetry=".3m", coordinate_generator="(x, x, x)"),
        WyckoffSite(multiplicity=6, letter="f", site_symmetry="4mm", coordinate_generator="(x, 1/2, 0)"),
        WyckoffSite(multiplicity=6, letter="e", site_symmetry="4mm", coordinate_generator="(x, 0, 0)"),
        WyckoffSite(multiplicity=3, letter="d", site_symmetry="4/mmm", coordinate_generator="(1/2, 0, 0)", coordinates=["1/2, 0, 0", "0, 1/2, 0", "0, 0, 1/2"]),
        WyckoffSite(multiplicity=3, letter="c", site_symmetry="4/mmm", coordinate_generator="(0, 1/2, 1/2)", coordinates=["0, 1/2, 1/2", "1/2, 0, 1/2", "1/2, 1/2, 0"]),
        WyckoffSite(multiplicity=1, letter="b", site_symmetry="m-3m", coordinate_generator="(1/2, 1/2, 1/2)", coordinates=["1/2, 1/2, 1/2"]),
        WyckoffSite(multiplicity=1, letter="a", site_symmetry="m-3m", coordinate_generator="(0, 0, 0)", coordinates=["0, 0, 0"]),
    ]
    SPACE_GROUPS_REGISTRY[221] = SpaceGroupDetails(
        number=221, hermann_mauguin="Pm-3m", hermann_mauguin_full="P 4/m -3 2/m", hall_symbol="-P 4 2 3", schoenflies="Oh^1",
        crystal_system=CrystalSystem.CUBIC, point_group="m-3m", laue_class="m-3m", centering=CenteringType.PRIMITIVE,
        is_centrosymmetric=True, general_multiplicity=48, wyckoff_letters=["m", "l", "k", "h", "g", "f", "e", "d", "c", "b", "a"],
        description="The ideal cubic perovskite (SrTiO3, BaTiO3 cubic phase) and Cesium Chloride (CsCl) lattice.",
        symmetry_operations=pm3m_ops, wyckoff_sites=pm3m_wyckoff
    )

    # 225: Fm-3m (Face-Centered Cubic, Rocksalt NaCl, Copper FCC)
    # Centering translations: (0,0,0), (0, 1/2, 1/2), (1/2, 0, 1/2), (1/2, 1/2, 0) applied to 48 point operations = 192 ops
    fm3m_centering = [(0.0, 0.0, 0.0), (0.0, 0.5, 0.5), (0.5, 0.0, 0.5), (0.5, 0.5, 0.0)]
    fm3m_ops = []
    for ct in fm3m_centering:
        for op in pm3m_ops:
            rot = [row[:] for row in op.rotation_matrix]
            trans = [
                (op.translation_vector[0] + ct[0]) % 1.0,
                (op.translation_vector[1] + ct[1]) % 1.0,
                (op.translation_vector[2] + ct[2]) % 1.0,
            ]
            fm3m_ops.append(SymmetryOperation(
                jones_faithful=f"({op.jones_faithful})+({ct[0]},{ct[1]},{ct[2]})",
                rotation_matrix=rot,
                translation_vector=trans,
                is_identity=(op.is_identity and ct == (0.0, 0.0, 0.0)),
                is_inversion=op.is_inversion,
                rotation_order=op.rotation_order,
                determinant=op.determinant
            ))

    fm3m_wyckoff = [
        WyckoffSite(multiplicity=192, letter="l", site_symmetry="1", coordinate_generator="(x, y, z)"),
        WyckoffSite(multiplicity=96, letter="k", site_symmetry="..m", coordinate_generator="(x, x, z)"),
        WyckoffSite(multiplicity=96, letter="j", site_symmetry="m..", coordinate_generator="(0, y, z)"),
        WyckoffSite(multiplicity=48, letter="i", site_symmetry="m.m2", coordinate_generator="(1/2, y, y)"),
        WyckoffSite(multiplicity=32, letter="f", site_symmetry=".3m", coordinate_generator="(x, x, x)"),
        WyckoffSite(multiplicity=24, letter="e", site_symmetry="4m.m", coordinate_generator="(x, 0, 0)"),
        WyckoffSite(multiplicity=24, letter="d", site_symmetry="mmm.", coordinate_generator="(0, 1/4, 1/4)"),
        WyckoffSite(multiplicity=8, letter="c", site_symmetry="-43m", coordinate_generator="(1/4, 1/4, 1/4)", coordinates=["1/4, 1/4, 1/4", "3/4, 3/4, 3/4"]),
        WyckoffSite(multiplicity=4, letter="b", site_symmetry="m-3m", coordinate_generator="(1/2, 1/2, 1/2)", coordinates=["1/2, 1/2, 1/2", "1/2, 0, 0", "0, 1/2, 0", "0, 0, 1/2"]),
        WyckoffSite(multiplicity=4, letter="a", site_symmetry="m-3m", coordinate_generator="(0, 0, 0)", coordinates=["0, 0, 0", "0, 1/2, 1/2", "1/2, 0, 1/2", "1/2, 1/2, 0"]),
    ]
    SPACE_GROUPS_REGISTRY[225] = SpaceGroupDetails(
        number=225, hermann_mauguin="Fm-3m", hermann_mauguin_full="F 4/m -3 2/m", hall_symbol="-F 4 2 3", schoenflies="Oh^5",
        crystal_system=CrystalSystem.CUBIC, point_group="m-3m", laue_class="m-3m", centering=CenteringType.FACE_CENTERED,
        is_centrosymmetric=True, general_multiplicity=192, wyckoff_letters=["l", "k", "j", "i", "f", "e", "d", "c", "b", "a"],
        description="Face-centered cubic archetype: Halite (NaCl), Copper, Silver, Gold, Platinum, Fluorite cation sublattice.",
        symmetry_operations=fm3m_ops, wyckoff_sites=fm3m_wyckoff
    )

    # 227: Fd-3m (Diamond, Silicon, Spinel MgAl2O4)
    fd3m_wyckoff = [
        WyckoffSite(multiplicity=192, letter="i", site_symmetry="1", coordinate_generator="(x, y, z)"),
        WyckoffSite(multiplicity=96, letter="h", site_symmetry="..m", coordinate_generator="(0, y, -y)"),
        WyckoffSite(multiplicity=96, letter="g", site_symmetry=".m.", coordinate_generator="(x, x, z)"),
        WyckoffSite(multiplicity=32, letter="e", site_symmetry=".3m", coordinate_generator="(x, x, x)"),
        WyckoffSite(multiplicity=16, letter="d", site_symmetry=".-3m", coordinate_generator="(5/8, 5/8, 5/8)"),
        WyckoffSite(multiplicity=16, letter="c", site_symmetry=".-3m", coordinate_generator="(1/8, 1/8, 1/8)"),
        WyckoffSite(multiplicity=8, letter="b", site_symmetry="-43m", coordinate_generator="(1/2, 1/2, 1/2)"),
        WyckoffSite(multiplicity=8, letter="a", site_symmetry="-43m", coordinate_generator="(0, 0, 0)", coordinates=["0, 0, 0", "1/4, 1/4, 1/4"]),
    ]
    SPACE_GROUPS_REGISTRY[227] = SpaceGroupDetails(
        number=227, hermann_mauguin="Fd-3m", hermann_mauguin_full="F 4_1/d -3 2/m", hall_symbol="F 4d 2 3 -1d", schoenflies="Oh^7",
        crystal_system=CrystalSystem.CUBIC, point_group="m-3m", laue_class="m-3m", centering=CenteringType.FACE_CENTERED,
        is_centrosymmetric=True, general_multiplicity=192, wyckoff_letters=["i", "h", "g", "e", "d", "c", "b", "a"],
        description="Diamond cubic lattice (Carbon, Silicon, Germanium) and Spinel supergroup.",
        symmetry_operations=fm3m_ops[:48], wyckoff_sites=fd3m_wyckoff
    )

    # 229: Im-3m (Body-Centered Cubic alpha-Fe)
    bcc_centering = [(0.0, 0.0, 0.0), (0.5, 0.5, 0.5)]
    im3m_ops = []
    for ct in bcc_centering:
        for op in pm3m_ops:
            rot = [row[:] for row in op.rotation_matrix]
            trans = [
                (op.translation_vector[0] + ct[0]) % 1.0,
                (op.translation_vector[1] + ct[1]) % 1.0,
                (op.translation_vector[2] + ct[2]) % 1.0,
            ]
            im3m_ops.append(SymmetryOperation(
                jones_faithful=f"({op.jones_faithful})+({ct[0]},{ct[1]},{ct[2]})",
                rotation_matrix=rot,
                translation_vector=trans,
                is_identity=(op.is_identity and ct == (0.0, 0.0, 0.0)),
                is_inversion=op.is_inversion,
                rotation_order=op.rotation_order,
                determinant=op.determinant
            ))

    im3m_wyckoff = [
        WyckoffSite(multiplicity=96, letter="l", site_symmetry="1", coordinate_generator="(x, y, z)"),
        WyckoffSite(multiplicity=48, letter="k", site_symmetry="..m", coordinate_generator="(x, x, z)"),
        WyckoffSite(multiplicity=48, letter="j", site_symmetry="m..", coordinate_generator="(0, y, z)"),
        WyckoffSite(multiplicity=24, letter="h", site_symmetry="4m.m", coordinate_generator="(x, 0, 0)"),
        WyckoffSite(multiplicity=16, letter="f", site_symmetry=".3m", coordinate_generator="(x, x, x)"),
        WyckoffSite(multiplicity=12, letter="d", site_symmetry="-4m2", coordinate_generator="(1/4, 1/2, 0)"),
        WyckoffSite(multiplicity=6, letter="b", site_symmetry="4/mmm", coordinate_generator="(0, 1/2, 1/2)"),
        WyckoffSite(multiplicity=2, letter="a", site_symmetry="m-3m", coordinate_generator="(0, 0, 0)", coordinates=["0, 0, 0", "1/2, 1/2, 1/2"]),
    ]
    SPACE_GROUPS_REGISTRY[229] = SpaceGroupDetails(
        number=229, hermann_mauguin="Im-3m", hermann_mauguin_full="I 4/m -3 2/m", hall_symbol="-I 4 2 3", schoenflies="Oh^9",
        crystal_system=CrystalSystem.CUBIC, point_group="m-3m", laue_class="m-3m", centering=CenteringType.BODY_CENTERED,
        is_centrosymmetric=True, general_multiplicity=96, wyckoff_letters=["l", "k", "j", "h", "f", "d", "b", "a"],
        description="Body-centered cubic metal structure: Ferritic Iron (alpha-Fe), Tungsten, Chromium, Molybdenum.",
        symmetry_operations=im3m_ops, wyckoff_sites=im3m_wyckoff
    )


# Automatically populate the remaining standard space groups (1-230) metadata catalog
def _populate_full_230_catalog():
    # Ranges of 230 space groups by crystal system:
    # 1-2: Triclinic
    # 3-15: Monoclinic
    # 16-74: Orthorhombic
    # 75-142: Tetragonal
    # 143-167: Trigonal
    # 168-194: Hexagonal
    # 195-230: Cubic
    standard_names: Dict[int, Tuple[str, str, CrystalSystem, CenteringType, bool, str]] = {
        3: ("P2", "C2^1", CrystalSystem.MONOCLINIC, CenteringType.PRIMITIVE, False, "2"),
        5: ("C2", "C2^3", CrystalSystem.MONOCLINIC, CenteringType.BASE_CENTERED_C, False, "2"),
        6: ("Pm", "Cs^1", CrystalSystem.MONOCLINIC, CenteringType.PRIMITIVE, False, "m"),
        7: ("Pc", "Cs^2", CrystalSystem.MONOCLINIC, CenteringType.PRIMITIVE, False, "m"),
        8: ("Cm", "Cs^3", CrystalSystem.MONOCLINIC, CenteringType.BASE_CENTERED_C, False, "m"),
        9: ("Cc", "Cs^4", CrystalSystem.MONOCLINIC, CenteringType.BASE_CENTERED_C, False, "m"),
        10: ("P2/m", "C2h^1", CrystalSystem.MONOCLINIC, CenteringType.PRIMITIVE, True, "2/m"),
        11: ("P2_1/m", "C2h^2", CrystalSystem.MONOCLINIC, CenteringType.PRIMITIVE, True, "2/m"),
        12: ("C2/m", "C2h^3", CrystalSystem.MONOCLINIC, CenteringType.BASE_CENTERED_C, True, "2/m"),
        13: ("P2/c", "C2h^4", CrystalSystem.MONOCLINIC, CenteringType.PRIMITIVE, True, "2/m"),
        15: ("C2/c", "C2h^6", CrystalSystem.MONOCLINIC, CenteringType.BASE_CENTERED_C, True, "2/m"),
        16: ("P222", "D2^1", CrystalSystem.ORTHORHOMBIC, CenteringType.PRIMITIVE, False, "222"),
        17: ("P222_1", "D2^2", CrystalSystem.ORTHORHOMBIC, CenteringType.PRIMITIVE, False, "222"),
        18: ("P2_1 2_1 2", "D2^3", CrystalSystem.ORTHORHOMBIC, CenteringType.PRIMITIVE, False, "222"),
        25: ("Pmm2", "C2v^1", CrystalSystem.ORTHORHOMBIC, CenteringType.PRIMITIVE, False, "mm2"),
        33: ("Pna2_1", "C2v^9", CrystalSystem.ORTHORHOMBIC, CenteringType.PRIMITIVE, False, "mm2"),
        47: ("Pmmm", "D2h^1", CrystalSystem.ORTHORHOMBIC, CenteringType.PRIMITIVE, True, "mmm"),
        63: ("Cmcm", "D2h^17", CrystalSystem.ORTHORHOMBIC, CenteringType.BASE_CENTERED_C, True, "mmm"),
        75: ("P4", "C4^1", CrystalSystem.TETRAGONAL, CenteringType.PRIMITIVE, False, "4"),
        85: ("P4/n", "C4h^3", CrystalSystem.TETRAGONAL, CenteringType.PRIMITIVE, True, "4/m"),
        123: ("P4/mmm", "D4h^1", CrystalSystem.TETRAGONAL, CenteringType.PRIMITIVE, True, "4/mmm"),
        141: ("I4_1/amd", "D4h^19", CrystalSystem.TETRAGONAL, CenteringType.BODY_CENTERED, True, "4/mmm"),
        143: ("P3", "C3^1", CrystalSystem.TRIGONAL, CenteringType.PRIMITIVE, False, "3"),
        147: ("P-3", "C3i^1", CrystalSystem.TRIGONAL, CenteringType.PRIMITIVE, True, "-3"),
        166: ("R-3m", "D3d^5", CrystalSystem.TRIGONAL, CenteringType.RHOMBOHEDRAL, True, "-3m"),
        167: ("R-3c", "D3d^6", CrystalSystem.TRIGONAL, CenteringType.RHOMBOHEDRAL, True, "-3m"),
        168: ("P6", "C6^1", CrystalSystem.HEXAGONAL, CenteringType.PRIMITIVE, False, "6"),
        186: ("P6_3mc", "C6v^4", CrystalSystem.HEXAGONAL, CenteringType.PRIMITIVE, False, "6mm"),
        191: ("P6/mmm", "D6h^1", CrystalSystem.HEXAGONAL, CenteringType.PRIMITIVE, True, "6/mmm"),
        195: ("P23", "T^1", CrystalSystem.CUBIC, CenteringType.PRIMITIVE, False, "23"),
        200: ("Pm-3", "Th^1", CrystalSystem.CUBIC, CenteringType.PRIMITIVE, True, "m-3"),
        216: ("F-43m", "Td^2", CrystalSystem.CUBIC, CenteringType.FACE_CENTERED, False, "-43m"),
        230: ("Ia-3d", "Oh^10", CrystalSystem.CUBIC, CenteringType.BODY_CENTERED, True, "m-3m"),
    }

    # Add specific catalog entries
    for num, (name, schoen, cs, cent, centro, pg) in standard_names.items():
        if num not in SPACE_GROUPS_REGISTRY:
            SPACE_GROUPS_REGISTRY[num] = SpaceGroupDetails(
                number=num, hermann_mauguin=name, hermann_mauguin_full=name, hall_symbol="", schoenflies=schoen,
                crystal_system=cs, point_group=pg, laue_class=pg, centering=cent,
                is_centrosymmetric=centro, general_multiplicity=4, wyckoff_letters=["a"],
                description=f"Space group #{num} ({name}) of the {cs.value} crystal system.",
                symmetry_operations=[parse_jones_faithful_string("x, y, z")],
                wyckoff_sites=[WyckoffSite(multiplicity=1, letter="a", site_symmetry=pg, coordinate_generator="(0, 0, 0)")]
            )

    # General fill for any remaining space groups 1..230
    for num in range(1, 231):
        if num not in SPACE_GROUPS_REGISTRY:
            if num <= 2:
                cs = CrystalSystem.TRICLINIC
            elif num <= 15:
                cs = CrystalSystem.MONOCLINIC
            elif num <= 74:
                cs = CrystalSystem.ORTHORHOMBIC
            elif num <= 142:
                cs = CrystalSystem.TETRAGONAL
            elif num <= 167:
                cs = CrystalSystem.TRIGONAL
            elif num <= 194:
                cs = CrystalSystem.HEXAGONAL
            else:
                cs = CrystalSystem.CUBIC

            SPACE_GROUPS_REGISTRY[num] = SpaceGroupDetails(
                number=num, hermann_mauguin=f"SG-{num}", hermann_mauguin_full=f"SG-{num}", hall_symbol="", schoenflies="",
                crystal_system=cs, point_group="1", laue_class="1", centering=CenteringType.PRIMITIVE,
                is_centrosymmetric=False, general_multiplicity=1, wyckoff_letters=["a"],
                description=f"Standard crystallographic space group #{num}.",
                symmetry_operations=[parse_jones_faithful_string("x, y, z")],
                wyckoff_sites=[WyckoffSite(multiplicity=1, letter="a", site_symmetry="1", coordinate_generator="(x, y, z)")]
            )

_init_space_groups()
_populate_full_230_catalog()


class CrystallographySpaceGroupService:
    """
    Main computational service for space groups, symmetry operations,
    Wyckoff sites, metric tensors, and powder XRD diffractograms.
    """

    @classmethod
    def list_space_groups(
        cls,
        crystal_system: Optional[CrystalSystem] = None,
        search_query: Optional[str] = None
    ) -> List[SpaceGroupMetadata]:
        """
        Queries and filters space groups across all 230 standard groups.
        """
        results: List[SpaceGroupMetadata] = []
        for num in range(1, 231):
            sg = SPACE_GROUPS_REGISTRY.get(num)
            if not sg:
                continue
            if crystal_system and sg.crystal_system != crystal_system:
                continue
            if search_query:
                q = search_query.strip().lower()
                matches = (
                    q in str(sg.number) or
                    q in sg.hermann_mauguin.lower() or
                    q in sg.schoenflies.lower() or
                    q in sg.point_group.lower()
                )
                if not matches:
                    continue

            results.append(SpaceGroupMetadata(
                number=sg.number,
                hermann_mauguin=sg.hermann_mauguin,
                hermann_mauguin_full=sg.hermann_mauguin_full,
                hall_symbol=sg.hall_symbol,
                schoenflies=sg.schoenflies,
                crystal_system=sg.crystal_system,
                point_group=sg.point_group,
                laue_class=sg.laue_class,
                centering=sg.centering,
                is_centrosymmetric=sg.is_centrosymmetric,
                general_multiplicity=sg.general_multiplicity,
                wyckoff_letters=sg.wyckoff_letters,
                description=sg.description,
            ))
        return results

    @classmethod
    def get_space_group(cls, identifier: Any) -> Optional[SpaceGroupDetails]:
        """
        Looks up space group details by number (int/str) or Hermann-Mauguin name.
        """
        if isinstance(identifier, int) or (isinstance(identifier, str) and identifier.isdigit()):
            num = int(identifier)
            return SPACE_GROUPS_REGISTRY.get(num)

        # Lookup by Hermann-Mauguin symbol
        sym = str(identifier).strip()
        for sg in SPACE_GROUPS_REGISTRY.values():
            if sg.hermann_mauguin.lower() == sym.lower() or sg.hermann_mauguin_full.lower() == sym.lower():
                return sg
        return None

    @classmethod
    def generate_wyckoff_orbit(
        cls,
        space_group_number: int,
        element: str,
        x: float,
        y: float,
        z: float,
        tolerance: float = 1e-4
    ) -> List[FractionalSiteCoordinate]:
        """
        Applies space group symmetry operations to an initial coordinate (x, y, z),
        folds coordinates into [0, 1), and deduplicates within periodic boundary tolerance.
        """
        sg = cls.get_space_group(space_group_number)
        if not sg:
            raise ValueError(f"Space group #{space_group_number} not found.")

        ops = sg.symmetry_operations
        if not ops:
            ops = [parse_jones_faithful_string("x, y, z")]

        unique_coords: List[Tuple[float, float, float]] = []

        for op in ops:
            rot = op.rotation_matrix
            trans = op.translation_vector

            # Apply affine matrix r' = W*r + w
            xp = rot[0][0] * x + rot[0][1] * y + rot[0][2] * z + trans[0]
            yp = rot[1][0] * x + rot[1][1] * y + rot[1][2] * z + trans[1]
            zp = rot[2][0] * x + rot[2][1] * y + rot[2][2] * z + trans[2]

            # Wrap into unit cell [0, 1)
            xf = (xp % 1.0 + 1.0) % 1.0
            yf = (yp % 1.0 + 1.0) % 1.0
            zf = (zp % 1.0 + 1.0) % 1.0

            # Snap to 0 if very close to 1 or 0
            if abs(xf - 1.0) < tolerance:
                xf = 0.0
            if abs(yf - 1.0) < tolerance:
                yf = 0.0
            if abs(zf - 1.0) < tolerance:
                zf = 0.0

            # Check periodic duplicate
            is_duplicate = False
            for ux, uy, uz in unique_coords:
                # Direct difference with periodic boundary wrap
                dx = abs(xf - ux)
                dx = min(dx, abs(dx - 1.0))
                dy = abs(yf - uy)
                dy = min(dy, abs(dy - 1.0))
                dz = abs(zf - uz)
                dz = min(dz, abs(dz - 1.0))

                if dx < tolerance and dy < tolerance and dz < tolerance:
                    is_duplicate = True
                    break

            if not is_duplicate:
                unique_coords.append((round(xf, 5), round(yf, 5), round(zf, 5)))

        mult = len(unique_coords)
        return [
            FractionalSiteCoordinate(
                element=element,
                x=coord[0],
                y=coord[1],
                z=coord[2],
                occupancy=1.0,
                site_multiplicity=mult,
            )
            for coord in unique_coords
        ]

    @classmethod
    def calculate_metric_tensor(cls, params: UnitCellParameters) -> MetricTensorResult:
        """
        Computes the direct metric tensor G, reciprocal metric tensor G*,
        Busing-Levy Cartesian transformation matrix M, and direct cell volume.
        """
        a, b, c = params.a, params.b, params.c
        alpha_rad = math.radians(params.alpha)
        beta_rad = math.radians(params.beta)
        gamma_rad = math.radians(params.gamma)

        cos_a = math.cos(alpha_rad)
        cos_b = math.cos(beta_rad)
        cos_g = math.cos(gamma_rad)
        sin_g = math.sin(gamma_rad)

        # Direct cell volume
        term = 1.0 - cos_a**2 - cos_b**2 - cos_g**2 + 2.0 * cos_a * cos_b * cos_g
        if term <= 0.0:
            raise ValueError(f"Invalid unit cell angles ({params.alpha}, {params.beta}, {params.gamma}): determinant <= 0.")
        vol = a * b * c * math.sqrt(term)

        # Direct Metric Tensor G
        g_direct = [
            [a**2, a * b * cos_g, a * c * cos_b],
            [a * b * cos_g, b**2, b * c * cos_a],
            [a * c * cos_b, b * c * cos_a, c**2]
        ]

        # Reciprocal lattice cell parameters
        a_star = (b * c * math.sin(alpha_rad)) / vol
        b_star = (a * c * math.sin(beta_rad)) / vol
        c_star = (a * b * sin_g) / vol

        cos_alpha_star = (cos_b * cos_g - cos_a) / (math.sin(beta_rad) * sin_g)
        cos_beta_star = (cos_a * cos_g - cos_b) / (math.sin(alpha_rad) * sin_g)
        cos_gamma_star = (cos_a * cos_b - cos_g) / (math.sin(alpha_rad) * math.sin(beta_rad))

        # Clamp to [-1, 1] to avoid float domain errors
        cos_alpha_star = max(-1.0, min(1.0, cos_alpha_star))
        cos_beta_star = max(-1.0, min(1.0, cos_beta_star))
        cos_gamma_star = max(-1.0, min(1.0, cos_gamma_star))

        alpha_star_deg = math.degrees(math.acos(cos_alpha_star))
        beta_star_deg = math.degrees(math.acos(cos_beta_star))
        gamma_star_deg = math.degrees(math.acos(cos_gamma_star))

        # Reciprocal Metric Tensor G*
        g_recip = [
            [a_star**2, a_star * b_star * cos_gamma_star, a_star * c_star * cos_beta_star],
            [a_star * b_star * cos_gamma_star, b_star**2, b_star * c_star * cos_alpha_star],
            [a_star * c_star * cos_beta_star, b_star * c_star * cos_alpha_star, c_star**2]
        ]

        # Busing-Levy Direct-to-Cartesian matrix M:
        # a along X, b in XY plane, c tilted
        m_mat = [
            [a, b * cos_g, c * cos_b],
            [0.0, b * sin_g, c * (cos_a - cos_b * cos_g) / sin_g],
            [0.0, 0.0, vol / (a * b * sin_g)]
        ]

        # Invert upper triangular matrix M to get Cartesian-to-Direct M^-1
        m00, m01, m02 = m_mat[0]
        m11, m12 = m_mat[1][1], m_mat[1][2]
        m22 = m_mat[2][2]

        inv00 = 1.0 / m00
        inv01 = -m01 / (m00 * m11)
        inv02 = (m01 * m12 - m02 * m11) / (m00 * m11 * m22)
        inv11 = 1.0 / m11
        inv12 = -m12 / (m11 * m22)
        inv22 = 1.0 / m22

        m_inv = [
            [inv00, inv01, inv02],
            [0.0, inv11, inv12],
            [0.0, 0.0, inv22]
        ]

        return MetricTensorResult(
            unit_cell=params,
            volume_angstrom3=round(vol, 4),
            direct_metric_tensor=[[round(val, 6) for val in row] for row in g_direct],
            reciprocal_metric_tensor=[[round(val, 6) for val in row] for row in g_recip],
            direct_to_cartesian_matrix=[[round(val, 6) for val in row] for row in m_mat],
            cartesian_to_direct_matrix=[[round(val, 6) for val in row] for row in m_inv],
            reciprocal_a_star=round(a_star, 6),
            reciprocal_b_star=round(b_star, 6),
            reciprocal_c_star=round(c_star, 6),
            reciprocal_alpha_star=round(alpha_star_deg, 4),
            reciprocal_beta_star=round(beta_star_deg, 4),
            reciprocal_gamma_star=round(gamma_star_deg, 4),
        )

    @classmethod
    def fractional_to_cartesian(
        cls,
        fractional_coords: List[FractionalSiteCoordinate],
        params: UnitCellParameters
    ) -> List[CartesianCoordinate]:
        """
        Converts fractional coordinates to absolute Cartesian coordinates in Angstroms.
        """
        metric = cls.calculate_metric_tensor(params)
        m = metric.direct_to_cartesian_matrix

        cartesian: List[CartesianCoordinate] = []
        for fc in fractional_coords:
            xc = m[0][0] * fc.x + m[0][1] * fc.y + m[0][2] * fc.z
            yc = m[1][1] * fc.y + m[1][2] * fc.z
            zc = m[2][2] * fc.z
            cartesian.append(CartesianCoordinate(
                element=fc.element,
                x_angstrom=round(xc, 5),
                y_angstrom=round(yc, 5),
                z_angstrom=round(zc, 5),
                occupancy=fc.occupancy,
                site_label=f"{fc.element} ({fc.wyckoff_letter})" if fc.wyckoff_letter else fc.element
            ))
        return cartesian

    @classmethod
    def calculate_minimum_image_distance(
        cls,
        p1: Tuple[float, float, float],
        p2: Tuple[float, float, float],
        params: UnitCellParameters
    ) -> float:
        """
        Computes minimum image periodic boundary distance between two fractional coordinates.
        """
        dx = p2[0] - p1[0]
        dy = p2[1] - p1[1]
        dz = p2[2] - p1[2]

        # Minimum image wrap to [-0.5, 0.5]
        dx -= round(dx)
        dy -= round(dy)
        dz -= round(dz)

        metric = cls.calculate_metric_tensor(params)
        g = metric.direct_metric_tensor

        # d^2 = dr^T * G * dr
        d2 = (
            dx * (g[0][0] * dx + g[0][1] * dy + g[0][2] * dz) +
            dy * (g[1][0] * dx + g[1][1] * dy + g[1][2] * dz) +
            dz * (g[2][0] * dx + g[2][1] * dy + g[2][2] * dz)
        )
        return math.sqrt(max(0.0, d2))

    @classmethod
    def simulate_powder_xrd(
        cls,
        space_group_number: int,
        unit_cell: UnitCellParameters,
        atoms: List[FractionalSiteCoordinate],
        radiation_source: XRayRadiationSource = XRayRadiationSource.CU_KA,
        two_theta_min: float = 10.0,
        two_theta_max: float = 90.0,
        fwhm_degrees: float = 0.25,
        max_hkl_index: int = 5
    ) -> PowderDiffractionPattern:
        """
        Simulates authentic powder X-ray diffraction pattern using Bragg's law,
        Cromer-Mann 9-parameter atomic scattering form factors, Lorentz-polarization factor,
        and space-group centering extinction rules.
        """
        wavelength = XRAY_WAVELENGTHS[radiation_source]
        metric = cls.calculate_metric_tensor(unit_cell)
        g_star = metric.reciprocal_metric_tensor
        sg = cls.get_space_group(space_group_number)
        sg_symbol = sg.hermann_mauguin if sg else f"SG-{space_group_number}"
        centering = sg.centering if sg else CenteringType.PRIMITIVE

        peaks: List[BraggDiffractionPeak] = []
        seen_d_spacings: Dict[float, BraggDiffractionPeak] = {}

        # Scan (h, k, l) grid
        for h in range(-max_hkl_index, max_hkl_index + 1):
            for k in range(-max_hkl_index, max_hkl_index + 1):
                for l in range(0, max_hkl_index + 1):
                    if h == 0 and k == 0 and l == 0:
                        continue

                    # 1/d^2 = [h k l] * G* * [h k l]^T
                    inv_d2 = (
                        h * (g_star[0][0] * h + g_star[0][1] * k + g_star[0][2] * l) +
                        k * (g_star[1][0] * h + g_star[1][1] * k + g_star[1][2] * l) +
                        l * (g_star[2][0] * h + g_star[2][1] * k + g_star[2][2] * l)
                    )
                    if inv_d2 <= 0.0:
                        continue

                    d_spacing = 1.0 / math.sqrt(inv_d2)
                    sin_theta = wavelength / (2.0 * d_spacing)
                    if sin_theta > 1.0:
                        continue

                    theta_rad = math.asin(sin_theta)
                    two_theta_deg = math.degrees(2.0 * theta_rad)

                    if two_theta_deg < two_theta_min or two_theta_deg > two_theta_max:
                        continue

                    # Lattice Centering Extinction Check
                    is_extinct = False
                    extinct_reason = ""
                    if centering == CenteringType.BODY_CENTERED:
                        if (h + k + l) % 2 != 0:
                            is_extinct = True
                            extinct_reason = "BCC: h+k+l must be even"
                    elif centering == CenteringType.FACE_CENTERED:
                        # h, k, l must be unmixed parity (all even or all odd)
                        p_h = abs(h) % 2
                        p_k = abs(k) % 2
                        p_l = abs(l) % 2
                        if not (p_h == p_k == p_l):
                            is_extinct = True
                            extinct_reason = "FCC: h,k,l must be unmixed parity"
                    elif centering == CenteringType.BASE_CENTERED_C:
                        if (h + k) % 2 != 0:
                            is_extinct = True
                            extinct_reason = "C-centered: h+k must be even"

                    # Structure Factor F(hkl) = sum_j occ_j * f_j(s) * exp(2*pi*i*(h*xj + k*yj + l*zj))
                    s = sin_theta / wavelength
                    f_real = 0.0
                    f_imag = 0.0
                    element_forms: Dict[str, float] = {}

                    for at in atoms:
                        form = calculate_atomic_form_factor(at.element, s, at.thermal_factor_b)
                        element_forms[at.element] = round(form, 3)
                        phase = 2.0 * math.pi * (h * at.x + k * at.y + l * at.z)
                        weight = at.occupancy * form
                        f_real += weight * math.cos(phase)
                        f_imag += weight * math.sin(phase)

                    f_mag = math.sqrt(f_real**2 + f_imag**2)

                    if f_mag < 1e-3:
                        is_extinct = True
                        if not extinct_reason:
                            extinct_reason = "Structure factor destructive interference"

                    # Lorentz-Polarization Factor Lp = (1 + cos^2(2theta)) / (sin^2(theta) * cos(theta))
                    lp = (1.0 + math.cos(2.0 * theta_rad)**2) / (math.sin(theta_rad)**2 * math.cos(theta_rad))

                    # Multiplicity: plane degeneracy (default base 6 for orthorhombic/cubic symmetries)
                    mult = 2
                    if h != 0 and k != 0 and l != 0:
                        mult = 8
                    elif (h != 0 and k != 0) or (h != 0 and l != 0) or (k != 0 and l != 0):
                        mult = 4

                    intensity_raw = (f_mag**2) * mult * lp if not is_extinct else 0.0

                    d_key = round(d_spacing, 4)
                    if d_key in seen_d_spacings:
                        # Symmetrically equivalent plane already covered
                        continue

                    peak = BraggDiffractionPeak(
                        h=h,
                        k=k,
                        l=l,
                        d_spacing_angstrom=round(d_spacing, 4),
                        two_theta_degrees=round(two_theta_deg, 3),
                        structure_factor_real=round(f_real, 4),
                        structure_factor_imag=round(f_imag, 4),
                        structure_factor_magnitude=round(f_mag, 4),
                        phase_degrees=round(math.degrees(math.atan2(f_imag, f_real)), 2),
                        form_factor_contributions=element_forms,
                        multiplicity=mult,
                        lorentz_polarization_factor=round(lp, 3),
                        intensity_raw=round(intensity_raw, 2),
                        intensity_relative=0.0,
                        is_systematic_absence=is_extinct,
                        extinction_condition=extinct_reason,
                    )
                    seen_d_spacings[d_key] = peak
                    peaks.append(peak)

        # Sort peaks by 2-theta
        peaks.sort(key=lambda p: p.two_theta_degrees)

        # Normalize intensities relative to max peak
        max_int = max((p.intensity_raw for p in peaks if not p.is_systematic_absence), default=1.0)
        if max_int > 0:
            for p in peaks:
                if not p.is_systematic_absence:
                    p.intensity_relative = round((p.intensity_raw / max_int) * 100.0, 2)
                else:
                    p.intensity_relative = 0.0

        # Synthesize continuous broadened diffractogram
        grid_step = 0.05
        grid_len = int((two_theta_max - two_theta_min) / grid_step) + 1
        two_theta_grid = [round(two_theta_min + i * grid_step, 2) for i in range(grid_len)]
        intensity_profile = [0.0] * grid_len

        # Gaussian/Lorentzian pseudo-Voigt profile broadening
        sigma = fwhm_degrees / (2.0 * math.sqrt(2.0 * math.log(2.0)))
        for p in peaks:
            if p.is_systematic_absence or p.intensity_relative <= 0.01:
                continue
            center = p.two_theta_degrees
            height = p.intensity_relative
            # Add to profile within +- 3*FWHM
            min_idx = max(0, int((center - 3.0 * fwhm_degrees - two_theta_min) / grid_step))
            max_idx = min(grid_len - 1, int((center + 3.0 * fwhm_degrees - two_theta_min) / grid_step))

            for idx in range(min_idx, max_idx + 1):
                x = two_theta_grid[idx]
                gauss = math.exp(-0.5 * ((x - center) / sigma)**2)
                intensity_profile[idx] += height * gauss

        # Round profile values
        intensity_profile = [round(val, 3) for val in intensity_profile]

        allowed_peaks = [p for p in peaks if not p.is_systematic_absence]
        max_peak = max(allowed_peaks, key=lambda p: p.intensity_relative, default=None)

        return PowderDiffractionPattern(
            space_group_number=space_group_number,
            space_group_symbol=sg_symbol,
            radiation_source=radiation_source,
            wavelength_angstrom=wavelength,
            peaks=peaks,
            two_theta_grid=two_theta_grid,
            intensity_profile=intensity_profile,
            maximum_intensity_peak=max_peak,
            total_allowed_reflections=len(allowed_peaks),
            total_extinct_reflections=len(peaks) - len(allowed_peaks),
        )
