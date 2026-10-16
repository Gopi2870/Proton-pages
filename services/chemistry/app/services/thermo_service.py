"""
Thermochemistry and Hess's Law Calculation Service.
Provides standard enthalpy, entropy, Gibbs free energy, spontaneity analysis,
and an exact linear algebraic solver for Hess's Law reaction pathway synthesis.
"""
import math
import re
from typing import Dict, List, Optional, Tuple
from services.chemistry.app.models.thermo import (
    ThermodynamicSpecies,
    ReactionThermochemistryResult,
    HessStep,
    HessSolutionResult,
)

# Standard Universal Gas Constant
GAS_CONSTANT_R = 8.314462618  # J / (mol * K)

# Vetted Standard Thermodynamic Data at 298.15 K (25 °C, 1 bar)
# Reference: NIST Chemistry WebBook & CRC Handbook of Chemistry and Physics
THERMO_DATABASE: Dict[str, ThermodynamicSpecies] = {
    # Elements in standard states (Delta H_f = 0 by definition)
    "H2(g)": ThermodynamicSpecies("H2(g)", "Hydrogen gas", "g", 0.0, 0.0, 130.68),
    "O2(g)": ThermodynamicSpecies("O2(g)", "Oxygen gas", "g", 0.0, 0.0, 205.15),
    "N2(g)": ThermodynamicSpecies("N2(g)", "Nitrogen gas", "g", 0.0, 0.0, 191.61),
    "F2(g)": ThermodynamicSpecies("F2(g)", "Fluorine gas", "g", 0.0, 0.0, 202.78),
    "Cl2(g)": ThermodynamicSpecies("Cl2(g)", "Chlorine gas", "g", 0.0, 0.0, 223.07),
    "Br2(l)": ThermodynamicSpecies("Br2(l)", "Liquid Bromine", "l", 0.0, 0.0, 152.23),
    "I2(s)": ThermodynamicSpecies("I2(s)", "Solid Iodine", "s", 0.0, 0.0, 116.14),
    "C(s)": ThermodynamicSpecies("C(s)", "Carbon (graphite)", "s", 0.0, 0.0, 5.74),
    "C(graphite)": ThermodynamicSpecies("C(graphite)", "Carbon (graphite)", "s", 0.0, 0.0, 5.74),
    "C(diamond)": ThermodynamicSpecies("C(diamond)", "Carbon (diamond)", "s", 1.895, 2.90, 2.38),
    "S(s)": ThermodynamicSpecies("S(s)", "Sulfur (rhombic)", "s", 0.0, 0.0, 31.80),
    "Fe(s)": ThermodynamicSpecies("Fe(s)", "Solid Iron", "s", 0.0, 0.0, 27.28),
    "Cu(s)": ThermodynamicSpecies("Cu(s)", "Solid Copper", "s", 0.0, 0.0, 33.15),
    "Zn(s)": ThermodynamicSpecies("Zn(s)", "Solid Zinc", "s", 0.0, 0.0, 41.63),
    "Al(s)": ThermodynamicSpecies("Al(s)", "Solid Aluminum", "s", 0.0, 0.0, 28.32),
    "Mg(s)": ThermodynamicSpecies("Mg(s)", "Solid Magnesium", "s", 0.0, 0.0, 32.68),
    "Na(s)": ThermodynamicSpecies("Na(s)", "Solid Sodium", "s", 0.0, 0.0, 51.21),
    "K(s)": ThermodynamicSpecies("K(s)", "Solid Potassium", "s", 0.0, 0.0, 64.18),
    "Ca(s)": ThermodynamicSpecies("Ca(s)", "Solid Calcium", "s", 0.0, 0.0, 41.42),
    "Pb(s)": ThermodynamicSpecies("Pb(s)", "Solid Lead", "s", 0.0, 0.0, 64.81),
    "Ag(s)": ThermodynamicSpecies("Ag(s)", "Solid Silver", "s", 0.0, 0.0, 42.55),

    # Water & Oxides
    "H2O(l)": ThermodynamicSpecies("H2O(l)", "Liquid Water", "l", -285.83, -237.13, 69.91),
    "H2O(g)": ThermodynamicSpecies("H2O(g)", "Water Vapor", "g", -241.82, -228.57, 188.83),
    "H2O2(l)": ThermodynamicSpecies("H2O2(l)", "Hydrogen Peroxide", "l", -187.80, -120.40, 109.60),
    "CO2(g)": ThermodynamicSpecies("CO2(g)", "Carbon Dioxide", "g", -393.51, -394.39, 213.74),
    "CO(g)": ThermodynamicSpecies("CO(g)", "Carbon Monoxide", "g", -110.53, -137.17, 197.67),
    "SO2(g)": ThermodynamicSpecies("SO2(g)", "Sulfur Dioxide", "g", -296.83, -300.19, 248.22),
    "SO3(g)": ThermodynamicSpecies("SO3(g)", "Sulfur Trioxide", "g", -395.72, -371.06, 256.76),
    "NO(g)": ThermodynamicSpecies("NO(g)", "Nitric Oxide", "g", 90.25, 86.55, 210.76),
    "NO2(g)": ThermodynamicSpecies("NO2(g)", "Nitrogen Dioxide", "g", 33.18, 51.31, 240.06),
    "N2O4(g)": ThermodynamicSpecies("N2O4(g)", "Dinitrogen Tetroxide", "g", 9.16, 97.82, 304.29),
    "N2O(g)": ThermodynamicSpecies("N2O(g)", "Nitrous Oxide", "g", 82.05, 104.20, 219.85),
    "P4O10(s)": ThermodynamicSpecies("P4O10(s)", "Tetraphosphorus Decaoxide", "s", -2984.0, -2697.0, 228.86),

    # Hydrocarbons & Fuels
    "CH4(g)": ThermodynamicSpecies("CH4(g)", "Methane", "g", -74.87, -50.72, 186.26),
    "C2H6(g)": ThermodynamicSpecies("C2H6(g)", "Ethane", "g", -84.0, -32.0, 229.2),
    "C3H8(g)": ThermodynamicSpecies("C3H8(g)", "Propane", "g", -103.85, -23.4, 270.3),
    "C4H10(g)": ThermodynamicSpecies("C4H10(g)", "Butane", "g", -125.6, -15.7, 310.2),
    "C2H4(g)": ThermodynamicSpecies("C2H4(g)", "Ethylene", "g", 52.4, 68.4, 219.3),
    "C2H2(g)": ThermodynamicSpecies("C2H2(g)", "Acetylene", "g", 226.73, 209.2, 200.94),
    "C6H6(l)": ThermodynamicSpecies("C6H6(l)", "Benzene (liquid)", "l", 49.0, 124.5, 173.4),
    "CH3OH(l)": ThermodynamicSpecies("CH3OH(l)", "Methanol (liquid)", "l", -238.66, -166.27, 126.8),
    "C2H5OH(l)": ThermodynamicSpecies("C2H5OH(l)", "Ethanol (liquid)", "l", -277.69, -174.78, 160.7),
    "C6H12O6(s)": ThermodynamicSpecies("C6H12O6(s)", "alpha-D-Glucose", "s", -1273.3, -910.4, 212.1),

    # Acids, Bases & Hydrides
    "NH3(g)": ThermodynamicSpecies("NH3(g)", "Ammonia", "g", -46.11, -16.45, 192.45),
    "HCl(g)": ThermodynamicSpecies("HCl(g)", "Hydrogen Chloride", "g", -92.31, -95.30, 186.91),
    "HF(g)": ThermodynamicSpecies("HF(g)", "Hydrogen Fluoride", "g", -271.1, -273.2, 173.78),
    "HBr(g)": ThermodynamicSpecies("HBr(g)", "Hydrogen Bromide", "g", -36.4, -53.45, 198.70),
    "HI(g)": ThermodynamicSpecies("HI(g)", "Hydrogen Iodide", "g", 26.48, 1.70, 206.59),
    "HNO3(l)": ThermodynamicSpecies("HNO3(l)", "Nitric Acid", "l", -174.1, -80.71, 155.6),
    "H2SO4(l)": ThermodynamicSpecies("H2SO4(l)", "Sulfuric Acid", "l", -814.0, -690.0, 156.9),

    # Salts & Minerals
    "NaCl(s)": ThermodynamicSpecies("NaCl(s)", "Sodium Chloride", "s", -411.12, -384.14, 72.13),
    "KCl(s)": ThermodynamicSpecies("KCl(s)", "Potassium Chloride", "s", -436.5, -409.2, 82.6),
    "CaCO3(s)": ThermodynamicSpecies("CaCO3(s)", "Calcium Carbonate (calcite)", "s", -1206.92, -1128.79, 92.9),
    "CaO(s)": ThermodynamicSpecies("CaO(s)", "Calcium Oxide (lime)", "s", -635.09, -604.03, 39.75),
    "Ca(OH)2(s)": ThermodynamicSpecies("Ca(OH)2(s)", "Calcium Hydroxide", "s", -986.1, -898.5, 83.4),
    "MgO(s)": ThermodynamicSpecies("MgO(s)", "Magnesium Oxide", "s", -601.70, -569.43, 26.94),
    "Mg(OH)2(s)": ThermodynamicSpecies("Mg(OH)2(s)", "Magnesium Hydroxide", "s", -924.5, -833.5, 63.18),
    "Fe2O3(s)": ThermodynamicSpecies("Fe2O3(s)", "Iron(III) Oxide (hematite)", "s", -824.2, -742.2, 87.4),
    "Fe3O4(s)": ThermodynamicSpecies("Fe3O4(s)", "Magnetite", "s", -1118.4, -1015.4, 145.3),
    "Al2O3(s)": ThermodynamicSpecies("Al2O3(s)", "Aluminum Oxide", "s", -1675.7, -1582.3, 50.92),
    "SiO2(s)": ThermodynamicSpecies("SiO2(s)", "Silicon Dioxide (quartz)", "s", -910.7, -856.3, 41.84),
    "BaSO4(s)": ThermodynamicSpecies("BaSO4(s)", "Barium Sulfate", "s", -1473.2, -1362.2, 132.2),
    "AgCl(s)": ThermodynamicSpecies("AgCl(s)", "Silver Chloride", "s", -127.07, -109.79, 96.2),
    "CuSO4(s)": ThermodynamicSpecies("CuSO4(s)", "Copper(II) Sulfate", "s", -771.36, -662.2, 109.0),

    # Aqueous Ions
    "H+(aq)": ThermodynamicSpecies("H+(aq)", "Hydrogen ion", "aq", 0.0, 0.0, 0.0),
    "OH-(aq)": ThermodynamicSpecies("OH-(aq)", "Hydroxide ion", "aq", -229.99, -157.24, -10.75),
    "Na+(aq)": ThermodynamicSpecies("Na+(aq)", "Sodium ion", "aq", -240.12, -261.91, 59.0),
    "K+(aq)": ThermodynamicSpecies("K+(aq)", "Potassium ion", "aq", -252.38, -283.27, 102.5),
    "Cl-(aq)": ThermodynamicSpecies("Cl-(aq)", "Chloride ion", "aq", -167.16, -131.23, 56.5),
    "SO4(2-)(aq)": ThermodynamicSpecies("SO4(2-)(aq)", "Sulfate ion", "aq", -909.27, -744.53, 20.1),
    "NO3-(aq)": ThermodynamicSpecies("NO3-(aq)", "Nitrate ion", "aq", -205.0, -108.74, 146.4),
    "CO3(2-)(aq)": ThermodynamicSpecies("CO3(2-)(aq)", "Carbonate ion", "aq", -677.14, -527.81, -56.9),
    "HCO3-(aq)": ThermodynamicSpecies("HCO3-(aq)", "Bicarbonate ion", "aq", -691.99, -586.77, 91.2),
    "Ca(2+)(aq)": ThermodynamicSpecies("Ca(2+)(aq)", "Calcium ion", "aq", -542.83, -553.58, -53.1),
    "Mg(2+)(aq)": ThermodynamicSpecies("Mg(2+)(aq)", "Magnesium ion", "aq", -466.85, -454.8, -138.1),
    "Cu(2+)(aq)": ThermodynamicSpecies("Cu(2+)(aq)", "Copper(II) ion", "aq", 64.77, 65.52, -99.6),
    "Zn(2+)(aq)": ThermodynamicSpecies("Zn(2+)(aq)", "Zinc ion", "aq", -153.89, -147.06, -112.1),
    "Fe(2+)(aq)": ThermodynamicSpecies("Fe(2+)(aq)", "Iron(II) ion", "aq", -89.1, -78.9, -137.7),
    "Fe(3+)(aq)": ThermodynamicSpecies("Fe(3+)(aq)", "Iron(III) ion", "aq", -48.5, -4.7, -315.9),
}

