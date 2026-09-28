import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root")!;

// Production pages are prerendered at build time (scripts/prerender.mjs), so
// hydrate the existing markup. The dev server serves an empty root.
if (root.firstElementChild) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
