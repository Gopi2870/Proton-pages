"""
Unit tests for Reaction Parser.
"""
import pytest
from services.chemistry.app.services.reaction_parser import reaction_parser
from services.chemistry.app.core.exceptions import InvalidReactionError


def test_parse_simple_reaction():
    parsed = reaction_parser.parse("H2 + O2 -> H2O")
    assert len(parsed.reactants) == 2
    assert len(parsed.products) == 1
    assert parsed.reactants[0].formula == "H2"
    assert parsed.reactants[0].coefficient == 1
    assert parsed.products[0].formula == "H2O"


def test_parse_coefficients_and_states():
    parsed = reaction_parser.parse("2 H2(g) + O2(g) -> 2 H2O(l)")
    assert parsed.reactants[0].coefficient == 2
    assert parsed.reactants[0].state == "g"
    assert parsed.reactants[1].coefficient == 1
    assert parsed.products[0].coefficient == 2
    assert parsed.products[0].state == "l"


def test_invalid_reaction_missing_arrow():
    with pytest.raises(InvalidReactionError):
        reaction_parser.parse("H2 + O2 H2O")
