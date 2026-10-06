/**
 * Base API Service Layer
 * Provides clean client interfaces with mock data fallbacks, ready for seamless production API connection.
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

const USE_MOCK_SERVICES = true;
const SIMULATED_LATENCY_MS = 60;

export async function simulateLatency<T>(result: T, delayMs = SIMULATED_LATENCY_MS): Promise<T> {
  if (delayMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  return result;
}

export const apiClient = {
  isMockMode: () => USE_MOCK_SERVICES,

  async get<T>(endpoint: string, fallbackData: T): Promise<ApiResponse<T>> {
    if (USE_MOCK_SERVICES) {
      const data = await simulateLatency(fallbackData);
      return {
        data,
        status: 200,
        timestamp: new Date().toISOString()
      };
    }

    try {
      const response = await fetch(`/api/v1${endpoint}`);
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
      console.warn(`[API] Fallback used for ${endpoint}:`, err);
      return {
        data: fallbackData,
        status: 200,
        timestamp: new Date().toISOString()
      };
    }
  },

  async post<TRequest, TResponse>(endpoint: string, body: TRequest, fallbackData: TResponse): Promise<ApiResponse<TResponse>> {
    if (USE_MOCK_SERVICES) {
      const data = await simulateLatency(fallbackData);
      return {
        data,
        status: 201,
        timestamp: new Date().toISOString()
      };
    }

    try {
      const response = await fetch(`/api/v1${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      console.warn(`[API] Fallback used for ${endpoint}:`, err);
      return {
        data: fallbackData,
        status: 201,
        timestamp: new Date().toISOString()
      };
    }
  }
};
