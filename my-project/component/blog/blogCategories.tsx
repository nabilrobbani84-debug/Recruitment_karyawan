// src/components/blog/BlogCategories.tsx
"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Tag } from 'lucide-react';

interface BlogCategoriesProps {
  categories: string[];
}

export function BlogCategories({ categories }: BlogCategoriesProps) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
        <Tag size={20} />
        Kategori
      </h3>
      <div className="flex flex-wrap gap-2">
        <Link 
          href="/blog"
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            !activeCategory ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Semua
        </Link>
        {categories.map((category) => (
          <Link
            key={category}
            href={`/blog?category=${encodeURIComponent(category)}`}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
}