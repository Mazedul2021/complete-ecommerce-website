import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { getProductById } from "../data/products";

const StoreContext = createContext(null);

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState(() =>
    load("ows_cart", []).map((item) => ({
      product: getProductById(item.id) ?? item.product,
      qty: item.qty,
    }))
  );
  const [wishlist, setWishlist] = useState(() =>
    load("ows_wishlist", []).map((id) => getProductById(id)).filter(Boolean)
  );
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(() => load("ows_coupon", null));
  const [recentlyViewed, setRecentlyViewed] = useState(() =>
    load("ows_recent", []).map((id) => getProductById(id)).filter(Boolean)
  );

  useEffect(() => {
    localStorage.setItem(
      "ows_cart",
      JSON.stringify(cart.map((i) => ({ id: i.product.id, qty: i.qty })))
    );
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(
      "ows_wishlist",
      JSON.stringify(wishlist.map((p) => p.id))
    );
  }, [wishlist]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem("ows_coupon", JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem("ows_coupon");
    }
  }, [appliedCoupon]);

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
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { product, qty }];
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
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => i.product.id !== id)
        : prev.map((i) => (i.product.id === id ? { ...i, qty } : i))
    );
  }, []);

  const removeFromCart = useCallback((id) => {
    const item = cart.find((i) => i.product.id === id);
    setCart((prev) => prev.filter((i) => i.product.id !== id));
    if (item) {
      showToast({
        type: "info",
        title: "Removed from Cart",
        message: item.product.name,
      });
    }
  }, [cart, showToast]);

  const clearCart = useCallback(() => {
    setCart([]);
    showToast({
      type: "info",
      title: "Cart Cleared",
      message: "All items have been removed from your cart.",
    });
  }, [showToast]);

  const toggleWishlist = useCallback((product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast({
          type: "info",
          title: "Removed from Wishlist",
          message: product.name,
        });
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast({
          type: "wishlist",
          title: "Added to Wishlist!",
          message: product.name,
          product,
        });
        return [...prev, product];
      }
    });
  }, [showToast]);

  const isInWishlist = useCallback(
    (id) => wishlist.some((p) => p.id === id),
    [wishlist]
  );

  const openQuickView = useCallback((product) => {
    setQuickViewProduct(product);
  }, []);

  const closeQuickView = useCallback(() => {
    setQuickViewProduct(null);
  }, []);

  const applyCoupon = useCallback((code) => {
    const clean = code.trim().toUpperCase();
    if (clean === "OLEVS10") {
      const couponData = { code: "OLEVS10", discountPercent: 10, label: "10% VIP Discount" };
      setAppliedCoupon(couponData);
      showToast({
        type: "success",
        title: "Coupon Applied!",
        message: "You get 10% off your entire order.",
      });
      return { success: true };
    }
    if (clean === "LUXURY20") {
      const couponData = { code: "LUXURY20", discountPercent: 20, label: "20% Exclusive Promo" };
      setAppliedCoupon(couponData);
      showToast({
        type: "success",
        title: "20% Discount Applied!",
        message: "Luxury VIP coupon activated.",
      });
      return { success: true };
    }
    return { success: false, message: "Invalid code. Try OLEVS10 or LUXURY20" };
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
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      const next = [product, ...filtered].slice(0, 8);
      localStorage.setItem("ows_recent", JSON.stringify(next.map((p) => p.id)));
      return next;
    });
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
