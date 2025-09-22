import React from 'react';

export default function Courses() {
  const courses = [
    {
      id: 1,
      name: 'Advanced Mathematics',
      instructor: 'Dr. Robert Wilson',
      students: 25,
      progress: 75,
    },
    {
      id: 2,
      name: 'Physics Fundamentals',
      instructor: 'Dr. Sarah Davis',
      students: 30,
      progress: 60,
    },
    {
      id: 3,
      name: 'English Literature',
      instructor: 'Mrs. Elizabeth Brown',
      students: 28,
      progress: 80,
    },
    {
      id: 4,
      name: 'World History',
      instructor: 'Mr. David Clark',
      students: 22,
      progress: 45,
    },
    {
      id: 5,
      name: 'Chemistry Basics',
      instructor: 'Prof. Mary Johnson',
      students: 27,
      progress: 65,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
            <p className="text-gray-600 mb-4">Instructor: {course.instructor}</p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">{course.students} Students</span>
              <span className="text-sm font-medium">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="text-sm text-indigo-600 hover:text-indigo-900">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
