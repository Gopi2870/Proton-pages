"""FastAPI endpoints for Colligative Properties & Non-Ideal Solution Chemistry."""

from typing import List
from fastapi import APIRouter, HTTPException, status
from app.schemas.colligative import (
    SolventPropertiesSchema,
    SolutePropertiesSchema,
    VaporPressureRequest,
    VaporPressureResponse,
    BoilingFreezingRequest,
    BoilingFreezingResponse,
    OsmoticPressureRequest,
    OsmoticPressureResponse,
    IonicStrengthRequest,
    IonicStrengthResponse,
    ColligativePresetSummary,
)
from app.services.colligative_service import (
    ColligativeEngine,
    SOLVENTS_DB,
    SOLUTES_DB,
)

router = APIRouter(prefix="/colligative", tags=["Colligative Properties & Solutions"])

COLLIGATIVE_PRESETS: List[ColligativePresetSummary] = [
    ColligativePresetSummary(
        id="ethanol_water_vle",
        title="Ethanol-Water Azeotropic Binary Mixture",
        category="Vapor Pressure & Raoult Deviations",
        description="Positive deviation from Raoult's law (A12 = 1.25) producing a minimum-boiling azeotrope at 78.15 °C (89 mol% ethanol).",
    ),
    ColligativePresetSummary(
        id="acetone_chloroform_vle",
        title="Acetone-Chloroform Maximum-Boiling Azeotrope",
        category="Vapor Pressure & Raoult Deviations",
        description="Negative deviation from Raoult's law (A12 = -0.75) due to intermolecular C-H...O=C hydrogen bonding.",
    ),
    ColligativePresetSummary(
        id="benzene_toluene_ideal",
        title="Benzene-Toluene Ideal Binary Solution",
        category="Vapor Pressure & Raoult Deviations",
        description="Classical textbook ideal solution obeying Raoult's law with zero enthalpy of mixing (A12 = 0.0).",
    ),
    ColligativePresetSummary(
        id="seawater_freezing",
        title="Seawater Saline Freezing Depression & Osmosis",
        category="Cryoscopy & Osmometry",
        description="Saline solution (0.60 M NaCl, i = 2) exhibiting freezing point depression to -2.08 °C and high osmotic pressure (29.4 atm).",
    ),
    ColligativePresetSummary(
        id="antifreeze_glycol",
        title="Automotive Antifreeze (Ethylene Glycol)",
        category="Cryoscopy & Ebullioscopy",
        description="30 mass% non-volatile ethylene glycol in water protecting engine coolant down to -14.2 °C.",
    ),
    ColligativePresetSummary(
        id="camphor_rast_method",
        title="Camphor Rast Cryoscopic Molar Mass Determination",
        category="Molecular Mass Determination",
        description="Micro-determination of organic molar mass exploiting camphor's immense cryoscopic constant (Kf = 39.7 °C*kg/mol).",
    ),
    ColligativePresetSummary(
        id="blood_isotonic_saline",
        title="Physiological Normal Saline (0.9% NaCl)",
        category="Osmotic Pressure & Tonicity",
        description="Isotonic electrolyte solution (0.154 M NaCl) maintaining erythrocyte membrane integrity at Pi = 7.7 atm.",
    ),
    ColligativePresetSummary(
        id="bsa_osmotic_pressure",
        title="Bovine Serum Albumin Macromolecular Osmometry",
        category="Macromolecular Chemistry",
        description="Protein colloid osmotic pressure (oncotic pressure) determination for high-molecular-weight biopolymers (66.5 kDa).",
    ),
    ColligativePresetSummary(
        id="cacl2_ionic_strength",
        title="Calcium Chloride (1:2 Electrolyte) Activity",
        category="Debye-Hückel Activity",
        description="Multivalent electrolyte (z+ = 2, z- = 1) generating high ionic strength (I = 3M) and sharp Debye-Hückel activity coefficient depression.",
    ),
]


@router.get("/presets", response_model=List[ColligativePresetSummary])
async def get_colligative_presets():
    """Returns curated colligative benchmark systems and teaching examples."""
    return COLLIGATIVE_PRESETS


