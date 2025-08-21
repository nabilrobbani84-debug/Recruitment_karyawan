import React from 'react';
import Link from 'next/link';
// Gunakan tipe IJob yang sama dari service
import type { IJob } from '@/services/jobService'; 
import { MapPin, Briefcase, Clock } from 'lucide-react';

// Fungsi helper untuk format waktu
const timeAgo = (dateString: string) => {
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


// Pastikan prop `job` menggunakan tipe IJob
export const JobCard = ({ job }: { job: IJob }) => {
  return (
    <Link href={`/jobs/${job.id}`} className="block p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-500 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img
            className="w-16 h-16 bg-gray-100 rounded-md object-cover"
            src={job.company.logoUrl || `https://ui-avatars.com/api/?name=${job.company.name.charAt(0)}&background=random`}
            alt={`${job.company.name} logo`}
          />
        </div>
        <div className="flex-1">
          <p className="text-sm text-blue-600 font-semibold">{job.company.name}</p>
          <h3 className="text-lg font-bold text-gray-900 mt-1">{job.title}</h3>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
            <span className="flex items-center"><MapPin className="w-4 h-4 mr-1.5" /> {job.location}</span>
            <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1.5" /> {job.type}</span>
            <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5" /> {timeAgo(job.postedAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};