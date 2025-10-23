import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { FaArrowUp, FaThumbsUp } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
{
  motion;
}

const FeaturedProducts = () => {
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  // ✅ Fetch Featured Products
  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const res = await axiosInstance.get("/featured-products");
      return res.data.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  // ✅ Handle Upvote
  const handleUpvote = async (product) => {
    if (!user) {
      toast.error("Please login to vote");
      return navigate("/login");
    }
    if (user?.email === product?.ownerEmail) {
      toast.error("You cannot upvote your own product");
      return;
    }

    try {
      const res = await axiosSecure.patch(`/product/vote/${product?._id}`, {
        userEmail: user?.email,
        type: "up",
      });
      if (res.data.success) {
        toast.success("Vote Updated!");
        refetch();
      } else {
        toast.error("You have already voted for this product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const sortedProducts = [...products]
    .filter((p) => p.isFeatured)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="my-10 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">
        🌟 Featured Products
      </h2>

      {sortedProducts.length < 4 ? (
        <p className="text-center text-gray-500">
          Not enough featured products yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {sortedProducts.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-500 rounded-xl shadow-lg overflow-hidden p-4 group hover:shadow-2xl transition-shadow duration-300 text-white"
            >
              {/* Circular Ring Light */}
              <div className="absolute inset-0 rounded-xl pointer-events-none">
                <div className="absolute top-1/2 left-1/2 w-[130%] h-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white border-dashed animate-spin-slow opacity-50"></div>
              </div>

              {/* Image + Title Flex */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white"
                />
                <h3
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="text-lg font-semibold hover:text-yellow-300 cursor-pointer"
                >
                  {product.productName}
                </h3>
              </div>

              <p className="text-white text-sm line-clamp-2">
                {product.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {product.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-white/20 text-white px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="btn btn-sm btn-outline btn-white flex-1"
                >
                  View Details
                </button>
                <a
                  href={product.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-white flex-1"
                >
                  Visit
                </a>
              </div>

              {/* Upvote */}
              <button
                onClick={() => handleUpvote(product)}
                disabled={user?.email === product?.ownerEmail}
                className={`btn btn-sm mt-2 flex items-center justify-center gap-2 ${
                  user?.email === product?.ownerEmail
                    ? "btn-disabled"
                    : "btn-outline btn-yellow-300"
                }`}
              >
                <FaThumbsUp />
                {product?.upVotes?.length || 0}
              </button>

              {/* Owner Info */}
              <div className="flex items-center gap-2 mt-3">
                <img
                  src={product.ownerImage}
                  alt={product.ownerName}
                  className="w-8 h-8 rounded-full object-cover border-2 border-white"
                />
                <span className="text-white text-sm">{product.ownerName}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;
