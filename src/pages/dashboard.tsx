import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import DashboardContent from '@/components/DashboardContent';

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <p>Redirecting...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-balance-black">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <main className="flex-grow flex">
        <aside>
          <Sidebar isSidebarOpen={isSidebarOpen} />
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
