import { useState } from "react";
import { Search, Clock, User, ArrowRight } from "lucide-react";

const blogsData = [
  {
    id: 1,
    title: "Top 10 Electronics You Need in 2026",
    excerpt: "Discover the most innovative electronics that are changing the way we live and work in 2026.",
    category: "Electronics",
    author: "Muhammad Mursal",
    date: "Jun 28, 2026",
    readTime: "5 min read",
    emoji: "📱",
    bgColor: "bg-indigo-100",
  },
  {
    id: 2,
    title: "Fashion Trends to Watch This Summer",
    excerpt: "Stay ahead of the curve with our roundup of the hottest fashion trends this summer season.",
    category: "Fashion",
    author: "Sara Khan",
    date: "Jun 25, 2026",
    readTime: "3 min read",
    emoji: "👗",
    bgColor: "bg-pink-100",
  },
  {
    id: 3,
    title: "How to Build a Perfect Home Office",
    excerpt: "Tips and tricks for setting up a productive and comfortable home office on any budget.",
    category: "Home & Living",
    author: "Ahmed Raza",
    date: "Jun 22, 2026",
    readTime: "7 min read",
    emoji: "🏠",
    bgColor: "bg-orange-100",
  },
  {
    id: 4,
    title: "Best Sports Gear for Beginners",
    excerpt: "Starting your fitness journey? Here is the essential sports gear you need to get started.",
    category: "Sports",
    author: "Usman Ali",
    date: "Jun 19, 2026",
    readTime: "4 min read",
    emoji: "⚽",
    bgColor: "bg-emerald-100",
  },
  {
    id: 5,
    title: "5 Books Every Entrepreneur Should Read",
    excerpt: "Expand your mindset and business knowledge with these must-read books for entrepreneurs.",
    category: "Books",
    author: "Fatima Malik",
    date: "Jun 15, 2026",
    readTime: "6 min read",
    emoji: "📚",
    bgColor: "bg-violet-100",
  },
  {
    id: 6,
    title: "Skincare Routine for Glowing Skin",
    excerpt: "Achieve that perfect glow with our expert-recommended skincare routine using natural products.",
    category: "Beauty",
    author: "Ayesha Siddiqui",
    date: "Jun 10, 2026",
    readTime: "5 min read",
    emoji: "✨",
    bgColor: "bg-rose-100",
  },
];

const categories = ["All", "Electronics", "Fashion", "Home & Living", "Sports", "Books", "Beauty"];

const categoryColors = {
  Electronics: "bg-indigo-100 text-indigo-700",
  Fashion: "bg-pink-100 text-pink-700",
  "Home & Living": "bg-orange-100 text-orange-700",
  Sports: "bg-emerald-100 text-emerald-700",
  Books: "bg-violet-100 text-violet-700",
  Beauty: "bg-rose-100 text-rose-700",
};

export default function Blogs({ darkMode, onNavigate }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = blogsData.filter((blog) => {
    const matchSearch = blog.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || blog.category === category;
    return matchSearch && matchCategory;
  });

  const text = darkMode ? "text-white" : "text-slate-800";
  const subtext = darkMode ? "text-slate-400" : "text-slate-500";
  const card = darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100";
  const inputBg = darkMode ? "bg-slate-700 text-white placeholder-slate-400" : "bg-slate-50 text-slate-700 placeholder-slate-400";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className={`text-3xl font-black mb-2 ${text}`}>Our Blog</h1>
        <p className={`text-sm ${subtext}`}>Tips, trends and insights from our experts</p>
      </div>

      {/* Search */}
      <div className={`flex items-center gap-2 px-4 py-3 rounded-xl max-w-md mx-auto mb-6 ${inputBg}`}>
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-sm outline-none w-full"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap justify-center mb-8">
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

      {/* Blog Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">🔍</p>
          <h2 className={`text-xl font-bold ${text}`}>No blogs found</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((blog) => (
            <div
              key={blog.id}
              className={`rounded-2xl border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group ${card}`}
              onClick={() => onNavigate("blog-detail", blog)}
            >
              {/* Cover */}
              <div className={`h-48 flex items-center justify-center text-6xl ${blog.bgColor}`}>
                {blog.emoji}
              </div>

              {/* Content */}
              <div className="p-5">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[blog.category]}`}>
                  {blog.category}
                </span>

                <h2 className={`font-bold text-lg mt-3 mb-2 group-hover:text-orange-500 transition-colors line-clamp-2 ${text}`}>
                  {blog.title}
                </h2>

                <p className={`text-sm mb-4 line-clamp-2 ${subtext}`}>{blog.excerpt}</p>

                <div className={`flex items-center justify-between text-xs ${subtext}`}>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {blog.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {blog.readTime}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}