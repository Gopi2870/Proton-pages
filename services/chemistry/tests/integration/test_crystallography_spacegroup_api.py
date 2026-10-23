"""
Integration tests for Crystallographic Space Groups & Wyckoff API endpoints.
Verifies HTTP contract for /api/v1/chemistry/crystallography/space-groups endpoints.
"""

from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


def test_api_list_space_groups():
    res = client.get("/api/v1/chemistry/crystallography/space-groups")
    assert res.status_code == 200
    data = res.json()
    assert isinstance(data, list)
    assert len(data) == 230
    assert any(g["number"] == 225 and g["hermann_mauguin"] == "Fm-3m" for g in data)


def test_api_filter_space_groups_by_crystal_system():
    res = client.get("/api/v1/chemistry/crystallography/space-groups?crystal_system=cubic")
    assert res.status_code == 200
    data = res.json()
    assert len(data) == 36  # Cubic space groups: 195 to 230
    for g in data:
        assert g["crystal_system"] == "cubic"


def test_api_search_space_groups():
    res = client.get("/api/v1/chemistry/crystallography/space-groups?search=Pnma")
    assert res.status_code == 200
    data = res.json()
    assert len(data) >= 1
    assert data[0]["number"] == 62
    assert data[0]["hermann_mauguin"] == "Pnma"


def test_api_get_space_group_details():
    res = client.get("/api/v1/chemistry/crystallography/space-groups/225")
    assert res.status_code == 200
    data = res.json()
    assert data["number"] == 225
    assert data["hermann_mauguin"] == "Fm-3m"
    assert data["is_centrosymmetric"] is True
    assert len(data["symmetry_operations"]) > 0
    assert len(data["wyckoff_sites"]) > 0


def test_api_get_space_group_by_symbol():
    res = client.get("/api/v1/chemistry/crystallography/space-groups/P2_1/c")
    assert res.status_code == 200
    data = res.json()
    assert data["number"] == 14
    assert data["hermann_mauguin"] == "P2_1/c"


def test_api_get_space_group_404():
    res = client.get("/api/v1/chemistry/crystallography/space-groups/999")
    assert res.status_code == 404


def test_api_wyckoff_orbit_generation():
    payload = {
        "space_group_number": 225,
        "element": "Na",
        "x": 0.0,
        "y": 0.0,
        "z": 0.0,
        "tolerance": 0.0001
    }
    res = client.post("/api/v1/chemistry/crystallography/space-groups/wyckoff-orbit", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["space_group_number"] == 225
    assert data["element"] == "Na"
    assert data["multiplicity"] == 4
    assert len(data["coordinates"]) == 4


def test_api_metric_tensor():
    payload = {
        "a": 5.0,
        "b": 5.0,
        "c": 5.0,
        "alpha": 90.0,
        "beta": 90.0,
        "gamma": 90.0
    }
    res = client.post("/api/v1/chemistry/crystallography/space-groups/metric-tensor", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["volume_angstrom3"] == 125.0
    assert "direct_metric_tensor" in data
    assert "reciprocal_metric_tensor" in data
    assert "direct_to_cartesian_matrix" in data


def test_api_fractional_to_cartesian():
    payload = {
        "unit_cell": {
            "a": 4.0, "b": 4.0, "c": 4.0,
            "alpha": 90.0, "beta": 90.0, "gamma": 90.0
        },
        "fractional_coordinates": [
            {"element": "Cu", "x": 0.0, "y": 0.0, "z": 0.0},
            {"element": "Cu", "x": 0.5, "y": 0.5, "z": 0.0}
        ]
    }
    res = client.post("/api/v1/chemistry/crystallography/space-groups/fractional-to-cartesian", json=payload)
    assert res.status_code == 200
    data = res.json()
    coords = data["cartesian_coordinates"]
    assert len(coords) == 2
    assert coords[0]["x_angstrom"] == 0.0
    assert coords[1]["x_angstrom"] == 2.0
    assert coords[1]["y_angstrom"] == 2.0


def test_api_simulate_powder_xrd():
    payload = {
        "space_group_number": 225,
        "unit_cell": {
            "a": 5.64, "b": 5.64, "c": 5.64,
            "alpha": 90.0, "beta": 90.0, "gamma": 90.0
        },
        "atoms": [
            {"element": "Na", "x": 0.0, "y": 0.0, "z": 0.0, "occupancy": 1.0},
            {"element": "Na", "x": 0.0, "y": 0.5, "z": 0.5, "occupancy": 1.0},
            {"element": "Na", "x": 0.5, "y": 0.0, "z": 0.5, "occupancy": 1.0},
            {"element": "Na", "x": 0.5, "y": 0.5, "z": 0.0, "occupancy": 1.0},
            {"element": "Cl", "x": 0.5, "y": 0.5, "z": 0.5, "occupancy": 1.0},
            {"element": "Cl", "x": 0.5, "y": 0.0, "z": 0.0, "occupancy": 1.0},
            {"element": "Cl", "x": 0.0, "y": 0.5, "z": 0.0, "occupancy": 1.0},
            {"element": "Cl", "x": 0.0, "y": 0.0, "z": 0.5, "occupancy": 1.0}
        ],
        "radiation_source": "Cu_Ka",
        "two_theta_min": 10.0,
        "two_theta_max": 80.0
    }
    res = client.post("/api/v1/chemistry/crystallography/space-groups/simulate-xrd", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["space_group_number"] == 225
    assert data["space_group_symbol"] == "Fm-3m"
    assert len(data["peaks"]) > 0
    assert len(data["two_theta_grid"]) > 0
    assert len(data["intensity_profile"]) > 0
    assert data["total_allowed_reflections"] > 0
