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
      <div className="relative w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.3)] border border-slate-700/60 flex items-center justify-center overflow-hidden">
        {/* Subtle top glare highlight */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        <span className="text-[20px] sm:text-[24px] font-extrabold text-amber-400 tabular-nums font-mono tracking-tight drop-shadow">
          {pad(value)}
        </span>
      </div>
      <span className="text-[10px] uppercase tracking-widest text-slate-300 font-bold mt-1.5">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Box value={time.hours} label="Hours" />
      <span className="text-[22px] font-extrabold text-amber-400/60 -mt-5 animate-pulse font-mono">
        :
      </span>
      <Box value={time.minutes} label="Mins" />
      <span className="text-[22px] font-extrabold text-amber-400/60 -mt-5 animate-pulse font-mono">
        :
      </span>
      <Box value={time.seconds} label="Secs" />
    </div>
  );
};

export default Countdown;
