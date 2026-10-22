"""
Chemical Reaction Kinetics and Dynamic Transport Scientific Service.
Calculates integrated rate laws, Arrhenius activation energies, and Michaelis-Menten catalysis.
"""
import math
from typing import Dict, List, Optional, Any, Tuple
from services.chemistry.app.models.kinetics import (
    KineticsTimePoint,
    RateLawSimulationResult,
    ArrheniusResult,
    MichaelisMentenPoint,
    MichaelisMentenResult,
    ConsecutiveKineticsPoint,
    ConsecutiveKineticsResult,
)


class KineticsService:
    """Scientific calculation engine for reaction dynamics."""

    R_GAS_CONSTANT = 8.314462618  # J / (mol * K)

    PRESET_REACTIONS: List[Dict[str, Any]] = [
        {
            "id": "h2o2_decomp",
            "name": "Hydrogen Peroxide Decomposition (2H2O2 -> 2H2O + O2)",
            "order": 1,
            "typical_k": 0.05,
            "k_units": "s⁻¹",
            "ea_kj_mol": 75.0,
            "description": "Catalyzed or uncatalyzed pseudo-first-order disproportionation.",
        },
        {
            "id": "ester_saponification",
            "name": "Ester Alkaline Saponification (CH3COOC2H5 + OH- -> CH3COO- + C2H5OH)",
            "order": 2,
            "typical_k": 0.11,
            "k_units": "M⁻¹ s⁻¹",
            "ea_kj_mol": 48.2,
            "description": "Classic bimolecular nucleophilic acyl substitution following second-order kinetics.",
        },
        {
            "id": "surface_nh3_decomp",
            "name": "Ammonia Surface Decomposition on Tungsten (2NH3 -> N2 + 3H2)",
            "order": 0,
            "typical_k": 0.002,
            "k_units": "M s⁻¹",
            "ea_kj_mol": 163.0,
            "description": "Heterogeneous catalysis with saturated active sites rendering rate independent of ammonia pressure.",
        },
        {
            "id": "catalase_enzyme",
            "name": "Catalase Peroxidase System (Enzyme Catalysis)",
            "is_enzyme": True,
            "v_max": 250.0,
            "k_m": 25.0,
            "description": "Diffusion-limited biological catalyst with extreme turnover number (kcat ~ 4x10^7 s⁻¹).",
        },
    ]

    @classmethod
    def simulate_rate_law(
        cls,
        reaction_name: str,
        order: int,
        initial_conc_m: float,
        rate_constant_k: float,
        total_time_seconds: float = 100.0,
        time_steps: int = 50,
    ) -> RateLawSimulationResult:
        """Simulate time-dependent reactant concentration and reaction velocity across reaction orders."""
        if initial_conc_m <= 0:
            raise ValueError("Initial concentration must be strictly positive")
        if rate_constant_k <= 0:
            raise ValueError("Rate constant k must be strictly positive")
        if order not in [0, 1, 2]:
            raise ValueError("Supported reaction orders are 0, 1, or 2")

        dt = total_time_seconds / max(1, time_steps)
        time_series: List[KineticsTimePoint] = []

        if order == 0:
            k_units = "M·s⁻¹"
            diff_eq = "-d[A]/dt = k"
            int_eq = "[A]t = [A]0 - k·t"
            half_life = initial_conc_m / (2.0 * rate_constant_k)
            t_completion = initial_conc_m / rate_constant_k
            notes = f"Zero-order: constant rate {rate_constant_k} M/s. Half-life t1/2 = {half_life:.2f} s depends on [A]0."

            for i in range(time_steps + 1):
                t = i * dt
                conc = max(0.0, initial_conc_m - rate_constant_k * t)
                rate = rate_constant_k if conc > 0 else 0.0
                ln_c = math.log(conc) if conc > 0 else None
                inv_c = (1.0 / conc) if conc > 0 else None
                time_series.append(
                    KineticsTimePoint(
                        time_seconds=round(t, 2),
                        concentration_m=round(conc, 5),
                        rate_m_s=round(rate, 6),
                        ln_conc=round(ln_c, 4) if ln_c is not None else None,
                        inv_conc=round(inv_c, 3) if inv_c is not None else None,
                    )
                )

        elif order == 1:
            k_units = "s⁻¹"
            diff_eq = "-d[A]/dt = k·[A]"
            int_eq = "[A]t = [A]0 · exp(-k·t)"
            half_life = math.log(2.0) / rate_constant_k
            notes = f"First-order: exponential decay. Constant half-life t1/2 = {half_life:.2f} s independent of [A]0."

            for i in range(time_steps + 1):
                t = i * dt
                conc = initial_conc_m * math.exp(-rate_constant_k * t)
                rate = rate_constant_k * conc
                ln_c = math.log(conc) if conc > 0 else None
                inv_c = 1.0 / conc if conc > 0 else None
                time_series.append(
                    KineticsTimePoint(
                        time_seconds=round(t, 2),
                        concentration_m=round(conc, 5),
                        rate_m_s=round(rate, 6),
                        ln_conc=round(ln_c, 4) if ln_c is not None else None,
                        inv_conc=round(inv_c, 3) if inv_c is not None else None,
                    )
                )

        else:  # order == 2
            k_units = "M⁻¹·s⁻¹"
            diff_eq = "-d[A]/dt = k·[A]²"
            int_eq = "1/[A]t = 1/[A]0 + k·t"
            half_life = 1.0 / (rate_constant_k * initial_conc_m)
            notes = f"Second-order: hyperbolic decay. Half-life t1/2 = {half_life:.2f} s doubles with each successive half-life."

            for i in range(time_steps + 1):
                t = i * dt
                conc = initial_conc_m / (1.0 + rate_constant_k * initial_conc_m * t)
                rate = rate_constant_k * math.pow(conc, 2)
                ln_c = math.log(conc) if conc > 0 else None
                inv_c = 1.0 / conc
                time_series.append(
                    KineticsTimePoint(
                        time_seconds=round(t, 2),
                        concentration_m=round(conc, 5),
                        rate_m_s=round(rate, 6),
                        ln_conc=round(ln_c, 4) if ln_c is not None else None,
                        inv_conc=round(inv_c, 3) if inv_c is not None else None,
                    )
                )

        return RateLawSimulationResult(
            reaction_name=reaction_name,
            order=order,
            initial_conc_m=initial_conc_m,
            rate_constant_k=rate_constant_k,
            k_units=k_units,
            half_life_seconds=round(half_life, 3),
            differential_rate_equation=diff_eq,
            integrated_rate_equation=int_eq,
            time_series=time_series,
            notes=notes,
        )

    @classmethod
    def solve_arrhenius(
        cls,
        t1_c: float,
        k1: float,
        t2_c: float,
        k2: float,
        target_t_c: Optional[float] = None,
    ) -> ArrheniusResult:
        """Calculate activation energy Ea and pre-exponential factor A from two experimental rate constants."""
        t1_k = t1_c + 273.15
        t2_k = t2_c + 273.15

        if abs(t1_k - t2_k) < 1e-4:
            raise ValueError("T1 and T2 must be distinct temperatures")
        if k1 <= 0 or k2 <= 0:
            raise ValueError("Rate constants k1 and k2 must be positive")

        # ln(k2 / k1) = -(Ea / R) * (1/T2 - 1/T1)
        # Ea = -R * ln(k2/k1) / (1/T2 - 1/T1)
        delta_inv_t = (1.0 / t2_k) - (1.0 / t1_k)
        ea_j = -cls.R_GAS_CONSTANT * math.log(k2 / k1) / delta_inv_t
        ea_kj = ea_j / 1000.0

        # A = k1 * exp(Ea / (R * T1))
        a_factor = k1 * math.exp(ea_j / (cls.R_GAS_CONSTANT * t1_k))

        # Predict target k if requested
        pred_k = None
        if target_t_c is not None:
            target_k = target_t_c + 273.15
            pred_k = a_factor * math.exp(-ea_j / (cls.R_GAS_CONSTANT * target_k))

        equation = f"k(T) = {a_factor:.2e} × exp(-{ea_kj:.1f} kJ/mol / RT)"

        # Generate temperature response curve from -10 C to 110 C
        temp_curve = []
        for tc in range(-10, 115, 10):
            tk = tc + 273.15
            kt = a_factor * math.exp(-ea_j / (cls.R_GAS_CONSTANT * tk))
            temp_curve.append({
                "temp_c": float(tc),
                "temp_k": round(tk, 2),
                "rate_constant_k": float(f"{kt:.4e}"),
            })

        return ArrheniusResult(
            activation_energy_j_mol=round(ea_j, 2),
            activation_energy_kj_mol=round(ea_kj, 2),
            pre_exponential_factor_a=float(f"{a_factor:.4e}"),
            temperature_k=round(target_t_c + 273.15, 2) if target_t_c is not None else round(t1_k, 2),
            rate_constant_k=round(pred_k, 6) if pred_k is not None else k1,
            equation=equation,
            temp_curve=temp_curve,
        )

    @classmethod
    def simulate_michaelis_menten(
        cls,
        enzyme_name: str,
        v_max: float,
        k_m: float,
        inhibition_type: Optional[str] = None,
        inhibitor_conc_um: float = 0.0,
        k_i_um: float = 1.0,
        max_substrate_um: float = 100.0,
        steps: int = 30,
    ) -> MichaelisMentenResult:
        """Simulate Michaelis-Menten enzyme kinetics with competitive, uncompetitive, or noncompetitive inhibition."""
        if v_max <= 0 or k_m <= 0:
            raise ValueError("Vmax and Km must be strictly positive")

        alpha = 1.0
        alpha_prime = 1.0
        if inhibition_type and inhibitor_conc_um > 0 and k_i_um > 0:
            ratio = inhibitor_conc_um / k_i_um
            if inhibition_type == "competitive":
                alpha = 1.0 + ratio
                alpha_prime = 1.0
            elif inhibition_type == "uncompetitive":
                alpha = 1.0
                alpha_prime = 1.0 + ratio
            elif inhibition_type == "noncompetitive":
                alpha = 1.0 + ratio
                alpha_prime = 1.0 + ratio

        apparent_v_max = v_max / alpha_prime
        apparent_k_m = (k_m * alpha) / alpha_prime

        # Lineweaver-Burk: 1/v0 = (Km'/Vmax')*(1/[S]) + (1/Vmax')
        lb_slope = apparent_k_m / apparent_v_max
        lb_intercept = 1.0 / apparent_v_max

        saturation_points: List[MichaelisMentenPoint] = []
        d_s = max_substrate_um / max(1, steps)
        for i in range(1, steps + 1):
            s = i * d_s
            # v0 = (Vmax' * [S]) / (Km' + [S])
            v = (apparent_v_max * s) / (apparent_k_m + s)
            saturation_points.append(
                MichaelisMentenPoint(
                    substrate_conc_um=round(s, 2),
                    velocity_um_s=round(v, 4),
                    inv_substrate=round(1.0 / s, 5),
                    inv_velocity=round(1.0 / v, 5),
                )
            )

        return MichaelisMentenResult(
            enzyme_name=enzyme_name,
            v_max=round(v_max, 3),
            k_m=round(k_m, 3),
            inhibition_type=inhibition_type,
            inhibitor_conc_um=inhibitor_conc_um,
            k_i_um=k_i_um,
            apparent_v_max=round(apparent_v_max, 4),
            apparent_k_m=round(apparent_k_m, 4),
            lineweaver_burk_slope=round(lb_slope, 5),
            lineweaver_burk_intercept=round(lb_intercept, 5),
            saturation_points=saturation_points,
        )

    @classmethod
    def simulate_consecutive_reactions(
        cls,
        initial_a_m: float,
        k1: float,
        k2: float,
        total_time_seconds: float = 60.0,
        steps: int = 60,
    ) -> ConsecutiveKineticsResult:
        """Simulate sequential reaction A -> B -> C with intermediate accumulation and depletion."""
        if initial_a_m <= 0 or k1 <= 0 or k2 <= 0:
            raise ValueError("Concentration and rate constants must be strictly positive")

        dt = total_time_seconds / max(1, steps)
        points: List[ConsecutiveKineticsPoint] = []

        if abs(k1 - k2) > 1e-6:
            t_max = math.log(k1 / k2) / (k1 - k2)
            b_max = initial_a_m * math.pow(k2 / k1, k2 / (k1 - k2))
            for i in range(steps + 1):
                t = i * dt
                conc_a = initial_a_m * math.exp(-k1 * t)
                conc_b = initial_a_m * (k1 / (k2 - k1)) * (math.exp(-k1 * t) - math.exp(-k2 * t))
                conc_c = initial_a_m * (1.0 - (k2 * math.exp(-k1 * t) - k1 * math.exp(-k2 * t)) / (k2 - k1))
                points.append(
                    ConsecutiveKineticsPoint(
                        time_seconds=round(t, 2),
                        conc_a=round(max(0.0, conc_a), 5),
                        conc_b=round(max(0.0, conc_b), 5),
                        conc_c=round(max(0.0, conc_c), 5),
                    )
                )
        else:  # k1 == k2
            t_max = 1.0 / k1
            b_max = initial_a_m / math.e
            for i in range(steps + 1):
                t = i * dt
                conc_a = initial_a_m * math.exp(-k1 * t)
                conc_b = initial_a_m * k1 * t * math.exp(-k1 * t)
                conc_c = initial_a_m * (1.0 - math.exp(-k1 * t) - k1 * t * math.exp(-k1 * t))
                points.append(
                    ConsecutiveKineticsPoint(
                        time_seconds=round(t, 2),
                        conc_a=round(max(0.0, conc_a), 5),
                        conc_b=round(max(0.0, conc_b), 5),
                        conc_c=round(max(0.0, conc_c), 5),
                    )
                )

        desc = (
            f"Consecutive reaction A -> B -> C with rate constants k1 = {k1:.3f} s⁻¹, k2 = {k2:.3f} s⁻¹. "
            f"Reactive intermediate [B] reaches maximum {b_max:.4f} M at t = {t_max:.2f} s."
        )

        return ConsecutiveKineticsResult(
            initial_a_m=initial_a_m,
            k1=k1,
            k2=k2,
            t_max_intermediate_seconds=round(t_max, 3),
            max_intermediate_conc_m=round(b_max, 5),
            time_series=points,
            description=desc,
        )
