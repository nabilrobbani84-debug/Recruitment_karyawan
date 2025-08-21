import React from 'react';
import { Briefcase, Calendar, Edit, Trash2 } from 'lucide-react';
import { Experience } from '@/lib/types'; // Asumsi tipe data ada
import { Button } from '@/component/common/Button';

interface ExperienceCardProps {
  experience: Experience;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  const { role, company, startDate, endDate, description } = experience;

  // Fungsi untuk format tanggal (bisa dipindahkan ke utils)
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <div className="mt-1 flex-shrink-0">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <Briefcase className="h-6 w-6 text-gray-600" />
        </span>
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{role}</h3>
              <p className="text-md text-gray-700">{company}</p>
              <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                <Calendar size={14} />
                {formatDate(startDate)} - {endDate ? formatDate(endDate) : 'Saat ini'}
              </p>
            </div>
            <div className="flex gap-2">
                <Button variant="ghost" size="sm" aria-label="Edit">
                    <Edit size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" aria-label="Hapus">
                    <Trash2 size={16} />
                </Button>
            </div>
        </div>
        <p className="mt-3 text-gray-600 whitespace-pre-line">{description}</p>
      </div>
    </div>
  );
};