import React from "react";
import { FaRobot, FaMobileAlt, FaCloud, FaGlobe, FaLaptopCode, FaGamepad } from "react-icons/fa";

const categories = [
  { id: 1, name: "AI Tools", icon: <FaRobot />, color: "bg-gradient-to-r from-blue-500 to-purple-500" },
  { id: 2, name: "Mobile Apps", icon: <FaMobileAlt />, color: "bg-gradient-to-r from-pink-500 to-rose-500" },
  { id: 3, name: "SaaS", icon: <FaCloud />, color: "bg-gradient-to-r from-cyan-500 to-sky-500" },
  { id: 4, name: "Web Apps", icon: <FaGlobe />, color: "bg-gradient-to-r from-green-500 to-emerald-500" },
  { id: 5, name: "Developer Tools", icon: <FaLaptopCode />, color: "bg-gradient-to-r from-orange-500 to-yellow-500" },
  { id: 6, name: "Gaming", icon: <FaGamepad />, color: "bg-gradient-to-r from-indigo-500 to-fuchsia-500" },
];

const CategoriesSection = () => {
  return (
    <section className="py-16 bg-base-200" id="categories">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">🌐 Explore by Category</h2>
        <p className="text-gray-500 mb-12">
          Discover tech innovations across different industries.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`group relative flex flex-col items-center justify-center p-5 rounded-2xl shadow-md hover:shadow-xl cursor-pointer transform transition duration-300 hover:-translate-y-2 ${cat.color} text-white`}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </div>
              <h3 className="text-lg font-semibold">{cat.name}</h3>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#000]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
