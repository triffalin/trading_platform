import React from 'react';

const Dashboard = () => {
  // Fetch user from local storage or context/state management if needed
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Display some information from the user data */}
      <p>Welcome, {user?.name}</p>
    </div>
  );
};

export default Dashboard;
