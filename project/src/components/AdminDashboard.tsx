import React from "react";
import { FaUsers, FaClipboardList, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link to="/admin/users" className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center hover:shadow-lg">
          <FaUsers className="text-blue-500 text-4xl mb-2" />
          <h3 className="text-lg font-semibold">Manage Users</h3>
        </Link>

        <Link to="/admin/events" className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center hover:shadow-lg">
          <FaClipboardList className="text-green-500 text-4xl mb-2" />
          <h3 className="text-lg font-semibold">Manage Events</h3>
        </Link>

        <Link to="/admin/settings" className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center hover:shadow-lg">
          <FaCog className="text-gray-500 text-4xl mb-2" />
          <h3 className="text-lg font-semibold">Settings</h3>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
