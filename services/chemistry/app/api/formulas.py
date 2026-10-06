"""
Formula API Endpoints.
"""
from fastapi import APIRouter, HTTPException
from services.chemistry.app.schemas.formula import (
    FormulaParseRequest, FormulaMassRequest, FormulaCompositionRequest, EmpiricalFormulaRequest
)
from services.chemistry.app.models.formula import (
    FormulaValidationResult, MolecularMassResult, PercentCompositionResult, EmpiricalFormulaResult
)
from services.chemistry.app.services.formula_validator import formula_validator
from services.chemistry.app.services.molecular_mass import molecular_mass_engine
from services.chemistry.app.services.composition import composition_engine
from services.chemistry.app.core.exceptions import InvalidFormulaError, UnknownElementError, UnsupportedChemistryOperationError

router = APIRouter(prefix="/formulas", tags=["Formulas"])


@router.post("/parse", response_model=FormulaValidationResult, summary="Parse and validate chemical formula")
def parse_chemical_formula(payload: FormulaParseRequest):
    return formula_validator.validate(payload.formula)


@router.post("/mass", response_model=MolecularMassResult, summary="Calculate molecular mass")
def calculate_molecular_mass(payload: FormulaMassRequest):
    try:
        return molecular_mass_engine.calculate(payload.formula)
    except (InvalidFormulaError, UnknownElementError) as e:
        raise HTTPException(status_code=400, detail=e.message)


@router.post("/composition", response_model=PercentCompositionResult, summary="Calculate percent composition")
def calculate_percent_composition(payload: FormulaCompositionRequest):
    try:
        return composition_engine.calculate_percent_composition(payload.formula)
    except (InvalidFormulaError, UnknownElementError) as e:
        raise HTTPException(status_code=400, detail=e.message)


@router.post("/empirical", response_model=EmpiricalFormulaResult, summary="Derive empirical formula from elemental ratios")
def calculate_empirical_formula(payload: EmpiricalFormulaRequest):
    try:
        return composition_engine.calculate_empirical_formula(payload.elemental_data)
    except (UnsupportedChemistryOperationError, UnknownElementError) as e:
        raise HTTPException(status_code=400, detail=e.message)
