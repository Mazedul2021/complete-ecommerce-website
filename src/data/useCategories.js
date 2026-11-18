import { useEffect, useState } from "react";
import { categories, loadCategories, subscribeCategories } from "./categories";

// Returns the category list for this render and subscribes the component to
// replacements (initial API load and admin edits).
export const useCategories = () => {
  const [list, setList] = useState(() => [...categories]);

  useEffect(() => {
    const sync = () => setList([...categories]);
    const unsubscribe = subscribeCategories(sync);
    loadCategories().then(sync);
    return unsubscribe;
  }, []);

  return list;
};
