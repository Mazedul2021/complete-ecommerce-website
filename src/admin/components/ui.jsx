import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { ORDER_STATUS_META } from "../data/adminData";

export const Card = ({ className = "", children, ...rest }) => (
  <div
    className={`bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] ${className}`}
    {...rest}
  >
    {children}
  </div>
);

export const Button = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  type = "button",
  ...rest
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white shadow-md shadow-rose-600/25",
    dark: "bg-slate-900 hover:bg-slate-800 text-white shadow-sm",
    outline:
      "border border-slate-200 bg-white hover:border-rose-300 hover:text-rose-600 text-slate-700",
    ghost: "text-slate-600 hover:bg-slate-100",
    danger:
      "bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200",
  };
  const sizes = {
    sm: "h-8 px-3 text-[12px] rounded-lg",
    md: "h-10 px-4 text-[13px] rounded-xl",
    lg: "h-11 px-5 text-[13.5px] rounded-xl",
  };

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-1.5 font-bold transition active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export const StatusBadge = ({ status }) => {
  const meta = ORDER_STATUS_META[status] ?? ORDER_STATUS_META.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${meta.badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
};

export const inputCls =
  "w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-[13px] text-slate-800 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10";

export const Field = ({ label, hint, children, className = "" }) => (
  <label className={`block ${className}`}>
    <span className="block text-[12px] font-bold text-slate-700 mb-1.5">
      {label}
    </span>
    {children}
    {hint && (
      <span className="block text-[11.5px] text-slate-400 mt-1">{hint}</span>
    )}
  </label>
);

export const EmptyState = ({ icon, title, message, action }) => (
  <div className="py-14 px-6 text-center">
    <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-50 border border-slate-200 text-slate-400 flex items-center justify-center text-[26px]">
      {icon}
    </div>
    <h3 className="text-[15px] font-bold text-slate-900 mt-4">{title}</h3>
    {message && (
      <p className="text-[13px] text-slate-500 mt-1 max-w-sm mx-auto">
        {message}
      </p>
    )}
    {action && <div className="mt-4 flex justify-center">{action}</div>}
  </div>
);

export const Modal = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = "md",
}) => {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const widths = {
    sm: "max-w-[440px]",
    md: "max-w-[660px]",
    lg: "max-w-[880px]",
  };

  return (
    <div
      className="fixed inset-0 z-[300] flex items-start sm:items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${widths[size]} bg-white rounded-2xl shadow-2xl border border-slate-200 my-6`}
      >
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-[17px] font-extrabold text-slate-900">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[12.5px] text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 flex items-center justify-center transition"
            aria-label="Close dialog"
          >
            <IoClose className="text-[18px]" />
          </button>
        </div>

        <div className="px-5 py-5 max-h-[calc(100vh-230px)] overflow-y-auto">
          {children}
        </div>

        {footer && (
          <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/70 rounded-b-2xl flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
