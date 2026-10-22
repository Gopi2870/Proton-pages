"""Integration Tests for Chromatography & Separation Science API Endpoints."""

from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestChromatographyEndpoints:
    def test_get_presets_catalog(self):
        resp = client.get("/api/v1/chemistry/chromatography/presets")
        assert resp.status_code == 200
        data = resp.json()
        assert len(data) >= 5
        preset_ids = [p["id"] for p in data]
        assert "analgesics_hplc" in preset_ids
        assert "btex_gc" in preset_ids
        assert "parabens_hplc" in preset_ids

    def test_get_preset_simulation_with_overrides(self):
        resp = client.get(
            "/api/v1/chemistry/chromatography/presets/analgesics_hplc?flow_rate=1.5&organic_percent=55.0"
        )
        assert resp.status_code == 200
        data = resp.json()
        assert data["sample_name"] == "Over-the-Counter Analgesics Mixture"
        assert len(data["peaks"]) == 4
        assert data["conditions"]["flow_rate_ml_min"] == 1.5
        assert data["conditions"]["organic_percent"] == 55.0
        assert len(data["chromatogram_trace"]) > 50
        assert data["van_deemter"]["operating_plate_height_um"] > 0

    def test_get_invalid_preset_404(self):
        resp = client.get("/api/v1/chemistry/chromatography/presets/non_existent_preset_xyz")
        assert resp.status_code == 404

    def test_van_deemter_endpoint(self):
        resp = client.get("/api/v1/chemistry/chromatography/van-deemter?length_mm=150.0&inner_diameter_mm=4.6&particle_size_um=3.5&flow_rate_ml_min=1.0")
        assert resp.status_code == 200
        data = resp.json()
        assert data["term_a_um"] > 0
        assert data["optimal_velocity_mm_s"] > 0
        assert data["minimum_plate_height_um"] > 0

    def test_simulate_custom_separation_api(self):
        payload = {
            "sample_name": "API Test Mixture",
            "modality": "hplc",
            "detector": "uv_dad",
            "column": {
                "name": "Rapid Resolution C18",
                "length_mm": 100.0,
                "inner_diameter_mm": 2.1,
                "particle_size_um": 1.8,
                "film_thickness_um": 0.25,
                "stationary_phase": "c18_octadecyl",
                "void_volume_ml": 0.35,
            },
            "conditions": {
                "flow_rate_ml_min": 0.4,
                "modality": "hplc",
                "elution_mode": "isocratic",
                "solvent_a_name": "Water",
                "solvent_b_name": "Methanol",
                "organic_percent": 65.0,
                "gradient_start_percent": 10.0,
                "gradient_end_percent": 90.0,
                "gradient_time_min": 10.0,
                "temperature_c": 40.0,
                "temp_ramp_rate_c_min": 10.0,
                "final_temperature_c": 250.0,
                "carrier_gas": "Helium",
            },
            "analytes": [
                {
                    "compound_id": "c1",
                    "compound_name": "Compound 1",
                    "chemical_formula": "C6H6O",
                    "molecular_weight": 94.11,
                    "log_kow": 1.46,
                    "concentration_mg_l": 50.0,
                },
                {
                    "compound_id": "c2",
                    "compound_name": "Compound 2",
                    "chemical_formula": "C7H8O",
                    "molecular_weight": 108.14,
                    "log_kow": 2.05,
                    "concentration_mg_l": 50.0,
                },
            ],
        }
        resp = client.post("/api/v1/chemistry/chromatography/simulate", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert len(data["peaks"]) == 2
        assert data["peaks"][0]["retention_time_min"] < data["peaks"][1]["retention_time_min"]
        assert data["separation_quality"] in ["baseline_resolved", "partial_overlap"]
