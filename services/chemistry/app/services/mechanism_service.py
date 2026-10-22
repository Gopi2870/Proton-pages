"""
Analytical Organic Chemistry Reaction Mechanism Service.
Implements:
- Curved-Arrow Electron-Pushing Formalisms (two-electron and single-electron fishhook)
- Elementary Reaction Steps & Transition States
- Carbocation, Carbanion, Enolate, and Wheland Intermediates
- Gibbs Free Energy Profiles across Reaction Coordinates
"""

import math
from typing import List, Dict, Optional, Tuple
from app.models.mechanisms import (
    ArrowType,
    IntermediateType,
    MechanismClass,
    StereochemicalOutcome,
    CurvedArrow,
    MechanismStep,
    ReactionEnergyPoint,
    OrganicReactionMechanism,
)

ORGANIC_MECHANISMS: Dict[str, OrganicReactionMechanism] = {
    "sn2_bromoethane": OrganicReactionMechanism(
        id="sn2_bromoethane",
        name="SN2 Bimolecular Nucleophilic Substitution",
        mechanism_class=MechanismClass.SN2,
        overall_reaction="CH3CH2Br + OH- -> CH3CH2OH + Br-",
        substrate="Bromoethane (Primary alkyl halide)",
        nucleophile_or_reagent="Hydroxide ion (OH-)",
        solvent="Dimethyl sulfoxide (DMSO, polar aprotic)",
        stereochemical_outcome=StereochemicalOutcome.INVERSION,
        kinetics_rate_law="Rate = k [CH3CH2Br] [OH-]",
        pedagogical_notes="Concerted single-step mechanism. The nucleophile attacks the electrophilic carbon from 180 degrees opposite the leaving group (backside attack), leading to a trigonal bipyramidal pentacoordinate transition state and Walden inversion.",
        steps=[
            MechanismStep(
                step_number=1,
                title="Concerted Backside Nucleophilic Attack",
                description="Hydroxide lone pair attacks the sigma* antibonding orbital of the C-Br bond while bromide departs synchronously.",
                intermediate_type=IntermediateType.TRANSITION_STATE,
                reactants_label="CH3CH2Br + OH-",
                products_label="CH3CH2OH + Br-",
                activation_energy_kj_mol=82.5,
                reaction_energy_kj_mol=-65.0,
                curved_arrows=[
                    CurvedArrow(
                        source_type="lone_pair",
                        source_label="O_lone_pair",
                        source_coords=(0.15, 0.50),
                        target_type="atom",
                        target_label="C_alpha",
                        target_coords=(0.48, 0.50),
                        arrow_type=ArrowType.TWO_ELECTRON,
                        curvature_bias=0.35,
                    ),
                    CurvedArrow(
                        source_type="bond",
                        source_label="C-Br_sigma",
                        source_coords=(0.54, 0.50),
                        target_type="atom",
                        target_label="Br_leaving_group",
                        target_coords=(0.85, 0.50),
                        arrow_type=ArrowType.TWO_ELECTRON,
                        curvature_bias=-0.35,
                    ),
                ],
                key_bonds_formed=["C-O (covalent sigma)"],
                key_bonds_broken=["C-Br (heterolytic cleavage)"],
            ),
        ],
        energy_profile=[
            ReactionEnergyPoint(0.0, 0.0, "ground_state", "Reactants: CH3CH2Br + OH-"),
            ReactionEnergyPoint(0.5, 82.5, "transition_state", "[HO...CH2(CH3)...Br]‡"),
            ReactionEnergyPoint(1.0, -65.0, "ground_state", "Products: CH3CH2OH + Br-"),
        ],
    ),
    "sn1_tertbutyl_chloride": OrganicReactionMechanism(
        id="sn1_tertbutyl_chloride",
        name="SN1 Unimolecular Solvolysis",
        mechanism_class=MechanismClass.SN1,
        overall_reaction="(CH3)3C-Cl + 2 H2O -> (CH3)3C-OH + H3O+ + Cl-",
        substrate="tert-Butyl chloride (Tertiary alkyl halide)",
        nucleophile_or_reagent="Water (H2O, weak neutral nucleophile)",
        solvent="Water / Acetone (polar protic mixture)",
        stereochemical_outcome=StereochemicalOutcome.RACEMIZATION,
        kinetics_rate_law="Rate = k [(CH3)3C-Cl]",
        pedagogical_notes="Two-step mechanism involving a rate-determining unimolecular ionization to a planar sp2 carbocation intermediate, followed by rapid solvent nucleophilic capture.",
        steps=[
            MechanismStep(
                step_number=1,
                title="Rate-Determining Heterolysis to Carbocation",
                description="Spontaneous heterolytic cleavage of the C-Cl bond forming a planar, resonance-free tertiary carbocation intermediate.",
                intermediate_type=IntermediateType.CARBOCATION,
                reactants_label="(CH3)3C-Cl",
                products_label="(CH3)3C+ + Cl-",
                activation_energy_kj_mol=94.0,
                reaction_energy_kj_mol=38.0,
                curved_arrows=[
                    CurvedArrow(
                        source_type="bond",
                        source_label="C-Cl_sigma",
                        source_coords=(0.45, 0.50),
                        target_type="atom",
                        target_label="Cl_leaving_group",
                        target_coords=(0.80, 0.35),
                        arrow_type=ArrowType.TWO_ELECTRON,
                        curvature_bias=-0.40,
                    ),
                ],
                key_bonds_formed=[],
                key_bonds_broken=["C-Cl (heterolytic cleavage)"],
            ),
            MechanismStep(
                step_number=2,
                title="Nucleophilic Water Capture",
                description="Water attacks the empty 2pz orbital of the planar carbocation from either top or bottom face.",
                intermediate_type=IntermediateType.OXONIUM,
                reactants_label="(CH3)3C+ + H2O",
                products_label="(CH3)3C-OH2+",
                activation_energy_kj_mol=18.0,
                reaction_energy_kj_mol=-45.0,
                curved_arrows=[
                    CurvedArrow(
                        source_type="lone_pair",
                        source_label="H2O_lone_pair",
                        source_coords=(0.20, 0.30),
                        target_type="atom",
                        target_label="Carbocation_C+",
                        target_coords=(0.50, 0.50),
                        arrow_type=ArrowType.TWO_ELECTRON,
                        curvature_bias=0.30,
                    ),
                ],
                key_bonds_formed=["C-O (dative sigma)"],
                key_bonds_broken=[],
            ),
            MechanismStep(
                step_number=3,
                title="Deprotonation to Neutral Alcohol",
                description="A second solvent water molecule deprotonates the alkyloxonium ion, yielding tert-butanol and hydronium.",
                intermediate_type=IntermediateType.PRODUCT,
                reactants_label="(CH3)3C-OH2+ + H2O",
                products_label="(CH3)3C-OH + H3O+",
                activation_energy_kj_mol=12.0,
                reaction_energy_kj_mol=-22.0,
                curved_arrows=[
                    CurvedArrow(
                        source_type="lone_pair",
                        source_label="Base_H2O_lone_pair",
                        source_coords=(0.20, 0.70),
                        target_type="atom",
                        target_label="Oxonium_H",
                        target_coords=(0.45, 0.60),
                        arrow_type=ArrowType.TWO_ELECTRON,
                        curvature_bias=0.25,
                    ),
                    CurvedArrow(
                        source_type="bond",
                        source_label="O-H_sigma",
                        source_coords=(0.48, 0.55),
                        target_type="atom",
                        target_label="O_atom",
                        target_coords=(0.55, 0.50),
                        arrow_type=ArrowType.TWO_ELECTRON,
                        curvature_bias=-0.30,
                    ),
                ],
                key_bonds_formed=["O-H (hydronium)"],
                key_bonds_broken=["O-H (oxonium)"],
            ),
        ],
        energy_profile=[
            ReactionEnergyPoint(0.0, 0.0, "ground_state", "Reactant: (CH3)3C-Cl"),
            ReactionEnergyPoint(0.35, 94.0, "transition_state", "TS1: [C...Cl]‡ (Rate-Determining)"),
            ReactionEnergyPoint(0.55, 38.0, "intermediate", "Intermediate 1: (CH3)3C+"),
            ReactionEnergyPoint(0.75, 56.0, "transition_state", "TS2: [C...OH2]‡"),
            ReactionEnergyPoint(0.85, -7.0, "intermediate", "Intermediate 2: (CH3)3C-OH2+"),
            ReactionEnergyPoint(0.93, 5.0, "transition_state", "TS3: Proton Transfer"),
            ReactionEnergyPoint(1.0, -29.0, "ground_state", "Products: (CH3)3C-OH + H3O+ + Cl-"),
        ],
    ),
    "e2_bromopropane": OrganicReactionMechanism(
        id="e2_bromopropane",
        name="E2 Bimolecular Elimination",
        mechanism_class=MechanismClass.E2,
        overall_reaction="CH3-CH(Br)-CH3 + EtO- -> CH3-CH=CH2 + EtOH + Br-",
        substrate="2-Bromopropane (Secondary alkyl halide)",
        nucleophile_or_reagent="Sodium ethoxide (EtO-, strong unhindered base)",
        solvent="Ethanol (EtOH)",
        stereochemical_outcome=StereochemicalOutcome.ANTI_ELIMINATION,
        kinetics_rate_law="Rate = k [2-Bromopropane] [EtO-]",
        pedagogical_notes="Single-step concerted elimination requiring anti-periplanar alignment of the beta-C-H bond and alpha-C-Br bond (dihedral angle 180 degrees) for optimal overlap with developing pi-system.",
        steps=[
            MechanismStep(
                step_number=1,
                title="Concerted Anti-Periplanar Elimination",
                description="Ethoxide abstracts beta-hydrogen, the C-H electrons collapse to form C=C pi-bond, and bromide departs.",
                intermediate_type=IntermediateType.TRANSITION_STATE,
                reactants_label="CH3-CH(Br)-CH3 + EtO-",
                products_label="CH3-CH=CH2 + EtOH + Br-",
                activation_energy_kj_mol=78.0,
                reaction_energy_kj_mol=-48.0,
                curved_arrows=[
                    CurvedArrow(
                        source_type="lone_pair",
                        source_label="EtO-_lone_pair",
                        source_coords=(0.10, 0.20),
                        target_type="atom",
                        target_label="beta_H",
                        target_coords=(0.30, 0.35),
                        arrow_type=ArrowType.TWO_ELECTRON,
                        curvature_bias=0.30,
                    ),
                    CurvedArrow(
                        source_type="bond",
                        source_label="beta_C-H_sigma",
                        source_coords=(0.35, 0.40),
                        target_type="bond",
                        target_label="C-C_bond",
                        target_coords=(0.50, 0.50),
                        arrow_type=ArrowType.TWO_ELECTRON,
                        curvature_bias=0.35,
                    ),
                    CurvedArrow(
                        source_type="bond",
                        source_label="alpha_C-Br_sigma",
                        source_coords=(0.55, 0.50),
                        target_type="atom",
                        target_label="Br_leaving_group",
                        target_coords=(0.85, 0.70),
                        arrow_type=ArrowType.TWO_ELECTRON,
                        curvature_bias=-0.35,
                    ),
                ],
                key_bonds_formed=["O-H (ethanol)", "C=C (pi bond)"],
                key_bonds_broken=["C-H (beta)", "C-Br (alpha)"],
            ),
        ],
        energy_profile=[
            ReactionEnergyPoint(0.0, 0.0, "ground_state", "Reactants: 2-Bromopropane + EtO-"),
            ReactionEnergyPoint(0.5, 78.0, "transition_state", "TS: [EtO...H...C=C...Br]‡"),
            ReactionEnergyPoint(1.0, -48.0, "ground_state", "Products: Propene + EtOH + Br-"),
        ],
    ),
    "eas_benzene_nitration": OrganicReactionMechanism(
        id="eas_benzene_nitration",
        name="Electrophilic Aromatic Substitution (EAS) Nitration",
        mechanism_class=MechanismClass.EAS,
        overall_reaction="C6H6 + HNO3 (H2SO4) -> C6H5NO2 + H2O",
        substrate="Benzene (Aromatic ring)",
        nucleophile_or_reagent="Nitronium ion (NO2+, powerful electrophile)",
        solvent="Concentrated Sulfuric Acid (H2SO4)",
        stereochemical_outcome=StereochemicalOutcome.ACHIRAL,
        kinetics_rate_law="Rate = k [Benzene] [NO2+]",
        pedagogical_notes="Classic two-step substitution preserving aromatic stability. Rate-determining attack of pi-electrons generates a resonance-stabilized Arenium ion (Wheland / sigma-complex), followed by rapid proton removal.",
        steps=[
            MechanismStep(
                step_number=1,
                title="Electrophilic Attack Forming Arenium Ion",
                description="Benzene pi-electron pair attacks the linear nitronium ion (NO2+), breaking aromaticity to form a cyclohexadienyl carbocation (sigma-complex).",
                intermediate_type=IntermediateType.ARENIUM_ION,
                reactants_label="Benzene + NO2+",
                products_label="Arenium Ion (sigma-complex)",
                activation_energy_kj_mol=64.0,
                reaction_energy_kj_mol=42.0,
                curved_arrows=[
                    CurvedArrow(
                        source_type="bond",
                        source_label="Aromatic_pi_bond",
                        source_coords=(0.40, 0.50),
                        target_type="atom",
                        target_label="Nitronium_N+",
                        target_coords=(0.60, 0.30),
                        arrow_type=ArrowType.TWO_ELECTRON,
                        curvature_bias=0.35,
                    ),
                    CurvedArrow(
                        source_type="bond",
                        source_label="N=O_pi_bond",
                        source_coords=(0.65, 0.28),
                        target_type="atom",
                        target_label="Oxygen_atom",
                        target_coords=(0.80, 0.20),
                        arrow_type=ArrowType.TWO_ELECTRON,
                        curvature_bias=-0.35,
                    ),
                ],
                key_bonds_formed=["C-N (covalent sigma)"],
                key_bonds_broken=["Aromatic C=C (pi bond)"],
            ),
            MechanismStep(
                step_number=2,
                title="Deprotonation & Aromaticity Restoration",
                description="Bisulfate base abstracts the ring proton, returning electron density to the ring and regenerating aromatic resonance energy.",
                intermediate_type=IntermediateType.PRODUCT,
                reactants_label="Arenium Ion + HSO4-",
                products_label="Nitrobenzene + H2SO4",
                activation_energy_kj_mol=14.0,
                reaction_energy_kj_mol=-152.0,
                curved_arrows=[
                    CurvedArrow(
                        source_type="lone_pair",
                        source_label="HSO4-_lone_pair",
                        source_coords=(0.20, 0.75),
                        target_type="atom",
                        target_label="sp3_C_Hydrogen",
                        target_coords=(0.45, 0.65),
                        arrow_type=ArrowType.TWO_ELECTRON,
                        curvature_bias=0.25,
                    ),
                    CurvedArrow(
                        source_type="bond",
                        source_label="C-H_sigma",
                        source_coords=(0.48, 0.60),
                        target_type="bond",
                        target_label="Ring_pi_system",
                        target_coords=(0.55, 0.52),
                        arrow_type=ArrowType.TWO_ELECTRON,
                        curvature_bias=-0.30,
                    ),
                ],
                key_bonds_formed=["Aromatic 6-pi sextet"],
                key_bonds_broken=["C-H (aliphatic)"],
            ),
        ],
        energy_profile=[
            ReactionEnergyPoint(0.0, 0.0, "ground_state", "Reactants: Benzene + NO2+"),
            ReactionEnergyPoint(0.40, 64.0, "transition_state", "TS1: [C6H6...NO2]‡"),
            ReactionEnergyPoint(0.60, 42.0, "intermediate", "Intermediate: Arenium Ion (Wheland)"),
            ReactionEnergyPoint(0.80, 56.0, "transition_state", "TS2: Proton Deprotonation"),
            ReactionEnergyPoint(1.0, -110.0, "ground_state", "Products: Nitrobenzene + H3O+"),
        ],
    ),
    "aldol_acetaldehyde": OrganicReactionMechanism(
        id="aldol_acetaldehyde",
        name="Base-Catalyzed Aldol Condensation",
        mechanism_class=MechanismClass.ALDOL_CONDENSATION,
        overall_reaction="2 CH3CHO (OH-) -> CH3-CH=CH-CHO + H2O",
        substrate="Acetaldehyde (Ethanal)",
        nucleophile_or_reagent="Sodium hydroxide (OH-, catalytic base)",
        solvent="Aqueous ethanol",
        stereochemical_outcome=StereochemicalOutcome.ACHIRAL,
        kinetics_rate_law="Rate = k [Acetaldehyde] [OH-]",
        pedagogical_notes="Classic carbon-carbon bond forming sequence: alpha-deprotonation to stabilized enolate, nucleophilic addition to second carbonyl, protonation to aldol, followed by E1cB dehydration to alpha,beta-unsaturated aldehyde.",
        steps=[
            MechanismStep(
                step_number=1,
                title="Alpha-Deprotonation Forming Enolate",
                description="Hydroxide abstracts acidic alpha-proton (pKa ~ 17) generating resonance-stabilized enolate anion.",
                intermediate_type=IntermediateType.ENOLATE,
                reactants_label="CH3CHO + OH-",
                products_label="[CH2=CH-O]- + H2O",
                activation_energy_kj_mol=45.0,
                reaction_energy_kj_mol=12.0,
                curved_arrows=[
                    CurvedArrow(
                        source_type="lone_pair",
                        source_label="OH-_lone_pair",
                        source_coords=(0.10, 0.30),
                        target_type="atom",
                        target_label="alpha_H",
                        target_coords=(0.35, 0.40),
                        arrow_type=ArrowType.TWO_ELECTRON,
                    ),
                    CurvedArrow(
                        source_type="bond",
                        source_label="C-H_sigma",
                        source_coords=(0.38, 0.45),
                        target_type="atom",
                        target_label="alpha_Carbon",
                        target_coords=(0.50, 0.50),
                        arrow_type=ArrowType.TWO_ELECTRON,
                    ),
                ],
                key_bonds_formed=["O-H (water)"],
                key_bonds_broken=["C-H (alpha)"],
            ),
            MechanismStep(
                step_number=2,
                title="Nucleophilic Carbonyl Addition (C-C Coupling)",
                description="Enolate alpha-carbon attacks the electrophilic carbonyl carbon of an un-ionized acetaldehyde molecule.",
                intermediate_type=IntermediateType.CARBANION,
                reactants_label="Enolate + CH3CHO",
                products_label="Alkoxide Intermediate",
                activation_energy_kj_mol=52.0,
                reaction_energy_kj_mol=-18.0,
                curved_arrows=[
                    CurvedArrow(
                        source_type="lone_pair",
                        source_label="Enolate_C_lone_pair",
                        source_coords=(0.30, 0.50),
                        target_type="atom",
                        target_label="Carbonyl_C",
                        target_coords=(0.60, 0.50),
                        arrow_type=ArrowType.TWO_ELECTRON,
                    ),
                    CurvedArrow(
                        source_type="bond",
                        source_label="C=O_pi",
                        source_coords=(0.62, 0.48),
                        target_type="atom",
                        target_label="Carbonyl_O",
                        target_coords=(0.75, 0.35),
                        arrow_type=ArrowType.TWO_ELECTRON,
                    ),
                ],
                key_bonds_formed=["C-C (new sigma bond)"],
                key_bonds_broken=["C=O (pi bond)"],
            ),
        ],
        energy_profile=[
            ReactionEnergyPoint(0.0, 0.0, "ground_state", "Reactants: 2 CH3CHO + OH-"),
            ReactionEnergyPoint(0.30, 45.0, "transition_state", "TS1: Alpha-Deprotonation"),
            ReactionEnergyPoint(0.50, 12.0, "intermediate", "Intermediate 1: Enolate Ion"),
            ReactionEnergyPoint(0.75, 64.0, "transition_state", "TS2: C-C Bond Formation"),
            ReactionEnergyPoint(1.0, -28.0, "ground_state", "Product: 3-Hydroxybutanal (Aldol)"),
        ],
    ),
    "grignard_acetone": OrganicReactionMechanism(
        id="grignard_acetone",
        name="Grignard Addition to Ketone",
        mechanism_class=MechanismClass.GRIGNARD,
        overall_reaction="(CH3)2C=O + CH3MgBr -> (H3O+) -> (CH3)3C-OH + Mg(OH)Br",
        substrate="Acetone (Propan-2-one)",
        nucleophile_or_reagent="Methylmagnesium bromide (CH3MgBr, organometallic carbanion synthon)",
        solvent="Dry Diethyl Ether (Et2O)",
        stereochemical_outcome=StereochemicalOutcome.ACHIRAL,
        kinetics_rate_law="Rate = k [Acetone] [CH3MgBr]",
        pedagogical_notes="Strong carbon nucleophile adds irreversibly across the polarized carbonyl double bond, generating a tertiary alkoxide that is protonated during acidic quench to yield tert-butanol.",
        steps=[
            MechanismStep(
                step_number=1,
                title="Nucleophilic Carbanion Addition",
                description="The nucleophilic polarized methyl group (delta-minus C) attacks the electrophilic carbonyl carbon, breaking C=O pi bond.",
                intermediate_type=IntermediateType.CARBANION,
                reactants_label="CH3-MgBr + (CH3)2C=O",
                products_label="(CH3)3C-O- [MgBr]+",
                activation_energy_kj_mol=42.0,
                reaction_energy_kj_mol=-88.0,
                curved_arrows=[
                    CurvedArrow(
                        source_type="bond",
                        source_label="C-Mg_sigma",
                        source_coords=(0.20, 0.40),
                        target_type="atom",
                        target_label="Carbonyl_C",
                        target_coords=(0.50, 0.50),
                        arrow_type=ArrowType.TWO_ELECTRON,
                    ),
                    CurvedArrow(
                        source_type="bond",
                        source_label="C=O_pi",
                        source_coords=(0.52, 0.48),
                        target_type="atom",
                        target_label="Oxygen_atom",
                        target_coords=(0.75, 0.35),
                        arrow_type=ArrowType.TWO_ELECTRON,
                    ),
                ],
                key_bonds_formed=["C-C (sigma)"],
                key_bonds_broken=["C-Mg", "C=O (pi)"],
            ),
        ],
        energy_profile=[
            ReactionEnergyPoint(0.0, 0.0, "ground_state", "Reactants: Acetone + CH3MgBr"),
            ReactionEnergyPoint(0.5, 42.0, "transition_state", "TS: [H3C...C(=O)...MgBr]‡"),
            ReactionEnergyPoint(1.0, -88.0, "ground_state", "Product Alkoxide: (CH3)3C-OMgBr"),
        ],
    ),
    "markovnikov_propene_hbr": OrganicReactionMechanism(
        id="markovnikov_propene_hbr",
        name="Markovnikov Electrophilic Hydrohalogenation",
        mechanism_class=MechanismClass.MARKOVNIKOV_ADDITION,
        overall_reaction="CH2=C(CH3)2 + HBr -> (CH3)3C-Br",
        substrate="2-Methylpropene (Isobutylene)",
        nucleophile_or_reagent="Hydrogen bromide (HBr, strong Bronsted acid)",
        solvent="Dichloromethane (DCM)",
        stereochemical_outcome=StereochemicalOutcome.MARKOVNIKOV_REGIOSELECTIVE,
        kinetics_rate_law="Rate = k [Alkene] [HBr]",
        pedagogical_notes="Regioselective addition obeying Markovnikov's rule. Protonation occurs at the less substituted carbon to generate the significantly more stable tertiary carbocation (hyperconjugation / inductive stabilization).",
        steps=[
            MechanismStep(
                step_number=1,
                title="Regioselective Protonation to Tertiary Carbocation",
                description="Pi-bond attacks proton of HBr; proton attaches to CH2 to form a 3-degree carbocation with 9 hyperconjugative alpha-hydrogens.",
                intermediate_type=IntermediateType.CARBOCATION,
                reactants_label="CH2=C(CH3)2 + HBr",
                products_label="(CH3)3C+ + Br-",
                activation_energy_kj_mol=58.0,
                reaction_energy_kj_mol=24.0,
                curved_arrows=[
                    CurvedArrow(
                        source_type="bond",
                        source_label="Alkene_pi_bond",
                        source_coords=(0.35, 0.50),
                        target_type="atom",
                        target_label="HBr_proton",
                        target_coords=(0.60, 0.35),
                        arrow_type=ArrowType.TWO_ELECTRON,
                    ),
                    CurvedArrow(
                        source_type="bond",
                        source_label="H-Br_sigma",
                        source_coords=(0.63, 0.38),
                        target_type="atom",
                        target_label="Br_atom",
                        target_coords=(0.80, 0.50),
                        arrow_type=ArrowType.TWO_ELECTRON,
                    ),
                ],
                key_bonds_formed=["C-H (primary carbon)"],
                key_bonds_broken=["C=C (pi bond)", "H-Br (sigma)"],
            ),
            MechanismStep(
                step_number=2,
                title="Halide Nucleophilic Capture",
                description="Bromide ion rapidly captures the tertiary carbocation to yield 2-bromo-2-methylpropane.",
                intermediate_type=IntermediateType.PRODUCT,
                reactants_label="(CH3)3C+ + Br-",
                products_label="(CH3)3C-Br",
                activation_energy_kj_mol=16.0,
                reaction_energy_kj_mol=-92.0,
                curved_arrows=[
                    CurvedArrow(
                        source_type="lone_pair",
                        source_label="Br-_lone_pair",
                        source_coords=(0.75, 0.50),
                        target_type="atom",
                        target_label="Tertiary_C+",
                        target_coords=(0.40, 0.50),
                        arrow_type=ArrowType.TWO_ELECTRON,
                    ),
                ],
                key_bonds_formed=["C-Br (sigma)"],
                key_bonds_broken=[],
            ),
        ],
        energy_profile=[
            ReactionEnergyPoint(0.0, 0.0, "ground_state", "Reactants: 2-Methylpropene + HBr"),
            ReactionEnergyPoint(0.40, 58.0, "transition_state", "TS1: Alkene Protonation"),
            ReactionEnergyPoint(0.60, 24.0, "intermediate", "Intermediate: (CH3)3C+ + Br-"),
            ReactionEnergyPoint(0.80, 40.0, "transition_state", "TS2: Halide Capture"),
            ReactionEnergyPoint(1.0, -68.0, "ground_state", "Product: 2-Bromo-2-methylpropane"),
        ],
    ),
}


