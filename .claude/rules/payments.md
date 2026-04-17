# Stripe / Payments Rules

- Create Checkout Session server-side in `src/app/api/checkout/route.ts`
- Handle `checkout.session.completed` webhook in `src/app/api/webhook/route.ts`
- Stripe client singleton at `src/lib/stripe.ts`
- Env vars: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_APP_URL`
