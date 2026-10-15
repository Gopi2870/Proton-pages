"""
Element Database Service.
"""
import json
import os
from typing import List, Optional, Dict
from services.chemistry.app.models.element import Element, ElementCategory, Block, StateOfMatter
from services.chemistry.app.core.exceptions import ElementNotFoundError


class ElementService:
    """
    Service providing fast, typed, case-insensitive access and search for the 118 chemical elements.
    """

    def __init__(self, data_path: Optional[str] = None):
        if data_path is None:
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            data_path = os.path.join(base_dir, "data", "elements", "elements.json")

        self._data_path = data_path
        self._elements_by_z: Dict[int, Element] = {}
        self._elements_by_symbol: Dict[str, Element] = {}
        self._elements_by_name: Dict[str, Element] = {}
        self._elements_list: List[Element] = []
        self._load_data()

    def _load_data(self) -> None:
        if not os.path.exists(self._data_path):
            raise RuntimeError(f"Element dataset not found at {self._data_path}")

        with open(self._data_path, "r", encoding="utf-8") as f:
            raw_list = json.load(f)

        for item in raw_list:
            element = Element(**item)
            self._elements_list.append(element)
            self._elements_by_z[element.atomic_number] = element
            self._elements_by_symbol[element.symbol.upper()] = element
            self._elements_by_name[element.name.lower()] = element

    def get_element_by_atomic_number(self, atomic_number: int) -> Element:
        element = self._elements_by_z.get(atomic_number)
        if not element:
            raise ElementNotFoundError(atomic_number)
        return element

    def get_element_by_symbol(self, symbol: str) -> Element:
        clean_symbol = symbol.strip().upper()
        element = self._elements_by_symbol.get(clean_symbol)
        if not element:
            raise ElementNotFoundError(symbol)
        return element

    def get_element_by_name(self, name: str) -> Element:
        clean_name = name.strip().lower()
        element = self._elements_by_name.get(clean_name)
        if not element:
            raise ElementNotFoundError(name)
        return element

    def get_element(self, identifier: str | int) -> Element:
        """
        Flexible resolution by Z (if int or numeric str), symbol, or name.
        """
        if isinstance(identifier, int):
            return self.get_element_by_atomic_number(identifier)

        clean = str(identifier).strip()
        if clean.isdigit():
            return self.get_element_by_atomic_number(int(clean))

        # Try symbol first, then name
        try:
            return self.get_element_by_symbol(clean)
        except ElementNotFoundError:
            return self.get_element_by_name(clean)

    def list_elements(self, skip: int = 0, limit: int = 118) -> List[Element]:
        return self._elements_list[skip : skip + limit]

    def search_elements(self, query: str) -> List[Element]:
        q = query.strip().lower()
        if not q:
            return self._elements_list

        results = []
        for elem in self._elements_list:
            if (
                q in elem.name.lower()
                or q == elem.symbol.lower()
                or q == str(elem.atomic_number)
                or q in elem.category.value.lower()
                or any(q in use.lower() for use in elem.common_uses)
            ):
                results.append(elem)
        return results

    def filter_elements_by_group(self, group: int) -> List[Element]:
        return [e for e in self._elements_list if e.group == group]

    def filter_elements_by_period(self, period: int) -> List[Element]:
        return [e for e in self._elements_list if e.period == period]

    def filter_elements_by_block(self, block: str | Block) -> List[Element]:
        b_val = block.value if isinstance(block, Block) else str(block).lower()
        return [e for e in self._elements_list if e.block.value == b_val]

    def filter_elements_by_category(self, category: str | ElementCategory) -> List[Element]:
        c_val = category.value if isinstance(category, ElementCategory) else str(category).lower()
        return [e for e in self._elements_list if e.category.value == c_val]


# Global singleton instance
element_service = ElementService()
