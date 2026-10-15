"""
Script to generate standard 118 elements JSON database.
"""
import json
import os

elements_data = [
    # Period 1
    {
        "atomic_number": 1, "symbol": "H", "name": "Hydrogen", "atomic_mass": 1.008,
        "group": 1, "period": 1, "block": "s", "category": "nonmetal",
        "state_at_room_temperature": "gas", "electron_configuration": "1s1",
        "electronegativity": 2.20, "density": 0.00008988, "melting_point": 13.99, "boiling_point": 20.27,
        "oxidation_states": [1, -1], "valence_electrons": 1, "discovery_year": 1766,
        "discoverer": "Henry Cavendish", "common_uses": ["Water synthesis", "Rocket fuel", "Ammonia production"]
    },
    {
        "atomic_number": 2, "symbol": "He", "name": "Helium", "atomic_mass": 4.0026,
        "group": 18, "period": 1, "block": "s", "category": "noble_gas",
        "state_at_room_temperature": "gas", "electron_configuration": "1s2",
        "electronegativity": None, "density": 0.0001785, "melting_point": 0.95, "boiling_point": 4.22,
        "oxidation_states": [0], "valence_electrons": 2, "discovery_year": 1868,
        "discoverer": "Pierre Janssen, Norman Lockyer", "common_uses": ["Cryogenics", "Balloons", "Leak detection"]
    },
    # Period 2
    {
        "atomic_number": 3, "symbol": "Li", "name": "Lithium", "atomic_mass": 6.94,
        "group": 1, "period": 2, "block": "s", "category": "alkali_metal",
        "state_at_room_temperature": "solid", "electron_configuration": "[He] 2s1",
        "electronegativity": 0.98, "density": 0.534, "melting_point": 453.65, "boiling_point": 1603.0,
        "oxidation_states": [1], "valence_electrons": 1, "discovery_year": 1817,
        "discoverer": "Johan August Arfwedson", "common_uses": ["Batteries", "Greases", "Mood stabilizing medication"]
    },
    {
        "atomic_number": 4, "symbol": "Be", "name": "Beryllium", "atomic_mass": 9.0122,
        "group": 2, "period": 2, "block": "s", "category": "alkaline_earth_metal",
        "state_at_room_temperature": "solid", "electron_configuration": "[He] 2s2",
        "electronegativity": 1.57, "density": 1.85, "melting_point": 1560.0, "boiling_point": 2742.0,
        "oxidation_states": [2], "valence_electrons": 2, "discovery_year": 1798,
        "discoverer": "Louis-Nicolas Vauquelin", "common_uses": ["Aerospace alloys", "X-ray tube windows"]
    },
    {
        "atomic_number": 5, "symbol": "B", "name": "Boron", "atomic_mass": 10.81,
        "group": 13, "period": 2, "block": "p", "category": "metalloid",
        "state_at_room_temperature": "solid", "electron_configuration": "[He] 2s2 2p1",
        "electronegativity": 2.04, "density": 2.34, "melting_point": 2349.0, "boiling_point": 4200.0,
        "oxidation_states": [3], "valence_electrons": 3, "discovery_year": 1808,
        "discoverer": "Joseph Louis Gay-Lussac, Louis Jacques Thénard", "common_uses": ["Fiberglass", "Semiconductors", "Borosilicate glass"]
    },
    {
        "atomic_number": 6, "symbol": "C", "name": "Carbon", "atomic_mass": 12.011,
        "group": 14, "period": 2, "block": "p", "category": "nonmetal",
        "state_at_room_temperature": "solid", "electron_configuration": "[He] 2s2 2p2",
        "electronegativity": 2.55, "density": 2.267, "melting_point": 3823.0, "boiling_point": 4300.0,
        "oxidation_states": [4, 2, -4], "valence_electrons": 4, "discovery_year": None,
        "discoverer": "Ancient times", "common_uses": ["Steel production", "Organic chemistry foundation", "Graphite", "Diamonds"]
    },
    {
        "atomic_number": 7, "symbol": "N", "name": "Nitrogen", "atomic_mass": 14.007,
        "group": 15, "period": 2, "block": "p", "category": "reactive_nonmetal",
        "state_at_room_temperature": "gas", "electron_configuration": "[He] 2s2 2p3",
        "electronegativity": 3.04, "density": 0.0012506, "melting_point": 63.15, "boiling_point": 77.36,
        "oxidation_states": [5, 4, 3, 2, 1, -1, -2, -3], "valence_electrons": 5, "discovery_year": 1772,
        "discoverer": "Daniel Rutherford", "common_uses": ["Fertilizers", "Liquid refrigerant", "Inert atmosphere"]
    },
    {
        "atomic_number": 8, "symbol": "O", "name": "Oxygen", "atomic_mass": 15.999,
        "group": 16, "period": 2, "block": "p", "category": "reactive_nonmetal",
        "state_at_room_temperature": "gas", "electron_configuration": "[He] 2s2 2p4",
        "electronegativity": 3.44, "density": 0.001429, "melting_point": 54.36, "boiling_point": 90.20,
        "oxidation_states": [-2, -1], "valence_electrons": 6, "discovery_year": 1774,
        "discoverer": "Carl Wilhelm Scheele, Joseph Priestley", "common_uses": ["Respiration", "Steel manufacturing", "Rocket oxidizer"]
    },
    {
        "atomic_number": 9, "symbol": "F", "name": "Fluorine", "atomic_mass": 18.998,
        "group": 17, "period": 2, "block": "p", "category": "halogen",
        "state_at_room_temperature": "gas", "electron_configuration": "[He] 2s2 2p5",
        "electronegativity": 3.98, "density": 0.001696, "melting_point": 53.53, "boiling_point": 85.03,
        "oxidation_states": [-1], "valence_electrons": 7, "discovery_year": 1886,
        "discoverer": "Henri Moissan", "common_uses": ["Toothpaste fluoride", "Teflon", "Refrigerants"]
    },
    {
        "atomic_number": 10, "symbol": "Ne", "name": "Neon", "atomic_mass": 20.180,
        "group": 18, "period": 2, "block": "p", "category": "noble_gas",
        "state_at_room_temperature": "gas", "electron_configuration": "[He] 2s2 2p6",
        "electronegativity": None, "density": 0.0009002, "melting_point": 24.56, "boiling_point": 27.07,
        "oxidation_states": [0], "valence_electrons": 8, "discovery_year": 1898,
        "discoverer": "William Ramsay, Morris Travers", "common_uses": ["Neon signs", "High-voltage indicators", "Lasers"]
    },
    # Period 3
    {
        "atomic_number": 11, "symbol": "Na", "name": "Sodium", "atomic_mass": 22.990,
        "group": 1, "period": 3, "block": "s", "category": "alkali_metal",
        "state_at_room_temperature": "solid", "electron_configuration": "[Ne] 3s1",
        "electronegativity": 0.93, "density": 0.968, "melting_point": 370.87, "boiling_point": 1156.0,
        "oxidation_states": [1], "valence_electrons": 1, "discovery_year": 1807,
        "discoverer": "Humphry Davy", "common_uses": ["Table salt (NaCl)", "Street lighting", "Chemical synthesis"]
    },
    {
        "atomic_number": 12, "symbol": "Mg", "name": "Magnesium", "atomic_mass": 24.305,
        "group": 2, "period": 3, "block": "s", "category": "alkaline_earth_metal",
        "state_at_room_temperature": "solid", "electron_configuration": "[Ne] 3s2",
        "electronegativity": 1.31, "density": 1.738, "melting_point": 923.0, "boiling_point": 1363.0,
        "oxidation_states": [2], "valence_electrons": 2, "discovery_year": 1755,
        "discoverer": "Joseph Black", "common_uses": ["Lightweight alloys", "Fireworks", "Antacids"]
    },
    {
        "atomic_number": 13, "symbol": "Al", "name": "Aluminum", "atomic_mass": 26.982,
        "group": 13, "period": 3, "block": "p", "category": "post_transition_metal",
        "state_at_room_temperature": "solid", "electron_configuration": "[Ne] 3s2 3p1",
        "electronegativity": 1.61, "density": 2.70, "melting_point": 933.47, "boiling_point": 2792.0,
        "oxidation_states": [3], "valence_electrons": 3, "discovery_year": 1825,
        "discoverer": "Hans Christian Ørsted", "common_uses": ["Beverage cans", "Aircraft structures", "Foil packaging"]
    },
    {
        "atomic_number": 14, "symbol": "Si", "name": "Silicon", "atomic_mass": 28.085,
        "group": 14, "period": 3, "block": "p", "category": "metalloid",
        "state_at_room_temperature": "solid", "electron_configuration": "[Ne] 3s2 3p2",
        "electronegativity": 1.90, "density": 2.329, "melting_point": 1687.0, "boiling_point": 3538.0,
        "oxidation_states": [4, -4], "valence_electrons": 4, "discovery_year": 1824,
        "discoverer": "Jöns Jacob Berzelius", "common_uses": ["Microchips", "Solar cells", "Glassware", "Silicones"]
    },
    {
        "atomic_number": 15, "symbol": "P", "name": "Phosphorus", "atomic_mass": 30.974,
        "group": 15, "period": 3, "block": "p", "category": "reactive_nonmetal",
        "state_at_room_temperature": "solid", "electron_configuration": "[Ne] 3s2 3p3",
        "electronegativity": 2.19, "density": 1.823, "melting_point": 317.30, "boiling_point": 553.65,
        "oxidation_states": [5, 3, -3], "valence_electrons": 5, "discovery_year": 1669,
        "discoverer": "Hennig Brand", "common_uses": ["Fertilizers", "Safety matches", "DNA backbone"]
    },
    {
        "atomic_number": 16, "symbol": "S", "name": "Sulfur", "atomic_mass": 32.06,
        "group": 16, "period": 3, "block": "p", "category": "reactive_nonmetal",
        "state_at_room_temperature": "solid", "electron_configuration": "[Ne] 3s2 3p4",
        "electronegativity": 2.58, "density": 2.07, "melting_point": 388.36, "boiling_point": 717.87,
        "oxidation_states": [6, 4, 2, -2], "valence_electrons": 6, "discovery_year": None,
        "discoverer": "Ancient times", "common_uses": ["Sulfuric acid manufacture", "Vulcanizing rubber", "Gunpowder"]
    },
    {
        "atomic_number": 17, "symbol": "Cl", "name": "Chlorine", "atomic_mass": 35.45,
        "group": 17, "period": 3, "block": "p", "category": "halogen",
        "state_at_room_temperature": "gas", "electron_configuration": "[Ne] 3s2 3p5",
        "electronegativity": 3.16, "density": 0.003214, "melting_point": 171.6, "boiling_point": 239.11,
        "oxidation_states": [7, 5, 3, 1, -1], "valence_electrons": 7, "discovery_year": 1774,
        "discoverer": "Carl Wilhelm Scheele", "common_uses": ["Water purification", "Bleach", "PVC plastic"]
    },
    {
        "atomic_number": 18, "symbol": "Ar", "name": "Argon", "atomic_mass": 39.948,
        "group": 18, "period": 3, "block": "p", "category": "noble_gas",
        "state_at_room_temperature": "gas", "electron_configuration": "[Ne] 3s2 3p6",
        "electronegativity": None, "density": 0.001784, "melting_point": 83.80, "boiling_point": 87.30,
        "oxidation_states": [0], "valence_electrons": 8, "discovery_year": 1894,
        "discoverer": "Lord Rayleigh, William Ramsay", "common_uses": ["Inert gas shielding in welding", "Incandescent bulbs"]
    },
    # Period 4
    {
        "atomic_number": 19, "symbol": "K", "name": "Potassium", "atomic_mass": 39.098,
        "group": 1, "period": 4, "block": "s", "category": "alkali_metal",
        "state_at_room_temperature": "solid", "electron_configuration": "[Ar] 4s1",
        "electronegativity": 0.82, "density": 0.89, "melting_point": 336.53, "boiling_point": 1032.0,
        "oxidation_states": [1], "valence_electrons": 1, "discovery_year": 1807,
        "discoverer": "Humphry Davy", "common_uses": ["Agricultural fertilizers", "Soaps", "Biological ion channels"]
    },
    {
        "atomic_number": 20, "symbol": "Ca", "name": "Calcium", "atomic_mass": 40.078,
        "group": 2, "period": 4, "block": "s", "category": "alkaline_earth_metal",
        "state_at_room_temperature": "solid", "electron_configuration": "[Ar] 4s2",
        "electronegativity": 1.00, "density": 1.55, "melting_point": 1115.0, "boiling_point": 1757.0,
        "oxidation_states": [2], "valence_electrons": 2, "discovery_year": 1808,
        "discoverer": "Humphry Davy", "common_uses": ["Cement & concrete", "Bone structure", "Steel refining"]
    },
    {
        "atomic_number": 21, "symbol": "Sc", "name": "Scandium", "atomic_mass": 44.956,
        "group": 3, "period": 4, "block": "d", "category": "transition_metal",
        "state_at_room_temperature": "solid", "electron_configuration": "[Ar] 3d1 4s2",
        "electronegativity": 1.36, "density": 2.985, "melting_point": 1814.0, "boiling_point": 3109.0,
        "oxidation_states": [3], "valence_electrons": 3, "discovery_year": 1879,
        "discoverer": "Lars Fredrik Nilson", "common_uses": ["Aluminum-scandium alloys", "Stadium lighting"]
    },
    {
        "atomic_number": 22, "symbol": "Ti", "name": "Titanium", "atomic_mass": 47.867,
        "group": 4, "period": 4, "block": "d", "category": "transition_metal",
        "state_at_room_temperature": "solid", "electron_configuration": "[Ar] 3d2 4s2",
        "electronegativity": 1.54, "density": 4.506, "melting_point": 1941.0, "boiling_point": 3560.0,
        "oxidation_states": [4, 3], "valence_electrons": 4, "discovery_year": 1791,
        "discoverer": "William Gregor", "common_uses": ["Aerospace components", "Medical implants", "Titanium dioxide pigment"]
    },
    {
        "atomic_number": 23, "symbol": "V", "name": "Vanadium", "atomic_mass": 50.942,
        "group": 5, "period": 4, "block": "d", "category": "transition_metal",
        "state_at_room_temperature": "solid", "electron_configuration": "[Ar] 3d3 4s2",
        "electronegativity": 1.63, "density": 6.11, "melting_point": 2183.0, "boiling_point": 3680.0,
        "oxidation_states": [5, 4, 3, 2], "valence_electrons": 5, "discovery_year": 1801,
        "discoverer": "Andrés Manuel del Río", "common_uses": ["Steel strengthening", "Vanadium redox batteries", "Catalysts"]
    },
    {
        "atomic_number": 24, "symbol": "Cr", "name": "Chromium", "atomic_mass": 51.996,
        "group": 6, "period": 4, "block": "d", "category": "transition_metal",
        "state_at_room_temperature": "solid", "electron_configuration": "[Ar] 3d5 4s1",
        "electronegativity": 1.66, "density": 7.19, "melting_point": 2180.0, "boiling_point": 2944.0,
        "oxidation_states": [6, 3, 2], "valence_electrons": 6, "discovery_year": 1797,
        "discoverer": "Louis-Nicolas Vauquelin", "common_uses": ["Stainless steel", "Chrome plating", "Pigments"]
    },
    {
        "atomic_number": 25, "symbol": "Mn", "name": "Manganese", "atomic_mass": 54.938,
        "group": 7, "period": 4, "block": "d", "category": "transition_metal",
        "state_at_room_temperature": "solid", "electron_configuration": "[Ar] 3d5 4s2",
        "electronegativity": 1.55, "density": 7.21, "melting_point": 1519.0, "boiling_point": 2334.0,
        "oxidation_states": [7, 4, 3, 2], "valence_electrons": 7, "discovery_year": 1774,
        "discoverer": "Johan Gottlieb Gahn", "common_uses": ["Steelmaking", "Alkaline batteries", "Potassium permanganate oxidizer"]
    },
    {
        "atomic_number": 26, "symbol": "Fe", "name": "Iron", "atomic_mass": 55.845,
        "group": 8, "period": 4, "block": "d", "category": "transition_metal",
        "state_at_room_temperature": "solid", "electron_configuration": "[Ar] 3d6 4s2",
        "electronegativity": 1.83, "density": 7.874, "melting_point": 1811.0, "boiling_point": 3134.0,
        "oxidation_states": [3, 2], "valence_electrons": 8, "discovery_year": None,
        "discoverer": "Ancient times", "common_uses": ["Steel production", "Infrastructure", "Hemoglobin oxygen transport"]
    },
    {
        "atomic_number": 27, "symbol": "Co", "name": "Cobalt", "atomic_mass": 58.933,
        "group": 9, "period": 4, "block": "d", "category": "transition_metal",
        "state_at_room_temperature": "solid", "electron_configuration": "[Ar] 3d7 4s2",
        "electronegativity": 1.88, "density": 8.90, "melting_point": 1768.0, "boiling_point": 3200.0,
        "oxidation_states": [3, 2], "valence_electrons": 9, "discovery_year": 1735,
        "discoverer": "Georg Brandt", "common_uses": ["Lithium-ion batteries", "Superalloys", "Cobalt blue pigments"]
    },
    {
        "atomic_number": 28, "symbol": "Ni", "name": "Nickel", "atomic_mass": 58.693,
        "group": 10, "period": 4, "block": "d", "category": "transition_metal",
        "state_at_room_temperature": "solid", "electron_configuration": "[Ar] 3d8 4s2",
        "electronegativity": 1.91, "density": 8.908, "melting_point": 1728.0, "boiling_point": 3003.0,
        "oxidation_states": [2, 3], "valence_electrons": 10, "discovery_year": 1751,
        "discoverer": "Axel Fredrik Cronstedt", "common_uses": ["Stainless steel", "Rechargeable batteries", "Coins"]
    },
    {
        "atomic_number": 29, "symbol": "Cu", "name": "Copper", "atomic_mass": 63.546,
        "group": 11, "period": 4, "block": "d", "category": "transition_metal",
        "state_at_room_temperature": "solid", "electron_configuration": "[Ar] 3d10 4s1",
        "electronegativity": 1.90, "density": 8.96, "melting_point": 1357.77, "boiling_point": 2835.0,
        "oxidation_states": [2, 1], "valence_electrons": 11, "discovery_year": None,
        "discoverer": "Ancient times", "common_uses": ["Electrical wiring", "Plumbing", "Bronze/Brass alloys"]
    },
    {
        "atomic_number": 30, "symbol": "Zn", "name": "Zinc", "atomic_mass": 65.38,
        "group": 12, "period": 4, "block": "d", "category": "transition_metal",
        "state_at_room_temperature": "solid", "electron_configuration": "[Ar] 3d10 4s2",
        "electronegativity": 1.65, "density": 7.14, "melting_point": 692.68, "boiling_point": 1180.0,
        "oxidation_states": [2], "valence_electrons": 12, "discovery_year": 1746,
        "discoverer": "Andreas Sigismund Marggraf", "common_uses": ["Galvanizing steel", "Die-casting", "Brass alloy"]
    },
    {
        "atomic_number": 31, "symbol": "Ga", "name": "Gallium", "atomic_mass": 69.723,
        "group": 13, "period": 4, "block": "p", "category": "post_transition_metal",
        "state_at_room_temperature": "solid", "electron_configuration": "[Ar] 3d10 4s2 4p1",
        "electronegativity": 1.81, "density": 5.91, "melting_point": 302.91, "boiling_point": 2673.0,
        "oxidation_states": [3], "valence_electrons": 3, "discovery_year": 1875,
        "discoverer": "Paul-Émile Lecoq de Boisbaudran", "common_uses": ["Gallium arsenide semiconductors", "LEDs"]
    },
    {
        "atomic_number": 32, "symbol": "Ge", "name": "Germanium", "atomic_mass": 72.630,
        "group": 14, "period": 4, "block": "p", "category": "metalloid",
        "state_at_room_temperature": "solid", "electron_configuration": "[Ar] 3d10 4s2 4p2",
        "electronegativity": 2.01, "density": 5.323, "melting_point": 1211.40, "boiling_point": 3106.0,
        "oxidation_states": [4, 2], "valence_electrons": 4, "discovery_year": 1886,
        "discoverer": "Clemens Winkler", "common_uses": ["Fiber optics", "Infrared optics", "Transistors"]
    },
    {
        "atomic_number": 33, "symbol": "As", "name": "Arsenic", "atomic_mass": 74.922,
        "group": 15, "period": 4, "block": "p", "category": "metalloid",
        "state_at_room_temperature": "solid", "electron_configuration": "[Ar] 3d10 4s2 4p3",
        "electronegativity": 2.18, "density": 5.727, "melting_point": 1090.0, "boiling_point": 887.0,
        "oxidation_states": [5, 3, -3], "valence_electrons": 5, "discovery_year": 1250,
        "discoverer": "Albertus Magnus", "common_uses": ["Semiconductor dopant", "Wood preservatives", "Historical pesticides"]
    },
    {
        "atomic_number": 34, "symbol": "Se", "name": "Selenium", "atomic_mass": 78.971,
        "group": 16, "period": 4, "block": "p", "category": "reactive_nonmetal",
        "state_at_room_temperature": "solid", "electron_configuration": "[Ar] 3d10 4s2 4p4",
        "electronegativity": 2.55, "density": 4.81, "melting_point": 494.0, "boiling_point": 958.0,
        "oxidation_states": [6, 4, -2], "valence_electrons": 6, "discovery_year": 1817,
        "discoverer": "Jöns Jacob Berzelius", "common_uses": ["Photocells", "Glass tinting", "Dietary supplements"]
    },
    {
        "atomic_number": 35, "symbol": "Br", "name": "Bromine", "atomic_mass": 79.904,
        "group": 17, "period": 4, "block": "p", "category": "halogen",
        "state_at_room_temperature": "liquid", "electron_configuration": "[Ar] 3d10 4s2 4p5",
        "electronegativity": 2.96, "density": 3.1028, "melting_point": 265.8, "boiling_point": 332.0,
        "oxidation_states": [5, 3, 1, -1], "valence_electrons": 7, "discovery_year": 1826,
        "discoverer": "Antoine Jérôme Balard", "common_uses": ["Flame retardants", "Water treatment", "Pharmaceuticals"]
    },
    {
        "atomic_number": 36, "symbol": "Kr", "name": "Krypton", "atomic_mass": 83.798,
        "group": 18, "period": 4, "block": "p", "category": "noble_gas",
        "state_at_room_temperature": "gas", "electron_configuration": "[Ar] 3d10 4s2 4p6",
        "electronegativity": 3.00, "density": 0.003749, "melting_point": 115.79, "boiling_point": 119.93,
        "oxidation_states": [0, 2], "valence_electrons": 8, "discovery_year": 1898,
        "discoverer": "William Ramsay, Morris Travers", "common_uses": ["Insulated windows", "Flash photography", "Lasers"]
    },
]

