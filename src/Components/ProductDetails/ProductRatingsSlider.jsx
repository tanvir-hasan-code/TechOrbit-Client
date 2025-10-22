import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const ProductRatingsSlider = ({ ratings }) => {
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
              <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition">
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                  {[...Array(5 - item.rating)].map((_, i) => (
                    <FaStar key={i} className="text-gray-300" />
                  ))}
                </div>

                <p className="text-gray-700 italic mb-3">
                  “{item.message}”
                </p>

                <p className="text-sm text-gray-500">
                  — {item.userEmail}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ProductRatingsSlider;
