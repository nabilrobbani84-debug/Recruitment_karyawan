import React from 'react';
import Image from 'next/image'; // Impor ini sekarang digunakan
import { Job } from '@/lib/types';
import { Button } from '@/component/common/Button';
import { Briefcase, MapPin, Building, CheckSquare } from 'lucide-react';

interface JobDetailDisplayProps {
  job: Job;
  onApplyClick: () => void;
}

// Gunakan named export agar konsisten
export const JobDetailDisplay: React.FC<JobDetailDisplayProps> = ({ job, onApplyClick }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Header dengan Logo */}
      <div className="p-6 md:p-8 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start gap-6">
          {/* PERBAIKAN: Logo Perusahaan ditambahkan di sini */}
          <div className="flex-shrink-0 hidden sm:block">
            <Image
              src={job.companyLogo || 'https://placehold.co/80x80/e2e8f0/64748b?text=Logo'}
              alt={`Logo ${job.companyName}`}
              width={80}
              height={80}
              className="rounded-lg border border-gray-200"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/80x80/e2e8f0/64748b?text=Logo'; }}
            />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 mb-2">
                  {job.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{job.title}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1.5"><Building size={16} /> {job.companyName}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={16} /> {job.location}</span>
                    <span className="flex items-center gap-1.5"><Briefcase size={16} /> {job.type}</span>
                </div>
              </div>
              <div className="flex-shrink-0 w-full sm:w-auto mt-4 sm:mt-0">
                <Button size="lg" onClick={onApplyClick} className="w-full sm:w-auto">Lamar Sekarang</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Konten Deskripsi & Kualifikasi */}
      <div className="p-6 md:p-8 prose prose-blue dark:prose-invert max-w-none">
        <section>
          <h2 className="text-xl font-semibold mb-3">Deskripsi Pekerjaan</h2>
          <p>{job.description}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Kualifikasi</h2>
          <ul className="space-y-2 pl-0">
            {job.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-3 !pl-0">
                <CheckSquare size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

// Default export untuk fleksibilitas
export default JobDetailDisplay;
