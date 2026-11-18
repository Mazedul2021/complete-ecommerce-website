import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  TbCurrencyTaka,
  TbReceipt2,
  TbWallet,
  TbUsers,
  TbArrowUpRight,
  TbArrowDownRight,
  TbMinus,
  TbAlertTriangle,
  TbPackage,
} from "react-icons/tb";
import { IoChevronForward } from "react-icons/io5";
import { useAdmin } from "../useAdmin";
import { Card, StatusBadge } from "../components/ui";
import RevenueChart from "../components/RevenueChart";
import {
  ORDER_STATUSES,
  formatDate,
  stockState,
} from "../data/adminData";
import { formatPrice } from "../../utils/format";

const RANGES = [
  { days: 7, label: "7 days" },
  { days: 30, label: "30 days" },
  { days: 90, label: "90 days" },
];

const shortDate = (date) =>
  `${date.getDate()} ${date.toLocaleDateString("en-GB", { month: "short" })}`;

const within = (value, start, end) => {
  const time = new Date(value).getTime();
  return time >= start && time <= end;
};

const buildSeries = (orders, days) => {
  const now = new Date();
  const points = [];
  const valid = orders.filter((order) => order.status !== "cancelled");

  if (days === 90) {
    for (let i = 12; i >= 0; i -= 1) {
      const end = new Date(now);
      end.setDate(end.getDate() - i * 7);
      end.setHours(23, 59, 59, 999);
      const start = new Date(end);
      start.setDate(start.getDate() - 6);
      start.setHours(0, 0, 0, 0);
      const value = valid
        .filter((order) => within(order.date, start.getTime(), end.getTime()))
        .reduce((sum, order) => sum + order.total, 0);
      points.push({ label: shortDate(start), value });
    }
    return points;
  }

  for (let i = days - 1; i >= 0; i -= 1) {
    const start = new Date(now);
    start.setDate(start.getDate() - i);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setHours(23, 59, 59, 999);
    const value = valid
      .filter((order) => within(order.date, start.getTime(), end.getTime()))
      .reduce((sum, order) => sum + order.total, 0);
    points.push({ label: shortDate(start), value });
  }
  return points;
};

const Trend = ({ current, previous }) => {
  if (!previous) {
    return (
      <span className="inline-flex items-center gap-1 text-slate-400">
        <TbMinus className="text-[14px]" /> No prior data
      </span>
    );
  }
  const change = ((current - previous) / previous) * 100;
  const up = change >= 0;
  const Icon = up ? TbArrowUpRight : TbArrowDownRight;
  return (
    <span
      className={`inline-flex items-center gap-1 font-bold ${
        up ? "text-emerald-600" : "text-rose-600"
      }`}
    >
      <Icon className="text-[15px]" />
      {Math.abs(change).toFixed(1)}%
      <span className="font-semibold text-slate-400">vs prev.</span>
    </span>
  );
};

