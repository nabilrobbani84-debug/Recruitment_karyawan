import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/component/common/Button';

export const IntroSummarySection = () => {
  const benefits = [
    "Akses ke Ribuan Lowongan Terverifikasi",
    "Proses Lamaran yang Cepat dan Mudah",
    "Partner dengan Perusahaan Terkemuka",
    "Update Karir dan Tips Profesional",
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Kolom Gambar */}
          <div className="order-last md:order-first">
            <img 
              src="/images/intro-summary-image.png" // Ganti dengan path gambar Anda
              alt="Tim sedang berdiskusi"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
          {/* Kolom Teks */}
          <div>
            <span className="text-sm font-bold uppercase text-blue-600">Tentang Kami</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Platform Terpercaya untuk Menghubungkan Bakat dan Peluang
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              RecruitEasy didedikasikan untuk menjembatani kesenjangan antara para pencari kerja berbakat dengan perusahaan impian mereka. Kami menyediakan platform yang intuitif dan efisien.
            </p>
            <ul className="mt-8 space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
             <div className="mt-10">
                <Button size="lg">Pelajari Lebih Lanjut</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};