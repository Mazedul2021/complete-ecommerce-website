import { useEffect, useState } from "react";
import { loadCatalog, products, subscribeCatalog } from "./products";

// Returns the catalog for this render and subscribes the component to catalog
// replacements (initial API load and admin edits).
export const useCatalog = () => {
  const [catalog, setCatalog] = useState(() => [...products]);

  useEffect(() => {
    const sync = () => setCatalog([...products]);
    const unsubscribe = subscribeCatalog(sync);
    loadCatalog().then(sync);
    return unsubscribe;
  }, []);

  return catalog;
};
