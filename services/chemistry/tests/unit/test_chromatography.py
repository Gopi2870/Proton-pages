"""Unit tests for Analytical Chromatography & Separation Science Service."""

import pytest
from app.models.chromatography import (
    ChromatographyModality,
    ElutionMode,
    DetectorType,
    StationaryPhaseType,
    ColumnParameters,
    MobilePhaseConditions,
)
from app.schemas.chromatography import AnalyteCompoundInput
from app.services.chromatography_service import chromatography_service


def test_van_deemter_hplc():
    """Verify HPLC van Deemter calculation, optimal velocity, and minimum plate height."""
    col = ColumnParameters(
        name="Test C18",
        length_mm=150.0,
        inner_diameter_mm=4.6,
        particle_size_um=3.5,
        stationary_phase=StationaryPhaseType.C18_OCTADECYL,
    )
    cond = MobilePhaseConditions(
        flow_rate_ml_min=1.0,
        modality=ChromatographyModality.HPLC,
    )

    vd = chromatography_service.calculate_van_deemter(col, cond)

    # A term = 1.8 * 3.5 um = 6.3 um
    assert vd.term_a_um == pytest.approx(6.3, rel=1e-2)
    assert vd.term_b_um_mm_s > 0
    assert vd.term_c_s > 0
    assert vd.optimal_velocity_mm_s > 0
    assert vd.minimum_plate_height_um > vd.term_a_um
    assert vd.operating_plate_height_um >= vd.minimum_plate_height_um


def test_van_deemter_gc_carrier_gases():
    """Verify capillary GC van Deemter (Golay) behavior across He, N2, and H2."""
    col = ColumnParameters(
        name="Capillary DB-5",
        length_mm=30000.0,
        inner_diameter_mm=0.25,
        particle_size_um=0.0,
        film_thickness_um=0.25,
    )

    # Test Nitrogen vs Hydrogen
    cond_n2 = MobilePhaseConditions(
        flow_rate_ml_min=1.0,
        modality=ChromatographyModality.GC,
        carrier_gas="Nitrogen",
    )
    vd_n2 = chromatography_service.calculate_van_deemter(col, cond_n2)

    cond_h2 = MobilePhaseConditions(
        flow_rate_ml_min=1.0,
        modality=ChromatographyModality.GC,
        carrier_gas="Hydrogen",
    )
    vd_h2 = chromatography_service.calculate_van_deemter(col, cond_h2)

    # In open tubular GC, packed Eddy diffusion A is 0
    assert vd_n2.term_a_um == 0.0
    assert vd_h2.term_a_um == 0.0
    # Hydrogen has higher optimal linear velocity than Nitrogen due to higher gas diffusivity
    assert vd_h2.optimal_velocity_mm_s > vd_n2.optimal_velocity_mm_s


def test_analgesics_preset_retention_order():
    """Verify reversed-phase HPLC elution order aligns with analyte hydrophobicity (log Kow)."""
    result = chromatography_service.get_preset_simulation("analgesics_hplc")

    assert len(result.peaks) == 4
    compounds = [p.compound_id for p in result.peaks]

    # Acetaminophen / Caffeine (polar) elute first, Ibuprofen (lipophilic, log Kow 3.5) elutes last
    assert compounds[0] in ["acetaminophen", "caffeine"]
    assert compounds[-1] == "ibuprofen"

    # Peak widths and plates must be positive
    for peak in result.peaks:
        assert peak.retention_time_min > result.dead_time_t0_min
        assert peak.peak_width_base_min > 0.0
        assert peak.theoretical_plates_n >= 500


def test_parabens_homologous_series_gradient():
    """Verify homologous series retention increases monotonically with alkyl chain length."""
    result = chromatography_service.get_preset_simulation("parabens_hplc")

    assert len(result.peaks) == 4
    # Expected order: methyl -> ethyl -> propyl -> butyl
    names = [p.compound_name for p in result.peaks]
    assert names == ["Methylparaben", "Ethylparaben", "Propylparaben", "Butylparaben"]

    # Monotonic retention time increase
    retention_times = [p.retention_time_min for p in result.peaks]
    assert retention_times == sorted(retention_times)
    assert result.minimum_resolution >= 1.0


def test_nucleobases_uracil_void_marker():
    """Verify Uracil elutes close to dead time t0 as an unretained void marker."""
    result = chromatography_service.get_preset_simulation("nucleobases_hplc")

    uracil = next(p for p in result.peaks if p.compound_id == "uracil")
    # k' should be close to 0 for unretained void marker
    assert uracil.retention_factor_k < 0.5
    assert uracil.retention_time_min == pytest.approx(result.dead_time_t0_min, rel=0.5)


def test_btex_gc_separation():
    """Verify temperature-programmed GC separation of volatile BTEX aromatics."""
    result = chromatography_service.get_preset_simulation("btex_gc")

    assert result.modality == ChromatographyModality.GC
    assert len(result.peaks) == 5

    # Benzene (bp 80.1C) elutes first, o-Xylene (bp 144.4C) elutes last
    assert result.peaks[0].compound_id == "benzene"
    assert result.peaks[-1].compound_id == "o_xylene"
    assert len(result.chromatogram_trace) > 100


def test_custom_simulation_and_resolution():
    """Verify custom separation simulation, resolution, and tailing factors."""
    col = ColumnParameters(
        name="Custom C18",
        length_mm=250.0,
        inner_diameter_mm=4.6,
        particle_size_um=5.0,
        void_volume_ml=2.0,
    )
    cond = MobilePhaseConditions(
        flow_rate_ml_min=1.0,
        organic_percent=60.0,
    )
    analytes = [
        AnalyteCompoundInput(
            compound_id="cmp_a",
            compound_name="Compound Alpha",
            chemical_formula="C10H12O",
            molecular_weight=148.2,
            log_kow=1.5,
            concentration_mg_l=30.0,
        ),
        AnalyteCompoundInput(
            compound_id="cmp_b",
            compound_name="Compound Beta",
            chemical_formula="C12H16O",
            molecular_weight=176.2,
            log_kow=2.8,
            concentration_mg_l=40.0,
        ),
    ]

    res = chromatography_service.simulate_separation(
        sample_name="Custom Binary Mix",
        modality=ChromatographyModality.HPLC,
        detector=DetectorType.UV_DAD,
        column=col,
        conditions=cond,
        analytes=analytes,
    )

    assert len(res.peaks) == 2
    assert res.peaks[1].retention_time_min > res.peaks[0].retention_time_min
    assert res.peaks[1].resolution_with_previous is not None
    assert res.peaks[1].resolution_with_previous > 1.5
    assert res.separation_quality == "baseline_resolved"
