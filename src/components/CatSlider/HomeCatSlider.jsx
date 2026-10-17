import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { categories } from "../../data/categories";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const HomeCatSlider = () => {
  return (
    <div className="homeCatSlider py-2">
      <div className="container">
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h3 className="text-[17px] sm:text-[19px] font-bold text-slate-900">
              Explore Collections
            </h3>
            <p className="text-[12px] text-slate-500">
              Browse by watch category and style
            </p>
          </div>
          <Link
            to="/shop"
            className="text-[12.5px] font-bold text-rose-600 hover:text-rose-700 hover:underline"
          >
            All Categories →
          </Link>
        </div>

        <Swiper
          slidesPerView={8}
          spaceBetween={14}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper !pb-2"
          breakpoints={{
            0: { slidesPerView: 3, spaceBetween: 10 },
            480: { slidesPerView: 4, spaceBetween: 10 },
            640: { slidesPerView: 5, spaceBetween: 12 },
            768: { slidesPerView: 6, spaceBetween: 14 },
            1024: { slidesPerView: 8, spaceBetween: 14 },
          }}
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.id}>
              <Link to={`/shop?category=${cat.slug}`} className="block group">
                <div className="p-3 sm:p-4 bg-white rounded-2xl text-center flex items-center justify-center flex-col transition-all duration-300 border border-slate-200/80 shadow-[0_2px_10px_rgba(15,23,42,0.03)] group-hover:border-rose-400/60 group-hover:shadow-[0_12px_24px_rgba(225,29,72,0.1)] group-hover:-translate-y-1">
                  <div className="w-[58px] h-[58px] sm:w-[68px] sm:h-[68px] rounded-xl bg-slate-50 flex items-center justify-center p-2 mb-2 group-hover:bg-rose-50/50 transition-colors">
                    <img
                      src={cat.img}
                      alt={cat.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h4 className="text-[11.5px] sm:text-[12.5px] font-bold text-slate-800 group-hover:text-rose-600 transition-colors line-clamp-1">
                    {cat.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 mt-0.5 group-hover:text-rose-500 font-medium transition-colors">
                    Shop Now
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCatSlider;
