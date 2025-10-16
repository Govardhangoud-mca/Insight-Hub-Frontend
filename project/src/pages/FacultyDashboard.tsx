import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Book, Trash2, CreditCard, Award, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import AOS from "aos";
import { Chip, Tooltip } from "@mui/material";
import axiosInstance from "../api/axiosInstance";
import { Department, Subject } from "../types";
import { SearchFilters } from "../components/SearchFilters";
import { AddSubjectModal } from "../components/AddSubjectModal"; // import modal

const FacultyDashboard: React.FC = () => {
  const [department, setDepartment] = useState<Department | "">("");
  const [semester, setSemester] = useState<number | "">("");
  const [searchQuery, setSearchQuery] = useState("");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-out-cubic" });

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    fetchSubjects();
  }, []);

  useEffect(() => {
    let filtered = subjects;
    if (department) filtered = filtered.filter((sub) => sub.department === department);
    if (semester) filtered = filtered.filter((sub) => sub.semester === semester);
    if (searchQuery)
      filtered = filtered.filter((sub) =>
        sub.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    setFilteredSubjects(filtered);
  }, [subjects, department, semester, searchQuery]);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/faculty/subjects/all", {
        withCredentials: true,
      });
      setSubjects(response.data);
      setFilteredSubjects(response.data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching subjects:", err);
      setError("Failed to load subjects. Please try again.");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to load subjects. Please try again!",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#8b5cf6",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/api/faculty/subjects/delete/${id}`, { withCredentials: true });
      setSubjects(subjects.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Error deleting subject:", err);
    }
  };

  const handlePayment = (subject: Subject) => {
    const options = {
      key: "rzp_test_xanrMICii3vWPe",
      amount: 50000,
      currency: "INR",
      name: "Insight Hub",
      description: `Payment for ${subject.title}`,
      image: "/vite.svg",
      handler: function (response: any) {
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          html: `<p class="text-lg">Payment ID: <br/><code class="text-sm bg-gray-700 px-2 py-1 rounded">${response.razorpay_payment_id}</code></p>`,
          background: "#1f2937",
          color: "#fff",
          confirmButtonColor: "#10b981",
          timer: 5000,
        });
      },
      prefill: { name: "John Doe", email: "john@example.com", contact: "9876543210" },
      theme: { color: "#8b5cf6" },
    };
    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  };

  const handleViewUnits = (subject: Subject) => {
    navigate("/faculty-dashboard/uploadlecture");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        {/* Centered Add Subject Button */}
        <div className="flex flex-col items-center justify-center mt-20 mb-12" data-aos="fade-up">
          {/* Title */}
          <motion.h1
            className="text-3xl md:text-4xl font-extrabold gradient-text drop-shadow-2xl mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Faculty Dashboard
          </motion.h1>

          {/* Button */}
          <motion.button
            onClick={() => setIsModalOpen(true)}
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 12px #34D399",
              boxShadow: "0 0 16px #34D399",
            }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Subject Here
          </motion.button>
        </div>

        {/* Filters */}
        <SearchFilters
          department={department}
          semester={semester}
          searchQuery={searchQuery}
          onDepartmentChange={setDepartment}
          onSemesterChange={setSemester}
          onSearchChange={setSearchQuery}
        />

        {/* Subjects Grid */}
        <div className="mt-8">
          {error && <div className="text-red-500 text-center mb-6">{error}</div>}

          {loading ? (
            <div className="text-center text-gray-300 py-20">Loading subjects...</div>
          ) : filteredSubjects.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              <AnimatePresence>
                {filteredSubjects.map((subject) => (
                  <motion.div
                    key={subject.id}
                    variants={cardVariants}
                    whileHover={{ scale: 1.05 }}
                    onHoverStart={() => setHoveredCard(subject.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-700" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <Tooltip title="Subject Title" arrow>
                          <h2 className="text-2xl font-bold text-white line-clamp-2">{subject.title}</h2>
                        </Tooltip>
                        <Award className="w-6 h-6 text-yellow-400 animate-pulse" />
                      </div>

                      <p className="text-gray-300 mb-2">
                        <span className="font-semibold text-blue-300">Tutor:</span> {subject.tutorName}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Chip
                          label={subject.department}
                          size="small"
                          sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', fontWeight: 'bold' }}
                        />
                        <Chip
                          label={`Semester ${subject.semester}`}
                          size="small"
                          sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white', fontWeight: 'bold' }}
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <button onClick={() => handleViewUnits(subject)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-blue-500/50 transition-all font-semibold">
                          <Book className="w-5 h-5" /> Units
                        </button>
                        <button onClick={() => handleDelete(subject.id)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-red-500/50 transition-all font-semibold">
                          <Trash2 className="w-5 h-5" /> Delete
                        </button>
                        <button onClick={() => handlePayment(subject)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-pink-500/50 transition-all font-semibold">
                          <CreditCard className="w-5 h-5" /> Pay ₹500
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-white text-2xl">No subjects found</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Add Subject Modal */}
      <AddSubjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubjectAdded={fetchSubjects}
      />
    </div>
  );
};

export default FacultyDashboard;
