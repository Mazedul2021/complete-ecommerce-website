import React, { useEffect, useRef, useState } from "react";
import { useAdmin } from "../useAdmin";
import { FOOTER_DEFAULTS } from "../../data/footerDefaults";
import {
  TbPhoto,
  TbPlus,
  TbTrash,
  TbArrowUp,
  TbArrowDown,
  TbDeviceFloppy,
} from "react-icons/tb";

const fileToDataUrl = (file, max = 1600) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const ImagePicker = ({ label, image, onPick, onClear, hint }) => {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !file.type.startsWith("image/")) return;
    setBusy(true);
    try {
      onPick(await fileToDataUrl(file));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/60">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12px] font-bold uppercase tracking-wide text-slate-500">
          {label}
        </span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="text-[11.5px] font-bold px-2.5 py-1 rounded-lg bg-slate-900 text-white hover:bg-slate-700 disabled:opacity-50 flex items-center gap-1"
          >
            <TbPhoto size={13} /> {busy ? "Uploading…" : image ? "Replace" : "Upload"}
          </button>
          {image && onClear && (
            <button
              type="button"
              onClick={onClear}
              className="text-[11.5px] font-bold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      {image ? (
        <img
          src={image}
          alt={label}
          className="w-full h-28 object-cover rounded-lg border border-slate-200"
        />
      ) : (
        <div className="w-full h-28 rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-[12px]">
          {hint ?? "No image selected"}
        </div>
      )}
    </div>
  );
};

