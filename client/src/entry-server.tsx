// Build-time render entry. scripts/prerender.mjs imports the SSR bundle of this
// file and writes one static HTML file per route. Not shipped to the browser.
import { prerender } from "react-dom/static";
import App from "./App";

export { getPageMeta, prerenderPaths, renderHeadTags } from "./seo";

export async function render(url: string): Promise<string> {
  // prerender() waits for lazy routes / Suspense to resolve, so the full page
  // content ends up in the HTML rather than the loading fallback.
  const { prelude } = await prerender(<App ssrPath={url} />);
  return new Response(prelude).text();
}
