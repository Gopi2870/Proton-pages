"""
Hydrodynamic Electrochemistry & Stripping Voltammetry Service.
Implements Levich, Koutecký-Levich, RRDE, and Square-Wave Anodic Stripping Voltammetry.
"""
import math
from typing import Dict, List, Optional
from app.models.hydrodynamic_electrochemistry import (
    ElectrodeType,
    StrippingMode,
    RdeHydrodynamicPoint,
    KouteckyLevichPoint,
    StrippingPeak,
    VoltammogramWavePoint,
    RdeSimulationResult,
    StrippingVoltammetryResult,
    ChronocoulometryResult,
)
from app.schemas.hydrodynamic_electrochemistry import (
    RdeSimulationRequest,
    StrippingVoltammetryRequest,
    ChronocoulometryRequest,
    CuratedMetalStandard,
    HydrodynamicElectrochemistryCatalogResponse,
)

FARADAY = 96485.33212  # C / mol
R_GAS = 8.314462618    # J / (mol * K)
T_STD = 298.15         # 25 °C

CURATED_METALS: List[CuratedMetalStandard] = [
    CuratedMetalStandard(
        metal="Zinc",
        symbol="Zn",
        redox_couple="Zn2+ / Zn(Hg)",
        standard_potential_v_she=-0.763,
        asv_peak_potential_v=-1.02,
        who_drinking_water_limit_ppb=3000.0,
        description="Active divalent cation forming amalgams with mercury and bismuth, giving sharp anodic stripping peak.",
    ),
    CuratedMetalStandard(
        metal="Cadmium",
        symbol="Cd",
        redox_couple="Cd2+ / Cd(Hg)",
        standard_potential_v_she=-0.403,
        asv_peak_potential_v=-0.64,
        who_drinking_water_limit_ppb=3.0,
        description="Highly toxic environmental pollutant, easily resolved from lead and zinc at sub-ppb concentrations.",
    ),
    CuratedMetalStandard(
        metal="Lead",
        symbol="Pb",
        redox_couple="Pb2+ / Pb(Hg)",
        standard_potential_v_she=-0.126,
        asv_peak_potential_v=-0.44,
        who_drinking_water_limit_ppb=10.0,
        description="Priority heavy metal contaminant with high preconcentration efficiency and steep stripping signal.",
    ),
    CuratedMetalStandard(
        metal="Copper",
        symbol="Cu",
        redox_couple="Cu2+ / Cu(Hg)",
        standard_potential_v_she=0.342,
        asv_peak_potential_v=0.02,
        who_drinking_water_limit_ppb=2000.0,
        description="Noble-shifted transition metal stripped near zero volts vs Ag/AgCl, demonstrating broad working potential window.",
    ),
]

ELECTRODES_INFO: List[Dict[str, str]] = [
    {"type": "glassy_carbon", "name": "Glassy Carbon (GC)", "window": "-0.8 V to +1.2 V vs Ag/AgCl", "best_for": "RDE / RRDE kinetics"},
    {"type": "platinum_disk", "name": "Platinum Disk (Pt)", "window": "-0.2 V to +1.3 V vs Ag/AgCl", "best_for": "Ferrocyanide & ORR"},
    {"type": "gold_disk", "name": "Gold Disk (Au)", "window": "-0.5 V to +1.4 V vs Ag/AgCl", "best_for": "Arsenic & Mercury ASV"},
    {"type": "bismuth_film", "name": "Bismuth Film Electrode (BiFE)", "window": "-1.4 V to -0.1 V vs Ag/AgCl", "best_for": "Green heavy metal ASV"},
    {"type": "mercury_film", "name": "Mercury Film (MFE)", "window": "-1.6 V to +0.2 V vs Ag/AgCl", "best_for": "High hydrogen overpotential ASV"},
    {"type": "boron_doped_diamond", "name": "Boron-Doped Diamond (BDD)", "window": "-1.5 V to +2.5 V vs Ag/AgCl", "best_for": "Extreme wide potential window"},
]


