"""
Stoichiometry API Endpoints.
"""
from fastapi import APIRouter, HTTPException
from services.chemistry.app.schemas.stoichiometry import (
    LimitingReactantRequest, TheoreticalYieldRequest, PercentYieldRequest,
    MolarityRequest, DilutionRequest, UnitConversionRequest, UnitConversionResponse
)
from services.chemistry.app.models.stoichiometry import (
    LimitingReactantResult, TheoreticalYieldResult, PercentYieldResult, MolarityResult, DilutionResult
)
from services.chemistry.app.services.stoichiometry import stoichiometry_engine
from services.chemistry.app.core.units import convert_mass, convert_amount, convert_volume, convert_concentration
from services.chemistry.app.core.exceptions import InvalidStoichiometryError, InvalidUnitError, ChemistryEngineError

router = APIRouter(prefix="/stoichiometry", tags=["Stoichiometry"])


@router.post("/limiting-reactant", response_model=LimitingReactantResult, summary="Calculate limiting and excess reactants")
def calculate_limiting_reactant(payload: LimitingReactantRequest):
    try:
        return stoichiometry_engine.calculate_limiting_reactant(payload.equation, payload.reactants)
    except ChemistryEngineError as e:
        raise HTTPException(status_code=400, detail=e.message)


@router.post("/yield", response_model=TheoreticalYieldResult, summary="Calculate theoretical yield for target product")
def calculate_theoretical_yield(payload: TheoreticalYieldRequest):
    try:
        return stoichiometry_engine.calculate_theoretical_yield(
            payload.equation, payload.reactants, payload.target_product
        )
    except ChemistryEngineError as e:
        raise HTTPException(status_code=400, detail=e.message)


@router.post("/percent-yield", response_model=PercentYieldResult, summary="Calculate percent yield")
def calculate_percent_yield(payload: PercentYieldRequest):
    try:
        return stoichiometry_engine.calculate_percent_yield(payload.actual_yield_g, payload.theoretical_yield_g)
    except ChemistryEngineError as e:
        raise HTTPException(status_code=400, detail=e.message)


@router.post("/molarity", response_model=MolarityResult, summary="Calculate solution molarity")
def calculate_molarity(payload: MolarityRequest):
    try:
        if payload.moles is not None and payload.volume_liters is not None:
            return stoichiometry_engine.molarity(payload.moles, payload.volume_liters)
        elif payload.molarity is not None and payload.volume_liters is not None:
            moles = payload.molarity * payload.volume_liters
            return MolarityResult(moles=round(moles, 6), volume_liters=payload.volume_liters, molarity=payload.molarity)
        elif payload.moles is not None and payload.molarity is not None:
            v = payload.moles / payload.molarity
            return MolarityResult(moles=payload.moles, volume_liters=round(v, 6), molarity=payload.molarity)
        else:
            raise HTTPException(status_code=400, detail="Provide at least 2 parameters among moles, volume_liters, and molarity")
    except ChemistryEngineError as e:
        raise HTTPException(status_code=400, detail=e.message)


@router.post("/dilution", response_model=DilutionResult, summary="Calculate dilution (M1V1 = M2V2)")
def calculate_dilution(payload: DilutionRequest):
    try:
        return stoichiometry_engine.dilution(m1=payload.m1, v1=payload.v1, m2=payload.m2, v2=payload.v2)
    except ChemistryEngineError as e:
        raise HTTPException(status_code=400, detail=e.message)


@router.post("/convert-units", response_model=UnitConversionResponse, summary="Convert chemistry units")
def convert_units(payload: UnitConversionRequest):
    try:
        u_type = payload.unit_type.lower()
        if u_type == "mass":
            converted = convert_mass(payload.value, payload.from_unit, payload.to_unit)
        elif u_type == "amount":
            converted = convert_amount(payload.value, payload.from_unit, payload.to_unit)
        elif u_type == "volume":
            converted = convert_volume(payload.value, payload.from_unit, payload.to_unit)
        elif u_type == "concentration":
            converted = convert_concentration(payload.value, payload.from_unit, payload.to_unit)
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported unit_type '{payload.unit_type}'")

        return UnitConversionResponse(
            original_value=payload.value,
            from_unit=payload.from_unit,
            converted_value=round(converted, 6),
            to_unit=payload.to_unit
        )
    except InvalidUnitError as e:
        raise HTTPException(status_code=400, detail=e.message)
