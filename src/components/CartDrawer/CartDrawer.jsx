import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { IoClose, IoBagCheckOutline, IoGiftOutline, IoTicketOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { useStore } from "../../context/StoreContext";
import { formatPrice, discountPercent } from "../../utils/format";

const FREE_SHIPPING_THRESHOLD = 2000;

const CartDrawer = () => {
  const {
    cart,
    cartSubtotal,
    cartTotal,
    cartCount,
    updateCartQty,
    removeFromCart,
    cartDrawerOpen,
    setCartDrawerOpen,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponDiscount,
  } = useStore();

  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState("");

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    if (!res.success) {
      setCouponMsg(res.message);
    } else {
      setCouponMsg("");
      setCouponCode("");
    }
  };

  const progressToFreeShip = Math.min(
    100,
    Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );
  const remainingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  return (
    <Drawer
      anchor="right"
      open={cartDrawerOpen}
      onClose={() => setCartDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: "420px" },
          maxWidth: "100vw",
          borderRadius: { sm: "24px 0 0 24px" },
          overflow: "hidden",
        },
      }}
    >
      <div className="w-full h-full flex flex-col bg-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <IoBagCheckOutline className="text-[20px]" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-slate-900 leading-tight">
                Shopping Bag
              </h3>
              <span className="text-[12px] text-slate-400">
                {cartCount} {cartCount === 1 ? "item" : "items"} selected
              </span>
            </div>
          </div>

          <button
            onClick={() => setCartDrawerOpen(false)}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition"
            aria-label="Close cart drawer"
          >
            <IoClose className="text-[20px]" />
          </button>
        </div>

        {/* Free Shipping Dynamic Progress */}
        <div className="px-6 py-3 bg-gradient-to-r from-rose-50/60 to-amber-50/60 border-b border-rose-100/50">
          <div className="flex items-center justify-between text-[12px] font-semibold text-slate-700 mb-1.5">
            <span className="flex items-center gap-1.5">
              <TbTruckDelivery className="text-[17px] text-rose-600" />
              {remainingForFreeShip === 0 ? (
                <span className="text-emerald-600 font-bold">
                  🎉 Free Shipping Unlocked!
                </span>
              ) : (
                <span>
                  Add <b className="text-rose-600 font-bold">{formatPrice(remainingForFreeShip)}</b> for Free Shipping
                </span>
              )}
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              {progressToFreeShip}%
            </span>
          </div>

          <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressToFreeShip}%` }}
            />
          </div>
        </div>

        {/* Empty State */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-[40px] mb-2 shadow-inner border border-slate-100">
              🛍️
            </div>
            <h4 className="text-[17px] font-bold text-slate-900">
              Your Shopping Bag is Empty
            </h4>
            <p className="text-[13px] text-slate-500 max-w-xs">
              Explore our luxury mechanical, skeleton, and quartz collections to find your perfect match.
            </p>
            <Link
              to="/shop"
              onClick={() => setCartDrawerOpen(false)}
              className="mt-4 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-[13.5px] transition shadow-lg shadow-rose-600/25"
            >
              Start Shopping →
            </Link>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-slate-100">
              {cart.map(({ product, qty }) => {
                const disc = discountPercent(product.price, product.oldPrice);
                return (
                  <div key={product.id} className="py-4 flex gap-3.5 group">
                    <Link
                      to={`/product/${product.id}`}
                      onClick={() => setCartDrawerOpen(false)}
                      className="w-20 h-20 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 p-1 flex items-center justify-center"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 block">
                            {product.brand}
                          </span>
                          <Link
                            to={`/product/${product.id}`}
                            onClick={() => setCartDrawerOpen(false)}
                            className="text-[13px] font-bold text-slate-900 hover:text-rose-600 line-clamp-1 block transition-colors"
                          >
                            {product.name}
                          </Link>
                        </div>

                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition"
                          aria-label="Remove item"
                        >
                          <MdDeleteOutline className="text-[19px]" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Stepper */}
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                          <button
                            onClick={() => updateCartQty(product.id, qty - 1)}
                            className="w-7 h-7 text-[16px] text-slate-600 hover:bg-slate-200 transition font-bold"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-[12px] font-bold text-slate-900">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateCartQty(product.id, qty + 1)}
                            className="w-7 h-7 text-[16px] text-slate-600 hover:bg-slate-200 transition font-bold"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-[14px] font-extrabold text-rose-600 block">
                            {formatPrice(product.price * qty)}
                          </span>
                          {qty > 1 && (
                            <span className="text-[10.5px] text-slate-400 block">
                              {formatPrice(product.price)} each
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Summary & Checkout */}
            <div className="p-6 bg-slate-50 border-t border-slate-200/80 space-y-4">
              {/* Promo Code Input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[12px]">
                    <span className="flex items-center gap-1.5 font-bold">
                      <IoTicketOutline className="text-[16px]" />
                      Code: {appliedCoupon.code} (-{appliedCoupon.discountPercent}%)
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-700 hover:text-rose-600 font-bold underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        setCouponMsg("");
                      }}
                      placeholder="Promo code (e.g. OLEVS10)"
                      className="flex-1 h-9 px-3 text-[12.5px] rounded-lg border border-slate-200 bg-white uppercase font-mono tracking-wider focus:outline-none focus:border-rose-500"
                    />
                    <button
                      type="submit"
                      className="px-3.5 h-9 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[12px] font-bold transition"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponMsg && (
                  <p className="text-[11px] text-rose-600 mt-1">{couponMsg}</p>
                )}
              </div>

              {/* Subtotal & Discount Rows */}
              <div className="space-y-1.5 text-[13px]">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-{formatPrice(couponDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold">
                    {cartSubtotal >= FREE_SHIPPING_THRESHOLD ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      formatPrice(80)
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="text-[15px] font-bold text-slate-900">Total</span>
                  <span className="text-[20px] font-extrabold text-rose-600">
                    {formatPrice(
                      cartSubtotal >= FREE_SHIPPING_THRESHOLD
                        ? cartTotal
                        : cartTotal + 80
                    )}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <Link
                  to="/cart"
                  onClick={() => setCartDrawerOpen(false)}
                  className="py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 font-bold text-[13px] text-slate-800 text-center transition hover:bg-slate-100"
                >
                  View Cart
                </Link>

                <Link
                  to="/checkout"
                  onClick={() => setCartDrawerOpen(false)}
                  className="py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 font-bold text-[13px] text-white text-center transition shadow-lg shadow-rose-600/25 active:scale-95"
                >
                  Checkout Now →
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Drawer>
  );
};

export default CartDrawer;
