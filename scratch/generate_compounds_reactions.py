"""
Script to generate standard chemical compounds and reactions databases.
"""
import json
import os

compounds_data = [
    {
        "id": "comp-h2o", "name": "Water", "formula": "H2O", "molecular_mass": 18.015,
        "synonyms": ["Dihydrogen monoxide", "Oxidane", "Aqua"],
        "compound_class": "oxide", "elements": ["H", "O"], "charge": 0, "physical_state": "liquid",
        "description": "Essential chemical compound for life, neutral pH solvent.",
        "iupac_name": "Oxidane", "cas_number": "7732-18-5", "pubchem_id": 962,
        "density": 1.0, "melting_point": 273.15, "boiling_point": 373.15, "solubility": "Miscible in all proportions"
    },
    {
        "id": "comp-co2", "name": "Carbon Dioxide", "formula": "CO2", "molecular_mass": 44.009,
        "synonyms": ["Carbonic acid gas", "Dry ice"],
        "compound_class": "oxide", "elements": ["C", "O"], "charge": 0, "physical_state": "gas",
        "description": "Colorless gas formed during combustion and cellular respiration.",
        "iupac_name": "Carbon dioxide", "cas_number": "124-38-9", "pubchem_id": 280,
        "density": 0.001977, "melting_point": 194.7, "boiling_point": 216.6, "solubility": "1.45 g/L at 25 °C"
    },
    {
        "id": "comp-nacl", "name": "Sodium Chloride", "formula": "NaCl", "molecular_mass": 58.44,
        "synonyms": ["Table salt", "Halite"],
        "compound_class": "salt", "elements": ["Na", "Cl"], "charge": 0, "physical_state": "solid",
        "description": "Ionic crystal compound essential for animal physiology.",
        "iupac_name": "Sodium chloride", "cas_number": "7647-14-5", "pubchem_id": 5234,
        "density": 2.165, "melting_point": 1074.15, "boiling_point": 1738.15, "solubility": "360 g/L in water"
    },
    {
        "id": "comp-ch4", "name": "Methane", "formula": "CH4", "molecular_mass": 16.04,
        "synonyms": ["Marsh gas", "Natural gas component"],
        "compound_class": "alkane", "elements": ["C", "H"], "charge": 0, "physical_state": "gas",
        "description": "Simplest hydrocarbon and primary component of natural gas.",
        "iupac_name": "Methane", "cas_number": "74-82-8", "pubchem_id": 297,
        "density": 0.000656, "melting_point": 90.7, "boiling_point": 111.6, "solubility": "22.7 mg/L in water"
    },
    {
        "id": "comp-c2h5oh", "name": "Ethanol", "formula": "C2H5OH", "molecular_mass": 46.069,
        "synonyms": ["Ethyl alcohol", "Grain alcohol"],
        "compound_class": "alcohol", "elements": ["C", "H", "O"], "charge": 0, "physical_state": "liquid",
        "description": "Volatile, flammable liquid used in beverages, solvents, and fuel.",
        "iupac_name": "Ethanol", "cas_number": "64-17-5", "pubchem_id": 702,
        "density": 0.789, "melting_point": 158.8, "boiling_point": 351.44, "solubility": "Miscible in water"
    },
    {
        "id": "comp-caoh2", "name": "Calcium Hydroxide", "formula": "Ca(OH)2", "molecular_mass": 74.093,
        "synonyms": ["Slaked lime", "Pickling lime"],
        "compound_class": "base", "elements": ["Ca", "O", "H"], "charge": 0, "physical_state": "solid",
        "description": "Colorless crystal or white powder obtained when quicklime is mixed with water.",
        "iupac_name": "Calcium hydroxide", "cas_number": "1305-62-0", "pubchem_id": 14777,
        "density": 2.211, "melting_point": 853.0, "boiling_point": None, "solubility": "1.73 g/L at 20 °C"
    },
    {
        "id": "comp-al2so43", "name": "Aluminum Sulfate", "formula": "Al2(SO4)3", "molecular_mass": 342.15,
        "synonyms": ["Alum", "Filter alum"],
        "compound_class": "salt", "elements": ["Al", "S", "O"], "charge": 0, "physical_state": "solid",
        "description": "Chemical agent used as a coagulant in water treatment plants.",
        "iupac_name": "Dialuminum trisulfate", "cas_number": "10043-01-3", "pubchem_id": 24850,
        "density": 2.672, "melting_point": 1043.0, "boiling_point": None, "solubility": "364 g/L at 20 °C"
    },
    {
        "id": "comp-feno33", "name": "Iron(III) Nitrate", "formula": "Fe(NO3)3", "molecular_mass": 241.86,
        "synonyms": ["Ferric nitrate"],
        "compound_class": "salt", "elements": ["Fe", "N", "O"], "charge": 0, "physical_state": "solid",
        "description": "Hygroscopic compound used as a catalyst and mordant in dyeing.",
        "iupac_name": "Iron(3+) trinitrate", "cas_number": "10421-48-4", "pubchem_id": 25251,
        "density": 1.68, "melting_point": 320.3, "boiling_point": None, "solubility": "Highly soluble"
    },
    {
        "id": "comp-nh42so4", "name": "Ammonium Sulfate", "formula": "(NH4)2SO4", "molecular_mass": 132.14,
        "synonyms": ["Mascagnite", "Diammonium sulfate"],
        "compound_class": "salt", "elements": ["N", "H", "S", "O"], "charge": 0, "physical_state": "solid",
        "description": "Inorganic salt with high nitrogen content, widely used as soil fertilizer.",
        "iupac_name": "Diazanium sulfate", "cas_number": "7783-20-2", "pubchem_id": 24538,
        "density": 1.77, "melting_point": 508.0, "boiling_point": None, "solubility": "764 g/L at 20 °C"
    },
    {
        "id": "comp-ca3po42", "name": "Calcium Phosphate", "formula": "Ca3(PO4)2", "molecular_mass": 310.18,
        "synonyms": ["Tricalcium phosphate", "Bone ash"],
        "compound_class": "salt", "elements": ["Ca", "P", "O"], "charge": 0, "physical_state": "solid",
        "description": "Main mineral component of bone and tooth enamel.",
        "iupac_name": "Tricalcium bis(phosphate)", "cas_number": "7758-87-4", "pubchem_id": 24456,
        "density": 3.14, "melting_point": 1943.0, "boiling_point": None, "solubility": "Insoluble in water"
    },
    {
        "id": "comp-h2so4", "name": "Sulfuric Acid", "formula": "H2SO4", "molecular_mass": 98.079,
        "synonyms": ["Oil of vitriol", "Hydrogen sulfate"],
        "compound_class": "acid", "elements": ["H", "S", "O"], "charge": 0, "physical_state": "liquid",
        "description": "Strong mineral acid widely produced for industrial applications and fertilizers.",
        "iupac_name": "Sulfuric acid", "cas_number": "7664-93-9", "pubchem_id": 1118,
        "density": 1.83, "melting_point": 283.46, "boiling_point": 610.0, "solubility": "Miscible in water"
    },
    {
        "id": "comp-hcl", "name": "Hydrochloric Acid", "formula": "HCl", "molecular_mass": 36.46,
        "synonyms": ["Muriatic acid", "Hydrogen chloride"],
        "compound_class": "acid", "elements": ["H", "Cl"], "charge": 0, "physical_state": "liquid",
        "description": "Strong monoprotic mineral acid, primary component of stomach gastric acid.",
        "iupac_name": "Chlorane", "cas_number": "7647-01-0", "pubchem_id": 313,
        "density": 1.19, "melting_point": 243.0, "boiling_point": 321.0, "solubility": "Soluble in water"
    },
    {
        "id": "comp-naoh", "name": "Sodium Hydroxide", "formula": "NaOH", "molecular_mass": 39.997,
        "synonyms": ["Lye", "Caustic soda"],
        "compound_class": "base", "elements": ["Na", "O", "H"], "charge": 0, "physical_state": "solid",
        "description": "Strong metallic base used in soap making, paper manufacturing, and drain cleaners.",
        "iupac_name": "Sodium hydroxide", "cas_number": "1310-73-2", "pubchem_id": 14798,
        "density": 2.13, "melting_point": 591.0, "boiling_point": 1661.0, "solubility": "1000 g/L at 25 °C"
    },
    {
        "id": "comp-nh3", "name": "Ammonia", "formula": "NH3", "molecular_mass": 17.031,
        "synonyms": ["Azane", "Hydrogen nitride"],
        "compound_class": "base", "elements": ["N", "H"], "charge": 0, "physical_state": "gas",
        "description": "Pungent gas produced via Haber-Bosch process for fertilizer production.",
        "iupac_name": "Azane", "cas_number": "7664-41-7", "pubchem_id": 222,
        "density": 0.00073, "melting_point": 195.42, "boiling_point": 239.81, "solubility": "531 g/L at 20 °C"
    },
    {
        "id": "comp-c6h12o6", "name": "Glucose", "formula": "C6H12O6", "molecular_mass": 180.156,
        "synonyms": ["D-Glucose", "Dextrose", "Grape sugar"],
        "compound_class": "carbohydrate", "elements": ["C", "H", "O"], "charge": 0, "physical_state": "solid",
        "description": "Primary monosaccharide energy source in biological metabolism.",
        "iupac_name": "(2R,3S,4R,5R)-2,3,4,5,6-Pentahydroxyhexanal", "cas_number": "50-99-7", "pubchem_id": 5793,
        "density": 1.54, "melting_point": 419.0, "boiling_point": None, "solubility": "910 g/L at 20 °C"
    },
]

