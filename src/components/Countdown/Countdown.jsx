import React, { useEffect, useState } from "react";

const getRemaining = () => {
  const now = new Date();
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  const diff = Math.max(0, end - now);
  return {
    hours: Math.floor(diff / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
};

const pad = (n) => String(n).padStart(2, "0");

const Countdown = () => {
  const [time, setTime] = useState(getRemaining());

  useEffect(() => {
    const t = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(t);
  }, []);

  const Box = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <span className="w-[52px] h-[52px] bg-white rounded-lg shadow flex items-center justify-center text-[20px] font-[700] text-[#ff5252] tabular-nums">
        {pad(value)}
      </span>
      <span className="text-[10px] uppercase tracking-wide text-[rgba(0,0,0,0.5)] mt-1.5 font-[500]">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex items-start gap-2.5">
      <Box value={time.hours} label="Hours" />
      <span className="text-[20px] font-[700] leading-[52px] text-[rgba(0,0,0,0.3)]">
        :
      </span>
      <Box value={time.minutes} label="Mins" />
      <span className="text-[20px] font-[700] leading-[52px] text-[rgba(0,0,0,0.3)]">
        :
      </span>
      <Box value={time.seconds} label="Secs" />
    </div>
  );
};

export default Countdown;
