/**
 * Compound Database & Spectral Reference Service (PR #050).
 * Handles querying, spectral matching, and catalog statistics with resilient offline fallback.
 */
import {
  DetailedCompound,
  CompoundSearchFilter,
  CompoundSearchResult,
  SpectralMatchRequest,
  DatabaseStats,
} from '../types/compoundDatabase';
import { COMPREHENSIVE_COMPOUNDS } from '../data/compoundsReferenceComprehensive';

const API_BASE = '/api/v1/chemistry/compound-database';

export const compoundDatabaseService = {
  /**
   * Retrieves aggregated catalog stats.
   */
  async getDatabaseStats(): Promise<DatabaseStats> {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }

    // Client-side calculation
    const cats: Record<string, number> = {};
    let uv = 0;
    let ir = 0;
    let nmr = 0;
    let totalMw = 0;

    for (const c of COMPREHENSIVE_COMPOUNDS) {
      cats[c.category] = (cats[c.category] || 0) + 1;
      if (c.uv_vis_peaks.length > 0) uv++;
      if (c.ir_bands.length > 0) ir++;
      if (c.nmr_1h_shifts.length > 0 || c.nmr_13c_shifts.length > 0) nmr++;
      totalMw += c.molecular_weight;
    }

    return {
      total_compounds: COMPREHENSIVE_COMPOUNDS.length,
      categories: cats,
      compounds_with_uv: uv,
      compounds_with_ir: ir,
      compounds_with_nmr: nmr,
      average_molecular_weight: Math.round((totalMw / COMPREHENSIVE_COMPOUNDS.length) * 100) / 100,
    };
  },

  /**
   * Searches the database using multiple filters and keyword matching.
   */
  async searchCompounds(filter: CompoundSearchFilter = {}): Promise<CompoundSearchResult> {
    try {
      const res = await fetch(`${API_BASE}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filter),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }

    const tStart = performance.now();
    const qClean = filter.query ? filter.query.toLowerCase().trim() : null;

    const filtered = COMPREHENSIVE_COMPOUNDS.filter((c) => {
      if (qClean) {
        const matchesQ =
          c.name.toLowerCase().includes(qClean) ||
          c.iupac_name.toLowerCase().includes(qClean) ||
          c.formula.toLowerCase().includes(qClean) ||
          c.smiles.toLowerCase().includes(qClean) ||
          (c.cas_number && c.cas_number.includes(qClean));
        if (!matchesQ) return false;
      }

      if (filter.category && filter.category !== 'All' && c.category.toLowerCase() !== filter.category.toLowerCase()) {
        return false;
      }

      if (filter.min_mw !== undefined && c.molecular_weight < filter.min_mw) return false;
      if (filter.max_mw !== undefined && c.molecular_weight > filter.max_mw) return false;

      if (filter.min_log_p !== undefined && (c.log_p === undefined || c.log_p < filter.min_log_p)) return false;
      if (filter.max_log_p !== undefined && (c.log_p === undefined || c.log_p > filter.max_log_p)) return false;

      if (filter.physical_state && filter.physical_state !== 'All' && c.physical_state_at_25c.toLowerCase() !== filter.physical_state.toLowerCase()) {
        return false;
      }

      if (filter.has_uv && c.uv_vis_peaks.length === 0) return false;
      if (filter.has_ir && c.ir_bands.length === 0) return false;
      if (filter.has_nmr && c.nmr_1h_shifts.length === 0 && c.nmr_13c_shifts.length === 0) return false;

      return true;
    });

    const offset = filter.offset || 0;
    const limit = filter.limit || 50;
    const paginated = filtered.slice(offset, offset + limit);
    const queryTime = Math.round((performance.now() - tStart) * 100) / 100;

    return {
      total_matches: filtered.length,
      compounds: paginated,
      query_time_ms: queryTime,
    };
  },

  /**
   * Matches spectroscopic peaks against reference spectra.
   */
  async matchSpectroscopy(req: SpectralMatchRequest): Promise<CompoundSearchResult> {
    try {
      const res = await fetch(`${API_BASE}/match-spectroscopy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }

    const tStart = performance.now();
    const tol = (req.tolerance_percent || 5.0) / 100.0;
    const matches: DetailedCompound[] = [];

    for (const c of COMPREHENSIVE_COMPOUNDS) {
      let score = 0;
      let checks = 0;

      if (req.target_uv_wavelength_nm !== undefined) {
        checks++;
        const target = req.target_uv_wavelength_nm;
        for (const uv of c.uv_vis_peaks) {
          if (Math.abs(uv.wavelength_nm - target) <= target * tol) {
            score++;
            break;
          }
        }
      }

      if (req.target_ir_wavenumber_cm1 !== undefined) {
        checks++;
        const target = req.target_ir_wavenumber_cm1;
        for (const ir of c.ir_bands) {
          if (Math.abs(ir.wavenumber_cm1 - target) <= target * tol) {
            score++;
            break;
          }
        }
      }

      if (req.target_nmr_1h_ppm !== undefined) {
        checks++;
        const target = req.target_nmr_1h_ppm;
        for (const nmr of c.nmr_1h_shifts) {
          if (Math.abs(nmr.chemical_shift_ppm - target) <= Math.max(0.2, target * tol)) {
            score++;
            break;
          }
        }
      }

      if (checks > 0 && score === checks) {
        matches.push(c);
      }
    }

    const limit = req.limit || 20;
    const queryTime = Math.round((performance.now() - tStart) * 100) / 100;

    return {
      total_matches: matches.length,
      compounds: matches.slice(0, limit),
      query_time_ms: queryTime,
    };
  },

  /**
   * Retrieves a single compound by ID.
   */
  async getCompoundById(id: string): Promise<DetailedCompound | null> {
    try {
      const res = await fetch(`${API_BASE}/${id}`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }

    const match = COMPREHENSIVE_COMPOUNDS.find((c) => c.id.toLowerCase() === id.toLowerCase());
    return match || null;
  },
};