@router.get("/solvents", response_model=List[SolventPropertiesSchema])
async def get_supported_solvents():
    """Returns database of supported solvents with ebullioscopic, cryoscopic, and Antoine constants."""
    return [
        SolventPropertiesSchema(
            name=s.name,
            formula=s.formula,
            molar_mass_g_mol=s.molar_mass_g_mol,
            normal_boiling_point_c=s.normal_boiling_point_c,
            kb_c_kg_mol=s.kb_c_kg_mol,
            normal_freezing_point_c=s.normal_freezing_point_c,
            kf_c_kg_mol=s.kf_c_kg_mol,
            density_g_cm3=s.density_g_cm3,
            description=s.description,
        )
        for s in SOLVENTS_DB.values()
    ]


@router.get("/solutes", response_model=List[SolutePropertiesSchema])
async def get_supported_solutes():
    """Returns database of supported solutes with van 't Hoff dissociation factors and charge numbers."""
    return [
        SolutePropertiesSchema(
            name=s.name,
            formula=s.formula,
            molar_mass_g_mol=s.molar_mass_g_mol,
            van_t_hoff_i=s.van_t_hoff_i,
            is_electrolyte=s.is_electrolyte,
            cation_charge=s.cation_charge,
            anion_charge=s.anion_charge,
            cation_count=s.cation_count,
            anion_count=s.anion_count,
        )
        for s in SOLUTES_DB.values()
    ]


@router.post("/vapor-pressure", response_model=VaporPressureResponse)
async def calculate_vapor_pressure(request: VaporPressureRequest):
    """Calculates Raoult's law and Margules 2-suffix non-ideal vapor-liquid equilibrium (VLE)."""
    try:
        result = ColligativeEngine.calculate_vapor_pressure_binary(
            solvent1_id=request.solvent1_id,
            solvent2_id=request.solvent2_id,
            temperature_c=request.temperature_c,
            x1=request.x1_mole_fraction,
            a12_param=request.non_ideal_parameter_a12,
        )
        return VaporPressureResponse(
            solvent1_name=result.solvent1_name,
            solvent2_name=result.solvent2_name,
            temperature_c=result.temperature_c,
            x1_mole_fraction=result.x1_mole_fraction,
            x2_mole_fraction=result.x2_mole_fraction,
            p1_pure_kpa=result.p1_pure_kpa,
            p2_pure_kpa=result.p2_pure_kpa,
            activity_coeff_1=result.activity_coeff_1,
            activity_coeff_2=result.activity_coeff_2,
            p1_partial_kpa=result.p1_partial_kpa,
            p2_partial_kpa=result.p2_partial_kpa,
            total_vapor_pressure_kpa=result.total_vapor_pressure_kpa,
            total_vapor_pressure_mmhg=result.total_vapor_pressure_mmhg,
            y1_vapor_mole_fraction=result.y1_vapor_mole_fraction,
            y2_vapor_mole_fraction=result.y2_vapor_mole_fraction,
            azeotrope_detected=result.azeotrope_detected,
            azeotrope_x1=result.azeotrope_x1,
            model_type=result.model_type,
            vle_curve=[
                {
                    "x1_liquid": pt.x1_liquid,
                    "y1_vapor": pt.y1_vapor,
                    "pressure_kpa": pt.pressure_kpa,
                    "pressure_mmhg": pt.pressure_mmhg,
                    "activity_coeff_1": pt.activity_coeff_1,
                    "activity_coeff_2": pt.activity_coeff_2,
                }
                for pt in result.vle_curve
            ],
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Vapor pressure calculation error: {str(e)}",
        )


