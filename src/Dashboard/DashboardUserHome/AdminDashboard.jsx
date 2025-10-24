import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaUserShield,
  FaClipboardList,
  FaClock,
  FaTimes,
  FaCheckCircle,
  FaChartLine,
  FaPercentage,
  FaDollarSign,
  FaUserCog,
  FaUsersCog,
} from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import PrimaryLoaderPage from "../../LoadingPages/PrimaryLoaderPage";
{motion}

const COLORS = ["#facc15", "#f43f5e", "#22c55e", "#3b82f6"]; 

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard-stats");
      return res.data;
    },
  });

  if (isLoading) return <PrimaryLoaderPage/>;

  const {
    totalUsers = 0,
    totalModerators = 0,
    totalProducts = 0,
    pendingProducts = 0,
    rejectedProducts = 0,
    publishedProducts = 0,
  } = stats;

  const pieData = [
    { name: "Pending", value: pendingProducts },
    { name: "Rejected", value: rejectedProducts },
    { name: "Published", value: publishedProducts },
    { name: "Total", value: totalProducts },
  ];

  const approvalRate =
    totalProducts > 0 ? ((publishedProducts / totalProducts) * 100).toFixed(1) : 0;
  const rejectionRate =
    totalProducts > 0 ? ((rejectedProducts / totalProducts) * 100).toFixed(1) : 0;
  const estimatedRevenue = (publishedProducts * 120).toLocaleString();

  const gradientBorder = {
    background: "linear-gradient(270deg, #8b5cf6, #6366f1, #3b82f6, #a855f7)",
    backgroundSize: "400% 400%",
    animation: "gradientAnim 6s ease infinite",
    borderRadius: "1rem",
    padding: "2px",
  };

  return (
    <motion.div
      className="p-6 min-h-screen bg-gradient-to-br from-purple-500 via-indigo-800 to-blue-800 text-white rounded-4xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <style>
        {`
          @keyframes gradientAnim {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <motion.h2
        className="text-4xl font-bold mb-10 text-center flex items-center justify-center gap-3 text-transparent bg-clip-text bg-white"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span><FaUserCog className="text-white"/></span> Admin Dashboard 
      </motion.h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            title: "Total Users",
            value: totalUsers,
            icon: <FaUsers className="text-yellow-400" />,
            textColor: "text-yellow-300",
          },
          {
            title: "Moderators",
            value: totalModerators,
            icon: <FaUserShield className="text-red-400" />,
            textColor: "text-red-300",
          },
          {
            title: "Total Products",
            value: totalProducts,
            icon: <FaClipboardList className="text-green-400" />,
            textColor: "text-green-300",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            style={gradientBorder}
            className="relative"
          >
            <div className="bg-gradient-to-br from-purple-800 via-indigo-800 to-blue-800 rounded-2xl p-6 flex items-center justify-between shadow-xl">
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className={`text-3xl font-bold mt-2 ${item.textColor}`}>{item.value}</p>
              </div>
              <div className="text-4xl">{item.icon}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Product Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            title: "Pending",
            value: pendingProducts,
            icon: <FaClock className="text-yellow-400" />,
            textColor: "text-yellow-300",
          },
          {
            title: "Rejected",
            value: rejectedProducts,
            icon: <FaTimes className="text-red-400" />,
            textColor: "text-red-300",
          },
          {
            title: "Published",
            value: publishedProducts,
            icon: <FaCheckCircle className="text-green-400" />,
            textColor: "text-green-300",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            style={gradientBorder}
            className="relative"
          >
            <div className="bg-gradient-to-br from-purple-800 via-indigo-800 to-blue-800 rounded-2xl p-5 flex items-center justify-between shadow-xl">
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className={`text-3xl font-bold mt-2 ${item.textColor}`}>{item.value}</p>
              </div>
              <div className="text-4xl">{item.icon}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            title: "Approval Rate",
            value: approvalRate + "%",
            icon: <FaChartLine className="text-blue-400" />,
            textColor: "text-blue-300",
          },
          {
            title: "Rejection Rate",
            value: rejectionRate + "%",
            icon: <FaPercentage className="text-red-400" />,
            textColor: "text-red-300",
          },
          {
            title: "Estimated Revenue",
            value: "$" + estimatedRevenue,
            icon: <FaDollarSign className="text-green-400" />,
            textColor: "text-green-300",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            style={gradientBorder}
            className="relative"
          >
            <div className="bg-gradient-to-br from-purple-800 via-indigo-800 to-blue-800 rounded-2xl p-6 flex items-center gap-3 shadow-xl">
              <div className="text-4xl">{item.icon}</div>
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className={`text-3xl font-bold mt-1 ${item.textColor}`}>{item.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pie Chart */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        style={gradientBorder}
        className="relative mb-10"
      >
        <div className="bg-gradient-to-br from-purple-800 via-indigo-800 to-blue-800 rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-semibold mb-4 text-center">Product Status Distribution</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={130}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="cursor-pointer transition-transform duration-300 hover:scale-110"
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
