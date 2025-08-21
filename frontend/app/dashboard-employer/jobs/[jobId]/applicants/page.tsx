// src/app/(dashboard-employer)/jobs/[jobId]/applicants/page.tsx
import DashboardPageHeader from '@/component/common/DashboardPageHeader';
import Image from 'next/image';
import { Mail, Phone, Download, CheckCircle, XCircle } from 'lucide-react';
import Button from '@/component/common/Button';

// Data mock, ganti dengan data dari API
const mockJobTitle = "Senior Frontend Developer";
const mockApplicants = [
  { id: 'cand-001', name: 'Budi Santoso', avatar: '/images/avatar-1.jpg', appliedDate: '10 Juni 2025', skills: ['React', 'TypeScript', 'Next.js'], status: 'Direview' },
  { id: 'cand-002', name: 'Citra Lestari', avatar: '/images/avatar-2.jpg', appliedDate: '11 Juni 2025', skills: ['Figma', 'UI Design', 'Prototyping'], status: 'Wawancara' },
  { id: 'cand-003', name: 'Agung Wijaya', avatar: '/images/avatar-3.jpg', appliedDate: '12 Juni 2025', skills: ['Node.js', 'PostgreSQL', 'AWS'], status: 'Ditolak' },
];

const ApplicantCard = ({ applicant }: { applicant: typeof mockApplicants[0] }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl hover:scale-105">
    <div className="p-5">
      <div className="flex items-center space-x-4">
        <Image src={applicant.avatar} alt={applicant.name} width={64} height={64} className="rounded-full" />
        <div>
          <h3 className="text-lg font-bold text-gray-900">{applicant.name}</h3>
          <p className="text-sm text-gray-500">Melamar pada {applicant.appliedDate}</p>
          <p className="text-sm font-medium text-blue-600">Status: {applicant.status}</p>
        </div>
      </div>
      <div className="mt-4 border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-gray-500">Keahlian Utama</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {applicant.skills.map(skill => (
            <span key={skill} className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">{skill}</span>
          ))}
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 bg-gray-50">
      <Button variant="ghost" className="rounded-none border-r border-gray-200">
        <Download className="mr-2 h-4 w-4" /> Unduh CV
      </Button>
      <Button variant="ghost" className="rounded-none">
        Lihat Profil
      </Button>
    </div>
    {/* Aksi Tambahan */}
    <div className="p-2 flex justify-center space-x-2 border-t border-gray-200">
        <Button size="sm" variant="secondary" className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="destructive">
            <XCircle className="h-4 w-4" />
        </Button>
    </div>
  </div>
);


export default function ApplicantsPage({ params }: { params: { jobId: string } }) {
  return (
    <div>
      <DashboardPageHeader
        title={`Pelamar untuk: ${mockJobTitle}`}
        subtitle={`Total ${mockApplicants.length} kandidat telah melamar untuk posisi ini.`}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockApplicants.map(applicant => (
          <ApplicantCard key={applicant.id} applicant={applicant} />
        ))}
      </div>
    </div>
  );
}