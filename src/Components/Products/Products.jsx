import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaTable, FaThLarge, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import PrimaryLoaderPage from "../../LoadingPages/PrimaryLoaderPage";
import useAuth from "../../Hooks/useAuth";
{motion}

const ProductsList = ({
  products,
  viewMode,
  expandedDesc,
  toggleDesc,
  currentPage,
  limit,
  voteMutation,
  user,
  refetch
}) => {
  return viewMode === "grid" ? (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.length === 0 ? (
        <p className="text-center col-span-full text-gray-700">
          No products found!
        </p>
      ) : (
        products.map((product) => {
          const upvotes = product.upVotes?.length || 0;
          const downvotes = product.downVotes?.length || 0;
          const hasUpvoted = product.upVotes?.includes(user?.email);
          const hasDownvoted = product.downVotes?.includes(user?.email);

          return (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="card bg-gradient-to-br from-white via-blue-50 to-sky-100 shadow-xl border border-blue-200 rounded-3xl p-4 hover:scale-105 transform transition-all"
            >
              <figure>
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-full h-48 object-cover rounded-2xl"
                />
              </figure>
              <div className="card-body p-3">
                <h2 className="text-xl font-bold text-blue-700 mb-1">
                  {product.productName}
                </h2>
                <p className="text-gray-600 text-sm mb-3">
                  {expandedDesc[product._id]
                    ? product.description
                    : product.description?.slice(0, 30) +
                      (product.description?.length > 30 ? "..." : "")}
                  {product.description?.length > 30 && (
                    <button
                      onClick={() => toggleDesc(product._id)}
                      className="text-blue-600 font-semibold ml-1"
                    >
                      {expandedDesc[product._id] ? "Show Less" : "See More"}
                    </button>
                  )}
                </p>

                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={product.ownerImage}
                    alt={product.ownerName}
                    className="w-8 h-8 rounded-full border-2 border-blue-400"
                  />
                  <span className="font-semibold text-gray-700 text-sm">
                    {product.ownerName}
                  </span>

                  {/* Upvote/Downvote */}
                  {user && (
                    <div className="flex gap-2 ml-auto">
                      <button
                        onClick={() =>
                          voteMutation.mutate({ id: product._id, type: "up" }, refetch())
                        }
                        className={`flex items-center gap-1 px-2 py-1 rounded-full border transition text-sm ${
                          hasUpvoted
                            ? "bg-green-100 text-green-700 border-green-400"
                            : "border-gray-300 hover:bg-green-50"
                        }`}
                      >
                        <FaThumbsUp /> {upvotes}
                      </button>

                      <button
                        onClick={() =>
                          voteMutation.mutate({ id: product._id, type: "down" } , refetch())
                        }
                        className={`flex items-center gap-1 px-2 py-1 rounded-full border transition text-sm ${
                          hasDownvoted
                            ? "bg-red-100 text-red-700 border-red-400"
                            : "border-gray-300 hover:bg-red-50"
                        }`}
                      >
                        <FaThumbsDown /> {downvotes}
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mt-2">
                  <Link
                    to={`/product/details/${product._id}`}
                    className="btn btn-sm btn-info rounded-full"
                  >
                    Details
                  </Link>
                  <a
                    href={product.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center gap-2"
                  >
                    Visit <FaExternalLinkAlt />
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })
      )}
    </div>
  ) : (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-blue-200">
      <table className="min-w-full border-collapse">
        <thead className="bg-blue-600 text-white text-lg">
          <tr>
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Product</th>
            <th className="px-4 py-2 border">Owner</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-gray-700 py-4">
                No products found!
              </td>
            </tr>
          ) : (
            products.map((product, index) => {
              const upvotes = product.upVotes?.length || 0;
              const downvotes = product.downVotes?.length || 0;
              const hasUpvoted = product.upVotes?.includes(user?.email);
              const hasDownvoted = product.downVotes?.includes(user?.email);

              return (
                <tr key={product._id} className="hover:bg-blue-50">
                  <td className="px-4 py-2 border text-center">
                    {(currentPage - 1) * limit + index + 1}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="w-16 h-16 object-cover rounded-xl mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2 border font-semibold text-blue-700 text-center">
                    {product.productName}
                  </td>
                  <td className="px-4 py-2 border text-center flex flex-col items-center gap-1">
                    <img
                      src={product.ownerImage}
                      alt={product.ownerName}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{product.ownerName}</span>

                    {/* Upvote/Downvote */}
                    {user && (
                      <div className="flex gap-1 mt-1">
                        <button
                          onClick={() =>
                            voteMutation.mutate({ id: product._id, type: "up" })
                          }
                          className={`flex items-center gap-1 px-2 py-1 rounded-full border text-xs ${
                            hasUpvoted
                              ? "bg-green-100 text-green-700 border-green-400"
                              : "border-gray-300 hover:bg-green-50"
                          }`}
                        >
                          <FaThumbsUp /> {upvotes}
                        </button>
                        <button
                          onClick={() =>
                            voteMutation.mutate({ id: product._id, type: "down" })
                          }
                          className={`flex items-center gap-1 px-2 py-1 rounded-full border text-xs ${
                            hasDownvoted
                              ? "bg-red-100 text-red-700 border-red-400"
                              : "border-gray-300 hover:bg-red-50"
                          }`}
                        >
                          <FaThumbsDown /> {downvotes}
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/products/${product._id}`}
                        className="btn btn-xs btn-info"
                      >
                        View
                      </Link>
                      <a
                        href={product.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-xs btn-success flex items-center gap-1"
                      >
                        Site <FaExternalLinkAlt className="text-sm" />
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

const Products = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = parseInt(searchParams.get("page")) || 1;
  const initialLimit = parseInt(searchParams.get("limit")) || 6;

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [expandedDesc, setExpandedDesc] = useState({});

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["products", currentPage, limit, debouncedSearch],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products?page=${currentPage}&limit=${limit}&search=${debouncedSearch}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const products = Array.isArray(data?.products) ? data.products : [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    setSearchParams({ page: currentPage, limit });
  }, [currentPage, limit, setSearchParams]);

  const toggleDesc = (id) => {
    setExpandedDesc((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // ✅ Vote Mutation
  const voteMutation = {
    mutate: async ({ id, type }) => {
      await axiosSecure.patch(`/product/vote/${id}`, {
        userEmail: user.email,
        type,
      });
      // Refresh products after vote
      refetch()
      setCurrentPage((prev) => prev); // trigger refetch
    },
  };

  return (
    <section className="min-h-screen bg-white py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold text-blue-700">🌟 All Products</h1>
          <input
            type="text"
            placeholder="Search products by tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full md:w-1/3 rounded-full shadow-md text-lg"
          />
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-3 rounded-full transition-all ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-blue-600 border border-blue-400"
              }`}
            >
              <FaThLarge size={20} />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-3 rounded-full transition-all ${
                viewMode === "table"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-blue-600 border border-blue-400"
              }`}
            >
              <FaTable size={20} />
            </button>
            <select
              value={limit}
              onChange={(e) => setLimit(parseInt(e.target.value))}
              className="select select-bordered rounded-full text-blue-700 ml-2"
            >
              <option value="6">6 / page</option>
              <option value="9">9 / page</option>
              <option value="12">12 / page</option>
              <option value="15">15 / page</option>
              <option value="18">18 / page</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <PrimaryLoaderPage />
        ) : isError ? (
          <p className="text-center text-red-600 text-xl">
            Failed to load products!
          </p>
        ) : (
          <ProductsList
            products={products}
            viewMode={viewMode}
            expandedDesc={expandedDesc}
            toggleDesc={toggleDesc}
            currentPage={currentPage}
            limit={limit}
            voteMutation={voteMutation}
                user={user}
                refetch={refetch}
          />
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-10 gap-2 flex-wrap items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-full border transition-all ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white text-blue-600 border-blue-400 hover:bg-blue-100"
            }`}
          >
            Prev
          </button>

          {(() => {
            const pages = [];
            const totalToShow = 3;
            let startPage = Math.max(1, currentPage - 1);
            let endPage = Math.min(totalPages, startPage + totalToShow - 1);

            if (endPage - startPage + 1 < totalToShow) {
              startPage = Math.max(1, endPage - totalToShow + 1);
            }

            if (startPage > 1) {
              pages.push(
                <button
                  key={1}
                  onClick={() => setCurrentPage(1)}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    currentPage === 1
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 hover:bg-blue-100"
                  }`}
                >
                  1
                </button>
              );
              if (startPage > 2) {
                pages.push(
                  <span key="start-ellipsis" className="px-2 py-2">
                    ...
                  </span>
                );
              }
            }

            for (let i = startPage; i <= endPage; i++) {
              pages.push(
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    currentPage === i
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 hover:bg-blue-100"
                  }`}
                >
                  {i}
                </button>
              );
            }

            if (endPage < totalPages) {
              if (endPage < totalPages - 1) {
                pages.push(
                  <span key="end-ellipsis" className="px-2 py-2">
                    ...
                  </span>
                );
              }
              pages.push(
                <button
                  key={totalPages}
                  onClick={() => setCurrentPage(totalPages)}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    currentPage === totalPages
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 hover:bg-blue-100"
                  }`}
                >
                  {totalPages}
                </button>
              );
            }

            return pages;
          })()}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-full border transition-all ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white text-blue-600 border-blue-400 hover:bg-blue-100"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;
