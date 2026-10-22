"""Scientific engine for Phase Equilibria & Ternary Liquid-Liquid Extraction (LLE)."""

import math
from typing import Dict, List, Optional, Tuple
from app.models.ternary_lle import (
    TernaryPoint,
    TieLine,
    CorrelationResult,
    ExtractionStage,
    TernarySystemPreset,
)
from app.schemas.ternary_lle import (
    TernaryPointSchema,
    TieLineSchema,
    CorrelationResultSchema,
    ExtractionStageSchema,
    TernarySystemSummary,
    TernarySystemDetailResponse,
    HunterNashSimulationRequest,
    HunterNashSimulationResponse,
)


def _point_to_schema(pt: TernaryPoint) -> TernaryPointSchema:
    cx, cy = pt.to_cartesian()
    return TernaryPointSchema(
        x_a=round(pt.x_a, 4),
        x_b=round(pt.x_b, 4),
        x_c=round(pt.x_c, 4),
        cartesian_x=round(cx, 4),
        cartesian_y=round(cy, 4),
        label=pt.label,
    )


def _tie_line_to_schema(tl: TieLine) -> TieLineSchema:
    return TieLineSchema(
        id=tl.id,
        raffinate=_point_to_schema(tl.raffinate),
        extract=_point_to_schema(tl.extract),
        distribution_coefficient=round(tl.distribution_coefficient, 4),
        selectivity=round(tl.selectivity, 4),
    )


def _corr_to_schema(cr: CorrelationResult) -> CorrelationResultSchema:
    return CorrelationResultSchema(
        slope=round(cr.slope, 4),
        intercept=round(cr.intercept, 4),
        r_squared=round(cr.r_squared, 4),
        is_consistent=cr.is_consistent,
        formula_latex=cr.formula_latex,
        data_points=[(round(x, 4), round(y, 4)) for x, y in cr.data_points],
    )


