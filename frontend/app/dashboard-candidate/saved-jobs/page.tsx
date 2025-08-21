import React from 'react';
import { jobService } from '@/services/jobService';
import { JobCard } from '@/component/job/JobCard'; // Menggunakan kembali JobCard
import { BookmarkX } from 'lucide-react';
import Link from 'next/link';

export default async function SavedJobsPage() {
  const savedJobs = await jobService.getSavedJobs();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Pekerjaan Tersimpan</h1>
        <p className="mt-1 text-gray-600">Pekerjaan yang Anda simpan akan muncul di sini.</p>
      </header>

      {savedJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map((job) => (
            // Kita bisa menambahkan prop khusus untuk menandakan ini dari halaman tersimpan
            <JobCard key={job.id} job={job} isSavedView={true} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 text-center py-16">
            <div className="inline-block bg-gray-100 p-4 rounded-full">
                <BookmarkX size={40} className="text-gray-400" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Tidak Ada Pekerjaan Tersimpan</h3>
            <p className="mt-1 text-gray-500">Simpan pekerjaan yang menarik minat Anda untuk dilihat kembali nanti.</p>
            <Link href="/jobs" className="mt-6 inline-block bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors">
              Mulai Cari Pekerjaan
            </Link>
        </div>
      )}
    </div>
  );
}