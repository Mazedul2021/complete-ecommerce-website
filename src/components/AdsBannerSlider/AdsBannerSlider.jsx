import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import BannerBox from "./BannerBox";

import banner1 from "../../assets/Image/Banner/1.png";
import banner2 from "../../assets/Image/Banner/2.png";
import banner3 from "../../assets/Image/Banner/3.png";
import banner4 from "../../assets/Image/Banner/4.png";
import banner5 from "../../assets/Image/Banner/5.png";
import banner6 from "../../assets/Image/Banner/6.png";
import banner7 from "../../assets/Image/Banner/7.png";
import banner8 from "../../assets/Image/Banner/8.png";

const AdsBannerSlider = (props) => {
  return (
    <div className="py-5 w-full">
      <Swiper
        slidesPerView={props.items}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <BannerBox img={banner1} link={'/'}/>
        </SwiperSlide>
        <SwiperSlide>
            <BannerBox img={banner2} link={'/'}/>
        </SwiperSlide>
        <SwiperSlide>
            <BannerBox img={banner3} link={'/'}/>
        </SwiperSlide>
        <SwiperSlide>
            <BannerBox img={banner4} link={'/'}/>
        </SwiperSlide>
        <SwiperSlide>
            <BannerBox img={banner5} link={'/'}/>
        </SwiperSlide>
        <SwiperSlide>
            <BannerBox img={banner6} link={'/'}/>
        </SwiperSlide>
        <SwiperSlide>
            <BannerBox img={banner7} link={'/'}/>
        </SwiperSlide>
        <SwiperSlide>
            <BannerBox img={banner8} link={'/'}/>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default AdsBannerSlider;
