import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
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

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { product, qty }];
    });
    setCartDrawerOpen(true);
  };

  const updateCartQty = (id, qty) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => i.product.id !== id)
        : prev.map((i) => (i.product.id === id ? { ...i, qty } : i))
    );
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.product.id !== id));

  const clearCart = () => setCart([]);

  const toggleWishlist = (product) =>
    setWishlist((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );

  const isInWishlist = (id) => wishlist.some((p) => p.id === id);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce(
    (sum, i) => sum + i.qty * i.product.price,
    0
  );

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
      cartCount,
      cartTotal,
      wishlist,
      toggleWishlist,
      isInWishlist,
      cartDrawerOpen,
      setCartDrawerOpen,
      mobileNavOpen,
      setMobileNavOpen,
    }),
    [cart, wishlist, cartDrawerOpen, mobileNavOpen]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
