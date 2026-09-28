# Darkbloom Digital

Marketing site for Darkbloom Digital — a **Vite + React** app, prerendered to
static HTML at build time, with a single **Vercel serverless function** that handles the contact form and
sends an email via [Resend](https://resend.com).

## Tech stack

- **Frontend:** Vite, React 19, TypeScript, Tailwind CSS v4, wouter (routing),
  framer-motion, Radix UI.
- **Backend:** one serverless function at [`api/contact.ts`](api/contact.ts)
  (Vercel `api/` convention). No database, no server to run.
- **Email:** Resend, configured entirely through environment variables.

## Project structure

```
api/contact.ts        Vercel serverless function for the contact form
client/               Vite + React app (root of the Vite build)
client/src/seo.ts     Per-page titles/descriptions, JSON-LD, sitemap routes
client/src/data/      Portfolio projects / case study content
scripts/prerender.mjs Build step that writes one HTML file per route
shared/schema.ts      Shared zod validation for the contact payload
attached_assets/      Source assets; only attached_assets/optimized/* is imported
vercel.json           Build command, output dir, clean URLs, redirects
vite.config.ts        Vite config (build output -> dist/public)
```

## Local development

```bash
npm install
npm run dev      # Vite dev server (frontend only)
```

The contact form POSTs to `/api/contact`. The Vite dev server does **not** run
serverless functions, so to exercise the form end-to-end locally use the Vercel
CLI, which serves both the static site and the function:

```bash
npm i -g vercel
vercel dev
```

Create a `.env` (see [`.env.example`](.env.example)) with a real Resend key to
send actual emails locally.

## Environment variables

Set these locally in `.env` and in the Vercel project settings:

| Variable            | Description                                                              |
| ------------------- | ------------------------------------------------------------------------ |
| `RESEND_API_KEY`    | API key from <https://resend.com/api-keys>.                              |
| `RESEND_FROM_EMAIL` | Verified sender, e.g. `Darkbloom Digital <hello@darkbloomdigital.com>`. |

Contact submissions are emailed to `robdavis@darkbloomdigital.com`.

## Build

```bash
npm run build    # client build + SSR build + prerender → dist/public
npm run preview  # serve dist/public like Vercel does (clean URLs, 404.html)
npm run check    # TypeScript type-check (tsc, no emit)
```

`npm run build` runs three steps:

1. `vite build`: the client bundle and the `index.html` template.
2. `vite build --ssr src/entry-server.tsx`: a Node render bundle in `dist/server` (not deployed).
3. `node scripts/prerender.mjs`: renders every route to its own HTML file
   (`services.html`, `portfolio/ca-tech-usa.html`, …) with that page's title,
   description, canonical, OG tags and JSON-LD, plus `404.html` and `sitemap.xml`.

The browser then hydrates the prerendered HTML. To add a page, add its route in
`App.tsx` and its metadata in `seo.ts`; it's prerendered and added to the
sitemap automatically.

Content still needed from Robbie is marked `[[ROBBIE: ...]]` and shows as an
amber box on the page. Search the code for `[[ROBBIE:` before deploying.

## Deploying to Vercel

1. Import the repository into Vercel.
2. Vercel picks up [`vercel.json`](vercel.json): build command `npm run build`,
   output directory `dist/public`, and `cleanUrls` so `/services` serves
   `services.html`. Unknown paths get `404.html`; `/api/*` hits the function.
3. Add the two environment variables above under **Project Settings →
   Environment Variables**.
4. Deploy.

The contact API requires `RESEND_API_KEY` and `RESEND_FROM_EMAIL`; without them
the function returns `500` and no email is sent.
