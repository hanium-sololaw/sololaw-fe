export function withAuth(options: RequestInit = {}): RequestInit {
  const token = localStorage.getItem('access_token')
  return {
    ...options,
    headers: {
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  }
}
