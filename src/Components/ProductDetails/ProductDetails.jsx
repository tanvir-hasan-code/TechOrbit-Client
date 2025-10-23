import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaClock,
  FaTag,
  FaUser,
  FaExternalLinkAlt,
  FaCommentDots,
  FaThumbsUp,
  FaThumbsDown,
  FaFlag,
  FaEnvelope,
  FaArrowLeft,
  FaStar,
} from "react-icons/fa";
import Swal from "sweetalert2";
import PrimaryLoaderPage from "../../LoadingPages/PrimaryLoaderPage";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import RatingSlider from "../ProductDetails/RatingSlider/RatingSlider";

{
  motion;
}

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [commentRef, commentInView] = useInView({ threshold: 0.1 });

  React.useEffect(() => {
    if (inView || commentInView) controls.start({ opacity: 1, y: 0 });
  }, [controls, inView, commentInView]);

  // ✅ Fetch Product
  const { data: product = {}, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/product/details/${id}`);
      return res.data;
    },
  });

  const { data: averageRating = 0 } = useQuery({
    queryKey: ["ratings", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/ratings/${id}`);
      return res.data.average;
    },
  });

  const { data: ratings = [] } = useQuery({
    queryKey: ["productRatings", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/product/ratings/${id}`);
      return res.data;
    },
  });

  // ✅ Fetch Comments
  const { data: comments = [] } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/${id}`);
      return res.data?.data || [];
    },
  });

  // ✅ Fetch Reports
  const { data: reports = [], refetch: refetchReports  } = useQuery({
    queryKey: ["reports", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reports/${id}`);
      return res.data?.data || [];
    },
  });

  // ✅ Add Comment
  const commentMutation = useMutation({
    mutationFn: async (newComment) =>
      await axiosSecure.post(`/comments/${id}`, newComment),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", id]);
      setCommentText("");
      Swal.fire("✅ Comment Added!", "", "success");
    },
  });

  // ✅ Vote Mutation
  const voteMutation = useMutation({
    mutationFn: async ({ type }) =>
      await axiosSecure.patch(`/product/vote/${id}`, {
        userEmail: user.email,
        type,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["productDetails", id]);
    },
  });

  // ✅ Report Mutation
  const reportMutation = useMutation({
    mutationFn: async () =>
      await axiosSecure.patch(`/product/report/${id}`, {
        userEmail: user.email,
        userName: user.displayName,
        userPhoto: user.photoURL,
      }),
    onSuccess: () => {
      refetchReports()
      queryClient.invalidateQueries(["reports", id]);
      Swal.fire("Report updated", "", "info");
    },
  });

  // ✅ Rating Mutation
  const ratingMutation = useMutation({
    mutationFn: async ({ rating, message }) =>
      await axiosSecure.post(`/ratings/${id}`, {
        productId: id,
        rating,
        message,
        userEmail: user.email,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["productDetails", id]);
      Swal.fire("⭐ Rating Submitted!", "", "success");
    },
  });

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!user)
      return Swal.fire("Login Required", "Please login to comment.", "warning");
    if (!commentText.trim())
      return Swal.fire("Empty Comment", "Please write something.", "info");

    const newComment = {
      productId: id,
      userName: user.displayName,
      userPhoto: user.photoURL,
      message: commentText,
      createdAt: new Date(),
    };
    commentMutation.mutate(newComment);
  };

  if (isLoading) return <PrimaryLoaderPage />;

  const upvotes = product.upVotes?.length || 0;
  const downvotes = product.downVotes?.length || 0;
  const hasUpvoted = product.upVotes?.includes(user?.email);
  const hasDownvoted = product.downVotes?.includes(user?.email);
  const hasReported = reports?.some((r) => r.userEmail === user?.email);

  // User rating check
  const userRating = product.ratings?.find((r) => r.userEmail === user?.email);
  const userHasRated = !!userRating;

  return (
    <motion.div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      {/* 🔙 Back Button */}
      <div className="max-w-5xl mx-auto mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-full transition"
        >
          <FaArrowLeft className="text-sm" /> Back to Products
        </button>
      </div>

      {/* Product Card */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={controls}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={product.productImage}
            alt={product.productName}
            className="w-full md:w-64 h-64 object-contain rounded-xl border"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-blue-700 mb-2">
              {product.productName}
            </h2>
            <p className="text-gray-700 mb-3">{product.description}</p>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <FaUser className="text-blue-500" /> {product.ownerName}
              </span>
              <span className="flex items-center gap-1">
                <FaEnvelope className="text-blue-500" /> {product.ownerEmail}
              </span>
              <span className="flex items-center gap-1">
                <FaClock className="text-blue-500" />{" "}
                {new Date(product.createdAt).toLocaleDateString()}
              </span>
              <a
                href={product.externalLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-blue-600 underline"
              >
                <FaExternalLinkAlt /> Visit Project
              </a>
            </div>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              {product.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full flex items-center gap-1"
                >
                  <FaTag /> {tag}
                </span>
              ))}
            </div>

            {/* Status + Voting + Report */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : product.status === "published"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                Status: {product.status}
              </span>

              {user?.email !== product?.ownerEmail && (
                <div className="flex items-center gap-3 ml-auto">
                  <button
                    onClick={() => voteMutation.mutate({ type: "up" })}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full border transition ${
                      hasUpvoted
                        ? "bg-green-100 text-green-700 border-green-400"
                        : "border-gray-300 hover:bg-green-50"
                    }`}
                  >
                    <FaThumbsUp /> {upvotes}
                  </button>
                  <button
                    onClick={() => voteMutation.mutate({ type: "down" })}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full border transition ${
                      hasDownvoted
                        ? "bg-red-100 text-red-700 border-red-400"
                        : "border-gray-300 hover:bg-red-50"
                    }`}
                  >
                    <FaThumbsDown /> {downvotes}
                  </button>
                  <button
                    onClick={() => reportMutation.mutate()}
                    disabled={hasReported || reportMutation.isLoading}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full border transition ${
                      hasReported
                        ? "bg-gray-200 text-gray-600 border-gray-400"
                        : "border-red-300 text-red-600 hover:bg-red-50"
                    }`}
                  >
                    <FaFlag /> {hasReported ? "Reported" : "Report"}
                  </button>
                </div>
              )}
            </div>

            {/* ⭐ Rating Section */}
            <div className="mt-4 border-t border-gray-300 pt-3">
              <p className="text-sm text-gray-600 mb-1">
                Average Rating: {averageRating} / 5
              </p>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = userHasRated
                    ? userRating.rating >= star
                    : selectedRating >= star;
                  return (
                    <FaStar
                      key={star}
                      className={`text-2xl ${
                        isFilled ? "text-yellow-500" : "text-gray-300"
                      } cursor-pointer transition`}
                      onClick={async () => {
                        if (!user)
                          return Swal.fire(
                            "Login Required",
                            "Please login to rate.",
                            "warning"
                          );
                        if (userHasRated) return; // disable if already rated

                        const { value: message } = await Swal.fire({
                          title: `Rate ${star} Star${star > 1 ? "s" : ""}`,
                          input: "textarea",
                          inputLabel: "Message (optional)",
                          inputPlaceholder:
                            "Write something about your rating...",
                          showCancelButton: true,
                        });

                        if (message !== undefined) {
                          setSelectedRating(star); // UI update before DB
                          ratingMutation.mutate({ rating: star, message });
                        }
                      }}
                    />
                  );
                })}
              </div>

              {userHasRated && userRating && (
                <p className="text-sm text-green-600 mt-1">
                  ✅ You rated {userRating.rating} Star
                  {userRating.rating > 1 ? "s" : ""}: "{userRating.message}"
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <RatingSlider ratings={ratings}></RatingSlider>

      

      {/* 💬 Comments Section */}
      <motion.div
        ref={commentRef}
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-5xl mx-auto mt-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
      >
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-700">
          <FaCommentDots /> Comments ({comments?.length})
        </h3>

        <div className="space-y-4 mb-6 max-h-[300px] overflow-auto pr-2">
          {comments?.length === 0 ? (
            <p className="text-gray-500 text-center">No comments yet.</p>
          ) : (
            comments.map((cmt) => (
              <motion.div
                key={cmt._id}
                className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex gap-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={cmt.userPhoto}
                  alt={cmt.userName}
                  className="w-10 h-10 rounded-full border object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800">{cmt.userName}</p>
                  <p className="text-sm text-gray-700">{cmt.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(cmt.createdAt).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {user && (
          <form
            onSubmit={handleAddComment}
            className="flex flex-col sm:flex-row items-start sm:items-end gap-3"
          >
            <textarea
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <button
              type="submit"
              disabled={commentMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
            >
              {commentMutation.isPending ? "Posting..." : "Post Comment"}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProductDetails;
