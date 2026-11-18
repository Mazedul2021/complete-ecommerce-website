import React from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Client-side gate for /admin. The API enforces the same rule server-side, so
// hiding the UI is convenience, not the protection itself.
const AdminGuard = ({ children }) => {
  const { user, status, logout } = useAuth();
  const location = useLocation();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <span className="flex items-center gap-2.5 text-[13px] font-semibold text-slate-500">
          <span className="w-4 h-4 rounded-full border-2 border-rose-500/30 border-t-rose-600 animate-spin" />
          Checking your session…
        </span>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname || "/admin" }}
      />
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-7 text-center">
          <span className="mx-auto w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-[22px] font-extrabold">
            !
          </span>
          <h1 className="mt-4 text-[19px] font-extrabold text-slate-900">
            Admin access only
          </h1>
          <p className="mt-1.5 text-[13px] text-slate-500">
            You are signed in as <strong>{user.email}</strong>, which is a
            customer account. Sign in with an administrator account to manage the
            store.
          </p>
          <div className="mt-5 flex items-center justify-center gap-2.5">
            <Link
              to="/"
              className="h-10 px-4 inline-flex items-center rounded-xl bg-slate-900 text-white text-[12.5px] font-bold"
            >
              Back to store
            </Link>
            <button
              type="button"
              onClick={() => logout()}
              className="h-10 px-4 rounded-xl border border-slate-200 text-[12.5px] font-bold text-slate-700 hover:border-rose-300 hover:text-rose-600 transition"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminGuard;
