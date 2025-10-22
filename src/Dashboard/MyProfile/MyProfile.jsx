import React, { useState } from "react";
import Swal from "sweetalert2";
// import { useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

// ✅ Payment Form Component (inside modal)
const PaymentForm = ({ setIsModalOpen, refetchUser }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const { user } = useAuth();

  const baseAmount = 100; 
  const finalAmount = baseAmount - (baseAmount * discount) / 100;

  // 🎟 Verify Coupon via Backend
  const handleApplyCoupon = async () => {
    if (!coupon.trim()) {
      Swal.fire("⚠️ Enter a coupon code", "", "warning");
      return;
    }

    setVerifying(true);
    try {
      const res = await axiosSecure.post("/coupons/verify", {
        code: coupon.trim(),
      });

      if (res.data.success) {
        const verifiedCoupon = res.data.data;
        const discountValue =
          verifiedCoupon.type === "percentage"
            ? verifiedCoupon.value
            : (verifiedCoupon.value / baseAmount) * 100; 

        setDiscount(discountValue);

        Swal.fire({
          icon: "success",
          title: "✅ Coupon Applied!",
          text: `You got ${
            verifiedCoupon.type === "percentage"
              ? `${verifiedCoupon.value}% off`
              : `$${verifiedCoupon.value} discount`
          }!`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      setDiscount(0);
      Swal.fire({
        icon: "error",
        title: "❌ Invalid Coupon",
        text: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setVerifying(false);
    }
  };

  // 💳 Handle Stripe Payment
  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    try {
      const res = await axiosSecure.post("/create-payment-intent", {
        amount: Math.round(finalAmount * 100),
      });
      const clientSecret = res.data.clientSecret;

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: user?.displayName || "Anonymous",
              email: user?.email || "noemail@example.com",
            },
          },
        }
      );

      if (error) throw new Error(error.message);

      if (paymentIntent.status === "succeeded") {
        try {
          await axiosSecure.post("/payment-success", {
            email: user.email,
            couponCode: coupon || null, 
          });
          refetchUser()
        } catch (err) {
          console.error("Backend update error:", err);
        }

        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: `You paid $${finalAmount.toFixed(2)}`,
          timer: 2000,
          showConfirmButton: false,
        });
        setIsModalOpen(false);
      }
    } catch (err) {
      Swal.fire("Payment Failed", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Coupon Code"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        className="input input-bordered w-full"
      />
      <button
        type="button"
        onClick={handleApplyCoupon}
        className={`btn btn-outline btn-sm ${verifying ? "loading" : ""}`}
        disabled={verifying}
      >
        {verifying ? "Verifying..." : "Apply Coupon"}
      </button>

      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <p className="text-center mt-2">
        Total:{" "}
        <span className="font-semibold text-purple-600">
          ${finalAmount.toFixed(2)}{" "}
          {discount > 0 && (
            <span className="text-sm text-green-500">
              ({discount.toFixed(0)}% off)
            </span>
          )}
        </span>
      </p>

      <button
        type="submit"
        className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : `Pay $${finalAmount.toFixed(2)}`}
      </button>
    </form>
  );
};

// ✅ Main Component
const MyProfile = () => {
  const { user, updateUserProfile } = useAuth();
  // const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (e) => setPhotoFile(e.target.files[0]);

  const uploadImageToImgbb = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.data.url;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let finalPhotoURL = photoURL;
      if (photoFile) finalPhotoURL = await uploadImageToImgbb(photoFile);
      await updateUserProfile({ displayName, photoURL: finalPhotoURL });
      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const { data: currentUser = {}, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
  });

  const isFormChanged = displayName !== user?.displayName || photoFile !== null;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="card w-full lg:w-1/2 bg-base-100 shadow-xl border border-gray-200">
        <div className="card-body items-center text-center">
          <div className="avatar">
            <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  photoFile
                    ? URL.createObjectURL(photoFile)
                    : user?.photoURL ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                }
                alt="Profile"
              />
            </div>
          </div>

          <h2 className="mt-4 text-2xl font-bold text-blue-600">
            {displayName || "User Name"}
          </h2>
          <p className="text-gray-500">{user?.email}</p>

          {currentUser?.isVerified ? (
            <button
              disabled
              className="mt-3 btn bg-gradient-to-r from-yellow-400 to-orange-500 border-none text-white font-semibold"
            >
              🌟 Premium Member
            </button>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-3 btn bg-gradient-to-r from-purple-500 to-pink-500 border-none text-white font-semibold"
            >
              Subscribe Now $100
            </button>
          )}

          <form
            onSubmit={handleUpdateProfile}
            className="w-full mt-6 space-y-4 px-2"
          >
            <input
              type="text"
              defaultValue={user?.displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter your name"
            />
            <input
              type="text"
              defaultValue={user?.email}
              readOnly
              className="input input-bordered w-full"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full"
            />
            <button
              type="submit"
              className={`btn btn-primary w-full md:w-1/2 ${
                !isFormChanged || loading ? "btn-disabled" : ""
              }`}
              disabled={!isFormChanged || loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>

      {/* ✅ Stripe Payment Modal */}
      {isModalOpen && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-center">
              💳 Premium Upgrade
            </h3>
            <p className="py-4 text-center">
              Upgrade to{" "}
              <span className="font-semibold text-purple-600">Premium</span> for
              only <b>$100</b>!
            </p>

            <Elements stripe={stripePromise}>
              <PaymentForm setIsModalOpen={setIsModalOpen} refetchUser={refetch} />
            </Elements>

            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyProfile;
