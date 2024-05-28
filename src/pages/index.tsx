import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';

/**
 * The homepage component.
 * @returns {JSX.Element} The rendered homepage component.
 */
const HomePage: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleRegister = () => router.push('/auth/registration');

  return (
    <div className="bg-[#181a20] text-[#EAECEF] min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <main className="max-w-screen-xl mx-auto px-4 py-10">
        <section aria-label="Introduction">
          <HeroSection />
        </section>
        <section aria-label="Features">
          <Features />
        </section>
        <section aria-label="Testimonials">
          <Testimonials />
        </section>
        <section aria-label="Call to Action">
          <CallToAction onRegister={handleRegister} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
