"""
Electrochemistry, Galvanic Cell, and Nernst Equation Calculation Service.
Provides standard reduction potential database, Nernst equation potential evaluation,
spontaneity determination, equilibrium constant derivation, and Faraday electrolysis solvers.
"""
import math
from typing import Dict, List, Optional
from services.chemistry.app.models.electrochemistry import (
    StandardReductionPotential,
    GalvanicCellResult,
    ElectrolysisResult,
)

# Faraday Constant (Coulombs per mole of electrons)
FARADAY_CONSTANT_F = 96485.33212  # C / mol e-
GAS_CONSTANT_R = 8.314462618      # J / (mol * K)
MOLAR_GAS_VOLUME_STP = 22.413962  # L / mol at STP (0 °C, 1 atm)

# Vetted Standard Reduction Potentials at 298.15 K (vs Standard Hydrogen Electrode, SHE)
# Reference: CRC Handbook of Chemistry and Physics & IUPAC Gold Book
REDUCTION_POTENTIALS_TABLE: List[StandardReductionPotential] = [
    StandardReductionPotential("F2(g) + 2e- -> 2F-(aq)", "F2", "F-", 2, +2.87, "aq", "Elemental Fluorine reduction"),
    StandardReductionPotential("O3(g) + 2H+(aq) + 2e- -> O2(g) + H2O(l)", "O3", "O2", 2, +2.075, "g", "Ozone acidic reduction"),
    StandardReductionPotential("S2O8(2-)(aq) + 2e- -> 2SO4(2-)(aq)", "S2O8(2-)", "SO4(2-)", 2, +2.01, "aq", "Persulfate reduction"),
    StandardReductionPotential("H2O2(aq) + 2H+(aq) + 2e- -> 2H2O(l)", "H2O2", "H2O", 2, +1.776, "aq", "Hydrogen peroxide acidic reduction"),
    StandardReductionPotential("MnO4-(aq) + 8H+(aq) + 5e- -> Mn(2+)(aq) + 4H2O(l)", "MnO4-", "Mn(2+)", 5, +1.51, "aq", "Permanganate acidic reduction"),
    StandardReductionPotential("Au(3+)(aq) + 3e- -> Au(s)", "Au(3+)", "Au", 3, +1.498, "aq", "Gold(III) reduction"),
    StandardReductionPotential("PbO2(s) + 4H+(aq) + SO4(2-)(aq) + 2e- -> PbSO4(s) + 2H2O(l)", "PbO2", "PbSO4", 2, +1.691, "s", "Lead-acid battery cathode"),
    StandardReductionPotential("Cl2(g) + 2e- -> 2Cl-(aq)", "Cl2", "Cl-", 2, +1.358, "g", "Chlorine gas reduction"),
    StandardReductionPotential("Cr2O7(2-)(aq) + 14H+(aq) + 6e- -> 2Cr(3+)(aq) + 7H2O(l)", "Cr2O7(2-)", "Cr(3+)", 6, +1.33, "aq", "Dichromate acidic reduction"),
    StandardReductionPotential("O2(g) + 4H+(aq) + 4e- -> 2H2O(l)", "O2", "H2O", 4, +1.229, "g", "Oxygen reduction in acid"),
    StandardReductionPotential("Br2(l) + 2e- -> 2Br-(aq)", "Br2", "Br-", 2, +1.066, "l", "Bromine liquid reduction"),
    StandardReductionPotential("NO3-(aq) + 4H+(aq) + 3e- -> NO(g) + 2H2O(l)", "NO3-", "NO", 3, +0.96, "aq", "Nitrate acidic reduction"),
    StandardReductionPotential("Ag+(aq) + e- -> Ag(s)", "Ag+", "Ag", 1, +0.7996, "aq", "Silver(I) reduction"),
    StandardReductionPotential("Fe(3+)(aq) + e- -> Fe(2+)(aq)", "Fe(3+)", "Fe(2+)", 1, +0.771, "aq", "Iron(III) to Iron(II) reduction"),
    StandardReductionPotential("I2(s) + 2e- -> 2I-(aq)", "I2", "I-", 2, +0.5355, "s", "Iodine solid reduction"),
    StandardReductionPotential("O2(g) + 2H2O(l) + 4e- -> 4OH-(aq)", "O2", "OH-", 4, +0.401, "g", "Oxygen reduction in alkaline solution"),
    StandardReductionPotential("Cu(2+)(aq) + 2e- -> Cu(s)", "Cu(2+)", "Cu", 2, +0.3419, "aq", "Copper(II) reduction (Daniell cell cathode)"),
    StandardReductionPotential("AgCl(s) + e- -> Ag(s) + Cl-(aq)", "AgCl", "Ag", 1, +0.2223, "s", "Silver-silver chloride reference"),
    StandardReductionPotential("Cu(2+)(aq) + e- -> Cu+(aq)", "Cu(2+)", "Cu+", 1, +0.153, "aq", "Copper(II) to Copper(I) reduction"),
    StandardReductionPotential("Sn(4+)(aq) + 2e- -> Sn(2+)(aq)", "Sn(4+)", "Sn(2+)", 2, +0.151, "aq", "Tin(IV) to Tin(II) reduction"),
    # Standard Hydrogen Electrode (SHE Reference = 0.000 V)
    StandardReductionPotential("2H+(aq) + 2e- -> H2(g)", "H+", "H2", 2, 0.0000, "aq", "Standard Hydrogen Electrode reference (SHE)"),
    StandardReductionPotential("Pb(2+)(aq) + 2e- -> Pb(s)", "Pb(2+)", "Pb", 2, -0.1262, "aq", "Lead(II) reduction"),
    StandardReductionPotential("Sn(2+)(aq) + 2e- -> Sn(s)", "Sn(2+)", "Sn", 2, -0.1375, "aq", "Tin(II) reduction"),
    StandardReductionPotential("Ni(2+)(aq) + 2e- -> Ni(s)", "Ni(2+)", "Ni", 2, -0.257, "aq", "Nickel(II) reduction"),
    StandardReductionPotential("Co(2+)(aq) + 2e- -> Co(s)", "Co(2+)", "Co", 2, -0.28, "aq", "Cobalt(II) reduction"),
    StandardReductionPotential("Cd(2+)(aq) + 2e- -> Cd(s)", "Cd(2+)", "Cd", 2, -0.403, "aq", "Cadmium(II) reduction"),
    StandardReductionPotential("Fe(2+)(aq) + 2e- -> Fe(s)", "Fe(2+)", "Fe", 2, -0.447, "aq", "Iron(II) reduction"),
    StandardReductionPotential("Cr(3+)(aq) + 3e- -> Cr(s)", "Cr(3+)", "Cr", 3, -0.744, "aq", "Chromium(III) reduction"),
    StandardReductionPotential("Zn(2+)(aq) + 2e- -> Zn(s)", "Zn(2+)", "Zn", 2, -0.7618, "aq", "Zinc(II) reduction (Daniell cell anode)"),
    StandardReductionPotential("Cr(2+)(aq) + 2e- -> Cr(s)", "Cr(2+)", "Cr", 2, -0.913, "aq", "Chromium(II) reduction"),
    StandardReductionPotential("Mn(2+)(aq) + 2e- -> Mn(s)", "Mn(2+)", "Mn", 2, -1.185, "aq", "Manganese(II) reduction"),
    StandardReductionPotential("Al(3+)(aq) + 3e- -> Al(s)", "Al(3+)", "Al", 3, -1.662, "aq", "Aluminum(III) reduction"),
    StandardReductionPotential("Mg(2+)(aq) + 2e- -> Mg(s)", "Mg(2+)", "Mg", 2, -2.372, "aq", "Magnesium(II) reduction"),
    StandardReductionPotential("Na+(aq) + e- -> Na(s)", "Na+", "Na", 1, -2.71, "aq", "Sodium(I) reduction"),
    StandardReductionPotential("Ca(2+)(aq) + 2e- -> Ca(s)", "Ca(2+)", "Ca", 2, -2.868, "aq", "Calcium(II) reduction"),
    StandardReductionPotential("K+(aq) + e- -> K(s)", "K+", "K", 1, -2.931, "aq", "Potassium(I) reduction"),
    StandardReductionPotential("Li+(aq) + e- -> Li(s)", "Li+", "Li", 1, -3.0401, "aq", "Lithium(I) reduction"),
]

