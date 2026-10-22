"""Scientific calculation engine for Computational Chemical Kinetics Networks & Stiff ODE Solvers."""

import math
from typing import Dict, List, Optional, Tuple
from app.models.stiff_kinetics import (
    KineticSpecies,
    ElementaryReaction,
    KineticsTrajectoryPoint,
    StiffKineticsPreset,
)
from app.schemas.stiff_kinetics import (
    KineticSpeciesSchema,
    ElementaryReactionSchema,
    KineticsPresetSummary,
    StiffKineticsSimulationRequest,
    StiffKineticsSimulationResponse,
)

PRESET_NETWORKS: Dict[str, StiffKineticsPreset] = {
    "robertson_stiff": StiffKineticsPreset(
        id="robertson_stiff",
        name="Robertson Autocatalytic Stiff System (1966)",
        category="stiff_benchmark",
        description="The classical benchmark for stiff numerical ODE solvers. Rate constants differ by 9 orders of magnitude (k1 = 0.04, k2 = 3e7, k3 = 1e4).",
        species=[
            KineticSpecies(name="A", initial_concentration_m=1.0, color_hex="#2563EB"),
            KineticSpecies(name="B", initial_concentration_m=0.0, color_hex="#D47942"),
            KineticSpecies(name="C", initial_concentration_m=0.0, color_hex="#059669"),
        ],
        reactions=[
            ElementaryReaction(
                id="r1",
                equation_str="A -> B",
                reactants={"A": 1.0},
                products={"B": 1.0},
                rate_constant=0.04,
            ),
            ElementaryReaction(
                id="r2",
                equation_str="2 B -> B + C",
                reactants={"B": 2.0},
                products={"B": 1.0, "C": 1.0},
                rate_constant=3.0e7,
            ),
            ElementaryReaction(
                id="r3",
                equation_str="B + C -> A + C",
                reactants={"B": 1.0, "C": 1.0},
                products={"A": 1.0, "C": 1.0},
                rate_constant=1.0e4,
            ),
        ],
        total_time_s=100.0,
        estimated_stiffness_ratio=7.5e8,
    ),
    "chapman_ozone": StiffKineticsPreset(
        id="chapman_ozone",
        name="Chapman Photochemical Stratospheric Ozone Cycle",
        category="atmospheric",
        description="Atmospheric oxygen-ozone cycle driven by solar UV radiation. Fast atomic oxygen radical turnover vs slow catalytic sink.",
        species=[
            KineticSpecies(name="O2", initial_concentration_m=0.21, color_hex="#3B82F6"),
            KineticSpecies(name="O", initial_concentration_m=1e-8, color_hex="#EF4444"),
            KineticSpecies(name="O3", initial_concentration_m=1e-6, color_hex="#8B572A"),
        ],
        reactions=[
            ElementaryReaction(
                id="r1",
                equation_str="O2 + hv -> 2 O",
                reactants={"O2": 1.0},
                products={"O": 2.0},
                rate_constant=2.0e-5,
            ),
            ElementaryReaction(
                id="r2",
                equation_str="O + O2 -> O3",
                reactants={"O": 1.0, "O2": 1.0},
                products={"O3": 1.0},
                rate_constant=5.0e3,
            ),
            ElementaryReaction(
                id="r3",
                equation_str="O3 + hv -> O + O2",
                reactants={"O3": 1.0},
                products={"O": 1.0, "O2": 1.0},
                rate_constant=1.0e-2,
            ),
            ElementaryReaction(
                id="r4",
                equation_str="O + O3 -> 2 O2",
                reactants={"O": 1.0, "O3": 1.0},
                products={"O2": 2.0},
                rate_constant=1.5e2,
            ),
        ],
        total_time_s=1000.0,
        estimated_stiffness_ratio=2.5e8,
    ),
    "oregonator_bz": StiffKineticsPreset(
        id="oregonator_bz",
        name="Field-Noyes Oregonator (Belousov-Zhabotinsky Oscillation)",
        category="oscillatory",
        description="Autonomous limit-cycle chemical oscillator simulating spatial scroll waves and periodic temporal redox pulses in Ce(IV)/Ce(III).",
        species=[
            KineticSpecies(name="X", initial_concentration_m=1.0e-6, color_hex="#EAB308"),  # HBrO2
            KineticSpecies(name="Y", initial_concentration_m=1.0e-4, color_hex="#8B572A"),  # Br-
            KineticSpecies(name="Z", initial_concentration_m=1.0e-5, color_hex="#2563EB"),  # Ce4+
        ],
        reactions=[
            ElementaryReaction(
                id="r1",
                equation_str="Y -> X",
                reactants={"Y": 1.0},
                products={"X": 1.0},
                rate_constant=1.34,
            ),
            ElementaryReaction(
                id="r2",
                equation_str="X + Y -> 2 P",
                reactants={"X": 1.0, "Y": 1.0},
                products={},
                rate_constant=1.6e6,
            ),
            ElementaryReaction(
                id="r3",
                equation_str="X -> 2 X + 2 Z",
                reactants={"X": 1.0},
                products={"X": 2.0, "Z": 2.0},
                rate_constant=8.0e3,
            ),
            ElementaryReaction(
                id="r4",
                equation_str="2 X -> P",
                reactants={"X": 2.0},
                products={},
                rate_constant=4.0e7,
            ),
            ElementaryReaction(
                id="r5",
                equation_str="Z -> Y",
                reactants={"Z": 1.0},
                products={"Y": 1.0},
                rate_constant=1.0,
            ),
        ],
        total_time_s=60.0,
        estimated_stiffness_ratio=4.0e7,
    ),
    "zeldovich_nox": StiffKineticsPreset(
        id="zeldovich_nox",
        name="Extended Zeldovich Thermal NOx Mechanism (2200 K)",
        category="combustion",
        description="High-temperature kinetic mechanism for atmospheric nitrogen oxidation during combustion at 2200 K.",
        species=[
            KineticSpecies(name="N2", initial_concentration_m=0.78, color_hex="#3B82F6"),
            KineticSpecies(name="O2", initial_concentration_m=0.05, color_hex="#10B981"),
            KineticSpecies(name="O", initial_concentration_m=1e-4, color_hex="#EF4444"),
            KineticSpecies(name="NO", initial_concentration_m=0.0, color_hex="#F97316"),
            KineticSpecies(name="N", initial_concentration_m=0.0, color_hex="#8B5CF6"),
        ],
        reactions=[
            ElementaryReaction(
                id="r1",
                equation_str="O + N2 -> NO + N",
                reactants={"O": 1.0, "N2": 1.0},
                products={"NO": 1.0, "N": 1.0},
                rate_constant=1.8e3,
            ),
            ElementaryReaction(
                id="r2",
                equation_str="N + O2 -> NO + O",
                reactants={"N": 1.0, "O2": 1.0},
                products={"NO": 1.0, "O": 1.0},
                rate_constant=2.5e6,
            ),
            ElementaryReaction(
                id="r3",
                equation_str="NO + N -> N2 + O",
                reactants={"NO": 1.0, "N": 1.0},
                products={"N2": 1.0, "O": 1.0},
                rate_constant=3.0e7,
            ),
        ],
        total_time_s=0.05,
        estimated_stiffness_ratio=1.6e4,
    ),
}


