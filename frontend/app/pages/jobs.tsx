import Header from '../../component/common/Header';
import Footer from '../../component/common/Footer';
import JobCard from '../../component/JobCard';

const Jobs = () => {
  const jobs = [
    { title: "Software Engineer", company: "Tech Corp", description: "Develop cutting-edge software solutions." },
    { title: "Data Scientist", company: "DataX", description: "Analyze and interpret complex data." },
  ];

  return (
    <div>
      <Header />
      <main className="container mx-auto py-10">
        <h2 className="text-3xl font-semibold text-center">Job Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;
