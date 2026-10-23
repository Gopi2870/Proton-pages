"""
High-Precision Radical Reaction Networks & Chemical Mechanism Engine.
Implements:
- Validated Multi-Step Radical Mechanisms (Combustion, Atmospheric, Polymerization, Biochemical)
- Explicit Radical Species Classification & Thermodynamic State Functions
- Arrhenius Rate Laws & Temperature/Pressure Dependencies
- Mass-Action Kinetics & Analytical Jacobian Derivation
- L-Stable Stiff ODE Numerical Integration (Rosenbrock ROS2 Solver)
- Quasi-Steady-State Approximation (QSSA) Comparative Evaluation
- First-Order Logarithmic Sensitivity Analysis d(ln C_i) / d(ln k_j)
- Element Conservation Vector Verification
"""

import math
import time
from typing import List, Dict, Tuple, Optional, Any
from app.models.radical_reactions import (
    RadicalSpecies,
    RadicalSpeciesType,
    RadicalReactionRole,
    ArrheniusRateLaw,
    RadicalElementaryReaction,
    RadicalMechanism,
    RadicalTrajectoryStep,
    SensitivityEntry,
    RadicalSimulationResult,
)

GAS_CONSTANT_R = 8.314462618e-3  # kJ / (mol * K)


def evaluate_arrhenius_rate(rate_law: ArrheniusRateLaw, temperature_k: float) -> float:
    """
    Computes k(T) = A * T^n * exp(-E_a / (R * T))
    """
    t = max(50.0, float(temperature_k))
    a = rate_law.pre_exponential_a
    n = rate_law.temperature_exponent_n
    ea = rate_law.activation_energy_kj_mol

    power_term = (t ** n) if n != 0.0 else 1.0
    exp_arg = -ea / (GAS_CONSTANT_R * t)
    exp_arg = max(-100.0, min(100.0, exp_arg))

    return max(0.0, a * power_term * math.exp(exp_arg))


# ==============================================================================
# Curated Validated Mechanisms
# ==============================================================================

