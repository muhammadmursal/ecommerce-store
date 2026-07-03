import { useState } from "react";
import { ArrowLeft, Star, ShoppingCart, Heart, Truck, Shield, RefreshCw } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductDetail({ product, darkMode, onNavigate }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, isInCart } = useCart();

  if (!product) {
    onNavigate("products");
    return null;
  }

  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  const text = darkMode ? "text-white" : "text-slate-800";
  const subtext = darkMode ? "text-slate-400" : "text-slate-500";
  const card = darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Back Button */}
      <button
        onClick={() => onNavigate("products")}
        className={`flex items-center gap-2 mb-6 text-sm font-medium transition-colors ${darkMode ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-800"}`}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Product Image */}
        <div className={`rounded-3xl border p-8 flex items-center justify-center ${card}`}>
          <div className={`w-64 h-64 rounded-2xl flex items-center justify-center text-9xl ${product.bgColor}`}>
            {product.emoji}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-4">
          {/* Badges */}
          <div className="flex gap-2">
            {product.isNew && (
              <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">NEW</span>
            )}
            {product.discount && (
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">-{product.discount}% OFF</span>
            )}
          </div>

          {/* Category */}
          <span className={`text-sm font-medium ${subtext}`}>{product.category}</span>

          {/* Name */}
          <h1 className={`text-3xl font-black ${text}`}>{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-5 h-5"
                  fill={star <= product.rating ? "#f59e0b" : "none"}
                  stroke={star <= product.rating ? "#f59e0b" : "#94a3b8"}
                />
              ))}
            </div>
            <span className={`text-sm ${subtext}`}>({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-4xl font-black text-orange-500">${product.price}</span>
            {product.originalPrice && (
              <span className={`text-xl line-through ${subtext}`}>${product.originalPrice}</span>
            )}
          </div>

          {/* Description */}
          <p className={`text-sm leading-relaxed ${subtext}`}>
            Experience the best quality with our {product.name}. Designed for performance and comfort, this product is perfect for everyday use. Built with premium materials and backed by our satisfaction guarantee.
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <span className={`text-sm font-semibold ${text}`}>Quantity:</span>
            <div className={`flex items-center gap-3 px-3 py-2 rounded-xl border ${card}`}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-6 h-6 flex items-center justify-center text-lg font-bold text-orange-500"
              >
                −
              </button>
              <span className={`text-sm font-bold w-6 text-center ${text}`}>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-6 h-6 flex items-center justify-center text-lg font-bold text-orange-500"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                for (let i = 0; i < quantity; i++) addToCart(product);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold transition-all ${
                inCart
                  ? "bg-emerald-500 text-white"
                  : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {inCart ? "Added to Cart ✓" : "Add to Cart"}
            </button>

            <button
              onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)}
              className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all border ${
                inWishlist
                  ? "bg-red-500 text-white border-red-500"
                  : darkMode
                  ? "bg-slate-800 text-slate-300 border-slate-700 hover:bg-red-500 hover:text-white hover:border-red-500"
                  : "bg-white text-slate-500 border-slate-200 hover:bg-red-500 hover:text-white hover:border-red-500"
              }`}
            >
              <Heart className="w-5 h-5" fill={inWishlist ? "white" : "none"} />
            </button>
          </div>

          {/* Features */}
          <div className={`rounded-2xl border p-4 grid grid-cols-3 gap-3 ${card}`}>
            {[
              { icon: Truck, label: "Free Delivery", desc: "Orders over $50" },
              { icon: Shield, label: "Secure Pay", desc: "100% secure" },
              { icon: RefreshCw, label: "Easy Return", desc: "30 day policy" },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.label} className="text-center">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-1">
                    <Icon className="w-4 h-4 text-orange-500" />
                  </div>
                  <p className={`text-xs font-semibold ${text}`}>{feature.label}</p>
                  <p className={`text-xs ${subtext}`}>{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}