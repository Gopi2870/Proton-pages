import {
  CrystalStructurePreset,
  UnitCellGeometry,
  XrdDiffractionSpectrum,
  MillerIndicesSpacingRequest,
  MillerIndicesSpacingResponse,
  XRaySource,
  CrystalSystem,
  BravaisLatticeType,
} from '../types/crystallography';

const API_BASE = '/api/v1/chemistry/crystallography';

export const FALLBACK_CRYSTAL_PRESETS: CrystalStructurePreset[] = [
  {
    id: 'copper',
    name: 'Copper (FCC)',
    formula: 'Cu',
    crystal_system: 'cubic',
    bravais_lattice: 'face_centered_cubic',
    space_group: 'Fm-3m (225)',
    a: 3.615,
    b: 3.615,
    c: 3.615,
    alpha: 90.0,
    beta: 90.0,
    gamma: 90.0,
    z: 4,
    molar_mass_g_mol: 63.546,
    basis_atoms: [
      { element: 'Cu', x: 0.0, y: 0.0, z: 0.0 },
      { element: 'Cu', x: 0.5, y: 0.5, z: 0.0 },
      { element: 'Cu', x: 0.5, y: 0.0, z: 0.5 },
      { element: 'Cu', x: 0.0, y: 0.5, z: 0.5 },
    ],
    description: 'Archetype face-centered cubic ductile metal with 12-fold atomic coordination.',
    practical_applications: ['Electrical wiring', 'Heat exchangers', 'Superconducting alloys'],
  },
  {
    id: 'alpha_iron',
    name: 'alpha-Iron / Ferrite (BCC)',
    formula: 'Fe',
    crystal_system: 'cubic',
    bravais_lattice: 'body_centered_cubic',
    space_group: 'Im-3m (229)',
    a: 2.866,
    b: 2.866,
    c: 2.866,
    alpha: 90.0,
    beta: 90.0,
    gamma: 90.0,
    z: 2,
    molar_mass_g_mol: 55.845,
    basis_atoms: [
      { element: 'Fe', x: 0.0, y: 0.0, z: 0.0 },
      { element: 'Fe', x: 0.5, y: 0.5, z: 0.5 },
    ],
    description: 'Room-temperature allotrope of metallic iron, exhibiting ferromagnetic coupling and BCC geometry.',
    practical_applications: ['Structural steels', 'Magnetic transformer cores', 'Electromagnetism'],
  },
  {
    id: 'nacl',
    name: 'Sodium Chloride (Halite)',
    formula: 'NaCl',
    crystal_system: 'cubic',
    bravais_lattice: 'face_centered_cubic',
    space_group: 'Fm-3m (225)',
    a: 5.64,
    b: 5.64,
    c: 5.64,
    alpha: 90.0,
    beta: 90.0,
    gamma: 90.0,
    z: 4,
    molar_mass_g_mol: 58.44,
    basis_atoms: [
      { element: 'Na', x: 0.0, y: 0.0, z: 0.0 },
      { element: 'Na', x: 0.5, y: 0.5, z: 0.0 },
      { element: 'Na', x: 0.5, y: 0.0, z: 0.5 },
      { element: 'Na', x: 0.0, y: 0.5, z: 0.5 },
      { element: 'Cl', x: 0.5, y: 0.0, z: 0.0 },
      { element: 'Cl', x: 0.0, y: 0.5, z: 0.0 },
      { element: 'Cl', x: 0.0, y: 0.0, z: 0.5 },
      { element: 'Cl', x: 0.5, y: 0.5, z: 0.5 },
    ],
    description: 'Interpenetrating FCC lattice with 6:6 octahedral coordination of Na+ and Cl- ions.',
    practical_applications: ['Optical prisms', 'Electrolyte standard', 'Chemical industry feedstock'],
  },
  {
    id: 'diamond',
    name: 'Diamond Cubic Carbon',
    formula: 'C',
    crystal_system: 'cubic',
    bravais_lattice: 'face_centered_cubic',
    space_group: 'Fd-3m (227)',
    a: 3.567,
    b: 3.567,
    c: 3.567,
    alpha: 90.0,
    beta: 90.0,
    gamma: 90.0,
    z: 8,
    molar_mass_g_mol: 12.011,
    basis_atoms: [
      { element: 'C', x: 0.0, y: 0.0, z: 0.0 },
      { element: 'C', x: 0.5, y: 0.5, z: 0.0 },
      { element: 'C', x: 0.5, y: 0.0, z: 0.5 },
      { element: 'C', x: 0.0, y: 0.5, z: 0.5 },
      { element: 'C', x: 0.25, y: 0.25, z: 0.25 },
      { element: 'C', x: 0.75, y: 0.75, z: 0.25 },
      { element: 'C', x: 0.75, y: 0.25, z: 0.75 },
      { element: 'C', x: 0.25, y: 0.75, z: 0.75 },
    ],
    description: 'Two interpenetrating FCC lattices shifted by (1/4, 1/4, 1/4), with sp3 tetrahedral bonding.',
    practical_applications: ['Abrasives', 'Thermal management', 'High-pressure diamond anvil cells'],
  },
  {
    id: 'perovskite',
    name: 'Calcium Titanate (Perovskite)',
    formula: 'CaTiO3',
    crystal_system: 'cubic',
    bravais_lattice: 'primitive_cubic',
    space_group: 'Pm-3m (221)',
    a: 3.795,
    b: 3.795,
    c: 3.795,
    alpha: 90.0,
    beta: 90.0,
    gamma: 90.0,
    z: 1,
    molar_mass_g_mol: 135.94,
    basis_atoms: [
      { element: 'Ca', x: 0.0, y: 0.0, z: 0.0 },
      { element: 'Ti', x: 0.5, y: 0.5, z: 0.5 },
      { element: 'O', x: 0.5, y: 0.5, z: 0.0 },
      { element: 'O', x: 0.5, y: 0.0, z: 0.5 },
      { element: 'O', x: 0.0, y: 0.5, z: 0.5 },
    ],
    description: 'Archetype ABO3 perovskite structure giving rise to high-efficiency solar cells and ferroelectrics.',
    practical_applications: ['Perovskite solar cells', 'Ferroelectric memory', 'Solid oxide fuel cells'],
  },
];

