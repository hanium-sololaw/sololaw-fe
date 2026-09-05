import { withAuth } from './interceptors'

/** Main backend — /api/documents, /api/cases, /api/precedent-citations, /api/litigation-costs, etc. */
export const API_ROOT_URL = import.meta.env.VITE_API_ROOT_URL ?? ''
/** RAG service — AI 문서 생성 SSE, 판례 검색, 증거 분석 (e.g. /api/v1/cases/search, /api/v1/documents/{type}/generate). */
export const RAG_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

const AUTH_EXEMPT_PATHS = ['/api/auth/login', '/api/auth/register', '/api/auth/refresh']

let refreshInFlight: Promise<boolean> | null = null

/** Calls POST /api/auth/refresh directly (not via apiClient, to avoid a circular import with a 401-retry loop). */
function refreshSession(): Promise<boolean> {
  if (!refreshInFlight) {
    refreshInFlight = fetch(`${API_ROOT_URL}/api/auth/refresh`, withAuth({ method: 'POST' }))
      .then((res) => res.ok)
      .catch(() => false)
      .finally(() => {
        refreshInFlight = null
      })
  }
  return refreshInFlight
}

async function request<T>(baseUrl: string, endpoint: string, options?: RequestInit, isRetry = false): Promise<T> {
  const response = await fetch(
    `${baseUrl}${endpoint}`,
    withAuth({
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    }),
  )

  if (response.status === 401 && !isRetry && !AUTH_EXEMPT_PATHS.some((path) => endpoint.startsWith(path))) {
    const refreshed = await refreshSession()
    if (refreshed) return request<T>(baseUrl, endpoint, options, true)
    if (typeof window !== 'undefined') window.location.href = '/login'
  }

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }

  return response.json()
}

/** Calls the main backend (Spring Boot — auth, CRUD). */
export function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  return request<T>(API_ROOT_URL, endpoint, options)
}

/** Calls the RAG service (plain JSON endpoints, not SSE — see postSSE in sse.ts for those). */
export function ragApiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  return request<T>(RAG_BASE_URL, endpoint, options)
}