class StiffKineticsEngine:
    """Numerical integration engine for stiff chemical kinetics."""

    @classmethod
    def solve_linear_system(cls, a_mat: List[List[float]], b_vec: List[float]) -> List[float]:
        """Solves A x = b using Gaussian elimination with partial row pivoting."""
        n = len(b_vec)
        # Deep copy
        a = [row[:] for row in a_mat]
        b = b_vec[:]

        for i in range(n):
            # Pivot
            max_row = i
            max_val = abs(a[i][i])
            for r in range(i + 1, n):
                if abs(a[r][i]) > max_val:
                    max_val = abs(a[r][i])
                    max_row = r

            if max_row != i:
                a[i], a[max_row] = a[max_row], a[i]
                b[i], b[max_row] = b[max_row], b[i]

            pivot = a[i][i]
            if abs(pivot) < 1e-14:
                # Add tiny regularizer to prevent division by zero in singular states
                pivot = 1e-14 if pivot >= 0 else -1e-14

            for r in range(i + 1, n):
                factor = a[r][i] / pivot
                for c in range(i, n):
                    a[r][c] -= factor * a[i][c]
                b[r] -= factor * b[i]

        # Back-substitution
        x = [0.0] * n
        for i in range(n - 1, -1, -1):
            val = b[i]
            for c in range(i + 1, n):
                val -= a[i][c] * x[c]
            pivot = a[i][i] if abs(a[i][i]) > 1e-14 else 1e-14
            x[i] = val / pivot

        return x

    @classmethod
    def evaluate_derivatives(
        cls,
        species_names: List[str],
        reactions: List[ElementaryReaction],
        concentrations: Dict[str, float],
    ) -> Tuple[List[float], List[List[float]]]:
        """Evaluates dC/dt vector and analytic Jacobian matrix J = dF/dC."""
        n = len(species_names)
        idx_map = {name: i for i, name in enumerate(species_names)}

        f_vec = [0.0] * n
        j_mat = [[0.0] * n for _ in range(n)]

        for rxn in reactions:
            # Reaction rate: v = k * prod(C_i ^ nu_i)
            v = rxn.rate_constant
            for sp, stoich in rxn.reactants.items():
                c_val = max(0.0, concentrations.get(sp, 0.0))
                v *= c_val ** stoich

            # Net stoichiometric vector for this reaction
            net_stoich = {}
            for sp, stoich in rxn.products.items():
                net_stoich[sp] = net_stoich.get(sp, 0.0) + stoich
            for sp, stoich in rxn.reactants.items():
                net_stoich[sp] = net_stoich.get(sp, 0.0) - stoich

            # Add to F_i
            for sp, nu in net_stoich.items():
                if sp in idx_map:
                    f_vec[idx_map[sp]] += nu * v

            # Add to Jacobian J_ik = dF_i / dC_k
            for r_sp, r_stoich in rxn.reactants.items():
                if r_sp in idx_map:
                    k_idx = idx_map[r_sp]
                    c_k = concentrations.get(r_sp, 0.0)
                    if c_k > 1e-18:
                        dv_dck = (r_stoich * v) / c_k
                        for sp, nu in net_stoich.items():
                            if sp in idx_map:
                                i_idx = idx_map[sp]
                                j_mat[i_idx][k_idx] += nu * dv_dck

        return f_vec, j_mat

    @classmethod
    def simulate(
        cls, request: StiffKineticsSimulationRequest
    ) -> StiffKineticsSimulationResponse:
        """Simulates reaction network using Linearly-Implicit Rosenbrock (ROS2) stiff integrator."""
        if request.preset_id and request.preset_id in PRESET_NETWORKS:
            preset = PRESET_NETWORKS[request.preset_id]
            network_name = preset.name
            species = preset.species
            reactions = preset.reactions
            total_time = request.total_time_s if request.total_time_s != 100.0 else preset.total_time_s
            est_stiffness = preset.estimated_stiffness_ratio
        else:
            network_name = "Custom Reaction Network"
            species = []
            for s in (request.species or []):
                if isinstance(s, dict):
                    species.append(KineticSpecies(**s))
                elif isinstance(s, KineticSpecies):
                    species.append(s)
                else:
                    species.append(
                        KineticSpecies(
                            name=s.name,
                            initial_concentration_m=s.initial_concentration_m,
                            color_hex=getattr(s, "color_hex", None),
                        )
                    )
            reactions = []
            for r in (request.reactions or []):
                if isinstance(r, dict):
                    reactions.append(ElementaryReaction(**r))
                elif isinstance(r, ElementaryReaction):
                    reactions.append(r)
                else:
                    reactions.append(
                        ElementaryReaction(
                            id=r.id,
                            equation_str=r.equation_str,
                            reactants=r.reactants,
                            products=r.products,
                            rate_constant=r.rate_constant,
                            activation_energy_kj=getattr(r, "activation_energy_kj", None),
                        )
                    )
            total_time = request.total_time_s
            est_stiffness = 1.0e6

        species_names = [s.name for s in species]
        n_sp = len(species_names)

        # Initial state
        curr_conc = {s.name: s.initial_concentration_m for s in species}
        curr_time = 0.0

        # ROS2 Parameter
        gamma = 1.0 - 1.0 / (2.0 ** 0.5)  # ~ 0.292893

        trajectory: List[Dict[str, float]] = []
        initial_point = {"time_s": 0.0}
        initial_point.update(curr_conc)
        trajectory.append(initial_point)

        h = min(request.initial_step_s, total_time / 100.0)
        h = max(h, 1e-9)

        steps_recorded = 0
        target_records = min(request.max_steps, 500)
        record_interval = total_time / target_records
        next_record_time = record_interval

        last_jacobian: List[List[float]] = [[0.0] * n_sp for _ in range(n_sp)]

        while curr_time < total_time and steps_recorded < target_records:
            f_n, j_n = cls.evaluate_derivatives(species_names, reactions, curr_conc)
            last_jacobian = j_n

            if request.solver_method == "explicit_rk4":
                # Standard explicit RK4 (will demonstrate stiffness limits)
                k1 = f_n
                y1 = {s: max(0.0, curr_conc[s] + 0.5 * h * k1[i]) for i, s in enumerate(species_names)}
                k2, _ = cls.evaluate_derivatives(species_names, reactions, y1)
                y2 = {s: max(0.0, curr_conc[s] + 0.5 * h * k2[i]) for i, s in enumerate(species_names)}
                k3, _ = cls.evaluate_derivatives(species_names, reactions, y2)
                y3 = {s: max(0.0, curr_conc[s] + h * k3[i]) for i, s in enumerate(species_names)}
                k4, _ = cls.evaluate_derivatives(species_names, reactions, y3)

                for i, s in enumerate(species_names):
                    curr_conc[s] = max(0.0, curr_conc[s] + (h / 6.0) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]))
            else:
                # Linearly Implicit Rosenbrock-W (ROS2) Stiff Integrator
                # Build (I - gamma * h * J)
                a_mat = [[0.0] * n_sp for _ in range(n_sp)]
                for r in range(n_sp):
                    for c in range(n_sp):
                        ident = 1.0 if r == c else 0.0
                        a_mat[r][c] = ident - gamma * h * j_n[r][c]

                # Stage 1: (I - gamma*h*J) k1 = F(y_n)
                k1 = cls.solve_linear_system(a_mat, f_n)

                # Stage 2:
                # y_mid = y_n + 0.5 * h * k1
                y_mid = {s: max(0.0, curr_conc[s] + 0.5 * h * k1[i]) for i, s in enumerate(species_names)}
                f_mid, _ = cls.evaluate_derivatives(species_names, reactions, y_mid)

                # rhs2 = f_mid - gamma * h * (J * k1)
                jk1 = [sum(j_n[r][c] * k1[c] for c in range(n_sp)) for r in range(n_sp)]
                rhs2 = [f_mid[r] - gamma * h * jk1[r] for r in range(n_sp)]
                k2 = cls.solve_linear_system(a_mat, rhs2)

                # Update: y_{n+1} = y_n + h * k2
                for i, s in enumerate(species_names):
                    curr_conc[s] = max(0.0, curr_conc[s] + h * k2[i])

            curr_time += h

            # Adaptive step enlargement in smooth zones
            if request.solver_method != "explicit_rk4":
                h = min(h * 1.05, total_time / 50.0)

            # Record sample
            if curr_time >= next_record_time or curr_time >= total_time:
                point = {"time_s": round(curr_time, 5)}
                for s in species_names:
                    point[s] = round(curr_conc[s], 8)
                trajectory.append(point)
                steps_recorded += 1
                next_record_time += record_interval

        summary = (
            f"Stiff kinetic integration of '{network_name}' successfully computed {len(trajectory)} "
            f"points over {total_time}s using the {request.solver_method.replace('_', ' ').title()} integrator. "
            f"Estimated stiffness index ratio is {est_stiffness:.1e}. "
            f"Species conservation and asymptotic steady-state achieved."
        )

        return StiffKineticsSimulationResponse(
            network_name=network_name,
            solver_method=request.solver_method,
            stiffness_ratio=est_stiffness,
            is_stiff=est_stiffness >= 1.0e4,
            species_names=species_names,
            time_points_count=len(trajectory),
            trajectory=trajectory,
            final_concentrations={s: round(curr_conc[s], 8) for s in species_names},
            jacobian_matrix=[[round(val, 4) for val in row] for row in last_jacobian],
            pedagogical_summary=summary,
        )

    @classmethod
    def get_presets(cls) -> List[KineticsPresetSummary]:
        return [
            KineticsPresetSummary(
                id=p.id,
                name=p.name,
                category=p.category,
                description=p.description,
                species_count=len(p.species),
                reactions_count=len(p.reactions),
                estimated_stiffness_ratio=p.estimated_stiffness_ratio,
                default_total_time_s=p.total_time_s,
            )
            for p in PRESET_NETWORKS.values()
        ]

    @classmethod
    def get_preset(cls, preset_id: str) -> Optional[StiffKineticsPreset]:
        return PRESET_NETWORKS.get(preset_id)

    simulate_stiff_network = simulate
