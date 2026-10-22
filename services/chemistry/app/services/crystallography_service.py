"""
High-Precision Crystallography & Solid-State Materials Science Service.
Implements:
- 14 Bravais Lattices and 7 Crystal Systems
- Metric Tensor, Unit Cell Volume & Theoretical Density
- Miller Indices (hkl) and Interplanar Spacing d_hkl
- Systematic Absences & Extinction Rules
- Bragg's Law & Powder X-ray Diffraction (XRD) Simulation
"""

import math
from typing import List, Dict, Optional, Tuple
from app.models.crystallography import (
    CrystalSystem,
    BravaisLatticeType,
    XRaySource,
    FractionalAtom,
    MillerPlane,
    UnitCellGeometry,
    XrdDiffractionSpectrum,
    CrystalStructurePreset,
)

AVOGADRO_CONSTANT = 6.02214076e23

XRAY_WAVELENGTHS: Dict[XRaySource, float] = {
    XRaySource.CU_KA: 1.54060,
    XRaySource.MO_KA: 0.71073,
    XRaySource.CO_KA: 1.78901,
    XRaySource.CR_KA: 2.28970,
}

# Empirical atomic numbers for atomic form factor scaling
ATOMIC_NUMBERS: Dict[str, float] = {
    "H": 1, "He": 2, "Li": 3, "Be": 4, "B": 5, "C": 6, "N": 7, "O": 8, "F": 9, "Ne": 10,
    "Na": 11, "Mg": 12, "Al": 13, "Si": 14, "P": 15, "S": 16, "Cl": 17, "Ar": 18,
    "K": 19, "Ca": 20, "Sc": 21, "Ti": 22, "V": 23, "Cr": 24, "Mn": 25, "Fe": 26,
    "Co": 27, "Ni": 28, "Cu": 29, "Zn": 30, "Ga": 31, "Ge": 32, "As": 33, "Se": 34,
    "Br": 35, "Kr": 36, "Rb": 37, "Sr": 38, "Y": 39, "Zr": 40, "Nb": 41, "Mo": 42,
    "Ru": 44, "Rh": 45, "Pd": 46, "Ag": 47, "Cd": 48, "In": 49, "Sn": 50, "Sb": 51,
    "I": 53, "Cs": 55, "Ba": 56, "La": 57, "Ce": 58, "W": 74, "Pt": 78, "Au": 79,
    "Pb": 82, "Bi": 83, "U": 92,
}

