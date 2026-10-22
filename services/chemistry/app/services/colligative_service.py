"""Scientific Engine for Colligative Properties & Non-Ideal Solution Chemistry."""

import math
from typing import Dict, List, Optional, Tuple
from app.models.colligative import (
    SolventProperties,
    SoluteProperties,
    SolutionModelType,
    VlePoint,
    VaporPressureAnalysis,
    BoilingFreezingAnalysis,
    OsmoticPressureAnalysis,
    IonicStrengthPoint,
    IonicStrengthActivityAnalysis,
)

# ============================================================================
# CURATED PHYSICAL DATA REPOSITORIES (SOLVENTS & SOLUTES)
# ============================================================================

SOLVENTS_DB: Dict[str, SolventProperties] = {
    "water": SolventProperties(
        name="Water",
        formula="H2O",
        molar_mass_g_mol=18.015,
        normal_boiling_point_c=100.0,
        kb_c_kg_mol=0.512,
        normal_freezing_point_c=0.0,
        kf_c_kg_mol=1.86,
        density_g_cm3=0.997,
        antoine_a=8.07131,
        antoine_b=1730.63,
        antoine_c=233.426,
        description="Universal polar protic solvent with strong hydrogen bonding network.",
    ),
    "ethanol": SolventProperties(
        name="Ethanol",
        formula="C2H5OH",
        molar_mass_g_mol=46.069,
        normal_boiling_point_c=78.37,
        kb_c_kg_mol=1.22,
        normal_freezing_point_c=-114.1,
        kf_c_kg_mol=1.99,
        density_g_cm3=0.789,
        antoine_a=8.20417,
        antoine_b=1642.89,
        antoine_c=230.300,
        description="Polar organic solvent forming minimum-boiling azeotrope with water.",
    ),
    "benzene": SolventProperties(
        name="Benzene",
        formula="C6H6",
        molar_mass_g_mol=78.114,
        normal_boiling_point_c=80.10,
        kb_c_kg_mol=2.53,
        normal_freezing_point_c=5.50,
        kf_c_kg_mol=5.12,
        density_g_cm3=0.876,
        antoine_a=6.90565,
        antoine_b=1211.033,
        antoine_c=220.790,
        description="Aromatic non-polar solvent; classical ideal solution partner with toluene.",
    ),
    "toluene": SolventProperties(
        name="Toluene",
        formula="C7H8",
        molar_mass_g_mol=92.141,
        normal_boiling_point_c=110.60,
        kb_c_kg_mol=3.33,
        normal_freezing_point_c=-95.0,
        kf_c_kg_mol=3.55,
        density_g_cm3=0.867,
        antoine_a=6.95464,
        antoine_b=1344.800,
        antoine_c=219.482,
        description="Methylbenzene solvent; obeys Raoult's law ideally in benzene mixtures.",
    ),
    "cyclohexane": SolventProperties(
        name="Cyclohexane",
        formula="C6H12",
        molar_mass_g_mol=84.161,
        normal_boiling_point_c=80.74,
        kb_c_kg_mol=2.79,
        normal_freezing_point_c=6.55,
        kf_c_kg_mol=20.0,
        density_g_cm3=0.778,
        antoine_a=6.84498,
        antoine_b=1203.526,
        antoine_c=222.863,
        description="High cryoscopic constant (Kf = 20.0 C*kg/mol) ideal for freezing point experiments.",
    ),
    "camphor": SolventProperties(
        name="Camphor",
        formula="C10H16O",
        molar_mass_g_mol=152.23,
        normal_boiling_point_c=204.0,
        kb_c_kg_mol=5.95,
        normal_freezing_point_c=179.8,
        kf_c_kg_mol=39.7,
        density_g_cm3=0.990,
        antoine_a=7.1120,
        antoine_b=1740.0,
        antoine_c=215.0,
        description="Exceptionally large Kf (39.7 C*kg/mol) used in the classical Rast micro-method.",
    ),
    "acetic_acid": SolventProperties(
        name="Acetic Acid (Glacial)",
        formula="CH3COOH",
        molar_mass_g_mol=60.052,
        normal_boiling_point_c=117.9,
        kb_c_kg_mol=3.07,
        normal_freezing_point_c=16.6,
        kf_c_kg_mol=3.90,
        density_g_cm3=1.049,
        antoine_a=7.18807,
        antoine_b=1416.7,
        antoine_c=211.0,
        description="Weak carboxylic acid solvent exhibiting partial dimerization in non-polar solutions.",
    ),
    "acetone": SolventProperties(
        name="Acetone",
        formula="C3H6O",
        molar_mass_g_mol=58.08,
        normal_boiling_point_c=56.08,
        kb_c_kg_mol=1.71,
        normal_freezing_point_c=-94.7,
        kf_c_kg_mol=2.40,
        density_g_cm3=0.784,
        antoine_a=7.02447,
        antoine_b=1161.0,
        antoine_c=224.0,
        description="Polar aprotic solvent forming maximum-boiling azeotrope with chloroform.",
    ),
    "chloroform": SolventProperties(
        name="Chloroform",
        formula="CHCl3",
        molar_mass_g_mol=119.38,
        normal_boiling_point_c=61.15,
        kb_c_kg_mol=3.63,
        normal_freezing_point_c=-63.5,
        kf_c_kg_mol=4.70,
        density_g_cm3=1.489,
        antoine_a=6.95465,
        antoine_b=1170.966,
        antoine_c=226.232,
        description="Dense chlorocarbon forming strong hydrogen bonds with acetone (A12 < 0).",
    ),
}

