// src/app/(dashboard-employer)/jobs/page.tsx
import Link from 'next/link';
import DashboardPageHeader from '@/component/common/DashboardPageHeader';
import Button from '@/component/common/Button';
import { Eye, Edit, Trash2, PlusCircle } from 'lucide-react';

// Data mock, ganti dengan data dari API Anda
const mockJobs = [
  { id: 'job-123', title: 'Senior Frontend Developer', location: 'Jakarta', applicants: 25, status: 'Aktif' },
  { id: 'job-124', title: 'UI/UX Designer', location: 'Remote', applicants: 42, status: 'Aktif' },
  { id: 'job-125', title: 'Backend Engineer (Golang)', location: 'Bandung', applicants: 18, status: 'Ditutup' },
  { id: 'job-126', title: 'Product Manager', location: 'Jakarta', applicants: 31, status: 'Draft' },
];

// Komponen Badge Status
const StatusBadge = ({ status }: { status: string }) => {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  const statusClasses = {
    Aktif: "bg-green-100 text-green-800",
    Ditutup: "bg-red-100 text-red-800",
    Draft: "bg-yellow-100 text-yellow-800",
  };
  const className = statusClasses[status as keyof typeof statusClasses] || "bg-gray-100 text-gray-800";
  return <span className={`${baseClasses} ${className}`}>{status}</span>;
};


export default function ManageJobsPage() {
  return (
    <div>
      <DashboardPageHeader
        title="Kelola Lowongan Pekerjaan"
        subtitle="Lihat, edit, dan kelola semua lowongan yang telah Anda posting."
        actions={
          <Link href="/post-job">
            <Button>
              <PlusCircle className="-ml-0.5 mr-1.5 h-5 w-5" />
              Posting Lowongan Baru
            </Button>
          </Link>
        }
      />
      
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Judul Lowongan</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total Pelamar</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Aksi</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {mockJobs.map((job) => (
                    <tr key={job.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="font-medium text-gray-900">{job.title}</div>
                        </div>
                        <div className="text-gray-500">{job.location}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-900">{job.applicants} pelamar</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <StatusBadge status={job.status} />
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex items-center justify-end space-x-4">
                          <Link href={`/jobs/${job.id}/applicants`} className="text-primary hover:text-primary-dark" title="Lihat Pelamar">
                            <Eye className="h-5 w-5" />
                          </Link>
                          <button type="button" className="text-indigo-600 hover:text-indigo-900" title="Edit Lowongan">
                            <Edit className="h-5 w-5" />
                          </button>
                          <button type="button" className="text-red-600 hover:text-red-900" title="Hapus Lowongan">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}