import React from 'react';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { Department } from '../types';

interface SearchFiltersProps {
  department: Department | '';
  semester: number | '';
  searchQuery: string;
  onDepartmentChange: (value: Department | '') => void;
  onSemesterChange: (value: number | '') => void;
  onSearchChange: (value: string) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  department,
  semester,
  searchQuery,
  onDepartmentChange,
  onSemesterChange,
  onSearchChange,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-effect rounded-3xl p-6 shadow-2xl mb-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-6 h-6 text-blue-300" />
        <h2 className="text-2xl font-bold text-white">Filter Subjects</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search subjects..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
        </div>

        <select
          value={department}
          onChange={(e) => onDepartmentChange(e.target.value as Department | '')}
          className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all appearance-none cursor-pointer"
        >
          <option value="" className="bg-gray-800">All Departments</option>
          <option value="CSE" className="bg-gray-800">Computer Science</option>
          <option value="ECE" className="bg-gray-800">Electronics</option>
          <option value="ME" className="bg-gray-800">Mechanical</option>
          <option value="CE" className="bg-gray-800">Civil</option>
          <option value="EE" className="bg-gray-800">Electrical</option>
        </select>

        <select
          value={semester}
          onChange={(e) => onSemesterChange(e.target.value ? Number(e.target.value) : '')}
          className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all appearance-none cursor-pointer"
        >
          <option value="" className="bg-gray-800">All Semesters</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <option key={sem} value={sem} className="bg-gray-800">
              Semester {sem}
            </option>
          ))}
        </select>
      </div>
    </motion.div>
  );
};
