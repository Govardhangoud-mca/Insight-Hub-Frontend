import React, { useState } from 'react';
import { FileText, Download, BookOpen, Search } from 'lucide-react';
import { motion } from 'framer-motion';


const StudyMaterials = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const materials = [
    {
      subject: "Mathematics",
      resources: [
        {
          title: "Calculus Complete Notes",
          type: "PDF",
          size: "15 MB",
          pages: 150,
          author: "Dr. Sarah Johnson",
          lastUpdated: "2024-03-10",
          downloadUrl: "https://www.example.com/download/calculus-notes.pdf"
        },
        {
          title: "Linear Algebra Practice Problems",
          type: "PDF",
          size: "8 MB",
          pages: 75,
          author: "Dr. Sarah Johnson",
          lastUpdated: "2024-03-08",
          downloadUrl: "https://www.example.com/download/linear-algebra-problems.pdf"
        }
      ]
    },
    {
      subject: "Physics",
      resources: [
        {
          title: "Quantum Mechanics Handbook",
          type: "PDF",
          size: "20 MB",
          pages: 200,
          author: "Prof. Michael Chen",
          lastUpdated: "2024-03-12",
          downloadUrl: "https://www.example.com/download/quantum-mechanics-handbook.pdf"
        },
        {
          title: "Electromagnetics Solved Examples",
          type: "PDF",
          size: "12 MB",
          pages: 100,
          author: "Prof. Michael Chen",
          lastUpdated: "2024-03-05",
          downloadUrl: "https://www.example.com/download/electromagnetics-examples.pdf"
        }
      ]
    },
    {
      subject: "Machine Learning",
      resources: [
        {
          title: "Introduction to Machine Learning",
          type: "PDF",
          size: "10 MB",
          pages: 120,
          author: "Dr. Emily Zhang",
          lastUpdated: "2024-03-20",
          downloadUrl: "https://www.example.com/download/ml-intro-notes.pdf"
        },
        {
          title: "Neural Networks and Deep Learning",
          type: "PDF",
          size: "18 MB",
          pages: 180,
          author: "Dr. Emily Zhang",
          lastUpdated: "2024-03-19",
          downloadUrl: "https://www.example.com/download/neural-networks-notes.pdf"
        }
      ]
    },
    {
      subject: "Data Science with Python",
      resources: [
        {
          title: "Python for Data Analysis",
          type: "PDF",
          size: "14 MB",
          pages: 140,
          author: "Dr. John Smith",
          lastUpdated: "2024-03-18",
          downloadUrl: "https://www.example.com/download/python-data-analysis-notes.pdf"
        },
        {
          title: "Data Visualization with Matplotlib and Seaborn",
          type: "PDF",
          size: "16 MB",
          pages: 160,
          author: "Dr. John Smith",
          lastUpdated: "2024-03-17",
          downloadUrl: "https://www.example.com/download/data-visualization-notes.pdf"
        }
      ]
    },
    {
      subject: "Operating Systems",
      resources: [
        {
          title: "Introduction to Operating Systems",
          type: "PDF",
          size: "12 MB",
          pages: 130,
          author: "Prof. Alan Turing",
          lastUpdated: "2024-03-16",
          downloadUrl: "https://www.example.com/download/os-intro-notes.pdf"
        },
        {
          title: "Process Scheduling and Deadlocks",
          type: "PDF",
          size: "10 MB",
          pages: 110,
          author: "Prof. Alan Turing",
          lastUpdated: "2024-03-15",
          downloadUrl: "https://www.example.com/download/process-scheduling-notes.pdf"
        }
      ]
    },
    {
      subject: "Programming Languages",
      resources: [
        {
          title: "JavaScript for Beginners",
          type: "PDF",
          size: "9 MB",
          pages: 90,
          author: "Dr. Ada Lovelace",
          lastUpdated: "2024-03-14",
          downloadUrl: "https://www.example.com/download/javascript-notes.pdf"
        },
        {
          title: "Advanced Python Programming",
          type: "PDF",
          size: "11 MB",
          pages: 110,
          author: "Dr. Ada Lovelace",
          lastUpdated: "2024-03-13",
          downloadUrl: "https://www.example.com/download/advanced-python-notes.pdf"
        }
      ]
    }
  ];

  // Function to handle download
  const handleDownload = (downloadUrl: string) => {
    window.open(downloadUrl, "_blank");
  };

  // Filter materials based on search query
  const filteredMaterials = materials.map((subject) => ({
    ...subject,
    resources: subject.resources.filter((resource) =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter((subject) => subject.resources.length > 0);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Study Materials
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Access comprehensive study materials, notes, and practice problems. 
            Everything you need to excel in your studies, available at your fingertips.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search study materials..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <BookOpen className="h-10 w-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg">Comprehensive Notes</h3>
            <p className="text-sm text-gray-600">Detailed subject-wise notes</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <FileText className="h-10 w-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg">Practice Problems</h3>
            <p className="text-sm text-gray-600">Extensive problem sets</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <Download className="h-10 w-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg">Easy Download</h3>
            <p className="text-sm text-gray-600">Access offline anytime</p>
          </div>
        </motion.div>

        <div className="space-y-8">
          {filteredMaterials.map((subject, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-blue-900 text-white px-6 py-4">
                <h2 className="text-2xl font-semibold">{subject.subject}</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {subject.resources.map((resource, resourceIndex) => (
                    <div key={resourceIndex} className="border-b pb-6 last:border-b-0 last:pb-0">
                      <div className="flex flex-col md:flex-row items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{resource.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Type: {resource.type}</span>
                            <span>Size: {resource.size}</span>
                            <span>Pages: {resource.pages}</span>
                          </div>
                          <div className="mt-2 text-sm text-gray-500">
                            <span>Author: {resource.author}</span>
                            <span className="ml-4">Last Updated: {resource.lastUpdated}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownload(resource.downloadUrl)}
                          className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-200 transition-colors mt-4 md:mt-0"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyMaterials;