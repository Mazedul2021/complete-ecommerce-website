import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';

import { Pagination, Navigation } from 'swiper/modules';

const HomeSlider = () => {
  return (
    <div className="homeSlider">
      <div className="container">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="sliderHome rounded-[20px]"
        >
          <SwiperSlide>
            <div className="item overflow-hidden">
              <img
                src={"/src/assets/Image/HomeSlider/1.png"}
                alt="Banner slide"
                className="w-full"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item overflow-hidden">
            <img
              src={"/src/assets/Image/HomeSlider/2.png"}
              alt="Banner slide"
              className="w-full"
            />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item overflow-hidden">
            <img
              src={"/src/assets/Image/HomeSlider/3.png"}
              alt="Banner slide"
              className="w-full"
            />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item overflow-hidden">
            <img
              src={"/src/assets/Image/HomeSlider/4.png"}
              alt="Banner slide"
              className="w-full"
            />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSlider;
