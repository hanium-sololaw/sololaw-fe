export function withAuth(options: RequestInit = {}): RequestInit {
  return {
    ...options,
    // Auth is cookie-based (ACCESS_TOKEN/REFRESH_TOKEN set by the server on login) — fetch
    // doesn't send cookies cross-origin without this.
    credentials: 'include',
  }
}
