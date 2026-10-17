import React, { useState } from "react";
import { Link } from "react-router-dom";
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

import {
  IoFlame,
  IoSparkles,
  IoShieldCheckmark,
  IoCheckmarkCircle,
  IoArrowForward,
} from "react-icons/io5";
import { TbTruckDelivery, TbClockHour4, TbDiamond, TbCertificate, TbShieldCheck } from "react-icons/tb";

const SectionHeading = ({ title, subtitle, right, badge }) => (
  <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
    <div>
      {badge && (
        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full mb-2">
          {badge}
        </span>
      )}
      <h2 className="text-[22px] lg:text-[26px] font-bold text-slate-900 titleUnderline">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[13.5px] text-slate-500 mt-2.5 max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
    {right}
  </div>
);

const WATCH_STYLES = [
  {
    name: "Skeleton Mechanical",
    desc: "Exposed gears & complex balance wheels",
    tag: "skeleton",
    link: "/shop?q=skeleton",
    icon: "⚙️",
    accent: "from-amber-500/20 to-rose-500/10",
  },
  {
    name: "Business Chronograph",
    desc: "Multi-dial stopwatches for executives",
    tag: "chronograph",
    link: "/shop?q=chronograph",
    icon: "⏱️",
    accent: "from-blue-500/20 to-indigo-500/10",
  },
  {
    name: "Classic Leather",
    desc: "Genuine handcrafted straps & minimalist dials",
    tag: "leather",
    link: "/shop?q=leather",
    icon: "💼",
    accent: "from-orange-500/20 to-amber-500/10",
  },
  {
    name: "Rose Gold Luxury",
    desc: "Radiant luxury finishes for formal occasions",
    tag: "gold",
    link: "/shop?q=gold",
    icon: "✨",
    accent: "from-rose-500/20 to-pink-500/10",
  },
];

