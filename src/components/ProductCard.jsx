import { Heart, ShoppingCart, Star } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, onNavigate, darkMode }) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, isInCart } = useCart();

  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  const card = darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100";
  const text = darkMode ? "text-white" : "text-slate-800";
  const subtext = darkMode ? "text-slate-400" : "text-slate-500";

  return (
    <div className={`rounded-2xl border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group ${card}`}>

      {/* Image */}
      <div
        className="relative cursor-pointer overflow-hidden"
        onClick={() => onNavigate("product-detail", product)}
      >
        <div className={`h-48 flex items-center justify-center text-6xl ${product.bgColor}`}>
          {product.emoji}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-lg">NEW</span>
          )}
          {product.discount && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">-{product.discount}%</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            inWishlist ? removeFromWishlist(product.id) : addToWishlist(product);
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
            inWishlist
              ? "bg-red-500 text-white"
              : "bg-white/80 text-slate-600 hover:bg-red-500 hover:text-white"
          }`}
        >
          <Heart className="w-4 h-4" fill={inWishlist ? "white" : "none"} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <span className={`text-xs font-medium ${subtext}`}>{product.category}</span>

        {/* Name */}
        <h3
          className={`font-semibold mt-1 mb-2 cursor-pointer hover:text-orange-500 transition-colors line-clamp-2 ${text}`}
          onClick={() => onNavigate("product-detail", product)}
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="w-3.5 h-3.5"
              fill={star <= product.rating ? "#f59e0b" : "none"}
              stroke={star <= product.rating ? "#f59e0b" : "#94a3b8"}
            />
          ))}
          <span className={`text-xs ml-1 ${subtext}`}>({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-orange-500">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className={`text-sm line-through ${subtext}`}>
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => addToCart(product)}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            inCart
              ? "bg-emerald-500 text-white"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {inCart ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}