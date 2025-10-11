import React from "react";
import { FaGoogle } from "react-icons/fa";

const GoogleLogin = ({ onClick }) => {
  return (
    <button
      onClick={onClick || (() => alert("Google Login clicked"))}
      className="flex items-center justify-center gap-3 w-full max-w-xs px-4 py-2 rounded-lg shadow-md
                 bg-white text-black hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-300"
    >
      <FaGoogle className="text-red-500 text-lg" />
      <span className="font-medium">Continue with Google</span>
    </button>
  );
};

export default GoogleLogin;
