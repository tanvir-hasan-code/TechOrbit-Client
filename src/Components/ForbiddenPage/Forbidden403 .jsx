import React from "react";
import { Link } from "react-router";

const Forbidden403 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="md:flex">
          {/* Left: Illustration / GIF */}
          <div className="md:w-1/2 bg-gradient-to-tr from-red-50 to-red-100 flex items-center justify-center p-8">
            {/* Animated SVG (substitute with <img src="/path/to/your.gif" /> if you have a gif) */}
            <div className="w-full flex flex-col items-center gap-6">
              <div className="w-48 h-48">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <defs>
                    <linearGradient id="g1" x1="0" x2="1">
                      <stop offset="0%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#EF4444" />
                    </linearGradient>
                  </defs>

                  <rect x="0" y="0" width="200" height="200" rx="20" fill="url(#g1)" opacity="0.12" />
                  
                  {/* Lock body */}
                  <g transform="translate(50,40)">
                    <rect x="10" y="40" rx="8" ry="8" width="120" height="80" fill="#fff" opacity="0.98" />
                    <rect x="22" y="56" width="40" height="8" rx="4" fill="#F97316" />
                    <rect x="22" y="68" width="80" height="8" rx="4" fill="#F97316" />
                    <circle cx="92" cy="84" r="8" fill="#F97316" />

                    {/* shackle */}
                    <path d="M 30 40 q 20 -40 60 0" fill="none" stroke="#fff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
                      <animate attributeName="d"
                        dur="3s"
                        repeatCount="indefinite"
                        values="
                          M30 40 q 20 -40 60 0;
                          M30 30 q 20 -30 60 0;
                          M30 40 q 20 -40 60 0
                        "
                      />
                    </path>

                    {/* pulse circle for subtle animation */}
                    <circle cx="70" cy="80" r="36" fill="none" stroke="#F97316" strokeOpacity="0.12" strokeWidth="6">
                      <animate attributeName="r" values="36;40;36" dur="2.2s" repeatCount="indefinite" />
                      <animate attributeName="stroke-opacity" values="0.12;0.2;0.12" dur="2.2s" repeatCount="indefinite" />
                    </circle>
                  </g>
                </svg>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-red-600">403 — Forbidden</h3>
                <p className="mt-1 text-sm text-gray-500">You don't have permission to access this page.</p>
              </div>
            </div>
          </div>

          {/* Right: Text + actions */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              Access denied
            </h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              The page you are trying to reach is restricted. If you believe this is an error, contact the site administrator or request proper access.
            </p>

            <div className="flex gap-3 flex-wrap">
              <Link to="/" className="btn btn-primary">
                Go to Home
              </Link>

              <button
                onClick={() => window.history.back()}
                className="btn btn-ghost"
              >
                Go Back
              </button>

              <a
                href="mailto:admin@yourdomain.com"
                className="btn btn-outline"
              >
                Contact Admin
              </a>
            </div>

            <div className="mt-8 text-sm text-gray-400">
              <p>Tip: If you're logged in, try logging out and logging back in with an authorized account.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forbidden403;
