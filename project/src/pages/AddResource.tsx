import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { UploadCloud, Link2 } from "lucide-react";
import Swal from "sweetalert2";

interface AddResourceProps {
  subjectTitle?: string;
}

const AddResource: React.FC<AddResourceProps> = ({ subjectTitle }) => {
  const [title, setTitle] = useState("");
  const [resourceLink, setResourceLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState<"link" | "file">("link");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setFile(event.target.files[0]);
  };

  const handleSuccessPopup = (msg: string) => {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: msg,
      background: "#1f2937",
      color: "#fff",
      confirmButtonColor: "#8b5cf6",
      timer: 2500,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (uploadType === "link") {
      if (!title || !resourceLink) {
        setMessage("Please fill in all fields!");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:8080/api/resources/add",
          { title, resourceLink },
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.status === 200) {
          handleSuccessPopup("Resource link added successfully!");
          setTitle("");
          setResourceLink("");
          setTimeout(() => navigate("/faculty-dashboard/resources-list"), 400);
        }
      } catch (error) {
        console.error(error);
        setMessage("Failed to add resource link.");
      }
    } else {
      if (!file) {
        setMessage("Please select a file.");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);

      try {
        await axios.post("http://localhost:8080/api/resource-files/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        handleSuccessPopup("File uploaded successfully!");
        setFile(null);
        setTimeout(() => navigate("/faculty-dashboard/filelist"), 400);
      } catch (error) {
        console.error(error);
        setMessage("Failed to upload file.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 p-4 relative overflow-hidden">
      {/* Floating blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-purple-500/40 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-60px] right-[-60px] w-64 h-64 bg-pink-500/30 rounded-full blur-2xl animate-blob animation-delay-4000"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl text-white z-10"
      >
        {/* Welcome Header */}
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-center gradient-text mb-6"
        >
          Welcome to {subjectTitle || "Subject"} Resources
        </motion.h2>

        {/* Upload Type Selector */}
        <div className="flex justify-center gap-4 mb-6">
          <motion.button
            onClick={() => setUploadType("link")}
            whileHover={{ scale: 1.05 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
              uploadType === "link"
                ? "bg-white text-indigo-700 shadow-md"
                : "bg-indigo-500/50 hover:bg-indigo-600"
            }`}
          >
            <Link2 className="w-4 h-4" /> Link
          </motion.button>

          <motion.button
            onClick={() => setUploadType("file")}
            whileHover={{ scale: 1.05 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
              uploadType === "file"
                ? "bg-white text-indigo-700 shadow-md"
                : "bg-indigo-500/50 hover:bg-indigo-600"
            }`}
          >
            <UploadCloud className="w-4 h-4" /> File
          </motion.button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {uploadType === "link" ? (
            <>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Resource Link</label>
                <input
                  type="url"
                  value={resourceLink}
                  onChange={(e) => setResourceLink(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Upload File</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(255,255,255,0.3)" }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold p-3 rounded-xl shadow-md text-lg"
          >
            {uploadType === "link" ? "Add Resource" : "Upload File"}
          </motion.button>
        </form>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-yellow-300 font-semibold"
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default AddResource;
