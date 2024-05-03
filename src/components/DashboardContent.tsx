import React from 'react';

const DashboardContent = () => {
  return (
    <section className="dashboard-content">
      <h1 className="text-lg font-bold text-white mb-4">Dashboard</h1>
      <div className="widgets">
        <div className="widget">
          <h2 className="font-semibold text-white">Trading Summary</h2>
          <p className="text-gray-300">Content detailing trading stats...</p>
        </div>
        <div className="widget">
          <h2 className="font-semibold text-white">Active Strategies</h2>
          <p className="text-gray-300">
            Content about current strategies in play...
          </p>
        </div>
        {/* Additional widgets can be added here */}
      </div>
    </section>
  );
};

export default DashboardContent;
