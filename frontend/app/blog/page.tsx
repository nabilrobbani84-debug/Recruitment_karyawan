// src/app/blog/page.tsx
'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
// Ganti impor ke mock service untuk pengembangan
import { mockBlogService as blogService } from '@/services/mockBlogService';
import type { PaginatedBlogPosts, GetBlogPostsParams } from '@/lib/types';
import { useDebounce } from '@/hooks/useDebounce';
import { BlogCard } from '@/component/blog/blogCard';
import { AlertTriangle, LoaderCircle, Search } from 'lucide-react';

// Komponen Pagination (tidak ada perubahan)
const Pagination = ({ totalPages, currentPage, onPageChange }: { totalPages: number; currentPage: number; onPageChange: (page: number) => void }) => {
  if (totalPages <= 1) return null;
  return (
    <nav aria-label="Pagination" className="flex justify-center items-center gap-4 mt-16 text-sm">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-4 py-2 rounded-lg border bg-white font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Sebelumnya
      </button>
      <span className="font-medium text-gray-600">
        Halaman {currentPage} dari {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 rounded-lg border bg-white font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Selanjutnya
      </button>
    </nav>
  );
};

// Komponen Skeleton untuk Suspense Fallback
const BlogPageSkeleton = () => (
  <div className="bg-gray-50 min-h-screen">
    <div className="container mx-auto px-4 py-12 md:py-20 animate-pulse">
      <div className="text-center mb-12">
        <div className="h-12 bg-gray-300 rounded-md w-3/4 mx-auto"></div>
        <div className="h-6 bg-gray-200 rounded-md w-1/2 mx-auto mt-4"></div>
      </div>
      <div className="sticky top-4 py-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="h-11 bg-gray-300 rounded-lg flex-grow"></div>
          <div className="h-11 bg-gray-300 rounded-lg w-full md:w-48"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border border-gray-200 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-6 bg-gray-300 rounded w-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);


const BlogPageContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [blogData, setBlogData] = useState<PaginatedBlogPosts | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const updateURLParams = useCallback((newParams: Record<string, string | number | null>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        current.set(key, String(value));
      } else {
        current.delete(key);
      }
    });

    if ('q' in newParams || 'category' in newParams) {
      current.delete('page');
    }
    
    router.push(`${pathname}?${current.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    const currentQueryOnURL = searchParams.get('q') || '';
    if (debouncedSearchQuery !== currentQueryOnURL) {
      updateURLParams({ q: debouncedSearchQuery });
    }
  }, [debouncedSearchQuery, searchParams, updateURLParams]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchAllData = async () => {
      setIsLoading(true);
      setError(null);

      const params: GetBlogPostsParams = {
        page: Number(searchParams.get('page') || '1'),
        limit: 9,
        searchQuery: searchParams.get('q') || undefined,
        category: searchParams.get('category') || undefined,
      };

      try {
        const promises: [Promise<PaginatedBlogPosts>, Promise<string[]>?] = [
          blogService.getPosts(params, { signal })
        ];

        if (categories.length === 0) {
          promises.push(blogService.getCategories({ signal }));
        }

        const [postsResponse, categoriesResponse] = await Promise.all(promises);
        
        if (!signal.aborted) {
          setBlogData(postsResponse);
          if (categoriesResponse) {
            setCategories(categoriesResponse);
          }
        }
      } catch (e: unknown) { // PERBAIKAN: Menggunakan 'unknown' untuk type safety
        if (e instanceof Error) {
          // Jangan set error jika request dibatalkan secara sengaja
          if (e.name !== 'AbortError') {
            setError(e.message);
          }
        } else {
          // Fallback untuk error yang bukan instance dari Error
          setError("Gagal memuat data karena kesalahan yang tidak diketahui.");
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchAllData();

    return () => {
      controller.abort();
    };
  }, [searchParams, categories.length]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Jelajahi Blog & Berita Kami</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Dapatkan wawasan, berita, dan saran terbaru dari tim kami untuk membantu perjalanan karir Anda.
          </p>
        </div>

        <div className="sticky top-4 bg-gray-50/80 backdrop-blur-sm z-10 py-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Cari artikel berdasarkan judul..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <select
              value={searchParams.get('category') || ''}
              onChange={(e) => updateURLParams({ category: e.target.value || null })}
              className="w-full md:w-auto px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Semua Kategori</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <LoaderCircle className="w-12 h-12 animate-spin text-blue-600" />
          </div>
        )}
        
        {error && (
          <div className="flex flex-col items-center text-center py-20 bg-red-50 border border-red-200 rounded-lg">
            <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-red-800">Terjadi Kesalahan</h3>
            <p className="text-red-600 mt-2">{error}</p>
          </div>
        )}
        
        {!isLoading && !error && blogData && (
          <>
            {blogData.posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogData.posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white border border-gray-200 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800">Tidak Ada Artikel Ditemukan</h3>
                <p className="text-gray-500 mt-2">Coba ubah kata kunci pencarian atau filter kategori Anda.</p>
              </div>
            )}

            <Pagination
              totalPages={blogData.totalPages}
              currentPage={blogData.currentPage}
              onPageChange={(page) => updateURLParams({ page: page })}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogPageSkeleton />}>
      <BlogPageContent />
    </Suspense>
  );
}