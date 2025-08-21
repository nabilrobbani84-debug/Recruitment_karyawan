/*
 * =================================================================
 * File: my-project/component/job/JobFilter.tsx
 * Deskripsi: Komponen filter pencarian pekerjaan dengan default export.
 * =================================================================
 */
'use client';

import React from 'react';
import { useJobStore } from '@/store/jobStore';
import { InputField } from '@/component/common/InputField';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { Button } from '@/component/common/Button';

const JobFilter = () => {
  const { filters, setFilters, fetchJobs } = useJobStore();
  
  const [keyword, setKeyword] = React.useState(filters.keyword);
  const [location, setLocation] = React.useState(filters.location);
  const debouncedKeyword = useDebounce(keyword, 500);
  const debouncedLocation = useDebounce(location, 500);

  React.useEffect(() => {
    setFilters({ keyword: debouncedKeyword, location: debouncedLocation });
  }, [debouncedKeyword, debouncedLocation, setFilters]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ type: e.target.value });
  };
  
  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  }

  return (
    <form onSubmit={handleFilterSubmit} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 sticky top-24">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Filter Lowongan</h3>
      <div className="space-y-6">
        <InputField
          label="Kata Kunci"
          name="keyword"
          Icon={Search}
          placeholder="Jabatan atau perusahaan"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <InputField
          label="Lokasi"
          name="location"
          Icon={MapPin}
          placeholder="Kota atau remote"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <div>
          <label htmlFor="job-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tipe Pekerjaan
          </label>
          <div className="relative">
            <Briefcase className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              id="job-type"
              name="type"
              value={filters.type}
              onChange={handleTypeChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="All">Semua Tipe</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Kontrak</option>
              <option value="Internship">Magang</option>
            </select>
          </div>
        </div>
        <Button type="submit" className="w-full">
            Terapkan Filter
        </Button>
      </div>
    </form>
  );
};

export default JobFilter;


/*
 * =================================================================
 * File: my-project/component/common/SectionTitle.tsx
 * Deskripsi: Komponen untuk menampilkan judul section.
 * =================================================================
 */
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionTitle = ({ title, subtitle, align = 'center', className }: SectionTitleProps) => {
  const textAlignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  const marginAutoClass = align === 'center' ? 'mx-auto' : '';

  return (
    <div className={cn(textAlignClass[align], className)}>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-400", marginAutoClass)}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

/*
 * =================================================================
 * File: my-project/component/job/JobsPageSkeleton.tsx
 * Deskripsi: Kumpulan semua komponen skeleton untuk halaman pekerjaan.
 * =================================================================
 */
import { Card, CardContent, CardHeader, CardFooter } from "@/component/ui/card";
import { Skeleton } from "@/component/ui/skeleton";

export const JobCardSkeleton = () => {
  return (
    <Card className="w-full overflow-hidden shadow-none border">
      <CardHeader>
        <div className="flex items-start space-x-4">
          <Skeleton className="h-16 w-16 rounded-lg flex-shrink-0" />
          <div className="flex-grow space-y-2 pt-1">
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex items-center space-x-2 pt-2">
          <Skeleton className="h-7 w-24 rounded-full" />
          <Skeleton className="h-7 w-28 rounded-full" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 py-3 px-6">
        <div className="flex items-center space-x-4">
           <Skeleton className="h-5 w-28" />
           <Skeleton className="h-5 w-32" />
        </div>
        <Skeleton className="h-5 w-24" />
      </CardFooter>
    </Card>
  );
};

export const JobFilterSkeleton = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm animate-pulse border border-gray-200 dark:border-gray-700">
      <div className="space-y-8">
        <div className="space-y-3">
          <Skeleton className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
          <Skeleton className="h-9 bg-gray-200 dark:bg-gray-600 rounded w-full" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
          <Skeleton className="h-9 bg-gray-200 dark:bg-gray-600 rounded w-full" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
          <div className="space-y-3">
            <Skeleton className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
            <Skeleton className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-full" />
          </div>
        </div>
        <Skeleton className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full mt-4" />
      </div>
    </div>
  );
};

export const JobsPageSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <aside className="md:col-span-1">
        <JobFilterSkeleton />
      </aside>
      <main className="md:col-span-3">
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => <JobCardSkeleton key={i} />)}
        </div>
      </main>
    </div>
  );
};
