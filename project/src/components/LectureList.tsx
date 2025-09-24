import React, { useEffect, useState } from "react";
import { FaTrash, FaPlay, FaFileDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

type Lecture = {
  id: number;
  title: string;
  instructor: string;
  subject: string;
  videoUrl: string;
};

const LectureList: React.FC = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    fetch("https://insight-hub-server-production.up.railway.app/api/lectures")
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        setLectures(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const deleteLecture = (id: number) => {
    fetch(`https://insight-hub-server-production.up.railway.app/api/lectures/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete lecture");
        setLectures((prevLectures) => prevLectures.filter((lecture) => lecture.id !== id));
      })
      .catch(() => setError("Failed to delete lecture"));
  };

  const uniqueSubjects = ["All", ...new Set(lectures.map((lecture) => lecture.subject))];

  const filteredLectures = lectures.filter(
    (lecture) =>
      lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedSubject === "All" || lecture.subject === selectedSubject)
  );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">UNIT-LIST</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          className="w-full md:w-2/3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full md:w-1/3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          {uniqueSubjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      {filteredLectures.length === 0 ? (
        <p className="text-gray-500 text-center">No lectures found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredLectures.map((lecture) => (
            <div key={lecture.id} className="p-6 border rounded-lg shadow-md bg-gray-100 relative">
              <h3 className="text-xl font-semibold text-gray-800">{lecture.title}</h3>
              <p className="text-sm text-gray-600">Instructor: {lecture.instructor}</p>
              <p className="text-sm text-gray-600">Subject: {lecture.subject}</p>

              <div className="flex justify-between mt-4">
                {/* Watch Button */}
                <a
                  href={lecture.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                >
                  <FaPlay /> Watch
                </a>

                {/* Navigate to Resources Page */}
                <button
                  onClick={() => navigate("/faculty-dashboard/add-resource")}
                  className="flex items-center gap-2 px-5 py-2 rounded-full shadow-md transition text-sm font-medium bg-yellow-500 text-black hover:bg-yellow-600"
                >
                  <FaFileDownload /> Resources
                </button>


                {/* Delete Button */}
                <button
                  onClick={() => deleteLecture(lecture.id)}
                  className="flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LectureList;
