export type EnsembleType =
  | 'nve_microcanonical'
  | 'nvt_berendsen'
  | 'nvt_andersen';

export type LatticeStructure =
  | 'face_centered_cubic'
  | 'simple_cubic'
  | 'random_non_overlapping';

export interface ParticleState {
  id: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  fx?: number;
  fy?: number;
  fz?: number;
  mass: number;
  speed: number;
  unwrappedX: number;
  unwrappedY: number;
  unwrappedZ: number;
}

export interface SimulationTelemetryPoint {
  step: number;
  time_ps: number;
  kinetic_energy_kj_mol: number;
  potential_energy_kj_mol: number;
  total_energy_kj_mol: number;
  temperature_k: number;
  pressure_bar: number;
  energy_drift_fraction: number;
}

export interface RadialDistributionPoint {
  r_angstrom: number;
  g_r: number;
}

export interface MeanSquaredDisplacementPoint {
  time_ps: number;
  msd_angstrom2: number;
}

export interface MolecularDynamicsPresetSummary {
  id: string;
  name: string;
  state_of_matter: string;
  default_ensemble: EnsembleType;
  target_temperature_k: number;
  density_g_cm3: number;
  description: string;
}

export interface MolecularDynamicsRequest {
  preset_id?: string;
  ensemble: EnsembleType;
  num_particles: number;
  target_temperature_k: number;
  density_g_cm3: number;
  timestep_fs: number;
  total_steps: number;
  sampling_interval: number;
  sigma_angstrom?: number;
  epsilon_kj_mol?: number;
  cutoff_radius_sigma?: number;
  thermostat_coupling_ps?: number;
  initial_lattice?: LatticeStructure;
  random_seed?: number;
}

export interface MolecularDynamicsResponse {
  system_name: string;
  ensemble: EnsembleType;
  num_particles: number;
  box_length_angstrom: number;
  volume_angstrom3: number;
  density_g_cm3: number;
  timestep_fs: number;
  total_steps: number;
  initial_temperature_k: number;
  final_temperature_k: number;
  average_temperature_k: number;
  average_pressure_bar: number;
  energy_conservation_ratio: number;
  self_diffusion_coefficient_cm2_s: number;
  telemetry: SimulationTelemetryPoint[];
  radial_distribution: RadialDistributionPoint[];
  msd_curve: MeanSquaredDisplacementPoint[];
  final_positions: Array<{
    id: number;
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    speed: number;
  }>;
  pedagogical_summary: string;
}
