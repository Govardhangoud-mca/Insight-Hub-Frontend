import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const Teachers = () => {
  const teachers = [
    { id: 1, name: 'Dr. Robert Wilson', subject: 'Mathematics', experience: '10 years', status: 'Active', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 2, name: 'Prof. Mary Johnson', subject: 'Science', experience: '8 years', status: 'Active', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 3, name: 'Mrs. Elizabeth Brown', subject: 'English', experience: '12 years', status: 'Active', image: 'https://randomuser.me/api/portraits/women/65.jpg' },
    { id: 4, name: 'Mr. David Clark', subject: 'History', experience: '5 years', status: 'On Leave', image: 'https://randomuser.me/api/portraits/men/78.jpg' },
    { id: 5, name: 'Dr. Sarah Davis', subject: 'Physics', experience: '7 years', status: 'Active', image: 'https://randomuser.me/api/portraits/women/12.jpg' },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white px-6 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-wide">Meet Our Esteemed Faculty</h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl">
          Learn from experienced educators who are passionate about shaping future leaders.
        </p>
      </motion.div>

      {/* Teacher Showcase */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
        {teachers.map((teacher, idx) => (
          <motion.div
            key={teacher.id}
            className="relative flex flex-col items-center group cursor-pointer"
            data-aos="fade-up"
            data-aos-delay={idx * 100}
          >
            {/* Circular Image with subtle border */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-white/20 shadow-lg transition-transform transform group-hover:scale-105">
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-full">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  teacher.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {teacher.status}
                </span>
              </div>
            </div>

            {/* Info Below Image */}
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold">{teacher.name}</h3>
              <p className="text-gray-300">{teacher.subject}</p>
              <p className="text-gray-400 text-sm">{teacher.experience} experience</p>
            </div>

            {/* Decorative floating circles */}
            <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full border-2 border-white/10 animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full border-2 border-white/10 animate-ping"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Teachers;
