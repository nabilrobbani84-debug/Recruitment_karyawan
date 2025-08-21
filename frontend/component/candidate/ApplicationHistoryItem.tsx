import React from 'react';
import { Application } from '@/lib/types';
import Link from 'next/link';
import { cva } from 'class-variance-authority';

// --- Tipe & Varian Status ---
type Status = 'Pending' | 'Reviewed' | 'Interview' | 'Offered' | 'Rejected';
const statusBadge = cva('inline-block px-3 py-1 text-xs font-semibold rounded-full', {
    variants: {
        status: {
            Pending: 'bg-yellow-100 text-yellow-800',
            Reviewed: 'bg-blue-100 text-blue-800',
            Interview: 'bg-purple-100 text-purple-800',
            Offered: 'bg-green-100 text-green-800',
            Rejected: 'bg-red-100 text-red-800',
        },
    },
});

interface ApplicationHistoryItemProps {
  application: Application;
}

export const ApplicationHistoryItem: React.FC<ApplicationHistoryItemProps> = ({ application }) => {
  const { jobTitle, companyName, appliedAt, status, jobId } = application;
  const appliedDate = new Date(appliedAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="py-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      <div className="md:col-span-1">
        <Link href={`/jobs/${jobId}`} className="hover:underline">
          <h4 className="font-semibold text-gray-900">{jobTitle}</h4>
        </Link>
        <p className="text-sm text-gray-600">{companyName}</p>
      </div>
      <div className="md:col-span-1">
        <p className="text-sm text-gray-500">Tanggal Melamar: {appliedDate}</p>
      </div>
      <div className="md:col-span-1 md:text-right">
        <span className={statusBadge({ status: status as Status })}>{status}</span>
      </div>
    </div>
  );
};