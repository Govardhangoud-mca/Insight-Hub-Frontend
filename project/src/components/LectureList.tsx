import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import { Play, FileDown, BookOpen } from "lucide-react";

type Lecture = {
  id: number;
  title: string;
  instructor: string;
  subject: string;
  unit: string;
  videoUrl: string;
};

const LectureList: React.FC = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedUnit, setSelectedUnit] = useState("All");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/lectures")
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        setLectures(Array.isArray(data) ? data : []);
        Swal.fire({
          title: "Lectures Loaded Successfully!",
          icon: "success",
          confirmButtonColor: "#4f46e5",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((error) => setError(error.message));
  }, []);

  const deleteLecture = (id: number) => {
    fetch(`http://localhost:8080/api/lectures/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete lecture");
        setLectures((prev) => prev.filter((lecture) => lecture.id !== id));
      })
      .catch(() => setError("Failed to delete lecture"));
  };

  const uniqueSubjects = ["All", ...new Set(lectures.map((lecture) => lecture.subject))];
  const unitOptions = ["All", ...Array.from({ length: 12 }, (_, i) => `Unit ${i + 1}`)];

  const filteredLectures = lectures.filter(
    (lecture) =>
      lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedSubject === "All" || lecture.subject === selectedSubject) &&
      (selectedUnit === "All" || lecture.unit === selectedUnit)
  );

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-900 text-white">
      {/* Header */}
      <motion.h2
        className="text-2xl md:text-3xl font-extrabold text-center mb-10 mt-16 tracking-wide"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        📘 Explore Your Lectures
      </motion.h2>

      {error && <p className="text-red-400 text-center mb-6">{error}</p>}

      {/* Search + Filters */}
      <motion.div
        data-aos="fade-up"
        className="max-w-5xl mx-auto mb-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-indigo-500/30 transition-all"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search lectures..."
              className="w-full pl-4 pr-4 py-3 rounded-xl text-black focus:ring-4 focus:ring-indigo-400 outline-none shadow-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative w-full md:w-1/3">
            <select
              className="w-full pl-4 pr-4 py-3 rounded-xl text-black focus:ring-4 focus:ring-indigo-400 outline-none shadow-md"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {uniqueSubjects.map((subject) => (
                <option key={subject}>{subject}</option>
              ))}
            </select>
          </div>

          <div className="relative w-full md:w-1/3">
            <select
              className="w-full pl-4 pr-4 py-3 rounded-xl text-black focus:ring-4 focus:ring-indigo-400 outline-none shadow-md"
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
            >
              {unitOptions.map((unit) => (
                <option key={unit}>{unit}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Lecture Cards */}
      {filteredLectures.length === 0 ? (
        <p className="text-center text-gray-300 text-lg" data-aos="fade-up">
          No lectures found. Try searching for another title.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLectures.map((lecture, index) => (
            <motion.div
              key={lecture.id}
              data-aos="zoom-in"
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-indigo-500/40 hover:scale-[1.02] transition duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-indigo-300 flex items-center gap-2">
                  <BookOpen className="w-6 h-6" /> {lecture.title}
                </h3>
                <span className="text-sm text-gray-300 bg-white/10 px-3 py-1 rounded-lg">
                  {lecture.unit}
                </span>
              </div>

              <p className="text-sm text-gray-300 mb-2">
                Instructor: <span className="text-white">{lecture.instructor}</span>
              </p>
              <p className="text-sm text-gray-300 mb-2">
                Subject: <span className="text-white">{lecture.subject}</span>
              </p>

              <div className="flex justify-between mt-6">
                <a
                  href={lecture.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 rounded-xl text-white shadow-md hover:shadow-indigo-400/40 hover:scale-105 transition-all"
                >
                  <Play className="w-4 h-4" /> Watch
                </a>

                <button
                  onClick={() => navigate("/faculty-dashboard/add-resource")}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 px-4 py-2 rounded-xl text-white shadow-md hover:scale-105 transition-all"
                >
                  <FileDown className="w-4 h-4" /> Resources
                </button>

                <button
                  onClick={() => deleteLecture(lecture.id)}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 rounded-xl text-white shadow-md hover:scale-105 transition-all"
                >
                  <FileDown className="w-4 h-4" /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LectureList;
