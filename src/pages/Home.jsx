import { ArrowRight, Star, Truck, Shield, RefreshCw, Headphones } from "lucide-react";
import ProductCard from "../components/ProductCard";

const featuredProducts = [
  { id: 1, name: "Wireless Headphones Pro", category: "Electronics", price: 99.99, originalPrice: 129.99, rating: 5, reviews: 234, emoji: "🎧", bgColor: "bg-indigo-100", isNew: true, discount: 23 },
  { id: 2, name: "Running Shoes X1", category: "Fashion", price: 79.99, originalPrice: 99.99, rating: 4, reviews: 189, emoji: "👟", bgColor: "bg-emerald-100", discount: 20 },
  { id: 3, name: "Smart Watch Series 5", category: "Electronics", price: 199.99, originalPrice: 249.99, rating: 5, reviews: 312, emoji: "⌚", bgColor: "bg-blue-100", isNew: true, discount: 20 },
  { id: 4, name: "Coffee Maker Deluxe", category: "Home & Living", price: 49.99, rating: 4, reviews: 98, emoji: "☕", bgColor: "bg-orange-100" },
];

const categories = [
  { name: "Electronics", emoji: "📱", color: "bg-indigo-100 text-indigo-700", count: "120+ items" },
  { name: "Fashion", emoji: "👗", color: "bg-pink-100 text-pink-700", count: "340+ items" },
  { name: "Home & Living", emoji: "🏠", color: "bg-orange-100 text-orange-700", count: "89+ items" },
  { name: "Sports", emoji: "⚽", color: "bg-emerald-100 text-emerald-700", count: "67+ items" },
  { name: "Books", emoji: "📚", color: "bg-violet-100 text-violet-700", count: "230+ items" },
  { name: "Beauty", emoji: "💄", color: "bg-rose-100 text-rose-700", count: "145+ items" },
];

const features = [
  { icon: Truck, title: "Free Delivery", desc: "On orders over $50", color: "bg-indigo-100 text-indigo-600" },
  { icon: Shield, title: "Secure Payment", desc: "100% secure transactions", color: "bg-emerald-100 text-emerald-600" },
  { icon: RefreshCw, title: "Easy Returns", desc: "30 day return policy", color: "bg-orange-100 text-orange-600" },
  { icon: Headphones, title: "24/7 Support", desc: "Always here to help", color: "bg-violet-100 text-violet-600" },
];

export default function Home({ darkMode, onNavigate }) {
  const text = darkMode ? "text-white" : "text-slate-800";
  const subtext = darkMode ? "text-slate-400" : "text-slate-500";
  const card = darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100";
  const section = darkMode ? "bg-slate-900" : "bg-slate-50";

  return (
    <div>
      {/* Hero Section */}
      <div className={`${darkMode ? "bg-slate-800" : "bg-gradient-to-br from-orange-50 to-amber-50"} py-16 px-4`}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              🔥 New Arrivals 2026
            </span>
            <h1 className={`text-4xl lg:text-5xl font-black mb-4 leading-tight ${text}`}>
              Shop the Latest<br />
              <span className="text-orange-500">Trending Products</span>
            </h1>
            <p className={`text-lg mb-8 max-w-md ${subtext}`}>
              Discover thousands of products at unbeatable prices. Free delivery on orders over $50!
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <button
                onClick={() => onNavigate("products")}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/30"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate("blogs")}
                className={`px-6 py-3 font-semibold rounded-xl transition-all border ${darkMode ? "border-slate-600 text-white hover:bg-slate-700" : "border-slate-200 text-slate-700 hover:bg-white"}`}
              >
                Read Blogs
              </button>
            </div>
          </div>
          <div className="text-9xl animate-bounce">🛍️</div>
        </div>
      </div>

      {/* Features */}
      <div className={`py-10 px-4 ${section}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className={`rounded-2xl border p-4 flex items-center gap-3 ${card}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${feature.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${text}`}>{feature.title}</p>
                  <p className={`text-xs ${subtext}`}>{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${text}`}>Shop by Category</h2>
            <button
              onClick={() => onNavigate("products")}
              className="text-sm text-orange-500 font-semibold hover:text-orange-600 flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => onNavigate("products")}
                className={`rounded-2xl border p-4 flex flex-col items-center gap-2 hover:shadow-md transition-all ${card}`}
              >
                <span className="text-3xl">{cat.emoji}</span>
                <p className={`text-sm font-semibold ${text}`}>{cat.name}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${cat.color}`}>{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className={`py-12 px-4 ${section}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${text}`}>Featured Products</h2>
            <button
              onClick={() => onNavigate("products")}
              className="text-sm text-orange-500 font-semibold hover:text-orange-600 flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={onNavigate}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sale Banner */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-black text-white mb-2">🎉 Special Sale!</h2>
              <p className="text-orange-100 text-lg">Up to 50% off on selected items. Limited time only!</p>
            </div>
            <button
              onClick={() => onNavigate("products")}
              className="px-8 py-3 bg-white text-orange-500 font-bold rounded-xl hover:bg-orange-50 transition-all shrink-0"
            >
              Shop Sale
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}