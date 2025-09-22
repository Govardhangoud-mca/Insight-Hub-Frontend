import React from 'react';

export default function Schedule() {
  const schedule = [
    { id: 1, subject: 'Mathematics', teacher: 'Dr. Robert Wilson', time: '09:00 AM', room: '101' },
    { id: 2, subject: 'Science', teacher: 'Prof. Mary Johnson', time: '10:30 AM', room: '203' },
    { id: 3, subject: 'English', teacher: 'Mrs. Elizabeth Brown', time: '12:00 PM', room: '105' },
    { id: 4, subject: 'History', teacher: 'Mr. David Clark', time: '02:00 PM', room: '302' },
    { id: 5, subject: 'Physics', teacher: 'Dr. Sarah Davis', time: '03:30 PM', room: '201' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Today's Schedule</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schedule.map((class_) => (
                <tr key={class_.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{class_.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{class_.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{class_.teacher}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{class_.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}