import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import HeroSlider from "@/components/HeroSlider";
import { Tag, Mail, Phone, MapPin, ShieldCheck, Truck, RefreshCw, Headphones } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))] as string[];
  const newArrivals = products.slice(0, 5);
  const saleProducts = products.slice().sort((a, b) => a.price - b.price).slice(0, 4);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── Hero Slider ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900">New Arrivals</span>
          <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full">Just In</span>
        </div>
        <HeroSlider products={newArrivals} />
      </section>

      {/* ── Trust Badges ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
            { icon: ShieldCheck, title: "Secure Payment", desc: "100% protected" },
            { icon: RefreshCw, title: "Easy Returns", desc: "30-day return policy" },
            { icon: Headphones, title: "24/7 Support", desc: "Always here to help" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <div className="bg-indigo-50 p-2.5 rounded-lg">
                <Icon size={20} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{title}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sale Section ── */}
      <section id="sale" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl p-8 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Tag size={20} className="text-white" />
                <span className="text-white text-sm font-semibold uppercase tracking-widest">Limited Time</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">Hot Deals & Sales 🔥</h2>
              <p className="text-red-100 mt-2 text-sm">Grab the best deals before they're gone. Limited stock available.</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 text-center">
              <p className="text-white text-xs font-medium uppercase tracking-wide mb-1">Save Up To</p>
              <p className="text-5xl font-black text-white">40%</p>
              <p className="text-red-100 text-xs mt-1">on selected items</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {saleProducts.map((p) => (
            <div key={p.id} className="relative">
              <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                SALE
              </span>
              <ProductCard {...p} />
            </div>
          ))}
        </div>
      </section>

      {/* ── All Products ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
          <p className="text-gray-500 text-sm mt-1">{products.length} items available</p>
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer">All</span>
            {categories.map((c) => (
              <span key={c} className="bg-white border border-gray-200 text-gray-600 px-4 py-1.5 rounded-full text-sm hover:border-indigo-400 hover:text-indigo-600 cursor-pointer transition-colors">
                {c}
              </span>
            ))}
          </div>
        )}

        {products.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-5xl mb-4">🛍️</p>
            <p className="text-lg font-medium">No products yet</p>
            <p className="text-sm mt-1">Check back soon or add products via the admin panel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        )}
      </section>

      {/* ── About Section ── */}
      <section id="about" className="bg-white border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-indigo-600 text-sm font-semibold uppercase tracking-widest">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
                About ShopLux
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                ShopLux was founded with one simple mission — bring premium quality products to everyone at fair prices. We carefully curate every item in our store, ensuring only the best makes it to your door.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                From everyday essentials to luxury finds, we partner with trusted suppliers worldwide to deliver an unmatched shopping experience. Your satisfaction is our top priority.
              </p>
              <div className="flex gap-8">
                {[["10K+", "Happy Customers"], ["500+", "Products"], ["50+", "Brands"]].map(([num, label]) => (
                  <div key={label}>
                    <p className="text-2xl font-extrabold text-indigo-600">{num}</p>
                    <p className="text-sm text-gray-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Premium Quality", desc: "Every product hand-picked for quality and durability." },
                { title: "Fast Delivery", desc: "Same-day dispatch on orders placed before 3pm." },
                { title: "Easy Returns", desc: "Hassle-free 30-day returns, no questions asked." },
                { title: "Best Prices", desc: "We price-match and offer exclusive member discounts." },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <p className="font-semibold text-gray-900 mb-1">{title}</p>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section id="contact" className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <span className="text-indigo-600 text-sm font-semibold uppercase tracking-widest">Get In Touch</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Contact Us</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Have a question or feedback? We'd love to hear from you. Our team responds within 24 hours.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email Us", value: "support@shoplux.com", sub: "We reply within 24 hours" },
                { icon: Phone, label: "Call Us", value: "+1 (800) 123-4567", sub: "Mon–Fri, 9am–6pm EST" },
                { icon: MapPin, label: "Visit Us", value: "123 Luxury Lane, NY 10001", sub: "United States" },
              ].map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="bg-indigo-50 p-3 rounded-xl">
                    <Icon size={20} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{label}</p>
                    <p className="text-gray-900 font-semibold mt-0.5">{value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <form className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">First Name</label>
                  <input type="text" placeholder="John" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Last Name</label>
                  <input type="text" placeholder="Doe" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
                <input type="email" placeholder="john@example.com" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Subject</label>
                <input type="text" placeholder="Order inquiry, feedback..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Message</label>
                <textarea rows={4} placeholder="How can we help you?" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none" />
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg text-sm transition-colors shadow">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
