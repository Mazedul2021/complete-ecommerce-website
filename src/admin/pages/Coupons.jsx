import React, { useEffect, useState } from "react";
import { TbPlus, TbEdit, TbTrash, TbTicket } from "react-icons/tb";
import { useAdmin } from "../useAdmin";
import { api } from "../../api/client";
import {
  Button,
  Card,
  EmptyState,
  Field,
  Modal,
  inputCls,
} from "../components/ui";

const blankCoupon = () => ({ code: "", percent: "", note: "", active: true });

const AdminCoupons = () => {
  const { notify } = useAdmin();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(blankCoupon);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      setCoupons(await api.coupons.list());
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

  const openNew = () => {
    setForm(blankCoupon());
    setError("");
    setModalOpen(true);
  };

  const openEdit = (coupon) => {
    setForm({
      id: coupon.id,
      code: coupon.code,
      percent: String(coupon.percent),
      note: coupon.note ?? "",
      active: coupon.active,
    });
    setError("");
    setModalOpen(true);
  };

  const handleSave = async () => {
    const payload = {
      code: form.code.trim().toUpperCase(),
      percent: Number(form.percent),
      note: form.note.trim(),
      active: form.active,
    };
    if (!payload.code || !payload.percent) {
      setError("Code and discount percent are required.");
      return;
    }
    try {
      if (form.id) await api.coupons.update(form.id, payload);
      else await api.coupons.create(payload);
      setModalOpen(false);
      notify(form.id ? "Coupon updated" : "Coupon created");
      await load();
    } catch (cause) {
      setError(cause.message);
    }
  };

  const confirmDelete = async () => {
    try {
      await api.coupons.remove(deleteTarget.id);
      setDeleteTarget(null);
      notify("Coupon deleted", "info");
      await load();
    } catch (cause) {
      notify(cause.message, "error");
    }
  };

  const toggleActive = async (coupon) => {
    try {
      await api.coupons.update(coupon.id, { ...coupon, active: !coupon.active });
      await load();
    } catch (cause) {
      notify(cause.message, "error");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-[22px] sm:text-[26px] font-extrabold text-slate-900">
            Coupons
          </h2>
          <p className="text-[13px] text-slate-500 mt-1">
            Discount codes customers can apply at checkout — validated by the
            server when the order is placed.
          </p>
        </div>
        <Button onClick={openNew}>
          <TbPlus className="text-[16px]" /> Add coupon
        </Button>
      </div>

      <Card className="overflow-hidden">
        {loading ? (
          <p className="py-14 text-center text-[13px] text-slate-400">Loading…</p>
        ) : coupons.length === 0 ? (
          <EmptyState
            icon={<TbTicket />}
            title="No coupons yet"
            message="Create a discount code for promotions."
            action={
              <Button size="sm" onClick={openNew}>
                <TbPlus className="text-[14px]" /> Add coupon
              </Button>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12.5px]">
              <thead>
                <tr className="text-[10.5px] uppercase tracking-wider text-slate-400 bg-slate-50/70">
                  <th className="px-5 py-3 font-extrabold">Code</th>
                  <th className="px-4 py-3 font-extrabold text-right">Discount</th>
                  <th className="px-4 py-3 font-extrabold hidden lg:table-cell">Note</th>
                  <th className="px-4 py-3 font-extrabold">Status</th>
                  <th className="px-5 py-3 font-extrabold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {coupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-3">
                      <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded-lg">
                        {coupon.code}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-rose-600">
                      {coupon.percent}%
                    </td>
                    <td className="px-4 py-3 text-slate-500 hidden lg:table-cell max-w-[240px] truncate">
                      {coupon.note || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleActive(coupon)}
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
                          coupon.active
                            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {coupon.active ? "Active" : "Disabled"}
                      </button>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(coupon)}
                          className="w-8 h-8 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition"
                          aria-label={`Edit ${coupon.code}`}
                        >
                          <TbEdit className="text-[16px]" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(coupon)}
                          className="w-8 h-8 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition"
                          aria-label={`Delete ${coupon.code}`}
                        >
                          <TbTrash className="text-[16px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={form.id ? "Edit coupon" : "Add coupon"}
        subtitle="Codes are case-insensitive and validated server-side at checkout."
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {form.id ? "Save changes" : "Add coupon"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          {error && (
            <div className="px-3.5 py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-[12.5px] font-semibold text-rose-700">
              {error}
            </div>
          )}
          <Field label="Code">
            <input
              value={form.code}
              onChange={(e) =>
                setForm({ ...form, code: e.target.value.toUpperCase() })
              }
              placeholder="SAVE15"
              className={`${inputCls} font-mono`}
            />
          </Field>
          <Field label="Discount percent">
            <input
              type="number"
              min="1"
              max="90"
              value={form.percent}
              onChange={(e) => setForm({ ...form, percent: e.target.value })}
              placeholder="15"
              className={inputCls}
            />
          </Field>
          <Field label="Note" hint="Internal label, e.g. Ramadan campaign.">
            <input
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className={inputCls}
            />
          </Field>
          <label className="flex items-center gap-2 text-[13px] font-bold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="accent-rose-600 w-4 h-4"
            />
            Active (customers can use it)
          </label>
        </div>
      </Modal>

      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Delete coupon?"
        subtitle={deleteTarget?.code}
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete permanently
            </Button>
          </>
        }
      >
        <p className="text-[13px] text-slate-600">
          The code will stop working immediately. Past orders keep their
          recorded discount.
        </p>
      </Modal>
    </div>
  );
};

export default AdminCoupons;
