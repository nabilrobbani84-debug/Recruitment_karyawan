// src/components/blog/FeaturedBlogCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import { TransformedBlogPost } from '@/services/blogService'; // Asumsi tipe ini diekspor dari service

interface FeaturedBlogCardProps {
  post: TransformedBlogPost;
}

export function FeaturedBlogCard({ post }: FeaturedBlogCardProps) {
  return (
    <article className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <Link href={`/blog/${post.slug}`} className="block relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={post.imageUrl}
          alt={`Gambar sampul untuk ${post.title}`}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-500 group-hover:scale-105"
          priority // Prioritaskan pemuatan gambar utama ini
        />
      </Link>
      <div className="flex flex-col">
        <p className="font-semibold text-blue-600 uppercase">{post.category}</p>
        <Link href={`/blog/${post.slug}`}>
          <h2 className="mt-2 text-3xl xl:text-4xl font-bold tracking-tight text-gray-900 group-hover:text-blue-700 transition-colors">
            {post.title}
          </h2>
        </Link>
        <p className="mt-4 text-lg text-gray-600 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-6 flex items-center gap-4">
          <Image
            className="h-12 w-12 rounded-full"
            src={post.authorAvatarUrl || '/images/default-avatar.png'} // Sediakan gambar fallback
            alt={`Avatar ${post.authorName}`}
            width={48}
            height={48}
          />
          <div>
            <p className="text-sm font-semibold text-gray-900">{post.authorName}</p>
            <p className="text-sm text-gray-600">
              {post.publishedAt.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}