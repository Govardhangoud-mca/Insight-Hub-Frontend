import React, { useEffect, useState } from "react";
import axios from "axios";

const ResourceList = () => {
  const [resources, setResources] = useState<{ id: number; name: string; url: string }[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  useEffect(() => {
    axios.get("https://insight-hub-server-production.up.railway.app/api/resource-files/all")
      .then(response => setResources(response.data))
      .catch(error => console.error("Error fetching resources:", error));
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Uploaded Resources</h2>
      <ul>
        {resources.map(resource => (
          <li key={resource.id} className="mb-2 flex justify-between">
            <span>{resource.name}</span>
            <div>
              <button 
                onClick={() => setSelectedPdf(resource.url)} 
                className="mr-2 bg-blue-500 text-white px-3 py-1 rounded">
                Preview
              </button>
              <a 
                href={resource.url} 
                download 
                className="bg-green-500 text-white px-3 py-1 rounded">
                Download
              </a>
            </div>
          </li>
        ))}
      </ul>
      {selectedPdf && (
        <div className="mt-5">
          <h3 className="text-lg font-semibold">PDF Preview</h3>
          <iframe src={selectedPdf} className="w-full h-96 border" />
        </div>
      )}
    </div>
  );
};

export default ResourceList;
