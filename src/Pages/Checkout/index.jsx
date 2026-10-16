import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import BreedCrumps from "../../components/BreedCrumps/BreedCrumps";
import { useStore } from "../../context/StoreContext";
import { formatPrice } from "../../utils/format";

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Dhaka",
    notes: "",
  });
  const [payment, setPayment] = useState("cod");
  const [orderId, setOrderId] = useState(null);

  const shipping = cartTotal >= 2000 || cartTotal === 0 ? 0 : 80;
  const total = cartTotal + shipping;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const placeOrder = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill in your name, phone and address.");
      return;
    }
    setOrderId("OWS-" + Math.floor(100000 + Math.random() * 900000));
    clearCart();
    window.scrollTo({ top: 0 });
  };

  if (orderId) {
    return (
      <div className="container py-20 text-center">
        <span className="text-[64px]">🎉</span>
        <h1 className="text-[28px] font-[700] mt-4">Order Placed Successfully!</h1>
        <p className="text-[15px] text-[rgba(0,0,0,0.6)] mt-2">
          Thank you, {form.name.split(" ")[0] || "friend"}! Your order{" "}
          <b className="text-[#ff5252]">#{orderId}</b> has been received.
        </p>
        <p className="text-[13px] text-[rgba(0,0,0,0.5)] mt-1">
          We'll call you at {form.phone} to confirm delivery.
        </p>
        <div className="flex items-center justify-center gap-3 mt-8">
          <Link to="/">
            <Button variant="outlined" className="!normal-case !border-black !text-black">
              Back to Home
            </Button>
          </Link>
          <Link to="/order-tracking">
            <Button className="btn-org !normal-case">Track Order</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <>
        <BreedCrumps items={[{ label: "Checkout" }]} />
        <div className="container py-20 text-center">
          <span className="text-[64px]">🧾</span>
          <h2 className="text-[24px] font-[700] mt-4">Nothing to check out</h2>
          <p className="text-[rgba(0,0,0,0.5)] mt-2">
            Your cart is empty — add some watches first.
          </p>
          <Link to="/shop">
            <Button className="btn-org !mt-6 !normal-case !px-8">
              Go to Shop
            </Button>
          </Link>
        </div>
      </>
    );
  }

  const inputCls =
    "w-full h-[46px] border border-[rgba(0,0,0,0.2)] rounded-md px-3.5 text-[14px] outline-none focus:border-[#ff5252] transition";

  return (
    <>
      <BreedCrumps items={[{ label: "Home", to: "/" }, { label: "Checkout" }]} />
      <section className="py-8 bg-white">
        <div className="container">
          <h1 className="text-[26px] font-[700] mb-6">Checkout</h1>

          <form
            onSubmit={placeOrder}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Billing */}
            <div className="lg:col-span-2 space-y-6">
              <div className="border border-[rgba(0,0,0,0.08)] rounded-xl p-6">
                <h3 className="text-[17px] font-[700] mb-4">
                  1. Shipping Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    required
                    placeholder="Full Name *"
                    value={form.name}
                    onChange={set("name")}
                    className={inputCls}
                  />
                  <input
                    required
                    placeholder="Phone Number *"
                    value={form.phone}
                    onChange={set("phone")}
                    className={inputCls}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={set("email")}
                    className={`${inputCls} sm:col-span-2`}
                  />
                  <input
                    required
                    placeholder="Full Address (House, Road, Area) *"
                    value={form.address}
                    onChange={set("address")}
                    className={`${inputCls} sm:col-span-2`}
                  />
                  <select
                    value={form.city}
                    onChange={set("city")}
                    className={inputCls}
                  >
                    {["Dhaka", "Chattogram", "Sylhet", "Khulna", "Rajshahi", "Barishal", "Rangpur"].map(
                      (c) => (
                        <option key={c}>{c}</option>
                      )
                    )}
                  </select>
                  <input
                    placeholder="Delivery Notes (optional)"
                    value={form.notes}
                    onChange={set("notes")}
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="border border-[rgba(0,0,0,0.08)] rounded-xl p-6">
                <h3 className="text-[17px] font-[700] mb-4">
                  2. Payment Method
                </h3>
                <div className="space-y-3">
                  {[
                    ["cod", "💵 Cash on Delivery", "Pay when you receive your order"],
                    ["bkash", "📱 bKash / Nagad", "Send payment to 01799-018864"],
                    ["card", "💳 Credit / Debit Card", "Visa, Mastercard, Amex accepted"],
                  ].map(([key, label, desc]) => (
                    <label
                      key={key}
                      className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition ${
                        payment === key
                          ? "border-[#ff5252] bg-[#fff5f5]"
                          : "border-[rgba(0,0,0,0.12)] hover:border-[rgba(0,0,0,0.3)]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={payment === key}
                        onChange={() => setPayment(key)}
                        className="accent-[#ff5252] w-[18px] h-[18px]"
                      />
                      <span>
                        <span className="block text-[14.5px] font-[600]">
                          {label}
                        </span>
                        <span className="block text-[12.5px] text-[rgba(0,0,0,0.5)]">
                          {desc}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-[#fafafa] rounded-xl p-6 h-fit border border-[rgba(0,0,0,0.06)]">
              <h3 className="text-[17px] font-[700] mb-4">Your Order</h3>
              <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
                {cart.map(({ product, qty }) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt=""
                      className="w-[48px] h-[48px] rounded-md object-cover bg-white"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px] font-[500] truncate">
                        {product.name}
                      </p>
                      <p className="text-[11.5px] text-[rgba(0,0,0,0.45)]">
                        Qty: {qty}
                      </p>
                    </div>
                    <span className="text-[13px] font-[600]">
                      {formatPrice(product.price * qty)}
                    </span>
                  </div>
                ))}
              </div>
              <hr className="my-4" />
              <div className="space-y-2.5 text-[14px]">
                <div className="flex justify-between">
                  <span className="text-[rgba(0,0,0,0.6)]">Subtotal</span>
                  <span className="font-[600]">{formatPrice(cartTotal)}</span>
                </div>
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
              <Button
                type="submit"
                className="btn-org w-full !mt-5 !normal-case !py-3"
              >
                Place Order →
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;
