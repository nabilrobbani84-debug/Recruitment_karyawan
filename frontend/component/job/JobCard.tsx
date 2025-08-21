// src/components/job/JobCard.tsx

import React from 'react';
import Link from 'next/link';
// --- PERBAIKAN: Gunakan tipe IJob yang konsisten dari service ---
import type { IJob } from '@/services/jobService';
import { MapPin, Briefcase, Clock, Building } from 'lucide-react';

// Fungsi helper untuk format waktu yang lebih informatif
const timeAgo = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " tahun lalu";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " bulan lalu";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " hari lalu";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " jam lalu";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " menit lalu";
  return "Baru saja";
};

// --- PERBAIKAN: Pastikan prop `job` menggunakan tipe IJob ---
export const JobCard = ({ job }: { job: IJob }) => {
  return (
    <Link href={`/jobs/${job.id}`} className="block p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-600 hover:shadow-lg transition-all duration-300 ease-in-out">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <img
            className="w-16 h-16 bg-gray-100 rounded-md object-cover border"
            // --- PERBAIKAN: Akses properti logo dari `job.company.logoUrl` ---
            src={job.company?.logoUrl || `https://ui-avatars.com/api/?name=${job.company?.name?.charAt(0)}&background=f0f4ff&color=4f46e5`}
            alt={`${job.company?.name} logo`}
            width={64}
            height={64}
          />
        </div>
        <div className="flex-1">
          {/* --- PERBAIKAN: Akses nama perusahaan dari `job.company.name` --- */}
          <p className="text-sm font-semibold text-blue-600 flex items-center gap-1.5"><Building size={14} /> {job.company?.name || 'Perusahaan'}</p>
          <h3 className="text-lg font-bold text-gray-900 mt-1 hover:text-blue-700">{job.title}</h3>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
            {job.location && <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>}
            {job.type && <span className="flex items-center gap-1.5"><Briefcase size={14} /> {job.type}</span>}
            {job.postedAt && <span className="flex items-center gap-1.5"><Clock size={14} /> {timeAgo(job.postedAt)}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
};
