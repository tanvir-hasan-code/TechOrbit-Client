import React from "react";
import { motion } from "framer-motion";
import { FaLightbulb } from "react-icons/fa";
{motion}

const tips = [
  {
    id: 1,
    title: "Build MVPs Faster",
    desc: "Focus on core features first — launch, learn, and iterate.",
  },
  {
    id: 2,
    title: "Market Before You Build",
    desc: "Validate your idea early through communities and feedback.",
  },
  {
    id: 3,
    title: "Stay Consistent",
    desc: "Most successful startups succeed through consistency, not luck.",
  },
];

const TipsInsights = () => {
  return (
    <section className="py-16 bg-base-100" id="insights">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 flex justify-center items-center gap-2">
          <FaLightbulb className="text-yellow-400" /> Tips & Insights
        </h2>
        <p className="text-gray-500 mb-10">Quick advice to help makers grow faster.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <motion.div
				  key={tip.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: false }}
              className="p-6 bg-base-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
              <p className="text-gray-600 text-sm">{tip.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TipsInsights;
