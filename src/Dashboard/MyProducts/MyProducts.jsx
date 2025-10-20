import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import PrimaryLoaderPage from "../../LoadingPages/PrimaryLoaderPage";
import useAuth from "../../Hooks/useAuth";

const MyProducts = () => {
  const { user } = useAuth();
  const userEmail = user?.email;
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [isChanged, setIsChanged] = useState(false);

  // Fetch My Products
  const { data = [], isLoading } = useQuery({
    queryKey: ["myProducts", userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/product/myProducts/${userEmail}`);
      return res.data;
    },
  });

  // Delete Product
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/product/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myProducts"]);
      Swal.fire("Deleted!", "Your product has been deleted.", "success");
    },
  });

  // Update Product
  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedProduct }) => {
      const res = await axiosSecure.patch(`/product/update/${id}`, updatedProduct);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myProducts"]);
      Swal.fire("Updated!", "Product updated successfully!", "success");
      setSelectedProduct(null);
      setIsChanged(false);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your product.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) deleteMutation.mutate(id);
    });
  };

  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setUpdatedData(product);
    setIsChanged(false);
    document.getElementById("update_modal").showModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...updatedData, [name]: value };
    setUpdatedData(newData);
    setIsChanged(JSON.stringify(newData) !== JSON.stringify(selectedProduct));
  };

  const handleUpdate = () => {
    updateMutation.mutate({
      id: selectedProduct._id,
      updatedProduct: updatedData,
    });
    document.getElementById("update_modal").close();
  };

  if (isLoading) return <PrimaryLoaderPage />;

  return (
    <motion.div
      className="p-4 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        My Products
      </h2>

      <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-lg">
        <div className="max-h-[400px] overflow-y-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-blue-600 text-white uppercase sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3 text-center">Votes</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product, index) => (
                <motion.tr
                  key={product._id}
                  className="border-b hover:bg-blue-50 transition"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="px-4 py-3 font-semibold">{index + 1}</td>
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="w-10 h-10 rounded-lg border object-cover"
                    />
                    <span className="font-medium text-gray-800">
                      {product.productName}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center font-semibold text-blue-600">
                    {product.voteCount || product.upVotes?.length || 0}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : product.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2 flex-wrap">
                      <button
                        onClick={() => openUpdateModal(product)}
                        className="btn btn-sm bg-blue-100 hover:bg-blue-200 text-blue-700 border-none rounded-lg"
                      >
                        <FaEdit /> Update
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-sm bg-red-100 hover:bg-red-200 text-red-700 border-none rounded-lg"
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🟦 DaisyUI Modal */}
      <dialog id="update_modal" className="modal">
        <div className="modal-box max-w-2xl bg-white">
          <h3 className="font-bold text-2xl text-blue-700 mb-4 text-center">
            Update Product Info
          </h3>

          {selectedProduct && (
            <div className="space-y-3">
              <div>
                <label className="font-semibold text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={updatedData.productName || ""}
                  onChange={handleInputChange}
                  className="w-full input input-bordered mt-1"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Product Image</label>
                <input
                  type="text"
                  name="productImage"
                  value={updatedData.productImage || ""}
                  onChange={handleInputChange}
                  className="w-full input input-bordered mt-1"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={updatedData.description || ""}
                  onChange={handleInputChange}
                  className="w-full textarea textarea-bordered mt-1"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={updatedData.tags || ""}
                  onChange={handleInputChange}
                  className="w-full input input-bordered mt-1"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">External Link</label>
                <input
                  type="text"
                  name="externalLink"
                  value={updatedData.externalLink || ""}
                  onChange={handleInputChange}
                  className="w-full input input-bordered mt-1"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Status</label>
                <input
                  type="text"
                  name="status"
                  value={updatedData.status || ""}
                  onChange={handleInputChange}
                  className="w-full input input-bordered mt-1"
                  disabled
                />
              </div>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog" className="flex gap-3">
              <button
                className="btn btn-ghost"
                onClick={() => setSelectedProduct(null)}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={!isChanged}
                className={`btn ${
                  isChanged ? "btn-primary" : "btn-disabled"
                } text-white`}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </motion.div>
  );
};

export default MyProducts;
