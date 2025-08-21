// src/app/companies/page.tsx

import React from 'react';
// Impor tipe data dari sumber yang sama dengan yang digunakan oleh CompanyCard
import { type Company } from '@/lib/types'; 
import { getCompanies, type GetCompaniesParams, type ICompany as ICompanyFromService } from '@/services/companyService';
import { getFeaturedJobs, type IJob } from '@/services/jobService';
import { CompanyCard } from '@/component/company/CompanyCard';
import { JobCard } from '@/component/job/JobCard';
import { SearchBar } from '@/component/common/SearchBar';
import { Pagination } from '@/component/common/Pagination';
import { SectionTitle } from '@/component/common/SectionTitle';
import { RecommendedJobs } from '@/component/company/RecommendedJobs';
import { Alert } from '@/component/ui/Alert';
import { CompanyCategoryFilters } from '@/component/company/CompanyCategoryFilters';


interface CompaniesPageProps {
  searchParams: GetCompaniesParams;
}

export default async function CompaniesPage({ searchParams }: CompaniesPageProps) {
  let companyData: { companies: ICompanyFromService[]; totalCompanies: number; totalPages: number; currentPage: number } | null = null;
  let itJobs: IJob[] = [];
  let fetchError: string | null = null;

  try {
    const [companyResponse, itJobsResponse] = await Promise.all([
      getCompanies(searchParams),
      getFeaturedJobs({ category: 'it', limit: 4 }),
    ]);

    companyData = companyResponse;
    itJobs = itJobsResponse.data;
  } catch (error) {
    console.error('Failed to fetch data for companies page:', error);
    fetchError = 'Gagal memuat data. Silakan coba beberapa saat lagi.';
  }

  if (fetchError || !companyData) {
    return (
      <main className="container mx-auto px-4 py-12 flex justify-center">
        <Alert variant="destructive" title="Terjadi Kesalahan">
          {fetchError || 'Tidak dapat memuat data perusahaan.'}
        </Alert>
      </main>
    );
  }

  const { companies, totalCompanies, totalPages, currentPage } = companyData;

  // --- FIX: Transformasi data dari ICompanyFromService menjadi Company ---
  // Proses ini memastikan setiap objek yang dirender memiliki semua properti yang
  // dibutuhkan oleh komponen CompanyCard, dengan nilai default jika properti asli tidak ada.
  const companiesForDisplay: Company[] = companies.map((companyFromService) => {
    return {
      // Salin semua properti yang ada dari data layanan
      ...companyFromService,

      // Pastikan properti yang dibutuhkan oleh CompanyCard ada dan memiliki tipe yang benar
      id: companyFromService.id,
      name: companyFromService.name || 'Nama Perusahaan Tidak Tersedia',
      logoUrl: companyFromService.logoUrl || 'https://placehold.co/64x64/eee/ccc?text=Logo', // Fallback image
      location: companyFromService.location || 'Lokasi Tidak Diketahui',
      tagline: companyFromService.tagline || 'Tagline perusahaan tidak tersedia.',
      
      // Ini adalah properti kunci yang menyebabkan error. Pastikan selalu ada sebagai angka.
      activeJobsCount: companyFromService.activeJobsCount || 0,
    };
  });

  return (  
    <main className="bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Temukan Perusahaan Impian Anda</h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Jelajahi profil perusahaan-perusahaan inovatif dan temukan budaya kerja yang cocok untuk Anda.
          </p>
        </div>

        <SearchBar placeholder="Cari nama perusahaan..." basePath="/companies" />
        
        <div className="my-8">
            <CompanyCategoryFilters />
        </div>

        <section>
          {companiesForDisplay.length > 0 ? (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Menampilkan <span className="font-bold text-gray-800 dark:text-white">{companiesForDisplay.length}</span> dari{' '}
                <span className="font-bold text-gray-800 dark:text-white">{totalCompanies}</span> perusahaan.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Gunakan data yang sudah ditransformasi dan aman secara tipe */}
                {companiesForDisplay.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Perusahaan Tidak Ditemukan</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Coba gunakan kata kunci pencarian atau filter yang lain.</p>
            </div>
          )}
        </section>

        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination totalPages={totalPages} currentPage={currentPage} />
          </div>
        )}

        {itJobs.length > 0 && (
          <section className="mt-20">
            <SectionTitle title="Lowongan IT di Berbagai Perusahaan" subtitle="Peluang teratas di bidang teknologi menanti Anda." />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {itJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </section>
        )}

        <RecommendedJobs />
      </div>
    </main>
  );
}