class HydrodynamicElectrochemistryEngine:
    @staticmethod
    def get_catalog() -> HydrodynamicElectrochemistryCatalogResponse:
        return HydrodynamicElectrochemistryCatalogResponse(
            metals=CURATED_METALS,
            electrodes=ELECTRODES_INFO,
        )

    @staticmethod
    def simulate_rde(req: RdeSimulationRequest) -> RdeSimulationResult:
        r_cm = req.electrode_radius_mm * 0.1
        area_cm2 = math.pi * (r_cm ** 2)

        # C* in mol/cm^3: 1 mM = 1e-3 mol/L = 1e-6 mol/cm^3
        c_bulk_mol_cm3 = req.concentration_mm * 1e-6
        d_cm2_s = req.diffusion_coefficient_cm2_s
        nu_cm2_s = req.kinematic_viscosity_cm2_s
        n = req.n_electrons

        # Theoretical Levich constant: B = 0.620 * n * F * A * D^(2/3) * nu^(-1/6) * C*
        # in Amperes / (rad/s)^(1/2)
        b_levich = 0.620 * n * FARADAY * area_cm2 * (d_cm2_s ** (2.0 / 3.0)) * (nu_cm2_s ** (-1.0 / 6.0)) * c_bulk_mol_cm3
        b_levich_ua = b_levich * 1e6  # in uA / (rad/s)^0.5

        # Heterogeneous kinetic current at specified overpotential:
        # i_k = n * F * A * k0 * exp((1-alpha)*n*F*eta / (R*T)) * C*
        eta_v = req.overpotential_mv * 1e-3
        alpha = req.transfer_coefficient_alpha
        k_eta = req.heterogeneous_rate_constant_k0_cm_s * math.exp((1.0 - alpha) * n * FARADAY * eta_v / (R_GAS * T_STD))
        i_k_amp = n * FARADAY * area_cm2 * k_eta * c_bulk_mol_cm3
        i_k_ua = i_k_amp * 1e6

        levich_points: List[RdeHydrodynamicPoint] = []
        kl_points: List[KouteckyLevichPoint] = []

        for rpm in req.rotation_speeds_rpm:
            omega = rpm * (2.0 * math.pi / 60.0)
            sqrt_omega = math.sqrt(omega)
            i_l_ua = b_levich_ua * sqrt_omega

            # Koutecky-Levich: 1/i_tot = 1/i_k + 1/i_l
            i_tot_ua = (i_k_ua * i_l_ua) / (i_k_ua + i_l_ua)

            # Levich hydrodynamic boundary layer thickness: delta_H = 1.61 * D^(1/3) * nu^(1/6) * omega^(-1/2)
            delta_h_cm = 1.61 * (d_cm2_s ** (1.0 / 3.0)) * (nu_cm2_s ** (1.0 / 6.0)) / max(sqrt_omega, 1e-6)
            delta_h_um = delta_h_cm * 1e4

            levich_points.append(RdeHydrodynamicPoint(
                rotation_speed_rpm=round(rpm, 1),
                angular_velocity_rad_s=round(omega, 2),
                sqrt_angular_velocity=round(sqrt_omega, 3),
                limiting_current_ua=round(i_tot_ua, 2),
                hydrodynamic_boundary_layer_um=round(delta_h_um, 2),
                kinetic_current_ua=round(i_k_ua, 2),
            ))

            kl_points.append(KouteckyLevichPoint(
                inv_sqrt_omega=round(1.0 / max(sqrt_omega, 1e-6), 4),
                inv_current_ua=round(1.0 / max(i_tot_ua, 1e-6), 5),
            ))

        # Generate sigmoidal RDE polarization waves
        polarization_waves: List[Dict[str, List[VoltammogramWavePoint]]] = []
        e_half = 0.220  # standard E1/2 for ferrocyanide vs Ag/AgCl
        potentials = [round(e_half - 0.200 + i * 0.010, 3) for i in range(41)]  # 41 points from -0.2V to +0.2V

        for pt in levich_points:
            wave_pts: List[VoltammogramWavePoint] = []
            i_lim = pt.limiting_current_ua
            for pot in potentials:
                # Sigmoidal Butler-Volmer wave: i(E) = i_lim / (1 + exp(-n*F*(E - E1/2)/(R*T)))
                exp_arg = max(-30.0, min(30.0, (n * FARADAY * (pot - e_half)) / (R_GAS * T_STD)))
                i_disk = i_lim / (1.0 + math.exp(-exp_arg))
                # Theoretical RRDE ring collection: N = 0.38, ring poised to re-reduce disk product
                i_ring = -0.38 * i_disk
                wave_pts.append(VoltammogramWavePoint(
                    potential_v=pot,
                    current_disk_ua=round(i_disk, 3),
                    current_ring_ua=round(i_ring, 3),
                ))
            polarization_waves.append({f"{int(pt.rotation_speed_rpm)}_rpm": wave_pts})

        return RdeSimulationResult(
            system_name=req.system_name,
            electrode_type=req.electrode_type,
            electrode_area_cm2=round(area_cm2, 4),
            diffusion_coefficient_cm2_s=req.diffusion_coefficient_cm2_s,
            kinematic_viscosity_cm2_s=req.kinematic_viscosity_cm2_s,
            concentration_mm=req.concentration_mm,
            n_electrons=req.n_electrons,
            levich_slope_ua_s_half=round(b_levich_ua, 4),
            levich_points=levich_points,
            koutecky_levich_points=kl_points,
            heterogeneous_rate_constant_k0_cm_s=req.heterogeneous_rate_constant_k0_cm_s,
            rrde_collection_efficiency_theoretical=0.38,
            polarization_waves=polarization_waves,
        )

    @staticmethod
    def simulate_stripping(req: StrippingVoltammetryRequest) -> StrippingVoltammetryResult:
        # Preconcentration factor scaling with deposition time
        preconc_factor = 1.0 + (req.deposition_time_s / 10.0) * 8.5

        # Detect active metals in sample
        metal_configs = [
            ("Zinc", "Zn", -1.02, req.zn_concentration_ppb, 2, 0.5),
            ("Cadmium", "Cd", -0.64, req.cd_concentration_ppb, 2, 0.05),
            ("Lead", "Pb", -0.44, req.pb_concentration_ppb, 2, 0.08),
            ("Copper", "Cu", 0.02, req.cu_concentration_ppb, 2, 0.2),
        ]

        detected_peaks: List[StrippingPeak] = []
        for name, sym, e_peak, conc_ppb, n_e, lod_ppb in metal_configs:
            if conc_ppb > 0.0:
                # Square-wave sensitivity factor: i_p proportional to n^2 * f_sw * amplitude * conc * t_dep
                sens = 0.0085 * (n_e ** 2) * (req.square_wave_frequency_hz / 25.0) * (req.square_wave_amplitude_mv / 25.0) * (req.deposition_time_s / 60.0)
                i_p_ua = conc_ppb * sens
                detected_peaks.append(StrippingPeak(
                    metal_ion=f"{name} ({sym}2+)",
                    symbol=sym,
                    peak_potential_v=e_peak,
                    peak_current_ua=round(i_p_ua, 3),
                    fwhm_mv=55.0,  # typical square wave FWHM ~ 50-60 mV
                    concentration_ppb=round(conc_ppb, 2),
                    detection_limit_ppb=lod_ppb,
                ))

        # Generate stripping voltammogram from -1.25 V to +0.25 V (151 points, 10 mV step)
        stripping_curve: List[Dict[str, float]] = []
        n_steps = 151
        e_start = -1.25
        e_end = 0.25
        step_v = (e_end - e_start) / (n_steps - 1)

        for step_idx in range(n_steps):
            e_curr = e_start + step_idx * step_v
            # Baseline capacitive & background current: gently sloping background
            i_background = 0.05 + 0.04 * (e_curr + 1.25)

            # Sum of Gaussian stripping peaks: i(E) = i_p * exp(- (E - E_p)^2 / (2 * sigma^2))
            # FWHM = 2.355 * sigma => sigma = FWHM / 2.355 = 0.055 / 2.355 ~ 0.0233 V
            sigma = 0.0233
            i_faradaic = 0.0
            for pk in detected_peaks:
                delta_e = e_curr - pk.peak_potential_v
                i_faradaic += pk.peak_current_ua * math.exp(- (delta_e ** 2) / (2.0 * (sigma ** 2)))

            i_total = i_background + i_faradaic

            stripping_curve.append({
                "potential_v": round(e_curr, 3),
                "current_total_ua": round(i_total, 4),
                "current_background_ua": round(i_background, 4),
                "current_stripping_ua": round(i_faradaic, 4),
            })

        insights = (
            f"Anodic Stripping Voltammetry with {req.electrode_type.value} yielded a {preconc_factor:.0f}× "
            f"preconcentration enhancement over direct amperometry. Distinct Gaussian re-oxidation peaks "
            f"confirm resolution of Zn, Cd, Pb, and Cu without mutual interferences."
        )

        return StrippingVoltammetryResult(
            analyte_name=req.sample_name,
            deposition_potential_v=req.deposition_potential_v,
            deposition_time_s=req.deposition_time_s,
            stripping_mode=req.stripping_mode,
            peaks_detected=detected_peaks,
            stripping_curve=stripping_curve,
            preconcentration_factor=round(preconc_factor, 1),
            pedagogical_insights=insights,
        )

    @staticmethod
    def simulate_chronocoulometry(req: ChronocoulometryRequest) -> ChronocoulometryResult:
        # C* in mol/cm^3
        c_bulk_mol_cm3 = req.concentration_mm * 1e-6
        area = req.electrode_area_cm2
        n = req.n_electrons
        d = req.diffusion_coefficient_cm2_s

        # Anson slope: S = 2 * n * F * A * D^(1/2) * C* / sqrt(pi) in Coulombs / s^(1/2)
        anson_slope_c = (2.0 * n * FARADAY * area * math.sqrt(d) * c_bulk_mol_cm3) / math.sqrt(math.pi)
        anson_slope_uc = anson_slope_c * 1e6

        # Double layer charge Q_dl = C_dl * A * delta_V in uC
        q_dl_uc = req.double_layer_capacitance_uf_cm2 * area * req.potential_step_v

        # Adsorption charge Q_ads = n * F * A * Gamma in uC
        q_ads_c = n * FARADAY * area * req.surface_excess_gamma_mol_cm2
        q_ads_uc = q_ads_c * 1e6

        # Points along time step
        n_pts = 30
        anson_points: List[Dict[str, float]] = []
        for i in range(1, n_pts + 1):
            t_s = (i / n_pts) * req.step_duration_s
            sqrt_t = math.sqrt(t_s)
            q_diff_uc = anson_slope_uc * sqrt_t
            q_tot_uc = q_diff_uc + q_dl_uc + q_ads_uc

            anson_points.append({
                "time_s": round(t_s, 4),
                "sqrt_time_s": round(sqrt_t, 4),
                "charge_total_uc": round(q_tot_uc, 3),
                "charge_diffusional_uc": round(q_diff_uc, 3),
                "charge_double_layer_uc": round(q_dl_uc, 3),
                "charge_adsorption_uc": round(q_ads_uc, 3),
            })

        return ChronocoulometryResult(
            system_name=req.system_name,
            double_layer_charge_uc=round(q_dl_uc, 3),
            surface_excess_gamma_mol_cm2=req.surface_excess_gamma_mol_cm2,
            diffusion_coefficient_cm2_s=req.diffusion_coefficient_cm2_s,
            anson_slope_uc_s_half=round(anson_slope_uc, 3),
            anson_points=anson_points,
        )
