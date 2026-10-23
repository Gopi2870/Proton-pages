"""
Integration tests for Biomolecular Structure Modeling API endpoints.
Verifies HTTP contract for /api/v1/chemistry/biomolecule presets, detail, ramachandran, and parse.
"""
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


def test_api_list_biomolecule_presets():
    res = client.get("/api/v1/chemistry/biomolecule/presets")
    assert res.status_code == 200
    data = res.json()
    assert isinstance(data, list)
    assert len(data) >= 2
    assert any(p["pdb_id"] == "1CRN" for p in data)
    assert any(p["pdb_id"] == "1L2Y" for p in data)


def test_api_get_preset_detail():
    res = client.get("/api/v1/chemistry/biomolecule/presets/crambin-1crn")
    assert res.status_code == 200
    data = res.json()
    assert "summary" in data
    assert "residues" in data
    assert "hydrogen_bonds" in data
    assert data["summary"]["pdb_id"] == "1CRN"
    assert len(data["residues"]) == 46
    assert len(data["hydrogen_bonds"]) > 0


def test_api_get_preset_ramachandran():
    res = client.get("/api/v1/chemistry/biomolecule/presets/crambin-1crn/ramachandran")
    assert res.status_code == 200
    points = res.json()
    assert isinstance(points, list)
    assert len(points) == 44  # 44 internal residues with phi and psi
    for pt in points:
        assert "phi" in pt
        assert "psi" in pt
        assert "region" in pt
        assert -180.0 <= pt["phi"] <= 180.0
        assert -180.0 <= pt["psi"] <= 180.0


def test_api_preset_not_found():
    res = client.get("/api/v1/chemistry/biomolecule/presets/unknown-protein")
    assert res.status_code == 404


def test_api_parse_pdb_stream():
    pdb_snippet = """ATOM      1  N   MET A   1       0.000   0.000   0.000  1.00  0.00           N
ATOM      2  CA  MET A   1       1.458   0.000   0.000  1.00  0.00           C
ATOM      3  C   MET A   1       2.009   1.428   0.000  1.00  0.00           C
ATOM      4  O   MET A   1       1.272   2.408   0.000  1.00  0.00           O
ATOM      5  N   GLN A   2       3.327   1.534   0.000  1.00  0.00           N
ATOM      6  CA  GLN A   2       3.987   2.842   0.000  1.00  0.00           C
ATOM      7  C   GLN A   2       5.500   2.748   0.000  1.00  0.00           C
ATOM      8  O   GLN A   2       6.155   1.706   0.000  1.00  0.00           O
TER       9      GLN A   2
END
"""
    res = client.post("/api/v1/chemistry/biomolecule/parse", json={"pdb_content": pdb_snippet, "calculate_dssp": True})
    assert res.status_code == 200
    data = res.json()
    assert data["summary"]["total_residues"] == 2
    assert len(data["residues"]) == 2


def test_api_parse_empty_stream():
    res = client.post("/api/v1/chemistry/biomolecule/parse", json={"pdb_content": "", "calculate_dssp": True})
    assert res.status_code == 400
