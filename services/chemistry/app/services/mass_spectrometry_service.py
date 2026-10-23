"""
Analytical Chromatography & Mass Spectrometry Service Engine (PR #051).
Calculates quadrupole electron ionization fragmentation, exact isotopic envelopes,
and Van Deemter HPLC/GC plate height hydrodynamics.
"""
import re
import math
from typing import Dict, List, Optional, Tuple
from app.models.mass_spectrometry import (
    MassPeak,
    IsotopePeak,
    ChromatographicPeak,
    VanDeemterPoint,
    MsStandard,
)
from app.schemas.mass_spectrometry import (
    MsSimulationRequest,
    MsSimulationResponse,
    IsotopeEnvelopeRequest,
    IsotopeEnvelopeResponse,
    VanDeemterRequest,
    VanDeemterResponse,
    ChromatogramSimulationRequest,
    ChromatogramSimulationResponse,
)


def _build_curated_ms_library() -> Dict[str, MsStandard]:
    standards = [
        # 1. Butylbenzene
        MsStandard(
            id="butylbenzene",
            name="Butylbenzene",
            formula="C10H14",
            smiles="CCCCc1ccccc1",
            molecular_weight=134.22,
            monoisotopic_mass=134.11,
            category="Aromatic",
            ionization_mode="EI_70eV",
            base_peak_mz=91.0,
            peaks=[
                MassPeak(mz=134.0, relative_intensity=25.0, fragment_formula="[C10H14]+.", fragment_name="Molecular Radical Cation", mechanism="Direct 70eV ionization", is_molecular_ion=True),
                MassPeak(mz=92.0, relative_intensity=55.0, fragment_formula="[C7H8]+.", fragment_name="Toluene-like Radical Cation", mechanism="McLafferty rearrangement with neutral propene (C3H6) loss"),
                MassPeak(mz=91.0, relative_intensity=100.0, fragment_formula="[C7H7]+", fragment_name="Tropylium Cation", mechanism="Benzylic alpha-cleavage with loss of propyl radical (C3H7.)"),
                MassPeak(mz=65.0, relative_intensity=18.0, fragment_formula="[C5H5]+", fragment_name="Cyclopentadienyl Cation", mechanism="Retro-cyclization from tropylium via acetylene (C2H2) extrusion"),
                MassPeak(mz=51.0, relative_intensity=12.0, fragment_formula="[C4H3]+", fragment_name="Dehydrocyclobutadiene Cation", mechanism="Secondary hydrocarbon ring fragmentation"),
            ],
            description="Exhibits classic competing McLafferty beta-cleavage (m/z 92) and benzylic cleavage yielding resonance-stabilized tropylium ion (m/z 91).",
        ),

        # 2. Acetophenone
        MsStandard(
            id="acetophenone",
            name="Acetophenone",
            formula="C8H8O",
            smiles="CC(=O)c1ccccc1",
            molecular_weight=120.15,
            monoisotopic_mass=120.06,
            category="Carbonyl",
            ionization_mode="EI_70eV",
            base_peak_mz=105.0,
            peaks=[
                MassPeak(mz=120.0, relative_intensity=32.0, fragment_formula="[C8H8O]+.", fragment_name="Molecular Radical Cation", mechanism="Direct 70eV ionization", is_molecular_ion=True),
                MassPeak(mz=105.0, relative_intensity=100.0, fragment_formula="[C7H5O]+", fragment_name="Benzoyl Acylium Cation", mechanism="Alpha-cleavage of acetyl methyl radical (.CH3)"),
                MassPeak(mz=77.0, relative_intensity=82.0, fragment_formula="[C6H5]+", fragment_name="Phenyl Cation", mechanism="Decarbonylation: neutral carbon monoxide (CO) loss from benzoyl"),
                MassPeak(mz=51.0, relative_intensity=28.0, fragment_formula="[C4H3]+", fragment_name="Cyclobutenyl Ring Fragment", mechanism="Acetylene loss from phenyl cation"),
                MassPeak(mz=43.0, relative_intensity=15.0, fragment_formula="[C2H3O]+", fragment_name="Acetyl Cation", mechanism="Alpha-cleavage with phenyl radical (.C6H5) loss"),
            ],
            description="Exemplar aromatic ketone showing predominant alpha-cleavage to acylium cation (m/z 105) followed by decarbonylation to phenyl cation (m/z 77).",
        ),

        # 3. Chlorobenzene
        MsStandard(
            id="chlorobenzene",
            name="Chlorobenzene",
            formula="C6H5Cl",
            smiles="Clc1ccccc1",
            molecular_weight=112.56,
            monoisotopic_mass=112.01,
            category="Halogenated",
            ionization_mode="EI_70eV",
            base_peak_mz=112.0,
            peaks=[
                MassPeak(mz=112.0, relative_intensity=100.0, fragment_formula="[C6H5(35Cl)]+.", fragment_name="Molecular Ion (35Cl)", mechanism="Direct 70eV ionization", is_molecular_ion=True),
                MassPeak(mz=114.0, relative_intensity=32.5, fragment_formula="[C6H5(37Cl)]+.", fragment_name="Molecular Ion (37Cl)", mechanism="Isotopic chlorine-37 distribution (3:1 signature)", is_molecular_ion=True),
                MassPeak(mz=77.0, relative_intensity=65.0, fragment_formula="[C6H5]+", fragment_name="Phenyl Cation", mechanism="Loss of chlorine radical (.Cl)"),
                MassPeak(mz=51.0, relative_intensity=30.0, fragment_formula="[C4H3]+", fragment_name="Ring Fragment Cation", mechanism="Acetylene extrusion from phenyl ring"),
            ],
            description="Diagnostic 3:1 isotopic doublet for [M]+ (m/z 112) and [M+2]+ (m/z 114) unequivocally confirming a single chlorine atom.",
        ),

        # 4. Bromobenzene
        MsStandard(
            id="bromobenzene",
            name="Bromobenzene",
            formula="C6H5Br",
            smiles="Brc1ccccc1",
            molecular_weight=157.01,
            monoisotopic_mass=155.96,
            category="Halogenated",
            ionization_mode="EI_70eV",
            base_peak_mz=77.0,
            peaks=[
                MassPeak(mz=156.0, relative_intensity=78.0, fragment_formula="[C6H5(79Br)]+.", fragment_name="Molecular Ion (79Br)", mechanism="Direct 70eV ionization", is_molecular_ion=True),
                MassPeak(mz=158.0, relative_intensity=76.0, fragment_formula="[C6H5(81Br)]+.", fragment_name="Molecular Ion (81Br)", mechanism="Isotopic bromine-81 distribution (1:1 signature)", is_molecular_ion=True),
                MassPeak(mz=77.0, relative_intensity=100.0, fragment_formula="[C6H5]+", fragment_name="Phenyl Cation", mechanism="Facile loss of bromine radical (.Br) - base peak"),
                MassPeak(mz=51.0, relative_intensity=40.0, fragment_formula="[C4H3]+", fragment_name="Ring Fragment Cation", mechanism="Loss of acetylene from phenyl"),
            ],
            description="Characteristic twin isotopic doublet of nearly equal 1:1 intensity at m/z 156 and 158 defining bromine presence.",
        ),

        # 5. 2-Pentanone
        MsStandard(
            id="pentan_2_one",
            name="2-Pentanone",
            formula="C5H10O",
            smiles="CCCC(=O)C",
            molecular_weight=86.13,
            monoisotopic_mass=86.07,
            category="Carbonyl",
            ionization_mode="EI_70eV",
            base_peak_mz=43.0,
            peaks=[
                MassPeak(mz=86.0, relative_intensity=12.0, fragment_formula="[C5H10O]+.", fragment_name="Molecular Radical Cation", mechanism="Direct 70eV ionization", is_molecular_ion=True),
                MassPeak(mz=71.0, relative_intensity=8.0, fragment_formula="[C4H7O]+", fragment_name="Butyryl Cation", mechanism="Alpha-cleavage with loss of methyl radical (.CH3)"),
                MassPeak(mz=58.0, relative_intensity=58.0, fragment_formula="[C3H6O]+.", fragment_name="Acetone Enol Radical Cation", mechanism="McLafferty rearrangement with neutral ethene (C2H4) extrusion"),
                MassPeak(mz=43.0, relative_intensity=100.0, fragment_formula="[C2H3O]+", fragment_name="Acetyl Cation", mechanism="Alpha-cleavage with loss of propyl radical (.C3H7)"),
                MassPeak(mz=27.0, relative_intensity=16.0, fragment_formula="[C2H3]+", fragment_name="Vinyl Cation", mechanism="Further fragmentation of hydrocarbon tail"),
            ],
            description="Archetypal aliphatic ketone demonstrating rapid McLafferty beta-cleavage via 6-membered cyclic intermediate (m/z 58) and dominant acylium base peak (m/z 43).",
        ),
    ]
    return {s.id: s for s in standards}


