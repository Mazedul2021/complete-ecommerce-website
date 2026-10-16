import React, { useState } from "react";
import Button from "@mui/material/Button";
import BreedCrumps from "../../components/BreedCrumps/BreedCrumps";

const steps = [
  ["📦", "Order Placed", "Your order has been received", "Done"],
  ["✅", "Confirmed", "We've confirmed your order by phone", "Done"],
  ["🏭", "Packed", "Quality-checked & packed with care", "Done"],
  ["🚚", "Shipped", "Handed to courier — on the way", "Current"],
  ["🏠", "Delivered", "Enjoy your new watch!", "Pending"],
];

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [searched, setSearched] = useState(false);

  return (
    <>
      <BreedCrumps items={[{ label: "Order Tracking" }]} />
      <section className="py-12 bg-white min-h-[55vh]">
        <div className="container max-w-[720px]">
          <div className="text-center mb-8">
            <h1 className="text-[28px] font-[700]">Track Your Order</h1>
            <p className="text-[14px] text-[rgba(0,0,0,0.55)] mt-2">
              Enter your order ID (e.g. OWS-123456) to see the latest status.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 max-w-[520px] mx-auto">
            <input
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="OWS-000000"
              className="flex-1 h-[48px] border border-[rgba(0,0,0,0.2)] rounded-md px-4 text-[14px] outline-none focus:border-[#ff5252]"
            />
            <Button
              onClick={() => setSearched(true)}
              className="btn-org !normal-case !px-8"
            >
              Track
            </Button>
          </div>

          {searched && (
            <div className="mt-12">
              <div className="bg-[#fafafa] rounded-xl p-6 border border-[rgba(0,0,0,0.06)]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-4 border-b border-[rgba(0,0,0,0.07)]">
                  <div>
                    <p className="text-[15px] font-[700]">Order #{orderId || "OWS-482911"}</p>
                    <p className="text-[12.5px] text-[rgba(0,0,0,0.5)]">
                      Placed on 14 Oct 2026 · Cash on Delivery
                    </p>
                  </div>
                  <span className="bg-[#fff5f5] text-[#ff5252] text-[12px] font-[600] px-3 py-1.5 rounded-full">
                    🚚 Shipped — Arriving in 1–2 days
                  </span>
                </div>

                <div className="space-y-0">
                  {steps.map(([icon, title, desc, status], i) => (
                    <div key={title} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <span
                          className={`w-[44px] h-[44px] rounded-full flex items-center justify-center text-[18px] ${
                            status === "Pending"
                              ? "bg-[#eee] opacity-60"
                              : "bg-[#ff5252] text-white"
                          }`}
                        >
                          {icon}
                        </span>
                        {i < steps.length - 1 && (
                          <span
                            className={`w-[2px] flex-1 min-h-[36px] ${
                              steps[i + 1][3] === "Pending"
                                ? "bg-[#eee]"
                                : "bg-[#ff5252]"
                            }`}
                          />
                        )}
                      </div>
                      <div className="pb-8">
                        <p
                          className={`text-[15px] font-[600] ${
                            status === "Pending"
                              ? "text-[rgba(0,0,0,0.35)]"
                              : ""
                          }`}
                        >
                          {title}
                          {status === "Current" && (
                            <span className="ml-2 text-[11px] bg-[#ff5252] text-white px-2 py-0.5 rounded-full align-middle">
                              CURRENT
                            </span>
                          )}
                        </p>
                        <p className="text-[13px] text-[rgba(0,0,0,0.5)] mt-0.5">
                          {desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[12px] text-[rgba(0,0,0,0.4)] text-center mt-4">
                Demo tracking — connect a real backend API to see live statuses.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default OrderTracking;
