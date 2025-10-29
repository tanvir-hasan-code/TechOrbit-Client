import React, { useState, useEffect } from "react";
import { FaUserShield, FaCrown } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [savingId, setSavingEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  // Live search debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const query = searchQuery.trim();
      if (query.length > 0) fetchUsers(query);
      else setUsers([]);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const fetchUsers = async (query) => {
    try {
      setLoading(true);
      const res = await axiosSecure.get(`/users?email=${query}`);
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (id, newRole) => {
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
    );
  };

  const handleSaveRole = async (user) => {
    setSavingEmail(user.email);
    try {
      const res = await axiosSecure.patch(`/users/${user.email}/role`, {
        role: user.role,
      });
      if (res.data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "Role Updated!",
          text: `${user.email} is now a ${user.role}`,
          timer: 1800,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Error",
        text: `User Role not Update ${err}`,
        timer: 1800,
        showConfirmButton: false,
      });
    } finally {
      setSavingEmail(null);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 rounded-4xl min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border border-indigo-100 relative overflow-hidden">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-600 mb-8 flex justify-center items-center gap-3">
          <FaUserShield className="text-4xl sm:text-5xl text-indigo-500" />
          Manage Users
        </h2>

        {/* Search Box */}
        <div className="relative w-full max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="Search by email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-200 text-base sm:text-lg transition-all"
          />
          {loading && (
            <span className="loading loading-spinner text-indigo-600 absolute right-3 top-3"></span>
          )}
        </div>

        {/* Users Table or Cards */}
        {users.length > 0 && (
          <div className="grid gap-4 sm:gap-6 md:gap-8">
            <div className="hidden lg:block overflow-x-auto rounded-xl transition-all duration-500">
              <table className="table w-full border border-gray-100 shadow-sm">
                <thead className="bg-indigo-100 text-indigo-800 text-sm sm:text-base">
                  <tr>
                    <th>Profile</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Joined</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-indigo-50 transition-colors duration-200"
                    >
                      <td>
                        <div className="avatar">
                          <div className="w-12 sm:w-14 rounded-full ring ring-indigo-200 ring-offset-base-100 ring-offset-2">
                            <img
                              src={
                                user.photoURL ||
                                user.photo ||
                                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                              }
                              alt="User"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="font-medium text-gray-700">
                        {user.name || user.displayName || "Unknown"}
                      </td>
                      <td className="text-gray-600 text-sm sm:text-base">
                        {user.email}
                      </td>
                      <td className="text-gray-500 text-sm sm:text-base">
                        {formatDate(user.create_at)}
                      </td>
                      <td>
                        <select
                          value={user.role || "user"}
                          onChange={(e) =>
                            handleRoleChange(user._id, e.target.value)
                          }
                          className={`select select-bordered w-fit select-sm sm:select-md font-medium ${
                            user.role === "admin"
                              ? "border-red-400 text-red-600"
                              : user.role === "moderator"
                              ? "border-yellow-400 text-yellow-600"
                              : "border-green-400 text-green-600"
                          }`}
                        >
                          <option value="user">👤 User</option>
                          <option value="moderator">🛠 Moderator</option>
                          <option value="admin">👑 Admin</option>
                        </select>
                      </td>
                      <td>
                        <button
                          onClick={() => handleSaveRole(user)}
                          disabled={savingId === user._id}
                          className={`btn btn-sm sm:btn-md flex items-center gap-2 ${
                            savingId === user._id
                              ? "btn-disabled"
                              : "btn-outline btn-success"
                          }`}
                        >
                          {savingId === user._id ? (
                            <span className="loading loading-spinner loading-sm"></span>
                          ) : (
                            <FaCrown />
                          )}
                          {savingId === user._id ? "Saving..." : "Save"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden flex flex-col gap-4">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="bg-indigo-50 rounded-xl p-4 shadow-md flex flex-col gap-2"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring ring-indigo-200 ring-offset-base-100">
                      <img
                        src={
                          user.photoURL ||
                          user.photo ||
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">
                        {user.name || user.displayName || "Unknown"}
                      </p>
                      <p className="text-gray-600 text-sm">{user.email}</p>
                      <p className="text-gray-500 text-xs">
                        Joined: {formatDate(user.create_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <select
                      value={user.role || "user"}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className={`select select-bordered select-sm font-medium ${
                        user.role === "admin"
                          ? "border-red-400 text-red-600"
                          : user.role === "moderator"
                          ? "border-yellow-400 text-yellow-600"
                          : "border-green-400 text-green-600"
                      }`}
                    >
                      <option value="user">👤 User</option>
                      <option value="moderator">🛠 Moderator</option>
                      <option value="admin">👑 Admin</option>
                    </select>
                    <button
                      onClick={() => handleSaveRole(user)}
                      disabled={savingId === user._id}
                      className={`btn btn-sm btn-outline btn-success flex items-center gap-2`}
                    >
                      {savingId === user._id ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <FaCrown />
                      )}
                      {savingId === user._id ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {searchQuery && users.length === 0 && !loading && (
          <p className="text-center text-gray-500 mt-8 text-base sm:text-lg italic">
            No users found for "
            <span className="font-semibold">{searchQuery}</span>"
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
