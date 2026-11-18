import React, { createContext, useContext, useCallback, useEffect, useMemo, useState } from "react";
import {
  getCatalogVersion,
  getProductById,
  loadCatalog,
  subscribeCatalog,
} from "../data/products";

const StoreContext = createContext(null);

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

// Cart, wishlist and recently-viewed are persisted as ids only. The product
// documents themselves always come from the live catalog (MongoDB via the
// store API), so admin edits and newly created products are reflected after a
// reload instead of being resolved from the bundled seed.
const readCart = () =>
  load("ows_cart", [])
    .map((line) => ({
      id: Number(line?.id ?? line?.product?.id),
      qty: Math.floor(Number(line?.qty) || 0),
    }))
    .filter((line) => Number.isFinite(line.id) && line.id > 0 && line.qty > 0);

const readIds = (key) =>
  load(key, [])
    .map((entry) => Number(entry))
    .filter((id) => Number.isFinite(id) && id > 0);

const resolve = (ids) => ids.map((id) => getProductById(id)).filter(Boolean);

export const StoreProvider = ({ children }) => {
  const [cartLines, setCartLines] = useState(readCart);
  const [wishlistIds, setWishlistIds] = useState(() => readIds("ows_wishlist"));
  const [recentIds, setRecentIds] = useState(() => readIds("ows_recent"));
  const [catalogVersion, setCatalogVersion] = useState(getCatalogVersion);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(() => load("ows_coupon", null));

  // Re-resolve saved items whenever the catalog is replaced (first API load,
  // or a product edit made in the admin console).
  useEffect(() => {
    const sync = () => setCatalogVersion(getCatalogVersion());
    const unsubscribe = subscribeCatalog(sync);
    loadCatalog().then(sync);
    return unsubscribe;
  }, []);

  useEffect(() => {
    localStorage.setItem("ows_cart", JSON.stringify(cartLines));
  }, [cartLines]);

  useEffect(() => {
    localStorage.setItem("ows_wishlist", JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem("ows_recent", JSON.stringify(recentIds));
  }, [recentIds]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem("ows_coupon", JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem("ows_coupon");
    }
  }, [appliedCoupon]);

  const cart = useMemo(
    () =>
      cartLines
        .map((line) => {
          const product = getProductById(line.id);
          return product ? { product, qty: line.qty } : null;
        })
        .filter(Boolean),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartLines, catalogVersion]
  );

  const wishlist = useMemo(
    () => resolve(wishlistIds),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wishlistIds, catalogVersion]
  );

  const recentlyViewed = useMemo(
    () => resolve(recentIds),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [recentIds, catalogVersion]
  );

  const showToast = useCallback(({ type = "success", title, message, product, duration = 3500 }) => {
    setToast({
      id: Date.now(),
      type,
      title,
      message,
      product,
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  const addToCart = useCallback((product, qty = 1, options = { openDrawer: false }) => {
    setCartLines((prev) => {
      const existing = prev.find((line) => line.id === product.id);
      if (existing) {
        return prev.map((line) =>
          line.id === product.id ? { ...line, qty: line.qty + qty } : line
        );
      }
      return [...prev, { id: product.id, qty }];
    });

    showToast({
      type: "cart",
      title: "Added to Cart!",
      message: `${product.name} (${qty}x)`,
      product,
    });

    if (options.openDrawer) {
      setCartDrawerOpen(true);
    }
  }, [showToast]);

  const updateCartQty = useCallback((id, qty) => {
    setCartLines((prev) =>
      qty <= 0
        ? prev.filter((line) => line.id !== id)
        : prev.map((line) => (line.id === id ? { ...line, qty } : line))
    );
  }, []);

  const removeFromCart = useCallback((id) => {
    const item = cart.find((line) => line.product.id === id);
    setCartLines((prev) => prev.filter((line) => line.id !== id));
    if (item) {
      showToast({
        type: "info",
        title: "Removed from Cart",
        message: item.product.name,
      });
    }
  }, [cart, showToast]);

  const clearCart = useCallback(() => {
    setCartLines([]);
    showToast({
      type: "info",
      title: "Cart Cleared",
      message: "All items have been removed from your cart.",
    });
  }, [showToast]);

  const toggleWishlist = useCallback((product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast({
          type: "info",
          title: "Removed from Wishlist",
          message: product.name,
        });
        return prev.filter((id) => id !== product.id);
      }
      showToast({
        type: "wishlist",
        title: "Added to Wishlist!",
        message: product.name,
        product,
      });
      return [...prev, product.id];
    });
  }, [showToast]);

  const isInWishlist = useCallback(
    (id) => wishlistIds.includes(Number(id)),
    [wishlistIds]
  );

  const openQuickView = useCallback((product) => {
    setQuickViewProduct(product);
  }, []);

  const closeQuickView = useCallback(() => {
    setQuickViewProduct(null);
  }, []);

  const applyCoupon = useCallback(async (code) => {
    const clean = code.trim().toUpperCase();
    if (!clean) return { success: false, message: "Enter a coupon code." };
    try {
      const { api } = await import("../api/client");
      const coupon = await api.coupons.validate(clean);
      const couponData = {
        code: coupon.code,
        discountPercent: coupon.percent,
        label: `${coupon.percent}% Discount`,
      };
      setAppliedCoupon(couponData);
      showToast({
        type: "success",
        title: "Coupon Applied!",
        message: `Code ${coupon.code} gives ${coupon.percent}% off your order.`,
      });
      return { success: true };
    } catch {
      return { success: false, message: "Invalid or expired coupon code." };
    }
  }, [showToast]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    showToast({
      type: "info",
      title: "Coupon Removed",
      message: "Promo code has been removed.",
    });
  }, [showToast]);

  const recordViewedProduct = useCallback((product) => {
    if (!product) return;
    setRecentIds((prev) => [product.id, ...prev.filter((id) => id !== product.id)].slice(0, 8));
  }, []);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartSubtotal = cart.reduce(
    (sum, i) => sum + i.qty * i.product.price,
    0
  );
  const couponDiscount = appliedCoupon
    ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100)
    : 0;
  const cartTotal = Math.max(0, cartSubtotal - couponDiscount);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
      cartCount,
      cartSubtotal,
      cartTotal,
      couponDiscount,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      wishlist,
      toggleWishlist,
      isInWishlist,
      cartDrawerOpen,
      setCartDrawerOpen,
      mobileNavOpen,
      setMobileNavOpen,
      quickViewProduct,
      openQuickView,
      closeQuickView,
      toast,
      showToast,
      hideToast,
      recentlyViewed,
      recordViewedProduct,
    }),
    [
      cart,
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
      cartCount,
      cartSubtotal,
      cartTotal,
      couponDiscount,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      wishlist,
      toggleWishlist,
      isInWishlist,
      cartDrawerOpen,
      mobileNavOpen,
      quickViewProduct,
      openQuickView,
      closeQuickView,
      toast,
      showToast,
      hideToast,
      recentlyViewed,
      recordViewedProduct,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
