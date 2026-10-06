"""
Main Python Library Facade for Proton Pages Chemistry Engine.
Provides direct Python API access to all underlying chemistry engines without HTTP overhead.
"""
from typing import List, Dict, Optional, Any
from services.chemistry.app.services.element_service import element_service
from services.chemistry.app.services.compound_service import compound_service
from services.chemistry.app.services.formula_parser import parse_formula as parser_func
from services.chemistry.app.services.formula_validator import formula_validator
from services.chemistry.app.services.molecular_mass import molecular_mass_engine
from services.chemistry.app.services.composition import composition_engine
from services.chemistry.app.services.reaction_parser import reaction_parser
from services.chemistry.app.services.equation_balancer import equation_balancer
from services.chemistry.app.services.reaction_validator import reaction_validator
from services.chemistry.app.services.stoichiometry import stoichiometry_engine
from services.chemistry.app.services.chemistry_search import chemistry_search_engine

from services.chemistry.app.models.element import Element
from services.chemistry.app.models.compound import Compound
from services.chemistry.app.models.formula import (
    FormulaComposition, FormulaValidationResult, MolecularMassResult,
    PercentCompositionResult, EmpiricalFormulaResult
)
from services.chemistry.app.models.reaction import (
    ParsedReaction, BalancedReaction, ReactionValidationResult, ReactionClassificationResult
)
from services.chemistry.app.models.stoichiometry import (
    ReactantAmountInput, LimitingReactantResult, TheoreticalYieldResult,
    PercentYieldResult, MolarityResult, DilutionResult
)


class ChemistryEngine:
    """
    Unified Scientific Computing Python Facade for Chemistry Operations.
    """

    # Element Database Operations
    @staticmethod
    def get_element(identifier: str | int) -> Element:
        return element_service.get_element(identifier)

    @staticmethod
    def list_elements(skip: int = 0, limit: int = 118) -> List[Element]:
        return element_service.list_elements(skip=skip, limit=limit)

    @staticmethod
    def search_elements(query: str) -> List[Element]:
        return element_service.search_elements(query)

    # Compound Database Operations
    @staticmethod
    def get_compound(identifier: str) -> Compound:
        try:
            return compound_service.get_compound_by_id(identifier)
        except Exception:
            try:
                return compound_service.get_compound_by_formula(identifier)
            except Exception:
                return compound_service.get_compound_by_name(identifier)

    @staticmethod
    def search_compounds(query: str) -> List[Compound]:
        return compound_service.search_compounds(query)

    # Formula Operations
    @staticmethod
    def validate_formula(formula: str) -> FormulaValidationResult:
        return formula_validator.validate(formula)

    @staticmethod
    def parse_formula(formula: str) -> FormulaComposition:
        return parser_func(formula)

    @staticmethod
    def calculate_molecular_mass(formula: str) -> MolecularMassResult:
        return molecular_mass_engine.calculate(formula)

    @staticmethod
    def calculate_percent_composition(formula: str) -> PercentCompositionResult:
        return composition_engine.calculate_percent_composition(formula)

    @staticmethod
    def calculate_empirical_formula(elemental_data: Dict[str, float]) -> EmpiricalFormulaResult:
        return composition_engine.calculate_empirical_formula(elemental_data)

    # Reaction Operations
    @staticmethod
    def parse_reaction(equation: str) -> ParsedReaction:
        return reaction_parser.parse(equation)

    @staticmethod
    def balance_reaction(equation: str) -> BalancedReaction:
        return equation_balancer.balance(equation)

    @staticmethod
    def validate_reaction(equation: str) -> ReactionValidationResult:
        return reaction_validator.validate_reaction(equation)

    @staticmethod
    def classify_reaction(equation: str) -> ReactionClassificationResult:
        return reaction_validator.classify_reaction(equation)

    # Stoichiometry Operations
    @staticmethod
    def calculate_limiting_reactant(
        equation: str, reactants: List[ReactantAmountInput]
    ) -> LimitingReactantResult:
        return stoichiometry_engine.calculate_limiting_reactant(equation, reactants)

    @staticmethod
    def calculate_theoretical_yield(
        equation: str, reactants: List[ReactantAmountInput], target_product: str
    ) -> TheoreticalYieldResult:
        return stoichiometry_engine.calculate_theoretical_yield(equation, reactants, target_product)

    @staticmethod
    def calculate_percent_yield(actual_yield_g: float, theoretical_yield_g: float) -> PercentYieldResult:
        return stoichiometry_engine.calculate_percent_yield(actual_yield_g, theoretical_yield_g)

    @staticmethod
    def calculate_molarity(moles: float, volume_liters: float) -> MolarityResult:
        return stoichiometry_engine.molarity(moles, volume_liters)

    @staticmethod
    def calculate_dilution(
        m1: Optional[float] = None, v1: Optional[float] = None,
        m2: Optional[float] = None, v2: Optional[float] = None
    ) -> DilutionResult:
        return stoichiometry_engine.dilution(m1=m1, v1=v1, m2=m2, v2=v2)

    # Unified Search
    @staticmethod
    def search(query: str) -> Dict[str, Any]:
        return chemistry_search_engine.search(query)


# Global instance
chemistry_engine = ChemistryEngine()
