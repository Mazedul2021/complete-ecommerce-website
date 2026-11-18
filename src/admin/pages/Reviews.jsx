import React, { useEffect, useMemo, useState } from "react";
import { TbStar, TbTrash, TbSearch } from "react-icons/tb";
import { useAdmin } from "../useAdmin";
import { api } from "../../api/client";
import { Button, Card, EmptyState, inputCls } from "../components/ui";
import Rating from "@mui/material/Rating";
import { formatDateTime } from "../data/adminData";

const AdminReviews = () => {
  const { catalog, notify } = useAdmin();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [query, setQuery] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      setReviews(await api.reviews.adminList());
    } catch (cause) {
      notify(cause.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const productName = (id) =>
    catalog.find((p) => p.id === id)?.name ?? `Product #${id}`;

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return reviews.filter((r) => {
      if (filter === "pending" && r.approved) return false;
      if (filter === "approved" && !r.approved) return false;
      if (!term) return true;
      return (
        r.name.toLowerCase().includes(term) ||
        r.text.toLowerCase().includes(term) ||
        productName(r.productId).toLowerCase().includes(term)
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews, filter, query, catalog]);

  const setApproved = async (review, approved) => {
    try {
      await api.reviews.setApproved(review.id, approved);
      setReviews((prev) =>
        prev.map((r) => (r.id === review.id ? { ...r, approved } : r))
      );
      notify(approved ? "Review approved" : "Review hidden", "info");
    } catch (cause) {
      notify(cause.message, "error");
    }
  };

  const remove = async (review) => {
    try {
      await api.reviews.remove(review.id);
      setReviews((prev) => prev.filter((r) => r.id !== review.id));
      notify("Review deleted", "info");
    } catch (cause) {
      notify(cause.message, "error");
    }
  };

  const pendingCount = reviews.filter((r) => !r.approved).length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-[22px] sm:text-[26px] font-extrabold text-slate-900">
            Reviews
          </h2>
          <p className="text-[13px] text-slate-500 mt-1">
            {pendingCount} awaiting approval · {reviews.length} total
          </p>
        </div>
        <div className="flex gap-2">
          {[
            ["pending", "Pending"],
            ["approved", "Approved"],
            ["all", "All"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`h-9 px-3.5 rounded-xl text-[12.5px] font-bold transition ${
                filter === key
                  ? "bg-slate-900 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <Card className="p-4">
        <div className="relative">
          <TbSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[16px]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reviews, customers or products…"
            className={`${inputCls} pl-9`}
          />
        </div>
      </Card>

      <Card className="overflow-hidden">
        {loading ? (
          <p className="py-14 text-center text-[13px] text-slate-400">
            Loading…
          </p>
        ) : visible.length === 0 ? (
          <EmptyState
            icon={<TbStar />}
            title="No reviews here"
            message="Customer reviews submitted on product pages will appear for moderation."
          />
        ) : (
          <div className="divide-y divide-slate-100">
            {visible.map((review) => (
              <div key={review.id} className="px-5 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-extrabold flex items-center justify-center">
                      {review.name.slice(0, 2).toUpperCase()}
                    </span>
                    <div>
                      <p className="text-[13.5px] font-bold text-slate-900">
                        {review.name}
                        <span className="ml-2 text-[11px] font-semibold text-slate-400">
                          on {productName(review.productId)}
                        </span>
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Rating value={review.rating} size="small" readOnly />
                        <span className="text-[11px] text-slate-400">
                          {formatDateTime(review.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        review.approved
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {review.approved ? "Approved" : "Pending"}
                    </span>
                    <Button
                      variant={review.approved ? "outline" : "primary"}
                      size="sm"
                      onClick={() => setApproved(review, !review.approved)}
                    >
                      {review.approved ? "Hide" : "Approve"}
                    </Button>
                    <button
                      onClick={() => remove(review)}
                      className="w-8 h-8 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition"
                      aria-label="Delete review"
                    >
                      <TbTrash className="text-[15px]" />
                    </button>
                  </div>
                </div>
                <p className="text-[13px] text-slate-600 mt-2.5 pl-10">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminReviews;
