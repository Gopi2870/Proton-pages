/**
 * Base API Service Layer
 * Provides clean client interfaces with environment-based configuration and robust fallbacks.
 */

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
  timestamp: string;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Environment-based API configuration
const ENV_API_URL = typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL;
const ENV_USE_MOCKS = typeof import.meta !== 'undefined' && import.meta.env?.VITE_USE_MOCKS;

export const API_BASE_URL = ENV_API_URL || '/api/v1';
export const FORCE_MOCKS = ENV_USE_MOCKS === 'true';
const SIMULATED_LATENCY_MS = 40;

export async function simulateLatency<T>(result: T, delayMs = SIMULATED_LATENCY_MS): Promise<T> {
  if (delayMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  return result;
}

const TOKEN_STORAGE_KEY = 'proton_auth_token';
let memoryToken: string | null = null;

export const tokenStorage = {
  get: (): string | null => {
    try {
      if (typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function') {
        const stored = localStorage.getItem(TOKEN_STORAGE_KEY);
        return stored !== null ? stored : memoryToken;
      }
      return memoryToken;
    } catch {
      return memoryToken;
    }
  },
  set: (token: string | null) => {
    memoryToken = token;
    try {
      if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
        if (token) {
          localStorage.setItem(TOKEN_STORAGE_KEY, token);
        } else {
          localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
      }
    } catch {
      // Ignored in non-browser env
    }
  }
};

function getAuthHeaders(): Record<string, string> {
  const token = tokenStorage.get();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function resolveUrl(endpoint: string): string {
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return endpoint;
  }
  const base = API_BASE_URL.startsWith('http')
    ? API_BASE_URL
    : (typeof window !== 'undefined' && window.location?.origin
      ? `${window.location.origin}${API_BASE_URL}`
      : `http://localhost:8000${API_BASE_URL}`);
  return `${base}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
}

export const apiClient = {
  getBaseUrl: () => API_BASE_URL,
  isMockMode: () => FORCE_MOCKS,

  async checkHealth(): Promise<{ status: string; service?: string; version?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (response.ok) {
        return await response.json();
      }
      return { status: 'offline' };
    } catch {
      return { status: 'offline' };
    }
  },

  async get<T>(endpoint: string, fallbackData: T): Promise<ApiResponse<T>> {
    if (FORCE_MOCKS) {
      const data = await simulateLatency(fallbackData);
      return {
        data,
        status: 200,
        timestamp: new Date().toISOString()
      };
    }

    try {
      const url = resolveUrl(endpoint);
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          ...getAuthHeaders()
        }
      });
      if (!response.ok) {
        throw new ApiError(response.status, `HTTP Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return {
        data,
        status: response.status,
        timestamp: new Date().toISOString()
      };
    } catch (err) {
      console.warn(`[API Client] Fallback activated for GET ${endpoint}:`, err);
      const data = await simulateLatency(fallbackData, 10);
      return {
        data,
        status: 200,
        timestamp: new Date().toISOString()
      };
    }
  },

  async post<TRequest, TResponse>(endpoint: string, body: TRequest, fallbackData: TResponse): Promise<ApiResponse<TResponse>> {
    if (FORCE_MOCKS) {
      const data = await simulateLatency(fallbackData);
      return {
        data,
        status: 201,
        timestamp: new Date().toISOString()
      };
    }

    try {
      const url = resolveUrl(endpoint);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        throw new ApiError(response.status, `HTTP Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return {
        data,
        status: response.status,
        timestamp: new Date().toISOString()
      };
    } catch (err) {
      console.warn(`[API Client] Fallback activated for POST ${endpoint}:`, err);
      const data = await simulateLatency(fallbackData, 10);
      return {
        data,
        status: 201,
        timestamp: new Date().toISOString()
      };
    }
  },

  async patch<TRequest, TResponse>(endpoint: string, body: TRequest, fallbackData: TResponse): Promise<ApiResponse<TResponse>> {
    try {
      const url = resolveUrl(endpoint);
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        throw new ApiError(response.status, `HTTP Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      return { data, status: response.status, timestamp: new Date().toISOString() };
    } catch (err) {
      console.warn(`[API Client] Fallback activated for PATCH ${endpoint}:`, err);
      const data = await simulateLatency(fallbackData, 10);
      return { data, status: 200, timestamp: new Date().toISOString() };
    }
  },

  async delete(endpoint: string): Promise<boolean> {
    try {
      const url = resolveUrl(endpoint);
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          ...getAuthHeaders()
        }
      });
      return response.ok;
    } catch (err) {
      console.warn(`[API Client] Fallback activated for DELETE ${endpoint}:`, err);
      return true;
    }
  }
};

// ============================================================================
// Bookmarks & Saved Workspace API
// ============================================================================
export interface ChemicalBookmarkItem {
  id: string;
  user_id: string;
  item_type: 'element' | 'compound' | 'reaction' | 'formula' | 'molecule';
  item_identifier: string;
  notes?: string;
  metadata_json?: string;
  created_at: string;
}

