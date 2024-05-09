import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';

export default function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleRegister = () => router.push('/auth/registration');

  return (
    <div className="bg-[#181a20] text-[#EAECEF] min-h-screen">
      <Navbar />
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
}
