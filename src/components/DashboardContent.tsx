import React from 'react';

const DashboardContent = () => {
  return (
    <section className="dashboard-content p-4">
      <h1 className="text-lg font-bold text-white mb-4">Dashboard</h1>
      <div className="widgets grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="widget bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="font-semibold text-white">Trading Summary</h2>
          <p className="text-gray-300">Content detailing trading stats...</p>
        </div>
        <div className="widget bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="font-semibold text-white">Active Strategies</h2>
          <p className="text-gray-300">
            Content about current strategies in play...
          </p>
        </div>
        {/* Additional widgets */}
      </div>
    </section>
  );
};

export default DashboardContent;
