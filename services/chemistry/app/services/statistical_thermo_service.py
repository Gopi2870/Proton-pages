"""Statistical Thermodynamics & Molecular Partition Functions Engine (PR #043)."""

import math
from typing import Dict, List, Optional, Tuple
from app.models.statistical_thermo import (
    MoleculeSpec,
    PartitionFunctionsBreakdown,
    HeatCapacityDecomposition,
    ThermodynamicState,
    TemperatureCurvePoint,
)
from app.schemas.statistical_thermo import (
    MoleculeSummary,
    PartitionFunctionCalculationRequest,
    PartitionFunctionCalculationResponse,
    TemperatureSweepRequest,
    TemperatureSweepResponse,
)

# Fundamental Physical Constants (CODATA 2018 / IUPAC)
KB = 1.380649e-23  # Boltzmann constant [J / K]
PLANCK_H = 6.62607015e-34  # Planck constant [J s]
H_BAR = PLANCK_H / (2.0 * math.pi)
AVOGADRO_NA = 6.02214076e23  # Avogadro constant [mol^-1]
R_GAS = AVOGADRO_NA * KB  # Universal gas constant [J / (mol K)] ~ 8.314462618
SPEED_OF_LIGHT_CM_S = 2.99792458e10  # Speed of light [cm / s]
HC_OVER_KB = (PLANCK_H * SPEED_OF_LIGHT_CM_S) / KB  # hc / k_B ~ 1.4387769 [K cm]

# Curated Molecular Data Library
CURATED_MOLECULES: Dict[str, MoleculeSpec] = {
    "ar": MoleculeSpec(
        id="ar",
        name="Argon",
        formula="Ar",
        molar_mass_g_mol=39.948,
        geometry="monatomic",
        symmetry_number=1,
        rotational_constants_cm1=[],
        rotational_temperatures_k=[],
        vibrational_frequencies_cm1=[],
        electronic_degeneracy=1,
    ),
    "he": MoleculeSpec(
        id="he",
        name="Helium",
        formula="He",
        molar_mass_g_mol=4.0026,
        geometry="monatomic",
        symmetry_number=1,
        rotational_constants_cm1=[],
        rotational_temperatures_k=[],
        vibrational_frequencies_cm1=[],
        electronic_degeneracy=1,
    ),
    "n2": MoleculeSpec(
        id="n2",
        name="Dinitrogen",
        formula="N2",
        molar_mass_g_mol=28.0134,
        geometry="linear",
        symmetry_number=2,
        rotational_constants_cm1=[1.99824],
        rotational_temperatures_k=[1.99824 * HC_OVER_KB],
        vibrational_frequencies_cm1=[2358.6],
        electronic_degeneracy=1,
    ),
    "co": MoleculeSpec(
        id="co",
        name="Carbon Monoxide",
        formula="CO",
        molar_mass_g_mol=28.0101,
        geometry="linear",
        symmetry_number=1,
        rotational_constants_cm1=[1.9225],
        rotational_temperatures_k=[1.9225 * HC_OVER_KB],
        vibrational_frequencies_cm1=[2143.2],
        electronic_degeneracy=1,
    ),
    "o2": MoleculeSpec(
        id="o2",
        name="Dioxygen",
        formula="O2",
        molar_mass_g_mol=31.9988,
        geometry="linear",
        symmetry_number=2,
        rotational_constants_cm1=[1.4377],
        rotational_temperatures_k=[1.4377 * HC_OVER_KB],
        vibrational_frequencies_cm1=[1556.4],
        electronic_degeneracy=3,  # Triplet ground state 3Sigma_g^-
    ),
    "hcl": MoleculeSpec(
        id="hcl",
        name="Hydrogen Chloride",
        formula="HCl",
        molar_mass_g_mol=36.461,
        geometry="linear",
        symmetry_number=1,
        rotational_constants_cm1=[10.5934],
        rotational_temperatures_k=[10.5934 * HC_OVER_KB],
        vibrational_frequencies_cm1=[2885.9],
        electronic_degeneracy=1,
    ),
    "co2": MoleculeSpec(
        id="co2",
        name="Carbon Dioxide",
        formula="CO2",
        molar_mass_g_mol=44.0095,
        geometry="linear",
        symmetry_number=2,
        rotational_constants_cm1=[0.3902],
        rotational_temperatures_k=[0.3902 * HC_OVER_KB],
        # 4 vibrational modes: sym stretch (1333), degenerate bend (667.4 x 2), asym stretch (2349.2)
        vibrational_frequencies_cm1=[1333.0, 667.4, 667.4, 2349.2],
        electronic_degeneracy=1,
    ),
    "h2o": MoleculeSpec(
        id="h2o",
        name="Water Vapor",
        formula="H2O",
        molar_mass_g_mol=18.0153,
        geometry="non_linear",
        symmetry_number=2,
        rotational_constants_cm1=[27.877, 14.512, 9.285],
        rotational_temperatures_k=[
            27.877 * HC_OVER_KB,
            14.512 * HC_OVER_KB,
            9.285 * HC_OVER_KB,
        ],
        vibrational_frequencies_cm1=[3657.0, 1595.0, 3756.0],
        electronic_degeneracy=1,
    ),
    "ch4": MoleculeSpec(
        id="ch4",
        name="Methane",
        formula="CH4",
        molar_mass_g_mol=16.0425,
        geometry="non_linear",
        symmetry_number=12,
        rotational_constants_cm1=[5.2412, 5.2412, 5.2412],
        rotational_temperatures_k=[
            5.2412 * HC_OVER_KB,
            5.2412 * HC_OVER_KB,
            5.2412 * HC_OVER_KB,
        ],
        vibrational_frequencies_cm1=[
            2917.0,
            1534.0,
            1534.0,
            3019.0,
            3019.0,
            3019.0,
            1306.0,
            1306.0,
            1306.0,
        ],
        electronic_degeneracy=1,
    ),
}


