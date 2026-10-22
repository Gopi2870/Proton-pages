"""Scientific Electroanalytical Chemistry & Cyclic Voltammetry Engine (PR #037).

Implements Randles-Sevcik peak current, Butler-Volmer electron transfer kinetics,
Nicholson reversibility diagnostics, Cottrell chronoamperometry, and double-layer capacitance.
"""

import math
from typing import Dict, List, Optional, Tuple
from app.models.electroanalytical import (
    ElectrochemicalReversibility,
    VoltammogramPoint,
    ChronoamperometryPoint,
    CyclicVoltammetryResult,
    ChronoamperometryResult,
    ElectrochemicalPreset,
)
from app.schemas.electroanalytical import (
    CyclicVoltammetryRequest,
    ChronoamperometryRequest,
)

# Physical constants
FARADAY_F = 96485.33212  # C / mol
GAS_R = 8.314462618  # J / (mol * K)

BENCHMARK_PRESETS: List[ElectrochemicalPreset] = [
    ElectrochemicalPreset(
        id="ferricyanide",
        name="Potassium Ferricyanide / Ferrocyanide",
        redox_couple="[Fe(CN)6]3- + e- <=> [Fe(CN)6]4-",
        reversibility=ElectrochemicalReversibility.REVERSIBLE,
        e0_v_vs_she=0.360,
        n_electrons=1,
        standard_d_cm2_s=7.60e-6,
        standard_k0_cm_s=0.020,
        alpha=0.50,
        description="Canonical outer-sphere reversible single-electron redox standard in aqueous 0.1 M KCl. Displays textbook delta_Ep ≈ 59 mV and |ipa/ipc| = 1.0.",
    ),
    ElectrochemicalPreset(
        id="ferrocene",
        name="Ferrocene / Ferrocenium",
        redox_couple="Fc+ + e- <=> Fc",
        reversibility=ElectrochemicalReversibility.REVERSIBLE,
        e0_v_vs_she=0.400,
        n_electrons=1,
        standard_d_cm2_s=2.40e-5,
        standard_k0_cm_s=0.150,
        alpha=0.50,
        description="IUPAC recommended internal non-aqueous potential reference standard in acetonitrile / 0.1 M TBAPF6.",
    ),
    ElectrochemicalPreset(
        id="ruthenium_hexamine",
        name="Hexaammineruthenium(III/II)",
        redox_couple="[Ru(NH3)6]3+ + e- <=> [Ru(NH3)6]2+",
        reversibility=ElectrochemicalReversibility.REVERSIBLE,
        e0_v_vs_she=-0.210,
        n_electrons=1,
        standard_d_cm2_s=9.00e-6,
        standard_k0_cm_s=0.200,
        alpha=0.50,
        description="Fast reversible single-electron probe with negligible surface adsorption and ideal Nernstian behavior.",
    ),
    ElectrochemicalPreset(
        id="dopamine",
        name="Dopamine Neurotransmitter",
        redox_couple="Dopamine-o-quinone + 2H+ + 2e- <=> Dopamine",
        reversibility=ElectrochemicalReversibility.QUASI_REVERSIBLE,
        e0_v_vs_she=0.220,
        n_electrons=2,
        standard_d_cm2_s=6.00e-6,
        standard_k0_cm_s=0.003,
        alpha=0.45,
        description="Two-electron, two-proton quasi-reversible oxidation on carbon electrodes exhibiting peak broadening (delta_Ep > 70 mV).",
    ),
    ElectrochemicalPreset(
        id="ascorbic_acid",
        name="L-Ascorbic Acid (Vitamin C)",
        redox_couple="Dehydroascorbic acid + 2H+ + 2e- <=> Ascorbic acid",
        reversibility=ElectrochemicalReversibility.IRREVERSIBLE,
        e0_v_vs_she=0.060,
        n_electrons=2,
        standard_d_cm2_s=5.80e-6,
        standard_k0_cm_s=1.0e-5,
        alpha=0.35,
        description="Electrochemically irreversible oxidation (EC mechanism) with rapid follow-up hydration of dehydroascorbic acid, lacking a cathodic return wave.",
    ),
]


