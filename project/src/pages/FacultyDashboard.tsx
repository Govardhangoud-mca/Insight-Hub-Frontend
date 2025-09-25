import React, { useState, useEffect } from "react";
import { PlusCircle, Edit, Trash2, Book, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Department, Subject } from "../types";
import { SearchFilters } from "../components/SearchFilters";
import { AddSubjectModal } from "../components/AddSubjectModal";
import axiosInstance from "../api/axiosInstance";

const FacultyDashboard: React.FC = () => {
  const [department, setDepartment] = useState<Department | "">("");
  const [semester, setSemester] = useState<number | "">("");
  const [searchQuery, setSearchQuery] = useState("");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Fetch subjects on mount
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axiosInstance.get("/api/faculty/subjects/all", {
        withCredentials: true, // ✅ ensures session cookie is sent
      });

      if (response.data && Array.isArray(response.data)) {
        setSubjects(response.data);
      } else {
        setSubjects([]);
        console.warn("Warning: Response is not an array:", response.data);
      }

      setError(null);
    } catch (err: any) {
      console.error("Error fetching subjects:", err);
      setError(
        err.response?.data?.message || "Failed to load subjects. Please try again."
      );
    }
  };

  const handleSubjectAdded = () => {
    fetchSubjects();
    setIsSubjectModalOpen(false);
  };

  const handleEdit = (subject: Subject) => {
    setSelectedSubject(subject);
    setIsSubjectModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/api/faculty/subjects/delete/${id}`, {
        withCredentials: true,
      });
      setSubjects(subjects.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Error deleting subject:", err);
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
      handler: (response: any) => {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: { name: "John Doe", email: "john@example.com", contact: "9876543210" },
      theme: { color: "#6B46C1" },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <main className="container mx-auto px-3 py-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-3xl font-bold text-center text-indigo-600 mb-6"
        >
          WELCOME TO THE FACULTY DASHBOARD
        </motion.h1>

        {/* Search & Filters */}
        <SearchFilters
          department={department}
          semester={semester}
          searchQuery={searchQuery}
          onDepartmentChange={setDepartment}
          onSemesterChange={setSemester}
          onSearchChange={setSearchQuery}
        />

        {/* Subjects Section */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Subjects</h2>
            <button
              onClick={() => setIsSubjectModalOpen(true)}
              className="flex items-center px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <PlusCircle className="w-4 h-4 mr-1" /> Add Subject
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.length > 0 ? (
              subjects.map((subject) => (
                <motion.div
                  key={subject.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition-all"
                >
                  <h2 className="text-lg font-semibold text-gray-800">{subject.title}</h2>
                  <p className="text-gray-600 text-sm">
                    <strong>Tutor:</strong> {subject.tutorName}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <strong>Department:</strong> {subject.department}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <strong>Semester:</strong> {subject.semester}
                  </p>

                  <div className="mt-4 flex justify-between gap-2">
                    <button
                      className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-xs rounded-lg transition"
                      onClick={() => navigate("/faculty-dashboard/uploadlecture")}
                    >
                      <Book className="w-3 h-3 mr-1" /> Units
                    </button>
                    <button
                      className="flex items-center bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-xs rounded-lg transition"
                      onClick={() => handleEdit(subject)}
                    >
                      <Edit className="w-3 h-3 mr-1" /> Edit
                    </button>
                    <button
                      className="flex items-center bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs rounded-lg transition"
                      onClick={() => handleDelete(subject.id)}
                    >
                      <Trash2 className="w-3 h-3 mr-1" /> Delete
                    </button>
                    <button
                      className="flex items-center bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 text-xs rounded-lg transition"
                      onClick={handlePayment}
                    >
                      <CreditCard className="w-3 h-3 mr-1" /> Pay
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600 text-center col-span-3">
                No subjects found.
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Add Subject Modal */}
      <AddSubjectModal
        isOpen={isSubjectModalOpen}
        onClose={() => setIsSubjectModalOpen(false)}
        onSubjectAdded={handleSubjectAdded}
        subject={selectedSubject} // pass selected for edit
      />
    </div>
  );
};

export default FacultyDashboard;