reactions_data = [
    {
        "id": "rxn-water-synth",
        "raw_equation": "2H2 + O2 -> 2H2O",
        "name": "Water Synthesis",
        "type": "synthesis",
        "reactants": ["H2", "O2"],
        "products": ["H2O"],
        "description": "Combustion of hydrogen gas with oxygen to produce water."
    },
    {
        "id": "rxn-methane-combustion",
        "raw_equation": "CH4 + 2O2 -> CO2 + 2H2O",
        "name": "Methane Combustion",
        "type": "combustion",
        "reactants": ["CH4", "O2"],
        "products": ["CO2", "H2O"],
        "description": "Complete combustion of methane gas."
    },
    {
        "id": "rxn-rusting",
        "raw_equation": "4Fe + 3O2 -> 2Fe2O3",
        "name": "Iron Rusting",
        "type": "synthesis",
        "reactants": ["Fe", "O2"],
        "products": ["Fe2O3"],
        "description": "Oxidation of iron forming ferric oxide."
    },
    {
        "id": "rxn-salt-synth",
        "raw_equation": "2Na + Cl2 -> 2NaCl",
        "name": "Sodium Chloride Synthesis",
        "type": "synthesis",
        "reactants": ["Na", "Cl2"],
        "products": ["NaCl"],
        "description": "Exothermic synthesis of table salt."
    },
    {
        "id": "rxn-propane-combustion",
        "raw_equation": "C3H8 + 5O2 -> 3CO2 + 4H2O",
        "name": "Propane Combustion",
        "type": "combustion",
        "reactants": ["C3H8", "O2"],
        "products": ["CO2", "H2O"],
        "description": "Combustion of propane gas."
    },
    {
        "id": "rxn-aluminum-oxide",
        "raw_equation": "4Al + 3O2 -> 2Al2O3",
        "name": "Aluminum Oxidation",
        "type": "synthesis",
        "reactants": ["Al", "O2"],
        "products": ["Al2O3"],
        "description": "Oxidation of aluminum metal forming alumina."
    },
    {
        "id": "rxn-acid-base-neutralization",
        "raw_equation": "HCl + NaOH -> NaCl + H2O",
        "name": "Acid-Base Neutralization",
        "type": "acid_base",
        "reactants": ["HCl", "NaOH"],
        "products": ["NaCl", "H2O"],
        "description": "Neutralization of hydrochloric acid with sodium hydroxide."
    }
]

comp_dir = os.path.join("services", "chemistry", "app", "data", "compounds")
rxn_dir = os.path.join("services", "chemistry", "app", "data", "reactions")
os.makedirs(comp_dir, exist_ok=True)
os.makedirs(rxn_dir, exist_ok=True)

with open(os.path.join(comp_dir, "compounds.json"), "w", encoding="utf-8") as f:
    json.dump(compounds_data, f, indent=2)

with open(os.path.join(rxn_dir, "reactions.json"), "w", encoding="utf-8") as f:
    json.dump(reactions_data, f, indent=2)

print("Successfully generated compounds.json and reactions.json!")