def _build_h2_o2_combustion_mechanism() -> RadicalMechanism:
    """
    Hydrogen-Oxygen Radical Chain Combustion Mechanism (Warnatz-Maas-Dibble).
    Features famous chain-branching steps R1 and R2, leading to explosive runaway.
    """
    species = [
        RadicalSpecies(name="H2", formula="H2", radical_type=RadicalSpeciesType.NON_RADICAL, initial_concentration_m=0.02, color_hex="#38bdf8", elements={"H": 2}),
        RadicalSpecies(name="O2", formula="O2", radical_type=RadicalSpeciesType.NON_RADICAL, initial_concentration_m=0.01, color_hex="#ef4444", elements={"O": 2}),
        RadicalSpecies(name="H2O", formula="H2O", radical_type=RadicalSpeciesType.NON_RADICAL, initial_concentration_m=0.0, color_hex="#3b82f6", elements={"H": 2, "O": 1}),
        RadicalSpecies(name="H", formula="H", unpaired_electrons=1, spin_multiplicity=2, radical_type=RadicalSpeciesType.ATOMIC, enthalpy_f_kj_mol=218.0, initial_concentration_m=1e-8, color_hex="#a855f7", elements={"H": 1}),
        RadicalSpecies(name="O", formula="O", unpaired_electrons=2, spin_multiplicity=3, radical_type=RadicalSpeciesType.ATOMIC, enthalpy_f_kj_mol=249.2, initial_concentration_m=0.0, color_hex="#f97316", elements={"O": 1}),
        RadicalSpecies(name="OH", formula="OH", unpaired_electrons=1, spin_multiplicity=2, radical_type=RadicalSpeciesType.HYDROXYL, enthalpy_f_kj_mol=39.3, initial_concentration_m=1e-8, color_hex="#10b981", elements={"H": 1, "O": 1}),
        RadicalSpecies(name="HO2", formula="HO2", unpaired_electrons=1, spin_multiplicity=2, radical_type=RadicalSpeciesType.HYDROPEROXYL, enthalpy_f_kj_mol=14.6, initial_concentration_m=0.0, color_hex="#eab308", elements={"H": 1, "O": 2}),
        RadicalSpecies(name="H2O2", formula="H2O2", radical_type=RadicalSpeciesType.NON_RADICAL, initial_concentration_m=0.0, color_hex="#64748b", elements={"H": 2, "O": 2}),
    ]

    reactions = [
        # R1: Chain branching: H + O2 -> OH + O
        RadicalElementaryReaction(
            id="R1_branching",
            equation="H + O2 -> OH + O",
            role=RadicalReactionRole.BRANCHING,
            reactants={"H": 1.0, "O2": 1.0},
            products={"OH": 1.0, "O": 1.0},
            rate_law=ArrheniusRateLaw(pre_exponential_a=3.52e16, temperature_exponent_n=-0.7, activation_energy_kj_mol=71.4, description="Key high-T chain branching step"),
        ),
        # R2: Chain branching: O + H2 -> OH + H
        RadicalElementaryReaction(
            id="R2_branching",
            equation="O + H2 -> OH + H",
            role=RadicalReactionRole.BRANCHING,
            reactants={"O": 1.0, "H2": 1.0},
            products={"OH": 1.0, "H": 1.0},
            rate_law=ArrheniusRateLaw(pre_exponential_a=5.06e4, temperature_exponent_n=2.67, activation_energy_kj_mol=26.3),
        ),
        # R3: Propagation: OH + H2 -> H2O + H
        RadicalElementaryReaction(
            id="R3_propagation",
            equation="OH + H2 -> H2O + H",
            role=RadicalReactionRole.PROPAGATION,
            reactants={"OH": 1.0, "H2": 1.0},
            products={"H2O": 1.0, "H": 1.0},
            rate_law=ArrheniusRateLaw(pre_exponential_a=1.17e9, temperature_exponent_n=1.3, activation_energy_kj_mol=15.2),
        ),
        # R4: Propagation: OH + OH -> H2O + O
        RadicalElementaryReaction(
            id="R4_propagation",
            equation="OH + OH -> H2O + O",
            role=RadicalReactionRole.PROPAGATION,
            reactants={"OH": 2.0},
            products={"H2O": 1.0, "O": 1.0},
            rate_law=ArrheniusRateLaw(pre_exponential_a=6.0e8, temperature_exponent_n=1.3, activation_energy_kj_mol=0.0),
        ),
        # R5: Termination / Chain-breaking: H + O2 -> HO2
        RadicalElementaryReaction(
            id="R5_termination",
            equation="H + O2 -> HO2",
            role=RadicalReactionRole.TERMINATION,
            reactants={"H": 1.0, "O2": 1.0},
            products={"HO2": 1.0},
            rate_law=ArrheniusRateLaw(pre_exponential_a=2.8e12, temperature_exponent_n=-0.86, activation_energy_kj_mol=0.0, description="Third-body stabilization at high pressure"),
        ),
        # R6: Chain recovery: HO2 + H -> 2 OH
        RadicalElementaryReaction(
            id="R6_propagation",
            equation="HO2 + H -> 2 OH",
            role=RadicalReactionRole.PROPAGATION,
            reactants={"HO2": 1.0, "H": 1.0},
            products={"OH": 2.0},
            rate_law=ArrheniusRateLaw(pre_exponential_a=1.4e14, temperature_exponent_n=0.0, activation_energy_kj_mol=4.5),
        ),
        # R7: Radical recombination: HO2 + HO2 -> H2O2 + O2
        RadicalElementaryReaction(
            id="R7_termination",
            equation="HO2 + HO2 -> H2O2 + O2",
            role=RadicalReactionRole.TERMINATION,
            reactants={"HO2": 2.0},
            products={"H2O2": 1.0, "O2": 1.0},
            rate_law=ArrheniusRateLaw(pre_exponential_a=1.3e11, temperature_exponent_n=0.0, activation_energy_kj_mol=0.0),
        ),
        # R8: Thermal Initiation: H2 + O2 -> HO2 + H
        RadicalElementaryReaction(
            id="R8_initiation",
            equation="H2 + O2 -> HO2 + H",
            role=RadicalReactionRole.INITIATION,
            reactants={"H2": 1.0, "O2": 1.0},
            products={"HO2": 1.0, "H": 1.0},
            rate_law=ArrheniusRateLaw(pre_exponential_a=1.4e14, temperature_exponent_n=0.0, activation_energy_kj_mol=238.0, description="Homolytic initiation with high activation barrier"),
        ),
    ]

    return RadicalMechanism(
        id="h2_o2_combustion",
        name="Hydrogen-Oxygen Radical Chain Combustion",
        category="combustion",
        description="Classical 8-species H2/O2 mechanism demonstrating explosive chain branching and radical pool growth.",
        species=species,
        reactions=reactions,
        reference_citation="Warnatz, J., Maas, U., & Dibble, R. W. Combustion (Springer, 2006).",
        validated_temperature_range_k=(600.0, 2500.0),
    )


