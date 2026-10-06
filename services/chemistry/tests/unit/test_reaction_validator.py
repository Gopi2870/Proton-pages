"""
Unit tests for Reaction Validator and Classifier.
"""
import pytest
from services.chemistry.app.services.reaction_validator import reaction_validator
from services.chemistry.app.models.reaction import ReactionType


def test_validate_balanced_reaction():
    res = reaction_validator.validate_reaction("2H2 + O2 -> 2H2O")
    assert res.is_valid is True
    assert res.is_balanced is True
    assert len(res.atom_difference) == 0


def test_validate_unbalanced_reaction():
    res = reaction_validator.validate_reaction("H2 + O2 -> H2O")
    assert res.is_valid is True
    assert res.is_balanced is False
    assert "O" in res.atom_difference
    assert res.atom_difference["O"] == 1  # 2 on left, 1 on right


def test_classify_synthesis():
    res = reaction_validator.classify_reaction("2H2 + O2 -> 2H2O")
    assert res.primary_type == ReactionType.SYNTHESIS


def test_classify_combustion():
    res = reaction_validator.classify_reaction("CH4 + 2O2 -> CO2 + 2H2O")
    assert res.primary_type == ReactionType.COMBUSTION


def test_classify_acid_base():
    res = reaction_validator.classify_reaction("HCl + NaOH -> NaCl + H2O")
    assert res.primary_type == ReactionType.ACID_BASE
