import React, { useState } from "react";
import { Link } from "react-router";
import TechOrbitLogo from "../TechOrbitLogo/TechOrbitLogo";

const Navbar = () => {
  const { user, logout } = {}
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-8">
      {/* Logo */}
      <div className="flex-1">
        <TechOrbitLogo/>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-4">
        <Link to="/" className="btn btn-ghost btn-sm rounded-btn">
          Home
        </Link>
        <Link to="/products" className="btn btn-ghost btn-sm rounded-btn">
          Products
        </Link>

        {!user && (
          <>
            <Link to="/login" className="btn btn-primary btn-sm text-white">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline btn-sm">
              Register
            </Link>
          </>
        )}

        {user && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL} alt="profile" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
            >
              <li>
                <span>{user.displayName}</span>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          className="btn btn-square btn-ghost"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
                  ? "M6 18L18 6M6 6l12 12" // X icon
                  : "M4 6h16M4 12h16M4 18h16" // Hamburger
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-base-100 flex flex-col gap-2 p-4 md:hidden shadow-md z-50">
          <Link to="/" className="btn btn-ghost w-full">
            Home
          </Link>
          <Link to="/products" className="btn btn-ghost w-full">
            Products
          </Link>

          {!user && (
            <>
              <Link to="/login" className="btn btn-primary w-full text-white">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline w-full">
                Register
              </Link>
            </>
          )}

          {user && (
            <>
              <span className="px-4 py-2">{user.displayName}</span>
              <Link to="/dashboard" className="btn btn-ghost w-full">
                Dashboard
              </Link>
              <button onClick={logout} className="btn btn-ghost w-full">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
