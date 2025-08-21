// src/components/common/SearchBar.tsx
"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { InputField } from '@/component/common/InputField';
import { Button } from '@/component/common/Button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder: string;
  basePath: string; // e.g., '/companies', '/blog'
}

export function SearchBar({ placeholder, basePath }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const currentParams = new URLSearchParams(); // Mulai dari params kosong

    if (query) {
      currentParams.set('q', query);
    }
    
    router.push(`${basePath}?${currentParams.toString()}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-8">
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative w-full">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
        </div>
        <Button type="submit" className="h-12 flex-shrink-0">
          Cari
        </Button>
      </form>
    </div>
  );
}