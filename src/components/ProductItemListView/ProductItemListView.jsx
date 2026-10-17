import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Tooltip from "@mui/material/Tooltip";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { IoCartOutline, IoCheckmark, IoFlash } from "react-icons/io5";
import { useStore } from "../../context/StoreContext";
import { formatPrice, discountPercent } from "../../utils/format";

const ProductItemListView = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, openQuickView } = useStore();
  const [addedAnimation, setAddedAnimation] = useState(false);

  const disc = discountPercent(product.price, product.oldPrice);
  const inWishlist = isInWishlist(product.id);

  const handleQuickAdd = () => {
    addToCart(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_35px_-4px_rgba(15,23,42,0.1)] hover:-translate-y-1 transition-all duration-300 p-4 sm:p-5 flex flex-col md:flex-row gap-5 items-center">
      {/* Image Area */}
      <div className="relative w-full md:w-[240px] h-[220px] rounded-xl overflow-hidden bg-gradient-to-b from-slate-50 to-white border border-slate-100 shrink-0 flex items-center justify-center p-3">
        <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {disc > 0 && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-rose-600 to-rose-500 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
            <IoFlash /> -{disc}%
          </span>
        )}

        {/* Quick View Button */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Tooltip title="Quick View">
            <button
              onClick={() => openQuickView(product)}
              className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md text-slate-700 hover:bg-slate-900 hover:text-white flex items-center justify-center transition"
              aria-label="Quick view"
            >
              <MdOutlineZoomOutMap className="text-[17px]" />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Info Area */}
      <div className="flex-1 min-w-0 w-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
              {product.brand}
            </span>
            {product.stock > 0 ? (
              <span className="text-[12px] font-semibold text-emerald-600">
                ● In Stock ({product.stock})
              </span>
            ) : (
              <span className="text-[12px] font-semibold text-rose-500">
                ● Out of Stock
              </span>
            )}
          </div>

          <h3 className="text-[16px] sm:text-[18px] font-bold text-slate-900 mt-2 hover:text-rose-600 transition-colors">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>

          <div className="flex items-center gap-2 mt-2">
            <Rating value={product.rating} precision={0.1} size="small" readOnly />
            <span className="text-[12.5px] font-bold text-slate-700">
              {product.rating}
            </span>
            <span className="text-[12px] text-slate-400">
              ({product.reviews} reviews)
            </span>
          </div>

          <p className="text-[13.5px] text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Quick Specs Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="text-[11.5px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">
              Strap: <b className="text-slate-900">{product.strap}</b>
            </span>
            <span className="text-[11.5px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">
              Movement: <b className="text-slate-900">{product.movement}</b>
            </span>
            <span className="text-[11.5px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">
              Water Resist: <b className="text-slate-900">{product.waterResist}</b>
            </span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-baseline gap-2.5">
            <span className="text-[20px] sm:text-[22px] font-extrabold text-rose-600">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice > product.price && (
              <span className="text-[14px] text-slate-400 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => toggleWishlist(product)}
              className={`px-3.5 py-2.5 rounded-xl border text-[13px] font-semibold flex items-center gap-1.5 transition ${
                inWishlist
                  ? "bg-rose-50 border-rose-300 text-rose-600"
                  : "border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              {inWishlist ? (
                <FaHeart className="text-rose-600" />
              ) : (
                <FaRegHeart />
              )}
              <span>{inWishlist ? "Saved" : "Save"}</span>
            </button>

            <button
              onClick={handleQuickAdd}
              className={`py-2.5 px-5 rounded-xl font-bold text-[13px] flex items-center gap-2 transition shadow-md active:scale-95 ${
                addedAnimation
                  ? "bg-emerald-600 text-white shadow-emerald-600/30"
                  : "bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white shadow-rose-600/25"
              }`}
            >
              {addedAnimation ? (
                <>
                  <IoCheckmark className="text-[17px]" /> Added!
                </>
              ) : (
                <>
                  <IoCartOutline className="text-[17px]" /> Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItemListView;
