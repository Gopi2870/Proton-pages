"""Chemical Equilibrium, Buffer Capacity & Le Chatelier Perturbation Service.

Implements nonlinear RICE table solver, polyprotic acid-base equilibria,
van Slyke differential buffer capacity, solubility product (Ksp) with common-ion effect,
and Le Chatelier thermodynamic response simulations.
"""

import math
from typing import Dict, List, Optional, Tuple
from app.models.equilibrium import (
    EquilibriumSystemType,
    ShiftDirection,
    PerturbationType,
    ReactionParticipant,
    RiceTableRow,
    RiceTableResult,
    PolyproticSpeciesFraction,
    PolyproticEquilibriumResult,
    BufferCapacityPoint,
    BufferCapacityResult,
    SolubilityKspResult,
    LeChatelierPerturbationResult,
)
from app.schemas.equilibrium import (
    ReactionParticipantSchema,
    EquilibriumPresetSummary,
)

KW_WATER = 1.0e-14
R_GAS_CONSTANT = 8.314462  # J/(mol*K)


class EquilibriumService:
    """Scientific calculation service for chemical equilibrium and solution thermodynamics."""

    def __init__(self):
        self._le_chatelier_presets: Dict[str, dict] = self._initialize_le_chatelier_presets()

    def get_presets(self) -> List[EquilibriumPresetSummary]:
        """Return catalog of standard chemical equilibrium and Le Chatelier benchmark systems."""
        summaries = []
        for pid, data in self._le_chatelier_presets.items():
            summaries.append(
                EquilibriumPresetSummary(
                    id=pid,
                    title=data["title"],
                    system_type=data["system_type"],
                    equation=data["equation"],
                    default_k=data["default_k"],
                    delta_h_kj_mol=data.get("delta_h_kj_mol"),
                    description=data["description"],
                )
            )
        return summaries

    def solve_rice_table(
        self,
        equilibrium_constant_k: float,
        participants: List[ReactionParticipantSchema],
    ) -> RiceTableResult:
        """Solve ICE/RICE table for extent of reaction xi using monotonic bracketed root solving."""
        if equilibrium_constant_k <= 0:
            raise ValueError("Equilibrium constant K must be strictly positive.")

        reactants = [p for p in participants if not p.is_product]
        products = [p for p in participants if p.is_product]

        if not reactants or not products:
            raise ValueError("Reaction must include at least one reactant and one product.")

        # Compute initial reaction quotient Q0
        react_term = 1.0
        for r in reactants:
            react_term *= math.pow(max(0.0, r.initial_concentration), r.coefficient)

        prod_term = 1.0
        for p in products:
            prod_term *= math.pow(max(0.0, p.initial_concentration), p.coefficient)

        if react_term <= 1.0e-20:
            q0 = 1.0e20
        else:
            q0 = prod_term / react_term

        # Determine shift direction
        if abs(q0 - equilibrium_constant_k) / equilibrium_constant_k < 1.0e-6:
            shift_direction = ShiftDirection.AT_EQUILIBRIUM
        elif q0 < equilibrium_constant_k:
            shift_direction = ShiftDirection.FORWARD
        else:
            shift_direction = ShiftDirection.REVERSE

        # Determine physical bounds for extent of reaction xi:
        # For all reactants: [A]0 - a * xi >= 0  => xi <= [A]0 / a
        # For all products: [P]0 + c * xi >= 0  => xi >= - [P]0 / c
        xi_max = min(r.initial_concentration / float(r.coefficient) for r in reactants)
        xi_min = -min(p.initial_concentration / float(p.coefficient) for p in products)

        # Shrink interval slightly to avoid log(0)
        eps = 1.0e-9
        xi_low = xi_min + eps
        xi_high = xi_max - eps

        if xi_low >= xi_high:
            xi_sol = 0.0
            converged = True
            iterations = 0
            res_err = 0.0
        else:
            def log_quotient_diff(xi: float) -> float:
                p_prod = 0.0
                for prod in products:
                    conc = prod.initial_concentration + prod.coefficient * xi
                    p_prod += prod.coefficient * math.log(max(conc, 1.0e-15))

                r_prod = 0.0
                for react in reactants:
                    conc = react.initial_concentration - react.coefficient * xi
                    r_prod += react.coefficient * math.log(max(conc, 1.0e-15))

                return (p_prod - r_prod) - math.log(equilibrium_constant_k)

            # Bracketed bisection-secant root finder
            f_low = log_quotient_diff(xi_low)
            f_high = log_quotient_diff(xi_high)

            if f_low * f_high > 0:
                # Root is near one of the boundaries
                xi_sol = xi_low if abs(f_low) < abs(f_high) else xi_high
                converged = True
                iterations = 1
                res_err = abs(log_quotient_diff(xi_sol))
            else:
                a_bound = xi_low
                b_bound = xi_high
                iterations = 0
                converged = False
                xi_mid = 0.0

                while iterations < 100:
                    iterations += 1
                    xi_mid = 0.5 * (a_bound + b_bound)
                    f_mid = log_quotient_diff(xi_mid)

                    if abs(f_mid) < 1.0e-7 or (b_bound - a_bound) < 1.0e-9:
                        converged = True
                        break

                    if f_low * f_mid <= 0:
                        b_bound = xi_mid
                        f_high = f_mid
                    else:
                        a_bound = xi_mid
                        f_low = f_mid

                xi_sol = xi_mid
                res_err = abs(log_quotient_diff(xi_sol))

        # Build RICE table rows
        rows: List[RiceTableRow] = []
        for r in reactants:
            chg = -r.coefficient * xi_sol
            eq_conc = max(0.0, r.initial_concentration + chg)
            rows.append(
                RiceTableRow(
                    species_formula=r.formula,
                    species_name=r.name,
                    coefficient=r.coefficient,
                    is_product=False,
                    initial=round(r.initial_concentration, 5),
                    change=round(chg, 5),
                    equilibrium=round(eq_conc, 5),
                )
            )

        for p in products:
            chg = p.coefficient * xi_sol
            eq_conc = max(0.0, p.initial_concentration + chg)
            rows.append(
                RiceTableRow(
                    species_formula=p.formula,
                    species_name=p.name,
                    coefficient=p.coefficient,
                    is_product=True,
                    initial=round(p.initial_concentration, 5),
                    change=round(chg, 5),
                    equilibrium=round(eq_conc, 5),
                )
            )

        return RiceTableResult(
            equilibrium_constant_k=equilibrium_constant_k,
            reaction_quotient_q=round(q0, 5),
            shift_direction=shift_direction,
            extent_of_reaction_xi=round(xi_sol, 6),
            rows=rows,
            converged=converged,
            iterations=iterations,
            residual_error=round(res_err, 7),
        )

    def solve_polyprotic_acid(
        self,
        acid_name: str,
        acid_formula: str,
        total_concentration_ca: float,
        dissociation_constants_ka: List[float],
    ) -> PolyproticEquilibriumResult:
        """Solve polyprotic acid dissociation equilibria using exact electroneutrality and alpha-fractions."""
        c_a = max(1.0e-7, total_concentration_ca)
        ka = [k for k in dissociation_constants_ka if k > 0]
        n_protic = len(ka)

        if n_protic == 0:
            raise ValueError("At least one dissociation constant Ka must be provided.")

        def charge_balance_diff(h_conc: float) -> float:
            # Denominator D([H+]) = [H+]^N + Ka1*[H+]^(N-1) + ...
            d_val = math.pow(h_conc, n_protic)
            cum_k = 1.0
            powers_sum = 0.0

            for i, k_val in enumerate(ka):
                cum_k *= k_val
                term = cum_k * math.pow(h_conc, n_protic - 1 - i)
                d_val += term
                powers_sum += (i + 1) * term

            oh_conc = KW_WATER / max(h_conc, 1.0e-15)
            # Total negative charge from acid anions: C_a * powers_sum / D([H+])
            anion_charge = c_a * (powers_sum / max(d_val, 1.0e-30))
            # F([H+]) = [H+] - [OH-] - anion_charge = 0
            return h_conc - oh_conc - anion_charge

        # Bracket [H+] in [1e-14, 10.0]
        h_low = 1.0e-14
        h_high = min(10.0, c_a * 2.0 + 1.0)
        h_sol = 1.0e-7

        for _ in range(80):
            h_mid = 0.5 * (h_low + h_high)
            f_mid = charge_balance_diff(h_mid)

            if abs(f_mid) < 1.0e-11 or (h_high - h_low) < 1.0e-14:
                h_sol = h_mid
                break

            if f_mid < 0:
                h_low = h_mid
            else:
                h_high = h_mid

        h_sol = h_mid
        ph = -math.log10(max(h_sol, 1.0e-14))
        poh = 14.0 - ph
        oh_sol = KW_WATER / max(h_sol, 1.0e-15)

        # Calculate species fractions alpha_0, alpha_1, ...
        d_denom = math.pow(h_sol, n_protic)
        cum_k = 1.0
        terms = [d_denom]

        for i, k_val in enumerate(ka):
            cum_k *= k_val
            t = cum_k * math.pow(h_sol, n_protic - 1 - i)
            d_denom += t
            terms.append(t)

        fractions: List[PolyproticSpeciesFraction] = []
        for idx, term in enumerate(terms):
            alpha = term / max(d_denom, 1.0e-30)
            conc = c_a * alpha
            if idx == 0:
                spec_formula = acid_formula
            else:
                spec_formula = f"[{acid_formula} - {idx}H+]" if idx > 1 else f"[{acid_formula} - H+]"

            fractions.append(
                PolyproticSpeciesFraction(
                    species_formula=spec_formula,
                    charge=-idx,
                    fraction_alpha=round(alpha, 5),
                    equilibrium_concentration=round(conc, 6),
                )
            )

        return PolyproticEquilibriumResult(
            acid_name=acid_name,
            acid_formula=acid_formula,
            total_concentration_ca=c_a,
            ph=round(ph, 3),
            poh=round(poh, 3),
            h_plus_concentration=round(h_sol, 8),
            oh_minus_concentration=round(oh_sol, 8),
            dissociation_constants_ka=ka,
            species_fractions=fractions,
        )

    def solve_buffer_capacity(
        self,
        buffer_name: str,
        acid_component: str,
        base_component: str,
        pka: float,
        total_buffer_concentration_m: float,
        ratio_base_to_acid: float,
        added_strong_acid_m: float = 0.01,
        added_strong_base_m: float = 0.01,
    ) -> BufferCapacityResult:
        """Calculate buffer pH, exact van Slyke buffer capacity beta = dCb/dpH, and addition response."""
        ka = math.pow(10.0, -pka)
        c_tot = max(1.0e-5, total_buffer_concentration_m)
        ratio = max(0.01, min(100.0, ratio_base_to_acid))

        # Henderson-Hasselbalch approximation
        ph_hh = pka + math.log10(ratio)

        # Base and acid component initial concentrations
        cb = c_tot * (ratio / (1.0 + ratio))
        ca = c_tot * (1.0 / (1.0 + ratio))

        # Rigorous equilibrium pH solver: [H+]^2 + (Ka + Cb)[H+] - Ka*Ca = 0
        b_term = ka + cb
        c_term = -ka * ca
        disc = b_term * b_term - 4.0 * c_term
        h_rigorous = (-b_term + math.sqrt(disc)) / 2.0
        ph_rigorous = -math.log10(max(h_rigorous, 1.0e-14))

        # Van Slyke differential buffer capacity: beta = 2.303 * ([H+] + [OH-] + Ctot*Ka*[H+] / (Ka + [H+])^2)
        h_val = math.pow(10.0, -ph_rigorous)
        oh_val = KW_WATER / max(h_val, 1.0e-15)
        beta_buffer = (c_tot * ka * h_val) / math.pow(ka + h_val, 2)
        beta_total = 2.303 * (h_val + oh_val + beta_buffer)

        # Maximum buffer capacity occurs at pH == pKa where Ka*H/(Ka+H)^2 = 0.25
        beta_max = 2.303 * (0.25 * c_tot + 2.0 * math.sqrt(KW_WATER))

        # Response to addition of 0.01 M strong acid
        ca_post_acid = ca + added_strong_acid_m
        cb_post_acid = max(1.0e-5, cb - added_strong_acid_m)
        ph_post_acid = pka + math.log10(cb_post_acid / ca_post_acid)

        # Response to addition of 0.01 M strong base
        ca_post_base = max(1.0e-5, ca - added_strong_base_m)
        cb_post_base = cb + added_strong_base_m
        ph_post_base = pka + math.log10(cb_post_base / ca_post_base)

        # Generate buffer capacity curve beta(pH) across pH in [pKa - 2.5, pKa + 2.5]
        curve: List[BufferCapacityPoint] = []
        for i in range(51):
            curr_ph = (pka - 2.5) + (5.0 / 50.0) * i
            h_pt = math.pow(10.0, -curr_ph)
            oh_pt = KW_WATER / max(h_pt, 1.0e-15)
            beta_pt = 2.303 * (h_pt + oh_pt + (c_tot * ka * h_pt) / math.pow(ka + h_pt, 2))
            f_base = math.pow(10.0, curr_ph - pka) / (1.0 + math.pow(10.0, curr_ph - pka))

            curve.append(
                BufferCapacityPoint(
                    ph=round(curr_ph, 2),
                    buffer_capacity_beta=round(beta_pt, 5),
                    fraction_base=round(f_base, 4),
                )
            )

        return BufferCapacityResult(
            buffer_name=buffer_name,
            acid_component=acid_component,
            base_component=base_component,
            pka=round(pka, 3),
            total_buffer_concentration_m=round(c_tot, 4),
            ratio_base_to_acid=round(ratio, 3),
            henderson_hasselbalch_ph=round(ph_hh, 3),
            rigorous_equilibrium_ph=round(ph_rigorous, 3),
            van_slyke_buffer_capacity_beta=round(beta_total, 4),
            maximum_buffer_capacity=round(beta_max, 4),
            ph_after_acid_addition=round(ph_post_acid, 3),
            ph_after_base_addition=round(ph_post_base, 3),
            buffer_curve=curve,
        )

    def solve_solubility_ksp(
        self,
        salt_name: str,
        salt_formula: str,
        ksp_value: float,
        molar_mass_g_mol: float,
        cation_formula: str,
        cation_coefficient: int,
        anion_formula: str,
        anion_coefficient: int,
        common_ion_formula: Optional[str] = None,
        common_ion_concentration: float = 0.0,
    ) -> SolubilityKspResult:
        """Solve Ksp solubility equilibrium including common-ion effect and precipitation threshold."""
        m = max(1, cation_coefficient)
        x = max(1, anion_coefficient)
        ksp = max(1.0e-50, ksp_value)
        c_common = max(0.0, common_ion_concentration)

        # Check if common ion applies to cation or anion
        is_cation_common = common_ion_formula and (cation_formula in common_ion_formula or common_ion_formula in cation_formula)

        if c_common <= 1.0e-9 or not common_ion_formula:
            # Pure water solubility: Ksp = (m*S)^m * (x*S)^x = m^m * x^x * S^(m+x)
            power_total = m + x
            coeff_product = math.pow(m, m) * math.pow(x, x)
            s_molar = math.pow(ksp / coeff_product, 1.0 / power_total)
        else:
            # Common ion depression: (m*S + C_comm)^m * (x*S)^x = Ksp  (or vice-versa)
            def ion_product_diff(s_val: float) -> float:
                if is_cation_common:
                    cat_conc = m * s_val + c_common
                    an_conc = x * s_val
                else:
                    cat_conc = m * s_val
                    an_conc = x * s_val + c_common
                return (math.pow(cat_conc, m) * math.pow(an_conc, x)) - ksp

            # Bracket S in [1e-25, 10.0]
            s_low = 1.0e-25
            s_high = 10.0
            for _ in range(70):
                s_mid = 0.5 * (s_low + s_high)
                f_mid = ion_product_diff(s_mid)
                if abs(f_mid) < 1.0e-15 or (s_high - s_low) < 1.0e-16:
                    break
                if f_mid < 0:
                    s_low = s_mid
                else:
                    s_high = s_mid
            s_molar = s_mid

        s_mass = s_molar * molar_mass_g_mol

        # Ion product Qsp calculation for evaluation
        if is_cation_common:
            qsp = math.pow(m * s_molar + c_common, m) * math.pow(x * s_molar, x)
        elif common_ion_formula and c_common > 0:
            qsp = math.pow(m * s_molar, m) * math.pow(x * s_molar + c_common, x)
        else:
            qsp = math.pow(m * s_molar, m) * math.pow(x * s_molar, x)

        is_precip = qsp >= ksp * 0.999
        sat_state = "saturated" if abs(qsp - ksp) / ksp < 0.05 else ("supersaturated" if qsp > ksp else "unsaturated")

        return SolubilityKspResult(
            salt_name=salt_name,
            salt_formula=salt_formula,
            ksp_value=ksp_value,
            cation_formula=cation_formula,
            cation_coefficient=m,
            anion_formula=anion_formula,
            anion_coefficient=x,
            common_ion_formula=common_ion_formula,
            common_ion_concentration=round(c_common, 5),
            molar_solubility_mol_l=s_molar,
            mass_solubility_g_l=s_mass,
            ion_product_qsp=qsp,
            is_precipitate_formed=is_precip,
            saturation_state=sat_state,
        )

    def simulate_le_chatelier(
        self,
        preset_reaction_id: str,
        perturbation_type: PerturbationType,
        concentration_changes: Dict[str, float],
        pressure_multiplier: float = 1.0,
        temperature_k: float = 298.15,
    ) -> LeChatelierPerturbationResult:
        """Simulate Le Chatelier response to concentration spikes, pressure, and temperature perturbations."""
        if preset_reaction_id not in self._le_chatelier_presets:
            raise ValueError(f"Unknown Le Chatelier preset: {preset_reaction_id}")

        data = self._le_chatelier_presets[preset_reaction_id]
        dh_kj = data.get("delta_h_kj_mol", 0.0)
        delta_ng = data.get("delta_ng_gas", 0)
        t_ref_k = 298.15
        k_ref = data["default_k"]

        # Initial concentrations
        init_concs = dict(data["initial_concentrations"])
        participants: List[ReactionParticipantSchema] = [
            ReactionParticipantSchema(**p) for p in data["participants"]
        ]

        # 1. Determine perturbed equilibrium constant K(T) via van 't Hoff equation:
        # ln(K2 / K1) = - (Delta H / R) * (1/T2 - 1/T1)
        if perturbation_type == PerturbationType.TEMPERATURE_SHIFT:
            dh_j = dh_kj * 1000.0
            ln_k_ratio = -(dh_j / R_GAS_CONSTANT) * (1.0 / temperature_k - 1.0 / t_ref_k)
            perturbed_k = k_ref * math.exp(max(-30.0, min(30.0, ln_k_ratio)))
            pert_desc = f"Temperature shifted from {t_ref_k:.1f} K to {temperature_k:.1f} K."
        else:
            perturbed_k = k_ref

        # 2. Apply perturbation to concentrations
        perturbed_concs = dict(init_concs)

        if perturbation_type == PerturbationType.CONCENTRATION_SPIKE:
            pert_items = []
            for sp, delta_c in concentration_changes.items():
                if sp in perturbed_concs:
                    perturbed_concs[sp] = max(1.0e-5, perturbed_concs[sp] + delta_c)
                    sign = "+" if delta_c >= 0 else ""
                    pert_items.append(f"{sp} {sign}{delta_c} M")
            pert_desc = "Concentration perturbation: " + ", ".join(pert_items)

        elif perturbation_type == PerturbationType.PRESSURE_VOLUME:
            # Increasing pressure by factor P_mult decreases volume by 1/P_mult, scaling all gas concentrations by P_mult
            p_mult = max(0.05, pressure_multiplier)
            for sp in perturbed_concs:
                perturbed_concs[sp] = perturbed_concs[sp] * p_mult
            direction_note = "increased" if p_mult > 1.0 else "decreased"
            pert_desc = f"Total pressure {direction_note} by factor of {p_mult:.2f}x (volume scaled {1.0/p_mult:.2f}x)."

        # 3. Calculate perturbed reaction quotient Q
        react_term = 1.0
        prod_term = 1.0
        for p in participants:
            c = perturbed_concs.get(p.formula, p.initial_concentration)
            if p.is_product:
                prod_term *= math.pow(max(c, 1e-15), p.coefficient)
            else:
                react_term *= math.pow(max(c, 1e-15), p.coefficient)

        perturbed_q = prod_term / max(react_term, 1.0e-25)

        # Compare Q with perturbed K to determine Le Chatelier shift direction
        if abs(perturbed_q - perturbed_k) / perturbed_k < 1.0e-5:
            shift = ShiftDirection.AT_EQUILIBRIUM
        elif perturbed_q < perturbed_k:
            shift = ShiftDirection.FORWARD
        else:
            shift = ShiftDirection.REVERSE

        # 4. Re-equilibrate system using RICE solver
        new_participants = []
        for p in participants:
            new_participants.append(
                ReactionParticipantSchema(
                    formula=p.formula,
                    name=p.name,
                    coefficient=p.coefficient,
                    is_product=p.is_product,
                    initial_concentration=perturbed_concs.get(p.formula, p.initial_concentration),
                )
            )

        rice_res = self.solve_rice_table(perturbed_k, new_participants)
        new_eq_concs = {row.species_formula: row.equilibrium for row in rice_res.rows}

        # 5. Pedagogical explanation synthesis
        if perturbation_type == PerturbationType.TEMPERATURE_SHIFT:
            exo_endo = "exothermic (Delta H < 0)" if dh_kj < 0 else "endothermic (Delta H > 0)"
            if temperature_k > t_ref_k:
                shift_expl = (
                    "shifts left (reverse) to consume added heat."
                    if dh_kj < 0
                    else "shifts right (forward) to absorb added thermal energy."
                )
            else:
                shift_expl = (
                    "shifts right (forward) to replace released heat."
                    if dh_kj < 0
                    else "shifts left (reverse) as thermal energy is removed."
                )
            pedagogical = (
                f"The reaction is {exo_endo} with Delta H = {dh_kj} kJ/mol. "
                f"According to Le Chatelier's principle and the van 't Hoff equation, the system {shift_expl} "
                f"Equilibrium constant adjusted from K = {k_ref:.4g} to K = {perturbed_k:.4g}."
            )

        elif perturbation_type == PerturbationType.PRESSURE_VOLUME:
            if delta_ng == 0:
                pedagogical = (
                    f"Delta n_gas = 0 (equal moles of gas on both sides). "
                    f"A change in total pressure or volume alters all concentrations proportionally but does not change Q relative to K. "
                    f"The equilibrium position does not shift."
                )
            elif pressure_multiplier > 1.0:
                fewer_side = "products (forward)" if delta_ng < 0 else "reactants (reverse)"
                pedagogical = (
                    f"Delta n_gas = {delta_ng}. Increasing total pressure increases collision frequency and partial pressures. "
                    f"Le Chatelier's principle dictates the system shifts toward the side with fewer gas moles ({fewer_side}) to relieve pressure."
                )
            else:
                more_side = "reactants (reverse)" if delta_ng < 0 else "products (forward)"
                pedagogical = (
                    f"Delta n_gas = {delta_ng}. Decreasing total pressure causes the system to shift toward the side with more moles of gas ({more_side}) to restore pressure."
                )
        else:
            pedagogical = (
                f"Perturbation changed the reaction quotient to Q = {perturbed_q:.4g} while K = {perturbed_k:.4g}. "
                f"Because {'Q < K' if shift == ShiftDirection.FORWARD else 'Q > K'}, the system shifts {shift.value} to restore dynamic equilibrium."
            )

        return LeChatelierPerturbationResult(
            reaction_title=data["title"],
            equation_string=data["equation"],
            delta_h_standard_kj_mol=dh_kj,
            delta_ng_gas=delta_ng,
            perturbation_type=perturbation_type,
            perturbation_description=pert_desc,
            initial_k=k_ref,
            initial_q=k_ref,
            initial_shift=ShiftDirection.AT_EQUILIBRIUM,
            perturbed_k=round(perturbed_k, 5),
            perturbed_q=round(perturbed_q, 5),
            le_chatelier_shift=shift,
            initial_concentrations=init_concs,
            perturbed_concentrations=perturbed_concs,
            new_equilibrium_concentrations=new_eq_concs,
            pedagogical_explanation=pedagogical,
        )

    def _initialize_le_chatelier_presets(self) -> Dict[str, dict]:
        """Benchmark reactions for Le Chatelier perturbation experiments."""
        return {
            "haber_bosch": {
                "title": "Haber-Bosch Ammonia Synthesis",
                "system_type": EquilibriumSystemType.HOMOGENEOUS_GAS,
                "equation": "N2 (g) + 3 H2 (g) <=> 2 NH3 (g)",
                "default_k": 0.50,
                "delta_h_kj_mol": -92.2,
                "delta_ng_gas": -2,
                "description": "Exothermic high-pressure industrial synthesis of ammonia. High pressure favors ammonia formation while high temperature lowers K.",
                "initial_concentrations": {"N2": 1.0, "H2": 1.0, "NH3": 0.7071},
                "participants": [
                    {"formula": "N2", "name": "Nitrogen", "coefficient": 1, "is_product": False, "initial_concentration": 1.0},
                    {"formula": "H2", "name": "Hydrogen", "coefficient": 3, "is_product": False, "initial_concentration": 1.0},
                    {"formula": "NH3", "name": "Ammonia", "coefficient": 2, "is_product": True, "initial_concentration": 0.7071},
                ],
            },
            "no2_dimerization": {
                "title": "Nitrogen Dioxide Dimerization",
                "system_type": EquilibriumSystemType.HOMOGENEOUS_GAS,
                "equation": "2 NO2 (g) [Brown] <=> N2O4 (g) [Colorless]",
                "default_k": 8.8,
                "delta_h_kj_mol": -57.2,
                "delta_ng_gas": -1,
                "description": "Visual gas equilibrium between toxic brown nitrogen dioxide and colorless dinitrogen tetroxide.",
                "initial_concentrations": {"NO2": 0.20, "N2O4": 0.352},
                "participants": [
                    {"formula": "NO2", "name": "Nitrogen Dioxide", "coefficient": 2, "is_product": False, "initial_concentration": 0.20},
                    {"formula": "N2O4", "name": "Dinitrogen Tetroxide", "coefficient": 1, "is_product": True, "initial_concentration": 0.352},
                ],
            },
            "hi_synthesis": {
                "title": "Hydrogen Iodide Gas Equilibrium",
                "system_type": EquilibriumSystemType.HOMOGENEOUS_GAS,
                "equation": "H2 (g) + I2 (g) <=> 2 HI (g)",
                "default_k": 54.3,
                "delta_h_kj_mol": -9.48,
                "delta_ng_gas": 0,
                "description": "Classic textbook gas equilibrium with Delta n_gas = 0; pressure changes do not shift the equilibrium position.",
                "initial_concentrations": {"H2": 0.50, "I2": 0.50, "HI": 3.684},
                "participants": [
                    {"formula": "H2", "name": "Hydrogen", "coefficient": 1, "is_product": False, "initial_concentration": 0.50},
                    {"formula": "I2", "name": "Iodine", "coefficient": 1, "is_product": False, "initial_concentration": 0.50},
                    {"formula": "HI", "name": "Hydrogen Iodide", "coefficient": 2, "is_product": True, "initial_concentration": 3.684},
                ],
            },
            "cobalt_complex": {
                "title": "Cobalt Hexaaqua / Tetrachloro Complex Equilibrium",
                "system_type": EquilibriumSystemType.COBALT_COMPLEX,
                "equation": "[Co(H2O)6]2+ (aq) [Pink] + 4 Cl- (aq) <=> [CoCl4]2- (aq) [Blue] + 6 H2O (l)",
                "default_k": 0.05,
                "delta_h_kj_mol": 50.0,
                "delta_ng_gas": 0,
                "description": "Endothermic solution thermochromic equilibrium: heating or adding concentrated HCl shifts pink hexaaqua to deep blue tetrachlorocobaltate.",
                "initial_concentrations": {"Co(H2O)6": 0.05, "Cl-": 1.5, "CoCl4": 0.0126, "H2O": 1.0},
                "participants": [
                    {"formula": "Co(H2O)6", "name": "Hexaaquacobalt(II)", "coefficient": 1, "is_product": False, "initial_concentration": 0.05},
                    {"formula": "Cl-", "name": "Chloride Ion", "coefficient": 4, "is_product": False, "initial_concentration": 1.5},
                    {"formula": "CoCl4", "name": "Tetrachlorocobaltate(II)", "coefficient": 1, "is_product": True, "initial_concentration": 0.0126},
                ],
            },
        }


equilibrium_service = EquilibriumService()
