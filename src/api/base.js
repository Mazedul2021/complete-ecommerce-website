// API base URL — VITE_API_URL in production (e.g. Render), /api via the Vite
// dev proxy locally.
export const API_BASE = (
  import.meta.env.VITE_API_URL || "/api"
).replace(/\/+$/, "");
