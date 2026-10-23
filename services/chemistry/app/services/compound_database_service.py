"""
Comprehensive Chemical Compounds & Spectral Reference Database Service (PR #050).
Maintains an extensive curated registry of IUPAC chemical entities with thermochemical,
solubility, acid-base, and UV-Vis/FTIR/1H-NMR/13C-NMR spectroscopic parameters.
"""
import time
from typing import Dict, List, Optional
from app.models.compound_database import (
    DetailedCompound,
    SpectralPeakUv,
    SpectralBandIr,
    SpectralShiftNmr1H,
    SpectralShiftNmr13C,
    CompoundSearchResult,
)
from app.schemas.compound_database import (
    CompoundSearchRequest,
    SpectralMatchRequest,
    DatabaseStatsResponse,
)


def _build_curated_database() -> List[DetailedCompound]:
    compounds: List[DetailedCompound] = [
        # 1. Aspirin
        DetailedCompound(
            id="cmpd_aspirin",
            name="Aspirin",
            iupac_name="2-Acetyloxybenzoic acid",
            formula="C9H8O4",
            smiles="CC(=O)Oc1ccccc1C(=O)O",
            inchi="InChI=1S/C9H8O4/c1-6(10)13-8-5-3-2-4-7(8)9(11)12/h2-5H,1H3,(H,11,12)",
            inchi_key="BSYNRYMUTXBXSQ-UHFFFAOYSA-N",
            cas_number="50-78-2",
            molecular_weight=180.158,
            monoisotopic_mass=180.042,
            category="Pharmaceutical",
            subcategory="NSAID / Salicylate",
            physical_state_at_25c="Solid",
            melting_point_c=135.0,
            boiling_point_c=140.0,
            density_g_cm3=1.40,
            aqueous_solubility_g_l=3.3,
            log_p=1.19,
            pka_values=[3.5],
            delta_h_f_kj_mol=-758.0,
            entropy_s_j_mol_k=209.0,
            heat_capacity_cp_j_mol_k=230.0,
            delta_g_f_kj_mol=-602.0,
            uv_vis_peaks=[
                SpectralPeakUv(wavelength_nm=226.0, extinction_coeff_m_cm=8800.0, electronic_transition="pi -> pi* (aromatic)"),
                SpectralPeakUv(wavelength_nm=276.0, extinction_coeff_m_cm=1100.0, electronic_transition="n -> pi* (ester/acid C=O)"),
            ],
            ir_bands=[
                SpectralBandIr(wavenumber_cm1=1750.0, intensity="strong", vibrational_mode="Ester C=O stretch"),
                SpectralBandIr(wavenumber_cm1=1685.0, intensity="strong", vibrational_mode="Carboxylic acid C=O stretch"),
                SpectralBandIr(wavenumber_cm1=3000.0, intensity="broad", vibrational_mode="Carboxylic acid O-H stretch"),
                SpectralBandIr(wavenumber_cm1=1190.0, intensity="strong", vibrational_mode="C-O ester stretch"),
            ],
            nmr_1h_shifts=[
                SpectralShiftNmr1H(chemical_shift_ppm=2.35, multiplicity="s", integration=3, assignment="-OCOCH3 acetyl methyl"),
                SpectralShiftNmr1H(chemical_shift_ppm=7.15, multiplicity="d", integration=1, assignment="Aromatic C3-H"),
                SpectralShiftNmr1H(chemical_shift_ppm=7.36, multiplicity="t", integration=1, assignment="Aromatic C5-H"),
                SpectralShiftNmr1H(chemical_shift_ppm=7.62, multiplicity="t", integration=1, assignment="Aromatic C4-H"),
                SpectralShiftNmr1H(chemical_shift_ppm=8.12, multiplicity="d", integration=1, assignment="Aromatic C6-H ortho to -COOH"),
                SpectralShiftNmr1H(chemical_shift_ppm=11.20, multiplicity="s", integration=1, assignment="-COOH acidic proton"),
            ],
            nmr_13c_shifts=[
                SpectralShiftNmr13C(chemical_shift_ppm=20.9, carbon_type="CH3", assignment="Acetyl methyl carbon"),
                SpectralShiftNmr13C(chemical_shift_ppm=122.2, carbon_type="C_quat", assignment="Aromatic C1 carrying -COOH"),
                SpectralShiftNmr13C(chemical_shift_ppm=123.9, carbon_type="CH", assignment="Aromatic C3"),
                SpectralShiftNmr13C(chemical_shift_ppm=126.1, carbon_type="CH", assignment="Aromatic C5"),
                SpectralShiftNmr13C(chemical_shift_ppm=132.4, carbon_type="CH", assignment="Aromatic C6"),
                SpectralShiftNmr13C(chemical_shift_ppm=134.8, carbon_type="CH", assignment="Aromatic C4"),
                SpectralShiftNmr13C(chemical_shift_ppm=151.2, carbon_type="C_quat", assignment="Aromatic C2 carrying -OCOCH3"),
                SpectralShiftNmr13C(chemical_shift_ppm=169.8, carbon_type="C=O", assignment="Acetyl carbonyl carbon"),
                SpectralShiftNmr13C(chemical_shift_ppm=170.1, carbon_type="C=O", assignment="Carboxylic acid carbonyl"),
            ],
            safety_ghs_pictograms=["GHS07 (Exclamation Mark)"],
            hazard_statements=["H302: Harmful if swallowed"],
            description="Classic nonsteroidal anti-inflammatory drug (NSAID) and irreversible cyclooxygenase (COX-1/COX-2) inhibitor synthesized via salicylic acid acetylation.",
        ),

        # 2. Paracetamol / Acetaminophen
        DetailedCompound(
            id="cmpd_paracetamol",
            name="Paracetamol",
            iupac_name="N-(4-Hydroxyphenyl)acetamide",
            formula="C8H9NO2",
            smiles="CC(=O)Nc1ccc(O)cc1",
            inchi="InChI=1S/C8H9NO2/c1-6(10)9-7-2-4-8(11)5-3-7/h2-5,11H,1H3,(H,9,10)",
            inchi_key="RZVAJINKPMORJF-UHFFFAOYSA-N",
            cas_number="103-90-2",
            molecular_weight=151.163,
            monoisotopic_mass=151.063,
            category="Pharmaceutical",
            subcategory="Analgesic / Antipyretic",
            physical_state_at_25c="Solid",
            melting_point_c=169.0,
            boiling_point_c=420.0,
            density_g_cm3=1.26,
            aqueous_solubility_g_l=14.0,
            log_p=0.46,
            pka_values=[9.38],
            delta_h_f_kj_mol=-452.0,
            entropy_s_j_mol_k=195.0,
            heat_capacity_cp_j_mol_k=201.0,
            delta_g_f_kj_mol=-288.0,
            uv_vis_peaks=[
                SpectralPeakUv(wavelength_nm=243.0, extinction_coeff_m_cm=13800.0, electronic_transition="pi -> pi* (conjugated amide/phenol)"),
            ],
            ir_bands=[
                SpectralBandIr(wavenumber_cm1=3325.0, intensity="strong", vibrational_mode="Phenolic O-H stretch"),
                SpectralBandIr(wavenumber_cm1=3160.0, intensity="medium", vibrational_mode="Amide N-H stretch"),
                SpectralBandIr(wavenumber_cm1=1655.0, intensity="strong", vibrational_mode="Amide I (C=O stretch)"),
                SpectralBandIr(wavenumber_cm1=1565.0, intensity="strong", vibrational_mode="Amide II (N-H bend / C-N stretch)"),
            ],
            nmr_1h_shifts=[
                SpectralShiftNmr1H(chemical_shift_ppm=1.98, multiplicity="s", integration=3, assignment="Acetyl methyl -CH3"),
                SpectralShiftNmr1H(chemical_shift_ppm=6.68, multiplicity="d", integration=2, assignment="Aromatic protons ortho to -OH (C2, C6)"),
                SpectralShiftNmr1H(chemical_shift_ppm=7.34, multiplicity="d", integration=2, assignment="Aromatic protons ortho to -NHAc (C3, C5)"),
                SpectralShiftNmr1H(chemical_shift_ppm=9.14, multiplicity="s", integration=1, assignment="Phenolic -OH proton"),
                SpectralShiftNmr1H(chemical_shift_ppm=9.66, multiplicity="s", integration=1, assignment="Amide -NH- proton"),
            ],
            nmr_13c_shifts=[
                SpectralShiftNmr13C(chemical_shift_ppm=23.8, carbon_type="CH3", assignment="Acetyl methyl"),
                SpectralShiftNmr13C(chemical_shift_ppm=115.0, carbon_type="CH", assignment="Aromatic carbons ortho to -OH"),
                SpectralShiftNmr13C(chemical_shift_ppm=120.8, carbon_type="CH", assignment="Aromatic carbons meta to -OH"),
                SpectralShiftNmr13C(chemical_shift_ppm=131.0, carbon_type="C_quat", assignment="Aromatic carbon bearing -NHAc"),
                SpectralShiftNmr13C(chemical_shift_ppm=153.2, carbon_type="C_quat", assignment="Aromatic carbon bearing -OH"),
                SpectralShiftNmr13C(chemical_shift_ppm=167.6, carbon_type="C=O", assignment="Amide carbonyl carbon"),
            ],
            safety_ghs_pictograms=["GHS07 (Exclamation Mark)"],
            hazard_statements=["H302: Harmful if swallowed"],
            description="Widely utilized antipyretic and analgesic acting primarily centrally on cannabinoid and vanilloid neuro-pathways.",
        ),

        # 3. Caffeine
        DetailedCompound(
            id="cmpd_caffeine",
            name="Caffeine",
            iupac_name="1,3,7-Trimethylpurine-2,6-dione",
            formula="C8H10N4O2",
            smiles="Cn1cnc2c1c(=O)n(C)c(=O)n2C",
            inchi="InChI=1S/C8H10N4O2/c1-10-4-9-6-5(10)7(13)12(3)8(14)11(6)2/h4H,1-3H3",
            inchi_key="RYYVLZVUVIJVGH-UHFFFAOYSA-N",
            cas_number="58-08-2",
            molecular_weight=194.191,
            monoisotopic_mass=194.080,
            category="Biochemical",
            subcategory="Purine Alkaloid",
            physical_state_at_25c="Solid",
            melting_point_c=238.0,
            boiling_point_c=178.0,
            density_g_cm3=1.23,
            aqueous_solubility_g_l=21.6,
            log_p=-0.07,
            pka_values=[14.0],
            delta_h_f_kj_mol=-337.0,
            entropy_s_j_mol_k=244.0,
            heat_capacity_cp_j_mol_k=238.0,
            delta_g_f_kj_mol=-125.0,
            uv_vis_peaks=[
                SpectralPeakUv(wavelength_nm=273.0, extinction_coeff_m_cm=9700.0, electronic_transition="pi -> pi* (xanthine ring system)"),
            ],
            ir_bands=[
                SpectralBandIr(wavenumber_cm1=1700.0, intensity="strong", vibrational_mode="C6=O xanthine carbonyl"),
                SpectralBandIr(wavenumber_cm1=1655.0, intensity="strong", vibrational_mode="C2=O carbonyl stretch"),
                SpectralBandIr(wavenumber_cm1=1548.0, intensity="medium", vibrational_mode="C=C & C=N imidazole stretch"),
            ],
            nmr_1h_shifts=[
                SpectralShiftNmr1H(chemical_shift_ppm=3.40, multiplicity="s", integration=3, assignment="N1-methyl"),
                SpectralShiftNmr1H(chemical_shift_ppm=3.58, multiplicity="s", integration=3, assignment="N3-methyl"),
                SpectralShiftNmr1H(chemical_shift_ppm=3.99, multiplicity="s", integration=3, assignment="N7-methyl"),
                SpectralShiftNmr1H(chemical_shift_ppm=7.50, multiplicity="s", integration=1, assignment="C8-H purine proton"),
            ],
            nmr_13c_shifts=[
                SpectralShiftNmr13C(chemical_shift_ppm=27.9, carbon_type="CH3", assignment="N1-methyl"),
                SpectralShiftNmr13C(chemical_shift_ppm=29.7, carbon_type="CH3", assignment="N3-methyl"),
                SpectralShiftNmr13C(chemical_shift_ppm=33.6, carbon_type="CH3", assignment="N7-methyl"),
                SpectralShiftNmr13C(chemical_shift_ppm=107.5, carbon_type="C_quat", assignment="C5 ring bridgehead"),
                SpectralShiftNmr13C(chemical_shift_ppm=141.4, carbon_type="CH", assignment="C8 imidazole carbon"),
                SpectralShiftNmr13C(chemical_shift_ppm=148.7, carbon_type="C_quat", assignment="C4 bridgehead"),
                SpectralShiftNmr13C(chemical_shift_ppm=151.7, carbon_type="C=O", assignment="C2 carbonyl"),
                SpectralShiftNmr13C(chemical_shift_ppm=155.4, carbon_type="C=O", assignment="C6 carbonyl"),
            ],
            safety_ghs_pictograms=["GHS07 (Exclamation Mark)"],
            hazard_statements=["H302: Harmful if swallowed"],
            description="Naturally occurring central nervous system stimulant acting as a competitive adenosine A1 and A2A receptor antagonist.",
        ),

        # 4. Benzoic Acid
        DetailedCompound(
            id="cmpd_benzoic_acid",
            name="Benzoic Acid",
            iupac_name="Benzoic acid",
            formula="C7H6O2",
            smiles="O=C(O)c1ccccc1",
            inchi="InChI=1S/C7H6O2/c8-7(9)6-4-2-1-3-5-6/h1-5H,(H,8,9)",
            inchi_key="WGLPBDUOMAYXYZ-UHFFFAOYSA-N",
            cas_number="65-85-0",
            molecular_weight=122.123,
            monoisotopic_mass=122.037,
            category="Organic",
            subcategory="Aromatic Carboxylic Acid",
            physical_state_at_25c="Solid",
            melting_point_c=122.4,
            boiling_point_c=249.2,
            density_g_cm3=1.27,
            aqueous_solubility_g_l=3.4,
            log_p=1.87,
            pka_values=[4.20],
            delta_h_f_kj_mol=-385.0,
            entropy_s_j_mol_k=167.0,
            heat_capacity_cp_j_mol_k=146.0,
            delta_g_f_kj_mol=-245.0,
            uv_vis_peaks=[
                SpectralPeakUv(wavelength_nm=230.0, extinction_coeff_m_cm=11600.0, electronic_transition="pi -> pi* primary band"),
                SpectralPeakUv(wavelength_nm=272.0, extinction_coeff_m_cm=950.0, electronic_transition="pi -> pi* secondary benzenoid band"),
            ],
            ir_bands=[
                SpectralBandIr(wavenumber_cm1=1688.0, intensity="strong", vibrational_mode="Conjugated C=O stretch"),
                SpectralBandIr(wavenumber_cm1=2850.0, intensity="broad", vibrational_mode="O-H carboxylic acid dimer"),
                SpectralBandIr(wavenumber_cm1=1290.0, intensity="strong", vibrational_mode="C-O single bond stretch"),
            ],
            nmr_1h_shifts=[
                SpectralShiftNmr1H(chemical_shift_ppm=7.48, multiplicity="t", integration=2, assignment="Aromatic meta protons"),
                SpectralShiftNmr1H(chemical_shift_ppm=7.61, multiplicity="t", integration=1, assignment="Aromatic para proton"),
                SpectralShiftNmr1H(chemical_shift_ppm=8.14, multiplicity="d", integration=2, assignment="Aromatic ortho protons"),
                SpectralShiftNmr1H(chemical_shift_ppm=12.20, multiplicity="s", integration=1, assignment="-COOH acidic proton"),
            ],
            nmr_13c_shifts=[
                SpectralShiftNmr13C(chemical_shift_ppm=128.5, carbon_type="CH", assignment="C-meta"),
                SpectralShiftNmr13C(chemical_shift_ppm=129.4, carbon_type="CH", assignment="C-ortho"),
                SpectralShiftNmr13C(chemical_shift_ppm=130.2, carbon_type="C_quat", assignment="C-ipso"),
                SpectralShiftNmr13C(chemical_shift_ppm=133.0, carbon_type="CH", assignment="C-para"),
                SpectralShiftNmr13C(chemical_shift_ppm=167.4, carbon_type="C=O", assignment="Carbonyl carbon"),
            ],
            safety_ghs_pictograms=["GHS05 (Corrosion)", "GHS08 (Health Hazard)"],
            hazard_statements=["H315: Causes skin irritation", "H318: Causes serious eye damage", "H372: Causes damage to organs through prolonged exposure"],
            description="Archetypal aromatic carboxylic acid used as a primary thermochemical combustion calorimetry standard and food preservative.",
        ),

        # 5. Vanillin
        DetailedCompound(
            id="cmpd_vanillin",
            name="Vanillin",
            iupac_name="4-Hydroxy-3-methoxybenzaldehyde",
            formula="C8H8O3",
            smiles="COc1cc(C=O)ccc1O",
            inchi="InChI=1S/C8H8O3/c1-11-8-4-6(5-9)2-3-7(8)10/h2-5,10H,1H3",
            inchi_key="MWOOGOJBHIARFG-UHFFFAOYSA-N",
            cas_number="121-33-5",
            molecular_weight=152.149,
            monoisotopic_mass=152.047,
            category="Organic",
            subcategory="Phenolic Aldehyde",
            physical_state_at_25c="Solid",
            melting_point_c=81.5,
            boiling_point_c=285.0,
            density_g_cm3=1.06,
            aqueous_solubility_g_l=10.0,
            log_p=1.21,
            pka_values=[7.40],
            delta_h_f_kj_mol=-481.0,
            entropy_s_j_mol_k=198.0,
            heat_capacity_cp_j_mol_k=185.0,
            delta_g_f_kj_mol=-335.0,
            uv_vis_peaks=[
                SpectralPeakUv(wavelength_nm=280.0, extinction_coeff_m_cm=14200.0, electronic_transition="pi -> pi* benzenoid"),
                SpectralPeakUv(wavelength_nm=310.0, extinction_coeff_m_cm=9800.0, electronic_transition="n -> pi* phenolic conjugate"),
            ],
            ir_bands=[
                SpectralBandIr(wavenumber_cm1=3180.0, intensity="broad", vibrational_mode="Phenolic O-H stretch"),
                SpectralBandIr(wavenumber_cm1=1668.0, intensity="strong", vibrational_mode="Conjugated aldehyde C=O stretch"),
                SpectralBandIr(wavenumber_cm1=2840.0, intensity="medium", vibrational_mode="Aldehyde C-H Fermi doublet"),
                SpectralBandIr(wavenumber_cm1=1588.0, intensity="strong", vibrational_mode="Aromatic ring C=C stretch"),
            ],
            nmr_1h_shifts=[
                SpectralShiftNmr1H(chemical_shift_ppm=3.96, multiplicity="s", integration=3, assignment="Methoxy -OCH3"),
                SpectralShiftNmr1H(chemical_shift_ppm=6.43, multiplicity="s", integration=1, assignment="Phenolic -OH"),
                SpectralShiftNmr1H(chemical_shift_ppm=7.04, multiplicity="d", integration=1, assignment="Aromatic C5-H ortho to -OH"),
                SpectralShiftNmr1H(chemical_shift_ppm=7.41, multiplicity="d", integration=1, assignment="Aromatic C6-H"),
                SpectralShiftNmr1H(chemical_shift_ppm=7.44, multiplicity="s", integration=1, assignment="Aromatic C2-H"),
                SpectralShiftNmr1H(chemical_shift_ppm=9.83, multiplicity="s", integration=1, assignment="Aldehyde -CHO proton"),
            ],
            nmr_13c_shifts=[
                SpectralShiftNmr13C(chemical_shift_ppm=56.1, carbon_type="CH3", assignment="Methoxy carbon"),
                SpectralShiftNmr13C(chemical_shift_ppm=108.8, carbon_type="CH", assignment="C2 aromatic"),
                SpectralShiftNmr13C(chemical_shift_ppm=114.4, carbon_type="CH", assignment="C5 aromatic"),
                SpectralShiftNmr13C(chemical_shift_ppm=127.6, carbon_type="CH", assignment="C6 aromatic"),
                SpectralShiftNmr13C(chemical_shift_ppm=129.8, carbon_type="C_quat", assignment="C1 bearing -CHO"),
                SpectralShiftNmr13C(chemical_shift_ppm=147.2, carbon_type="C_quat", assignment="C3 bearing -OCH3"),
                SpectralShiftNmr13C(chemical_shift_ppm=151.7, carbon_type="C_quat", assignment="C4 bearing -OH"),
                SpectralShiftNmr13C(chemical_shift_ppm=190.9, carbon_type="C=O", assignment="Aldehyde carbonyl"),
            ],
            safety_ghs_pictograms=["GHS07 (Exclamation Mark)"],
            hazard_statements=["H319: Causes serious eye irritation"],
            description="Primary flavor and fragrance component of vanilla beans, exhibiting characteristic ortho-methoxy phenolic resonance.",
        ),

        # 6. Ethanol
        DetailedCompound(
            id="cmpd_ethanol",
            name="Ethanol",
            iupac_name="Ethanol",
            formula="C2H6O",
            smiles="CCO",
            inchi="InChI=1S/C2H6O/c1-2-3/h3H,2H2,1H3",
            inchi_key="LFQSCWFLJHTTHZ-UHFFFAOYSA-N",
            cas_number="64-17-5",
            molecular_weight=46.069,
            monoisotopic_mass=46.042,
            category="Organic",
            subcategory="Primary Alcohol",
            physical_state_at_25c="Liquid",
            melting_point_c=-114.1,
            boiling_point_c=78.2,
            density_g_cm3=0.789,
            aqueous_solubility_g_l=1000.0,
            log_p=-0.31,
            pka_values=[15.9],
            delta_h_f_kj_mol=-277.0,
            entropy_s_j_mol_k=161.0,
            heat_capacity_cp_j_mol_k=112.0,
            delta_g_f_kj_mol=-174.0,
            uv_vis_peaks=[
                SpectralPeakUv(wavelength_nm=185.0, extinction_coeff_m_cm=60.0, electronic_transition="n -> sigma* lone pair"),
            ],
            ir_bands=[
                SpectralBandIr(wavenumber_cm1=3350.0, intensity="broad", vibrational_mode="Hydrogen-bonded O-H stretch"),
                SpectralBandIr(wavenumber_cm1=2975.0, intensity="strong", vibrational_mode="Aliphatic C-H stretch"),
                SpectralBandIr(wavenumber_cm1=1050.0, intensity="strong", vibrational_mode="Primary alcohol C-O stretch"),
            ],
            nmr_1h_shifts=[
                SpectralShiftNmr1H(chemical_shift_ppm=1.20, multiplicity="t", integration=3, assignment="Methyl -CH3"),
                SpectralShiftNmr1H(chemical_shift_ppm=3.65, multiplicity="q", integration=2, assignment="Methylene -CH2-"),
                SpectralShiftNmr1H(chemical_shift_ppm=2.60, multiplicity="s", integration=1, assignment="Hydroxyl -OH"),
            ],
            nmr_13c_shifts=[
                SpectralShiftNmr13C(chemical_shift_ppm=18.2, carbon_type="CH3", assignment="Methyl carbon"),
                SpectralShiftNmr13C(chemical_shift_ppm=58.3, carbon_type="CH2", assignment="Methylene carbon bonded to -OH"),
            ],
            safety_ghs_pictograms=["GHS02 (Flame)", "GHS07 (Exclamation Mark)"],
            hazard_statements=["H225: Highly flammable liquid and vapour", "H319: Causes serious eye irritation"],
            description="Ubiquitous protic solvent and biofuel with extensive hydrogen bonding network governing its azeotropic distillation behavior.",
        ),

        # 7. Acetone
        DetailedCompound(
            id="cmpd_acetone",
            name="Acetone",
            iupac_name="Propan-2-one",
            formula="C3H6O",
            smiles="CC(=O)C",
            inchi="InChI=1S/C3H6O/c1-3(2)4/h1-2H3",
            inchi_key="CSCPPACGZOOCGX-UHFFFAOYSA-N",
            cas_number="67-64-1",
            molecular_weight=58.080,
            monoisotopic_mass=58.042,
            category="Organic",
            subcategory="Ketone",
            physical_state_at_25c="Liquid",
            melting_point_c=-94.7,
            boiling_point_c=56.1,
            density_g_cm3=0.784,
            aqueous_solubility_g_l=1000.0,
            log_p=-0.24,
            pka_values=[19.2],
            delta_h_f_kj_mol=-248.0,
            entropy_s_j_mol_k=200.0,
            heat_capacity_cp_j_mol_k=125.0,
            delta_g_f_kj_mol=-155.0,
            uv_vis_peaks=[
                SpectralPeakUv(wavelength_nm=279.0, extinction_coeff_m_cm=15.0, electronic_transition="n -> pi* forbidden carbonyl transition"),
                SpectralPeakUv(wavelength_nm=188.0, extinction_coeff_m_cm=1800.0, electronic_transition="pi -> pi* allowed transition"),
            ],
            ir_bands=[
                SpectralBandIr(wavenumber_cm1=1715.0, intensity="strong", vibrational_mode="Aliphatic ketone C=O stretch"),
                SpectralBandIr(wavenumber_cm1=1365.0, intensity="medium", vibrational_mode="C-H methyl symmetrical umbrella bend"),
            ],
            nmr_1h_shifts=[
                SpectralShiftNmr1H(chemical_shift_ppm=2.16, multiplicity="s", integration=6, assignment="Enantiotopic methyl protons"),
            ],
            nmr_13c_shifts=[
                SpectralShiftNmr13C(chemical_shift_ppm=30.6, carbon_type="CH3", assignment="Methyl carbons"),
                SpectralShiftNmr13C(chemical_shift_ppm=206.3, carbon_type="C=O", assignment="Ketone carbonyl carbon"),
            ],
            safety_ghs_pictograms=["GHS02 (Flame)", "GHS07 (Exclamation Mark)"],
            hazard_statements=["H225: Highly flammable liquid and vapour", "H319: Causes serious eye irritation", "H336: May cause drowsiness or dizziness"],
            description="Common dipolar aprotic solvent featuring high keto-enol tautomeric barrier and standard NMR reference solvent peak.",
        ),

        # 8. Ferrocene
        DetailedCompound(
            id="cmpd_ferrocene",
            name="Ferrocene",
            iupac_name="Bis(eta5-cyclopentadienyl)iron",
            formula="C10H10Fe",
            smiles="[Fe+2].c1cccc1.[c-]1cccc1",
            inchi="InChI=1S/2C5H5.Fe/c2*1-2-4-5-3-1;/h2*1-5H;/q2*-1;+2",
            inchi_key="CRSOKPUNFDROAC-UHFFFAOYSA-N",
            cas_number="102-54-5",
            molecular_weight=186.033,
            monoisotopic_mass=186.013,
            category="Organometallic",
            subcategory="Metallocene",
            physical_state_at_25c="Solid",
            melting_point_c=175.0,
            boiling_point_c=249.0,
            density_g_cm3=1.49,
            aqueous_solubility_g_l=0.001,
            log_p=2.66,
            pka_values=[],
            delta_h_f_kj_mol=157.0,
            entropy_s_j_mol_k=249.0,
            heat_capacity_cp_j_mol_k=210.0,
            delta_g_f_kj_mol=289.0,
            uv_vis_peaks=[
                SpectralPeakUv(wavelength_nm=325.0, extinction_coeff_m_cm=50.0, electronic_transition="d-d ligand field transition"),
                SpectralPeakUv(wavelength_nm=440.0, extinction_coeff_m_cm=90.0, electronic_transition="Metal-to-ligand charge transfer (MLCT)"),
            ],
            ir_bands=[
                SpectralBandIr(wavenumber_cm1=3085.0, intensity="medium", vibrational_mode="Cyclopentadienyl C-H stretch"),
                SpectralBandIr(wavenumber_cm1=1410.0, intensity="medium", vibrational_mode="C-C aromatic ring stretch"),
                SpectralBandIr(wavenumber_cm1=1105.0, intensity="strong", vibrational_mode="Ring breathing mode"),
                SpectralBandIr(wavenumber_cm1=485.0, intensity="strong", vibrational_mode="Fe-ring tilt and stretch"),
            ],
            nmr_1h_shifts=[
                SpectralShiftNmr1H(chemical_shift_ppm=4.15, multiplicity="s", integration=10, assignment="Singlet of 10 equivalent cyclopentadienyl protons"),
            ],
            nmr_13c_shifts=[
                SpectralShiftNmr13C(chemical_shift_ppm=68.2, carbon_type="CH", assignment="Single aromatic resonance of 10 equivalent carbons"),
            ],
            safety_ghs_pictograms=["GHS07 (Exclamation Mark)"],
            hazard_statements=["H302: Harmful if swallowed"],
            description="The archetype of sandwich metallocene complexes; IUPAC standard internal redox reference (Fc/Fc+ = 0.00 V) in non-aqueous electrochemistry.",
        ),
    ]
    return compounds


