import React from "react";
import { motion } from "framer-motion";
{motion}

const PrimaryLoaderPage = () => {
  return (
    <div className="flex flex-col py-8 items-center justify-center min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white relative overflow-hidden">
      
      {/* Glowing Orbs */}
      <div className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-cyan-400 rounded-full blur-3xl opacity-20 bottom-10 right-10 animate-pulse"></div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="flex flex-col items-center space-y-6 z-10"
      >
        {/* 🎯 Replace loader GIF with this new image */}
        <img
          src="https://cdn.dribbble.com/userupload/42409823/file/original-568544560f6ca1076a16e3428302e329.gif" 
          alt="Tech Loader"
          className="w-40 h-40 object-cover rounded-full shadow-2xl border- border-white/20"
        />

        <motion.h1
          className="text-4xl md:text-5xl font-extrabold tracking-wider drop-shadow-lg bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          TechOrbit Loading...
        </motion.h1>

        <motion.p
          className="text-lg text-gray-300 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Innovating the Future, One Product at a Time ⚙️
        </motion.p>

        <motion.div
          className="mt-4 w-48 h-1 rounded-full bg-gray-700 overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "12rem" }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            className="h-1 bg-gradient-to-r from-cyan-400 to-purple-500"
            animate={{ x: [0, 180, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PrimaryLoaderPage;