const KpiCard = ({ label, value, icon, tone, children }) => (
  <Card className="p-5">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
          {label}
        </p>
        <p className="text-[23px] sm:text-[25px] font-extrabold text-slate-900 mt-2 truncate">
          {value}
        </p>
      </div>
      <span
        className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-[20px] ${tone}`}
      >
        {icon}
      </span>
    </div>
    <div className="mt-3.5 text-[11.5px]">{children}</div>
  </Card>
);

const Dashboard = () => {
  const { catalog, orders, settings } = useAdmin();
  const [range, setRange] = useState(30);

  const currentOrders = useMemo(() => {
    const rangeStart = Date.now() - range * 86400000;
    return orders.filter(
      (order) => new Date(order.date).getTime() >= rangeStart
    );
  }, [orders, range]);

  const stats = useMemo(() => {
    const now = Date.now();
    const rangeStart = now - range * 86400000;
    const prevStart = rangeStart - range * 86400000;

    const current = currentOrders;
    const previous = orders.filter((order) => {
      const time = new Date(order.date).getTime();
      return time >= prevStart && time < rangeStart;
    });

    const paid = current.filter((order) => order.status !== "cancelled");
    const prevPaid = previous.filter((order) => order.status !== "cancelled");

    const revenue = paid.reduce((sum, order) => sum + order.total, 0);
    const prevRevenue = prevPaid.reduce((sum, order) => sum + order.total, 0);

    const customers = new Set(
      current.map((order) => order.customer.email || order.customer.phone)
    ).size;
    const prevCustomers = new Set(
      previous.map((order) => order.customer.email || order.customer.phone)
    ).size;

    const aov = paid.length ? revenue / paid.length : 0;
    const prevAov = prevPaid.length ? prevRevenue / prevPaid.length : 0;

    return {
      current,
      revenue,
      prevRevenue,
      orderCount: paid.length,
      prevOrderCount: prevPaid.length,
      customers,
      prevCustomers,
      aov,
      prevAov,
    };
  }, [orders, range, currentOrders]);

  const series = useMemo(() => buildSeries(orders, range), [orders, range]);

  const statusCounts = useMemo(() => {
    const counts = Object.fromEntries(ORDER_STATUSES.map((s) => [s.key, 0]));
    currentOrders.forEach((order) => {
      counts[order.status] = (counts[order.status] ?? 0) + 1;
    });
    return counts;
  }, [currentOrders]);

  const topProducts = useMemo(() => {
    const map = new Map();
    currentOrders
      .filter((order) => order.status !== "cancelled")
      .forEach((order) => {
        order.items.forEach((item) => {
          const entry =
            map.get(item.productId) ?? {
              productId: item.productId,
              name: item.name,
              image: item.image,
              units: 0,
              revenue: 0,
            };
          entry.units += item.qty;
          entry.revenue += item.qty * item.price;
          map.set(item.productId, entry);
        });
      });
    return [...map.values()]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [currentOrders]);

  const topRevenue = topProducts[0]?.revenue ?? 1;

  const lowStockProducts = useMemo(
    () =>
      [...catalog]
        .filter((product) => product.stock <= settings.lowStockThreshold)
        .sort((a, b) => a.stock - b.stock)
        .slice(0, 5),
    [catalog, settings.lowStockThreshold]
  );

  const inventoryValue = catalog.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );

  const recentOrders = orders.slice(0, 6);
  const maxStatusCount = Math.max(...Object.values(statusCounts), 1);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-[22px] sm:text-[26px] font-extrabold text-slate-900">
            Welcome back, manager 👋
          </h2>
          <p className="text-[13px] text-slate-500 mt-1">
            Here is how {settings.storeName} is performing right now.
          </p>
        </div>
        <div className="inline-flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
          {RANGES.map((option) => (
            <button
              key={option.days}
              onClick={() => setRange(option.days)}
              className={`h-8 px-3 rounded-lg text-[12px] font-bold transition ${
                range === option.days
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          label="Total revenue"
          value={formatPrice(stats.revenue)}
          icon={<TbCurrencyTaka />}
          tone="bg-rose-50 text-rose-600"
        >
          <Trend current={stats.revenue} previous={stats.prevRevenue} />
        </KpiCard>
        <KpiCard
          label="Orders"
          value={stats.orderCount}
          icon={<TbReceipt2 />}
          tone="bg-blue-50 text-blue-600"
        >
          <Trend current={stats.orderCount} previous={stats.prevOrderCount} />
        </KpiCard>
        <KpiCard
          label="Avg. order value"
          value={formatPrice(stats.aov)}
          icon={<TbWallet />}
          tone="bg-amber-50 text-amber-600"
        >
          <Trend current={stats.aov} previous={stats.prevAov} />
        </KpiCard>
        <KpiCard
          label="Customers"
          value={stats.customers}
          icon={<TbUsers />}
          tone="bg-emerald-50 text-emerald-600"
        >
          <Trend current={stats.customers} previous={stats.prevCustomers} />
        </KpiCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2 p-5">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
            <div>
              <h3 className="text-[15px] font-extrabold text-slate-900">
                Revenue trend
              </h3>
              <p className="text-[12px] text-slate-500 mt-0.5">
                {formatPrice(stats.revenue)} collected in the last {range} days
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11.5px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Live demo data
            </span>
          </div>
          <RevenueChart data={series} unit={range === 90 ? "week" : "day"} />
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-extrabold text-slate-900">
              Orders by status
            </h3>
            <Link
              to="/admin/orders"
              className="text-[12px] font-bold text-rose-600 hover:text-rose-700 inline-flex items-center gap-0.5"
            >
              View all <IoChevronForward />
            </Link>
          </div>
          <div className="space-y-3.5">
            {ORDER_STATUSES.map((status) => {
              const count = statusCounts[status.key] ?? 0;
              return (
                <div key={status.key}>
                  <div className="flex items-center justify-between text-[12px] font-semibold text-slate-600 mb-1.5">
                    <span className="inline-flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                      {status.label}
                    </span>
                    <span className="text-slate-900 font-bold">{count}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${status.bar}`}
                      style={{ width: `${(count / maxStatusCount) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="text-[15px] font-extrabold text-slate-900">
              Recent orders
            </h3>
            <Link
              to="/admin/orders"
              className="text-[12px] font-bold text-rose-600 hover:text-rose-700 inline-flex items-center gap-0.5"
            >
              All orders <IoChevronForward />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12.5px]">
              <thead>
                <tr className="text-[10.5px] uppercase tracking-wider text-slate-400 bg-slate-50/70">
                  <th className="px-5 py-2.5 font-extrabold">Order</th>
                  <th className="px-4 py-2.5 font-extrabold">Customer</th>
                  <th className="px-4 py-2.5 font-extrabold hidden sm:table-cell">Date</th>
                  <th className="px-4 py-2.5 font-extrabold text-right">Total</th>
                  <th className="px-5 py-2.5 font-extrabold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/70 transition">
                    <td className="px-5 py-3 font-bold text-slate-900 whitespace-nowrap">
                      {order.id}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <span className="block truncate max-w-[150px]">
                        {order.customer.name}
                      </span>
                      <span className="block text-[11px] text-slate-400">
                        {order.customer.city}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 hidden sm:table-cell whitespace-nowrap">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-slate-900 whitespace-nowrap">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-slate-400">
                      No orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-extrabold text-slate-900">
              Top sellers
            </h3>
            <span className="text-[11px] font-bold text-slate-400">
              Last {range} days
            </span>
          </div>

          <div className="space-y-3.5">
            {topProducts.map((product, index) => (
              <div key={product.productId} className="flex items-center gap-3">
                <span className="w-5 text-[11px] font-extrabold text-slate-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <img
                  src={product.image}
                  alt=""
                  className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 object-contain p-1"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-bold text-slate-800 truncate">
                    {product.name}
                  </p>
                  <div className="h-1 rounded-full bg-slate-100 mt-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-rose-500 to-amber-400"
                      style={{ width: `${(product.revenue / topRevenue) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[12px] font-extrabold text-slate-900">
                    {formatPrice(product.revenue)}
                  </p>
                  <p className="text-[10.5px] text-slate-400">{product.units} sold</p>
                </div>
              </div>
            ))}
            {topProducts.length === 0 && (
              <p className="text-[13px] text-slate-400 py-6 text-center">
                No sales in this period.
              </p>
            )}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <TbAlertTriangle className="text-[17px] text-amber-500" />
              <h3 className="text-[15px] font-extrabold text-slate-900">
                Low stock alerts
              </h3>
            </div>
            <Link
              to="/admin/products"
              className="text-[12px] font-bold text-rose-600 hover:text-rose-700 inline-flex items-center gap-0.5"
            >
              Manage stock <IoChevronForward />
            </Link>
          </div>

          {lowStockProducts.length === 0 ? (
            <p className="px-5 py-8 text-[13px] text-slate-400">
              Every product is above the {settings.lowStockThreshold}-unit threshold.
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {lowStockProducts.map((product) => {
                const state = stockState(product, settings.lowStockThreshold);
                return (
                  <div
                    key={product.id}
                    className="px-5 py-3 flex items-center gap-3"
                  >
                    <img
                      src={product.images?.[0]}
                      alt=""
                      className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 object-contain p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px] font-bold text-slate-800 truncate">
                        {product.name}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {product.sku}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${state.tone}`}
                    >
                      {product.stock} left
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        <Card className="p-5">
          <h3 className="text-[15px] font-extrabold text-slate-900">
            Catalog health
          </h3>
          <p className="text-[12px] text-slate-500 mt-0.5">
            {catalog.length} products on the storefront
          </p>

          <div className="mt-4 space-y-3">
            {[
              {
                label: "In stock",
                value: catalog.filter((p) => p.stock > settings.lowStockThreshold).length,
                tone: "text-emerald-600 bg-emerald-50",
              },
              {
                label: "Low stock",
                value: catalog.filter(
                  (p) => p.stock > 0 && p.stock <= settings.lowStockThreshold
                ).length,
                tone: "text-amber-600 bg-amber-50",
              },
              {
                label: "Out of stock",
                value: catalog.filter((p) => p.stock <= 0).length,
                tone: "text-rose-600 bg-rose-50",
              },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-xl border border-slate-100 px-3.5 py-2.5"
              >
                <span className="text-[12.5px] font-semibold text-slate-600">
                  {row.label}
                </span>
                <span
                  className={`text-[12px] font-extrabold px-2 py-0.5 rounded-lg ${row.tone}`}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
              <TbPackage className="text-[15px]" /> Inventory value
            </div>
            <p className="text-[20px] font-extrabold text-slate-900 mt-1">
              {formatPrice(inventoryValue)}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