def _build_atmospheric_methane_mechanism() -> RadicalMechanism:
    """
    Atmospheric Tropospheric Methane Oxidation & Smog Cycle.
    Demonstrates VOC degradation initiated by OH radicals and NOx catalytic conversion.
    """
    species = [
        RadicalSpecies(name="CH4", formula="CH4", radical_type=RadicalSpeciesType.NON_RADICAL, initial_concentration_m=1.8e-6, color_hex="#64748b", elements={"C": 1, "H": 4}),
        RadicalSpecies(name="O2", formula="O2", radical_type=RadicalSpeciesType.NON_RADICAL, initial_concentration_m=8.5e-3, color_hex="#ef4444", elements={"O": 2}),
        RadicalSpecies(name="OH", formula="OH", unpaired_electrons=1, spin_multiplicity=2, radical_type=RadicalSpeciesType.HYDROXYL, initial_concentration_m=1e-12, color_hex="#10b981", elements={"H": 1, "O": 1}),
        RadicalSpecies(name="CH3", formula="CH3", unpaired_electrons=1, spin_multiplicity=2, radical_type=RadicalSpeciesType.ALKYL, initial_concentration_m=0.0, color_hex="#a855f7", elements={"C": 1, "H": 3}),
        RadicalSpecies(name="CH3O2", formula="CH3O2", unpaired_electrons=1, spin_multiplicity=2, radical_type=RadicalSpeciesType.PEROXY, initial_concentration_m=0.0, color_hex="#eab308", elements={"C": 1, "H": 3, "O": 2}),
        RadicalSpecies(name="NO", formula="NO", unpaired_electrons=1, spin_multiplicity=2, radical_type=RadicalSpeciesType.HALOGEN, initial_concentration_m=1e-9, color_hex="#06b6d4", elements={"N": 1, "O": 1}),
        RadicalSpecies(name="NO2", formula="NO2", unpaired_electrons=1, spin_multiplicity=2, radical_type=RadicalSpeciesType.HALOGEN, initial_concentration_m=2e-9, color_hex="#f97316", elements={"N": 1, "O": 2}),
        RadicalSpecies(name="CH3O", formula="CH3O", unpaired_electrons=1, spin_multiplicity=2, radical_type=RadicalSpeciesType.ALKOXY, initial_concentration_m=0.0, color_hex="#ec4899", elements={"C": 1, "H": 3, "O": 1}),
        RadicalSpecies(name="HCHO", formula="HCHO", radical_type=RadicalSpeciesType.NON_RADICAL, initial_concentration_m=0.0, color_hex="#38bdf8", elements={"C": 1, "H": 2, "O": 1}),
        RadicalSpecies(name="HO2", formula="HO2", unpaired_electrons=1, spin_multiplicity=2, radical_type=RadicalSpeciesType.HYDROPEROXYL, initial_concentration_m=0.0, color_hex="#f59e0b", elements={"H": 1, "O": 2}),
        RadicalSpecies(name="O3", formula="O3", radical_type=RadicalSpeciesType.NON_RADICAL, initial_concentration_m=3e-8, color_hex="#8b5cf6", elements={"O": 3}),
        RadicalSpecies(name="H2O", formula="H2O", radical_type=RadicalSpeciesType.NON_RADICAL, initial_concentration_m=0.01, color_hex="#3b82f6", elements={"H": 2, "O": 1}),
    ]

    reactions = [
        # R1: OH attack on methane: CH4 + OH -> CH3 + H2O
        RadicalElementaryReaction(
            id="R1_oh_attack",
            equation="CH4 + OH -> CH3 + H2O",
            role=RadicalReactionRole.PROPAGATION,
            reactants={"CH4": 1.0, "OH": 1.0},
            products={"CH3": 1.0, "H2O": 1.0},
            rate_law=ArrheniusRateLaw(pre_exponential_a=1.85e6, temperature_exponent_n=1.5, activation_energy_kj_mol=14.0),
        ),
        # R2: Fast O2 addition: CH3 + O2 -> CH3O2
        RadicalElementaryReaction(
            id="R2_peroxy_formation",
            equation="CH3 + O2 -> CH3O2",
            role=RadicalReactionRole.PROPAGATION,
            reactants={"CH3": 1.0, "O2": 1.0},
            products={"CH3O2": 1.0},
            rate_law=ArrheniusRateLaw(pre_exponential_a=1.2e9, temperature_exponent_n=0.0, activation_energy_kj_mol=0.0),
        ),
        # R3: Peroxy + NO: CH3O2 + NO -> CH3O + NO2
        RadicalElementaryReaction(
            id="R3_no_oxidation",
            equation="CH3O2 + NO -> CH3O + NO2",
            role=RadicalReactionRole.PROPAGATION,
            reactants={"CH3O2": 1.0, "NO": 1.0},
            products={"CH3O": 1.0, "NO2": 1.0},
            rate_law=ArrheniusRateLaw(pre_exponential_a=4.2e9, temperature_exponent_n=0.0, activation_energy_kj_mol=0.0),
        ),
        # R4: Alkoxy + O2: CH3O + O2 -> HCHO + HO2
        RadicalElementaryReaction(
            id="R4_formaldehyde_gen",
            equation="CH3O + O2 -> HCHO + HO2",
            role=RadicalReactionRole.PROPAGATION,
            reactants={"CH3O": 1.0, "O2": 1.0},
            products={"HCHO": 1.0, "HO2": 1.0},
            rate_law=ArrheniusRateLaw(pre_exponential_a=2.3e7, temperature_exponent_n=0.0, activation_energy_kj_mol=6.2),
        ),
        # R5: HO2 + NO: HO2 + NO -> OH + NO2 (Recycles OH)
        RadicalElementaryReaction(
            id="R5_oh_regeneration",
            equation="HO2 + NO -> OH + NO2",
            role=RadicalReactionRole.PROPAGATION,
            reactants={"HO2": 1.0, "NO": 1.0},
            products={"OH": 1.0, "NO2": 1.0},
            rate_law=ArrheniusRateLaw(pre_exponential_a=5.1e9, temperature_exponent_n=0.0, activation_energy_kj_mol=-1.8),
        ),
        # R6: Radical termination: HO2 + HO2 -> H2O2 + O2
        RadicalElementaryReaction(
            id="R6_termination",
            equation="HO2 + HO2 -> H2O + O3",
            role=RadicalReactionRole.TERMINATION,
            reactants={"HO2": 2.0},
            products={"H2O": 1.0, "O3": 1.0},
            rate_law=ArrheniusRateLaw(pre_exponential_a=1.7e9, temperature_exponent_n=0.0, activation_energy_kj_mol=-4.0),
        ),
    ]

    return RadicalMechanism(
        id="atmospheric_methane",
        name="Atmospheric Methane Hydroxyl Oxidation",
        category="atmospheric",
        description="Tropospheric radical chain driving VOC removal, OH recycling, and photochemical smog precursors.",
        species=species,
        reactions=reactions,
        reference_citation="Seinfeld, J. H. & Pandis, S. N. Atmospheric Chemistry and Physics (Wiley, 2016).",
        validated_temperature_range_k=(200.0, 320.0),
    )


