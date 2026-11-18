import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { IoClose, IoCheckmarkCircle } from "react-icons/io5";
import {
  TbLayoutDashboard,
  TbPackage,
  TbCategory,
  TbTicket,
  TbStar,
  TbMail,
  TbReceipt2,
  TbUsers,
  TbSettings,
  TbMenu2,
  TbBell,
  TbExternalLink,
  TbHome,
} from "react-icons/tb";
import { useAdmin } from "./useAdmin";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { to: "/admin", label: "Overview", icon: TbLayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: TbPackage },
  { to: "/admin/categories", label: "Categories", icon: TbCategory },
  { to: "/admin/homepage", label: "Homepage", icon: TbHome },
  { to: "/admin/coupons", label: "Coupons", icon: TbTicket },
  { to: "/admin/reviews", label: "Reviews", icon: TbStar },
  { to: "/admin/inbox", label: "Inbox", icon: TbMail },
  { to: "/admin/orders", label: "Orders", icon: TbReceipt2 },
  { to: "/admin/customers", label: "Customers", icon: TbUsers },
  { to: "/admin/settings", label: "Settings", icon: TbSettings },
];

const PAGE_META = {
  "/admin": { title: "Overview", subtitle: "Store performance at a glance" },
  "/admin/products": {
    title: "Products",
    subtitle: "Manage your timepiece catalog",
  },
  "/admin/categories": {
    title: "Categories",
    subtitle: "Organise the catalog tree and navigation",
  },
  "/admin/homepage": {
    title: "Homepage",
    subtitle: "Logo, banners, deals and featured products",
  },
  "/admin/coupons": { title: "Coupons", subtitle: "Discount codes for checkout" },
  "/admin/reviews": { title: "Reviews", subtitle: "Moderate customer product reviews" },
  "/admin/inbox": { title: "Inbox", subtitle: "Contact messages and newsletter subscribers" },
  "/admin/orders": { title: "Orders", subtitle: "Track and fulfil customer orders" },
  "/admin/customers": { title: "Customers", subtitle: "Everyone who has ordered from you" },
  "/admin/settings": { title: "Settings", subtitle: "Store profile and demo data" },
};

