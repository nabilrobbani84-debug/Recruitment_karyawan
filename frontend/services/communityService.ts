export interface ICommunityAuthor {
  id: string;
  name: string;
  avatarUrl: string;
  title: string;
}

export interface ICommunityTag {
  id: number;
  name: string;
  slug: string;
}

export interface ICommunityThread {
  id: string;
  title: string;
  author: ICommunityAuthor;
  tags: ICommunityTag[];
  contentSnippet: string;
  stats: {
    replies: number;
    views: number;
    likes: number;
  };
  createdAt: string;
  lastActivityAt: string;
}

export interface ICommunityApiResponse {
  threads: ICommunityThread[];
  topMembers: ICommunityAuthor[];
  popularTags: ICommunityTag[];
}

export const getCommunityData = async (): Promise<ICommunityApiResponse> => {
  const authors: ICommunityAuthor[] = [
    { id: 'u1', name: 'Budi Doremi', avatarUrl: 'https://placehold.co/40x40/e0e7ff/4338ca?text=BD', title: 'Software Engineer' },
    { id: 'u2', name: 'Siti Rahma', avatarUrl: 'https://placehold.co/40x40/c7d2fe/312e81?text=SR', title: 'UI/UX Designer' },
    { id: 'u3', name: 'Ahmad Yusuf', avatarUrl: 'https://placehold.co/40x40/ddd6fe/4c1d95?text=AY', title: 'Product Manager' },
  ];
  const tags: ICommunityTag[] = [
    { id: 1, name: 'Wawancara', slug: 'wawancara' }, { id: 2, name: 'Gaji', slug: 'gaji' }, { id: 3, name: 'Fresh Graduate', slug: 'fresh-graduate' }, { id: 4, name: 'Karir IT', slug: 'karir-it' }, { id: 5, name: 'Pengembangan Diri', slug: 'pengembangan-diri' },
  ];
  const threads: ICommunityThread[] = [
    { id: 't1', title: 'Tips jitu menjawab pertanyaan "Apa kelemahan terbesarmu?" saat interview', author: authors[0], tags: [tags[0], tags[4]], contentSnippet: 'Teman-teman, sering bingung nggak sih kalau ditanya soal kelemahan? Aku ada beberapa trik nih yang mungkin bisa membantu kita semua untuk menjawabnya dengan jujur tapi tetap menjual...', stats: { replies: 15, views: 250, likes: 32 }, createdAt: new Date(Date.now() - 86400000 * 1).toISOString(), lastActivityAt: new Date(Date.now() - 3600000 * 2).toISOString() },
    { id: 't2', title: 'Bagaimana cara negosiasi gaji untuk posisi pertama sebagai fresh graduate?', author: authors[2], tags: [tags[1], tags[2]], contentSnippet: 'Halo semua, aku baru aja lulus dan dapet tawaran kerja pertama. Aku masih ragu soal negosiasi gaji, takut dianggap nggak sopan atau minta ketinggian. Ada saran atau pengalaman?', stats: { replies: 28, views: 520, likes: 55 }, createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), lastActivityAt: new Date(Date.now() - 3600000 * 1).toISOString() },
    { id: 't3', title: 'Apakah portofolio lebih penting dari IPK untuk berkarir di dunia IT?', author: authors[1], tags: [tags[3], tags[2]], contentSnippet: 'Sebagai seorang desainer, aku merasa portofolio adalah segalanya. Tapi banyak teman dari jurusan IT lain yang masih fokus ke IPK. Menurut kalian, mana yang lebih jadi pertimbangan recruiter?', stats: { replies: 45, views: 890, likes: 78 }, createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), lastActivityAt: new Date(Date.now() - 3600000 * 5).toISOString() }
  ];
  await new Promise(resolve => setTimeout(resolve, 500));
  return { threads, topMembers: authors, popularTags: tags };
};
