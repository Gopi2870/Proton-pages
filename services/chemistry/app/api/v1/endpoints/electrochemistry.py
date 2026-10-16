"""
Electrochemistry and Nernst Equation Endpoints.
"""
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query, status

from services.chemistry.app.services.electrochemistry_service import ElectrochemistryService
from services.chemistry.app.schemas.electrochemistry import (
    GalvanicCellRequest,
    GalvanicCellResponse,
    ElectrolysisRequest,
    ElectrolysisResponse,
    StandardReductionPotentialResponse,
)

router = APIRouter(prefix="/electrochemistry", tags=["Electrochemistry & Galvanic Cells"])

@router.get("/reduction-potentials", response_model=List[StandardReductionPotentialResponse])
def get_reduction_potentials(
    species: Optional[str] = Query(None, description="Filter by species symbol, e.g. 'Cu', 'Zn', 'Fe'")
):
    """Retrieve the electrochemical series of standard reduction potentials vs SHE."""
    if species:
        half_rxn = ElectrochemistryService.find_half_reaction(species)
        if not half_rxn:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Half-reaction for species '{species}' not found in standard reduction table."
            )
        return [StandardReductionPotentialResponse.model_validate(half_rxn)]
    return [StandardReductionPotentialResponse.model_validate(p) for p in ElectrochemistryService.list_reduction_potentials()]

@router.post("/cell-potential", response_model=GalvanicCellResponse)
def calculate_galvanic_cell_potential(payload: GalvanicCellRequest):
    """
    Calculate galvanic cell potential (E°cell), non-standard potential via Nernst equation (Ecell),
    reaction quotient (Q), standard Gibbs free energy (ΔG°), and equilibrium constant (K).
    """
    try:
        result = ElectrochemistryService.calculate_galvanic_cell(
            cathode_species=payload.cathode_species,
            anode_species=payload.anode_species,
            cathode_molarity=payload.cathode_molarity,
            anode_molarity=payload.anode_molarity,
            temperature_kelvin=payload.temperature_kelvin
        )
        return GalvanicCellResponse(
            anode_half_reaction=result.anode_half_reaction,
            cathode_half_reaction=result.cathode_half_reaction,
            overall_reaction=result.overall_reaction,
            cell_notation=result.cell_notation,
            electrons_transferred_n=result.electrons_transferred_n,
            standard_potential_volts=result.standard_potential_volts,
            cell_potential_volts=result.cell_potential_volts,
            reaction_quotient_q=result.reaction_quotient_q,
            standard_gibbs_free_energy_kj=result.standard_gibbs_free_energy_kj,
            equilibrium_constant_k=result.equilibrium_constant_k,
            is_spontaneous=result.is_spontaneous,
            temperature_kelvin=result.temperature_kelvin,
            nernst_correction_volts=result.nernst_correction_volts
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(e))

@router.post("/electrolysis", response_model=ElectrolysisResponse)
def calculate_electrolysis(payload: ElectrolysisRequest):
    """
    Calculate mass of substance deposited or volume of gas evolved via Faraday's Law of Electrolysis.
    m = (I * t * M) / (n * F)
    """
    try:
        result = ElectrochemistryService.calculate_electrolysis(
            species=payload.species,
            molar_mass_g_mol=payload.molar_mass_g_mol,
            electrons_per_ion_n=payload.electrons_per_ion_n,
            current_amperes=payload.current_amperes,
            time_seconds=payload.time_seconds
        )
        return ElectrolysisResponse(
            species_deposited=result.species_deposited,
            molar_mass_g_mol=result.molar_mass_g_mol,
            electrons_per_ion_n=result.electrons_per_ion_n,
            current_amperes=result.current_amperes,
            time_seconds=result.time_seconds,
            total_charge_coulombs=result.total_charge_coulombs,
            moles_electrons=result.moles_electrons,
            moles_substance=result.moles_substance,
            mass_deposited_grams=result.mass_deposited_grams,
            gas_volume_liters_stp=result.gas_volume_liters_stp
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(e))
