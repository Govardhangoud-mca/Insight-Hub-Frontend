import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import { BookOpen, Video, User } from "lucide-react";

const UploadLecture = () => {
  const [unit, setUnit] = useState("Unit 1");
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [subject, setSubject] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!unit || !title || !instructor || !subject || !videoUrl) {
      setError("All fields are required.");
      return;
    }

    const lectureData = { unit, title, instructor, subject, videoUrl };

    try {
      const response = await fetch("http://localhost:8080/api/lectures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lectureData),
      });

      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          responseData?.message || `Failed to upload lecture (Status: ${response.status})`
        );
      }

      setSuccess("Lecture uploaded successfully!");
      setTitle("");
      setInstructor("");
      setSubject("");
      setVideoUrl("");

      Swal.fire({
        title: "Lecture Uploaded!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        background: "#1e1b4b",
        color: "#fff",
      });

      setTimeout(() => navigate("/faculty-dashboard/lecturelist"), 1600);
    } catch (err: any) {
      setError(err.message || "Failed to upload lecture");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-900 p-6">
      <motion.div
        data-aos="fade-up"
        className="w-full max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-lg hover:shadow-indigo-500/40 transition-all"
      >
        <motion.h2
          className="text-2xl md:text-3xl font-extrabold text-center mb-10 mt-16 tracking-wide"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          📁 Upload Units
        </motion.h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        {success && <p className="text-green-400 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Unit */}
          <div>
            <label className="block text-sm font-medium text-indigo-200 mb-1">Select Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full p-3 bg-white/20 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 transition"
              required
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={`Unit ${i + 1}`}>{`Unit ${i + 1}`}</option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-indigo-200 mb-1">Lecture Title</label>
            <input
              type="text"
              placeholder="Enter Lecture Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-white/20 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </div>

          {/* Instructor */}
          <div>
            <label className="block text-sm font-medium text-indigo-200 mb-1">Instructor Name</label>
            <input
              type="text"
              placeholder="Enter Instructor Name"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              className="w-full p-3 bg-white/20 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-indigo-200 mb-1">Subject</label>
            <input
              type="text"
              placeholder="Enter Subject Name"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 bg-white/20 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-medium text-indigo-200 mb-1">Video URL</label>
            <input
              type="text"
              placeholder="Enter Video URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full p-3 bg-white/20 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:scale-105 transition-all"
          >
            Upload Lecture
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default UploadLecture;
