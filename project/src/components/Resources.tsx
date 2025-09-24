import React, { useState, useEffect } from "react";

interface ResourceItem {
  id: number;
  title: string;
}

interface ResourceProps {
  unitId?: number;
}

const Resource: React.FC<ResourceProps> = ({ unitId }) => {
  const [resources, setResources] = useState<ResourceItem[]>([]);

  useEffect(() => {
    if (!unitId) {
      console.error("Resource Error: unitId is undefined!");
      return;
    }

    fetch(`https://insight-hub-server-production.up.railway.app/api/units/${unitId}/resources`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Resources:", data); // Debugging API response
        if (Array.isArray(data)) {
          setResources(data);
        } else {
          console.error("Unexpected API response:", data);
          setResources([]);
        }
      })
      .catch((error) => console.error("Error fetching resources:", error));
  }, [unitId]);

  return (
    <div>
      <h4 className="font-semibold">Resources:</h4>
      {resources.length > 0 ? (
        resources.map((resource) =>
          resource.title ? (
            <p key={resource.id} className="text-gray-700">{resource.title}</p>
          ) : (
            <p key={resource.id} className="text-red-500">Title not found</p>
          )
        )
      ) : (
        <p className="text-gray-500">No resources available.</p>
      )}
    </div>
  );
};

export default Resource;
