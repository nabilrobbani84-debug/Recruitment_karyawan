// src/components/blog/BlogCard.tsx (SUDAH DIPERBAIKI)

import Link from 'next/link';
import Image from 'next/image';
// FIX: Impor tipe dari file types, bukan dari service
import type { TransformedBlogPost } from '@/lib/types';

interface BlogCardProps {
  post: TransformedBlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <Link href={`/blog/${post.slug}`} className="block relative h-52 w-full">
        <Image
          src={post.imageUrl || '/placeholder-image.jpg'} // Fallback jika tidak ada gambar
          alt={`Gambar sampul untuk ${post.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-sm font-semibold text-blue-600 uppercase">{post.category}</p>
        <Link href={`/blog/${post.slug}`} className="mt-1 block">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-gray-600 flex-grow line-clamp-3">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-gray-500">
          <p className="font-medium text-gray-800">{post.authorName}</p>
          <span aria-hidden="true">&middot;</span>
          <time dateTime={post.publishedAt.toISOString()}>
            {post.publishedAt.toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year: 'numeric' })}
          </time>
        </div>
      </div>
    </article>
  );
}