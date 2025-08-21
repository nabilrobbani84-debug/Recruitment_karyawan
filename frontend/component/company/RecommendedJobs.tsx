// src/components/company/RecommendedJobs.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

// --- PERBAIKAN: Impor fungsi spesifik dan tipe IJob dari service ---
import { getRecommendedJobs, type IJob } from '@/services/jobService';

// --- PERBAIKAN: Impor komponen dengan path yang benar ('components') ---
import { SectionTitle } from '@/component/common/SectionTitle';
import { JobCard } from '@/component/job/JobCard';
import { Loader2 } from 'lucide-react';

export function RecommendedJobs() {
  // --- PERBAIKAN: Ambil 'isAuthenticated' sebagai properti boolean, bukan fungsi ---
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  
  // --- PERBAIKAN: Gunakan tipe IJob yang benar dari service ---
  const [recommendedJobs, setRecommendedJobs] = useState<IJob[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Default ke false

  useEffect(() => {
    // Hanya fetch data jika pengguna sudah terotentikasi
    if (isAuthenticated) {
      const fetchRecommendations = async () => {
        setIsLoading(true);
        try {
          // --- PERBAIKAN: Panggil fungsi yang sudah diimpor ---
          const response = await getRecommendedJobs();
          setRecommendedJobs(response.data);
        } catch (error) {
          console.error("Failed to fetch recommendations:", error);
          // Anda bisa menambahkan state untuk menampilkan error jika perlu
        } finally {
          setIsLoading(false);
        }
      };
      fetchRecommendations();
    }
  }, [isAuthenticated]); // Efek ini dijalankan setiap kali status otentikasi berubah

  // Jangan render apapun jika tidak login.
  if (!isAuthenticated) {
    return null;
  }
  
  // Tampilkan loader saat fetching, bahkan jika belum ada data
  if (isLoading) {
    return (
        <section className="mt-20">
            <SectionTitle
                title="Pekerjaan yang Direkomendasikan untuk Anda"
                subtitle="Berdasarkan profil dan aktivitas Anda, kami sedang mencari peluang terbaik."
            />
            <div className="flex justify-center items-center h-40">
                <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
        </section>
    );
  }

  // Jangan render apapun jika sudah selesai loading tapi tidak ada data
  if (recommendedJobs.length === 0) {
      return null;
  }

  return (
    <section className="mt-20">
      <SectionTitle
        title="Pekerjaan yang Direkomendasikan untuk Anda"
        subtitle="Berdasarkan profil dan aktivitas Anda, kami menemukan peluang ini."
      />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedJobs.map(job => (
          // --- PERBAIKAN: Tipe 'job' di sini sekarang cocok dengan yang diharapkan oleh JobCard ---
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}
