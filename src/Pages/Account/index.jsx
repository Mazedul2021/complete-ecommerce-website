import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import BreedCrumps from "../../components/BreedCrumps/BreedCrumps";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api/client";
import { formatPrice } from "../../utils/format";

const STATUS_STYLES = {
  pending: "bg-amber-50 text-amber-700",
  confirmed: "bg-blue-50 text-blue-700",
  packed: "bg-violet-50 text-violet-700",
  shipped: "bg-cyan-50 text-cyan-700",
  delivered: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-slate-100 text-slate-600",
};

const Account = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    api.account
      .orders()
      .then(setOrders)
      .catch((cause) => setError(cause.message))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-[24px] font-[700]">Sign in required</h1>
        <p className="text-[14px] text-[rgba(0,0,0,0.55)] mt-2">
          Please sign in to view your account and orders.
        </p>
        <Link to="/login">
          <Button className="btn-org !mt-6 !normal-case">Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <BreedCrumps items={[{ label: "My Account" }]} />
      <section className="py-10 bg-white min-h-[50vh]">
        <div className="container max-w-[860px]">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-[26px] font-[700]">My Account</h1>
              <p className="text-[13.5px] text-[rgba(0,0,0,0.55)] mt-1">
                {user.name} · {user.email}
                {user.phone ? ` · ${user.phone}` : ""}
              </p>
            </div>
            <Button
              variant="outlined"
              onClick={() => logout()}
              className="!normal-case !border-black !text-black"
            >
              Sign out
            </Button>
          </div>

          <h2 className="text-[17px] font-[700] mb-4">My Orders</h2>

          {loading ? (
            <p className="text-[13.5px] text-[rgba(0,0,0,0.5)]">Loading your orders…</p>
          ) : error ? (
            <p className="text-[13px] font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3.5 py-2.5">
              {error}
            </p>
          ) : orders.length === 0 ? (
            <div className="bg-[#fafafa] rounded-xl border border-[rgba(0,0,0,0.06)] p-10 text-center">
              <p className="text-[15px] font-[600]">No orders yet</p>
              <p className="text-[13px] text-[rgba(0,0,0,0.5)] mt-1">
                When you place an order it will show up here.
              </p>
              <Link to="/shop">
                <Button className="btn-org !mt-4 !normal-case">Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#fafafa] rounded-xl border border-[rgba(0,0,0,0.06)] p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div>
                      <p className="text-[14.5px] font-[700]">Order #{order.id}</p>
                      <p className="text-[12px] text-[rgba(0,0,0,0.45)]">
                        {new Date(order.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        · {order.items.length} item{order.items.length > 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[11.5px] font-[700] px-3 py-1 rounded-full ${STATUS_STYLES[order.status] ?? "bg-slate-100 text-slate-600"}`}
                      >
                        {order.status}
                      </span>
                      <span className="text-[15px] font-[700] text-[#ff5252]">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {order.items.map((item) => (
                      <span
                        key={`${item.productId}-${item.sku}`}
                        className="text-[12px] bg-white border border-[rgba(0,0,0,0.08)] rounded-full px-3 py-1"
                      >
                        {item.name} ×{item.qty}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/order-tracking"
                    className="inline-block mt-3 text-[12.5px] font-[600] text-[#ff5252] hover:underline"
                  >
                    Track this order →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Account;
