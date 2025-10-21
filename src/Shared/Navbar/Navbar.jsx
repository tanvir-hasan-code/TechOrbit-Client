import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import TechOrbitLogo from "../TechOrbitLogo/TechOrbitLogo";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged Out Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Logout Failed!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full lg:px-4">
      <nav className="max-w-7xl mx-auto rounded-2xl backdrop-blur-lg bg-gradient-to-r from-blue-600/40 via-purple-600/40 to-pink-600/40 border border-white/10 shadow-xl transition-all duration-500">
        <div className="px-5 lg:px-8 flex justify-between items-center h-16">
          {/* Logo */}
          <h1 className="flex items-center gap-2">
            <TechOrbitLogo  textColor="text-white" className="font-extrabold"/>
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {["/", "/products", user && "/add-product"].map(
              (path, i) =>
                path && (
                  <NavLink
                    key={i}
                    to={path}
                    className={({ isActive }) =>
                      `relative font-semibold transition-all duration-300 ${
                        isActive
                          ? "text-yellow-300 after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-yellow-300"
                          : "text-white/90 hover:text-yellow-200"
                      }`
                    }
                  >
                    {path === "/"
                      ? "Home"
                      : path === "/products"
                      ? "Products"
                      : "Add Product"}
                  </NavLink>
                )
            )}

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-yellow-400 text-blue-900 font-semibold rounded-xl hover:bg-yellow-300 transition-all duration-300 shadow-md hover:shadow-yellow-200/40"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 border border-yellow-300 text-yellow-300 font-semibold rounded-xl hover:bg-yellow-300 hover:text-blue-900 transition-all duration-300 shadow-md hover:shadow-yellow-200/40"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="cursor-pointer">
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-yellow-400 hover:scale-105 transition-transform">
                    <img
                      src={user.photoURL || "/default-avatar.png"}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content mt-3 p-4 shadow-2xl bg-white/90 backdrop-blur-md text-gray-800 rounded-2xl w-64 border border-white/20"
                >
                  <li className="pb-2 border-b border-gray-200 mb-2">
                    <p className="font-bold text-lg text-gray-900">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </li>
                  <li>
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 rounded-lg hover:bg-blue-50 text-gray-700 font-medium"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-white hover:text-yellow-300 transition"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white/80 backdrop-blur-md border-t border-white/10 shadow-lg rounded-b-4xl">
            <div className="flex flex-col gap-2 p-4">
              <Link
                to="/"
                className="py-2 px-2 rounded-lg hover:bg-blue-50 font-medium text-gray-800"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="py-2 px-2 rounded-lg hover:bg-blue-50 font-medium text-gray-800"
              >
                Products
              </Link>
              {user && (
                <Link
                  to="/add-product"
                  className="py-2 px-2 rounded-lg hover:bg-blue-50 font-medium text-gray-800"
                >
                  Add Product
                </Link>
              )}
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="w-full text-center py-2 bg-yellow-400 text-blue-900 font-semibold rounded-xl hover:bg-yellow-300 transition-all duration-300 shadow-md"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="w-full text-center py-2 border border-yellow-400 text-yellow-400 font-semibold rounded-xl hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300 shadow-md"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-12 h-12 object-cover rounded-full border-2 border-blue-500"
                      src={user?.photoURL || "/default-avatar.png"}
                      alt="User"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {user.displayName}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    className="block py-2 px-2 rounded-lg hover:bg-blue-50 font-medium text-gray-800"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="w-full py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
