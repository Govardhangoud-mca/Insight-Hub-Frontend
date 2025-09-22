import React, { useEffect, useState } from "react";
import axios from "axios";
import { Download, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface ResourceFile {
  id: number;
  fileName: string;
  fileType: string;
}

const FileList: React.FC = () => {
  const [files, setFiles] = useState<ResourceFile[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8083/api/resource-files/all")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setFiles(response.data);
        } else {
          setMessage(response.data);
        }
      })
      .catch(() => {
        setMessage("Failed to fetch files.");
      });
  }, []);

  const handleDownload = async (id: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8083/api/resource-files/download/${id}`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", files.find((file) => file.id === id)?.fileName || "file");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      alert("Failed to download file.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    try {
      await axios.delete(`http://localhost:8083/api/resource-files/delete/${id}`);
      setFiles(files.filter((file) => file.id !== id));
      alert("File deleted successfully!");
    } catch {
      alert("Failed to delete file.");
    }
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-br from-white to-gray-100 shadow-2xl rounded-lg border border-gray-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📁 Resource Files</h2>
      {message ? (
        <p className="text-red-500 text-center text-lg">{message}</p>
      ) : files.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">No files available.</p>
      ) : (
        <div className="overflow-hidden rounded-lg shadow-md">
          <table className="w-full border-collapse bg-white text-left rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 border-b">
                <th className="p-5 text-gray-700 font-semibold text-lg">File Name</th>
                <th className="p-5 text-gray-700 font-semibold text-lg text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <motion.tr 
                  key={file.id} 
                  className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-all`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <td className="p-5 text-gray-800 text-lg font-medium">{file.fileName}</td>
                  <td className="p-5 text-right flex justify-end space-x-3">
                    <button
                      onClick={() => handleDownload(file.id)}
                      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full shadow-md transition-transform transform hover:scale-105"
                    >
                      <Download className="w-5 h-5" /> Download
                    </button>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full shadow-md transition-transform transform hover:scale-105"
                    >
                      <Trash2 className="w-5 h-5" /> Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default FileList;
