"""
Unit Tests for Chemical Mixer Simulation Service.
"""
import pytest
from services.chemistry.app.models.mixer import MixedReagentInput
from services.chemistry.app.services.mixer_service import mixer_service

class TestChemicalMixerService:
    def test_empty_mixture(self):
        res = mixer_service.simulate_mixture([])
        assert res.total_volume_ml == 0.0
        assert res.final_ph == 7.0
        assert len(res.precipitates) == 0
        assert len(res.gases) == 0

    def test_exact_stoichiometric_neutralization(self):
        # 10 mL 1.0 M HCl + 10 mL 1.0 M NaOH -> 20 mL, pH 7.00
        reagents = [
            MixedReagentInput(name="Hydrochloric Acid", formula="HCl (aq)", volume_ml=10.0, concentration_m=1.0),
            MixedReagentInput(name="Sodium Hydroxide", formula="NaOH (aq)", volume_ml=10.0, concentration_m=1.0)
        ]
        res = mixer_service.simulate_mixture(reagents)
        assert res.total_volume_ml == 20.0
        assert res.final_ph == 7.0
        assert res.is_exothermic is True
        assert res.delta_temperature_c > 0.0
        assert "H+(aq) + OH-(aq) -> H2O(l)" in res.net_ionic_equation

    def test_excess_acid_neutralization(self):
        # 20 mL 1.0 M HCl + 10 mL 1.0 M NaOH -> 30 mL
        # Excess H+ = 0.01 mol in 0.03 L = 0.333 M -> pH = 0.48
        reagents = [
            MixedReagentInput(name="Hydrochloric Acid", formula="HCl (aq)", volume_ml=20.0, concentration_m=1.0),
            MixedReagentInput(name="Sodium Hydroxide", formula="NaOH (aq)", volume_ml=10.0, concentration_m=1.0)
        ]
        res = mixer_service.simulate_mixture(reagents)
        assert res.total_volume_ml == 30.0
        assert pytest.approx(res.final_ph, 0.05) == 0.48
        assert any("STRONG ACID" in w for w in res.safety_warnings)

    def test_excess_base_neutralization(self):
        # 10 mL 1.0 M HCl + 20 mL 1.0 M NaOH -> 30 mL
        # Excess OH- = 0.01 mol in 0.03 L = 0.333 M -> pOH = 0.48 -> pH = 13.52
        reagents = [
            MixedReagentInput(name="Hydrochloric Acid", formula="HCl (aq)", volume_ml=10.0, concentration_m=1.0),
            MixedReagentInput(name="Sodium Hydroxide", formula="NaOH (aq)", volume_ml=20.0, concentration_m=1.0)
        ]
        res = mixer_service.simulate_mixture(reagents)
        assert res.total_volume_ml == 30.0
        assert pytest.approx(res.final_ph, 0.05) == 13.52
        assert any("STRONG BASE" in w for w in res.safety_warnings)

    def test_silver_chloride_precipitation(self):
        # AgNO3 + HCl -> AgCl(s) (curdy white precipitate)
        reagents = [
            MixedReagentInput(name="Silver Nitrate", formula="AgNO3 (aq)", volume_ml=20.0, concentration_m=0.1),
            MixedReagentInput(name="Hydrochloric Acid", formula="HCl (aq)", volume_ml=20.0, concentration_m=0.1)
        ]
        res = mixer_service.simulate_mixture(reagents)
        assert len(res.precipitates) == 1
        precip = res.precipitates[0]
        assert precip.formula == "AgCl(s)"
        assert "white" in precip.color.lower()
        assert precip.mass_precipitated_g > 0

    def test_silver_chromate_precipitation(self):
        # 2AgNO3 + K2CrO4 -> Ag2CrO4(s) (brick red precipitate)
        reagents = [
            MixedReagentInput(name="Silver Nitrate", formula="AgNO3 (aq)", volume_ml=25.0, concentration_m=0.1),
            MixedReagentInput(name="Potassium Chromate", formula="K2CrO4 (aq)", volume_ml=25.0, concentration_m=0.1)
        ]
        res = mixer_service.simulate_mixture(reagents)
        assert len(res.precipitates) >= 1
        chromate = next(p for p in res.precipitates if p.formula == "Ag2CrO4(s)")
        assert "brick red" in chromate.color.lower()

    def test_copper_hydroxide_precipitation(self):
        # CuSO4 + 2NaOH -> Cu(OH)2(s) (pale blue precipitate)
        reagents = [
            MixedReagentInput(name="Copper(II) Sulfate", formula="CuSO4 (aq)", volume_ml=15.0, concentration_m=0.2),
            MixedReagentInput(name="Sodium Hydroxide", formula="NaOH (aq)", volume_ml=15.0, concentration_m=0.5)
        ]
        res = mixer_service.simulate_mixture(reagents)
        assert any(p.formula == "Cu(OH)2(s)" for p in res.precipitates)
        cu_precip = next(p for p in res.precipitates if p.formula == "Cu(OH)2(s)")
        assert "blue" in cu_precip.color.lower()

    def test_gas_generation_carbonate_acid(self):
        # Na2CO3 + 2HCl -> 2NaCl + H2O + CO2(g)
        reagents = [
            MixedReagentInput(name="Sodium Carbonate", formula="Na2CO3 (aq)", volume_ml=10.0, concentration_m=0.5),
            MixedReagentInput(name="Hydrochloric Acid", formula="HCl (aq)", volume_ml=10.0, concentration_m=1.0)
        ]
        res = mixer_service.simulate_mixture(reagents)
        assert len(res.gases) == 1
        gas = res.gases[0]
        assert gas.formula == "CO2(g)"
        assert gas.volume_liters_stp > 0
