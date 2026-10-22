"""Scientific engine for Nuclear Chemistry, Radioactive Decay Chains & Bateman Solvers."""

import math
from typing import Any, Dict, List, Optional, Tuple
from app.models.nuclear_decay import (
    Radioisotope,
    DecayChainPreset,
    BatemanTimePoint,
    RadiocarbonDatingResult,
)
from app.schemas.nuclear_decay import (
    NuclideSummary,
    ChainPresetSummary,
    BatemanSimulationRequest,
    BatemanSimulationResponse,
    RadiocarbonDatingRequest,
    RadiocarbonDatingResponse,
)

# Reference constants
SECONDS_PER_MINUTE = 60.0
SECONDS_PER_HOUR = 3600.0
SECONDS_PER_DAY = 86400.0
SECONDS_PER_YEAR = 31557600.0  # Julian year 365.25 days

# C-14 constants
LIBBY_HALF_LIFE_YR = 5568.0
CAMBRIDGE_HALF_LIFE_YR = 5730.0
MODERN_C14_ACTIVITY_DPM_G = 15.3  # Disintegrations per minute per gram carbon (100% modern carbon)

CURATED_CHAINS: Dict[str, DecayChainPreset] = {
    "molybdenum_technetium": DecayChainPreset(
        id="molybdenum_technetium",
        name="Molybdenum-99 / Technetium-99m Medical Generator",
        category="medical",
        description="The workhorse radionuclide generator for diagnostic nuclear medicine (SPECT imaging). Exhibits classical transient equilibrium where daughter Tc-99m reaches peak activity around 23 hours.",
        default_time_horizon_s=72.0 * SECONDS_PER_HOUR,
        default_time_unit="hours",
        equilibrium_type="transient",
        isotopes=[
            Radioisotope(
                symbol="Mo-99",
                name="Molybdenum-99",
                atomic_number=42,
                mass_number=99,
                half_life_seconds=65.94 * SECONDS_PER_HOUR,
                half_life_display="65.94 hours",
                decay_constant_s_inv=math.log(2) / (65.94 * SECONDS_PER_HOUR),
                decay_mode="beta_minus",
                daughter_isotope="Tc-99m",
                branching_ratio=0.876,
                is_stable=False,
                energy_mev=1.23,
            ),
            Radioisotope(
                symbol="Tc-99m",
                name="Technetium-99m (Metastable)",
                atomic_number=43,
                mass_number=99,
                half_life_seconds=6.007 * SECONDS_PER_HOUR,
                half_life_display="6.01 hours",
                decay_constant_s_inv=math.log(2) / (6.007 * SECONDS_PER_HOUR),
                decay_mode="gamma",
                daughter_isotope="Tc-99g",
                branching_ratio=1.0,
                is_stable=False,
                energy_mev=0.1405,  # Diagnostic 140.5 keV gamma
            ),
            Radioisotope(
                symbol="Tc-99g",
                name="Technetium-99 (Ground State)",
                atomic_number=43,
                mass_number=99,
                half_life_seconds=2.111e5 * SECONDS_PER_YEAR,
                half_life_display="2.11 × 10⁵ years",
                decay_constant_s_inv=math.log(2) / (2.111e5 * SECONDS_PER_YEAR),
                decay_mode="beta_minus",
                daughter_isotope="Ru-99",
                branching_ratio=1.0,
                is_stable=False,
            ),
            Radioisotope(
                symbol="Ru-99",
                name="Ruthenium-99",
                atomic_number=44,
                mass_number=99,
                half_life_seconds=None,
                half_life_display="Stable",
                decay_constant_s_inv=0.0,
                decay_mode="stable",
                daughter_isotope=None,
                is_stable=True,
            ),
        ],
    ),
    "radon_daughters": DecayChainPreset(
        id="radon_daughters",
        name="Radon-222 Decay Progeny (Short-Lived)",
        category="primordial",
        description="Noble gas Radon-222 decay cascade producing alpha and beta emitting indoor lung-hazard particulates (Po-218, Pb-214, Bi-214) reaching secular equilibrium within ~4 hours.",
        default_time_horizon_s=5.0 * SECONDS_PER_HOUR,
        default_time_unit="hours",
        equilibrium_type="secular",
        isotopes=[
            Radioisotope(
                symbol="Rn-222",
                name="Radon-222",
                atomic_number=86,
                mass_number=222,
                half_life_seconds=3.823 * SECONDS_PER_DAY,
                half_life_display="3.82 days",
                decay_constant_s_inv=math.log(2) / (3.823 * SECONDS_PER_DAY),
                decay_mode="alpha",
                daughter_isotope="Po-218",
                branching_ratio=1.0,
                is_stable=False,
                energy_mev=5.49,
            ),
            Radioisotope(
                symbol="Po-218",
                name="Polonium-218 (Radium A)",
                atomic_number=84,
                mass_number=218,
                half_life_seconds=3.098 * SECONDS_PER_MINUTE,
                half_life_display="3.10 min",
                decay_constant_s_inv=math.log(2) / (3.098 * SECONDS_PER_MINUTE),
                decay_mode="alpha",
                daughter_isotope="Pb-214",
                branching_ratio=1.0,
                is_stable=False,
                energy_mev=6.00,
            ),
            Radioisotope(
                symbol="Pb-214",
                name="Lead-214 (Radium B)",
                atomic_number=82,
                mass_number=214,
                half_life_seconds=26.8 * SECONDS_PER_MINUTE,
                half_life_display="26.8 min",
                decay_constant_s_inv=math.log(2) / (26.8 * SECONDS_PER_MINUTE),
                decay_mode="beta_minus",
                daughter_isotope="Bi-214",
                branching_ratio=1.0,
                is_stable=False,
            ),
            Radioisotope(
                symbol="Bi-214",
                name="Bismuth-214 (Radium C)",
                atomic_number=83,
                mass_number=214,
                half_life_seconds=19.9 * SECONDS_PER_MINUTE,
                half_life_display="19.9 min",
                decay_constant_s_inv=math.log(2) / (19.9 * SECONDS_PER_MINUTE),
                decay_mode="beta_minus",
                daughter_isotope="Pb-210",
                branching_ratio=1.0,
                is_stable=False,
            ),
            Radioisotope(
                symbol="Pb-210",
                name="Lead-210 (Radium D)",
                atomic_number=82,
                mass_number=210,
                half_life_seconds=22.2 * SECONDS_PER_YEAR,
                half_life_display="22.2 years",
                decay_constant_s_inv=math.log(2) / (22.2 * SECONDS_PER_YEAR),
                decay_mode="beta_minus",
                daughter_isotope=None,
                is_stable=False,
            ),
        ],
    ),
    "uranium_actinides": DecayChainPreset(
        id="uranium_actinides",
        name="Uranium-238 Alpha/Beta Head Cascade",
        category="actinide",
        description="The head of the Uranium-238 (4n+2) natural radioactive decay series leading down to Uranium-234. High disparity in half-lives drives deep secular equilibrium.",
        default_time_horizon_s=100.0 * SECONDS_PER_DAY,
        default_time_unit="days",
        equilibrium_type="secular",
        isotopes=[
            Radioisotope(
                symbol="U-238",
                name="Uranium-238",
                atomic_number=92,
                mass_number=238,
                half_life_seconds=4.468e9 * SECONDS_PER_YEAR,
                half_life_display="4.468 × 10⁹ y",
                decay_constant_s_inv=math.log(2) / (4.468e9 * SECONDS_PER_YEAR),
                decay_mode="alpha",
                daughter_isotope="Th-234",
                branching_ratio=1.0,
                is_stable=False,
                energy_mev=4.27,
            ),
            Radioisotope(
                symbol="Th-234",
                name="Thorium-234",
                atomic_number=90,
                mass_number=234,
                half_life_seconds=24.10 * SECONDS_PER_DAY,
                half_life_display="24.10 days",
                decay_constant_s_inv=math.log(2) / (24.10 * SECONDS_PER_DAY),
                decay_mode="beta_minus",
                daughter_isotope="Pa-234m",
                branching_ratio=1.0,
                is_stable=False,
            ),
            Radioisotope(
                symbol="Pa-234m",
                name="Protactinium-234m",
                atomic_number=91,
                mass_number=234,
                half_life_seconds=1.17 * SECONDS_PER_MINUTE,
                half_life_display="1.17 min",
                decay_constant_s_inv=math.log(2) / (1.17 * SECONDS_PER_MINUTE),
                decay_mode="beta_minus",
                daughter_isotope="U-234",
                branching_ratio=1.0,
                is_stable=False,
            ),
            Radioisotope(
                symbol="U-234",
                name="Uranium-234",
                atomic_number=92,
                mass_number=234,
                half_life_seconds=2.455e5 * SECONDS_PER_YEAR,
                half_life_display="2.455 × 10⁵ y",
                decay_constant_s_inv=math.log(2) / (2.455e5 * SECONDS_PER_YEAR),
                decay_mode="alpha",
                daughter_isotope=None,
                is_stable=False,
            ),
        ],
    ),
    "iodine_131": DecayChainPreset(
        id="iodine_131",
        name="Iodine-131 Single-Step Medical Radiotherapy",
        category="medical",
        description="Fission product and targeted radiopharmaceutical used in thyroid carcinoma ablation. Decays by beta emission accompanied by gamma rays directly to stable Xenon-131.",
        default_time_horizon_s=40.0 * SECONDS_PER_DAY,
        default_time_unit="days",
        equilibrium_type="none",
        isotopes=[
            Radioisotope(
                symbol="I-131",
                name="Iodine-131",
                atomic_number=53,
                mass_number=131,
                half_life_seconds=8.025 * SECONDS_PER_DAY,
                half_life_display="8.025 days",
                decay_constant_s_inv=math.log(2) / (8.025 * SECONDS_PER_DAY),
                decay_mode="beta_minus",
                daughter_isotope="Xe-131",
                branching_ratio=1.0,
                is_stable=False,
                energy_mev=0.971,
            ),
            Radioisotope(
                symbol="Xe-131",
                name="Xenon-131",
                atomic_number=54,
                mass_number=131,
                half_life_seconds=None,
                half_life_display="Stable",
                decay_constant_s_inv=0.0,
                decay_mode="stable",
                daughter_isotope=None,
                is_stable=True,
            ),
        ],
    ),
}


