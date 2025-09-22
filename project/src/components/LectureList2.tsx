import React, { useEffect, useState } from "react";
import { FaPlay, FaFileDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LectureList2 = () => {
  const [lectures, setLectures] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedUnit, setSelectedUnit] = useState("All");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8083/api/lectures")
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

  const uniqueSubjects = ["All", ...new Set(lectures.map((lecture) => lecture.subject))];
  const unitOptions = ["All", ...Array.from({ length: 12 }, (_, i) => `Unit ${i + 1}`)];

  const filteredLectures = lectures.filter(
    (lecture) =>
      lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedSubject === "All" || lecture.subject === selectedSubject) &&
      (selectedUnit === "All" || lecture.unit === selectedUnit)
  );

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl rounded-lg mt-10 text-white">
      <h2 className="text-4xl font-extrabold mb-6 text-center">UNIT LIST</h2>

      {error && <p className="text-red-300 text-center">{error}</p>}

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          className="w-full md:w-1/3 p-3 border border-white rounded-lg focus:ring-2 focus:ring-yellow-400 text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full md:w-1/3 p-3 border border-white rounded-lg focus:ring-2 focus:ring-yellow-400 text-black"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          {uniqueSubjects.map((subject) => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
        <select
          className="w-full md:w-1/3 p-3 border border-white rounded-lg focus:ring-2 focus:ring-yellow-400 text-black"
          value={selectedUnit}
          onChange={(e) => setSelectedUnit(e.target.value)}
        >
          {unitOptions.map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
      </div>

      {filteredLectures.length === 0 ? (
        <p className="text-gray-200 text-center">No lectures found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredLectures.map((lecture) => (
            <div key={lecture.id} className="p-6 border border-white rounded-lg shadow-md bg-white text-black relative transition transform hover:scale-105">
              <h3 className="text-2xl font-bold text-gray-800">{lecture.title}</h3>
              <p className="text-md text-gray-600">Instructor: {lecture.instructor}</p>
              <p className="text-md text-gray-600">Subject: {lecture.subject}</p>
              <p className="text-md text-gray-600">Unit: {lecture.unit}</p>

              <div className="flex justify-between mt-4">
                <a
                  href={lecture.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                  <FaPlay /> Watch
                </a>

                <button
                  onClick={() => navigate("/student-dashboard/filelist2")}
                  className="flex items-center gap-2 px-5 py-2 rounded-full shadow-md transition text-sm font-medium bg-green-500 text-black hover:bg-yellow-600"
                >
                  <FaFileDownload /> Resources-Files
                </button>

                <button
                  onClick={() => navigate("/student-dashboard/resourcelist2")}
                  className="flex items-center gap-2 px-5 py-2 rounded-full shadow-md transition text-sm font-medium bg-yellow-500 text-black hover:bg-yellow-600"
                >
                  <FaFileDownload /> Resources-Links
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LectureList2;
