"""
Microfluidics, Droplet Chemistry, and Continuous-Flow Reactor Engine.
Implements first-principles fluid dynamics, droplet pinch-off scaling laws,
chaotic advection inside segmented slugs, and plug-flow axial dispersion reactors.
"""
import math
from typing import Dict, List, Optional
from app.models.microfluidics import (
    FlowRegime,
    DropletRegime,
    JunctionGeometry,
    MicrofluidicChip,
    HydrodynamicResult,
    DropletGenerationResult,
    FlowReactionResult,
)
from app.schemas.microfluidics import (
    HydrodynamicsRequest,
    DropletGenerationRequest,
    FlowReactionRequest,
    BenchmarkReactionInfo,
)


CURATED_CHIPS: List[MicrofluidicChip] = [
    MicrofluidicChip(
        id="chip_pdms_t_junction",
        name="PDMS Microfluidic T-Junction",
        material="Polydimethylsiloxane (PDMS) / Glass",
        geometry=JunctionGeometry.T_JUNCTION,
        channel_width_um=100.0,
        channel_height_um=50.0,
        channel_length_mm=30.0,
        description="Standard soft-lithography microfluidic chip for monodisperse water-in-oil emulsion droplet generation.",
    ),
    MicrofluidicChip(
        id="chip_quartz_flow_focusing",
        name="Quartz Flow-Focusing Droplet Generator",
        material="Fused Silica Quartz",
        geometry=JunctionGeometry.FLOW_FOCUSING,
        channel_width_um=50.0,
        channel_height_um=50.0,
        channel_length_mm=45.0,
        description="Symmetric cross-junction hydrodynamic flow-focusing chip with high solvent compatibility and narrow orifice.",
    ),
    MicrofluidicChip(
        id="chip_capillary_tubular_reactor",
        name="Silicon/PTFE Micro-Tubular Flow Reactor",
        material="PTFE / Silicon-Pyrex",
        geometry=JunctionGeometry.CO_FLOW,
        channel_width_um=250.0,
        channel_height_um=250.0,
        channel_length_mm=1500.0,
        description="High-throughput continuous-flow microcapillary reactor for synthetic intermediates, high pressure and thermal stability.",
    ),
    MicrofluidicChip(
        id="chip_chaotic_mixer_serpentine",
        name="Staggered Herringbone Serpentine Micro-Mixer",
        material="Cyclic Olefin Copolymer (COC)",
        geometry=JunctionGeometry.T_JUNCTION,
        channel_width_um=200.0,
        channel_height_um=75.0,
        channel_length_mm=120.0,
        description="Passive micromixer with chaotic 3D streamlines promoting rapid transverse mass transfer under laminar flow.",
    ),
]

CURATED_REACTIONS: List[BenchmarkReactionInfo] = [
    BenchmarkReactionInfo(
        id="rxn_aunp_synthesis",
        name="Gold Nanoparticle (AuNP) Nucleation & Growth",
        reaction_type="Nanomaterial Synthesis",
        reagents="HAuCl4 (aq) + NaBH4 (aq) in segmented oil slugs",
        typical_temperature_c=25.0,
        typical_residence_time_s=12.0,
        k1_at_ref_temp=0.45,
        k2_at_ref_temp=0.03,
        description="Millisecond mixing in segmented microdroplets eliminates size polydispersity, producing monodisperse 4 nm gold seeds.",
    ),
    BenchmarkReactionInfo(
        id="rxn_ester_saponification",
        name="Ethyl Acetate Saponification",
        reaction_type="Nucleophilic Acyl Substitution",
        reagents="CH3COOC2H5 + NaOH -> CH3COONa + C2H5OH",
        typical_temperature_c=35.0,
        typical_residence_time_s=45.0,
        k1_at_ref_temp=0.11,
        k2_at_ref_temp=0.0,
        description="Classic second-order alkaline hydrolysis bench flow benchmark with high thermal control.",
    ),
    BenchmarkReactionInfo(
        id="rxn_azo_coupling",
        name="Fast Exothermic Azo-Dye Coupling",
        reaction_type="Electrophilic Aromatic Substitution (EAS)",
        reagents="4-Nitrobenzenediazonium + 2-Naphthol -> Para Red",
        typical_temperature_c=5.0,
        typical_residence_time_s=4.5,
        k1_at_ref_temp=1.20,
        k2_at_ref_temp=0.08,
        description="Extremely rapid, highly exothermic reaction where microchannel heat dissipation (A/V > 10,000 m^-1) prevents thermal degradation.",
    ),
    BenchmarkReactionInfo(
        id="rxn_ddpcr_emulsion",
        name="Droplet Digital PCR (ddPCR) Thermal Cycling",
        reaction_type="Enzymatic DNA Amplification",
        reagents="DNA Template, Taq Polymerase, Primers, EvaGreen in Fluorinated Oil",
        typical_temperature_c=95.0,
        typical_residence_time_s=60.0,
        k1_at_ref_temp=0.08,
        k2_at_ref_temp=0.002,
        description="Monodisperse 65 pL water-in-oil droplets partition genome copies into discrete single-molecule microreactors.",
    ),
]


