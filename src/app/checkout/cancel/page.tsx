import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";

export default function CancelPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
        <XCircle size={64} className="mx-auto text-red-400 mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Payment Cancelled</h1>
        <p className="text-gray-500 mb-8">
          Your order was not completed. Your cart items are still saved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/cart" className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-indigo-600 transition-colors">
            <ArrowLeft size={16} /> Back to Cart
          </Link>
          <Link href="/products" className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 px-8 py-3.5 rounded-full font-semibold hover:border-gray-400 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
