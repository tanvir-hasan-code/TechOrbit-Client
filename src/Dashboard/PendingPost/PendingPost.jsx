import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaEye, FaCheck, FaTimes, FaClock } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import PrimaryLoaderPage from "../../LoadingPages/PrimaryLoaderPage";
{
  motion;
}

const PendingPost = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 🔹 Fetch Pending Products
  const { data, isLoading } = useQuery({
    queryKey: ["pendingProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/pending");
      return res.data.data;
    },
  });

  // 🔹 Status Change Mutation
  const mutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/product/${id}/status`, { status });
      return res.data;
    },
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries(["pendingProducts"]);
      setSelectedProduct(null);
      Swal.fire({
        title:
          variables.status === "published"
            ? "✅ Product Published!"
            : "❌ Product Declined!",
        text:
          variables.status === "published"
            ? "The product has been successfully published."
            : "The product has been declined successfully.",
        icon: variables.status === "published" ? "success" : "error",
        confirmButtonColor:
          variables.status === "published" ? "#16a34a" : "#dc2626",
        timer: 2000,
      });
    },
    onError: () => {
      Swal.fire({
        title: "⚠️ Something went wrong!",
        text: "Please try again later.",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    },
  });

  // 🔹 Confirm action
  const confirmStatusChange = (id, status) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `You are about to ${status} this product.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: status === "published" ? "#16a34a" : "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${status}!`,
    }).then((result) => {
      if (result.isConfirmed) mutation.mutate({ id, status });
    });
  };

  // 🔹 Badge color based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "badge bg-yellow-100 text-yellow-700 border-yellow-400";
      case "published":
        return "badge bg-green-100 text-green-700 border-green-400";
      case "declined":
        return "badge bg-red-100 text-red-700 border-red-400";
      default:
        return "badge";
    }
  };

  if (isLoading) {
    return <PrimaryLoaderPage />;
  }

  if (data?.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No Data"
          className="w-28 mx-auto mb-4 opacity-80"
        />
        <h3 className="text-gray-500 text-lg font-medium">No Data Found</h3>
      </div>
    );
  }

  // 🧩 Main UI
  return (
    <motion.div
      className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-scroll  p-4 md:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2 mb-6">
        <FaClock className="text-blue-500" /> Pending Posts
      </h2>

      {/* 🖥️ Large Screen → Table */}

      {!isLoading && data && (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-lg">
          <table className="min-w-[1000px] overflow-scroll w-full text-sm">
            <thead className="bg-blue-600 text-white uppercase">
              <tr>
                <th className="px-3 py-3">#</th>
                <th className="px-3 py-3 text-left">Product</th>
                <th className="px-3 py-3 text-left">Owner</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((product, index) => (
                <motion.tr
                  key={product._id}
                  className="hover:bg-blue-50 transition border-b"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="px-3 py-3 font-semibold">{index + 1}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.productImage}
                        alt={product.productName}
                        className="w-12 h-12 rounded-lg border object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {product.productName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {product.tags?.slice(0, 2).join(", ")}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 flex items-center gap-2">
                    <img
                      src={product.ownerImage}
                      alt={product.ownerName}
                      className="w-8 h-8 rounded-full border"
                    />
                    <span className="text-gray-700">{product.ownerName}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={getStatusBadge(product.status)}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 flex text-center space-x-1">
                    <button
                      className="btn btn-sm bg-blue-100 hover:bg-blue-200 text-blue-700 border-none rounded-lg"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <FaEye /> View
                    </button>
                    <button
                      className="btn btn-sm bg-green-100 hover:bg-green-200 text-green-700 border-none rounded-lg"
                      onClick={() =>
                        confirmStatusChange(product._id, "published")
                      }
                    >
                      <FaCheck /> Published
                    </button>
                    <button
                      className="btn btn-sm bg-red-100 hover:bg-red-200 text-red-700 border-none rounded-lg"
                      onClick={() =>
                        confirmStatusChange(product._id, "declined")
                      }
                    >
                      <FaTimes /> Decline
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔹 Modal */}
      {selectedProduct && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl bg-white shadow-2xl rounded-2xl p-4 md:p-6 max-h-[90vh] overflow-auto">
            <h3 className="text-2xl font-bold mb-4 text-blue-700 border-b pb-2">
              {selectedProduct.productName}
            </h3>
            <div className="flex flex-col md:flex-row gap-4">
              <img
                src={selectedProduct.productImage}
                alt={selectedProduct.productName}
                className="w-full md:w-56 h-56 object-cover rounded-xl border"
              />
              <div className="flex-1 text-gray-700">
                <p className="mb-2">
                  <strong>Description:</strong> {selectedProduct.description}
                </p>
                <p className="mb-2">
                  <strong>Owner:</strong> {selectedProduct.ownerName}
                </p>
                <p className="mb-2">
                  <strong>Email:</strong> {selectedProduct.ownerEmail}
                </p>
                <p className="mb-2">
                  <strong>Status:</strong>{" "}
                  <span className={getStatusBadge(selectedProduct.status)}>
                    {selectedProduct.status}
                  </span>
                </p>
                <p className="mb-2">
                  <strong>External Link:</strong>{" "}
                  <a
                    href={selectedProduct.externalLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline break-words"
                  >
                    Visit
                  </a>
                </p>
                <p className="mb-2">
                  <strong>Tags:</strong>{" "}
                  {selectedProduct.tags?.join(", ") || "No tags"}
                </p>
              </div>
            </div>
            <div className="modal-action mt-6 flex flex-wrap gap-2 justify-end">
              <button
                className="btn bg-green-500 hover:bg-green-600 text-white border-none"
                onClick={() =>
                  confirmStatusChange(selectedProduct._id, "published")
                }
              >
                <FaCheck /> Publish
              </button>
              <button
                className="btn bg-red-500 hover:bg-red-600 text-white border-none"
                onClick={() =>
                  confirmStatusChange(selectedProduct._id, "declined")
                }
              >
                <FaTimes /> Decline
              </button>
              <button
                className="btn bg-gray-300 hover:bg-gray-400 text-gray-800 border-none"
                onClick={() => setSelectedProduct(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PendingPost;
