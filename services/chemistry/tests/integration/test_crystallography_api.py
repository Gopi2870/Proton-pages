"""
Integration Tests for Crystallography, Miller Planes & XRD Diffractogram Endpoints.
"""

from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestCrystallographyEndpoints:
    def test_list_presets_endpoint(self):
        resp = client.get("/api/v1/chemistry/crystallography/presets")
        assert resp.status_code == 200
        data = resp.json()
        assert len(data) >= 8
        preset_ids = [p["id"] for p in data]
        assert "copper" in preset_ids
        assert "nacl" in preset_ids
        assert "diamond" in preset_ids

    def test_get_single_preset(self):
        resp = client.get("/api/v1/chemistry/crystallography/presets/copper")
        assert resp.status_code == 200
        data = resp.json()
        assert data["formula"] == "Cu"
        assert data["crystal_system"] == "cubic"
        assert data["bravais_lattice"] == "face_centered_cubic"
        assert data["a"] == 3.615
        assert len(data["basis_atoms"]) == 4

    def test_get_invalid_preset_404(self):
        resp = client.get("/api/v1/chemistry/crystallography/presets/unknown_crystal_xyz")
        assert resp.status_code == 404

    def test_cell_geometry_endpoint(self):
        payload = {
            "a": 5.64,
            "crystal_system": "cubic",
            "bravais_lattice": "face_centered_cubic",
            "formula_units_z": 4,
            "molar_mass_g_mol": 58.44,
        }
        resp = client.post("/api/v1/chemistry/crystallography/cell-geometry", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["volume_angstrom3"] > 170.0
        assert data["density_g_cm3"] > 2.0  # NaCl density ~ 2.16 g/cm3
        assert len(data["metric_tensor"]) == 3

    def test_miller_spacing_endpoint(self):
        payload = {
            "h": 1,
            "k": 1,
            "l": 1,
            "a": 3.615,
            "crystal_system": "cubic",
        }
        resp = client.post("/api/v1/chemistry/crystallography/miller-spacing", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["d_spacing_angstrom"] > 2.0
        assert data["cu_ka_two_theta_deg"] is not None
        assert 40.0 < data["cu_ka_two_theta_deg"] < 46.0

    def test_simulate_xrd_preset_endpoint(self):
        payload = {
            "crystal_id": "copper",
            "x_ray_source": "Cu_Ka",
            "max_two_theta": 90.0,
            "fwhm_degrees": 0.2,
        }
        resp = client.post("/api/v1/chemistry/crystallography/xrd-simulate", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["crystal_id"] == "copper"
        assert data["wavelength_angstrom"] == 1.5406
        assert len(data["peaks"]) >= 3
        assert len(data["two_theta_grid"]) == len(data["intensity_profile"])
        assert data["highest_intensity_peak"]["two_theta_degrees"] > 0
