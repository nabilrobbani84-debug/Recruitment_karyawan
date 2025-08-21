// src/components/job/CategoryChip.tsx

import React from 'react';

interface CategoryChipProps {
  /**
   * Teks yang akan ditampilkan di dalam chip.
   */
  category: string;
  /**
   * (Opsional) Class Tailwind CSS tambahan untuk kustomisasi.
   */
  className?: string;
}

/**
 * Komponen 'chip' yang stylish dan dapat digunakan kembali untuk menampilkan 
 * kategori, keahlian, atau tag lainnya dengan tampilan yang menarik dan konsisten.
 */
export const CategoryChip: React.FC<CategoryChipProps> = ({ category, className = '' }) => {
  return (
    <div 
      className={`
        inline-block 
        whitespace-nowrap 
        rounded-full 
        bg-primary/10 
        px-3 
        py-1.5 
        text-xs 
        font-semibold 
        leading-none 
        text-primary-dark 
        transition-all 
        duration-200 
        hover:bg-primary/20 
        hover:scale-105
        ${className}
      `}
      title={category} // Menambahkan tooltip untuk nama yang panjang
    >
      {category}
    </div>
  );
};

export default CategoryChip;

