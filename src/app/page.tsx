import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const HomePage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main className="main-content">
        <section className="hero">{/* Hero section content */}</section>
        <section className="benefits">{/* Benefits section content */}</section>
        {/* Other sections */}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