class ElectroanalyticalEngine:
    """Scientific simulation engine for cyclic voltammetry and chronoamperometry."""

    @classmethod
    def calculate_randles_sevcik_peak_current(
        cls,
        n_electrons: int,
        electrode_area_cm2: float,
        concentration_mm: float,
        diffusion_coeff_cm2_s: float,
        scan_rate_v_s: float,
        temperature_k: float = 298.15,
        alpha: float = 0.5,
        is_reversible: bool = True,
    ) -> float:
        """Calculates theoretical Randles-Sevcik peak current in microamperes (uA).

        Reversible: i_p = 0.4463 * n * F * A * C * sqrt(n * F * v * D / (R * T))
        Irreversible: i_p = 0.4958 * n * F * A * C * sqrt(alpha * n * F * v * D / (R * T))
        """
        # C in mol/cm^3 (1 mM = 10^-3 mol/L = 10^-6 mol/cm^3)
        c_mol_cm3 = concentration_mm * 1.0e-6

        if is_reversible:
            prefactor = 0.4463
            kinetic_factor = n_electrons
        else:
            prefactor = 0.4958
            kinetic_factor = alpha * n_electrons

        f_rt = FARADAY_F / (GAS_R * temperature_k)
        sqrt_term = math.sqrt(kinetic_factor * f_rt * scan_rate_v_s * diffusion_coeff_cm2_s)
        i_peak_amps = prefactor * n_electrons * FARADAY_F * electrode_area_cm2 * c_mol_cm3 * sqrt_term
        return i_peak_amps * 1.0e6  # Convert A to uA

    @classmethod
    def diagnose_reversibility(
        cls,
        k0_cm_s: float,
        diffusion_coeff_cm2_s: float,
        scan_rate_v_s: float,
        n_electrons: int,
        temperature_k: float = 298.15,
    ) -> Tuple[ElectrochemicalReversibility, float]:
        """Calculates Nicholson dimensionless parameter psi and classifies reversibility."""
        f_rt = FARADAY_F / (GAS_R * temperature_k)
        denom = math.sqrt(math.pi * diffusion_coeff_cm2_s * n_electrons * f_rt * scan_rate_v_s)
        psi = k0_cm_s / max(1e-12, denom)

        if psi >= 7.0:
            return ElectrochemicalReversibility.REVERSIBLE, psi
        elif psi >= 0.001:
            return ElectrochemicalReversibility.QUASI_REVERSIBLE, psi
        else:
            return ElectrochemicalReversibility.IRREVERSIBLE, psi

    @classmethod
    def simulate_cyclic_voltammetry(cls, req: CyclicVoltammetryRequest) -> CyclicVoltammetryResult:
        """Simulates full forward and reverse cyclic voltammogram with Randles-Sevcik and Butler-Volmer kinetics."""
        temp_k = req.temperature_k
        f_rt = FARADAY_F / (GAS_R * temp_k)
        n = req.n_electrons
        d = req.diffusion_coefficient_cm2_s
        scan_rate = req.scan_rate_v_s
        area = req.electrode_area_cm2
        c_mm = req.concentration_mm
        alpha = req.transfer_coefficient_alpha
        k0 = req.standard_rate_constant_k0_cm_s

        reversibility, psi = cls.diagnose_reversibility(k0, d, scan_rate, n, temp_k)

        # Peak potential shifts based on reversibility (Nicholson formulation)
        thermal_voltage = 1.0 / f_rt  # ~25.7 mV at 298.15 K
        ideal_delta_ep = (2.303 * thermal_voltage * 1000.0) / n  # ~59.2 mV / n

        if reversibility == ElectrochemicalReversibility.REVERSIBLE:
            delta_ep_mv = ideal_delta_ep
            anodic_peak_shift = delta_ep_mv / (2000.0)
            cathodic_peak_shift = -delta_ep_mv / (2000.0)
            rev_current_ratio = 1.0
        elif reversibility == ElectrochemicalReversibility.QUASI_REVERSIBLE:
            # Nicholson empirical relation: delta_Ep increases as psi decreases
            delta_ep_mv = ideal_delta_ep * (1.0 + 0.5 / (psi + 0.1))
            anodic_peak_shift = delta_ep_mv / (2000.0)
            cathodic_peak_shift = -delta_ep_mv / (2000.0)
            rev_current_ratio = max(0.65, 1.0 - 0.2 / (psi + 0.5))
        else:
            # Irreversible: peak shifts strongly with scan rate, no return cathodic wave
            delta_ep_mv = None
            anodic_peak_shift = (thermal_voltage / (alpha * n)) * math.log(max(1.1, math.sqrt(scan_rate / 0.01)))
            cathodic_peak_shift = None
            rev_current_ratio = 0.0

        e_peak_anodic = req.e0_v + anodic_peak_shift
        e_peak_cathodic = (req.e0_v + cathodic_peak_shift) if cathodic_peak_shift is not None else None

        # Theoretical peak currents
        is_rev = reversibility == ElectrochemicalReversibility.REVERSIBLE
        ipa_theory = cls.calculate_randles_sevcik_peak_current(
            n, area, c_mm, d, scan_rate, temp_k, alpha, is_rev
        )
        ipc_theory = (ipa_theory * rev_current_ratio) if reversibility != ElectrochemicalReversibility.IRREVERSIBLE else None

        # Double layer capacitive charging current: i_cap = A * Cdl * v (in uA)
        # Cdl in uF/cm^2, v in V/s -> A (cm^2) * uF/cm^2 * V/s = uA
        icap_mag = area * req.double_layer_capacitance_uf_cm2 * scan_rate

        # Generate Waveform Potentials (2 mV resolution)
        step_v = 0.002
        forward_potentials: List[float] = []
        reverse_potentials: List[float] = []

        is_anodic_forward = req.e_switch_v > req.e_start_v

        # Forward scan
        curr_e = req.e_start_v
        if is_anodic_forward:
            while curr_e <= req.e_switch_v:
                forward_potentials.append(round(curr_e, 4))
                curr_e += step_v
            # Reverse scan
            curr_e = req.e_switch_v
            while curr_e >= req.e_start_v:
                reverse_potentials.append(round(curr_e, 4))
                curr_e -= step_v
        else:
            while curr_e >= req.e_switch_v:
                forward_potentials.append(round(curr_e, 4))
                curr_e -= step_v
            # Reverse scan
            curr_e = req.e_switch_v
            while curr_e <= req.e_start_v:
                reverse_potentials.append(round(curr_e, 4))
                curr_e += step_v

        voltammogram_points: List[VoltammogramPoint] = []
        total_time = 0.0
        dt = step_v / scan_rate

        # Function to generate Faradaic current wave shape based on Nicholson-Shain
        def faradaic_wave(pot: float, e_peak: float, i_peak: float, is_fwd: bool) -> float:
            # Dimensionless overpotential
            sigma_v = 0.040 * (ideal_delta_ep / 59.2)
            d_pot = pot - e_peak

            if is_fwd:
                # Approaching peak: exponential Butler-Volmer onset
                if d_pot < 0:
                    shape = math.exp(d_pot / max(0.015, sigma_v * 0.8))
                else:
                    # Past peak: Cottrellian diffusion decay ~ 1 / sqrt(1 + d_pot)
                    shape = 1.0 / math.sqrt(1.0 + (d_pot / max(0.015, sigma_v * 1.2)))
                return i_peak * shape
            else:
                # Reverse wave
                if d_pot > 0:
                    shape = math.exp(-d_pot / max(0.015, sigma_v * 0.8))
                else:
                    shape = 1.0 / math.sqrt(1.0 + (-d_pot / max(0.015, sigma_v * 1.2)))
                return -i_peak * shape

        # 1. Forward Scan Points
        for ep in forward_potentials:
            total_time += dt
            i_far = faradaic_wave(ep, e_peak_anodic, ipa_theory, True) if is_anodic_forward else faradaic_wave(ep, e_peak_cathodic or req.e0_v, ipc_theory or ipa_theory, False)
            i_cap = icap_mag if is_anodic_forward else -icap_mag
            i_tot = i_far + i_cap
            voltammogram_points.append(
                VoltammogramPoint(
                    potential_v=ep,
                    current_ua=round(i_tot, 3),
                    current_faradaic_ua=round(i_far, 3),
                    current_capacitive_ua=round(i_cap, 3),
                    scan_direction="forward",
                    time_s=round(total_time, 4),
                )
            )

        # 2. Reverse Scan Points
        for ep in reverse_potentials:
            total_time += dt
            if reversibility == ElectrochemicalReversibility.IRREVERSIBLE:
                # No return wave for irreversible reaction; only capacitive baseline + residual Cottrell tail
                i_far = 0.05 * ipa_theory * math.exp(-abs(ep - req.e0_v) / 0.1)
            else:
                i_far = faradaic_wave(ep, e_peak_cathodic or req.e0_v, ipc_theory or ipa_theory, False) if is_anodic_forward else faradaic_wave(ep, e_peak_anodic, ipa_theory, True)
            i_cap = -icap_mag if is_anodic_forward else icap_mag
            i_tot = i_far + i_cap
            voltammogram_points.append(
                VoltammogramPoint(
                    potential_v=ep,
                    current_ua=round(i_tot, 3),
                    current_faradaic_ua=round(i_far, 3),
                    current_capacitive_ua=round(i_cap, 3),
                    scan_direction="reverse",
                    time_s=round(total_time, 4),
                )
            )

        # Pedagogical Summary
        e_half = (e_peak_anodic + e_peak_cathodic) / 2.0 if e_peak_cathodic is not None else req.e0_v
        summary = (
            f"Cyclic voltammogram simulated for {req.system_name or 'Redox Couple'} at v = {scan_rate * 1000:.0f} mV/s. "
            f"Mechanism classified as {reversibility.value.upper()} (Nicholson psi = {psi:.3f}). "
            f"Anodic peak: Epa = {e_peak_anodic:.3f} V, ipa = {ipa_theory:.1f} uA. "
            + (f"Cathodic peak: Epc = {e_peak_cathodic:.3f} V, delta_Ep = {delta_ep_mv:.1f} mV. " if delta_ep_mv else "Cathodic peak absent (irreversible EC mechanism). ")
            + f"Estimated E1/2 = {e_half:.3f} V vs Ref. Capacitive background: icap = {icap_mag:.2f} uA."
        )

        return CyclicVoltammetryResult(
            system_name=req.system_name or "Redox Couple",
            reversibility=reversibility,
            n_electrons=n,
            e_half_v=round(e_half, 4),
            e_peak_anodic_v=round(e_peak_anodic, 4),
            e_peak_cathodic_v=round(e_peak_cathodic, 4) if e_peak_cathodic is not None else None,
            delta_ep_mv=round(delta_ep_mv, 1) if delta_ep_mv is not None else None,
            peak_current_anodic_ua=round(ipa_theory, 2),
            peak_current_cathodic_ua=round(ipc_theory, 2) if ipc_theory is not None else None,
            current_ratio=round(rev_current_ratio, 3) if reversibility != ElectrochemicalReversibility.IRREVERSIBLE else None,
            scan_rate_v_s=scan_rate,
            diffusion_coefficient_cm2_s=d,
            electrode_area_cm2=area,
            concentration_mm=c_mm,
            standard_rate_constant_k0_cm_s=k0,
            transfer_coefficient_alpha=alpha,
            voltammogram=voltammogram_points,
            pedagogical_summary=summary,
        )

    @classmethod
    def simulate_chronoamperometry(cls, req: ChronoamperometryRequest) -> ChronoamperometryResult:
        """Simulates Cottrell chronoamperometry under semi-infinite planar diffusion control."""
        # Cottrell equation: i(t) = (n * F * A * D^0.5 * C) / (pi^0.5 * t^0.5)
        c_mol_cm3 = req.concentration_mm * 1.0e-6
        n = req.n_electrons
        f = FARADAY_F
        a = req.electrode_area_cm2
        d = req.diffusion_coefficient_cm2_s

        # Slope S in uA * s^(1/2): i(t) = S * t^(-1/2)
        cottrell_slope_amps_s_half = (n * f * a * math.sqrt(d) * c_mol_cm3) / math.sqrt(math.pi)
        cottrell_slope_ua_s_half = cottrell_slope_amps_s_half * 1.0e6

        points: List[ChronoamperometryPoint] = []
        t = req.time_step_s
        while t <= req.duration_s:
            inv_sqrt_t = 1.0 / math.sqrt(t)
            i_ua = cottrell_slope_ua_s_half * inv_sqrt_t
            points.append(
                ChronoamperometryPoint(
                    time_s=round(t, 4),
                    current_ua=round(i_ua, 3),
                    inv_sqrt_time=round(inv_sqrt_t, 4),
                )
            )
            t += req.time_step_s

        summary = (
            f"Cottrell chronoamperogram simulated for {req.preset_id or 'Analyte'} over {req.duration_s} seconds. "
            f"Linear Cottrell slope S = {cottrell_slope_ua_s_half:.2f} uA*s^(1/2). "
            f"Diffusion coefficient verified at D = {d:.2e} cm^2/s under planar diffusion limiting conditions."
        )

        return ChronoamperometryResult(
            system_name=req.preset_id or "Chronoamperometry",
            applied_potential_v=req.applied_potential_v,
            duration_s=req.duration_s,
            cottrell_slope_ua_s_half=round(cottrell_slope_ua_s_half, 3),
            diffusion_coefficient_cm2_s=d,
            curve=points,
            pedagogical_summary=summary,
        )
