import { API_BASE } from "../api/base";

// Category photos live in /public/categories so the same stable paths can be
// stored in the database and served to every client.
export const categoryImages = [
  "/categories/1.png",
  "/categories/2.png",
  "/categories/3.png",
  "/categories/4.png",
  "/categories/5.png",
  "/categories/6.png",
  "/categories/7.png",
  "/categories/8.png",
];

const slugify = (value) =>
  String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const slugifyCategory = slugify;

// Bundled seed so the storefront renders instantly; the API copy replaces it
// in place once GET /api/categories responds.
export const categories = [
  {
    id: 1,
    name: "Men's Watches",
    slug: "mens-watches",
    image: categoryImages[0],
    position: 0,
    subCategories: [
      { name: "Chronograph", slug: "chronograph", children: ["Diver", "Pilot", "Racing"] },
      { name: "Analog Classic", slug: "analog-classic", children: ["Leather Strap", "Steel Bracelet", "Mesh Strap"] },
      { name: "Skeleton", slug: "skeleton", children: ["Automatic", "Tourbillon Design"] },
    ],
  },
  {
    id: 2,
    name: "Women's Watches",
    slug: "womens-watches",
    image: categoryImages[1],
    position: 1,
    subCategories: [
      { name: "Bracelet Watches", slug: "bracelet-watches", children: ["Rose Gold", "Silver Tone", "Two Tone"] },
      { name: "Dress Watches", slug: "dress-watches", children: ["Diamond Set", "Slim Classic", "Mother of Pearl"] },
      { name: "Casual", slug: "casual-women", children: ["Leather Strap", "Mesh Strap"] },
    ],
  },
  {
    id: 3,
    name: "Couple Watches",
    slug: "couple-watches",
    image: categoryImages[2],
    position: 2,
    subCategories: [
      { name: "Couple Sets", slug: "couple-sets", children: ["His & Hers", "Gift Box Set"] },
      { name: "Anniversary Editions", slug: "anniversary", children: ["Gold Edition", "Black Edition"] },
    ],
  },
  {
    id: 4,
    name: "Smart Watches",
    slug: "smart-watches",
    image: categoryImages[3],
    position: 3,
    subCategories: [
      { name: "Fitness Bands", slug: "fitness-bands", children: ["Heart Rate", "Sleep Tracking"] },
      { name: "Smart Watches", slug: "smart-watches-pro", children: ["Calling Watch", "AMOLED Display", "Kids GPS"] },
    ],
  },
  {
    id: 5,
    name: "Luxury Watches",
    slug: "luxury-watches",
    image: categoryImages[4],
    position: 4,
    subCategories: [
      { name: "Automatic", slug: "automatic", children: ["Skeleton", "Moon Phase", "GMT"] },
      { name: "Premium Quartz", slug: "premium-quartz", children: ["Gold Plated", "Ceramic"] },
    ],
  },
  {
    id: 6,
    name: "Digital Watches",
    slug: "digital-watches",
    image: categoryImages[5],
    position: 5,
    subCategories: [
      { name: "Sport Digital", slug: "sport-digital", children: ["Waterproof", "Dual Time", "LED"] },
      { name: "Retro Digital", slug: "retro-digital", children: ["Calculator", "Classic 80s"] },
    ],
  },
  {
    id: 7,
    name: "Kids' Watches",
    slug: "kids-watches",
    image: categoryImages[6],
    position: 6,
    subCategories: [
      { name: "Character Watches", slug: "character-watches", children: ["Cartoon Dial", "3D Strap"] },
      { name: "Kids Digital", slug: "kids-digital", children: ["Waterproof", "Light Up"] },
    ],
  },
  {
    id: 8,
    name: "Accessories",
    slug: "accessories",
    image: categoryImages[7],
    position: 7,
    subCategories: [
      { name: "Straps", slug: "straps", children: ["Leather", "Silicone", "Steel", "Mesh"] },
      { name: "Gift Sets", slug: "gift-sets", children: ["Watch Box", "Travel Case"] },
    ],
  },
];

/* ------------------------------------------------------------------ */
// Shared category list — replaced in place after GET /api/categories.
const listeners = new Set();

export const subscribeCategories = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

// Replaces the shared array in place so every importer sees the new list.
export const replaceCategories = (next) => {
  categories.splice(0, categories.length, ...next);
  listeners.forEach((listener) => listener());
};

let pendingLoad = null;

// Fetches categories from the backend once per page load. On failure the
// bundled seed stays in place, so the storefront still renders offline.
export const loadCategories = () => {
  if (!pendingLoad) {
    pendingLoad = fetch(`${API_BASE}/categories`)
      .then((response) => {
        if (!response.ok) throw new Error(`API responded ${response.status}`);
        return response.json();
      })
      .then((list) => {
        if (Array.isArray(list) && list.length > 0) replaceCategories(list);
        return categories;
      })
      .catch((error) => {
        console.warn(
          "[categories] API unavailable, using bundled categories:",
          error.message
        );
        return categories;
      });
  }
  return pendingLoad;
};

export const getCategoryBySlug = (slug) =>
  categories.find((c) => c.slug === slug);

export const getCategoryName = (slug) => getCategoryBySlug(slug)?.name ?? slug;
