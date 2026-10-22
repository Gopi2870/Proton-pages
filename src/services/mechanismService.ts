import {
  OrganicReactionMechanism,
  MechanismSummary,
  EnergyProfileInterpolationResponse,
  ReactionEnergyPoint,
} from '../types/mechanisms';

const API_BASE = '/api/v1/chemistry/mechanisms';

export const FALLBACK_MECHANISMS: OrganicReactionMechanism[] = [
  {
    id: 'sn2_bromoethane',
    name: 'SN2 Bimolecular Nucleophilic Substitution',
    mechanism_class: 'SN2',
    overall_reaction: 'CH3CH2Br + OH- -> CH3CH2OH + Br-',
    substrate: 'Bromoethane (Primary alkyl halide)',
    nucleophile_or_reagent: 'Hydroxide ion (OH-)',
    solvent: 'Dimethyl sulfoxide (DMSO, polar aprotic)',
    stereochemical_outcome: 'inversion_walden',
    kinetics_rate_law: 'Rate = k [CH3CH2Br] [OH-]',
    pedagogical_notes:
      'Concerted single-step mechanism. The nucleophile attacks the electrophilic carbon from 180 degrees opposite the leaving group (backside attack), leading to a trigonal bipyramidal pentacoordinate transition state and Walden inversion.',
    steps: [
      {
        step_number: 1,
        title: 'Concerted Backside Nucleophilic Attack',
        description:
          'Hydroxide lone pair attacks the sigma* antibonding orbital of the C-Br bond while bromide departs synchronously.',
        intermediate_type: 'transition_state',
        reactants_label: 'CH3CH2Br + OH-',
        products_label: 'CH3CH2OH + Br-',
        activation_energy_kj_mol: 82.5,
        reaction_energy_kj_mol: -65.0,
        curved_arrows: [
          {
            source_type: 'lone_pair',
            source_label: 'O_lone_pair',
            source_coords: [0.15, 0.5],
            target_type: 'atom',
            target_label: 'C_alpha',
            target_coords: [0.48, 0.5],
            arrow_type: 'two_electron',
            curvature_bias: 0.35,
          },
          {
            source_type: 'bond',
            source_label: 'C-Br_sigma',
            source_coords: [0.54, 0.5],
            target_type: 'atom',
            target_label: 'Br_leaving_group',
            target_coords: [0.85, 0.5],
            arrow_type: 'two_electron',
            curvature_bias: -0.35,
          },
        ],
        key_bonds_formed: ['C-O (covalent sigma)'],
        key_bonds_broken: ['C-Br (heterolytic cleavage)'],
      },
    ],
    energy_profile: [
      { reaction_coordinate: 0.0, gibbs_free_energy_kj_mol: 0.0, point_type: 'ground_state', label: 'Reactants: CH3CH2Br + OH-' },
      { reaction_coordinate: 0.5, gibbs_free_energy_kj_mol: 82.5, point_type: 'transition_state', label: '[HO...CH2(CH3)...Br]‡' },
      { reaction_coordinate: 1.0, gibbs_free_energy_kj_mol: -65.0, point_type: 'ground_state', label: 'Products: CH3CH2OH + Br-' },
    ],
  },
  {
    id: 'sn1_tertbutyl_chloride',
    name: 'SN1 Unimolecular Solvolysis',
    mechanism_class: 'SN1',
    overall_reaction: '(CH3)3C-Cl + 2 H2O -> (CH3)3C-OH + H3O+ + Cl-',
    substrate: 'tert-Butyl chloride (Tertiary alkyl halide)',
    nucleophile_or_reagent: 'Water (H2O, weak neutral nucleophile)',
    solvent: 'Water / Acetone (polar protic mixture)',
    stereochemical_outcome: 'racemization',
    kinetics_rate_law: 'Rate = k [(CH3)3C-Cl]',
    pedagogical_notes:
      'Two-step mechanism involving a rate-determining unimolecular ionization to a planar sp2 carbocation intermediate, followed by rapid solvent nucleophilic capture.',
    steps: [
      {
        step_number: 1,
        title: 'Rate-Determining Heterolysis to Carbocation',
        description:
          'Spontaneous heterolytic cleavage of the C-Cl bond forming a planar, resonance-free tertiary carbocation intermediate.',
        intermediate_type: 'carbocation',
        reactants_label: '(CH3)3C-Cl',
        products_label: '(CH3)3C+ + Cl-',
        activation_energy_kj_mol: 94.0,
        reaction_energy_kj_mol: 38.0,
        curved_arrows: [
          {
            source_type: 'bond',
            source_label: 'C-Cl_sigma',
            source_coords: [0.45, 0.5],
            target_type: 'atom',
            target_label: 'Cl_leaving_group',
            target_coords: [0.8, 0.35],
            arrow_type: 'two_electron',
            curvature_bias: -0.4,
          },
        ],
        key_bonds_formed: [],
        key_bonds_broken: ['C-Cl (heterolytic cleavage)'],
      },
      {
        step_number: 2,
        title: 'Nucleophilic Water Capture',
        description: 'Water attacks the empty 2pz orbital of the planar carbocation from either top or bottom face.',
        intermediate_type: 'oxonium',
        reactants_label: '(CH3)3C+ + H2O',
        products_label: '(CH3)3C-OH2+',
        activation_energy_kj_mol: 18.0,
        reaction_energy_kj_mol: -45.0,
        curved_arrows: [
          {
            source_type: 'lone_pair',
            source_label: 'H2O_lone_pair',
            source_coords: [0.2, 0.3],
            target_type: 'atom',
            target_label: 'Carbocation_C+',
            target_coords: [0.5, 0.5],
            arrow_type: 'two_electron',
            curvature_bias: 0.3,
          },
        ],
        key_bonds_formed: ['C-O (dative sigma)'],
        key_bonds_broken: [],
      },
      {
        step_number: 3,
        title: 'Deprotonation to Neutral Alcohol',
        description: 'A second solvent water molecule deprotonates the alkyloxonium ion, yielding tert-butanol and hydronium.',
        intermediate_type: 'product',
        reactants_label: '(CH3)3C-OH2+ + H2O',
        products_label: '(CH3)3C-OH + H3O+',
        activation_energy_kj_mol: 12.0,
        reaction_energy_kj_mol: -22.0,
        curved_arrows: [
          {
            source_type: 'lone_pair',
            source_label: 'Base_H2O_lone_pair',
            source_coords: [0.2, 0.7],
            target_type: 'atom',
            target_label: 'Oxonium_H',
            target_coords: [0.45, 0.6],
            arrow_type: 'two_electron',
            curvature_bias: 0.25,
          },
        ],
        key_bonds_formed: ['O-H (hydronium)'],
        key_bonds_broken: ['O-H (oxonium)'],
      },
    ],
    energy_profile: [
      { reaction_coordinate: 0.0, gibbs_free_energy_kj_mol: 0.0, point_type: 'ground_state', label: 'Reactant: (CH3)3C-Cl' },
      { reaction_coordinate: 0.35, gibbs_free_energy_kj_mol: 94.0, point_type: 'transition_state', label: 'TS1: [C...Cl]‡ (RDS)' },
      { reaction_coordinate: 0.55, gibbs_free_energy_kj_mol: 38.0, point_type: 'intermediate', label: 'Intermediate 1: (CH3)3C+' },
      { reaction_coordinate: 0.75, gibbs_free_energy_kj_mol: 56.0, point_type: 'transition_state', label: 'TS2: [C...OH2]‡' },
      { reaction_coordinate: 0.85, gibbs_free_energy_kj_mol: -7.0, point_type: 'intermediate', label: 'Intermediate 2: (CH3)3C-OH2+' },
      { reaction_coordinate: 1.0, gibbs_free_energy_kj_mol: -29.0, point_type: 'ground_state', label: 'Products: (CH3)3C-OH + H3O+' },
    ],
  },
  {
    id: 'e2_bromopropane',
    name: 'E2 Bimolecular Elimination',
    mechanism_class: 'E2',
    overall_reaction: 'CH3-CH(Br)-CH3 + EtO- -> CH3-CH=CH2 + EtOH + Br-',
    substrate: '2-Bromopropane (Secondary alkyl halide)',
    nucleophile_or_reagent: 'Sodium ethoxide (EtO-, strong unhindered base)',
    solvent: 'Ethanol (EtOH)',
    stereochemical_outcome: 'anti_elimination',
    kinetics_rate_law: 'Rate = k [2-Bromopropane] [EtO-]',
    pedagogical_notes:
      'Single-step concerted elimination requiring anti-periplanar alignment of the beta-C-H bond and alpha-C-Br bond (dihedral angle 180 degrees) for optimal overlap with developing pi-system.',
    steps: [
      {
        step_number: 1,
        title: 'Concerted Anti-Periplanar Elimination',
        description:
          'Ethoxide abstracts beta-hydrogen, the C-H electrons collapse to form C=C pi-bond, and bromide departs.',
        intermediate_type: 'transition_state',
        reactants_label: 'CH3-CH(Br)-CH3 + EtO-',
        products_label: 'CH3-CH=CH2 + EtOH + Br-',
        activation_energy_kj_mol: 78.0,
        reaction_energy_kj_mol: -48.0,
        curved_arrows: [
          {
            source_type: 'lone_pair',
            source_label: 'EtO-_lone_pair',
            source_coords: [0.1, 0.2],
            target_type: 'atom',
            target_label: 'beta_H',
            target_coords: [0.3, 0.35],
            arrow_type: 'two_electron',
            curvature_bias: 0.3,
          },
          {
            source_type: 'bond',
            source_label: 'beta_C-H_sigma',
            source_coords: [0.35, 0.4],
            target_type: 'bond',
            target_label: 'C-C_bond',
            target_coords: [0.5, 0.5],
            arrow_type: 'two_electron',
            curvature_bias: 0.35,
          },
          {
            source_type: 'bond',
            source_label: 'alpha_C-Br_sigma',
            source_coords: [0.55, 0.5],
            target_type: 'atom',
            target_label: 'Br_leaving_group',
            target_coords: [0.85, 0.7],
            arrow_type: 'two_electron',
            curvature_bias: -0.35,
          },
        ],
        key_bonds_formed: ['O-H (ethanol)', 'C=C (pi bond)'],
        key_bonds_broken: ['C-H (beta)', 'C-Br (alpha)'],
      },
    ],
    energy_profile: [
      { reaction_coordinate: 0.0, gibbs_free_energy_kj_mol: 0.0, point_type: 'ground_state', label: 'Reactants: 2-Bromopropane + EtO-' },
      { reaction_coordinate: 0.5, gibbs_free_energy_kj_mol: 78.0, point_type: 'transition_state', label: 'TS: [EtO...H...C=C...Br]‡' },
      { reaction_coordinate: 1.0, gibbs_free_energy_kj_mol: -48.0, point_type: 'ground_state', label: 'Products: Propene + EtOH + Br-' },
    ],
  },
  {
    id: 'eas_benzene_nitration',
    name: 'Electrophilic Aromatic Substitution (EAS) Nitration',
    mechanism_class: 'EAS',
    overall_reaction: 'C6H6 + HNO3 (H2SO4) -> C6H5NO2 + H2O',
    substrate: 'Benzene (Aromatic ring)',
    nucleophile_or_reagent: 'Nitronium ion (NO2+, powerful electrophile)',
    solvent: 'Concentrated Sulfuric Acid (H2SO4)',
    stereochemical_outcome: 'achiral',
    kinetics_rate_law: 'Rate = k [Benzene] [NO2+]',
    pedagogical_notes:
      'Classic two-step substitution preserving aromatic stability. Rate-determining attack of pi-electrons generates a resonance-stabilized Arenium ion (Wheland / sigma-complex), followed by rapid proton removal.',
    steps: [
      {
        step_number: 1,
        title: 'Electrophilic Attack Forming Arenium Ion',
        description:
          'Benzene pi-electron pair attacks the linear nitronium ion (NO2+), breaking aromaticity to form a cyclohexadienyl carbocation (sigma-complex).',
        intermediate_type: 'arenium_ion',
        reactants_label: 'Benzene + NO2+',
        products_label: 'Arenium Ion (sigma-complex)',
        activation_energy_kj_mol: 64.0,
        reaction_energy_kj_mol: 42.0,
        curved_arrows: [
          {
            source_type: 'bond',
            source_label: 'Aromatic_pi_bond',
            source_coords: [0.4, 0.5],
            target_type: 'atom',
            target_label: 'Nitronium_N+',
            target_coords: [0.6, 0.3],
            arrow_type: 'two_electron',
            curvature_bias: 0.35,
          },
        ],
        key_bonds_formed: ['C-N (covalent sigma)'],
        key_bonds_broken: ['Aromatic C=C (pi bond)'],
      },
      {
        step_number: 2,
        title: 'Deprotonation & Aromaticity Restoration',
        description:
          'Bisulfate base abstracts the ring proton, returning electron density to the ring and regenerating aromatic resonance energy.',
        intermediate_type: 'product',
        reactants_label: 'Arenium Ion + HSO4-',
        products_label: 'Nitrobenzene + H2SO4',
        activation_energy_kj_mol: 14.0,
        reaction_energy_kj_mol: -152.0,
        curved_arrows: [
          {
            source_type: 'lone_pair',
            source_label: 'HSO4-_lone_pair',
            source_coords: [0.2, 0.75],
            target_type: 'atom',
            target_label: 'sp3_C_Hydrogen',
            target_coords: [0.45, 0.65],
            arrow_type: 'two_electron',
            curvature_bias: 0.25,
          },
        ],
        key_bonds_formed: ['Aromatic 6-pi sextet'],
        key_bonds_broken: ['C-H (aliphatic)'],
      },
    ],
    energy_profile: [
      { reaction_coordinate: 0.0, gibbs_free_energy_kj_mol: 0.0, point_type: 'ground_state', label: 'Reactants: Benzene + NO2+' },
      { reaction_coordinate: 0.4, gibbs_free_energy_kj_mol: 64.0, point_type: 'transition_state', label: 'TS1: [C6H6...NO2]‡' },
      { reaction_coordinate: 0.6, gibbs_free_energy_kj_mol: 42.0, point_type: 'intermediate', label: 'Intermediate: Arenium Ion (Wheland)' },
      { reaction_coordinate: 1.0, gibbs_free_energy_kj_mol: -110.0, point_type: 'ground_state', label: 'Products: Nitrobenzene + H3O+' },
    ],
  },
];

