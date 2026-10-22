"""FastAPI endpoints for Molecular Dynamics Simulation (PR #036)."""

from typing import List
from fastapi import APIRouter, HTTPException, status
from app.models.molecular_dynamics import EnsembleType
from app.schemas.molecular_dynamics import (
    MolecularDynamicsRequest,
    MolecularDynamicsResponse,
    MolecularDynamicsPresetSummary,
)
from app.services.molecular_dynamics_service import MolecularDynamicsEngine

router = APIRouter(prefix="/dynamics", tags=["Molecular Dynamics Simulation"])

MD_PRESETS: List[MolecularDynamicsPresetSummary] = [
    MolecularDynamicsPresetSummary(
        id="liquid_argon",
        name="Liquid Argon at Triple Point",
        state_of_matter="Liquid",
        default_ensemble=EnsembleType.NVE_MICROCANONICAL,
        target_temperature_k=84.0,
        density_g_cm3=1.40,
        description="Classical noble gas liquid near triple point (T=84K, rho=1.40 g/cm³). Displays prominent first and second coordination shells in g(r) at r ≈ 3.7 Å and r ≈ 7.0 Å.",
    ),
    MolecularDynamicsPresetSummary(
        id="supercritical_argon",
        name="Dense Supercritical Argon Fluid",
        state_of_matter="Supercritical Fluid",
        default_ensemble=EnsembleType.NVT_BERENDSEN,
        target_temperature_k=160.0,
        density_g_cm3=0.85,
        description="High-temperature supercritical fluid with elevated kinetic energy, rapid particle dispersion, and high virial pressure.",
    ),
    MolecularDynamicsPresetSummary(
        id="dilute_argon_gas",
        name="Dilute Argon Gas",
        state_of_matter="Gas",
        default_ensemble=EnsembleType.NVE_MICROCANONICAL,
        target_temperature_k=300.0,
        density_g_cm3=0.05,
        description="Near-ideal gas behavior. Negligible structural ordering (g(r) ≈ 1.0 for r > sigma) and ballistic/linear MSD trajectories.",
    ),
    MolecularDynamicsPresetSummary(
        id="argon_crystal",
        name="Argon Solid Crystal Lattice",
        state_of_matter="Solid",
        default_ensemble=EnsembleType.NVT_ANDERSEN,
        target_temperature_k=20.0,
        density_g_cm3=1.65,
        description="Low-temperature solid phase displaying sharp crystalline Bragg-like peaks in the pair distribution function and bounded MSD oscillation.",
    ),
    MolecularDynamicsPresetSummary(
        id="nanoparticle_cluster",
        name="Argon Nanoparticle Cluster in Vacuum",
        state_of_matter="Isolated Cluster",
        default_ensemble=EnsembleType.NVE_MICROCANONICAL,
        target_temperature_k=50.0,
        density_g_cm3=0.40,
        description="Finite cluster of argon atoms illustrating surface tension, evaporation dynamics, and collective breathing vibrational modes.",
    ),
]


@router.get("/presets", response_model=List[MolecularDynamicsPresetSummary])
async def get_md_presets():
    """Returns curated molecular dynamics physical presets."""
    return MD_PRESETS


@router.post("/simulate", response_model=MolecularDynamicsResponse)
async def simulate_molecular_dynamics(request: MolecularDynamicsRequest):
    """Executes a Velocity-Verlet molecular dynamics trajectory with periodic boundary conditions."""
    try:
        result = MolecularDynamicsEngine.run_simulation(request)
        return MolecularDynamicsResponse(
            system_name=result.system_name,
            ensemble=result.ensemble,
            num_particles=result.num_particles,
            box_length_angstrom=result.box_length_angstrom,
            volume_angstrom3=result.volume_angstrom3,
            density_g_cm3=result.density_g_cm3,
            timestep_fs=result.timestep_fs,
            total_steps=result.total_steps,
            initial_temperature_k=result.initial_temperature_k,
            final_temperature_k=result.final_temperature_k,
            average_temperature_k=result.average_temperature_k,
            average_pressure_bar=result.average_pressure_bar,
            energy_conservation_ratio=result.energy_conservation_ratio,
            self_diffusion_coefficient_cm2_s=result.self_diffusion_coefficient_cm2_s,
            telemetry=[
                {
                    "step": t.step,
                    "time_ps": t.time_ps,
                    "kinetic_energy_kj_mol": t.kinetic_energy_kj_mol,
                    "potential_energy_kj_mol": t.potential_energy_kj_mol,
                    "total_energy_kj_mol": t.total_energy_kj_mol,
                    "temperature_k": t.temperature_k,
                    "pressure_bar": t.pressure_bar,
                    "energy_drift_fraction": t.energy_drift_fraction,
                }
                for t in result.telemetry
            ],
            radial_distribution=[
                {
                    "r_angstrom": g.r_angstrom,
                    "g_r": g.g_r,
                }
                for g in result.radial_distribution
            ],
            msd_curve=[
                {
                    "time_ps": m.time_ps,
                    "msd_angstrom2": m.msd_angstrom2,
                }
                for m in result.msd_curve
            ],
            final_positions=result.final_positions,
            pedagogical_summary=result.pedagogical_summary,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Molecular dynamics simulation failed: {str(e)}",
        )
