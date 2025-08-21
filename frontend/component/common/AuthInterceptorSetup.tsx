'use client'; // Tandai sebagai Client Component

import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/apiClient';
import { useAuthStore } from '@/store/authStore';

const AuthInterceptorSetup = () => {
  const router = useRouter();
  
  useEffect(() => {
    // Pasang interceptor saat komponen dimuat di client
    const interceptorId = apiClient.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        // Cek jika error 401 (Unauthorized) dan BUKAN dari endpoint refresh token
        if (error.response?.status === 401 && !error.config?.url?.includes('/refresh')) {
          console.error("Interceptor: Unauthorized access. Logging out...");
          
          // Panggil fungsi logout dari store.
          useAuthStore.getState().logout();

          // Arahkan ke halaman login dengan cara yang lebih aman di Next.js
          router.push('/login');
        }
        
        // Teruskan error agar bisa ditangani oleh pemanggil fungsi API
        return Promise.reject(error);
      }
    );

    // Bersihkan interceptor saat komponen di-unmount
    return () => {
      apiClient.interceptors.response.eject(interceptorId);
    };
  }, [router]); // Tambahkan router sebagai dependency

  return null; // Komponen ini tidak me-render UI apapun
};

export default AuthInterceptorSetup;