const Home = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabCategories = categories.slice(0, 6);
  const tabProducts =
    activeTab === 0
      ? popularProducts
      : products.filter((p) => p.category === tabCategories[activeTab - 1].slug);

  return (
    <>
      <HomeSlider />
      <HomeCatSlider />

      {/* ===== Trust / Luxury Value Strip ===== */}
      <section className="py-6">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                icon: <TbCertificate className="text-[26px] text-amber-500" />,
                title: "100% Authentic Guaranteed",
                desc: "Original brand warranty card in every box",
              },
              {
                icon: <TbTruckDelivery className="text-[26px] text-rose-500" />,
                title: "Free Express Shipping",
                desc: "All orders over ৳2,000 delivered free",
              },
              {
                icon: <TbShieldCheck className="text-[26px] text-blue-500" />,
                title: "Inspection on Delivery",
                desc: "Open box check before making payment",
              },
              {
                icon: <TbClockHour4 className="text-[26px] text-emerald-500" />,
                title: "24/7 Dedicated Support",
                desc: "WhatsApp & phone support anytime",
              },
            ].map((perk, i) => (
              <div
                key={i}
                className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-md hover:border-slate-300 transition-all duration-200 flex items-start gap-3.5"
              >
                <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                  {perk.icon}
                </div>
                <div>
                  <h3 className="text-[13px] sm:text-[13.5px] font-bold text-slate-900 leading-tight">
                    {perk.title}
                  </h3>
                  <p className="text-[11.5px] text-slate-500 mt-0.5 leading-normal">
                    {perk.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Flash Deals of the Day (Luxury Midnight Black & Crimson Edition) ===== */}
      <section className="py-10 my-4 bg-gradient-to-br from-slate-950 via-[#1a0f1d] to-slate-950 text-white relative overflow-hidden">
        {/* Decorative glowing gradient orbs */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-rose-600/20 border border-rose-500/30 px-3 py-1 rounded-full text-rose-400 text-[11px] font-bold uppercase tracking-wider mb-2">
                <IoFlame className="text-amber-400 text-[14px]" /> Flash Deal • Ends Midnight
              </div>
              <h2 className="text-[26px] lg:text-[32px] font-extrabold text-white tracking-tight">
                Deals of the Day
              </h2>
              <p className="text-[14px] text-slate-300 mt-1 max-w-lg">
                Exclusive limited-quantity discounts on flagship skeleton and chronograph timepieces.
              </p>

              {/* Urgency Progress bar */}
              <div className="flex items-center gap-3 mt-4 max-w-xs">
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div className="h-full bg-gradient-to-r from-rose-500 to-amber-400 rounded-full w-[78%] animate-pulse" />
                </div>
                <span className="text-[11.5px] font-bold text-amber-400 whitespace-nowrap">
                  78% Claimed
                </span>
              </div>
            </div>

            {/* Countdown Clock */}
            <div className="bg-slate-900/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-2xl flex flex-col items-center">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                Sale Expires In
              </span>
              <Countdown />
            </div>
          </div>

          {/* Deals Slider */}
          <div className="bg-white/95 backdrop-blur-xl p-4 sm:p-6 rounded-3xl shadow-2xl border border-white/20">
            <ProductsSlider products={dealProducts} items={5} />
          </div>
        </div>
      </section>

      {/* ===== Curated Watch Styles (Interactive Quick Pick) ===== */}
      <section className="py-8">
        <div className="container">
          <SectionHeading
            badge="STYLE GUIDE"
            title="Curated Timepiece Styles"
            subtitle="Explore distinctive watch aesthetics tailored to every occasion and personal statement."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WATCH_STYLES.map((style) => (
              <Link
                key={style.name}
                to={style.link}
                className="group relative p-5 bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_16px_rgba(15,23,42,0.04)] hover:shadow-xl hover:border-rose-400/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Background accent glow */}
                <div
                  className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${style.accent} rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500`}
                />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[24px] mb-3 group-hover:scale-110 transition-transform">
                    {style.icon}
                  </div>
                  <h3 className="text-[16px] font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                    {style.name}
                  </h3>
                  <p className="text-[12.5px] text-slate-500 mt-1 leading-relaxed">
                    {style.desc}
                  </p>
                </div>

                <div className="relative z-10 mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[12px] font-bold text-rose-600 group-hover:translate-x-1 transition-transform">
                  <span>Explore Collection</span>
                  <IoArrowForward />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Promotional Luxury Banners ===== */}
      <section className="py-4">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link
            to="/shop?category=luxury-watches"
            className="group block overflow-hidden rounded-3xl shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-200/80 relative"
          >
            <img
              src={banner1}
              alt="Luxury watches offer"
              className="w-full h-[250px] object-cover group-hover:scale-105 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <span className="text-white text-[14px] font-bold flex items-center gap-2">
                Shop Luxury Series <IoArrowForward />
              </span>
            </div>
          </Link>

          <Link
            to="/shop?category=smart-watches"
            className="group block overflow-hidden rounded-3xl shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-200/80 relative"
          >
            <img
              src={banner2}
              alt="Smart watches offer"
              className="w-full h-[250px] object-cover group-hover:scale-105 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <span className="text-white text-[14px] font-bold flex items-center gap-2">
                Discover Modern Smartwatches <IoArrowForward />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ===== Popular Products with Interactive Category Pills ===== */}
      <section className="py-8">
        <div className="container">
          <SectionHeading
            badge="TOP SELLERS"
            title="Popular Products"
            subtitle="Handcrafted bestsellers celebrated by watch enthusiasts worldwide."
            right={
              <Link
                to="/shop"
                className="text-[13px] font-bold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1"
              >
                View Complete Catalog →
              </Link>
            }
          />

          {/* Interactive Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
            <button
              onClick={() => setActiveTab(0)}
              className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all shrink-0 ${
                activeTab === 0
                  ? "bg-slate-950 text-white shadow-md shadow-slate-950/20 scale-102"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              ⭐ All Bestsellers
            </button>
            {tabCategories.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => setActiveTab(idx + 1)}
                className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all shrink-0 ${
                  activeTab === idx + 1
                    ? "bg-rose-600 text-white shadow-md shadow-rose-600/20 scale-102"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
            {tabProducts.slice(0, 10).map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Latest Arrivals Slider ===== */}
      <section className="py-8 bg-white/60 border-y border-slate-100">
        <div className="container">
          <SectionHeading
            badge="NEW RELEASES"
            title="Fresh Arrivals"
            subtitle="Explore modern mechanical engineering and bold new dials from our latest 2024 collection."
            right={
              <Link
                to="/shop?sort=latest"
                className="text-[13px] font-bold text-rose-600 hover:text-rose-700 hover:underline"
              >
                View All New →
              </Link>
            }
          />
          <ProductsSlider products={latestProducts} items={6} />
        </div>
      </section>

      {/* ===== Promotional Brands & Mini Banners ===== */}
      <section className="py-4">
        <div className="container">
          <AdsBannerSlider items={4} />
        </div>
      </section>

      {/* ===== Featured Masterpieces ===== */}
      <section className="py-8">
        <div className="container">
          <SectionHeading
            badge="EDITOR'S CHOICE"
            title="Featured Timepieces"
            subtitle="Curated by horology experts — our most iconic skeleton and automatic designs."
            right={
              <Link
                to="/shop"
                className="text-[13px] font-bold text-rose-600 hover:text-rose-700 hover:underline"
              >
                View Collection →
              </Link>
            }
          />
          <ProductsSlider products={featuredProducts} items={6} />
        </div>
      </section>

      {/* ===== Verified Customer Testimonials ===== */}
      <Testimonials />
    </>
  );
};

export default Home;
