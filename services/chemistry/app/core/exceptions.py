"""
Chemistry Engine Domain Exceptions.
"""

class ChemistryEngineError(Exception):
    """Base exception for all chemistry engine errors."""
    def __init__(self, message: str, code: str = "CHEMISTRY_ERROR", details: dict | None = None):
        super().__init__(message)
        self.message = message
        self.code = code
        self.details = details or {}


class ElementNotFoundError(ChemistryEngineError):
    """Raised when an element cannot be found by symbol, atomic number, or name."""
    def __init__(self, identifier: str | int):
        super().__init__(
            message=f"Element not found for identifier: {identifier}",
            code="ELEMENT_NOT_FOUND",
            details={"identifier": identifier}
        )


class CompoundNotFoundError(ChemistryEngineError):
    """Raised when a compound cannot be found by ID, formula, or name."""
    def __init__(self, identifier: str):
        super().__init__(
            message=f"Compound not found for identifier: '{identifier}'",
            code="COMPOUND_NOT_FOUND",
            details={"identifier": identifier}
        )


class InvalidFormulaError(ChemistryEngineError):
    """Raised when a chemical formula is syntactically or semantically invalid."""
    def __init__(self, formula: str, reason: str):
        super().__init__(
            message=f"Invalid chemical formula '{formula}': {reason}",
            code="INVALID_FORMULA",
            details={"formula": formula, "reason": reason}
        )


class UnknownElementError(InvalidFormulaError):
    """Raised when a formula contains an unrecognized chemical element symbol."""
    def __init__(self, formula: str, symbol: str):
        super().__init__(
            formula=formula,
            reason=f"Unrecognized element symbol '{symbol}'"
        )
        self.code = "UNKNOWN_ELEMENT"
        self.details["symbol"] = symbol


class InvalidReactionError(ChemistryEngineError):
    """Raised when a chemical reaction equation string is invalid."""
    def __init__(self, reaction: str, reason: str):
        super().__init__(
            message=f"Invalid chemical reaction '{reaction}': {reason}",
            code="INVALID_REACTION",
            details={"reaction": reaction, "reason": reason}
        )


class UnbalancedReactionError(InvalidReactionError):
    """Raised when an operation requires a balanced chemical reaction but gets an unbalanced one."""
    def __init__(self, reaction: str, atom_diff: dict):
        super().__init__(
            reaction=reaction,
            reason="Chemical reaction is not balanced"
        )
        self.code = "UNBALANCED_REACTION"
        self.details["atom_difference"] = atom_diff


class InvalidStoichiometryError(ChemistryEngineError):
    """Raised when stoichiometric parameters or calculation conditions are invalid."""
    def __init__(self, message: str, details: dict | None = None):
        super().__init__(
            message=message,
            code="INVALID_STOICHIOMETRY",
            details=details or {}
        )


class InvalidUnitError(ChemistryEngineError):
    """Raised when an unsupported or invalid unit is provided."""
    def __init__(self, unit: str, supported_units: list[str]):
        super().__init__(
            message=f"Invalid unit '{unit}'. Supported units: {', '.join(supported_units)}",
            code="INVALID_UNIT",
            details={"unit": unit, "supported_units": supported_units}
        )


class UnsupportedChemistryOperationError(ChemistryEngineError):
    """Raised when an operation is mathematically or chemically impossible."""
    def __init__(self, operation: str, reason: str):
        super().__init__(
            message=f"Operation '{operation}' failed: {reason}",
            code="UNSUPPORTED_OPERATION",
            details={"operation": operation, "reason": reason}
        )
