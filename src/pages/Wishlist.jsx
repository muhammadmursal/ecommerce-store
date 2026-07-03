import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Wishlist({ darkMode, onNavigate }) {
  const { wishlist, removeFromWishlist, addToCart, isInCart } = useCart();

  const text = darkMode ? "text-white" : "text-slate-800";
  const subtext = darkMode ? "text-slate-400" : "text-slate-500";
  const card = darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${text}`}>
            My Wishlist
            {wishlist.length > 0 && (
              <span className="ml-2 text-sm font-normal text-orange-500">({wishlist.length} items)</span>
            )}
          </h1>
          <p className={`text-sm mt-1 ${subtext}`}>Your saved products</p>
        </div>
        <button
          onClick={() => onNavigate("products")}
          className={`flex items-center gap-2 text-sm font-medium ${darkMode ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-800"}`}
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </button>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-8xl mb-4">❤️</p>
          <h2 className={`text-xl font-bold mb-2 ${text}`}>Your wishlist is empty!</h2>
          <p className={`text-sm mb-6 ${subtext}`}>Save products you love for later</p>
          <button
            onClick={() => onNavigate("products")}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => {
            const inCart = isInCart(product.id);
            return (
              <div key={product.id} className={`rounded-2xl border overflow-hidden shadow-sm hover:shadow-lg transition-all ${card}`}>

                {/* Image */}
                <div
                  className={`h-48 flex items-center justify-center text-6xl cursor-pointer ${product.bgColor}`}
                  onClick={() => onNavigate("product-detail", product)}
                >
                  {product.emoji}
                </div>

                {/* Content */}
                <div className="p-4">
                  <span className={`text-xs ${subtext}`}>{product.category}</span>
                  <h3
                    className={`font-semibold mt-1 mb-1 cursor-pointer hover:text-orange-500 transition-colors ${text}`}
                    onClick={() => onNavigate("product-detail", product)}
                  >
                    {product.name}
                  </h3>
                  <p className="text-orange-500 font-bold mb-4">${product.price}</p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        inCart
                          ? "bg-emerald-500 text-white"
                          : "bg-orange-500 hover:bg-orange-600 text-white"
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {inCart ? "In Cart" : "Add to Cart"}
                    </button>
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-50 transition-all border border-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}