"""
Chemical Reaction Parser.
"""
import re
from typing import List, Tuple
from services.chemistry.app.models.reaction import ParsedReaction, ReactionSpecies
from services.chemistry.app.core.exceptions import InvalidReactionError
from services.chemistry.app.core.constants import REACTION_ARROWS


class ReactionParser:
    """
    Tokenizer and parser for chemical reaction equations.
    """

    @staticmethod
    def parse(equation: str) -> ParsedReaction:
        if not equation or not equation.strip():
            raise InvalidReactionError(equation, "Reaction equation string is empty")

        clean_eq = equation.strip()

        # Find reaction arrow
        matched_arrow = None
        for arrow in REACTION_ARROWS:
            if arrow in clean_eq:
                matched_arrow = arrow
                break

        if not matched_arrow:
            raise InvalidReactionError(
                clean_eq,
                f"No valid reaction arrow found. Supported arrows: {', '.join(REACTION_ARROWS)}"
            )

        parts = clean_eq.split(matched_arrow)
        if len(parts) != 2:
            raise InvalidReactionError(clean_eq, "Reaction equation must contain exactly one reaction arrow")

        lhs_str, rhs_str = parts[0].strip(), parts[1].strip()

        if not lhs_str or not rhs_str:
            raise InvalidReactionError(clean_eq, "Reaction equation must have species on both left and right sides")

        reactants = ReactionParser._parse_side(lhs_str, clean_eq)
        products = ReactionParser._parse_side(rhs_str, clean_eq)

        is_reversible = matched_arrow in ("<->", "⇄")

        return ParsedReaction(
            raw_equation=clean_eq,
            reactants=reactants,
            products=products,
            reversible=is_reversible,
            arrow=matched_arrow
        )

    @staticmethod
    def _parse_side(side_str: str, full_eq: str) -> List[ReactionSpecies]:
        species_tokens = side_str.split("+")
        species_list: List[ReactionSpecies] = []

        for token in species_tokens:
            token = token.strip()
            if not token:
                raise InvalidReactionError(full_eq, "Empty species term (e.g. trailing '+' sign)")

            # Extract physical state symbol e.g. (g), (l), (s), (aq)
            state = None
            state_match = re.search(r"\((g|l|s|aq)\)$", token, re.IGNORECASE)
            if state_match:
                state = state_match.group(1).lower()
                token = token[: state_match.start()].strip()

            # Extract stoichiometric coefficient and formula
            coeff, formula = ReactionParser._extract_coefficient_and_formula(token, full_eq)

            species_list.append(
                ReactionSpecies(
                    coefficient=coeff,
                    formula=formula,
                    state=state,
                    charge=0
                )
            )

        return species_list

    @staticmethod
    def _extract_coefficient_and_formula(token: str, full_eq: str) -> Tuple[int, str]:
        # Leading digits e.g. "2H2O", "3 Ca(OH)2"
        match = re.match(r"^(\d+)\s*(.*)$", token)
        if match:
            coeff_str, formula_str = match.groups()
            if not formula_str:
                raise InvalidReactionError(full_eq, f"Invalid species token '{token}': missing formula after coefficient")
            return int(coeff_str), formula_str.strip()

        return 1, token.strip()


reaction_parser = ReactionParser()
