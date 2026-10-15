"""
Unified Multi-Domain Chemistry Search Engine.
"""
from typing import Dict, List, Any
from services.chemistry.app.services.element_service import element_service
from services.chemistry.app.services.compound_service import compound_service
from services.chemistry.app.services.formula_validator import formula_validator


class ChemistrySearchEngine:
    """
    Unified search engine across elements, compounds, formulas, and reactions.
    """

    @staticmethod
    def search(query: str) -> Dict[str, Any]:
        clean_q = query.strip()
        if not clean_q:
            return {
                "query": query,
                "elements": [],
                "compounds": [],
                "formula_match": None,
                "total_results": 0
            }

        # 1. Search elements
        elements = element_service.search_elements(clean_q)

        # 2. Search compounds
        compounds = compound_service.search_compounds(clean_q)

        # 3. Try parsing formula if query looks like a formula
        formula_match = None
        val_result = formula_validator.validate(clean_q)
        if val_result.is_valid:
            formula_match = {
                "formula": val_result.formula,
                "normalized_formula": val_result.normalized_formula,
                "composition": val_result.composition.model_dump() if val_result.composition else None
            }

        total = len(elements) + len(compounds) + (1 if formula_match else 0)

        return {
            "query": query,
            "elements": [e.model_dump() for e in elements],
            "compounds": [c.model_dump() for c in compounds],
            "formula_match": formula_match,
            "total_results": total
        }


chemistry_search_engine = ChemistrySearchEngine()
