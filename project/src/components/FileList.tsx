import React, { useEffect, useState } from "react";
import axios from "axios";
import { Download, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

interface ResourceFile {
  id: number;
  fileName: string;
  fileType: string;
}

const FileList: React.FC = () => {
  const [files, setFiles] = useState<ResourceFile[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/resource-files/all");
      if (Array.isArray(response.data)) {
        setFiles(response.data);
      } else {
        setMessage(response.data);
      }
    } catch {
      setMessage("Failed to fetch files.");
    }
  };

  const handleDownload = async (id: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/resource-files/download/${id}`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        files.find((file) => file.id === id)?.fileName || "file"
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      Swal.fire({
        icon: 'success',
        title: 'Download Started!',
        text: `File ${files.find(f => f.id === id)?.fileName} is downloading.`,
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#10b981',
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Download Failed!',
        text: 'Unable to download the file.',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#ef4444',
      });
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8b5cf6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!',
      background: '#1f2937',
      color: '#fff',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/resource-files/delete/${id}`);
        setFiles(files.filter((file) => file.id !== id));
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'File has been deleted.',
          background: '#1f2937',
          color: '#fff',
          confirmButtonColor: '#10b981',
        });
      } catch {
        Swal.fire({
          icon: 'error',
          title: 'Failed!',
          text: 'Unable to delete the file.',
          background: '#1f2937',
          color: '#fff',
          confirmButtonColor: '#ef4444',
        });
      }
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center mb-8 gradient-text"
      >
        📁 Resource Files
      </motion.h2>

      {message && (
        <p className="text-center text-lg text-red-400 mb-6">{message}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {files.map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-2xl border border-white/20 hover:border-blue-400/50 transition-all group overflow-hidden"
            >
              <h3 className="text-lg font-bold mb-2 line-clamp-2">{file.fileName}</h3>
              <p className="text-sm text-gray-300 mb-4">{file.fileType || "Unknown Type"}</p>

              <div className="flex justify-between gap-2">
                <button
                  onClick={() => handleDownload(file.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md hover:scale-105 transition-transform"
                >
                  <Download className="w-4 h-4" /> Download
                </button>

                <button
                  onClick={() => handleDelete(file.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-gradient-to-r from-red-500 to-pink-600 rounded-lg shadow-md hover:scale-105 transition-transform"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>

              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl -z-10 group-hover:scale-125 transition-transform duration-700" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {files.length === 0 && !message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center text-gray-400 mt-12 text-lg"
        >
          No files available.
        </motion.p>
      )}
    </div>
  );
};

export default FileList;
