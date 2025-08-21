import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/component/ui/card";
import { Skeleton } from "@/component/ui/skeleton";

/**
 * Skeleton untuk satu kartu pekerjaan.
 * Meniru layout JobCard dengan akurasi tinggi menggunakan Card dan Skeleton.
 */
export const JobCardSkeleton = () => {
  return (
    <Card className="w-full overflow-hidden shadow-sm border dark:border-gray-700">
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

/**
 * Skeleton untuk sidebar filter pencarian.
 */
export const JobFilterSkeleton = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm animate-pulse border border-gray-200 dark:border-gray-700">
      <div className="space-y-8">
        {/* Filter Section 1 */}
        <div className="space-y-3">
          <Skeleton className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
          <Skeleton className="h-9 bg-gray-200 dark:bg-gray-600 rounded w-full" />
        </div>
        {/* Filter Section 2 */}
        <div className="space-y-3">
          <Skeleton className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
          <Skeleton className="h-9 bg-gray-200 dark:bg-gray-600 rounded w-full" />
        </div>
        {/* Filter Section 3 (Checkboxes) */}
        <div className="space-y-3">
          <Skeleton className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
          <div className="space-y-3">
            <Skeleton className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
            <Skeleton className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-full" />
          </div>
        </div>
        {/* Button */}
        <Skeleton className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full mt-4" />
      </div>
    </div>
  );
};

/**
 * Skeleton utama yang menggabungkan semua placeholder untuk halaman pencarian kerja.
 */
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
