import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Suspense, lazy } from 'react';

// Lazy load components
const Navbar = lazy(() => import('@/components/Navbar'));
const Sidebar = lazy(() => import('@/components/Sidebar'));
const Footer = lazy(() => import('@/components/Footer'));
const DashboardContent = lazy(() => import('@/components/DashboardContent'));

/**
 * The dashboard page component.
 * @returns {JSX.Element} The rendered dashboard page component.
 */
const DashboardPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div className="text-center text-white">Loading session...</div>;
  }

  if (status === 'authenticated' && session) {
    console.log('Session:', session);
  }

  return (
    <div className="flex flex-col min-h-screen bg-balance-black">
      <Suspense
        fallback={
          <div className="text-center text-white">
            Please wait, we are loading your dashboard...
          </div>
        }
      >
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
      </Suspense>
    </div>
  );
};

export default DashboardPage;
