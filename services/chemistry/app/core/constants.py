"""
Scientific Constants and Enums for the Chemistry Engine.
"""

AVOGADRO_NUMBER = 6.02214076e23  # mol^-1
IDEAL_GAS_CONSTANT_R = 0.082057366  # L·atm/(mol·K)
STANDARD_TEMPERATURE_K = 273.15  # K (0 °C)
STANDARD_PRESSURE_ATM = 1.0  # atm
MOLAR_VOLUME_STP = 22.414  # L/mol at STP

VALID_CATEGORIES = [
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
]

VALID_STATES_OF_MATTER = ["gas", "liquid", "solid", "aqueous", "unknown"]

VALID_BLOCKS = ["s", "p", "d", "f"]

SUPPORTED_MASS_UNITS = ["g", "kg", "mg"]
SUPPORTED_AMOUNT_UNITS = ["mol", "mmol"]
SUPPORTED_VOLUME_UNITS = ["L", "mL"]
SUPPORTED_CONCENTRATION_UNITS = ["M", "mM", "mol/L"]

REACTION_ARROWS = ["->", "→", "=", "<->", "⇄", "=>"]
