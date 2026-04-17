"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  category?: string | null;
};

const empty = { name: "", description: "", price: "", stock: "", category: "", image: "" };

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const load = async () => {
    const res = await fetch("/api/products");
    setProducts(await res.json());
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setMsg("Product added!");
      setForm(empty);
      load();
    } else {
      const { error } = await res.json();
      setMsg(error || "Failed to add product");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
      <p className="text-gray-500 mb-10 text-sm">Manage your product catalog</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Add Product Form */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
            <Plus size={18} className="text-indigo-600" /> Add New Product
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: "name", label: "Product Name", type: "text", required: true },
              { key: "price", label: "Price ($)", type: "number", required: true },
              { key: "stock", label: "Stock", type: "number", required: false },
              { key: "category", label: "Category", type: "text", required: false },
              { key: "image", label: "Image URL", type: "url", required: false },
            ].map(({ key, label, type, required }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  required={required}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                required
                rows={3}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>
            {msg && <p className={`text-sm ${msg.includes("added") ? "text-green-600" : "text-red-500"}`}>{msg}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-500 transition-colors disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>

        {/* Product List */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-5">Products ({products.length})</h2>
          {products.length === 0 ? (
            <p className="text-gray-400 text-sm py-10 text-center bg-white rounded-2xl border border-gray-100">No products yet.</p>
          ) : (
            <div className="space-y-3">
              {products.map((p) => (
                <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between shadow-sm">
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{p.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      ${p.price.toFixed(2)} · Stock: {p.stock}
                      {p.category ? ` · ${p.category}` : ""}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
