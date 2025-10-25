import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaBoxOpen, FaEdit, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import PrimaryLoaderPage from "../../LoadingPages/PrimaryLoaderPage";
import useAuth from "../../Hooks/useAuth";
import { Link, NavLink } from "react-router";
import useTitle from "../../Hooks/useTitle";
{
  motion;
}

const MyProducts = () => {
	useTitle("My-Products")
  const { user } = useAuth();
  const userEmail = user?.email;
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [isChanged, setIsChanged] = useState(false);

  // ✅ Fetch My Products
  const { data = [], isLoading } = useQuery({
    queryKey: ["myProducts", userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/product/myProducts/${userEmail}`);
      return res.data;
    },
  });

  console.log(data);

  // ✅ Delete Product
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/product/${id}`);
      return res.data;
    },
    onSuccess: (res) => {
      if (res?.success) {
        queryClient.invalidateQueries(["myProducts"]);
        Swal.fire("✅ Deleted!", "Your product has been deleted.", "success");
      } else {
        Swal.fire("⚠️ Error!", "Failed to delete product.", "error");
      }
    },
    onError: () => {
      Swal.fire("❌ Error!", "Something went wrong while deleting.", "error");
    },
  });

  // ✅ Update Product
  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedProduct }) => {
      const res = await axiosSecure.patch(
        `/product/update/${id}`,
        updatedProduct
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myProducts"]);
      Swal.fire("✅ Updated!", "Product updated successfully!", "success");
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
      confirmButtonColor: "#ef4444",
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
      className="p-6 min-h-screen w-[90vw] rounded-4xl md:w-[65vw] lg:w-full mx-auto bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-4xl font-extrabold text-center mb-6  bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-blue-500 drop-shadow-md">
        🌈 My Products
      </h2>

      <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-2xl">
        <div className="overflow-y-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white uppercase sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-center">#</th>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3 text-center">Votes</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((product, index) => (
                  <motion.tr
                    key={product._id}
                    className="border-b hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="px-4 py-3 text-center font-semibold text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img
                        src={product.productImage}
                        alt={product.productName}
                        className="w-10 h-10 rounded-lg border object-cover"
                      />
                      <span className="font-medium text-gray-800">
                        <Link to={`/product/details/${product._id}`} className="hover:link">{product.productName}</Link>
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
                      <div className="flex flex-row justify-center gap-2">
                        <button
                          onClick={() => openUpdateModal(product)}
                          className="px-3 flex py-1.5 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-md"
                        >
                          <FaEdit className="inline mr-1" /> Update
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="px-3 py-1.5 flex rounded-lg font-semibold text-white bg-gradient-to-r from-pink-500 via-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 transition-all duration-300 shadow-md"
                        >
                          <FaTrashAlt className="inline mr-1" /> Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                      <FaBoxOpen className="text-6xl mb-4 text-blue-400" />
                      <h3 className="text-2xl font-semibold">
                        No Products Found!
                      </h3>
                      <p className="text-sm mt-2">
                        You haven’t added any products yet.
                      </p>
                      <NavLink
                        to="/add-product"
                        className="mt-4 btn btn-sm bg-blue-600 text-white rounded-full hover:bg-blue-700"
                      >
                        + Add New Product
                      </NavLink>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🟦 Update Modal */}
      <dialog id="update_modal" className="modal">
        <div className="modal-box max-w-2xl bg-white rounded-2xl">
          <h3 className="font-bold text-2xl text-blue-700 mb-4 text-center">
            ✏️ Update Product Info
          </h3>

          {selectedProduct && (
            <div className="space-y-3">
              {[
                "productName",
                "productImage",
                "description",
                "tags",
                "externalLink",
              ].map((field) => (
                <div key={field}>
                  <label className="font-semibold text-gray-700 capitalize">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  {field === "description" ? (
                    <textarea
                      name={field}
                      value={updatedData[field] || ""}
                      onChange={handleInputChange}
                      className="w-full textarea textarea-bordered mt-1"
                    />
                  ) : (
                    <input
                      type="text"
                      name={field}
                      value={updatedData[field] || ""}
                      onChange={handleInputChange}
                      className="w-full input input-bordered mt-1"
                    />
                  )}
                </div>
              ))}
              <div>
                <label className="font-semibold text-gray-700">Status</label>
                <input
                  type="text"
                  name="status"
                  value={updatedData.status || ""}
                  className="w-full input input-bordered mt-1"
                  disabled
                />
              </div>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog" className="flex gap-3">
              <button
                className="btn btn-error text-white"
                onClick={() => setSelectedProduct(null)}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={!isChanged}
                className={`px-4 py-2 rounded-lg text-white font-semibold shadow-md transition-all duration-300 ${
                  isChanged
                    ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:to-indigo-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
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
