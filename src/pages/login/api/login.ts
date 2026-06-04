import { apiClient } from '@/shared/api/client'

interface LoginRequest {
  username: string
  password: string
}

interface LoginResponse {
  accessToken: string
}

export async function login(body: LoginRequest): Promise<LoginResponse> {
  return apiClient<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
