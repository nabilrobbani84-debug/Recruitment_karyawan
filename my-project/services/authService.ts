import apiClient, { setAuthToken } from '@/lib/apiClient';
import axios from 'axios';
import type { AuthUser } from '@/store/authStore';

// --- Tipe Data (diekspor agar bisa diimpor di tempat lain) ---
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: 'candidate' | 'employer';
}

interface AuthResponse {
  user: AuthUser;
  token: string;
}

// --- PERBAIKAN: Ekspor setiap fungsi secara individual (named export) ---

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    setAuthToken(response.data.token);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Email atau password salah.');
    }
    throw new Error('Terjadi kesalahan koneksi. Silakan coba lagi.');
  }
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/register', payload);
    setAuthToken(response.data.token);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Registrasi gagal. Periksa kembali data Anda.');
    }
    throw new Error('Terjadi kesalahan koneksi. Silakan coba lagi.');
  }
}

export function logout() {
  setAuthToken(null);
  console.log("Auth token cleared from API client.");
}
