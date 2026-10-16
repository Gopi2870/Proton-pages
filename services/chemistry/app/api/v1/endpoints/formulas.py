"""
Chemical Formula Parsing and Computation Endpoints.
"""
from fastapi import APIRouter, HTTPException
from services.chemistry.app.main import chemistry_engine
from services.chemistry.app.models.formula import (
    FormulaComposition, FormulaValidationResult, MolecularMassResult,
    PercentCompositionResult, EmpiricalFormulaResult
)
from services.chemistry.app.schemas.formula import (
    FormulaParseRequest, FormulaMassRequest, FormulaCompositionRequest, EmpiricalFormulaRequest
)
from services.chemistry.app.core.exceptions import InvalidFormulaError

router = APIRouter(prefix="/formulas", tags=["Chemical Formulas"])

@router.post("/parse", response_model=FormulaComposition, summary="Parse Chemical Formula")
def parse_formula(req: FormulaParseRequest):
    """
    Parse a chemical formula string into structured elemental composition AST.
    """
    try:
        return chemistry_engine.parse_formula(req.formula)
    except InvalidFormulaError as e:
        raise HTTPException(status_code=422, detail={"code": e.code, "message": e.message, "details": e.details})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/validate", response_model=FormulaValidationResult, summary="Validate Chemical Formula")
def validate_formula(req: FormulaParseRequest):
    """
    Validate formula syntax and chemical valence rules.
    """
    return chemistry_engine.validate_formula(req.formula)

@router.post("/mass", response_model=MolecularMassResult, summary="Calculate Molecular Molar Mass")
def calculate_molecular_mass(req: FormulaMassRequest):
    """
    Compute IUPAC standard molecular mass and elemental mass contributions.
    """
    try:
        return chemistry_engine.calculate_molecular_mass(req.formula)
    except InvalidFormulaError as e:
        raise HTTPException(status_code=422, detail={"code": e.code, "message": e.message, "details": e.details})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/composition", response_model=PercentCompositionResult, summary="Calculate Elemental Percent Composition")
def calculate_percent_composition(req: FormulaCompositionRequest):
    """
    Compute elemental mass percentages for a substance formula.
    """
    try:
        return chemistry_engine.calculate_percent_composition(req.formula)
    except InvalidFormulaError as e:
        raise HTTPException(status_code=422, detail={"code": e.code, "message": e.message, "details": e.details})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/empirical", response_model=EmpiricalFormulaResult, summary="Derive Empirical Formula")
def calculate_empirical_formula(req: EmpiricalFormulaRequest):
    """
    Derive the empirical formula from mass percent or elemental masses.
    """
    try:
        return chemistry_engine.calculate_empirical_formula(req.elemental_data)
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))
