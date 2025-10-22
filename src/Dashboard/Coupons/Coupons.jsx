import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrash, FaTag, FaCalendarAlt, FaPercent, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import PrimaryLoaderPage from "../../LoadingPages/PrimaryLoaderPage";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useUserRole from "../../Hooks/useUserRole";

const Coupons = () => {
  const [code, setCode] = useState("");
  const axiosSecure = useAxiosSecure();
  const [type, setType] = useState("percentage");
  const [value, setValue] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
	const [usageLimit, setUsageLimit] = useState("");
	const { role } = useUserRole();


  const {
    data: coupons = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data || [];
    },
  });

  // 🔹 Create Coupon
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        code: code.toUpperCase(), // ✅ Always uppercase
        type,
        value: Number(value),
        expiryDate,
        usageLimit: Number(usageLimit) || null,
      };

      await axiosSecure.post("/coupon", payload);
      Swal.fire({
        icon: "success",
        title: "Coupon Created!",
        text: "Your coupon has been added successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      setCode("");
      setType("percentage");
      setValue("");
      setExpiryDate("");
      setUsageLimit("");
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed to Create Coupon!",
        text: "Please check your data and try again.",
        timer: 2500,
        showConfirmButton: false,
      });
    }
  };

  // 🔹 Delete Coupon
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/coupons/${id}`);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Coupon deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Could not delete the coupon.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  // 🌀 Loader
  if (isLoading) {
    return <PrimaryLoaderPage />;
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {role === "admin" && (
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">
              🏷️ Admin Coupons
            </h1>

            {/* Create Coupon Form */}
            <form
              onSubmit={handleCreate}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                ➕ Create New Coupon
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1 font-semibold text-gray-600">
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    required
                    className="input input-bordered w-full"
                    placeholder="e.g. DISCOUNT20"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-gray-600">
                    Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="select select-bordered w-full"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-gray-600">
                    Value
                  </label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                    className="input input-bordered w-full"
                    placeholder="e.g. 10 or 200"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-gray-600">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    required
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-gray-600">
                    Usage Limit (optional)
                  </label>
                  <input
                    type="number"
                    value={usageLimit}
                    onChange={(e) => setUsageLimit(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-6 bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
              >
                Create Coupon
              </button>
            </form>
          </div>
        )}

        {/* Coupon Cards */}
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">
          🧾 All Coupons
        </h2>

        {coupons?.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-lg font-medium">
            🚫 No Coupons Available
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {coupons.map((c) => (
              <div
                key={c._id}
                className="p-6 rounded-2xl shadow-md bg-gradient-to-br from-white to-blue-100 border border-blue-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-700 flex items-center gap-2">
                    <FaTag /> {c.code}
                  </h3>
                  {role === "admin" && (
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>

                <p className="flex items-center gap-2 text-gray-700 mt-1">
                  <FaPercent />{" "}
                  <span className="font-semibold capitalize">{c.type}</span> -{" "}
                  <span className="text-blue-600 font-semibold">
                    {c.type === "percentage"
                      ? `${c.value}%`
                      : `${c.value} $`}
                  </span>
                </p>

                <p className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                  <FaCalendarAlt /> Expires:{" "}
                  <span className="font-medium text-red-600">
                    {new Date(c.expiryDate).toLocaleDateString()}
                  </span>
                </p>

                {c.usageLimit && (
                  <p className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                    <FaUsers /> Limit:{" "}
                    <span className="font-semibold">{c.usageLimit}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Coupons;
