import React, { Suspense, lazy } from 'react';
const Navbar = lazy(() => import('@/components/Navbar'));
const Sidebar = lazy(() => import('@/components/Sidebar'));
const Footer = lazy(() => import('@/components/Footer'));
const DashboardContent = lazy(() => import('@/components/DashboardContent'));

const DashboardPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-binance-black">
      <Suspense
        fallback={
          <div className="text-center text-white">
            Please wait, we are loading your dashboard...
          </div>
        }
      >
        <Navbar />
        <main className="flex flex-grow">
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
