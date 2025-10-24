import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const RatingSlider = ({ ratings }) => {
  return (
    <div className="my-10 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Customer Reviews
      </h2>

      {ratings.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p>No reviews yet!</p>
        </div>
      ) : (
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="px-4"
        >
          {ratings.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition relative">
                {/* ⭐ Rating Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                  {[...Array(5 - item.rating)].map((_, i) => (
                    <FaStar key={i} className="text-gray-300" />
                  ))}
                </div>

                {/* 💬 Review Text */}
                <p className="text-gray-700 italic overflow-auto mb-4">“{item.message}”</p>

                {/* 👤 Reviewer Info */}
                <div className="flex items-center gap-3 mt-auto border-t pt-3">
                  <img
                    src={
                      item?.userPhoto || "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt={item?.userName || "User"}
                    className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"
                  />
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold text-gray-800">
                      {item?.userName || "Anonymous"}
                    </p>
                    <p className="text-xs text-gray-500">{item.userEmail}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default RatingSlider;
