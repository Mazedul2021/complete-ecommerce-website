import React, { useEffect, useState } from "react";
import { TbDeviceFloppy, TbRefreshAlert, TbBuildingStore } from "react-icons/tb";
import { useAdmin } from "../useAdmin";
import { Button, Card, Field, Modal, inputCls } from "../components/ui";

const AdminSettings = () => {
  const { settings, updateSettings, resetDemoData } = useAdmin();
  const [form, setForm] = useState(settings);
  const [resetOpen, setResetOpen] = useState(false);

  // The settings arrive from the API after the first render.
  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const set = (key) => (event) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const dirty = Object.keys(form).some((key) => form[key] !== settings[key]);

  const handleSave = async (event) => {
    event.preventDefault();
    await updateSettings({
      ...form,
      lowStockThreshold: Math.max(0, Number(form.lowStockThreshold) || 0),
    });
  };

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h2 className="text-[22px] sm:text-[26px] font-extrabold text-slate-900">
          Store settings
        </h2>
        <p className="text-[13px] text-slate-500 mt-1">
          Used across the admin console and its alerts.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <TbBuildingStore className="text-[19px] text-rose-500" />
            <h3 className="text-[15px] font-extrabold text-slate-900">
              Store profile
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Store name" className="sm:col-span-2">
              <input
                value={form.storeName}
                onChange={set("storeName")}
                className={inputCls}
              />
            </Field>
            <Field label="Support email">
              <input
                type="email"
                value={form.supportEmail}
                onChange={set("supportEmail")}
                className={inputCls}
              />
            </Field>
            <Field label="Support phone">
              <input
                value={form.supportPhone}
                onChange={set("supportPhone")}
                className={inputCls}
              />
            </Field>
            <Field label="Store address" className="sm:col-span-2">
              <input
                value={form.address}
                onChange={set("address")}
                className={inputCls}
              />
            </Field>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-[15px] font-extrabold text-slate-900">
            Inventory
          </h3>
          <p className="text-[12.5px] text-slate-500 mt-0.5 mb-4">
            Products at or below this quantity are flagged as low stock.
          </p>
          <Field label="Low stock threshold" className="max-w-[220px]">
            <input
              type="number"
              min="0"
              value={form.lowStockThreshold}
              onChange={set("lowStockThreshold")}
              className={inputCls}
            />
          </Field>
        </Card>

        <div className="flex items-center justify-end gap-2">
          {dirty && (
            <Button
              variant="ghost"
              onClick={() => setForm(settings)}
              disabled={!dirty}
            >
              Discard
            </Button>
          )}
          <Button type="submit" disabled={!dirty}>
            <TbDeviceFloppy className="text-[16px]" /> Save changes
          </Button>
        </div>
      </form>

      <Card className="p-5 border-rose-200/70 bg-rose-50/40">
        <div className="flex items-start gap-3">
          <span className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center text-[19px] shrink-0">
            <TbRefreshAlert />
          </span>
          <div className="flex-1">
            <h3 className="text-[15px] font-extrabold text-slate-900">
              Reset demo data
            </h3>
            <p className="text-[12.5px] text-slate-600 mt-1">
              Restores the original catalog, demo orders and store settings in
              the database. Product and order changes are discarded.
            </p>
            <Button
              variant="danger"
              size="sm"
              className="mt-3"
              onClick={() => setResetOpen(true)}
            >
              Reset all data
            </Button>
          </div>
        </div>
      </Card>

      <Modal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        title="Reset all demo data?"
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setResetOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={resetDemoData}>
              Yes, reset
            </Button>
          </>
        }
      >
        <p className="text-[13px] text-slate-600">
          Any product edits and order status changes stored in the database will
          be discarded. This cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default AdminSettings;
