"""Integration tests for Photochemistry & Jablonski Diagrams API endpoints (PR #047)."""

import pytest
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestPhotochemistryApi:
    def test_get_catalog_endpoint(self):
        """Validates retrieval of curated fluorophores, quenchers, and FRET pairs."""
        res = client.get("/api/v1/chemistry/photochemistry/catalog")
        assert res.status_code == 200
        data = res.json()
        assert "fluorophores" in data
        assert "quenchers" in data
        assert "fret_pairs" in data
        assert len(data["fluorophores"]) >= 5
        assert len(data["quenchers"]) >= 3
        assert len(data["fret_pairs"]) >= 2

    def test_simulate_jablonski_endpoint(self):
        """Validates Jablonski electronic state manifold and photophysical rates endpoint."""
        payload = {
            "fluorophore_id": "fluorescein",
            "kr_scaling_factor": 1.0,
            "kic_scaling_factor": 1.0,
            "kisc_scaling_factor": 1.0,
            "temperature_k": 298.15,
        }
        res = client.post("/api/v1/chemistry/photochemistry/simulate-jablonski", json=payload)
        assert res.status_code == 200
        data = res.json()

        assert data["fluorophore"]["name"] == "Fluorescein (Dianion)"
        assert len(data["states"]) == 4
        assert data["rates"]["fluorescence_quantum_yield_phi_f"] > 0.85
        assert data["rates"]["fluorescence_lifetime_tau0_ns"] > 3.5

    def test_calculate_stern_volmer_endpoint(self):
        """Validates Stern-Volmer collisional quenching endpoint."""
        payload = {
            "fluorophore_id": "fluorescein",
            "quencher_id": "iodide_anion",
            "max_quencher_conc_mM": 50.0,
            "points_count": 11,
            "temperature_k": 298.15,
        }
        res = client.post("/api/v1/chemistry/photochemistry/stern-volmer", json=payload)
        assert res.status_code == 200
        data = res.json()["result"]

        assert data["stern_volmer_constant_ksv_m_inv"] > 10.0
        assert data["bimolecular_quenching_rate_kq_m_inv_s_inv"] > 1e9
        assert len(data["points"]) == 11
        assert data["points"][0]["f0_over_f"] == 1.0

    def test_simulate_fret_endpoint(self):
        """Validates Förster Resonance Energy Transfer simulation endpoint."""
        payload = {
            "fret_pair_id": "CFP_YFP",
            "current_distance_r_angstrom": 49.2,
            "min_distance_angstrom": 15.0,
            "max_distance_angstrom": 95.0,
            "steps_count": 25,
        }
        res = client.post("/api/v1/chemistry/photochemistry/simulate-fret", json=payload)
        assert res.status_code == 200
        data = res.json()["result"]

        assert data["forster_distance_r0_angstrom"] == 49.2
        # At r = R0, efficiency must be 50%
        assert abs(data["efficiency_at_current_distance"] - 0.50) <= 0.02
        assert len(data["distance_points"]) == 25

    def test_validation_errors(self):
        """Validates rejection of non-positive scaling or invalid distances."""
        payload = {
            "fluorophore_id": "fluorescein",
            "kr_scaling_factor": -1.0,  # Invalid negative multiplier
        }
        res = client.post("/api/v1/chemistry/photochemistry/simulate-jablonski", json=payload)
        assert res.status_code == 422 or res.status_code == 400
