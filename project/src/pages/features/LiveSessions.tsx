import React, { useState } from 'react';
import { Users, Calendar, Clock, Video, Code, Database, Cpu } from 'lucide-react';

type Session = {
  title: string;
  description: string;
  instructor: string;
  date: string;
  time: string;
  capacity: number;
  enrolled: number;
};

type Subject = {
  subject: string;
  sessions: Session[];
};

const LiveSessions = () => {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Demo sessions data
  const upcomingSessions: Subject[] = [
    {
      subject: "Mathematics",
      sessions: [
        {
          title: "Advanced Calculus - Integration Techniques",
          instructor: "Dr. Sarah Johnson",
          date: "2024-03-20",
          time: "10:00 AM - 11:30 AM",
          capacity: 50,
          enrolled: 35,
          description: "Live session covering advanced integration techniques and their applications."
        },
        {
          title: "Linear Algebra Problem Solving",
          instructor: "Dr. Sarah Johnson",
          date: "2024-03-22",
          time: "2:00 PM - 3:30 PM",
          capacity: 50,
          enrolled: 28,
          description: "Interactive problem-solving session focusing on linear algebra concepts."
        }
      ]
    },
    {
      subject: "Programming Languages",
      sessions: [
        {
          title: "Python for Data Science",
          instructor: "Dr. Emily Carter",
          date: "2024-03-21",
          time: "1:00 PM - 2:30 PM",
          capacity: 40,
          enrolled: 30,
          description: "Learn how to use Python for data analysis and visualization."
        },
        {
          title: "JavaScript: From Beginner to Advanced",
          instructor: "Mr. John Doe",
          date: "2024-03-23",
          time: "3:00 PM - 4:30 PM",
          capacity: 60,
          enrolled: 45,
          description: "Master JavaScript and build interactive web applications."
        },
        {
          title: "Java Programming: Core Concepts",
          instructor: "Ms. Anna Smith",
          date: "2024-03-25",
          time: "11:00 AM - 12:30 PM",
          capacity: 50,
          enrolled: 20,
          description: "Understand the core concepts of Java programming."
        },
        {
          title: "C++ for Game Development",
          instructor: "Mr. Robert Brown",
          date: "2024-03-27",
          time: "4:00 PM - 5:30 PM",
          capacity: 30,
          enrolled: 15,
          description: "Explore C++ for developing high-performance games."
        }
      ]
    },
    {
      subject: "Web Development",
      sessions: [
        {
          title: "React.js: Building Modern Web Applications",
          instructor: "Ms. Laura Wilson",
          date: "2024-03-24",
          time: "9:00 AM - 10:30 AM",
          capacity: 50,
          enrolled: 40,
          description: "Learn to build modern web applications using React.js."
        },
        {
          title: "Node.js: Backend Development",
          instructor: "Mr. Michael Green",
          date: "2024-03-26",
          time: "2:00 PM - 3:30 PM",
          capacity: 50,
          enrolled: 25,
          description: "Understand backend development with Node.js."
        }
      ]
    }
  ];

  const handleJoinSession = (session: Session) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSession(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Live Sessions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our interactive live sessions with expert faculty members. 
            Get your doubts cleared and engage in real-time discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
            <Video className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
            <h3 className="font-semibold">HD Streaming</h3>
            <p className="text-sm text-gray-600">High-quality live video</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
            <Users className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
            <h3 className="font-semibold">Interactive</h3>
            <p className="text-sm text-gray-600">Real-time Q&A</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
            <Calendar className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
            <h3 className="font-semibold">Flexible Schedule</h3>
            <p className="text-sm text-gray-600">Multiple time slots</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
            <Clock className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
            <h3 className="font-semibold">Recording Available</h3>
            <p className="text-sm text-gray-600">Watch later if missed</p>
          </div>
        </div>

        <div className="space-y-8">
          {upcomingSessions.map((subject, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-indigo-600 text-white px-6 py-4">
                <h2 className="text-xl font-semibold">{subject.subject}</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {subject.sessions.map((session, sessionIndex) => (
                    <div key={sessionIndex} className="border-b pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{session.title}</h3>
                          <p className="text-gray-600 mb-3">{session.description}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              <span>Instructor: {session.instructor}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>Date: {session.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Time: {session.time}</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              <span>Capacity: {session.enrolled}/{session.capacity}</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleJoinSession(session)}
                          className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-200 transition-colors"
                        >
                          Join Session
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Join Session: {selectedSession.title}</h2>
            <p className="text-gray-600 mb-4">{selectedSession.description}</p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>Instructor: {selectedSession.instructor}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Date: {selectedSession.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Time: {selectedSession.time}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>Capacity: {selectedSession.enrolled}/{selectedSession.capacity}</span>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button 
                onClick={closeModal}
                className="bg-gray-100 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert(`You have joined the session: ${selectedSession.title}`);
                  closeModal();
                }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Confirm Join
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveSessions;