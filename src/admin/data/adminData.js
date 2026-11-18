import { products } from "../../data/products";

// Persistent data (catalog, orders, settings) lives in the store API. This
// module only holds admin formatting, status metadata and derived views.

export const DEFAULT_SETTINGS = {
  storeName: "OLEVS Watch Shop",
  supportEmail: "contact@olevswatchshop.com",
  supportPhone: "(+880) 1799018864",
  address: "Sha-38/1, Middle Badda, Gulshan Link Road, Dhaka-1212",
  lowStockThreshold: 10,
};

/* ------------------------------------------------------------------ */
/* Order status + payment metadata                                     */
/* ------------------------------------------------------------------ */

export const ORDER_STATUSES = [
  {
    key: "pending",
    label: "Pending",
    badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    dot: "bg-amber-500",
    bar: "bg-amber-500",
  },
  {
    key: "confirmed",
    label: "Confirmed",
    badge: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
    dot: "bg-blue-500",
    bar: "bg-blue-500",
  },
  {
    key: "packed",
    label: "Packed",
    badge: "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
    dot: "bg-violet-500",
    bar: "bg-violet-500",
  },
  {
    key: "shipped",
    label: "Shipped",
    badge: "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200",
    dot: "bg-cyan-500",
    bar: "bg-cyan-500",
  },
  {
    key: "delivered",
    label: "Delivered",
    badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    dot: "bg-emerald-500",
    bar: "bg-emerald-500",
  },
  {
    key: "cancelled",
    label: "Cancelled",
    badge: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
    dot: "bg-slate-400",
    bar: "bg-slate-400",
  },
];

export const ORDER_STATUS_META = Object.fromEntries(
  ORDER_STATUSES.map((status) => [status.key, status])
);

export const PAYMENT_METHODS = {
  cod: "Cash on Delivery",
  bkash: "bKash / Nagad",
  card: "Credit / Debit Card",
};

export const paymentLabel = (key) => PAYMENT_METHODS[key] ?? key;

/* ------------------------------------------------------------------ */
/* Formatting                                                          */
/* ------------------------------------------------------------------ */

export const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const formatDateTime = (value) =>
  new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

/* ------------------------------------------------------------------ */
/* Derived views                                                       */
/* ------------------------------------------------------------------ */

export const getCatalogSnapshot = () =>
  products.map((product) => ({
    ...product,
    images: [...(product.images ?? [])],
    colors: [...(product.colors ?? [])],
    tags: [...(product.tags ?? [])],
  }));

export const stockState = (
  product,
  threshold = DEFAULT_SETTINGS.lowStockThreshold
) => {
  if (!product.stock || product.stock <= 0) {
    return {
      key: "out",
      label: "Out of stock",
      tone: "bg-rose-50 text-rose-600 ring-1 ring-rose-200",
    };
  }
  if (product.stock <= threshold) {
    return {
      key: "low",
      label: "Low stock",
      tone: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    };
  }
  return {
    key: "in",
    label: "In stock",
    tone: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  };
};

export const deriveCustomers = (orders) => {
  const map = new Map();

  orders.forEach((order) => {
    const { customer } = order;
    const key = (customer.email || customer.phone || customer.name).toLowerCase();
    const entry =
      map.get(key) ??
      {
        key,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        city: customer.city,
        address: customer.address,
        orders: [],
        spend: 0,
      };

    entry.orders.push(order);
    if (order.status !== "cancelled") entry.spend += order.total;
    if (!entry.lastOrder || new Date(order.date) > new Date(entry.lastOrder)) {
      entry.lastOrder = order.date;
    }
    map.set(key, entry);
  });

  return [...map.values()]
    .map((entry) => ({ ...entry, count: entry.orders.length }))
    .sort((a, b) => b.spend - a.spend);
};
