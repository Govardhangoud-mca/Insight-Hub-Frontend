import React from 'react';
import { Award, BookOpen, Users, Clock, Monitor, Library, Activity, Globe } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Users className="h-6 w-6" />, value: "5000+", label: "Students" },
    { icon: <BookOpen className="h-6 w-6" />, value: "50+", label: "Courses" },
    { icon: <Award className="h-6 w-6" />, value: "98%", label: "Success Rate" },
    { icon: <Clock className="h-6 w-6" />, value: "15+", label: "Years Experience" }
  ];

  const facilities = [
    {
      icon: <Monitor className="h-8 w-8 text-indigo-600" />,
      title: "Advanced Computer Labs",
      description: "Our computer labs are equipped with the latest technology, high-speed internet, and software for programming, data analysis, and design.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80"
    },
    {
      icon: <Library className="h-8 w-8 text-indigo-600" />,
      title: "Spacious Library",
      description: "A vast collection of books, journals, and digital resources in a quiet and comfortable environment for focused learning.",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1920&q=80"
    },
    {
      icon: <Activity className="h-8 w-8 text-indigo-600" />,
      title: "Sports & Playground",
      description: "State-of-the-art sports facilities, including a football field, basketball court, and indoor games for physical fitness and recreation.",
      image: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1920&q=80"
    },
    {
      icon: <Globe className="h-8 w-8 text-indigo-600" />,
      title: "Global Collaboration",
      description: "Opportunities for international exchange programs, workshops, and collaborations with global institutions.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-indigo-900 bg-opacity-75"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">About Gates Institute</h1>
            <p className="text-xl max-w-2xl">
              Empowering students with cutting-edge education and comprehensive learning resources since 2008.
            </p>
          </div>
        </div>
      </div>

      {/* Stats and Legacy Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Legacy of Excellence</h2>
            <p className="text-gray-600 mb-4">
              Gates Institute has been at the forefront of educational innovation for over 15 years. 
              We specialize in providing comprehensive education with a focus on both theoretical knowledge 
              and practical applications.
            </p>
            <p className="text-gray-600 mb-4">
              Our state-of-the-art facilities and experienced faculty members ensure that students receive 
              the highest quality education. We pride ourselves on maintaining small class sizes and 
              providing personalized attention to each student.
            </p>
            <p className="text-gray-600">
              With a commitment to academic excellence and student success, we have consistently produced 
              top performers across various fields. Our alumni network spans globally, with many holding 
              key positions in leading organizations.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-indigo-600 flex justify-center mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Facilities Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facilities.map((facility, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={facility.image} 
                    alt={facility.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="text-white text-4xl">
                      {facility.icon}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{facility.title}</h3>
                  <p className="text-gray-600">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Gates Institute?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Experienced Faculty</h3>
              <p className="text-gray-600">
                Our faculty members are industry experts with years of experience in teaching and research.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Career Support</h3>
              <p className="text-gray-600">
                We provide career counseling, placement assistance, and internship opportunities.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Student Community</h3>
              <p className="text-gray-600">
                Join a vibrant community of students from diverse backgrounds and cultures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;