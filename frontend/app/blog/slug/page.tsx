import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogService } from '@/services/blogService'; // Diasumsikan path service benar
import type { Metadata } from 'next';
import { TransformedBlogPost } from '@/lib/types'; // Diasumsikan path tipe benar

// Impor komponen UI kustom (ini perlu Anda buat secara terpisah)
// import { Badge } from '@/components/ui/badge';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { BlogPostCard } from '@/components/BlogPostCard'; 
// import { ShareButtons } from '@/components/ShareButtons';
// import { CommentsSection } from '@/components/CommentsSection';

// --- Placeholder untuk Komponen UI ---
// Karena saya tidak memiliki akses ke file komponen Anda,
// saya akan membuat versi sederhana di sini agar kode utama dapat berjalan.

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block bg-gray-200 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
    {children}
  </span>
);

const Avatar = ({ src, alt, fallback }: { src?: string, alt: string, fallback: string }) => (
  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
    {src ? (
      <Image src={src} alt={alt} layout="fill" objectFit="cover" />
    ) : (
      <span className="text-white font-bold">{fallback}</span>
    )}
  </div>
);

const BlogPostCard = ({ post }: { post: TransformedBlogPost }) => (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <a href={`/blog/${post.slug}`} className="block">
            <Image src={post.imageUrl} alt={post.title} width={400} height={250} className="w-full object-cover"/>
            <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm">{post.excerpt}</p>
            </div>
        </a>
    </div>
);


// --- Komponen Utama Halaman Detail Blog ---

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

/**
 * Fungsi untuk menghasilkan Metadata SEO Dinamis
 */
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await blogService.getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Artikel Tidak Ditemukan',
      description: 'Artikel yang Anda cari tidak ada atau telah dihapus.',
    };
  }

  return {
    title: `${post.title} | Blog Kami`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      authors: [post.authorName],
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
  };
}


/**
 * Komponen Halaman Detail Artikel Blog
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  
  // Ambil data artikel dan artikel terkait secara paralel
  const [post, relatedPosts] = await Promise.all([
      blogService.getPostBySlug(slug),
      // Ambil 3 artikel lain dari kategori yang sama sebagai "artikel terkait"
      // Anda mungkin perlu menambahkan logika filtering di `getPosts`
      // Untuk sementara, kita ambil saja 3 artikel terbaru
      blogService.getPosts({ limit: 3, category: (await blogService.getPostBySlug(slug))?.category }) 
  ]);

  // Jika artikel tidak ditemukan, tampilkan halaman 404
  if (!post) {
    notFound();
  }
  
  // Format tanggal untuk tampilan yang lebih ramah pengguna
  const formattedDate = post.publishedAt.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Filter agar artikel saat ini tidak muncul di daftar artikel terkait
  const filteredRelatedPosts = relatedPosts.posts.filter(p => p.slug !== post.slug);

  return (
    <div className="bg-white font-sans">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <article className="max-w-4xl mx-auto">
          {/* --- Header Artikel --- */}
          <header className="mb-8 lg:mb-12 text-center">
            <div className="mb-4">
              <Badge>{post.category}</Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex justify-center items-center space-x-4 text-gray-500">
                <div className="flex items-center space-x-2">
                    <Avatar 
                        src={post.authorAvatarUrl} 
                        alt={post.authorName} 
                        fallback={post.authorName.charAt(0)}
                    />
                    <span className="font-medium text-gray-800">{post.authorName}</span>
                </div>
                <span className="hidden md:inline">·</span>
                <time dateTime={post.publishedAt.toISOString()}>{formattedDate}</time>
                <span className="hidden md:inline">·</span>
                <span>{post.readingTimeMinutes} menit baca</span>
            </div>
          </header>

          {/* --- Gambar Utama --- */}
          <figure className="mb-8 lg:mb-12">
            <Image
              src={post.imageUrl}
              alt={`Gambar sampul untuk ${post.title}`}
              width={1200}
              height={630}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
              priority // Prioritaskan pemuatan gambar utama
            />
          </figure>

          {/* --- Konten Artikel & Table of Contents --- */}
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            {/* Konten Utama */}
            <div className="prose prose-lg max-w-none w-full lg:w-3/4">
                {/* Di sini Anda akan merender `post.content`. 
                  Jika konten berupa Markdown, gunakan library seperti `react-markdown`.
                  Jika berupa HTML, gunakan `dangerouslySetInnerHTML` dengan hati-hati.
                  
                  Contoh dengan dangerouslySetInnerHTML (pastikan HTML dari API Anda aman!):
                */}
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Sidebar (Opsional: Daftar Isi, Info Tambahan) */}
            <aside className="w-full lg:w-1/4 mt-8 lg:mt-0">
                <div className="sticky top-24 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-bold text-lg mb-4">Bagikan Artikel Ini</h3>
                    {/* <ShareButtons url={`https://domain-anda.com/blog/${post.slug}`} title={post.title} /> */}
                    <p className="text-sm text-gray-600">Bantu sebarluaskan jika Anda merasa artikel ini bermanfaat!</p>
                </div>
            </aside>
          </div>


          {/* --- Tag Artikel --- */}
          <footer className="mt-12 pt-8 border-t">
            <div className="flex flex-wrap items-center">
                <h3 className="text-lg font-semibold mr-4 mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                    ))}
                </div>
            </div>
          </footer>
        </article>
      </div>
      
      {/* --- Bagian Artikel Terkait --- */}
      {filteredRelatedPosts.length > 0 && (
          <section className="bg-gray-50 py-16">
              <div className="container mx-auto px-4">
                  <h2 className="text-3xl font-bold text-center mb-8">Baca Juga</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                      {filteredRelatedPosts.map((relatedPost) => (
                          <BlogPostCard key={relatedPost.id} post={relatedPost} />
                      ))}
                  </div>
              </div>
          </section>
      )}

       {/* --- Bagian Komentar (Placeholder) --- */}
       <section className="py-16">
           <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-3xl font-bold mb-8">Komentar</h2>
                {/* <CommentsSection postId={post.id} /> */}
                <div className="p-8 text-center bg-gray-100 rounded-lg">
                    <p className="text-gray-600">Fitur komentar akan segera hadir. Beri tahu kami pendapat Anda melalui media sosial!</p>
                </div>
           </div>
       </section>
    </div>
  );
}