SOLUTES_DB: Dict[str, SoluteProperties] = {
    "nacl": SoluteProperties(
        name="Sodium Chloride",
        formula="NaCl",
        molar_mass_g_mol=58.443,
        van_t_hoff_i=2.0,
        is_electrolyte=True,
        cation_charge=1,
        anion_charge=1,
        cation_count=1,
        anion_count=1,
    ),
    "cacl2": SoluteProperties(
        name="Calcium Chloride",
        formula="CaCl2",
        molar_mass_g_mol=110.98,
        van_t_hoff_i=3.0,
        is_electrolyte=True,
        cation_charge=2,
        anion_charge=1,
        cation_count=1,
        anion_count=2,
    ),
    "fecl3": SoluteProperties(
        name="Iron(III) Chloride",
        formula="FeCl3",
        molar_mass_g_mol=162.20,
        van_t_hoff_i=4.0,
        is_electrolyte=True,
        cation_charge=3,
        anion_charge=1,
        cation_count=1,
        anion_count=3,
    ),
    "mgso4": SoluteProperties(
        name="Magnesium Sulfate",
        formula="MgSO4",
        molar_mass_g_mol=120.366,
        van_t_hoff_i=2.0,
        is_electrolyte=True,
        cation_charge=2,
        anion_charge=2,
        cation_count=1,
        anion_count=1,
    ),
    "glucose": SoluteProperties(
        name="D-Glucose",
        formula="C6H12O6",
        molar_mass_g_mol=180.156,
        van_t_hoff_i=1.0,
        is_electrolyte=False,
    ),
    "sucrose": SoluteProperties(
        name="Sucrose (Table Sugar)",
        formula="C12H22O11",
        molar_mass_g_mol=342.30,
        van_t_hoff_i=1.0,
        is_electrolyte=False,
    ),
    "urea": SoluteProperties(
        name="Urea",
        formula="CH4N2O",
        molar_mass_g_mol=60.055,
        van_t_hoff_i=1.0,
        is_electrolyte=False,
    ),
    "ethylene_glycol": SoluteProperties(
        name="Ethylene Glycol (Antifreeze)",
        formula="C2H6O2",
        molar_mass_g_mol=62.068,
        van_t_hoff_i=1.0,
        is_electrolyte=False,
    ),
}


