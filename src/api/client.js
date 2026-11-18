// Thin fetch wrapper around the store API. In development Vite proxies
// /api to the Node server (see vite.config.js); in production the server
// serves the built storefront itself, so the same relative path works.
const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

const request = async (path, { method = "GET", body } = {}) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    // The session lives in an HttpOnly cookie, so it must travel with every call.
    credentials: "same-origin",
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const text = await response.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const message =
      data && typeof data === "object" && data.error
        ? data.error
        : `Request failed (${response.status})`;
    const error = new Error(message);
    error.status = response.status;
    error.details = data && typeof data === "object" ? data.details : undefined;
    throw error;
  }

  return data;
};

const query = (params) => {
  const search = new URLSearchParams(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
  ).toString();
  return search ? `?${search}` : "";
};

export const api = {
  auth: {
    me: () => request("/auth/me"),
    login: (credentials) =>
      request("/auth/login", { method: "POST", body: credentials }),
    register: (details) =>
      request("/auth/register", { method: "POST", body: details }),
    logout: () => request("/auth/logout", { method: "POST" }),
  },
  products: {
    list: () => request("/products"),
    create: (product) =>
      request("/products", { method: "POST", body: product }),
    update: (id, product) =>
      request(`/products/${id}`, { method: "PUT", body: product }),
    remove: (id) => request(`/products/${id}`, { method: "DELETE" }),
  },
  categories: {
    list: () => request("/categories"),
    create: (category) =>
      request("/categories", { method: "POST", body: category }),
    update: (id, category) =>
      request(`/categories/${id}`, { method: "PUT", body: category }),
    remove: (id) => request(`/categories/${id}`, { method: "DELETE" }),
  },
  contact: {
    send: (message) => request("/contact", { method: "POST", body: message }),
  },
  newsletter: {
    subscribe: (email) =>
      request("/newsletter", { method: "POST", body: { email } }),
  },
  coupons: {
    validate: (code) => request(`/coupons/validate?code=${encodeURIComponent(code)}`),
    list: () => request("/coupons"),
    create: (coupon) => request("/coupons", { method: "POST", body: coupon }),
    update: (id, coupon) =>
      request(`/coupons/${id}`, { method: "PUT", body: coupon }),
    remove: (id) => request(`/coupons/${id}`, { method: "DELETE" }),
  },
  reviews: {
    list: (productId) => request(`/products/${productId}/reviews`),
    create: (productId, review) =>
      request(`/products/${productId}/reviews`, { method: "POST", body: review }),
    adminList: () => request("/reviews"),
    setApproved: (id, approved) =>
      request(`/reviews/${id}`, { method: "PATCH", body: { approved } }),
    remove: (id) => request(`/reviews/${id}`, { method: "DELETE" }),
  },
  messages: {
    list: () => request("/messages"),
    setRead: (id, read) =>
      request(`/messages/${id}`, { method: "PATCH", body: { read } }),
    remove: (id) => request(`/messages/${id}`, { method: "DELETE" }),
  },
  subscribers: {
    list: () => request("/subscribers"),
  },
  account: {
    orders: () => request("/account/orders"),
  },
  orders: {
    list: (params = {}) => request(`/orders${query(params)}`),
    get: (id) => request(`/orders/${encodeURIComponent(id)}`),
    create: (order) => request("/orders", { method: "POST", body: order }),
    setStatus: (id, status) =>
      request(`/orders/${encodeURIComponent(id)}`, {
        method: "PATCH",
        body: { status },
      }),
  },
  settings: {
    get: () => request("/settings"),
    save: (settings) =>
      request("/settings", { method: "PUT", body: settings }),
  },
  reset: () => request("/admin/reset", { method: "POST" }),
};