CURATED_DATABASE: List[DetailedCompound] = _build_curated_database()


class CompoundDatabaseEngine:
    @staticmethod
    def get_database_stats() -> DatabaseStatsResponse:
        cats: Dict[str, int] = {}
        uv_count = 0
        ir_count = 0
        nmr_count = 0
        total_mw = 0.0

        for c in CURATED_DATABASE:
            cats[c.category] = cats.get(c.category, 0) + 1
            if len(c.uv_vis_peaks) > 0:
                uv_count += 1
            if len(c.ir_bands) > 0:
                ir_count += 1
            if len(c.nmr_1h_shifts) > 0 or len(c.nmr_13c_shifts) > 0:
                nmr_count += 1
            total_mw += c.molecular_weight

        avg_mw = total_mw / max(len(CURATED_DATABASE), 1)

        return DatabaseStatsResponse(
            total_compounds=len(CURATED_DATABASE),
            categories=cats,
            compounds_with_uv=uv_count,
            compounds_with_ir=ir_count,
            compounds_with_nmr=nmr_count,
            average_molecular_weight=round(avg_mw, 2),
        )

    @staticmethod
    def search_compounds(req: CompoundSearchRequest) -> CompoundSearchResult:
        t_start = time.perf_counter()
        results: List[DetailedCompound] = []

        q_clean = req.query.lower().strip() if req.query else None

        for c in CURATED_DATABASE:
            # Match query term
            if q_clean:
                matches_q = (
                    q_clean in c.name.lower()
                    or q_clean in c.iupac_name.lower()
                    or q_clean in c.formula.lower()
                    or q_clean in c.smiles.lower()
                    or (c.cas_number and q_clean in c.cas_number.lower())
                )
                if not matches_q:
                    continue

            # Category filter
            if req.category and req.category != "All" and c.category.lower() != req.category.lower():
                continue

            # Molecular weight bounds
            if req.min_mw is not None and c.molecular_weight < req.min_mw:
                continue
            if req.max_mw is not None and c.molecular_weight > req.max_mw:
                continue

            # LogP bounds
            if req.min_log_p is not None and (c.log_p is None or c.log_p < req.min_log_p):
                continue
            if req.max_log_p is not None and (c.log_p is None or c.log_p > req.max_log_p):
                continue

            # Physical state filter
            if req.physical_state and req.physical_state != "All" and c.physical_state_at_25c.lower() != req.physical_state.lower():
                continue

            # Spectral flags
            if req.has_uv and len(c.uv_vis_peaks) == 0:
                continue
            if req.has_ir and len(c.ir_bands) == 0:
                continue
            if req.has_nmr and (len(c.nmr_1h_shifts) == 0 and len(c.nmr_13c_shifts) == 0):
                continue

            results.append(c)

        total_matches = len(results)
        # Apply pagination
        paginated = results[req.offset : req.offset + req.limit]
        elapsed_ms = (time.perf_counter() - t_start) * 1000.0

        return CompoundSearchResult(
            total_matches=total_matches,
            compounds=paginated,
            query_time_ms=round(elapsed_ms, 2),
        )

    @staticmethod
    def match_spectroscopy(req: SpectralMatchRequest) -> CompoundSearchResult:
        t_start = time.perf_counter()
        matches: List[DetailedCompound] = []

        tol = req.tolerance_percent / 100.0

        for c in CURATED_DATABASE:
            score = 0
            checks = 0

            # UV Match
            if req.target_uv_wavelength_nm is not None:
                checks += 1
                for uv in c.uv_vis_peaks:
                    if abs(uv.wavelength_nm - req.target_uv_wavelength_nm) <= req.target_uv_wavelength_nm * tol:
                        score += 1
                        break

            # IR Match
            if req.target_ir_wavenumber_cm1 is not None:
                checks += 1
                for ir in c.ir_bands:
                    if abs(ir.wavenumber_cm1 - req.target_ir_wavenumber_cm1) <= req.target_ir_wavenumber_cm1 * tol:
                        score += 1
                        break

            # NMR Match
            if req.target_nmr_1h_ppm is not None:
                checks += 1
                for nmr in c.nmr_1h_shifts:
                    if abs(nmr.chemical_shift_ppm - req.target_nmr_1h_ppm) <= max(0.2, req.target_nmr_1h_ppm * tol):
                        score += 1
                        break

            if checks > 0 and score == checks:
                matches.append(c)

        elapsed_ms = (time.perf_counter() - t_start) * 1000.0
        return CompoundSearchResult(
            total_matches=len(matches),
            compounds=matches[: req.limit],
            query_time_ms=round(elapsed_ms, 2),
        )
