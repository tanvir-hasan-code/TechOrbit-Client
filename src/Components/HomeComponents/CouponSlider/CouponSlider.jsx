import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import { FaTag, FaCalendarAlt, FaCopy } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import PrimaryLoaderPage from "../../../LoadingPages/PrimaryLoaderPage";
{motion}

const CouponSlider = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch coupons from backend
  const {
    data: coupons = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["homeCoupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data || [];
    },
  });

  if (isLoading) return <PrimaryLoaderPage />;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500 text-lg font-semibold">
        ❌ Failed to load coupons!
      </div>
    );
  if (!coupons.length)
    return (
      <div className="text-center py-10 text-gray-500 text-lg font-medium">
        🚫 No coupons available right now.
      </div>
    );

  return (
    <section className="my-10 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-700">
        🎁 Exclusive Discount Coupons
      </h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={15}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {coupons.map((coupon) => (
          <SwiperSlide key={coupon._id}>
            <CompactCouponCard coupon={coupon} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

const CompactCouponCard = ({ coupon }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code.toUpperCase());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25 }}
      className="rounded-xl shadow-md p-4 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white hover:from-pink-500 hover:to-blue-600 transition-all min-h-[180px] flex flex-col justify-between"
    >
      {/* Top Section */}
      <div className="flex flex-col items-center gap-1">
        <FaTag className="text-xl" />
        <h3 className="text-base font-bold uppercase tracking-wider bg-white text-transparent bg-clip-text">
          {coupon.code}
        </h3>
        <p className="text-sm font-semibold">
          {coupon.type === "percentage"
            ? `${coupon.value}% OFF`
            : `${coupon.value}$ Discount`}
        </p>
      </div>

      {/* Bottom Section */}
      <div className="mt-3 flex justify-between items-center bg-white/20 rounded-lg px-3 py-1.5 backdrop-blur-sm text-xs">
        <div className="flex flex-col items-start text-left opacity-90">
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="text-[10px]" />
            {new Date(coupon.expiryDate).toLocaleDateString("en-US")}
          </div>
          <p className="flex gap-5">{coupon.usageLimit && <p>Limit: {coupon.usageLimit}</p> } ||
          { <p>UseCount: {coupon.usedCount }</p> }</p> 
        </div>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-1 px-2 py-1 rounded-md font-semibold transition text-[11px] ${
            copied
              ? "bg-green-400 text-white"
              : "bg-white text-blue-700 hover:bg-blue-100"
          }`}
        >
          <FaCopy className="text-[10px]" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </motion.div>
  );
};

export default CouponSlider;
