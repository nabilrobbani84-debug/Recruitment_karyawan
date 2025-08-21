// src/services/jobService.ts

// --- DEFINISI TIPE YANG KONSISTEN ---
// Tipe ini akan menjadi satu-satunya sumber kebenaran dan digunakan di semua komponen.
// src/services/jobService.ts

export interface ICompany {
  id: number | string;
  name: string;
  logoUrl: string;
}

// --- Definisi Tipe untuk Data Pekerjaan (Single Source of Truth) ---
export interface IJob {
  id: number | string;
  title: string;
  company: {
    name: string;
    logoUrl?: string;
  };
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  postedAt: string; // ISO string date
  salaryMin?: number;
  salaryMax?: number;
}

export interface IJobDetail {
  id: number | string;
  title: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  location: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  postedDate: string; // ISO String
  company: ICompany;
}

// Tipe untuk respons API yang hanya berisi daftar pekerjaan
export interface IJobsResponse {
  data: IJob[];
}

const mockJobDatabase: IJobDetail[] = [
    { 
        id: 1, 
        title: "Senior Frontend Developer (React)", 
        type: "Full-time", 
        location: "Jakarta, Indonesia (Hybrid)",
        description: "Kami mencari seorang Frontend Developer berpengalaman untuk memimpin pengembangan antarmuka pengguna yang inovatif dan berperforma tinggi. Anda akan berkolaborasi erat dengan tim produk, desainer UI/UX, dan backend engineer untuk mengubah visi menjadi produk nyata yang digunakan oleh jutaan orang.",
        responsibilities: [
            "Mengembangkan dan memelihara komponen UI yang reusable dan efisien menggunakan React.js dan TypeScript.",
            "Menerjemahkan desain dan wireframe dari Figma menjadi kode berkualitas tinggi.",
            "Mengoptimalkan komponen untuk kecepatan dan skalabilitas maksimum di berbagai perangkat dan browser.",
            "Berkolaborasi dengan backend developer untuk mengintegrasikan RESTful API dan GraphQL.",
            "Menulis pengujian unit dan integrasi untuk memastikan kualitas dan keandalan kode."
        ],
        qualifications: [
            "Gelar Sarjana di bidang Ilmu Komputer atau bidang terkait.",
            "Pengalaman minimal 4 tahun dalam pengembangan frontend.",
            "Keahlian mendalam pada React.js, TypeScript, HTML5, dan CSS3/SASS.",
            "Pengalaman dengan state management library seperti Redux Toolkit atau Zustand.",
            "Memahami prinsip-prinsip desain responsif dan mobile-first."
        ],
        postedDate: "2025-08-01T10:00:00Z",
        company: { id: 1, name: "PT Teknologi Bersama", logoUrl: "https://placehold.co/128x128/000000/FFFFFF?text=TB" }
    },
    { 
        id: 2, 
        title: "UI/UX Designer", 
        type: "Contract", 
        location: "Surabaya, Indonesia",
        description: "Bergabunglah dengan tim kami untuk merancang pengalaman pengguna yang intuitif dan menarik secara visual untuk produk keuangan kami. Anda akan bertanggung jawab atas seluruh proses desain, dari riset hingga prototipe interaktif.",
        responsibilities: [
            "Melakukan riset pengguna untuk memahami kebutuhan dan masalah.",
            "Membuat wireframe, user flow, dan prototipe interaktif.",
            "Merancang antarmuka yang indah dan fungsional.",
            "Berkolaborasi dengan tim produk dan engineer."
        ],
        qualifications: [
            "Portofolio yang kuat dalam desain UI/UX.",
            "Mahir menggunakan Figma, Sketch, atau Adobe XD.",
            "Pengalaman dengan design systems.",
            "Kemampuan komunikasi yang baik."
        ],
        postedDate: "2025-07-28T14:30:00Z",
        company: { id: 2, name: "Solusi Keuangan Nusantara", logoUrl: "https://placehold.co/128x128/1d4ed8/FFFFFF?text=SKN" }
    },
];

// --- PERBAIKAN: Membuat dan mengekspor fungsi getFeaturedJobs ---
/**
 * Mengambil data pekerjaan unggulan (featured jobs) dari API.
 * @param params - Objek filter, misalnya kategori atau limit.
 * @returns Promise yang berisi daftar pekerjaan unggulan.
 */
