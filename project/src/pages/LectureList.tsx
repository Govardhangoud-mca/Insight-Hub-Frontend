import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type Lecture = {
  id: number;
  title: string;
  videoUrl: string;
  resourcesUrl: string;
};

const LectureList: React.FC = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [searchParams] = useSearchParams();
  const subject = searchParams.get("subject") || "";
  const unit = searchParams.get("unit") || "";

  useEffect(() => {
    fetch(`http://localhost:8083/api/lectures?subject=${subject}&unit=${unit}`)
      .then((res) => res.json())
      .then((data) => setLectures(data))
      .catch((err) => console.error("Error fetching lectures:", err));
  }, [subject, unit]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Lecture List - {subject} ({unit})</h2>
      {lectures.length === 0 ? (
        <p className="text-gray-500 text-center">No lectures found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {lectures.map((lecture) => (
            <div key={lecture.id} className="p-6 border rounded-lg shadow-md bg-gray-100">
              <h3 className="text-xl font-semibold text-gray-800">{lecture.title}</h3>
              <div className="flex justify-between mt-4">
                <a
                  href={lecture.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Watch Video
                </a>
                <a
                  href={lecture.resourcesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  View Resources
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LectureList;