const ProductPicker = ({ title, hint, products, selected, onToggle }) => (
  <div className="border border-slate-200 rounded-xl p-3">
    <div className="mb-2">
      <h4 className="text-[13px] font-bold text-slate-800">{title}</h4>
      <p className="text-[11.5px] text-slate-400">{hint}</p>
    </div>
    <div className="max-h-44 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-1 pr-1">
      {products.map((product) => {
        const id = String(product.id);
        const checked = selected.includes(id);
        return (
          <label
            key={product.id}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-[12px] ${
              checked ? "bg-rose-50 text-rose-700 font-semibold" : "hover:bg-slate-50 text-slate-600"
            }`}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onToggle(id)}
              className="accent-rose-600"
            />
            <span className="truncate">{product.name}</span>
          </label>
        );
      })}
    </div>
  </div>
);

const Homepage = () => {
  const { settings, catalog, updateSettings, notice } = useAdmin();
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft({
      logo: settings.logo ?? "",
      heroSlides: settings.heroSlides ?? [],
      promoBanners: settings.promoBanners ?? [],
      flashDeals: { enabled: settings.flashDeals?.enabled !== false, title: settings.flashDeals?.title ?? "" },
      homePicks: {
        popular: settings.homePicks?.popular ?? [],
        latest: settings.homePicks?.latest ?? [],
        featured: settings.homePicks?.featured ?? [],
      },
      navLinks: settings.navLinks ?? [],
      footer: {
        ...FOOTER_DEFAULTS,
        ...(settings.footer || {}),
        newsletter: {
          ...FOOTER_DEFAULTS.newsletter,
          ...(settings.footer?.newsletter || {}),
        },
        socials: {
          ...FOOTER_DEFAULTS.socials,
          ...(settings.footer?.socials || {}),
        },
      },
    });
  }, [settings]);

  if (!draft) return null;

  const setSlide = (index, patch) =>
    setDraft((prev) => ({
      ...prev,
      heroSlides: prev.heroSlides.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    }));

  const moveSlide = (index, dir) =>
    setDraft((prev) => {
      const list = [...prev.heroSlides];
      const target = index + dir;
      if (target < 0 || target >= list.length) return prev;
      [list[index], list[target]] = [list[target], list[index]];
      return { ...prev, heroSlides: list };
    });

  const togglePick = (section, id) =>
    setDraft((prev) => {
      const list = prev.homePicks[section];
      return {
        ...prev,
        homePicks: {
          ...prev.homePicks,
          [section]: list.includes(id) ? list.filter((x) => x !== id) : [...list, id],
        },
      };
    });

  const setNavLink = (index, patch) =>
    setDraft((prev) => ({
      ...prev,
      navLinks: prev.navLinks.map((l, i) => (i === index ? { ...l, ...patch } : l)),
    }));

  const moveNavLink = (index, dir) =>
    setDraft((prev) => {
      const list = [...prev.navLinks];
      const target = index + dir;
      if (target < 0 || target >= list.length) return prev;
      [list[index], list[target]] = [list[target], list[index]];
      return { ...prev, navLinks: list };
    });

  const setFooter = (patch) =>
    setDraft((prev) => ({ ...prev, footer: { ...prev.footer, ...patch } }));

  const setFooterColumn = (ci, patch) =>
    setDraft((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        columns: prev.footer.columns.map((c, i) => (i === ci ? { ...c, ...patch } : c)),
      },
    }));

  const setFooterLink = (ci, li, patch) =>
    setDraft((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        columns: prev.footer.columns.map((c, i) =>
          i === ci
            ? { ...c, links: c.links.map((l, x) => (x === li ? { ...l, ...patch } : l)) }
            : c
        ),
      },
    }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings({
        logo: draft.logo,
        heroSlides: draft.heroSlides,
        promoBanners: draft.promoBanners,
        flashDeals: draft.flashDeals,
        homePicks: draft.homePicks,
        navLinks: draft.navLinks,
        footer: draft.footer,
      });
    } finally {
      setSaving(false);
    }
  };

  const bannerAt = (index) => draft.promoBanners[index] ?? { image: "", link: "" };
  const setBanner = (index, patch) =>
    setDraft((prev) => {
      const list = [...prev.promoBanners];
      while (list.length <= index) list.push({ image: "", link: "" });
      list[index] = { ...list[index], ...patch };
      return { ...prev, promoBanners: list };
    });

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-slate-500">
          Control the storefront homepage: logo, hero slider, banners, deals and featured picks.
        </p>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 rounded-xl bg-rose-600 text-white text-[13px] font-bold hover:bg-rose-700 disabled:opacity-50 flex items-center gap-2"
        >
          <TbDeviceFloppy size={15} /> {saving ? "Saving…" : "Save homepage"}
        </button>
      </div>
      {notice && <p className="text-[12.5px] text-emerald-600 font-semibold">{notice}</p>}

      {/* Logo */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="text-[15px] font-bold text-slate-900 mb-1">Website Logo</h3>
        <p className="text-[12.5px] text-slate-500 mb-4">
          Shown in the header, footer and admin sidebar. PNG with transparent background works best.
        </p>
        <div className="max-w-xs">
          <ImagePicker
            label="Logo image"
            image={draft.logo}
            onPick={(image) => setDraft((p) => ({ ...p, logo: image }))}
            onClear={() => setDraft((p) => ({ ...p, logo: "" }))}
            hint="Default OLEVS logo"
          />
        </div>
      </section>

      {/* Hero slider */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-[15px] font-bold text-slate-900">Hero Banner Slides</h3>
          <button
            onClick={() =>
              setDraft((p) => ({
                ...p,
                heroSlides: [...p.heroSlides, { image: "", link: "/shop" }].slice(0, 10),
              }))
            }
            className="text-[12px] font-bold px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-700 flex items-center gap-1"
          >
            <TbPlus size={13} /> Add slide
          </button>
        </div>
        <p className="text-[12.5px] text-slate-500 mb-4">
          {draft.heroSlides.length === 0
            ? "No custom slides — the bundled defaults are shown. Add slides to override them."
            : "Slides appear in order. Use the arrows to reorder; the first slide shows first."}
        </p>
        <div className="space-y-3">
          {draft.heroSlides.map((slide, i) => (
            <div key={i} className="flex items-center gap-3 border border-slate-200 rounded-xl p-3">
              <span className="text-[11px] font-bold text-slate-400 w-5">{i + 1}</span>
              {slide.image ? (
                <img src={slide.image} alt="" className="w-24 h-14 object-cover rounded-lg border border-slate-200" />
              ) : (
                <div className="w-24 h-14 rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-slate-300">
                  <TbPhoto size={18} />
                </div>
              )}
              <input
                value={slide.link}
                onChange={(e) => setSlide(i, { link: e.target.value })}
                placeholder="Link e.g. /shop?category=luxury-watches"
                className="flex-1 text-[12.5px] px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
              />
              <ImagePicker
                label=""
                image={slide.image}
                onPick={(image) => setSlide(i, { image })}
                onClear={() => setSlide(i, { image: "" })}
              />
              <div className="flex flex-col gap-1">
                <button onClick={() => moveSlide(i, -1)} disabled={i === 0} className="p-1 rounded hover:bg-slate-100 disabled:opacity-30"><TbArrowUp size={15} /></button>
                <button onClick={() => moveSlide(i, 1)} disabled={i === draft.heroSlides.length - 1} className="p-1 rounded hover:bg-slate-100 disabled:opacity-30"><TbArrowDown size={15} /></button>
                <button
                  onClick={() => setDraft((p) => ({ ...p, heroSlides: p.heroSlides.filter((_, x) => x !== i) }))}
                  className="p-1 rounded hover:bg-rose-50 text-rose-500"
                >
                  <TbTrash size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo banners */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="text-[15px] font-bold text-slate-900 mb-1">Sub Banners (Homepage)</h3>
        <p className="text-[12.5px] text-slate-500 mb-4">
          The two large promotional banners under the category slider. Leave empty to keep the defaults.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[0, 1].map((i) => {
            const banner = bannerAt(i);
            return (
              <div key={i} className="space-y-2">
                <ImagePicker
                  label={`Banner ${i + 1}`}
                  image={banner.image}
                  onPick={(image) => setBanner(i, { image })}
                  onClear={() => setBanner(i, { image: "" })}
                  hint="Default banner"
                />
                <input
                  value={banner.link}
                  onChange={(e) => setBanner(i, { link: e.target.value })}
                  placeholder="Link e.g. /shop?category=smart-watches"
                  className="w-full text-[12.5px] px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Flash deals */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="text-[15px] font-bold text-slate-900 mb-3">Flash Deals Section</h3>
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-[13px] font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={draft.flashDeals.enabled}
              onChange={(e) =>
                setDraft((p) => ({ ...p, flashDeals: { ...p.flashDeals, enabled: e.target.checked } }))
              }
              className="accent-rose-600 w-4 h-4"
            />
            Show flash deals section on homepage
          </label>
          <input
            value={draft.flashDeals.title}
            onChange={(e) =>
              setDraft((p) => ({ ...p, flashDeals: { ...p.flashDeals, title: e.target.value } }))
            }
            placeholder="Section title (optional)"
            className="flex-1 min-w-[220px] text-[12.5px] px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
          />
        </div>
        <p className="text-[12px] text-slate-400 mt-2">
          Products shown are automatically the discounted items; the countdown is built in.
        </p>
      </section>

      {/* Product picks */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="text-[15px] font-bold text-slate-900 mb-1">Homepage Product Picks</h3>
        <p className="text-[12.5px] text-slate-500 mb-4">
          Manually choose which products appear in each homepage section. Leave a section empty to use automatic rules (popular flag / newest / featured flag).
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ProductPicker
            title="Popular Products"
            hint={`${draft.homePicks.popular.length} selected`}
            products={catalog}
            selected={draft.homePicks.popular}
            onToggle={(id) => togglePick("popular", id)}
          />
          <ProductPicker
            title="New Arrivals"
            hint={`${draft.homePicks.latest.length} selected`}
            products={catalog}
            selected={draft.homePicks.latest}
            onToggle={(id) => togglePick("latest", id)}
          />
          <ProductPicker
            title="Featured Products"
            hint={`${draft.homePicks.featured.length} selected`}
            products={catalog}
            selected={draft.homePicks.featured}
            onToggle={(id) => togglePick("featured", id)}
          />
        </div>
      </section>

      {/* Navbar menu */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-[15px] font-bold text-slate-900">Navbar Menu</h3>
          <button
            onClick={() =>
              setDraft((p) => ({
                ...p,
                navLinks: [...p.navLinks, { label: "", link: "/", badge: "" }].slice(0, 12),
              }))
            }
            className="text-[12px] font-bold px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-700 flex items-center gap-1"
          >
            <TbPlus size={13} /> Add item
          </button>
        </div>
        <p className="text-[12.5px] text-slate-500 mb-4">
          Extra menu items shown after the category links. Home, Shop and the category menus are automatic.
        </p>
        <div className="space-y-2">
          {draft.navLinks.map((item, i) => (
            <div key={i} className="flex items-center gap-2 border border-slate-200 rounded-xl p-2.5">
              <input
                value={item.label}
                onChange={(e) => setNavLink(i, { label: e.target.value })}
                placeholder="Label"
                className="w-32 text-[12.5px] px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
              />
              <input
                value={item.link}
                onChange={(e) => setNavLink(i, { link: e.target.value })}
                placeholder="Link e.g. /about"
                className="flex-1 text-[12.5px] px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
              />
              <input
                value={item.badge ?? ""}
                onChange={(e) => setNavLink(i, { badge: e.target.value })}
                placeholder="Badge"
                className="w-20 text-[12.5px] px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
              />
              <div className="flex flex-col gap-0.5">
                <button onClick={() => moveNavLink(i, -1)} disabled={i === 0} className="p-0.5 rounded hover:bg-slate-100 disabled:opacity-30"><TbArrowUp size={14} /></button>
                <button onClick={() => moveNavLink(i, 1)} disabled={i === draft.navLinks.length - 1} className="p-0.5 rounded hover:bg-slate-100 disabled:opacity-30"><TbArrowDown size={14} /></button>
              </div>
              <button
                onClick={() => setDraft((p) => ({ ...p, navLinks: p.navLinks.filter((_, x) => x !== i) }))}
                className="p-1 rounded hover:bg-rose-50 text-rose-500"
              >
                <TbTrash size={15} />
              </button>
            </div>
          ))}
          {draft.navLinks.length === 0 && (
            <p className="text-[12px] text-slate-400 italic">No extra menu items — only Home, Shop and categories will show.</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="text-[15px] font-bold text-slate-900 mb-1">Footer</h3>
        <p className="text-[12.5px] text-slate-500 mb-4">
          About text, trust badges, link columns, newsletter box, social links and copyright. Store address/phone/email are managed under Settings.
        </p>

        <label className="block text-[12px] font-bold text-slate-500 mb-1">About text</label>
        <textarea
          value={draft.footer.about}
          onChange={(e) => setFooter({ about: e.target.value })}
          rows={2}
          className="w-full text-[12.5px] px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/40 mb-4"
        />

        <label className="block text-[12px] font-bold text-slate-500 mb-1">Trust badges (top row, max 4 shown)</label>
        <div className="space-y-2 mb-4">
          {draft.footer.badges.map((badge, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={badge.title}
                onChange={(e) =>
                  setFooter({ badges: draft.footer.badges.map((b, x) => (x === i ? { ...b, title: e.target.value } : b)) })
                }
                placeholder="Title"
                className="w-44 text-[12.5px] px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
              />
              <input
                value={badge.text}
                onChange={(e) =>
                  setFooter({ badges: draft.footer.badges.map((b, x) => (x === i ? { ...b, text: e.target.value } : b)) })
                }
                placeholder="Subtitle"
                className="flex-1 text-[12.5px] px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
              />
              <button
                onClick={() => setFooter({ badges: draft.footer.badges.filter((_, x) => x !== i) })}
                className="p-1 rounded hover:bg-rose-50 text-rose-500"
              >
                <TbTrash size={15} />
              </button>
            </div>
          ))}
          {draft.footer.badges.length < 6 && (
            <button
              onClick={() => setFooter({ badges: [...draft.footer.badges, { title: "", text: "" }] })}
              className="text-[12px] font-bold text-rose-600 hover:underline flex items-center gap-1"
            >
              <TbPlus size={13} /> Add badge
            </button>
          )}
        </div>

        <label className="block text-[12px] font-bold text-slate-500 mb-1">Link columns</label>
        <div className="space-y-3 mb-4">
          {draft.footer.columns.map((col, ci) => (
            <div key={ci} className="border border-slate-200 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <input
                  value={col.title}
                  onChange={(e) => setFooterColumn(ci, { title: e.target.value })}
                  placeholder="Column title"
                  className="flex-1 text-[12.5px] font-bold px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                />
                <button
                  onClick={() => setFooter({ columns: draft.footer.columns.filter((_, x) => x !== ci) })}
                  className="p-1 rounded hover:bg-rose-50 text-rose-500"
                >
                  <TbTrash size={15} />
                </button>
              </div>
              <div className="space-y-1.5">
                {col.links.map((link, li) => (
                  <div key={li} className="flex items-center gap-2">
                    <input
                      value={link.label}
                      onChange={(e) => setFooterLink(ci, li, { label: e.target.value })}
                      placeholder="Label"
                      className="w-40 text-[12px] px-2 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                    />
                    <input
                      value={link.link}
                      onChange={(e) => setFooterLink(ci, li, { link: e.target.value })}
                      placeholder="Link"
                      className="flex-1 text-[12px] px-2 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                    />
                    <button
                      onClick={() =>
                        setFooterColumn(ci, { links: col.links.filter((_, x) => x !== li) })
                      }
                      className="p-1 rounded hover:bg-rose-50 text-rose-500"
                    >
                      <TbTrash size={14} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setFooterColumn(ci, { links: [...col.links, { label: "", link: "/" }] })}
                  className="text-[11.5px] font-bold text-rose-600 hover:underline flex items-center gap-1"
                >
                  <TbPlus size={12} /> Add link
                </button>
              </div>
            </div>
          ))}
          {draft.footer.columns.length < 6 && (
            <button
              onClick={() =>
                setFooter({ columns: [...draft.footer.columns, { title: "", links: [] }] })
              }
              className="text-[12px] font-bold text-rose-600 hover:underline flex items-center gap-1"
            >
              <TbPlus size={13} /> Add column
            </button>
          )}
        </div>

        <label className="block text-[12px] font-bold text-slate-500 mb-1">Newsletter box</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
          <input
            value={draft.footer.newsletter.title}
            onChange={(e) => setFooter({ newsletter: { ...draft.footer.newsletter, title: e.target.value } })}
            placeholder="Title"
            className="text-[12.5px] px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
          />
          <input
            value={draft.footer.newsletter.text}
            onChange={(e) => setFooter({ newsletter: { ...draft.footer.newsletter, text: e.target.value } })}
            placeholder="Description"
            className="text-[12.5px] px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
          />
          <input
            value={draft.footer.newsletter.button}
            onChange={(e) => setFooter({ newsletter: { ...draft.footer.newsletter, button: e.target.value } })}
            placeholder="Button text"
            className="text-[12.5px] px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
          />
        </div>

        <label className="block text-[12px] font-bold text-slate-500 mb-1">Social links</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {["facebook", "instagram", "youtube", "tiktok"].map((key) => (
            <input
              key={key}
              value={draft.footer.socials[key]}
              onChange={(e) =>
                setFooter({ socials: { ...draft.footer.socials, [key]: e.target.value } })
              }
              placeholder={`${key} URL`}
              className="text-[12.5px] px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/40 capitalize"
            />
          ))}
        </div>

        <label className="block text-[12px] font-bold text-slate-500 mb-1">Copyright text</label>
        <input
          value={draft.footer.copyright}
          onChange={(e) => setFooter({ copyright: e.target.value })}
          className="w-full text-[12.5px] px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
        />
      </section>
    </div>
  );
};

export default Homepage;
