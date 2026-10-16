import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { categories } from "../../data/categories";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const HomeCatSlider = () => {
  return (
    <div className="homeCatSlider pt-1">
      <div className="container">
        <Swiper
          slidesPerView={8}
          spaceBetween={20}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper mb-5"
          breakpoints={{
            0: { slidesPerView: 3 },
            480: { slidesPerView: 4 },
            640: { slidesPerView: 5 },
            768: { slidesPerView: 6 },
            1024: { slidesPerView: 8 },
          }}
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.id}>
              <Link to={`/shop?category=${cat.slug}`}>
                <div className="item py-4 lg:py-6 px-2 bg-white rounded-md text-center flex items-center justify-center flex-col transition-all border border-transparent hover:border-[#ff5252]/30 hover:shadow-lg group cursor-pointer">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-[60px] h-[60px] object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                  <h3 className="text-[11px] lg:text-[13px] font-[500] mt-3 group-hover:text-[#ff5252] transition-colors">
                    {cat.name}
                  </h3>
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