class ColligativeEngine:
    """Core mathematical engine for colligative and solution thermodynamics."""

    @staticmethod
    def calculate_pure_vapor_pressure_mmhg(solvent: SolventProperties, temperature_c: float) -> float:
        """Antoine equation: log10(P/mmHg) = A - B / (T_C + C)."""
        t = temperature_c
        c_denom = t + solvent.antoine_c
        if c_denom == 0:
            c_denom = 1e-6
        log_p = solvent.antoine_a - (solvent.antoine_b / c_denom)
        p_mmhg = math.pow(10.0, log_p)
        return max(1e-6, p_mmhg)

    @classmethod
    def calculate_vapor_pressure_binary(
        cls,
        solvent1_id: str,
        solvent2_id: str,
        temperature_c: float,
        x1: float,
        a12_param: Optional[float] = 0.0,
    ) -> VaporPressureAnalysis:
        """Calculates Raoult's law and Margules 2-suffix non-ideal VLE."""
        s1 = SOLVENTS_DB.get(solvent1_id, SOLVENTS_DB["ethanol"])
        s2 = SOLVENTS_DB.get(solvent2_id, SOLVENTS_DB["water"])

        x1 = max(0.0, min(1.0, x1))
        x2 = 1.0 - x1

        # Pure vapor pressures in mmHg and kPa
        p1_pure_mmhg = cls.calculate_pure_vapor_pressure_mmhg(s1, temperature_c)
        p2_pure_mmhg = cls.calculate_pure_vapor_pressure_mmhg(s2, temperature_c)
        mmhg_to_kpa = 101.325 / 760.0

        p1_pure_kpa = p1_pure_mmhg * mmhg_to_kpa
        p2_pure_kpa = p2_pure_mmhg * mmhg_to_kpa

        # Margules two-suffix activity coefficients: ln(gamma1) = A12 * x2^2
        a12 = a12_param if a12_param is not None else 0.0
        gamma1 = math.exp(a12 * math.pow(x2, 2))
        gamma2 = math.exp(a12 * math.pow(x1, 2))

        # Partial pressures: P_i = gamma_i * x_i * P_i_pure
        p1_partial_kpa = gamma1 * x1 * p1_pure_kpa
        p2_partial_kpa = gamma2 * x2 * p2_pure_kpa
        p_total_kpa = p1_partial_kpa + p2_partial_kpa

        y1 = p1_partial_kpa / p_total_kpa if p_total_kpa > 0 else 0.0
        y2 = 1.0 - y1

        # Generate VLE curve (21 points from x1=0.0 to 1.0)
        vle_curve: List[VlePoint] = []
        azeotrope_detected = False
        azeotrope_x1: Optional[float] = None

        prev_diff: Optional[float] = None
        for i in range(21):
            xi = i * 0.05
            xj = 1.0 - xi
            g1_i = math.exp(a12 * math.pow(xj, 2))
            g2_i = math.exp(a12 * math.pow(xi, 2))
            p1_i = g1_i * xi * p1_pure_kpa
            p2_i = g2_i * xj * p2_pure_kpa
            p_tot_i = p1_i + p2_i
            y1_i = p1_i / p_tot_i if p_tot_i > 0 else 0.0

            vle_curve.append(
                VlePoint(
                    x1_liquid=round(xi, 3),
                    y1_vapor=round(y1_i, 4),
                    pressure_kpa=round(p_tot_i, 3),
                    pressure_mmhg=round(p_tot_i / mmhg_to_kpa, 2),
                    activity_coeff_1=round(g1_i, 4),
                    activity_coeff_2=round(g2_i, 4),
                )
            )

            # Azeotrope detection where y1 - x1 crosses zero in (0.01, 0.99)
            if 0 < i < 20:
                diff = y1_i - xi
                if prev_diff is not None and (prev_diff * diff <= 0):
                    azeotrope_detected = True
                    azeotrope_x1 = round(xi, 2)
                prev_diff = diff

        model_type = SolutionModelType.IDEAL_RAOULT if abs(a12) < 1e-4 else SolutionModelType.MARGULES_TWO_SUFFIX

        return VaporPressureAnalysis(
            solvent1_name=s1.name,
            solvent2_name=s2.name,
            temperature_c=temperature_c,
            x1_mole_fraction=round(x1, 4),
            x2_mole_fraction=round(x2, 4),
            p1_pure_kpa=round(p1_pure_kpa, 3),
            p2_pure_kpa=round(p2_pure_kpa, 3),
            activity_coeff_1=round(gamma1, 4),
            activity_coeff_2=round(gamma2, 4),
            p1_partial_kpa=round(p1_partial_kpa, 3),
            p2_partial_kpa=round(p2_partial_kpa, 3),
            total_vapor_pressure_kpa=round(p_total_kpa, 3),
            total_vapor_pressure_mmhg=round(p_total_kpa / mmhg_to_kpa, 2),
            y1_vapor_mole_fraction=round(y1, 4),
            y2_vapor_mole_fraction=round(y2, 4),
            azeotrope_detected=azeotrope_detected,
            azeotrope_x1=azeotrope_x1,
            model_type=model_type,
            vle_curve=vle_curve,
        )

    @classmethod
    def calculate_boiling_freezing(
        cls,
        solvent_id: str,
        solute_id: str,
        solute_mass_g: float,
        solvent_mass_g: float,
        custom_i: Optional[float] = None,
        observed_delta_tf: Optional[float] = None,
    ) -> BoilingFreezingAnalysis:
        """Evaluates ebullioscopy (boiling elevation) and cryoscopy (freezing depression)."""
        solvent = SOLVENTS_DB.get(solvent_id, SOLVENTS_DB["water"])
        solute = SOLUTES_DB.get(solute_id, SOLUTES_DB["nacl"])

        solvent_kg = solvent_mass_g / 1000.0
        n_solute = solute_mass_g / solute.molar_mass_g_mol
        molality = n_solute / solvent_kg if solvent_kg > 0 else 0.0

        i_factor = custom_i if custom_i is not None else solute.van_t_hoff_i

        # Delta Tb = i * Kb * m
        delta_tb = i_factor * solvent.kb_c_kg_mol * molality
        solution_tb = solvent.normal_boiling_point_c + delta_tb

        # Delta Tf = i * Kf * m
        delta_tf = i_factor * solvent.kf_c_kg_mol * molality
        solution_tf = solvent.normal_freezing_point_c - delta_tf

        # Dilute assumption validation
        dilute_limit_exceeded = molality > 1.0
        warning = None
        if dilute_limit_exceeded:
            warning = (
                f"Molality m = {molality:.2f} mol/kg exceeds the dilute solution limit (m <= 1.0 mol/kg). "
                "Calculated Delta Tb and Delta Tf are approximations; solvent activity diverges from Raoult's law."
            )

        # Molar mass estimation from observed freezing point depression
        molar_mass_est = None
        if observed_delta_tf is not None and observed_delta_tf > 0:
            # M_solute = (i * Kf * mass_solute_g) / (delta_tf * mass_solvent_kg)
            molar_mass_est = (i_factor * solvent.kf_c_kg_mol * solute_mass_g) / (observed_delta_tf * solvent_kg)

        return BoilingFreezingAnalysis(
            solvent_name=solvent.name,
            solute_name=solute.name,
            solute_mass_g=round(solute_mass_g, 4),
            solvent_mass_g=round(solvent_mass_g, 2),
            molality_m=round(molality, 4),
            van_t_hoff_factor_i=round(i_factor, 2),
            pure_boiling_point_c=round(solvent.normal_boiling_point_c, 2),
            delta_tb_c=round(delta_tb, 4),
            solution_boiling_point_c=round(solution_tb, 4),
            pure_freezing_point_c=round(solvent.normal_freezing_point_c, 2),
            delta_tf_c=round(delta_tf, 4),
            solution_freezing_point_c=round(solution_tf, 4),
            dilute_limit_exceeded=dilute_limit_exceeded,
            applicability_warning=warning,
            estimated_molar_mass_g_mol=round(molar_mass_est, 2) if molar_mass_est else None,
        )

    @classmethod
    def calculate_osmotic_pressure(
        cls,
        solute_name: str,
        temperature_c: float,
        solute_mass_g: float,
        solution_volume_l: float,
        molar_mass_g_mol: Optional[float] = 66500.0,
        van_t_hoff_i: float = 1.0,
        solvent_density_g_cm3: float = 0.997,
    ) -> OsmoticPressureAnalysis:
        """van 't Hoff ideal dilute law and Morse concentration correction."""
        mw = molar_mass_g_mol if molar_mass_g_mol is not None and molar_mass_g_mol > 0 else 66500.0
        n_moles = solute_mass_g / mw
        molarity = n_moles / solution_volume_l if solution_volume_l > 0 else 0.0

        temp_k = temperature_c + 273.15
        r_atm_l_mol_k = 0.082057366

        # Ideal van 't Hoff osmotic pressure: Pi = i * M * R * T
        pi_atm = van_t_hoff_i * molarity * r_atm_l_mol_k * temp_k

        # Morse equation correction: Pi_morse = i * m * rho_solvent * R * T
        # Where solvent mass in kg approx = (volume_l * density_g_cm3 * 1000 - solute_mass_g) / 1000
        solv_mass_kg = max(0.01, (solution_volume_l * solvent_density_g_cm3 * 1000.0 - solute_mass_g) / 1000.0)
        molality = n_moles / solv_mass_kg
        pi_morse_atm = van_t_hoff_i * molality * solvent_density_g_cm3 * r_atm_l_mol_k * temp_k

        # Unit conversions
        pi_bar = pi_atm * 1.01325
        pi_kpa = pi_atm * 101.325
        pi_mmhg = pi_atm * 760.0

        # Tonicity relative to mammalian blood plasma (7.4 to 8.0 atm)
        is_isotonic = 7.4 <= pi_atm <= 8.0
        if pi_atm < 7.4:
            tonicity = "Hypotonic (< 7.4 atm, risk of erythrocyte hemolysis)"
        elif pi_atm > 8.0:
            tonicity = "Hypertonic (> 8.0 atm, risk of erythrocyte crenation)"
        else:
            tonicity = "Isotonic (7.4 - 8.0 atm, physiological osmolarity)"

        # Macromolecule MW estimate from Pi: M = (mass_g / V_L) * R * T / Pi
        mw_estimate = None
        if pi_atm > 0:
            c_g_l = solute_mass_g / solution_volume_l
            mw_estimate = (c_g_l * r_atm_l_mol_k * temp_k) / pi_atm

        return OsmoticPressureAnalysis(
            solute_name=solute_name,
            temperature_c=temperature_c,
            molarity_m=round(molarity, 6),
            molality_m=round(molality, 6),
            van_t_hoff_i=round(van_t_hoff_i, 2),
            osmotic_pressure_atm=round(pi_atm, 4),
            osmotic_pressure_bar=round(pi_bar, 4),
            osmotic_pressure_kpa=round(pi_kpa, 3),
            osmotic_pressure_mmhg=round(pi_mmhg, 2),
            morse_corrected_pressure_atm=round(pi_morse_atm, 4),
            is_isotonic_blood=is_isotonic,
            tonicity_category=tonicity,
            macromolecule_mw_estimate=round(mw_estimate, 1) if mw_estimate else None,
        )

    @classmethod
    def calculate_ionic_strength_activity(
        cls,
        electrolyte_id: str,
        molarity_m: float,
        temperature_c: float = 25.0,
        ion_radius_angstrom: float = 3.0,
    ) -> IonicStrengthActivityAnalysis:
        """Debye–Hückel Limiting Law, Extended Debye-Hückel, and Davies equation."""
        solute = SOLUTES_DB.get(electrolyte_id, SOLUTES_DB["cacl2"])
        z_plus = solute.cation_charge or 1
        z_minus = solute.anion_charge or 1
        nu_plus = solute.cation_count or 1
        nu_minus = solute.anion_count or 1

        # Ionic strength: I = 1/2 * (c_+ * z_+^2 + c_- * z_-^2)
        c_plus = molarity_m * nu_plus
        c_minus = molarity_m * nu_minus
        ionic_strength = 0.5 * (c_plus * math.pow(z_plus, 2) + c_minus * math.pow(z_minus, 2))

        # Debye-Hückel constant A for water at 25 C = 0.509
        # Temperature dependence: A approx = 0.509 * (298.15 / T_K)^(1.5)
        temp_k = temperature_c + 273.15
        a_dh = 0.509 * math.pow(298.15 / temp_k, 1.5)
        b_dh = 0.328  # in 1/(Angstrom * M^(1/2))
        z_prod = abs(z_plus * z_minus)

        sqrt_i = math.sqrt(max(1e-9, ionic_strength))

        # 1. Debye-Hückel Limiting Law: log10(gamma) = -A * |z_+ * z_-| * sqrt(I)
        log_gamma_dhll = -a_dh * z_prod * sqrt_i
        gamma_dhll = math.pow(10.0, log_gamma_dhll)

        # 2. Extended Debye-Hückel: log10(gamma) = -A * |z_+ * z_-| * sqrt(I) / (1 + B * a * sqrt(I))
        denom_ext = 1.0 + b_dh * ion_radius_angstrom * sqrt_i
        log_gamma_ext = (-a_dh * z_prod * sqrt_i) / denom_ext
        gamma_ext = math.pow(10.0, log_gamma_ext)

        # 3. Davies equation: log10(gamma) = -A * |z_+ * z_-| * (sqrt(I)/(1 + sqrt(I)) - 0.3 * I)
        log_gamma_davies = -a_dh * z_prod * ((sqrt_i / (1.0 + sqrt_i)) - 0.30 * ionic_strength)
        gamma_davies = math.pow(10.0, log_gamma_davies)

        # Selection and regime identification
        warning = None
        if ionic_strength <= 0.01:
            regime = "Dilute electrolyte regime: Debye-Hückel Limiting Law is rigorously accurate."
            selected_gamma = gamma_dhll
        elif ionic_strength <= 0.10:
            regime = "Moderate ionic strength: Extended Debye-Hückel accounts for finite hydrated ion size."
            selected_gamma = gamma_ext
        elif ionic_strength <= 0.50:
            regime = "Concentrated ionic solution: Davies semi-empirical model accounts for short-range ion pairing."
            selected_gamma = gamma_davies
        else:
            regime = "High-concentration brine regime: Beyond Debye-Hückel validity limits."
            selected_gamma = gamma_davies
            warning = (
                f"Ionic strength I = {ionic_strength:.3f} M exceeds standard Debye-Hückel applicability (I <= 0.50 M). "
                "Significant specific ion interactions require Pitzer virial or Bromley formulations."
            )

        # Generate activity coefficient curve across ionic strengths 0.001 to 0.5 M
        curve: List[IonicStrengthPoint] = []
        for step in [0.001, 0.005, 0.01, 0.02, 0.05, 0.10, 0.15, 0.20, 0.30, 0.40, 0.50]:
            i_step = 0.5 * (step * nu_plus * math.pow(z_plus, 2) + step * nu_minus * math.pow(z_minus, 2))
            sq = math.sqrt(i_step)
            lg = -a_dh * z_prod * ((sq / (1.0 + sq)) - 0.30 * i_step)
            curve.append(
                IonicStrengthPoint(
                    concentration_m=step,
                    ionic_strength=round(i_step, 4),
                    gamma_plus_minus=round(math.pow(10.0, lg), 4),
                )
            )

        return IonicStrengthActivityAnalysis(
            electrolyte_formula=solute.formula,
            molarity_m=round(molarity_m, 4),
            ionic_strength_i=round(ionic_strength, 4),
            cation_charge_z_plus=z_plus,
            anion_charge_z_minus=z_minus,
            dhll_gamma_plus_minus=round(gamma_dhll, 4),
            extended_dh_gamma_plus_minus=round(gamma_ext, 4),
            davies_gamma_plus_minus=round(gamma_davies, 4),
            selected_gamma=round(selected_gamma, 4),
            regime_description=regime,
            validity_warning=warning,
            activity_curve=curve,
        )