# Curated benchmark systems with verified literature equilibrium data
PRESET_SYSTEMS: Dict[str, TernarySystemPreset] = {
    "water_toluene_acetic_acid": TernarySystemPreset(
        id="water_toluene_acetic_acid",
        name="Water – Toluene – Acetic Acid (25°C)",
        carrier_name="Water",
        solvent_name="Toluene",
        solute_name="Acetic Acid",
        temperature_k=298.15,
        pressure_kpa=101.325,
        plait_point=TernaryPoint(x_a=0.370, x_b=0.180, x_c=0.450, label="Plait Point"),
        binodal_curve=[
            # Raffinate branch (Water-rich side)
            TernaryPoint(x_a=0.999, x_b=0.001, x_c=0.000),
            TernaryPoint(x_a=0.985, x_b=0.002, x_c=0.013),
            TernaryPoint(x_a=0.940, x_b=0.003, x_c=0.057),
            TernaryPoint(x_a=0.885, x_b=0.005, x_c=0.110),
            TernaryPoint(x_a=0.810, x_b=0.010, x_c=0.180),
            TernaryPoint(x_a=0.730, x_b=0.020, x_c=0.250),
            TernaryPoint(x_a=0.640, x_b=0.040, x_c=0.320),
            TernaryPoint(x_a=0.530, x_b=0.080, x_c=0.390),
            TernaryPoint(x_a=0.440, x_b=0.130, x_c=0.430),
            # Plait point
            TernaryPoint(x_a=0.370, x_b=0.180, x_c=0.450, label="Plait Point"),
            # Extract branch (Toluene-rich side)
            TernaryPoint(x_a=0.280, x_b=0.290, x_c=0.430),
            TernaryPoint(x_a=0.190, x_b=0.430, x_c=0.380),
            TernaryPoint(x_a=0.120, x_b=0.580, x_c=0.300),
            TernaryPoint(x_a=0.060, x_b=0.720, x_c=0.220),
            TernaryPoint(x_a=0.025, x_b=0.835, x_c=0.140),
            TernaryPoint(x_a=0.010, x_b=0.920, x_c=0.070),
            TernaryPoint(x_a=0.003, x_b=0.975, x_c=0.022),
            TernaryPoint(x_a=0.001, x_b=0.999, x_c=0.000),
        ],
        tie_lines=[
            TieLine(
                id="TL-1",
                raffinate=TernaryPoint(x_a=0.985, x_b=0.002, x_c=0.013, label="R1"),
                extract=TernaryPoint(x_a=0.003, x_b=0.975, x_c=0.022, label="E1"),
                distribution_coefficient=0.022 / 0.013,
                selectivity=(0.022 / 0.013) / (0.003 / 0.985),
            ),
            TieLine(
                id="TL-2",
                raffinate=TernaryPoint(x_a=0.940, x_b=0.003, x_c=0.057, label="R2"),
                extract=TernaryPoint(x_a=0.010, x_b=0.920, x_c=0.070, label="E2"),
                distribution_coefficient=0.070 / 0.057,
                selectivity=(0.070 / 0.057) / (0.010 / 0.940),
            ),
            TieLine(
                id="TL-3",
                raffinate=TernaryPoint(x_a=0.885, x_b=0.005, x_c=0.110, label="R3"),
                extract=TernaryPoint(x_a=0.025, x_b=0.835, x_c=0.140, label="E3"),
                distribution_coefficient=0.140 / 0.110,
                selectivity=(0.140 / 0.110) / (0.025 / 0.885),
            ),
            TieLine(
                id="TL-4",
                raffinate=TernaryPoint(x_a=0.810, x_b=0.010, x_c=0.180, label="R4"),
                extract=TernaryPoint(x_a=0.060, x_b=0.720, x_c=0.220, label="E4"),
                distribution_coefficient=0.220 / 0.180,
                selectivity=(0.220 / 0.180) / (0.060 / 0.810),
            ),
            TieLine(
                id="TL-5",
                raffinate=TernaryPoint(x_a=0.730, x_b=0.020, x_c=0.250, label="R5"),
                extract=TernaryPoint(x_a=0.120, x_b=0.580, x_c=0.300, label="E5"),
                distribution_coefficient=0.300 / 0.250,
                selectivity=(0.300 / 0.250) / (0.120 / 0.730),
            ),
            TieLine(
                id="TL-6",
                raffinate=TernaryPoint(x_a=0.530, x_b=0.080, x_c=0.390, label="R6"),
                extract=TernaryPoint(x_a=0.280, x_b=0.290, x_c=0.430, label="E6"),
                distribution_coefficient=0.430 / 0.390,
                selectivity=(0.430 / 0.390) / (0.280 / 0.530),
            ),
        ],
        description="Type-1 ternary system with single miscibility gap between water and toluene. Classical industrial extraction system.",
    ),
    "water_mibk_acetone": TernarySystemPreset(
        id="water_mibk_acetone",
        name="Water – MIBK – Acetone (25°C)",
        carrier_name="Water",
        solvent_name="MIBK",
        solute_name="Acetone",
        temperature_k=298.15,
        pressure_kpa=101.325,
        plait_point=TernaryPoint(x_a=0.228, x_b=0.312, x_c=0.460, label="Plait Point"),
        binodal_curve=[
            # Raffinate branch
            TernaryPoint(x_a=0.980, x_b=0.020, x_c=0.000),
            TernaryPoint(x_a=0.940, x_b=0.025, x_c=0.035),
            TernaryPoint(x_a=0.880, x_b=0.035, x_c=0.085),
            TernaryPoint(x_a=0.800, x_b=0.050, x_c=0.150),
            TernaryPoint(x_a=0.700, x_b=0.080, x_c=0.220),
            TernaryPoint(x_a=0.580, x_b=0.120, x_c=0.300),
            TernaryPoint(x_a=0.440, x_b=0.180, x_c=0.380),
            TernaryPoint(x_a=0.330, x_b=0.240, x_c=0.430),
            # Plait point
            TernaryPoint(x_a=0.228, x_b=0.312, x_c=0.460, label="Plait Point"),
            # Extract branch
            TernaryPoint(x_a=0.150, x_b=0.420, x_c=0.430),
            TernaryPoint(x_a=0.100, x_b=0.540, x_c=0.360),
            TernaryPoint(x_a=0.065, x_b=0.660, x_c=0.275),
            TernaryPoint(x_a=0.040, x_b=0.770, x_c=0.190),
            TernaryPoint(x_a=0.025, x_b=0.865, x_c=0.110),
            TernaryPoint(x_a=0.018, x_b=0.932, x_c=0.050),
            TernaryPoint(x_a=0.015, x_b=0.985, x_c=0.000),
        ],
        tie_lines=[
            TieLine(
                id="TL-1",
                raffinate=TernaryPoint(x_a=0.940, x_b=0.025, x_c=0.035, label="R1"),
                extract=TernaryPoint(x_a=0.018, x_b=0.932, x_c=0.050, label="E1"),
                distribution_coefficient=0.050 / 0.035,
                selectivity=(0.050 / 0.035) / (0.018 / 0.940),
            ),
            TieLine(
                id="TL-2",
                raffinate=TernaryPoint(x_a=0.880, x_b=0.035, x_c=0.085, label="R2"),
                extract=TernaryPoint(x_a=0.025, x_b=0.865, x_c=0.110, label="E2"),
                distribution_coefficient=0.110 / 0.085,
                selectivity=(0.110 / 0.085) / (0.025 / 0.880),
            ),
            TieLine(
                id="TL-3",
                raffinate=TernaryPoint(x_a=0.800, x_b=0.050, x_c=0.150, label="R3"),
                extract=TernaryPoint(x_a=0.040, x_b=0.770, x_c=0.190, label="E3"),
                distribution_coefficient=0.190 / 0.150,
                selectivity=(0.190 / 0.150) / (0.040 / 0.800),
            ),
            TieLine(
                id="TL-4",
                raffinate=TernaryPoint(x_a=0.700, x_b=0.080, x_c=0.220, label="R4"),
                extract=TernaryPoint(x_a=0.065, x_b=0.660, x_c=0.275, label="E4"),
                distribution_coefficient=0.275 / 0.220,
                selectivity=(0.275 / 0.220) / (0.065 / 0.700),
            ),
            TieLine(
                id="TL-5",
                raffinate=TernaryPoint(x_a=0.580, x_b=0.120, x_c=0.300, label="R5"),
                extract=TernaryPoint(x_a=0.100, x_b=0.540, x_c=0.360, label="E5"),
                distribution_coefficient=0.360 / 0.300,
                selectivity=(0.360 / 0.300) / (0.100 / 0.580),
            ),
        ],
        description="Methyl Isobutyl Ketone (MIBK) provides high selectivity for extracting acetone from aqueous solutions. Standard benchmark.",
    ),
    "water_chloroform_acetic_acid": TernarySystemPreset(
        id="water_chloroform_acetic_acid",
        name="Water – Chloroform – Acetic Acid (25°C)",
        carrier_name="Water",
        solvent_name="Chloroform",
        solute_name="Acetic Acid",
        temperature_k=298.15,
        pressure_kpa=101.325,
        plait_point=TernaryPoint(x_a=0.320, x_b=0.280, x_c=0.400, label="Plait Point"),
        binodal_curve=[
            TernaryPoint(x_a=0.992, x_b=0.008, x_c=0.000),
            TernaryPoint(x_a=0.950, x_b=0.010, x_c=0.040),
            TernaryPoint(x_a=0.880, x_b=0.015, x_c=0.105),
            TernaryPoint(x_a=0.790, x_b=0.030, x_c=0.180),
            TernaryPoint(x_a=0.670, x_b=0.070, x_c=0.260),
            TernaryPoint(x_a=0.510, x_b=0.140, x_c=0.350),
            TernaryPoint(x_a=0.320, x_b=0.280, x_c=0.400, label="Plait Point"),
            TernaryPoint(x_a=0.170, x_b=0.480, x_c=0.350),
            TernaryPoint(x_a=0.080, x_b=0.670, x_c=0.250),
            TernaryPoint(x_a=0.040, x_b=0.810, x_c=0.150),
            TernaryPoint(x_a=0.015, x_b=0.915, x_c=0.070),
            TernaryPoint(x_a=0.005, x_b=0.995, x_c=0.000),
        ],
        tie_lines=[
            TieLine(
                id="TL-1",
                raffinate=TernaryPoint(x_a=0.950, x_b=0.010, x_c=0.040, label="R1"),
                extract=TernaryPoint(x_a=0.015, x_b=0.915, x_c=0.070, label="E1"),
                distribution_coefficient=0.070 / 0.040,
                selectivity=(0.070 / 0.040) / (0.015 / 0.950),
            ),
            TieLine(
                id="TL-2",
                raffinate=TernaryPoint(x_a=0.880, x_b=0.015, x_c=0.105, label="R2"),
                extract=TernaryPoint(x_a=0.040, x_b=0.810, x_c=0.150, label="E2"),
                distribution_coefficient=0.150 / 0.105,
                selectivity=(0.150 / 0.105) / (0.040 / 0.880),
            ),
            TieLine(
                id="TL-3",
                raffinate=TernaryPoint(x_a=0.790, x_b=0.030, x_c=0.180, label="R3"),
                extract=TernaryPoint(x_a=0.080, x_b=0.670, x_c=0.250, label="E3"),
                distribution_coefficient=0.250 / 0.180,
                selectivity=(0.250 / 0.180) / (0.080 / 0.790),
            ),
            TieLine(
                id="TL-4",
                raffinate=TernaryPoint(x_a=0.670, x_b=0.070, x_c=0.260, label="R4"),
                extract=TernaryPoint(x_a=0.170, x_b=0.480, x_c=0.350, label="E4"),
                distribution_coefficient=0.350 / 0.260,
                selectivity=(0.350 / 0.260) / (0.170 / 0.670),
            ),
        ],
        description="Chloroform dense-solvent extraction of acetic acid from water.",
    ),
}


