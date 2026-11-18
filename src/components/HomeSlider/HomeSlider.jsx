import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import slide1 from "../../assets/Image/HomeSlider/1.png";
import slide2 from "../../assets/Image/HomeSlider/2.png";
import slide3 from "../../assets/Image/HomeSlider/3.png";
import slide4 from "../../assets/Image/HomeSlider/4.png";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useSettings } from "../../data/useSettings";

const defaultSlides = [
  { img: slide1, link: "/shop?category=mens-watches" },
  { img: slide2, link: "/shop?category=luxury-watches" },
  { img: slide3, link: "/shop?sort=discount" },
  { img: slide4, link: "/shop?category=womens-watches" },
];

const HomeSlider = () => {
  const settings = useSettings();
  const custom = (settings.heroSlides ?? []).filter((s) => s?.image);
  const slides = custom.length
    ? custom.map((s) => ({ img: s.image, link: s.link || "/shop" }))
    : defaultSlides;
  return (
    <div className="homeSlider pt-3 pb-6">
      <div className="container">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_10px_35px_rgba(15,23,42,0.1)] border border-slate-200/60 bg-slate-950">
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            className="sliderHome"
          >
            {slides.map((slide, i) => (
              <SwiperSlide key={i}>
                <Link to={slide.link} className="block relative group overflow-hidden">
                  <img
                    src={slide.img}
                    alt="Promotional banner"
                    className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                  />
                  {/* Subtle dark bottom vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