# Standard metadata maps for elements 37-118
ELEM_37_118 = [
    (37, "Rb", "Rubidium", 85.468, 1, 5, "s", "alkali_metal", "solid", "[Kr] 5s1", 0.82),
    (38, "Sr", "Strontium", 87.62, 2, 5, "s", "alkaline_earth_metal", "solid", "[Kr] 5s2", 0.95),
    (39, "Y", "Yttrium", 88.906, 3, 5, "d", "transition_metal", "solid", "[Kr] 4d1 5s2", 1.22),
    (40, "Zr", "Zirconium", 91.224, 4, 5, "d", "transition_metal", "solid", "[Kr] 4d2 5s2", 1.33),
    (41, "Nb", "Niobium", 92.906, 5, 5, "d", "transition_metal", "solid", "[Kr] 4d4 5s1", 1.6),
    (42, "Mo", "Molybdenum", 95.95, 6, 5, "d", "transition_metal", "solid", "[Kr] 4d5 5s1", 2.16),
    (43, "Tc", "Technetium", 98, 7, 5, "d", "transition_metal", "solid", "[Kr] 4d5 5s2", 1.9),
    (44, "Ru", "Ruthenium", 101.07, 8, 5, "d", "transition_metal", "solid", "[Kr] 4d7 5s1", 2.2),
    (45, "Rh", "Rhodium", 102.91, 9, 5, "d", "transition_metal", "solid", "[Kr] 4d8 5s1", 2.28),
    (46, "Pd", "Palladium", 106.42, 10, 5, "d", "transition_metal", "solid", "[Kr] 4d10", 2.20),
    (47, "Ag", "Silver", 107.87, 11, 5, "d", "transition_metal", "solid", "[Kr] 4d10 5s1", 1.93),
    (48, "Cd", "Cadmium", 112.41, 12, 5, "d", "transition_metal", "solid", "[Kr] 4d10 5s2", 1.69),
    (49, "In", "Indium", 114.82, 13, 5, "p", "post_transition_metal", "solid", "[Kr] 4d10 5s2 5p1", 1.78),
    (50, "Sn", "Tin", 118.71, 14, 5, "p", "post_transition_metal", "solid", "[Kr] 4d10 5s2 5p2", 1.96),
    (51, "Sb", "Antimony", 121.76, 15, 5, "p", "metalloid", "solid", "[Kr] 4d10 5s2 5p3", 2.05),
    (52, "Te", "Tellurium", 127.60, 16, 5, "p", "metalloid", "solid", "[Kr] 4d10 5s2 5p4", 2.1),
    (53, "I", "Iodine", 126.90, 17, 5, "p", "halogen", "solid", "[Kr] 4d10 5s2 5p5", 2.66),
    (54, "Xe", "Xenon", 131.29, 18, 5, "p", "noble_gas", "gas", "[Kr] 4d10 5s2 5p6", 2.6),
    (55, "Cs", "Cesium", 132.91, 1, 6, "s", "alkali_metal", "solid", "[Xe] 6s1", 0.79),
    (56, "Ba", "Barium", 137.33, 2, 6, "s", "alkaline_earth_metal", "solid", "[Xe] 6s2", 0.89),
    (57, "La", "Lanthanum", 138.91, 3, 6, "f", "lanthanide", "solid", "[Xe] 5d1 6s2", 1.1),
    (58, "Ce", "Cerium", 140.12, None, 6, "f", "lanthanide", "solid", "[Xe] 4f1 5d1 6s2", 1.12),
    (59, "Pr", "Praseodymium", 140.91, None, 6, "f", "lanthanide", "solid", "[Xe] 4f3 6s2", 1.13),
    (60, "Nd", "Neodymium", 144.24, None, 6, "f", "lanthanide", "solid", "[Xe] 4f4 6s2", 1.14),
    (61, "Pm", "Promethium", 145, None, 6, "f", "lanthanide", "solid", "[Xe] 4f5 6s2", None),
    (62, "Sm", "Samarium", 150.36, None, 6, "f", "lanthanide", "solid", "[Xe] 4f6 6s2", 1.17),
    (63, "Eu", "Europium", 151.96, None, 6, "f", "lanthanide", "solid", "[Xe] 4f7 6s2", None),
    (64, "Gd", "Gadolinium", 157.25, None, 6, "f", "lanthanide", "solid", "[Xe] 4f7 5d1 6s2", 1.2),
    (65, "Tb", "Terbium", 158.93, None, 6, "f", "lanthanide", "solid", "[Xe] 4f9 6s2", None),
    (66, "Dy", "Dysprosium", 162.50, None, 6, "f", "lanthanide", "solid", "[Xe] 4f10 6s2", 1.22),
    (67, "Ho", "Holmium", 164.93, None, 6, "f", "lanthanide", "solid", "[Xe] 4f11 6s2", 1.23),
    (68, "Er", "Erbium", 167.26, None, 6, "f", "lanthanide", "solid", "[Xe] 4f12 6s2", 1.24),
    (69, "Tm", "Thulium", 168.93, None, 6, "f", "lanthanide", "solid", "[Xe] 4f13 6s2", 1.25),
    (70, "Yb", "Ytterbium", 173.05, None, 6, "f", "lanthanide", "solid", "[Xe] 4f14 6s2", None),
    (71, "Lu", "Lutetium", 174.97, 3, 6, "d", "lanthanide", "solid", "[Xe] 4f14 5d1 6s2", 1.27),
    (72, "Hf", "Hafnium", 178.49, 4, 6, "d", "transition_metal", "solid", "[Xe] 4f14 5d2 6s2", 1.3),
    (73, "Ta", "Tantalum", 180.95, 5, 6, "d", "transition_metal", "solid", "[Xe] 4f14 5d3 6s2", 1.5),
    (74, "W", "Tungsten", 183.84, 6, 6, "d", "transition_metal", "solid", "[Xe] 4f14 5d4 6s2", 2.36),
    (75, "Re", "Rhenium", 186.21, 7, 6, "d", "transition_metal", "solid", "[Xe] 4f14 5d5 6s2", 1.9),
    (76, "Os", "Osmium", 190.23, 8, 6, "d", "transition_metal", "solid", "[Xe] 4f14 5d6 6s2", 2.2),
    (77, "Ir", "Iridium", 192.22, 9, 6, "d", "transition_metal", "solid", "[Xe] 4f14 5d7 6s2", 2.2),
    (78, "Pt", "Platinum", 195.08, 10, 6, "d", "transition_metal", "solid", "[Xe] 4f14 5d9 6s1", 2.28),
    (79, "Au", "Gold", 196.97, 11, 6, "d", "transition_metal", "solid", "[Xe] 4f14 5d10 6s1", 2.54),
    (80, "Hg", "Mercury", 200.59, 12, 6, "d", "transition_metal", "liquid", "[Xe] 4f14 5d10 6s2", 2.0),
    (81, "Tl", "Thallium", 204.38, 13, 6, "p", "post_transition_metal", "solid", "[Xe] 4f14 5d10 6s2 6p1", 1.62),
    (82, "Pb", "Lead", 207.2, 14, 6, "p", "post_transition_metal", "solid", "[Xe] 4f14 5d10 6s2 6p2", 2.33),
    (83, "Bi", "Bismuth", 208.98, 15, 6, "p", "post_transition_metal", "solid", "[Xe] 4f14 5d10 6s2 6p3", 2.02),
    (84, "Po", "Polonium", 209, 16, 6, "p", "post_transition_metal", "solid", "[Xe] 4f14 5d10 6s2 6p4", 2.0),
    (85, "At", "Astatine", 210, 17, 6, "p", "metalloid", "solid", "[Xe] 4f14 5d10 6s2 6p5", 2.2),
    (86, "Rn", "Radon", 222, 18, 6, "p", "noble_gas", "gas", "[Xe] 4f14 5d10 6s2 6p6", None),
    (87, "Fr", "Francium", 223, 1, 7, "s", "alkali_metal", "solid", "[Rn] 7s1", 0.7),
    (88, "Ra", "Radium", 226, 2, 7, "s", "alkaline_earth_metal", "solid", "[Rn] 7s2", 0.9),
    (89, "Ac", "Actinium", 227, 3, 7, "f", "actinide", "solid", "[Rn] 6d1 7s2", 1.1),
    (90, "Th", "Thorium", 232.04, None, 7, "f", "actinide", "solid", "[Rn] 6d2 7s2", 1.3),
    (91, "Pa", "Protactinium", 231.04, None, 7, "f", "actinide", "solid", "[Rn] 5f2 6d1 7s2", 1.5),
    (92, "U", "Uranium", 238.03, None, 7, "f", "actinide", "solid", "[Rn] 5f3 6d1 7s2", 1.38),
    (93, "Np", "Neptunium", 237, None, 7, "f", "actinide", "solid", "[Rn] 5f4 6d1 7s2", 1.36),
    (94, "Pu", "Plutonium", 244, None, 7, "f", "actinide", "solid", "[Rn] 5f6 7s2", 1.28),
    (95, "Am", "Americium", 243, None, 7, "f", "actinide", "solid", "[Rn] 5f7 7s2", 1.3),
    (96, "Cm", "Curium", 247, None, 7, "f", "actinide", "solid", "[Rn] 5f7 6d1 7s2", 1.3),
    (97, "Bk", "Berkelium", 247, None, 7, "f", "actinide", "solid", "[Rn] 5f9 7s2", 1.3),
    (98, "Cf", "Californium", 251, None, 7, "f", "actinide", "solid", "[Rn] 5f10 7s2", 1.3),
    (99, "Es", "Einsteinium", 252, None, 7, "f", "actinide", "solid", "[Rn] 5f11 7s2", 1.3),
    (100, "Fm", "Fermium", 257, None, 7, "f", "actinide", "solid", "[Rn] 5f12 7s2", 1.3),
    (101, "Md", "Mendelevium", 258, None, 7, "f", "actinide", "solid", "[Rn] 5f13 7s2", 1.3),
    (102, "No", "Nobelium", 259, None, 7, "f", "actinide", "solid", "[Rn] 5f14 7s2", 1.3),
    (103, "Lr", "Lawrencium", 266, 3, 7, "d", "actinide", "solid", "[Rn] 5f14 7s2 7p1", 1.3),
    (104, "Rf", "Rutherfordium", 267, 4, 7, "d", "transition_metal", "solid", "[Rn] 5f14 6d2 7s2", None),
    (105, "Db", "Dubnium", 268, 5, 7, "d", "transition_metal", "solid", "[Rn] 5f14 6d3 7s2", None),
    (106, "Sg", "Seaborgium", 269, 6, 7, "d", "transition_metal", "solid", "[Rn] 5f14 6d4 7s2", None),
    (107, "Bh", "Bohrium", 270, 7, 7, "d", "transition_metal", "solid", "[Rn] 5f14 6d5 7s2", None),
    (108, "Hs", "Hassium", 277, 8, 7, "d", "transition_metal", "solid", "[Rn] 5f14 6d6 7s2", None),
    (109, "Mt", "Meitnerium", 278, 9, 7, "d", "transition_metal", "solid", "[Rn] 5f14 6d7 7s2", None),
    (110, "Ds", "Darmstadtium", 281, 10, 7, "d", "transition_metal", "solid", "[Rn] 5f14 6d8 7s2", None),
    (111, "Rg", "Roentgenium", 282, 11, 7, "d", "transition_metal", "solid", "[Rn] 5f14 6d9 7s2", None),
    (112, "Cn", "Copernicium", 285, 12, 7, "d", "transition_metal", "solid", "[Rn] 5f14 6d10 7s2", None),
    (113, "Nh", "Nihonium", 286, 13, 7, "p", "post_transition_metal", "solid", "[Rn] 5f14 6d10 7s2 7p1", None),
    (114, "Fl", "Flerovium", 289, 14, 7, "p", "post_transition_metal", "solid", "[Rn] 5f14 6d10 7s2 7p2", None),
    (115, "Mc", "Moscovium", 290, 15, 7, "p", "post_transition_metal", "solid", "[Rn] 5f14 6d10 7s2 7p3", None),
    (116, "Lv", "Livermorium", 293, 16, 7, "p", "post_transition_metal", "solid", "[Rn] 5f14 6d10 7s2 7p4", None),
    (117, "Ts", "Tennessine", 294, 17, 7, "p", "halogen", "solid", "[Rn] 5f14 6d10 7s2 7p5", None),
    (118, "Og", "Oganesson", 294, 18, 7, "p", "noble_gas", "gas", "[Rn] 5f14 6d10 7s2 7p6", None),
]

for z, sym, name, mass, grp, per, blk, cat, st, ec, en in ELEM_37_118:
    elements_data.append({
        "atomic_number": z, "symbol": sym, "name": name, "atomic_mass": float(mass),
        "group": grp, "period": per, "block": blk, "category": cat,
        "state_at_room_temperature": st, "electron_configuration": ec,
        "electronegativity": en, "density": None, "melting_point": None, "boiling_point": None,
        "oxidation_states": [], "valence_electrons": None, "discovery_year": None,
        "discoverer": None, "common_uses": []
    })

out_dir = os.path.join("services", "chemistry", "app", "data", "elements")
os.makedirs(out_dir, exist_ok=True)
out_file = os.path.join(out_dir, "elements.json")
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(elements_data, f, indent=2)

print(f"Successfully generated {len(elements_data)} elements into {out_file}")
