'use client';

import React from 'react';
import { useJobStore } from '@/store/jobStore';
import { InputField } from '@/component/common/InputField';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

// --- FIX: Define the props the component accepts ---
interface JobFilterProps {
  initialFilters: {
    keyword?: string;
    location?: string;
    type?: string;
  };
}

// --- FIX: Use the defined props ---
const JobFilter = ({ initialFilters }: JobFilterProps) => {
  const { filters, setFilters } = useJobStore();

  // Local state for inputs, initialized from props passed by the server
  const [keyword, setKeyword] = React.useState(initialFilters.keyword || '');
  const [location, setLocation] = React.useState(initialFilters.location || '');

  const debouncedKeyword = useDebounce(keyword, 500);
  const debouncedLocation = useDebounce(location, 500);

  React.useEffect(() => {
    setFilters({ keyword: debouncedKeyword });
  }, [debouncedKeyword, setFilters]);

  React.useEffect(() => {
    setFilters({ location: debouncedLocation });
  }, [debouncedLocation, setFilters]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    // Handle the "All" case by setting the filter to undefined
    setFilters({ type: value === 'All' ? undefined : value });
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 sticky top-24">
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
              // Use the initial prop for the first render, then the global store state
              value={filters.type || initialFilters.type || 'All'}
              onChange={handleTypeChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="All">All</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilter;