import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import BreedCrumps from "../../components/BreedCrumps/BreedCrumps";
import QuantityBox from "../../components/QuantityBox/QuantityBox";
import { useStore } from "../../context/StoreContext";
import { formatPrice, discountPercent } from "../../utils/format";
import { MdDeleteOutline } from "react-icons/md";

const Cart = () => {
  const { cart, cartTotal, updateCartQty, removeFromCart } = useStore();
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  const discount = appliedCoupon ? Math.round(cartTotal * 0.1) : 0;
  const shipping = cartTotal >= 2000 || cartTotal === 0 ? 0 : 80;
  const total = Math.max(0, cartTotal - discount + shipping);

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "OLEVS10") {
      setAppliedCoupon("OLEVS10");
      setCouponError("");
    } else {
      setAppliedCoupon(null);
      setCouponError("Invalid coupon code. Try OLEVS10");
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <BreedCrumps items={[{ label: "Shopping Cart" }]} />
        <div className="container py-20 text-center">
          <span className="text-[64px]">🛒</span>
          <h2 className="text-[24px] font-[700] mt-4">Your cart is empty</h2>
          <p className="text-[rgba(0,0,0,0.5)] mt-2">
            Looks like you haven't added anything yet.
          </p>
          <Link to="/shop">
            <Button className="btn-org !mt-6 !normal-case !px-8">
              Start Shopping
            </Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <BreedCrumps items={[{ label: "Shopping Cart" }]} />
      <section className="py-8 bg-white">
        <div className="container">
          <h1 className="text-[26px] font-[700] mb-6">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2">
              <div className="hidden sm:grid grid-cols-[1fr_120px_140px_50px] text-[12px] uppercase tracking-wide text-[rgba(0,0,0,0.45)] font-[600] pb-3 border-b">
                <span>Product</span>
                <span className="text-center">Price</span>
                <span className="text-center">Quantity</span>
                <span></span>
              </div>

              {cart.map(({ product, qty }) => (
                <div
                  key={product.id}
                  className="grid grid-cols-1 sm:grid-cols-[1fr_120px_140px_50px] items-center gap-4 py-4 border-b border-[rgba(0,0,0,0.07)]"
                >
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/product/${product.id}`}
                      className="w-[80px] h-[80px] rounded-md overflow-hidden bg-[#f7f7f7] shrink-0"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div>
                      <p className="text-[11px] font-[700] uppercase text-[#ff5252]">
                        {product.brand}
                      </p>
                      <Link
                        to={`/product/${product.id}`}
                        className="text-[14px] font-[500] hover:text-[#ff5252] line-clamp-2"
                      >
                        {product.name}
                      </Link>
                      <p className="text-[12px] text-[rgba(0,0,0,0.45)] mt-0.5">
                        SKU: {product.sku}
                      </p>
                    </div>
                  </div>

                  <div className="sm:text-center">
                    <span className="sm:hidden text-[12px] text-[rgba(0,0,0,0.5)] mr-1">
                      Price:
                    </span>
                    {discountPercent(product.price, product.oldPrice) > 0 && (
                      <span className="line-through text-[rgba(0,0,0,0.35)] text-[12px] mr-1">
                        {formatPrice(product.oldPrice)}
                      </span>
                    )}
                    <span className="text-[14px] font-[600] text-[#ff5252]">
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  <div className="flex sm:justify-center">
                    <QuantityBox
                      value={qty}
                      onChange={(v) => updateCartQty(product.id, v)}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-[20px] text-[rgba(0,0,0,0.35)] hover:text-[#ff5252]"
                      aria-label="Remove"
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex flex-wrap items-center gap-3 mt-6">
                <Link to="/shop">
                  <Button variant="outlined" className="!normal-case !border-black !text-black">
                    ← Continue Shopping
                  </Button>
                </Link>
                <div className="flex items-center gap-2 ml-auto">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon code (try OLEVS10)"
                    className="h-[42px] border border-[rgba(0,0,0,0.2)] rounded-md px-3 text-[13px] outline-none focus:border-[#ff5252] w-[220px]"
                  />
                  <Button
                    onClick={applyCoupon}
                    className="!normal-case !bg-black !text-white hover:!bg-[#ff5252]"
                  >
                    Apply
                  </Button>
                </div>
                {couponError && (
                  <p className="text-[12px] text-red-500 w-full sm:w-auto">
                    {couponError}
                  </p>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-[#fafafa] rounded-xl p-6 h-fit border border-[rgba(0,0,0,0.06)]">
              <h3 className="text-[18px] font-[700] mb-4">Order Summary</h3>
              <div className="space-y-3 text-[14px]">
                <div className="flex justify-between">
                  <span className="text-[rgba(0,0,0,0.6)]">Subtotal</span>
                  <span className="font-[600]">{formatPrice(cartTotal)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon ({appliedCoupon})</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[rgba(0,0,0,0.6)]">Shipping</span>
                  <span className="font-[600]">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <hr />
                <div className="flex justify-between text-[18px] font-[700]">
                  <span>Total</span>
                  <span className="text-[#ff5252]">{formatPrice(total)}</span>
                </div>
              </div>
              <Link to="/checkout">
                <Button className="btn-org w-full !mt-5 !normal-case !py-3">
                  Proceed to Checkout →
                </Button>
              </Link>
              <p className="text-[11.5px] text-[rgba(0,0,0,0.45)] mt-3 text-center">
                🚚 Free shipping on orders over ৳2,000
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
