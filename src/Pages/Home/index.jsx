import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import HomeSlider from "../../components/HomeSlider/HomeSlider";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider";
import HomeCatSlider from "../../components/CatSlider/HomeCatSlider";
import AdsBannerSlider from "../../components/AdsBannerSlider/AdsBannerSlider";
import Countdown from "../../components/Countdown/Countdown";
import Testimonials from "../../components/Testimonials/Testimonials";
import ProductItem from "../../components/ProductItem/ProductItem";

import { categories } from "../../data/categories";
import {
  popularProducts,
  latestProducts,
  featuredProducts,
  dealProducts,
  products,
} from "../../data/products";

import banner1 from "../../assets/Image/Banner/7.png";
import banner2 from "../../assets/Image/Banner/8.png";
import { Link } from "react-router-dom";

const SectionHeading = ({ title, subtitle, right }) => (
  <div className="flex flex-wrap items-end justify-between gap-3">
    <div>
      <h2 className="text-[20px] lg:text-[24px] font-[700] titleUnderline">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[13.5px] text-[rgba(0,0,0,0.55)] mt-2.5">
          {subtitle}
        </p>
      )}
    </div>
    {right}
  </div>
);

const Home = () => {
  const [tab, setTab] = useState(0);

  const tabCategories = categories.slice(0, 6);
  const tabProducts =
    tab === 0
      ? popularProducts
      : products.filter((p) => p.category === tabCategories[tab - 1].slug);

  return (
    <>
      <HomeSlider />
      <HomeCatSlider />

      {/* ===== Deals of the Day ===== */}
      <section className="py-10 bg-gradient-to-r from-[#ff5252] to-[#ff7b54] mt-4">
        <div className="container">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
            <div className="text-white">
              <span className="text-[12px] font-[600] uppercase tracking-[2px] bg-white/20 px-3 py-1 rounded-full">
                Limited Time
              </span>
              <h2 className="text-[24px] lg:text-[28px] font-[700] mt-2">
                🔥 Deals of the Day
              </h2>
              <p className="text-[14px] text-white/85">
                Biggest discounts on premium watches — ends at midnight!
              </p>
            </div>
            <div className="text-white">
              <p className="text-[12px] font-[600] uppercase tracking-wide mb-2 text-center">
                Offer ends in
              </p>
              <Countdown />
            </div>
          </div>
          <div className="bg-white/95 rounded-xl">
            <ProductsSlider products={dealProducts} items={5} />
          </div>
        </div>
      </section>

      {/* ===== Promo banners ===== */}
      <section className="py-10 bg-white">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link to="/shop?category=luxury-watches" className="group block overflow-hidden rounded-xl">
            <img
              src={banner1}
              alt="Luxury watches offer"
              className="w-full h-[240px] object-cover group-hover:scale-105 transition-all duration-500"
            />
          </Link>
          <Link to="/shop?category=smart-watches" className="group block overflow-hidden rounded-xl">
            <img
              src={banner2}
              alt="Smart watches offer"
              className="w-full h-[240px] object-cover group-hover:scale-105 transition-all duration-500"
            />
          </Link>
        </div>
      </section>

      {/* ===== Popular Products with category tabs ===== */}
      <section className="bg-white py-8 pt-0">
        <div className="container">
          <SectionHeading
            title="Popular Products"
            subtitle="Handpicked bestsellers our customers love the most."
            right={
              <Link
                to="/shop"
                className="text-[13px] font-[600] text-[#ff5252] hover:underline"
              >
                View All →
              </Link>
            }
          />
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            className="mt-2"
          >
            <Tab label="All" className="!normal-case" />
            {tabCategories.map((c) => (
              <Tab key={c.id} label={c.name} className="!normal-case" />
            ))}
          </Tabs>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {tabProducts.slice(0, 10).map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Latest Products ===== */}
      <section className="py-8 bg-white">
        <div className="container">
          <SectionHeading
            title="Latest Products"
            subtitle="Fresh arrivals straight from our newest collection."
            right={
              <Link
                to="/shop?sort=latest"
                className="text-[13px] font-[600] text-[#ff5252] hover:underline"
              >
                View All →
              </Link>
            }
          />
          <ProductsSlider products={latestProducts} items={6} />
        </div>
      </section>

      {/* ===== Ads banner slider ===== */}
      <section className="py-2 bg-white">
        <div className="container">
          <AdsBannerSlider items={4} />
        </div>
      </section>

      {/* ===== Featured Products ===== */}
      <section className="py-8 bg-white">
        <div className="container">
          <SectionHeading
            title="Featured Products"
            subtitle="Editor's choice — the finest pieces from our premium range."
            right={
              <Link
                to="/shop"
                className="text-[13px] font-[600] text-[#ff5252] hover:underline"
              >
                View All →
              </Link>
            }
          />
          <ProductsSlider products={featuredProducts} items={6} />
        </div>
      </section>

      <Testimonials />
    </>
  );
};

export default Home;
