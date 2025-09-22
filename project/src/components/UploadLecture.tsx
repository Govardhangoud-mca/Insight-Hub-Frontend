import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadLecture = () => {
  const [unit, setUnit] = useState("Unit 1");
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [subject, setSubject] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!unit || !title || !instructor || !subject || !videoUrl) {
      setError("All fields are required.");
      return;
    }

    const lectureData = { unit, title, instructor, subject, videoUrl };

    try {
      const response = await fetch("http://localhost:8083/api/lectures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lectureData),
      });

      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          responseData?.message || `Failed to upload lecture (Status: ${response.status})`
        );
      }

      setSuccess("Lecture uploaded successfully!");
      setTitle("");
      setInstructor("");
      setSubject("");
      setVideoUrl("");

      setTimeout(() => navigate("/faculty-dashboard/lecturelist"), 1500);
    } catch (err: any) {
      setError(err.message || "Failed to upload lecture");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">Upload New Lecture</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={`Unit ${i + 1}`}>{`Unit ${i + 1}`}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lecture Title</label>
            <input
              type="text"
              placeholder="Enter Lecture Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instructor Name</label>
            <input
              type="text"
              placeholder="Enter Instructor Name"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              placeholder="Enter Subject Name"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
            <input
              type="text"
              placeholder="Enter Video URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            Upload Lecture
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadLecture;
