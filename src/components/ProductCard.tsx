"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

type Props = {
  id: string;
  name: string;
  price: number;
  image?: string | null;
  category?: string | null;
  description: string;
};

export default function ProductCard({ id, name, price, image, category, description }: Props) {
  const { addItem } = useCart();

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
      <Link href={`/products/${id}`} className="block overflow-hidden bg-gray-50">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-56 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <span className="text-gray-400 text-4xl">🛍️</span>
          </div>
        )}
      </Link>
      <div className="p-5 flex flex-col flex-1">
        {category && (
          <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide mb-1">
            {category}
          </span>
        )}
        <Link href={`/products/${id}`}>
          <h3 className="font-semibold text-gray-900 text-base mb-1 hover:text-indigo-600 transition-colors line-clamp-1">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 line-clamp-2 flex-1 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${price.toFixed(2)}</span>
          <button
            onClick={() => addItem({ id, name, price, image })}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-600 transition-colors"
          >
            <ShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
