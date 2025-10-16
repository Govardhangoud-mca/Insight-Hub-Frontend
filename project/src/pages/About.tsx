import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Award, BookOpen, Users, Clock, Monitor, Library, Activity, Globe } from "lucide-react";

const About = () => {
  const stats = [
    { icon: <Users className="h-6 w-6 text-indigo-400" />, value: "5000+", label: "Students" },
    { icon: <BookOpen className="h-6 w-6 text-indigo-400" />, value: "50+", label: "Courses" },
    { icon: <Award className="h-6 w-6 text-indigo-400" />, value: "98%", label: "Success Rate" },
    { icon: <Clock className="h-6 w-6 text-indigo-400" />, value: "15+", label: "Years Experience" }
  ];

  const facilities = [
    {
      icon: <Monitor className="h-8 w-8 text-indigo-400" />,
      title: "Advanced Computer Labs",
      description: "Equipped with latest technology, high-speed internet, and software for programming, data analysis, and design.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80"
    },
    {
      icon: <Library className="h-8 w-8 text-indigo-400" />,
      title: "Spacious Library",
      description: "Vast collection of books, journals, and digital resources in a quiet, comfortable environment.",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1920&q=80"
    },
    {
      icon: <Activity className="h-8 w-8 text-indigo-400" />,
      title: "Sports & Playground",
      description: "State-of-the-art sports facilities including football field, basketball court, and indoor games.",
      image: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1920&q=80"
    },
    {
      icon: <Globe className="h-8 w-8 text-indigo-400" />,
      title: "Global Collaboration",
      description: "International exchange programs, workshops, and collaborations with global institutions.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
    }
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-blue-900/50 to-purple-900/70"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-5xl font-extrabold mb-4 gradient-text"
            >
              About Gates Institute
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-lg md:text-xl max-w-2xl mx-auto md:mx-0 text-gray-200"
            >
              Empowering students with cutting-edge education and comprehensive learning resources since 2008.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-3xl font-bold mb-6"
            >
              Our Legacy of Excellence
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-gray-300 mb-4"
            >
              Gates Institute has been at the forefront of educational innovation for over 15 years...
            </motion.p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-white/10 p-6 rounded-3xl text-center backdrop-blur-md border border-white/20 shadow-2xl"
              >
                <div className="mb-3 flex justify-center text-indigo-400">{stat.icon}</div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Facilities Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Facilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20"
            >
              <div className="relative h-48">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="text-white text-4xl">{facility.icon}</div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{facility.title}</h3>
                <p className="text-gray-300">{facility.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Gates Institute?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Experienced Faculty", description: "Our faculty members are industry experts with years of experience." },
            { title: "Career Support", description: "We provide career counseling, placement assistance, and internships." },
            { title: "Student Community", description: "Join a vibrant community of students from diverse backgrounds." },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