MS_STANDARDS_LIBRARY: Dict[str, MsStandard] = _build_curated_ms_library()


def parse_formula(formula: str) -> Dict[str, int]:
    """Parses chemical formula into element counts (e.g. C7H7Cl -> {'C': 7, 'H': 7, 'Cl': 1})."""
    counts: Dict[str, int] = {}
    pattern = r"([A-Z][a-z]*)(\d*)"
    for element, count_str in re.findall(pattern, formula):
        if not element:
            continue
        c = int(count_str) if count_str else 1
        counts[element] = counts.get(element, 0) + c
    return counts


class MassSpectrometryEngine:
    @staticmethod
    def get_catalog() -> List[MsStandard]:
        return list(MS_STANDARDS_LIBRARY.values())

    @staticmethod
    def simulate_ms(req: MsSimulationRequest) -> MsSimulationResponse:
        std_id = req.standard_id or "butylbenzene"
        if std_id in MS_STANDARDS_LIBRARY:
            std = MS_STANDARDS_LIBRARY[std_id]
            # Identify neutral losses
            mol_ion = next((p for p in std.peaks if p.is_molecular_ion), None)
            losses: List[str] = []
            if mol_ion:
                for p in std.peaks:
                    if not p.is_molecular_ion:
                        diff = round(mol_ion.mz - p.mz)
                        if diff == 1:
                            losses.append(f"M - 1 (Loss of .H, forming {p.fragment_name})")
                        elif diff == 15:
                            losses.append(f"M - 15 (Loss of .CH3 methyl radical)")
                        elif diff == 18:
                            losses.append(f"M - 18 (Neutral H2O water loss)")
                        elif diff == 28:
                            losses.append(f"M - 28 (Neutral CO or C2H4 loss)")
                        elif diff == 42:
                            losses.append(f"M - 42 (Neutral C3H6 propene McLafferty loss)")
                        elif diff in (35, 37):
                            losses.append(f"M - {diff} (Loss of chlorine radical .Cl)")
                        elif diff in (79, 81):
                            losses.append(f"M - {diff} (Loss of bromine radical .Br)")

                # Secondary pairwise neutral losses between prominent peaks
                for i in range(len(std.peaks)):
                    for j in range(i + 1, len(std.peaks)):
                        p_high = std.peaks[i]
                        p_low = std.peaks[j]
                        if p_high.mz > p_low.mz:
                            step = round(p_high.mz - p_low.mz)
                            if step == 28:
                                losses.append(f"Decarbonylation (CO loss, -28 Da) from m/z {int(p_high.mz)} to {int(p_low.mz)}")
                            elif step == 18:
                                losses.append(f"Dehydration (-18 Da) from m/z {int(p_high.mz)} to {int(p_low.mz)}")

            stability = "high" if (mol_ion and mol_ion.relative_intensity > 40.0) else (
                "moderate" if (mol_ion and mol_ion.relative_intensity > 10.0) else "fragile / absent"
            )

            return MsSimulationResponse(
                analyte_name=std.name,
                formula=std.formula,
                exact_mass=std.monoisotopic_mass,
                base_peak_mz=std.base_peak_mz,
                molecular_ion_mz=mol_ion.mz if mol_ion else std.base_peak_mz,
                molecular_ion_stability=stability,
                spectrum=std.peaks,
                diagnostic_neutral_losses=losses,
            )

        # Fallback for unknown / generic formula
        elem_map = parse_formula(req.custom_formula or "C6H6")
        c = elem_map.get("C", 6)
        h = elem_map.get("H", 6)
        mass = round(c * 12.0 + h * 1.008, 2)
        generic_peaks = [
            MassPeak(mz=mass, relative_intensity=100.0, fragment_formula=f"[{req.custom_formula or 'C6H6'}]+.", fragment_name="Molecular Ion", mechanism="70eV electron impact", is_molecular_ion=True),
            MassPeak(mz=round(mass - 15.0, 1), relative_intensity=35.0, fragment_formula="[M - CH3]+", fragment_name="Demethylated Cation", mechanism="Alpha-cleavage"),
        ]
        return MsSimulationResponse(
            analyte_name=f"Custom Analyte ({req.custom_formula})",
            formula=req.custom_formula or "C6H6",
            exact_mass=mass,
            base_peak_mz=mass,
            molecular_ion_mz=mass,
            molecular_ion_stability="moderate",
            spectrum=generic_peaks,
            diagnostic_neutral_losses=["M - 15 (Methyl loss)"],
        )

    @staticmethod
    def calculate_isotope_envelope(req: IsotopeEnvelopeRequest) -> IsotopeEnvelopeResponse:
        counts = parse_formula(req.formula)
        n_c = counts.get("C", 0)
        n_h = counts.get("H", 0)
        n_n = counts.get("N", 0)
        n_o = counts.get("O", 0)
        n_s = counts.get("S", 0)
        n_cl = counts.get("Cl", 0)
        n_br = counts.get("Br", 0)

        # Monoisotopic exact mass
        mass_mono = (
            n_c * 12.00000
            + n_h * 1.007825
            + n_n * 14.003074
            + n_o * 15.994915
            + n_s * 31.972071
            + n_cl * 34.968853
            + n_br * 78.918338
        )

        # Theoretical M+1 percentage relative to M (100%)
        # Carbon-13 (1.11%), Nitrogen-15 (0.37%), Hydrogen-2 (0.015%), Oxygen-17 (0.038%)
        pct_m1 = round(n_c * 1.11 + n_n * 0.37 + n_h * 0.015 + n_o * 0.038, 2)

        # Theoretical M+2 percentage
        # Carbon-13 binomial: (1.1% * n_c)^2 / 200
        # Chlorine-37 (~32.5%), Bromine-81 (~97.3%), Sulfur-34 (~4.4%), Oxygen-18 (~0.20%)
        pct_m2 = round(
            ((1.11 * n_c) ** 2) / 200.0
            + n_o * 0.20
            + n_s * 4.40
            + n_cl * 32.50
            + n_br * 97.30,
            2,
        )

        peaks = [
            IsotopePeak(mass=round(mass_mono, 3), relative_abundance=100.0, isotopic_label="M"),
            IsotopePeak(mass=round(mass_mono + 1.003, 3), relative_abundance=pct_m1, isotopic_label="M+1"),
            IsotopePeak(mass=round(mass_mono + 2.000, 3), relative_abundance=pct_m2, isotopic_label="M+2"),
        ]

        if n_cl > 1 or n_br > 1:
            # Add M+4 if multiple halogens
            pct_m4 = round(
                (n_cl * (n_cl - 1) / 2.0) * ((32.5 / 100.0) ** 2) * 100.0
                + (n_br * (n_br - 1) / 2.0) * ((97.3 / 100.0) ** 2) * 100.0,
                2,
            )
            peaks.append(IsotopePeak(mass=round(mass_mono + 4.000, 3), relative_abundance=pct_m4, isotopic_label="M+4"))

        # Determine signature
        if n_br >= 1 and n_cl == 0:
            signature = f"Characteristic Bromine pattern ({n_br} Br: ~1:1 doublet)"
        elif n_cl >= 1 and n_br == 0:
            signature = f"Characteristic Chlorine pattern ({n_cl} Cl: ~3:1 doublet)"
        elif n_cl >= 1 and n_br >= 1:
            signature = f"Mixed Halogen envelope ({n_cl} Cl + {n_br} Br)"
        elif n_s >= 1:
            signature = f"Sulfur-rich isotopic signature (enhanced M+2 by {n_s * 4.4}%)"
        else:
            signature = f"Standard organic carbon-13 binomial envelope ({n_c} Carbons)"

        return IsotopeEnvelopeResponse(
            formula=req.formula,
            monoisotopic_mass=round(mass_mono, 4),
            m_plus_1_expected_pct=pct_m1,
            m_plus_2_expected_pct=pct_m2,
            peaks=peaks,
            pattern_signature=signature,
        )

    @staticmethod
    def calculate_van_deemter(req: VanDeemterRequest) -> VanDeemterResponse:
        dp_cm = req.particle_diameter_um * 1e-4  # um -> cm
        dm = req.diffusion_coeff_cm2_s
        k = req.retention_factor_k

        # Coefficients:
        # A = 2 * lambda * dp (Eddy diffusion)
        # B = 2 * gamma * Dm (Longitudinal molecular diffusion)
        # C = [f(k) * dp^2 / Dm] (Mobile + stationary mass transfer resistance)
        lambda_pack = 0.8
        gamma_diff = 0.6
        a_cm = 2.0 * lambda_pack * dp_cm
        b_cm2_s = 2.0 * gamma_diff * dm
        # Mass transfer factor
        c_m = (1.0 / 6.0) * (k / (1.0 + k) ** 2) * (dp_cm ** 2) / dm
        c_s = 0.05 * (k / (1.0 + k) ** 2)  # stationary film resistance
        c_tot_s = c_m + c_s

        # Optimum velocity u_opt = sqrt(B / C)
        u_opt = math.sqrt(b_cm2_s / max(c_tot_s, 1e-9))
        h_min_cm = a_cm + 2.0 * math.sqrt(b_cm2_s * c_tot_s)

        a_um = round(a_cm * 1e4, 2)
        h_min_um = round(h_min_cm * 1e4, 2)

        # Generate Van Deemter curve
        velocities = req.velocities_cm_s or [round(v * 0.02, 3) for v in range(2, 35)]
        curve: List[VanDeemterPoint] = []
        for u in velocities:
            if u <= 0.001:
                continue
            h_eddy = a_cm * 1e4
            h_long = (b_cm2_s / u) * 1e4
            h_mass = (c_tot_s * u) * 1e4
            h_tot = h_eddy + h_long + h_mass
            curve.append(
                VanDeemterPoint(
                    linear_velocity_cm_s=round(u, 3),
                    plate_height_h_um=round(h_tot, 2),
                    eddy_diffusion_a_um=round(h_eddy, 2),
                    longitudinal_diffusion_b_um=round(h_long, 2),
                    mass_transfer_c_um=round(h_mass, 2),
                )
            )

        col_length_cm = req.column_length_mm / 10.0
        max_plates = int(round(col_length_cm / (h_min_cm)))

        return VanDeemterResponse(
            a_term_um=a_um,
            b_term_cm2_s=round(b_cm2_s, 7),
            c_term_s=round(c_tot_s, 6),
            optimum_velocity_cm_s=round(u_opt, 3),
            minimum_plate_height_um=h_min_um,
            maximum_theoretical_plates=max_plates,
            curve=curve,
        )

    @staticmethod
    def simulate_chromatogram(req: ChromatogramSimulationRequest) -> ChromatogramSimulationResponse:
        # Stationary phase dead time: t0 = V0 / Flow
        # Approx column void volume V0 ~ 0.68 * pi * r^2 * L
        radius_cm = 0.23  # standard 4.6mm ID column
        col_length_cm = req.column_length_mm / 10.0
        void_volume_ml = 0.68 * math.pi * (radius_cm ** 2) * col_length_cm
        t0 = void_volume_ml / max(req.flow_rate_ml_min, 0.1)

        # Analyte retention coefficients
        retention_data = {
            "benzene": {"formula": "C6H6", "base_k": 1.4, "mz": 78.0},
            "toluene": {"formula": "C7H8", "base_k": 2.6, "mz": 91.0},
            "ethylbenzene": {"formula": "C8H10", "base_k": 3.9, "mz": 91.0},
            "butylbenzene": {"formula": "C10H14", "base_k": 6.8, "mz": 91.0},
            "acetophenone": {"formula": "C8H8O", "base_k": 4.5, "mz": 105.0},
            "chlorobenzene": {"formula": "C6H5Cl", "base_k": 3.2, "mz": 112.0},
            "bromobenzene": {"formula": "C6H5Br", "base_k": 4.8, "mz": 156.0},
        }

        # Temperature effect on k': ln(k) ~ -DeltaH / RT
        temp_factor = math.exp(-0.015 * (req.temperature_c - 100.0))
        n_plates = 12000  # typical HPLC / capillary GC column efficiency

        peaks: List[ChromatographicPeak] = []
        for aid in req.analyte_ids:
            clean_id = aid.lower().strip()
            item = retention_data.get(clean_id, {"formula": "Unknown", "base_k": 2.0, "mz": 100.0})
            k_eff = item["base_k"] * temp_factor
            tr = t0 * (1.0 + k_eff)
            # Peak width at base w = 4 * tr / sqrt(N)
            w = (4.0 * tr) / math.sqrt(n_plates)
            area = 1000.0 * (1.0 + 0.1 * k_eff)  # arbitrary detector signal

            peaks.append(
                ChromatographicPeak(
                    analyte_name=clean_id.capitalize(),
                    formula=item["formula"],
                    retention_time_min=round(tr, 3),
                    peak_width_min=round(w, 3),
                    peak_area=round(area, 1),
                    retention_factor_k=round(k_eff, 2),
                    base_mz=item["mz"],
                )
            )

        # Sort by retention time
        peaks.sort(key=lambda p: p.retention_time_min)

        # Calculate resolution Rs = 2*(tr2 - tr1)/(w1 + w2)
        resolutions: Dict[str, float] = {}
        for i in range(len(peaks) - 1):
            p1 = peaks[i]
            p2 = peaks[i + 1]
            rs = (2.0 * (p2.retention_time_min - p1.retention_time_min)) / (p1.peak_width_min + p2.peak_width_min)
            resolutions[f"{p1.analyte_name}/{p2.analyte_name}"] = round(rs, 2)

        max_tr = peaks[-1].retention_time_min if peaks else t0
        total_time = round(max_tr * 1.25, 2)

        return ChromatogramSimulationResponse(
            dead_time_t0_min=round(t0, 3),
            total_run_time_min=total_time,
            peaks=peaks,
            resolution_pairs=resolutions,
        )
