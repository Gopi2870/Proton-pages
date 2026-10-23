"""
Unit tests for Biomolecular Structure Modeling, PDB Parsing, Dihedral Geometry,
and Kabsch-Sander DSSP Hydrogen Bonding Analysis.
"""
import pytest
import math
from services.chemistry.app.services.biomolecule_service import (
    BiomoleculeService,
    compute_dihedral_angle,
    euclidean_distance,
    vector_sub,
    vector_add,
    vector_cross,
    vector_dot,
)
from services.chemistry.app.models.biomolecule import (
    SecondaryStructureType,
    RamachandranRegion,
)
from services.chemistry.app.data.protein_structures import get_protein_preset_by_id


@pytest.fixture
def service():
    return BiomoleculeService()


def test_vector_geometry():
    v1 = (1.0, 2.0, 3.0)
    v2 = (4.0, 5.0, 6.0)

    # Subtraction
    sub = vector_sub(v2, v1)
    assert sub == (3.0, 3.0, 3.0)

    # Addition
    add = vector_add(v1, v2)
    assert add == (5.0, 7.0, 9.0)

    # Dot product
    dot = vector_dot(v1, v2)
    assert dot == 1.0 * 4.0 + 2.0 * 5.0 + 3.0 * 6.0  # 4 + 10 + 18 = 32.0

    # Cross product: i x j = k
    i_hat = (1.0, 0.0, 0.0)
    j_hat = (0.0, 1.0, 0.0)
    k_hat = vector_cross(i_hat, j_hat)
    assert k_hat == (0.0, 0.0, 1.0)

    # Euclidean distance
    dist = euclidean_distance((0.0, 0.0, 0.0), (3.0, 4.0, 0.0))
    assert math.isclose(dist, 5.0)


def test_dihedral_angle_calculation():
    # Planar trans conformation should be 180 degrees
    p1 = (0.0, 1.0, 0.0)
    p2 = (0.0, 0.0, 0.0)
    p3 = (1.0, 0.0, 0.0)
    p4 = (1.0, -1.0, 0.0)
    angle_trans = compute_dihedral_angle(p1, p2, p3, p4)
    assert abs(angle_trans) == 180.0

    # Cis conformation should be 0 degrees
    p4_cis = (1.0, 1.0, 0.0)
    angle_cis = compute_dihedral_angle(p1, p2, p3, p4_cis)
    assert math.isclose(angle_cis, 0.0, abs_tol=1e-1)

    # 90 degrees right-handed twist
    p4_perp = (1.0, 0.0, 1.0)
    angle_perp = compute_dihedral_angle(p1, p2, p3, p4_perp)
    assert math.isclose(abs(angle_perp), 90.0, abs_tol=1e-1)


def test_parse_preset_crambin(service):
    detail = service.load_preset("crambin-1crn")
    assert detail is not None
    assert detail.summary.pdb_id == "1CRN"
    assert detail.summary.total_residues == 46
    assert len(detail.residues) == 46

    # Check first 5 residue names
    res_names = [r.res_name for r in detail.residues[:5]]
    assert res_names == ["THR", "THR", "CYS", "CYS", "PRO"]

    # Check coordinate presence
    for r in detail.residues:
        assert r.n_coord is not None
        assert r.ca_coord is not None
        assert r.c_coord is not None
        assert r.o_coord is not None

    # Internal residues must have non-null phi and psi
    internal = detail.residues[1:45]
    for r in internal:
        assert r.phi is not None
        assert -180.0 <= r.phi <= 180.0
        assert r.psi is not None
        assert -180.0 <= r.psi <= 180.0

    # First residue has no phi, last residue has no psi
    assert detail.residues[0].phi is None
    assert detail.residues[-1].psi is None


def test_dssp_hydrogen_bonding(service):
    detail = service.load_preset("crambin-1crn")
    assert len(detail.hydrogen_bonds) > 0

    # Check energy and distance criteria
    for hb in detail.hydrogen_bonds:
        assert hb.energy_kcal_mol <= -0.5
        assert hb.distance_on > 0.5
        assert hb.distance_oh > 0.5
        assert hb.distance_on <= 5.2


def test_ramachandran_classification(service):
    # Alpha region
    r_alpha = service._classify_ramachandran(-65.0, -40.0, "ALA")
    assert r_alpha == RamachandranRegion.FAVORED_ALPHA

    # Beta region
    r_beta = service._classify_ramachandran(-120.0, 135.0, "VAL")
    assert r_beta == RamachandranRegion.FAVORED_BETA

    # Left-handed alpha
    r_left = service._classify_ramachandran(60.0, 40.0, "ASN")
    assert r_left == RamachandranRegion.FAVORED_LEFT_ALPHA

    # Glycine flexibility
    r_gly = service._classify_ramachandran(60.0, -40.0, "GLY")
    assert r_gly in [RamachandranRegion.FAVORED_ALPHA, RamachandranRegion.ALLOWED]

    # Outlier
    r_out = service._classify_ramachandran(120.0, -140.0, "LEU")
    assert r_out == RamachandranRegion.OUTLIER


def test_custom_pdb_parsing(service):
    minimal_pdb = """ATOM      1  N   ALA A   1       0.000   0.000   0.000  1.00  0.00           N
ATOM      2  CA  ALA A   1       1.458   0.000   0.000  1.00  0.00           C
ATOM      3  C   ALA A   1       2.009   1.428   0.000  1.00  0.00           C
ATOM      4  O   ALA A   1       1.272   2.408   0.000  1.00  0.00           O
ATOM      5  N   GLY A   2       3.327   1.534   0.000  1.00  0.00           N
ATOM      6  CA  GLY A   2       3.987   2.842   0.000  1.00  0.00           C
ATOM      7  C   GLY A   2       5.500   2.748   0.000  1.00  0.00           C
ATOM      8  O   GLY A   2       6.155   1.706   0.000  1.00  0.00           O
TER       9      GLY A   2
END
"""
    detail = service.parse_pdb_text(minimal_pdb)
    assert detail.summary.total_residues == 2
    assert detail.summary.total_atoms == 8
    assert detail.residues[0].res_name == "ALA"
    assert detail.residues[1].res_name == "GLY"
