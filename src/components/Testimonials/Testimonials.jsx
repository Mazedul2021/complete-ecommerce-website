import React from "react";
import Rating from "@mui/material/Rating";

const testimonials = [
  {
    name: "Ariful Islam",
    location: "Dhaka",
    rating: 5,
    text: "My OLEVS automatic arrived in 2 days, beautifully boxed. The skeleton dial looks far more expensive than what I paid. Highly recommended!",
  },
  {
    name: "Sadia Rahman",
    location: "Chattogram",
    rating: 5,
    text: "Bought the couple watch set for our anniversary. My husband loved it! Original products, genuine warranty and super friendly support.",
  },
  {
    name: "Tanvir Hasan",
    location: "Sylhet",
    rating: 4,
    text: "Third order from OWS already. The NAVIFORCE chronograph is stunning and delivery was quick even outside Dhaka. Great prices too.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-[24px] font-[700] titleUnderline inline-block">
            What Our Customers Say
          </h2>
          <p className="text-[14px] text-[rgba(0,0,0,0.55)] mt-2">
            Trusted by 10,000+ watch lovers across Bangladesh
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-[#fafafa] rounded-xl p-6 border border-[rgba(0,0,0,0.05)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <Rating value={t.rating} size="small" readOnly />
              <p className="text-[14px] text-[rgba(0,0,0,0.7)] mt-3 leading-relaxed">
                “{t.text}”
              </p>
              <div className="flex items-center gap-3 mt-5">
                <span className="w-[42px] h-[42px] rounded-full bg-[#ff5252] text-white flex items-center justify-center font-[600] text-[15px]">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="text-[14px] font-[600]">{t.name}</p>
                  <p className="text-[12px] text-[rgba(0,0,0,0.45)]">
                    {t.location} · Verified Buyer
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
