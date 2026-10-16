import React from "react";

const QuantityBox = ({ value, onChange, max = 99 }) => (
  <div className="flex items-center border border-[rgba(0,0,0,0.2)] rounded-md overflow-hidden w-fit">
    <button
      onClick={() => onChange(Math.max(1, value - 1))}
      className="w-[38px] h-[42px] text-[18px] hover:bg-[#f1f1f1] transition"
      aria-label="Decrease quantity"
    >
      −
    </button>
    <input
      type="text"
      readOnly
      value={value}
      className="w-[44px] h-[42px] text-center text-[15px] font-[500] outline-none border-x border-[rgba(0,0,0,0.15)]"
    />
    <button
      onClick={() => onChange(Math.min(max, value + 1))}
      className="w-[38px] h-[42px] text-[18px] hover:bg-[#f1f1f1] transition"
      aria-label="Increase quantity"
    >
      +
    </button>
  </div>
);

export default QuantityBox;