const WAVELENGTHS: Record<XRaySource, number> = {
  Cu_Ka: 1.5406,
  Mo_Ka: 0.71073,
  Co_Ka: 1.78901,
  Cr_Ka: 2.2897,
};

class CrystallographyService {
  async getPresets(): Promise<CrystalStructurePreset[]> {
    try {
      const res = await fetch(`${API_BASE}/presets`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return FALLBACK_CRYSTAL_PRESETS;
    }
  }

  async getPresetById(id: string): Promise<CrystalStructurePreset> {
    try {
      const res = await fetch(`${API_BASE}/presets/${id}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      const match = FALLBACK_CRYSTAL_PRESETS.find((p) => p.id === id);
      return match || FALLBACK_CRYSTAL_PRESETS[0];
    }
  }

  async computeUnitCellGeometry(params: {
    a: number;
    b?: number;
    c?: number;
    alpha?: number;
    beta?: number;
    gamma?: number;
    crystal_system?: CrystalSystem;
    bravais_lattice?: BravaisLatticeType;
    formula_units_z?: number;
    molar_mass_g_mol: number;
  }): Promise<UnitCellGeometry> {
    try {
      const res = await fetch(`${API_BASE}/cell-geometry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      const a = params.a;
      const b = params.b || a;
      const c = params.c || a;
      const alpha = params.alpha || 90.0;
      const beta = params.beta || 90.0;
      const gamma = params.gamma || 90.0;
      const z = params.formula_units_z || 1;

      // Analytical volume
      const ra = (alpha * Math.PI) / 180.0;
      const rb = (beta * Math.PI) / 180.0;
      const rg = (gamma * Math.PI) / 180.0;
      const det =
        1.0 -
        Math.cos(ra) ** 2 -
        Math.cos(rb) ** 2 -
        Math.cos(rg) ** 2 +
        2.0 * Math.cos(ra) * Math.cos(rb) * Math.cos(rg);
      const vol = a * b * c * Math.sqrt(Math.max(1e-12, det));
      const density = (z * params.molar_mass_g_mol) / (vol * 1e-24 * 6.02214076e23);

      return {
        a,
        b,
        c,
        alpha,
        beta,
        gamma,
        volume_angstrom3: Number(vol.toFixed(4)),
        crystal_system: params.crystal_system || 'cubic',
        bravais_lattice: params.bravais_lattice || 'face_centered_cubic',
        formula_units_z: z,
        density_g_cm3: Number(density.toFixed(4)),
        packing_efficiency: 0.74,
      };
    }
  }

  async computeMillerSpacing(
    req: MillerIndicesSpacingRequest
  ): Promise<MillerIndicesSpacingResponse> {
    try {
      const res = await fetch(`${API_BASE}/miller-spacing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      const a = req.a;
      const inv_d2 = (req.h ** 2 + req.k ** 2 + req.l ** 2) / (a * a);
      const d = inv_d2 > 0 ? 1.0 / Math.sqrt(inv_d2) : 0;
      const lambdaCu = 1.5406;
      const sinTheta = lambdaCu / (2.0 * d);
      const cu2t = sinTheta < 1.0 ? (2.0 * Math.asin(sinTheta) * 180.0) / Math.PI : undefined;

      return {
        h: req.h,
        k: req.k,
        l: req.l,
        d_spacing_angstrom: Number(d.toFixed(4)),
        cu_ka_two_theta_deg: cu2t ? Number(cu2t.toFixed(2)) : undefined,
        is_diffraction_allowed: cu2t !== undefined,
      };
    }
  }

  async simulateXrd(params: {
    crystal_id?: string;
    x_ray_source?: XRaySource;
    max_two_theta?: number;
    fwhm_degrees?: number;
  }): Promise<XrdDiffractionSpectrum> {
    try {
      const res = await fetch(`${API_BASE}/xrd-simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      const cid = params.crystal_id || 'copper';
      const preset = FALLBACK_CRYSTAL_PRESETS.find((p) => p.id === cid) || FALLBACK_CRYSTAL_PRESETS[0];
      const source = params.x_ray_source || 'Cu_Ka';
      const lambda = WAVELENGTHS[source] || 1.5406;
      const a = preset.a;

      // Generate prominent FCC peaks (111, 200, 220, 311, 222)
      const planes = [
        { h: 1, k: 1, l: 1, p: 8, f: 100 },
        { h: 2, k: 0, l: 0, p: 6, f: 45 },
        { h: 2, k: 2, l: 0, p: 12, f: 22 },
        { h: 3, k: 1, l: 1, p: 24, f: 20 },
        { h: 2, k: 2, l: 2, p: 8, f: 7 },
      ];

      const peaks = planes
        .map((pl) => {
          const d = a / Math.sqrt(pl.h ** 2 + pl.k ** 2 + pl.l ** 2);
          const sinTheta = lambda / (2.0 * d);
          if (sinTheta >= 0.999) return null;
          const twoTheta = (2.0 * Math.asin(sinTheta) * 180.0) / Math.PI;
          return {
            h: pl.h,
            k: pl.k,
            l: pl.l,
            d_spacing_angstrom: Number(d.toFixed(4)),
            two_theta_degrees: Number(twoTheta.toFixed(2)),
            intensity_relative: pl.f,
            multiplicity: pl.p,
            structure_factor_mag: pl.f,
          };
        })
        .filter((p): p is NonNullable<typeof p> => p !== null && p.two_theta_degrees <= (params.max_two_theta || 90));

      const two_theta_grid = Array.from({ length: 401 }, (_, i) => Number((10.0 + i * 0.2).toFixed(1)));
      const sigma = (params.fwhm_degrees || 0.2) / 2.355;
      const intensity_profile = two_theta_grid.map((x) => {
        let val = 0.5;
        for (const pk of peaks) {
          const dx = x - pk.two_theta_degrees;
          if (Math.abs(dx) < 1.0) {
            val += pk.intensity_relative * Math.exp(-0.5 * (dx / sigma) ** 2);
          }
        }
        return Number(val.toFixed(2));
      });

      return {
        crystal_id: preset.id,
        crystal_name: preset.name,
        chemical_formula: preset.formula,
        x_ray_source: source,
        wavelength_angstrom: lambda,
        peaks,
        two_theta_grid,
        intensity_profile,
        highest_intensity_peak: peaks[0],
      };
    }
  }
}

export const crystallographyService = new CrystallographyService();