# Lookup dictionary by oxidized species and oxidized/reduced pairs
_REDUCTION_MAP: Dict[str, StandardReductionPotential] = {}
for p in REDUCTION_POTENTIALS_TABLE:
    full_pair = f"{p.oxidized_species}/{p.reduced_species}".lower()
    _REDUCTION_MAP[full_pair] = p
    key = p.oxidized_species.lower()
    # Prioritize reduction to neutral state (e.g. Cu(2+) -> Cu over Cu(2+) -> Cu+)
    is_neutral = not ("+" in p.reduced_species or "-" in p.reduced_species)
    if key not in _REDUCTION_MAP or is_neutral:
        _REDUCTION_MAP[key] = p

class ElectrochemistryService:
    @staticmethod
    def list_reduction_potentials() -> List[StandardReductionPotential]:
        """Return the complete vetted electrochemical series sorted by potential descending."""
        return sorted(REDUCTION_POTENTIALS_TABLE, key=lambda x: x.potential_volts, reverse=True)

    @staticmethod
    def find_half_reaction(species_query: str) -> Optional[StandardReductionPotential]:
        """Find half-reaction by chemical formula or oxidized ion."""
        normalized = species_query.strip().lower()
        if normalized in _REDUCTION_MAP:
            return _REDUCTION_MAP[normalized]

        # Search inside half-reaction string
        for item in REDUCTION_POTENTIALS_TABLE:
            if (normalized in item.oxidized_species.lower() or
                normalized in item.reduced_species.lower() or
                normalized in item.half_reaction_str.lower()):
                return item
        return None

    @staticmethod
    def calculate_galvanic_cell(
        cathode_species: str,
        anode_species: str,
        cathode_molarity: float = 1.0,
        anode_molarity: float = 1.0,
        temperature_kelvin: float = 298.15
    ) -> GalvanicCellResult:
        """
        Compute standard and non-standard cell potential using Nernst Equation.
        Standard Cell Potential: E°cell = E°cathode - E°anode
        Nernst Equation: Ecell = E°cell - (RT / nF) * ln(Q)
        Gibbs Free Energy: ΔG° = -n * F * E°cell
        Equilibrium Constant: K = exp(n * F * E°cell / (R * T))
        """
        cathode_hr = ElectrochemistryService.find_half_reaction(cathode_species)
        anode_hr = ElectrochemistryService.find_half_reaction(anode_species)

        if not cathode_hr:
            raise ValueError(f"Could not find reduction half-reaction for cathode candidate: '{cathode_species}'")
        if not anode_hr:
            raise ValueError(f"Could not find reduction half-reaction for anode candidate: '{anode_species}'")

        if cathode_molarity <= 0 or anode_molarity <= 0:
            raise ValueError("Species molar concentrations must be strictly positive.")

        e_cathode = cathode_hr.potential_volts
        e_anode = anode_hr.potential_volts
        e_cell_standard = e_cathode - e_anode

        # Balance electrons transferred: n = lcm(n_cathode, n_anode)
        n_c = cathode_hr.electrons
        n_a = anode_hr.electrons
        gcd = math.gcd(n_c, n_a)
        n_transferred = (n_c * n_a) // gcd

        mult_cathode = n_transferred // n_c
        mult_anode = n_transferred // n_a

        # Overall reaction components:
        # Anode is oxidized: reduced_species -> oxidized_species + n_a e-
        # Cathode is reduced: oxidized_species + n_c e- -> reduced_species
        anode_ox = f"{mult_anode if mult_anode != 1 else ''}{anode_hr.reduced_species}"
        cathode_red = f"{mult_cathode if mult_cathode != 1 else ''}{cathode_hr.oxidized_species}"
        anode_prod = f"{mult_anode if mult_anode != 1 else ''}{anode_hr.oxidized_species}"
        cathode_prod = f"{mult_cathode if mult_cathode != 1 else ''}{cathode_hr.reduced_species}"

        overall_rxn = f"{anode_ox} + {cathode_red} -> {anode_prod} + {cathode_prod}"

        # Standard cell notation: Anode(s) | Anode_ion(aq) || Cathode_ion(aq) | Cathode(s)
        cell_notation = (
            f"{anode_hr.reduced_species}(s) | {anode_hr.oxidized_species}(aq, {anode_molarity} M) || "
            f"{cathode_hr.oxidized_species}(aq, {cathode_molarity} M) | {cathode_hr.reduced_species}(s)"
        )

        # Reaction Quotient Q = [Anode_ion]^mult_anode / [Cathode_ion]^mult_cathode
        q = (anode_molarity ** mult_anode) / (cathode_molarity ** mult_cathode)

        # Nernst correction term: (R * T / (n * F)) * ln(Q)
        rt_over_nf = (GAS_CONSTANT_R * temperature_kelvin) / (n_transferred * FARADAY_CONSTANT_F)
        nernst_correction = rt_over_nf * math.log(q) if q > 0 else 0.0

        e_cell = e_cell_standard - nernst_correction

        # Standard Gibbs Free Energy ΔG° = -n * F * E° (kJ)
        delta_g_kj = -(n_transferred * FARADAY_CONSTANT_F * e_cell_standard) / 1000.0

        # Equilibrium constant K = exp(n * F * E° / (R * T))
        exponent = (n_transferred * FARADAY_CONSTANT_F * e_cell_standard) / (GAS_CONSTANT_R * temperature_kelvin)
        try:
            if exponent > 700:
                k_eq = float("inf")
            elif exponent < -700:
                k_eq = 0.0
            else:
                k_eq = math.exp(exponent)
        except OverflowError:
            k_eq = float("inf") if e_cell_standard > 0 else 0.0

        is_spontaneous = e_cell > 0

        return GalvanicCellResult(
            anode_half_reaction=anode_hr.half_reaction_str,
            cathode_half_reaction=cathode_hr.half_reaction_str,
            overall_reaction=overall_rxn,
            cell_notation=cell_notation,
            electrons_transferred_n=n_transferred,
            standard_potential_volts=round(e_cell_standard, 4),
            cell_potential_volts=round(e_cell, 4),
            reaction_quotient_q=round(q, 6),
            standard_gibbs_free_energy_kj=round(delta_g_kj, 2),
            equilibrium_constant_k=k_eq,
            is_spontaneous=is_spontaneous,
            temperature_kelvin=temperature_kelvin,
            nernst_correction_volts=round(nernst_correction, 4)
        )

    @staticmethod
    def calculate_electrolysis(
        species: str,
        molar_mass_g_mol: float,
        electrons_per_ion_n: int,
        current_amperes: float,
        time_seconds: float
    ) -> ElectrolysisResult:
        """
        Calculate electrodeposition / electrolysis using Faraday's Laws.
        Q = I * t
        Moles of electrons = Q / F
        Moles of substance = (I * t) / (n * F)
        Mass deposited = moles * MolarMass
        """
        if current_amperes <= 0 or time_seconds <= 0 or electrons_per_ion_n <= 0 or molar_mass_g_mol <= 0:
            raise ValueError("Current, time, electrons transferred, and molar mass must all be positive values.")

        total_charge_c = current_amperes * time_seconds
        moles_electrons = total_charge_c / FARADAY_CONSTANT_F
        moles_substance = moles_electrons / electrons_per_ion_n
        mass_deposited_g = moles_substance * molar_mass_g_mol

        # Check if evolved product is a common gas at STP (e.g. H2, O2, Cl2)
        gas_volume_stp = None
        normalized = species.strip().lower()
        if normalized in ["h2", "hydrogen", "o2", "oxygen", "cl2", "chlorine", "f2", "fluorine"]:
            gas_volume_stp = moles_substance * MOLAR_GAS_VOLUME_STP

        return ElectrolysisResult(
            species_deposited=species,
            molar_mass_g_mol=molar_mass_g_mol,
            electrons_per_ion_n=electrons_per_ion_n,
            current_amperes=current_amperes,
            time_seconds=time_seconds,
            total_charge_coulombs=round(total_charge_c, 2),
            moles_electrons=round(moles_electrons, 6),
            moles_substance=round(moles_substance, 6),
            mass_deposited_grams=round(mass_deposited_g, 4),
            gas_volume_liters_stp=round(gas_volume_stp, 4) if gas_volume_stp is not None else None
        )
