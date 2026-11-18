import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { TbSearch, TbPlus, TbEdit, TbTrash, TbExternalLink } from "react-icons/tb";
import { useAdmin } from "../useAdmin";
import {
  Button,
  Card,
  EmptyState,
  Field,
  Modal,
  inputCls,
} from "../components/ui";
import { formatPrice } from "../../utils/format";
import { stockState } from "../data/adminData";

const blankProduct = () => ({
  name: "",
  brand: "OLEVS",
  category: "",
  subCategory: "",
  subSubCategory: "",
  price: "",
  oldPrice: "",
  stock: "",
  sku: "",
  colors: "",
  tags: "",
  shortDescription: "",
  description: "",
  featured: false,
  popular: false,
  latest: true,
  images: [],
});

const splitList = (value) =>
  value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

const SORTS = [
  { key: "newest", label: "Newest first" },
  { key: "name", label: "Name A–Z" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "stock-asc", label: "Stock: lowest first" },
];

const AdminProducts = () => {
  const { catalog, categories, settings, saveProduct, deleteProduct } =
    useAdmin();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(blankProduct);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const visible = useMemo(() => {
    let list = [...catalog];
    const term = query.trim().toLowerCase();

    if (term) {
      list = list.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.brand?.toLowerCase().includes(term) ||
          product.sku?.toLowerCase().includes(term)
      );
    }
    if (category !== "all") {
      list = list.filter((product) => product.category === category);
    }

    const sorters = {
      newest: (a, b) => b.id - a.id,
      name: (a, b) => a.name.localeCompare(b.name),
      "price-desc": (a, b) => b.price - a.price,
      "price-asc": (a, b) => a.price - b.price,
      "stock-asc": (a, b) => a.stock - b.stock,
    };
    return list.sort(sorters[sort]);
  }, [catalog, query, category, sort]);

  const openNew = () => {
    setForm({ ...blankProduct(), category: categories[0]?.slug ?? "" });
    setError("");
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setForm({
      ...product,
      price: String(product.price),
      oldPrice: String(product.oldPrice ?? ""),
      stock: String(product.stock ?? 0),
      colors: (product.colors ?? []).join(", "),
      tags: (product.tags ?? []).join(", "),
      images: [...(product.images ?? [])],
    });
    setError("");
    setModalOpen(true);
  };

  const setField = (key) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const removeImage = (image) => {
    setForm((prev) => ({
      ...prev,
      images:
        prev.images.length > 1
          ? prev.images.filter((entry) => entry !== image)
          : prev.images,
    }));
  };

  const handleSave = async () => {
    const price = Number(form.price);
    const oldPrice = Number(form.oldPrice) || price;

    if (!form.name.trim()) {
      setError("Product name is required.");
      return;
    }
    if (!price || price <= 0) {
      setError("Enter a selling price greater than zero.");
      return;
    }
    if (!form.sku.trim()) {
      setError("SKU is required to identify the product.");
      return;
    }

    const saved = await saveProduct({
      ...form,
      name: form.name.trim(),
      sku: form.sku.trim().toUpperCase(),
      price,
      oldPrice: Math.max(oldPrice, price),
      stock: Math.max(0, Number(form.stock) || 0),
      colors: splitList(form.colors),
      tags: splitList(form.tags),
      images: form.images,
    });
    if (saved) setModalOpen(false);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const removed = await deleteProduct(deleteTarget.id);
    if (removed) setDeleteTarget(null);
  };

  const categoryName = (slug) =>
    categories.find((entry) => entry.slug === slug)?.name ?? slug;

  const selectedCategory = categories.find(
    (entry) => entry.slug === form.category
  );
  const subOptions = selectedCategory?.subCategories ?? [];
  const selectedSub = subOptions.find(
    (sub) => sub.name === form.subCategory || sub.slug === form.subCategory
  );
  const subSubOptions = selectedSub?.children ?? [];

  const onCategoryChange = (event) => {
    setForm((prev) => ({
      ...prev,
      category: event.target.value,
      subCategory: "",
      subSubCategory: "",
    }));
  };

  const onSubCategoryChange = (event) => {
    setForm((prev) => ({
      ...prev,
      subCategory: event.target.value,
      subSubCategory: "",
    }));
  };

  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const max = 900;
          const scale = Math.min(1, max / Math.max(img.width, img.height));
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(img.width * scale));
          canvas.height = Math.max(1, Math.round(img.height * scale));
          canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", 0.82));
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleImageUpload = async (event) => {
    const files = [...(event.target.files ?? [])].filter((file) =>
      file.type.startsWith("image/")
    );
    event.target.value = "";
    if (files.length === 0) return;

    const uploaded = await Promise.all(files.map(fileToDataUrl));
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...uploaded].slice(0, 8),
    }));
  };

  const [dragIndex, setDragIndex] = useState(null);

  const reorderImages = (from, to) => {
    if (from === to || from === null || to === null) return;
    setForm((prev) => {
      const images = [...prev.images];
      const [moved] = images.splice(from, 1);
      images.splice(to, 0, moved);
      return { ...prev, images };
    });
    setDragIndex(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-[22px] sm:text-[26px] font-extrabold text-slate-900">
            Product catalog
          </h2>
          <p className="text-[13px] text-slate-500 mt-1">
            {catalog.length} timepieces · edits appear on the storefront instantly
          </p>
        </div>
        <Button onClick={openNew}>
          <TbPlus className="text-[16px]" /> Add product
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <TbSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[16px]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, brand or SKU…"
              className={`${inputCls} pl-9`}
            />
          </div>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className={`${inputCls} lg:w-[210px]`}
          >
            <option value="all">All categories</option>
            {categories.map((entry) => (
              <option key={entry.slug} value={entry.slug}>
                {entry.name}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className={`${inputCls} lg:w-[190px]`}
          >
            {SORTS.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </Card>

      <Card className="overflow-hidden">
        {visible.length === 0 ? (
          <EmptyState
            icon={<TbSearch />}
            title="No products match your filters"
            message="Try a different search term or category."
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                }}
              >
                Clear filters
              </Button>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12.5px]">
              <thead>
                <tr className="text-[10.5px] uppercase tracking-wider text-slate-400 bg-slate-50/70">
                  <th className="px-5 py-3 font-extrabold">Product</th>
                  <th className="px-4 py-3 font-extrabold hidden lg:table-cell">Category</th>
                  <th className="px-4 py-3 font-extrabold text-right">Price</th>
                  <th className="px-4 py-3 font-extrabold">Stock</th>
                  <th className="px-4 py-3 font-extrabold hidden xl:table-cell">Rating</th>
                  <th className="px-5 py-3 font-extrabold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visible.map((product) => {
                  const state = stockState(product, settings.lowStockThreshold);
                  return (
                    <tr key={product.id} className="hover:bg-slate-50/70 transition">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images?.[0]}
                            alt=""
                            className="w-11 h-11 rounded-lg bg-slate-50 border border-slate-100 object-contain p-1 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 truncate max-w-[300px]">
                              {product.name}
                            </p>
                            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                              {product.sku} · {product.brand}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600 hidden lg:table-cell">
                        <span className="block">{categoryName(product.category)}</span>
                        <span className="block text-[11px] text-slate-400">
                          {[product.subCategory, product.subSubCategory]
                            .filter(Boolean)
                            .join(" / ")}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <span className="font-bold text-slate-900">
                          {formatPrice(product.price)}
                        </span>
                        {product.oldPrice > product.price && (
                          <span className="block text-[11px] text-slate-400 line-through">
                            {formatPrice(product.oldPrice)}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${state.tone}`}
                        >
                          {product.stock} · {state.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden xl:table-cell">
                        <span className="font-bold text-slate-800">
                          {Number(product.rating).toFixed(1)}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {" "}
                          ({product.reviews})
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/product/${product.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 flex items-center justify-center transition"
                            aria-label={`View ${product.name}`}
                          >
                            <TbExternalLink className="text-[16px]" />
                          </Link>
                          <button
                            onClick={() => openEdit(product)}
                            className="w-8 h-8 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition"
                            aria-label={`Edit ${product.name}`}
                          >
                            <TbEdit className="text-[16px]" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(product)}
                            className="w-8 h-8 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition"
                            aria-label={`Delete ${product.name}`}
                          >
                            <TbTrash className="text-[16px]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={form.id ? "Edit product" : "Add product"}
        subtitle="Changes are saved to the shared storefront catalog."
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {form.id ? "Save changes" : "Add product"}
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

          <Field label="Product name">
            <input
              value={form.name}
              onChange={setField("name")}
              placeholder="OLEVS 6655 Automatic Skeleton Watch"
              className={inputCls}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Brand">
              <input
                value={form.brand}
                onChange={setField("brand")}
                className={inputCls}
              />
            </Field>
            <Field label="SKU">
              <input
                value={form.sku}
                onChange={setField("sku")}
                placeholder="OLV-6655-BLK"
                className={inputCls}
              />
            </Field>
            <Field label="Category">
              <select
                value={form.category}
                onChange={onCategoryChange}
                className={inputCls}
              >
                <option value="">Select category…</option>
                {categories.map((entry) => (
                  <option key={entry.slug} value={entry.slug}>
                    {entry.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Sub-category">
              <select
                value={form.subCategory}
                onChange={onSubCategoryChange}
                disabled={!form.category}
                className={inputCls}
              >
                <option value="">
                  {form.category ? "Select sub-category…" : "Pick a category first"}
                </option>
                {subOptions.map((sub) => (
                  <option key={sub.slug} value={sub.name}>
                    {sub.name}
                  </option>
                ))}
                {form.subCategory &&
                  !subOptions.some((sub) => sub.name === form.subCategory) && (
                    <option value={form.subCategory}>{form.subCategory}</option>
                  )}
              </select>
            </Field>
            <Field label="Sub-sub-category">
              <select
                value={form.subSubCategory}
                onChange={setField("subSubCategory")}
                disabled={!form.subCategory}
                className={inputCls}
              >
                <option value="">
                  {form.subCategory
                    ? "Select sub-sub-category…"
                    : "Pick a sub-category first"}
                </option>
                {subSubOptions.map((child) => (
                  <option key={child} value={child}>
                    {child}
                  </option>
                ))}
                {form.subSubCategory &&
                  !subSubOptions.includes(form.subSubCategory) && (
                    <option value={form.subSubCategory}>
                      {form.subSubCategory}
                    </option>
                  )}
              </select>
            </Field>
            <Field label="Price (৳)">
              <input
                type="number"
                min="0"
                value={form.price}
                onChange={setField("price")}
                placeholder="5490"
                className={inputCls}
              />
            </Field>
            <Field label="Compare-at price (৳)" hint="Leave blank for no discount badge.">
              <input
                type="number"
                min="0"
                value={form.oldPrice}
                onChange={setField("oldPrice")}
                placeholder="6990"
                className={inputCls}
              />
            </Field>
            <Field label="Stock quantity">
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={setField("stock")}
                placeholder="14"
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Colourways" hint="Separate with commas, e.g. Black, Silver, Gold">
            <input
              value={form.colors}
              onChange={setField("colors")}
              className={inputCls}
            />
          </Field>

          <Field label="Tags" hint="Separate with commas — used by storefront search.">
            <input
              value={form.tags}
              onChange={setField("tags")}
              className={inputCls}
            />
          </Field>

          <Field label="Short description" hint="Summary under the price — supports multiple lines.">
            <textarea
              value={form.shortDescription}
              onChange={setField("shortDescription")}
              rows={3}
              placeholder={"Exposed mechanical movement, sapphire crystal.\n3ATM water resistant, 42mm case."}
              className="w-full p-3 rounded-xl border border-slate-200 text-[13px] outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
            />
          </Field>

          <Field label="Full description">
            <textarea
              value={form.description}
              onChange={setField("description")}
              rows={4}
              className="w-full p-3 rounded-xl border border-slate-200 text-[13px] outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
            />
          </Field>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="block text-[12px] font-bold text-slate-700">
                Product images
              </span>
              <label className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-slate-200 bg-white hover:border-rose-300 hover:text-rose-600 text-[12px] font-bold text-slate-600 cursor-pointer transition">
                Upload images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {form.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {form.images.map((image, index) => (
                  <div
                    key={image}
                    draggable
                    onDragStart={() => setDragIndex(index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => reorderImages(dragIndex, index)}
                    onDragEnd={() => setDragIndex(null)}
                    className={`relative w-16 h-16 rounded-xl border-2 bg-slate-50 p-1 cursor-grab active:cursor-grabbing transition ${
                      dragIndex === index
                        ? "border-rose-500 opacity-50"
                        : "border-slate-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-contain pointer-events-none"
                      draggable={false}
                    />
                    <span className="absolute -top-1.5 -left-1.5 w-[18px] h-[18px] px-0.5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[9px] font-extrabold">
                      {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeImage(image)}
                      className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] leading-none"
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className="text-[11.5px] text-slate-400 mt-1.5">
              Drag thumbnails to reorder — the first image is the main product
              photo. Upload accepts multiple images at once.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              ["featured", "Featured on home"],
              ["popular", "Popular"],
              ["latest", "New arrival"],
            ].map(([key, label]) => (
              <label
                key={key}
                className={`inline-flex items-center gap-2 h-9 px-3 rounded-xl border text-[12px] font-bold cursor-pointer transition ${
                  form[key]
                    ? "border-rose-500 bg-rose-50 text-rose-700"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={Boolean(form[key])}
                  onChange={setField(key)}
                  className="accent-rose-600 w-3.5 h-3.5"
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      </Modal>

      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Delete product?"
        subtitle={deleteTarget?.name}
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
          This removes the product from the storefront catalog. Existing orders keep
          their saved item details.
        </p>
      </Modal>
    </div>
  );
};

export default AdminProducts;
