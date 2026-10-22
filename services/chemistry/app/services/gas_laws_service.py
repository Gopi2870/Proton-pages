"""
Gas Laws, Kinetic Molecular Theory and Real Gas Phase Equilibria Engine.
Calculates Ideal Gas solutions, Van der Waals non-ideal equations of state,
Maxwell-Boltzmann statistical velocity distributions, and Clausius-Clapeyron vapor pressures.
"""
import math
from typing import Dict, List, Optional, Any
from services.chemistry.app.models.gas_laws import (
    IdealGasResult,
    VanDerWaalsPoint,
    VanDerWaalsResult,
    SpeedDistributionPoint,
    MaxwellBoltzmannResult,
    VaporPressurePoint,
    PhaseEquilibriumResult,
    RealGasConstants,
)


class GasLawsService:
    """Scientific calculation engine for gases and phase boundaries."""

    R_ATM_L = 0.082057338  # L * atm / (mol * K)
    R_SI = 8.314462618     # J / (mol * K)
    K_BOLTZMANN = 1.380649e-23  # J / K

    REAL_GAS_CATALOG: Dict[str, RealGasConstants] = {
        "he": RealGasConstants("he", "Helium", "He", 4.0026, 0.0346, 0.0238, 5.19, 2.24),
        "h2": RealGasConstants("h2", "Hydrogen", "H2", 2.0160, 0.2450, 0.0265, 33.2, 12.8),
        "n2": RealGasConstants("n2", "Nitrogen", "N2", 28.0134, 1.3700, 0.0387, 126.2, 33.5),
        "o2": RealGasConstants("o2", "Oxygen", "O2", 31.9988, 1.3820, 0.0319, 154.6, 49.8),
        "ch4": RealGasConstants("ch4", "Methane", "CH4", 16.0425, 2.3030, 0.0431, 190.6, 45.4),
        "co2": RealGasConstants("co2", "Carbon Dioxide", "CO2", 44.010, 3.6580, 0.0429, 304.2, 72.8),
        "nh3": RealGasConstants("nh3", "Ammonia", "NH3", 17.031, 4.2250, 0.0371, 405.5, 111.3),
        "h2o": RealGasConstants("h2o", "Water Vapor", "H2O", 18.015, 5.5370, 0.0305, 647.1, 217.7),
    }

    PHASE_DATA: Dict[str, Dict[str, Any]] = {
        "water": {
            "name": "Water",
            "formula": "H2O",
            "t_boil_c": 100.0,
            "dh_vap_kj_mol": 40.66,
            "t_melt_c": 0.0,
            "triple_t_c": 0.01,
            "triple_p_kpa": 0.6117,
            "critical_t_c": 374.0,
            "critical_p_mpa": 22.06,
        },
        "ethanol": {
            "name": "Ethanol",
            "formula": "C2H5OH",
            "t_boil_c": 78.2,
            "dh_vap_kj_mol": 38.56,
            "t_melt_c": -114.1,
            "triple_t_c": -114.1,
            "triple_p_kpa": 0.001,
            "critical_t_c": 240.8,
            "critical_p_mpa": 6.14,
        },
        "acetone": {
            "name": "Acetone",
            "formula": "C3H6O",
            "t_boil_c": 56.1,
            "dh_vap_kj_mol": 29.10,
            "t_melt_c": -94.7,
            "triple_t_c": -94.7,
            "triple_p_kpa": 0.002,
            "critical_t_c": 235.0,
            "critical_p_mpa": 4.70,
        },
        "benzene": {
            "name": "Benzene",
            "formula": "C6H6",
            "t_boil_c": 80.1,
            "dh_vap_kj_mol": 30.77,
            "t_melt_c": 5.5,
            "triple_t_c": 5.5,
            "triple_p_kpa": 4.8,
            "critical_t_c": 288.9,
            "critical_p_mpa": 4.89,
        },
    }

    @classmethod
    def calculate_ideal_gas(
        cls,
        pressure_atm: Optional[float] = None,
        volume_liters: Optional[float] = None,
        moles: Optional[float] = None,
        temperature_k: Optional[float] = None,
        temperature_c: Optional[float] = None,
        molar_mass_g_mol: Optional[float] = None,
    ) -> IdealGasResult:
        """Solve Ideal Gas equation of state PV = nRT for unknown variable."""
        # Temperature resolution
        if temperature_k is None and temperature_c is not None:
            temperature_k = temperature_c + 273.15

        given_vars = [
            ("P", pressure_atm),
            ("V", volume_liters),
            ("n", moles),
            ("T", temperature_k),
        ]
        missing = [name for name, val in given_vars if val is None]

        if len(missing) != 1:
            raise ValueError(f"Exactly one variable out of (P, V, n, T) must be missing to solve PV=nRT. Missing: {missing}")

        target = missing[0]
        if target == "P":
            p = (moles * cls.R_ATM_L * temperature_k) / volume_liters
            v, n, t = volume_liters, moles, temperature_k
            eq_str = f"P = nRT / V = ({moles:.3f} × {cls.R_ATM_L} × {temperature_k:.2f}) / {volume_liters:.3f} = {p:.4f} atm"
        elif target == "V":
            v = (moles * cls.R_ATM_L * temperature_k) / pressure_atm
            p, n, t = pressure_atm, moles, temperature_k
            eq_str = f"V = nRT / P = ({moles:.3f} × {cls.R_ATM_L} × {temperature_k:.2f}) / {pressure_atm:.4f} = {v:.4f} L"
        elif target == "n":
            n = (pressure_atm * volume_liters) / (cls.R_ATM_L * temperature_k)
            p, v, t = pressure_atm, volume_liters, temperature_k
            eq_str = f"n = PV / RT = ({pressure_atm:.4f} × {volume_liters:.3f}) / ({cls.R_ATM_L} × {temperature_k:.2f}) = {n:.4f} mol"
        else:  # target == 'T'
            t = (pressure_atm * volume_liters) / (moles * cls.R_ATM_L)
            p, v, n = pressure_atm, volume_liters, moles
            eq_str = f"T = PV / nR = ({pressure_atm:.4f} × {volume_liters:.3f}) / ({moles:.3f} × {cls.R_ATM_L}) = {t:.2f} K"

        molar_vol = v / n if n > 0 else 22.414
        density = (p * molar_mass_g_mol) / (cls.R_ATM_L * t) if molar_mass_g_mol else None

        notes = f"Ideal gas solution: molar volume Vm = {molar_vol:.3f} L/mol."

        return IdealGasResult(
            pressure_atm=round(p, 4),
            volume_liters=round(v, 4),
            moles=round(n, 5),
            temperature_k=round(t, 2),
            temperature_c=round(t - 273.15, 2),
            molar_volume_l_mol=round(molar_vol, 3),
            density_g_l=round(density, 4) if density is not None else None,
            equation=eq_str,
            notes=notes,
        )

    @classmethod
    def simulate_vanderwaals(
        cls,
        gas_id: str,
        moles: float = 1.0,
        temperature_k: float = 298.15,
        current_volume_liters: float = 1.0,
        min_volume_liters: float = 0.15,
        max_volume_liters: float = 5.0,
        steps: int = 40,
    ) -> VanDerWaalsResult:
        """Simulate real gas behavior via Van der Waals equation of state: (P + an^2/V^2)(V - nb) = nRT."""
        gas = cls.REAL_GAS_CATALOG.get(gas_id.lower())
        if not gas:
            gas = cls.REAL_GAS_CATALOG["co2"]

        a = gas.vdw_a_l2_atm_mol2
        b = gas.vdw_b_l_mol

        # Check for volume singularity V <= nb
        nb = moles * b
        if current_volume_liters <= nb:
            raise ValueError(f"Volume ({current_volume_liters} L) must exceed excluded molecular volume nb ({nb:.4f} L)")

        # P_ideal = nRT / V
        p_ideal = (moles * cls.R_ATM_L * temperature_k) / current_volume_liters
        # P_vdw = nRT / (V - nb) - a*n^2 / V^2
        p_vdw = ((moles * cls.R_ATM_L * temperature_k) / (current_volume_liters - nb)) - (a * math.pow(moles, 2) / math.pow(current_volume_liters, 2))

        # Compressibility factor Z = P_vdw * V / (n * R * T)
        z = (p_vdw * current_volume_liters) / (moles * cls.R_ATM_L * temperature_k)
        dev_pct = ((p_vdw - p_ideal) / p_ideal) * 100.0

        if abs(z - 1.0) < 0.02:
            regime = "Ideal-like gas regime (Z ≈ 1.0)"
        elif z < 1.0:
            regime = "Intermolecular attraction dominated (Z < 1.0, lower pressure than ideal)"
        else:
            regime = "Excluded volume repulsion dominated (Z > 1.0, higher pressure than ideal)"

        # Generate isotherm curve points
        isotherm: List[VanDerWaalsPoint] = []
        safe_min = max(min_volume_liters, nb * 1.05)
        dv = (max_volume_liters - safe_min) / max(1, steps)

        for i in range(steps + 1):
            vol = safe_min + i * dv
            p_id = (moles * cls.R_ATM_L * temperature_k) / vol
            p_vd = ((moles * cls.R_ATM_L * temperature_k) / (vol - nb)) - (a * math.pow(moles, 2) / math.pow(vol, 2))
            pt_z = (p_vd * vol) / (moles * cls.R_ATM_L * temperature_k)
            isotherm.append(
                VanDerWaalsPoint(
                    volume_liters=round(vol, 3),
                    pressure_ideal_atm=round(p_id, 3),
                    pressure_vdw_atm=round(max(0.0, p_vd), 3),
                    compressibility_z=round(pt_z, 4),
                )
            )

        notes = (
            f"Van der Waals parameters for {gas.name}: a = {a:.4f} L²·atm/mol² (attraction), "
            f"b = {b:.4f} L/mol (molecular co-volume). Compressibility Z = {z:.4f}."
        )

        return VanDerWaalsResult(
            gas_id=gas.id,
            gas_name=gas.name,
            moles=moles,
            temperature_k=temperature_k,
            vdw_a_l2_atm_mol2=a,
            vdw_b_l_mol=b,
            p_ideal_atm=round(p_ideal, 3),
            p_vdw_atm=round(p_vdw, 3),
            compressibility_z=round(z, 4),
            deviation_percent=round(dev_pct, 2),
            regime=regime,
            isotherm_points=isotherm,
            notes=notes,
        )

    @classmethod
    def calculate_maxwell_boltzmann(
        cls,
        gas_name: str,
        molar_mass_g_mol: float,
        temperature_k: float,
        max_speed_m_s: float = 2000.0,
        steps: int = 50,
    ) -> MaxwellBoltzmannResult:
        """Calculate Maxwell-Boltzmann molecular speed distribution and characteristic velocities."""
        if molar_mass_g_mol <= 0 or temperature_k <= 0:
            raise ValueError("Molar mass and temperature must be strictly positive")

        m_kg = molar_mass_g_mol / 1000.0  # kg / mol

        # v_mp = sqrt(2RT/M)
        v_mp = math.sqrt((2.0 * cls.R_SI * temperature_k) / m_kg)
        # v_avg = sqrt(8RT / (pi * M))
        v_avg = math.sqrt((8.0 * cls.R_SI * temperature_k) / (math.pi * m_kg))
        # v_rms = sqrt(3RT / M)
        v_rms = math.sqrt((3.0 * cls.R_SI * temperature_k) / m_kg)

        mean_ke = 1.5 * cls.K_BOLTZMANN * temperature_k

        # Distribution points: f(v) = 4*pi*(M/(2*pi*R*T))^(3/2) * v^2 * exp(-M*v^2/(2*R*T))
        prefactor = 4.0 * math.pi * math.pow(m_kg / (2.0 * math.pi * cls.R_SI * temperature_k), 1.5)
        dv = max_speed_m_s / max(1, steps)
        points: List[SpeedDistributionPoint] = []

        for i in range(steps + 1):
            v = i * dv
            exponent = -(m_kg * math.pow(v, 2)) / (2.0 * cls.R_SI * temperature_k)
            prob = prefactor * math.pow(v, 2) * math.exp(exponent) if exponent > -700 else 0.0
            points.append(
                SpeedDistributionPoint(
                    speed_m_s=round(v, 1),
                    probability_density=round(prob, 8),
                )
            )

        return MaxwellBoltzmannResult(
            gas_name=gas_name,
            molar_mass_g_mol=molar_mass_g_mol,
            temperature_k=temperature_k,
            v_mp_m_s=round(v_mp, 1),
            v_avg_m_s=round(v_avg, 1),
            v_rms_m_s=round(v_rms, 1),
            mean_kinetic_energy_j=mean_ke,
            distribution_points=points,
        )

    @classmethod
    def get_phase_equilibrium(cls, substance_id: str) -> PhaseEquilibriumResult:
        """Calculate Clausius-Clapeyron vapor pressure progression and thermodynamic phase points."""
        sub = cls.PHASE_DATA.get(substance_id.lower())
        if not sub:
            sub = cls.PHASE_DATA["water"]

        tb_k = sub["t_boil_c"] + 273.15
        dh_j = sub["dh_vap_kj_mol"] * 1000.0

        # Generate vapor pressure curve from melting point to critical point (or 0 C to 150 C)
        curve: List[VaporPressurePoint] = []
        for tc in range(0, 155, 5):
            tk = tc + 273.15
            # Clausius-Clapeyron: ln(P/P0) = -DH_vap/R * (1/T - 1/Tb)
            delta_inv_t = (1.0 / tk) - (1.0 / tb_k)
            # P in atm (where P0 at normal boiling point = 1.0 atm = 101.325 kPa)
            p_atm = math.exp(-dh_j / cls.R_SI * delta_inv_t)
            p_kpa = p_atm * 101.325
            curve.append(
                VaporPressurePoint(
                    temperature_c=float(tc),
                    temperature_k=round(tk, 2),
                    vapor_pressure_kpa=round(p_kpa, 2),
                    vapor_pressure_atm=round(p_atm, 4),
                )
            )

        return PhaseEquilibriumResult(
            substance_name=sub["name"],
            formula=sub["formula"],
            normal_boiling_point_c=sub["t_boil_c"],
            delta_h_vap_kj_mol=sub["dh_vap_kj_mol"],
            normal_melting_point_c=sub.get("t_melt_c"),
            triple_point_t_c=sub.get("triple_t_c"),
            triple_point_p_kpa=sub.get("triple_p_kpa"),
            critical_point_t_c=sub.get("critical_t_c"),
            critical_point_p_mpa=sub.get("critical_p_mpa"),
            vapor_pressure_curve=curve,
        )
