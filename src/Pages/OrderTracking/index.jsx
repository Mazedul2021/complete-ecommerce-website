import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import BreedCrumps from "../../components/BreedCrumps/BreedCrumps";
import { api } from "../../api/client";
import { formatPrice } from "../../utils/format";

const STEPS = [
  {
    icon: "📦",
    title: "Order Placed",
    desc: "Your order has been received",
    status: "pending",
  },
  {
    icon: "✅",
    title: "Confirmed",
    desc: "We've confirmed your order by phone",
    status: "confirmed",
  },
  {
    icon: "🏭",
    title: "Packed",
    desc: "Quality-checked & packed with care",
    status: "packed",
  },
  {
    icon: "🚚",
    title: "Shipped",
    desc: "Handed to courier — on the way",
    status: "shipped",
  },
  {
    icon: "🏠",
    title: "Delivered",
    desc: "Enjoy your new watch!",
    status: "delivered",
  },
];

const RANK = { pending: 0, confirmed: 1, packed: 2, shipped: 3, delivered: 4 };

const PAYMENT_LABELS = {
  cod: "Cash on Delivery",
  bkash: "bKash / Nagad",
  card: "Credit / Debit Card",
};

const STATUS_LABELS = {
  pending: "Awaiting confirmation",
  confirmed: "Confirmed",
  packed: "Packed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const formatDateTime = (value) =>
  new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const track = async (event) => {
    event.preventDefault();
    const id = orderId.trim().toUpperCase();

    if (!id) {
      setOrder(null);
      setError("Enter the order ID from your confirmation screen.");
      return;
    }

    setBusy(true);
    setError("");

    try {
      setOrder(await api.orders.get(id));
    } catch (cause) {
      setOrder(null);
      setError(
        cause.status === 404
          ? `We couldn't find an order with the ID ${id}.`
          : cause.message
      );
    } finally {
      setBusy(false);
    }
  };

  const rank = order ? RANK[order.status] ?? -1 : -1;
  const isCancelled = order?.status === "cancelled";
  const isDelivered = order?.status === "delivered";

  const stepState = (index) => {
    if (!order || isCancelled) return "pending";
    if (isDelivered) return "done";
    if (index < rank) return "done";
    if (index === rank) return "current";
    return "pending";
  };

  return (
    <>
      <BreedCrumps items={[{ label: "Order Tracking" }]} />
      <section className="py-12 bg-white min-h-[55vh]">
        <div className="container max-w-[720px]">
          <div className="text-center mb-8">
            <h1 className="text-[28px] font-[700]">Track Your Order</h1>
            <p className="text-[14px] text-[rgba(0,0,0,0.55)] mt-2">
              Enter your order ID (e.g. OWS-482911) to see the latest status.
            </p>
          </div>

          <form
            onSubmit={track}
            className="flex flex-col sm:flex-row gap-3 max-w-[520px] mx-auto"
          >
            <input
              value={orderId}
              onChange={(event) => setOrderId(event.target.value)}
              placeholder="OWS-000000"
              className="flex-1 h-[48px] border border-[rgba(0,0,0,0.2)] rounded-md px-4 text-[14px] outline-none focus:border-[#ff5252]"
            />
            <Button
              type="submit"
              disabled={busy}
              className="btn-org !normal-case !px-8"
            >
              {busy ? "Checking…" : "Track"}
            </Button>
          </form>

          {error && (
            <p className="mt-6 mx-auto max-w-[520px] text-center text-[13px] font-[600] text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3.5 py-2.5">
              {error}
            </p>
          )}

          {order && (
            <div className="mt-12 space-y-5">
              <div className="bg-[#fafafa] rounded-xl p-6 border border-[rgba(0,0,0,0.06)]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-4 border-b border-[rgba(0,0,0,0.07)]">
                  <div>
                    <p className="text-[15px] font-[700]">Order #{order.id}</p>
                    <p className="text-[12.5px] text-[rgba(0,0,0,0.5)]">
                      Placed on {formatDateTime(order.date)} ·{" "}
                      {PAYMENT_LABELS[order.payment] ?? order.payment}
                    </p>
                  </div>
                  <span
                    className={`text-[12px] font-[600] px-3 py-1.5 rounded-full ${
                      isCancelled
                        ? "bg-slate-200 text-slate-600"
                        : isDelivered
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-[#fff5f5] text-[#ff5252]"
                    }`}
                  >
                    {isCancelled
                      ? "Cancelled"
                      : isDelivered
                      ? "🏠 Delivered"
                      : `🚚 ${STATUS_LABELS[order.status] ?? order.status}`}
                  </span>
                </div>

                {isCancelled ? (
                  <p className="text-[13.5px] text-[rgba(0,0,0,0.6)] mb-6">
                    This order was cancelled. If this looks wrong, contact us and
                    we'll sort it out.
                  </p>
                ) : (
                  <div className="space-y-0">
                    {STEPS.map((step, index) => {
                      const state = stepState(index);
                      const pending = state === "pending";
                      const isCurrent = state === "current";
                      return (
                        <div key={step.title} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <span
                              className={`w-[44px] h-[44px] rounded-full flex items-center justify-center text-[18px] ${
                                pending
                                  ? "bg-[#eee] opacity-60"
                                  : "bg-[#ff5252] text-white"
                              }`}
                            >
                              {step.icon}
                            </span>
                            {index < STEPS.length - 1 && (
                              <span
                                className={`w-[2px] flex-1 min-h-[36px] ${
                                  stepState(index + 1) === "pending"
                                    ? "bg-[#eee]"
                                    : "bg-[#ff5252]"
                                }`}
                              />
                            )}
                          </div>
                          <div className="pb-8">
                            <p
                              className={`text-[15px] font-[600] ${
                                pending ? "text-[rgba(0,0,0,0.35)]" : ""
                              }`}
                            >
                              {step.title}
                              {isCurrent && (
                                <span className="ml-2 text-[11px] bg-[#ff5252] text-white px-2 py-0.5 rounded-full align-middle">
                                  CURRENT
                                </span>
                              )}
                            </p>
                            <p className="text-[13px] text-[rgba(0,0,0,0.5)] mt-0.5">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="mt-2 pt-4 border-t border-[rgba(0,0,0,0.07)]">
                  <p className="text-[12px] font-[700] uppercase tracking-wider text-[rgba(0,0,0,0.4)] mb-2">
                    {order.items.length} item{order.items.length > 1 ? "s" : ""}
                  </p>
                  <div className="space-y-2.5">
                    {order.items.map((item) => (
                      <div
                        key={`${item.productId}-${item.sku}`}
                        className="flex items-center gap-3"
                      >
                        <img
                          src={item.image}
                          alt=""
                          className="w-[46px] h-[46px] rounded-md object-contain bg-white border border-[rgba(0,0,0,0.06)] p-1"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-[500] truncate">
                            {item.name}
                          </p>
                          <p className="text-[11.5px] text-[rgba(0,0,0,0.45)]">
                            Qty: {item.qty}
                          </p>
                        </div>
                        <span className="text-[13px] font-[600]">
                          {formatPrice(item.price * item.qty)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-baseline mt-4 pt-3 border-t border-[rgba(0,0,0,0.07)] text-[16px] font-[700]">
                    <span>Total</span>
                    <span className="text-[#ff5252]">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[12px] text-[rgba(0,0,0,0.4)] text-center">
                Need help with this order?{" "}
                <Link to="/contact" className="text-[#ff5252] underline">
                  Contact support
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default OrderTracking;
