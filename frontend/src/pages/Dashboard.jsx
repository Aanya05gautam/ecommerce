
import React from 'react';

const Dashboard = ({ user }) => {
  let storedUser = user;
  if (!storedUser) {
    try {
      const saved = localStorage.getItem('user');
      if (saved) {
        storedUser = JSON.parse(saved);
      }
    } catch (e) {
      console.error("Error parsing user data in Dashboard", e);
      localStorage.removeItem("user");
    }
  }

  if (!storedUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Please log in to view your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">My Dashboard</h1>
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {storedUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{storedUser.name}</h2>
            <p className="text-gray-600">{storedUser.email}</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Account Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium">{new Date(storedUser.createdAt || Date.now()).toLocaleDateString()}</p>
             </div>
             <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium text-green-700">Active</p>
             </div>
             {/* Add more stats here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
