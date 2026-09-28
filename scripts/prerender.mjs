// Build step 3 of 3 (see package.json "build"):
//   1. vite build                → client bundle + dist/public/index.html template
//   2. vite build --ssr ...      → dist/server/entry-server.js
//   3. node scripts/prerender.mjs → one static HTML file per route + sitemap.xml
//
// Each route is written as <path>.html (e.g. dist/public/services.html) and
// served at the clean URL by Vercel's `cleanUrls`. Unknown URLs get 404.html.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "dist/public");
const serverEntry = path.join(root, "dist/server/entry-server.js");

const { render, getPageMeta, prerenderPaths, renderHeadTags } = await import(
  pathToFileURL(serverEntry).href
);

const template = await fs.readFile(path.join(publicDir, "index.html"), "utf8");
if (!template.includes("<!--app-head-->") || !template.includes("<!--app-html-->")) {
  throw new Error("dist/public/index.html is missing the <!--app-head--> / <!--app-html--> placeholders");
}

function fileFor(route) {
  return route === "/" ? "index.html" : `${route.slice(1)}.html`;
}

async function writePage(route, outFile) {
  const html = await render(route);
  const page = template
    .replace("<!--app-head-->", renderHeadTags(getPageMeta(route)))
    .replace("<!--app-html-->", html);
  const dest = path.join(publicDir, outFile);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, page);
  console.log(`  prerendered ${route.padEnd(40)} → ${outFile} (${(page.length / 1024).toFixed(1)} kB)`);
}

const routes = prerenderPaths();
for (const route of routes) {
  await writePage(route, fileFor(route));
}
await writePage("/__not-found__", "404.html");

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => `  <url>\n    <loc>https://www.darkbloomdigital.com${route}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join("\n")}
</urlset>
`;
await fs.writeFile(path.join(publicDir, "sitemap.xml"), sitemap);
console.log(`  wrote sitemap.xml (${routes.length} URLs)`);
