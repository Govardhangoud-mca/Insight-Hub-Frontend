import React, { useEffect } from "react"; 
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Video, BookOpen, Users, Calendar, GraduationCap, Sparkles } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920&q=80",
      title: "Welcome to Gates Institute",
      description: "Your gateway to flexible and comprehensive education",
    },
    {
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80",
      title: "Learn at Your Own Pace",
      description: "Access recorded lectures and study materials anytime",
    },
    {
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1920&q=80",
      title: "Expert Faculty Support",
      description: "Get guidance from experienced educators",
    },
    {
      image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=1920&q=80",
      title: "Comprehensive Resources",
      description: "Access notes, questions, and study materials",
    },
  ];

  const features = [
    { icon: <Video className="h-8 w-8 text-pink-400" />, title: "Recorded Lectures", description: "Access pre-recorded lectures anytime" },
    { icon: <BookOpen className="h-8 w-8 text-blue-400" />, title: "Study Materials", description: "Comprehensive notes for all subjects" },
    { icon: <Users className="h-8 w-8 text-purple-400" />, title: "Live Sessions", description: "Interactive sessions with faculty" },
    { icon: <Calendar className="h-8 w-8 text-green-400" />, title: "Flexible Schedule", description: "Learn at your own pace and time" },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-x-hidden">
      {/* Hero Slider Section */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="h-[550px] max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl my-12 relative"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Blurred Gradient Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl -z-10" />
              
              {/* Glassmorphic Caption Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-lg text-center shadow-2xl border border-white/20"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="text-gray-200 text-lg">{slide.description}</p>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Features Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/10 p-6 rounded-3xl shadow-2xl border border-white/20 text-center hover:border-blue-400/50 transition-all duration-500"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
