import React from "react";
import { Link } from "react-router-dom";

const StudentSidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6">Student Portal</h2>
      <nav className="flex flex-col space-y-4">
        <Link to="/" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link to="/subjects" className="hover:bg-gray-700 p-2 rounded">Subjects</Link>
        <Link to="/videos" className="hover:bg-gray-700 p-2 rounded">Videos</Link>
        <Link to="/resources" className="hover:bg-gray-700 p-2 rounded">Resources</Link>
        <Link to="/profile" className="hover:bg-gray-700 p-2 rounded">Profile</Link>
      </nav>
    </div>
  );
};

export default StudentSidebar;
