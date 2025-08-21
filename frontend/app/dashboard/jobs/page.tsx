// app/dashboard/jobs/page.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the Job interface with proper types
interface Job {
  id: number;
  title: string;
}

const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([]); // Use the Job type here

  useEffect(() => {
    axios.get('/api/jobs')  // Replace with your API URL
      .then((response) => setJobs(response.data))
      .catch((error) => console.error('Error fetching jobs:', error));
  }, []);

  return (
    <div>
      <h2>Available Jobs</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <a href={`/jobs/${job.id}`}>{job.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
