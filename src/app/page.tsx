import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Shield, Truck, RotateCcw } from "lucide-react";

export default async function HomePage() {
  const featured = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <span className="inline-block bg-indigo-500/20 text-indigo-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-indigo-500/30">
            New Arrivals Just Dropped
          </span>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
            Elevate Your{" "}
            <span className="text-indigo-400">Lifestyle</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto mb-10 leading-relaxed">
            Discover handpicked premium products designed to bring quality and style into your everyday life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-full font-semibold transition-colors"
            >
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/10 text-white px-8 py-3.5 rounded-full font-semibold transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: <Truck size={22} />, title: "Free Shipping", text: "On orders over $50" },
              { icon: <Shield size={22} />, title: "Secure Payments", text: "100% protected checkout" },
              { icon: <RotateCcw size={22} />, title: "Easy Returns", text: "30-day hassle-free returns" },
            ].map((b) => (
              <div key={b.title} className="flex items-center justify-center gap-3 text-gray-700">
                <span className="text-indigo-600">{b.icon}</span>
                <div className="text-left">
                  <div className="font-semibold text-sm">{b.title}</div>
                  <div className="text-xs text-gray-500">{b.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-500 mt-1">Curated picks just for you</p>
          </div>
          <Link href="/products" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg mb-4">No products yet.</p>
            <Link href="/admin" className="text-indigo-600 hover:underline text-sm">Add products in Admin →</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Banner */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Shop?</h2>
          <p className="text-indigo-100 mb-8 max-w-md mx-auto">
            Browse our full collection and find the perfect product for you or your loved ones.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-3.5 rounded-full font-semibold hover:bg-indigo-50 transition-colors"
          >
            Browse All Products <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
