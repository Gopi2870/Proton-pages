"""
Integration Tests for Spectroscopy & Instrumental Analysis API Endpoints.
"""
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestSpectroscopyEndpoints:
    def test_list_standards(self):
        resp = client.get("/api/v1/chemistry/spectroscopy/uv-vis/standards")
        assert resp.status_code == 200
        data = resp.json()
        assert len(data) >= 5
        standard_ids = [s["id"] for s in data]
        assert "kmno4" in standard_ids
        assert "riboflavin" in standard_ids

    def test_simulate_uv_vis(self):
        payload = {
            "analyte_id": "kmno4",
            "concentration_m": 0.0002,
            "path_length_cm": 1.0,
            "start_wavelength_nm": 400.0,
            "end_wavelength_nm": 700.0,
            "step_nm": 10.0,
        }
        resp = client.post("/api/v1/chemistry/spectroscopy/uv-vis/simulate", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["analyte_name"] == "Potassium Permanganate"
        assert data["lambda_max_nm"] == 525.0
        assert data["absorbance_at_lambda_max"] > 0.4
        assert len(data["spectrum_points"]) > 20

    def test_calibration_curve_endpoint(self):
        payload = {
            "analyte_name": "Riboflavin",
            "standard_points": [
                {"concentration_m": 0.00001, "absorbance": 0.125},
                {"concentration_m": 0.00002, "absorbance": 0.250},
                {"concentration_m": 0.00003, "absorbance": 0.375},
            ],
            "unknown_absorbance": 0.200,
        }
        resp = client.post("/api/v1/chemistry/spectroscopy/uv-vis/calibration-curve", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert abs(data["slope"] - 12500.0) < 50.0
        assert data["r_squared"] > 0.99
        assert data["calculated_concentration_m"] is not None

    def test_simulate_ftir(self):
        payload = {"compound_id": "acetic_acid"}
        resp = client.post("/api/v1/chemistry/spectroscopy/ftir/simulate", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["compound_name"] == "Acetic Acid"
        assert len(data["detected_bands"]) >= 3
        assert len(data["spectrum_points"]) > 100

    def test_identify_ftir_peaks(self):
        payload = {
            "experimental_peaks_cm1": [1740.0, 1240.0, 2980.0],
            "tolerance_cm1": 35.0,
        }
        resp = client.post("/api/v1/chemistry/spectroscopy/ftir/identify-peaks", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert len(data["matches"]) >= 2
        assert "Carbonyl" in data["diagnostic_assessment"]

    def test_simulate_nmr(self):
        payload = {
            "compound_id": "ethyl_acetate",
            "nucleus": "1H",
            "spectrometer_freq_mhz": 400.0,
        }
        resp = client.post("/api/v1/chemistry/spectroscopy/nmr/simulate", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["nucleus"] == "1H"
        assert data["compound_name"] == "Ethyl Acetate"
        assert len(data["signals"]) == 3
        assert data["total_integrated_nuclei"] == 8

    def test_challenges_endpoint(self):
        resp = client.get("/api/v1/chemistry/spectroscopy/challenges")
        assert resp.status_code == 200
        data = resp.json()
        assert len(data) >= 2
        assert data[0]["challenge_id"] == "chall-001"
