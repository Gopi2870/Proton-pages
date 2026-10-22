"""
Integration Tests for Gas Laws & Phase Equilibria API Endpoints.
"""
from starlette.testclient import TestClient
from services.chemistry.app.server import app

client = TestClient(app)


class TestGasLawsEndpoints:
    def test_get_constants(self):
        resp = client.get("/api/v1/chemistry/gas-laws/constants")
        assert resp.status_code == 200
        data = resp.json()
        assert len(data) >= 6
        gas_ids = [g["id"] for g in data]
        assert "co2" in gas_ids
        assert "he" in gas_ids

    def test_calculate_ideal_gas_api(self):
        payload = {
            "volume_liters": 10.0,
            "moles": 0.5,
            "temperature_k": 300.0,
        }
        resp = client.post("/api/v1/chemistry/gas-laws/ideal/calculate", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["pressure_atm"] > 0
        assert data["volume_liters"] == 10.0
        assert data["moles"] == 0.5

    def test_simulate_vanderwaals_api(self):
        payload = {
            "gas_id": "co2",
            "moles": 1.0,
            "temperature_k": 300.0,
            "current_volume_liters": 1.5,
        }
        resp = client.post("/api/v1/chemistry/gas-laws/vanderwaals/simulate", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["gas_name"] == "Carbon Dioxide"
        assert data["compressibility_z"] > 0
        assert len(data["isotherm_points"]) > 10

    def test_maxwell_boltzmann_api(self):
        payload = {
            "gas_name": "Helium",
            "molar_mass_g_mol": 4.003,
            "temperature_k": 298.15,
        }
        resp = client.post("/api/v1/chemistry/gas-laws/maxwell-boltzmann/distribution", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["v_mp_m_s"] > 1000.0  # Light helium moves very fast (> 1100 m/s)
        assert len(data["distribution_points"]) > 20

    def test_phase_equilibrium_api(self):
        payload = {"substance_id": "ethanol"}
        resp = client.post("/api/v1/chemistry/gas-laws/phase-equilibrium", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["substance_name"] == "Ethanol"
        assert abs(data["normal_boiling_point_c"] - 78.2) < 0.1
        assert len(data["vapor_pressure_curve"]) > 10
