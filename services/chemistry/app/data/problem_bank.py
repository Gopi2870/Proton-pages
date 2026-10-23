"""
Curated authentic repository of university and olympiad chemistry problems
with multi-step mathematical derivations, analytical solutions, hints, and rubrics.
"""
from typing import List, Dict
from ..models.education_problem import (
    ChemistryProblem,
    ProblemCategory,
    ProblemDifficulty,
    ProblemStep,
    ProblemHint,
    RubricCriterion,
)


CHEMISTRY_PROBLEM_BANK: List[ChemistryProblem] = [
    ChemistryProblem(
        id="prob-phys-001",
        title="Enthalpy of Vaporization via Clausius-Clapeyron Relation",
        category=ProblemCategory.PHYSICAL,
        difficulty=ProblemDifficulty.INTERMEDIATE,
        topic="Phase Equilibria & Vapor Pressure",
        question_markdown=(
            "The vapor pressure of liquid ethanol ($C_2H_5OH$) was measured experimentally at two temperatures:\n"
            "- At $T_1 = 293.15\\text{ K}$ ($20^\\circ\\text{C}$), $P_1 = 5.85\\text{ kPa}$\n"
            "- At $T_2 = 333.15\\text{ K}$ ($60^\\circ\\text{C}$), $P_2 = 47.0\\text{ kPa}$\n\n"
            "Assuming the standard enthalpy of vaporization $\\Delta H_{vap}^\\circ$ remains constant over this "
            "temperature interval and ethanol vapor obeys ideal gas behavior, calculate $\\Delta H_{vap}^\\circ$ in $\\text{kJ/mol}$."
        ),
        formula_latex="\\ln\\left(\\frac{P_2}{P_1}\\right) = -\\frac{\\Delta H_{vap}^\\circ}{R}\\left(\\frac{1}{T_2} - \\frac{1}{T_1}\\right)",
        given_variables={
            "T1_kelvin": 293.15,
            "P1_kpa": 5.85,
            "T2_kelvin": 333.15,
            "P2_kpa": 47.0,
            "R_gas_constant": 8.314462,  # J/(mol*K)
        },
        steps=[
            ProblemStep(
                step_number=1,
                instruction="Compute the natural logarithm of the vapor pressure ratio ln(P2 / P1).",
                target_quantity="ln_P_ratio",
                expected_formula="ln(47.0 / 5.85)",
                explanation="Ratio of high-temperature vapor pressure to room-temperature vapor pressure.",
                expected_value=2.0837,
                tolerance_percent=1.0,
                unit="dimensionless",
            ),
            ProblemStep(
                step_number=2,
                instruction="Compute the inverse temperature difference (1/T2 - 1/T1) in K^-1.",
                target_quantity="inv_T_diff",
                expected_formula="1/333.15 - 1/293.15",
                explanation="Temperature gradient factor driving the vapor pressure shift.",
                expected_value=-0.00040995,
                tolerance_percent=1.0,
                unit="K^-1",
            ),
            ProblemStep(
                step_number=3,
                instruction="Calculate Delta H_vap in J/mol: -R * ln(P2 / P1) / (1/T2 - 1/T1).",
                target_quantity="delta_h_joules",
                expected_formula="-8.314462 * 2.0837 / -0.00040995",
                explanation="Application of integrated two-point Clausius-Clapeyron equation.",
                expected_value=42261.0,
                tolerance_percent=2.0,
                unit="J/mol",
            ),
            ProblemStep(
                step_number=4,
                instruction="Convert Delta H_vap to kJ/mol.",
                target_quantity="delta_h_kj",
                expected_formula="42261.0 / 1000.0",
                explanation="Standard thermochemical molar unit conversion.",
                expected_value=42.26,
                tolerance_percent=2.0,
                unit="kJ/mol",
            ),
        ],
        hints=[
            ProblemHint(
                tier=1,
                hint_text="Remember to convert pressures to consistent units before taking ratios, though kPa cancels out cleanly.",
                point_penalty=0.0,
            ),
            ProblemHint(
                tier=2,
                hint_text="The integrated Clausius-Clapeyron equation is ln(P2/P1) = -(Delta H_vap / R) * (1/T2 - 1/T1).",
                point_penalty=10.0,
            ),
            ProblemHint(
                tier=3,
                hint_text="Watch the negative sign: 1/T2 - 1/T1 is negative because T2 > T1; the two negatives cancel to yield a positive endothermic Delta H.",
                point_penalty=20.0,
            ),
        ],
        reference_value=42.26,
        reference_unit="kJ/mol",
        significant_figures=3,
        rubric=[
            RubricCriterion(criterion="Correct temperature inversion", max_points=25.0, description="Accurate conversion to Kelvin and difference inversion."),
            RubricCriterion(criterion="Logarithmic ratio accuracy", max_points=25.0, description="Correct evaluation of ln(P2/P1)."),
            RubricCriterion(criterion="Gas constant R handling", max_points=25.0, description="Use of R = 8.314 J/(mol K)."),
            RubricCriterion(criterion="Unit conversion to kJ/mol", max_points=25.0, description="Final division by 1000 with 3 significant figures."),
        ],
        tags=["Thermodynamics", "Clausius-Clapeyron", "Vapor Pressure", "Phase Equilibria"],
    ),
    ChemistryProblem(
        id="prob-kin-001",
        title="Arrhenius Activation Energy from Two-Temperature Rate Constants",
        category=ProblemCategory.KINETICS,
        difficulty=ProblemDifficulty.INTERMEDIATE,
        topic="Chemical Kinetics & Transition State Theory",
        question_markdown=(
            "The second-order gas-phase decomposition of acetaldehyde:\n"
            "$$CH_3CHO(g) \\xrightarrow{\\Delta} CH_4(g) + CO(g)$$\n"
            "exhibits the following rate constants:\n"
            "- $k_1 = 0.105\\text{ M}^{-1}\\text{s}^{-1}$ at $T_1 = 700\\text{ K}$\n"
            "- $k_2 = 1.050\\text{ M}^{-1}\\text{s}^{-1}$ at $T_2 = 760\\text{ K}$\n\n"
            "Using the Arrhenius rate equation, determine the activation energy $E_a$ of this reaction in $\\text{kJ/mol}$."
        ),
        formula_latex="\\ln\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)",
        given_variables={
            "T1_kelvin": 700.0,
            "k1_rate": 0.105,
            "T2_kelvin": 760.0,
            "k2_rate": 1.050,
            "R_gas_constant": 8.314462,
        },
        steps=[
            ProblemStep(
                step_number=1,
                instruction="Calculate the natural logarithm of the rate constant ratio ln(k2 / k1).",
                target_quantity="ln_k_ratio",
                expected_formula="ln(1.050 / 0.105) = ln(10.0)",
                explanation="Ten-fold acceleration factor in reaction velocity.",
                expected_value=2.3026,
                tolerance_percent=1.0,
                unit="dimensionless",
            ),
            ProblemStep(
                step_number=2,
                instruction="Compute (1/T1 - 1/T2) in K^-1.",
                target_quantity="inv_temp_delta",
                expected_formula="1/700.0 - 1/760.0",
                explanation="Inverse temperature difference.",
                expected_value=0.00011278,
                tolerance_percent=1.0,
                unit="K^-1",
            ),
            ProblemStep(
                step_number=3,
                instruction="Evaluate Ea in J/mol: R * ln(k2 / k1) / (1/T1 - 1/T2).",
                target_quantity="ea_joules",
                expected_formula="8.314462 * 2.3026 / 0.00011278",
                explanation="Arrhenius activation barrier in SI base units.",
                expected_value=169752.0,
                tolerance_percent=2.0,
                unit="J/mol",
            ),
            ProblemStep(
                step_number=4,
                instruction="Convert Ea to kJ/mol.",
                target_quantity="ea_kj",
                expected_formula="169752.0 / 1000.0",
                explanation="Molar activation energy.",
                expected_value=169.75,
                tolerance_percent=2.0,
                unit="kJ/mol",
            ),
        ],
        hints=[
            ProblemHint(
                tier=1,
                hint_text="The ratio k2 / k1 is exactly 10.0, so ln(k2/k1) is approximately 2.303.",
                point_penalty=0.0,
            ),
            ProblemHint(
                tier=2,
                hint_text="Ea = R * ln(k2/k1) / (1/T1 - 1/T2). Ensure T is in Kelvin.",
                point_penalty=10.0,
            ),
        ],
        reference_value=169.75,
        reference_unit="kJ/mol",
        significant_figures=4,
        rubric=[
            RubricCriterion(criterion="Log ratio calculation", max_points=25.0, description="Accurate computation of ln(10)."),
            RubricCriterion(criterion="Temperature gradient", max_points=25.0, description="Correct difference (1/T1 - 1/T2)."),
            RubricCriterion(criterion="Arrhenius equation application", max_points=30.0, description="Proper substitution with R constant."),
            RubricCriterion(criterion="Units and precision", max_points=20.0, description="Conversion to kJ/mol with correct sig figs."),
        ],
        tags=["Kinetics", "Arrhenius", "Activation Energy", "Rate Constant"],
    ),
    ChemistryProblem(
        id="prob-inorg-001",
        title="Crystal Field Stabilization Energy (CFSE) of Octahedral [Fe(H2O)6]2+",
        category=ProblemCategory.INORGANIC,
        difficulty=ProblemDifficulty.ADVANCED,
        topic="Coordination Chemistry & Ligand Field Theory",
        question_markdown=(
            "Consider the hexaaquairon(II) complex cation, $[\\text{Fe}(\\text{H}_2\\text{O})_6]^{2+}$.\n"
            "- Iron is in the $+2$ oxidation state with electronic configuration $[\text{Ar}]\\,3d^6$.\n"
            "- Water ($\\text{H}_2\\text{O}$) is a weak-field ligand on the spectrochemical series, with octahedral crystal field splitting $\\Delta_o = 10,400\\text{ cm}^{-1}$.\n"
            "- The mean electron pairing energy for $\\text{Fe}^{2+}$ is $P = 17,600\\text{ cm}^{-1}$.\n\n"
            "1. Determine whether the complex is high-spin or low-spin.\n"
            "2. Calculate the net Crystal Field Stabilization Energy (CFSE) in $\\text{cm}^{-1}$ (excluding pairing energy terms)."
        ),
        formula_latex="\\text{CFSE} = \\left(-0.4\\, n_{t_{2g}} + 0.6\\, n_{e_g}\\right)\\Delta_o",
        given_variables={
            "metal": "Fe(II)",
            "d_electrons": 6,
            "delta_octahedral": 10400.0,  # cm^-1
            "pairing_energy": 17600.0,     # cm^-1
        },
        steps=[
            ProblemStep(
                step_number=1,
                instruction="Compare Delta_o (10,400 cm^-1) and P (17,600 cm^-1) to assign spin state.",
                target_quantity="is_high_spin",
                expected_formula="Delta_o < P => High Spin",
                explanation="Because Delta_o < P, pairing is unfavorable; Hund's rule maximizes unpaired spins.",
                expected_value=1.0,  # 1 for high-spin
                tolerance_percent=0.1,
                unit="boolean_flag",
            ),
            ProblemStep(
                step_number=2,
                instruction="Distribute 6 d-electrons into t2g and eg sets in high-spin: (t2g)^4 (eg)^2.",
                target_quantity="t2g_count",
                expected_formula="4 electrons in t2g",
                explanation="t2g orbital occupancy in high-spin d6.",
                expected_value=4.0,
                tolerance_percent=0.1,
                unit="electrons",
            ),
            ProblemStep(
                step_number=3,
                instruction="Calculate net CFSE coefficient in units of Delta_o: (-0.4 * 4) + (0.6 * 2).",
                target_quantity="cfse_coeff",
                expected_formula="-1.6 + 1.2 = -0.4",
                explanation="Net orbital stabilization factor.",
                expected_value=-0.4,
                tolerance_percent=1.0,
                unit="Delta_o",
            ),
            ProblemStep(
                step_number=4,
                instruction="Multiply by Delta_o (10,400 cm^-1) to find CFSE in cm^-1.",
                target_quantity="cfse_cm1",
                expected_formula="-0.4 * 10400.0",
                explanation="Energy stabilization relative to spherical ligand field.",
                expected_value=-4160.0,
                tolerance_percent=1.0,
                unit="cm^-1",
            ),
        ],
        hints=[
            ProblemHint(
                tier=1,
                hint_text="Because water is a weak-field ligand and Delta_o < P, the complex adopts high spin.",
                point_penalty=0.0,
            ),
            ProblemHint(
                tier=2,
                hint_text="In high-spin d6, electrons occupy orbitals as (t2g)^4 (eg)^2.",
                point_penalty=10.0,
            ),
        ],
        reference_value=-4160.0,
        reference_unit="cm^-1",
        significant_figures=4,
        rubric=[
            RubricCriterion(criterion="Spin state assignment", max_points=25.0, description="Correct identification of high-spin state from Delta < P."),
            RubricCriterion(criterion="Orbital electronic configuration", max_points=25.0, description="Correct assignment of (t2g)^4 (eg)^2."),
            RubricCriterion(criterion="CFSE multiplier calculation", max_points=25.0, description="Evaluation of (-0.4 * 4 + 0.6 * 2) = -0.4 Delta_o."),
            RubricCriterion(criterion="Numerical magnitude", max_points=25.0, description="Final multiplication yielding -4,160 cm^-1."),
        ],
        tags=["Inorganic", "CFSE", "Crystal Field Theory", "d-Orbitals", "Coordination"],
    ),
    ChemistryProblem(
        id="prob-quant-001",
        title="HOMO-LUMO Transition Wavelength in 1,3,5-Hexatriene (Particle-in-a-Box)",
        category=ProblemCategory.QUANTUM,
        difficulty=ProblemDifficulty.ADVANCED,
        topic="Quantum Mechanics & Molecular Spectroscopy",
        question_markdown=(
            "Model the $\\pi$-electrons of conjugated 1,3,5-hexatriene ($CH_2=CH-CH=CH-CH=CH_2$) as particles "
            "in a one-dimensional infinite potential well (particle-in-a-box).\n"
            "- The box length is $L = 8.67\\text{ \\AA} = 8.67 \\times 10^{-10}\\text{ m}$ (spanning 5 C-C bonds plus carbon end radii).\n"
            "- Hexatriene possesses $N = 6$ delocalized $\\pi$-electrons.\n\n"
            "1. By the Pauli exclusion principle, determine the quantum number $n$ of the Highest Occupied Molecular Orbital (HOMO) "
            "and Lowest Unoccupied Molecular Orbital (LUMO).\n"
            "2. Calculate the absorption wavelength $\\lambda$ in $\\text{nm}$ for the fundamental $\\text{HOMO} \\to \\text{LUMO}$ electronic transition."
        ),
        formula_latex="\\Delta E = E_{n+1} - E_n = \\frac{(2n+1)h^2}{8 m_e L^2}, \\quad \\lambda = \\frac{h c}{\\Delta E}",
        given_variables={
            "L_meters": 8.67e-10,
            "pi_electrons": 6,
            "planck_h": 6.62607015e-34,  # J s
            "c_speed_of_light": 2.99792458e8,  # m/s
            "m_e_electron_mass": 9.1093837e-31,  # kg
        },
        steps=[
            ProblemStep(
                step_number=1,
                instruction="Identify the HOMO and LUMO levels for 6 electrons (2 electrons per spatial state).",
                target_quantity="homo_n",
                expected_formula="n_HOMO = 6/2 = 3, n_LUMO = 4",
                explanation="Levels n=1, 2, 3 are doubly occupied. LUMO is n=4.",
                expected_value=3.0,
                tolerance_percent=0.1,
                unit="quantum_level",
            ),
            ProblemStep(
                step_number=2,
                instruction="Compute energy difference coefficient (n_LUMO^2 - n_HOMO^2) = (16 - 9) = 7.",
                target_quantity="quantum_delta_n2",
                expected_formula="4^2 - 3^2 = 7",
                explanation="Difference in quantum number squares.",
                expected_value=7.0,
                tolerance_percent=0.1,
                unit="dimensionless",
            ),
            ProblemStep(
                step_number=3,
                instruction="Calculate Delta E in Joules: 7 * h^2 / (8 * m_e * L^2).",
                target_quantity="delta_e_joules",
                expected_formula="7 * (6.626e-34)^2 / (8 * 9.109e-31 * (8.67e-10)^2)",
                explanation="Transition energy gap.",
                expected_value=5.602e-19,
                tolerance_percent=2.0,
                unit="J",
            ),
            ProblemStep(
                step_number=4,
                instruction="Calculate absorption wavelength in nm: lambda = (h * c / Delta E) * 1e9.",
                target_quantity="wavelength_nm",
                expected_formula="(6.626e-34 * 2.998e8 / 5.602e-19) * 1e9",
                explanation="De Broglie / Planck radiation wavelength.",
                expected_value=354.6,
                tolerance_percent=2.5,
                unit="nm",
            ),
        ],
        hints=[
            ProblemHint(
                tier=1,
                hint_text="6 electrons fill levels n=1, n=2, and n=3 in pairs. Thus HOMO = 3, LUMO = 4.",
                point_penalty=0.0,
            ),
            ProblemHint(
                tier=2,
                hint_text="Delta E = (4^2 - 3^2) * h^2 / (8 m_e L^2) = 7 h^2 / (8 m_e L^2).",
                point_penalty=10.0,
            ),
        ],
        reference_value=354.6,
        reference_unit="nm",
        significant_figures=4,
        rubric=[
            RubricCriterion(criterion="HOMO/LUMO level identification", max_points=25.0, description="Correct pairing showing n=3 is HOMO and n=4 is LUMO."),
            RubricCriterion(criterion="Particle-in-a-box energy formula", max_points=25.0, description="Application of En = n^2 h^2 / (8 m L^2)."),
            RubricCriterion(criterion="Numerical transition energy Delta E", max_points=25.0, description="Accurate evaluation of Delta E = 5.60e-19 J."),
            RubricCriterion(criterion="Wavelength conversion to nm", max_points=25.0, description="lambda = hc / Delta E = 355 nm."),
        ],
        tags=["Quantum Chemistry", "Particle in a Box", "HOMO-LUMO", "UV-Vis Spectroscopy"],
    ),
    ChemistryProblem(
        id="prob-anal-001",
        title="Spectrophotometric Determination via Standard Addition Method",
        category=ProblemCategory.ANALYTICAL,
        difficulty=ProblemDifficulty.INTERMEDIATE,
        topic="Instrumental Analysis & Standard Addition",
        question_markdown=(
            "The concentration of iron in a contaminated groundwater sample was determined using 1,10-phenanthroline "
            "absorbance spectrophotometry at $\\lambda = 510\\text{ nm}$ via the standard addition method:\n"
            "- A $25.0\\text{ mL}$ aliquot of the groundwater sample was diluted to $50.0\\text{ mL}$ and gave an absorbance $A_0 = 0.280$.\n"
            "- A second identical $25.0\\text{ mL}$ groundwater aliquot was spiked with $2.00\\text{ mL}$ of a $100.0\\text{ mg/L}$ standard $\\text{Fe}^{2+}$ solution, "
            "diluted to $50.0\\text{ mL}$, and gave an absorbance $A_{spk} = 0.520$.\n\n"
            "Assuming linear Beer-Lambert behavior ($A = k \\cdot C$), calculate the initial concentration of $\\text{Fe}$ in the original unspiked groundwater in $\\text{mg/L}$."
        ),
        formula_latex="\\frac{A_0}{A_{spk}} = \\frac{C_x (V_x / V_t)}{C_x (V_x / V_t) + C_s (V_s / V_t)} \\implies C_x = \\frac{A_0 \\cdot C_s \\cdot V_s}{(A_{spk} - A_0) \\cdot V_x}",
        given_variables={
            "Vx_sample_volume_ml": 25.0,
            "Vt_total_volume_ml": 50.0,
            "A0_absorbance": 0.280,
            "Vs_spike_volume_ml": 2.00,
            "Cs_standard_mg_l": 100.0,
            "Aspk_absorbance": 0.520,
        },
        steps=[
            ProblemStep(
                step_number=1,
                instruction="Compute the absorbance increase caused by the spike: Delta A = Aspk - A0.",
                target_quantity="delta_a",
                expected_formula="0.520 - 0.280",
                explanation="Absorbance increment attributable strictly to added standard.",
                expected_value=0.240,
                tolerance_percent=0.5,
                unit="absorbance_units",
            ),
            ProblemStep(
                step_number=2,
                instruction="Calculate total mass of iron added in the spike: Cs * Vs (in mg).",
                target_quantity="spike_mass_mg",
                expected_formula="100.0 mg/L * 0.00200 L",
                explanation="Absolute mass of spiked analyte.",
                expected_value=0.200,
                tolerance_percent=0.5,
                unit="mg",
            ),
            ProblemStep(
                step_number=3,
                instruction="Use the standard addition ratio formula: Cx = (A0 * Cs * Vs) / (Delta A * Vx).",
                target_quantity="cx_initial",
                expected_formula="(0.280 * 100.0 * 2.00) / (0.240 * 25.0)",
                explanation="Solving for original unspiked sample concentration.",
                expected_value=9.333,
                tolerance_percent=1.5,
                unit="mg/L",
            ),
        ],
        hints=[
            ProblemHint(
                tier=1,
                hint_text="Because total diluted volume Vt = 50.0 mL is identical in both flasks, Vt cancels out in the ratio.",
                point_penalty=0.0,
            ),
            ProblemHint(
                tier=2,
                hint_text="Cx = (A0 * Cs * Vs) / ((Aspk - A0) * Vx).",
                point_penalty=10.0,
            ),
        ],
        reference_value=9.333,
        reference_unit="mg/L",
        significant_figures=3,
        rubric=[
            RubricCriterion(criterion="Absorbance difference", max_points=25.0, description="Correct computation of Delta A = 0.240."),
            RubricCriterion(criterion="Standard addition formula", max_points=35.0, description="Formulation of proportionality equation cancelling dilution factors."),
            RubricCriterion(criterion="Numerical evaluation", max_points=40.0, description="Evaluation to 9.33 mg/L with correct units."),
        ],
        tags=["Analytical", "Spectrophotometry", "Standard Addition", "Beer-Lambert Law"],
    ),
    ChemistryProblem(
        id="prob-elec-001",
        title="Non-Standard Cell Potential via Nernst Equation (Daniell Cell)",
        category=ProblemCategory.ELECTROCHEMISTRY,
        difficulty=ProblemDifficulty.INTERMEDIATE,
        topic="Electrochemistry & Nernst Equation",
        question_markdown=(
            "A galvanic Daniell cell operates at $T = 298.15\\text{ K}$ with the net cell reaction:\n"
            "$$Zn(s) + Cu^{2+}(aq) \\rightleftharpoons Zn^{2+}(aq) + Cu(s)$$\n"
            "Standard reduction potentials are:\n"
            "- $E^\\circ(Cu^{2+}/Cu) = +0.340\\text{ V}$\n"
            "- $E^\\circ(Zn^{2+}/Zn) = -0.763\\text{ V}$\n\n"
            "The electrolyte concentrations in the half-cells are:\n"
            "- $[Zn^{2+}] = 1.50\\text{ M}$\n"
            "- $[Cu^{2+}] = 0.00500\\text{ M}$\n\n"
            "Calculate the non-standard electromotive force (EMF) $E_{cell}$ in $\\text{Volts}$."
        ),
        formula_latex="E_{cell} = E_{cell}^\\circ - \\frac{R T}{n F} \\ln(Q) = E^\\circ - \\frac{0.05916}{n}\\log_{10}(Q)",
        given_variables={
            "E0_cu": 0.340,
            "E0_zn": -0.763,
            "zn_conc": 1.50,
            "cu_conc": 0.00500,
            "n_electrons": 2,
            "temperature_k": 298.15,
        },
        steps=[
            ProblemStep(
                step_number=1,
                instruction="Calculate standard cell potential E^circ_cell = E^circ_cathode - E^circ_anode.",
                target_quantity="e0_cell",
                expected_formula="0.340 - (-0.763)",
                explanation="Standard electromotive force under 1 M activities.",
                expected_value=1.103,
                tolerance_percent=0.5,
                unit="V",
            ),
            ProblemStep(
                step_number=2,
                instruction="Compute reaction quotient Q = [Zn2+] / [Cu2+].",
                target_quantity="reaction_quotient_q",
                expected_formula="1.50 / 0.00500",
                explanation="Mass-action quotient of product to reactant cation activities.",
                expected_value=300.0,
                tolerance_percent=0.5,
                unit="dimensionless",
            ),
            ProblemStep(
                step_number=3,
                instruction="Compute log10(Q).",
                target_quantity="log_q",
                expected_formula="log10(300.0)",
                explanation="Base-10 logarithm of Q.",
                expected_value=2.4771,
                tolerance_percent=0.5,
                unit="dimensionless",
            ),
            ProblemStep(
                step_number=4,
                instruction="Compute Nernst term (0.05916 / 2) * log10(Q) and subtract from E0.",
                target_quantity="e_cell_final",
                expected_formula="1.103 - (0.05916 / 2) * 2.4771",
                explanation="Operating voltage under concentration polarization.",
                expected_value=1.030,
                tolerance_percent=1.0,
                unit="V",
            ),
        ],
        hints=[
            ProblemHint(
                tier=1,
                hint_text="Copper is reduced (cathode) and Zinc is oxidized (anode).",
                point_penalty=0.0,
            ),
            ProblemHint(
                tier=2,
                hint_text="Q = [Zn2+] / [Cu2+] because pure solids Zn(s) and Cu(s) have unit activity = 1.",
                point_penalty=10.0,
            ),
        ],
        reference_value=1.030,
        reference_unit="V",
        significant_figures=4,
        rubric=[
            RubricCriterion(criterion="Standard potential E0", max_points=25.0, description="Accurate subtraction yielding +1.103 V."),
            RubricCriterion(criterion="Reaction quotient Q", max_points=25.0, description="Evaluation of [Zn2+]/[Cu2+] = 300."),
            RubricCriterion(criterion="Nernst equation setup", max_points=25.0, description="Correct use of n = 2 electrons transferred."),
            RubricCriterion(criterion="Final potential calculation", max_points=25.0, description="Accurate subtraction to 1.030 V."),
        ],
        tags=["Electrochemistry", "Nernst Equation", "Galvanic Cell", "Daniell Cell"],
    ),
]


def get_all_problems() -> List[ChemistryProblem]:
    return CHEMISTRY_PROBLEM_BANK


def find_problem_by_id(problem_id: str) -> ChemistryProblem | None:
    for p in CHEMISTRY_PROBLEM_BANK:
        if p.id == problem_id:
            return p
    return None
