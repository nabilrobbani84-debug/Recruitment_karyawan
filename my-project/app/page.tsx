import React from 'react';
import Header from '../component/common/Header';  
import Footer from '../component/common/Footer'; 
import JobList from '../component/job/JobList';
import CompanyMessage from '../component/CompanyMessage';
import About from './about/page';
const Page = () => {
  return (
    <>
      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <main className="bg-gray-100 min-h-screen py-12 px-6">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Welcome to RecruitEasy</h1>

          <p className="text-lg text-center mb-12">
            Find the best job opportunities and start your career journey today!
          </p>

          {/* Job Listings */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Job Openings</h2>
            <JobList />
          </section>

          {/* Company Info/Spotlight */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Company Spotlight</h2>
            <CompanyMessage />
          </section>

        </div>
      </main>
      <About />
      {/* Footer Section */}
      <Footer />
    </>
  );
};

export default Page;
