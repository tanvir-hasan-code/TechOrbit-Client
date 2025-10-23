import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import PrimaryLoaderPage from "../../LoadingPages/PrimaryLoaderPage";

const CreateFeaturedProduct = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Fetch Published Products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["publishedProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/featured");
      return res.data?.data || [];
    },
  });

  // ✅ Toggle Featured Mutation
  const toggleFeaturedMutation = useMutation({
    mutationFn: async ({ productId, newStatus }) =>
      await axiosSecure.patch(`/products/featured/${productId}`, {
        isFeatured: newStatus,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["publishedProducts"]);
      Swal.fire("✅ Success!", "Product featured status updated.", "success");
    },
    onError: (err) => {
      console.log(err);
      Swal.fire("❌ Error", "Something went wrong!", "error");
    },
  });

  if (isLoading) return <PrimaryLoaderPage />;

  return (
	  <div className={` w-[90vw] md:w-[65vw] lg:w-full mx-auto`}>
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        Featured Products Management
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-blue-50 text-gray-700">
            <tr className="text-center">
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">Image</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Owner</th>
              <th className="px-4 py-2 border-b">Featured</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => (
              <tr key={prod._id} className="text-center hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">
                  <img
                    src={prod.productImage}
                    alt={prod.productName}
                    className="w-16 h-16 object-cover rounded-lg mx-auto"
                  />
                </td>
                <td className="px-4 py-2 border-b">{prod.productName}</td>
                <td className="px-4 py-2 border-b">
                  <div className="flex flex-col items-center">
                    <span className="font-medium">{prod.ownerName}</span>
                    <span className="text-gray-500 text-sm">{prod.ownerEmail}</span>
                  </div>
                </td>
                <td className="px-4 py-2 border-b">
                  {prod.isFeatured ? "✅ Featured" : "❌ Not Featured"}
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() =>
                      toggleFeaturedMutation.mutate({
                        productId: prod._id,
                        newStatus: !prod.isFeatured,
                      })
                    }
                    className={`px-4 py-2 rounded-lg text-white ${
                      prod.isFeatured
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } transition`}
                  >
                    {prod.isFeatured ? "Remove Featured" : "Set as Featured"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateFeaturedProduct;