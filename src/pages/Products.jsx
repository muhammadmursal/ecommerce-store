import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/ProductCard";

const allProducts = [
  { id: 1, name: "Wireless Headphones Pro", category: "Electronics", price: 99.99, originalPrice: 129.99, rating: 5, reviews: 234, emoji: "🎧", bgColor: "bg-indigo-100", isNew: true, discount: 23 },
  { id: 2, name: "Running Shoes X1", category: "Fashion", price: 79.99, originalPrice: 99.99, rating: 4, reviews: 189, emoji: "👟", bgColor: "bg-emerald-100", discount: 20 },
  { id: 3, name: "Smart Watch Series 5", category: "Electronics", price: 199.99, originalPrice: 249.99, rating: 5, reviews: 312, emoji: "⌚", bgColor: "bg-blue-100", isNew: true, discount: 20 },
  { id: 4, name: "Coffee Maker Deluxe", category: "Home & Living", price: 49.99, rating: 4, reviews: 98, emoji: "☕", bgColor: "bg-orange-100" },
  { id: 5, name: "Yoga Mat Premium", category: "Sports", price: 29.99, rating: 4, reviews: 145, emoji: "🧘", bgColor: "bg-violet-100" },
  { id: 6, name: "Python Programming Book", category: "Books", price: 39.99, originalPrice: 49.99, rating: 5, reviews: 267, emoji: "📚", bgColor: "bg-yellow-100", discount: 20 },
  { id: 7, name: "Face Serum Gold", category: "Beauty", price: 59.99, rating: 4, reviews: 89, emoji: "✨", bgColor: "bg-rose-100", isNew: true },
  { id: 8, name: "Bluetooth Speaker", category: "Electronics", price: 79.99, originalPrice: 99.99, rating: 4, reviews: 178, emoji: "🔊", bgColor: "bg-slate-100", discount: 20 },
  { id: 9, name: "Denim Jacket", category: "Fashion", price: 89.99, rating: 4, reviews: 134, emoji: "🧥", bgColor: "bg-blue-100" },
  { id: 10, name: "Gym Gloves", category: "Sports", price: 19.99, rating: 3, reviews: 56, emoji: "🥊", bgColor: "bg-red-100" },
  { id: 11, name: "Desk Lamp LED", category: "Home & Living", price: 34.99, rating: 4, reviews: 112, emoji: "💡", bgColor: "bg-amber-100" },
  { id: 12, name: "Lipstick Set", category: "Beauty", price: 24.99, originalPrice: 34.99, rating: 5, reviews: 201, emoji: "💄", bgColor: "bg-pink-100", discount: 29 },
];

const categories = ["All", "Electronics", "Fashion", "Home & Living", "Sports", "Books", "Beauty"];

export default function Products({ darkMode, onNavigate }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = allProducts
    .filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "All" || p.category === category;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  const card = darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100";
  const text = darkMode ? "text-white" : "text-slate-800";
  const subtext = darkMode ? "text-slate-400" : "text-slate-500";
  const inputBg = darkMode ? "bg-slate-700 text-white placeholder-slate-400" : "bg-slate-50 text-slate-700 placeholder-slate-400";
  const selectBg = darkMode ? "bg-slate-700 text-white border-slate-600" : "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${text}`}>All Products</h1>
          <p className={`text-sm mt-1 ${subtext}`}>{filtered.length} products found</p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${card}`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className={`rounded-2xl border p-4 mb-6 flex flex-wrap gap-3 ${card}`}>
          {/* Search */}
          <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl flex-1 min-w-48 ${inputBg}`}>
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm outline-none w-full"
            />
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className={`px-4 py-2.5 rounded-xl text-sm border outline-none ${selectBg}`}
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      )}

      {/* Categories */}
      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              category === cat
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                : darkMode
                ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">🔍</p>
          <h2 className={`text-xl font-bold ${text}`}>No products found</h2>
          <p className={`text-sm mt-2 ${subtext}`}>Try different search or category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
              darkMode={darkMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}