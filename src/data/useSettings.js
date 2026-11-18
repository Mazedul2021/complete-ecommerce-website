import { useEffect, useState } from "react";
import { settings, loadSettings, subscribeSettings } from "./settings";

export const useSettings = () => {
  const [, setTick] = useState(0);

  useEffect(() => {
    const sync = () => setTick((tick) => tick + 1);
    const unsubscribe = subscribeSettings(sync);
    loadSettings().then(sync);
    return unsubscribe;
  }, []);

  return settings;
};
