import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import ProductItem from "../ProductItem/ProductItem";

const ProductsSlider = (props) => {
  return (
    <div className="productsSlider py-5 w-full">
      <Swiper
        slidesPerView={props.items}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <ProductItem img={"/src/assets/Image/product/1.webp"}/>
        </SwiperSlide>
        <SwiperSlide>
          <ProductItem img={"/src/assets/Image/product/2.webp"}/>
        </SwiperSlide>
        <SwiperSlide>
          <ProductItem img={"/src/assets/Image/product/3.webp"}/>
        </SwiperSlide>
        <SwiperSlide>
          <ProductItem img={"/src/assets/Image/product/4.webp"}/>
        </SwiperSlide>
        <SwiperSlide>
          <ProductItem img={"/src/assets/Image/product/1.webp"}/>
        </SwiperSlide>
        <SwiperSlide>
          <ProductItem img={"/src/assets/Image/product/1.webp"}/>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProductsSlider;
