import React from 'react';
import { Video, Clock, Download, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const RecordedLectures = () => {
  const subjects = [
    {
      name: "Mathematics",
      lectures: [
        {
          title: "Advanced Calculus - Limits and Continuity",
          duration: "1h 45m",
          instructor: "Dr. Sarah Johnson",
          date: "2024-03-15",
          description: "Comprehensive coverage of limits, continuity, and their applications.",
          videoUrl: "https://www.youtube.com/watch?v=9vJSFyS2LZk",
          downloadUrl: "https://www.example.com/download/calculus-lecture.pdf",
          studyMaterialUrl: "https://www.example.com/study-material/calculus-notes.pdf"
        },
        {
          title: "Linear Algebra - Vector Spaces",
          duration: "2h",
          instructor: "Dr. Sarah Johnson",
          date: "2024-03-14",
          description: "Introduction to vector spaces and their properties.",
          videoUrl: "https://www.youtube.com/watch?v=ZK3O402wf1c",
          downloadUrl: "https://www.example.com/download/linear-algebra-lecture.pdf",
          studyMaterialUrl: "https://www.example.com/study-material/linear-algebra-notes.pdf"
        }
      ]
    },
    {
      name: "Physics",
      lectures: [
        {
          title: "Quantum Mechanics - Wave Functions",
          duration: "2h 15m",
          instructor: "Prof. Michael Chen",
          date: "2024-03-13",
          description: "Understanding wave functions and their interpretations.",
          videoUrl: "https://www.youtube.com/watch?v=JhYp8gHjXlE",
          downloadUrl: "https://www.example.com/download/quantum-mechanics-lecture.pdf",
          studyMaterialUrl: "https://www.example.com/study-material/quantum-mechanics-notes.pdf"
        },
        {
          title: "Electromagnetics - Maxwell's Equations",
          duration: "1h 30m",
          instructor: "Prof. Michael Chen",
          date: "2024-03-12",
          description: "Detailed explanation of Maxwell's equations and their applications.",
          videoUrl: "https://www.youtube.com/watch?v=2V8kC8p0Z5E",
          downloadUrl: "https://www.example.com/download/electromagnetics-lecture.pdf",
          studyMaterialUrl: "https://www.example.com/study-material/electromagnetics-notes.pdf"
        }
      ]
    },
    {
      name: "Machine Learning",
      lectures: [
        {
          title: "Introduction to Machine Learning",
          duration: "2h",
          instructor: "Dr. Emily Zhang",
          date: "2024-03-20",
          description: "Learn the basics of machine learning, including supervised and unsupervised learning.",
          videoUrl: "https://www.youtube.com/watch?v=OGxgnH8y2NM",
          downloadUrl: "https://www.example.com/download/ml-intro-lecture.pdf",
          studyMaterialUrl: "https://www.example.com/study-material/ml-intro-notes.pdf"
        },
        {
          title: "Neural Networks and Deep Learning",
          duration: "2h 30m",
          instructor: "Dr. Emily Zhang",
          date: "2024-03-19",
          description: "Deep dive into neural networks, backpropagation, and deep learning frameworks.",
          videoUrl: "https://www.youtube.com/watch?v=aircAruvnKk",
          downloadUrl: "https://www.example.com/download/neural-networks-lecture.pdf",
          studyMaterialUrl: "https://www.example.com/study-material/neural-networks-notes.pdf"
        }
      ]
    },
    {
      name: "Data Science with Python",
      lectures: [
        {
          title: "Python for Data Analysis",
          duration: "1h 45m",
          instructor: "Dr. John Smith",
          date: "2024-03-18",
          description: "Learn how to use Python libraries like Pandas and NumPy for data analysis.",
          videoUrl: "https://www.youtube.com/watch?v=vmEHCJofslg",
          downloadUrl: "https://www.example.com/download/python-data-analysis-lecture.pdf",
          studyMaterialUrl: "https://www.example.com/study-material/python-data-analysis-notes.pdf"
        },
        {
          title: "Data Visualization with Matplotlib and Seaborn",
          duration: "2h",
          instructor: "Dr. John Smith",
          date: "2024-03-17",
          description: "Master data visualization techniques using Matplotlib and Seaborn.",
          videoUrl: "https://www.youtube.com/watch?v=a9UrKTVEeZA",
          downloadUrl: "https://www.example.com/download/data-visualization-lecture.pdf",
          studyMaterialUrl: "https://www.example.com/study-material/data-visualization-notes.pdf"
        }
      ]
    }
  ];

  // Function to handle video playback
  const handleWatchNow = (videoUrl: string) => {
    window.open(videoUrl, "_blank");
  };

  // Function to handle download
  const handleDownload = (downloadUrl: string) => {
    window.open(downloadUrl, "_blank");
  };

  // Function to handle study material access
  const handleStudyMaterial = (studyMaterialUrl: string) => {
    window.open(studyMaterialUrl, "_blank");
  };

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
            Recorded Lectures
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Access our comprehensive collection of recorded lectures at your convenience. 
            Learn at your own pace with high-quality video content from expert instructors.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <Video className="h-10 w-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg">HD Quality</h3>
            <p className="text-sm text-gray-600">Crystal clear video quality</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <Download className="h-10 w-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg">Downloadable</h3>
            <p className="text-sm text-gray-600">Watch offline anytime</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <BookOpen className="h-10 w-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg">Study Materials</h3>
            <p className="text-sm text-gray-600">Included with lectures</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <Clock className="h-10 w-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg">Lifetime Access</h3>
            <p className="text-sm text-gray-600">Watch any time</p>
          </div>
        </motion.div>

        <div className="space-y-8">
          {subjects.map((subject, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-blue-900 text-white px-6 py-4">
                <h2 className="text-2xl font-semibold">{subject.name}</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {subject.lectures.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className="border-b pb-6 last:border-b-0 last:pb-0">
                      <div className="flex flex-col md:flex-row items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{lecture.title}</h3>
                          <p className="text-gray-600 mb-3">{lecture.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {lecture.duration}
                            </span>
                            <span>{lecture.instructor}</span>
                            <span>{lecture.date}</span>
                          </div>
                        </div>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleWatchNow(lecture.videoUrl)}
                            className="bg-indigo-300 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-200 transition-colors"
                          >
                            Watch Now
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDownload(lecture.downloadUrl)}
                            className="bg-green-300 text-green-600 px-4 py-2 rounded-md hover:bg-green-200 transition-colors"
                          >
                            Download
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleStudyMaterial(lecture.studyMaterialUrl)}
                            className="bg-purple-300 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-200 transition-colors"
                          >
                            Study Material
                          </motion.button>
                        </div>
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

export default RecordedLectures;