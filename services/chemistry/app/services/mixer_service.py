"""
Deterministic Chemical Mixer and Aqueous Ionic Equilibrium Simulation Engine.
"""
import math
from typing import List, Dict, Tuple, Optional
from services.chemistry.app.models.mixer import (
    MixedReagentInput, PrecipitateProduct, GasProduct, MixerSimulationResult
)

# Reference Solubility Product Constants (Ksp at 298.15K) and Properties
PRECIPITATION_RULES = [
    {
        "cation": "Ag+",
        "anion": "Cl-",
        "formula": "AgCl(s)",
        "name": "Silver Chloride",
        "color": "Curdy white",
        "ksp": 1.77e-10,
        "molar_mass": 143.32,
        "stoich_c": 1,
        "stoich_a": 1,
        "description": "Forms a dense, curdy white precipitate that darkens upon prolonged exposure to light."
    },
    {
        "cation": "Ag+",
        "anion": "CrO4^2-",
        "formula": "Ag2CrO4(s)",
        "name": "Silver Chromate",
        "color": "Brick red",
        "ksp": 1.12e-12,
        "molar_mass": 331.73,
        "stoich_c": 2,
        "stoich_a": 1,
        "description": "Characteristic brick-red precipitate used as an end-point indicator in Mohr titrations."
    },
    {
        "cation": "Ba^2+",
        "anion": "SO4^2-",
        "formula": "BaSO4(s)",
        "name": "Barium Sulfate",
        "color": "Fine white",
        "ksp": 1.08e-10,
        "molar_mass": 233.39,
        "stoich_c": 1,
        "stoich_a": 1,
        "description": "Heavy white microcrystalline precipitate, insoluble in dilute acids."
    },
    {
        "cation": "Cu^2+",
        "anion": "OH-",
        "formula": "Cu(OH)2(s)",
        "name": "Copper(II) Hydroxide",
        "color": "Pale blue",
        "ksp": 2.20e-20,
        "molar_mass": 97.56,
        "stoich_c": 1,
        "stoich_a": 2,
        "description": "Pale sky-blue gelatinous precipitate that dehydrates to black CuO when heated."
    },
    {
        "cation": "Fe^3+",
        "anion": "OH-",
        "formula": "Fe(OH)3(s)",
        "name": "Iron(III) Hydroxide",
        "color": "Rust brown",
        "ksp": 2.79e-39,
        "molar_mass": 106.87,
        "stoich_c": 1,
        "stoich_a": 3,
        "description": "Dense reddish-brown flocculent precipitate."
    },
    {
        "cation": "Pb^2+",
        "anion": "I-",
        "formula": "PbI2(s)",
        "name": "Lead(II) Iodide",
        "color": "Bright golden yellow",
        "ksp": 9.80e-9,
        "molar_mass": 461.01,
        "stoich_c": 1,
        "stoich_a": 2,
        "description": "Brilliant golden-yellow crystalline flakes ('golden rain' effect)."
    },
    {
        "cation": "Ca^2+",
        "anion": "CO3^2-",
        "formula": "CaCO3(s)",
        "name": "Calcium Carbonate",
        "color": "Chalky white",
        "ksp": 3.36e-9,
        "molar_mass": 100.09,
        "stoich_c": 1,
        "stoich_a": 1,
        "description": "Chalky white precipitate forming cloudy suspension."
    }
]

# Dissociation catalog for common reagents
IONIC_DISSOCIATION: Dict[str, Dict[str, int]] = {
    "hcl": {"H+": 1, "Cl-": 1},
    "naoh": {"Na+": 1, "OH-": 1},
    "koh": {"K+": 1, "OH-": 1},
    "hno3": {"H+": 1, "NO3-": 1},
    "h2so4": {"H+": 2, "SO4^2-": 1},
    "agno3": {"Ag+": 1, "NO3-": 1},
    "k2cro4": {"K+": 2, "CrO4^2-": 1},
    "cuso4": {"Cu^2+": 1, "SO4^2-": 1},
    "bacl2": {"Ba^2+": 1, "Cl-": 2},
    "nacl": {"Na+": 1, "Cl-": 1},
    "na2co3": {"Na+": 2, "CO3^2-": 1},
    "nahco3": {"Na+": 1, "HCO3-": 1},
    "ki": {"K+": 1, "I-": 1},
    "pb(no3)2": {"Pb^2+": 1, "NO3-": 2},
    "cacl2": {"Ca^2+": 1, "Cl-": 2},
    "fecl3": {"Fe^3+": 1, "Cl-": 3},
    "nh3": {"NH4+": 1, "OH-": 1}, # Weak base representation
    "ch3cooh": {"H+": 1, "CH3COO-": 1}
}

