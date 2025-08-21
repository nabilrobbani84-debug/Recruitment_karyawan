import { TransformedBlogPost, CommunityApiResponse, CommunityAuthor, CommunityTag, CommunityThread } from '@/lib/types';

// --- FIX: Gunakan anotasi tipe yang benar ---
export const dummyBlogPosts: TransformedBlogPost[] = [
  {
    id: 1,
    slug: 'panduan-lengkap-nextjs-app-router',
    title: 'Panduan Lengkap Next.js App Router untuk Pemula',
    content: `
      <h2>Pendahuluan</h2>
      <p>Next.js 13 memperkenalkan App Router...</p>
      <pre><code>...</code></pre>
    `,
    excerpt: 'Pelajari cara kerja App Router di Next.js 13...',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=3600',
    authorName: 'Jane Doe',
    authorAvatarUrl: 'https://i.pravatar.cc/150?u=jane_doe',
    category: 'Teknologi',
    tags: ['Next.js', 'React', 'JavaScript', 'Web Development'],
    // FIX: Ubah string menjadi objek Date
    publishedAt: new Date('2025-06-15T09:00:00.000Z'),
    // FIX: Tambahkan properti yang hilang agar sesuai dengan tipe
    readingTimeMinutes: 5,
  },
  {
    id: 2,
    slug: 'memahami-typescript-dalam-5-menit',
    title: 'Memahami TypeScript dalam 5 Menit',
    content: `
      <h2>Apa itu TypeScript?</h2>
      <p>TypeScript adalah superset dari JavaScript...</p>
    `,
    excerpt: 'Pengenalan singkat tentang TypeScript...',
    imageUrl: 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=3600',
    authorName: 'John Smith',
    authorAvatarUrl: 'https://i.pravatar.cc/150?u=john_smith',
    category: 'Programming',
    tags: ['TypeScript', 'JavaScript', 'Tutorial'],
    // FIX: Ubah string menjadi objek Date
    publishedAt: new Date('2025-06-10T14:30:00.000Z'),
    // FIX: Tambahkan properti yang hilang agar sesuai dengan tipe
    readingTimeMinutes: 3,
  },
];

// --- FIX: Gunakan nama tipe yang benar tanpa awalan 'I' ---
export const getCommunityData = async (): Promise<CommunityApiResponse> => {
  const authors: CommunityAuthor[] = [
    { id: 'u1', name: 'Budi Doremi', avatarUrl: 'https://placehold.co/40x40/e0e7ff/4338ca?text=BD', title: 'Software Engineer' },
    { id: 'u2', name: 'Siti Rahma', avatarUrl: 'https://placehold.co/40x40/c7d2fe/312e81?text=SR', title: 'UI/UX Designer' },
    { id: 'u3', name: 'Ahmad Yusuf', avatarUrl: 'https://placehold.co/40x40/ddd6fe/4c1d95?text=AY', title: 'Product Manager' },
  ];
  const tags: CommunityTag[] = [
    { id: 1, name: 'Wawancara', slug: 'wawancara' }, { id: 2, name: 'Gaji', slug: 'gaji' },
    { id: 3, name: 'Fresh Graduate', slug: 'fresh-graduate' }, { id: 4, name: 'Karir IT', slug: 'karir-it' },
    { id: 5, name: 'Pengembangan Diri', slug: 'pengembangan-diri' },
  ];
  const threads: CommunityThread[] = [
    { id: 't1', title: 'Tips jitu menjawab "Apa kelemahan terbesarmu?"', author: authors[0], tags: [tags[0], tags[4]], contentSnippet: 'Teman-teman, sering bingung nggak sih kalau ditanya soal kelemahan? Aku ada beberapa trik nih...', stats: { replies: 15, views: 250, likes: 32 }, createdAt: new Date(Date.now() - 86400000 * 1).toISOString(), lastActivityAt: new Date().toISOString() },
    { id: 't2', title: 'Cara negosiasi gaji untuk fresh graduate?', author: authors[2], tags: [tags[1], tags[2]], contentSnippet: 'Halo semua, aku baru aja lulus dan dapet tawaran kerja pertama. Masih ragu soal negosiasi gaji...', stats: { replies: 28, views: 520, likes: 55 }, createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), lastActivityAt: new Date().toISOString() },
    { id: 't3', title: 'Portofolio vs IPK untuk berkarir di dunia IT?', author: authors[1], tags: [tags[3], tags[2]], contentSnippet: 'Sebagai seorang desainer, aku merasa portofolio adalah segalanya. Tapi banyak teman dari IT...', stats: { replies: 45, views: 890, likes: 78 }, createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), lastActivityAt: new Date().toISOString() },
  ];

  await new Promise(resolve => setTimeout(resolve, 500));
  return { threads, topMembers: authors, popularTags: tags };
};