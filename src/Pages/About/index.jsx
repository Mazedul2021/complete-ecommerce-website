import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import BreedCrumps from "../../components/BreedCrumps/BreedCrumps";
import aboutImg from "../../assets/Image/Banner/9.webp";

const stats = [
  ["10K+", "Happy Customers"],
  ["500+", "Watch Models"],
  ["8+", "Years of Trust"],
  ["64", "Districts Served"],
];

const About = () => {
  return (
    <>
      <BreedCrumps items={[{ label: "About Us" }]} />
      <section className="py-12 bg-white">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-[12px] font-[700] uppercase tracking-[2px] text-[#ff5252]">
              About Olevs Watch Shop
            </span>
            <h1 className="text-[30px] lg:text-[36px] font-[700] leading-tight mt-2">
              Timeless Style, <span className="text-[#ff5252]">Delivered</span>{" "}
              to Your Doorstep
            </h1>
            <p className="text-[15px] text-[rgba(0,0,0,0.6)] leading-relaxed mt-4">
              Founded in Dhaka, Olevs Watch Shop (OWS) started with a simple
              mission: make authentic, premium-quality watches affordable for
              everyone in Bangladesh. What began as a small passion project is
              now one of the country's most trusted destinations for men's,
              women's and kids' timepieces.
            </p>
            <p className="text-[15px] text-[rgba(0,0,0,0.6)] leading-relaxed mt-3">
              We only sell 100% genuine products sourced directly from
              authorised distributors — every watch ships with an official
              warranty card, quality-checked by our in-house team before it
              reaches your door.
            </p>
            <Link to="/shop">
              <Button className="btn-org !mt-6 !normal-case !px-8 !py-3">
                Explore Our Collection
              </Button>
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={aboutImg}
              alt="Olevs Watch Shop"
              className="w-full h-[380px] object-cover"
            />
          </div>
        </div>

        <div className="container mt-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map(([num, label]) => (
              <div
                key={label}
                className="bg-[#fafafa] rounded-xl p-6 text-center border border-[rgba(0,0,0,0.05)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <p className="text-[32px] font-[700] text-[#ff5252]">{num}</p>
                <p className="text-[13.5px] text-[rgba(0,0,0,0.6)] mt-1 font-[500]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
