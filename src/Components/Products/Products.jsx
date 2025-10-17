import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaTable, FaThLarge } from "react-icons/fa";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
{motion}

const Products = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = parseInt(searchParams.get("page")) || 1;
  const initialLimit = parseInt(searchParams.get("limit")) || 6;

  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", currentPage, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products?page=${currentPage}&limit=${limit}`
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

  const [expandedDesc, setExpandedDesc] = useState({}); // Track which card is expanded

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold text-blue-500">
        Loading Products...
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600 text-xl font-semibold">
        Failed to load products!
      </div>
    );

  if (!Array.isArray(products)) return <div>No products found!</div>;

  const filteredProducts = products.filter((product) =>
    product.productName?.toLowerCase().includes(search.toLowerCase())
  );

  const toggleDesc = (id) => {
    setExpandedDesc((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      className="min-h-screen bg-gradient-to-b from-sky-200 via-blue-100 to-indigo-200 py-12 relative overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(white 1px, transparent 1px), radial-gradient(white 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        backgroundPosition: "0 0, 20px 20px",
      }}
    >
      {/* Floating Clouds */}
      <motion.div
        className="absolute top-10 left-0 w-64 h-32 bg-white opacity-30 rounded-full blur-3xl"
        animate={{ x: [0, 100, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 right-0 w-80 h-40 bg-white opacity-20 rounded-full blur-3xl"
        animate={{ x: [0, -100, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold text-blue-700">🌟 All Products</h1>
          <input
            type="text"
            placeholder="Search products..."
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

        {/* Product Display */}
        {viewMode === "grid" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
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
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <Link
                      to={`/products/${product._id}`}
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
            ))}
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
                {filteredProducts.map((product, index) => (
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
                ))}
              </tbody>
            </table>
          </div>
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

          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .filter((page) => {
              return (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 2)
              );
            })
            .map((page, i, arr) => {
              if (i > 0 && page - arr[i - 1] > 1) {
                return (
                  <span key={page} className="px-2 py-2 text-gray-500">
                    ...
                  </span>
                );
              }
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    currentPage === page
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-blue-600 border-blue-400 hover:bg-blue-100"
                  }`}
                >
                  {page}
                </button>
              );
            })}

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
