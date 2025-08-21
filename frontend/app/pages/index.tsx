import Header from '../component/Header';
import Footer from '../component/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto py-10">
        <h1 className="text-4xl font-bold text-center">Find Your Dream Job</h1>
        <p className="mt-4 text-lg text-center">Browse through thousands of job opportunities and apply now!</p>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

