import React from "react";
import { motion } from "framer-motion";
import { FaEnvelopeOpenText } from "react-icons/fa";
{motion}

const SubscribeSection = () => {
  return (
    <section
      className="py-16 mx-4 my-10 bg-gradient-to-r from-blue-600 to-indigo-600 
      text-white rounded-3xl lg:rounded-tl-full lg:rounded-br-full"
      id="subscribe"
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          {/* ===== Icon ===== */}
          <div className="flex justify-center mb-5">
            <div className="bg-white/20 p-5 rounded-full shadow-md">
              <FaEnvelopeOpenText className="text-4xl md:text-5xl text-white" />
            </div>
          </div>

          {/* ===== Heading ===== */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with <span className="text-yellow-300">TechOrbit 🚀</span>
          </h2>
          <p className="text-gray-200 mb-8 text-sm md:text-base max-w-2xl mx-auto">
            Join our newsletter to receive the latest tech trends, startup stories, 
            and exclusive product launches — straight to your inbox.
          </p>

          {/* ===== Form ===== */}
          <form className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="input input-bordered w-full sm:w-2/3 lg:w-1/2 
              rounded-full text-gray-800 focus:outline-none shadow-md"
              required
            />
            <button
              type="submit"
              className="btn btn-primary rounded-full px-8 w-full sm:w-auto 
              hover:scale-105 transition-transform duration-300"
            >
              Subscribe
            </button>
          </form>

          {/* ===== Footer Text ===== */}
          <p className="mt-5 text-xs md:text-sm text-gray-300">
            💡 We respect your privacy. No spam — only quality tech insights.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SubscribeSection;
