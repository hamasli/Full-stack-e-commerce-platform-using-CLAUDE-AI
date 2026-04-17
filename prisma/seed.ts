import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: "file:./prisma/dev.db" });
const prisma = new PrismaClient({ adapter } as never);

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: "Premium Wireless Headphones",
        description: "Immersive sound experience with active noise cancellation, 30-hour battery life, and ultra-comfortable over-ear design. Perfect for music lovers and remote workers.",
        price: 149.99,
        stock: 25,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop",
      },
      {
        name: "Minimalist Leather Watch",
        description: "Handcrafted genuine leather strap with a clean, minimalist dial. Water-resistant to 50m, sapphire crystal glass, and Japanese quartz movement.",
        price: 199.99,
        stock: 15,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop",
      },
      {
        name: "Organic Cotton T-Shirt",
        description: "Sustainably sourced 100% organic cotton. Breathable, soft, and pre-washed for a perfect fit from day one. Available in multiple colors.",
        price: 39.99,
        stock: 80,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop",
      },
      {
        name: "Stainless Steel Water Bottle",
        description: "Double-wall vacuum insulation keeps drinks cold for 24 hours or hot for 12. BPA-free, leak-proof lid, and fits most car cup holders.",
        price: 34.99,
        stock: 60,
        category: "Lifestyle",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop",
      },
      {
        name: "Mechanical Keyboard",
        description: "Tactile brown switches with RGB backlighting. Full 104-key layout, aluminum frame, detachable USB-C cable, and programmable macros.",
        price: 129.99,
        stock: 30,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop",
      },
      {
        name: "Scented Soy Candle Set",
        description: "Set of 3 hand-poured soy wax candles in signature scents: Sandalwood, Lavender Fields, and Fresh Citrus. 45-hour burn time each.",
        price: 49.99,
        stock: 40,
        category: "Home",
        image: "https://images.unsplash.com/photo-1602874801007-bd1ecb4b96f8?w=600&auto=format&fit=crop",
      },
      {
        name: "Wireless Charging Pad",
        description: "15W fast wireless charging, compatible with all Qi devices. Slim profile, anti-slip surface, LED indicator, and multi-device charging.",
        price: 29.99,
        stock: 50,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop",
      },
      {
        name: "Yoga Mat Premium",
        description: "6mm thick non-slip natural rubber yoga mat with alignment lines. Eco-friendly materials, moisture-wicking surface, includes carrying strap.",
        price: 79.99,
        stock: 35,
        category: "Sports",
        image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&auto=format&fit=crop",
      },
    ],
  });

  console.log("✅ Database seeded with 8 products");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