export const getFeaturedJobs = async (params: { category?: string; limit?: number }): Promise<IJobsResponse> => {
  console.log("Fetching featured jobs with params:", params);
  try {
    const limit = params.limit || 4;

    // Simulasi data pekerjaan unggulan
    const mockJobs: IJob[] = Array.from({ length: limit }, (_, i) => ({
      id: 200 + i,
      title: `Senior ${params.category?.toUpperCase() || 'Tech'} Engineer #${i + 1}`,
      company: { name: `Innovate Solutions ${i + 1}` },
      location: 'Remote',
      type: 'Full-time',
      postedAt: new Date(Date.now() - i * 1000 * 60 * 60 * 48).toISOString(),
      salaryMin: 15000000,
    }));

    // Simulasi penundaan jaringan
    await new Promise(resolve => setTimeout(resolve, 300));

    // Mengembalikan data dengan struktur yang diharapkan
    return {
      data: mockJobs
    };

  } catch (error) {
    console.error('Error fetching featured jobs:', error);
    throw new Error('Gagal mengambil data pekerjaan unggulan.');
  }
};

export async function getAllJobIds() {
    // Di aplikasi nyata, ini bisa berupa query API yang lebih efisien.
    return mockJobDatabase.map(job => ({
        id: job.id.toString(),
    }));
}

export async function getJobDetails(id: string): Promise<IJobDetail | null> {
    console.log(`[SERVICE] Mencari detail untuk pekerjaan dengan ID: ${id}`);
    // Simulasi penundaan jaringan seperti memanggil API sungguhan
    await new Promise(resolve => setTimeout(resolve, 100)); 
    const job = mockJobDatabase.find(j => j.id.toString() === id);
    return job || null;
}
// Anda juga bisa menambahkan fungsi getAllJobs di sini jika belum ada
// export const getAllJobs = async (...) => { ... };


// Tipe untuk metadata pagination dari API
export interface IPaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
}

// Tipe untuk keseluruhan respons API
export interface IJobApiResponse {
  data: IJob[];
  meta: IPaginationMeta;
}

// Tipe untuk filter yang dikirim ke API
interface JobFilters {
  keyword?: string;
  location?: string;
  type?: string;
  page?: number;
  limit?: number;
}

export const getRecommendedJobs = async (): Promise<IJobsResponse> => {
  console.log("Fetching recommended jobs for authenticated user...");
  try {
    // Simulasi data rekomendasi yang beragam
    const mockJobs: IJob[] = [
      { id: 301, title: 'Data Scientist (AI Focus)', company: { name: 'Data Insights Co.' }, location: 'Yogyakarta', type: 'Full-time', postedAt: new Date().toISOString(), salaryMin: 18000000 },
      { id: 302, title: 'Senior Product Manager', company: { name: 'Agile Product House' }, location: 'Jakarta', type: 'Full-time', postedAt: new Date().toISOString(), salaryMin: 25000000 },
      { id: 303, title: 'Cloud DevOps Engineer (AWS)', company: { name: 'CloudNet Solutions' }, location: 'Remote', type: 'Contract', postedAt: new Date().toISOString() },
      { id: 304, title: 'Lead Mobile Developer (React Native)', company: { name: 'MobileFirst Apps' }, location: 'Bandung', type: 'Full-time', postedAt: new Date().toISOString(), salaryMin: 22000000 },
    ];
    // Simulasi penundaan jaringan agar loading spinner terlihat
    await new Promise(resolve => setTimeout(resolve, 800)); 
    return { data: mockJobs };
  } catch (error) {
    console.error('Error fetching recommended jobs:', error);
    throw new Error('Gagal mengambil data pekerjaan rekomendasi.');
  }
};
/**
 * Mengambil data pekerjaan dari API dengan filter dan pagination.
 */
export const getAllJobs = async (filters: JobFilters = {}): Promise<IJobApiResponse> => {
  console.log("Fetching jobs with filters:", filters);
  try {
    const page = filters.page || 1;
    const limit = filters.limit || 5; // Tampilkan 5 pekerjaan per halaman

    // --- Data Placeholder untuk simulasi ---
    const mockJobs: IJob[] = Array.from({ length: 23 }, (_, i) => ({
      id: i + 1,
      title: `Software Engineer #${i + 1}`,
      company: { name: `Tech Company ${i % 5}` },
      location: i % 3 === 0 ? 'Jakarta' : 'Remote',
      type: 'Full-time',
      postedAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
      description: 'Deskripsi pekerjaan yang menarik.'
    }));

    // Simulasi filter
    const filteredJobs = mockJobs.filter(job => {
        const keywordMatch = filters.keyword ? job.title.toLowerCase().includes(filters.keyword.toLowerCase()) : true;
        // ... tambahkan logika filter lain
        return keywordMatch;
    });

    const totalItems = filteredJobs.length;
    const totalPages = Math.ceil(totalItems / limit);
    const paginatedData = filteredJobs.slice((page - 1) * limit, page * limit);
    
    // Simulasi respons API
    return await Promise.resolve({
      data: paginatedData,
      meta: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: totalItems,
        perPage: limit,
      }
    });

  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};