class MicrofluidicsEngine:
    """Scientific simulation engine for microfluidic channels, droplets, and flow reactors."""

    @staticmethod
    def calculate_hydrodynamics(req: HydrodynamicsRequest) -> HydrodynamicResult:
        w = req.channel_width_um * 1e-6
        h = req.channel_height_um * 1e-6
        l_m = req.channel_length_mm * 1e-3

        # Cross section and hydraulic diameter
        area_m2 = w * h
        d_h_m = 2.0 * w * h / (w + h)

        # Flow rate in m^3/s: 1 uL/min = 1e-9 m^3 / 60 s
        q_m3_s = (req.flow_rate_ul_min * 1e-9) / 60.0

        # Mean linear velocity
        v_m_s = q_m3_s / area_m2

        # Dimensionless numbers
        re = (req.density_kg_m3 * v_m_s * d_h_m) / req.viscosity_pa_s
        ca = (req.viscosity_pa_s * v_m_s) / req.interfacial_tension_n_m
        pe = (v_m_s * d_h_m) / req.diffusion_coefficient_m2_s

        if re < 1.0:
            regime = FlowRegime.CREEPING_LAMINAR
        elif re < 2000.0:
            regime = FlowRegime.LAMINAR
        elif re < 4000.0:
            regime = FlowRegime.TRANSITIONAL
        else:
            regime = FlowRegime.TURBULENT

        # Rectangular Poiseuille pressure drop with aspect ratio alpha = min(w,h)/max(w,h)
        dim_min = min(w, h)
        dim_max = max(w, h)
        alpha = dim_min / dim_max

        # Delta P = (12 * mu * L * Q) / (dim_max * dim_min^3 * (1 - 0.630 * alpha))
        denom = dim_max * (dim_min ** 3) * (1.0 - 0.630 * alpha)
        delta_p_pa = (12.0 * req.viscosity_pa_s * l_m * q_m3_s) / max(denom, 1e-25)
        delta_p_kpa = delta_p_pa / 1000.0

        r_h = delta_p_pa / max(q_m3_s, 1e-25)
        # Wall shear stress estimate: tau_w = 6 * mu * v / h_min
        tau_w = (6.0 * req.viscosity_pa_s * v_m_s) / dim_min

        return HydrodynamicResult(
            reynolds_number=round(re, 5),
            capillary_number=round(ca, 6),
            peclet_number=round(pe, 2),
            flow_regime=regime,
            hydraulic_diameter_um=round(d_h_m * 1e6, 2),
            mean_velocity_m_s=round(v_m_s, 6),
            pressure_drop_kpa=round(delta_p_kpa, 4),
            hydraulic_resistance_pa_s_m3=round(r_h, 2),
            wall_shear_stress_pa=round(tau_w, 4),
        )

    @staticmethod
    def simulate_droplet_generation(req: DropletGenerationRequest) -> DropletGenerationResult:
        w_m = req.channel_width_um * 1e-6
        h_m = req.channel_height_um * 1e-6
        area_m2 = w_m * h_m

        # Flow rates in m^3/s
        q_d = (req.dispersed_flow_rate_ul_min * 1e-9) / 60.0
        q_c = (req.continuous_flow_rate_ul_min * 1e-9) / 60.0
        q_tot = q_d + q_c

        # Linear velocities
        v_c = q_c / area_m2
        v_slug = q_tot / area_m2

        # Capillary number of continuous phase
        ca_c = (req.continuous_viscosity_pa_s * v_c) / req.interfacial_tension_n_m
        flow_ratio = q_d / max(q_c, 1e-12)

        # Regime determination
        if ca_c < 0.015:
            regime = DropletRegime.SQUEEZING
            alpha_geom = 1.35 if req.geometry == JunctionGeometry.T_JUNCTION else 0.95
        elif ca_c <= 0.12:
            regime = DropletRegime.DRIPPING
            alpha_geom = 1.05 if req.geometry == JunctionGeometry.T_JUNCTION else 0.70
        else:
            regime = DropletRegime.JETTING
            alpha_geom = 0.65 if req.geometry == JunctionGeometry.T_JUNCTION else 0.45

        # Garstecki scaling law: L_drop / w = 1 + alpha * (Q_d / Q_c)
        l_drop_ratio = 1.0 + alpha_geom * flow_ratio
        l_drop_m = l_drop_ratio * w_m

        # Droplet volume: approximate rectangular plug with rounded caps
        # V_drop = w * h * L_drop - (1 - pi/4) * w^2 * h
        v_drop_m3 = (w_m * h_m * l_drop_m) - (1.0 - math.pi / 4.0) * (w_m ** 2) * h_m
        # Ensure minimum volume is at least spherical droplet of diameter min(w,h)
        v_min = (math.pi / 6.0) * (min(w_m, h_m) ** 3)
        v_drop_m3 = max(v_drop_m3, v_min)

        # 1 pL = 1e-15 m^3
        v_drop_pl = v_drop_m3 / 1e-15

        # Generation frequency f = Q_d / V_drop
        freq_hz = q_d / max(v_drop_m3, 1e-25)

        # Equivalent spherical diameter
        d_eq_m = ((6.0 * v_drop_m3) / math.pi) ** (1.0 / 3.0)
        d_eq_um = d_eq_m * 1e6

        # Mixing kinetics
        # Pure unsegmented diffusion time across width: tau_diff = w^2 / (pi^2 * D)
        d_m2_s = req.diffusion_coefficient_m2_s
        tau_diff_s = (w_m ** 2) / (math.pi * math.pi * d_m2_s)
        unsegmented_mix_ms = tau_diff_s * 1000.0

        # Segmented droplet chaotic recirculation mixing (Song et al.):
        # Péclet number inside droplet
        pe_drop = (v_slug * w_m) / d_m2_s
        # tau_mix ~ (w / v_slug) * ln(Pe)
        tau_mix_s = (w_m / max(v_slug, 1e-6)) * math.log(max(pe_drop, 2.0))
        # Ensure within physical bounds (cannot be smaller than 0.1 ms)
        tau_mix_s = max(0.0001, min(tau_mix_s, tau_diff_s))
        segmented_mix_ms = tau_mix_s * 1000.0

        acceleration_fold = unsegmented_mix_ms / max(segmented_mix_ms, 1e-3)

        return DropletGenerationResult(
            regime=regime,
            droplet_volume_pl=round(v_drop_pl, 2),
            droplet_diameter_um=round(d_eq_um, 2),
            generation_frequency_hz=round(freq_hz, 2),
            droplet_length_um=round(l_drop_m * 1e6, 2),
            slug_velocity_m_s=round(v_slug, 4),
            mixing_time_ms=round(segmented_mix_ms, 2),
            unsegmented_mixing_time_ms=round(unsegmented_mix_ms, 2),
            mixing_acceleration_fold=round(acceleration_fold, 1),
        )

    @staticmethod
    def simulate_flow_reactor(req: FlowReactionRequest) -> FlowReactionResult:
        w_m = req.channel_width_um * 1e-6
        h_m = req.channel_height_um * 1e-6
        l_m = req.channel_length_mm * 1e-3
        area_m2 = w_m * h_m
        vol_reactor_m3 = area_m2 * l_m

        # Total volumetric flow rate in m^3/s: Q = (uL/min * 1e-9) / 60
        q_m3_s = (req.total_flow_rate_ul_min * 1e-9) / 60.0
        v_m_s = q_m3_s / area_m2

        # Space time tau in seconds
        tau_s = vol_reactor_m3 / max(q_m3_s, 1e-25)

        # Dimensionless numbers
        d_h_m = 2.0 * w_m * h_m / (w_m + h_m)
        rho = 1000.0  # kg/m^3
        mu = 0.001   # Pa·s
        re = (rho * v_m_s * d_h_m) / mu

        # Molecular diffusion & Taylor-Aris axial dispersion:
        # D_ax = D_m + (v^2 * D_h^2) / (192 * D_m)
        d_m = 1.0e-9
        d_ax = d_m + ((v_m_s ** 2) * (d_h_m ** 2)) / (192.0 * d_m)
        # Bodenstein number Bo = v * L / D_ax
        bo = (v_m_s * l_m) / max(d_ax, 1e-20)

        # Arrhenius temperature scaling: k(T) = k_ref * exp(-Ea/R * (1/T - 1/T_ref))
        t_ref = 298.15
        e_a_j_mol = 45000.0  # 45 kJ/mol typical activation energy
        r_gas = 8.314462618
        arrhenius_factor = math.exp(- (e_a_j_mol / r_gas) * (1.0 / req.temperature_k - 1.0 / t_ref))

        k1 = req.rate_constant_k1 * arrhenius_factor
        k2 = req.rate_constant_k2 * arrhenius_factor

        # Analytical PFR conversion for consecutive reaction A -> P -> S
        # C_A(t) = C_A0 * exp(-k1 * t)
        c_a0 = req.initial_concentration_m
        c_a_end = c_a0 * math.exp(-k1 * tau_s)
        conversion = 1.0 - (c_a_end / c_a0)

        if abs(k1 - k2) > 1e-7:
            c_p_end = c_a0 * (k1 / (k2 - k1)) * (math.exp(-k1 * tau_s) - math.exp(-k2 * tau_s))
        else:
            c_p_end = c_a0 * k1 * tau_s * math.exp(-k1 * tau_s)

        c_p_end = max(0.0, c_p_end)
        c_s_end = max(0.0, c_a0 - c_a_end - c_p_end)

        yield_p = c_p_end / c_a0
        yield_s = c_s_end / c_a0

        # Space-Time Yield (STY) in kg/(m^3 * h)
        # STY = (Q * C_p * MW) / V_R = (C_p * MW / tau) * 3600 / 1000
        # C_p is in mol/L = 1000 mol/m^3. MW is in g/mol = 1e-3 kg/mol.
        # Product density rate: C_p (mol/L) * 1000 * MW (g/mol) * 1e-3 = C_p * MW (kg/m^3)
        sty_kg_m3_h = (c_p_end * req.molecular_weight_g_mol / max(tau_s, 1e-4)) * 3600.0

        # Axial concentration profiles (21 points from z=0 to z=L)
        axial_profiles: List[Dict[str, float]] = []
        n_pts = 21
        for i in range(n_pts):
            z_frac = i / (n_pts - 1)
            z_m = z_frac * l_m
            t_loc = z_frac * tau_s
            ca_z = c_a0 * math.exp(-k1 * t_loc)
            if abs(k1 - k2) > 1e-7:
                cp_z = c_a0 * (k1 / (k2 - k1)) * (math.exp(-k1 * t_loc) - math.exp(-k2 * t_loc))
            else:
                cp_z = c_a0 * k1 * t_loc * math.exp(-k1 * t_loc)
            cp_z = max(0.0, cp_z)
            cs_z = max(0.0, c_a0 - ca_z - cp_z)

            axial_profiles.append({
                "z_position_mm": round(z_m * 1000.0, 2),
                "fractional_length": round(z_frac, 3),
                "residence_time_s": round(t_loc, 3),
                "c_reactant_m": round(ca_z, 4),
                "c_product_m": round(cp_z, 4),
                "c_byproduct_m": round(cs_z, 4),
            })

        # Residence Time Distribution (RTD) E(theta) where theta = t / tau
        # Closed-closed dispersion model approximation: E(theta) = 1/(2 * sqrt(pi*theta/Bo)) * exp(-(1-theta)^2 / (4*theta/Bo))
        rtd_curve: List[Dict[str, float]] = []
        theta_steps = 30
        for j in range(1, theta_steps + 1):
            theta = (j / theta_steps) * 2.5
            variance_factor = max(4.0 * theta / max(bo, 1.0), 1e-6)
            coeff = 1.0 / (2.0 * math.sqrt(math.pi * theta / max(bo, 1.0)))
            exp_term = math.exp(- ((1.0 - theta) ** 2) / variance_factor)
            e_theta = coeff * exp_term

            rtd_curve.append({
                "theta": round(theta, 3),
                "time_s": round(theta * tau_s, 2),
                "e_theta": round(e_theta, 4),
            })

        return FlowReactionResult(
            residence_time_s=round(tau_s, 3),
            reynolds_number=round(re, 4),
            bodenstein_number=round(bo, 2),
            conversion=round(conversion, 4),
            intermediate_yield=round(yield_p, 4),
            byproduct_yield=round(yield_s, 4),
            space_time_yield_kg_m3_h=round(sty_kg_m3_h, 2),
            rtd_curve=rtd_curve,
            axial_concentration_profile=axial_profiles,
        )