@router.post("/boiling-freezing", response_model=BoilingFreezingResponse)
async def calculate_boiling_freezing(request: BoilingFreezingRequest):
    """Calculates boiling-point elevation (ebullioscopy) and freezing-point depression (cryoscopy)."""
    try:
        result = ColligativeEngine.calculate_boiling_freezing(
            solvent_id=request.solvent_id,
            solute_id=request.solute_id,
            solute_mass_g=request.solute_mass_g,
            solvent_mass_g=request.solvent_mass_g,
            custom_i=request.custom_van_t_hoff_i,
            observed_delta_tf=request.observed_delta_tf_c,
        )
        return BoilingFreezingResponse(
            solvent_name=result.solvent_name,
            solute_name=result.solute_name,
            solute_mass_g=result.solute_mass_g,
            solvent_mass_g=result.solvent_mass_g,
            molality_m=result.molality_m,
            van_t_hoff_factor_i=result.van_t_hoff_factor_i,
            pure_boiling_point_c=result.pure_boiling_point_c,
            delta_tb_c=result.delta_tb_c,
            solution_boiling_point_c=result.solution_boiling_point_c,
            pure_freezing_point_c=result.pure_freezing_point_c,
            delta_tf_c=result.delta_tf_c,
            solution_freezing_point_c=result.solution_freezing_point_c,
            dilute_limit_exceeded=result.dilute_limit_exceeded,
            applicability_warning=result.applicability_warning,
            estimated_molar_mass_g_mol=result.estimated_molar_mass_g_mol,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Boiling/freezing calculation error: {str(e)}",
        )


@router.post("/osmotic-pressure", response_model=OsmoticPressureResponse)
async def calculate_osmotic_pressure(request: OsmoticPressureRequest):
    """Calculates van 't Hoff osmotic pressure and Morse concentration correction."""
    try:
        result = ColligativeEngine.calculate_osmotic_pressure(
            solute_name=request.solute_name,
            temperature_c=request.temperature_c,
            solute_mass_g=request.solute_mass_g,
            solution_volume_l=request.solution_volume_l,
            molar_mass_g_mol=request.solute_molar_mass_g_mol,
            van_t_hoff_i=request.van_t_hoff_i,
            solvent_density_g_cm3=request.solvent_density_g_cm3,
        )
        return OsmoticPressureResponse(
            solute_name=result.solute_name,
            temperature_c=result.temperature_c,
            molarity_m=result.molarity_m,
            molality_m=result.molality_m,
            van_t_hoff_i=result.van_t_hoff_i,
            osmotic_pressure_atm=result.osmotic_pressure_atm,
            osmotic_pressure_bar=result.osmotic_pressure_bar,
            osmotic_pressure_kpa=result.osmotic_pressure_kpa,
            osmotic_pressure_mmhg=result.osmotic_pressure_mmhg,
            morse_corrected_pressure_atm=result.morse_corrected_pressure_atm,
            is_isotonic_blood=result.is_isotonic_blood,
            tonicity_category=result.tonicity_category,
            macromolecule_mw_estimate=result.macromolecule_mw_estimate,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Osmotic pressure calculation error: {str(e)}",
        )


@router.post("/ionic-strength", response_model=IonicStrengthResponse)
async def calculate_ionic_strength(request: IonicStrengthRequest):
    """Calculates ionic strength and mean ionic activity coefficients via Debye-Hückel and Davies models."""
    try:
        result = ColligativeEngine.calculate_ionic_strength_activity(
            electrolyte_id=request.electrolyte_id,
            molarity_m=request.molarity_m,
            temperature_c=request.temperature_c,
            ion_radius_angstrom=request.ion_radius_angstrom,
        )
        return IonicStrengthResponse(
            electrolyte_formula=result.electrolyte_formula,
            molarity_m=result.molarity_m,
            ionic_strength_i=result.ionic_strength_i,
            cation_charge_z_plus=result.cation_charge_z_plus,
            anion_charge_z_minus=result.anion_charge_z_minus,
            dhll_gamma_plus_minus=result.dhll_gamma_plus_minus,
            extended_dh_gamma_plus_minus=result.extended_dh_gamma_plus_minus,
            davies_gamma_plus_minus=result.davies_gamma_plus_minus,
            selected_gamma=result.selected_gamma,
            regime_description=result.regime_description,
            validity_warning=result.validity_warning,
            activity_curve=[
                {
                    "concentration_m": pt.concentration_m,
                    "ionic_strength": pt.ionic_strength,
                    "gamma_plus_minus": pt.gamma_plus_minus,
                }
                for pt in result.activity_curve
            ],
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ionic strength calculation error: {str(e)}",
        )
