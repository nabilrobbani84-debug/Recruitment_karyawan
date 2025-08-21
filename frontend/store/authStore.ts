import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
// --- Impor ini sekarang akan berfungsi setelah authService.ts diperbaiki ---
import { login as loginService, register as registerService, LoginCredentials, RegisterPayload } from '@/services/authService';
import apiClient from '@/lib/apiClient'; // Asumsi instance Axios/fetch terpusat

// Tipe untuk data pengguna yang disimpan di store
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'candidate' | 'employer' | 'admin';
}

// Tipe untuk state store otentikasi
interface AuthState {
  user: AuthUser | null;
  token: string | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    // --- PERBAIKAN: Tambahkan underscore pada 'get' untuk menandakan tidak digunakan ---
    (set, _get) => ({
      // --- INITIAL STATE ---
      user: null,
      token: null,
      status: 'idle',
      error: null,

      // --- ACTIONS ---
      login: async (credentials: LoginCredentials) => {
        set({ status: 'loading', error: null });
        try {
          const { user, token } = await loginService(credentials);
          set({ user, token, status: 'success' });
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error: unknown) {
          let errorMessage = 'Login gagal. Periksa kembali email dan password Anda.';
          if (typeof error === 'object' && error !== null && 'response' in error) {
              const response = (error as { response?: { data?: { message?: string } } }).response;
              if (response?.data?.message) {
                  errorMessage = response.data.message;
              }
          } else if (error instanceof Error) {
              errorMessage = error.message;
          }
          set({ status: 'error', error: errorMessage });
          throw new Error(errorMessage);
        }
      },

      register: async (payload: RegisterPayload) => {
        set({ status: 'loading', error: null });
        try {
          const { user, token } = await registerService(payload);
          set({ user, token, status: 'success' });
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error: unknown) {
          let errorMessage = 'Registrasi gagal. Coba lagi nanti.';
          if (typeof error === 'object' && error !== null && 'response' in error) {
              const response = (error as { response?: { data?: { message?: string } } }).response;
              if (response?.data?.message) {
                  errorMessage = response.data.message;
              }
          } else if (error instanceof Error) {
              errorMessage = error.message;
          }
          set({ status: 'error', error: errorMessage });
          throw new Error(errorMessage);
        }
      },
      
      logout: () => {
        delete apiClient.defaults.headers.common['Authorization'];
        set({ user: null, token: null, status: 'idle', error: null });
      },
      
      clearError: () => {
        set({ error: null, status: 'idle' });
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, token: state.token }),
      onRehydrateStorage: (state) => {
        console.log("Rehydrating auth state...");
        if (state) {
          if (state.token) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
          }
          state.status = 'idle';
        }
      }
    }
  )
);
