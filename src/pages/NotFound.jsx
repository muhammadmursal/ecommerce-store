import { Home, ArrowLeft } from "lucide-react";

export default function NotFound({ onNavigate, darkMode }) {
  return (
    <div className={`flex items-center justify-center min-h-96 ${darkMode ? "bg-slate-900" : "bg-slate-50"}`}>
      <div className="text-center px-6">
        <div className="relative mb-6">
          <p className="text-9xl font-black text-orange-500 opacity-20 select-none">404</p>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-6xl">🔍</p>
          </div>
        </div>
        <h1 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-800"}`}>
          Page Not Found
        </h1>
        <p className={`text-sm mb-8 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          The page you are looking for doesn't exist.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all"
          >
            <Home className="w-4 h-4" />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}