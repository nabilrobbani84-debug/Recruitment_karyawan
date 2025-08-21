// Lokasi: src/app/jobs/[id]/page.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
// [FIX] Impor tetap sama, karena kita akan menggunakan semua ikonnya
import { MapPin, Briefcase, Building, CheckCircle, ArrowLeft, Bookmark } from 'lucide-react';

import { Button } from '@/component/ui/Button'; 
import { getJobDetails, getAllJobIds, type IJobDetail } from '@/services/jobService';

interface JobDetailPageProps {
  params: {
    id: string; 
  };
}

export async function generateStaticParams() {
  const jobs = await getAllJobIds();
  return jobs;
}

export async function generateMetadata({ params }: JobDetailPageProps) {
  const job = await getJobDetails(params.id);
  if (!job) {
    return { title: 'Lowongan Tidak Ditemukan' };
  }
  return {
    title: `${job.title} di ${job.company.name}`,
    description: job.description.substring(0, 160),
  };
}

export default async function JobDetailsPage({ params }: JobDetailPageProps) {
  const { id } = params;
  
  // [FIX] Memberikan tipe data eksplisit pada variabel 'job'.
  // Ini akan menghilangkan error 'IJobDetail' is defined but never used.
  const job: IJobDetail | null = await getJobDetails(id);

  if (!job) {
    notFound();
  }

  return (
    <main className="bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-12">
        <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 mb-8">
            <ArrowLeft size={16} />
            Kembali ke Semua Lowongan
        </Link>
        
        <div className="grid grid-cols-12 gap-x-8">
            {/* Kolom Kiri: Detail Pekerjaan */}
            <div className="col-span-12 lg:col-span-8">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-start gap-6 mb-8">
                        <Image
                            src={job.company.logoUrl}
                            alt={`${job.company.name} logo`}
                            width={80}
                            height={80}
                            className="rounded-lg border p-1"
                        />
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{job.title}</h1>
                            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-slate-600 dark:text-slate-400">
                                <span className="flex items-center gap-2"><Building size={16} /> {job.company.name}</span>
                                <span className="flex items-center gap-2"><MapPin size={16} /> {job.location}</span>
                                {/* [FIX] Menggunakan ikon <Briefcase /> yang sebelumnya tidak terpakai */}
                                <span className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                                  <Briefcase size={14} /> {job.type}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="prose prose-slate max-w-none dark:prose-invert">
                        <h2 className="font-bold border-b pb-2 mb-4">Deskripsi Pekerjaan</h2>
                        <p>{job.description}</p>
                        
                        <h2 className="font-bold border-b pb-2 mt-6 mb-4">Tanggung Jawab Utama</h2>
                        <ul className="space-y-2">
                            {job.responsibilities.map((item, index) => (
                              // [FIX] Menggunakan ikon <CheckCircle /> untuk setiap list item
                              <li key={index} className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span>{item}</span>
                              </li>
                            ))}
                        </ul>

                        <h2 className="font-bold border-b pb-2 mt-6 mb-4">Kualifikasi</h2>
                        <ul className="space-y-2">
                            {job.qualifications.map((item, index) => (
                              // [FIX] Menggunakan ikon <CheckCircle /> untuk setiap list item
                              <li key={index} className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span>{item}</span>
                              </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            
            {/* Kolom Kanan: Aksi */}
            <div className="col-span-12 lg:col-span-4 mt-8 lg:mt-0">
                <div className="sticky top-24 space-y-4">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                        <Button size="lg" className="w-full font-bold">Lamar Sekarang</Button>
                        <Button size="lg" variant="outline" className="w-full mt-3">
                            <Bookmark size={16} className="mr-2"/> Simpan Lowongan
                        </Button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}