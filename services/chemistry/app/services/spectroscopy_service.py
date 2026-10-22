"""
Spectroscopy & Instrumental Analysis Scientific Computation Engine.
Provides deterministic simulation of UV-Vis spectrophotometry (Beer-Lambert Law),
Fourier Transform Infrared (FTIR) functional group vibrations, and Nuclear Magnetic Resonance (NMR).
"""
import math
from typing import Dict, List, Optional, Any, Tuple
from services.chemistry.app.models.spectroscopy import (
    UvVisSpectrumPoint,
    UvVisSimulationResult,
    CalibrationPoint,
    CalibrationCurveResult,
    FtirBand,
    FtirSpectrumPoint,
    FtirSimulationResult,
    NmrSignal,
    NmrSpectrumPoint,
    NmrSimulationResult,
    SpectroscopyChallenge,
)


class SpectroscopyService:
    """Deterministic scientific service for instrumental spectroscopy."""

    UV_VIS_STANDARDS: Dict[str, Dict[str, Any]] = {
        "kmno4": {
            "name": "Potassium Permanganate",
            "formula": "KMnO4",
            "color": "#7D26CD",  # Deep purple
            "lambda_max_nm": 525.0,
            "epsilon_l_mol_cm": 2380.0,
            "peaks": [
                {"lambda": 525.0, "weight": 1.0, "sigma": 18.0},
                {"lambda": 545.0, "weight": 0.88, "sigma": 16.0},
                {"lambda": 506.0, "weight": 0.72, "sigma": 15.0},
                {"lambda": 315.0, "weight": 0.55, "sigma": 22.0},
            ],
            "notes": "Classic oxidizing transition metal permanganate ion with vibronic progression in visible region.",
        },
        "cuso4": {
            "name": "Copper(II) Sulfate Pentahydrate",
            "formula": "CuSO4·5H2O",
            "color": "#0099FF",  # Bright cyan/blue
            "lambda_max_nm": 810.0,
            "epsilon_l_mol_cm": 12.3,
            "peaks": [
                {"lambda": 810.0, "weight": 1.0, "sigma": 90.0},
                {"lambda": 680.0, "weight": 0.45, "sigma": 75.0},
            ],
            "notes": "Broad Jahn-Teller distorted d-d electronic transition [Cu(H2O)6]2+ peaking in near-infrared.",
        },
        "riboflavin": {
            "name": "Riboflavin (Vitamin B2)",
            "formula": "C17H20N4O6",
            "color": "#FFD700",  # Golden yellow
            "lambda_max_nm": 445.0,
            "epsilon_l_mol_cm": 12500.0,
            "peaks": [
                {"lambda": 445.0, "weight": 1.0, "sigma": 24.0},
                {"lambda": 375.0, "weight": 0.85, "sigma": 20.0},
                {"lambda": 266.0, "weight": 2.10, "sigma": 15.0},
            ],
            "notes": "Isoalloxazine conjugated ring system pi -> pi* and n -> pi* transitions.",
        },
        "methyl_orange": {
            "name": "Methyl Orange",
            "formula": "C14H14N3NaO3S",
            "color": "#FF5722",  # Bright orange
            "lambda_max_nm": 464.0,
            "epsilon_l_mol_cm": 25000.0,
            "peaks": [
                {"lambda": 464.0, "weight": 1.0, "sigma": 30.0},
                {"lambda": 272.0, "weight": 0.60, "sigma": 22.0},
            ],
            "notes": "Azo dye chromophore with extensive conjugated pi system.",
        },
        "phenol_red": {
            "name": "Phenol Red (Basic Form)",
            "formula": "C19H14O5S",
            "color": "#E91E63",  # Fuchsia/magenta
            "lambda_max_nm": 558.0,
            "epsilon_l_mol_cm": 62000.0,
            "peaks": [
                {"lambda": 558.0, "weight": 1.0, "sigma": 26.0},
                {"lambda": 430.0, "weight": 0.12, "sigma": 25.0},
            ],
            "notes": "High molar absorptivity quinoid phenolate resonance transition.",
        },
    }

    FTIR_COMPOUNDS: Dict[str, Dict[str, Any]] = {
        "ethanol": {
            "name": "Ethanol",
            "formula": "C2H5OH",
            "bands": [
                {"wavenumber": 3350.0, "intensity": "broad", "bond": "O-H stretch", "group": "Hydrogen-bonded Alcohol", "pct": 12.0, "sigma": 120.0},
                {"wavenumber": 2975.0, "intensity": "strong", "bond": "C-H sp3 stretch", "group": "Alkyl", "pct": 28.0, "sigma": 30.0},
                {"wavenumber": 2890.0, "intensity": "medium", "bond": "C-H sp3 stretch", "group": "Alkyl", "pct": 45.0, "sigma": 25.0},
                {"wavenumber": 1380.0, "intensity": "medium", "bond": "C-H / O-H bend", "group": "Alkane / Alcohol", "pct": 52.0, "sigma": 20.0},
                {"wavenumber": 1050.0, "intensity": "strong", "bond": "C-O stretch", "group": "Primary Alcohol", "pct": 18.0, "sigma": 35.0},
                {"wavenumber": 880.0, "intensity": "weak", "bond": "C-C skeletal", "group": "Aliphatic", "pct": 68.0, "sigma": 18.0},
            ],
            "summary": "Hallmark broad O-H absorption band at 3350 cm-1 and strong C-O stretch at 1050 cm-1, devoid of carbonyl peaks.",
        },
        "acetone": {
            "name": "Acetone",
            "formula": "CH3COCH3",
            "bands": [
                {"wavenumber": 3005.0, "intensity": "weak", "bond": "C-H sp3 stretch", "group": "Alkyl", "pct": 72.0, "sigma": 25.0},
                {"wavenumber": 2925.0, "intensity": "medium", "bond": "C-H sp3 stretch", "group": "Alkyl", "pct": 58.0, "sigma": 25.0},
                {"wavenumber": 1715.0, "intensity": "strong", "bond": "C=O stretch", "group": "Aliphatic Ketone", "pct": 8.0, "sigma": 20.0},
                {"wavenumber": 1420.0, "intensity": "medium", "bond": "C-H bend (alpha)", "group": "Ketone methyl", "pct": 48.0, "sigma": 18.0},
                {"wavenumber": 1365.0, "intensity": "medium", "bond": "CH3 umbrella", "group": "Methyl", "pct": 42.0, "sigma": 18.0},
                {"wavenumber": 1220.0, "intensity": "strong", "bond": "C-C(=O)-C stretch", "group": "Ketone skeletal", "pct": 22.0, "sigma": 22.0},
            ],
            "summary": "Prominent, sharp C=O carbonyl absorption peak at 1715 cm-1 with alkyl C-H stretches and total absence of hydroxyl/amine absorption.",
        },
        "acetic_acid": {
            "name": "Acetic Acid",
            "formula": "CH3COOH",
            "bands": [
                {"wavenumber": 3000.0, "intensity": "broad", "bond": "O-H stretch (H-bonded dimer)", "group": "Carboxylic Acid", "pct": 15.0, "sigma": 220.0},
                {"wavenumber": 1710.0, "intensity": "strong", "bond": "C=O stretch", "group": "Carboxylic Acid", "pct": 6.0, "sigma": 22.0},
                {"wavenumber": 1415.0, "intensity": "medium", "bond": "C-O-H in-plane bend", "group": "Carboxylic Acid", "pct": 45.0, "sigma": 25.0},
                {"wavenumber": 1285.0, "intensity": "strong", "bond": "C-O stretch", "group": "Carboxylic Acid", "pct": 16.0, "sigma": 30.0},
                {"wavenumber": 930.0, "intensity": "medium", "bond": "O-H out-of-plane bend", "group": "Carboxylic Acid Dimer", "pct": 50.0, "sigma": 35.0},
            ],
            "summary": "Extremely broad carboxylic O-H envelope (2500-3300 cm-1) overlapping C-H region, coupled with strong carbonyl stretch at 1710 cm-1.",
        },
        "toluene": {
            "name": "Toluene",
            "formula": "C7H8",
            "bands": [
                {"wavenumber": 3030.0, "intensity": "medium", "bond": "C-H sp2 stretch", "group": "Aromatic Ring", "pct": 46.0, "sigma": 20.0},
                {"wavenumber": 2920.0, "intensity": "medium", "bond": "C-H sp3 stretch", "group": "Benzylic Methyl", "pct": 38.0, "sigma": 22.0},
                {"wavenumber": 1605.0, "intensity": "medium", "bond": "C=C ring stretch", "group": "Aromatic Ring", "pct": 52.0, "sigma": 14.0},
                {"wavenumber": 1495.0, "intensity": "strong", "bond": "C=C ring stretch", "group": "Aromatic Ring", "pct": 32.0, "sigma": 15.0},
                {"wavenumber": 730.0, "intensity": "strong", "bond": "C-H out-of-plane bend", "group": "Mono-substituted Benzene", "pct": 10.0, "sigma": 16.0},
                {"wavenumber": 695.0, "intensity": "strong", "bond": "Ring deformation", "group": "Mono-substituted Benzene", "pct": 12.0, "sigma": 16.0},
            ],
            "summary": "Clear distinction between aromatic C-H (>3000 cm-1) and methyl C-H (<3000 cm-1), with twin mono-substituted benzene markers at 730 and 695 cm-1.",
        },
        "ethyl_acetate": {
            "name": "Ethyl Acetate",
            "formula": "CH3COOCH2CH3",
            "bands": [
                {"wavenumber": 2985.0, "intensity": "medium", "bond": "C-H sp3 stretch", "group": "Alkyl", "pct": 48.0, "sigma": 25.0},
                {"wavenumber": 1740.0, "intensity": "strong", "bond": "C=O stretch", "group": "Aliphatic Ester", "pct": 5.0, "sigma": 20.0},
                {"wavenumber": 1240.0, "intensity": "strong", "bond": "C-O stretch (acetate)", "group": "Ester", "pct": 10.0, "sigma": 28.0},
                {"wavenumber": 1045.0, "intensity": "strong", "bond": "C-O stretch (ethyl)", "group": "Ester", "pct": 14.0, "sigma": 25.0},
            ],
            "summary": "Ester carbonyl stretch at characteristic high frequency (1740 cm-1) supported by dual C-O asymmetric/symmetric stretches (1240 and 1045 cm-1).",
        },
    }

    NMR_COMPOUNDS: Dict[str, Dict[str, Any]] = {
        "ethanol": {
            "name": "Ethanol",
            "1H": {
                "solvent": "CDCl3",
                "signals": [
                    {"shift": 1.25, "multiplicity": "triplet", "integration": 3, "j": 7.1, "assignment": "CH3 methyl protons (split by CH2)"},
                    {"shift": 3.69, "multiplicity": "quartet", "integration": 2, "j": 7.1, "assignment": "CH2 methylene protons (deshielded by oxygen, split by CH3)"},
                    {"shift": 2.58, "multiplicity": "singlet", "integration": 1, "j": None, "assignment": "OH hydroxyl proton (rapid exchange)"},
                ]
            },
            "13C": {
                "solvent": "CDCl3",
                "signals": [
                    {"shift": 18.2, "multiplicity": "singlet", "integration": 1, "j": None, "assignment": "C2 methyl carbon"},
                    {"shift": 58.1, "multiplicity": "singlet", "integration": 1, "j": None, "assignment": "C1 methylene carbon attached to electronegative oxygen"},
                ]
            }
        },
        "acetone": {
            "name": "Acetone",
            "1H": {
                "solvent": "CDCl3",
                "signals": [
                    {"shift": 2.17, "multiplicity": "singlet", "integration": 6, "j": None, "assignment": "Two magnetically equivalent alpha-methyl groups (6H)"},
                ]
            },
            "13C": {
                "solvent": "CDCl3",
                "signals": [
                    {"shift": 30.7, "multiplicity": "singlet", "integration": 2, "j": None, "assignment": "Equivalent methyl carbons"},
                    {"shift": 206.3, "multiplicity": "singlet", "integration": 1, "j": None, "assignment": "Carbonyl carbon (heavily deshielded)"},
                ]
            }
        },
        "ethyl_acetate": {
            "name": "Ethyl Acetate",
            "1H": {
                "solvent": "CDCl3",
                "signals": [
                    {"shift": 1.26, "multiplicity": "triplet", "integration": 3, "j": 7.1, "assignment": "Ester ethyl -CH3 (split by -CH2-)"},
                    {"shift": 2.04, "multiplicity": "singlet", "integration": 3, "j": None, "assignment": "Acetate -CH3 adjacent to carbonyl"},
                    {"shift": 4.12, "multiplicity": "quartet", "integration": 2, "j": 7.1, "assignment": "Ester -OCH2- (deshielded by oxygen, split by -CH3)"},
                ]
            },
            "13C": {
                "solvent": "CDCl3",
                "signals": [
                    {"shift": 14.1, "multiplicity": "singlet", "integration": 1, "j": None, "assignment": "Ethyl methyl carbon"},
                    {"shift": 20.9, "multiplicity": "singlet", "integration": 1, "j": None, "assignment": "Acetate methyl carbon"},
                    {"shift": 60.4, "multiplicity": "singlet", "integration": 1, "j": None, "assignment": "Oxygen-bearing methylene carbon"},
                    {"shift": 171.1, "multiplicity": "singlet", "integration": 1, "j": None, "assignment": "Ester carbonyl carbon"},
                ]
            }
        },
        "toluene": {
            "name": "Toluene",
            "1H": {
                "solvent": "CDCl3",
                "signals": [
                    {"shift": 2.34, "multiplicity": "singlet", "integration": 3, "j": None, "assignment": "Benzylic methyl protons (-CH3)"},
                    {"shift": 7.17, "multiplicity": "multiplet", "integration": 2, "j": 7.5, "assignment": "Ortho aromatic protons"},
                    {"shift": 7.25, "multiplicity": "multiplet", "integration": 3, "j": 7.4, "assignment": "Meta & Para aromatic protons"},
                ]
            },
            "13C": {
                "solvent": "CDCl3",
                "signals": [
                    {"shift": 21.4, "multiplicity": "singlet", "integration": 1, "j": None, "assignment": "Benzylic methyl carbon"},
                    {"shift": 125.3, "multiplicity": "singlet", "integration": 1, "j": None, "assignment": "Para aromatic carbon"},
                    {"shift": 128.2, "multiplicity": "singlet", "integration": 2, "j": None, "assignment": "Ortho aromatic carbons"},
                    {"shift": 129.0, "multiplicity": "singlet", "integration": 2, "j": None, "assignment": "Meta aromatic carbons"},
                    {"shift": 137.9, "multiplicity": "singlet", "integration": 1, "j": None, "assignment": "Ipso substituted aromatic carbon"},
                ]
            }
        },
    }

    CHARACTERISTIC_FTIR_FREQUENCIES: List[Dict[str, Any]] = [
        {"min": 3200.0, "max": 3650.0, "group": "Alcohol / Phenol", "bond": "O-H stretch", "appearance": "Strong, Broad"},
        {"min": 2500.0, "max": 3300.0, "group": "Carboxylic Acid", "bond": "O-H stretch", "appearance": "Extremely broad envelope overlapping C-H"},
        {"min": 3300.0, "max": 3500.0, "group": "Primary / Secondary Amine", "bond": "N-H stretch", "appearance": "Medium, sharp (doublet for 1°, singlet for 2°)"},
        {"min": 3280.0, "max": 3340.0, "group": "Terminal Alkyne", "bond": "C-H sp stretch", "appearance": "Strong, Sharp"},
        {"min": 3000.0, "max": 3100.0, "group": "Alkene / Aromatic", "bond": "C-H sp2 stretch", "appearance": "Medium, just above 3000 cm-1"},
        {"min": 2850.0, "max": 2980.0, "group": "Alkane", "bond": "C-H sp3 stretch", "appearance": "Strong to Medium, just below 3000 cm-1"},
        {"min": 2720.0, "max": 2830.0, "group": "Aldehyde", "bond": "C-H Fermi doublet", "appearance": "Medium, twin peaks at 2820 and 2720 cm-1"},
        {"min": 2100.0, "max": 2260.0, "group": "Alkyne", "bond": "C≡C stretch", "appearance": "Variable, sharp"},
        {"min": 2220.0, "max": 2260.0, "group": "Nitrile", "bond": "C≡N stretch", "appearance": "Medium, Sharp"},
        {"min": 1735.0, "max": 1750.0, "group": "Aliphatic Ester", "bond": "C=O stretch", "appearance": "Strong, Sharp"},
        {"min": 1715.0, "max": 1730.0, "group": "Aldehyde", "bond": "C=O stretch", "appearance": "Strong, Sharp"},
        {"min": 1705.0, "max": 1725.0, "group": "Ketone", "bond": "C=O stretch", "appearance": "Strong, Sharp"},
        {"min": 1700.0, "max": 1720.0, "group": "Carboxylic Acid", "bond": "C=O stretch", "appearance": "Strong, Sharp"},
        {"min": 1640.0, "max": 1690.0, "group": "Amide", "bond": "C=O stretch (Amide I)", "appearance": "Strong, lower frequency due to resonance"},
        {"min": 1620.0, "max": 1680.0, "group": "Alkene", "bond": "C=C stretch", "appearance": "Variable, weak to medium"},
        {"min": 1450.0, "max": 1600.0, "group": "Aromatic Ring", "bond": "C=C ring stretching", "appearance": "Medium to strong, sharp pair"},
        {"min": 1000.0, "max": 1300.0, "group": "Alcohol / Ether / Ester", "bond": "C-O stretch", "appearance": "Strong, dominant in fingerprint"},
        {"min": 690.0, "max": 770.0, "group": "Mono-substituted Benzene", "bond": "Aromatic C-H out-of-plane", "appearance": "Strong, distinct pair"},
    ]

    CHALLENGES: List[Dict[str, Any]] = [
        {
            "challenge_id": "chall-001",
            "title": "Unknown Carbonyl Compound (C3H6O)",
            "difficulty": "Introductory",
            "molecular_formula": "C3H6O",
            "molecular_weight": 58.08,
            "uv_vis_summary": "Weak n -> pi* absorption band at 279 nm (epsilon ~ 15 L/(mol cm)).",
            "ftir_prominent_peaks": [2925.0, 1715.0, 1365.0, 1220.0],
            "nmr_signals": [
                {"shift": 2.17, "multiplicity": "singlet", "integration": 6, "assignment": "Single 6H singlet"}
            ],
            "candidate_structures": [
                {"name": "Acetone", "formula": "C3H6O", "smiles": "CC(=O)C", "iupac": "Propan-2-one"},
                {"name": "Propanal", "formula": "C3H6O", "smiles": "CCC=O", "iupac": "Propanal"},
                {"name": "Allyl Alcohol", "formula": "C3H6O", "smiles": "C=CCO", "iupac": "Prop-2-en-1-ol"},
            ],
            "correct_compound_name": "Acetone",
            "explanation": "The intense FTIR peak at 1715 cm-1 confirms a ketone carbonyl. The 1H NMR exhibits a single 6H singlet at 2.17 ppm, proving total symmetry between two methyl groups, uniquely matching acetone (propanal would exhibit triplet/multiplet/triplet with an aldehyde peak at 9.8 ppm)."
        },
        {
            "challenge_id": "chall-002",
            "title": "Fragrant Solvent Unknown (C4H8O2)",
            "difficulty": "Intermediate",
            "molecular_formula": "C4H8O2",
            "molecular_weight": 88.11,
            "uv_vis_summary": "Transparent across visible region; cutoff below 210 nm.",
            "ftir_prominent_peaks": [2985.0, 1740.0, 1240.0, 1045.0],
            "nmr_signals": [
                {"shift": 1.26, "multiplicity": "triplet", "integration": 3, "assignment": "3H, J=7.1 Hz"},
                {"shift": 2.04, "multiplicity": "singlet", "integration": 3, "assignment": "3H singlet"},
                {"shift": 4.12, "multiplicity": "quartet", "integration": 2, "assignment": "2H, J=7.1 Hz"}
            ],
            "candidate_structures": [
                {"name": "Ethyl Acetate", "formula": "C4H8O2", "smiles": "CCOC(=O)C", "iupac": "Ethyl ethanoate"},
                {"name": "Butanoic Acid", "formula": "C4H8O2", "smiles": "CCCC(=O)O", "iupac": "Butanoic acid"},
                {"name": "Methyl Propanoate", "formula": "C4H8O2", "smiles": "CCC(=O)OC", "iupac": "Methyl propanoate"},
            ],
            "correct_compound_name": "Ethyl Acetate",
            "explanation": "FTIR absorption at 1740 cm-1 indicates an ester carbonyl, while the absence of a broad 3000 cm-1 envelope rules out butanoic acid. 1H NMR reveals an ethyl group (-CH2- quartet at 4.12 ppm deshielded by single-bonded oxygen, and -CH3 triplet at 1.26 ppm) plus an isolated 3H acetate singlet at 2.04 ppm, unambiguously identifying ethyl acetate."
        }
    ]

    @classmethod
    def simulate_uv_vis(
        cls,
        analyte_id: str,
        concentration_m: float,
        path_length_cm: float = 1.0,
        start_nm: float = 350.0,
        end_nm: float = 750.0,
        step_nm: float = 2.0,
    ) -> UvVisSimulationResult:
        """Simulate UV-Vis absorption spectrum via Beer-Lambert Law with Gaussian line-broadening."""
        standard = cls.UV_VIS_STANDARDS.get(analyte_id.lower())
        if not standard:
            # Default fallback analyte
            standard = cls.UV_VIS_STANDARDS["kmno4"]

        lambda_max = standard["lambda_max_nm"]
        epsilon = standard["epsilon_l_mol_cm"]

        # Beer-Lambert at lambda_max: A = epsilon * b * c
        abs_max = epsilon * path_length_cm * concentration_m
        trans_max = max(0.0, min(100.0, math.pow(10.0, -abs_max) * 100.0))

        spectrum_points: List[UvVisSpectrumPoint] = []
        curr_wl = start_nm
        while curr_wl <= end_nm:
            point_abs = 0.0
            for peak in standard["peaks"]:
                peak_center = peak["lambda"]
                sigma = peak["sigma"]
                weight = peak["weight"]
                # Gaussian broadening
                gauss = math.exp(-0.5 * math.pow((curr_wl - peak_center) / sigma, 2))
                point_abs += (epsilon * weight * path_length_cm * concentration_m) * gauss

            # Transmittance
            point_trans = max(0.0, min(100.0, math.pow(10.0, -point_abs) * 100.0))
            spectrum_points.append(
                UvVisSpectrumPoint(
                    wavelength_nm=round(curr_wl, 1),
                    absorbance=round(point_abs, 4),
                    transmittance_pct=round(point_trans, 2),
                )
            )
            curr_wl += step_nm

        return UvVisSimulationResult(
            analyte_id=analyte_id,
            analyte_name=standard["name"],
            analyte_formula=standard["formula"],
            concentration_m=concentration_m,
            path_length_cm=path_length_cm,
            molar_absorptivity_l_mol_cm=epsilon,
            lambda_max_nm=lambda_max,
            absorbance_at_lambda_max=round(abs_max, 4),
            transmittance_at_lambda_max=round(trans_max, 2),
            spectrum_points=spectrum_points,
            chemical_color=standard["color"],
            notes=standard["notes"],
        )

    @classmethod
    def calculate_calibration_curve(
        cls,
        analyte_name: str,
        standard_points: List[Tuple[float, float]],  # List of (conc_m, absorbance)
        unknown_absorbance: Optional[float] = None,
    ) -> CalibrationCurveResult:
        """Perform linear least-squares regression A = m*c + b for Beer-Lambert calibration."""
        n = len(standard_points)
        if n < 2:
            raise ValueError("At least 2 calibration points required for linear regression")

        x_vals = [p[0] for p in standard_points]
        y_vals = [p[1] for p in standard_points]

        mean_x = sum(x_vals) / n
        mean_y = sum(y_vals) / n

        s_xx = sum(math.pow(x - mean_x, 2) for x in x_vals)
        s_xy = sum((x - mean_x) * (y - mean_y) for x, y in zip(x_vals, y_vals))
        s_yy = sum(math.pow(y - mean_y, 2) for y in y_vals)

        if s_xx == 0:
            slope = 0.0
            intercept = mean_y
            r_squared = 0.0
        else:
            slope = s_xy / s_xx
            intercept = mean_y - slope * mean_x
            if s_yy > 0:
                r_squared = math.pow(s_xy, 2) / (s_xx * s_yy)
            else:
                r_squared = 1.0

        calc_conc = None
        if unknown_absorbance is not None and slope != 0:
            calc_conc = max(0.0, (unknown_absorbance - intercept) / slope)

        equation_str = f"A = {slope:.3f} × c + {intercept:.4f} (R² = {r_squared:.4f})"

        return CalibrationCurveResult(
            slope=round(slope, 4),
            intercept=round(intercept, 5),
            r_squared=round(r_squared, 4),
            equation=equation_str,
            standard_points=[CalibrationPoint(concentration_m=x, absorbance=y) for x, y in standard_points],
            unknown_absorbance=unknown_absorbance,
            calculated_concentration_m=round(calc_conc, 6) if calc_conc is not None else None,
            analysis_notes=f"Calibration curve for {analyte_name}. Molar sensitivity slope = {slope:.2f} L/(mol·cm).",
        )

    @classmethod
    def simulate_ftir(cls, compound_id: str) -> FtirSimulationResult:
        """Simulate FTIR transmittance spectrum from 4000 to 400 cm-1 with Gaussian absorption troughs."""
        compound = cls.FTIR_COMPOUNDS.get(compound_id.lower())
        if not compound:
            compound = cls.FTIR_COMPOUNDS["ethanol"]

        detected_bands: List[FtirBand] = []
        for b in compound["bands"]:
            detected_bands.append(
                FtirBand(
                    wavenumber_cm1=b["wavenumber"],
                    transmittance_pct=b["pct"],
                    intensity=b["intensity"],
                    assigned_bond=b["bond"],
                    functional_group=b["group"],
                )
            )

        spectrum_points: List[FtirSpectrumPoint] = []
        # Generate points from 4000 cm-1 down to 400 cm-1 in steps of 5 cm-1
        curr_wn = 4000.0
        while curr_wn >= 400.0:
            # Baseline transmission ~ 98%
            absorption_fraction = 0.0
            for b in compound["bands"]:
                center = b["wavenumber"]
                sigma = b["sigma"]
                max_absorption = (100.0 - b["pct"]) / 100.0
                gauss = math.exp(-0.5 * math.pow((curr_wn - center) / sigma, 2))
                absorption_fraction += max_absorption * gauss

            absorption_fraction = min(0.98, max(0.0, absorption_fraction))
            point_trans = (1.0 - absorption_fraction) * 100.0

            spectrum_points.append(
                FtirSpectrumPoint(
                    wavenumber_cm1=round(curr_wn, 1),
                    transmittance_pct=round(point_trans, 2),
                )
            )
            curr_wn -= 5.0

        return FtirSimulationResult(
            compound_name=compound["name"],
            compound_formula=compound["formula"],
            detected_bands=detected_bands,
            spectrum_points=spectrum_points,
            fingerprint_summary=compound["summary"],
        )

    @classmethod
    def identify_ftir_peaks(cls, peaks: List[float], tolerance_cm1: float = 40.0) -> Dict[str, Any]:
        """Correlate experimental infrared absorption wavenumbers to functional group vibration table."""
        matches = []
        for p in peaks:
            for entry in cls.CHARACTERISTIC_FTIR_FREQUENCIES:
                min_w = entry["min"] - tolerance_cm1
                max_w = entry["max"] + tolerance_cm1
                if min_w <= p <= max_w:
                    center = (entry["min"] + entry["max"]) / 2.0
                    delta = abs(p - center)
                    half_width = (entry["max"] - entry["min"]) / 2.0 + tolerance_cm1
                    conf = max(0.5, round(1.0 - (delta / half_width) * 0.45, 2))
                    matches.append({
                        "experimental_peak_cm1": p,
                        "matched_group": entry["group"],
                        "typical_range_cm1": f"{int(entry['min'])}-{int(entry['max'])} cm⁻¹",
                        "bond_vibration": entry["bond"],
                        "confidence": conf,
                    })

        # Assess diagnostic groups
        groups_found = set(m["matched_group"] for m in matches)
        assessment_parts = []
        if any("Carbonyl" in g or "Ester" in g or "Ketone" in g or "Acid" in g for g in groups_found):
            assessment_parts.append("Carbonyl oxygenated compound present.")
        if any("Alcohol" in g for g in groups_found):
            assessment_parts.append("Hydroxyl functional group present.")
        if any("Aromatic" in g or "Benzene" in g for g in groups_found):
            assessment_parts.append("Aromatic benzene ring framework detected.")

        diagnostic = " ".join(assessment_parts) if assessment_parts else "Aliphatic / skeletal structure inferred."

        return {
            "matches": matches,
            "diagnostic_assessment": diagnostic,
        }

    @classmethod
    def simulate_nmr(
        cls,
        compound_id: str,
        nucleus: str = "1H",
        spectrometer_freq_mhz: float = 400.0,
    ) -> NmrSimulationResult:
        """Simulate 1H or 13C NMR spectrum with peak splitting and continuous chemical shift trace."""
        compound = cls.NMR_COMPOUNDS.get(compound_id.lower())
        if not compound:
            compound = cls.NMR_COMPOUNDS["ethanol"]

        nuc_data = compound.get(nucleus)
        if not nuc_data:
            nucleus = "1H"
            nuc_data = compound["1H"]

        raw_signals = nuc_data["signals"]
        signals_list: List[NmrSignal] = []
        total_protons = 0

        for s in raw_signals:
            signals_list.append(
                NmrSignal(
                    chemical_shift_ppm=s["shift"],
                    multiplicity=s["multiplicity"],
                    integration_protons=s["integration"],
                    coupling_constant_hz=s.get("j"),
                    assignment=s["assignment"],
                )
            )
            total_protons += s["integration"]

        # Generate continuous synthetic NMR spectrum points (Lorentzian line shapes)
        # For 1H: range 0 to 12 ppm; for 13C: range 0 to 220 ppm
        max_ppm = 12.0 if nucleus == "1H" else 220.0
        step_ppm = 0.02 if nucleus == "1H" else 0.2
        gamma = 0.015 if nucleus == "1H" else 0.15  # peak half-width

        spectrum_points: List[NmrSpectrumPoint] = []
        curr_ppm = 0.0
        while curr_ppm <= max_ppm:
            intensity = 0.0
            for sig in signals_list:
                shift = sig.chemical_shift_ppm
                integ = sig.integration_protons
                mult = sig.multiplicity
                j_hz = sig.coupling_constant_hz or 7.0
                j_ppm = j_hz / spectrometer_freq_mhz

                # Multiplet component offsets and intensities
                components: List[Tuple[float, float]] = []
                if mult == "singlet":
                    components = [(0.0, 1.0)]
                elif mult == "doublet":
                    components = [(-j_ppm / 2.0, 0.5), (j_ppm / 2.0, 0.5)]
                elif mult == "triplet":
                    components = [(-j_ppm, 0.25), (0.0, 0.5), (j_ppm, 0.25)]
                elif mult == "quartet":
                    components = [(-1.5 * j_ppm, 0.125), (-0.5 * j_ppm, 0.375), (0.5 * j_ppm, 0.375), (1.5 * j_ppm, 0.125)]
                else:  # multiplet
                    components = [(-j_ppm, 0.2), (-j_ppm / 2.0, 0.3), (0.0, 0.4), (j_ppm / 2.0, 0.3), (j_ppm, 0.2)]

                for offset, weight in components:
                    center = shift + offset
                    # Lorentzian peak shape: I = weight * integ * (gamma^2 / ((ppm - center)^2 + gamma^2))
                    lorentz = (gamma * gamma) / (math.pow(curr_ppm - center, 2) + gamma * gamma)
                    intensity += weight * integ * lorentz

            spectrum_points.append(
                NmrSpectrumPoint(
                    chemical_shift_ppm=round(curr_ppm, 3),
                    intensity=round(intensity, 4),
                )
            )
            curr_ppm += step_ppm

        return NmrSimulationResult(
            nucleus=nucleus,
            compound_name=compound["name"],
            solvent=nuc_data["solvent"],
            spectrometer_freq_mhz=spectrometer_freq_mhz,
            total_integrated_nuclei=total_protons,
            signals=signals_list,
            spectrum_points=spectrum_points,
        )

    @classmethod
    def get_challenges(cls) -> List[SpectroscopyChallenge]:
        """Fetch unknown compound structure determination puzzles."""
        challenges = []
        for ch in cls.CHALLENGES:
            challenges.append(
                SpectroscopyChallenge(
                    challenge_id=ch["challenge_id"],
                    title=ch["title"],
                    difficulty=ch["difficulty"],
                    molecular_formula=ch["molecular_formula"],
                    molecular_weight=ch["molecular_weight"],
                    uv_vis_summary=ch["uv_vis_summary"],
                    ftir_prominent_peaks=ch["ftir_prominent_peaks"],
                    nmr_signals=ch["nmr_signals"],
                    candidate_structures=ch["candidate_structures"],
                    correct_compound_name=ch["correct_compound_name"],
                    explanation=ch["explanation"],
                )
            )
        return challenges
