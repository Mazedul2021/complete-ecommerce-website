import React, { useState } from "react";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import BreedCrumps from "../../components/BreedCrumps/BreedCrumps";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const faqs = [
  {
    q: "Are your watches 100% authentic?",
    a: "Yes. Every watch at Olevs Watch Shop is sourced directly from authorised distributors and ships with an official warranty card. We never sell replicas.",
  },
  {
    q: "How long does delivery take?",
    a: "Inside Dhaka: 1–2 business days. Outside Dhaka: 2–4 business days via our courier partners. You'll receive an SMS with your tracking code once shipped.",
  },
  {
    q: "What is your return policy?",
    a: "You can return any watch within 7 days of delivery if it's unused and in original packaging. For warranty claims, contact us with your warranty card — repairs are free within 1 year.",
  },
  {
    q: "Do you offer cash on delivery?",
    a: "Yes! Cash on Delivery is available across all 64 districts. You can also pay via bKash, Nagad or card.",
  },
  {
    q: "Is shipping really free?",
    a: "Shipping is free on all orders over ৳2,000. Below that, a flat ৳80 courier fee applies.",
  },
  {
    q: "Do the watches come in gift boxes?",
    a: "Most OLEVS watches ship in branded gift boxes. You can also add our premium Watch Gift Box Set from the Accessories category at checkout.",
  },
];

const HelpCenter = () => {
  const [open, setOpen] = useState(0);

  return (
    <>
      <BreedCrumps items={[{ label: "Help Center" }]} />
      <section className="py-12 bg-white min-h-[55vh]">
        <div className="container max-w-[760px]">
          <div className="text-center mb-10">
            <h1 className="text-[28px] font-[700]">How can we help? 🤝</h1>
            <p className="text-[14px] text-[rgba(0,0,0,0.55)] mt-2">
              Answers to the questions we hear most often.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div
                key={i}
                className="border border-[rgba(0,0,0,0.08)] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[#fafafa] transition"
                >
                  <span className="text-[15px] font-[600]">{f.q}</span>
                  <span className="text-[#ff5252] shrink-0">
                    {open === i ? <FaAngleUp /> : <FaAngleDown />}
                  </span>
                </button>
                <Collapse in={open === i}>
                  <p className="px-5 pb-4 text-[14px] text-[rgba(0,0,0,0.6)] leading-relaxed">
                    {f.a}
                  </p>
                </Collapse>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-[14px] text-[rgba(0,0,0,0.55)]">
              Still need help? We're one call away.
            </p>
            <Link to="/contact">
              <Button className="btn-org !mt-4 !normal-case !px-8">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HelpCenter;
