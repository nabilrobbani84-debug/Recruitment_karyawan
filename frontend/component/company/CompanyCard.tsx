// src/components/company/CompanyCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import { Company } from '@/lib/types';
import { MapPin, Briefcase } from 'lucide-react';

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link href={`/companies/${company.id}`} className="block group">
      <div className="bg-white p-6 rounded-lg border border-gray-200 h-full flex flex-col shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300">
        <div className="flex items-center gap-4 mb-4">
          <Image
            src={company.logoUrl}
            alt={`${company.name} logo`}
            width={64}
            height={64}
            className="rounded-md border p-1 object-contain"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700">{company.name}</h3>
            <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
              <MapPin size={14} /> {company.location}
            </p>
          </div>
        </div>
        <p className="text-gray-600 text-sm flex-grow mb-4">{company.tagline}</p>
        <div className="mt-auto pt-4 border-t border-gray-100">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            <Briefcase size={14} className="mr-2" />
            {company.activeJobsCount} Lowongan Tersedia
          </span>
        </div>
      </div>
    </Link>
  );
} 