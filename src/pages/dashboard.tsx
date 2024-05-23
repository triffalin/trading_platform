import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import DashboardContent from '@/components/DashboardContent';

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    console.log('Dashboard Session:', session);
    console.log('Dashboard Status:', status);
  }, [session, status]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <p>Redirecting...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-balance-black">
      <Navbar />
      <main className="flex-grow flex">
        <aside>
          <Sidebar />
        </aside>
        <section className="flex-grow">
          <DashboardContent />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
