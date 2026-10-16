import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import slide1 from "../../assets/Image/HomeSlider/1.png";
import slide2 from "../../assets/Image/HomeSlider/2.png";
import slide3 from "../../assets/Image/HomeSlider/3.png";
import slide4 from "../../assets/Image/HomeSlider/4.png";

import { Pagination, Navigation, Autoplay } from "swiper/modules";

const slides = [slide1, slide2, slide3, slide4];

const HomeSlider = () => {
  return (
    <div className="homeSlider mt-5 pb-8">
      <div className="container">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          className="sliderHome rounded-[20px]"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="item overflow-hidden">
                <img src={slide} alt={`Banner slide ${i + 1}`} className="w-full" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSlider;
