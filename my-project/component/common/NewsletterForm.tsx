// src/app/blog/page.tsx

import { blogService } from '@/services/blogService';
import { FeaturedBlogCard } from '@/component/blog/FeaturedBlogCard';
import { BlogCard } from '@/component/blog/blogCard';
import { SectionTitle } from '@/component/common/SectionTitle';
import { TransformedBlogPost } from '@/services/blogService'; // Impor tipe

// Fitur Revalidasi Next.js: Halaman ini akan diregenerasi di server setiap 1 jam
export const revalidate = 3600; 

export default async function BlogPage() {
  // Ambil 7 postingan terbaru: 1 untuk unggulan, 6 untuk grid
  const postsData = await blogService.getPosts({ page: 1, limit: 7, sortBy: 'publishedAt', order: 'desc' });
  
  // Memberi tipe yang eksplisit untuk keamanan
  const allPosts: TransformedBlogPost[] = postsData.posts;

  const featuredPost = allPosts.length > 0 ? allPosts[0] : null;
  const regularPosts = allPosts.length > 1 ? allPosts.slice(1) : [];

  return (
    <main className="bg-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <SectionTitle
          align="center"
          title="From the blog"
          subtitle="Wawasan, berita, dan saran terbaru dari tim kami untuk membantu perjalanan karir Anda."
        />

        {/* Bagian Artikel Unggulan */}
        {featuredPost && (
          <div className="mt-12 mb-16 md:mb-24">
            <FeaturedBlogCard post={featuredPost} />
          </div>
        )}

        {/* Garis Pemisah jika ada kedua bagian */}
        {featuredPost && regularPosts.length > 0 && <hr className="border-gray-200" />}

        {/* Bagian Grid Artikel Lainnya */}
        {regularPosts.length > 0 && (
          <div className="mt-16 md:mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {regularPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* Kondisi jika tidak ada artikel sama sekali */}
        {allPosts.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-lg border">
                <h3 className="text-2xl font-bold text-gray-800">Belum Ada Artikel</h3>
                <p className="text-gray-500 mt-2">Silakan cek kembali nanti untuk wawasan terbaru dari kami.</p>
            </div>
        )}
      </div>
    </main>
  );
}