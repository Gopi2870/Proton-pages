"""Unit tests for Nuclear Chemistry, Radioactive Decay Chains & Bateman Solvers (PR #042)."""

import math
import pytest
from app.models.nuclear_decay import Radioisotope
from app.schemas.nuclear_decay import (
    BatemanSimulationRequest,
    RadiocarbonDatingRequest,
)
from app.services.nuclear_decay_service import (
    NuclearDecayEngine,
    CURATED_CHAINS,
    SECONDS_PER_HOUR,
    SECONDS_PER_DAY,
    SECONDS_PER_YEAR,
    CAMBRIDGE_HALF_LIFE_YR,
    LIBBY_HALF_LIFE_YR,
)


class TestNuclearDecayEngine:
    """Scientific validation suite for radioactive decay chains, Bateman solver, and radiocarbon dating."""

    def test_presets_registered(self):
        """Verifies curated decay series exist in the catalog."""
        presets = NuclearDecayEngine.get_presets()
        assert len(presets) >= 4
        ids = [p.id for p in presets]
        assert "molybdenum_technetium" in ids
        assert "radon_daughters" in ids
        assert "uranium_actinides" in ids
        assert "iodine_131" in ids

    def test_single_step_exponential_decay(self):
        """Verifies exact half-life population at t = t_1/2 for single radionuclide."""
        t_half_s = 100.0
        iso = Radioisotope(
            symbol="X-100",
            name="Test Nuclide",
            atomic_number=50,
            mass_number=100,
            half_life_seconds=t_half_s,
            half_life_display="100 s",
            decay_constant_s_inv=math.log(2) / t_half_s,
            decay_mode="beta_minus",
            daughter_isotope="Y-100",
            is_stable=False,
        )
        daughter = Radioisotope(
            symbol="Y-100",
            name="Stable Daughter",
            atomic_number=51,
            mass_number=100,
            decay_constant_s_inv=0.0,
            decay_mode="stable",
            is_stable=True,
        )

        n_out, acts = NuclearDecayEngine.solve_bateman_chain(
            [iso, daughter], {"X-100": 1.0e10}, t_s=t_half_s
        )

        # After exactly 1 half life, parent must be 50% and stable daughter 50%
        assert n_out["X-100"] == pytest.approx(0.5e10, rel=1e-3)
        assert n_out["Y-100"] == pytest.approx(0.5e10, rel=1e-3)
        assert acts["X-100"] == pytest.approx(0.5e10 * (math.log(2) / t_half_s), rel=1e-3)
        assert acts["Y-100"] == 0.0

    def test_molybdenum_technetium_transient_equilibrium(self):
        """Validates transient equilibrium in Mo-99 / Tc-99m generator."""
        req = BatemanSimulationRequest(
            chain_id="molybdenum_technetium",
            time_horizon=72.0,
            time_unit="hours",
            points_count=72,
        )
        res = NuclearDecayEngine.simulate(req)

        assert res.chain_name == "Molybdenum-99 / Technetium-99m Medical Generator"
        assert res.equilibrium_type == "transient"
        assert len(res.trajectory) == 73

        # Mo-99 (l1 = ln2 / 65.94h) and Tc-99m (l2 = ln2 / 6.007h)
        # Theoretical time of maximum Tc-99m activity:
        # t_max = ln(l2/l1) / (l2 - l1) approx 22.9 hours
        traj = res.trajectory
        max_tc_act = 0.0
        time_at_max_tc = 0.0

        for pt in traj:
            tc_act = pt["activities_bq"]["Tc-99m"]
            if tc_act > max_tc_act:
                max_tc_act = tc_act
                time_at_max_tc = pt["time_display"]

        assert time_at_max_tc == pytest.approx(23.0, abs=1.5)

        # At late times (e.g. 60 hours), check transient equilibrium ratio:
        # A_Tc / A_Mo -> lambda_2 / (lambda_2 - lambda_1) * branching (0.876)
        l1 = math.log(2) / (65.94 * SECONDS_PER_HOUR)
        l2 = math.log(2) / (6.007 * SECONDS_PER_HOUR)
        theo_ratio = (l2 / (l2 - l1)) * 0.876

        pt_60 = traj[60]
        act_mo_60 = pt_60["activities_bq"]["Mo-99"]
        act_tc_60 = pt_60["activities_bq"]["Tc-99m"]
        assert (act_tc_60 / act_mo_60) == pytest.approx(theo_ratio, rel=0.05)

    def test_radon_secular_equilibrium(self):
        """Validates fast approach to secular equilibrium for short-lived Radon daughters."""
        req = BatemanSimulationRequest(
            chain_id="radon_daughters",
            time_horizon=4.0,
            time_unit="hours",
            points_count=40,
        )
        res = NuclearDecayEngine.simulate(req)

        assert res.chain_name == "Radon-222 Decay Progeny (Short-Lived)"
        assert res.equilibrium_type == "secular"

        # By 4 hours, Po-218 (3 min), Pb-214 (26.8 min), and Bi-214 (19.9 min)
        # activities equilibrate to ~ Rn-222 activity
        final_pt = res.trajectory[-1]
        acts = final_pt["activities_bq"]
        rn_act = acts["Rn-222"]
        po_act = acts["Po-218"]
        pb_act = acts["Pb-214"]
        bi_act = acts["Bi-214"]

        assert po_act == pytest.approx(rn_act, rel=0.05)
        assert pb_act == pytest.approx(rn_act, rel=0.10)
        assert bi_act == pytest.approx(rn_act, rel=0.15)

    def test_bateman_equal_decay_constants_regularization(self):
        """Verifies singularity prevention when two parent-daughter decay constants are identical."""
        t_half = 50.0
        # Two consecutive isotopes with identical half lives
        iso1 = Radioisotope(
            symbol="A",
            name="Iso A",
            atomic_number=10,
            mass_number=20,
            half_life_seconds=t_half,
            decay_constant_s_inv=math.log(2) / t_half,
            daughter_isotope="B",
        )
        iso2 = Radioisotope(
            symbol="B",
            name="Iso B",
            atomic_number=11,
            mass_number=20,
            half_life_seconds=t_half,
            decay_constant_s_inv=math.log(2) / t_half,
            daughter_isotope="C",
        )
        iso3 = Radioisotope(
            symbol="C",
            name="Iso C",
            atomic_number=12,
            mass_number=20,
            decay_constant_s_inv=0.0,
            is_stable=True,
        )

        # Must not raise ZeroDivisionError or produce NaN
        n_out, acts = NuclearDecayEngine.solve_bateman_chain(
            [iso1, iso2, iso3], {"A": 1e6}, t_s=50.0
        )
        assert not math.isnan(n_out["B"])
        assert not math.isinf(n_out["B"])
        assert n_out["B"] > 0.0

    def test_radiocarbon_dating_half_lives(self):
        """Validates C-14 uncalibrated age calculation and calibration caveats."""
        # Fraction modern carbon = 0.5 => exactly 1 half-life
        req_cambridge = RadiocarbonDatingRequest(
            fraction_modern_carbon=0.5,
            use_cambridge_half_life=True,
        )
        res_cambridge = NuclearDecayEngine.calculate_radiocarbon_age(req_cambridge)
        assert res_cambridge.dating_result.uncalibrated_age_years_bp == pytest.approx(5730.0, abs=1.0)
        assert "5,730" in res_cambridge.dating_result.calibration_notes

        req_libby = RadiocarbonDatingRequest(
            fraction_modern_carbon=0.5,
            use_cambridge_half_life=False,
        )
        res_libby = NuclearDecayEngine.calculate_radiocarbon_age(req_libby)
        assert res_libby.dating_result.uncalibrated_age_years_bp == pytest.approx(5568.0, abs=1.0)
        assert "5,568" in res_libby.dating_result.calibration_notes

        # Fraction modern carbon = 0.25 => 2 half-lives (11,460 yr Cambridge)
        req_quarter = RadiocarbonDatingRequest(
            fraction_modern_carbon=0.25,
            use_cambridge_half_life=True,
        )
        res_quarter = NuclearDecayEngine.calculate_radiocarbon_age(req_quarter)
        assert res_quarter.dating_result.uncalibrated_age_years_bp == pytest.approx(11460.0, abs=2.0)

        # Must include scientific calibration disclaimer
        assert "IntCal" in res_quarter.dating_result.scientific_disclaimer
        assert "Suess effect" in res_quarter.dating_result.scientific_disclaimer