CRYSTAL_PRESETS: Dict[str, CrystalStructurePreset] = {
    "copper": CrystalStructurePreset(
        id="copper",
        name="Copper (FCC)",
        formula="Cu",
        crystal_system=CrystalSystem.CUBIC,
        bravais_lattice=BravaisLatticeType.FACE_CENTERED_CUBIC,
        space_group="Fm-3m (225)",
        a=3.615,
        b=3.615,
        c=3.615,
        z=4,
        molar_mass_g_mol=63.546,
        basis_atoms=[
            FractionalAtom("Cu", 0.0, 0.0, 0.0),
            FractionalAtom("Cu", 0.5, 0.5, 0.0),
            FractionalAtom("Cu", 0.5, 0.0, 0.5),
            FractionalAtom("Cu", 0.0, 0.5, 0.5),
        ],
        description="Archetype face-centered cubic ductile metal with 12-fold atomic coordination.",
        practical_applications=["Electrical wiring", "Heat exchangers", "Superconducting alloys"],
    ),
    "alpha_iron": CrystalStructurePreset(
        id="alpha_iron",
        name="alpha-Iron / Ferrite (BCC)",
        formula="Fe",
        crystal_system=CrystalSystem.CUBIC,
        bravais_lattice=BravaisLatticeType.BODY_CENTERED_CUBIC,
        space_group="Im-3m (229)",
        a=2.866,
        b=2.866,
        c=2.866,
        z=2,
        molar_mass_g_mol=55.845,
        basis_atoms=[
            FractionalAtom("Fe", 0.0, 0.0, 0.0),
            FractionalAtom("Fe", 0.5, 0.5, 0.5),
        ],
        description="Room-temperature allotrope of metallic iron, exhibiting ferromagnetic coupling and BCC geometry.",
        practical_applications=["Structural steels", "Magnetic transformer cores", "Electromagnetism"],
    ),
    "nacl": CrystalStructurePreset(
        id="nacl",
        name="Sodium Chloride (Halite)",
        formula="NaCl",
        crystal_system=CrystalSystem.CUBIC,
        bravais_lattice=BravaisLatticeType.FACE_CENTERED_CUBIC,
        space_group="Fm-3m (225)",
        a=5.640,
        b=5.640,
        c=5.640,
        z=4,
        molar_mass_g_mol=58.44,
        basis_atoms=[
            FractionalAtom("Na", 0.0, 0.0, 0.0),
            FractionalAtom("Na", 0.5, 0.5, 0.0),
            FractionalAtom("Na", 0.5, 0.0, 0.5),
            FractionalAtom("Na", 0.0, 0.5, 0.5),
            FractionalAtom("Cl", 0.5, 0.0, 0.0),
            FractionalAtom("Cl", 0.0, 0.5, 0.0),
            FractionalAtom("Cl", 0.0, 0.0, 0.5),
            FractionalAtom("Cl", 0.5, 0.5, 0.5),
        ],
        description="Interpenetrating FCC lattice with 6:6 octahedral coordination of Na+ and Cl- ions.",
        practical_applications=["Optical prisms", "Electrolyte standard", "Chemical industry feedstock"],
    ),
    "cscl": CrystalStructurePreset(
        id="cscl",
        name="Cesium Chloride",
        formula="CsCl",
        crystal_system=CrystalSystem.CUBIC,
        bravais_lattice=BravaisLatticeType.PRIMITIVE_CUBIC,
        space_group="Pm-3m (221)",
        a=4.123,
        b=4.123,
        c=4.123,
        z=1,
        molar_mass_g_mol=168.36,
        basis_atoms=[
            FractionalAtom("Cs", 0.0, 0.0, 0.0),
            FractionalAtom("Cl", 0.5, 0.5, 0.5),
        ],
        description="Primitive cubic lattice with 8:8 cubic coordination, illustrating large cation stabilization.",
        practical_applications=["Density gradient centrifugation", "Scintillation detectors"],
    ),
    "diamond": CrystalStructurePreset(
        id="diamond",
        name="Diamond Cubic Carbon",
        formula="C",
        crystal_system=CrystalSystem.CUBIC,
        bravais_lattice=BravaisLatticeType.FACE_CENTERED_CUBIC,
        space_group="Fd-3m (227)",
        a=3.567,
        b=3.567,
        c=3.567,
        z=8,
        molar_mass_g_mol=12.011,
        basis_atoms=[
            FractionalAtom("C", 0.0, 0.0, 0.0),
            FractionalAtom("C", 0.5, 0.5, 0.0),
            FractionalAtom("C", 0.5, 0.0, 0.5),
            FractionalAtom("C", 0.0, 0.5, 0.5),
            FractionalAtom("C", 0.25, 0.25, 0.25),
            FractionalAtom("C", 0.75, 0.75, 0.25),
            FractionalAtom("C", 0.75, 0.25, 0.75),
            FractionalAtom("C", 0.25, 0.75, 0.75),
        ],
        description="Two interpenetrating FCC lattices shifted by (1/4, 1/4, 1/4), with sp3 tetrahedral bonding.",
        practical_applications=["Abrasives", "Thermal management", "High-pressure diamond anvil cells"],
    ),
    "silicon": CrystalStructurePreset(
        id="silicon",
        name="Silicon Semiconductor",
        formula="Si",
        crystal_system=CrystalSystem.CUBIC,
        bravais_lattice=BravaisLatticeType.FACE_CENTERED_CUBIC,
        space_group="Fd-3m (227)",
        a=5.431,
        b=5.431,
        c=5.431,
        z=8,
        molar_mass_g_mol=28.085,
        basis_atoms=[
            FractionalAtom("Si", 0.0, 0.0, 0.0),
            FractionalAtom("Si", 0.5, 0.5, 0.0),
            FractionalAtom("Si", 0.5, 0.0, 0.5),
            FractionalAtom("Si", 0.0, 0.5, 0.5),
            FractionalAtom("Si", 0.25, 0.25, 0.25),
            FractionalAtom("Si", 0.75, 0.75, 0.25),
            FractionalAtom("Si", 0.75, 0.25, 0.75),
            FractionalAtom("Si", 0.25, 0.75, 0.75),
        ],
        description="Diamond cubic semiconductor with indirect 1.12 eV bandgap forming the foundation of microelectronics.",
        practical_applications=["Photovoltaic solar cells", "Integrated circuits", "MEMS microdevices"],
    ),
    "zinc_blende": CrystalStructurePreset(
        id="zinc_blende",
        name="Zinc Blende (Sphalerite)",
        formula="ZnS",
        crystal_system=CrystalSystem.CUBIC,
        bravais_lattice=BravaisLatticeType.FACE_CENTERED_CUBIC,
        space_group="F-43m (216)",
        a=5.410,
        b=5.410,
        c=5.410,
        z=4,
        molar_mass_g_mol=97.47,
        basis_atoms=[
            FractionalAtom("Zn", 0.0, 0.0, 0.0),
            FractionalAtom("Zn", 0.5, 0.5, 0.0),
            FractionalAtom("Zn", 0.5, 0.0, 0.5),
            FractionalAtom("Zn", 0.0, 0.5, 0.5),
            FractionalAtom("S", 0.25, 0.25, 0.25),
            FractionalAtom("S", 0.75, 0.75, 0.25),
            FractionalAtom("S", 0.75, 0.25, 0.75),
            FractionalAtom("S", 0.25, 0.75, 0.75),
        ],
        description="Binary tetrahedral semiconductor prototype isomorphic to diamond structure with polar bonds.",
        practical_applications=["Infrared optics", "Phosphors", "Photocatalysis"],
    ),
    "fluorite": CrystalStructurePreset(
        id="fluorite",
        name="Fluorite (Calcium Fluoride)",
        formula="CaF2",
        crystal_system=CrystalSystem.CUBIC,
        bravais_lattice=BravaisLatticeType.FACE_CENTERED_CUBIC,
        space_group="Fm-3m (225)",
        a=5.463,
        b=5.463,
        c=5.463,
        z=4,
        molar_mass_g_mol=78.07,
        basis_atoms=[
            FractionalAtom("Ca", 0.0, 0.0, 0.0),
            FractionalAtom("Ca", 0.5, 0.5, 0.0),
            FractionalAtom("Ca", 0.5, 0.0, 0.5),
            FractionalAtom("Ca", 0.0, 0.5, 0.5),
            FractionalAtom("F", 0.25, 0.25, 0.25),
            FractionalAtom("F", 0.75, 0.25, 0.25),
            FractionalAtom("F", 0.25, 0.75, 0.25),
            FractionalAtom("F", 0.25, 0.25, 0.75),
            FractionalAtom("F", 0.75, 0.75, 0.25),
            FractionalAtom("F", 0.75, 0.25, 0.75),
            FractionalAtom("F", 0.25, 0.75, 0.75),
            FractionalAtom("F", 0.75, 0.75, 0.75),
        ],
        description="FCC Ca2+ cations with all 8 tetrahedral interstitial sites filled with F- anions.",
        practical_applications=["UV photolithography lenses", "Metallurgical flux", "Fluorine production"],
    ),
    "rutile": CrystalStructurePreset(
        id="rutile",
        name="Rutile (Titanium Dioxide)",
        formula="TiO2",
        crystal_system=CrystalSystem.TETRAGONAL,
        bravais_lattice=BravaisLatticeType.PRIMITIVE_TETRAGONAL,
        space_group="P4_2/mnm (136)",
        a=4.594,
        b=4.594,
        c=2.958,
        z=2,
        molar_mass_g_mol=79.866,
        basis_atoms=[
            FractionalAtom("Ti", 0.0, 0.0, 0.0),
            FractionalAtom("Ti", 0.5, 0.5, 0.5),
            FractionalAtom("O", 0.305, 0.305, 0.0),
            FractionalAtom("O", 0.695, 0.695, 0.0),
            FractionalAtom("O", 0.805, 0.195, 0.5),
            FractionalAtom("O", 0.195, 0.805, 0.5),
        ],
        description="Tetragonal oxide mineral with edge-sharing TiO6 octahedra running along the c-axis.",
        practical_applications=["White pigments", "Sunscreen UV blocks", "Dielectric resonators"],
    ),
    "perovskite": CrystalStructurePreset(
        id="perovskite",
        name="Calcium Titanate (Perovskite)",
        formula="CaTiO3",
        crystal_system=CrystalSystem.CUBIC,
        bravais_lattice=BravaisLatticeType.PRIMITIVE_CUBIC,
        space_group="Pm-3m (221)",
        a=3.795,
        b=3.795,
        c=3.795,
        z=1,
        molar_mass_g_mol=135.94,
        basis_atoms=[
            FractionalAtom("Ca", 0.0, 0.0, 0.0),
            FractionalAtom("Ti", 0.5, 0.5, 0.5),
            FractionalAtom("O", 0.5, 0.5, 0.0),
            FractionalAtom("O", 0.5, 0.0, 0.5),
            FractionalAtom("O", 0.0, 0.5, 0.5),
        ],
        description="Archetype ABO3 perovskite structure giving rise to high-efficiency solar cells and ferroelectrics.",
        practical_applications=["Perovskite solar cells", "Ferroelectric memory", "Solid oxide fuel cells"],
    ),
    "magnesium": CrystalStructurePreset(
        id="magnesium",
        name="Magnesium (HCP)",
        formula="Mg",
        crystal_system=CrystalSystem.HEXAGONAL,
        bravais_lattice=BravaisLatticeType.HEXAGONAL,
        space_group="P6_3/mmc (194)",
        a=3.209,
        b=3.209,
        c=5.211,
        alpha=90.0,
        beta=90.0,
        gamma=120.0,
        z=2,
        molar_mass_g_mol=24.305,
        basis_atoms=[
            FractionalAtom("Mg", 0.3333, 0.6667, 0.25),
            FractionalAtom("Mg", 0.6667, 0.3333, 0.75),
        ],
        description="Hexagonal close-packed (ABAB) light structural metal with c/a ratio of 1.624.",
        practical_applications=["Aerospace lightweight alloys", "Biocompatible implants", "Automotive components"],
    ),
    "quartz": CrystalStructurePreset(
        id="quartz",
        name="alpha-Quartz (Silicon Dioxide)",
        formula="SiO2",
        crystal_system=CrystalSystem.HEXAGONAL,
        bravais_lattice=BravaisLatticeType.HEXAGONAL,
        space_group="P3_1 21 (152)",
        a=4.913,
        b=4.913,
        c=5.405,
        alpha=90.0,
        beta=90.0,
        gamma=120.0,
        z=3,
        molar_mass_g_mol=60.084,
        basis_atoms=[
            FractionalAtom("Si", 0.4697, 0.0, 0.3333),
            FractionalAtom("Si", 0.0, 0.4697, 0.6667),
            FractionalAtom("Si", 0.5303, 0.5303, 0.0),
            FractionalAtom("O", 0.4141, 0.2681, 0.2140),
            FractionalAtom("O", 0.7319, 0.1460, 0.5473),
            FractionalAtom("O", 0.8540, 0.5859, 0.8807),
        ],
        description="Network silicate with corner-sharing SiO4 tetrahedra forming chiral helical channels.",
        practical_applications=["Piezoelectric crystal resonators", "Microelectronic timing oscillators", "Optics"],
    ),
}


