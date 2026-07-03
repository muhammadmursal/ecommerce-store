import { Store, Mail, Phone, MapPin } from "lucide-react";

export default function Footer({ darkMode, onNavigate }) {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">ShopZone</span>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              Your one-stop shop for everything you need. Quality products, great prices.
            </p>
            <div className="flex items-center gap-3">
              {["FB", "TW", "IG", "YT"].map((name, i) => (
                <button key={i} className="w-9 h-9 bg-slate-800 hover:bg-orange-500 rounded-xl flex items-center justify-center transition-all duration-200 text-xs font-bold text-white">
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              {[
                { label: "Home", id: "home" },
                { label: "Products", id: "products" },
                { label: "Blogs", id: "blogs" },
                { label: "Wishlist", id: "wishlist" },
                { label: "Cart", id: "cart" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="text-sm text-slate-400 hover:text-orange-500 text-left transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <div className="flex flex-col gap-2">
              {["Electronics", "Fashion", "Home & Living", "Sports", "Books", "Beauty"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => onNavigate("products")}
                  className="text-sm text-slate-400 hover:text-orange-500 text-left transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-orange-500" />
                </div>
                <span className="text-sm text-slate-400">support@shopzone.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-orange-500" />
                </div>
                <span className="text-sm text-slate-400">+92 341 8547911</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-orange-500" />
                </div>
                <span className="text-sm text-slate-400">Faisalabad, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">© 2026 ShopZone. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <button key={item} className="text-xs text-slate-500 hover:text-orange-500 transition-colors">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}