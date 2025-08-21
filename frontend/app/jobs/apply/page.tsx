'use client'; // Required for components using hooks like useState and events

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // CORRECTED: Use 'next/navigation' for App Router

const ApplyJobPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // FIX 1: Explicitly type the state to allow for 'File' or 'null'.
  const [cv, setCv] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Check if files exist and grab the first one
    if (e.target.files && e.target.files.length > 0) {
      setCv(e.target.files[0]);
    } else {
      setCv(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !cv) {
      setError('Please fill in all fields and upload your CV.');
      return;
    }

    setError(''); // Clear previous errors
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('cv', cv);

    try {
      // Replace with your actual API request
      // const response = await fetch('/api/apply', { method: 'POST', body: formData });
      // if (!response.ok) throw new Error('Server responded with an error');

      // Simulate successful submission
      console.log('Form submitted successfully with:', { name, email, cvName: cv.name });
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      router.push('/jobs/success'); // Redirect to a success page

    } catch (_error) { // FIX 2: Prefix unused variable with '_'
      // For developers: log the actual error for debugging
      console.error('Failed to submit application:', _error); 
      // For users: show a generic, friendly error message
      setError('Failed to submit application. Please try again later.');
    } finally {
      // IMPROVEMENT: Use 'finally' to ensure submission state is always reset
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Apply for This Job</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-6" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., Budi Santoso"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., budi.santoso@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="cv" className="block text-sm font-medium text-gray-700">Upload CV (PDF, DOC, DOCX)</label>
          <input
            type="file"
            id="cv"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 mt-1"
            accept=".pdf,.doc,.docx"
            required
          />
          {cv && <p className="text-sm text-gray-600 mt-2">File selected: {cv.name}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default ApplyJobPage;