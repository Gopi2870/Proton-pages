"""
Reaction Validation and Deterministic Classification Engine.
"""
from typing import Dict, List
from services.chemistry.app.models.reaction import (
    ReactionValidationResult, ReactionClassificationResult, ReactionType, ParsedReaction
)
from services.chemistry.app.services.reaction_parser import reaction_parser
from services.chemistry.app.services.formula_parser import parse_formula
from services.chemistry.app.core.exceptions import InvalidReactionError


class ReactionValidator:
    """
    Validates chemical reaction balance and classifies reaction types.
    """

    @staticmethod
    def validate_reaction(equation: str) -> ReactionValidationResult:
        try:
            parsed = reaction_parser.parse(equation)

            reactant_atoms: Dict[str, int] = {}
            for sp in parsed.reactants:
                comp = parse_formula(sp.formula)
                for elem, cnt in comp.elements.items():
                    reactant_atoms[elem] = reactant_atoms.get(elem, 0) + cnt * sp.coefficient

            product_atoms: Dict[str, int] = {}
            for sp in parsed.products:
                comp = parse_formula(sp.formula)
                for elem, cnt in comp.elements.items():
                    product_atoms[elem] = product_atoms.get(elem, 0) + cnt * sp.coefficient

            all_elems = set(reactant_atoms.keys()).union(set(product_atoms.keys()))
            atom_diff: Dict[str, int] = {}
            is_balanced = True

            for elem in all_elems:
                r_cnt = reactant_atoms.get(elem, 0)
                p_cnt = product_atoms.get(elem, 0)
                diff = r_cnt - p_cnt
                if diff != 0:
                    is_balanced = False
                    atom_diff[elem] = diff

            errors = []
            if not is_balanced:
                err_parts = [f"{elem}: left={reactant_atoms.get(elem,0)}, right={product_atoms.get(elem,0)}" for elem in atom_diff]
                errors.append(f"Atom conservation failed for: {', '.join(err_parts)}")

            return ReactionValidationResult(
                raw_equation=equation,
                is_valid=True,
                is_balanced=is_balanced,
                reactant_atoms=reactant_atoms,
                product_atoms=product_atoms,
                atom_difference=atom_diff,
                errors=errors
            )

        except InvalidReactionError as e:
            return ReactionValidationResult(
                raw_equation=equation,
                is_valid=False,
                is_balanced=False,
                reactant_atoms={},
                product_atoms={},
                atom_difference={},
                errors=[e.message]
            )
        except Exception as e:
            return ReactionValidationResult(
                raw_equation=equation,
                is_valid=False,
                is_balanced=False,
                reactant_atoms={},
                product_atoms={},
                atom_difference={},
                errors=[f"Validation error: {str(e)}"]
            )

    @staticmethod
    def classify_reaction(equation: str) -> ReactionClassificationResult:
        parsed = reaction_parser.parse(equation)

        r_formulas = [sp.formula for sp in parsed.reactants]
        p_formulas = [sp.formula for sp in parsed.products]

        num_r = len(r_formulas)
        num_p = len(p_formulas)

        # 1. Synthesis / Combination: A + B -> C (Multiple reactants -> 1 product)
        if num_r > 1 and num_p == 1:
            return ReactionClassificationResult(
                reaction=equation,
                primary_type=ReactionType.SYNTHESIS,
                confidence=0.95,
                explanation="Multiple reactants combine to form a single product."
            )

        # 2. Decomposition: A -> B + C (1 reactant -> Multiple products)
        if num_r == 1 and num_p > 1:
            return ReactionClassificationResult(
                reaction=equation,
                primary_type=ReactionType.DECOMPOSITION,
                confidence=0.95,
                explanation="Single reactant breaks down into multiple simpler products."
            )

        # 3. Hydrocarbon Combustion: CxHy (Oz) + O2 -> CO2 + H2O
        has_o2 = "O2" in r_formulas
        has_co2 = "CO2" in p_formulas
        has_h2o = "H2O" in p_formulas
        if has_o2 and has_co2 and has_h2o:
            return ReactionClassificationResult(
                reaction=equation,
                primary_type=ReactionType.COMBUSTION,
                secondary_types=[ReactionType.REDOX],
                confidence=0.98,
                explanation="Hydrocarbon fuel reacts with oxygen gas (O2) producing carbon dioxide (CO2) and water (H2O)."
            )

        # 4. Acid-Base Neutralization: Acid + Base -> Salt + H2O
        if has_h2o:
            # Check for H-bearing acid and OH-bearing base in reactants
            has_oh = any("OH" in f for f in r_formulas)
            has_h_acid = any(f.startswith("H") and f != "H2O" and f != "H2" for f in r_formulas)
            if has_oh and has_h_acid:
                return ReactionClassificationResult(
                    reaction=equation,
                    primary_type=ReactionType.ACID_BASE,
                    secondary_types=[ReactionType.DOUBLE_REPLACEMENT],
                    confidence=0.90,
                    explanation="Acid reacts with hydroxide base yielding water and a neutral salt."
                )

        # 5. Single Replacement: Element + Compound -> Element + Compound
        r_is_element = [len(parse_formula(f).elements) == 1 for f in r_formulas]
        p_is_element = [len(parse_formula(f).elements) == 1 for f in p_formulas]

        if num_r == 2 and num_p == 2:
            if any(r_is_element) and any(p_is_element):
                return ReactionClassificationResult(
                    reaction=equation,
                    primary_type=ReactionType.SINGLE_REPLACEMENT,
                    secondary_types=[ReactionType.REDOX],
                    confidence=0.92,
                    explanation="An uncombined element displaces another element from a compound."
                )

            # 6. Double Replacement / Precipitation: Compound + Compound -> Compound + Compound
            if all(not is_elem for is_elem in r_is_element) and all(not is_elem for is_elem in p_is_element):
                return ReactionClassificationResult(
                    reaction=equation,
                    primary_type=ReactionType.DOUBLE_REPLACEMENT,
                    confidence=0.85,
                    explanation="Cations and anions of two ionic compounds exchange places."
                )

        # Default fallback
        return ReactionClassificationResult(
            reaction=equation,
            primary_type=ReactionType.UNKNOWN,
            confidence=0.50,
            explanation="Reaction pattern is complex or does not strictly match canonical high-school categories."
        )


reaction_validator = ReactionValidator()
