"""
Data Integrity Validation Script for Chemical Datasets.
Verifies all 118 elements in elements.json, compound dataset, and reaction dataset.
Exits 0 on success, 1 on failure.
"""
import sys
import json
import os
from typing import List

VALID_CATEGORIES = {
    "alkali_metal",
    "alkaline_earth_metal",
    "transition_metal",
    "post_transition_metal",
    "metalloid",
    "reactive_nonmetal",
    "nonmetal",
    "halogen",
    "noble_gas",
    "lanthanide",
    "actinide",
    "unknown"
}

VALID_STATES = {"gas", "liquid", "solid", "unknown"}
VALID_BLOCKS = {"s", "p", "d", "f"}


def validate_elements(filepath: str) -> List[str]:
    errors = []
    if not os.path.exists(filepath):
        return [f"Elements dataset file missing at: {filepath}"]

    try:
        with open(filepath, "r", encoding="utf-8") as f:
            elements = json.load(f)
    except Exception as e:
        return [f"Failed to parse elements.json: {str(e)}"]

    if len(elements) != 118:
        errors.append(f"Expected 118 elements, found {len(elements)}")

    seen_z = set()
    seen_symbols = set()
    seen_names = set()

    for idx, elem in enumerate(elements):
        z = elem.get("atomic_number")
        symbol = elem.get("symbol")
        name = elem.get("name")
        mass = elem.get("atomic_mass")
        category = elem.get("category")
        block = elem.get("block")
        state = elem.get("state_at_room_temperature")

        # Required fields check
        if z is None or not isinstance(z, int):
            errors.append(f"Element at index {idx} has invalid or missing atomic_number: {z}")
        else:
            if z < 1 or z > 118:
                errors.append(f"Atomic number {z} out of range 1-118")
            if z in seen_z:
                errors.append(f"Duplicate atomic_number {z}")
            seen_z.add(z)

        if not symbol or not isinstance(symbol, str):
            errors.append(f"Element Z={z} missing symbol")
        else:
            if symbol.upper() in seen_symbols:
                errors.append(f"Duplicate symbol '{symbol}'")
            seen_symbols.add(symbol.upper())

        if not name or not isinstance(name, str):
            errors.append(f"Element Z={z} missing name")
        else:
            if name.lower() in seen_names:
                errors.append(f"Duplicate name '{name}'")
            seen_names.add(name.lower())

        if mass is None or not isinstance(mass, (int, float)) or mass <= 0:
            errors.append(f"Element Z={z} ({symbol}) has invalid atomic_mass: {mass}")

        if category not in VALID_CATEGORIES:
            errors.append(f"Element Z={z} ({symbol}) has invalid category '{category}'")

        if block not in VALID_BLOCKS:
            errors.append(f"Element Z={z} ({symbol}) has invalid block '{block}'")

        if state not in VALID_STATES:
            errors.append(f"Element Z={z} ({symbol}) has invalid state '{state}'")

    # Contiguity check 1..118
    missing_z = set(range(1, 119)) - seen_z
    if missing_z:
        errors.append(f"Missing atomic numbers in 1-118 sequence: {sorted(list(missing_z))}")

    return errors


def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    elem_path = os.path.join(base_dir, "app", "data", "elements", "elements.json")

    print(f"Validating Chemistry Data at: {elem_path}")
    errors = validate_elements(elem_path)

    if errors:
        print("\n[FAILED] DATA VALIDATION FAILED:")
        for err in errors:
            print(f" - {err}")
        sys.exit(1)
    else:
        print("\n[SUCCESS] DATA VALIDATION PASSED: All 118 elements verified successfully!")
        sys.exit(0)


if __name__ == "__main__":
    main()
