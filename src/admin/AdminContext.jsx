import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AdminContext } from "./context";
import { api } from "../api/client";
import { replaceProducts } from "../data/products";
import { replaceCategories } from "../data/categories";
import {
  DEFAULT_SETTINGS,
  deriveCustomers,
  getCatalogSnapshot,
} from "./data/adminData";
import { categories as seedCategories } from "../data/categories";

export const AdminProvider = ({ children }) => {
  const [catalog, setCatalog] = useState(getCatalogSnapshot);
  const [categories, setCategories] = useState(() => [...seedCategories]);
  const [orders, setOrders] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(null);

  const notify = useCallback((message, type = "success") => {
    setNotice({ id: Date.now(), message, type });
  }, []);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = setTimeout(() => setNotice(null), 3200);
    return () => clearTimeout(timer);
  }, [notice]);

  const applyCatalog = useCallback((list) => {
    replaceProducts(list);
    setCatalog(list);
  }, []);

  const applyCategories = useCallback((list) => {
    replaceCategories(list);
    setCategories(list);
  }, []);

  const refresh = useCallback(async () => {
    const [productList, orderList, storeSettings, categoryList] =
      await Promise.all([
        api.products.list(),
        api.orders.list(),
        api.settings.get(),
        api.categories.list(),
      ]);
    applyCatalog(productList);
    applyCategories(categoryList);
    setOrders(orderList);
    setSettings(storeSettings);
    setStatus("ready");
    setError("");
    return {
      products: productList,
      orders: orderList,
      settings: storeSettings,
      categories: categoryList,
    };
  }, [applyCatalog, applyCategories]);

  useEffect(() => {
    let cancelled = false;
    refresh().catch((cause) => {
      if (cancelled) return;
      setStatus("error");
      setError(cause.message);
    });
    return () => {
      cancelled = true;
    };
  }, [refresh]);

  const saveProduct = useCallback(
    async (product) => {
      try {
        const saved = product.id
          ? await api.products.update(product.id, product)
          : await api.products.create(product);
        applyCatalog(await api.products.list());
        notify(product.id ? "Product updated" : "Product added to storefront");
        return saved;
      } catch (cause) {
        notify(cause.message, "error");
        return null;
      }
    },
    [applyCatalog, notify]
  );

  const deleteProduct = useCallback(
    async (id) => {
      try {
        await api.products.remove(id);
        applyCatalog(await api.products.list());
        notify("Product removed", "info");
        return true;
      } catch (cause) {
        notify(cause.message, "error");
        return false;
      }
    },
    [applyCatalog, notify]
  );

  const saveCategory = useCallback(
    async (category) => {
      try {
        const saved = category.id
          ? await api.categories.update(category.id, category)
          : await api.categories.create(category);
        applyCategories(await api.categories.list());
        notify(category.id ? "Category updated" : "Category added to storefront");
        return saved;
      } catch (cause) {
        notify(cause.message, "error");
        return null;
      }
    },
    [applyCategories, notify]
  );

  const deleteCategory = useCallback(
    async (id) => {
      try {
        await api.categories.remove(id);
        applyCategories(await api.categories.list());
        notify("Category removed", "info");
        return true;
      } catch (cause) {
        notify(cause.message, "error");
        return false;
      }
    },
    [applyCategories, notify]
  );

  const updateOrderStatus = useCallback(
    async (id, nextStatus) => {
      try {
        const saved = await api.orders.setStatus(id, nextStatus);
        setOrders((prev) =>
          prev.map((order) => (order.id === id ? saved : order))
        );
        notify(`Order ${id} marked as ${nextStatus}`);
        return true;
      } catch (cause) {
        notify(cause.message, "error");
        return false;
      }
    },
    [notify]
  );

  const updateSettings = useCallback(
    async (patch) => {
      try {
        const saved = await api.settings.save(patch);
        setSettings(saved);
        notify("Settings saved");
        return true;
      } catch (cause) {
        notify(cause.message, "error");
        return false;
      }
    },
    [notify]
  );

  const resetDemoData = useCallback(async () => {
    try {
      await api.reset();
      window.location.reload();
    } catch (cause) {
      notify(cause.message, "error");
    }
  }, [notify]);

  const customers = useMemo(() => deriveCustomers(orders), [orders]);

  const pendingOrders = useMemo(
    () => orders.filter((order) => order.status === "pending").length,
    [orders]
  );

  const lowStock = useMemo(
    () =>
      catalog.filter((product) => product.stock <= settings.lowStockThreshold),
    [catalog, settings.lowStockThreshold]
  );

  const value = useMemo(
    () => ({
      catalog,
      categories,
      orders,
      settings,
      customers,
      notice,
      notify,
      pendingOrders,
      lowStock,
      status,
      error,
      refresh,
      saveProduct,
      deleteProduct,
      saveCategory,
      deleteCategory,
      updateOrderStatus,
      updateSettings,
      resetDemoData,
    }),
    [
      catalog,
      categories,
      orders,
      settings,
      customers,
      notice,
      notify,
      pendingOrders,
      lowStock,
      status,
      error,
      refresh,
      saveProduct,
      deleteProduct,
      saveCategory,
      deleteCategory,
      updateOrderStatus,
      updateSettings,
      resetDemoData,
    ]
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