class NuclearDecayEngine:
    """Scientific calculation and analytical Bateman solver for nuclear decay series."""

    @classmethod
    def get_presets(cls) -> List[ChainPresetSummary]:
        summaries = []
        for p in CURATED_CHAINS.values():
            first_sym = p.isotopes[0].symbol if p.isotopes else ""
            last_sym = p.isotopes[-1].symbol if p.isotopes else ""
            default_t = p.default_time_horizon_s
            if p.default_time_unit == "hours":
                t_str = f"{default_t / SECONDS_PER_HOUR:.1f} hours"
            elif p.default_time_unit == "days":
                t_str = f"{default_t / SECONDS_PER_DAY:.1f} days"
            elif p.default_time_unit == "years":
                t_str = f"{default_t / SECONDS_PER_YEAR:.1f} years"
            else:
                t_str = f"{default_t:.1f} seconds"

            summaries.append(
                ChainPresetSummary(
                    id=p.id,
                    name=p.name,
                    category=p.category,
                    description=p.description,
                    isotopes_count=len(p.isotopes),
                    first_nuclide=first_sym,
                    stable_end_product=last_sym,
                    equilibrium_type=p.equilibrium_type,
                    default_time_horizon_display=t_str,
                )
            )
        return summaries

    @classmethod
    def get_preset(cls, chain_id: str) -> Optional[DecayChainPreset]:
        return CURATED_CHAINS.get(chain_id)

    @classmethod
    def convert_time_to_seconds(cls, time_val: float, unit: str) -> float:
        unit = unit.lower()
        if unit == "minutes":
            return time_val * SECONDS_PER_MINUTE
        elif unit == "hours":
            return time_val * SECONDS_PER_HOUR
        elif unit == "days":
            return time_val * SECONDS_PER_DAY
        elif unit == "years":
            return time_val * SECONDS_PER_YEAR
        return time_val

    @classmethod
    def solve_bateman_chain(
        cls, isotopes: List[Radioisotope], initial_n: Dict[str, float], t_s: float
    ) -> Tuple[Dict[str, float], Dict[str, float]]:
        """Analytically computes exact populations N_i(t) and radioactivity A_i(t) using Bateman equations."""
        n_iso = len(isotopes)
        symbols = [iso.symbol for iso in isotopes]
        lambdas = [iso.decay_constant_s_inv for iso in isotopes]

        # Regularize near-identical lambdas to avoid division by zero in Bateman denominator
        adj_lambdas = lambdas[:]
        for i in range(n_iso):
            for j in range(i + 1, n_iso):
                if adj_lambdas[i] > 0 and adj_lambdas[j] > 0:
                    diff = abs(adj_lambdas[i] - adj_lambdas[j])
                    if diff / max(adj_lambdas[i], adj_lambdas[j]) < 1e-6:
                        adj_lambdas[j] *= 1.0 + 1e-6

        # Concentrations dict
        n_out: Dict[str, float] = {sym: 0.0 for sym in symbols}

        # By superposition, calculate contribution from each isotope with initial population
        for start_idx in range(n_iso):
            n0 = initial_n.get(symbols[start_idx], 0.0)
            if n0 <= 0.0:
                continue

            for end_idx in range(start_idx, n_iso):
                # Chain length from start to end
                chain_len = end_idx - start_idx + 1

                if chain_len == 1:
                    # Single decay step: N(t) = N0 * exp(-lambda * t)
                    lam = adj_lambdas[start_idx]
                    n_out[symbols[end_idx]] += n0 * math.exp(-lam * t_s)
                elif isotopes[end_idx].is_stable or adj_lambdas[end_idx] == 0.0:
                    # Final stable product: accumulated from radioactive precursors
                    # N_stable(t) = N0 - sum_{i=start}^{end-1} N_i(t)
                    # We compute this by subtracting the remaining radioactive precursor atoms
                    pass
                else:
                    # Analytical Bateman equation:
                    # N_n(t) = N_start * prod_{k=start}^{end-1} lambda_k * sum_{j=start}^{end} c_j * exp(-lambda_j * t)
                    prod_lam = 1.0
                    for k in range(start_idx, end_idx):
                        branching = isotopes[k].branching_ratio
                        prod_lam *= adj_lambdas[k] * branching

                    sum_terms = 0.0
                    for j in range(start_idx, end_idx + 1):
                        denom = 1.0
                        for k in range(start_idx, end_idx + 1):
                            if k != j:
                                denom *= (adj_lambdas[k] - adj_lambdas[j])
                        c_j = 1.0 / denom if abs(denom) > 1e-30 else 0.0
                        sum_terms += c_j * math.exp(-adj_lambdas[j] * t_s)

                    val = n0 * prod_lam * sum_terms
                    n_out[symbols[end_idx]] += max(0.0, val)

            # Accumulate stable final nuclide by mass/atom conservation
            if isotopes[-1].is_stable:
                radioactive_sum = sum(
                    n_out[symbols[k]] for k in range(start_idx, n_iso - 1)
                )
                stable_gain = max(0.0, n0 - radioactive_sum)
                n_out[symbols[-1]] = max(n_out[symbols[-1]], stable_gain)

        # Radioactivity A_i = lambda_i * N_i (Bq)
        activities: Dict[str, float] = {}
        for sym, iso in zip(symbols, isotopes):
            activities[sym] = max(0.0, iso.decay_constant_s_inv * n_out[sym])

        return n_out, activities

    @classmethod
    def simulate(cls, request: BatemanSimulationRequest) -> BatemanSimulationResponse:
        """Simulates complete decay chain time evolution over requested horizon."""
        if request.chain_id and request.chain_id in CURATED_CHAINS:
            preset = CURATED_CHAINS[request.chain_id]
            chain_name = preset.name
            isotopes = preset.isotopes
            eq_type = preset.equilibrium_type
        else:
            chain_name = "Custom Radioactive Decay Chain"
            eq_type = "none"
            isotopes = []
            for p in (request.custom_isotopes or []):
                if isinstance(p, dict):
                    isotopes.append(Radioisotope(**p))
                elif isinstance(p, Radioisotope):
                    isotopes.append(p)

        if not isotopes:
            raise ValueError("Decay chain must contain at least one radioisotope.")

        # Total horizon in seconds
        total_time_s = cls.convert_time_to_seconds(request.time_horizon, request.time_unit)

        # Validate initial populations
        init_pops = request.initial_populations or {}
        if init_pops:
            for sym, pop in init_pops.items():
                if pop < 0.0:
                    raise ValueError(f"Initial population for {sym} cannot be negative (got {pop}).")
        else:
            init_pops = {isotopes[0].symbol: 1.0e12}

        time_step = total_time_s / request.points_count
        trajectory: List[Dict[str, Any]] = []

        last_pops: Dict[str, float] = {}
        last_acts: Dict[str, float] = {}

        for step in range(request.points_count + 1):
            t_s = step * time_step
            # User-friendly display time in selected unit
            if request.time_unit == "minutes":
                t_disp = round(t_s / SECONDS_PER_MINUTE, 2)
            elif request.time_unit == "hours":
                t_disp = round(t_s / SECONDS_PER_HOUR, 2)
            elif request.time_unit == "days":
                t_disp = round(t_s / SECONDS_PER_DAY, 2)
            elif request.time_unit == "years":
                t_disp = round(t_s / SECONDS_PER_YEAR, 4)
            else:
                t_disp = round(t_s, 2)

            pops, acts = cls.solve_bateman_chain(isotopes, init_pops, t_s)
            last_pops = pops
            last_acts = acts

            pt: Dict[str, Any] = {
                "time_seconds": round(t_s, 2),
                "time_display": t_disp,
                "populations": {sym: round(v, 4) for sym, v in pops.items()},
                "activities_bq": {sym: round(v, 4) for sym, v in acts.items()},
                "total_activity_bq": round(sum(acts.values()), 4),
            }
            trajectory.append(pt)

        # Pedagogical Summary
        parent_sym = isotopes[0].symbol
        child_sym = isotopes[1].symbol if len(isotopes) > 1 else ""
        summary = (
            f"Analytical Bateman cascade for '{chain_name}' computed over {request.time_horizon} {request.time_unit} "
            f"({len(isotopes)} nuclide states). "
        )
        if eq_type == "transient":
            # Time of maximum activity for daughter: t_max = ln(l2/l1) / (l2 - l1)
            l1 = isotopes[0].decay_constant_s_inv
            l2 = isotopes[1].decay_constant_s_inv
            if l2 > l1 > 0:
                t_max_s = math.log(l2 / l1) / (l2 - l1)
                t_max_h = t_max_s / SECONDS_PER_HOUR
                ratio = l2 / (l2 - l1)
                summary += (
                    f"Transient equilibrium reached: {child_sym} activity peaks at t = {t_max_h:.1f} hours, "
                    f"approaching equilibrium activity ratio A2/A1 = {ratio:.2f}."
                )
        elif eq_type == "secular":
            summary += (
                f"Secular equilibrium established: daughter activities equilibrate directly to parent {parent_sym} "
                f"due to orders-of-magnitude parent half-life predominance (λ_parent ≪ λ_daughters)."
            )
        else:
            summary += f"Decay progression exhibits monotonic exponential clearance of parent {parent_sym}."

        iso_summaries = [
            NuclideSummary(
                symbol=iso.symbol,
                name=iso.name,
                atomic_number=iso.atomic_number,
                mass_number=iso.mass_number,
                half_life_display=iso.half_life_display,
                decay_mode=iso.decay_mode,
                daughter_isotope=iso.daughter_isotope,
                is_stable=iso.is_stable,
            )
            for iso in isotopes
        ]

        return BatemanSimulationResponse(
            chain_name=chain_name,
            equilibrium_type=eq_type,
            time_unit=request.time_unit,
            isotopes=iso_summaries,
            time_points_count=len(trajectory),
            trajectory=trajectory,
            final_populations={s: round(v, 4) for s, v in last_pops.items()},
            final_activities_bq={s: round(v, 4) for s, v in last_acts.items()},
            pedagogical_summary=summary,
        )

    @classmethod
    def calculate_radiocarbon_age(
        cls, request: RadiocarbonDatingRequest
    ) -> RadiocarbonDatingResponse:
        """Calculates uncalibrated radiometric age from measured 14C activity ratio."""
        if request.fraction_modern_carbon is not None:
            ratio = request.fraction_modern_carbon
        elif request.measured_dpm_per_g is not None:
            ratio = request.measured_dpm_per_g / MODERN_C14_ACTIVITY_DPM_G
        else:
            ratio = 1.0

        ratio = max(1e-12, min(1.5, ratio))

        half_life = CAMBRIDGE_HALF_LIFE_YR if request.use_cambridge_half_life else LIBBY_HALF_LIFE_YR
        decay_constant = math.log(2) / half_life

        # Radiometric uncalibrated age: t = -ln(A/A0) / lambda
        age_bp = -math.log(ratio) / decay_constant

        # Estimated counting uncertainty based on typical AMS laboratory precision (+/- 0.3% error in ratio)
        uncertainty = 25.0 + 0.008 * age_bp

        # Calendar era approximation (Before Present 1950 AD benchmark)
        cal_year = 1950.0 - age_bp
        if cal_year < 0:
            era_str = f"~{abs(round(cal_year))} BCE"
        else:
            era_str = f"~{round(cal_year)} CE"

        cal_notes = (
            f"Calculated using the {'Cambridge physical (5,730 ± 40 yr)' if request.use_cambridge_half_life else 'Libby conventional (5,568 yr)'} half-life. "
            f"Uncalibrated radiometric age is {round(age_bp)} ± {round(uncertainty)} BP (Before Present, benchmarked to 1950 CE)."
        )

        disclaimer = (
            "CRITICAL SCIENTIFIC CAVEAT: Radiocarbon age in BP (Before Present) is an uncalibrated radiometric figure, "
            "NOT a true calendar date. Conversion to historical calendar years requires calibration against high-resolution "
            "dendrochronological curves (IntCal20) to account for past atmospheric fluctuations in 14C production driven by "
            "solar geomagnetic cycles, ocean ventilation reservoir delays, and industrial fossil fuel dilution (Suess effect)."
        )

        result = RadiocarbonDatingResult(
            fraction_modern_carbon=round(ratio, 4),
            uncalibrated_age_years_bp=round(age_bp, 1),
            uncertainty_years=round(uncertainty, 1),
            half_life_used_years=half_life,
            decay_constant_yr_inv=round(decay_constant, 7),
            approximate_calendar_era=era_str,
            calibration_notes=cal_notes,
            scientific_disclaimer=disclaimer,
        )

        return RadiocarbonDatingResponse(dating_result=result)
