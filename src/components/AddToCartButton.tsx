"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  image?: string | null;
  stock: number;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (product.stock === 0) {
    return (
      <button disabled className="w-full bg-gray-200 text-gray-400 py-4 rounded-full font-semibold cursor-not-allowed">
        Out of Stock
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className={`w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-base transition-all duration-200 ${
        added
          ? "bg-green-600 text-white"
          : "bg-gray-900 text-white hover:bg-indigo-600"
      }`}
    >
      {added ? (
        <><Check size={18} /> Added to Cart!</>
      ) : (
        <><ShoppingCart size={18} /> Add to Cart</>
      )}
    </button>
  );
}
