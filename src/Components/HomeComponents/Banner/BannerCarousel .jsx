import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./BannerCarousel.css";
import { FaRobot, FaLaptopCode, FaGamepad, FaMobileAlt } from "react-icons/fa";

const slides = [
  {
    title: "Discover Next-Gen Tech Products",
    subtitle: "Find trending apps, AI tools & software shared by creators",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1470&q=80",
  },
  {
    title: "Explore AI Tools & Innovations",
    subtitle: "Unleash the power of Artificial Intelligence in your workflow",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1470&q=80",
  },
  {
    title: "Showcase Your Web Apps",
    subtitle: "Share your React, Vue or Next.js creations with the world",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1470&q=80",
  },
  {
    title: "Discover Amazing Mobile Apps",
    subtitle: "Find and share iOS & Android apps that people love",
    image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=1470&q=80",
  },
  {
    title: "Innovative Software Projects",
    subtitle: "From Photoshop plugins to full-fledged desktop apps",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1470&q=80",
  },
  {
    title: "Discover Exciting Games",
    subtitle: "Explore indie, web, and mobile games from talented developers",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FtaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
  },
  {
    title: "Get Inspired by Open Source",
    subtitle: "Contribute or discover open-source tools that shape the web",
    image: "https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fE9wZW4lMjBzb3VyY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
  },
  {
    title: "Join the Tech Community",
    subtitle: "Upvote, review, and discuss new tech products every day",
    image: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1470&q=80",
  },
  {
    title: "Level Up with Premium Access",
    subtitle: "Unlock exclusive features and boost your visibility",
    image: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?auto=format&fit=crop&w=1470&q=80",
  },
  {
    title: "Start Your Tech Journey Today",
    subtitle: "Join TechOrbit to share, learn, and grow in the tech world",
    image: "https://plus.unsplash.com/premium_photo-1682124741532-ad03910d04b3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8VGVjaCUyMEpvdXJuZXl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
  },
];

const BannerCarousel = () => {
  return (
    <div className="w-full max-h-screen my-5 rounded-xl   overflow-hidden relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={false}
        className="h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="w-full h-[500px] sm:h-[700px] flex flex-col justify-center items-center text-center bg-cover bg-center relative transition-transform duration-1000"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40"></div>

              {/* Floating icons */}
              <FaRobot className="absolute top-10 left-10 text-white text-3xl sm:text-5xl animate-bounce-slow opacity-80" />
              <FaLaptopCode className="absolute bottom-10 left-10 text-white text-3xl sm:text-5xl animate-bounce-slow opacity-80" />
              <FaMobileAlt className="absolute top-20 right-20 text-white text-3xl sm:text-5xl animate-bounce-slow opacity-80" />
              <FaGamepad className="absolute bottom-12 right-12 text-white text-3xl sm:text-5xl animate-bounce-slow opacity-80" />

              {/* Text Content */}
              <div className="relative z-10 px-4 sm:px-6">
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-lg animate-fade-in-down">
                  {slide.title}
                </h2>
                <p className="text-lg sm:text-2xl text-white/90 mb-6 drop-shadow-md animate-fade-in-up">
                  {slide.subtitle}
                </p>
                <button className="btn btn-primary text-white bg-indigo-600 hover:bg-indigo-400 hover:rounded-full hover:shadow-2xl hover:shadow-amber-50 border-0 hover:scale-110  animate-fade-in">
                  Discover Tools
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerCarousel;
