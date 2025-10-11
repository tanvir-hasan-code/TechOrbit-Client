import React, { useState } from "react";
import "./MagicButton.css"; // Animation CSS

const MagicButton = ({ children, onClick, className = "" }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    setClicked(true);
    if (onClick) onClick(e);

    // Reset animation after 1s
    setTimeout(() => setClicked(false), 1000);
  };

  return (
    <button
      onClick={handleClick}
      className={`magic-btn ${clicked ? "explode" : ""} ${className}`}
    >
      {children}
      {/* Particles */}
      <span className="particle particle1"></span>
      <span className="particle particle2"></span>
      <span className="particle particle3"></span>
      <span className="particle particle4"></span>
      <span className="particle particle5"></span>
    </button>
  );
};

export default MagicButton;