class StatisticalThermoEngine:
    """Scientific evaluation engine for molecular partition functions and thermodynamic state properties."""

    @classmethod
    def get_molecules(cls) -> List[MoleculeSummary]:
        summaries: List[MoleculeSummary] = []
        for mol in CURATED_MOLECULES.values():
            rot_str = (
                ", ".join(f"{b:.2f} cm⁻¹" for b in mol.rotational_constants_cm1)
                if mol.rotational_constants_cm1
                else "N/A (monatomic)"
            )
            summaries.append(
                MoleculeSummary(
                    id=mol.id,
                    name=mol.name,
                    formula=mol.formula,
                    geometry=mol.geometry,
                    molar_mass_g_mol=mol.molar_mass_g_mol,
                    symmetry_number=mol.symmetry_number,
                    vibrational_modes_count=len(mol.vibrational_frequencies_cm1),
                    rotational_constants_display=rot_str,
                )
            )
        return summaries

    @classmethod
    def get_molecule(cls, molecule_id: str) -> Optional[MoleculeSpec]:
        return CURATED_MOLECULES.get(molecule_id)

    @classmethod
    def calculate_thermal_wavelength(cls, mass_kg: float, temp_k: float) -> float:
        """Computes thermal de Broglie wavelength Lambda = h / sqrt(2 * pi * m * k_B * T) in meters."""
        return PLANCK_H / math.sqrt(2.0 * math.pi * mass_kg * KB * temp_k)

    @classmethod
    def compute_partition_functions(
        cls, spec: MoleculeSpec, temp_k: float, pressure_pa: float
    ) -> PartitionFunctionsBreakdown:
        """Evaluates translational, rotational, vibrational, and electronic partition functions."""
        # Single molecule mass in kg
        mass_kg = (spec.molar_mass_g_mol * 1e-3) / AVOGADRO_NA

        # 1. Translational partition function: q_trans = (V / Lambda^3) where V = k_B * T / P
        lambda_m = cls.calculate_thermal_wavelength(mass_kg, temp_k)
        vol_per_molecule_m3 = (KB * temp_k) / pressure_pa
        q_trans = vol_per_molecule_m3 / (lambda_m**3)

        # 2. Rotational partition function
        if spec.geometry == "monatomic":
            q_rot = 1.0
        elif spec.geometry == "linear":
            theta_rot = (
                spec.rotational_temperatures_k[0]
                if spec.rotational_temperatures_k
                else spec.rotational_constants_cm1[0] * HC_OVER_KB
            )
            # High-T approximation with symmetry number: q_rot = T / (sigma * theta_rot)
            # Add Wigner-Kirkwood first quantum correction for low T: (1 + theta_rot / (3 * T))
            if temp_k > 0:
                q_rot = (temp_k / (spec.symmetry_number * theta_rot)) * (
                    1.0 + theta_rot / (3.0 * temp_k)
                )
            else:
                q_rot = 1.0
        else:  # non_linear
            thetas = spec.rotational_temperatures_k
            if not thetas and spec.rotational_constants_cm1:
                thetas = [b * HC_OVER_KB for b in spec.rotational_constants_cm1]
            if len(thetas) >= 3:
                prod_thetas = thetas[0] * thetas[1] * thetas[2]
                q_rot = (math.sqrt(math.pi) / spec.symmetry_number) * math.sqrt(
                    (temp_k**3) / prod_thetas
                )
            else:
                q_rot = 1.0

        # 3. Vibrational partition function (harmonic oscillator, zero-point energy referenced)
        q_vib = 1.0
        for nu in spec.vibrational_frequencies_cm1:
            theta_vib = nu * HC_OVER_KB
            x = theta_vib / temp_k
            if x < 100.0:
                q_vib *= 1.0 / (1.0 - math.exp(-x))
            # for very large x, 1 / (1 - exp(-x)) -> 1.0

        # 4. Electronic partition function
        q_elec = float(spec.electronic_degeneracy)
        if spec.spin_orbit_split_k and spec.spin_orbit_degeneracy:
            x_so = spec.spin_orbit_split_k / temp_k
            if x_so < 100.0:
                q_elec += spec.spin_orbit_degeneracy * math.exp(-x_so)

        q_total = q_trans * q_rot * q_vib * q_elec

        return PartitionFunctionsBreakdown(
            q_trans=q_trans,
            q_rot=q_rot,
            q_vib=q_vib,
            q_elec=q_elec,
            q_total=q_total,
            thermal_wavelength_pm=lambda_m * 1e12,
        )

    @classmethod
    def compute_heat_capacity_decomposition(
        cls, spec: MoleculeSpec, temp_k: float
    ) -> HeatCapacityDecomposition:
        """Computes molar heat capacity breakdown Cv (J / mol K) from degrees of freedom."""
        # Translation: 3/2 R
        cv_trans = 1.5 * R_GAS

        # Rotation: R for linear, 3/2 R for non-linear
        if spec.geometry == "monatomic":
            cv_rot = 0.0
            eq_rot = 0.0
        elif spec.geometry == "linear":
            cv_rot = 1.0 * R_GAS
            eq_rot = 1.0 * R_GAS
        else:
            cv_rot = 1.5 * R_GAS
            eq_rot = 1.5 * R_GAS

        # Vibration: Einstein harmonic oscillator heat capacity function
        cv_vib = 0.0
        eq_vib = float(len(spec.vibrational_frequencies_cm1)) * R_GAS
        for nu in spec.vibrational_frequencies_cm1:
            theta_vib = nu * HC_OVER_KB
            x = theta_vib / temp_k
            if x < 80.0:
                ex = math.exp(x)
                term = (x**2) * ex / ((ex - 1.0) ** 2)
                cv_vib += R_GAS * term

        # Electronic heat capacity (usually zero unless low-lying spin-orbit state exists)
        cv_elec = 0.0
        if spec.spin_orbit_split_k and spec.spin_orbit_degeneracy:
            x_so = spec.spin_orbit_split_k / temp_k
            g0 = spec.electronic_degeneracy
            g1 = spec.spin_orbit_degeneracy
            if x_so < 50.0:
                ex = math.exp(-x_so)
                denom = (g0 + g1 * ex) ** 2
                cv_elec = R_GAS * (x_so**2) * g0 * g1 * ex / denom

        cv_total = cv_trans + cv_rot + cv_vib + cv_elec
        cp_total = cv_total + R_GAS  # Cp = Cv + R for ideal gas
        equipartition_cv_limit = cv_trans + eq_rot + eq_vib

        return HeatCapacityDecomposition(
            cv_trans=round(cv_trans, 4),
            cv_rot=round(cv_rot, 4),
            cv_vib=round(cv_vib, 4),
            cv_elec=round(cv_elec, 4),
            cv_total=round(cv_total, 4),
            cp_total=round(cp_total, 4),
            equipartition_cv_limit=round(equipartition_cv_limit, 4),
        )

    @classmethod
    def compute_thermodynamic_state(
        cls,
        spec: MoleculeSpec,
        temp_k: float,
        pressure_pa: float,
        pf: PartitionFunctionsBreakdown,
        cv_decomp: HeatCapacityDecomposition,
    ) -> ThermodynamicState:
        """Derives macroscopic state functions (U, H, S, A, G) using canonical ensemble formulas."""
        # 1. Thermal internal energy: U_thermal = U(T) - U(0)
        u_trans = 1.5 * R_GAS * temp_k
        if spec.geometry == "monatomic":
            u_rot = 0.0
        elif spec.geometry == "linear":
            u_rot = 1.0 * R_GAS * temp_k
        else:
            u_rot = 1.5 * R_GAS * temp_k

        u_vib = 0.0
        zpe = 0.0
        for nu in spec.vibrational_frequencies_cm1:
            theta_vib = nu * HC_OVER_KB
            zpe += 0.5 * R_GAS * theta_vib
            x = theta_vib / temp_k
            if x < 80.0:
                u_vib += R_GAS * theta_vib / (math.exp(x) - 1.0)

        u_elec = 0.0
        if spec.spin_orbit_split_k and spec.spin_orbit_degeneracy:
            x_so = spec.spin_orbit_split_k / temp_k
            if x_so < 50.0:
                g0 = spec.electronic_degeneracy
                g1 = spec.spin_orbit_degeneracy
                u_elec = (
                    R_GAS
                    * spec.spin_orbit_split_k
                    * (g1 * math.exp(-x_so))
                    / (g0 + g1 * math.exp(-x_so))
                )

        u_thermal = u_trans + u_rot + u_vib + u_elec
        h_thermal = u_thermal + R_GAS * temp_k  # H = U + PV = U + RT

        # 2. Absolute standard molar entropy S° (Sackur-Tetrode + Rot + Vib + Elec)
        # S_trans = R * [ln(q_trans) + 5/2] where q_trans is evaluated for standard molecule volume
        s_trans = R_GAS * (math.log(pf.q_trans) + 2.5)

        if spec.geometry == "monatomic":
            s_rot = 0.0
        elif spec.geometry == "linear":
            s_rot = R_GAS * (math.log(pf.q_rot) + 1.0)
        else:
            s_rot = R_GAS * (math.log(pf.q_rot) + 1.5)

        s_vib = 0.0
        for nu in spec.vibrational_frequencies_cm1:
            theta_vib = nu * HC_OVER_KB
            x = theta_vib / temp_k
            if x < 80.0:
                ex = math.exp(x)
                s_vib += R_GAS * (x / (ex - 1.0) - math.log(1.0 - math.exp(-x)))

        s_elec = R_GAS * math.log(pf.q_elec)
        s_total = s_trans + s_rot + s_vib + s_elec

        # 3. Helmholtz and Gibbs Free Energies
        # A = U - TS
        a_free = u_thermal - temp_k * s_total
        # Thermal Gibbs energy G - H(0) = H_thermal - TS
        g_thermal = h_thermal - temp_k * s_total

        return ThermodynamicState(
            temperature_k=temp_k,
            pressure_pa=pressure_pa,
            internal_energy_thermal_j_mol=round(u_thermal, 2),
            zero_point_energy_j_mol=round(zpe, 2),
            enthalpy_thermal_j_mol=round(h_thermal, 2),
            entropy_standard_j_mol_k=round(s_total, 3),
            helmholtz_free_energy_j_mol=round(a_free, 2),
            gibbs_free_energy_thermal_j_mol=round(g_thermal, 2),
            heat_capacity_cv_j_mol_k=cv_decomp.cv_total,
            heat_capacity_cp_j_mol_k=cv_decomp.cp_total,
        )

    @classmethod
    def calculate(
        cls, request: PartitionFunctionCalculationRequest
    ) -> PartitionFunctionCalculationResponse:
        """Performs full statistical thermodynamic calculation for requested molecule and state."""
        if request.molecule_id and request.molecule_id in CURATED_MOLECULES:
            spec = CURATED_MOLECULES[request.molecule_id]
        elif request.custom_spec:
            if isinstance(request.custom_spec, dict):
                spec = MoleculeSpec(**request.custom_spec)
            else:
                spec = request.custom_spec
        else:
            raise ValueError("Must provide a valid molecule_id or custom_spec.")

        if request.temperature_k <= 0.0:
            raise ValueError(f"Temperature must be positive (got {request.temperature_k} K).")
        if request.pressure_pa <= 0.0:
            raise ValueError(f"Pressure must be positive (got {request.pressure_pa} Pa).")

        pf = cls.compute_partition_functions(spec, request.temperature_k, request.pressure_pa)
        cv = cls.compute_heat_capacity_decomposition(spec, request.temperature_k)
        state = cls.compute_thermodynamic_state(
            spec, request.temperature_k, request.pressure_pa, pf, cv
        )

        ratio_equipartition = (
            cv.cv_total / cv.equipartition_cv_limit if cv.equipartition_cv_limit > 0 else 1.0
        )

        summary_mol = MoleculeSummary(
            id=spec.id,
            name=spec.name,
            formula=spec.formula,
            geometry=spec.geometry,
            molar_mass_g_mol=spec.molar_mass_g_mol,
            symmetry_number=spec.symmetry_number,
            vibrational_modes_count=len(spec.vibrational_frequencies_cm1),
            rotational_constants_display=(
                ", ".join(f"{b:.2f} cm⁻¹" for b in spec.rotational_constants_cm1)
                if spec.rotational_constants_cm1
                else "N/A"
            ),
        )

        pedagogy = (
            f"Evaluated canonical molecular partition functions for {spec.name} ({spec.formula}) at "
            f"T = {request.temperature_k} K and P = {request.pressure_pa/1000.0:.1f} kPa. "
            f"Translational states dominate at q_trans = {pf.q_trans:.2e} (Lambda = {pf.thermal_wavelength_pm:.2f} pm). "
            f"Molar heat capacity Cv = {cv.cv_total:.2f} J/(mol K) achieves {ratio_equipartition*100.0:.1f}% "
            f"of the classical equipartition ceiling ({cv.equipartition_cv_limit:.2f} J/(mol K))."
        )

        return PartitionFunctionCalculationResponse(
            molecule=summary_mol,
            temperature_k=request.temperature_k,
            pressure_pa=request.pressure_pa,
            partition_functions=pf,
            thermodynamic_state=state,
            heat_capacity=cv,
            classical_equipartition_ratio=round(ratio_equipartition, 4),
            pedagogical_summary=pedagogy,
        )

    @classmethod
    def temperature_sweep(cls, request: TemperatureSweepRequest) -> TemperatureSweepResponse:
        """Computes heat capacity and entropy temperature dependence to show vibrational freeze-out."""
        spec = CURATED_MOLECULES.get(request.molecule_id)
        if not spec:
            raise ValueError(f"Molecule '{request.molecule_id}' not found in catalog.")

        if request.temp_min_k <= 0.0 or request.temp_max_k <= request.temp_min_k:
            raise ValueError("Invalid temperature sweep bounds.")

        t_min = request.temp_min_k
        t_max = request.temp_max_k
        n_pts = request.points_count
        step = (t_max - t_min) / (n_pts - 1)

        curve: List[TemperatureCurvePoint] = []
        for i in range(n_pts):
            t_val = t_min + i * step
            pf = cls.compute_partition_functions(spec, t_val, request.pressure_pa)
            cv = cls.compute_heat_capacity_decomposition(spec, t_val)
            state = cls.compute_thermodynamic_state(spec, t_val, request.pressure_pa, pf, cv)

            frac_eq = (
                cv.cv_total / cv.equipartition_cv_limit if cv.equipartition_cv_limit > 0 else 1.0
            )

            curve.append(
                TemperatureCurvePoint(
                    temperature_k=round(t_val, 2),
                    q_total=pf.q_total,
                    entropy_j_mol_k=state.entropy_standard_j_mol_k,
                    cv_j_mol_k=cv.cv_total,
                    cp_j_mol_k=cv.cp_total,
                    internal_energy_j_mol=state.internal_energy_thermal_j_mol,
                    fraction_equipartition=round(frac_eq, 4),
                )
            )

        vib_thetas = [nu * HC_OVER_KB for nu in spec.vibrational_frequencies_cm1]
        rot_thetas = spec.rotational_temperatures_k or [
            b * HC_OVER_KB for b in spec.rotational_constants_cm1
        ]
        eq_limit = curve[0].cv_j_mol_k
        if curve:
            eq_limit = cls.compute_heat_capacity_decomposition(
                spec, t_max
            ).equipartition_cv_limit

        analysis = (
            f"Temperature evolution of {spec.name} from {t_min:.1f} K to {t_max:.1f} K demonstrates "
            f"quantum vibrational freeze-out. At cryogenic temperatures (T << Theta_vib), vibrational modes "
            f"remain unexcited and Cv is locked to the translational/rotational plateau. As T exceeds characteristic "
            f"vibrational temperatures ({', '.join(f'{th:.0f} K' for th in vib_thetas[:3])}), "
            f"Cv asymptotically approaches the full equipartition limit ({eq_limit:.2f} J/(mol K))."
        )

        return TemperatureSweepResponse(
            molecule_id=spec.id,
            molecule_name=spec.name,
            geometry=spec.geometry,
            equipartition_cv_limit=round(eq_limit, 4),
            vibrational_temperatures_k=[round(th, 2) for th in vib_thetas],
            rotational_temperatures_k=[round(th, 2) for th in rot_thetas],
            curve=curve,
            analysis=analysis,
        )
