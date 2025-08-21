// This directive is required because we use hooks like useState and useEffect.
'use client'; 

import React, { useEffect, useState } from "react";
// We no longer need 'useRouter' for this task in the App Router.

// --- FIX 1: Define a TypeScript interface for our data ---
// This tells TypeScript exactly what a 'Company' object looks like.
interface Company {
  id: number;
  name: string;
  description: string;
  location: string;
  jobs: string[];
}

// Mock data (in a real app, this would come from an API call)
const companyData: Company[] = [
  { id: 1, name: "ABC Corp", description: "Leading tech company in Indonesia.", location: "Jakarta", jobs: ["Software Engineer", "UI/UX Designer"] },
  { id: 2, name: "XYZ Ltd", description: "Global provider of financial solutions.", location: "Surabaya", jobs: ["Financial Analyst", "Project Manager"] },
  { id: 3, name: "Telecom Innovations", description: "Telecommunication and tech solutions.", location: "Bandung", jobs: ["Network Engineer", "Data Scientist"] },
];

// --- FIX 2: Adapt the component for the App Router ---
// The page component receives 'params' as a prop, which contains the dynamic URL segments.
export default function CompanyProfilePage({ params }: { params: { id: string } }) {
  const { id: companyId } = params; // Get the ID from the params prop

  // --- FIX 3: Provide the correct type to useState ---
  // We tell useState that the 'company' state can be a 'Company' object or 'null'.
  const [company, setCompany] = useState<Company | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (companyId) {
      const idAsNumber = parseInt(companyId, 10);
      const selectedCompany = companyData.find((comp) => comp.id === idAsNumber);

      if (selectedCompany) {
        setCompany(selectedCompany);
        setError(null);
      } else {
        // Handle the case where the company is not found
        setError(`Company with ID "${companyId}" not found.`);
        setCompany(null);
      }
    }
  }, [companyId]); // Dependency array is correct

  // Conditional rendering based on state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 text-xl">Loading company data...</p>
      </div>
    );
  }

  // If we reach here, TypeScript knows 'company' is a valid Company object.
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{company.name}</h1>
        
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-bold text-gray-800">About Us</h2>
          <p className="mt-3 text-lg text-gray-600 leading-relaxed">{company.description}</p>
          <p className="mt-4 text-md text-gray-500">
            <strong>📍 Location:</strong> {company.location}
          </p>
          
          <h3 className="mt-8 text-2xl font-bold text-gray-800">Current Job Openings</h3>
          <ul className="mt-4 space-y-3">
            {/* --- FIX 4: Add explicit types to map parameters --- */}
            {company.jobs.map((job: string, index: number) => (
              <li 
                key={index} 
                className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition-colors duration-200 text-lg"
              >
                {job}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
