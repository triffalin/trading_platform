import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import DashboardContent from '../components/DashboardContent';

const DashboardPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-binance-black">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow">
          <DashboardContent />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
