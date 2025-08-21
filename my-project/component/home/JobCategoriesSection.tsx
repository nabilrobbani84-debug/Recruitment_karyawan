import React from 'react';
import { ArrowRight, Code, Megaphone, Palette, LineChart } from 'lucide-react';
import { SectionTitle } from '@/component/common/SectionTitle';

const categories = [
  { name: 'Teknologi', count: 120, icon: <Code />, href: '/jobs?category=teknologi' },
  { name: 'Pemasaran', count: 88, icon: <Megaphone />, href: '/jobs?category=pemasaran' },
  { name: 'Desain & Kreatif', count: 76, icon: <Palette />, href: '/jobs?category=desain' },
  { name: 'Keuangan', count: 95, icon: <LineChart />, href: '/jobs?category=keuangan' },
  // ...tambahkan kategori lain
];

export const JobCategoriesSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Jelajahi Berdasarkan Kategori"
          subtitle="Temukan pekerjaan yang paling sesuai dengan keahlian Anda."
          align="center"
        />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <a key={category.name} href={category.href} className="group block p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300">
              <div className="text-blue-600 group-hover:scale-110 transition-transform">
                {React.cloneElement(category.icon, { size: 40 })}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{category.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{category.count} lowongan tersedia</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Lihat Lowongan <ArrowRight size={16} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};