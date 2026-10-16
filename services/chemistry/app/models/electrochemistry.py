"""
Electrochemistry and Nernst Equation Domain Models.
"""
from dataclasses import dataclass, field
from typing import Dict, List, Optional

@dataclass
class StandardReductionPotential:
    """Standard reduction half-reaction and potential at 298.15 K vs SHE."""
    half_reaction_str: str
    oxidized_species: str
    reduced_species: str
    electrons: int
    potential_volts: float
    state: str = "aq"
    description: str = ""

@dataclass
class GalvanicCellResult:
    """Complete electrochemical cell calculation under standard and non-standard conditions."""
    anode_half_reaction: str
    cathode_half_reaction: str
    overall_reaction: str
    cell_notation: str                 # e.g., Zn(s) | Zn2+(aq, 0.1M) || Cu2+(aq, 1.0M) | Cu(s)
    electrons_transferred_n: int
    standard_potential_volts: float    # E°cell = E°cathode - E°anode
    cell_potential_volts: float        # Ecell (via Nernst equation)
    reaction_quotient_q: float
    standard_gibbs_free_energy_kj: float  # ΔG° = -nFE°
    equilibrium_constant_k: float         # K = 10^(nE° / 0.05916)
    is_spontaneous: bool
    temperature_kelvin: float = 298.15
    nernst_correction_volts: float = 0.0

@dataclass
class ElectrolysisResult:
    """Faraday's Law of Electrolysis calculations."""
    species_deposited: str
    molar_mass_g_mol: float
    electrons_per_ion_n: int
    current_amperes: float
    time_seconds: float
    total_charge_coulombs: float       # Q = I * t
    moles_electrons: float             # n_e = Q / F
    moles_substance: float
    mass_deposited_grams: float        # m = (I * t * M) / (n * F)
    gas_volume_liters_stp: Optional[float] = None  # If species is a gas (e.g. H2, O2, Cl2)
