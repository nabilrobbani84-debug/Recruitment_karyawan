import React from 'react';
import { School, Edit, Trash2 } from 'lucide-react';
import { Education } from '@/lib/types'; // Asumsi tipe data ada
import { Button } from '@/component/common/Button';

interface EducationCardProps {
  education: Education;
}

export const EducationCard: React.FC<EducationCardProps> = ({ education }) => {
  const { institution, degree, fieldOfStudy } = education;

  return (
    <div className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
       <div className="mt-1 flex-shrink-0">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <School className="h-6 w-6 text-gray-600" />
        </span>
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{institution}</h3>
              <p className="text-md text-gray-700">{degree}, {fieldOfStudy}</p>
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
      </div>
    </div>
  );
};