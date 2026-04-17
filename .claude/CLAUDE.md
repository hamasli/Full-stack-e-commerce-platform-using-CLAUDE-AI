# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build
npm run lint      # Run ESLint

npx prisma migrate dev --name <name>   # Create and apply a migration
npx prisma generate                    # Regenerate Prisma client after schema changes
npx prisma studio                      # Open Prisma visual DB explorer
```

## Important: Next.js 16 & Prisma 7 Breaking Changes

**Next.js 16** — This is NOT the Next.js from training data. Before writing any route or component code, read the relevant guide in `node_modules/next/dist/docs/`.

**Prisma 7** — Database connection URL is configured in `prisma.config.ts`, NOT in `schema.prisma`. The `datasource db` block in `schema.prisma` must NOT contain a `url` field. All connection config lives in `prisma.config.ts`.

## Architecture

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Prisma 7 (SQLite) · Stripe

**App Router layout** (`src/app/`):
- `layout.tsx` — root layout with Geist fonts
- `page.tsx` — home/storefront
- API routes go in `src/app/api/` (e.g. `src/app/api/checkout/route.ts`)

**Database** (`prisma/schema.prisma`):
- `Product` — catalog items with price, stock, category
- `Order` — linked to a Stripe session, tracks status (`pending` → `paid` → `fulfilled`)
- `OrderItem` — join table between Order and Product

**Prisma client singleton** is at `src/lib/prisma.ts` — always import from there, never instantiate `PrismaClient` directly in route handlers.

**Stripe flow:** Create a Checkout Session via a server-side API route → redirect client → handle `checkout.session.completed` webhook to mark Order as paid.

**Environment variables** (`.env`):
- `DATABASE_URL` — SQLite file path (used by `prisma.config.ts`)
- `STRIPE_SECRET_KEY` — server-only
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — safe for client
- `STRIPE_WEBHOOK_SECRET` — for verifying Stripe webhook signatures
- `NEXT_PUBLIC_APP_URL` — base URL for redirect URLs in Stripe sessions
