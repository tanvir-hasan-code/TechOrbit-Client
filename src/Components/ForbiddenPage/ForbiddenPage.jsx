// src/components/ForbiddenPage.jsx
import React from "react";
import { useNavigate } from "react-router";
import { FaHome, FaEnvelopeOpenText, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";


const ForbiddenPage = () => {
	const navigate = useNavigate();
	{motion}

  // Choose local gif if available, otherwise fallback to a reliable remote GIF.
  // Recommended: add a local gif to avoid hotlink/CORS issues.
  // const gifSrc = forbiddenGifLocal;
  const gifSrc =
    typeof window !== "undefined" && window.location.origin
      ? `${window.location.origin}/assets/gifs/forbidden.gif` // try public folder
      : "https://media.giphy.com/media/3o6Zt6D8p1rj2y2j7u/giphy.gif"; // fallback remote (may be hotlink-protected)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f9fafb] via-[#e6f0ff] to-[#f0eefb] p-6">
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="md:flex items-center">
          {/* Left: GIF */}
          <div className="md:w-1/2 flex items-center justify-center p-6 bg-gradient-to-tr from-[#fef3c7] via-[#fde68a] to-[#fecaca]">
            <motion.img
              key={gifSrc}
              src={gifSrc}
              alt="Forbidden - Access Denied"
              onError={(e) => {
                // fallback to external GIF if local/public gif not found
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://media.giphy.com/media/l3vR85PnGsBwu1PFK/giphy.gif";
              }}
              className="w-64 h-64 md:w-72 md:h-72 object-contain rounded-xl shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          </div>

          {/* Right: Message */}
          <div className="md:w-1/2 p-8 md:p-10">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-gradient-to-br from-red-400 to-pink-500 text-white shadow-lg">
                  <FaShieldAlt className="w-5 h-5" />
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                  403 • Access Denied
                </h1>
              </div>

              <p className="text-gray-600">
                Oops — you don’t have permission to view this page. This area is
                restricted for certain users only. If you believe this is a
                mistake, you can request access or contact support.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  onClick={() => navigate("/")}
                  className="btn btn-primary flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white border-0 shadow-md"
                >
                  <FaHome />
                  Go to Home
                </button>

                <a
                  href="mailto:support@techorbit.example?subject=Access%20Request%20(403)"
                  className="btn btn-outline flex items-center gap-2 ml-0 sm:ml-2"
                >
                  <FaEnvelopeOpenText />
                  Contact Support
                </a>
              </div>

              <div className="mt-4 text-sm text-gray-500">
                <strong>Tip:</strong> Try logging in with an account that has
                higher privileges or contact the site admin for access.
              </div>

              <div className="mt-6 text-xs text-gray-400">
                TechOrbit • © {new Date().getFullYear()} — All rights reserved.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
