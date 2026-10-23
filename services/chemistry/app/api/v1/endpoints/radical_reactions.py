"""
FastAPI route endpoints for Radical Reaction Networks, Elementary Mechanisms,
Stiff Numerical ODE Kinetics, and Sensitivity Analysis.
"""

from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query
from app.schemas.radical_reactions import (
    RadicalMechanismSummarySchema,
    RadicalMechanismDetailSchema,
    RadicalSpeciesSchema,
    RadicalElementaryReactionSchema,
    ArrheniusRateLawSchema,
    RadicalSimulationRequest,
    RadicalSimulationResponse,
    SensitivityEntrySchema,
)
from app.services.radical_reaction_service import RadicalReactionService

router = APIRouter(prefix="/chemistry/radical-reactions", tags=["radical-reactions"])


@router.get("/mechanisms", response_model=List[RadicalMechanismSummarySchema])
def list_mechanisms(category: Optional[str] = Query(None, description="Filter by category (combustion, atmospheric, polymerization, biochemical)")):
    """
    Returns catalogue of validated radical reaction mechanisms.
    """
    mechanisms = RadicalReactionService.list_mechanisms()
    if category:
        mechanisms = [m for m in mechanisms if m.category.lower() == category.lower()]

    return [
        RadicalMechanismSummarySchema(
            id=m.id,
            name=m.name,
            category=m.category,
            description=m.description,
            species_count=len(m.species),
            reaction_count=len(m.reactions),
            reference_citation=m.reference_citation,
            validated_temperature_range_k=m.validated_temperature_range_k,
        )
        for m in mechanisms
    ]


@router.get("/mechanisms/{mechanism_id}", response_model=RadicalMechanismDetailSchema)
def get_mechanism_details(mechanism_id: str):
    """
    Retrieves full details for a radical mechanism including all elementary steps and thermodynamic data.
    """
    m = RadicalReactionService.get_mechanism(mechanism_id)
    if not m:
        raise HTTPException(
            status_code=404,
            detail=f"Radical mechanism '{mechanism_id}' not found in registry."
        )

    return RadicalMechanismDetailSchema(
        id=m.id,
        name=m.name,
        category=m.category,
        description=m.description,
        reference_citation=m.reference_citation,
        validated_temperature_range_k=m.validated_temperature_range_k,
        species=[
            RadicalSpeciesSchema(
                name=s.name,
                formula=s.formula,
                unpaired_electrons=s.unpaired_electrons,
                spin_multiplicity=s.spin_multiplicity,
                radical_type=s.radical_type,
                enthalpy_f_kj_mol=s.enthalpy_f_kj_mol,
                gibbs_f_kj_mol=s.gibbs_f_kj_mol,
                entropy_j_mol_k=s.entropy_j_mol_k,
                initial_concentration_m=s.initial_concentration_m,
                color_hex=s.color_hex,
                elements=s.elements,
            )
            for s in m.species
        ],
        reactions=[
            RadicalElementaryReactionSchema(
                id=r.id,
                equation=r.equation,
                role=r.role,
                reactants=r.reactants,
                products=r.products,
                rate_law=ArrheniusRateLawSchema(
                    pre_exponential_a=r.rate_law.pre_exponential_a,
                    temperature_exponent_n=r.rate_law.temperature_exponent_n,
                    activation_energy_kj_mol=r.rate_law.activation_energy_kj_mol,
                    description=r.rate_law.description,
                ),
                is_reversible=r.is_reversible,
                delta_h_rxn_kj_mol=r.delta_h_rxn_kj_mol,
            )
            for r in m.reactions
        ],
    )


@router.post("/simulate", response_model=RadicalSimulationResponse)
def simulate_radical_kinetics(payload: RadicalSimulationRequest):
    """
    Executes stiff numerical ODE integration with element conservation checks,
    radical pool tracking, QSSA comparison, and sensitivity analysis.
    """
    try:
        res = RadicalReactionService.simulate_mechanism(
            mechanism_id=payload.mechanism_id,
            temperature_k=payload.temperature_k,
            pressure_atm=payload.pressure_atm,
            total_time_s=payload.total_time_s,
            initial_concentrations=payload.initial_concentrations,
            max_steps=payload.max_steps,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return RadicalSimulationResponse(
        mechanism_id=res.mechanism_id,
        mechanism_name=res.mechanism_name,
        temperature_k=res.temperature_k,
        pressure_atm=res.pressure_atm,
        time_points_s=res.time_points_s,
        trajectories=res.trajectories,
        total_radical_pool=res.total_radical_pool,
        top_sensitivities=[
            SensitivityEntrySchema(
                species=s.species,
                reaction_id=s.reaction_id,
                sensitivity=s.sensitivity,
            )
            for s in res.top_sensitivities
        ],
        element_conservation_errors=res.element_conservation_errors,
        qssa_comparison=res.qssa_comparison,
        stiffness_ratio_estimate=res.stiffness_ratio_estimate,
        cpu_time_ms=res.cpu_time_ms,
    )