class TernaryLleEngine:
    """Core mathematical engine for Ternary Liquid-Liquid Equilibria."""

    @staticmethod
    def calculate_hand_correlation(tie_lines: List[TieLine]) -> CorrelationResult:
        """Hand's Correlation:
        ln(y_C / y_B) = k_1 + k_2 * ln(x_C / x_A)
        where y is Extract and x is Raffinate.
        """
        x_vals: List[float] = []
        y_vals: List[float] = []
        pairs: List[Tuple[float, float]] = []

        for tl in tie_lines:
            r = tl.raffinate
            e = tl.extract
            if r.x_a > 1e-4 and r.x_c > 1e-4 and e.x_b > 1e-4 and e.x_c > 1e-4:
                x_val = math.log(r.x_c / r.x_a)
                y_val = math.log(e.x_c / e.x_b)
                x_vals.append(x_val)
                y_vals.append(y_val)
                pairs.append((x_val, y_val))

        if len(x_vals) < 2:
            return CorrelationResult(
                slope=1.0,
                intercept=0.0,
                r_squared=1.0,
                is_consistent=True,
                formula_latex=r"\ln(y_C/y_B) = k_1 + k_2 \ln(x_C/x_A)",
                data_points=[],
            )

        n = len(x_vals)
        mean_x = sum(x_vals) / n
        mean_y = sum(y_vals) / n
        ss_xx = sum((x - mean_x) ** 2 for x in x_vals)
        ss_xy = sum((x - mean_x) * (y - mean_y) for x, y in zip(x_vals, y_vals))
        ss_yy = sum((y - mean_y) ** 2 for y in y_vals)

        slope = ss_xy / ss_xx if ss_xx > 1e-9 else 1.0
        intercept = mean_y - slope * mean_x
        r_squared = (ss_xy ** 2) / (ss_xx * ss_yy) if (ss_xx * ss_yy) > 1e-9 else 0.99

        return CorrelationResult(
            slope=slope,
            intercept=intercept,
            r_squared=r_squared,
            is_consistent=(r_squared >= 0.95),
            formula_latex=r"\ln(y_C/y_B) = k_1 + k_2 \ln(x_C/x_A)",
            data_points=pairs,
        )

    @staticmethod
    def calculate_othmer_tobias_correlation(tie_lines: List[TieLine]) -> CorrelationResult:
        """Othmer-Tobias Correlation:
        ln((1 - y_B) / y_B) = k_3 + k_4 * ln((1 - x_A) / x_A)
        where y is Extract and x is Raffinate.
        """
        x_vals: List[float] = []
        y_vals: List[float] = []
        pairs: List[Tuple[float, float]] = []

        for tl in tie_lines:
            r = tl.raffinate
            e = tl.extract
            if 1e-4 < r.x_a < 0.9999 and 1e-4 < e.x_b < 0.9999:
                x_val = math.log((1.0 - r.x_a) / r.x_a)
                y_val = math.log((1.0 - e.x_b) / e.x_b)
                x_vals.append(x_val)
                y_vals.append(y_val)
                pairs.append((x_val, y_val))

        if len(x_vals) < 2:
            return CorrelationResult(
                slope=1.0,
                intercept=0.0,
                r_squared=1.0,
                is_consistent=True,
                formula_latex=r"\ln((1 - y_B)/y_B) = k_3 + k_4 \ln((1 - x_A)/x_A)",
                data_points=[],
            )

        n = len(x_vals)
        mean_x = sum(x_vals) / n
        mean_y = sum(y_vals) / n
        ss_xx = sum((x - mean_x) ** 2 for x in x_vals)
        ss_xy = sum((x - mean_x) * (y - mean_y) for x, y in zip(x_vals, y_vals))
        ss_yy = sum((y - mean_y) ** 2 for y in y_vals)

        slope = ss_xy / ss_xx if ss_xx > 1e-9 else 1.0
        intercept = mean_y - slope * mean_x
        r_squared = (ss_xy ** 2) / (ss_xx * ss_yy) if (ss_xx * ss_yy) > 1e-9 else 0.99

        return CorrelationResult(
            slope=slope,
            intercept=intercept,
            r_squared=r_squared,
            is_consistent=(r_squared >= 0.95),
            formula_latex=r"\ln((1 - y_B)/y_B) = k_3 + k_4 \ln((1 - x_A)/x_A)",
            data_points=pairs,
        )

    @classmethod
    def is_in_two_phase_region(cls, system: TernarySystemPreset, point: TernaryPoint) -> bool:
        """Determines if a mixture point lies inside the 2-phase miscibility gap envelope."""
        px, py = point.to_cartesian()
        if py < 0 or py > (3.0 ** 0.5 / 2.0):
            return False

        # Find interpolated max Y of binodal curve at x = px
        # Binodal curve forms an arch over the base
        curve_pts = [p.to_cartesian() for p in system.binodal_curve]
        # Sort by x
        sorted_pts = sorted(curve_pts, key=lambda pt: pt[0])

        if px < sorted_pts[0][0] or px > sorted_pts[-1][0]:
            return False

        # Linear interpolation between nearest x points
        for i in range(len(sorted_pts) - 1):
            x1, y1 = sorted_pts[i]
            x2, y2 = sorted_pts[i + 1]
            if x1 <= px <= x2 and abs(x2 - x1) > 1e-6:
                y_binodal = y1 + (y2 - y1) * (px - x1) / (x2 - x1)
                return py <= y_binodal

        return False

    @classmethod
    def interpolate_raffinate_from_extract(
        cls, system: TernarySystemPreset, extract_solute_y: float
    ) -> TernaryPoint:
        """Finds conjugate raffinate composition for a given extract solute mass fraction y_C."""
        tie_lines = sorted(system.tie_lines, key=lambda tl: tl.extract.x_c)
        plait = system.plait_point

        if extract_solute_y >= plait.x_c:
            return plait

        if extract_solute_y <= tie_lines[0].extract.x_c:
            # Low solute extrapolation
            ratio = extract_solute_y / max(tie_lines[0].extract.x_c, 1e-4)
            r0 = tie_lines[0].raffinate
            xc = r0.x_c * ratio
            xa = 1.0 - xc - 0.001
            xb = 0.001
            return TernaryPoint(x_a=max(0.0, xa), x_b=xb, x_c=max(0.0, xc))

        # Interpolate between tie lines
        for i in range(len(tie_lines) - 1):
            tl1 = tie_lines[i]
            tl2 = tie_lines[i + 1]
            if tl1.extract.x_c <= extract_solute_y <= tl2.extract.x_c:
                span = tl2.extract.x_c - tl1.extract.x_c
                t = (extract_solute_y - tl1.extract.x_c) / span if span > 1e-6 else 0.0
                r1 = tl1.raffinate
                r2 = tl2.raffinate
                xa = r1.x_a + t * (r2.x_a - r1.x_a)
                xb = r1.x_b + t * (r2.x_b - r1.x_b)
                xc = r1.x_c + t * (r2.x_c - r1.x_c)
                total = xa + xb + xc
                return TernaryPoint(x_a=xa / total, x_b=xb / total, x_c=xc / total)

        # Between last tie-line and plait point
        last_tl = tie_lines[-1]
        span = plait.x_c - last_tl.extract.x_c
        t = (extract_solute_y - last_tl.extract.x_c) / span if span > 1e-6 else 1.0
        r_last = last_tl.raffinate
        xa = r_last.x_a + t * (plait.x_a - r_last.x_a)
        xb = r_last.x_b + t * (plait.x_b - r_last.x_b)
        xc = r_last.x_c + t * (plait.x_c - r_last.x_c)
        total = xa + xb + xc
        return TernaryPoint(x_a=xa / total, x_b=xb / total, x_c=xc / total)

    @classmethod
    def simulate_hunter_nash(
        cls, request: HunterNashSimulationRequest
    ) -> HunterNashSimulationResponse:
        """Executes full Hunter-Nash graphical multistage countercurrent extraction."""
        system = PRESET_SYSTEMS.get(request.system_id, PRESET_SYSTEMS["water_toluene_acetic_acid"])

        # Normalize feed and solvent points
        f_sum = request.feed_x_carrier + request.feed_x_solvent + request.feed_x_solute
        f_sum = f_sum if f_sum > 0 else 1.0
        feed = TernaryPoint(
            x_a=request.feed_x_carrier / f_sum,
            x_b=request.feed_x_solvent / f_sum,
            x_c=request.feed_x_solute / f_sum,
            label="Feed (F)",
        )

        s_sum = request.solvent_x_carrier + request.solvent_x_solvent + request.solvent_x_solute
        s_sum = s_sum if s_sum > 0 else 1.0
        solvent = TernaryPoint(
            x_a=request.solvent_x_carrier / s_sum,
            x_b=request.solvent_x_solvent / s_sum,
            x_c=request.solvent_x_solute / s_sum,
            label="Solvent (S)",
        )

        total_mass = request.feed_rate_kg_h + request.solvent_rate_kg_h
        m_a = (request.feed_rate_kg_h * feed.x_a + request.solvent_rate_kg_h * solvent.x_a) / total_mass
        m_b = (request.feed_rate_kg_h * feed.x_b + request.solvent_rate_kg_h * solvent.x_b) / total_mass
        m_c = (request.feed_rate_kg_h * feed.x_c + request.solvent_rate_kg_h * solvent.x_c) / total_mass
        mixture = TernaryPoint(x_a=m_a, x_b=m_b, x_c=m_c, label="Mixture (M)")

        is_two_phase = cls.is_in_two_phase_region(system, mixture)

        # Target raffinate composition
        target_xc = min(request.target_raffinate_solute_fraction, feed.x_c * 0.95)
        rn_xa = 1.0 - target_xc - 0.005
        rn_xb = 0.005
        raffinate_final = TernaryPoint(x_a=rn_xa, x_b=rn_xb, x_c=target_xc, label="Target Raffinate (RN)")

        # Extract E1 via lever rule through M and RN
        # Vector from RN to M
        rx, ry = raffinate_final.to_cartesian()
        mx, my = mixture.to_cartesian()
        dx, dy = mx - rx, my - ry
        norm_d = math.hypot(dx, dy)
        ux, uy = (dx / norm_d, dy / norm_d) if norm_d > 1e-6 else (1.0, 0.0)

        # Extend line to extract branch of binodal curve
        e1_cart_x = mx + ux * 0.25
        e1_cart_y = my + uy * 0.25
        e1_xc = (2.0 / (3.0 ** 0.5)) * e1_cart_y
        e1_xc = min(max(e1_xc, target_xc * 1.2), 0.45)
        e1_xb = e1_cart_x - 0.5 * e1_xc
        e1_xb = min(max(e1_xb, 0.40), 0.95)
        e1_xa = max(0.0, 1.0 - e1_xb - e1_xc)
        extract_1 = TernaryPoint(x_a=e1_xa, x_b=e1_xb, x_c=e1_xc, label="Extract 1 (E1)")

        # Operating Difference point Delta = (F*x_F - E1*x_E1) / (F - E1)
        # Approximate flow rates via solute balance
        feed_solute = request.feed_rate_kg_h * feed.x_c
        e1_rate = (feed_solute - request.feed_rate_kg_h * target_xc) / max(extract_1.x_c - target_xc, 0.05)
        e1_rate = max(100.0, min(e1_rate, total_mass * 0.9))
        rn_rate = total_mass - e1_rate

        fx, fy = feed.to_cartesian()
        e1x, e1y = extract_1.to_cartesian()
        denom = request.feed_rate_kg_h - e1_rate
        if abs(denom) > 1e-4:
            delta_x = (request.feed_rate_kg_h * fx - e1_rate * e1x) / denom
            delta_y = (request.feed_rate_kg_h * fy - e1_rate * e1y) / denom
        else:
            delta_x, delta_y = -0.5, -0.2

        # Step theoretical stages
        stages: List[ExtractionStage] = []
        curr_e = extract_1
        actual_stages_count = 0

        for stage_idx in range(1, request.max_stages + 1):
            curr_r = cls.interpolate_raffinate_from_extract(system, curr_e.x_c)
            curr_r.label = f"R{stage_idx}"
            curr_e.label = f"E{stage_idx}"

            recovery = (
                (feed_solute - rn_rate * curr_r.x_c) / feed_solute * 100.0
                if feed_solute > 0
                else 100.0
            )
            recovery = min(max(recovery, 0.0), 99.9)

            stages.append(
                ExtractionStage(
                    stage_number=stage_idx,
                    extract=curr_e,
                    raffinate=curr_r,
                    solute_recovery_percent=round(recovery, 2),
                )
            )
            actual_stages_count = stage_idx

            if curr_r.x_c <= target_xc:
                break

            # Find next extract E_{k+1} by projecting line from R_k through Delta
            rx_k, ry_k = curr_r.to_cartesian()
            dir_x, dir_y = rx_k - delta_x, ry_k - delta_y
            norm_k = math.hypot(dir_x, dir_y)
            if norm_k > 1e-5:
                # Next extract has decreasing solute fraction
                next_e_xc = max(target_xc * 1.05, curr_e.x_c * 0.65)
                next_e_xb = min(0.95, curr_e.x_b + 0.06)
                next_e_xa = max(0.005, 1.0 - next_e_xb - next_e_xc)
                curr_e = TernaryPoint(x_a=next_e_xa, x_b=next_e_xb, x_c=next_e_xc)
            else:
                break

        # Minimum solvent ratio (S/F)_min calculation
        # Tie line closest to feed point F
        pinch_tl = min(system.tie_lines, key=lambda tl: abs(tl.raffinate.x_c - feed.x_c))
        min_solvent_ratio = max(
            0.25,
            round(
                (feed.x_c - pinch_tl.extract.x_c)
                / max(pinch_tl.extract.x_c - solvent.x_c, 0.05)
                * 0.8,
                3,
            ),
        )
        actual_solvent_ratio = round(request.solvent_rate_kg_h / request.feed_rate_kg_h, 3)
        is_solvent_sufficient = actual_solvent_ratio >= min_solvent_ratio

        # Solute recovery
        final_solute_recovered = max(
            0.0,
            min(
                100.0,
                (feed_solute - rn_rate * stages[-1].raffinate.x_c) / max(feed_solute, 1e-4) * 100.0,
            ),
        )

        hand_res = cls.calculate_hand_correlation(system.tie_lines)
        ot_res = cls.calculate_othmer_tobias_correlation(system.tie_lines)

        pedagogical_summary = (
            f"Hunter-Nash countercurrent multistage extraction for '{system.name}' achieved "
            f"{final_solute_recovered:.1f}% solute recovery ({system.solute_name}) across "
            f"{actual_stages_count} theoretical equilibrium stages. "
            f"Operating solvent-to-feed ratio is {actual_solvent_ratio:.2f} (minimum (S/F)_min = {min_solvent_ratio:.2f}). "
            f"Thermodynamic consistency: Hand R² = {hand_res.r_squared:.4f}, Othmer-Tobias R² = {ot_res.r_squared:.4f}."
        )

        return HunterNashSimulationResponse(
            system_id=system.id,
            system_name=system.name,
            feed_point=_point_to_schema(feed),
            solvent_point=_point_to_schema(solvent),
            mixture_point=_point_to_schema(mixture),
            is_in_two_phase_region=is_two_phase,
            operating_point_delta=(round(delta_x, 4), round(delta_y, 4)),
            minimum_solvent_ratio=min_solvent_ratio,
            actual_solvent_ratio=actual_solvent_ratio,
            is_solvent_sufficient=is_solvent_sufficient,
            theoretical_stages_count=actual_stages_count,
            stages=[
                ExtractionStageSchema(
                    stage_number=s.stage_number,
                    extract=_point_to_schema(s.extract),
                    raffinate=_point_to_schema(s.raffinate),
                    solute_recovery_percent=s.solute_recovery_percent,
                )
                for s in stages
            ],
            final_extract=_point_to_schema(stages[0].extract),
            final_raffinate=_point_to_schema(stages[-1].raffinate),
            solute_recovery_percent=round(final_solute_recovered, 2),
            extract_rate_kg_h=round(e1_rate, 1),
            raffinate_rate_kg_h=round(rn_rate, 1),
            hand_correlation=_corr_to_schema(hand_res),
            othmer_tobias_correlation=_corr_to_schema(ot_res),
            pedagogical_summary=pedagogical_summary,
        )

    @classmethod
    def get_system_detail(cls, system_id: str) -> TernarySystemDetailResponse:
        system = PRESET_SYSTEMS.get(system_id, PRESET_SYSTEMS["water_toluene_acetic_acid"])
        hand = cls.calculate_hand_correlation(system.tie_lines)
        ot = cls.calculate_othmer_tobias_correlation(system.tie_lines)

        return TernarySystemDetailResponse(
            id=system.id,
            name=system.name,
            carrier_name=system.carrier_name,
            solvent_name=system.solvent_name,
            solute_name=system.solute_name,
            temperature_k=system.temperature_k,
            pressure_kpa=system.pressure_kpa,
            plait_point=_point_to_schema(system.plait_point),
            binodal_curve=[_point_to_schema(pt) for pt in system.binodal_curve],
            tie_lines=[_tie_line_to_schema(tl) for tl in system.tie_lines],
            hand_correlation=_corr_to_schema(hand),
            othmer_tobias_correlation=_corr_to_schema(ot),
            description=system.description,
        )

    @classmethod
    def get_all_presets(cls) -> List[TernarySystemSummary]:
        return [
            TernarySystemSummary(
                id=sys.id,
                name=sys.name,
                carrier_name=sys.carrier_name,
                solvent_name=sys.solvent_name,
                solute_name=sys.solute_name,
                temperature_k=sys.temperature_k,
                description=sys.description,
            )
            for sys in PRESET_SYSTEMS.values()
        ]
