import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import PrimaryLoaderPage from "../../LoadingPages/PrimaryLoaderPage";
{motion}

const ReportPost = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState(null);

  // 🔹 Fetch All Reports
  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reported-products");
      return res.data.data;
    },
  });

  // 🔹 Fetch Single Report (for modal) ✅
  const { data: singleReport = [], isLoading: reportLoading } = useQuery({
    queryKey: ["reportDetails", selectedId],
    queryFn: async () => {
      if (!selectedId) return [];
      const res = await axiosSecure.get(`/reported-products/${selectedId}`);
      return res.data.data; 
    },
    enabled: !!selectedId, 
  });

  console.log(singleReport);

  // 🔹 Delete Report
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/product/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["product"]);
      Swal.fire({
        title: "Deleted!",
        text: "Report has been deleted successfully.",
        icon: "success",
        timer: 2000,
      });
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the report. Try again.",
        icon: "error",
      });
    },
  });

  // 🔹 Handle Delete Confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete this report.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  // 🔹 Handle Modal Open
  const openModal = (id) => {
    setSelectedId(id);
    document.getElementById("report_modal").showModal();
  };

  // 🔹 Handle Modal Close
  const closeModal = () => {
    setSelectedId(null);
    document.getElementById("report_modal").close();
  };

  if (isLoading) return <PrimaryLoaderPage />;

  return (
    <motion.div
      className="p-4 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h2
        className="relative text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 mb-8 tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-6 py-2 text-black rounded-full bg-gradient-to-r from-blue-100 via-indigo-50 to-purple-100 shadow-sm border border-blue-200">
          🚨 Reported Posts
        </span>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 rounded-full mt-2"></div>
      </motion.h2>

      <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-lg">
        <div className="">
          <table className="w-full min-w-[900px] text-sm text-left border-collapse">
            <thead className="bg-blue-600 text-white uppercase sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Post Title</th>
                <th className="px-4 py-3">Reported By</th>
                <th className="px-4 py-3">Count</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {reports?.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No reports found.
                  </td>
                </tr>
              ) : (
                reports?.map((report, index) => (
                  <motion.tr
                    key={report._id}
                    className="border-b hover:bg-blue-50 transition"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="px-4 py-3 font-semibold">{index + 1}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={report.productImage}
                          alt={report.productName}
                          className="w-12 h-12 rounded-lg border object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-800">
                            {report.productName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {report.tags?.slice(0, 2).join(", ")}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 flex flex-col">
                      {report.ownerName}
                      <br /> {report.ownerEmail}
                    </td>
                    <td className="px-4 py-3 text-gray-700 truncate max-w-[200px]">
                      {report.reportedUsers?.length || 0}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium text-white bg-red-700`}
                      >
                        Reported
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className=" flex items-center justify-center gap-2">
                        <button
                          onClick={() => openModal(report._id)}
                          className="btn btn-sm bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white border-none rounded-lg"
                        >
                          <FaEye /> View
                        </button>
                        <button
                          onClick={() => handleDelete(report._id)}
                          className="btn btn-sm bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white border-none rounded-lg"
                        >
                          <FaTrashAlt /> Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔹 DaisyUI Modal */}
      <dialog id="report_modal" className="modal">
        <div className="modal-box max-w-xl bg-white">
          <h3 className="font-bold text-2xl text-blue-700 mb-6 text-center">
            Reported Users
          </h3>

          {reportLoading ? (
            <div className="flex justify-center items-center py-8">
              <span className="loading loading-spinner text-blue-600"></span>
            </div>
          ) : singleReport?.length > 0 ? (
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {singleReport.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center  gap-4 p-3 border rounded-lg hover:bg-blue-50 transition"
                >
                  <img
                    src={user.userPhoto}
                    alt={user.userName}
                    className="w-12 h-12 rounded-full border-2 border-blue-200 object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      {user.userName}
                    </p>
                    <p className="text-sm text-gray-500">{user.userEmail}</p>
                  </div>
                  <p className="text-xs text-gray-400">
                    {new Date(user.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-6">No reports found.</p>
          )}

          <div className="modal-action mt-4">
            <button
              onClick={closeModal}
              className="btn btn-ghost w-full md:w-auto"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </motion.div>
  );
};

export default ReportPost;
