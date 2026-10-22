"""
FastAPI route endpoints for Quantum Chemistry, Hückel Molecular Orbital Theory & Conjugated Pi-Systems.
"""

from typing import List
from fastapi import APIRouter, HTTPException
from app.schemas.quantum_chemistry import (
    HmoCalculationRequest,
    HmoCalculationResponse,
    ConjugatedPresetSummarySchema,
    ConjugatedAtomSchema,
    ConjugatedBondSchema,
    MolecularOrbitalLevelSchema,
)
from app.services.hmo_service import HmoService
from app.models.quantum_chemistry import ConjugatedAtom, ConjugatedBond

router = APIRouter(prefix="/chemistry/quantum", tags=["quantum"])


@router.get("/presets", response_model=List[ConjugatedPresetSummarySchema])
def list_conjugated_presets():
    """Returns curated catalogue of conjugated pi-systems (benzene, butadiene, ethylene, Cp-, naphthalene)."""
    presets = HmoService.get_presets()
    return [
        ConjugatedPresetSummarySchema(
            id=p.id,
            name=p.name,
            formula=p.formula,
            atom_count=len(p.atoms),
            pi_electron_count=sum(a.pi_electron_contribution for a in p.atoms),
            expected_aromaticity=p.expected_aromaticity,
            is_cyclic=p.is_cyclic,
            description=p.description,
            pedagogical_notes=p.pedagogical_notes,
        )
        for p in presets
    ]


@router.get("/presets/{preset_id}", response_model=HmoCalculationResponse)
def get_preset_hmo_analysis(preset_id: str, beta_ev: float = -2.70):
    """Calculates full Hückel molecular orbitals, HOMO-LUMO gap, and electron densities for a preset."""
    preset = HmoService.get_preset_by_id(preset_id)
    if not preset:
        raise HTTPException(
            status_code=404, detail=f"Conjugated preset '{preset_id}' not found in database"
        )

    res = HmoService.calculate_hmo(preset_id=preset.id, beta_value_ev=beta_ev)

    return HmoCalculationResponse(
        molecule_id=res.molecule_id,
        molecule_name=res.molecule_name,
        chemical_formula=res.chemical_formula,
        atom_count=res.atom_count,
        pi_electron_count=res.pi_electron_count,
        total_pi_energy_units=res.total_pi_energy_units,
        delocalization_energy_beta=res.delocalization_energy_beta,
        delocalization_energy_ev=res.delocalization_energy_ev,
        homo_lumo_gap_beta=res.homo_lumo_gap_beta,
        homo_lumo_gap_ev=res.homo_lumo_gap_ev,
        predicted_uv_lambda_nm=res.predicted_uv_lambda_nm,
        aromaticity_classification=res.aromaticity_classification,
        is_closed_shell=res.is_closed_shell,
        orbitals=[
            MolecularOrbitalLevelSchema(
                index=o.index,
                energy_coefficient_m=o.energy_coefficient_m,
                energy_ev=o.energy_ev,
                electron_occupancy=o.electron_occupancy,
                is_homo=o.is_homo,
                is_lumo=o.is_lumo,
                is_singly_occupied=o.is_singly_occupied,
                orbital_symmetry=o.orbital_symmetry,
                nodal_planes_count=o.nodal_planes_count,
                coefficients=o.coefficients,
                label=o.label,
            )
            for o in res.orbitals
        ],
        atomic_charges=res.atomic_charges,
        atomic_electron_densities=res.atomic_electron_densities,
        bond_orders=res.bond_orders,
        atoms=[
            ConjugatedAtomSchema(
                atom_id=a.atom_id,
                element=a.element,
                label=a.label,
                x_2d=a.x_2d,
                y_2d=a.y_2d,
                huckel_h=a.huckel_h,
                pi_electron_contribution=a.pi_electron_contribution,
            )
            for a in res.atoms
        ],
        bonds=[
            ConjugatedBondSchema(
                atom_i=b.atom_i,
                atom_j=b.atom_j,
                huckel_k=b.huckel_k,
            )
            for b in res.bonds
        ],
    )


@router.post("/calculate", response_model=HmoCalculationResponse)
def compute_custom_hmo(payload: HmoCalculationRequest):
    """Solves Hückel secular matrix for custom user-defined conjugated topology."""
    if payload.molecule_id:
        res = HmoService.calculate_hmo(
            preset_id=payload.molecule_id, beta_value_ev=payload.beta_value_ev
        )
    elif payload.custom_atoms and payload.custom_bonds:
        domain_atoms = [
            ConjugatedAtom(
                atom_id=a.atom_id,
                element=a.element,
                label=a.label,
                x_2d=a.x_2d,
                y_2d=a.y_2d,
                huckel_h=a.huckel_h,
                pi_electron_contribution=a.pi_electron_contribution,
            )
            for a in payload.custom_atoms
        ]
        domain_bonds = [
            ConjugatedBond(
                atom_i=b.atom_i,
                atom_j=b.atom_j,
                huckel_k=b.huckel_k,
            )
            for b in payload.custom_bonds
        ]
        res = HmoService.calculate_hmo(
            custom_atoms=domain_atoms,
            custom_bonds=domain_bonds,
            beta_value_ev=payload.beta_value_ev,
        )
    else:
        res = HmoService.calculate_hmo(preset_id="benzene", beta_value_ev=payload.beta_value_ev)

    return HmoCalculationResponse(
        molecule_id=res.molecule_id,
        molecule_name=res.molecule_name,
        chemical_formula=res.chemical_formula,
        atom_count=res.atom_count,
        pi_electron_count=res.pi_electron_count,
        total_pi_energy_units=res.total_pi_energy_units,
        delocalization_energy_beta=res.delocalization_energy_beta,
        delocalization_energy_ev=res.delocalization_energy_ev,
        homo_lumo_gap_beta=res.homo_lumo_gap_beta,
        homo_lumo_gap_ev=res.homo_lumo_gap_ev,
        predicted_uv_lambda_nm=res.predicted_uv_lambda_nm,
        aromaticity_classification=res.aromaticity_classification,
        is_closed_shell=res.is_closed_shell,
        orbitals=[
            MolecularOrbitalLevelSchema(
                index=o.index,
                energy_coefficient_m=o.energy_coefficient_m,
                energy_ev=o.energy_ev,
                electron_occupancy=o.electron_occupancy,
                is_homo=o.is_homo,
                is_lumo=o.is_lumo,
                is_singly_occupied=o.is_singly_occupied,
                orbital_symmetry=o.orbital_symmetry,
                nodal_planes_count=o.nodal_planes_count,
                coefficients=o.coefficients,
                label=o.label,
            )
            for o in res.orbitals
        ],
        atomic_charges=res.atomic_charges,
        atomic_electron_densities=res.atomic_electron_densities,
        bond_orders=res.bond_orders,
        atoms=[
            ConjugatedAtomSchema(
                atom_id=a.atom_id,
                element=a.element,
                label=a.label,
                x_2d=a.x_2d,
                y_2d=a.y_2d,
                huckel_h=a.huckel_h,
                pi_electron_contribution=a.pi_electron_contribution,
            )
            for a in res.atoms
        ],
        bonds=[
            ConjugatedBondSchema(
                atom_i=b.atom_i,
                atom_j=b.atom_j,
                huckel_k=b.huckel_k,
            )
            for b in res.bonds
        ],
    )
