import React, { useState } from "react";
import {
  FaUser,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaHome,
  FaClipboardList,
  FaBars,
  FaClock,
  FaBox,
  FaTags,
  FaStar,
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import TechOrbitLogo from "../Shared/TechOrbitLogo/TechOrbitLogo";
import useUserRole from "../Hooks/useUserRole";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { role } = useUserRole();

  const navLink = (
    <ul className="menu p-2 mt-4 space-y-2">
      <li>
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 
        ${
          isActive
            ? "bg-black text-white shadow-md scale-[1.02]"
            : "text-gray-100 hover:bg-blue-600 hover:text-white"
        }`
          }
        >
          <FaHome /> {open && <span>Home</span>}
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 
        ${
          isActive
            ? "bg-black text-white shadow-md scale-[1.02]"
            : "text-gray-100 hover:bg-blue-600 hover:text-white"
        }`
          }
        >
          <FaUser /> {open && <span>My Profile</span>}
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/myProducts"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
              isActive
                ? "bg-black text-white shadow-md scale-[1.02]"
                : "text-gray-100 hover:bg-blue-600 hover:text-white"
            }`
          }
        >
          <FaBox /> {open && <span>My Products</span>}
        </NavLink>
      </li>

      {role === "admin" && (
        <li>
          <NavLink
            to="/dashboard/manage-users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 
        ${
          isActive
            ? "bg-black text-white shadow-md scale-[1.02]"
            : "text-gray-100 hover:bg-blue-600 hover:text-white"
        }`
            }
          >
            <FaUsers /> {open && <span>Manage Users</span>}
          </NavLink>
        </li>
      )}

      {["admin", "moderator"].includes(role) && (
        <>
          <li>
            <NavLink
              to="/dashboard/pending-post"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 
        ${
          isActive
            ? "bg-black text-white shadow-md scale-[1.02]"
            : "text-gray-100 hover:bg-blue-600 hover:text-white"
        }`
              }
            >
              <FaClock />
              {open && <span>Pending Post</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/reports"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 
        ${
          isActive
            ? "bg-black text-white shadow-md scale-[1.02]"
            : "text-gray-100 hover:bg-blue-600 hover:text-white"
        }`
              }
            >
              <FaClipboardList /> {open && <span>Report Posts</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/create-featured-product"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 
      ${
        isActive
          ? "bg-black text-white shadow-md scale-[1.02]"
          : "text-gray-100 hover:bg-blue-600 hover:text-white"
      }`
              }
            >
              <FaStar /> {open && <span>Create Featured Product</span>}
            </NavLink>
          </li>
        </>
      )}

      <li>
        <NavLink
          to="/dashboard/coupons"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 
        ${
          isActive
            ? "bg-black text-white shadow-md scale-[1.02]"
            : "text-gray-100 hover:bg-blue-600 hover:text-white"
        }`
          }
        >
          <FaTags /> {open && <span> Coupons</span>}
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/analytics"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 
        ${
          isActive
            ? "bg-black text-white shadow-md scale-[1.02]"
            : "text-gray-100 hover:bg-blue-600 hover:text-white"
        }`
          }
        >
          <FaChartBar /> {open && <span>Analytics</span>}
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 
        ${
          isActive
            ? "bg-black text-white shadow-md scale-[1.02]"
            : "text-gray-100 hover:bg-blue-600 hover:text-white"
        }`
          }
        >
          <FaCog /> {open && <span>Settings</span>}
        </NavLink>
      </li>
    </ul>
  );

  const handleLogout = () => {
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
    <div className="flex min-h-screen max-h-screen overflow-hidden bg-base-200 ">
      {/* Sidebar */}
      <div
        className={`${
          open ? "w-64" : "w-20"
        } hidden md:flex flex-col justify-between bg-gradient-to-b from-blue-600 to-indigo-700 text-white transition-all duration-300 shadow-2xl`}
      >
        {/* Top Section */}
        <div>
          {/* Logo & Toggle */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-indigo-500">
            {open && <TechOrbitLogo textColor="white" />}
            <button onClick={() => setOpen(!open)} className="text-white">
              <FaBars />
            </button>
          </div>

          {/* Menu Links */}
          <ul className="menu p-2 mt-4 space-y-1">{navLink}</ul>
        </div>

        {/* Bottom User Info */}
        <div className="p-4 border-t border-indigo-500 flex items-center gap-3">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="user"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          ) : (
            <div className="avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                <span>U</span>
              </div>
            </div>
          )}
          {open && (
            <div className="flex flex-col">
              <span className="font-semibold">{user?.displayName}</span>
              <span className="text-xs text-gray-200">{user?.email}</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="ml-auto bg-red-500 hover:bg-red-600 p-2 rounded-full"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute left-0 top-0 w-64 h-full bg-gradient-to-b from-blue-600 to-indigo-700 text-white shadow-2xl p-5 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex justify-between items-center mb-5">
                <TechOrbitLogo textColor="white" />
                <button onClick={() => setMobileOpen(false)}>
                  <FaBars />
                </button>
              </div>

              <ul className="menu space-y-2">
                <ul className="">{navLink}</ul>
              </ul>
            </div>

            <div className="border-t border-indigo-500 pt-4 flex items-center gap-3">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="user"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              ) : (
                <div className="avatar placeholder">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                    <span>U</span>
                  </div>
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-semibold">{user?.displayName}</span>
                <span className="text-xs text-gray-200">{user?.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="ml-auto bg-red-500 hover:bg-red-600 p-2 rounded-full"
              >
                <FaSignOutAlt />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="navbar bg-base-100 shadow-md px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-blue-600"
              onClick={() => setMobileOpen(true)}
            >
              <FaBars size={20} />
            </button>
            <h2 className="text-lg md:text-xl font-bold text-blue-700">
              Dashboard
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user?.photoURL} alt="User" />
              </div>
            </div>
            <p className="font-medium hidden md:block">{user?.displayName}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 md:p-6 w-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
