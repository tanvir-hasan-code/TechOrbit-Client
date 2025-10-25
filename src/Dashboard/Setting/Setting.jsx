import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaSun,
  FaMoon,
  FaDesktop,
  FaBell,
  FaTrashAlt,
  FaUserShield,
  FaLanguage,
  FaCloudUploadAlt,
  FaVolumeUp,
  FaLock,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useTitle from "../../Hooks/useTitle";
{
  motion;
}

const Setting = () => {
	useTitle("Settings")
  const { user, logOut, deleteAccount } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [accountType, setAccountType] = useState("user");
  const [language, setLanguage] = useState("English");
  const [privacy, setPrivacy] = useState("public");
  const [autoBackup, setAutoBackup] = useState(false);
  const [sound, setSound] = useState(true);
  const [twoFA, setTwoFA] = useState(false);

  // 🔹 Load existing theme & notification from backend
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await axiosSecure.get(`/users/settings/${user?.email}`);
        if (res.data) {
          setTheme(res.data?.theme || "light");
          setNotifications(res.data?.notifications ?? true);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    if (user?.email) loadSettings();
  }, [user, axiosSecure]);

  // 🔹 Save theme & notification to backend
  const handleSave = async () => {
    try {
      const settingsData = { theme, notifications };
      await axiosSecure.put(`/users/settings/${user?.email}`, settingsData);
      Swal.fire({
        icon: "success",
        title: "Settings Updated!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Failed to update settings", "error");
    }
  };

  // 🔹 Delete account
const handleDeleteAccount = async () => {
  Swal.fire({
    title: "Are you sure?",
    text: "Your account will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then( async(result) => {
    if (result.isConfirmed) {
      try {
        // 1️⃣ Delete from MongoDB
        await axiosSecure.delete(`/users/${user?.email}`);

        // 2️⃣ Delete from Firebase
        await deleteAccount();

        // 3️⃣ Logout
        await logOut();

        Swal.fire("Deleted!", "Your account has been deleted.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete your account", "error");
      }
    }
  });
};


  return (
    <motion.div
      className="p-6 min-h-screen rounded-4xl bg-gradient-to-br from-indigo-50 via-white to-blue-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-8">
        ⚙️ Application Settings
      </h2>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-blue-100 space-y-8">
        {/* 🌗 Theme Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaSun className="text-yellow-500" /> Theme Preference
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {["light", "dark", "system"].map((mode) => (
              <button
                key={mode}
                onClick={() => setTheme(mode)}
                className={`flex flex-col items-center justify-center py-4 rounded-2xl border transition-all ${
                  theme === mode
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-gray-50 hover:bg-blue-50 text-gray-700"
                }`}
              >
                {mode === "light" && <FaSun size={22} />}
                {mode === "dark" && <FaMoon size={22} />}
                {mode === "system" && <FaDesktop size={22} />}
                <span className="capitalize mt-1">{mode}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 🔔 Notifications */}
        <div className="flex items-center justify-between bg-gray-50 p-4 border rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <FaBell className="text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              Enable Notifications
            </h3>
          </div>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="toggle toggle-primary"
          />
        </div>

        {/* 👤 Account Type */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <FaUserShield className="text-blue-600" /> Account Type
          </h3>
          <select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            className="w-full border p-2 rounded-lg focus:ring focus:ring-blue-200"
          >
            <option value="user">🧍 User</option>
            <option value="moderator">🧑‍⚖️ Moderator</option>
            <option value="admin">👑 Admin</option>
          </select>
        </div>

        {/* 🌐 Language */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <FaLanguage className="text-green-600" /> Language
          </h3>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border p-2 rounded-lg focus:ring focus:ring-blue-200"
          >
            <option>English</option>
            <option>বাংলা</option>
            <option>Arabic</option>
          </select>
        </div>

        {/* 🔒 Privacy */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Profile Privacy
          </h3>
          <select
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
            className="w-full border p-2 rounded-lg focus:ring focus:ring-blue-200"
          >
            <option value="public">🌍 Public</option>
            <option value="private">🔒 Private</option>
          </select>
        </div>

        {/* ☁️ Auto Backup */}
        <div className="flex items-center justify-between bg-gray-50 p-4 border rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <FaCloudUploadAlt className="text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              Enable Auto Backup
            </h3>
          </div>
          <input
            type="checkbox"
            checked={autoBackup}
            onChange={() => setAutoBackup(!autoBackup)}
            className="toggle toggle-secondary"
          />
        </div>

        {/* 🔊 Sound Effects */}
        <div className="flex items-center justify-between bg-gray-50 p-4 border rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <FaVolumeUp className="text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              App Sound Effects
            </h3>
          </div>
          <input
            type="checkbox"
            checked={sound}
            onChange={() => setSound(!sound)}
            className="toggle toggle-warning"
          />
        </div>

        {/* 🔐 Two Factor Auth */}
        <div className="flex items-center justify-between bg-gray-50 p-4 border rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <FaLock className="text-red-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              Enable 2FA Security
            </h3>
          </div>
          <input
            type="checkbox"
            checked={twoFA}
            onChange={() => setTwoFA(!twoFA)}
            className="toggle toggle-error"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-1 items-center mt-6">
          <button
            onClick={handleSave}
            className=" btn btn-sm  md:btn-md bg-blue-600 hover:bg-blue-700 text-white border-none rounded-lg px-6"
          >
            💾 Save Changes
          </button>
          <button
            onClick={handleDeleteAccount}
            className="btn btn-sm  md:btn-md bg-red-100 hover:bg-red-200 text-red-700 border-none rounded-lg px-6 flex items-center gap-2"
          >
            <FaTrashAlt /> Delete Account
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Setting;
