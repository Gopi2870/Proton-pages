"""
Unit Tests for Electrochemistry, Nernst Equation, and Electrolysis.
Scientifically verified against CRC Handbook standard reduction potentials and Faraday constant.
"""
import pytest
from services.chemistry.app.services.electrochemistry_service import ElectrochemistryService

class TestElectrochemistryEngine:
    def test_reduction_potential_lookup(self):
        cu = ElectrochemistryService.find_half_reaction("Cu(2+)")
        assert cu is not None
        assert pytest.approx(cu.potential_volts, abs=1e-3) == 0.342

        zn = ElectrochemistryService.find_half_reaction("Zn(2+)")
        assert zn is not None
        assert pytest.approx(zn.potential_volts, abs=1e-3) == -0.762

        she = ElectrochemistryService.find_half_reaction("H+")
        assert she is not None
        assert she.potential_volts == 0.0

    def test_standard_daniell_cell(self):
        # Cathode: Cu2+ + 2e- -> Cu (+0.3419 V)
        # Anode: Zn2+ + 2e- -> Zn (-0.7618 V)
        # E°cell = 0.3419 - (-0.7618) = +1.1037 V
        # ΔG° = -2 * 96485.33 * 1.1037 / 1000 = -212.98 kJ
        cell = ElectrochemistryService.calculate_galvanic_cell(
            cathode_species="Cu(2+)",
            anode_species="Zn(2+)",
            cathode_molarity=1.0,
            anode_molarity=1.0,
            temperature_kelvin=298.15
        )

        assert cell.electrons_transferred_n == 2
        assert pytest.approx(cell.standard_potential_volts, abs=1e-2) == 1.10
        assert pytest.approx(cell.cell_potential_volts, abs=1e-2) == 1.10
        assert cell.reaction_quotient_q == 1.0
        assert cell.is_spontaneous is True
        assert cell.standard_gibbs_free_energy_kj < 0

    def test_non_standard_nernst_equation(self):
        # With [Zn2+] = 0.01 M and [Cu2+] = 1.0 M:
        # Q = 0.01 / 1.0 = 0.01
        # Nernst correction = (RT / nF) * ln(0.01) = -0.05916 V
        # Ecell = E°cell - (-0.05916) = E°cell + 0.05916 V
        cell = ElectrochemistryService.calculate_galvanic_cell(
            cathode_species="Cu(2+)",
            anode_species="Zn(2+)",
            cathode_molarity=1.0,
            anode_molarity=0.01,
            temperature_kelvin=298.15
        )

        assert pytest.approx(cell.reaction_quotient_q, rel=1e-3) == 0.01
        # Potential must increase when products are diluted (Le Chatelier shift forward)
        assert cell.cell_potential_volts > cell.standard_potential_volts
        assert pytest.approx(cell.cell_potential_volts - cell.standard_potential_volts, abs=1e-2) == 0.059

    def test_faraday_electrolysis_copper_deposition(self):
        # Current = 2.0 A, Time = 1800 s (30 min)
        # Q = 3600 C
        # Moles electrons = 3600 / 96485.33 = 0.03731 mol
        # Moles Cu = 0.03731 / 2 = 0.01865 mol
        # Mass Cu = 0.01865 * 63.546 = 1.1856 g
        result = ElectrochemistryService.calculate_electrolysis(
            species="Cu",
            molar_mass_g_mol=63.546,
            electrons_per_ion_n=2,
            current_amperes=2.0,
            time_seconds=1800.0
        )

        assert pytest.approx(result.total_charge_coulombs, abs=1e-2) == 3600.0
        assert pytest.approx(result.mass_deposited_grams, abs=1e-2) == 1.19
        assert result.gas_volume_liters_stp is None

    def test_faraday_electrolysis_gas_evolution(self):
        # Water electrolysis cathode: 2H+ + 2e- -> H2(g)
        # Current = 5.0 A, Time = 3600 s (1 hr)
        # Moles H2 = (5.0 * 3600) / (2 * 96485.33) = 0.093278 mol
        # Volume at STP = 0.093278 * 22.414 = 2.09 L
        result = ElectrochemistryService.calculate_electrolysis(
            species="H2",
            molar_mass_g_mol=2.016,
            electrons_per_ion_n=2,
            current_amperes=5.0,
            time_seconds=3600.0
        )

        assert result.gas_volume_liters_stp is not None
        assert pytest.approx(result.gas_volume_liters_stp, abs=1e-1) == 2.09

    def test_invalid_negative_concentration_raises_error(self):
        with pytest.raises(ValueError, match="strictly positive"):
            ElectrochemistryService.calculate_galvanic_cell(
                cathode_species="Cu(2+)",
                anode_species="Zn(2+)",
                cathode_molarity=-1.0
            )
