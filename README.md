# Darkbloom Digital

Marketing site for Darkbloom Digital — a static **Vite + React** single-page app
with a single **Vercel serverless function** that handles the contact form and
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
client/               Vite + React SPA (root of the Vite build)
shared/schema.ts      Shared zod validation for the contact payload
attached_assets/      Source assets; only attached_assets/optimized/* is imported
vercel.json           Build command, output dir, and SPA rewrite
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
npm run build    # outputs the static SPA to dist/public
npm run preview  # preview the production build locally
npm run check    # TypeScript type-check (tsc, no emit)
```

## Deploying to Vercel

1. Import the repository into Vercel.
2. Vercel picks up [`vercel.json`](vercel.json): build command `vite build`,
   output directory `dist/public`, and a SPA rewrite so all non-`/api` routes
   serve `index.html` (client-side routing) while `/api/*` hits the function.
3. Add the two environment variables above under **Project Settings →
   Environment Variables**.
4. Deploy.

The contact API requires `RESEND_API_KEY` and `RESEND_FROM_EMAIL`; without them
the function returns `500` and no email is sent.
