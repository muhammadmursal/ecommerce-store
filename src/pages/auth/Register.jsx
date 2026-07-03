import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Store } from "lucide-react";

export default function Register({ darkMode, onNavigate }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleRegister = () => {
    setError("");
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match!");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => onNavigate("login"), 1500);
    }, 1000);
  };

  const card = darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100";
  const inputClass = darkMode
    ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
    : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400";

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${darkMode ? "bg-slate-900" : "bg-slate-50"}`}>
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl mb-4 shadow-lg shadow-orange-500/30">
            <Store className="w-8 h-8 text-white" />
          </div>
          <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-800"}`}>Create account</h1>
          <p className={`text-sm mt-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Join ShopZone today</p>
        </div>

        {/* Card */}
        <div className={`rounded-3xl shadow-xl p-8 border ${card}`}>

          {success ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className={`font-semibold ${darkMode ? "text-white" : "text-slate-800"}`}>Account created!</p>
              <p className={`text-sm mt-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Redirecting to login...</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
                  {error}
                </div>
              )}

              {/* Name */}
              <div className="mb-4">
                <label className={`text-sm font-semibold block mb-1.5 ${darkMode ? "text-white" : "text-slate-700"}`}>Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Muhammad Mursal"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-orange-500 ${inputClass}`}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className={`text-sm font-semibold block mb-1.5 ${darkMode ? "text-white" : "text-slate-700"}`}>Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@example.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-orange-500 ${inputClass}`}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className={`text-sm font-semibold block mb-1.5 ${darkMode ? "text-white" : "text-slate-700"}`}>Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={update("password")}
                    placeholder="Min 6 characters"
                    className={`w-full pl-10 pr-12 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-orange-500 ${inputClass}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-5">
                <label className={`text-sm font-semibold block mb-1.5 ${darkMode ? "text-white" : "text-slate-700"}`}>Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={form.confirm}
                    onChange={update("confirm")}
                    placeholder="Repeat your password"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-orange-500 ${inputClass}`}
                  />
                </div>
              </div>

              {/* Button */}
              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/30 text-sm"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>

              <p className={`text-center text-sm mt-5 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                Already have an account?{" "}
                <button onClick={() => onNavigate("login")} className="text-orange-500 font-semibold hover:text-orange-600">
                  Sign in
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}