const AdminLayout = () => {
  const { settings, pendingOrders, lowStock, notice, status, error, refresh } =
    useAdmin();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const meta = PAGE_META[location.pathname] ?? PAGE_META["/admin"];

  const isActive = (item) =>
    item.end
      ? location.pathname === item.to
      : location.pathname.startsWith(item.to);

  const badges = {
    "/admin/orders": pendingOrders,
    "/admin/products": lowStock.length,
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-[90] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-[100] w-[268px] bg-slate-950 text-slate-300 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-[76px] px-5 flex items-center justify-between border-b border-white/10">
          <Link to="/admin" className="flex items-center gap-2.5">
            <img
              src={settings.logo || "/logo.webp"}
              alt="OLEVS"
              className="w-[104px] h-auto brightness-200 contrast-125"
            />
            <span className="text-[9.5px] font-extrabold uppercase tracking-[0.18em] text-rose-400 bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.5 rounded">
              Admin
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-400"
            aria-label="Close menu"
          >
            <IoClose className="text-[18px]" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          <p className="px-3 pb-2 text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-slate-500">
            Store management
          </p>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            const badge = badges[item.to];
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-center gap-3 px-3 h-11 rounded-xl text-[13.5px] font-semibold transition ${
                  active
                    ? "bg-gradient-to-r from-rose-600/90 to-rose-500/80 text-white shadow-lg shadow-rose-900/30"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon
                  className={`text-[19px] ${
                    active ? "text-white" : "text-slate-400 group-hover:text-rose-400"
                  }`}
                />
                <span className="flex-1">{item.label}</span>
                {badge > 0 && (
                  <span
                    className={`min-w-[20px] h-5 px-1.5 rounded-full text-[10.5px] font-extrabold flex items-center justify-center ${
                      active
                        ? "bg-white/25 text-white"
                        : item.to === "/admin/products"
                        ? "bg-amber-500/15 text-amber-300"
                        : "bg-rose-500/20 text-rose-300"
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10">
          <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3.5">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-lg bg-gradient-to-tr from-rose-600 to-amber-500 text-white text-[12px] font-extrabold flex items-center justify-center">
                OW
              </span>
              <div className="min-w-0">
                <p className="text-[12.5px] font-bold text-white truncate">
                  {settings.storeName}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {user?.email ?? "Store administrator"}
                </p>
              </div>
            </div>
            <Link
              to="/"
              className="mt-3 flex items-center justify-center gap-1.5 h-9 rounded-lg bg-white/10 hover:bg-white/15 text-[12px] font-bold text-white transition"
            >
              View storefront <TbExternalLink className="text-[13px]" />
            </Link>
            <button
              type="button"
              onClick={() => logout()}
              className="mt-1.5 w-full h-9 rounded-lg text-[12px] font-bold text-slate-400 hover:bg-white/5 hover:text-white transition"
            >
              Sign out
            </button>
          </div>
        </div>
      </aside>

      <div className="lg:pl-[268px] min-h-screen flex flex-col">
        <header className="sticky top-0 z-[80] bg-white/90 backdrop-blur-xl border-b border-slate-200/80">
          <div className="h-[76px] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-[20px] transition"
                aria-label="Open menu"
              >
                <TbMenu2 />
              </button>
              <div className="min-w-0">
                <p className="text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-rose-600">
                  Admin console
                </p>
                <h1 className="text-[18px] sm:text-[20px] font-extrabold text-slate-900 leading-tight truncate">
                  {meta.title}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden md:block text-[12px] font-semibold text-slate-400">
                {meta.subtitle}
              </span>
              <Link
                to="/admin/orders"
                className="relative w-10 h-10 rounded-xl bg-slate-50 hover:bg-rose-50 hover:text-rose-600 text-slate-600 flex items-center justify-center transition"
                aria-label="Pending orders"
              >
                <TbBell className="text-[19px]" />
                {pendingOrders > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-600 text-white text-[10px] font-extrabold flex items-center justify-center">
                    {pendingOrders}
                  </span>
                )}
              </Link>
              <Link
                to="/"
                className="hidden sm:inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl border border-slate-200 text-[12.5px] font-bold text-slate-700 hover:border-rose-300 hover:text-rose-600 transition"
              >
                Storefront <TbExternalLink className="text-[14px]" />
              </Link>
              <span className="w-10 h-10 rounded-xl bg-slate-900 text-white text-[12px] font-extrabold flex items-center justify-center">
                OW
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 w-full max-w-[1500px] mx-auto p-4 sm:p-6 lg:p-8">
          {status === "loading" ? (
            <div className="flex items-center gap-2.5 text-[13px] font-semibold text-slate-500">
              <span className="w-4 h-4 rounded-full border-2 border-rose-500/30 border-t-rose-600 animate-spin" />
              Loading store data from the API…
            </div>
          ) : status === "error" ? (
            <div className="max-w-xl rounded-2xl border border-rose-200 bg-rose-50 p-5">
              <p className="text-[14px] font-extrabold text-rose-700">
                Can't reach the store API
              </p>
              <p className="text-[12.5px] text-rose-600 mt-1">{error}</p>
              <p className="text-[12px] text-slate-600 mt-2">
                Start it with{" "}
                <code className="font-mono">cd server &amp;&amp; npm run dev</code>.
              </p>
              <button
                onClick={refresh}
                className="mt-3 h-9 px-3.5 rounded-lg bg-slate-900 text-white text-[12px] font-bold"
              >
                Retry
              </button>
            </div>
          ) : (
            <Outlet />
          )}
        </main>

        <footer className="px-6 py-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-[11.5px] text-slate-400">
          <span>© {new Date().getFullYear()} {settings.storeName} — Admin console</span>
          <span>Live data from the store API.</span>
        </footer>
      </div>

      {notice && (
        <div className="fixed bottom-6 right-6 z-[400] flex items-center gap-2.5 bg-slate-900 text-white pl-4 pr-5 py-3 rounded-xl shadow-2xl border border-slate-700">
          <IoCheckmarkCircle
            className={`text-[19px] ${
              notice.type === "error"
                ? "text-rose-400"
                : notice.type === "info"
                ? "text-slate-300"
                : "text-emerald-400"
            }`}
          />
          <span className="text-[13px] font-semibold">{notice.message}</span>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
