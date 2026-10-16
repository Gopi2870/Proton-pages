"""
Stoichiometry, Solutions, and Yield Endpoints.
"""
from fastapi import APIRouter, HTTPException
from services.chemistry.app.main import chemistry_engine
from services.chemistry.app.models.stoichiometry import (
    LimitingReactantResult, TheoreticalYieldResult,
    PercentYieldResult, MolarityResult, DilutionResult
)
from services.chemistry.app.schemas.stoichiometry import (
    LimitingReactantRequest, TheoreticalYieldRequest, PercentYieldRequest,
    MolarityRequest, DilutionRequest, UnitConversionRequest, UnitConversionResponse
)
from services.chemistry.app.core.units import convert_mass, convert_amount, convert_volume, convert_concentration
from services.chemistry.app.core.exceptions import InvalidStoichiometryError, InvalidUnitError

router = APIRouter(prefix="/stoichiometry", tags=["Stoichiometry & Solutions"])

@router.post("/limiting-reactant", response_model=LimitingReactantResult, summary="Calculate Limiting Reactant")
def calculate_limiting_reactant(req: LimitingReactantRequest):
    """
    Determine the limiting reactant, excess reactant remainders, and stoichiometric product yields.
    """
    try:
        return chemistry_engine.calculate_limiting_reactant(req.equation, req.reactants)
    except InvalidStoichiometryError as e:
        raise HTTPException(status_code=422, detail={"code": e.code, "message": e.message, "details": e.details})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/theoretical-yield", response_model=TheoreticalYieldResult, summary="Calculate Theoretical Yield")
def calculate_theoretical_yield(req: TheoreticalYieldRequest):
    """
    Compute theoretical yield for a designated target product species.
    """
    try:
        return chemistry_engine.calculate_theoretical_yield(req.equation, req.reactants, req.target_product)
    except InvalidStoichiometryError as e:
        raise HTTPException(status_code=422, detail={"code": e.code, "message": e.message, "details": e.details})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/percent-yield", response_model=PercentYieldResult, summary="Calculate Percent Yield")
def calculate_percent_yield(req: PercentYieldRequest):
    """
    Compute percentage yield from isolated experimental mass and stoichiometric theoretical mass.
    """
    return chemistry_engine.calculate_percent_yield(req.actual_yield_g, req.theoretical_yield_g)

@router.post("/molarity", response_model=MolarityResult, summary="Calculate Molarity / Moles / Volume")
def calculate_molarity(req: MolarityRequest):
    """
    Solve for molarity, solute moles, or solution volume.
    """
    try:
        if req.moles is not None and req.volume_liters is not None:
            return chemistry_engine.calculate_molarity(req.moles, req.volume_liters)
        if req.molarity is not None and req.volume_liters is not None:
            moles = req.molarity * req.volume_liters
            return MolarityResult(moles=moles, volume_liters=req.volume_liters, molarity=req.molarity)
        if req.molarity is not None and req.moles is not None and req.molarity > 0:
            vol = req.moles / req.molarity
            return MolarityResult(moles=req.moles, volume_liters=vol, molarity=req.molarity)
        raise HTTPException(status_code=422, detail="Provide at least two of (moles, volume_liters, molarity).")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/dilution", response_model=DilutionResult, summary="Calculate Solution Dilution (M1V1 = M2V2)")
def calculate_dilution(req: DilutionRequest):
    """
    Solve M1V1 = M2V2 for any single unknown variable.
    """
    try:
        return chemistry_engine.calculate_dilution(m1=req.m1, v1=req.v1, m2=req.m2, v2=req.v2)
    except InvalidStoichiometryError as e:
        raise HTTPException(status_code=422, detail={"code": e.code, "message": e.message})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/convert-units", response_model=UnitConversionResponse, summary="Convert Physical & Chemical Units")
def convert_units(req: UnitConversionRequest):
    """
    Convert chemical units (mass: g/mg/kg, amount: mol/mmol, volume: L/mL, concentration: M/mM).
    """
    try:
        t = req.unit_type.lower()
        if t == "mass":
            converted = convert_mass(req.value, req.from_unit, req.to_unit)
        elif t == "amount":
            converted = convert_amount(req.value, req.from_unit, req.to_unit)
        elif t == "volume":
            converted = convert_volume(req.value, req.from_unit, req.to_unit)
        elif t == "concentration":
            converted = convert_concentration(req.value, req.from_unit, req.to_unit)
        else:
            raise HTTPException(status_code=422, detail=f"Unsupported unit type '{req.unit_type}'. Use mass, amount, volume, or concentration.")
        return UnitConversionResponse(
            original_value=req.value,
            from_unit=req.from_unit,
            converted_value=converted,
            to_unit=req.to_unit
        )
    except InvalidUnitError as e:
        raise HTTPException(status_code=422, detail={"code": e.code, "message": e.message})
