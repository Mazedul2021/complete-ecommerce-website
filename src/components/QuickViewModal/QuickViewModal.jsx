import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { formatPrice, discountPercent } from "../../utils/format";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { IoClose, IoCartOutline, IoHeart, IoHeartOutline, IoSparklesOutline, IoCheckmarkCircle } from "react-icons/io5";
import { TbTruckDelivery, TbShieldCheck } from "react-icons/tb";

const QuickViewModal = () => {
  const { quickViewProduct, closeQuickView, addToCart, toggleWishlist, isInWishlist } = useStore();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (quickViewProduct) {
      setActiveImg(0);
      setQty(1);
      setSelectedColor(quickViewProduct.colors?.[0] || "");
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const inWishlist = isInWishlist(product.id);
  const disc = discountPercent(product.price, product.oldPrice);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoomPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleAddToCart = () => {
    addToCart(product, qty);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    closeQuickView();
    navigate("/checkout");
  };

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={closeQuickView}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 my-auto animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-950 flex items-center justify-center transition"
          aria-label="Close modal"
        >
          <IoClose className="text-[22px]" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery Column */}
          <div className="p-6 sm:p-8 bg-slate-50/70 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100">
            {/* Main Preview with interactive zoom */}
            <div
              className="relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-200/60 cursor-crosshair flex items-center justify-center"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images[activeImg] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-contain p-4 transition-transform duration-150 ease-out"
                style={{
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: isZoomed ? "scale(2)" : "scale(1)",
                }}
              />

              {disc > 0 && (
                <span className="absolute top-3 left-3 bg-gradient-to-r from-rose-600 to-rose-500 text-white text-[12px] font-bold px-3 py-1 rounded-full shadow-md shadow-rose-600/30">
                  SAVE {disc}%
                </span>
              )}

              {product.movement && (
                <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <IoSparklesOutline className="text-amber-400" />
                  {product.movement}
                </span>
              )}
            </div>

            {/* Thumbnails row */}
            <div className="flex items-center gap-2.5 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden bg-white border-2 transition-all shrink-0 p-1 ${
                    activeImg === idx
                      ? "border-rose-600 shadow-md shadow-rose-600/20 scale-105"
                      : "border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-extrabold uppercase tracking-widest text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-md">
                  {product.brand}
                </span>
                <span className="text-[12px] font-medium text-emerald-600 flex items-center gap-1">
                  <IoCheckmarkCircle /> In Stock ({product.stock})
                </span>
              </div>

              <h2 className="text-[20px] sm:text-[22px] font-bold text-slate-900 mt-2 leading-snug">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <Rating value={product.rating} precision={0.1} size="small" readOnly />
                <span className="text-[13px] font-bold text-slate-700">
                  {product.rating}
                </span>
                <span className="text-[12.5px] text-slate-400">
                  ({product.reviews} reviews)
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[12px] text-slate-500 font-mono">
                  {product.sku}
                </span>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-[28px] font-extrabold text-rose-600">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice > product.price && (
                  <span className="text-[16px] text-slate-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                {disc > 0 && (
                  <span className="text-[12px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                    Save {formatPrice(product.oldPrice - product.price)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-[13.5px] text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                {product.description}
              </p>

              {/* Color selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <span className="text-[12.5px] font-semibold text-slate-700 block mb-2">
                    Color: <b className="text-slate-900 font-bold">{selectedColor}</b>
                  </span>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`px-3 py-1 text-[12px] rounded-lg border font-medium transition ${
                          selectedColor === c
                            ? "bg-rose-50 border-rose-600 text-rose-600 font-bold shadow-sm"
                            : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Specs badges */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-[12px]">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <TbTruckDelivery className="text-[16px] text-rose-500" />
                  <span>Free Express Delivery (৳2,000+)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <TbShieldCheck className="text-[16px] text-rose-500" />
                  <span>1-Year Official Warranty</span>
                </div>
              </div>
            </div>

            {/* Interaction Row: Stepper & CTA buttons */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50 shrink-0">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-11 flex items-center justify-center text-[18px] text-slate-600 hover:bg-slate-200 transition font-bold"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-bold text-slate-900 text-[14px]">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}
                    className="w-10 h-11 flex items-center justify-center text-[18px] text-slate-600 hover:bg-slate-200 transition font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-11 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white font-bold text-[14px] rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-rose-600/25 transition active:scale-[0.98]"
                >
                  <IoCartOutline className="text-[18px]" />
                  Add to Cart
                </button>

                {/* Wishlist toggle */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center transition shrink-0 ${
                    inWishlist
                      ? "bg-rose-50 border-rose-300 text-rose-600 shadow-sm"
                      : "border-slate-200 text-slate-600 hover:border-slate-300 hover:text-rose-600"
                  }`}
                  aria-label="Wishlist"
                >
                  {inWishlist ? (
                    <IoHeart className="text-[20px]" />
                  ) : (
                    <IoHeartOutline className="text-[20px]" />
                  )}
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="flex items-center justify-between gap-3 mt-3">
                <button
                  onClick={handleBuyNow}
                  className="w-full py-2 rounded-xl border border-slate-900 hover:bg-slate-900 hover:text-white font-bold text-[13px] text-slate-900 transition"
                >
                  Buy Now with 1-Click
                </button>
                <Link
                  to={`/product/${product.id}`}
                  onClick={closeQuickView}
                  className="text-center text-[13px] font-semibold text-rose-600 hover:text-rose-700 hover:underline whitespace-nowrap px-2"
                >
                  Full Details →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
