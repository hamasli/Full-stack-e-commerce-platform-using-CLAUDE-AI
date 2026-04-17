# Database Rules

- Prisma 7: connection URL goes in `prisma.config.ts`, NOT `schema.prisma`
- The `datasource db` block in `schema.prisma` must NOT have a `url` field
- Always import Prisma client from `src/lib/prisma.ts` — never instantiate `PrismaClient` directly
- Models: `Product`, `Order` (Stripe session, status: pending→paid→fulfilled), `OrderItem`
