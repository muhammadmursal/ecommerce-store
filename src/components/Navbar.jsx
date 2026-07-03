import { useState } from "react";
import { ShoppingCart, Heart, Search, Menu, X, Sun, Moon, Store } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar({ activePage, onNavigate, darkMode, onToggleDark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { cartCount, wishlist } = useCart();

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Products", id: "products" },
    { label: "Blogs", id: "blogs" },
  ];

  const nav = darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-slate-200 text-slate-800";
  const inputBg = darkMode ? "bg-slate-800 text-white placeholder-slate-400" : "bg-slate-100 text-slate-700 placeholder-slate-400";

  return (
    <nav className={`sticky top-0 z-50 border-b ${nav}`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">

        {/* Logo */}
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 shrink-0"
        >
          <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center">
            <Store className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">ShopZone</span>
        </button>

        {/* Search Bar */}
        <div className={`hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl flex-1 max-w-md ${inputBg}`}>
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none w-full"
          />
        </div>

        {/* Nav Links — Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activePage === link.id
                  ? "bg-orange-500 text-white"
                  : darkMode
                  ? "text-slate-300 hover:bg-slate-800"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-2">
          {/* Dark Mode */}
          <button
            onClick={onToggleDark}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${darkMode ? "bg-slate-800 text-yellow-400" : "bg-slate-100 text-slate-600"}`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Wishlist */}
          <button
            onClick={() => onNavigate("wishlist")}
            className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all ${darkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"}`}
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => onNavigate("cart")}
            className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all ${darkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"}`}
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Login Button */}
          <button
            onClick={() => onNavigate("login")}
            className="hidden md:block px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all"
          >
            Login
          </button>

          {/* Mobile Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden w-10 h-10 rounded-xl flex items-center justify-center ${darkMode ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600"}`}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`md:hidden px-4 pb-4 flex flex-col gap-2 border-t ${darkMode ? "border-slate-700" : "border-slate-100"}`}>
          {/* Mobile Search */}
          <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl mt-3 ${inputBg}`}>
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent text-sm outline-none w-full"
            />
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { onNavigate(link.id); setMenuOpen(false); }}
              className={`px-4 py-3 rounded-xl text-sm font-medium text-left transition-all ${
                activePage === link.id
                  ? "bg-orange-500 text-white"
                  : darkMode
                  ? "text-slate-300 hover:bg-slate-800"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { onNavigate("login"); setMenuOpen(false); }}
            className="px-4 py-3 bg-orange-500 text-white text-sm font-semibold rounded-xl"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
}