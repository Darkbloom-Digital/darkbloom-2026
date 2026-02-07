# Darkbloom Digital - Agency Website

## Overview

This is the website for **Darkbloom Digital**, a web development agency specializing in custom websites and Shopify stores. The application is a full-stack TypeScript project with a React frontend and Express backend. It serves as a marketing/portfolio site with sections for services, team, portfolio work, client reviews, and a contact form that stores inquiries in a PostgreSQL database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router) with routes for Home (`/`), Portfolio (`/portfolio`), Services (`/services`), Contact (`/contact`), Case Studies (`/case-studies`), Performance Audit (`/performance-audit`), CRO Blueprint (`/cro-blueprint`), and a 404 page
- **Styling**: Tailwind CSS v4 with CSS variables for theming, dark mode by default (brand colors: dark backgrounds with `#e61e50` red accent)
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives — extensive component library in `client/src/components/ui/`
- **State Management**: TanStack React Query for server state
- **Forms**: React Hook Form with Zod validation via `@hookform/resolvers`
- **Animations**: Framer Motion for scroll animations and transitions
- **Fonts**: Outfit (headings) and Inter (body) via Google Fonts
- **Notifications**: Sonner toast library
- **Build Tool**: Vite with path aliases (`@/` → `client/src/`, `@shared/` → `shared/`, `@assets/` → `attached_assets/`)

### Backend
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript, run with `tsx` in development
- **API**: RESTful endpoints under `/api/` prefix
  - `POST /api/contact` — creates a contact inquiry (validated with Zod)
  - `GET /api/contact` — retrieves all contact inquiries
- **Development**: Vite dev server integrated as Express middleware with HMR
- **Production**: Client built with Vite, server bundled with esbuild into `dist/index.cjs`, static files served from `dist/public/`

### Database
- **Database**: PostgreSQL (required, connection via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-validation integration
- **Schema** (in `shared/schema.ts`):
  - `users` table: `id` (UUID, auto-generated), `username` (unique text), `password` (text)
  - `contact_inquiries` table: `id` (serial), `name`, `email`, `project_type`, `website_url` (optional), `details`, `created_at` (timestamp)
- **Migrations**: Drizzle Kit with `drizzle-kit push` command (`npm run db:push`)
- **Storage Layer**: `server/storage.ts` implements `IStorage` interface with `DatabaseStorage` class using Drizzle queries

### Project Structure
```
client/                  # Frontend React app
  src/
    components/
      layout/            # Navbar, Footer
      sections/          # Hero, Services, Team, Work, Reviews, Contact
      ui/                # shadcn/ui components
    hooks/               # Custom React hooks
    lib/                 # Utilities (queryClient, cn helper)
    pages/               # Page components (Home, Portfolio, Services, Contact, CaseStudies, PerformanceAudit, CroBlueprint, NotFound)
server/                  # Express backend
  index.ts               # Server entry point
  routes.ts              # API route registration
  storage.ts             # Database access layer
  static.ts              # Production static file serving
  vite.ts                # Dev server Vite integration
shared/                  # Shared between client and server
  schema.ts              # Drizzle schema + Zod validation schemas
db/                      # Database connection setup
  index.ts               # Drizzle + pg Pool initialization
```

### Key Scripts
- `npm run dev` — starts development server (Express + Vite HMR) on port 5000
- `npm run build` — builds client (Vite) and server (esbuild) to `dist/`
- `npm start` — runs production build
- `npm run db:push` — pushes schema changes to database

## External Dependencies

### Required Services
- **PostgreSQL Database**: Required for all functionality. Connection string must be provided via `DATABASE_URL` environment variable. Used for storing contact form inquiries and user data.

### Key NPM Packages
- **drizzle-orm** + **drizzle-kit**: Database ORM and migration tooling
- **pg**: PostgreSQL client driver
- **express**: HTTP server framework (v5)
- **@tanstack/react-query**: Async state management
- **framer-motion**: Animation library
- **react-hook-form** + **zod**: Form handling and validation
- **sonner**: Toast notifications
- **wouter**: Client-side routing
- **shadcn/ui ecosystem**: Radix UI primitives, class-variance-authority, tailwind-merge, clsx

### Replit-Specific Integrations
- `@replit/vite-plugin-runtime-error-modal`: Error overlay in development
- `@replit/vite-plugin-cartographer`: Dev tooling (development only)
- `@replit/vite-plugin-dev-banner`: Dev banner (development only)
- Custom `vite-plugin-meta-images`: Updates OpenGraph meta tags with Replit deployment URLs