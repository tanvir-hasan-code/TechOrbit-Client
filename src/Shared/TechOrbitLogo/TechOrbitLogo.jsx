// TechOrbitLogo.jsx
import React from "react";
import "./TechOrbitLogo.css"; // CSS file import
import { Link } from "react-router";

const TechOrbitLogo = ({ size = "h-10 w-10", className = "", textColor = "text-black" }) => {
  const letters = "TechOrbit".split("");

  return (
    <Link to="/">
      <div className={`flex items-center gap-2 ${className}`}>
        {/* Circle Icon */}
        <div
          className={`flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 ${size} text-white font-bold text-lg`}
        >
          TO
        </div>

        {/* Wave Animated Text */}
        <div className={`flex gap-1 text-xl font-bold overflow-hidden ${textColor}`}>
          {letters.map((letter, index) => (
            <span
              key={index}
              className="wave"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default TechOrbitLogo;
