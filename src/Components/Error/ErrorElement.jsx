import { Link, useRouteError } from "react-router";

const ErrorElement = () => {
  const { status, statusText, message } = useRouteError() || {};

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-r from-purple-500 via-pink-400 to-indigo-500 text-white px-4">

      {/* Floating shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-20 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      {/* Animated GIF */}
      <div className="w-72 md:w-96 mb-8 animate-float z-10">
        <img
          src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif"
          alt="Error Animation"
          className="w-full rounded-2xl shadow-2xl border-4 border-white/30"
        />
      </div>

      {/* Error Info */}
      <div className="text-center z-10">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-3 drop-shadow-lg">
          {status || 404}
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-4 drop-shadow-md">
          {statusText || "Oops! Page Not Found"}
        </h2>
        <p className="text-base md:text-lg opacity-90 mb-8 max-w-xl mx-auto leading-relaxed">
          {message ||
            "Sorry, the page you are looking for doesn't exist or has been moved."}
        </p>

        {/* Back Button */}
        <Link
          to="/"
          className="inline-block bg-white text-purple-600 font-bold px-8 py-3 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-purple-50 hover:text-purple-700"
        >
          ⬅ Back to Home
        </Link>
      </div>

      {/* Footer */}
      <p className="mt-10 text-sm opacity-80 text-center tracking-wide z-10">
        © {new Date().getFullYear()} <span className="font-semibold">TechOrbit</span> | Crafted with 💜
      </p>

      {/* Blob Animations */}
      <style>
        {`
          @keyframes blob {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob { animation: blob 7s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
          .animate-float { animation: float 3s ease-in-out infinite; }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}
      </style>
    </div>
  );
};

export default ErrorElement;
