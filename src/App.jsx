import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Checkout from "./pages/Checkout";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleNavigate = (page, data = null) => {
    setActivePage(page);
    if (data) setSelectedProduct(data);
    window.scrollTo(0, 0);
  };

  const bg = darkMode ? "bg-slate-900 min-h-screen" : "bg-slate-50 min-h-screen";
  const knownPages = ["home", "products", "product-detail", "cart", "wishlist", "blogs", "blog-detail", "login", "register", "checkout"];

  return (
    <CartProvider>
      <div className={bg}>

        {/* Navbar */}
        <Navbar
          activePage={activePage}
          onNavigate={handleNavigate}
          darkMode={darkMode}
          onToggleDark={() => setDarkMode(!darkMode)}
        />

        {/* Cart Sidebar */}
        <CartSidebar
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          darkMode={darkMode}
          onNavigate={handleNavigate}
        />

        {/* Pages */}
        <main>
          {activePage === "home" && <Home darkMode={darkMode} onNavigate={handleNavigate} />}
          {activePage === "products" && <Products darkMode={darkMode} onNavigate={handleNavigate} />}
          {activePage === "product-detail" && <ProductDetail product={selectedProduct} darkMode={darkMode} onNavigate={handleNavigate} />}
         {activePage === "cart" && <Cart darkMode={darkMode} onNavigate={handleNavigate} />}
          {activePage === "wishlist" && <Wishlist darkMode={darkMode} onNavigate={handleNavigate} />}
          {activePage === "blogs" && <Blogs darkMode={darkMode} onNavigate={handleNavigate} />}
          {activePage === "blog-detail" && <BlogDetail blog={selectedProduct} darkMode={darkMode} onNavigate={handleNavigate} />}
          {activePage === "login" && <Login darkMode={darkMode} onNavigate={handleNavigate} onLogin={() => setIsLoggedIn(true)} />}
          {activePage === "register" && <Register darkMode={darkMode} onNavigate={handleNavigate} />}
          {activePage === "checkout" && (
            isLoggedIn
          ? <Checkout darkMode={darkMode} onNavigate={handleNavigate} />
          : <Login darkMode={darkMode} onNavigate={handleNavigate} onLogin={() => { setIsLoggedIn(true); setActivePage("checkout"); }} />
          )}
          {!knownPages.includes(activePage) && (
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <p className="text-6xl mb-4">🚧</p>
                <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-slate-800"}`}>
                  Coming Soon!
                </h2>
                <p className={`text-sm mt-2 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                  This page is under construction
                </p>
                <button
                  onClick={() => handleNavigate("home")}
                  className="mt-4 px-5 py-2.5 bg-orange-500 text-white font-semibold rounded-xl"
                >
                  Go Home
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <Footer darkMode={darkMode} onNavigate={handleNavigate} />
      </div>
    </CartProvider>
  );
}