class MechanismService {
  async getMechanisms(): Promise<MechanismSummary[]> {
    try {
      const res = await fetch(`${API_BASE}/presets`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return FALLBACK_MECHANISMS.map((m) => ({
        id: m.id,
        name: m.name,
        mechanism_class: m.mechanism_class,
        overall_reaction: m.overall_reaction,
        substrate: m.substrate,
        nucleophile_or_reagent: m.nucleophile_or_reagent,
        solvent: m.solvent,
        stereochemical_outcome: m.stereochemical_outcome,
        kinetics_rate_law: m.kinetics_rate_law,
        step_count: m.steps.length,
        total_activation_barrier_kj_mol: Math.max(...m.steps.map((s) => s.activation_energy_kj_mol)),
        net_gibbs_energy_kj_mol: m.steps.reduce((acc, s) => acc + s.reaction_energy_kj_mol, 0),
      }));
    }
  }

  async getMechanismById(id: string): Promise<OrganicReactionMechanism> {
    try {
      const res = await fetch(`${API_BASE}/presets/${id}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      const match = FALLBACK_MECHANISMS.find((m) => m.id === id);
      return match || FALLBACK_MECHANISMS[0];
    }
  }

  async interpolateEnergyProfile(
    points: ReactionEnergyPoint[],
    resolution: number = 40
  ): Promise<EnergyProfileInterpolationResponse> {
    try {
      const res = await fetch(`${API_BASE}/energy-profile/interpolate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ points, resolution }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      // Local fallback interpolation
      const sorted = [...points].sort((a, b) => a.reaction_coordinate - b.reaction_coordinate);
      const grid = Array.from({ length: resolution }, (_, i) => Number((i / (resolution - 1)).toFixed(3)));
      const curve = grid.map((x) => {
        if (x <= sorted[0].reaction_coordinate) return sorted[0].gibbs_free_energy_kj_mol;
        if (x >= sorted[sorted.length - 1].reaction_coordinate)
          return sorted[sorted.length - 1].gibbs_free_energy_kj_mol;
        for (let i = 0; i < sorted.length - 1; i++) {
          const p0 = sorted[i];
          const p1 = sorted[i + 1];
          if (p0.reaction_coordinate <= x && x <= p1.reaction_coordinate) {
            const span = p1.reaction_coordinate - p0.reaction_coordinate;
            const t = span > 0 ? (x - p0.reaction_coordinate) / span : 0;
            const smoothT = 3 * t ** 2 - 2 * t ** 3;
            return Number((p0.gibbs_free_energy_kj_mol + smoothT * (p1.gibbs_free_energy_kj_mol - p0.gibbs_free_energy_kj_mol)).toFixed(2));
          }
        }
        return 0;
      });

      return {
        coordinate_grid: grid,
        gibbs_energy_curve: curve,
        transition_state_peaks: points.filter((p) => p.point_type === 'transition_state'),
        intermediate_valleys: points.filter((p) => p.point_type === 'intermediate'),
      };
    }
  }
}

export const mechanismService = new MechanismService();
