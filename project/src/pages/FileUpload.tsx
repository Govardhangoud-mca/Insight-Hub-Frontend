// import React, { useState } from "react";
// import axios from "axios";

// const FileUpload = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [message, setMessage] = useState("");

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setFile(event.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setMessage("Please select a file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       await axios.post("http://localhost:8083/api/resources/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setMessage("File uploaded successfully!");
//     } catch (error) {
//       setMessage("Failed to upload file.");
//     }
//   };

//   return (
//     <div>
//       <h2>Upload a Resource</h2>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default FileUpload;
