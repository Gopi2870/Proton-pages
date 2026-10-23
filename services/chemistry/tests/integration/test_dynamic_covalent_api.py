"""Integration tests for Dynamic Covalent Chemistry & Constitutional Networks API endpoints (PR #046)."""

import pytest
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestDynamicCovalentApi:
    def test_get_catalog_endpoint(self):
        """Validates retrieval of curated dynamic covalent motifs, building blocks, and templates."""
        res = client.get("/api/v1/chemistry/dynamic-covalent/catalog")
        assert res.status_code == 200
        data = res.json()
        assert "motifs" in data
        assert "building_blocks" in data
        assert "templates" in data
        assert len(data["motifs"]) >= 4
        assert len(data["building_blocks"]) >= 6
        assert len(data["templates"]) >= 3

    def test_simulate_dcl_endpoint_untemplated(self):
        """Validates untemplated DCL simulation endpoint."""
        payload = {
            "motif_id": "imine_condensation",
            "building_block_concs_mM": {"dialdehyde_A": 2.0, "diamine_B": 2.0},
            "template_id": None,
            "template_concentration_mM": 0.0,
            "temperature_k": 298.15,
            "ph": 6.5,
        }
        res = client.post("/api/v1/chemistry/dynamic-covalent/simulate-dcl", json=payload)
        assert res.status_code == 200
        data = res.json()["result"]

        assert data["motif"]["id"] == "imine_condensation"
        assert len(data["members"]) >= 4
        assert data["shannon_diversity_entropy_untemplated"] > 0.0
        assert data["amplified_member_id"] is None

    def test_simulate_dcl_endpoint_with_template(self):
        """Validates template-directed constitutional selection endpoint."""
        payload = {
            "motif_id": "imine_condensation",
            "building_block_concs_mM": {"dialdehyde_A": 2.0, "diamine_B": 2.0, "monoamine_C": 1.0},
            "template_id": "zinc_cation",
            "template_concentration_mM": 1.5,
            "temperature_k": 298.15,
            "ph": 6.5,
        }
        res = client.post("/api/v1/chemistry/dynamic-covalent/simulate-dcl", json=payload)
        assert res.status_code == 200
        data = res.json()["result"]

        assert data["template"]["name"] == "Zinc(II) Cation (Zn²⁺)"
        assert data["amplified_member_id"] == "macrocycle_2x2"
        assert data["max_amplification_factor"] > 1.0
        assert data["shannon_diversity_entropy_templated"] < data["shannon_diversity_entropy_untemplated"]

    def test_exchange_kinetics_endpoint(self):
        """Validates time-course component exchange kinetics endpoint."""
        payload = {
            "motif_id": "disulfide_exchange",
            "initial_symmetric_1_mM": 5.0,
            "initial_symmetric_2_mM": 5.0,
            "initial_asymmetric_mM": 0.0,
            "thiol_catalyst_conc_uM": 150.0,
            "temperature_k": 298.15,
            "time_span_seconds": 3600.0,
            "steps_count": 30,
        }
        res = client.post("/api/v1/chemistry/dynamic-covalent/exchange-kinetics", json=payload)
        assert res.status_code == 200
        data = res.json()["result"]

        assert data["half_life_seconds"] > 0.0
        assert len(data["trajectory"]) == 31
        assert "symmetric_1" in data["trajectory"][-1]["species_concentrations_mM"]
        assert "asymmetric" in data["trajectory"][-1]["species_concentrations_mM"]

    def test_validation_errors(self):
        """Validates rejection of out-of-range parameters."""
        payload = {
            "motif_id": "disulfide_exchange",
            "initial_symmetric_1_mM": -2.0,  # Negative concentration invalid
        }
        res = client.post("/api/v1/chemistry/dynamic-covalent/exchange-kinetics", json=payload)
        assert res.status_code == 422 or res.status_code == 400
