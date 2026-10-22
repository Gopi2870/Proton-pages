"""Chromatography & Separation Science Simulation Service.

Implements van Deemter column dynamics, theoretical plate count,
Snyder-Soczewinski solvent strength retention models, GC temperature programming,
and Gaussian peak integration.
"""

import math
from typing import Dict, List, Optional, Tuple
from app.models.chromatography import (
    ChromatographyModality,
    ElutionMode,
    DetectorType,
    StationaryPhaseType,
    ColumnParameters,
    MobilePhaseConditions,
    VanDeemterParameters,
    AnalytePeak,
    ChromatogramDataPoint,
    ChromatographySimulationResult,
)
from app.schemas.chromatography import (
    AnalyteCompoundInput,
    ChromatographySimulationRequest,
    ChromatographyPresetSummary,
)


class ChromatographyService:
    """Scientific simulation service for HPLC and GC separation systems."""

    def __init__(self):
        self._presets: Dict[str, dict] = self._initialize_presets()

    def get_preset_summaries(self) -> List[ChromatographyPresetSummary]:
        """Return list of standard separation application presets."""
        summaries = []
        for pid, data in self._presets.items():
            summaries.append(
                ChromatographyPresetSummary(
                    id=pid,
                    name=data["name"],
                    modality=data["modality"],
                    elution_mode=data["elution_mode"],
                    target_compounds=[c["compound_name"] for c in data["analytes"]],
                    description=data["description"],
                    recommended_column=data["column"].name,
                    recommended_conditions=data["recommended_conditions"],
                )
            )
        return summaries

    def get_preset_simulation(
        self,
        preset_id: str,
        custom_flow_rate: Optional[float] = None,
        custom_organic_pct: Optional[float] = None,
        custom_temp_c: Optional[float] = None,
    ) -> ChromatographySimulationResult:
        """Retrieve and run simulation for a preset with optional condition overrides."""
        if preset_id not in self._presets:
            raise ValueError(f"Unknown chromatography preset: {preset_id}")

        preset_data = self._presets[preset_id]
        column: ColumnParameters = preset_data["column"]
        conditions: MobilePhaseConditions = preset_data["conditions"]

        # Apply overrides if provided
        if custom_flow_rate is not None and custom_flow_rate > 0:
            conditions.flow_rate_ml_min = custom_flow_rate
        if custom_organic_pct is not None and 0 <= custom_organic_pct <= 100:
            conditions.organic_percent = custom_organic_pct
        if custom_temp_c is not None:
            conditions.temperature_c = custom_temp_c

        analytes = [AnalyteCompoundInput(**c) for c in preset_data["analytes"]]

        return self.simulate_separation(
            sample_name=preset_data["name"],
            modality=preset_data["modality"],
            detector=preset_data["detector"],
            column=column,
            conditions=conditions,
            analytes=analytes,
            pedagogical_notes=preset_data["pedagogical_notes"],
        )

    def calculate_van_deemter(
        self,
        column: ColumnParameters,
        conditions: MobilePhaseConditions,
    ) -> VanDeemterParameters:
        """Compute van Deemter parameters and operating plate height H(u) = A + B/u + C*u."""
        col_radius_mm = column.inner_diameter_mm / 2.0
        col_area_mm2 = math.pi * (col_radius_mm**2)

        if conditions.modality == ChromatographyModality.HPLC:
            # Linear velocity u in mm/s: u = (Flow in mm^3/s) / (porosity * area)
            # 1 mL/min = 1000 mm^3 / 60 s = 16.6667 mm^3/s
            flow_mm3_s = (conditions.flow_rate_ml_min * 1000.0) / 60.0
            interstitial_porosity = 0.42
            linear_velocity_mm_s = flow_mm3_s / (col_area_mm2 * interstitial_porosity)

            # Eddy diffusion: A = 2 * lambda * dp (in um)
            # lambda ~ 0.9 for well-packed modern C18 columns
            dp_um = column.particle_size_um
            term_a_um = 1.8 * dp_um

            # Longitudinal diffusion: B = 2 * gamma * Dm
            # Liquid diffusion coefficient Dm ~ 1.0e-3 mm^2/s
            # B in um * mm/s: 2 * 0.6 * (1.0e-3 mm^2/s) * 1000 um/mm = 1.2 um*mm/s
            term_b_um_mm_s = 2.4

            # Mass transfer resistance: C = Cs + Cm ~ (dp^2) / (30 * Dm)
            # In seconds:
            term_c_s = (dp_um**2) / (30.0 * 1000.0)  # scaled empirical constant

        else:
            # Capillary Gas Chromatography: Open tubular column (Golay equation)
            # Packed A term is 0 for open tubular capillary columns
            term_a_um = 0.0

            # Linear velocity u for GC: carrier gas flow rate
            flow_mm3_s = (conditions.flow_rate_ml_min * 1000.0) / 60.0
            linear_velocity_mm_s = flow_mm3_s / col_area_mm2

            carrier = conditions.carrier_gas.lower()
            if "hydrogen" in carrier or "h2" in carrier:
                # Highest diffusion, flat C curve, u_opt ~ 450 mm/s
                term_b_um_mm_s = 180.0
                term_c_s = 0.0008
            elif "nitrogen" in carrier or "n2" in carrier:
                # Lowest diffusion, sharp C curve, u_opt ~ 120 mm/s
                term_b_um_mm_s = 50.0
                term_c_s = 0.0035
            else:
                # Helium (standard GC carrier gas), u_opt ~ 300 mm/s
                term_b_um_mm_s = 120.0
                term_c_s = 0.0015

        # Optimal velocity: u_opt = sqrt(B / C)
        u_opt_mm_s = math.sqrt(term_b_um_mm_s / max(term_c_s, 1e-6))
        h_min_um = term_a_um + 2.0 * math.sqrt(term_b_um_mm_s * term_c_s)

        # Operating plate height at current linear velocity
        u_clamped = max(linear_velocity_mm_s, 0.05)
        h_operating_um = term_a_um + (term_b_um_mm_s / u_clamped) + (term_c_s * u_clamped)

        return VanDeemterParameters(
            term_a_um=round(term_a_um, 2),
            term_b_um_mm_s=round(term_b_um_mm_s, 2),
            term_c_s=round(term_c_s, 6),
            optimal_velocity_mm_s=round(u_opt_mm_s, 2),
            minimum_plate_height_um=round(h_min_um, 2),
            tested_velocity_mm_s=round(linear_velocity_mm_s, 2),
            operating_plate_height_um=round(h_operating_um, 2),
        )

    def simulate_separation(
        self,
        sample_name: str,
        modality: ChromatographyModality,
        detector: DetectorType,
        column: ColumnParameters,
        conditions: MobilePhaseConditions,
        analytes: List[AnalyteCompoundInput],
        pedagogical_notes: str = "",
    ) -> ChromatographySimulationResult:
        """Simulate complete chromatographic run, evaluating retention, peak width, resolution, and chromatogram."""
        van_deemter = self.calculate_van_deemter(column, conditions)

        # Theoretical plate count: N = Length / H
        col_length_um = column.length_mm * 1000.0
        n_plates = int(round(col_length_um / max(van_deemter.operating_plate_height_um, 1.0)))
        n_plates = max(n_plates, 500)

        # Column dead time t0 in minutes: t0 = V0 / Flow
        t0_min = column.void_volume_ml / max(conditions.flow_rate_ml_min, 0.05)

        # Evaluate retention factor k' for each analyte
        evaluated_peaks: List[AnalytePeak] = []
        for analyte in analytes:
            k_prime = self._calculate_retention_factor(analyte, conditions, modality)
            retention_time_min = t0_min * (1.0 + k_prime)

            # Baseline peak width: W = 4 * tr / sqrt(N)
            peak_width_base = (4.0 * retention_time_min) / math.sqrt(n_plates)
            # Half-height peak width: W_1/2 = 2.355 * tr / sqrt(N)
            peak_width_half = (2.355 * retention_time_min) / math.sqrt(n_plates)

            # Peak height and area proportional to concentration and detector sensitivity
            area_factor = analyte.concentration_mg_l * 12.0
            sigma_min = peak_width_base / 4.0
            peak_height = area_factor / (sigma_min * math.sqrt(2.0 * math.pi) * 60.0)

            # USP tailing factor: small tailing (1.02 - 1.15) for realistic chromatograms
            tailing = 1.02 + (0.02 * max(0.0, analyte.log_kow))

            evaluated_peaks.append(
                AnalytePeak(
                    compound_id=analyte.compound_id,
                    compound_name=analyte.compound_name,
                    chemical_formula=analyte.chemical_formula,
                    molecular_weight=analyte.molecular_weight,
                    retention_time_min=round(retention_time_min, 3),
                    retention_factor_k=round(k_prime, 3),
                    theoretical_plates_n=n_plates,
                    peak_width_base_min=round(peak_width_base, 3),
                    peak_width_half_min=round(peak_width_half, 3),
                    peak_height_mau=round(peak_height, 2),
                    peak_area_mau_s=round(area_factor, 2),
                    tailing_factor=round(tailing, 2),
                )
            )

        # Sort peaks by retention time
        evaluated_peaks.sort(key=lambda p: p.retention_time_min)

        # Calculate resolution Rs and selectivity alpha between adjacent peaks
        min_resolution = 999.0
        for i in range(1, len(evaluated_peaks)):
            prev = evaluated_peaks[i - 1]
            curr = evaluated_peaks[i]

            # Rs = 2 * (tr2 - tr1) / (W1 + W2)
            delta_tr = curr.retention_time_min - prev.retention_time_min
            sum_w = prev.peak_width_base_min + curr.peak_width_base_min
            rs = (2.0 * delta_tr) / max(sum_w, 0.001)

            # alpha = k'2 / k'1
            alpha = curr.retention_factor_k / max(prev.retention_factor_k, 0.01)

            curr.resolution_with_previous = round(rs, 2)
            curr.selectivity_with_previous = round(alpha, 2)

            if rs < min_resolution:
                min_resolution = rs

        if len(evaluated_peaks) <= 1:
            min_resolution = 3.0

        # Quality classification
        if min_resolution >= 1.5:
            quality = "baseline_resolved"
        elif min_resolution >= 1.0:
            quality = "partial_overlap"
        else:
            quality = "co_eluting"

        # Determine total run time: last peak + 3 * W
        last_peak = evaluated_peaks[-1] if evaluated_peaks else None
        max_tr = last_peak.retention_time_min + 3.0 * last_peak.peak_width_base_min if last_peak else 10.0
        run_time_min = max(max_tr * 1.15, 6.0)

        # Generate digitized chromatogram profile
        trace = self._generate_chromatogram_trace(
            evaluated_peaks,
            run_time_min,
            t0_min,
            points_count=350,
        )

        simulation_id = f"chrom-{modality.value}-{int(t0_min * 100)}"

        return ChromatographySimulationResult(
            simulation_id=simulation_id,
            sample_name=sample_name,
            modality=modality,
            elution_mode=conditions.elution_mode,
            detector=detector,
            run_time_min=round(run_time_min, 2),
            dead_time_t0_min=round(t0_min, 3),
            column=column,
            conditions=conditions,
            van_deemter=van_deemter,
            peaks=evaluated_peaks,
            chromatogram_trace=trace,
            mean_theoretical_plates=n_plates,
            minimum_resolution=round(min_resolution, 2),
            separation_quality=quality,
            pedagogical_notes=pedagogical_notes,
        )

    def _calculate_retention_factor(
        self,
        analyte: AnalyteCompoundInput,
        conditions: MobilePhaseConditions,
        modality: ChromatographyModality,
    ) -> float:
        """Calculate retention factor k' based on physicochemical properties and elution mode."""
        if modality == ChromatographyModality.HPLC:
            # Unretained column dead time markers (e.g. Uracil, thiourea)
            if "uracil" in analyte.compound_id.lower() or "marker" in analyte.compound_name.lower():
                return 0.05

            # Snyder-Soczewinski model: log10(k') = log10(k'w) - S * Phi
            # log10(k'w) increases with log Kow (hydrophobicity)
            log_kw = 0.65 * analyte.log_kow + 0.60

            # Solvent strength factor S ~ 0.20 * sqrt(MW)
            s_factor = 0.20 * math.sqrt(max(analyte.molecular_weight, 50.0))

            if conditions.elution_mode == ElutionMode.GRADIENT:
                # Gradient elution compresses late peaks
                phi_avg = (conditions.gradient_start_percent + conditions.gradient_end_percent) / 200.0
                k_prime = 10.0 ** (log_kw - s_factor * phi_avg)
                # Gradient compression factor
                b_gradient = (
                    conditions.gradient_end_percent - conditions.gradient_start_percent
                ) / (100.0 * max(conditions.gradient_time_min, 1.0))
                k_prime = k_prime / (1.0 + 2.3 * b_gradient * k_prime)
            else:
                # Isocratic elution
                phi = conditions.organic_percent / 100.0
                log_k = log_kw - s_factor * phi
                k_prime = 10.0**log_k

            # Temperature effect: van 't Hoff lowering of retention (decrease ~ 1.5% per deg C above 25C)
            temp_delta = conditions.temperature_c - 25.0
            k_prime = k_prime * math.exp(-0.018 * temp_delta)

        else:
            # Gas Chromatography
            # Retention depends strongly on boiling point
            bp_c = analyte.boiling_point_c if analyte.boiling_point_c is not None else (analyte.molecular_weight * 1.5)
            temp_c = conditions.temperature_c

            if conditions.elution_mode == ElutionMode.TEMPERATURE_PROGRAMMED:
                # Temperature ramp reduces retention time of high-boiling compounds
                ramp_rate = conditions.temp_ramp_rate_c_min
                effective_temp = temp_c + (bp_c - temp_c) * 0.35
                delta_t = bp_c - effective_temp
                k_prime = 0.8 * math.exp(0.015 * delta_t)
            else:
                # Isothermal GC: exponential dependence on (T_bp - T_col)
                delta_t = bp_c - temp_c
                k_prime = 0.5 * math.exp(0.022 * delta_t)

        return max(k_prime, 0.1)

    def _generate_chromatogram_trace(
        self,
        peaks: List[AnalytePeak],
        run_time_min: float,
        t0_min: float,
        points_count: int = 350,
    ) -> List[ChromatogramDataPoint]:
        """Generate digitized signal response curve across run time."""
        trace = []
        dt = run_time_min / float(points_count - 1)

        for i in range(points_count):
            t = i * dt
            signal = 0.0

            # Void volume perturbation at t0
            if abs(t - t0_min) < 0.2:
                void_peak = -0.5 * math.exp(-0.5 * ((t - t0_min) / 0.05) ** 2)
                signal += void_peak

            # Analyte peaks (Gaussian with tailing correction)
            for p in peaks:
                sigma = p.peak_width_base_min / 4.0
                t_diff = t - p.retention_time_min
                # Asymmetric tailing: broader right side if t > tr
                if t_diff > 0:
                    sigma_eff = sigma * p.tailing_factor
                else:
                    sigma_eff = sigma

                exponent = -0.5 * ((t_diff / max(sigma_eff, 0.005)) ** 2)
                if exponent > -12.0:
                    signal += p.peak_height_mau * math.exp(exponent)

            # Minimal baseline baseline drift and noise
            noise = (math.sin(t * 30.0) * 0.03) + (math.cos(t * 75.0) * 0.02)
            total_signal = max(0.0, signal + noise)

            trace.append(
                ChromatogramDataPoint(
                    time_min=round(t, 3),
                    signal_intensity=round(total_signal, 3),
                )
            )

        return trace

    def _initialize_presets(self) -> Dict[str, dict]:
        """Catalog of standard analytical HPLC and GC mixtures."""
        return {
            "analgesics_hplc": {
                "name": "Over-the-Counter Analgesics Mixture",
                "modality": ChromatographyModality.HPLC,
                "elution_mode": ElutionMode.ISOCRATIC,
                "detector": DetectorType.UV_DAD,
                "description": "Standard pharmaceutical QC separation of common analgesics on reversed-phase C18 with UV detection at 254 nm.",
                "recommended_conditions": "Isocratic 45% Acetonitrile / 55% Acidified Water, 1.0 mL/min, 30°C.",
                "column": ColumnParameters(
                    name="Zorbax Eclipse Plus C18",
                    length_mm=150.0,
                    inner_diameter_mm=4.6,
                    particle_size_um=3.5,
                    stationary_phase=StationaryPhaseType.C18_OCTADECYL,
                    void_volume_ml=1.45,
                ),
                "conditions": MobilePhaseConditions(
                    flow_rate_ml_min=1.0,
                    modality=ChromatographyModality.HPLC,
                    elution_mode=ElutionMode.ISOCRATIC,
                    solvent_a_name="Water (0.1% Formic Acid)",
                    solvent_b_name="Acetonitrile",
                    organic_percent=45.0,
                    temperature_c=30.0,
                ),
                "analytes": [
                    {
                        "compound_id": "acetaminophen",
                        "compound_name": "Acetaminophen (Paracetamol)",
                        "chemical_formula": "C8H9NO2",
                        "molecular_weight": 151.16,
                        "log_kow": 0.46,
                        "concentration_mg_l": 40.0,
                    },
                    {
                        "compound_id": "caffeine",
                        "compound_name": "Caffeine",
                        "chemical_formula": "C8H10N4O2",
                        "molecular_weight": 194.19,
                        "log_kow": -0.07,
                        "concentration_mg_l": 25.0,
                    },
                    {
                        "compound_id": "aspirin",
                        "compound_name": "Aspirin (Acetylsalicylic Acid)",
                        "chemical_formula": "C9H8O4",
                        "molecular_weight": 180.16,
                        "log_kow": 1.19,
                        "concentration_mg_l": 50.0,
                    },
                    {
                        "compound_id": "ibuprofen",
                        "compound_name": "Ibuprofen",
                        "chemical_formula": "C13H18O2",
                        "molecular_weight": 206.28,
                        "log_kow": 3.50,
                        "concentration_mg_l": 60.0,
                    },
                ],
                "pedagogical_notes": "In reversed-phase C18 HPLC, retention order is primarily governed by analyte hydrophobicity (log Kow). More polar molecules (caffeine, acetaminophen) elute first, while lipophilic ibuprofen is strongly retained by the octadecyl stationary phase.",
            },
            "parabens_hplc": {
                "name": "Alkyl Paraben Preservatives Homologous Series",
                "modality": ChromatographyModality.HPLC,
                "elution_mode": ElutionMode.GRADIENT,
                "detector": DetectorType.UV_DAD,
                "description": "Homologous alkyl 4-hydroxybenzoates demonstrating the linear free energy relationship between alkyl chain length and retention.",
                "recommended_conditions": "Linear gradient 30% -> 85% Methanol over 10 min, 1.2 mL/min, 35°C.",
                "column": ColumnParameters(
                    name="Hypersil GOLD C18",
                    length_mm=100.0,
                    inner_diameter_mm=3.0,
                    particle_size_um=3.0,
                    stationary_phase=StationaryPhaseType.C18_OCTADECYL,
                    void_volume_ml=0.95,
                ),
                "conditions": MobilePhaseConditions(
                    flow_rate_ml_min=1.2,
                    modality=ChromatographyModality.HPLC,
                    elution_mode=ElutionMode.GRADIENT,
                    solvent_a_name="Water",
                    solvent_b_name="Methanol",
                    gradient_start_percent=30.0,
                    gradient_end_percent=85.0,
                    gradient_time_min=10.0,
                    temperature_c=35.0,
                ),
                "analytes": [
                    {
                        "compound_id": "methylparaben",
                        "compound_name": "Methylparaben",
                        "chemical_formula": "C8H8O3",
                        "molecular_weight": 152.15,
                        "log_kow": 1.96,
                        "concentration_mg_l": 30.0,
                    },
                    {
                        "compound_id": "ethylparaben",
                        "compound_name": "Ethylparaben",
                        "chemical_formula": "C9H10O3",
                        "molecular_weight": 166.17,
                        "log_kow": 2.47,
                        "concentration_mg_l": 30.0,
                    },
                    {
                        "compound_id": "propylparaben",
                        "compound_name": "Propylparaben",
                        "chemical_formula": "C10H12O3",
                        "molecular_weight": 180.20,
                        "log_kow": 3.04,
                        "concentration_mg_l": 30.0,
                    },
                    {
                        "compound_id": "butylparaben",
                        "compound_name": "Butylparaben",
                        "chemical_formula": "C11H14O3",
                        "molecular_weight": 194.23,
                        "log_kow": 3.57,
                        "concentration_mg_l": 30.0,
                    },
                ],
                "pedagogical_notes": "Each additional methylene (-CH2-) unit in the alkyl ester tail contributes ~0.5 units to log Kow, extending retention on the nonpolar C18 phase. Gradient elution compresses later-eluting peaks, maintaining constant peak widths.",
            },
            "nucleobases_hplc": {
                "name": "DNA/RNA Nucleobases & Void Volume Marker",
                "modality": ChromatographyModality.HPLC,
                "elution_mode": ElutionMode.ISOCRATIC,
                "detector": DetectorType.UV_DAD,
                "description": "Separation of fundamental nitrogenous bases with Uracil serving as the unretained void time (t0) column marker.",
                "recommended_conditions": "Isocratic 5% Acetonitrile / 95% 20 mM Phosphate Buffer pH 4.0, 0.8 mL/min, 25°C.",
                "column": ColumnParameters(
                    name="Inertsil ODS-3",
                    length_mm=150.0,
                    inner_diameter_mm=4.6,
                    particle_size_um=5.0,
                    stationary_phase=StationaryPhaseType.C18_OCTADECYL,
                    void_volume_ml=1.60,
                ),
                "conditions": MobilePhaseConditions(
                    flow_rate_ml_min=0.8,
                    modality=ChromatographyModality.HPLC,
                    elution_mode=ElutionMode.ISOCRATIC,
                    solvent_a_name="20 mM Phosphate Buffer (pH 4.0)",
                    solvent_b_name="Acetonitrile",
                    organic_percent=5.0,
                    temperature_c=25.0,
                ),
                "analytes": [
                    {
                        "compound_id": "uracil",
                        "compound_name": "Uracil (t0 Marker)",
                        "chemical_formula": "C4H4N2O2",
                        "molecular_weight": 112.09,
                        "log_kow": -1.07,
                        "concentration_mg_l": 20.0,
                    },
                    {
                        "compound_id": "cytosine",
                        "compound_name": "Cytosine",
                        "chemical_formula": "C4H5N3O",
                        "molecular_weight": 111.10,
                        "log_kow": -1.73,
                        "concentration_mg_l": 25.0,
                    },
                    {
                        "compound_id": "guanine",
                        "compound_name": "Guanine",
                        "chemical_formula": "C5H5N5O",
                        "molecular_weight": 151.13,
                        "log_kow": -1.25,
                        "concentration_mg_l": 20.0,
                    },
                    {
                        "compound_id": "thymine",
                        "compound_name": "Thymine",
                        "chemical_formula": "C5H6N2O2",
                        "molecular_weight": 126.11,
                        "log_kow": -0.17,
                        "concentration_mg_l": 25.0,
                    },
                    {
                        "compound_id": "adenine",
                        "compound_name": "Adenine",
                        "chemical_formula": "C5H5N5",
                        "molecular_weight": 135.13,
                        "log_kow": -0.09,
                        "concentration_mg_l": 30.0,
                    },
                ],
                "pedagogical_notes": "Uracil is completely unretained on reversed-phase columns in high-aqueous buffers, providing the standard experimental benchmark for dead volume (V0) and dead time (t0).",
            },
            "btex_gc": {
                "name": "BTEX Volatile Monoaromatic Hydrocarbons",
                "modality": ChromatographyModality.GC,
                "elution_mode": ElutionMode.TEMPERATURE_PROGRAMMED,
                "detector": DetectorType.FID,
                "description": "Environmental EPA 8260 GC-FID separation of benzene, toluene, ethylbenzene, and xylene isomers on a 5% diphenyl capillary column.",
                "recommended_conditions": "Capillary DB-5, 30 m x 0.25 mm x 0.25 um, Helium 1.2 mL/min, Temp 40°C (1 min) -> 120°C at 8°C/min.",
                "column": ColumnParameters(
                    name="DB-5 Capillary (5% Phenyl)",
                    length_mm=30000.0,
                    inner_diameter_mm=0.25,
                    particle_size_um=0.0,
                    film_thickness_um=0.25,
                    stationary_phase=StationaryPhaseType.DB_5_PHENYL,
                    void_volume_ml=1.20,
                ),
                "conditions": MobilePhaseConditions(
                    flow_rate_ml_min=1.2,
                    modality=ChromatographyModality.GC,
                    elution_mode=ElutionMode.TEMPERATURE_PROGRAMMED,
                    temperature_c=45.0,
                    temp_ramp_rate_c_min=8.0,
                    final_temperature_c=140.0,
                    carrier_gas="Helium",
                ),
                "analytes": [
                    {
                        "compound_id": "benzene",
                        "compound_name": "Benzene",
                        "chemical_formula": "C6H6",
                        "molecular_weight": 78.11,
                        "log_kow": 2.13,
                        "boiling_point_c": 80.1,
                        "concentration_mg_l": 50.0,
                    },
                    {
                        "compound_id": "toluene",
                        "compound_name": "Toluene",
                        "chemical_formula": "C7H8",
                        "molecular_weight": 92.14,
                        "log_kow": 2.73,
                        "boiling_point_c": 110.6,
                        "concentration_mg_l": 50.0,
                    },
                    {
                        "compound_id": "ethylbenzene",
                        "compound_name": "Ethylbenzene",
                        "chemical_formula": "C8H10",
                        "molecular_weight": 106.17,
                        "log_kow": 3.15,
                        "boiling_point_c": 136.2,
                        "concentration_mg_l": 50.0,
                    },
                    {
                        "compound_id": "p_xylene",
                        "compound_name": "p-Xylene",
                        "chemical_formula": "C8H10",
                        "molecular_weight": 106.17,
                        "log_kow": 3.15,
                        "boiling_point_c": 138.4,
                        "concentration_mg_l": 45.0,
                    },
                    {
                        "compound_id": "o_xylene",
                        "compound_name": "o-Xylene",
                        "chemical_formula": "C8H10",
                        "molecular_weight": 106.17,
                        "log_kow": 3.12,
                        "boiling_point_c": 144.4,
                        "concentration_mg_l": 50.0,
                    },
                ],
                "pedagogical_notes": "In nonpolar capillary GC, elution order mirrors compound boiling points and vapor pressures. Temperature programming accelerates the elution of higher-boiling xylenes while preventing peak broadening.",
            },
            "alcohols_gc": {
                "name": "Aliphatic C1-C5 Alcohols Series",
                "modality": ChromatographyModality.GC,
                "elution_mode": ElutionMode.ISOTHERMAL,
                "detector": DetectorType.FID,
                "description": "Homologous alcohol series demonstrating gas-phase partition equilibrium and hydrogen-bonding interactions on a polar Carbowax column.",
                "recommended_conditions": "Capillary DB-WAX, 30 m x 0.32 mm x 0.5 um, Nitrogen 1.5 mL/min, Isothermal 85°C.",
                "column": ColumnParameters(
                    name="DB-WAX Polyethylene Glycol",
                    length_mm=30000.0,
                    inner_diameter_mm=0.32,
                    particle_size_um=0.0,
                    film_thickness_um=0.50,
                    stationary_phase=StationaryPhaseType.WAX_PEG,
                    void_volume_ml=1.40,
                ),
                "conditions": MobilePhaseConditions(
                    flow_rate_ml_min=1.5,
                    modality=ChromatographyModality.GC,
                    elution_mode=ElutionMode.ISOTHERMAL,
                    temperature_c=85.0,
                    carrier_gas="Nitrogen",
                ),
                "analytes": [
                    {
                        "compound_id": "methanol",
                        "compound_name": "Methanol",
                        "chemical_formula": "CH4O",
                        "molecular_weight": 32.04,
                        "log_kow": -0.77,
                        "boiling_point_c": 64.7,
                        "concentration_mg_l": 30.0,
                    },
                    {
                        "compound_id": "ethanol",
                        "compound_name": "Ethanol",
                        "chemical_formula": "C2H6O",
                        "molecular_weight": 46.07,
                        "log_kow": -0.31,
                        "boiling_point_c": 78.4,
                        "concentration_mg_l": 40.0,
                    },
                    {
                        "compound_id": "1_propanol",
                        "compound_name": "1-Propanol",
                        "chemical_formula": "C3H8O",
                        "molecular_weight": 60.10,
                        "log_kow": 0.25,
                        "boiling_point_c": 97.2,
                        "concentration_mg_l": 40.0,
                    },
                    {
                        "compound_id": "1_butanol",
                        "compound_name": "1-Butanol",
                        "chemical_formula": "C4H10O",
                        "molecular_weight": 74.12,
                        "log_kow": 0.88,
                        "boiling_point_c": 117.7,
                        "concentration_mg_l": 40.0,
                    },
                    {
                        "compound_id": "1_pentanol",
                        "compound_name": "1-Pentanol",
                        "chemical_formula": "C5H12O",
                        "molecular_weight": 88.15,
                        "log_kow": 1.51,
                        "boiling_point_c": 138.0,
                        "concentration_mg_l": 45.0,
                    },
                ],
                "pedagogical_notes": "Flame Ionization Detectors (FID) generate current from ion formation in a hydrogen-air flame, proportional to the number of reduced carbon atoms in the molecule.",
            },
        }


chromatography_service = ChromatographyService()
