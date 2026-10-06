"""
Percent Composition and Empirical Formula Calculation Engine.
"""
from typing import Dict
from math import gcd
from functools import reduce
from services.chemistry.app.models.formula import PercentCompositionResult, EmpiricalFormulaResult
from services.chemistry.app.services.molecular_mass import molecular_mass_engine
from services.chemistry.app.services.element_service import element_service
from services.chemistry.app.core.exceptions import InvalidFormulaError, UnsupportedChemistryOperationError
from services.chemistry.app.core.config import config


class CompositionEngine:
    """
    Engine for calculating elemental percent composition and empirical formulas.
    """

    @staticmethod
    def calculate_percent_composition(formula: str) -> PercentCompositionResult:
        mass_result = molecular_mass_engine.calculate(formula)
        comp_map = {item.symbol: item.percentage for item in mass_result.elemental_contributions}

        return PercentCompositionResult(
            formula=formula,
            normalized_formula=mass_result.normalized_formula,
            molecular_mass=mass_result.molecular_mass,
            composition=comp_map,
            details=mass_result.elemental_contributions
        )

    @staticmethod
    def calculate_empirical_formula(
        elemental_data: Dict[str, float],
        tolerance: float = config.NUMERICAL_TOLERANCE
    ) -> EmpiricalFormulaResult:
        """
        Derives empirical formula from mass percentages or elemental masses.
        """
        if not elemental_data:
            raise UnsupportedChemistryOperationError("empirical_formula", "Elemental data cannot be empty")

        moles: Dict[str, float] = {}
        for symbol, amount in elemental_data.items():
            if amount <= 0:
                raise UnsupportedChemistryOperationError("empirical_formula", f"Amount for element '{symbol}' must be positive")
            element = element_service.get_element_by_symbol(symbol)
            moles[element.symbol] = amount / element.atomic_mass

        min_moles = min(moles.values())
        if min_moles <= 0:
            raise UnsupportedChemistryOperationError("empirical_formula", "Calculated moles must be positive")

        normalized_ratios: Dict[str, float] = {elem: m / min_moles for elem, m in moles.items()}

        # Find multiplier to turn float ratios into smallest integers (1 to 12)
        best_multiplier = 1
        smallest_error = float("inf")

        for mult in range(1, 13):
            err = sum(abs(round(r * mult) - (r * mult)) for r in normalized_ratios.values())
            if err < smallest_error:
                smallest_error = err
                best_multiplier = mult
            if err < 0.05:
                best_multiplier = mult
                break

        integer_counts: Dict[str, int] = {}
        for elem, r in normalized_ratios.items():
            integer_counts[elem] = max(1, int(round(r * best_multiplier)))

        # Simplify by GCD if possible
        if len(integer_counts) > 1:
            common_gcd = reduce(gcd, integer_counts.values())
            if common_gcd > 1:
                for elem in integer_counts:
                    integer_counts[elem] //= common_gcd

        # Format empirical formula string
        formula_parts = []
        # Standard Hill system order: C first, then H, then alphabetical
        sorted_keys = sorted(integer_counts.keys())
        if "C" in integer_counts:
            sorted_keys.remove("C")
            sorted_keys.insert(0, "C")
            if "H" in integer_counts:
                sorted_keys.remove("H")
                sorted_keys.insert(1, "H")

        for elem in sorted_keys:
            c = integer_counts[elem]
            formula_parts.append(f"{elem}{c if c > 1 else ''}")

        empirical_str = "".join(formula_parts)

        return EmpiricalFormulaResult(
            empirical_formula=empirical_str,
            element_counts=integer_counts,
            mole_ratios={elem: round(m, 6) for elem, m in moles.items()},
            normalized_ratios={elem: round(r, 4) for elem, r in normalized_ratios.items()}
        )


composition_engine = CompositionEngine()
