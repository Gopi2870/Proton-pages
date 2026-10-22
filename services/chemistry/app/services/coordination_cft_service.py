"""Scientific calculation engine for Coordination Chemistry & Crystal Field Theory (CFT)."""

import math
from typing import Dict, List, Optional, Tuple
from app.models.coordination_cft import (
    TransitionMetalIon,
    Ligand,
    OrbitalLevel,
    CoordinationComplex,
)
from app.schemas.coordination_cft import (
    MetalIonSummary,
    LigandSummary,
    OrbitalLevelSchema,
    CoordinationAnalysisRequest,
    CoordinationAnalysisResponse,
    ComplexPresetSummary,
)

CM_INV_TO_KJ_MOL = 0.0119626

# Transition metal database
METALS: Dict[str, Dict[int, TransitionMetalIon]] = {
    "Ti": {
        3: TransitionMetalIon(symbol="Ti", name="Titanium(III)", atomic_number=22, group=4, period=4, oxidation_state=3, d_electron_count=1),
    },
    "V": {
        3: TransitionMetalIon(symbol="V", name="Vanadium(III)", atomic_number=23, group=5, period=4, oxidation_state=3, d_electron_count=2),
    },
    "Cr": {
        2: TransitionMetalIon(symbol="Cr", name="Chromium(II)", atomic_number=24, group=6, period=4, oxidation_state=2, d_electron_count=4),
        3: TransitionMetalIon(symbol="Cr", name="Chromium(III)", atomic_number=24, group=6, period=4, oxidation_state=3, d_electron_count=3),
    },
    "Mn": {
        2: TransitionMetalIon(symbol="Mn", name="Manganese(II)", atomic_number=25, group=7, period=4, oxidation_state=2, d_electron_count=5),
        3: TransitionMetalIon(symbol="Mn", name="Manganese(III)", atomic_number=25, group=7, period=4, oxidation_state=3, d_electron_count=4),
    },
    "Fe": {
        2: TransitionMetalIon(symbol="Fe", name="Iron(II)", atomic_number=26, group=8, period=4, oxidation_state=2, d_electron_count=6),
        3: TransitionMetalIon(symbol="Fe", name="Iron(III)", atomic_number=26, group=8, period=4, oxidation_state=3, d_electron_count=5),
    },
    "Co": {
        2: TransitionMetalIon(symbol="Co", name="Cobalt(II)", atomic_number=27, group=9, period=4, oxidation_state=2, d_electron_count=7),
        3: TransitionMetalIon(symbol="Co", name="Cobalt(III)", atomic_number=27, group=9, period=4, oxidation_state=3, d_electron_count=6),
    },
    "Ni": {
        2: TransitionMetalIon(symbol="Ni", name="Nickel(II)", atomic_number=28, group=10, period=4, oxidation_state=2, d_electron_count=8),
    },
    "Cu": {
        2: TransitionMetalIon(symbol="Cu", name="Copper(II)", atomic_number=29, group=11, period=4, oxidation_state=2, d_electron_count=9),
    },
    "Zn": {
        2: TransitionMetalIon(symbol="Zn", name="Zinc(II)", atomic_number=30, group=12, period=4, oxidation_state=2, d_electron_count=10),
    },
    "Pt": {
        2: TransitionMetalIon(symbol="Pt", name="Platinum(II)", atomic_number=78, group=10, period=6, oxidation_state=2, d_electron_count=8),
    },
}

# Jørgensen metal g parameters (x 1000 cm^-1) and pairing energy P (cm^-1)
METAL_PHYSICS: Dict[Tuple[str, int], Tuple[float, float]] = {
    ("Ti", 3): (17.5, 18000.0),
    ("V", 3): (18.0, 19000.0),
    ("Cr", 2): (14.0, 20400.0),
    ("Cr", 3): (17.4, 21500.0),
    ("Mn", 2): (8.0, 25500.0),
    ("Mn", 3): (19.0, 28000.0),
    ("Fe", 2): (10.4, 17600.0),
    ("Fe", 3): (14.0, 30000.0),
    ("Co", 2): (9.0, 22500.0),
    ("Co", 3): (18.2, 21000.0),
    ("Ni", 2): (8.5, 19500.0),
    ("Cu", 2): (12.0, 20000.0),
    ("Zn", 2): (5.0, 20000.0),
    ("Pt", 2): (32.0, 15000.0),
}

