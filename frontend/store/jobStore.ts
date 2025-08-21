// --- PERBAIKAN 1: Gunakan named import untuk 'create' dan impor 'StateCreator' ---
import { create, StateCreator } from 'zustand';
// Pastikan path ke service Anda sudah benar
import { getAllJobs, IJob } from '@/services/jobService';

/**
 * Interface untuk tipe data state di dalam job store.
 * Mengekspornya adalah praktik yang baik untuk digunakan di komponen.
 */
export interface JobState {
  jobs: IJob[];
  loading: boolean;
  error: string | null;
  filters: {
    keyword: string;
    location: string;
    type: string;
  };
  fetchJobs: () => Promise<void>;
  setFilters: (newFilters: Partial<JobState['filters']>) => void;
}

// --- PERBAIKAN 2: Definisikan tipe untuk StateCreator ---
// Ini akan memberikan tipe yang benar untuk (set, get)
const jobStoreCreator: StateCreator<JobState> = (set, get) => ({
  /**
   * =================================
   * INITIAL STATE
   * =================================
   */
  jobs: [],
  loading: true, // Dimulai dengan `true` agar UI menampilkan skeleton saat load awal
  error: null,
  filters: {
    keyword: '',
    location: '',
    type: 'All', // 'All' sebagai nilai default filter tipe pekerjaan
  },

  /**
   * =================================
   * ACTIONS
   * =================================
   */

  /**
   * Mengambil data pekerjaan dari API berdasarkan filter saat ini.
   * Mengelola state `loading` dan `error` selama proses fetch.
   */
  fetchJobs: async () => {
    // 1. Set state ke mode loading dan bersihkan error sebelumnya
    set({ loading: true, error: null });

    try {
      // 2. Ambil filter terbaru dari state
      const { filters } = get();

      // 3. Panggil service API dengan filter yang ada
      const response = await getAllJobs(filters);
      
      // 4. Lakukan validasi data sebelum menyimpannya ke state
      const jobsData = Array.isArray(response.data) ? response.data : [];

      // 5. Update state dengan data yang berhasil didapat dan matikan mode loading
      set({ jobs: jobsData, loading: false });

    } catch (err: unknown) {
      // 6. Tangani error jika panggilan API gagal
      console.error("Gagal mengambil data pekerjaan:", err);
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui.';
      
      set({ 
        error: `Gagal memuat data pekerjaan. Silakan coba lagi nanti. (Error: ${errorMessage})`, 
        loading: false, 
        jobs: [] // Kosongkan data pekerjaan jika terjadi error
      });
    }
  },

  /**
   * Memperbarui state filter.
   */
  setFilters: (newFilters: Partial<JobState['filters']>) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },
});

// Gunakan creator yang sudah didefinisikan tipenya
export const useJobStore = create<JobState>(jobStoreCreator);
