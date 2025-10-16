import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { AiOutlineDelete, AiOutlineLink } from "react-icons/ai";

interface Resource {
  id: number;
  title: string;
  resourceLink: string;
}

const ResourcesList: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  // Fetch resources from backend
  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/resources/all");
      if (response.ok) {
        const data = await response.json();
        setResources(data);
      } else {
        console.error("Failed to fetch resources.");
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This resource will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8b5cf6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: "#1f2937",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8080/api/resources/delete/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Resource deleted successfully.",
            background: "#1f2937",
            color: "#fff",
            confirmButtonColor: "#8b5cf6",
            timer: 2000,
          });
          setResources(resources.filter((r) => r.id !== id));
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: "Failed to delete resource.",
            background: "#1f2937",
            color: "#fff",
            confirmButtonColor: "#8b5cf6",
          });
        }
      } catch (error) {
        console.error("Error deleting resource:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something went wrong.",
          background: "#1f2937",
          color: "#fff",
          confirmButtonColor: "#8b5cf6",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 p-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-4xl"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold gradient-text drop-shadow-lg">
            Resources Dashboard
          </h1>
          <p className="text-gray-300 mt-2">
            Total Resources:{" "}
            <span className="text-blue-400 font-bold">{resources.length}</span>
          </p>
        </div>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-300 col-span-full"
            >
              No resources available.
            </motion.div>
          ) : (
            resources.map((resource) => (
              <motion.div
                key={resource.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="mb-3">
                  <h2 className="text-lg font-semibold text-white line-clamp-2">{resource.title}</h2>
                  <a
                    href={resource.resourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-1 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 shadow-md hover:shadow-indigo-400/50 transition-all duration-300"
                  >
                    <AiOutlineLink className="w-4 h-4 animate-pulse" /> View
                  </a>


                </div>
                <button
                  onClick={() => handleDelete(resource.id)}
                  className="self-start flex items-center gap-1 bg-red-500 px-3 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  <AiOutlineDelete /> Delete
                </button>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ResourcesList;
