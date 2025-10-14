import React, { useState, useEffect } from "react";
import { FaUserShield, FaCrown } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [savingId, setSavingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔍 Live search effect with debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const query = searchQuery.trim();
      if (query.length > 0) {
        fetchUsers(query);
      } else {
        setUsers([]);
      }
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // 🧠 Fetch users by email regex
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

  // 🔄 Update UI immediately on select change
  const handleRoleChange = (id, newRole) => {
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
    );
  };

  // 💾 Save role update to server
  const handleSaveRole = async (user) => {
    setSavingId(user._id);
    try {
      const res = await axiosSecure.patch(`/users/${user._id}/role`, {
        role: user.role,
      });
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Role Updated!",
          text: `${user.email} is now a ${user.role}`,
          timer: 1800,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      Swal.fire("Error", "Failed to update role", {err});
    } finally {
      setSavingId(null);
    }
  };

  // 🗓️ Format date
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
    <div className="p-6 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-indigo-100 relative overflow-hidden">
        <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-8 flex justify-center items-center gap-3">
          <FaUserShield className="text-4xl text-indigo-500" />
          Manage Users
        </h2>

        {/* 🔍 Search Box */}
        <div className="relative w-full max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="Search by email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full shadow focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all"
          />
          {loading && (
            <span className="loading loading-spinner text-indigo-600 absolute right-3 top-3"></span>
          )}
        </div>

        {/* 🧾 User Table */}
        {users.length > 0 && (
          <div className="overflow-x-auto transition-all duration-500">
            <table className="table w-full border border-gray-100 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-indigo-100 text-indigo-800 text-sm">
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
                    className="hover:bg-indigo-50 transition duration-200"
                  >
                    <td>
                      <div className="avatar">
                        <div className="w-12 rounded-full ring ring-indigo-200 ring-offset-base-100 ring-offset-2">
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
                    <td className="text-gray-600">{user.email}</td>
                    <td className="text-gray-500">{formatDate(user.create_at)}</td>
                    <td>
                      <select
                        value={user.role || "user"}
                        onChange={(e) =>
                          handleRoleChange(user._id, e.target.value)
                        }
                        className={`select select-bordered select-sm ${
                          user.role === "admin"
                            ? "border-red-400 text-red-500"
                            : user.role === "moderator"
                            ? "border-yellow-400 text-yellow-500"
                            : "border-green-400 text-green-500"
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
                        className={`btn btn-sm ${
                          savingId === user._id
                            ? "btn-disabled"
                            : "btn-outline btn-success"
                        } flex items-center gap-2`}
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
        )}

        {/* 🫥 Empty / No result state */}
        {searchQuery && users.length === 0 && !loading && (
          <p className="text-center text-gray-500 mt-8 text-lg italic">
            No users found for "<span className="font-semibold">{searchQuery}</span>"
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
