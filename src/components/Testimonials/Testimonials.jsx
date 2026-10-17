import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { IoShieldCheckmark, IoCheckmarkCircle, IoStar, IoHeart } from "react-icons/io5";

const testimonials = [
  {
    name: "Ariful Islam",
    location: "Gulshan, Dhaka",
    watch: "OLEVS 6655 Automatic Skeleton",
    rating: 5,
    date: "3 days ago",
    text: "My OLEVS automatic arrived in just 2 days, beautifully gift-boxed. The skeleton dial looks far more luxurious than what I paid. The open balance wheel in motion is mesmerizing. Highly recommended!",
  },
  {
    name: "Sadia Rahman",
    location: "Nasirabad, Chattogram",
    watch: "LIGE Rose Gold Bracelet Watch",
    rating: 5,
    date: "1 week ago",
    text: "Bought this for our anniversary. The rose gold finish has a gorgeous shine and the ceramic strap feels super comfortable. 100% genuine product with official warranty card.",
  },
  {
    name: "Tanvir Hasan",
    location: "Zindabazar, Sylhet",
    watch: "NAVIFORCE 9214 Chronograph",
    rating: 5,
    date: "2 weeks ago",
    text: "Fourth watch from OWS already. The chronograph dials work with precision and delivery was speedy even outside Dhaka. Open-box inspection on delivery gives total peace of mind.",
  },
];

const Testimonials = () => {
  const [helpfulCounts, setHelpfulCounts] = useState([18, 24, 12]);

  const handleHelpful = (index) => {
    setHelpfulCounts((prev) => {
      const copy = [...prev];
      copy[index] += 1;
      return copy;
    });
  };

  return (
    <section className="py-12 bg-gradient-to-b from-white via-slate-50/50 to-white">
      <div className="container">
        {/* Header with aggregate rating badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-2">
              <IoShieldCheckmark className="text-[14px]" /> 100% Verified Customer Reviews
            </span>
            <h2 className="text-[22px] lg:text-[28px] font-bold text-slate-900 titleUnderline">
              What Watch Lovers Are Saying
            </h2>
            <p className="text-[13.5px] text-slate-500 mt-2">
              Over 12,000+ satisfied clients across Bangladesh trust Olevs Watch Shop.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-50 text-amber-500 font-extrabold text-[20px]">
              4.9
            </div>
            <div>
              <div className="flex items-center text-amber-400 text-[14px]">
                {[...Array(5)].map((_, i) => (
                  <IoStar key={i} />
                ))}
              </div>
              <span className="text-[11.5px] font-semibold text-slate-600">
                Based on 2,840+ verified ratings
              </span>
            </div>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={t.name}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Rating value={t.rating} size="small" readOnly />
                  <span className="text-[11px] text-slate-400 font-medium">
                    {t.date}
                  </span>
                </div>

                <div className="inline-block bg-slate-50 text-slate-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-md mb-3 border border-slate-100">
                  Purchased: <b className="text-slate-900">{t.watch}</b>
                </div>

                <p className="text-[13.5px] text-slate-600 leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 to-rose-400 text-white flex items-center justify-center font-bold text-[14px] shadow-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-[13.5px] font-bold text-slate-900 flex items-center gap-1">
                      {t.name}
                      <IoCheckmarkCircle className="text-emerald-500 text-[14px]" title="Verified Buyer" />
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {t.location} • Verified Buyer
                    </p>
                  </div>
                </div>

                {/* Interactive Helpful button */}
                <button
                  onClick={() => handleHelpful(idx)}
                  className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 px-2.5 py-1 rounded-lg transition border border-slate-200/60"
                  title="Mark as helpful"
                >
                  <IoHeart className="text-[12px] text-rose-500" />
                  <span>{helpfulCounts[idx]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
