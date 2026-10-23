"""
Integration Tests for Cheminformatics API Endpoints.
Verifies FastAPI endpoints for curated library retrieval, Morgan circular fingerprints,
pairwise similarity metrics, substructure isomorphism queries, and library screening.
"""
import pytest
from starlette.testclient import TestClient
from services.chemistry.app.server import app


@pytest.fixture
def client() -> TestClient:
    return TestClient(app)


def test_api_get_library(client: TestClient):
    """Tests GET /api/v1/chemistry/cheminformatics/library."""
    response = client.get("/api/v1/chemistry/cheminformatics/library")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 10
    ids = {m["id"] for m in data}
    assert "aspirin" in ids
    assert "caffeine" in ids
    assert "benzene" in ids


def test_api_get_molecule_by_id(client: TestClient):
    """Tests GET /api/v1/chemistry/cheminformatics/library/{molecule_id}."""
    response = client.get("/api/v1/chemistry/cheminformatics/library/aspirin")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == "aspirin"
    assert data["formula"] == "C9H8O4"
    assert len(data["atoms"]) == 13

    # Non-existent ID returns 404
    notFound = client.get("/api/v1/chemistry/cheminformatics/library/non_existent_xyz")
    assert notFound.status_code == 404


def test_api_get_fragments(client: TestClient):
    """Tests GET /api/v1/chemistry/cheminformatics/fragments."""
    response = client.get("/api/v1/chemistry/cheminformatics/fragments")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 6
    frag_ids = {f["id"] for f in data}
    assert "frag_carboxylic_acid" in frag_ids
    assert "frag_benzene" in frag_ids


def test_api_compute_fingerprint(client: TestClient):
    """Tests POST /api/v1/chemistry/cheminformatics/fingerprint."""
    payload = {
        "molecule_id": "caffeine",
        "radius": 2,
        "n_bits": 1024
    }
    response = client.post("/api/v1/chemistry/cheminformatics/fingerprint", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["molecule_id"] == "caffeine"
    assert data["radius"] == 2
    assert data["n_bits"] == 1024
    assert len(data["active_bits"]) > 0
    assert "environments" in data
    assert len(data["environments"]) > 0
    assert data["density"] > 0.0


def test_api_pairwise_similarity(client: TestClient):
    """Tests POST /api/v1/chemistry/cheminformatics/similarity."""
    payload = {
        "molecule_a_id": "aspirin",
        "molecule_b_id": "benzoic_acid",
        "radius": 2,
        "n_bits": 1024
    }
    response = client.post("/api/v1/chemistry/cheminformatics/similarity", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["molecule_a_id"] == "aspirin"
    assert data["molecule_b_id"] == "benzoic_acid"
    assert 0.0 < data["tanimoto"] < 1.0
    assert 0.0 < data["dice"] < 1.0
    assert 0.0 < data["cosine"] < 1.0
    assert len(data["shared_bits"]) > 0


def test_api_substructure_search(client: TestClient):
    """Tests POST /api/v1/chemistry/cheminformatics/substructure-search."""
    # Match: Aspirin has -COOH
    payload_match = {
        "target_id": "aspirin",
        "fragment_id": "frag_carboxylic_acid"
    }
    resp_match = client.post("/api/v1/chemistry/cheminformatics/substructure-search", json=payload_match)
    assert resp_match.status_code == 200
    data_match = resp_match.json()
    assert data_match["matched"] is True
    assert data_match["filter_passed"] is True
    assert len(data_match["matched_target_atoms"]) >= 3

    # No match: Benzene does not have -COOH
    payload_nomatch = {
        "target_id": "benzene",
        "fragment_id": "frag_carboxylic_acid"
    }
    resp_nomatch = client.post("/api/v1/chemistry/cheminformatics/substructure-search", json=payload_nomatch)
    assert resp_nomatch.status_code == 200
    data_nomatch = resp_nomatch.json()
    assert data_nomatch["matched"] is False


def test_api_screen_library(client: TestClient):
    """Tests POST /api/v1/chemistry/cheminformatics/screen-library."""
    payload = {
        "query_id": "phenol",
        "metric": "tanimoto",
        "min_threshold": 0.1
    }
    response = client.post("/api/v1/chemistry/cheminformatics/screen-library", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["query_id"] == "phenol"
    assert len(data["hits"]) >= 1
    # Top hit should be phenol itself
    assert data["hits"][0]["molecule_id"] == "phenol"
    assert data["hits"][0]["score"] == 1.0


def test_api_similarity_matrix(client: TestClient):
    """Tests POST /api/v1/chemistry/cheminformatics/similarity-matrix."""
    payload = {
        "molecule_ids": ["aspirin", "benzoic_acid", "benzene"],
        "metric": "tanimoto"
    }
    response = client.post("/api/v1/chemistry/cheminformatics/similarity-matrix", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert len(data["molecule_ids"]) == 3
    assert len(data["matrix"]) == 3
    assert data["matrix"][0][0] == 1.0
    assert data["matrix"][1][1] == 1.0
    assert data["matrix"][2][2] == 1.0
