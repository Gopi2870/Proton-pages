"""
Integration tests for Analytical Chromatography & Mass Spectrometry API endpoints (PR #051).
"""
import pytest
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestMassSpectrometryApi:
    def test_get_catalog_endpoint(self):
        res = client.get("/api/v1/chemistry/mass-spectrometry/catalog")
        assert res.status_code == 200
        catalog = res.json()
        assert len(catalog) >= 5
        names = [s["name"] for s in catalog]
        assert "Butylbenzene" in names
        assert "Chlorobenzene" in names

    def test_simulate_ms_endpoint(self):
        payload = {"standard_id": "butylbenzene"}
        res = client.post("/api/v1/chemistry/mass-spectrometry/simulate-ms", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert data["analyte_name"] == "Butylbenzene"
        assert data["base_peak_mz"] == 91.0
        assert len(data["spectrum"]) >= 4

    def test_isotope_envelope_endpoint(self):
        payload = {"formula": "C6H5Cl"}
        res = client.post("/api/v1/chemistry/mass-spectrometry/isotope-envelope", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert "Chlorine" in data["pattern_signature"]
        assert len(data["peaks"]) >= 3

    def test_van_deemter_endpoint(self):
        payload = {"particle_diameter_um": 3.0, "column_length_mm": 150.0}
        res = client.post("/api/v1/chemistry/mass-spectrometry/van-deemter", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert data["optimum_velocity_cm_s"] > 0.0
        assert data["minimum_plate_height_um"] > 0.0
        assert len(data["curve"]) >= 10

    def test_simulate_chromatogram_endpoint(self):
        payload = {
            "analyte_ids": ["benzene", "toluene"],
            "column_length_mm": 150.0,
            "flow_rate_ml_min": 1.2,
        }
        res = client.post("/api/v1/chemistry/mass-spectrometry/simulate-chromatogram", json=payload)
        assert res.status_code == 200
        data = res.json()
        assert len(data["peaks"]) == 2
        assert any("benzene/toluene" in k.lower() for k in data["resolution_pairs"])
