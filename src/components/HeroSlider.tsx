"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string | null;
  category?: string | null;
};

export default function HeroSlider({ products }: { products: Product[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (products.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [products.length]);

  if (products.length === 0) return null;

  const prev = () => setCurrent((c) => (c - 1 + products.length) % products.length);
  const next = () => setCurrent((c) => (c + 1) % products.length);
  const p = products[current];

  return (
    <div className="relative w-full h-[480px] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl">
      {/* Background image */}
      {p.image ? (
        <img
          key={p.id}
          src={p.image}
          alt={p.name}
          className="absolute inset-0 w-full h-full object-cover opacity-40 transition-opacity duration-700"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 opacity-80" />
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Badge */}
      <div className="absolute top-6 left-8 flex items-center gap-2 bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow">
        <Sparkles size={12} />
        NEW ARRIVAL
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-10 md:px-16 max-w-2xl">
        {p.category && (
          <span className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-3">
            {p.category}
          </span>
        )}
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow">
          {p.name}
        </h2>
        <p className="text-gray-300 text-base md:text-lg mb-6 line-clamp-2">
          {p.description}
        </p>
        <div className="flex items-center gap-4">
          <span className="text-3xl font-extrabold text-white">${p.price.toFixed(2)}</span>
          <Link
            href={`/products/${p.id}`}
            className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold text-sm hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Navigation arrows */}
      {products.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white p-2 rounded-full backdrop-blur-sm transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white p-2 rounded-full backdrop-blur-sm transition"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dots */}
      {products.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-white" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