class CrystallographyService:
    """Analytical service for solid-state crystallography and XRD simulation."""

    @staticmethod
    def get_presets() -> List[CrystalStructurePreset]:
        return list(CRYSTAL_PRESETS.values())

    @staticmethod
    def get_preset_by_id(preset_id: str) -> Optional[CrystalStructurePreset]:
        return CRYSTAL_PRESETS.get(preset_id.lower().strip())

    @staticmethod
    def calculate_cell_volume(
        a: float, b: float, c: float, alpha: float, beta: float, gamma: float
    ) -> float:
        """
        Calculates unit cell volume V in Angstroms^3 from 6 lattice parameters.
        V = a * b * c * sqrt(1 - cos^2 a - cos^2 b - cos^2 g + 2 cos a cos b cos g)
        """
        ra = math.radians(alpha)
        rb = math.radians(beta)
        rg = math.radians(gamma)

        cos_a = math.cos(ra)
        cos_b = math.cos(rb)
        cos_g = math.cos(rg)

        det = 1.0 - cos_a**2 - cos_b**2 - cos_g**2 + 2.0 * cos_a * cos_b * cos_g
        det = max(1e-12, det)
        return a * b * c * math.sqrt(det)

    @staticmethod
    def calculate_density(z: int, molar_mass: float, volume_angstrom3: float) -> float:
        """
        Theoretical density rho = (Z * M) / (V * N_A) in g/cm^3.
        Conversion: 1 Angstrom^3 = 1e-24 cm^3.
        """
        if volume_angstrom3 <= 0:
            return 0.0
        mass_cell_grams = (z * molar_mass) / AVOGADRO_CONSTANT
        vol_cm3 = volume_angstrom3 * 1e-24
        return mass_cell_grams / vol_cm3

    @staticmethod
    def calculate_metric_tensor(
        a: float, b: float, c: float, alpha: float, beta: float, gamma: float
    ) -> List[List[float]]:
        """Calculates direct metric tensor G_ij."""
        ra = math.radians(alpha)
        rb = math.radians(beta)
        rg = math.radians(gamma)

        g11 = a * a
        g22 = b * b
        g33 = c * c
        g12 = a * b * math.cos(rg)
        g13 = a * c * math.cos(rb)
        g23 = b * c * math.cos(ra)

        return [
            [g11, g12, g13],
            [g12, g22, g23],
            [g13, g23, g33],
        ]

    @staticmethod
    def calculate_packing_efficiency(
        bravais_lattice: BravaisLatticeType,
        atomic_radii_angstrom: Optional[float] = None,
        volume_angstrom3: Optional[float] = None,
        z: int = 1,
    ) -> float:
        """Returns theoretical atomic packing efficiency (0 to 1)."""
        if atomic_radii_angstrom and volume_angstrom3 and volume_angstrom3 > 0:
            sphere_vol = (4.0 / 3.0) * math.pi * (atomic_radii_angstrom**3)
            return min(1.0, max(0.0, (z * sphere_vol) / volume_angstrom3))

        # Standard geometric packing factors
        standard_apf = {
            BravaisLatticeType.PRIMITIVE_CUBIC: math.pi / 6.0,  # ~0.524
            BravaisLatticeType.BODY_CENTERED_CUBIC: (math.pi * math.sqrt(3)) / 8.0,  # ~0.680
            BravaisLatticeType.FACE_CENTERED_CUBIC: (math.pi * math.sqrt(2)) / 6.0,  # ~0.740
            BravaisLatticeType.HEXAGONAL: (math.pi * math.sqrt(2)) / 6.0,  # ~0.740
            BravaisLatticeType.PRIMITIVE_TETRAGONAL: 0.52,
            BravaisLatticeType.BODY_CENTERED_TETRAGONAL: 0.65,
            BravaisLatticeType.PRIMITIVE_ORTHORHOMBIC: 0.50,
            BravaisLatticeType.BASE_CENTERED_ORTHORHOMBIC: 0.58,
            BravaisLatticeType.BODY_CENTERED_ORTHORHOMBIC: 0.65,
            BravaisLatticeType.FACE_CENTERED_ORTHORHOMBIC: 0.72,
            BravaisLatticeType.RHOMBOHEDRAL: 0.60,
            BravaisLatticeType.PRIMITIVE_MONOCLINIC: 0.48,
            BravaisLatticeType.BASE_CENTERED_MONOCLINIC: 0.55,
            BravaisLatticeType.TRICLINIC: 0.45,
        }
        return standard_apf.get(bravais_lattice, 0.60)

    @staticmethod
    def calculate_d_spacing(
        h: int,
        k: int,
        l: int,
        a: float,
        b: float,
        c: float,
        alpha: float = 90.0,
        beta: float = 90.0,
        gamma: float = 90.0,
        crystal_system: CrystalSystem = CrystalSystem.CUBIC,
    ) -> float:
        """
        Calculates interplanar lattice plane spacing d_hkl in Angstroms.
        """
        if h == 0 and k == 0 and l == 0:
            return 0.0

        if crystal_system == CrystalSystem.CUBIC:
            inv_d2 = (h**2 + k**2 + l**2) / (a**2)
            return 1.0 / math.sqrt(inv_d2)

        elif crystal_system == CrystalSystem.TETRAGONAL:
            inv_d2 = (h**2 + k**2) / (a**2) + (l**2) / (c**2)
            return 1.0 / math.sqrt(inv_d2)

        elif crystal_system == CrystalSystem.ORTHORHOMBIC:
            inv_d2 = (h**2) / (a**2) + (k**2) / (b**2) + (l**2) / (c**2)
            return 1.0 / math.sqrt(inv_d2)

        elif crystal_system in (CrystalSystem.HEXAGONAL, CrystalSystem.RHOMBOHEDRAL):
            inv_d2 = (4.0 / 3.0) * (h**2 + h * k + k**2) / (a**2) + (l**2) / (c**2)
            return 1.0 / math.sqrt(inv_d2)

        elif crystal_system == CrystalSystem.MONOCLINIC:
            rb = math.radians(beta)
            sin_b = math.sin(rb)
            cos_b = math.cos(rb)
            if abs(sin_b) < 1e-6:
                sin_b = 1.0
            term = (
                (h**2) / (a**2)
                + ((k**2) * (sin_b**2)) / (b**2)
                + (l**2) / (c**2)
                - (2.0 * h * l * cos_b) / (a * c)
            )
            inv_d2 = (1.0 / (sin_b**2)) * term
            return 1.0 / math.sqrt(max(1e-12, inv_d2))

        else:
            # Triclinic / General metric tensor inversion
            ra = math.radians(alpha)
            rb = math.radians(beta)
            rg = math.radians(gamma)
            cos_a, cos_b, cos_g = math.cos(ra), math.cos(rb), math.cos(rg)
            sin_a, sin_b, sin_g = math.sin(ra), math.sin(rb), math.sin(rg)

            V = CrystallographyService.calculate_cell_volume(a, b, c, alpha, beta, gamma)
            s11 = (b * c * sin_a) ** 2
            s22 = (a * c * sin_b) ** 2
            s33 = (a * b * sin_g) ** 2
            s12 = a * b * c**2 * (cos_a * cos_b - cos_g)
            s23 = a**2 * b * c * (cos_b * cos_g - cos_a)
            s13 = a * b**2 * c * (cos_g * cos_a - cos_b)

            numerator = (
                s11 * h**2
                + s22 * k**2
                + s33 * l**2
                + 2 * s12 * h * k
                + 2 * s23 * k * l
                + 2 * s13 * h * l
            )
            inv_d2 = numerator / (V**2)
            return 1.0 / math.sqrt(max(1e-12, inv_d2))

    @staticmethod
    def is_diffraction_allowed(
        h: int, k: int, l: int, lattice_type: BravaisLatticeType, crystal_preset_id: Optional[str] = None
    ) -> bool:
        """
        Validates systematic absences according to Bravais centering and space-group extinction.
        """
        # Diamond / Silicon exception: FCC plus h+k+l = 4n for even planes
        if crystal_preset_id in ("diamond", "silicon"):
            all_odd = (h % 2 != 0) and (k % 2 != 0) and (l % 2 != 0)
            all_even = (h % 2 == 0) and (k % 2 == 0) and (l % 2 == 0)
            if not (all_odd or all_even):
                return False
            if all_even and ((h + k + l) % 4 != 0):
                return False
            return True

        # Face-Centered Cubic / Orthorhombic (F): h, k, l all odd or all even
        if lattice_type in (
            BravaisLatticeType.FACE_CENTERED_CUBIC,
            BravaisLatticeType.FACE_CENTERED_ORTHORHOMBIC,
        ):
            all_odd = (h % 2 != 0) and (k % 2 != 0) and (l % 2 != 0)
            all_even = (h % 2 == 0) and (k % 2 == 0) and (l % 2 == 0)
            return all_odd or all_even

        # Body-Centered Cubic / Tetragonal / Orthorhombic (I): h + k + l must be even
        if lattice_type in (
            BravaisLatticeType.BODY_CENTERED_CUBIC,
            BravaisLatticeType.BODY_CENTERED_TETRAGONAL,
            BravaisLatticeType.BODY_CENTERED_ORTHORHOMBIC,
        ):
            return (h + k + l) % 2 == 0

        # Base-Centered (C): h + k must be even
        if lattice_type in (
            BravaisLatticeType.BASE_CENTERED_ORTHORHOMBIC,
            BravaisLatticeType.BASE_CENTERED_MONOCLINIC,
        ):
            return (h + k) % 2 == 0

        # Primitive lattice (P): all allowed
        return True

    @staticmethod
    def calculate_structure_factor(
        h: int, k: int, l: int, basis_atoms: List[FractionalAtom]
    ) -> float:
        """
        Calculates magnitude |F_hkl| = |sum f_j * exp(2*pi*i*(h*x_j + k*y_j + l*z_j))|.
        """
        if not basis_atoms:
            return 1.0

        real_part = 0.0
        imag_part = 0.0

        for atom in basis_atoms:
            # Scaled atomic form factor
            f_j = ATOMIC_NUMBERS.get(atom.element, 14.0) * atom.occupancy
            phase = 2.0 * math.pi * (h * atom.x + k * atom.y + l * atom.z)
            real_part += f_j * math.cos(phase)
            imag_part += f_j * math.sin(phase)

        return math.sqrt(real_part**2 + imag_part**2)

    @staticmethod
    def get_plane_multiplicity(h: int, k: int, l: int, system: CrystalSystem) -> int:
        """Approximates multiplicity p_hkl based on permutation and sign symmetry."""
        abs_h, abs_k, abs_l = sorted([abs(h), abs(k), abs(l)])
        nonzero_count = sum(1 for v in [abs_h, abs_k, abs_l] if v > 0)

        if system == CrystalSystem.CUBIC:
            if abs_h == abs_k == abs_l:
                return 8  # e.g. {111}
            elif abs_h == 0 and abs_k == 0:
                return 6  # e.g. {100}
            elif abs_h == 0 and abs_k == abs_l:
                return 12  # e.g. {110}
            elif abs_h == 0:
                return 24  # e.g. {210}
            elif abs_h == abs_k or abs_k == abs_l:
                return 24  # e.g. {211}
            else:
                return 48  # e.g. {321}
        elif system == CrystalSystem.TETRAGONAL:
            if abs_h == abs_k:
                return 8 if abs_l > 0 else 4
            elif abs_h == 0 or abs_k == 0:
                return 8 if abs_l > 0 else 4
            else:
                return 16 if abs_l > 0 else 8
        elif system == CrystalSystem.HEXAGONAL:
            return 12 if (abs_h != 0 or abs_k != 0) and abs_l != 0 else 6
        else:
            return 8 if nonzero_count == 3 else (4 if nonzero_count == 2 else 2)

    @classmethod
    def simulate_xrd(
        cls,
        preset_id: Optional[str] = None,
        custom_a: Optional[float] = None,
        custom_b: Optional[float] = None,
        custom_c: Optional[float] = None,
        custom_alpha: float = 90.0,
        custom_beta: float = 90.0,
        custom_gamma: float = 90.0,
        crystal_system: CrystalSystem = CrystalSystem.CUBIC,
        bravais_lattice: BravaisLatticeType = BravaisLatticeType.FACE_CENTERED_CUBIC,
        x_ray_source: XRaySource = XRaySource.CU_KA,
        max_two_theta: float = 90.0,
        fwhm_degrees: float = 0.25,
    ) -> XrdDiffractionSpectrum:
        """
        Synthesizes a complete Powder XRD diffractogram including peak indexing and continuous profiles.
        """
        preset = cls.get_preset_by_id(preset_id) if preset_id else None

        if preset:
            c_id = preset.id
            c_name = preset.name
            c_formula = preset.formula
            a = preset.a
            b = preset.b
            c = preset.c
            alpha = preset.alpha
            beta = preset.beta
            gamma = preset.gamma
            system = preset.crystal_system
            lattice = preset.bravais_lattice
            basis = preset.basis_atoms
        else:
            c_id = "custom"
            c_name = f"Custom {crystal_system.value.capitalize()} Cell"
            c_formula = "AxBy"
            a = custom_a or 4.0
            b = custom_b or a
            c = custom_c or a
            alpha = custom_alpha
            beta = custom_beta
            gamma = custom_gamma
            system = crystal_system
            lattice = bravais_lattice
            basis = [FractionalAtom("Si", 0.0, 0.0, 0.0)]

        wavelength = XRAY_WAVELENGTHS.get(x_ray_source, 1.54060)

        raw_peaks: List[MillerPlane] = []
        max_idx = 5

        # Scan permissible (h, k, l) combinations
        for h in range(max_idx + 1):
            for k in range(h + 1):
                for l in range(k + 1):
                    if h == 0 and k == 0 and l == 0:
                        continue

                    if not cls.is_diffraction_allowed(h, k, l, lattice, preset_id):
                        continue

                    d = cls.calculate_d_spacing(h, k, l, a, b, c, alpha, beta, gamma, system)
                    if d <= 0:
                        continue

                    # Bragg's law: sin(theta) = lambda / (2*d)
                    sin_theta = wavelength / (2.0 * d)
                    if sin_theta >= 0.9999:
                        continue  # Exceeds maximum diffraction angle

                    theta_rad = math.asin(sin_theta)
                    two_theta = math.degrees(theta_rad) * 2.0

                    if two_theta > max_two_theta or two_theta < 5.0:
                        continue

                    # Structure factor
                    f_mag = cls.calculate_structure_factor(h, k, l, basis)
                    if f_mag < 0.01:
                        continue

                    # Multiplicity & Lorentz-Polarization Factor
                    p = cls.get_plane_multiplicity(h, k, l, system)
                    cos_theta = math.cos(theta_rad)
                    sin2_theta = sin_theta**2
                    cos_2theta = math.cos(2.0 * theta_rad)
                    lp = (1.0 + cos_2theta**2) / (sin2_theta * cos_theta)

                    # Intensity is proportional to |F|^2 * p * LP
                    raw_intensity = (f_mag**2) * p * lp

                    raw_peaks.append(
                        MillerPlane(
                            h=h,
                            k=k,
                            l=l,
                            d_spacing_angstrom=round(d, 4),
                            two_theta_degrees=round(two_theta, 2),
                            intensity_relative=raw_intensity,
                            multiplicity=p,
                            structure_factor_mag=round(f_mag, 2),
                        )
                    )

        # Normalize relative intensities to 100.0%
        if raw_peaks:
            max_intensity = max(p.intensity_relative for p in raw_peaks)
            if max_intensity > 0:
                for p in raw_peaks:
                    p.intensity_relative = round((p.intensity_relative / max_intensity) * 100.0, 1)

        raw_peaks.sort(key=lambda x: x.two_theta_degrees)

        # Continuous 2-theta grid from 10 to max_two_theta with step 0.1 deg
        step = 0.2
        num_points = int(math.ceil((max_two_theta - 10.0) / step)) + 1
        two_theta_grid = [round(10.0 + i * step, 1) for i in range(num_points)]
        intensity_profile = [0.0] * len(two_theta_grid)

        # Convolve peaks with Gaussian instrumental resolution
        sigma = fwhm_degrees / (2.0 * math.sqrt(2.0 * math.log(2.0)))
        for peak in raw_peaks:
            for idx, x in enumerate(two_theta_grid):
                dx = x - peak.two_theta_degrees
                if abs(dx) < 3.5 * fwhm_degrees:
                    intensity_profile[idx] += peak.intensity_relative * math.exp(
                        -0.5 * (dx / sigma) ** 2
                    )

        # Baseline noise (0.2%)
        intensity_profile = [round(v, 2) for v in intensity_profile]

        highest_peak = (
            max(raw_peaks, key=lambda x: x.intensity_relative)
            if raw_peaks
            else MillerPlane(1, 1, 1, 2.0, 40.0, 100.0, 8, 10.0)
        )

        return XrdDiffractionSpectrum(
            crystal_id=c_id,
            crystal_name=c_name,
            chemical_formula=c_formula,
            x_ray_source=x_ray_source,
            wavelength_angstrom=wavelength,
            peaks=raw_peaks,
            two_theta_grid=two_theta_grid,
            intensity_profile=intensity_profile,
            highest_intensity_peak=highest_peak,
        )
