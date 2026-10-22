"""
Unit Tests for Spectroscopy and Instrumental Analysis Service.
Tests UV-Vis Beer-Lambert simulation, linear calibration regression, FTIR spectra, and NMR synthesis.
"""
import pytest
from services.chemistry.app.services.spectroscopy_service import SpectroscopyService


def test_uv_vis_simulation_kmno4():
    """Verify KMnO4 UV-Vis spectrum calculation and Beer-Lambert max absorbance."""
    conc = 0.0002  # 0.2 mM
    path_len = 1.0  # 1 cm
    res = SpectroscopyService.simulate_uv_vis(
        analyte_id="kmno4",
        concentration_m=conc,
        path_length_cm=path_len,
        start_nm=400.0,
        end_nm=700.0,
        step_nm=5.0,
    )

    assert res.analyte_name == "Potassium Permanganate"
    assert res.lambda_max_nm == 525.0
    expected_abs = 2380.0 * path_len * conc
    assert abs(res.absorbance_at_lambda_max - expected_abs) < 1e-3
    assert res.transmittance_at_lambda_max > 0.0
    assert len(res.spectrum_points) > 10

    # Verify peak point exists near 525 nm
    peak_point = min(res.spectrum_points, key=lambda p: abs(p.wavelength_nm - 525.0))
    assert peak_point.absorbance > 0.4


def test_uv_vis_beer_lambert_linearity():
    """Verify absorbance doubles when concentration doubles (Beer-Lambert linearity)."""
    c1 = 0.0001
    c2 = 0.0002
    res1 = SpectroscopyService.simulate_uv_vis("riboflavin", concentration_m=c1)
    res2 = SpectroscopyService.simulate_uv_vis("riboflavin", concentration_m=c2)

    assert abs(res2.absorbance_at_lambda_max - 2 * res1.absorbance_at_lambda_max) < 1e-3


def test_calibration_curve_linear_regression():
    """Test standard series least squares regression for spectrophotometric calibration."""
    standards = [
        (0.00005, 0.119),
        (0.00010, 0.238),
        (0.00015, 0.357),
        (0.00020, 0.476),
    ]
    res = SpectroscopyService.calculate_calibration_curve(
        analyte_name="KMnO4",
        standard_points=standards,
        unknown_absorbance=0.300,
    )

    assert abs(res.slope - 2380.0) < 1.0
    assert abs(res.intercept) < 0.01
    assert res.r_squared > 0.999
    assert res.calculated_concentration_m is not None
    # c = A / slope ~ 0.300 / 2380 ~ 0.000126 M
    assert 0.000125 < res.calculated_concentration_m < 0.000127


def test_calibration_curve_insufficient_points():
    """Verify error raised when fewer than 2 standard points provided."""
    with pytest.raises(ValueError):
        SpectroscopyService.calculate_calibration_curve("KMnO4", [(0.0001, 0.2)])


def test_ftir_simulation_ethanol_and_acetone():
    """Verify FTIR simulation distinguishes between alcohol and ketone."""
    eth = SpectroscopyService.simulate_ftir("ethanol")
    assert eth.compound_name == "Ethanol"
    assert any("O-H" in b.assigned_bond for b in eth.detected_bands)
    assert len(eth.spectrum_points) > 100

    ace = SpectroscopyService.simulate_ftir("acetone")
    assert ace.compound_name == "Acetone"
    assert any("C=O" in b.assigned_bond for b in ace.detected_bands)
    # Acetone has no O-H peak
    assert not any("O-H" in b.assigned_bond for b in ace.detected_bands)


def test_ftir_peak_identification():
    """Verify functional group assignment from raw experimental peak list."""
    peaks = [1715.0, 2920.0]
    res = SpectroscopyService.identify_ftir_peaks(peaks)
    assert len(res["matches"]) > 0
    matched_groups = [m["matched_group"] for m in res["matches"]]
    assert any("Ketone" in g or "Carbonyl" in g or "Aldehyde" in g for g in matched_groups)
    assert "Carbonyl" in res["diagnostic_assessment"]


def test_nmr_simulation_1h_and_13c():
    """Verify 1H and 13C NMR spectrum synthesis with spin-spin splitting."""
    nmr_1h = SpectroscopyService.simulate_nmr("ethanol", nucleus="1H")
    assert nmr_1h.nucleus == "1H"
    assert len(nmr_1h.signals) == 3
    # Check for triplet (methyl) and quartet (methylene)
    multiplicities = [s.multiplicity for s in nmr_1h.signals]
    assert "triplet" in multiplicities
    assert "quartet" in multiplicities
    assert nmr_1h.total_integrated_nuclei == 6
    assert len(nmr_1h.spectrum_points) > 100

    nmr_13c = SpectroscopyService.simulate_nmr("ethanol", nucleus="13C")
    assert nmr_13c.nucleus == "13C"
    assert len(nmr_13c.signals) == 2


def test_spectroscopy_challenges():
    """Verify unknown structure challenge retrieval and validity."""
    challenges = SpectroscopyService.get_challenges()
    assert len(challenges) >= 2
    for ch in challenges:
        assert ch.challenge_id
        assert len(ch.candidate_structures) >= 2
        assert ch.correct_compound_name in [c["name"] for c in ch.candidate_structures]
