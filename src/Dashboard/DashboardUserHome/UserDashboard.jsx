import React from "react";
import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaFlag,
  FaClipboardList,
  FaUserCircle,
  FaSyncAlt,
  FaStar,
  FaChartPie,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
{motion}

// Dummy data hook for TechOrbit style
const useUserDashboardData = () => {
  return {
    data: {
      userName: "Tanvir Hasan",
      publishedProducts: 20,
      pendingProducts: 5,
      reportedProducts: 3,
      rewardsPoints: 420,
      recentProducts: [
        { id: 1, name: "Adobe Photoshop", status: "Published", date: "2025-10-20" },
        { id: 2, name: "Final Cut Pro", status: "Pending", date: "2025-10-22" },
        { id: 3, name: "Canva AI Tools", status: "Reported", date: "2025-10-23" },
        { id: 4, name: "Adobe Premiere Pro", status: "Published", date: "2025-10-24" },
        { id: 5, name: "Figma", status: "Pending", date: "2025-10-25" },
      ],
      notifications: [
        { id: 1, message: "Your product Photoshop was approved!" },
        { id: 2, message: "New report on Canva AI Tools" },
        { id: 3, message: "Reward points updated: 50" },
      ],
    },
    isLoading: false,
    isError: false,
    refetch: () => {},
  };
};

const UserDashboard = () => {
  const { data: stats, isLoading, isError, refetch } = useUserDashboardData();

  if (isLoading) return (
    <div className="flex justify-center items-center h-[80vh]">
      <FaSyncAlt className="text-4xl text-indigo-500 animate-spin" />
    </div>
  );

  if (isError) return (
    <div className="text-center text-red-500 mt-10">
      ⚠️ Failed to load dashboard!
    </div>
  );

  const {
    userName,
    publishedProducts,
    pendingProducts,
    reportedProducts,
    rewardsPoints,
    recentProducts,
    notifications,
  } = stats;

  const cards = [
    {
      title: "Published Products",
      value: publishedProducts,
      icon: <FaBoxOpen className="text-white text-4xl" />,
      gradient: "from-indigo-500 to-blue-600",
    },
    {
      title: "Pending Products",
      value: pendingProducts,
      icon: <FaClipboardList className="text-white text-4xl" />,
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      title: "Reported Products",
      value: reportedProducts,
      icon: <FaFlag className="text-white text-4xl" />,
      gradient: "from-blue-500 to-purple-700",
    },
    {
      title: "Rewards Points",
      value: rewardsPoints,
      icon: <FaUserCircle className="text-white text-4xl" />,
      gradient: "from-green-400 to-teal-500",
    },
  ];

  const pieData = [
    { name: "Published", value: publishedProducts },
    { name: "Pending", value: pendingProducts },
    { name: "Reported", value: reportedProducts },
  ];

  const COLORS = ["#6366F1", "#8B5CF6", "#EF4444"]; // Indigo, Purple, Red

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaUserCircle className="text-indigo-600" /> Welcome, {userName}!
        </h1>
        <button
          onClick={refetch}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition"
        >
          <FaSyncAlt /> Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`p-6 rounded-2xl shadow-lg bg-gradient-to-r ${card.gradient} text-white hover:scale-105 transition-transform`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold opacity-90">{card.title}</h2>
                <p className="text-3xl font-bold mt-2">{card.value}</p>
              </div>
              {card.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts + Notifications */}
      <div className="grid md:grid-cols-2 gap-8 mt-10">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaChartPie className="text-indigo-600 text-2xl" /> Product Overview
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name} (${value})`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <FaFlag className="text-indigo-600" /> Notifications
          </h2>
          <ul className="divide-y divide-gray-200">
            {notifications.map((note) => (
              <li key={note.id} className="py-2 text-gray-700">{note.message}</li>
            ))}
            {notifications.length === 0 && (
              <p className="text-gray-500 text-center py-4">No notifications</p>
            )}
          </ul>
        </motion.div>
      </div>

      {/* Recent Products */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white rounded-2xl shadow-md p-6 mt-10"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaBoxOpen className="text-purple-600" /> Recent Products
        </h2>
        <ul className="divide-y divide-gray-200">
          {recentProducts.map((prod) => (
            <li key={prod.id} className="py-2 flex justify-between items-center text-gray-700">
              <span>{prod.name}</span>
              <span className={`text-sm font-semibold ${
                prod.status === "Pending" ? "text-yellow-600" :
                prod.status === "Reported" ? "text-red-600" : "text-green-600"
              }`}>{prod.status}</span>
              <span className="text-sm text-gray-500">{prod.date}</span>
            </li>
          ))}
          {recentProducts.length === 0 && (
            <p className="text-gray-500 text-center py-4">No recent products</p>
          )}
        </ul>
      </motion.div>
    </div>
  );
};

export default UserDashboard;
