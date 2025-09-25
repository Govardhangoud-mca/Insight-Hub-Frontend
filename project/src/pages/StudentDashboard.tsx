import React, { useEffect, useState } from "react";
import { Book, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Department, Subject } from "../types";
import { SearchFilters } from "../components/SearchFilters";
import axiosInstance from "../api/axiosInstance";

const StudentDashboard: React.FC = () => {
  const [department, setDepartment] = useState<Department | ''>('');
  const [semester, setSemester] = useState<number | ''>('');
  const [searchQuery, setSearchQuery] = useState("");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    let filtered = subjects;
    if (department) filtered = filtered.filter(sub => sub.department === department);
    if (semester) filtered = filtered.filter(sub => sub.semester === semester);
    if (searchQuery) filtered = filtered.filter(sub =>
      sub.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSubjects(filtered);
  }, [department, semester, searchQuery, subjects]);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("https://insight-hub-server-production.up.railway.app/api/faculty/subjects/all");
      setSubjects(response.data);
      setFilteredSubjects(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching subjects:", err);
      setError("Failed to load subjects. Please try again.");
    }
  };

  const handlePayment = () => {
    const options = {
      key: "rzp_test_xanrMICii3vWPe",
      amount: 50000,
      currency: "INR",
      name: "Insight Hub",
      description: "Payment for Subject",
      image: "/vite.svg",
      handler: function (response: any) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: { name: "John Doe", email: "john@example.com", contact: "9876543210" },
      theme: { color: "#7e3af2" },
    };
    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center drop-shadow-lg">
        Student Dashboard
      </h1>

      <SearchFilters
        department={department}
        semester={semester}
        searchQuery={searchQuery}
        onDepartmentChange={setDepartment}
        onSemesterChange={setSemester}
        onSearchChange={setSearchQuery}
      />

      <div className="mt-8">
        {error && <p className="text-red-200 text-center mb-4">{error}</p>}

        {filteredSubjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredSubjects.map(subject => (
              <motion.div
                key={subject.id}
                className="bg-white text-gray-900 p-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <h2 className="text-2xl font-bold mb-3 text-gray-900">{subject.title}</h2>
                <p className="text-gray-700 mb-2"><span className="font-semibold">Tutor:</span> {subject.tutorName}</p>
                
                {/* Department & Semester clearly visible with contrast */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-indigo-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                    {subject.department}
                  </span>
                  <span className="bg-purple-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                    Semester {subject.semester}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <button
                    onClick={() => navigate("/student-dashboard/lecturelist2")}
                    className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-700 transition font-semibold"
                  >
                    <Book className="w-5 h-5" /> Units
                  </button>

                  <button
                    onClick={handlePayment}
                    className="flex items-center justify-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-pink-700 transition font-semibold"
                  >
                    <CreditCard className="w-5 h-5" /> Pay
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-white text-center text-lg mt-10">No subjects found.</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
