import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaBoxOpen,
  FaFlag,
  FaSyncAlt,
  FaChartPie,
  FaClipboardList,
  FaUserShield,
  FaChartLine,
  FaCogs,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
{motion}

// ✅ Dummy Data
const dummyPendingProducts = [
  { _id: 1, name: "Organic Fish Feed", createdAt: "2025-10-22" },
  { _id: 2, name: "Eco Fertilizer", createdAt: "2025-10-21" },
  { _id: 3, name: "Fish Pond Netting", createdAt: "2025-10-20" },
];

const dummyReportedItems = [
  { _id: 1, productName: "Expired Fish Feed", reason: "Expired" },
  { _id: 2, productName: "Fake Fertilizer", reason: "Fraud" },
  { _id: 3, productName: "Low Quality Net", reason: "Damage" },
];

const dummyTopModerators = [
  { name: "Alice", reviews: 120 },
  { name: "Bob", reviews: 95 },
  { name: "Charlie", reviews: 85 },
];

const ModeratorDashboard = () => {
  const axiosSecure = useAxiosSecure();

  // ✅ Dashboard Stats
  const {
    data: stats = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["moderator-dashboard-stats"],
    queryFn: async () => {
      // API call
      const res = await axiosSecure.get("/moderator/dashboard-stats");
      return res.data;
    },
    initialData: {
      totalUsers: 320,
      pendingProducts: 15,
      reportedProducts: 8,
      approvedProducts: 150,
      publishedProducts: 300,
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <FaSyncAlt className="text-4xl text-indigo-500 animate-spin" />
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 mt-10">
        ⚠️ Failed to load dashboard stats!
      </div>
    );

  const {
    totalUsers,
    pendingProducts: pendingCount,
    reportedProducts,
    approvedProducts,
    publishedProducts,
  } = stats;

  const COLORS = ["#6366F1", "#8B5CF6", "#3B82F6", "#A855F7"];

  // 📊 Pie Chart Data
  const pieData = [
    { name: "Pending", value: pendingCount },
    { name: "Reported", value: reportedProducts },
    { name: "Published", value: publishedProducts },
  ];

  // 📈 Bar Chart Data
  const barData = [
    { name: "Mon", products: 20 },
    { name: "Tue", products: 35 },
    { name: "Wed", products: 50 },
    { name: "Thu", products: 40 },
    { name: "Fri", products: 65 },
    { name: "Sat", products: 30 },
    { name: "Sun", products: 55 },
  ];

  // 📉 Line Chart Data (Weekly Reports)
  const lineData = [
    { name: "Mon", reports: 5 },
    { name: "Tue", reports: 2 },
    { name: "Wed", reports: 7 },
    { name: "Thu", reports: 3 },
    { name: "Fri", reports: 4 },
    { name: "Sat", reports: 6 },
    { name: "Sun", reports: 3 },
  ];

  const cards = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: <FaUsers className="text-white text-4xl" />,
      gradient: "from-indigo-500 to-blue-600",
    },
    {
      title: "Pending Products",
      value: pendingCount,
      icon: <FaBoxOpen className="text-white text-4xl" />,
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      title: "Reported Products",
      value: reportedProducts,
      icon: <FaFlag className="text-white text-4xl" />,
      gradient: "from-blue-500 to-purple-700",
    },
    {
      title: "Approved Products",
      value: approvedProducts,
      icon: <FaCheckCircle className="text-white text-4xl" />,
      gradient: "from-indigo-600 to-purple-500",
    },
    {
      title: "Published Items",
      value: publishedProducts,
      icon: <FaChartLine className="text-white text-4xl" />,
      gradient: "from-blue-600 to-indigo-700",
    },
    {
      title: "System Health",
      value: "Excellent",
      icon: <FaCogs className="text-white text-4xl" />,
      gradient: "from-purple-600 to-blue-600",
    },
  ];

  return (
    <div className="p-6 md:p-10 rounded-4xl bg-gradient-to-br from-indigo-300 via-blue-400 to-purple-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaUserShield className="text-indigo-600" /> Moderator Dashboard
        </h1>
        <button
          onClick={refetch}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-transform"
        >
          <FaSyncAlt /> Refresh
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className={`p-6 rounded-2xl shadow-lg bg-gradient-to-r ${card.gradient} text-white hover:scale-105 transition-all`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold opacity-90">
                  {card.title}
                </h2>
                <p className="text-3xl font-bold mt-2">{card.value}</p>
              </div>
              {card.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-1 gap-8 mt-10">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <FaChartPie className="text-indigo-600" /> Product Overview
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name} (${value})`}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-md p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <FaChartLine className="text-blue-600" /> Weekly Product Activity
            </h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="products" fill="#6366F1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-md p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <FaFlag className="text-purple-600" /> Weekly Report Trends
            </h2>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="reports"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>

      {/* Recent Products & Reports */}
      <div className="grid lg:grid-cols-2 gap-8 mt-10">
        {/* Pending Products */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaClipboardList className="text-indigo-600" /> Recent Pending
            Products
          </h2>
          <ul className="divide-y divide-gray-200">
            {dummyPendingProducts.map((item) => (
              <li
                key={item._id}
                className="py-2 flex justify-between items-center text-gray-700"
              >
                <span>{item.name}</span>
                <span className="text-sm text-indigo-600">
                  {item.createdAt}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Reported Items */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaFlag className="text-red-500" /> Recent Reports
          </h2>
          <ul className="divide-y divide-gray-200">
            {dummyReportedItems.map((item) => (
              <li
                key={item._id}
                className="py-2 flex justify-between items-center text-gray-700"
              >
                <span>{item.productName}</span>
                <span className="text-sm text-red-600">{item.reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Top Moderators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 bg-white rounded-2xl shadow-md p-6"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaStar className="text-yellow-500" /> Top Moderators
        </h2>
        <ul className="divide-y divide-gray-200">
          {dummyTopModerators.map((mod, idx) => (
            <li
              key={idx}
              className="py-2 flex justify-between items-center text-gray-700"
            >
              <span>{mod.name}</span>
              <span className="font-semibold text-indigo-600">
                {mod.reviews} Reviews
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default ModeratorDashboard;
