"""Scientific calculation engine for Surface Chemistry, Heterogeneous Catalysis & Adsorption Isotherms."""

import math
from typing import Any, Dict, List, Optional, Tuple
from app.models.surface_chemistry import (
    AdsorptionDataPoint,
    AdsorbentMaterial,
    BetLinearFit,
    IsothermFitModel,
    CatalyticKineticsPoint,
)
from app.schemas.surface_chemistry import (
    MaterialSummary,
    BetCalculationRequest,
    BetCalculationResponse,
    IsothermComparisonRequest,
    IsothermComparisonResponse,
    CatalysisSimulationRequest,
    CatalysisSimulationResponse,
)

# Physical Constants
AVOGADRO_CONSTANT = 6.02214076e23
MOLAR_VOLUME_STP_CM3 = 22414.0  # cm3(STP)/mol

CURATED_MATERIALS: Dict[str, AdsorbentMaterial] = {
    "mcm_41": AdsorbentMaterial(
        id="mcm_41",
        name="MCM-41 Ordered Mesoporous Silica",
        material_type="mesoporous_silica",
        description="Well-ordered hexagonal cylindrical mesopore channels with narrow pore size distribution (~3.5 nm). Typical IUPAC Type IV isotherm with steep capillary condensation step.",
        literature_bet_surface_area_m2_g=985.0,
        monolayer_volume_cm3_g=226.0,
        c_constant=85.0,
        isotherm_type="Type IV",
        sample_points=[
            AdsorptionDataPoint(relative_pressure=0.01, volume_adsorbed_cm3_g=62.0),
            AdsorptionDataPoint(relative_pressure=0.05, volume_adsorbed_cm3_g=135.0),
            AdsorptionDataPoint(relative_pressure=0.10, volume_adsorbed_cm3_g=178.0),
            AdsorptionDataPoint(relative_pressure=0.15, volume_adsorbed_cm3_g=205.0),
            AdsorptionDataPoint(relative_pressure=0.20, volume_adsorbed_cm3_g=228.0),
            AdsorptionDataPoint(relative_pressure=0.25, volume_adsorbed_cm3_g=252.0),
            AdsorptionDataPoint(relative_pressure=0.30, volume_adsorbed_cm3_g=276.0),
            AdsorptionDataPoint(relative_pressure=0.35, volume_adsorbed_cm3_g=305.0),
            AdsorptionDataPoint(relative_pressure=0.42, volume_adsorbed_cm3_g=410.0),
            AdsorptionDataPoint(relative_pressure=0.50, volume_adsorbed_cm3_g=480.0),
            AdsorptionDataPoint(relative_pressure=0.65, volume_adsorbed_cm3_g=505.0),
            AdsorptionDataPoint(relative_pressure=0.80, volume_adsorbed_cm3_g=520.0),
        ],
    ),
    "activated_carbon": AdsorbentMaterial(
        id="activated_carbon",
        name="BPL Commercial Activated Carbon",
        material_type="activated_carbon",
        description="Highly microporous carbonaceous adsorbent with wide pore size distribution. Characterized by IUPAC Type I isotherm with rapid uptake at low relative pressure.",
        literature_bet_surface_area_m2_g=1150.0,
        monolayer_volume_cm3_g=264.0,
        c_constant=120.0,
        isotherm_type="Type I",
        sample_points=[
            AdsorptionDataPoint(relative_pressure=0.01, volume_adsorbed_cm3_g=145.0),
            AdsorptionDataPoint(relative_pressure=0.05, volume_adsorbed_cm3_g=210.0),
            AdsorptionDataPoint(relative_pressure=0.10, volume_adsorbed_cm3_g=245.0),
            AdsorptionDataPoint(relative_pressure=0.15, volume_adsorbed_cm3_g=268.0),
            AdsorptionDataPoint(relative_pressure=0.20, volume_adsorbed_cm3_g=285.0),
            AdsorptionDataPoint(relative_pressure=0.25, volume_adsorbed_cm3_g=298.0),
            AdsorptionDataPoint(relative_pressure=0.30, volume_adsorbed_cm3_g=310.0),
            AdsorptionDataPoint(relative_pressure=0.35, volume_adsorbed_cm3_g=320.0),
            AdsorptionDataPoint(relative_pressure=0.50, volume_adsorbed_cm3_g=345.0),
            AdsorptionDataPoint(relative_pressure=0.70, volume_adsorbed_cm3_g=370.0),
            AdsorptionDataPoint(relative_pressure=0.90, volume_adsorbed_cm3_g=415.0),
        ],
    ),
    "zeolite_zsm5": AdsorbentMaterial(
        id="zeolite_zsm5",
        name="Zeolite ZSM-5 (MFI Framework)",
        material_type="zeolite",
        description="Shape-selective crystalline aluminosilicate with 10-membered ring intersecting sinusoidal and straight channels (~0.55 nm). Steep Type I micropore filling.",
        literature_bet_surface_area_m2_g=425.0,
        monolayer_volume_cm3_g=97.5,
        c_constant=150.0,
        isotherm_type="Type I",
        sample_points=[
            AdsorptionDataPoint(relative_pressure=0.01, volume_adsorbed_cm3_g=75.0),
            AdsorptionDataPoint(relative_pressure=0.05, volume_adsorbed_cm3_g=92.0),
            AdsorptionDataPoint(relative_pressure=0.10, volume_adsorbed_cm3_g=102.0),
            AdsorptionDataPoint(relative_pressure=0.15, volume_adsorbed_cm3_g=108.0),
            AdsorptionDataPoint(relative_pressure=0.20, volume_adsorbed_cm3_g=112.0),
            AdsorptionDataPoint(relative_pressure=0.25, volume_adsorbed_cm3_g=115.0),
            AdsorptionDataPoint(relative_pressure=0.30, volume_adsorbed_cm3_g=118.0),
            AdsorptionDataPoint(relative_pressure=0.50, volume_adsorbed_cm3_g=126.0),
            AdsorptionDataPoint(relative_pressure=0.80, volume_adsorbed_cm3_g=138.0),
        ],
    ),
    "gamma_alumina": AdsorbentMaterial(
        id="gamma_alumina",
        name="Gamma-Alumina Catalyst Support (γ-Al2O3)",
        material_type="metal_oxide",
        description="High-temperature transition alumina with defective spinel lattice. Broad mesopores delivering moderate surface area and high mechanical endurance.",
        literature_bet_surface_area_m2_g=210.0,
        monolayer_volume_cm3_g=48.2,
        c_constant=65.0,
        isotherm_type="Type IV",
        sample_points=[
            AdsorptionDataPoint(relative_pressure=0.02, volume_adsorbed_cm3_g=18.0),
            AdsorptionDataPoint(relative_pressure=0.06, volume_adsorbed_cm3_g=32.0),
            AdsorptionDataPoint(relative_pressure=0.12, volume_adsorbed_cm3_g=45.0),
            AdsorptionDataPoint(relative_pressure=0.18, volume_adsorbed_cm3_g=54.0),
            AdsorptionDataPoint(relative_pressure=0.25, volume_adsorbed_cm3_g=62.0),
            AdsorptionDataPoint(relative_pressure=0.32, volume_adsorbed_cm3_g=71.0),
            AdsorptionDataPoint(relative_pressure=0.45, volume_adsorbed_cm3_g=88.0),
            AdsorptionDataPoint(relative_pressure=0.60, volume_adsorbed_cm3_g=110.0),
            AdsorptionDataPoint(relative_pressure=0.75, volume_adsorbed_cm3_g=135.0),
            AdsorptionDataPoint(relative_pressure=0.90, volume_adsorbed_cm3_g=170.0),
        ],
    ),
}


