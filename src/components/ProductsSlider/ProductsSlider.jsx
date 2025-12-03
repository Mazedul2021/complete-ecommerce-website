import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import Product1 from "../../assets/Image/product/1.webp"
import Product2 from "../../assets/Image/product/2.webp"
import Product3 from "../../assets/Image/product/3.webp"
import Product4 from "../../assets/Image/product/4.webp"
import Product5 from "../../assets/Image/product/5.jpg"
import Product6 from "../../assets/Image/product/6.webp"


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
          <ProductItem img={Product1}/>
        </SwiperSlide>
        <SwiperSlide>
          <ProductItem img={Product2}/>
        </SwiperSlide>
        <SwiperSlide>
          <ProductItem img={Product3}/>
        </SwiperSlide>
        <SwiperSlide>
          <ProductItem img={Product4}/>
        </SwiperSlide>
        <SwiperSlide>
          <ProductItem img={Product5}/>
        </SwiperSlide>
        <SwiperSlide>
          <ProductItem img={Product6}/>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProductsSlider;
