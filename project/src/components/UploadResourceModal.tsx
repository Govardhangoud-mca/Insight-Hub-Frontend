import React, { useState } from "react";

interface UploadResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

const UploadResourceModal: React.FC<UploadResourceModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!file || !title) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Upload Resource</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Upload File</label>
            <input
              type="file"
              className="mt-1 p-2 w-full border rounded"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" className="px-4 py-2 bg-gray-400 text-white rounded" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadResourceModal;


