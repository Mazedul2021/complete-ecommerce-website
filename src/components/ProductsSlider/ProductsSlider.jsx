import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import ProductItem from "../ProductItem/ProductItem";

const ProductsSlider = ({ products = [], items = 6 }) => {
  return (
    <div className="productsSlider py-5 w-full">
      <Swiper
        slidesPerView={items}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          0: { slidesPerView: 1.3 },
          480: { slidesPerView: 2.3 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: Math.min(4, items) },
          1024: { slidesPerView: Math.min(5, items) },
          1280: { slidesPerView: items },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="h-auto">
            <ProductItem product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsSlider;
