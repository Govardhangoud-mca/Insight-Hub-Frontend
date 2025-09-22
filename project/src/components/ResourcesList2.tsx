import React, { useEffect, useState } from "react";

interface Resource {
  id: number;
  title: string;
  resourceLink: string;
}

const ResourcesList2: React.FC = () => {
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

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">📘 Resources List</h2>

      {resources.length === 0 ? (
        <p className="text-gray-500">No resources available.</p>
      ) : (
        <ul className="space-y-3">
          {resources.map((resource) => (
            <li
              key={resource.id}
              className="p-3 border rounded shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold">{resource.title}</h3>
              </div>
              <a
                href={resource.resourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-all duration-200"
              >
                View
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResourcesList2;
