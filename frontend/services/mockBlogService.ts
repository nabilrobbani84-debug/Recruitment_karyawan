// src/services/mockBlogService.ts

import type {
  GetBlogPostsParams,
  PaginatedBlogPosts,
  TransformedBlogPost,
} from '@/lib/types';

// Data tiruan untuk kategori
const MOCK_CATEGORIES: string[] = [
  'Teknologi',
  'Pengembangan Karir',
  'Bisnis & Startup',
  'Gaya Hidup',
  'Pemasaran Digital',
];

// Data tiruan untuk postingan blog
const MOCK_POSTS: TransformedBlogPost[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  slug: `contoh-artikel-ke-${i + 1}`,
  title: `Judul Artikel Menarik Ke-${i + 1}`,
  content: 'Ini adalah isi konten lengkap dari artikel...',
  excerpt: 'Ini adalah ringkasan atau kutipan singkat dari artikel untuk ditampilkan di kartu blog. Cukup beberapa kalimat saja.',
  category: MOCK_CATEGORIES[i % MOCK_CATEGORIES.length],
  tags: ['Inspirasi', 'Produktif'],
  imageUrl: `https://picsum.photos/seed/${i + 1}/800/600`,
  authorName: 'John Doe',
  authorAvatarUrl: 'https://i.pravatar.cc/150?u=johndoe',
  publishedAt: new Date(new Date().setDate(new Date().getDate() - i)),
  readingTimeMinutes: Math.floor(Math.random() * 5) + 3,
}));


// Fungsi untuk mensimulasikan delay jaringan
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


export const mockBlogService = {
  /**
   * Versi tiruan dari getPosts
   */
  async getPosts(
    params: GetBlogPostsParams = {},
    // PERBAIKAN: Nama parameter diubah menjadi `_options` untuk menandakan
    // bahwa parameter ini sengaja tidak digunakan, sehingga menghilangkan error linter.
    _options?: { signal?: AbortSignal }
  ): Promise<PaginatedBlogPosts> {
    
    await sleep(500); // Simulasi loading

    const page = params.page || 1;
    const limit = params.limit || 9;
    const category = params.category;
    const searchQuery = params.searchQuery?.toLowerCase();

    let filteredPosts = MOCK_POSTS;

    if (category) {
      filteredPosts = filteredPosts.filter(p => p.category === category);
    }
    if (searchQuery) {
      filteredPosts = filteredPosts.filter(p => p.title.toLowerCase().includes(searchQuery));
    }

    const totalPosts = filteredPosts.length;
    const paginatedPosts = filteredPosts.slice((page - 1) * limit, page * limit);
    
    console.log(`[MOCK] Mengambil posts: Halaman ${page}, Kategori: ${category || 'Semua'}`);

    return {
      posts: paginatedPosts,
      totalPosts: totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
      hasNextPage: page * limit < totalPosts,
      hasPrevPage: page > 1,
    };
  },

  /**
   * Versi tiruan dari getCategories
   */
  async getCategories(
    // PERBAIKAN: Nama parameter diubah menjadi `_options`
    _options?: { signal?: AbortSignal }
  ): Promise<string[]> {
    await sleep(300); // Simulasi loading
    console.log('[MOCK] Mengambil kategori');
    return MOCK_CATEGORIES;
  }
};
