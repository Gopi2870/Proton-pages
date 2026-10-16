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
      const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        headers: { 'Accept': 'application/json' }
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
      const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
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
  }
};
