// Button.jsx
import React from "react";

const ButtonP = ({
  children,
  className = "",
  onClick,
  bgColor = "bg-orange-500",
  hoverColor = "hover:bg-orange-600",
  textColor = "text-white",
  rounded = "rounded-lg",
  padding = "px-4 py-2",
}) => {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} ${textColor} ${padding} ${rounded} shadow-lg 
                  transition-all duration-300 transform 
                  ${hoverColor} hover:scale-105 active:scale-95 
                  ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonP;
