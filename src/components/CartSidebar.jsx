import { X, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartSidebar({ open, onClose, darkMode, onNavigate }) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  const bg = darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200";
  const text = darkMode ? "text-white" : "text-slate-800";
  const subtext = darkMode ? "text-slate-400" : "text-slate-500";
  const itemBg = darkMode ? "bg-slate-800" : "bg-slate-50";

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-96 max-w-full z-50 border-l shadow-2xl flex flex-col transition-transform duration-300 ${bg} ${open ? "translate-x-0" : "translate-x-full"}`}>

        {/* Header */}
        <div className={`flex items-center justify-between px-5 py-4 border-b ${darkMode ? "border-slate-700" : "border-slate-200"}`}>
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-orange-500" />
            <h2 className={`font-bold text-lg ${text}`}>Your Cart</h2>
            {cartItems.length > 0 && (
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${darkMode ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-100 text-slate-500"}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <p className="text-6xl">🛒</p>
              <p className={`font-semibold ${text}`}>Cart is empty!</p>
              <p className={`text-sm ${subtext}`}>Add some products first</p>
              <button
                onClick={() => { onNavigate("products"); onClose(); }}
                className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all"
              >
                Browse Products
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className={`rounded-2xl p-3 flex items-center gap-3 ${itemBg}`}>
                {/* Emoji */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0 ${item.bgColor}`}>
                  {item.emoji}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${text}`}>{item.name}</p>
                  <p className="text-orange-500 font-bold text-sm mt-0.5">${item.price}</p>

                  {/* Quantity */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${darkMode ? "bg-slate-700 text-white hover:bg-slate-600" : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200"}`}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className={`text-sm font-semibold w-6 text-center ${text}`}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${darkMode ? "bg-slate-700 text-white hover:bg-slate-600" : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200"}`}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-500 transition-all shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className={`p-4 border-t ${darkMode ? "border-slate-700" : "border-slate-200"}`}>
            <div className="flex items-center justify-between mb-4">
              <span className={`font-semibold ${text}`}>Total:</span>
              <span className="text-xl font-bold text-orange-500">${cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => { onNavigate("cart"); onClose(); }}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all mb-2"
            >
              View Cart
            </button>
            <button
              onClick={clearCart}
              className={`w-full py-3 rounded-xl font-semibold transition-all text-sm ${darkMode ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}