# Spectrochemical Ligand Series
LIGANDS: Dict[str, Ligand] = {
    "i": Ligand(id="i", formula="I-", name="Iodide", donor_atom="I", spectrochemical_rank=1, field_strength="weak_field", f_factor=0.78),
    "br": Ligand(id="br", formula="Br-", name="Bromide", donor_atom="Br", spectrochemical_rank=2, field_strength="weak_field", f_factor=0.81),
    "cl": Ligand(id="cl", formula="Cl-", name="Chloride", donor_atom="Cl", spectrochemical_rank=3, field_strength="weak_field", f_factor=0.86),
    "f": Ligand(id="f", formula="F-", name="Fluoride", donor_atom="F", spectrochemical_rank=4, field_strength="weak_field", f_factor=0.90),
    "oh": Ligand(id="oh", formula="OH-", name="Hydroxide", donor_atom="O", spectrochemical_rank=5, field_strength="weak_field", f_factor=0.92),
    "h2o": Ligand(id="h2o", formula="H2O", name="Water (Aqua)", donor_atom="O", spectrochemical_rank=6, field_strength="intermediate", f_factor=1.00),
    "nh3": Ligand(id="nh3", formula="NH3", name="Ammine", donor_atom="N", spectrochemical_rank=7, field_strength="intermediate", f_factor=1.25),
    "en": Ligand(id="en", formula="en", name="Ethylenediamine", denticity=2, donor_atom="N", spectrochemical_rank=8, field_strength="strong_field", f_factor=1.28),
    "no2": Ligand(id="no2", formula="NO2-", name="Nitro", donor_atom="N", spectrochemical_rank=9, field_strength="strong_field", f_factor=1.40),
    "cn": Ligand(id="cn", formula="CN-", name="Cyanide", donor_atom="C", spectrochemical_rank=10, field_strength="strong_field", f_factor=1.70),
    "co": Ligand(id="co", formula="CO", name="Carbon Monoxide (Carbonyl)", donor_atom="C", spectrochemical_rank=11, field_strength="strong_field", f_factor=1.90),
}

PRESET_COMPLEXES: List[ComplexPresetSummary] = [
    ComplexPresetSummary(
        id="fe_cn6_4",
        formula="[Fe(CN)6]4-",
        name="Hexacyanoferrate(II)",
        geometry="octahedral",
        spin_state="low_spin",
        d_electron_count=6,
        unpaired_electrons=0,
        perceived_color_hex="#EAB308",
        description="Classic low-spin diamagnetic complex with high CFSE (-2.4 Δo). Pale yellow appearance.",
    ),
    ComplexPresetSummary(
        id="fe_h2o6_2",
        formula="[Fe(H2O)6]2+",
        name="Hexaaquairon(II)",
        geometry="octahedral",
        spin_state="high_spin",
        d_electron_count=6,
        unpaired_electrons=4,
        perceived_color_hex="#86EFAC",
        description="High-spin paramagnetic complex with weak aqua ligand field. Pale green appearance.",
    ),
    ComplexPresetSummary(
        id="co_nh36_3",
        formula="[Co(NH3)6]3+",
        name="Hexaamminecobalt(III)",
        geometry="octahedral",
        spin_state="low_spin",
        d_electron_count=6,
        unpaired_electrons=0,
        perceived_color_hex="#F97316",
        description="Diamagnetic t2g6 complex with large Δo (~22,900 cm^-1). Distinct orange color.",
    ),
    ComplexPresetSummary(
        id="cu_h2o6_2",
        formula="[Cu(H2O)6]2+",
        name="Hexaaquacopper(II)",
        geometry="octahedral",
        spin_state="not_applicable",
        d_electron_count=9,
        unpaired_electrons=1,
        perceived_color_hex="#38BDF8",
        description="Undergoes prominent Jahn-Teller tetragonal z-out elongation (2 long axial Cu-O bonds). Bright cyan blue.",
    ),
    ComplexPresetSummary(
        id="ni_cl4_2",
        formula="[NiCl4]2-",
        name="Tetrachloronickelate(II)",
        geometry="tetrahedral",
        spin_state="high_spin",
        d_electron_count=8,
        unpaired_electrons=2,
        perceived_color_hex="#3B82F6",
        description="Tetrahedral geometry with inverse e4 t24 splitting. Deep blue paramagnetic.",
    ),
    ComplexPresetSummary(
        id="pt_nh32_cl2",
        formula="[Pt(NH3)2Cl2]",
        name="Cisplatin (Square Planar)",
        geometry="square_planar",
        spin_state="low_spin",
        d_electron_count=8,
        unpaired_electrons=0,
        perceived_color_hex="#FDE047",
        description="D4h square planar chemotherapy agent. d8 diamagnetic with empty dx2-y2 orbital.",
    ),
]