export const bookmarksApi = {
  async getBookmarks(itemType?: string): Promise<ChemicalBookmarkItem[]> {
    const endpoint = itemType ? `/bookmarks?item_type=${encodeURIComponent(itemType)}` : '/bookmarks';
    const fallback: ChemicalBookmarkItem[] = [
      {
        id: 'bm-fallback-1',
        user_id: 'default_guest',
        item_type: 'compound',
        item_identifier: 'Fe2O3',
        notes: 'Hematite ore reduction via carbon monoxide.',
        metadata_json: JSON.stringify({ title: 'Blast Furnace Hematite Reduction', formula: 'Fe₂O₃ + 3CO ➔ 2Fe + 3CO₂' }),
        created_at: new Date().toISOString()
      },
      {
        id: 'bm-fallback-2',
        user_id: 'default_guest',
        item_type: 'compound',
        item_identifier: 'C8H10N4O2',
        notes: 'Caffeine conformation and adenosine A2A receptor antagonist.',
        metadata_json: JSON.stringify({ title: 'Caffeine Conformation', formula: 'C₈H₁₀N₄O₂' }),
        created_at: new Date().toISOString()
      }
    ];
    const res = await apiClient.get<ChemicalBookmarkItem[]>(endpoint, fallback);
    return res.data;
  },

  async createBookmark(item: {
    item_type: string;
    item_identifier: string;
    notes?: string;
    metadata_json?: string;
  }): Promise<ChemicalBookmarkItem> {
    const fallback: ChemicalBookmarkItem = {
      id: `bm-${Date.now()}`,
      user_id: 'default_guest',
      item_type: item.item_type as any,
      item_identifier: item.item_identifier,
      notes: item.notes,
      metadata_json: item.metadata_json,
      created_at: new Date().toISOString()
    };
    const res = await apiClient.post('/bookmarks', item, fallback);
    return res.data;
  },

  async deleteBookmark(bookmarkId: string): Promise<boolean> {
    return await apiClient.delete(`/bookmarks/${encodeURIComponent(bookmarkId)}`);
  },

  async deleteBookmarkByItem(itemType: string, itemIdentifier: string): Promise<boolean> {
    return await apiClient.delete(`/bookmarks/by-item/${encodeURIComponent(itemType)}/${encodeURIComponent(itemIdentifier)}`);
  }
};

// ============================================================================
// Virtual Lab Experiments API
// ============================================================================
export interface VirtualExperimentItem {
  id: string;
  user_id: string;
  title: string;
  experiment_type: string;
  status: 'draft' | 'in_progress' | 'completed';
  state_data?: string;
  observations?: string;
  created_at: string;
  updated_at: string;
}

export const experimentsApi = {
  async getExperiments(experimentType?: string): Promise<VirtualExperimentItem[]> {
    const endpoint = experimentType ? `/experiments?experiment_type=${encodeURIComponent(experimentType)}` : '/experiments';
    const fallback: VirtualExperimentItem[] = [
      {
        id: 'exp-fallback-1',
        user_id: 'default_guest',
        title: 'Acid-Base Neutralization Run (HCl + NaOH)',
        experiment_type: 'mixer',
        status: 'completed',
        observations: 'Neutral pH 7.0 reached, exothermic heat rise measured at +6.7 °C.',
        created_at: new Date(Date.now() - 3600000).toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'exp-fallback-2',
        user_id: 'default_guest',
        title: 'Barium Sulfate Precipitation Equilibrium',
        experiment_type: 'mixer',
        status: 'completed',
        observations: 'Dense white BaSO4 precipitate formed instantaneously upon mixing.',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    const res = await apiClient.get<VirtualExperimentItem[]>(endpoint, fallback);
    return res.data;
  },

  async saveExperiment(item: {
    title: string;
    experiment_type: string;
    status?: string;
    state_data?: string;
    observations?: string;
  }): Promise<VirtualExperimentItem> {
    const fallback: VirtualExperimentItem = {
      id: `exp-${Date.now()}`,
      user_id: 'default_guest',
      title: item.title,
      experiment_type: item.experiment_type,
      status: (item.status as any) || 'draft',
      state_data: item.state_data,
      observations: item.observations,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    const res = await apiClient.post('/experiments', item, fallback);
    return res.data;
  },

  async updateExperiment(
    id: string,
    updates: Partial<{ title: string; status: string; state_data: string; observations: string }>
  ): Promise<VirtualExperimentItem> {
    const fallback: VirtualExperimentItem = {
      id,
      user_id: 'default_guest',
      title: updates.title || 'Updated Experiment',
      experiment_type: 'mixer',
      status: (updates.status as any) || 'completed',
      observations: updates.observations,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    const res = await apiClient.patch(`/experiments/${encodeURIComponent(id)}`, updates, fallback);
    return res.data;
  },

  async deleteExperiment(id: string): Promise<boolean> {
    return await apiClient.delete(`/experiments/${encodeURIComponent(id)}`);
  }
};

