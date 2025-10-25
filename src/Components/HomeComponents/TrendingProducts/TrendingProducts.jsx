import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { FaThumbsUp, FaExternalLinkAlt, FaInfoCircle, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
{
  motion;
}

const TrendingProducts = () => {
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["trending-products"],
    queryFn: async () => {
      const res = await axiosInstance.get("/trending-products");
      return res.data.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  const handleUpvote = async (product) => {
    if (!user) {
      toast.error("Please login to vote");
      return navigate("/login");
    }
    if (user?.email === product?.ownerEmail) {
      toast.error("You cannot vote your own product");
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

  return (
    <div className="my-10 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">
        🔥 Trending Products
      </h2>

      {products?.length === 0 ? (
        <p className="text-center text-gray-500">No trending products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-gradient-to-br from-purple-700 via-pink-600 to-indigo-800 rounded-xl shadow-lg overflow-hidden p-4 group hover:shadow-2xl hover:scale-105 transition-transform duration-300 text-gray-900 flex flex-col gap-3"
            >
              {/* RGB Ring Light */}
              <div className="absolute inset-0 rounded-xl pointer-events-none">
                <div className="absolute top-1/2 left-1/2 w-[140%] h-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-t-red-400 border-r-yellow-400 border-b-green-400 border-l-blue-400 animate-spin-slow opacity-30 group-hover:border-t-pink-400 group-hover:border-r-purple-400 group-hover:border-b-cyan-400 group-hover:border-l-yellow-400 transition-colors duration-500"></div>
              </div>

              {/* Particle Rain Effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 10 }).map((_, idx) => (
                  <motion.div
                    key={idx}
                    className="absolute w-[2px] h-[8px] bg-white opacity-30 rounded"
                    initial={{ y: -20, x: Math.random() * 300 }}
                    animate={{ y: 200 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1 + Math.random(),
                      ease: "linear",
                      delay: Math.random(),
                    }}
                  />
                ))}
              </div>

              {/* Photo + Name flex in one line */}
              <div className="flex flex-row-reverse justify-between items-center gap-3 z-10">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white"
                />
                <h3
                  onClick={() => navigate(`/product/details/${product._id}`)}
                  className="text-md font-semibold hover:text-yellow-500 cursor-pointer"
                >
                  {product.productName}
                </h3>
              </div>

              {/* Rest info full width */}
              <motion.div
                className="flex-1 flex flex-col gap-2 z-10"
                animate={{ y: [0, 2, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <p className="text-gray-200 text-xs line-clamp-2">
                  {product.description}
                </p>

                <div className="flex flex-wrap gap-1 mt-1">
                  {product.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-white/20 text-gray-200 px-1 py-0.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-1 mt-2">
                  <button
                    onClick={() => navigate(`/product/details/${product._id}`)}
                    className="btn btn-xs btn-outline btn-gray-200 flex-1 gap-1"
                  >
                    <FaInfoCircle className="text-[12px]" />
                    View
                  </button>
                  <a
                    href={product.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-xs btn-gray-200 flex-1 gap-1"
                  >
                    <FaExternalLinkAlt className="text-[12px]" />
                    Visit
                  </a>
                </div>

                <button
                  onClick={() => handleUpvote(product)}
                  disabled={user?.email === product?.ownerEmail}
                  className={`btn btn-xs mt-2 flex items-center w-fit px-3 justify-center gap-1 ${
                    user?.email === product?.ownerEmail
                      ? "btn-disabled"
                      : "btn-outline btn-pink-400"
                  }`}
                >
                  <FaThumbsUp className="text-[12px]" />
                  {product?.upVotes?.length || 0}
                </button>

                <div className="flex items-center gap-2 mt-2">
                  <img
                    src={product.ownerImage}
                    alt={product.ownerName}
                    className="w-6 h-6 rounded-full object-cover border-2 border-white"
                  />
                  <span className="text-gray-200 text-xs">
                    {product.ownerName}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}
      <motion.div
        className="flex justify-center my-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Link to="/products">
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 25px rgba(168, 85, 247, 0.8)",
            }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg overflow-hidden transition-all duration-500"
          >
            <span className="relative z-10">See All Products</span>
            <FaArrowRight className="relative z-10" />
            {/* Gradient animation overlay */}
            <motion.span
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default TrendingProducts;
