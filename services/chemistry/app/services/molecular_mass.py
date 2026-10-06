"""
Molecular Mass Engine.
"""
from typing import Dict, List
from services.chemistry.app.models.formula import MolecularMassResult, ElementalContribution
from services.chemistry.app.services.formula_parser import parse_formula
from services.chemistry.app.services.element_service import element_service


class MolecularMassEngine:
    """
    Calculates deterministic molecular mass for chemical formulas.
    """

    @staticmethod
    def calculate(formula: str) -> MolecularMassResult:
        comp = parse_formula(formula)

        total_mass = 0.0
        contributions: List[ElementalContribution] = []

        # First pass: calculate individual totals
        elem_data: List[tuple] = []
        for symbol, count in comp.elements.items():
            element = element_service.get_element_by_symbol(symbol)
            elem_total = count * element.atomic_mass
            total_mass += elem_total
            elem_data.append((element, count, elem_total))

        # Second pass: calculate percentage contributions
        for element, count, elem_total in elem_data:
            pct = (elem_total / total_mass) * 100.0 if total_mass > 0 else 0.0
            contributions.append(
                ElementalContribution(
                    symbol=element.symbol,
                    name=element.name,
                    count=count,
                    atomic_mass=element.atomic_mass,
                    total_mass=round(elem_total, 4),
                    percentage=round(pct, 2)
                )
            )

        # Reconstruct normalized formula string
        normalized_parts = []
        for elem, count in comp.elements.items():
            if count == 1:
                normalized_parts.append(elem)
            else:
                normalized_parts.append(f"{elem}{count}")
        normalized_formula = "".join(normalized_parts)

        return MolecularMassResult(
            formula=formula,
            normalized_formula=normalized_formula,
            molecular_mass=round(total_mass, 4),
            unit="g/mol",
            elemental_contributions=contributions,
            total_atoms=comp.total_atoms
        )


molecular_mass_engine = MolecularMassEngine()
