import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  css: {
    // Tailwind v4 is handled by the @tailwindcss/vite plugin above; keep the
    // PostCSS plugin list empty so the legacy postcss.config.js is not applied.
    postcss: {
      plugins: [],
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  // The SSR build (entry-server.tsx) is only used at build time by
  // scripts/prerender.mjs, so it goes outside the deployed dist/public.
  build: isSsrBuild
    ? {
        outDir: path.resolve(import.meta.dirname, "dist/server"),
        emptyOutDir: true,
      }
    : {
        outDir: path.resolve(import.meta.dirname, "dist/public"),
        emptyOutDir: true,
      },
}));
