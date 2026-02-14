import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  const noCacheFiles = [".html", "robots.txt", "sitemap.xml"];
  app.use(express.static(distPath, {
    maxAge: "1y",
    immutable: true,
    setHeaders: (res, filePath) => {
      if (noCacheFiles.some(ext => filePath.endsWith(ext))) {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      } else if (filePath.endsWith(".png") || filePath.endsWith(".jpg") || filePath.endsWith(".ico")) {
        res.setHeader("Cache-Control", "public, max-age=86400");
      }
    },
  }));

  app.use("/{*path}", (_req, res) => {
    res.setHeader("Cache-Control", "no-cache");
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
