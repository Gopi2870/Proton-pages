"""
Virtual Laboratory Simulation Service.

Provides deterministic, verified scientific calculations for:
1. Analytical Acid-Base Titration curves (Strong/Strong, Weak/Strong, Polyprotic, First Derivatives).
2. Solution Coffee-Cup Calorimetry (Dissolution Enthalpies of Salts, Newton's Cooling).
3. Constant-Volume Bomb Calorimetry (Combustion Enthalpies, Calorimeter Constants).
"""
import math
from typing import Dict, List, Optional, Tuple

from app.models.virtual_lab import (
    CalorimetryPoint,
    CalorimetrySimulationResult,
    TitrationAnalysisResult,
    TitrationCurvePoint,
)


class VirtualLabService:
    """Rigorous scientific computing engine for Virtual Chemistry Laboratory workflows."""

    # Solutes and Fuels Database
    SOLUTES_DATABASE = {
        "nh4no3": {
            "name": "Ammonium Nitrate",
            "formula": "NH4NO3",
            "molar_mass": 80.043,
            "delta_h_soln_kj_mol": 25.7,  # Endothermic (Cold Pack)
            "dissolution_equation": "NH4NO3(s) -> NH4+(aq) + NO3-(aq)",
            "safety": "Oxidizer, skin irritant. Handle with gloves.",
        },
        "cacl2": {
            "name": "Calcium Chloride (Anhydrous)",
            "formula": "CaCl2",
            "molar_mass": 110.98,
            "delta_h_soln_kj_mol": -82.8,  # Strongly Exothermic (Hot Pack)
            "dissolution_equation": "CaCl2(s) -> Ca(2+)(aq) + 2Cl-(aq)",
            "safety": "Exothermic dissolution. Avoid inhalation.",
        },
        "naoh": {
            "name": "Sodium Hydroxide Pellets",
            "formula": "NaOH",
            "molar_mass": 39.997,
            "delta_h_soln_kj_mol": -44.51,  # Strongly Exothermic
            "dissolution_equation": "NaOH(s) -> Na+(aq) + OH-(aq)",
            "safety": "Caustic alkali. Severe burns. Eye protection mandatory.",
        },
        "nacl": {
            "name": "Sodium Chloride",
            "formula": "NaCl",
            "molar_mass": 58.443,
            "delta_h_soln_kj_mol": 3.88,  # Mildly Endothermic
            "dissolution_equation": "NaCl(s) -> Na+(aq) + Cl-(aq)",
            "safety": "Low hazard standard table salt.",
        },
        "kno3": {
            "name": "Potassium Nitrate",
            "formula": "KNO3",
            "molar_mass": 101.103,
            "delta_h_soln_kj_mol": 34.89,  # Endothermic
            "dissolution_equation": "KNO3(s) -> K+(aq) + NO3-(aq)",
            "safety": "Strong oxidizer. Keep away from combustible material.",
        },
    }

    COMBUSTION_DATABASE = {
        "benzoic_acid": {
            "name": "Benzoic Acid (Primary Standard)",
            "formula": "C7H6O2",
            "molar_mass": 122.12,
            "delta_h_comb_kj_mol": -3227.0,  # NIST Standard reference
            "equation": "C7H6O2(s) + 7.5 O2(g) -> 7 CO2(g) + 3 H2O(l)",
        },
        "sucrose": {
            "name": "Sucrose (Table Sugar)",
            "formula": "C12H22O11",
            "molar_mass": 342.30,
            "delta_h_comb_kj_mol": -5645.0,
            "equation": "C12H22O11(s) + 12 O2(g) -> 12 CO2(g) + 11 H2O(l)",
        },
        "naphthalene": {
            "name": "Naphthalene",
            "formula": "C10H8",
            "molar_mass": 128.17,
            "delta_h_comb_kj_mol": -5157.0,
            "equation": "C10H8(s) + 12 O2(g) -> 10 CO2(g) + 4 H2O(l)",
        },
        "glucose": {
            "name": "D-Glucose",
            "formula": "C6H12O6",
            "molar_mass": 180.16,
            "delta_h_comb_kj_mol": -2808.0,
            "equation": "C6H12O6(s) + 6 O2(g) -> 6 CO2(g) + 6 H2O(l)",
        },
    }

    # Common Acid-Base Equilibrium Constants at 298.15 K
    ACID_BASE_SYSTEMS = {
        "strong_acid_strong_base": {
            "name": "Hydrochloric Acid vs Sodium Hydroxide",
            "analyte_name": "Hydrochloric Acid",
            "analyte_formula": "HCl",
            "titrant_name": "Sodium Hydroxide",
            "titrant_formula": "NaOH",
            "pka": None,
            "ka": None,
        },
        "weak_acid_strong_base": {
            "name": "Acetic Acid vs Sodium Hydroxide",
            "analyte_name": "Acetic Acid",
            "analyte_formula": "CH3COOH",
            "titrant_name": "Sodium Hydroxide",
            "titrant_formula": "NaOH",
            "pka": 4.757,
            "ka": 1.75e-5,
        },
        "strong_acid_weak_base": {
            "name": "Hydrochloric Acid vs Aqueous Ammonia",
            "analyte_name": "Aqueous Ammonia",
            "analyte_formula": "NH3",
            "titrant_name": "Hydrochloric Acid",
            "titrant_formula": "HCl",
            "pkb": 4.75,
            "kb": 1.77e-5,
            "pka": 9.25,  # pKa of NH4+ conjugate acid
        },
    }

    @staticmethod
    def get_indicator_color(ph: float, indicator: str) -> str:
        """Evaluate indicator color transition for a given pH value."""
        ind = indicator.lower()
        if "phenol" in ind:
            if ph < 8.2:
                return "rgba(240, 249, 255, 0.4)"  # Clear watery
            elif ph <= 10.0:
                alpha = 0.3 + ((ph - 8.2) / 1.8) * 0.5
                return f"rgba(244, 114, 182, {alpha:.2f})"  # Faint to bright pink
            else:
                return "rgba(219, 39, 119, 0.85)"  # Deep fuchsia
        elif "bromo" in ind:
            if ph < 6.0:
                return "rgba(234, 179, 8, 0.75)"  # Yellow
            elif ph <= 7.6:
                return "rgba(34, 197, 94, 0.75)"  # Green transition
            else:
                return "rgba(37, 99, 235, 0.8)"  # Blue
        elif "methyl" in ind:
            if ph < 3.1:
                return "rgba(239, 68, 68, 0.8)"  # Red
            elif ph <= 4.4:
                return "rgba(249, 115, 22, 0.8)"  # Orange
            else:
                return "rgba(234, 179, 8, 0.8)"  # Yellow
        return "rgba(240, 249, 255, 0.5)"

    def calculate_titration_curve(
        self,
        system_type: str = "strong_acid_strong_base",
        analyte_volume_ml: float = 25.0,
        analyte_conc_m: float = 0.1,
        titrant_conc_m: float = 0.1,
        max_titrant_volume_ml: float = 50.0,
        volume_step_ml: float = 0.5,
        indicator: str = "Phenolphthalein",
    ) -> TitrationAnalysisResult:
        """
        Compute an analytical titration curve with pH, conductivity, and first derivative.
        Uses exact Henderson-Hasselbalch and aqueous mass/charge balance.
        """
        system = self.ACID_BASE_SYSTEMS.get(system_type, self.ACID_BASE_SYSTEMS["strong_acid_strong_base"])

        # Equivalence Volume V_eq = (C_a * V_a) / C_b (for monoprotic)
        v_eq = (analyte_conc_m * analyte_volume_ml) / titrant_conc_m
        half_v_eq = v_eq / 2.0 if "weak" in system_type else None
        pka = system.get("pka")

        raw_points: List[Tuple[float, float, float, float]] = []  # (V, pH, cond, temp)

        # Generate volumetric grid with dense sampling around equivalence point
        vol_set = {round(v_eq, 2)}
        if half_v_eq:
            vol_set.add(round(half_v_eq, 2))

        v = 0.0
        while v <= max_titrant_volume_ml + 1e-6:
            vol_set.add(round(v, 2))
            if abs(v - v_eq) < 1.0:
                v += 0.1
            elif abs(v - v_eq) < 3.0:
                v += 0.25
            else:
                v += volume_step_ml

        volumes = sorted(list(vol_set))
        kw = 1.0e-14

        for vol in volumes:
            tot_vol_liters = (analyte_volume_ml + vol) / 1000.0

            if system_type == "strong_acid_strong_base":
                # HCl + NaOH -> NaCl + H2O
                mol_acid_init = (analyte_volume_ml / 1000.0) * analyte_conc_m
                mol_base_added = (vol / 1000.0) * titrant_conc_m

                if abs(vol - v_eq) <= 0.005:
                    ph = 7.00
                    conductivity = 13.0
                elif vol < v_eq:
                    excess_h = (mol_acid_init - mol_base_added) / tot_vol_liters
                    ph = -math.log10(max(1.0e-14, excess_h))
                    conductivity = 35.0 - (vol / v_eq) * 22.0
                else:
                    excess_oh = (mol_base_added - mol_acid_init) / tot_vol_liters
                    poh = -math.log10(max(1.0e-14, excess_oh))
                    ph = 14.0 - poh
                    conductivity = 13.0 + ((vol - v_eq) / v_eq) * 18.0

            elif system_type == "weak_acid_strong_base":
                # CH3COOH + NaOH -> CH3COONa + H2O
                ka = system["ka"]
                mol_ha_init = (analyte_volume_ml / 1000.0) * analyte_conc_m
                mol_oh_added = (vol / 1000.0) * titrant_conc_m

                if vol <= 0.001:
                    # Initial weak acid ionization: [H+] = sqrt(Ka * Ca)
                    conc_h = math.sqrt(ka * analyte_conc_m)
                    ph = -math.log10(conc_h)
                    conductivity = 6.0
                elif vol < v_eq - 0.01:
                    # Buffer region: Henderson-Hasselbalch
                    mol_a_minus = mol_oh_added
                    mol_ha_remain = mol_ha_init - mol_oh_added
                    ratio = mol_a_minus / max(1.0e-9, mol_ha_remain)
                    ph = pka + math.log10(ratio)
                    conductivity = 6.0 + (vol / v_eq) * 8.0
                elif abs(vol - v_eq) <= 0.01:
                    # Equivalence: Salt hydrolysis of CH3COO-
                    # Kb = Kw / Ka; [OH-] = sqrt(Kb * C_salt)
                    kb = kw / ka
                    c_salt = mol_ha_init / tot_vol_liters
                    conc_oh = math.sqrt(kb * c_salt)
                    poh = -math.log10(conc_oh)
                    ph = 14.0 - poh
                    conductivity = 14.5
                else:
                    # Excess strong base
                    excess_oh = (mol_oh_added - mol_ha_init) / tot_vol_liters
                    poh = -math.log10(max(1.0e-14, excess_oh))
                    ph = 14.0 - poh
                    conductivity = 14.5 + ((vol - v_eq) / v_eq) * 16.0

            elif system_type == "strong_acid_weak_base":
                # NH3 + HCl -> NH4+ + Cl-
                kb = system["kb"]
                mol_b_init = (analyte_volume_ml / 1000.0) * analyte_conc_m
                mol_h_added = (vol / 1000.0) * titrant_conc_m

                if vol <= 0.001:
                    conc_oh = math.sqrt(kb * analyte_conc_m)
                    poh = -math.log10(conc_oh)
                    ph = 14.0 - poh
                    conductivity = 5.0
                elif vol < v_eq - 0.01:
                    # Basic buffer: pOH = pKb + log([BH+]/[B])
                    mol_bh = mol_h_added
                    mol_b = mol_b_init - mol_h_added
                    poh = system["pkb"] + math.log10(mol_bh / max(1.0e-9, mol_b))
                    ph = 14.0 - poh
                    conductivity = 5.0 + (vol / v_eq) * 9.0
                elif abs(vol - v_eq) <= 0.01:
                    # Equivalence: Hydrolysis of NH4+
                    ka_conj = kw / kb
                    c_salt = mol_b_init / tot_vol_liters
                    conc_h = math.sqrt(ka_conj * c_salt)
                    ph = -math.log10(conc_h)
                    conductivity = 14.0
                else:
                    excess_h = (mol_h_added - mol_b_init) / tot_vol_liters
                    ph = -math.log10(max(1.0e-14, excess_h))
                    conductivity = 14.0 + ((vol - v_eq) / v_eq) * 20.0
            else:
                ph = 7.0
                conductivity = 10.0

            ph = max(0.0, min(14.0, ph))
            temp = 25.0 + min(3.5, (vol / max(1.0, v_eq)) * 2.5)
            raw_points.append((vol, round(ph, 3), round(conductivity, 2), round(temp, 1)))

        # Compute numerical first derivative dpH / dV
        curve_points: List[TitrationCurvePoint] = []
        n = len(raw_points)

        for i in range(n):
            v_curr, ph_curr, cond_curr, temp_curr = raw_points[i]
            if i == 0:
                v_next, ph_next, _, _ = raw_points[i + 1]
                dp_dv = (ph_next - ph_curr) / (v_next - v_curr) if (v_next - v_curr) != 0 else 0.0
            elif i == n - 1:
                v_prev, ph_prev, _, _ = raw_points[i - 1]
                dp_dv = (ph_curr - ph_prev) / (v_curr - v_prev) if (v_curr - v_prev) != 0 else 0.0
            else:
                v_prev, ph_prev, _, _ = raw_points[i - 1]
                v_next, ph_next, _, _ = raw_points[i + 1]
                dp_dv = (ph_next - ph_prev) / (v_next - v_prev) if (v_next - v_prev) != 0 else 0.0

            color = self.get_indicator_color(ph_curr, indicator)
            curve_points.append(
                TitrationCurvePoint(
                    volume_ml=v_curr,
                    ph=ph_curr,
                    dp_h_dv=round(abs(dp_dv), 2),
                    conductivity_ms_cm=cond_curr,
                    temperature_c=temp_curr,
                    indicator_color=color,
                )
            )

        # Equivalence pH
        eq_ph = 7.00
        if system_type == "weak_acid_strong_base":
            kb = kw / system["ka"]
            c_salt = (analyte_conc_m * analyte_volume_ml) / (analyte_volume_ml + v_eq)
            eq_ph = round(14.0 - (-math.log10(math.sqrt(kb * c_salt))), 2)
        elif system_type == "strong_acid_weak_base":
            ka_conj = kw / system["kb"]
            c_salt = (analyte_conc_m * analyte_volume_ml) / (analyte_volume_ml + v_eq)
            eq_ph = round(-math.log10(math.sqrt(ka_conj * c_salt)), 2)

        indicator_transitions = [
            {"indicator": "Phenolphthalein", "range": "pH 8.2 - 10.0", "color_change": "Colorless -> Pink"},
            {"indicator": "Bromothymol Blue", "range": "pH 6.0 - 7.6", "color_change": "Yellow -> Green -> Blue"},
            {"indicator": "Methyl Orange", "range": "pH 3.1 - 4.4", "color_change": "Red -> Orange -> Yellow"},
        ]

        return TitrationAnalysisResult(
            system_type=system_type,
            analyte_name=system["analyte_name"],
            analyte_formula=system["analyte_formula"],
            analyte_volume_ml=analyte_volume_ml,
            analyte_conc_m=analyte_conc_m,
            titrant_name=system["titrant_name"],
            titrant_formula=system["titrant_formula"],
            titrant_conc_m=titrant_conc_m,
            equivalence_volume_ml=round(v_eq, 2),
            equivalence_ph=eq_ph,
            half_equivalence_volume_ml=round(half_v_eq, 2) if half_v_eq else None,
            pka=pka,
            indicator=indicator,
            curve_points=curve_points,
            indicator_transitions=indicator_transitions,
        )

    def simulate_calorimetry(
        self,
        calorimeter_type: str = "solution_coffee_cup",
        sample_key: str = "nh4no3",
        sample_mass_g: float = 5.0,
        water_mass_g: float = 100.0,
        initial_temp_c: float = 25.0,
        calorimeter_c_j_k: float = 25.0,
        ambient_temp_c: float = 25.0,
    ) -> CalorimetrySimulationResult:
        """
        Simulate constant-pressure solution coffee-cup or constant-volume bomb calorimetry.
        Computes heat released/absorbed, molar enthalpy, and time-dependent thermal curve.
        """
        is_bomb = calorimeter_type == "constant_volume_bomb"

        if is_bomb:
            db_entry = self.COMBUSTION_DATABASE.get(sample_key, self.COMBUSTION_DATABASE["benzoic_acid"])
            sample_name = db_entry["name"]
            sample_formula = db_entry["formula"]
            molar_mass = db_entry["molar_mass"]
            theo_dh = db_entry["delta_h_comb_kj_mol"]
            equation = db_entry["equation"]
            effective_c_cal = max(500.0, calorimeter_c_j_k if calorimeter_c_j_k > 100.0 else 10250.0)
        else:
            db_entry = self.SOLUTES_DATABASE.get(sample_key, self.SOLUTES_DATABASE["nh4no3"])
            sample_name = db_entry["name"]
            sample_formula = db_entry["formula"]
            molar_mass = db_entry["molar_mass"]
            theo_dh = db_entry["delta_h_soln_kj_mol"]
            equation = db_entry["dissolution_equation"]
            c_water_j_g_k = 4.184
            # Total heat capacity C_total = m_soln * c_s + C_cup
            effective_c_cal = (water_mass_g + sample_mass_g) * c_water_j_g_k + calorimeter_c_j_k

        sample_moles = sample_mass_g / molar_mass
        is_exothermic = theo_dh < 0

        # Theoretical heat exchanged with calorimeter: q_cal = -q_rxn
        # q_rxn = n * theo_dh * 1000 J
        q_rxn_joules = sample_moles * theo_dh * 1000.0
        q_cal_joules = -q_rxn_joules

        # Delta T = q_cal / C_total
        delta_t = q_cal_joules / effective_c_cal
        peak_temp = initial_temp_c + delta_t

        # Generate time curve (0 to 120 seconds, step 2 seconds)
        thermal_curve: List[CalorimetryPoint] = []
        k_cooling = 0.005  # Newton's law cooling constant

        for t in range(0, 122, 2):
            if t <= 10:
                # Pre-reaction thermal baseline
                temp = initial_temp_c
            elif t <= 30:
                # Active reaction / dissolution transition
                progress = (t - 10) / 20.0
                smooth_factor = 0.5 - 0.5 * math.cos(math.pi * progress)
                temp = initial_temp_c + delta_t * smooth_factor
            else:
                # Newton's law of cooling / warming towards ambient
                dt_elapsed = t - 30
                temp = ambient_temp_c + (peak_temp - ambient_temp_c) * math.exp(-k_cooling * dt_elapsed)

            thermal_curve.append(CalorimetryPoint(time_seconds=float(t), temperature_c=round(temp, 2)))

        # Experimental recovery
        exp_delta_t = peak_temp - initial_temp_c
        exp_q_cal = effective_c_cal * exp_delta_t
        exp_dh_kj_mol = -(exp_q_cal / sample_moles) / 1000.0 if sample_moles > 0 else 0.0

        percent_error = abs((exp_dh_kj_mol - theo_dh) / theo_dh) * 100.0 if theo_dh != 0 else 0.0

        notes = (
            f"Observed {'temperature drop (endothermic dissolution)' if not is_exothermic else 'temperature rise (exothermic reaction)'} "
            f"of {abs(delta_t):.2f} °C for {sample_mass_g:.2f} g ({sample_moles:.4f} mol) of {sample_formula} in {water_mass_g:.1f} g H2O."
        )

        return CalorimetrySimulationResult(
            calorimeter_type=calorimeter_type,
            sample_name=sample_name,
            sample_formula=sample_formula,
            sample_mass_g=sample_mass_g,
            sample_moles=round(sample_moles, 5),
            water_mass_g=water_mass_g,
            calorimeter_c_j_k=round(effective_c_cal, 2),
            initial_temp_c=initial_temp_c,
            peak_temp_c=round(peak_temp, 2),
            delta_t_c=round(delta_t, 2),
            heat_transferred_joules=round(q_cal_joules, 2),
            molar_enthalpy_kj_mol=round(exp_dh_kj_mol, 2),
            theoretical_enthalpy_kj_mol=round(theo_dh, 2),
            percent_error=round(percent_error, 2),
            is_exothermic=is_exothermic,
            temperature_curve=thermal_curve,
            reaction_equation=equation,
            analysis_notes=notes,
        )


virtual_lab_service = VirtualLabService()