class MechanismService:
    """Analytical service for organic chemistry reaction mechanisms and free energy landscapes."""

    @staticmethod
    def get_mechanisms() -> List[OrganicReactionMechanism]:
        return list(ORGANIC_MECHANISMS.values())

    @staticmethod
    def get_mechanism_by_id(mech_id: str) -> Optional[OrganicReactionMechanism]:
        return ORGANIC_MECHANISMS.get(mech_id.lower().strip())

    @staticmethod
    def interpolate_reaction_coordinate(
        points: List[ReactionEnergyPoint], resolution: int = 50
    ) -> Tuple[List[float], List[float]]:
        """
        Synthesizes a smooth continuous Hermite reaction coordinate curve between key states.
        """
        if not points:
            return [], []

        sorted_points = sorted(points, key=lambda p: p.reaction_coordinate)
        n = len(sorted_points)

        grid = [round(i / (resolution - 1), 3) for i in range(resolution)]
        curve = []

        for x in grid:
            # Find interval
            if x <= sorted_points[0].reaction_coordinate:
                curve.append(round(sorted_points[0].gibbs_free_energy_kj_mol, 2))
                continue
            if x >= sorted_points[-1].reaction_coordinate:
                curve.append(round(sorted_points[-1].gibbs_free_energy_kj_mol, 2))
                continue

            # Identify bounding points
            for i in range(n - 1):
                p0 = sorted_points[i]
                p1 = sorted_points[i + 1]
                if p0.reaction_coordinate <= x <= p1.reaction_coordinate:
                    # Normalized segment parameter t in [0, 1]
                    span = p1.reaction_coordinate - p0.reaction_coordinate
                    t = (x - p0.reaction_coordinate) / span if span > 0 else 0.0

                    # Smoothstep / Hermite interpolation h(t) = 3t^2 - 2t^3
                    smooth_t = 3.0 * (t**2) - 2.0 * (t**3)
                    y = (
                        p0.gibbs_free_energy_kj_mol
                        + smooth_t * (p1.gibbs_free_energy_kj_mol - p0.gibbs_free_energy_kj_mol)
                    )
                    curve.append(round(y, 2))
                    break

        return grid, curve
