import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import BannerBox from "./BannerBox";

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
            <BannerBox img={"/src/assets/Image/Banner/1.png"} link={'/'}/>
        </SwiperSlide>
        <SwiperSlide>
            <BannerBox img={"/src/assets/Image/Banner/1.png"} link={'/'}/>
        </SwiperSlide>
        <SwiperSlide>
            <BannerBox img={"/src/assets/Image/Banner/1.png"} link={'/'}/>
        </SwiperSlide>
        <SwiperSlide>
            <BannerBox img={"/src/assets/Image/Banner/1.png"} link={'/'}/>
        </SwiperSlide>
        <SwiperSlide>
            <BannerBox img={"/src/assets/Image/Banner/1.png"} link={'/'}/>
        </SwiperSlide>
        <SwiperSlide>
            <BannerBox img={"/src/assets/Image/Banner/1.png"} link={'/'}/>
        </SwiperSlide>
        <SwiperSlide>
            <BannerBox img={"/src/assets/Image/Banner/1.png"} link={'/'}/>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default AdsBannerSlider;
