import React, { useMemo, useState } from "react";
import {
  TbPlus,
  TbEdit,
  TbTrash,
  TbChevronUp,
  TbChevronDown,
  TbCategory,
} from "react-icons/tb";
import { useAdmin } from "../useAdmin";
import {
  Button,
  Card,
  EmptyState,
  Field,
  Modal,
  inputCls,
} from "../components/ui";
import { categoryImages, slugifyCategory } from "../../data/categories";

const blankCategory = (position = 0) => ({
  name: "",
  slug: "",
  image: categoryImages[0],
  position,
  subCategories: [],
});

const blankSub = () => ({
  name: "",
  slug: "",
  childrenText: "",
  slugEdited: false,
});

const splitList = (value) =>
  value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

const toForm = (category, position) => ({
  id: category?.id,
  name: category?.name ?? "",
  slug: category?.slug ?? "",
  image: category?.image || categoryImages[0],
  position: category?.position ?? position,
  subCategories: (category?.subCategories ?? []).map((sub) => ({
    name: sub.name ?? "",
    slug: sub.slug ?? "",
    childrenText: (sub.children ?? []).join(", "),
    slugEdited: true,
  })),
});

const AdminCategories = () => {
  const { catalog, categories, saveCategory, deleteCategory } = useAdmin();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(blankCategory);
  const [slugTouched, setSlugTouched] = useState(false);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const productCounts = useMemo(() => {
    const counts = {};
    for (const product of catalog) {
      counts[product.category] = (counts[product.category] ?? 0) + 1;
    }
    return counts;
  }, [catalog]);

  const openNew = () => {
    setForm(blankCategory(categories.length));
    setSlugTouched(false);
    setError("");
    setModalOpen(true);
  };

  const openEdit = (category, index) => {
    setForm(toForm(category, index));
    setSlugTouched(true);
    setError("");
    setModalOpen(true);
  };

  const setField = (key) => (event) => {
    const value = event.target.value;
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "name" && !slugTouched) {
        next.slug = slugifyCategory(value);
      }
      return next;
    });
  };

  const setSubField = (index, key) => (event) => {
    const value = event.target.value;
    setForm((prev) => {
      const subCategories = prev.subCategories.map((sub, i) => {
        if (i !== index) return sub;
        const next = { ...sub, [key]: value };
        if (key === "name" && !sub.slugEdited) {
          next.slug = slugifyCategory(value);
        }
        return next;
      });
      return { ...prev, subCategories };
    });
  };

  const addSub = () => {
    setForm((prev) => ({
      ...prev,
      subCategories: [...prev.subCategories, blankSub()],
    }));
  };

  const removeSub = (index) => {
    setForm((prev) => ({
      ...prev,
      subCategories: prev.subCategories.filter((_, i) => i !== index),
    }));
  };

  const moveSub = (index, direction) => {
    setForm((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.subCategories.length) return prev;
      const subCategories = [...prev.subCategories];
      [subCategories[index], subCategories[target]] = [
        subCategories[target],
        subCategories[index],
      ];
      return { ...prev, subCategories };
    });
  };

  const toggleImage = (image) => {
    setForm((prev) => ({ ...prev, image }));
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      setError("Category name is required.");
      return;
    }
    const slug = slugifyCategory(form.slug || form.name);
    if (!slug) {
      setError("Category slug is required.");
      return;
    }

    const subCategories = form.subCategories
      .map((sub) => ({
        name: sub.name.trim(),
        slug: slugifyCategory(sub.slug || sub.name),
        children: splitList(sub.childrenText),
      }))
      .filter((sub) => sub.name || sub.slug);

    const seen = new Set();
    for (const sub of subCategories) {
      if (!sub.name) {
        setError("Every sub-category needs a name.");
        return;
      }
      if (seen.has(sub.slug)) {
        setError(`Duplicate sub-category slug "${sub.slug}".`);
        return;
      }
      seen.add(sub.slug);
    }

    const saved = await saveCategory({
      ...form,
      name: form.name.trim(),
      slug,
      image: form.image || categoryImages[0],
      position: Number(form.position) || 0,
      subCategories,
    });
    if (saved) setModalOpen(false);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const removed = await deleteCategory(deleteTarget.id);
    if (removed) setDeleteTarget(null);
  };

  const moveCategory = async (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= categories.length) return;

    const reordered = [...categories];
    [reordered[index], reordered[target]] = [
      reordered[target],
      reordered[index],
    ];

    for (let i = 0; i < reordered.length; i += 1) {
      const category = reordered[i];
      if ((category.position ?? i) === i) continue;
      const saved = await saveCategory({ ...category, position: i });
      if (!saved) return;
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-[22px] sm:text-[26px] font-extrabold text-slate-900">
            Categories
          </h2>
          <p className="text-[13px] text-slate-500 mt-1">
            {categories.length} categories · navigation, shop filters and the
            home page update instantly
          </p>
        </div>
        <Button onClick={openNew}>
          <TbPlus className="text-[16px]" /> Add category
        </Button>
      </div>

      <Card className="overflow-hidden">
        {categories.length === 0 ? (
          <EmptyState
            icon={<TbCategory />}
            title="No categories yet"
            message="Create your first category to organise the catalog."
            action={
              <Button size="sm" onClick={openNew}>
                <TbPlus className="text-[14px]" /> Add category
              </Button>
            }
          />
        ) : (
          <div className="divide-y divide-slate-100">
            {categories.map((category, index) => {
              const subCount = category.subCategories?.length ?? 0;
              const productCount = productCounts[category.slug] ?? 0;
              return (
                <div
                  key={category.id}
                  className="flex flex-wrap items-center gap-4 px-5 py-4 hover:bg-slate-50/70 transition"
                >
                  <img
                    src={category.image}
                    alt=""
                    className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 object-contain p-1 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-900 truncate">
                      {category.name}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                      /{category.slug} · {subCount} sub-categor
                      {subCount === 1 ? "y" : "ies"} · {productCount} products
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveCategory(index, -1)}
                      disabled={index === 0}
                      className="w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30 flex items-center justify-center transition"
                      aria-label={`Move ${category.name} up`}
                    >
                      <TbChevronUp className="text-[16px]" />
                    </button>
                    <button
                      onClick={() => moveCategory(index, 1)}
                      disabled={index === categories.length - 1}
                      className="w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30 flex items-center justify-center transition"
                      aria-label={`Move ${category.name} down`}
                    >
                      <TbChevronDown className="text-[16px]" />
                    </button>
                    <button
                      onClick={() => openEdit(category, index)}
                      className="w-8 h-8 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition"
                      aria-label={`Edit ${category.name}`}
                    >
                      <TbEdit className="text-[16px]" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(category)}
                      className="w-8 h-8 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition"
                      aria-label={`Delete ${category.name}`}
                    >
                      <TbTrash className="text-[16px]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={form.id ? "Edit category" : "Add category"}
        subtitle="Categories appear in the header menu, shop filters and home page."
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {form.id ? "Save changes" : "Add category"}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Category name">
              <input
                value={form.name}
                onChange={setField("name")}
                placeholder="Men's Watches"
                className={inputCls}
              />
            </Field>
            <Field label="Slug" hint="Used in shop URLs, e.g. mens-watches.">
              <input
                value={form.slug}
                onChange={(event) => {
                  setSlugTouched(true);
                  setForm((prev) => ({
                    ...prev,
                    slug: slugifyCategory(event.target.value),
                  }));
                }}
                placeholder="mens-watches"
                className={`${inputCls} font-mono`}
              />
            </Field>
          </div>

          <div>
            <span className="block text-[12px] font-bold text-slate-700 mb-1.5">
              Category image
            </span>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
              {categoryImages.map((image) => {
                const selected = form.image === image;
                return (
                  <button
                    key={image}
                    type="button"
                    onClick={() => toggleImage(image)}
                    className={`relative aspect-square rounded-xl border-2 bg-slate-50 p-1.5 transition ${
                      selected
                        ? "border-rose-500 ring-4 ring-rose-500/10"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    aria-label="Select category image"
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="block text-[12px] font-bold text-slate-700">
                Sub-categories
              </span>
              <Button variant="outline" size="sm" onClick={addSub}>
                <TbPlus className="text-[13px]" /> Add sub-category
              </Button>
            </div>

            {form.subCategories.length === 0 ? (
              <p className="text-[12px] text-slate-400 px-1 py-2">
                No sub-categories yet — add them to build the menu flyouts.
              </p>
            ) : (
              <div className="space-y-3">
                {form.subCategories.map((sub, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-200 bg-slate-50/60 p-3 space-y-2.5"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <input
                          value={sub.name}
                          onChange={setSubField(index, "name")}
                          placeholder="Sub-category name"
                          className={inputCls}
                        />
                        <input
                          value={sub.slug}
                          onChange={(event) => {
                            setForm((prev) => ({
                              ...prev,
                              subCategories: prev.subCategories.map((entry, i) =>
                                i === index
                                  ? {
                                      ...entry,
                                      slug: slugifyCategory(event.target.value),
                                      slugEdited: true,
                                    }
                                  : entry
                              ),
                            }));
                          }}
                          placeholder="sub-category-slug"
                          className={`${inputCls} font-mono`}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => moveSub(index, -1)}
                        disabled={index === 0}
                        className="w-7 h-7 rounded-lg text-slate-400 hover:bg-slate-200 disabled:opacity-30 flex items-center justify-center"
                        aria-label="Move sub-category up"
                      >
                        <TbChevronUp className="text-[14px]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveSub(index, 1)}
                        disabled={index === form.subCategories.length - 1}
                        className="w-7 h-7 rounded-lg text-slate-400 hover:bg-slate-200 disabled:opacity-30 flex items-center justify-center"
                        aria-label="Move sub-category down"
                      >
                        <TbChevronDown className="text-[14px]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSub(index)}
                        className="w-7 h-7 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center"
                        aria-label="Remove sub-category"
                      >
                        <TbTrash className="text-[14px]" />
                      </button>
                    </div>
                    <input
                      value={sub.childrenText}
                      onChange={setSubField(index, "childrenText")}
                      placeholder="Child tags, separated by commas — e.g. Leather, Steel, Mesh"
                      className={inputCls}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Modal>

      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Delete category?"
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
          This removes the category and its sub-categories from the storefront
          navigation.
          {(productCounts[deleteTarget?.slug] ?? 0) > 0 && (
            <>
              {" "}
              <strong>
                {productCounts[deleteTarget?.slug]} product
                {productCounts[deleteTarget?.slug] === 1 ? "" : "s"}
              </strong>{" "}
              still reference this slug and will no longer match a category
              filter.
            </>
          )}
        </p>
      </Modal>
    </div>
  );
};

export default AdminCategories;
