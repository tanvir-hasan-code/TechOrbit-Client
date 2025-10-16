import React from "react";
import { motion } from "framer-motion";
import { FaGooglePlay, FaApple } from "react-icons/fa";
{motion}

const AppDownload = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl lg:rounded-br-[200px]" id="app">
      <div className="max-w-6xl mx-auto px-6  flex flex-col md:flex-row items-center justify-between gap-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
          className="text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Get TechOrbit App 📲</h2>
          <p className="text-gray-200 mb-6">
            Discover and upvote products faster with our mobile app.  
            Stay connected anytime, anywhere!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="btn bg-black text-white flex items-center gap-2 hover:bg-gray-800">
              <FaGooglePlay /> Google Play
            </button>
            <button className="btn bg-white text-black flex items-center gap-2 hover:bg-gray-200">
              <FaApple /> App Store
            </button>
          </div>
        </motion.div>

        <motion.img
          src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QXBwfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600"
          alt="App Mockup"
          className="w-64 md:w-80 rounded-3xl shadow-2xl"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        />
      </div>
    </section>
  );
};

export default AppDownload;
