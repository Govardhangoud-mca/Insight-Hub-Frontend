import React from 'react';
import { Department } from '../types';
import { Search } from 'lucide-react';

interface SearchFiltersProps {
  department: Department | '';
  semester: number | '';
  searchQuery: string;
  onDepartmentChange: (dept: Department | '') => void;
  onSemesterChange: (sem: number | '') => void;
  onSearchChange: (query: string) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  department,
  semester,
  searchQuery,
  onDepartmentChange,
  onSemesterChange,
  onSearchChange,
}) => {
  const departments: Department[] = ['MCA', 'MBA', 'BTech', 'MTech'];
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search subjects..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <select
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value as Department | '')}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Semester
          </label>
          <select
            value={semester}
            onChange={(e) => onSemesterChange(Number(e.target.value) || '')}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Semester</option>
            {semesters.map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};          