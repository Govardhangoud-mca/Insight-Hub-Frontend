import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Department } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const newSubject = { title, tutorName, semester, department, payment };

    try {
      const response = await fetch('http://localhost:8080/api/faculty/subjects/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newSubject),
      });

      if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          console.warn('Non-JSON error response');
        }
        throw new Error(errorMessage);
      }

      Swal.fire({
        icon: 'success',
        title: 'Subject Added!',
        text: `${title} has been added successfully.`,
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#8b5cf6',
        timer: 2000,
      });

      // Reset form
      setTitle('');
      setTutorName('');
      setSemester(1);
      setDepartment('MCA');
      setPayment('');

      onSubjectAdded();
      onClose();
    } catch (err: any) {
      console.error('Error adding subject:', err);
      setError(err.message || 'Failed to add subject. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 rounded-2xl w-full max-w-md p-6 shadow-2xl border border-white/20"
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold text-white">Add New Subject</h2>
              <button onClick={onClose} className="text-gray-300 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Subject Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Subject Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Enter subject title"
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Tutor Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tutor Name</label>
                <input
                  type="text"
                  value={tutorName}
                  onChange={(e) => setTutorName(e.target.value)}
                  required
                  placeholder="Enter tutor name"
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value as Department)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Semester */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Semester</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {semesters.map((sem) => (
                    <option key={sem} value={sem}>
                      Semester {sem}
                    </option>
                  ))}
                </select>
              </div>

              {/* Payment */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Payment Amount</label>
                <input
                  type="number"
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                  required
                  placeholder="Enter payment amount"
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg"
                >
                  {loading ? 'Adding...' : 'Add Subject'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
