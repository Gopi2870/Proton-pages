"""
Compound Database and Resolution Service.
"""
import json
import os
from typing import List, Optional, Dict
from services.chemistry.app.models.compound import Compound
from services.chemistry.app.core.exceptions import CompoundNotFoundError


class CompoundService:
    """
    Service for querying chemical compounds by ID, name, formula, or synonym.
    """

    def __init__(self, data_path: Optional[str] = None):
        if data_path is None:
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            data_path = os.path.join(base_dir, "data", "compounds", "compounds.json")

        self._data_path = data_path
        self._compounds_by_id: Dict[str, Compound] = {}
        self._compounds_by_formula: Dict[str, Compound] = {}
        self._compounds_by_name: Dict[str, Compound] = {}
        self._compounds_list: List[Compound] = []
        self._load_data()

    def _load_data(self) -> None:
        if not os.path.exists(self._data_path):
            return

        with open(self._data_path, "r", encoding="utf-8") as f:
            raw_list = json.load(f)

        for item in raw_list:
            compound = Compound(**item)
            self._compounds_list.append(compound)
            self._compounds_by_id[compound.id] = compound
            self._compounds_by_formula[compound.formula.upper()] = compound
            self._compounds_by_name[compound.name.lower()] = compound
            for syn in compound.synonyms:
                self._compounds_by_name[syn.lower()] = compound

    def get_compound_by_id(self, compound_id: str) -> Compound:
        comp = self._compounds_by_id.get(compound_id)
        if not comp:
            raise CompoundNotFoundError(compound_id)
        return comp

    def get_compound_by_formula(self, formula: str) -> Compound:
        clean = formula.strip().upper()
        comp = self._compounds_by_formula.get(clean)
        if not comp:
            raise CompoundNotFoundError(formula)
        return comp

    def get_compound_by_name(self, name: str) -> Compound:
        clean = name.strip().lower()
        comp = self._compounds_by_name.get(clean)
        if not comp:
            raise CompoundNotFoundError(name)
        return comp

    def search_compounds(self, query: str) -> List[Compound]:
        q = query.strip().lower()
        if not q:
            return self._compounds_list

        results = []
        for comp in self._compounds_list:
            if (
                q in comp.name.lower()
                or q in comp.formula.lower()
                or q in comp.compound_class.lower()
                or any(q in syn.lower() for syn in comp.synonyms)
            ):
                results.append(comp)
        return results

    def list_compounds(self, skip: int = 0, limit: int = 50) -> List[Compound]:
        return self._compounds_list[skip : skip + limit]

    def filter_compounds_by_class(self, compound_class: str) -> List[Compound]:
        clean_cls = compound_class.strip().lower()
        return [c for c in self._compounds_list if c.compound_class.lower() == clean_cls]

    def filter_compounds_by_element(self, symbol: str) -> List[Compound]:
        sym = symbol.strip().upper()
        return [c for c in self._compounds_list if sym in c.elements]


# Global singleton instance
compound_service = CompoundService()
