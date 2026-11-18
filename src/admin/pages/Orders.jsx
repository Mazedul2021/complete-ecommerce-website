import React, { useMemo, useState } from "react";
import {
  TbSearch,
  TbEye,
  TbPhone,
  TbMail,
  TbMapPin,
  TbReceipt2,
} from "react-icons/tb";
import { useAdmin } from "../useAdmin";
import {
  Button,
  Card,
  EmptyState,
  Modal,
  StatusBadge,
  inputCls,
} from "../components/ui";
import {
  ORDER_STATUSES,
  formatDate,
  formatDateTime,
  paymentLabel,
} from "../data/adminData";
import { formatPrice } from "../../utils/format";

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useAdmin();
  const [status, setStatus] = useState("all");
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(null);

  const tabs = useMemo(
    () => [
      { key: "all", label: "All orders", count: orders.length },
      ...ORDER_STATUSES.map((entry) => ({
        key: entry.key,
        label: entry.label,
        count: orders.filter((order) => order.status === entry.key).length,
      })),
    ],
    [orders]
  );

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return orders.filter((order) => {
      if (status !== "all" && order.status !== status) return false;
      if (!term) return true;
      return (
        order.id.toLowerCase().includes(term) ||
        order.customer.name.toLowerCase().includes(term) ||
        order.customer.phone.toLowerCase().includes(term) ||
        order.customer.email.toLowerCase().includes(term)
      );
    });
  }, [orders, status, query]);

  const activeOrder = orders.find((order) => order.id === activeId) ?? null;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[22px] sm:text-[26px] font-extrabold text-slate-900">
          Order management
        </h2>
        <p className="text-[13px] text-slate-500 mt-1">
          {orders.length} orders ·{" "}
          {orders.filter((order) => order.status === "pending").length} awaiting
          confirmation
        </p>
      </div>

      <Card className="p-4 space-y-3">
        <div className="relative">
          <TbSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[16px]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search order ID, customer name, phone or email…"
            className={`${inputCls} pl-9`}
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatus(tab.key)}
              className={`shrink-0 inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-bold transition ${
                status === tab.key
                  ? "bg-slate-900 text-white"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
              <span
                className={`text-[10.5px] px-1.5 py-0.5 rounded-full ${
                  status === tab.key
                    ? "bg-white/20 text-white"
                    : "bg-white text-slate-500"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </Card>

      <Card className="overflow-hidden">
        {visible.length === 0 ? (
          <EmptyState
            icon={<TbReceipt2 />}
            title="No orders found"
            message="Try another status filter or search term."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12.5px]">
              <thead>
                <tr className="text-[10.5px] uppercase tracking-wider text-slate-400 bg-slate-50/70">
                  <th className="px-5 py-3 font-extrabold">Order</th>
                  <th className="px-4 py-3 font-extrabold">Customer</th>
                  <th className="px-4 py-3 font-extrabold hidden md:table-cell">Placed</th>
                  <th className="px-4 py-3 font-extrabold hidden lg:table-cell">Payment</th>
                  <th className="px-4 py-3 font-extrabold text-center">Items</th>
                  <th className="px-4 py-3 font-extrabold text-right">Total</th>
                  <th className="px-4 py-3 font-extrabold">Status</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visible.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50/70 transition cursor-pointer"
                    onClick={() => setActiveId(order.id)}
                  >
                    <td className="px-5 py-3 font-bold text-slate-900 whitespace-nowrap">
                      {order.id}
                    </td>
                    <td className="px-4 py-3">
                      <span className="block font-semibold text-slate-800 truncate max-w-[170px]">
                        {order.customer.name}
                      </span>
                      <span className="block text-[11px] text-slate-400">
                        {order.customer.city}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 hidden md:table-cell whitespace-nowrap">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-4 py-3 text-slate-600 hidden lg:table-cell whitespace-nowrap">
                      {paymentLabel(order.payment)}
                    </td>
                    <td className="px-4 py-3 text-center text-slate-600 font-semibold">
                      {order.items.reduce((sum, item) => sum + item.qty, 0)}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-slate-900 whitespace-nowrap">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          setActiveId(order.id);
                        }}
                        className="w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 flex items-center justify-center transition"
                        aria-label={`View order ${order.id}`}
                      >
                        <TbEye className="text-[16px]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        open={Boolean(activeOrder)}
        onClose={() => setActiveId(null)}
        title={activeOrder ? `Order ${activeOrder.id}` : ""}
        subtitle={
          activeOrder
            ? `Placed ${formatDateTime(activeOrder.date)} · ${paymentLabel(
                activeOrder.payment
              )}`
            : ""
        }
        size="lg"
        footer={
          <Button variant="outline" onClick={() => setActiveId(null)}>
            Close
          </Button>
        }
      >
        {activeOrder && (
          <div className="space-y-5">
            <div>
              <p className="text-[12px] font-bold text-slate-700 mb-2">
                Update status
              </p>
              <div className="flex flex-wrap gap-2">
                {ORDER_STATUSES.map((entry) => (
                  <button
                    key={entry.key}
                    onClick={() => updateOrderStatus(activeOrder.id, entry.key)}
                    className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-bold border transition ${
                      activeOrder.status === entry.key
                        ? "border-rose-500 bg-rose-50 text-rose-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${entry.dot}`} />
                    {entry.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                  Shipping to
                </p>
                <p className="text-[13.5px] font-bold text-slate-900">
                  {activeOrder.customer.name}
                </p>
                <p className="text-[12.5px] text-slate-500 mt-1 flex items-start gap-1.5">
                  <TbMapPin className="text-[14px] mt-0.5 shrink-0" />
                  {activeOrder.customer.address}, {activeOrder.customer.city}
                </p>
                <p className="text-[12.5px] text-slate-500 mt-1 flex items-center gap-1.5">
                  <TbPhone className="text-[13px]" />
                  {activeOrder.customer.phone}
                </p>
                <p className="text-[12.5px] text-slate-500 mt-1 flex items-center gap-1.5 break-all">
                  <TbMail className="text-[13px] shrink-0" />
                  {activeOrder.customer.email || "—"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                  Payment
                </p>
                <p className="text-[13.5px] font-bold text-slate-900">
                  {paymentLabel(activeOrder.payment)}
                </p>
                <div className="mt-3 space-y-1.5 text-[12.5px]">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-800">
                      {formatPrice(activeOrder.subtotal)}
                    </span>
                  </div>
                  {activeOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount {activeOrder.coupon ? `(${activeOrder.coupon})` : ""}</span>
                      <span className="font-semibold">
                        −{formatPrice(activeOrder.discount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-500">
                    <span>Shipping</span>
                    <span className="font-semibold text-slate-800">
                      {activeOrder.shipping === 0
                        ? "Free"
                        : formatPrice(activeOrder.shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-100 text-[14px] font-extrabold text-slate-900">
                    <span>Total</span>
                    <span>{formatPrice(activeOrder.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[12px] font-bold text-slate-700 mb-2">
                Items ({activeOrder.items.length})
              </p>
              <div className="rounded-xl border border-slate-200 divide-y divide-slate-100">
                {activeOrder.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-3 p-3"
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="w-11 h-11 rounded-lg bg-slate-50 border border-slate-100 object-contain p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px] font-bold text-slate-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {item.sku} · Qty {item.qty}
                      </p>
                    </div>
                    <span className="text-[12.5px] font-bold text-slate-900 whitespace-nowrap">
                      {formatPrice(item.price * item.qty)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {activeOrder.notes && (
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                  Delivery notes
                </p>
                <p className="text-[12.5px] text-slate-600">{activeOrder.notes}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminOrders;
