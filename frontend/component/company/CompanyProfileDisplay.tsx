// src/components/company/CompanyProfile.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

// Define types for the company and job details
interface Job {
  id: string;
  title: string;
}

interface Company {
  name: string;
  description: string;
  about: string;
  contact: string;
  jobs: Job[];
}

const CompanyProfile: React.FC = () => {
  const router = useRouter();
  const { companyId } = router.query; // Extract the company ID from the URL.
  const [company, setCompany] = useState<Company | null>(null); // Set state type as Company or null

  useEffect(() => {
    if (companyId) {
      // Fetch company details based on companyId
      axios
        .get(`/api/companies/${companyId}`)
        .then((response) => setCompany(response.data))
        .catch((error) => {
          console.error("Error fetching company details:", error);
        });
    }
  }, [companyId]);

  if (!company) {
    return <p>Loading company details...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold">{company.name}</h2>
      <p className="text-lg text-gray-700 mt-4">{company.description}</p>
      <h3 className="mt-6 text-xl font-semibold">About Us</h3>
      <p className="text-gray-600">{company.about}</p>

      <h3 className="mt-6 text-xl font-semibold">Contact Information</h3>
      <p className="text-gray-600">{company.contact}</p>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Jobs at {company.name}</h3>
        <ul>
          {company.jobs.map((job: Job) => ( // Use the Job type for the map
            <li key={job.id} className="mt-2 text-blue-500">
              <a href={`/jobs/${job.id}`} className="hover:text-blue-700">
                {job.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompanyProfile;
