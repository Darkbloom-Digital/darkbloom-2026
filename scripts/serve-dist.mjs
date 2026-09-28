// Local preview of the production build that mimics Vercel's static serving:
// clean URLs (/services → services.html) and 404.html for unknown paths.
// `vite preview` can't be used because it serves index.html for every route.
// (The /api/contact function isn't served here; use `vercel dev` for that.)
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist/public");
const port = Number(process.env.PORT) || 4173;
const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon",
  ".svg": "image/svg+xml", ".xml": "application/xml", ".txt": "text/plain", ".json": "application/json",
  ".mp4": "video/mp4", ".woff2": "font/woff2",
};

async function tryFile(file) {
  try {
    const stat = await fs.stat(file);
    return stat.isFile() ? file : null;
  } catch {
    return null;
  }
}

http
  .createServer(async (req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const rel = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+|\/+$/g, "");
    const target = path.join(dir, rel);
    if (!target.startsWith(dir)) return res.writeHead(400).end();
    const file = (await tryFile(target)) || (await tryFile(`${target}.html`));
    const status = file ? 200 : 404;
    const served = file || path.join(dir, "404.html");
    res.writeHead(status, { "Content-Type": types[path.extname(served)] || "application/octet-stream" });
    res.end(await fs.readFile(served));
  })
  .listen(port, () => console.log(`Serving dist/public at http://localhost:${port}`));
