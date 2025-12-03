import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import cat1 from "../../assets/Image/category/1.png";
import cat2 from "../../assets/Image/category/2.png";
import cat3 from "../../assets/Image/category/3.png";
import cat4 from "../../assets/Image/category/4.png";
import cat5 from "../../assets/Image/category/5.png";
import cat6 from "../../assets/Image/category/6.png";
import cat7 from "../../assets/Image/category/7.png";
import cat8 from "../../assets/Image/category/8.png";

import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const HomeCatSlider = () => {
  return (
    <div className="homeCatSlider">
      <div className="container">
        <Swiper
          slidesPerView={8}
          spaceBetween={30}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper mb-5"
        >
          <SwiperSlide>
            <Link to="/">
              <div className="item py-4 lg:py-7 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col transition-all">
                <img
                  src={cat1}
                  className="w-[60px]"
                />
                <h3 class="text-[12px] lg:text-[15px] font-[500] mt-3">
                  Fashion
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-4 lg:py-7 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col transition-all">
                <img
                  src={cat2}
                  className="w-[60px]"
                />
                <h3 class="text-[12px] lg:text-[15px] font-[500] mt-3">
                  Fashion
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-4 lg:py-7 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col transition-all">
                <img
                  src={cat3}
                  className="w-[60px]"
                />
                <h3 class="text-[12px] lg:text-[15px] font-[500] mt-3">
                  Fashion
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-4 lg:py-7 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col transition-all">
                <img
                  src={cat4}
                  className="w-[60px]"
                />
                <h3 class="text-[12px] lg:text-[15px] font-[500] mt-3">
                  Fashion
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-4 lg:py-7 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col transition-all">
                <img
                  src={cat5}
                  className="w-[60px]"
                />
                <h3 class="text-[12px] lg:text-[15px] font-[500] mt-3">
                  Fashion
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-4 lg:py-7 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col transition-all">
                <img
                  src={cat6}
                  className="w-[60px]"
                />
                <h3 class="text-[12px] lg:text-[15px] font-[500] mt-3">
                  Fashion
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-4 lg:py-7 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col transition-all">
                <img
                  src={cat7}
                  className="w-[60px]"
                />
                <h3 class="text-[12px] lg:text-[15px] font-[500] mt-3">
                  Fashion
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className="item py-4 lg:py-7 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col transition-all">
                <img
                  src={cat8}
                  className="w-[60px]"
                />
                <h3 class="text-[12px] lg:text-[15px] font-[500] mt-3">
                  Fashion
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          
          
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCatSlider;