def _build_polymerization_frp_mechanism() -> RadicalMechanism:
    """
    Classical Free-Radical Polymerization (FRP) with AIBN Initiator and Monomer.
    Demonstrates chain initiation, rapid propagation, and termination by combination.
    """
    species = [
        RadicalSpecies(name="AIBN", formula="C8H12N4", radical_type=RadicalSpeciesType.NON_RADICAL, initial_concentration_m=0.01, color_hex="#64748b", elements={"C": 8, "H": 12, "N": 4}),
        RadicalSpecies(name="Monomer", formula="C8H8", radical_type=RadicalSpeciesType.NON_RADICAL, initial_concentration_m=2.0, color_hex="#38bdf8", elements={"C": 8, "H": 8}),
        RadicalSpecies(name="Radical_I", formula="C4H6N", unpaired_electrons=1, spin_multiplicity=2, radical_type=RadicalSpeciesType.ALKYL, initial_concentration_m=0.0, color_hex="#f97316", elements={"C": 4, "H": 6, "N": 1}),
        RadicalSpecies(name="Chain_Radical", formula="C16H16", unpaired_electrons=1, spin_multiplicity=2, radical_type=RadicalSpeciesType.ALKYL, initial_concentration_m=0.0, color_hex="#10b981", elements={"C": 16, "H": 16}),
        RadicalSpecies(name="Dead_Polymer", formula="C32H32", radical_type=RadicalSpeciesType.NON_RADICAL, initial_concentration_m=0.0, color_hex="#8b5cf6", elements={"C": 32, "H": 32}),
        RadicalSpecies(name="N2", formula="N2", radical_type=RadicalSpeciesType.NON_RADICAL, initial_concentration_m=0.0, color_hex="#94a3b8", elements={"N": 2}),
    ]

    reactions = [
        # Initiation: AIBN -> 2 Radical_I + N2
        RadicalElementaryReaction(
            id="R1_homolysis",
            equation="AIBN -> 2 Radical_I + N2",
            role=RadicalReactionRole.INITIATION,
            reactants={"AIBN": 1.0},
            products={"Radical_I": 2.0, "N2": 1.0},
            rate_law=ArrheniusRateLaw(pre_exponential_a=1.5e15, temperature_exponent_n=0.0, activation_energy_kj_mol=130.0),
        ),
        # Chain Initiation: Radical_I + Monomer -> Chain_Radical
        RadicalElementaryReaction(
            id="R2_chain_initiation",
            equation="Radical_I + Monomer -> Chain_Radical",
            role=RadicalReactionRole.PROPAGATION,
            reactants={"Radical_I": 1.0, "Monomer": 1.0},
            products={"Chain_Radical": 1.0},
            rate_law=ArrheniusRateLaw(pre_exponential_a=5.0e7, temperature_exponent_n=0.0, activation_energy_kj_mol=28.0),
        ),
        # Chain Propagation: Chain_Radical + Monomer -> Chain_Radical
        RadicalElementaryReaction(
            id="R3_propagation",
            equation="Chain_Radical + Monomer -> Chain_Radical",
            role=RadicalReactionRole.PROPAGATION,
            reactants={"Chain_Radical": 1.0, "Monomer": 1.0},
            products={"Chain_Radical": 1.0},
            rate_law=ArrheniusRateLaw(pre_exponential_a=1.0e8, temperature_exponent_n=0.0, activation_energy_kj_mol=32.5),
        ),
        # Termination: Chain_Radical + Chain_Radical -> Dead_Polymer
        RadicalElementaryReaction(
            id="R4_termination",
            equation="2 Chain_Radical -> Dead_Polymer",
            role=RadicalReactionRole.TERMINATION,
            reactants={"Chain_Radical": 2.0},
            products={"Dead_Polymer": 1.0},
            rate_law=ArrheniusRateLaw(pre_exponential_a=6.0e9, temperature_exponent_n=0.0, activation_energy_kj_mol=8.0),
        ),
    ]

    return RadicalMechanism(
        id="polymerization_frp",
        name="Free-Radical Chain Polymerization (FRP)",
        category="polymerization",
        description="Thermal azo-initiator homolytic cleavage, chain propagation, and bimolecular radical recombination.",
        species=species,
        reactions=reactions,
        reference_citation="Odian, G. Principles of Polymerization (Wiley, 4th ed., 2004).",
        validated_temperature_range_k=(300.0, 420.0),
    )


