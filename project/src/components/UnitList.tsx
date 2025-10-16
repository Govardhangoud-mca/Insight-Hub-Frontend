import React, { useState, useEffect } from "react";
import VideoList from "./VideoList";
import Resource from "./Resources";

interface Unit {
  id: number;
  title: string;
}

interface UnitListProps {
  subjectId: number;
}

const UnitList: React.FC<UnitListProps> = ({ subjectId }) => {
  const [units, setUnits] = useState<Unit[]>([]);

  useEffect(() => {
    if (!subjectId) return; // Prevent API call if subjectId is undefined

    fetch(`http://localhost:8080/${subjectId}/units`)
      .then((response) => response.json())
      .then((data) => setUnits(data))
      .catch((error) => console.error("Error fetching units:", error));
  }, [subjectId]);

  return (
    <div className="mt-4">
      <h4 className="font-semibold">Units:</h4>
      {units.length > 0 ? (
        units.map((unit) => (
          <div key={unit.id} className="ml-4 border-l-2 pl-2 mt-2">
            <p className="text-gray-700">{unit.title}</p>
            {unit.id ? (
              <>
                <VideoList unitId={unit.id} />
                <Resource unitId={unit.id} />
              </>
            ) : (
              <p className="text-red-500">Error: unitId is undefined</p>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No units available.</p>
      )}
    </div>
  );
};

export default UnitList;
