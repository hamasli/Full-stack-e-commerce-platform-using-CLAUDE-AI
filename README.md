# ShopLux — Full-Stack E-Commerce Platform

> **Built entirely with [Claude AI](https://claude.ai/code)** — from database schema to UI components, auth system to Stripe integration, all generated through AI-assisted development.

### [🌐 Live Demo →](https://full-stack-e-commerce-platform-using-claude-a-hamaslis-projects.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635bff?logo=stripe)
![NextAuth](https://img.shields.io/badge/NextAuth.js-Auth-purple)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)

---

## Features

### Storefront
- **Product catalog** with categories and filtering
- **Product detail pages** with images, descriptions, and stock status
- **Hero slider** with promotional banners
- **Fully responsive** design — mobile, tablet, desktop

### Shopping
- **Shopping cart** with real-time item count (React Context)
- **Stripe Checkout** — secure card payments with hosted checkout
- **Order confirmation** and cancellation pages
- **Stripe Webhook** integration to mark orders as paid

### Authentication
- **Sign Up / Sign In / Sign Out** with email & password
- **JWT sessions** via NextAuth.js
- **Role-based access** — first user auto-promoted to `admin`
- Protected routes via Next.js middleware

### User Dashboard
- Personal order history with status tracking
- Total orders and total amount spent
- Admin panel shortcut for admin users

### Admin Panel
- Add and delete products from the catalog
- Live product list with price and stock info
- Route-protected — only `admin` role can access

### AI Chat Assistant
- Built-in **NovaCart** AI shopping assistant
- Powered by OpenAI GPT
- Answers product questions and helps users shop

### Developer
- **Docker** support with multi-stage build and volume-persisted SQLite
- **Prisma 7** database migrations
- Full **TypeScript** — zero `any` types
- ESLint configured

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Database | SQLite via Prisma 7 |
| Auth | NextAuth.js (JWT, Credentials) |
| Payments | Stripe Checkout + Webhooks |
| AI Chat | OpenAI GPT API |
| Icons | Lucide React |
| Containerisation | Docker + Docker Compose |

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm

### Local Development

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/shoplux.git
cd shoplux

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your Stripe keys, OpenAI key, and a NEXTAUTH_SECRET

# 4. Set up the database
npx prisma migrate dev

# 5. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **First signup** automatically gets the `admin` role — use it to add products via `/admin`.

---

### Docker

```bash
# Build and run with Docker Compose
cp .env.example .env.production
# Fill in .env.production with real values

docker compose up --build
```

App runs at [http://localhost:3000](http://localhost:3000). The SQLite database is persisted in a named Docker volume (`db_data`).

---

## Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | SQLite path — `file:./prisma/dev.db` |
| `NEXTAUTH_SECRET` | Random secret — `openssl rand -base64 32` |
| `NEXTAUTH_URL` | App base URL |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `NEXT_PUBLIC_APP_URL` | App base URL (for Stripe redirects) |
| `OPENAI_API_KEY` | OpenAI API key for AI chat |

---

## Deploy to Vercel (Free)

This app can't be hosted on GitHub Pages (it has a server, database, and API routes). The easiest **free** option is Vercel:

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your GitHub repo
3. Add all environment variables in the Vercel dashboard
4. Click **Deploy** — live in ~60 seconds

> For persistent storage on Vercel, swap SQLite for [Turso](https://turso.tech) (free tier, SQLite-compatible) and update `DATABASE_URL`. Prisma 7 supports it via `@prisma/adapter-libsql` which is already installed.

### Other free options
| Platform | Docker Support | Notes |
|----------|---------------|-------|
| [Railway](https://railway.app) | Yes | Great DX, free tier |
| [Render](https://render.com) | Yes | Free tier, Docker |
| [Fly.io](https://fly.io) | Yes | Free allowance |

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/         # NextAuth + signup endpoint
│   │   ├── checkout/     # Stripe checkout session
│   │   ├── products/     # CRUD product API
│   │   └── webhook/      # Stripe webhook handler
│   ├── admin/            # Admin product management
│   ├── cart/             # Shopping cart page
│   ├── checkout/         # Success / cancel pages
│   ├── dashboard/        # User order history
│   ├── products/         # Catalog + product detail
│   ├── signin/           # Sign in page
│   └── signup/           # Sign up page
├── components/           # Navbar, Footer, ProductCard, ChatWidget…
├── context/              # CartContext (global cart state)
├── lib/                  # prisma.ts, stripe.ts, auth.ts
└── types/                # NextAuth type extensions
prisma/
├── schema.prisma         # Data models
└── migrations/           # Migration history
```

---

## Built With Claude AI

This entire application was built using **[Claude Code](https://claude.ai/code)** by Anthropic — an AI coding assistant. Every part of the stack — from the Prisma schema design, Next.js route architecture, Stripe webhook integration, NextAuth.js auth system, Tailwind UI components, and Docker configuration — was generated, refined, and debugged through conversation with Claude.

This project demonstrates what's possible when developers use AI as a coding partner to ship full-stack production-ready apps rapidly.

---

## License

MIT