class ThermoService:
    @staticmethod
    def get_species(formula_with_state: str) -> Optional[ThermodynamicSpecies]:
        """Lookup species, automatically matching default states if omitted."""
        key = formula_with_state.strip()
        if key in THERMO_DATABASE:
            return THERMO_DATABASE[key]

        # Try appending common states
        for state in ["(g)", "(l)", "(s)", "(aq)"]:
            candidate = f"{key}{state}"
            if candidate in THERMO_DATABASE:
                return THERMO_DATABASE[candidate]

        # Case-insensitive search
        lower_key = key.lower()
        for k, v in THERMO_DATABASE.items():
            if k.lower() == lower_key or k.lower().startswith(lower_key + "("):
                return v

        return None

    @staticmethod
    def list_all_species() -> List[ThermodynamicSpecies]:
        return list(THERMO_DATABASE.values())

    @staticmethod
    def calculate_reaction_thermo(
        reactants: List[Tuple[float, str]],  # (coefficient, formula)
        products: List[Tuple[float, str]],   # (coefficient, formula)
        temperature_kelvin: float = 298.15
    ) -> ReactionThermochemistryResult:
        """
        Calculate reaction standard enthalpy (ΔH°), entropy (ΔS°), and Gibbs free energy (ΔG°).
        ΔH°rxn = Σ (ν_p * ΔH_f°(products)) - Σ (ν_r * ΔH_f°(reactants))
        ΔS°rxn = Σ (ν_p * S°(products)) - Σ (ν_r * S°(reactants))
        ΔG°(T) = ΔH°rxn - T * ΔS°rxn
        """
        total_h_reactants = 0.0
        total_s_reactants = 0.0
        total_g_reactants = 0.0
        reactants_breakdown = []

        for coeff, formula in reactants:
            sp = ThermoService.get_species(formula)
            if not sp:
                raise ValueError(f"Thermodynamic reference data unavailable for reactant: '{formula}'.")
            h_contrib = coeff * sp.delta_h_f_kj_mol
            s_contrib = coeff * sp.s_molar_j_mol_k
            g_contrib = coeff * sp.delta_g_f_kj_mol
            total_h_reactants += h_contrib
            total_s_reactants += s_contrib
            total_g_reactants += g_contrib
            reactants_breakdown.append({
                "formula": sp.formula,
                "coefficient": coeff,
                "delta_h_f": sp.delta_h_f_kj_mol,
                "s_molar": sp.s_molar_j_mol_k,
                "delta_g_f": sp.delta_g_f_kj_mol
            })

        total_h_products = 0.0
        total_s_products = 0.0
        total_g_products = 0.0
        products_breakdown = []

        for coeff, formula in products:
            sp = ThermoService.get_species(formula)
            if not sp:
                raise ValueError(f"Thermodynamic reference data unavailable for product: '{formula}'.")
            h_contrib = coeff * sp.delta_h_f_kj_mol
            s_contrib = coeff * sp.s_molar_j_mol_k
            g_contrib = coeff * sp.delta_g_f_kj_mol
            total_h_products += h_contrib
            total_s_products += s_contrib
            total_g_products += g_contrib
            products_breakdown.append({
                "formula": sp.formula,
                "coefficient": coeff,
                "delta_h_f": sp.delta_h_f_kj_mol,
                "s_molar": sp.s_molar_j_mol_k,
                "delta_g_f": sp.delta_g_f_kj_mol
            })

        delta_h_rxn = total_h_products - total_h_reactants
        delta_s_rxn = total_s_products - total_s_reactants

        # Gibbs free energy at temperature T (kJ)
        # Note: delta_s is in J/(mol K), so divide by 1000 to convert to kJ/(mol K)
        delta_g_rxn = delta_h_rxn - (temperature_kelvin * (delta_s_rxn / 1000.0))

        is_exothermic = delta_h_rxn < 0
        is_spontaneous = delta_g_rxn < 0

        # Spontaneity condition analysis
        if delta_h_rxn < 0 and delta_s_rxn > 0:
            spontaneity_condition = "Spontaneous at all temperatures (ΔH < 0, ΔS > 0)"
        elif delta_h_rxn > 0 and delta_s_rxn < 0:
            spontaneity_condition = "Non-spontaneous at all temperatures (ΔH > 0, ΔS < 0)"
        elif delta_h_rxn < 0 and delta_s_rxn < 0:
            t_cross = (delta_h_rxn / (delta_s_rxn / 1000.0))
            spontaneity_condition = f"Spontaneous at low temperatures (T < {t_cross:.1f} K)"
        else:
            t_cross = (delta_h_rxn / (delta_s_rxn / 1000.0))
            spontaneity_condition = f"Spontaneous at high temperatures (T > {t_cross:.1f} K)"

        # Equilibrium constant K = exp(-ΔG° / RT)
        k_eq = None
        try:
            exponent = -(delta_g_rxn * 1000.0) / (GAS_CONSTANT_R * temperature_kelvin)
            if exponent > 700:
                k_eq = float("inf")
            elif exponent < -700:
                k_eq = 0.0
            else:
                k_eq = math.exp(exponent)
        except OverflowError:
            k_eq = float("inf") if delta_g_rxn < 0 else 0.0

        eq_reactants = " + ".join([f"{c if c != 1 else ''}{f}" for c, f in reactants])
        eq_products = " + ".join([f"{c if c != 1 else ''}{f}" for c, f in products])
        balanced_eq = f"{eq_reactants} -> {eq_products}"

        return ReactionThermochemistryResult(
            balanced_equation=balanced_eq,
            temperature_kelvin=temperature_kelvin,
            delta_h_standard_kj=round(delta_h_rxn, 2),
            delta_s_standard_j_k=round(delta_s_rxn, 2),
            delta_g_standard_kj=round(delta_g_rxn, 2),
            is_exothermic=is_exothermic,
            is_spontaneous=is_spontaneous,
            spontaneity_condition=spontaneity_condition,
            equilibrium_constant_k=k_eq,
            reactants_breakdown=reactants_breakdown,
            products_breakdown=products_breakdown
        )

    @staticmethod
    def parse_equation_components(equation: str) -> Tuple[List[Tuple[float, str]], List[Tuple[float, str]]]:
        """Parse '2 H2(g) + O2(g) -> 2 H2O(l)' into reactants and products lists."""
        delimiter = "->" if "->" in equation else ("=" if "=" in equation else "➔")
        if delimiter not in equation:
            raise ValueError("Equation must contain '->' separating reactants and products.")

        left, right = equation.split(delimiter, 1)

        def parse_side(side_str: str) -> List[Tuple[float, str]]:
            terms = [t.strip() for t in side_str.split("+") if t.strip()]
            parsed = []
            for term in terms:
                match = re.match(r"^(\d+(?:\.\d+)?)\s*(.+)$", term)
                if match:
                    coeff = float(match.group(1))
                    formula = match.group(2).strip()
                else:
                    coeff = 1.0
                    formula = term.strip()
                parsed.append((coeff, formula))
            return parsed

        return parse_side(left), parse_side(right)

    @staticmethod
    def solve_hess_law(
        target_equation: str,
        intermediate_reactions: List[Dict[str, any]] # [{'equation': str, 'delta_h_kj': float}]
    ) -> HessSolutionResult:
        """
        Solve Hess's Law using exact linear algebra (A * c = b).
        Finds multipliers c_j such that Σ c_j * Rxn_j = Target_Rxn,
        yielding ΔH_target = Σ c_j * ΔH_j.
        """
        target_reactants, target_products = ThermoService.parse_equation_components(target_equation)

        # Collect net stoichiometry: dict of species -> net coefficient (products positive, reactants negative)
        target_net: Dict[str, float] = {}
        for coeff, sp in target_reactants:
            target_net[sp] = target_net.get(sp, 0.0) - coeff
        for coeff, sp in target_products:
            target_net[sp] = target_net.get(sp, 0.0) + coeff

        intermediates_net: List[Dict[str, float]] = []
        intermediates_h: List[float] = []
        intermediates_eq: List[str] = []

        for item in intermediate_reactions:
            eq = item["equation"]
            dh = float(item["delta_h_kj"])
            r_list, p_list = ThermoService.parse_equation_components(eq)
            net_dict: Dict[str, float] = {}
            for coeff, sp in r_list:
                net_dict[sp] = net_dict.get(sp, 0.0) - coeff
            for coeff, sp in p_list:
                net_dict[sp] = net_dict.get(sp, 0.0) + coeff
            intermediates_net.append(net_dict)
            intermediates_h.append(dh)
            intermediates_eq.append(eq)

        # All distinct species
        all_species = sorted(list(set(
            list(target_net.keys()) +
            [sp for net in intermediates_net for sp in net.keys()]
        )))

        # Build matrix A (rows: species, cols: intermediate reactions)
        # Vector b (target coefficients)
        num_species = len(all_species)
        num_intermediates = len(intermediates_net)

        A = [[0.0 for _ in range(num_intermediates)] for _ in range(num_species)]
        b = [target_net.get(all_species[i], 0.0) for i in range(num_species)]

        for j, net in enumerate(intermediates_net):
            for i, sp in enumerate(all_species):
                A[i][j] = net.get(sp, 0.0)

        # Solve linear system using least-squares / normal equations (A^T * A) * c = A^T * b
        # or Gaussian elimination when square.
        # Let's compute AtA (num_intermediates x num_intermediates) and Atb (num_intermediates)
        AtA = [[0.0 for _ in range(num_intermediates)] for _ in range(num_intermediates)]
        Atb = [0.0 for _ in range(num_intermediates)]

        for i in range(num_intermediates):
            for j in range(num_intermediates):
                AtA[i][j] = sum(A[k][i] * A[k][j] for k in range(num_species))
            Atb[i] = sum(A[k][i] * b[k] for k in range(num_species))

        # Solve AtA * c = Atb using Gaussian elimination with partial pivoting
        n = num_intermediates
        augmented = [AtA[i] + [Atb[i]] for i in range(n)]

        solvable = True
        for col in range(n):
            # Pivot
            max_row = max(range(col, n), key=lambda r: abs(augmented[r][col]))
            if abs(augmented[max_row][col]) < 1e-9:
                solvable = False
                break
            augmented[col], augmented[max_row] = augmented[max_row], augmented[col]

            pivot = augmented[col][col]
            for c_idx in range(col, n + 1):
                augmented[col][c_idx] /= pivot

            for row in range(n):
                if row != col:
                    factor = augmented[row][col]
                    for c_idx in range(col, n + 1):
                        augmented[row][c_idx] -= factor * augmented[col][c_idx]

        if not solvable:
            return HessSolutionResult(
                target_equation=target_equation,
                target_delta_h_kj=0.0,
                steps=[],
                is_solvable=False,
                explanation="The provided intermediate reactions do not form a complete basis to synthesize the target reaction."
            )

        multipliers = [round(augmented[i][n], 4) for i in range(n)]

        # Verify residual ||A * c - b||
        residual = 0.0
        for i in range(num_species):
            calc_val = sum(A[i][j] * multipliers[j] for j in range(num_intermediates))
            residual += abs(calc_val - b[i])

        if residual > 1e-3:
            return HessSolutionResult(
                target_equation=target_equation,
                target_delta_h_kj=0.0,
                steps=[],
                is_solvable=False,
                explanation=f"Residual mismatch ({residual:.4f}): intermediate equations cannot balance all target stoichiometric components."
            )

        steps: List[HessStep] = []
        total_delta_h = 0.0

        for idx, mult in enumerate(multipliers):
            eff_dh = mult * intermediates_h[idx]
            total_delta_h += eff_dh
            steps.append(HessStep(
                equation=intermediates_eq[idx],
                original_delta_h_kj=intermediates_h[idx],
                multiplier=mult,
                effective_delta_h_kj=round(eff_dh, 2)
            ))

        explanation_lines = [
            f"Target Reaction: {target_equation}",
            f"Solved via Hess's Law summation of {len(steps)} intermediate step(s):"
        ]
        for idx, s in enumerate(steps, 1):
            action = "reversing and scaling" if s.multiplier < 0 else "scaling"
            explanation_lines.append(
                f"  Step {idx}: Multiply [{s.equation}] by {s.multiplier:+g} (ΔH = {s.effective_delta_h_kj:+.2f} kJ)"
            )
        explanation_lines.append(f"Resulting Target Enthalpy ΔH°rxn = {total_delta_h:+.2f} kJ")

        return HessSolutionResult(
            target_equation=target_equation,
            target_delta_h_kj=round(total_delta_h, 2),
            steps=steps,
            is_solvable=True,
            method="Gaussian Elimination (Normal Equations)",
            explanation="\n".join(explanation_lines)
        )
