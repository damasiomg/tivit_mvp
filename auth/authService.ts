import api from '@/services/api';
import type { LoginCredentials, ApiTokenResponse, ApiHealthResponse, ApiUserResponse, ApiAdminResponse, TokenPayload } from '@/types/user';
import jwtDecode from 'jwt-decode';

export function decodeToken(token: string): TokenPayload | null {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch {
    return null;
  }
}

export async function checkHealth(): Promise<ApiHealthResponse> {
  const response = await fetch('/api/health');
  const data = await response?.json?.();
  return data as ApiHealthResponse;
}

export async function login(credentials: LoginCredentials): Promise<{ token: string; role: string; username: string }> {
  const response = await api.post<ApiTokenResponse>(
    `/token?username=${encodeURIComponent(credentials?.username ?? '')}&password=${encodeURIComponent(credentials?.password ?? '')}`
  );

  
  const token = response?.data?.access_token ?? '';
  const decoded = decodeToken(token);
  console.log('decode', decoded);
  const role = (decoded?.sub as string) ?? 'user';
  const username = (decoded?.sub as string) ?? credentials?.username ?? '';

  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify({ username, role, token }));
  }

  return { token, role, username };
}

export async function fetchUserData(): Promise<ApiUserResponse> {
  const response = await api.get<ApiUserResponse>('/user');
  return response?.data;
}

export async function fetchAdminData(): Promise<ApiAdminResponse> {
  const response = await api.get<ApiAdminResponse>('/admin');
  return response?.data;
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    window.location.href = '/login';
  }
}

export function getStoredAuth(): { token: string; role: string; username: string } | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem('auth_user');
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
}
