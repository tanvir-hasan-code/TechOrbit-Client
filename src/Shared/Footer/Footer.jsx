// Footer.jsx
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import TechOrbitLogo from "../TechOrbitLogo/TechOrbitLogo";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-0">

          {/* Logo & Description */}
          <div className="flex flex-col gap-4 md:w-1/3">
            <TechOrbitLogo size="h-14 w-14" textColor="text-white" />
            <p className="text-white leading-relaxed text-sm md:text-base max-w-sm">
              TechOrbit is your ultimate platform for modern tech solutions, providing innovative ideas, tools, and support for developers and businesses.
            </p>
            <p className="text-orange-100 italic text-sm">“Empowering Tech, Empowering You.”</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col md:px-5 gap-4 md:w-1/3">
            <h3 className="text-lg font-semibold tracking-wide text-white mb-2">Quick Links</h3>
            <a href="/dashboard" className="hover:text-yellow-300 transition-colors duration-300 text-sm md:text-base">Dashboard</a>
            <a href="/profile" className="hover:text-yellow-300 transition-colors duration-300 text-sm md:text-base">Profile</a>
            <a href="/settings" className="hover:text-yellow-300 transition-colors duration-300 text-sm md:text-base">Settings</a>
            <a href="/contact" className="hover:text-yellow-300 transition-colors duration-300 text-sm md:text-base">Contact</a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4 md:w-1/3">
            <h3 className="text-lg font-semibold tracking-wide text-white mb-2">Contact Us</h3>
            <p className="flex items-center gap-3 text-white text-sm md:text-base">
              <FaEnvelope className="text-yellow-300" /> support@techorbit.com
            </p>
            <p className="flex items-center gap-3 text-white text-sm md:text-base">
              <FaPhone className="text-yellow-300" /> +880 1234 567890
            </p>
            <p className="flex items-center gap-3 text-white text-sm md:text-base">
              <FaMapMarkerAlt className="text-yellow-300" /> 123 Tech Street, Dhaka, Bangladesh
            </p>
            <p className="flex items-center gap-3 text-white text-sm md:text-base">
              <FaClock className="text-yellow-300" /> Mon - Sat: 9:00 AM - 6:00 PM
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-5 mt-4 text-2xl">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors duration-300"><FaFacebookF /></a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors duration-300"><FaTwitter /></a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors duration-300"><FaInstagram /></a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors duration-300"><FaYoutube /></a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/25 mt-12"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-gray-200 text-sm gap-3 md:gap-0">
          <p>© 2025 TechOrbit. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-yellow-300 transition-colors duration-300 text-sm md:text-base">Privacy Policy</a>
            <a href="/terms" className="hover:text-yellow-300 transition-colors duration-300 text-sm md:text-base">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