class CoordinationCftEngine:
    """Core mathematical engine for Crystal Field Theory (CFT)."""

    @classmethod
    def get_metal(cls, symbol: str, oxidation_state: int) -> TransitionMetalIon:
        metal_states = METALS.get(symbol)
        if not metal_states or oxidation_state not in metal_states:
            # Fallback to Fe(II)
            return METALS["Fe"][2]
        return metal_states[oxidation_state]

    @classmethod
    def get_ligand(cls, ligand_id: str) -> Ligand:
        return LIGANDS.get(ligand_id.lower(), LIGANDS["h2o"])

    @classmethod
    def calculate_splitting_energy(
        cls, metal: TransitionMetalIon, ligand: Ligand, geometry: str
    ) -> Tuple[float, float]:
        """Calculates crystal field splitting Delta (in cm^-1) and pairing energy P (in cm^-1)."""
        g_val, p_val = METAL_PHYSICS.get((metal.symbol, metal.oxidation_state), (10.0, 20000.0))
        delta_o = ligand.f_factor * g_val * 1000.0

        if geometry == "tetrahedral":
            delta = (4.0 / 9.0) * delta_o
        elif geometry == "square_planar":
            delta = 1.74 * delta_o
        else:
            delta = delta_o

        return delta, p_val

    @classmethod
    def determine_octahedral_filling(
        cls, d_count: int, delta_o: float, p_energy: float, forced_spin: Optional[str]
    ) -> Tuple[str, int, int, float, int]:
        """Determines t2g and eg filling, CFSE (in units of Delta_o), and unpaired electrons."""
        # Non-ambiguous configurations
        if d_count <= 3:
            n_t2g = d_count
            n_eg = 0
            unpaired = d_count
            cfse = -0.4 * n_t2g
            spin = "not_applicable"
            return spin, n_t2g, n_eg, cfse, unpaired

        if d_count >= 8:
            n_t2g = 6
            n_eg = d_count - 6
            unpaired = 2 if d_count == 8 else (1 if d_count == 9 else 0)
            cfse = -0.4 * n_t2g + 0.6 * n_eg
            spin = "not_applicable"
            return spin, n_t2g, n_eg, cfse, unpaired

        # Ambiguous configurations: d4, d5, d6, d7
        is_low_spin = (forced_spin == "low_spin") or (
            forced_spin is None and delta_o >= p_energy
        )

        if is_low_spin:
            spin = "low_spin"
            if d_count == 4:
                n_t2g, n_eg, unp, cfse = 4, 0, 2, -1.6
            elif d_count == 5:
                n_t2g, n_eg, unp, cfse = 5, 0, 1, -2.0
            elif d_count == 6:
                n_t2g, n_eg, unp, cfse = 6, 0, 0, -2.4
            else:  # d7
                n_t2g, n_eg, unp, cfse = 6, 1, 1, -1.8
        else:
            spin = "high_spin"
            if d_count == 4:
                n_t2g, n_eg, unp, cfse = 3, 1, 4, -0.6
            elif d_count == 5:
                n_t2g, n_eg, unp, cfse = 3, 2, 5, 0.0
            elif d_count == 6:
                n_t2g, n_eg, unp, cfse = 4, 2, 4, -0.4
            else:  # d7
                n_t2g, n_eg, unp, cfse = 5, 2, 3, -0.8

        return spin, n_t2g, n_eg, cfse, unp

    @classmethod
    def evaluate_jahn_teller(cls, d_count: int, geometry: str, spin: str) -> str:
        """Evaluates Jahn-Teller tetragonal distortion based on orbital degeneracy."""
        if geometry != "octahedral":
            return "none"

        # Strong Jahn-Teller occurs with asymmetric eg occupation
        if d_count == 9:
            return "strong_elongation"  # e.g. Cu(II) t2g6 eg3
        if d_count == 4 and spin == "high_spin":
            return "strong_elongation"  # Cr(II) t2g3 eg1
        if d_count == 7 and spin == "low_spin":
            return "strong_elongation"  # Co(II) LS t2g6 eg1

        # Weak Jahn-Teller occurs with asymmetric t2g occupation
        if d_count in [1, 2] or (d_count == 4 and spin == "low_spin") or (d_count == 5 and spin == "low_spin") or (d_count == 6 and spin == "high_spin"):
            return "weak_compression"

        return "none"

    @classmethod
    def calculate_optical_color(cls, delta_cm_inv: float) -> Tuple[Optional[float], str, str]:
        """Calculates absorption wavelength (nm) and complementary perceived color."""
        if delta_cm_inv <= 0:
            return None, "Colorless", "#F5F5F5"

        wavelength_nm = 1e7 / delta_cm_inv

        # Wavelength absorption to perceived complementary color
        if wavelength_nm < 380:
            return round(wavelength_nm, 1), "Colorless / Pale", "#FAF5F0"
        elif wavelength_nm <= 435:
            # Absorbs violet -> Yellow
            return round(wavelength_nm, 1), "Yellow", "#EAB308"
        elif wavelength_nm <= 480:
            # Absorbs blue -> Orange
            return round(wavelength_nm, 1), "Orange", "#F97316"
        elif wavelength_nm <= 500:
            # Absorbs blue-green -> Red-Orange
            return round(wavelength_nm, 1), "Red-Orange", "#EA580C"
        elif wavelength_nm <= 560:
            # Absorbs green -> Magenta / Purple
            return round(wavelength_nm, 1), "Purple / Magenta", "#9333EA"
        elif wavelength_nm <= 595:
            # Absorbs yellow -> Violet
            return round(wavelength_nm, 1), "Violet", "#7C3AED"
        elif wavelength_nm <= 650:
            # Absorbs orange -> Blue
            return round(wavelength_nm, 1), "Cyan / Blue", "#2563EB"
        elif wavelength_nm <= 750:
            # Absorbs red -> Green
            return round(wavelength_nm, 1), "Green", "#16A34A"
        else:
            # Near IR -> Pale sky blue
            return round(wavelength_nm, 1), "Pale Sky Blue", "#38BDF8"

    @classmethod
    def analyze_complex(cls, request: CoordinationAnalysisRequest) -> CoordinationAnalysisResponse:
        """Performs full crystal field theory analysis."""
        metal = cls.get_metal(request.metal_symbol, request.oxidation_state)
        ligand = cls.get_ligand(request.ligand_id)
        geom = request.geometry.lower()
        if geom not in ["octahedral", "tetrahedral", "square_planar"]:
            geom = "octahedral"

        delta, p_energy = cls.calculate_splitting_energy(metal, ligand, geom)
        d_count = metal.d_electron_count

        orbital_levels: List[OrbitalLevel] = []

        if geom == "octahedral":
            cn = 6
            spin, n_t2g, n_eg, cfse_units, unp = cls.determine_octahedral_filling(
                d_count, delta, p_energy, request.forced_spin_state
            )
            # t2g level
            t2g_unp = min(n_t2g, 6 - n_t2g) if n_t2g <= 3 else (6 - n_t2g)
            orbital_levels.append(
                OrbitalLevel(
                    label="t2g",
                    orbitals=["dxy", "dyz", "dxz"],
                    energy_delta=-0.4,
                    energy_cm_inv=round(-0.4 * delta, 1),
                    degeneracy=3,
                    electron_count=n_t2g,
                    unpaired_electrons=t2g_unp,
                )
            )
            # eg level
            eg_unp = n_eg if n_eg <= 2 else (4 - n_eg)
            orbital_levels.append(
                OrbitalLevel(
                    label="eg",
                    orbitals=["dz2", "dx2-y2"],
                    energy_delta=+0.6,
                    energy_cm_inv=round(+0.6 * delta, 1),
                    degeneracy=2,
                    electron_count=n_eg,
                    unpaired_electrons=eg_unp,
                )
            )
        elif geom == "tetrahedral":
            cn = 4
            spin = "high_spin"
            # In tetrahedral: e is -0.6 Delta_t (degeneracy 2), t2 is +0.4 Delta_t (degeneracy 3)
            # Fill e first (up to 2), then t2 (up to 3), then pair in e, then t2
            if d_count <= 2:
                n_e = d_count
                n_t2 = 0
            elif d_count <= 5:
                n_e = 2
                n_t2 = d_count - 2
            elif d_count <= 7:
                n_e = 2 + (d_count - 5)
                n_t2 = 3
            else:
                n_e = 4
                n_t2 = 3 + (d_count - 7)

            cfse_units = -0.6 * n_e + 0.4 * n_t2
            e_unp = n_e if n_e <= 2 else (4 - n_e)
            t2_unp = n_t2 if n_t2 <= 3 else (6 - n_t2)
            unp = e_unp + t2_unp

            orbital_levels.append(
                OrbitalLevel(
                    label="e",
                    orbitals=["dz2", "dx2-y2"],
                    energy_delta=-0.6,
                    energy_cm_inv=round(-0.6 * delta, 1),
                    degeneracy=2,
                    electron_count=n_e,
                    unpaired_electrons=e_unp,
                )
            )
            orbital_levels.append(
                OrbitalLevel(
                    label="t2",
                    orbitals=["dxy", "dyz", "dxz"],
                    energy_delta=+0.4,
                    energy_cm_inv=round(+0.4 * delta, 1),
                    degeneracy=3,
                    electron_count=n_t2,
                    unpaired_electrons=t2_unp,
                )
            )
        else:  # Square Planar (D4h)
            cn = 4
            spin = "low_spin"
            # 4 levels: (dxz, dyz) at -0.51, dz2 at -0.43, dxy at +0.23, dx2-y2 at +1.23
            n_rem = d_count
            n_xz_yz = min(4, n_rem)
            n_rem -= n_xz_yz
            n_z2 = min(2, n_rem)
            n_rem -= n_z2
            n_xy = min(2, n_rem)
            n_rem -= n_xy
            n_x2_y2 = min(2, n_rem)

            cfse_units = -0.51 * n_xz_yz - 0.43 * n_z2 + 0.23 * n_xy + 1.23 * n_x2_y2
            unp = (1 if n_xy == 1 else 0) + (1 if n_x2_y2 == 1 else 0)

            orbital_levels.append(
                OrbitalLevel(
                    label="dxz, dyz",
                    orbitals=["dxz", "dyz"],
                    energy_delta=-0.51,
                    energy_cm_inv=round(-0.51 * delta, 1),
                    degeneracy=2,
                    electron_count=n_xz_yz,
                    unpaired_electrons=0 if n_xz_yz in [0, 4] else 2,
                )
            )
            orbital_levels.append(
                OrbitalLevel(
                    label="dz2",
                    orbitals=["dz2"],
                    energy_delta=-0.43,
                    energy_cm_inv=round(-0.43 * delta, 1),
                    degeneracy=1,
                    electron_count=n_z2,
                    unpaired_electrons=1 if n_z2 == 1 else 0,
                )
            )
            orbital_levels.append(
                OrbitalLevel(
                    label="dxy",
                    orbitals=["dxy"],
                    energy_delta=+0.23,
                    energy_cm_inv=round(+0.23 * delta, 1),
                    degeneracy=1,
                    electron_count=n_xy,
                    unpaired_electrons=1 if n_xy == 1 else 0,
                )
            )
            orbital_levels.append(
                OrbitalLevel(
                    label="dx2-y2",
                    orbitals=["dx2-y2"],
                    energy_delta=+1.23,
                    energy_cm_inv=round(+1.23 * delta, 1),
                    degeneracy=1,
                    electron_count=n_x2_y2,
                    unpaired_electrons=1 if n_x2_y2 == 1 else 0,
                )
            )

        cfse_kj = round(cfse_units * delta * CM_INV_TO_KJ_MOL, 1)
        mu_bm = round(math.sqrt(unp * (unp + 2)), 2)
        is_paramag = unp > 0
        jt = cls.evaluate_jahn_teller(d_count, geom, spin)
        wl, color_name, color_hex = cls.calculate_optical_color(delta)

        # Formula construction
        lig_sub = cn // ligand.denticity
        charge = metal.oxidation_state + (-1 if "-" in ligand.formula else 0) * cn
        sign = "+" if charge > 0 else ("-" if charge < 0 else "")
        chg_str = f"{abs(charge)}{sign}" if abs(charge) > 1 else sign if charge != 0 else ""
        formula = f"[{metal.symbol}({ligand.formula}){lig_sub}]{chg_str}"
        name = f"{ligand.name} {metal.name} ({geom})"

        notes = (
            f"{metal.name} (d^{d_count}) with {ligand.name} in {geom} symmetry. "
            f"Crystal field splitting Δ = {delta:,.0f} cm^-1 (Pairing energy P = {p_energy:,.0f} cm^-1). "
            f"State: {spin.replace('_', ' ').title()}. CFSE = {cfse_units:+.2f} Δ ({cfse_kj:+.1f} kJ/mol). "
            f"Magnetic moment μ_eff = {mu_bm:.2f} μB ({unp} unpaired e-, {'Paramagnetic' if is_paramag else 'Diamagnetic'}). "
            f"Jahn-Teller effect: {jt.replace('_', ' ').title()}."
        )

        return CoordinationAnalysisResponse(
            formula=formula,
            name=name,
            metal=MetalIonSummary(
                symbol=metal.symbol,
                name=metal.name,
                atomic_number=metal.atomic_number,
                group=metal.group,
                period=metal.period,
                oxidation_state=metal.oxidation_state,
                d_electron_count=metal.d_electron_count,
            ),
            ligand=LigandSummary(
                id=ligand.id,
                formula=ligand.formula,
                name=ligand.name,
                denticity=ligand.denticity,
                donor_atom=ligand.donor_atom,
                spectrochemical_rank=ligand.spectrochemical_rank,
                field_strength=ligand.field_strength,
            ),
            coordination_number=cn,
            geometry=geom,
            delta_cm_inv=round(delta, 1),
            pairing_energy_cm_inv=round(p_energy, 1),
            spin_state=spin,
            orbital_levels=[
                OrbitalLevelSchema(
                    label=ol.label,
                    orbitals=ol.orbitals,
                    energy_delta=ol.energy_delta,
                    energy_cm_inv=ol.energy_cm_inv,
                    degeneracy=ol.degeneracy,
                    electron_count=ol.electron_count,
                    unpaired_electrons=ol.unpaired_electrons,
                )
                for ol in orbital_levels
            ],
            cfse_delta_units=round(cfse_units, 2),
            cfse_kj_mol=cfse_kj,
            unpaired_electrons=unp,
            magnetic_moment_bm=mu_bm,
            is_paramagnetic=is_paramag,
            jahn_teller_distortion=jt,
            absorption_wavelength_nm=wl,
            perceived_color_name=color_name,
            perceived_color_hex=color_hex,
            pedagogical_notes=notes,
        )

    @classmethod
    def get_presets(cls) -> List[ComplexPresetSummary]:
        return PRESET_COMPLEXES

    @classmethod
    def get_all_metals(cls) -> List[MetalIonSummary]:
        results = []
        for sym, states in METALS.items():
            for ox, m in states.items():
                results.append(
                    MetalIonSummary(
                        symbol=m.symbol,
                        name=m.name,
                        atomic_number=m.atomic_number,
                        group=m.group,
                        period=m.period,
                        oxidation_state=m.oxidation_state,
                        d_electron_count=m.d_electron_count,
                    )
                )
        return results

    @classmethod
    def get_all_ligands(cls) -> List[LigandSummary]:
        return [
            LigandSummary(
                id=lig.id,
                formula=lig.formula,
                name=lig.name,
                denticity=lig.denticity,
                donor_atom=lig.donor_atom,
                spectrochemical_rank=lig.spectrochemical_rank,
                field_strength=lig.field_strength,
            )
            for lig in sorted(LIGANDS.values(), key=lambda l: l.spectrochemical_rank)
        ]
