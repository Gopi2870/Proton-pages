"""
Thermochemistry and Hess's Law Endpoints.
"""
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query, status

from services.chemistry.app.services.thermo_service import ThermoService
from services.chemistry.app.schemas.thermo import (
    EquationThermoRequest,
    DirectReactionThermoRequest,
    ReactionThermochemistryResponse,
    HessSolveRequest,
    HessSolveResponse,
    ThermodynamicSpeciesResponse,
)

router = APIRouter(prefix="/thermo", tags=["Thermochemistry & Hess's Law"])

@router.get("/species", response_model=List[ThermodynamicSpeciesResponse])
def get_species(
    query: Optional[str] = Query(None, description="Search formula or name, e.g. 'H2O' or 'CO2'")
):
    """Retrieve standard state thermodynamic quantities (ΔH°f, S°, ΔG°f)."""
    if query:
        sp = ThermoService.get_species(query)
        if not sp:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Thermodynamic reference data for '{query}' not found."
            )
        return [ThermodynamicSpeciesResponse.model_validate(sp)]
    return [ThermodynamicSpeciesResponse.model_validate(s) for s in ThermoService.list_all_species()]

@router.post("/calculate", response_model=ReactionThermochemistryResponse)
def calculate_reaction_thermochemistry(payload: EquationThermoRequest):
    """
    Calculate reaction enthalpy (ΔH°rxn), entropy (ΔS°rxn), and Gibbs free energy (ΔG°(T))
    from a balanced chemical equation string.
    """
    try:
        reactants, products = ThermoService.parse_equation_components(payload.equation)
        result = ThermoService.calculate_reaction_thermo(
            reactants=reactants,
            products=products,
            temperature_kelvin=payload.temperature_kelvin
        )
        return ReactionThermochemistryResponse(
            balanced_equation=result.balanced_equation,
            temperature_kelvin=result.temperature_kelvin,
            delta_h_standard_kj=result.delta_h_standard_kj,
            delta_s_standard_j_k=result.delta_s_standard_j_k,
            delta_g_standard_kj=result.delta_g_standard_kj,
            is_exothermic=result.is_exothermic,
            is_spontaneous=result.is_spontaneous,
            spontaneity_condition=result.spontaneity_condition,
            equilibrium_constant_k=result.equilibrium_constant_k,
            reactants_breakdown=result.reactants_breakdown,
            products_breakdown=result.products_breakdown
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(e))

@router.post("/calculate-direct", response_model=ReactionThermochemistryResponse)
def calculate_reaction_thermochemistry_direct(payload: DirectReactionThermoRequest):
    """Calculate reaction thermodynamics from structured reactant and product lists."""
    try:
        reactants = [(r.coefficient, r.formula) for r in payload.reactants]
        products = [(p.coefficient, p.formula) for p in payload.products]
        result = ThermoService.calculate_reaction_thermo(
            reactants=reactants,
            products=products,
            temperature_kelvin=payload.temperature_kelvin
        )
        return ReactionThermochemistryResponse(
            balanced_equation=result.balanced_equation,
            temperature_kelvin=result.temperature_kelvin,
            delta_h_standard_kj=result.delta_h_standard_kj,
            delta_s_standard_j_k=result.delta_s_standard_j_k,
            delta_g_standard_kj=result.delta_g_standard_kj,
            is_exothermic=result.is_exothermic,
            is_spontaneous=result.is_spontaneous,
            spontaneity_condition=result.spontaneity_condition,
            equilibrium_constant_k=result.equilibrium_constant_k,
            reactants_breakdown=result.reactants_breakdown,
            products_breakdown=result.products_breakdown
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(e))

@router.post("/hess-solve", response_model=HessSolveResponse)
def solve_hess_law(payload: HessSolveRequest):
    """
    Solve Hess's Law additive pathway using Gaussian elimination on the stoichiometric matrix.
    Finds integer or fractional multipliers to synthesize the target reaction from intermediate steps.
    """
    try:
        intermediates = [
            {"equation": item.equation, "delta_h_kj": item.delta_h_kj}
            for item in payload.intermediate_reactions
        ]
        result = ThermoService.solve_hess_law(payload.target_equation, intermediates)
        if not result.is_solvable:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=result.explanation
            )
        return HessSolveResponse(
            target_equation=result.target_equation,
            target_delta_h_kj=result.target_delta_h_kj,
            steps=[
                {
                    "equation": s.equation,
                    "original_delta_h_kj": s.original_delta_h_kj,
                    "multiplier": s.multiplier,
                    "effective_delta_h_kj": s.effective_delta_h_kj
                }
                for s in result.steps
            ],
            is_solvable=result.is_solvable,
            method=result.method,
            explanation=result.explanation
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(e))
