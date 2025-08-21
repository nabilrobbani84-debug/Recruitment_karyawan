// src/lib/apiClient.ts

import axios from 'axios';

// 1. Membuat instance Axios dengan konfigurasi terpusat.
const apiClient = axios.create({
  // 2. Mengambil URL API dari environment variables.
  //    Ini adalah kunci utama untuk menghubungkan frontend ke backend.
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  
  // 3. Konfigurasi default untuk semua permintaan.
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  
  // 4. (Opsional tapi direkomendasikan) Mengizinkan pengiriman cookie
  //    Sangat penting jika menggunakan otentikasi seperti Laravel Sanctum.
  withCredentials: true,
});

// --- PENAMBAHAN FUNGSI BARU ---
/**
 * Mengatur atau menghapus token otentikasi pada header default instance Axios.
 * Fungsi ini diekspor sebagai 'named export' sehingga bisa diimpor
 * di tempat lain, misalnya di dalam authService setelah login berhasil atau saat logout.
 * @param token - Bearer token dari API, atau null untuk menghapusnya.
 */
export const setAuthToken = (token: string | null) => {
  if (token) {
    // Jika token ada (saat login), tambahkan ke header Authorization
    // untuk semua permintaan selanjutnya yang dibuat oleh instance ini.
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Jika token null (saat logout), hapus header Authorization dari konfigurasi default.
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// 5. (Opsional tapi sangat berguna) Interceptor untuk menangani respons.
//    Ini bisa digunakan untuk menangani error secara global atau me-refresh token.
apiClient.interceptors.response.use(
  (response) => {
    // Jika respons sukses, langsung kembalikan datanya.
    return response;
  },
  (error) => {
    // Di sini Anda bisa menangani berbagai jenis error secara global.
    // Misalnya, jika token expired (error 401), panggil fungsi logout.
    if (error.response && error.response.status === 401) {
      // Panggil fungsi logout dari store Anda di sini untuk membersihkan state
      // authStore.getState().actions.logout();
      console.error("Authentication Error (401): Token is invalid or expired.", error.response.data);
    }
    
    // Kembalikan error agar bisa ditangani lebih lanjut di tempat pemanggilan.
    return Promise.reject(error);
  }
);

export default apiClient;
