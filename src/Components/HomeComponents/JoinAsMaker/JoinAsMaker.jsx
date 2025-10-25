import React from "react";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import { Link } from "react-router";
{motion}

const JoinAsMaker = () => {
  return (
    <section data-aos="flip-down"  className="py-16 mx-5 md:mx-8 rounded-4xl  bg-base-200" id="join">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <FaRocket className="text-5xl text-primary mx-auto mb-4 animate-bounce" />
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Launch Your Product on <span className="text-primary">TechOrbit 🚀</span>
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Are you building something amazing? Share your innovation with the world and get featured on TechOrbit.
          </p>
          <Link to={"/add-product"} className="btn btn-primary rounded-full px-8 hover:scale-105 transition-transform duration-300">
            Submit Your Product
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinAsMaker;
