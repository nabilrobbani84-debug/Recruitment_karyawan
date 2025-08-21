
/**
 * Tipe generik untuk respons API yang mengandung data dengan paginasi.
 * @template T - Tipe dari item data yang ada di dalam array `data`.
 */
export interface PaginatedApiResponse<T> {
  data: T[];
  meta: {
    total: number;
  };
}

/**
 * Struktur data mentah dari API untuk post blog (menggunakan snake_case).
 */
export interface BlogPostAPI {
  id: number | string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  image_url: string;
  author_name: string;
  author_avatar_url?: string;
  published_at: string; // ISO 8601 string
}

/**
 * Struktur data post blog setelah diubah untuk digunakan di UI (camelCase).
 */
export interface TransformedBlogPost {
  id: number | string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  imageUrl: string;
  authorName: string;
  authorAvatarUrl?: string;
  publishedAt: Date;
  readingTimeMinutes: number;
}

/**
 * Bentuk data paginasi untuk post blog yang dikirim ke UI.
 */
export interface PaginatedBlogPosts {
  posts: TransformedBlogPost[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Parameter yang bisa digunakan untuk mengambil daftar post blog.
 */
export interface GetBlogPostsParams {
  page?: number;
  limit?: number;
  category?: string;
  searchQuery?: string;
  sortBy?: 'published_at' | 'title';
  order?: 'asc' | 'desc';
}


// =======================
// === JOB & APPLICATION TYPES ===
// =======================

/**
 * Struktur data untuk sebuah lowongan pekerjaan.
 * (Definisi duplikat telah dihapus untuk menciptakan satu sumber kebenaran).
 */
export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  category: string;
  salary?: number;
  description: string;
  requirements: string[];
  postedAt: string; // ISO 8601 date string
}

/**
 * Struktur data untuk sebuah lamaran pekerjaan yang diterima dari API.
 */
export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  appliedAt: string;
  status: 'Pending' | 'Reviewed' | 'Interview' | 'Offered' | 'Rejected';
}

/**
 * ⭐️ PERBAIKAN UTAMA: Tipe data untuk form pengiriman lamaran.
 * Ini adalah tipe yang hilang yang menyebabkan error kompilasi.
 */
export interface ApplicationFormData {
  coverLetter?: string; // Biasanya berisi cover letter atau catatan tambahan.
  // Anda bisa menambahkan properti lain di sini jika diperlukan,
  // misalnya `resumeUrl: string` jika pengguna bisa memilih CV yang berbeda.
}

/**
 * Parameter untuk memfilter pencarian lowongan kerja.
 */
export interface JobFilterParams {
  query?: string;
  location?: string;
  type?: string;
  category?: string;
  page?: number;
  limit?: number;
}

/**
 * Struktur data untuk profil pengguna/kandidat.
 */
export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
  headline: string;
  summary: string;
  cvUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
}

export interface Skill {
  id: string | number;
  name: string;
}

export interface Company {
  id: string | number;
  name: string;
  logoUrl: string;
  tagline: string;
  location: string;
  industry: string;
  activeJobsCount: number;
}


// =======================
// === COMMUNITY TYPES ===
// =======================
// (Prefix 'I' dihilangkan untuk konsistensi)

export interface CommunityAuthor {
  id: string;
  name: string;
  avatarUrl: string;
  title: string;
}

export interface CommunityTag {
  id: number;
  name: string;
  slug: string;
}

export interface CommunityThread {
  id: string;
  title: string;
  author: CommunityAuthor;
  tags: CommunityTag[];
  contentSnippet: string;
  stats: {
    replies: number;
    views: number;
    likes: number;
  };
  createdAt: string;
  lastActivityAt: string;
}

export interface CommunityApiResponse {
  threads: CommunityThread[];
  topMembers: CommunityAuthor[];
  popularTags: CommunityTag[];
}

