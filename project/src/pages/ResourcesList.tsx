import React, { useEffect, useState } from "react";

interface Resource {
  id: number;
  title: string;
  resourceLink: string;
}

const ResourcesList: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  // Fetch Resources from Backend
  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch("http://localhost:8083/api/resources/all");
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

  // Delete a Resource
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this resource?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8083/api/resources/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Resource deleted successfully!");
        setResources(resources.filter((resource) => resource.id !== id));
      } else {
        alert("Failed to delete resource.");
      }
    } catch (error) {
      console.error("Error deleting resource:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Resources List</h2>

      {resources.length === 0 ? (
        <p className="text-gray-500">No resources available.</p>
      ) : (
        <ul className="space-y-3">
          {resources.map((resource) => (
            <li key={resource.id} className="p-3 border rounded shadow-sm flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{resource.title}</h3>
                <a
                  href={resource.resourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Resource
                </a>
              </div>
              <button
                onClick={() => handleDelete(resource.id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResourcesList;
