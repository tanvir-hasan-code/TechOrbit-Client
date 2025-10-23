import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useTitle from "../../Hooks/useTitle";
{
  motion;
}

const AddProduct = () => {
  useTitle("Add-Product")
  const { user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [tags, setTags] = useState([]);
  const axiosSecure = useAxiosSecure();

  // ✅ Form Submit Handler
  const onSubmit = async (data) => {
    const productData = {
      productName: data.productName,
      productImage: data.productImage,
      description: data.description,
      ownerName: user?.displayName,
      ownerImage: user?.photoURL,
      ownerEmail: user?.email,
      tags: tags,
      externalLink: data.externalLink,
      createdAt: new Date().toISOString(),
      status: "pending",
      isFeatured: false,
      upVotes: [],
      downVotes: [],
      isReported: [],
    };
    
    try {
      const res = await axiosSecure.post("/product", productData);

      if (res.data.insertedId) {
        Swal.fire({
          title: "✅ Product Added!",
          text: "Your product has been successfully added.",
          icon: "success",
          confirmButtonText: "Go to My Products",
          confirmButtonColor: "#3b82f6",
        }).then(() => {
          reset();
          setTags([]);
          navigate("/dashboard/myProducts");
        });
      } else {
        Swal.fire({
          title: "❌ Failed!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
      }
    } catch (err) {
      const error = err.response?.data?.message || "Unknown error occurred";
      Swal.fire({
        title: "⚠️ Error!",
        text: `${error}`,
        icon: "warning",
        confirmButtonColor: "#f59e0b",
      });
      console.error(err);
    }
  };

  return (
    <section className="py-12 bg-base-200 min-h-screen flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-3xl p-8 md:w-2/3 lg:w-1/2 w-full"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
          🚀 Add a New Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block font-semibold mb-1">Product Name *</label>
            <input
              type="text"
              {...register("productName", { required: true })}
              placeholder="Enter product name"
              className="input input-bordered w-full rounded-full"
              required
            />
          </div>

          {/* Product Image */}
          <div>
            <label className="block font-semibold mb-1">
              Product Image URL *
            </label>
            <input
              type="text"
              {...register("productImage", { required: true })}
              placeholder="https://example.com/image.png"
              className="input input-bordered w-full rounded-full"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1">Description *</label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Write a short description..."
              className="textarea textarea-bordered w-full rounded-2xl"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Owner Info */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-1">Owner Name</label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered w-full rounded-full bg-gray-100"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Owner Email</label>
              <input
                type="text"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full rounded-full bg-gray-100"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Owner Image</label>
              <input
                type="text"
                value={user?.photoURL || ""}
                readOnly
                className="input input-bordered w-full rounded-full bg-gray-100"
              />
            </div>
          </div>

          {/* ✅ Tags Input */}
          <div>
            <label className="block font-semibold mb-1">Tags</label>
            <ReactTagInput
              tags={tags}
              onChange={(newTags) => setTags(newTags)}
              placeholder="Type and press enter"
              editable={true}
            />
          </div>

          {/* External Link */}
          <div>
            <label className="block font-semibold mb-1">
              External Link (Optional)
            </label>
            <input
              type="text"
              {...register("externalLink")}
              placeholder="https://productwebsite.com"
              className="input input-bordered w-full rounded-full"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="btn btn-primary w-full rounded-full mt-4 text-lg font-semibold"
          >
            Add Product
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default AddProduct;
