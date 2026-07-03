import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Store } from "lucide-react";

export default function Login({ darkMode, onNavigate, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 const validUsers = [
  { email: "admin@shopzone.com", password: "admin123" },
  { email: "sara@shopzone.com", password: "sara123" },
  { email: "ahmed@shopzone.com", password: "ahmed123" },
  { email: "fatima@shopzone.com", password: "fatima123" },
];

const handleLogin = () => {
  setError("");
  if (!email || !password) {
    setError("Please fill in all fields.");
    return;
  }
  setLoading(true);
  setTimeout(() => {
    const matchedUser = validUsers.find(
      (user) => user.email === email && user.password === password
    );
    if (matchedUser) {
      onLogin();
      onNavigate("home");
    } else {
      setError("Invalid email or password!");
      setLoading(false);
    }
  }, 1000);
};

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${darkMode ? "bg-slate-900" : "bg-slate-50"}`}>
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl mb-4 shadow-lg shadow-orange-500/30">
            <Store className="w-8 h-8 text-white" />
          </div>
          <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-800"}`}>Welcome back</h1>
          <p className={`text-sm mt-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Sign in to ShopZone</p>
        </div>

        {/* Card */}
        <div className={`rounded-3xl shadow-xl p-8 border ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className={`text-sm font-semibold block mb-1.5 ${darkMode ? "text-white" : "text-slate-700"}`}>Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@shopzone.com"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-orange-500 ${darkMode ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400" : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"}`}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className={`text-sm font-semibold block mb-1.5 ${darkMode ? "text-white" : "text-slate-700"}`}>Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`w-full pl-10 pr-12 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-orange-500 ${darkMode ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400" : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/30 text-sm"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Demo Credentials */}
          <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-500 mt-4">
            <p className="font-semibold mb-1">Demo Accounts:</p>
             <p>admin@shopzone.com / admin123</p>
            <p>sara@shopzone.com / sara123</p>
            <p>ahmed@shopzone.com / ahmed123</p>
            <p>fatima@shopzone.com / fatima123</p>
</div>

          <p className={`text-center text-sm mt-5 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            Don't have an account?{" "}
            <button onClick={() => onNavigate("register")} className="text-orange-500 font-semibold hover:text-orange-600">
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}