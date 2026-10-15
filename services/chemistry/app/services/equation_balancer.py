"""
Mathematical Chemical Equation Balancer using Rational Null-Space Matrix Inversion.
"""
from fractions import Fraction
from math import gcd
from functools import reduce
from typing import List, Dict, Tuple
from services.chemistry.app.models.reaction import BalancedReaction, ReactionSpecies
from services.chemistry.app.services.reaction_parser import reaction_parser
from services.chemistry.app.services.formula_parser import parse_formula
from services.chemistry.app.core.exceptions import InvalidReactionError, UnsupportedChemistryOperationError


class EquationBalancer:
    """
    Solves stoichiometric linear equations over exact rational numbers Q to produce
    the minimal integer coefficients for any valid chemical equation.
    """

    @staticmethod
    def balance(equation: str) -> BalancedReaction:
        parsed = reaction_parser.parse(equation)

        reactants = parsed.reactants
        products = parsed.products

        all_species = reactants + products
        num_reactants = len(reactants)
        num_products = len(products)
        total_species = num_reactants + num_products

        # Parse formula compositions for all species
        compositions: List[Dict[str, int]] = []
        for sp in all_species:
            comp = parse_formula(sp.formula)
            compositions.append(comp.elements)

        # Collect set of all distinct elements
        all_elements = sorted(list({elem for comp in compositions for elem in comp.keys()}))
        num_elements = len(all_elements)

        if num_elements == 0:
            raise InvalidReactionError(equation, "No chemical elements found in reaction species")

        # Build Stoichiometric Matrix M of size (num_elements x total_species)
        # Reactants columns have +count, Products columns have -count
        matrix: List[List[Fraction]] = []
        for elem in all_elements:
            row: List[Fraction] = []
            # Reactants
            for i in range(num_reactants):
                cnt = compositions[i].get(elem, 0)
                row.append(Fraction(cnt, 1))
            # Products
            for j in range(num_products):
                cnt = compositions[num_reactants + j].get(elem, 0)
                row.append(Fraction(-cnt, 1))
            matrix.append(row)

        # Solve M * c = 0 for c in Z^+ using Gaussian Elimination over Fraction
        coefficients = EquationBalancer._solve_nullspace(matrix, total_species, num_elements)

        if not coefficients or any(c <= 0 for c in coefficients):
            raise UnsupportedChemistryOperationError(
                "balance_equation",
                f"Equation '{equation}' cannot be balanced. No positive integer coefficient vector exists."
            )

        # Build balanced reaction species
        balanced_reactants: List[ReactionSpecies] = []
        for idx, sp in enumerate(reactants):
            balanced_reactants.append(
                ReactionSpecies(
                    coefficient=coefficients[idx],
                    formula=sp.formula,
                    state=sp.state,
                    charge=sp.charge
                )
            )

        balanced_products: List[ReactionSpecies] = []
        for idx, sp in enumerate(products):
            balanced_products.append(
                ReactionSpecies(
                    coefficient=coefficients[num_reactants + idx],
                    formula=sp.formula,
                    state=sp.state,
                    charge=sp.charge
                )
            )

        # Construct balanced equation string
        r_str = " + ".join(
            f"{sp.coefficient if sp.coefficient > 1 else ''}{sp.formula}{f'({sp.state})' if sp.state else ''}"
            for sp in balanced_reactants
        )
        p_str = " + ".join(
            f"{sp.coefficient if sp.coefficient > 1 else ''}{sp.formula}{f'({sp.state})' if sp.state else ''}"
            for sp in balanced_products
        )
        balanced_eq_str = f"{r_str} {parsed.arrow} {p_str}"

        return BalancedReaction(
            raw_equation=equation,
            balanced_equation=balanced_eq_str,
            reactants=balanced_reactants,
            products=balanced_products,
            is_balanced=True,
            coefficients=coefficients,
            species_list=[sp.formula for sp in all_species]
        )

    @staticmethod
    def _solve_nullspace(matrix: List[List[Fraction]], num_cols: int, num_rows: int) -> List[int]:
        """
        Computes the null space of a Fraction matrix and converts to minimal integer solution.
        """
        # Row echelon reduction
        A = [row[:] for row in matrix]
        pivot_cols: List[int] = []
        r = 0

        for c in range(num_cols):
            # Find pivot
            pivot_row = None
            for i in range(r, num_rows):
                if A[i][c] != 0:
                    pivot_row = i
                    break

            if pivot_row is None:
                continue

            # Swap pivot row
            A[r], A[pivot_row] = A[pivot_row], A[r]

            # Scale pivot row to 1
            pivot_val = A[r][c]
            for j in range(c, num_cols):
                A[r][j] /= pivot_val

            # Eliminate in other rows
            for i in range(num_rows):
                if i != r and A[i][c] != 0:
                    factor = A[i][c]
                    for j in range(c, num_cols):
                        A[i][j] -= factor * A[r][j]

            pivot_cols.append(c)
            r += 1

        free_cols = [c for c in range(num_cols) if c not in pivot_cols]

        if not free_cols:
            # Only trivial zero solution exists
            return []

        # Express pivot variables in terms of free variables
        # For simple chemical reactions, set free variable = 1 or search small integer free values
        # We find a free variable assignment that yields all positive pivot variables
        solution: List[Fraction] = [Fraction(0)] * num_cols

        # Assign 1 to free columns
        for fc in free_cols:
            solution[fc] = Fraction(1)

        # Express pivot variables
        for i, pc in enumerate(pivot_cols):
            val = Fraction(0)
            for fc in free_cols:
                val -= A[i][fc] * solution[fc]
            solution[pc] = val

        # If any component is negative, flip signs or try linear combinations
        if any(v < 0 for v in solution):
            solution = [-v for v in solution]

        if any(v <= 0 for v in solution):
            # Try setting free variables to positive integers
            best_sol = None
            for free_val in range(1, 100):
                candidate = [Fraction(0)] * num_cols
                for fc in free_cols:
                    candidate[fc] = Fraction(free_val)
                for i, pc in enumerate(pivot_cols):
                    v = Fraction(0)
                    for fc in free_cols:
                        v -= A[i][fc] * candidate[fc]
                    candidate[pc] = v

                if all(v > 0 for v in candidate):
                    best_sol = candidate
                    break
            if best_sol:
                solution = best_sol

        if any(v <= 0 for v in solution):
            return []

        # Find least common multiple (LCM) of denominators to convert Fractions to Integers
        denominators = [v.denominator for v in solution]
        lcm_val = reduce(lambda a, b: (a * b) // gcd(a, b), denominators, 1)

        int_coeffs = [int(v.numerator * (lcm_val // v.denominator)) for v in solution]

        # Divide by greatest common divisor (GCD) of all integer coefficients
        overall_gcd = reduce(gcd, int_coeffs)
        if overall_gcd > 1:
            int_coeffs = [c // overall_gcd for c in int_coeffs]

        return int_coeffs


equation_balancer = EquationBalancer()
