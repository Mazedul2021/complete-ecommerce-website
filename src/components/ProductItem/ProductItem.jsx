import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Tooltip from "@mui/material/Tooltip";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { IoCartOutline, IoFlash, IoCheckmark } from "react-icons/io5";
import { useStore } from "../../context/StoreContext";
import { formatPrice, discountPercent } from "../../utils/format";

const ProductItem = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, openQuickView } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const disc = discountPercent(product.price, product.oldPrice);
  const inWishlist = isInWishlist(product.id);

  // Use second image on hover if available and not explicitly selecting a thumbnail
  const currentImg =
    activeImgIndex !== 0
      ? product.images[activeImgIndex]
      : isHovered && product.images[1]
      ? product.images[1]
      : product.images[0];

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div
      className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_35px_-4px_rgba(15,23,42,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveImgIndex(0);
      }}
    >
      {/* Image Area */}
      <div className="relative w-full pt-[95%] bg-gradient-to-b from-slate-50 to-white overflow-hidden rounded-t-2xl">
        <Link
          to={`/product/${product.id}`}
          className="absolute inset-0 flex items-center justify-center p-3"
        >
          <img
            src={currentImg}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {disc > 0 && (
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-rose-600 to-rose-500 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
              <IoFlash className="text-[11px]" /> -{disc}%
            </span>
          )}
          {product.latest && (
            <span className="inline-flex items-center bg-slate-900/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              NEW
            </span>
          )}
        </div>

        {/* Floating Quick Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-20 translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <Tooltip title={inWishlist ? "Remove from wishlist" : "Add to wishlist"} placement="left">
            <button
              onClick={handleWishlist}
              className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md backdrop-blur-md transition-all ${
                inWishlist
                  ? "bg-rose-50 text-rose-600 scale-110"
                  : "bg-white/95 text-slate-700 hover:bg-rose-600 hover:text-white"
              }`}
              aria-label="Wishlist toggle"
            >
              {inWishlist ? (
                <FaHeart className="text-[15px] heart-beat" />
              ) : (
                <FaRegHeart className="text-[15px]" />
              )}
            </button>
          </Tooltip>

          <Tooltip title="Quick View" placement="left">
            <button
              onClick={handleQuickView}
              className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-md text-slate-700 hover:bg-slate-900 hover:text-white flex items-center justify-center shadow-md transition-all"
              aria-label="Quick preview"
            >
              <MdOutlineZoomOutMap className="text-[17px]" />
            </button>
          </Tooltip>
        </div>

        {/* Interactive Thumbnail Indicator Dots */}
        {product.images && product.images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-auto">
            {product.images.slice(0, 3).map((_, idx) => (
              <button
                key={idx}
                onMouseEnter={() => setActiveImgIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeImgIndex === idx
                    ? "w-5 bg-rose-600"
                    : "bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Preview angle ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Details Info */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between bg-white rounded-b-2xl">
        <div>
          {/* Brand & Stock Pill */}
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-rose-600">
              {product.brand}
            </span>
            {product.stock && product.stock <= 15 ? (
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                Only {product.stock} left
              </span>
            ) : (
              <span className="text-[10px] font-semibold text-slate-400">
                {product.movement}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="text-[13px] sm:text-[14px] font-semibold text-slate-900 mt-1 line-clamp-2 leading-snug group-hover:text-rose-600 transition-colors">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>

          {/* Ratings */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <Rating
              value={product.rating}
              precision={0.1}
              size="small"
              readOnly
              className="!text-[14px]"
            />
            <span className="text-[11px] font-bold text-slate-700">
              {product.rating}
            </span>
            <span className="text-[10.5px] text-slate-400">
              ({product.reviews})
            </span>
          </div>
        </div>

        {/* Price & CTA Button */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-1">
            <div className="flex items-baseline gap-2">
              <span className="text-[15px] sm:text-[17px] font-extrabold text-rose-600">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice > product.price && (
                <span className="text-[12px] text-slate-400 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
            {product.waterResist && (
              <span className="text-[10px] text-slate-400 font-mono">
                {product.waterResist}
              </span>
            )}
          </div>

          {/* Interactive Add To Cart Button */}
          <button
            onClick={handleQuickAdd}
            className={`w-full py-2 px-3 rounded-xl font-bold text-[12.5px] flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 ${
              addedAnimation
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "bg-slate-50 hover:bg-rose-600 text-slate-800 hover:text-white border border-slate-200/80 hover:border-rose-600 shadow-sm"
            }`}
          >
            {addedAnimation ? (
              <>
                <IoCheckmark className="text-[16px] animate-bounce" /> Added!
              </>
            ) : (
              <>
                <IoCartOutline className="text-[16px]" /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
