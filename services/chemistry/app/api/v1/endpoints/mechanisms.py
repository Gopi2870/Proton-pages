"""
FastAPI route endpoints for Organic Reaction Mechanisms, Curved Arrows & Energy Profiles.
"""

from typing import List
from fastapi import APIRouter, HTTPException
from app.schemas.mechanisms import (
    MechanismSummarySchema,
    MechanismDetailSchema,
    MechanismStepSchema,
    CurvedArrowSchema,
    ReactionEnergyPointSchema,
    EnergyProfileInterpolationRequest,
    EnergyProfileInterpolationResponse,
)
from app.services.mechanism_service import MechanismService
from app.models.mechanisms import ReactionEnergyPoint

router = APIRouter(prefix="/chemistry/mechanisms", tags=["mechanisms"])


@router.get("/presets", response_model=List[MechanismSummarySchema])
def list_reaction_mechanisms():
    """Returns curated catalogue of fundamental organic reaction mechanisms."""
    mechanisms = MechanismService.get_mechanisms()
    return [
        MechanismSummarySchema(
            id=m.id,
            name=m.name,
            mechanism_class=m.mechanism_class,
            overall_reaction=m.overall_reaction,
            substrate=m.substrate,
            nucleophile_or_reagent=m.nucleophile_or_reagent,
            solvent=m.solvent,
            stereochemical_outcome=m.stereochemical_outcome,
            kinetics_rate_law=m.kinetics_rate_law,
            step_count=len(m.steps),
            total_activation_barrier_kj_mol=max((s.activation_energy_kj_mol for s in m.steps), default=0.0),
            net_gibbs_energy_kj_mol=sum(s.reaction_energy_kj_mol for s in m.steps),
        )
        for m in mechanisms
    ]


@router.get("/presets/{mechanism_id}", response_model=MechanismDetailSchema)
def get_reaction_mechanism(mechanism_id: str):
    """Retrieves full curved-arrow steps, intermediates, and energy landscape for a mechanism."""
    m = MechanismService.get_mechanism_by_id(mechanism_id)
    if not m:
        raise HTTPException(
            status_code=404, detail=f"Reaction mechanism '{mechanism_id}' not found in database"
        )

    return MechanismDetailSchema(
        id=m.id,
        name=m.name,
        mechanism_class=m.mechanism_class,
        overall_reaction=m.overall_reaction,
        substrate=m.substrate,
        nucleophile_or_reagent=m.nucleophile_or_reagent,
        solvent=m.solvent,
        stereochemical_outcome=m.stereochemical_outcome,
        kinetics_rate_law=m.kinetics_rate_law,
        steps=[
            MechanismStepSchema(
                step_number=s.step_number,
                title=s.title,
                description=s.description,
                intermediate_type=s.intermediate_type,
                reactants_label=s.reactants_label,
                products_label=s.products_label,
                activation_energy_kj_mol=s.activation_energy_kj_mol,
                reaction_energy_kj_mol=s.reaction_energy_kj_mol,
                curved_arrows=[
                    CurvedArrowSchema(
                        source_type=a.source_type,
                        source_label=a.source_label,
                        source_coords=a.source_coords,
                        target_type=a.target_type,
                        target_label=a.target_label,
                        target_coords=a.target_coords,
                        arrow_type=a.arrow_type,
                        curvature_bias=a.curvature_bias,
                    )
                    for a in s.curved_arrows
                ],
                key_bonds_formed=s.key_bonds_formed,
                key_bonds_broken=s.key_bonds_broken,
            )
            for s in m.steps
        ],
        energy_profile=[
            ReactionEnergyPointSchema(
                reaction_coordinate=p.reaction_coordinate,
                gibbs_free_energy_kj_mol=p.gibbs_free_energy_kj_mol,
                point_type=p.point_type,
                label=p.label,
            )
            for p in m.energy_profile
        ],
        pedagogical_notes=m.pedagogical_notes,
    )


@router.post("/energy-profile/interpolate", response_model=EnergyProfileInterpolationResponse)
def interpolate_energy_profile(payload: EnergyProfileInterpolationRequest):
    """Computes smooth continuous free energy curve across reaction coordinate."""
    points = [
        ReactionEnergyPoint(
            reaction_coordinate=p.reaction_coordinate,
            gibbs_free_energy_kj_mol=p.gibbs_free_energy_kj_mol,
            point_type=p.point_type,
            label=p.label,
        )
        for p in payload.points
    ]
    grid, curve = MechanismService.interpolate_reaction_coordinate(points, payload.resolution)

    peaks = [p for p in payload.points if p.point_type == "transition_state"]
    valleys = [p for p in payload.points if p.point_type == "intermediate"]

    return EnergyProfileInterpolationResponse(
        coordinate_grid=grid,
        gibbs_energy_curve=curve,
        transition_state_peaks=peaks,
        intermediate_valleys=valleys,
    )
