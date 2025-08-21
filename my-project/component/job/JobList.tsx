// src/components/job/JobList.tsx

import React from 'react';
import type { IJob } from '@/services/jobService';

// --- PERBAIKAN: Impor komponen dengan path dan nama yang benar ---
import { JobCard } from '@/component/job/JobCard';
import { Alert, AlertTitle, AlertDescription } from '@/component/ui/Alert';

interface JobListProps {
  // Prop jobs wajib ada, karena penanganan null/error dilakukan di komponen induk (page.tsx)
  jobs: IJob[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => { 
  // Kondisi jika array `jobs` kosong setelah fetch data berhasil
  if (!jobs || jobs.length === 0) {
    return (
      // --- PERBAIKAN: Menggunakan komponen Alert yang komposabel ---
      <Alert variant="info">
        <AlertTitle>Tidak Ada Lowongan Ditemukan</AlertTitle>
        <AlertDescription>
          Coba ubah filter pencarian Anda atau periksa kembali nanti.
        </AlertDescription>
      </Alert>
    );
  }

  // Merender daftar pekerjaan jika data tersedia
  return (
    <div className="space-y-4">
      {jobs.map(job => (
        // Komponen JobCard kini menerima prop `job` dengan tipe IJob yang benar
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;

