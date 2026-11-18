// Shared storefront settings — replaced in place after GET /api/settings.
export const settings = {
  storeName: "OLEVS Watch Shop",
  logo: "",
  heroSlides: [],
  promoBanners: [],
  flashDeals: { enabled: true, title: "" },
  homePicks: { popular: [], latest: [], featured: [] },
  navLinks: [
    { label: "About", link: "/about", badge: "" },
    { label: "Contact", link: "/contact", badge: "" },
    { label: "Hot Sale", link: "/shop?sort=discount", badge: "50%" },
  ],
  footer: {},
  supportEmail: "contact@olevswatchshop.com",
  supportPhone: "(+880) 1799018864",
  address: "Sha-38/1, Middle Badda, Gulshan Link Road, Dhaka-1212",
};

const listeners = new Set();

export const subscribeSettings = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const replaceSettings = (next = {}) => {
  Object.assign(settings, next);
  listeners.forEach((listener) => listener());
};

let pendingLoad = null;

export const loadSettings = () => {
  if (!pendingLoad) {
    pendingLoad = fetch("/api/settings")
      .then((response) => {
        if (!response.ok) throw new Error(`API responded ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (data && typeof data === "object") replaceSettings(data);
        return settings;
      })
      .catch((error) => {
        console.warn("[settings] API unavailable, using defaults:", error.message);
        return settings;
      });
  }
  return pendingLoad;
};
