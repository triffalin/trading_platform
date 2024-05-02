import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import DashboardContent from '../components/DashboardContent';

const DashboardPage = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar />
        <div className="content-area">
          <DashboardContent />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
