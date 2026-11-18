import React, { useMemo } from "react";
import { formatPrice } from "../../utils/format";

const W = 760;
const H = 240;
const PAD_X = 8;
const PAD_TOP = 18;
const PAD_BOTTOM = 8;

const RevenueChart = ({ data = [], unit = "day" }) => {
  const { line, area, peak, points } = useMemo(() => {
    const values = data.map((d) => d.value);
    const peakValue = Math.max(...values, 1);
    const span = Math.max(data.length - 1, 1);

    const coords = data.map((d, index) => ({
      x: PAD_X + (index / span) * (W - PAD_X * 2),
      y: PAD_TOP + (1 - d.value / peakValue) * (H - PAD_TOP - PAD_BOTTOM),
    }));

    const linePath = coords
      .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
      .join(" ");

    const areaPath =
      coords.length > 0
        ? `${linePath} L${coords[coords.length - 1].x.toFixed(1)},${H - PAD_BOTTOM} L${coords[0].x.toFixed(1)},${H - PAD_BOTTOM} Z`
        : "";

    return { line: linePath, area: areaPath, peak: peakValue, points: coords };
  }, [data]);

  if (data.length === 0) {
    return (
      <div className="h-[220px] flex items-center justify-center text-[13px] text-slate-400">
        No orders in this period yet.
      </div>
    );
  }

  const labels = [data[0], data[Math.floor(data.length / 2)], data[data.length - 1]];

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11.5px] font-semibold text-slate-400">
          Peak {formatPrice(peak)}
        </span>
        <span className="text-[11.5px] font-semibold text-slate-400">
          Revenue per {unit}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-[220px]"
        preserveAspectRatio="none"
        role="img"
        aria-label="Revenue trend"
      >
        <defs>
          <linearGradient id="owsRevenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e11d48" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#e11d48" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
          const y = PAD_TOP + fraction * (H - PAD_TOP - PAD_BOTTOM);
          return (
            <line
              key={fraction}
              x1={PAD_X}
              x2={W - PAD_X}
              y1={y}
              y2={y}
              stroke="#e2e8f0"
              strokeWidth="1"
              strokeDasharray={fraction === 1 ? "0" : "4 6"}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}

        <path d={area} fill="url(#owsRevenueFill)" />
        <path
          d={line}
          fill="none"
          stroke="#e11d48"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={index === points.length - 1 ? 4 : 2.5}
            fill="#ffffff"
            stroke="#e11d48"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          >
            <title>{`${data[index].label}: ${formatPrice(data[index].value)}`}</title>
          </circle>
        ))}
      </svg>

      <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-2">
        {labels.map((entry, index) => (
          <span key={`${entry.label}-${index}`}>{entry.label}</span>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;
