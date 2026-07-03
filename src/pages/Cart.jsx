import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart({ darkMode, onNavigate }) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  const text = darkMode ? "text-white" : "text-slate-800";
  const subtext = darkMode ? "text-slate-400" : "text-slate-500";
  const card = darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => onNavigate("products")}
          className={`flex items-center gap-2 text-sm font-medium ${darkMode ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-800"}`}
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </button>
      </div>

      <h1 className={`text-2xl font-bold mb-6 ${text}`}>
        Shopping Cart
        {cartItems.length > 0 && (
          <span className="ml-2 text-sm font-normal text-orange-500">({cartItems.length} items)</span>
        )}
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-8xl mb-4">🛒</p>
          <h2 className={`text-xl font-bold mb-2 ${text}`}>Your cart is empty!</h2>
          <p className={`text-sm mb-6 ${subtext}`}>Add some products to get started</p>
          <button
            onClick={() => onNavigate("products")}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cartItems.map((item) => (
              <div key={item.id} className={`rounded-2xl border p-4 flex items-center gap-4 ${card}`}>
                {/* Emoji */}
                <div className={`w-20 h-20 rounded-xl flex items-center justify-center text-4xl shrink-0 ${item.bgColor}`}>
                  {item.emoji}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold ${text}`}>{item.name}</p>
                  <p className={`text-sm ${subtext}`}>{item.category}</p>
                  <p className="text-orange-500 font-bold mt-1">${item.price}</p>
                </div>

                {/* Quantity */}
                <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${card}`}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 flex items-center justify-center text-orange-500 font-bold"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className={`text-sm font-bold w-6 text-center ${text}`}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center text-orange-500 font-bold"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Total */}
                <p className={`font-bold text-lg w-20 text-right ${text}`}>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-50 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {/* Clear Cart */}
            <button
              onClick={clearCart}
              className={`text-sm font-medium text-red-500 hover:text-red-600 self-start transition-colors`}
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className={`rounded-2xl border p-5 sticky top-24 ${card}`}>
              <h2 className={`font-bold text-lg mb-4 ${text}`}>Order Summary</h2>

              <div className="flex flex-col gap-3 mb-4">
                <div className="flex justify-between">
                  <span className={`text-sm ${subtext}`}>Subtotal</span>
                  <span className={`text-sm font-semibold ${text}`}>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${subtext}`}>Delivery</span>
                  <span className="text-sm font-semibold text-emerald-500">
                    {cartTotal >= 50 ? "FREE" : "$5.00"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-sm ${subtext}`}>Tax (10%)</span>
                  <span className={`text-sm font-semibold ${text}`}>${(cartTotal * 0.1).toFixed(2)}</span>
                </div>
                <div className={`border-t pt-3 ${darkMode ? "border-slate-700" : "border-slate-100"}`}>
                  <div className="flex justify-between">
                    <span className={`font-bold ${text}`}>Total</span>
                    <span className="font-black text-xl text-orange-500">
                      ${(cartTotal + (cartTotal >= 50 ? 0 : 5) + cartTotal * 0.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {cartTotal < 50 && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-4">
                  <p className="text-xs text-orange-600 font-medium">
                    Add ${(50 - cartTotal).toFixed(2)} more for FREE delivery! 🚚
                  </p>
                </div>
              )}

              <button
              onClick={() => onNavigate("checkout")}
                className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
                >
              <ShoppingBag className="w-5 h-5" />
              Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}