class SurfaceChemistryEngine:
    """Scientific calculation and regression engine for surface phenomena and catalysis."""

    @classmethod
    def get_materials(cls) -> List[MaterialSummary]:
        return [
            MaterialSummary(
                id=m.id,
                name=m.name,
                material_type=m.material_type,
                description=m.description,
                isotherm_type=m.isotherm_type,
                literature_bet_surface_area_m2_g=m.literature_bet_surface_area_m2_g,
            )
            for m in CURATED_MATERIALS.values()
        ]

    @classmethod
    def get_material(cls, material_id: str) -> Optional[AdsorbentMaterial]:
        return CURATED_MATERIALS.get(material_id)

    @classmethod
    def linear_regression(cls, x_vals: List[float], y_vals: List[float]) -> Tuple[float, float, float]:
        """Calculates slope, intercept, and R^2 for pairs (x, y)."""
        n = len(x_vals)
        if n < 2:
            return 0.0, 0.0, 0.0

        mean_x = sum(x_vals) / n
        mean_y = sum(y_vals) / n

        ss_xy = sum((x - mean_x) * (y - mean_y) for x, y in zip(x_vals, y_vals))
        ss_xx = sum((x - mean_x) ** 2 for x in x_vals)
        ss_yy = sum((y - mean_y) ** 2 for y in y_vals)

        if abs(ss_xx) < 1e-15:
            return 0.0, mean_y, 0.0

        slope = ss_xy / ss_xx
        intercept = mean_y - slope * mean_x
        r_squared = (ss_xy ** 2) / (ss_xx * ss_yy) if ss_yy > 1e-15 else 1.0

        return slope, intercept, max(0.0, min(1.0, r_squared))

    @classmethod
    def calculate_bet_surface_area(
        cls, request: BetCalculationRequest
    ) -> BetCalculationResponse:
        """Computes Brunauer-Emmett-Teller multi-point surface area, V_m, and C constant."""
        if request.material_id and request.material_id in CURATED_MATERIALS:
            mat = CURATED_MATERIALS[request.material_id]
            mat_name = mat.name
            iso_type = mat.isotherm_type
            raw_pts = mat.sample_points
        else:
            mat_name = "Custom Adsorption Sample"
            iso_type = "Unspecified"
            raw_pts = []
            for p in (request.sample_points or []):
                if isinstance(p, dict):
                    raw_pts.append(AdsorptionDataPoint(**p))
                elif isinstance(p, AdsorptionDataPoint):
                    raw_pts.append(p)

        # Standard IUPAC BET range: 0.05 <= P/P0 <= 0.35
        # Rouquerol Criterion for Type I microporous materials: 0.01 <= P/P0 <= 0.15
        min_p = 0.009 if iso_type == "Type I" else 0.049
        max_p = 0.151 if iso_type == "Type I" else 0.351

        bet_x: List[float] = []
        bet_y: List[float] = []
        plot_points: List[Dict[str, float]] = []

        for pt in raw_pts:
            x = pt.relative_pressure
            v = pt.volume_adsorbed_cm3_g
            if 0.001 < x < 0.999 and v > 0:
                # BET transform: y = x / [V * (1 - x)]
                y = x / (v * (1.0 - x))
                in_range = min_p <= x <= max_p
                if in_range:
                    bet_x.append(x)
                    bet_y.append(y)
                plot_points.append({
                    "relative_pressure": round(x, 4),
                    "volume_adsorbed": round(v, 2),
                    "bet_transform_y": round(y, 6),
                    "is_in_bet_range": in_range,
                })

        if len(bet_x) < 2:
            raise ValueError(f"Insufficient data points within the BET linear range {min_p:.2f} <= P/P0 <= {max_p:.2f}.")

        slope, intercept, r2 = cls.linear_regression(bet_x, bet_y)

        # Physical constants interpretation:
        # slope = (C - 1) / (Vm * C)
        # intercept = 1 / (Vm * C)
        # Vm = 1 / (slope + intercept)
        # C = 1 + slope / intercept
        denom = slope + intercept
        v_m = 1.0 / denom if denom > 1e-12 else 0.0
        c_param = (1.0 + slope / intercept) if abs(intercept) > 1e-15 else 1.0

        # Specific surface area: S_BET = (Vm * N_A * sigma) / (V_mol * m)
        # sigma in nm2 -> * 1e-18 m2
        sigma_m2 = request.adsorbate_cross_section_nm2 * 1e-18
        s_bet = (v_m * AVOGADRO_CONSTANT * sigma_m2) / (MOLAR_VOLUME_STP_CM3 * request.sample_mass_g)

        fit = BetLinearFit(
            slope=round(slope, 6),
            intercept=round(intercept, 6),
            r_squared=round(r2, 4),
            monolayer_capacity_vm=round(v_m, 2),
            c_parameter=round(c_param, 2),
            specific_surface_area_m2_g=round(s_bet, 2),
            is_c_positive=c_param > 0,
            is_valid_bet_range=len(bet_x) >= 3 and r2 >= 0.98,
        )

        summary = (
            f"Multi-point BET analysis of '{mat_name}' evaluated over {len(bet_x)} points in range 0.05-0.35 P/P0. "
            f"Monolayer capacity V_m = {fit.monolayer_capacity_vm} cm³(STP)/g, BET C = {fit.c_parameter:.1f}, "
            f"yielding a specific surface area S_BET = {fit.specific_surface_area_m2_g} m²/g (R² = {fit.r_squared:.4f})."
        )

        return BetCalculationResponse(
            material_name=mat_name,
            isotherm_type=iso_type,
            sample_mass_g=request.sample_mass_g,
            bet_fit=fit,
            linear_plot_points=plot_points,
            pedagogical_summary=summary,
        )

    @classmethod
    def compare_isotherms(
        cls, request: IsothermComparisonRequest
    ) -> IsothermComparisonResponse:
        """Fits Langmuir, Freundlich, and BET models to adsorption isotherm data and compares goodness of fit."""
        if request.material_id and request.material_id in CURATED_MATERIALS:
            mat = CURATED_MATERIALS[request.material_id]
            mat_name = mat.name
            raw_pts = mat.sample_points
        else:
            mat_name = "Custom Isotherm Dataset"
            raw_pts = []
            for p in (request.custom_points or []):
                if isinstance(p, dict):
                    raw_pts.append(AdsorptionDataPoint(**p))
                elif isinstance(p, AdsorptionDataPoint):
                    raw_pts.append(p)

        x_vals = [p.relative_pressure for p in raw_pts]
        v_vals = [p.volume_adsorbed_cm3_g for p in raw_pts]

        # 1. Langmuir Fit: (P/P0) / V = 1/(K * Vm) + (P/P0) / Vm
        lang_x = []
        lang_y = []
        for x, v in zip(x_vals, v_vals):
            if x > 0 and v > 0:
                lang_x.append(x)
                lang_y.append(x / v)
        l_slope, l_intercept, l_r2 = cls.linear_regression(lang_x, lang_y)
        v_m_lang = 1.0 / l_slope if l_slope > 1e-12 else 100.0
        k_lang = l_slope / l_intercept if l_intercept > 1e-12 else 10.0

        lang_pred = [
            {"relative_pressure": round(x, 3), "volume_pred": round(v_m_lang * k_lang * x / (1.0 + k_lang * x), 2)}
            for x in [0.02, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
        ]
        langmuir_model = IsothermFitModel(
            model_name="Langmuir",
            parameters={"V_m": round(v_m_lang, 2), "K_L": round(k_lang, 2)},
            r_squared=round(l_r2, 4),
            predicted_points=lang_pred,
            equation_display=f"V = ({v_m_lang:.1f} · {k_lang:.1f} · x) / (1 + {k_lang:.1f} · x)",
        )

        # 2. Freundlich Fit: ln(V) = ln(Kf) + (1/n) * ln(x)
        freu_x = []
        freu_y = []
        for x, v in zip(x_vals, v_vals):
            if x > 0 and v > 0:
                freu_x.append(math.log(x))
                freu_y.append(math.log(v))
        f_slope, f_intercept, f_r2 = cls.linear_regression(freu_x, freu_y)
        k_freu = math.exp(f_intercept) if f_intercept < 20 else 100.0
        inv_n = f_slope

        freu_pred = [
            {"relative_pressure": round(x, 3), "volume_pred": round(k_freu * (x ** inv_n), 2)}
            for x in [0.02, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
        ]
        freundlich_model = IsothermFitModel(
            model_name="Freundlich",
            parameters={"K_F": round(k_freu, 2), "1/n": round(inv_n, 4)},
            r_squared=round(f_r2, 4),
            predicted_points=freu_pred,
            equation_display=f"V = {k_freu:.1f} · x^{{{inv_n:.3f}}}",
        )

        # 3. BET Fit over standard range
        bet_x = []
        bet_y = []
        for x, v in zip(x_vals, v_vals):
            if 0.049 <= x <= 0.351 and v > 0:
                bet_x.append(x)
                bet_y.append(x / (v * (1.0 - x)))
        b_slope, b_intercept, b_r2 = cls.linear_regression(bet_x, bet_y)
        denom = b_slope + b_intercept
        v_m_bet = 1.0 / denom if denom > 1e-12 else 100.0
        c_bet = (1.0 + b_slope / b_intercept) if abs(b_intercept) > 1e-12 else 50.0

        bet_pred = []
        for x in [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35]:
            denom_curve = (1.0 - x) * (1.0 + (c_bet - 1.0) * x)
            pred_v = (v_m_bet * c_bet * x) / denom_curve if abs(denom_curve) > 1e-6 else 0.0
            bet_pred.append({"relative_pressure": round(x, 3), "volume_pred": round(pred_v, 2)})

        bet_model = IsothermFitModel(
            model_name="BET",
            parameters={"V_m": round(v_m_bet, 2), "C": round(c_bet, 2)},
            r_squared=round(b_r2, 4),
            predicted_points=bet_pred,
            equation_display=f"V = ({v_m_bet:.1f} · {c_bet:.1f} · x) / [(1 - x)(1 + {c_bet - 1:.1f} · x)]",
        )

        # Determine best fit model based on R^2
        r2_map = {"Langmuir": l_r2, "Freundlich": f_r2, "BET": b_r2}
        best_model = max(r2_map, key=r2_map.get)

        exp_points = [
            {"relative_pressure": round(p.relative_pressure, 4), "volume_adsorbed": round(p.volume_adsorbed_cm3_g, 2)}
            for p in raw_pts
        ]

        return IsothermComparisonResponse(
            material_name=mat_name,
            experimental_points=exp_points,
            langmuir_fit=langmuir_model,
            freundlich_fit=freundlich_model,
            bet_fit=bet_model,
            best_fitting_model=best_model,
        )

    @classmethod
    def simulate_catalysis_kinetics(
        cls, request: CatalysisSimulationRequest
    ) -> CatalysisSimulationResponse:
        """Simulates heterogeneous catalysis comparing Langmuir-Hinshelwood and Eley-Rideal mechanisms."""
        k = request.rate_constant_k
        ka = request.adsorption_constant_ka
        kb = request.adsorption_constant_kb
        pb = request.fixed_partial_pressure_b_kpa
        p_max = request.max_pressure_a_kpa

        dp = p_max / request.points_count
        points: List[CatalyticKineticsPoint] = []

        max_lh_rate = 0.0
        peak_pa = 0.0

        for i in range(request.points_count + 1):
            pa = i * dp
            denom = 1.0 + ka * pa + kb * pb

            theta_a = (ka * pa) / denom
            theta_b = (kb * pb) / denom
            theta_v = 1.0 / denom

            # Langmuir-Hinshelwood: r = k * theta_A * theta_B
            r_lh = k * theta_a * theta_b

            # Eley-Rideal: r = k * theta_A * P_B (gas B impacts adsorbed A)
            r_er = k * theta_a * pb

            if r_lh > max_lh_rate:
                max_lh_rate = r_lh
                peak_pa = pa

            points.append(
                CatalyticKineticsPoint(
                    partial_pressure_a_kpa=round(pa, 2),
                    rate_langmuir_hinshelwood=round(r_lh, 6),
                    rate_eley_rideal=round(r_er, 6),
                    coverage_theta_a=round(theta_a, 4),
                    coverage_theta_b=round(theta_b, 4),
                    fraction_vacant_theta_v=round(theta_v, 4),
                )
            )

        # Theoretical LH peak pressure: P_A_peak = (1 + K_B * P_B) / K_A
        theo_peak = (1.0 + kb * pb) / ka if ka > 0 else 0.0

        summary = (
            f"Heterogeneous catalytic simulation for fixed P_B = {pb} kPa. "
            f"Langmuir-Hinshelwood dual-site mechanism exhibits a characteristic volcanic peak at "
            f"P_A ≈ {theo_peak:.1f} kPa (maximum rate = {max_lh_rate:.4e}) due to competitive self-poisoning. "
            f"Eley-Rideal single-site impact mechanism approaches asymptotic saturation without rate decline."
        )

        return CatalysisSimulationResponse(
            kinetics_curve=points,
            lh_peak_pressure_a_kpa=round(theo_peak, 2),
            lh_maximum_rate=round(max_lh_rate, 6),
            summary=summary,
        )
