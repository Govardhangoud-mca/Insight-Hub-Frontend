import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import { BookOpen, FileDown, ExternalLink, Search, Filter } from "lucide-react";

interface Resource {
  id: number;
  title: string;
  resourceLink: string;
}

const ResourcesList2: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/resources/all");
      if (!response.ok) throw new Error("Failed to fetch resources.");
      const data = await response.json();
      setResources(data);
      Swal.fire({
        title: "Resources Loaded!",
        icon: "success",
        confirmButtonColor: "#4f46e5",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const filteredResources = resources.filter((res) =>
    res.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-900 text-white">
      {/* Header */}
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

      {/* Search Bar */}
      <motion.div
        data-aos="fade-up"
        className="max-w-4xl mx-auto mb-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 flex items-center gap-4 shadow-md"
      >
        <Search className="w-5 h-5 text-indigo-400" />
        <input
          type="text"
          placeholder="Search resources..."
          className="w-full bg-transparent outline-none text-white placeholder-gray-300 px-2 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>

      {/* Resource Cards */}
      {filteredResources.length === 0 ? (
        <p className="text-center text-gray-300 text-lg" data-aos="fade-up">
          No resources found.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((res, index) => (
            <motion.div
              key={res.id}
              data-aos="zoom-in"
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-indigo-500/40 hover:scale-[1.02] transition duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-indigo-300 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" /> {res.title}
                </h3>
              </div>

              <div className="flex justify-between mt-6">
                <a
                  href={res.resourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 rounded-xl text-white shadow-md hover:shadow-indigo-400/40 hover:scale-105 transition-all"
                >
                  <ExternalLink className="w-4 h-4" /> View
                </a>

                <button
                  onClick={() => navigate("/student-dashboard/filelist2")}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 px-4 py-2 rounded-xl text-white shadow-md hover:scale-105 transition-all"
                >
                  <FileDown className="w-4 h-4" /> Files
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourcesList2;