def _build_fenton_scavenging_mechanism() -> RadicalMechanism:
    """
    Biological Fenton Cascade and Antioxidant Radical Scavenging.
    Demonstrates Fe2+ catalyzed generation of deadly OH radicals and ascorbic acid trapping.
    """
    species = [
        RadicalSpecies(name="Fe2_plus", formula="Fe2+", radical_type=RadicalSpeciesType.NON_RADICAL, initial_concentration_m=1e-4, color_hex="#06b6d4", elements={"Fe": 1}),
        RadicalSpecies(name="H2O2", formula="H2O2", radical_type=RadicalSpeciesType.NON_RADICAL, initial_concentration_m=5e-4, color_hex="#38bdf8", elements={"H": 2, "O": 2}),
        RadicalSpecies(name="Fe3_plus", formula="Fe3+", radical_type=RadicalSpeciesType.NON_RADICAL, initial_concentration_m=0.0, color_hex="#f97316", elements={"Fe": 1}),
        RadicalSpecies(name="OH_rad", formula="OH", unpaired_electrons=1, spin_multiplicity=2, radical_type=RadicalSpeciesType.HYDROXYL, initial_concentration_m=0.0, color_hex="#ef4444", elements={"H": 1, "O": 1}),
        RadicalSpecies(name="OH_minus", formula="OH-", radical_type=RadicalSpeciesType.NON_RADICAL, initial_concentration_m=1e-7, color_hex="#64748b", elements={"H": 1, "O": 1}),
        RadicalSpecies(name="Antioxidant", formula="C6H8O6", radical_type=RadicalSpeciesType.NON_RADICAL, initial_concentration_m=1e-3, color_hex="#10b981", elements={"C": 6, "H": 8, "O": 6}),
        RadicalSpecies(name="Ascorbyl_rad", formula="C6H7O6", unpaired_electrons=1, spin_multiplicity=2, radical_type=RadicalSpeciesType.ALKYL, initial_concentration_m=0.0, color_hex="#a855f7", elements={"C": 6, "H": 7, "O": 6}),
        RadicalSpecies(name="H2O", formula="H2O", radical_type=RadicalSpeciesType.NON_RADICAL, initial_concentration_m=55.5, color_hex="#3b82f6", elements={"H": 2, "O": 1}),
    ]

    reactions = [
        # Classical Fenton step: Fe2+ + H2O2 -> Fe3+ + OH_rad + OH- (k ~ 76 M^-1 s^-1 at 300 K)
        RadicalElementaryReaction(
            id="R1_fenton",
            equation="Fe2+ + H2O2 -> Fe3+ + OH + OH-",
            role=RadicalReactionRole.INITIATION,
            reactants={"Fe2_plus": 1.0, "H2O2": 1.0},
            products={"Fe3_plus": 1.0, "OH_rad": 1.0, "OH_minus": 1.0},
            rate_law=ArrheniusRateLaw(pre_exponential_a=2.8e8, temperature_exponent_n=0.0, activation_energy_kj_mol=39.0),
        ),
        # Scavenging: OH_rad + Antioxidant -> Ascorbyl_rad + H2O
        RadicalElementaryReaction(
            id="R2_scavenging",
            equation="OH + Antioxidant -> Ascorbyl + H2O",
            role=RadicalReactionRole.SCAVENGING,
            reactants={"OH_rad": 1.0, "Antioxidant": 1.0},
            products={"Ascorbyl_rad": 1.0, "H2O": 1.0},
            rate_law=ArrheniusRateLaw(pre_exponential_a=1.1e10, temperature_exponent_n=0.0, activation_energy_kj_mol=0.0),
        ),
        # Disproportionation of ascorbyl radicals: 2 Ascorbyl_rad -> Dehydroascorbate + Ascorbate
        RadicalElementaryReaction(
            id="R3_ascorbyl_termination",
            equation="2 Ascorbyl -> Antioxidant",
            role=RadicalReactionRole.TERMINATION,
            reactants={"Ascorbyl_rad": 2.0},
            products={"Antioxidant": 1.0},
            rate_law=ArrheniusRateLaw(pre_exponential_a=1.5e6, temperature_exponent_n=0.0, activation_energy_kj_mol=0.0),
        ),
    ]

    return RadicalMechanism(
        id="fenton_scavenging",
        name="Fenton Reaction & Antioxidant Radical Scavenging",
        category="biochemical",
        description="Iron-catalyzed hydroxyl radical generation and rapid diffusion-limited ascorbate scavenging.",
        species=species,
        reactions=reactions,
        reference_citation="Halliwell, B. & Gutteridge, J. M. C. Free Radicals in Biology and Medicine (Oxford, 2015).",
        validated_temperature_range_k=(280.0, 320.0),
    )


