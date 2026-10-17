import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { IoCheckmarkCircle, IoHeart, IoInformationCircle, IoClose, IoBagCheckOutline } from "react-icons/io5";
import { formatPrice } from "../../utils/format";

const ToastNotification = () => {
  const { toast, hideToast, setCartDrawerOpen } = useStore();
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!toast) {
      setProgress(100);
      return;
    }

    setProgress(100);
    const duration = 3500;
    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= step) {
          clearInterval(timer);
          hideToast();
          return 0;
        }
        return prev - step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [toast, hideToast]);

  if (!toast) return null;

  const isCart = toast.type === "cart";
  const isWishlist = toast.type === "wishlist";

  return (
    <aside
      aria-label="Notifications"
      className="fixed bottom-6 right-6 z-[9999] max-w-[400px] w-[calc(100vw-48px)] animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-slate-900/95 backdrop-blur-xl text-white rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-slate-700/60 overflow-hidden relative">
        <div className="flex items-start gap-3">
          {/* Status Icon */}
          <div className="shrink-0 mt-0.5">
            {isCart && (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center text-white shadow-lg shadow-rose-600/30">
                <IoBagCheckOutline className="text-[20px]" />
              </div>
            )}
            {isWishlist && (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-pink-500/30">
                <IoHeart className="text-[20px]" />
              </div>
            )}
            {!isCart && !isWishlist && (
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-rose-400">
                <IoInformationCircle className="text-[22px]" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-bold text-white tracking-wide">
                {toast.title}
              </span>
            </div>

            <p className="text-[12.5px] text-slate-300 line-clamp-1 mt-0.5">
              {toast.message}
            </p>

            {toast.product && (
              <div className="flex items-center gap-3 mt-2.5 pt-2.5 border-t border-slate-800">
                {toast.product.images?.[0] && (
                  <img
                    src={toast.product.images[0]}
                    alt=""
                    className="w-9 h-9 rounded-lg object-cover bg-slate-800"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider block">
                    {toast.product.brand}
                  </span>
                  <span className="text-[12px] font-bold text-white block">
                    {formatPrice(toast.product.price)}
                  </span>
                </div>

                {isCart && (
                  <button
                    onClick={() => {
                      hideToast();
                      setCartDrawerOpen(true);
                    }}
                    className="text-[12px] font-bold bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded-lg transition shadow-md shadow-rose-600/20 whitespace-nowrap"
                  >
                    View Cart →
                  </button>
                )}

                {isWishlist && (
                  <Link
                    to="/wishlist"
                    onClick={hideToast}
                    className="text-[12px] font-bold bg-slate-800 hover:bg-slate-700 text-rose-400 px-3 py-1.5 rounded-lg transition whitespace-nowrap"
                  >
                    Wishlist →
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Dismiss button */}
          <button
            onClick={hideToast}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition -mr-1 -mt-1"
            aria-label="Dismiss notification"
          >
            <IoClose className="text-[18px]" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </aside>
  );
};

export default ToastNotification;
