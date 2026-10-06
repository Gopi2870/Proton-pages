"""
Stoichiometry Engine for Molar Conversions, Limiting Reactants, Yields, and Solution Dilutions.
"""
from typing import List, Dict, Optional
from services.chemistry.app.models.stoichiometry import (
    ReactantAmountInput, ReactantBreakdown, ProductYieldBreakdown,
    LimitingReactantResult, TheoreticalYieldResult, PercentYieldResult,
    MolarityResult, DilutionResult
)
from services.chemistry.app.services.equation_balancer import equation_balancer
from services.chemistry.app.services.molecular_mass import molecular_mass_engine
from services.chemistry.app.core.units import convert_mass, convert_amount, convert_volume, convert_concentration
from services.chemistry.app.core.exceptions import InvalidStoichiometryError, UnsupportedChemistryOperationError


class StoichiometryEngine:
    """
    Deterministic stoichiometry engine.
    """

    @staticmethod
    def moles_from_mass(mass: float, molar_mass: float) -> float:
        if mass < 0:
            raise InvalidStoichiometryError("Mass cannot be negative")
        if molar_mass <= 0:
            raise InvalidStoichiometryError("Molar mass must be positive")
        return mass / molar_mass

    @staticmethod
    def mass_from_moles(moles: float, molar_mass: float) -> float:
        if moles < 0:
            raise InvalidStoichiometryError("Moles cannot be negative")
        if molar_mass <= 0:
            raise InvalidStoichiometryError("Molar mass must be positive")
        return moles * molar_mass

    @staticmethod
    def molarity(moles: float, volume_liters: float) -> MolarityResult:
        if moles < 0:
            raise InvalidStoichiometryError("Moles cannot be negative")
        if volume_liters <= 0:
            raise InvalidStoichiometryError("Volume must be greater than zero")
        M = moles / volume_liters
        return MolarityResult(moles=round(moles, 6), volume_liters=round(volume_liters, 6), molarity=round(M, 6))

    @staticmethod
    def calculate_limiting_reactant(
        equation: str,
        reactants_input: List[ReactantAmountInput]
    ) -> LimitingReactantResult:
        # Balance equation first
        balanced = equation_balancer.balance(equation)

        r_map = {sp.formula: sp for sp in balanced.reactants}
        p_map = {sp.formula: sp for sp in balanced.products}

        steps: List[str] = [f"Step 1: Balanced chemical equation -> {balanced.balanced_equation}"]

        reactants_breakdown: List[ReactantBreakdown] = []
        min_extent = float("inf")
        limiting_formula = ""

        # Calculate initial moles and reaction extent for each provided reactant
        for inp in reactants_input:
            if inp.formula not in r_map:
                raise InvalidStoichiometryError(
                    f"Reactant '{inp.formula}' is not in the balanced equation reactants ({list(r_map.keys())})"
                )

            sp = r_map[inp.formula]
            mm = molecular_mass_engine.calculate(inp.formula).molecular_mass

            # Convert input amount to moles
            if inp.unit in ("g", "kg", "mg"):
                mass_g = convert_mass(inp.amount, inp.unit, "g")
                moles_init = mass_g / mm
            elif inp.unit in ("mol", "mmol"):
                moles_init = convert_amount(inp.amount, inp.unit, "mol")
            else:
                raise InvalidStoichiometryError(f"Unsupported unit '{inp.unit}' for reactant quantity")

            extent = moles_init / sp.coefficient
            steps.append(
                f"Step 2: Convert {inp.amount} {inp.unit} of {inp.formula} to moles -> {moles_init:.4f} mol. "
                f"Reaction extent = {moles_init:.4f} / {sp.coefficient} = {extent:.4f} mol reaction."
            )

            if extent < min_extent:
                min_extent = extent
                limiting_formula = inp.formula

            reactants_breakdown.append(
                ReactantBreakdown(
                    formula=inp.formula,
                    initial_amount=inp.amount,
                    unit=inp.unit,
                    moles_initial=round(moles_init, 6),
                    stoichiometric_coefficient=sp.coefficient,
                    reaction_extent_moles=round(extent, 6),
                    is_limiting=False,
                    moles_consumed=0.0,
                    moles_remaining=0.0,
                    mass_remaining_g=0.0
                )
            )

        steps.append(f"Step 3: Identified limiting reactant -> {limiting_formula} (smallest extent: {min_extent:.4f} mol)")

        # Mark limiting reactant and compute consumed/remaining amounts
        final_reactants_breakdown: List[ReactantBreakdown] = []
        for rb in reactants_breakdown:
            is_lim = (rb.formula == limiting_formula)
            sp = r_map[rb.formula]
            mm = molecular_mass_engine.calculate(rb.formula).molecular_mass

            moles_consumed = min_extent * sp.coefficient
            moles_rem = max(0.0, rb.moles_initial - moles_consumed)
            mass_rem_g = moles_rem * mm

            final_reactants_breakdown.append(
                ReactantBreakdown(
                    formula=rb.formula,
                    initial_amount=rb.initial_amount,
                    unit=rb.unit,
                    moles_initial=rb.moles_initial,
                    stoichiometric_coefficient=rb.stoichiometric_coefficient,
                    reaction_extent_moles=rb.reaction_extent_moles,
                    is_limiting=is_lim,
                    moles_consumed=round(moles_consumed, 6),
                    moles_remaining=round(moles_rem, 6),
                    mass_remaining_g=round(mass_rem_g, 4)
                )
            )

        # Calculate theoretical product yields
        products_breakdown: List[ProductYieldBreakdown] = []
        for p_formula, p_sp in p_map.items():
            p_mm = molecular_mass_engine.calculate(p_formula).molecular_mass
            p_moles = min_extent * p_sp.coefficient
            p_grams = p_moles * p_mm

            steps.append(
                f"Step 4: Calculate theoretical yield for {p_formula} -> {min_extent:.4f} extent × {p_sp.coefficient} coeff = "
                f"{p_moles:.4f} mol = {p_grams:.4f} g (Molar Mass = {p_mm:.2f} g/mol)."
            )

            products_breakdown.append(
                ProductYieldBreakdown(
                    formula=p_formula,
                    stoichiometric_coefficient=p_sp.coefficient,
                    theoretical_yield_moles=round(p_moles, 6),
                    theoretical_yield_grams=round(p_grams, 4),
                    molar_mass=round(p_mm, 4)
                )
            )

        return LimitingReactantResult(
            balanced_equation=balanced.balanced_equation,
            limiting_reactant=limiting_formula,
            reactants_breakdown=final_reactants_breakdown,
            products_breakdown=products_breakdown,
            calculation_steps=steps
        )

    @staticmethod
    def calculate_theoretical_yield(
        equation: str,
        reactants_input: List[ReactantAmountInput],
        target_product: str
    ) -> TheoreticalYieldResult:
        lim_result = StoichiometryEngine.calculate_limiting_reactant(equation, reactants_input)

        target_pb = None
        for pb in lim_result.products_breakdown:
            if pb.formula == target_product:
                target_pb = pb
                break

        if not target_pb:
            raise InvalidStoichiometryError(
                f"Target product '{target_product}' not found in products of reaction."
            )

        return TheoreticalYieldResult(
            balanced_equation=lim_result.balanced_equation,
            limiting_reactant=lim_result.limiting_reactant,
            target_product=target_product,
            theoretical_yield_grams=target_pb.theoretical_yield_grams,
            theoretical_yield_moles=target_pb.theoretical_yield_moles,
            calculation_steps=lim_result.calculation_steps
        )

    @staticmethod
    def calculate_percent_yield(actual_yield_g: float, theoretical_yield_g: float) -> PercentYieldResult:
        if actual_yield_g < 0:
            raise InvalidStoichiometryError("Actual yield cannot be negative")
        if theoretical_yield_g <= 0:
            raise InvalidStoichiometryError("Theoretical yield must be greater than zero")

        pct = (actual_yield_g / theoretical_yield_g) * 100.0

        explanation = f"Percent yield = ({actual_yield_g:.4f} g actual / {theoretical_yield_g:.4f} g theoretical) × 100 = {pct:.2f}%"
        if pct > 100.0:
            explanation += " (Note: Percent yield > 100% indicates presence of impurities or unreacted water)."

        return PercentYieldResult(
            actual_yield_g=round(actual_yield_g, 4),
            theoretical_yield_g=round(theoretical_yield_g, 4),
            percent_yield=round(pct, 2),
            valid=True,
            explanation=explanation
        )

    @staticmethod
    def dilution(
        m1: Optional[float] = None,
        v1: Optional[float] = None,
        m2: Optional[float] = None,
        v2: Optional[float] = None
    ) -> DilutionResult:
        """
        Solves M1 * V1 = M2 * V2 for whichever single variable is None.
        """
        args = {"m1": m1, "v1": v1, "m2": m2, "v2": v2}
        none_keys = [k for k, v in args.items() if v is None]

        if len(none_keys) != 1:
            raise InvalidStoichiometryError(
                f"Dilution calculation requires exactly 3 known variables and 1 unknown (None). Provided unknowns: {none_keys}"
            )

        # Validation: non-negative values
        for k, v in args.items():
            if v is not None:
                if "v" in k and v <= 0:
                    raise InvalidStoichiometryError(f"Volume variable '{k}' must be greater than zero")
                if "m" in k and v < 0:
                    raise InvalidStoichiometryError(f"Concentration variable '{k}' cannot be negative")

        target = none_keys[0]
        solved_val = 0.0

        if target == "m1":
            solved_val = (m2 * v2) / v1
        elif target == "v1":
            if m1 == 0:
                raise InvalidStoichiometryError("Cannot divide by zero initial concentration (m1 = 0)")
            solved_val = (m2 * v2) / m1
        elif target == "m2":
            solved_val = (m1 * v1) / v2
        elif target == "v2":
            if m2 == 0:
                raise InvalidStoichiometryError("Cannot divide by zero final concentration (m2 = 0)")
            solved_val = (m1 * v1) / m2

        return DilutionResult(
            m1=round(m1 if m1 is not None else solved_val, 6),
            v1=round(v1 if v1 is not None else solved_val, 6),
            m2=round(m2 if m2 is not None else solved_val, 6),
            v2=round(v2 if v2 is not None else solved_val, 6),
            solved_variable=target,
            solved_value=round(solved_val, 6)
        )


stoichiometry_engine = StoichiometryEngine()
