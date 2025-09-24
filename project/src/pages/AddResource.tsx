import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddResource: React.FC = () => {
  const [title, setTitle] = useState("");
  const [resourceLink, setResourceLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState("link");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (uploadType === "link") {
      const newResource = { title, resourceLink };
      try {
        const response = await fetch("https://insight-hub-server-production.up.railway.app/api/resources/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newResource),
        });
        if (response.ok) {
          alert("Resource link added successfully!");
          setTitle("");
          setResourceLink("");
          navigate("/faculty-dashboard/resources-list");
        } else {
          alert("Failed to add resource link.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong.");
      }
    } else {
      if (!file) {
        setMessage("Please select a file.");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      try {
        await axios.post("https://insight-hub-server-production.up.railway.app/api/resource-files/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("File uploaded successfully!");
        setFile(null);

        setTimeout(() => {
          navigate("/faculty-dashboard/filelist");
        }, 400);
      } catch (error) {
        setMessage("Failed to upload file.");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gradient-to-r from-indigo-700 to-pink-600 text-white shadow-2xl rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Add New Resource</h2>
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setUploadType("link")}
          className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${uploadType === "link" ? "bg-white text-indigo-700 shadow-lg" : "bg-indigo-400"}`}
        >
          Upload Link
        </button>
        <button
          onClick={() => setUploadType("file")}
          className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${uploadType === "file" ? "bg-white text-indigo-700 shadow-lg" : "bg-indigo-400"}`}
        >
          Upload File
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {uploadType === "link" ? (
          <>
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Resource Link</label>
              <input
                type="url"
                value={resourceLink}
                onChange={(e) => setResourceLink(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
                required
              />
            </div>
          </>
        ) : (
          <div>
            <label className="block text-sm font-medium">Upload File</label>
            <input type="file" onChange={handleFileChange} className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900" />
          </div>
        )}
        <button type="submit" className="w-full bg-white text-indigo-700 font-bold p-3 rounded-lg hover:bg-gray-200 transition-all">
          {uploadType === "link" ? "Add Resource" : "Upload File"}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-lg font-semibold text-yellow-300">{message}</p>}
    </div>
  );
};

export default AddResource;