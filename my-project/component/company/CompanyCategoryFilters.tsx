// src/component/company/CompanyCategoryFilters.tsx

'use client'; // Komponen ini harus interaktif, jadi kita tandai sebagai Client Component.

import { useState, useEffect, useTransition } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

// Definisikan tipe untuk kategori agar kode lebih aman
interface Category {
  id: number;
  name: string;
  slug: string;
}

// Fungsi untuk mengambil data kategori dari API (dengan data simulasi sebagai fallback)
async function getCategories(): Promise<Category[]> {
  try {
    // Ganti dengan URL API Anda yang sebenarnya
    // const response = await fetch('/api/v1/data/company-specializations'); 
    // if (!response.ok) throw new Error('Gagal mengambil kategori');
    // const data = await response.json();
    // return data.data || [];

    // --- Data Simulasi (ganti dengan fetch API di atas) ---
    await new Promise(resolve => setTimeout(resolve, 700)); // Simulasi delay jaringan
    return [
        { id: 2, name: 'Website', slug: 'website' },
        { id: 3, name: 'Cyber Security', slug: 'cyber-security' },
        { id: 4, name: 'Network', slug: 'network' },
        { id: 5, name: 'Data', slug: 'data' },
        { id: 6, name: 'Design', slug: 'design' },
        { id: 7, name: 'Android', slug: 'android' },
    ];
    // --- Akhir Data Simulasi ---

  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Kembalikan array kosong jika terjadi error
  }
}

export function CompanyCategoryFilters() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // --- FIX: Gunakan array untuk menyimpan kategori yang dipilih ---
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Sinkronkan state dengan URL saat komponen pertama kali dimuat atau URL berubah
  useEffect(() => {
    const categoriesFromUrl = searchParams.get('category')?.split(',') || [];
    setSelectedCategories(categoriesFromUrl.filter(Boolean)); // Filter string kosong
  }, [searchParams]);


  useEffect(() => {
    const fetchAndSetCategories = async () => {
      setIsLoading(true);
      const fetchedData = await getCategories();
      // Tombol "Relevan" tidak lagi diperlukan dalam mode multi-pilih,
      // karena pengguna bisa mengosongkan pilihan untuk melihat semua.
      setCategories(fetchedData);
      setIsLoading(false);
    };
    
    fetchAndSetCategories();
  }, []);
  
  // --- FIX: Logika baru untuk menangani multi-pilihan ---
  const handleFilterClick = (slug: string) => {
    const params = new URLSearchParams(searchParams);
    
    // Buat salinan dari state saat ini
    const newSelected = new Set(selectedCategories);

    if (newSelected.has(slug)) {
      newSelected.delete(slug); // Hapus jika sudah ada (toggle off)
    } else {
      newSelected.add(slug); // Tambah jika belum ada (toggle on)
    }

    const newCategoriesArray = Array.from(newSelected);

    if (newCategoriesArray.length > 0) {
      params.set('category', newCategoriesArray.join(','));
    } else {
      params.delete('category'); // Hapus parameter jika tidak ada yang dipilih
    }
    
    params.set('page', '1'); 
    
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // Loading state dengan skeleton UI yang modern
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-full h-12 animate-pulse">
         <div className="h-9 w-full bg-slate-200 dark:bg-slate-700 rounded-full" />
      </div>
    );
  }

  return (
    // Container modern dengan padding dan background
    <div className="flex items-center justify-center flex-wrap gap-2 md:gap-3 p-1 bg-slate-100 dark:bg-slate-800 rounded-full shadow-inner">
      {/* Tombol "Relevan" (Semua Kategori) dengan logika khusus */}
      <button
          onClick={() => handleFilterClick('relevant')}
          disabled={isPending}
          className={cn(
            "px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out transform",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-800 focus:ring-blue-500",
            "disabled:opacity-60 disabled:cursor-not-allowed",
            selectedCategories.length === 0
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md scale-105"
              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
          )}
      >
          Relevan
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleFilterClick(category.slug)}
          disabled={isPending}
          className={cn(
            "px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out transform",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-800 focus:ring-blue-500",
            "disabled:opacity-60 disabled:cursor-not-allowed",
            // --- FIX: Cek apakah slug ada di dalam array ---
            selectedCategories.includes(category.slug)
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md scale-105"
              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