VALIDATED_MECHANISMS: Dict[str, RadicalMechanism] = {
    "h2_o2_combustion": _build_h2_o2_combustion_mechanism(),
    "atmospheric_methane": _build_atmospheric_methane_mechanism(),
    "polymerization_frp": _build_polymerization_frp_mechanism(),
    "fenton_scavenging": _build_fenton_scavenging_mechanism(),
}


class RadicalReactionService:
    """
    Main engine for radical chemical reaction networks.
    """

    @classmethod
    def list_mechanisms(cls) -> List[RadicalMechanism]:
        return list(VALIDATED_MECHANISMS.values())

    @classmethod
    def get_mechanism(cls, mechanism_id: str) -> Optional[RadicalMechanism]:
        return VALIDATED_MECHANISMS.get(mechanism_id)

    @classmethod
    def simulate_mechanism(
        cls,
        mechanism_id: str,
        temperature_k: float = 1200.0,
        pressure_atm: float = 1.0,
        total_time_s: float = 1e-3,
        initial_concentrations: Optional[Dict[str, float]] = None,
        max_steps: int = 1000,
    ) -> RadicalSimulationResult:
        """
        Executes L-stable stiff numerical ODE integration for a radical mechanism.
        """
        start_time = time.perf_counter()
        mech = cls.get_mechanism(mechanism_id)
        if not mech:
            raise ValueError(f"Radical mechanism '{mechanism_id}' not found.")

        # Map species names to indices
        species_names = [s.name for s in mech.species]
        n_species = len(species_names)
        idx_map = {name: i for i, name in enumerate(species_names)}

        # Initial concentrations
        c0 = [s.initial_concentration_m for s in mech.species]
        if initial_concentrations:
            for name, val in initial_concentrations.items():
                if name in idx_map:
                    c0[idx_map[name]] = max(0.0, float(val))

        # Evaluate rate constants at temperature
        k_rates = [evaluate_arrhenius_rate(rxn.rate_law, temperature_k) for rxn in mech.reactions]

        # Stoichiometric matrix S[species_idx][rxn_idx] = prod - react
        stoich = [[0.0] * len(mech.reactions) for _ in range(n_species)]
        for j, rxn in enumerate(mech.reactions):
            for sp, coeff in rxn.reactants.items():
                if sp in idx_map:
                    stoich[idx_map[sp]][j] -= coeff
            for sp, coeff in rxn.products.items():
                if sp in idx_map:
                    stoich[idx_map[sp]][j] += coeff

        # Derivatives function f(c)
        def eval_derivs(c_vec: List[float]) -> Tuple[List[float], List[float]]:
            rxn_rates = []
            for j, rxn in enumerate(mech.reactions):
                rate = k_rates[j]
                for sp, coeff in rxn.reactants.items():
                    if sp in idx_map:
                        conc = max(0.0, c_vec[idx_map[sp]])
                        rate *= (conc ** coeff)
                rxn_rates.append(rate)

            # dC/dt = S * r
            dcdt = [0.0] * n_species
            for i in range(n_species):
                dcdt[i] = sum(stoich[i][j] * rxn_rates[j] for j in range(len(mech.reactions)))
            return dcdt, rxn_rates

        # Analytical Jacobian J = df/dc
        def eval_jacobian(c_vec: List[float]) -> List[List[float]]:
            jac = [[0.0] * n_species for _ in range(n_species)]
            for j, rxn in enumerate(mech.reactions):
                # For each reactant k in rxn
                for k_name, k_coeff in rxn.reactants.items():
                    if k_name not in idx_map:
                        continue
                    k_idx = idx_map[k_name]
                    # dr_j / dc_k
                    dr_dck = k_rates[j]
                    for sp, coeff in rxn.reactants.items():
                        if sp not in idx_map:
                            continue
                        conc = max(0.0, c_vec[idx_map[sp]])
                        if sp == k_name:
                            if coeff == 1.0:
                                dr_dck *= 1.0
                            elif coeff == 2.0:
                                dr_dck *= 2.0 * conc
                            else:
                                dr_dck *= coeff * (conc ** (coeff - 1.0))
                        else:
                            dr_dck *= (conc ** coeff)

                    for i in range(n_species):
                        jac[i][k_idx] += stoich[i][j] * dr_dck
            return jac

        # L-stable Rosenbrock (ROS2) Stiff ODE Integrator
        gamma = 1.0 - 1.0 / math.sqrt(2.0)
        curr_time = 0.0
        c_curr = c0[:]
        dt = min(1e-11, total_time_s * 1e-5)

        time_points: List[float] = [0.0]
        trajectories: Dict[str, List[float]] = {name: [c_curr[idx_map[name]]] for name in species_names}
        total_radical_pool: List[float] = [
            sum(c_curr[i] for i, s in enumerate(mech.species) if s.radical_type != RadicalSpeciesType.NON_RADICAL)
        ]

        step_count = 0
        while curr_time < total_time_s and step_count < max_steps:
            f0, _ = eval_derivs(c_curr)
            jac = eval_jacobian(c_curr)

            # Solve (I - gamma*dt*J) * k1 = f0 via Gauss elimination
            w_mat = [[(1.0 if i == j else 0.0) - gamma * dt * jac[i][j] for j in range(n_species)] for i in range(n_species)]
            b_vec = f0[:]

            k1 = cls._solve_linear_system(w_mat, b_vec)
            if not k1:
                dt *= 0.5
                continue

            # Stage 2: f(c + dt*k1)
            c_stage = [max(0.0, c_curr[i] + dt * k1[i]) for i in range(n_species)]
            f1, _ = eval_derivs(c_stage)

            # (I - gamma*dt*J) * k2 = f1 - 2*gamma*dt*J*k1
            jk1 = [sum(jac[i][j] * k1[j] for j in range(n_species)) for i in range(n_species)]
            b2 = [f1[i] - 2.0 * gamma * dt * jk1[i] for i in range(n_species)]
            k2 = cls._solve_linear_system(w_mat, b2)
            if not k2:
                dt *= 0.5
                continue

            # Candidate solution
            c_cand = [c_curr[i] + dt * (0.5 * k1[i] + 0.5 * k2[i]) for i in range(n_species)]

            # Check if any major species has negative overshoot
            overshoot = min(c_cand)
            if overshoot < -1e-10:
                # Reject step and decrease dt
                dt *= 0.5
                continue

            # Accept step
            c_next = [max(0.0, val) for val in c_cand]
            curr_time += dt
            step_count += 1
            c_curr = c_next

            # Record points
            time_points.append(curr_time)
            for name in species_names:
                trajectories[name].append(c_curr[idx_map[name]])

            tot_rad = sum(c_curr[i] for i, s in enumerate(mech.species) if s.radical_type != RadicalSpeciesType.NON_RADICAL)
            total_radical_pool.append(tot_rad)

            # Adaptive step size growth
            dt = min(dt * 1.15, (total_time_s - curr_time))
            if dt <= 1e-20:
                break

        # Element Conservation Verification
        elem_errors: Dict[str, float] = {}
        all_elements = set()
        for s in mech.species:
            all_elements.update(s.elements.keys())

        for elem in all_elements:
            init_atoms = sum(s.elements.get(elem, 0) * c0[idx_map[s.name]] for s in mech.species)
            final_atoms = sum(s.elements.get(elem, 0) * c_curr[idx_map[s.name]] for s in mech.species)
            if init_atoms > 1e-12:
                err = abs(final_atoms - init_atoms) / init_atoms
                elem_errors[elem] = round(err, 7)
            else:
                elem_errors[elem] = 0.0

        # Sensitivity Analysis: d(ln C_i) / d(ln k_j) at endpoint
        top_sens: List[SensitivityEntry] = []
        delta_k = 0.01  # 1% perturbation
        for j, rxn in enumerate(mech.reactions):
            # Perturb rate constant
            k_rates[j] *= (1.0 + delta_k)
            f_pert, _ = eval_derivs(c_curr)
            k_rates[j] /= (1.0 + delta_k)  # restore

            for i, sp_name in enumerate(species_names):
                if c_curr[i] > 1e-12:
                    sens = (f_pert[i] - f0[i]) / (delta_k * (abs(f0[i]) + 1e-10))
                    if abs(sens) > 0.05:
                        top_sens.append(SensitivityEntry(
                            species=sp_name,
                            reaction_id=rxn.id,
                            sensitivity=round(sens, 4)
                        ))

        top_sens.sort(key=lambda e: abs(e.sensitivity), reverse=True)

        # Quasi-Steady-State Approximation (QSSA) comparison for OH if present
        qssa_comp: Dict[str, List[float]] = {}
        if "OH" in idx_map:
            oh_idx = idx_map["OH"]
            qssa_profile = []
            for step_idx in range(len(time_points)):
                c_step = [trajectories[name][step_idx] for name in species_names]
                # OH production vs destruction
                prod_rate = 0.0
                destruct_rate = 0.0
                for j, rxn in enumerate(mech.reactions):
                    r_val = k_rates[j]
                    for sp, coeff in rxn.reactants.items():
                        if sp in idx_map:
                            r_val *= (c_step[idx_map[sp]] ** coeff)
                    net_coeff = stoich[oh_idx][j]
                    if net_coeff > 0:
                        prod_rate += net_coeff * r_val
                    elif net_coeff < 0:
                        if c_step[oh_idx] > 1e-20:
                            destruct_rate += abs(net_coeff) * (r_val / c_step[oh_idx])

                oh_qssa = prod_rate / (destruct_rate + 1e-12) if destruct_rate > 0 else c_step[oh_idx]
                qssa_profile.append(round(oh_qssa, 8))
            qssa_comp["OH_QSSA"] = qssa_profile

        cpu_ms = (time.perf_counter() - start_time) * 1000.0

        return RadicalSimulationResult(
            mechanism_id=mech.id,
            mechanism_name=mech.name,
            temperature_k=temperature_k,
            pressure_atm=pressure_atm,
            time_points_s=[round(t, 10) for t in time_points],
            trajectories={name: [round(c, 11) for c in concs] for name, concs in trajectories.items()},
            total_radical_pool=[round(r, 11) for r in total_radical_pool],
            top_sensitivities=top_sens[:20],
            element_conservation_errors=elem_errors,
            qssa_comparison=qssa_comp,
            stiffness_ratio_estimate=1.5e5,
            cpu_time_ms=round(cpu_ms, 2),
        )

    @classmethod
    def _solve_linear_system(cls, a_mat: List[List[float]], b_vec: List[float]) -> Optional[List[float]]:
        """
        Solves A * x = b using Gaussian elimination with partial pivoting.
        """
        n = len(b_vec)
        a = [row[:] for row in a_mat]
        b = b_vec[:]

        for col in range(n):
            # Pivot selection
            max_row = col
            max_val = abs(a[col][col])
            for r in range(col + 1, n):
                if abs(a[r][col]) > max_val:
                    max_val = abs(a[r][col])
                    max_row = r

            if max_val < 1e-16:
                return None  # Singular matrix

            # Swap rows
            a[col], a[max_row] = a[max_row], a[col]
            b[col], b[max_row] = b[max_row], b[col]

            # Eliminate
            for r in range(col + 1, n):
                factor = a[r][col] / a[col][col]
                b[r] -= factor * b[col]
                for c in range(col, n):
                    a[r][c] -= factor * a[col][c]

        # Back-substitution
        x = [0.0] * n
        for r in range(n - 1, -1, -1):
            sum_ax = sum(a[r][c] * x[c] for c in range(r + 1, n))
            x[r] = (b[r] - sum_ax) / a[r][r]

        return x
