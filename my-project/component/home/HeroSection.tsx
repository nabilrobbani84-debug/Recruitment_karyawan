import React from 'react';
import Image from 'next/image'; // 1. Impor komponen Image dari Next.js
import { Button } from '@/component/common/Button';
// 2. Impor InputField yang akan kita gunakan untuk lokasi
import { InputField } from '@/component/common/InputField'; 
import { Search, MapPin } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative bg-blue-50">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Kolom Teks */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Temukan <span className="text-blue-600">Pekerjaan Impian</span> Anda Berikutnya.
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
              Jelajahi ribuan lowongan pekerjaan dari perusahaan-perusahaan terkemuka di Indonesia. Mulai karir Anda bersama kami.
            </p>

            {/* Form Pencarian yang Sudah Diperbaiki */}
            <div className="mt-8">
                <div className="p-4 bg-white rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-2">
                    {/* 3. Menggunakan InputField dengan ikon Search */}
                    <InputField
                      label=""
                      id="search-job"
                      type="text"
                      placeholder="Jabatan atau kata kunci"
                      icon={<Search size={20} className="text-gray-400" />}
                      containerClassName="w-full"
                    />
                    {/* 4. Menggunakan InputField dengan ikon MapPin */}
                    <InputField
                      label=""
                      id="search-location"
                      type="text"
                      placeholder="Lokasi"
                      icon={<MapPin size={20} className="text-gray-400" />}
                      containerClassName="w-full md:w-auto"
                    />
                    <Button size="lg" className="w-full md:w-auto flex-shrink-0">
                      <Search size={20} className="mr-2 md:hidden lg:block"/> Cari
                    </Button>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Contoh: Software Engineer, Marketing, Jakarta, BUMN...
                </p>
            </div>
          </div>
          
          {/* Kolom Gambar yang Sudah Diperbaiki */}
          <div className="hidden md:block">
            {/* 5. Menggunakan komponen <Image> dari Next.js */}
            <Image 
              src="/images/hero-illustration.png"
              alt="Ilustrasi orang sedang mencari pekerjaan"
              width={500}
              height={500}
              className="w-full h-auto object-contain"
              priority // Tambahkan 'priority' untuk gambar penting di atas halaman (LCP)
            />
          </div>
        </div>
      </div>
    </section>
  );
};
