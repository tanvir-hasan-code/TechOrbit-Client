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
    <nav className="bg-white shadow-md  w-full ">
      <div className="max-w-7xl mx-auto px-4 lg:px-1 flex justify-between items-center h-16">
        {/* Logo */}
        <li className="flex items-center gap-2">
          <TechOrbitLogo />
        </li>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
          >
            Products
          </NavLink>
          {user && (
            <NavLink
              to="/add-product"
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Add Product
            </NavLink>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-blue-200">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="profile"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content mt-3 p-4 shadow-lg bg-white rounded-2xl w-64 border border-gray-100"
              >
                <li className="pb-2 border-b border-gray-200 mb-2">
                  <p className="font-bold text-lg text-gray-800">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 rounded-lg hover:bg-blue-50 text-gray-700"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="w-full btn btn-error text-left px-3 py-2 rounded-lg  text-white "
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
            className="btn btn-square btn-ghost"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
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
                    ? "M6 18L18 6M6 6l12 12" // close icon
                    : "M4 6h16M4 12h16M4 18h16" // hamburger
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="flex flex-col gap-2 p-4">
            <Link
              to="/"
              className="text-gray-700 py-2 px-2 rounded-lg hover:bg-blue-50"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-700 py-2 px-2 rounded-lg hover:bg-blue-50"
            >
              Products
            </Link>
            {user && (
              <Link
                to="/add-product"
                className="text-gray-700 py-2 px-2 rounded-lg hover:bg-blue-50"
              >
                Add Products
              </Link>
            )}

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="w-full text-center py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="w-full text-center py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <img
                    className="w-14 h-14 object-cover rounded-full border"
                    src={user?.photoURL}
                    alt="Photo not fount"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {user.displayName}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">{user.email}</p>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  className="block py-2 px-2 rounded-lg hover:bg-blue-50 text-gray-700"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogOut}
                  className="w-full btn btn-error py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
