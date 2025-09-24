import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Department } from '../types';

interface AddSubjectModalProps {
  isOpen: boolean; 
  onClose: () => void;
  onSubjectAdded: () => void; // Callback to refresh subject list after adding
}

export const AddSubjectModal: React.FC<AddSubjectModalProps> = ({ isOpen, onClose, onSubjectAdded }) => {
  const [title, setTitle] = useState('');
  const [tutorName, setTutorName] = useState('');
  const [semester, setSemester] = useState<number>(1);
  const [department, setDepartment] = useState<Department>('MCA');
  const [payment, setPayment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const departments: Department[] = ['MCA', 'MBA', 'BTech', 'MTech'];
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  // API Call to Add Subject
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const newSubject = { title, tutorName, semester, department, payment };

    try {
      const response = await fetch('https://insight-hub-server-production.up.railway.app/api/faculty/subjects/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Ensures session-based authentication if needed
        body: JSON.stringify(newSubject),
      });

      if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`;

        try {
          const errorData = await response.json(); // Try parsing JSON
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          console.warn('Non-JSON error response:', await response.text()); // Log non-JSON responses
        }

        throw new Error(errorMessage);
      }

      console.log('Subject added successfully:', newSubject);

      // Reset Form
      setTitle('');
      setTutorName('');
      setSemester(1);
      setDepartment('MCA');
      setPayment('');

      // Notify Parent Component
      onSubjectAdded();

      // Close Modal
      onClose();
    } catch (err) {
      console.error('Error adding subject:', err);
      setError(err.message || 'Failed to add subject. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Subject</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Subject Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Enter subject title"
            />
          </div>

          {/* Tutor Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tutor Name</label>
            <input
              type="text"
              value={tutorName}
              onChange={(e) => setTutorName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Enter tutor name"
            />
          </div>

          {/* Department Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value as Department)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Semester Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
            <select
              value={semester}
              onChange={(e) => setSemester(Number(e.target.value))}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {semesters.map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Amount</label>
            <input
              type="number"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Enter payment amount"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Subject'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