class ChemicalMixerService:
    @staticmethod
    def normalize_formula(formula: str) -> str:
        f = formula.lower().replace("(aq)", "").replace("(s)", "").replace("(l)", "").replace(" ", "").strip()
        return f

    def simulate_mixture(self, reagents: List[MixedReagentInput]) -> MixerSimulationResult:
        if not reagents:
            return MixerSimulationResult(
                total_volume_ml=0.0,
                final_ph=7.0,
                final_temperature_c=25.0,
                delta_temperature_c=0.0,
                is_exothermic=False,
                is_endothermic=False,
                precipitates=[],
                gases=[],
                safety_warnings=["No reagents selected."],
                chemical_explanation="Empty reaction vessel."
            )

        total_volume_ml = sum(r.volume_ml for r in reagents)
        total_volume_liters = total_volume_ml / 1000.0
        avg_initial_temp = sum(r.temperature_c * r.volume_ml for r in reagents) / total_volume_ml

        # Track total moles of each aqueous ion
        ion_moles: Dict[str, float] = {}

        for r in reagents:
            norm = self.normalize_formula(r.formula)
            vol_l = r.volume_ml / 1000.0
            reagent_moles = r.concentration_m * vol_l

            if norm in IONIC_DISSOCIATION:
                for ion, coeff in IONIC_DISSOCIATION[norm].items():
                    ion_moles[ion] = ion_moles.get(ion, 0.0) + (reagent_moles * coeff)
            else:
                # If formula not in catalog, check if H+ or OH- can be derived from initial_ph
                if r.initial_ph is not None:
                    if r.initial_ph < 7.0:
                        h_conc = 10 ** (-r.initial_ph)
                        ion_moles["H+"] = ion_moles.get("H+", 0.0) + (h_conc * vol_l)
                    elif r.initial_ph > 7.0:
                        oh_conc = 10 ** (-(14.0 - r.initial_ph))
                        ion_moles["OH-"] = ion_moles.get("OH-", 0.0) + (oh_conc * vol_l)

        # 1. Acid-Base Neutralization & Enthalpy
        moles_h = ion_moles.get("H+", 0.0)
        moles_oh = ion_moles.get("OH-", 0.0)
        moles_neutralized = min(moles_h, moles_oh)

        ion_moles["H+"] = max(0.0, moles_h - moles_neutralized)
        ion_moles["OH-"] = max(0.0, moles_oh - moles_neutralized)

        # Enthalpy of neutralization: Delta H = -55.84 kJ/mol
        heat_joules = moles_neutralized * 55840.0
        solution_mass_g = total_volume_ml * 1.0 # approx 1 g/mL
        c_p = 4.184 # J/(g * K)
        delta_temp_c = heat_joules / (solution_mass_g * c_p) if solution_mass_g > 0 else 0.0
        final_temp_c = avg_initial_temp + delta_temp_c

        # Calculate true equilibrium pH
        if total_volume_liters > 0:
            if ion_moles["H+"] > 1e-12:
                final_h_conc = ion_moles["H+"] / total_volume_liters
                final_ph = max(0.0, min(14.0, -math.log10(final_h_conc)))
            elif ion_moles["OH-"] > 1e-12:
                final_oh_conc = ion_moles["OH-"] / total_volume_liters
                poh = -math.log10(final_oh_conc)
                final_ph = max(0.0, min(14.0, 14.0 - poh))
            else:
                final_ph = 7.0
        else:
            final_ph = 7.0

        final_ph = round(final_ph, 2)
        delta_temp_c = round(delta_temp_c, 2)
        final_temp_c = round(final_temp_c, 2)

        # 2. Gas Generation (Carbonates/Bicarbonates + Acid)
        gases: List[GasProduct] = []
        moles_co3 = ion_moles.get("CO3^2-", 0.0) + ion_moles.get("HCO3-", 0.0)
        if moles_co3 > 0 and moles_h > 0:
            # H+ reacts with CO3^2- to form CO2(g)
            moles_co2 = min(moles_co3, moles_h / 2.0 if "CO3^2-" in ion_moles else moles_h)
            if moles_co2 > 1e-5:
                vol_co2_stp = round(moles_co2 * 22.414, 3)
                gases.append(GasProduct(
                    formula="CO2(g)",
                    name="Carbon Dioxide Gas",
                    volume_liters_stp=vol_co2_stp,
                    odor="Odorless, vigorous effervescence",
                    hazard="Asphyxiant in enclosed spaces at high concentrations"
                ))

        # 3. Precipitation Evaluation (Ion Product Q vs Ksp)
        precipitates: List[PrecipitateProduct] = []
        reactions_noted: List[str] = []

        for rule in PRECIPITATION_RULES:
            cat = rule["cation"]
            an = rule["anion"]
            if cat in ion_moles and an in ion_moles:
                c_moles = ion_moles[cat]
                a_moles = ion_moles[an]

                c_conc = c_moles / total_volume_liters
                a_conc = a_moles / total_volume_liters

                q_sp = (c_conc ** rule["stoich_c"]) * (a_conc ** rule["stoich_a"])
                if q_sp > rule["ksp"]:
                    # Precipitation occurs
                    stoich_c = rule["stoich_c"]
                    stoich_a = rule["stoich_a"]

                    limiting_moles = min(c_moles / stoich_c, a_moles / stoich_a)
                    mass_precipitate_g = round(limiting_moles * rule["molar_mass"], 4)

                    if mass_precipitate_g > 0:
                        precipitates.append(PrecipitateProduct(
                            formula=rule["formula"],
                            name=rule["name"],
                            color=rule["color"],
                            ksp=rule["ksp"],
                            mass_precipitated_g=mass_precipitate_g,
                            description=rule["description"]
                        ))
                        reactions_noted.append(f"{cat} + {an} -> {rule['formula']}")

                        # Consume ions
                        ion_moles[cat] -= limiting_moles * stoich_c
                        ion_moles[an] -= limiting_moles * stoich_a

        # 4. Net Ionic and Balanced Equations
        net_ionic_parts = []
        if moles_neutralized > 1e-4:
            net_ionic_parts.append("H+(aq) + OH-(aq) -> H2O(l)")
        for r_str in reactions_noted:
            net_ionic_parts.append(r_str)
        if gases:
            net_ionic_parts.append("CO3^2-(aq) + 2H+(aq) -> H2O(l) + CO2(g)")

        net_ionic_equation = " ; ".join(net_ionic_parts) if net_ionic_parts else "No significant net ionic precipitation or neutralization."

        # 5. Safety Warnings
        safety_warnings: List[str] = []
        if final_ph < 2.0:
            safety_warnings.append("STRONG ACID WARNING (pH < 2): Highly corrosive to skin, clothing, and mucous membranes. Use acid-resistant gloves.")
        elif final_ph > 12.0:
            safety_warnings.append("STRONG BASE WARNING (pH > 12): Severe caustic chemical burn hazard. Causes rapid saponification of tissue.")

        if delta_temp_c >= 5.0:
            safety_warnings.append(f"EXOTHERMIC HEAT RELEASE: Significant thermal rise observed (+{delta_temp_c} °C). Caution against thermal shock and boiling.")

        if any("Bleach" in r.name or "Hypochlorite" in r.name for r in reagents) and any("Acid" in r.name or "HCl" in r.formula for r in reagents):
            safety_warnings.append("HAZARD WARNING: NEVER mix bleach with acid — produces toxic chlorine gas (Cl2).")

        # 6. Chemical Explanation
        explanation_lines = [
            f"Combined {len(reagents)} chemical species totaling {total_volume_ml:.1f} mL.",
            f"Equilibrium ionic calculations result in a measured solution pH of {final_ph}."
        ]
        if moles_neutralized > 0:
            explanation_lines.append(f"Acid-base neutralization consumed {moles_neutralized*1000:.2f} mmol of hydronium and hydroxide, yielding a temperature shift of +{delta_temp_c} °C.")
        if precipitates:
            p_names = ", ".join(f"{p.name} ({p.mass_precipitated_g:.3f} g)" for p in precipitates)
            explanation_lines.append(f"Insoluble phase separation detected: {p_names}.")
        if gases:
            g_names = ", ".join(f"{g.name} ({g.volume_liters_stp} L)" for g in gases)
            explanation_lines.append(f"Effervescence detected releasing {g_names}.")

        aqueous_remaining = {k: round(v / total_volume_liters, 4) for k, v in ion_moles.items() if v > 1e-6}

        return MixerSimulationResult(
            total_volume_ml=round(total_volume_ml, 1),
            final_ph=final_ph,
            final_temperature_c=final_temp_c,
            delta_temperature_c=delta_temp_c,
            is_exothermic=delta_temp_c > 0.1,
            is_endothermic=delta_temp_c < -0.1,
            precipitates=precipitates,
            gases=gases,
            net_ionic_equation=net_ionic_equation,
            safety_warnings=safety_warnings,
            chemical_explanation=" ".join(explanation_lines),
            aqueous_ions_remaining=aqueous_remaining
        )

mixer_service = ChemicalMixerService()
