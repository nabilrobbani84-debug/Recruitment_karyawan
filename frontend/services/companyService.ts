// src/services/companyService.ts

// --- 1. Definisi Tipe yang Jelas & Detail ---

// Tipe untuk mendefinisikan struktur data sebuah perusahaan
// Ini akan menjadi satu-satunya sumber kebenaran (single source of truth) untuk data perusahaan.
export interface ICompany {
  id: number;
  name: string;
  logoUrl: string;
  industry: string;
  location: string;
  totalJobs: number;
  tagline: string;
  isHiring: boolean;
}

// Tipe untuk parameter filter yang bisa dikirim ke API
export interface GetCompaniesParams {
  page?: number;
  limit?: number;
  search?: string; // Untuk pencarian berdasarkan nama
  location?: string;
  industry?: string;
}

// Tipe untuk metadata pagination yang dikembalikan oleh API
export interface IPaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
}

// Tipe untuk keseluruhan struktur respons dari API getCompanies
export interface ICompanyApiResponse {
  companies: ICompany[];
  totalCompanies: number;
  totalPages: number;
  currentPage: number;
}


// --- 2. Implementasi Fungsi Service ---

/**
 * Fungsi untuk mengambil data perusahaan dari API dengan filter dan pagination.
 * Diekspor sebagai 'named export' agar bisa diimpor secara spesifik.
 * @param params - Objek yang berisi filter seperti halaman, pencarian, dll.
 * @returns Promise yang berisi data perusahaan dan metadata pagination.
 */
export const getCompanies = async (params: GetCompaniesParams = {}): Promise<ICompanyApiResponse> => {
  console.log("Fetching companies with params:", params);
  
  try {
    // Menyiapkan nilai default untuk pagination
    const page = params.page || 1;
    const limit = params.limit || 12; // 12 perusahaan per halaman

    // --- Simulasi Data & Logika Backend ---
    // Di aplikasi nyata, bagian ini akan diganti dengan panggilan API menggunakan fetch atau Axios.
    // Contoh: const response = await apiClient.get('/companies', { params });

    // Buat data dummy yang banyak untuk simulasi
    const allMockCompanies: ICompany[] = Array.from({ length: 35 }, (_, i) => ({
      id: i + 1,
      name: `Perusahaan ${['Inovasi', 'Teknologi', 'Digital', 'Kreatif', 'Maju'][i % 5]} #${i + 1}`,
      logoUrl: `https://placehold.co/100x100/e0e7ff/4338ca?text=P${i + 1}`,
      industry: ['Teknologi Informasi', 'Keuangan', 'Kesehatan', 'Pendidikan', 'Retail'][i % 5],
      location: ['Jakarta', 'Bandung', 'Surabaya', 'Remote'][i % 4],
      totalJobs: 3 + (i % 10),
      tagline: 'Membangun masa depan digital.',
      isHiring: i % 2 === 0,
    }));

    // Simulasi logika filter di backend
    const filteredCompanies = allMockCompanies.filter(company => {
      const searchMatch = params.search 
        ? company.name.toLowerCase().includes(params.search.toLowerCase()) 
        : true;
      const locationMatch = params.location 
        ? company.location === params.location 
        : true;
      // ... tambahkan logika filter lain di sini ...
      return searchMatch && locationMatch;
    });

    // Simulasi logika pagination di backend
    const totalItems = filteredCompanies.length;
    const totalPages = Math.ceil(totalItems / limit);
    const paginatedData = filteredCompanies.slice((page - 1) * limit, page * limit);

    // Simulasi penundaan jaringan (network delay)
    await new Promise(resolve => setTimeout(resolve, 500)); 

    // Mengembalikan data dengan struktur yang diharapkan oleh frontend
    return {
      companies: paginatedData,
      totalCompanies: totalItems,
      totalPages: totalPages,
      currentPage: page,
    };

  } catch (error) {
    console.error('Error fetching companies:', error);
    // Jika terjadi error, lempar kembali agar bisa ditangani oleh komponen pemanggil
    throw new Error('Gagal mengambil data perusahaan dari server.');
  }
};
