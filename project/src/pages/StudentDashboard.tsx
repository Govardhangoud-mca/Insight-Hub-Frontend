import React, { useEffect, useState } from "react";
import { Book, CreditCard, Sparkles, GraduationCap, Award, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import Swal from "sweetalert2";
import { Chip, Tooltip, CircularProgress } from "@mui/material";
import { Department, Subject } from "../types";
import { SearchFilters } from "../components/SearchFilters";

const StudentDashboard: React.FC = () => {
  const [department, setDepartment] = useState<Department | ''>('');
  const [semester, setSemester] = useState<number | ''>('');
  const [searchQuery, setSearchQuery] = useState("");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });

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
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/faculty/subjects/all");
      setSubjects(response.data);
      setFilteredSubjects(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching subjects:", err);
      setError("Failed to load subjects. Please try again.");

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to load subjects. Please try again!',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#8b5cf6',
      });
    } finally {
      setLoading(false);
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
          icon: 'success',
          title: 'Payment Successful!',
          html: `<p class="text-lg">Payment ID: <br/><code class="text-sm bg-gray-700 px-2 py-1 rounded">${response.razorpay_payment_id}</code></p>`,
          background: '#1f2937',
          color: '#fff',
          confirmButtonColor: '#10b981',
          showConfirmButton: true,
          timer: 5000,
        });
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9876543210"
      },
      theme: { color: "#8b5cf6" },
    };
    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  };

  const handleViewUnits = (subject: Subject) => {
    Swal.fire({
      title: 'Navigate to Units?',
      text: `View all units for ${subject.title}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#8b5cf6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, view units!',
      background: '#1f2937',
      color: '#fff',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/student-dashboard/lecturelist2");
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white custom-scrollbar overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        {/* Dashboard Heading */}
        <div className="text-center mt-16 mb-8" data-aos="fade-down"> {/* mt-16 pushes it below navbar */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <GraduationCap className="w-10 h-10 text-blue-400" />
            <h1 className="text-2xl md:text-4xl font-extrabold gradient-text drop-shadow-2xl">
              Student Dashboard
            </h1>
            <Sparkles className="w-10 h-10 text-pink-400 animate-pulse" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Explore courses, unlock knowledge, and accelerate your learning journey
          </motion.p>
        </div>


        <div data-aos="fade-up">
          <SearchFilters
            department={department}
            semester={semester}
            searchQuery={searchQuery}
            onDepartmentChange={setDepartment}
            onSemesterChange={setSemester}
            onSearchChange={setSearchQuery}
          />
        </div>

        <div className="mt-12">
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-500/20 border border-red-500 rounded-2xl p-4 mb-6 text-center"
            >
              <p className="text-red-200 text-lg">{error}</p>
            </motion.div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <CircularProgress size={60} style={{ color: '#8b5cf6' }} />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-xl text-gray-300"
              >
                Loading subjects...
              </motion.p>
            </div>
          ) : filteredSubjects.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              <AnimatePresence>
                {filteredSubjects.map((subject, index) => (
                  <motion.div
                    key={subject.id}
                    variants={cardVariants}
                    data-aos="zoom-in"
                    data-aos-delay={index * 100}
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      rotateX: 5,
                    }}
                    onHoverStart={() => setHoveredCard(subject.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-white/20 hover:border-blue-400/50 transition-all duration-500 group overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={false}
                      animate={hoveredCard === subject.id ? { scale: 1.1 } : { scale: 1 }}
                    />

                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-700" />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <Tooltip title="Subject Title" arrow>
                          <h2 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 line-clamp-2">
                            {subject.title}
                          </h2>
                        </Tooltip>
                        <Award className="w-6 h-6 text-yellow-400 animate-pulse" />
                      </div>

                      <div className="flex items-center gap-2 mb-4 text-gray-300">
                        <TrendingUp className="w-4 h-4" />
                        <p className="text-sm">
                          <span className="font-semibold text-blue-300">Tutor:</span> {subject.tutorName}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        <Chip
                          label={subject.department}
                          size="small"
                          className="shadow-glow"
                          sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                          }}
                        />
                        <Chip
                          label={`Semester ${subject.semester}`}
                          size="small"
                          className="shadow-glow-pink"
                          sx={{
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                          }}
                        />
                      </div>

                      <motion.div
                        className="flex flex-col gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.button
                          onClick={() => handleViewUnits(subject)}
                          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)" }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3 rounded-xl shadow-lg hover:shadow-blue-500/50 transition-all font-semibold group/btn"
                        >
                          <Book className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                          View Units
                        </motion.button>

                        <motion.button
                          onClick={() => handlePayment(subject)}
                          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(236, 72, 153, 0.5)" }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-5 py-3 rounded-xl shadow-lg hover:shadow-pink-500/50 transition-all font-semibold group/btn"
                        >
                          <CreditCard className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                          Pay ₹500
                        </motion.button>
                      </motion.div>
                    </div>

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <div className="inline-block p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl">
                <Book className="w-20 h-20 text-gray-400 mx-auto mb-4 animate-bounce" />
                <p className="text-white text-2xl font-semibold mb-2">No subjects found</p>
                <p className="text-gray-400 text-lg">Try adjusting your filters</p>
              </div>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-sm">
            Total Subjects: <span className="text-blue-400 font-bold text-lg">{filteredSubjects.length}</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StudentDashboard;
