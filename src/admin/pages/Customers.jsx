import React, { useMemo, useState } from "react";
import { TbSearch, TbUsers, TbPhone, TbMail, TbMapPin } from "react-icons/tb";
import { useAdmin } from "../useAdmin";
import {
  Button,
  Card,
  EmptyState,
  Modal,
  StatusBadge,
  inputCls,
} from "../components/ui";
import { formatDate, initials } from "../data/adminData";
import { formatPrice } from "../../utils/format";

const AdminCustomers = () => {
  const { customers } = useAdmin();
  const [query, setQuery] = useState("");
  const [activeKey, setActiveKey] = useState(null);

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return customers;
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(term) ||
        customer.email?.toLowerCase().includes(term) ||
        customer.phone?.toLowerCase().includes(term) ||
        customer.city?.toLowerCase().includes(term)
    );
  }, [customers, query]);

  const active = customers.find((customer) => customer.key === activeKey) ?? null;

  const repeatCustomers = customers.filter((customer) => customer.count > 1).length;
  const totalSpend = customers.reduce((sum, customer) => sum + customer.spend, 0);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[22px] sm:text-[26px] font-extrabold text-slate-900">
          Customers
        </h2>
        <p className="text-[13px] text-slate-500 mt-1">
          Built from your order history — {repeatCustomers} repeat buyers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          ["Total customers", customers.length],
          ["Repeat customers", repeatCustomers],
          ["Lifetime spend", formatPrice(totalSpend)],
        ].map(([label, value]) => (
          <Card key={label} className="p-4">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
              {label}
            </p>
            <p className="text-[20px] font-extrabold text-slate-900 mt-1.5">
              {value}
            </p>
          </Card>
        ))}
      </div>

      <Card className="p-4">
        <div className="relative">
          <TbSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[16px]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search customers by name, phone, email or city…"
            className={`${inputCls} pl-9`}
          />
        </div>
      </Card>

      <Card className="overflow-hidden">
        {visible.length === 0 ? (
          <EmptyState
            icon={<TbUsers />}
            title="No customers found"
            message="Customers appear here as soon as an order is placed."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12.5px]">
              <thead>
                <tr className="text-[10.5px] uppercase tracking-wider text-slate-400 bg-slate-50/70">
                  <th className="px-5 py-3 font-extrabold">Customer</th>
                  <th className="px-4 py-3 font-extrabold hidden md:table-cell">Phone</th>
                  <th className="px-4 py-3 font-extrabold hidden lg:table-cell">City</th>
                  <th className="px-4 py-3 font-extrabold text-center">Orders</th>
                  <th className="px-4 py-3 font-extrabold text-right">Spend</th>
                  <th className="px-5 py-3 font-extrabold hidden sm:table-cell">Last order</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visible.map((customer) => (
                  <tr
                    key={customer.key}
                    className="hover:bg-slate-50/70 transition cursor-pointer"
                    onClick={() => setActiveKey(customer.key)}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-full bg-slate-900 text-white text-[11.5px] font-extrabold flex items-center justify-center shrink-0">
                          {initials(customer.name)}
                        </span>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate">
                            {customer.name}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate max-w-[200px]">
                            {customer.email || customer.phone}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 hidden md:table-cell whitespace-nowrap">
                      {customer.phone}
                    </td>
                    <td className="px-4 py-3 text-slate-600 hidden lg:table-cell">
                      {customer.city}
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-slate-800">
                      {customer.count}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-slate-900 whitespace-nowrap">
                      {formatPrice(customer.spend)}
                    </td>
                    <td className="px-5 py-3 text-slate-500 hidden sm:table-cell whitespace-nowrap">
                      {customer.lastOrder ? formatDate(customer.lastOrder) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        open={Boolean(active)}
        onClose={() => setActiveKey(null)}
        title={active?.name ?? ""}
        subtitle={active ? `${active.count} order${active.count > 1 ? "s" : ""} · ${formatPrice(active.spend)} lifetime` : ""}
        size="md"
        footer={
          <Button variant="outline" onClick={() => setActiveKey(null)}>
            Close
          </Button>
        }
      >
        {active && (
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 p-4 space-y-1.5 text-[12.5px] text-slate-600">
              <p className="flex items-center gap-2">
                <TbPhone className="text-[14px] text-slate-400" /> {active.phone}
              </p>
              <p className="flex items-center gap-2 break-all">
                <TbMail className="text-[14px] text-slate-400 shrink-0" />
                {active.email || "—"}
              </p>
              <p className="flex items-start gap-2">
                <TbMapPin className="text-[14px] text-slate-400 mt-0.5 shrink-0" />
                {active.address}, {active.city}
              </p>
            </div>

            <div>
              <p className="text-[12px] font-bold text-slate-700 mb-2">
                Order history
              </p>
              <div className="rounded-xl border border-slate-200 divide-y divide-slate-100">
                {[...active.orders]
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between gap-3 px-3.5 py-2.5"
                    >
                      <div className="min-w-0">
                        <p className="text-[12.5px] font-bold text-slate-900">
                          {order.id}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {formatDate(order.date)} ·{" "}
                          {order.items.reduce((sum, item) => sum + item.qty, 0)}{" "}
                          item(s)
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <StatusBadge status={order.status} />
                        <span className="text-[12.5px] font-bold text-slate-900">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminCustomers;
