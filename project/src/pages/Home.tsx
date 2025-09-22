import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { BookOpen, Video, Users, Calendar } from 'lucide-react';

const Home = () => {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920&q=80",
      title: "Welcome to Gates Institute",
      description: "Your gateway to flexible and comprehensive education"
    },
    {
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80",
      title: "Learn at Your Own Pace",
      description: "Access recorded lectures and study materials anytime"
    },
    {
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1920&q=80",
      title: "Expert Faculty Support",
      description: "Get guidance from experienced educators"
    },
    {
      image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=1920&q=80",
      title: "Comprehensive Resources",
      description: "Access notes, questions, and study materials"
    }
  ];

  const features = [
    {
      icon: <Video className="h-8 w-8" />,
      title: "Recorded Lectures",
      description: "Access pre-recorded lectures at your convenience"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Study Materials",
      description: "Comprehensive notes and resources for all subjects"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Live Sessions",
      description: "Interactive sessions with faculty members"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Flexible Schedule",
      description: "Learn at your own pace and time"
    }
  ];

  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="h-[600px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div 
              className="relative h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-xl md:text-2xl">{slide.description}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-indigo-600 mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;