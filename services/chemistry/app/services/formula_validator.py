"""
Chemical Formula Validator.
"""
from services.chemistry.app.models.formula import FormulaValidationResult
from services.chemistry.app.services.formula_parser import parse_formula
from services.chemistry.app.core.exceptions import InvalidFormulaError


class FormulaValidator:
    """
    Validates chemical formulas and provides structured validation errors.
    """

    @staticmethod
    def validate(formula: str) -> FormulaValidationResult:
        if not formula or not formula.strip():
            return FormulaValidationResult(
                is_valid=False,
                formula=formula or "",
                normalized_formula=None,
                composition=None,
                errors=["Formula string is empty"]
            )

        # Check lead numbers (e.g. "2H" or "3NaCl")
        clean_formula = formula.strip()
        if clean_formula[0].isdigit():
            return FormulaValidationResult(
                is_valid=False,
                formula=formula,
                normalized_formula=None,
                composition=None,
                errors=["Chemical formula cannot begin with a coefficient digit (e.g. '2H'). Coefficients belong to reactions."]
            )

        try:
            comp = parse_formula(clean_formula)

            # Reconstruct normalized formula string
            normalized_parts = []
            for elem, count in comp.elements.items():
                if count == 1:
                    normalized_parts.append(elem)
                else:
                    normalized_parts.append(f"{elem}{count}")

            norm_formula = "".join(normalized_parts)
            if comp.charge != 0:
                sign = "+" if comp.charge > 0 else "-"
                val = abs(comp.charge)
                norm_formula += f"{sign}{val}" if val > 1 else sign

            return FormulaValidationResult(
                is_valid=True,
                formula=formula,
                normalized_formula=norm_formula,
                composition=comp,
                errors=[]
            )

        except InvalidFormulaError as e:
            return FormulaValidationResult(
                is_valid=False,
                formula=formula,
                normalized_formula=None,
                composition=None,
                errors=[e.message]
            )
        except Exception as e:
            return FormulaValidationResult(
                is_valid=False,
                formula=formula,
                normalized_formula=None,
                composition=None,
                errors=[f"Unexpected formula validation error: {str(e)}"]
            )


formula_validator = FormulaValidator()
