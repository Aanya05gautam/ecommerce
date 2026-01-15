import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12 px-6 text-center">
            <div className="text-5xl mb-4">🔐</div>
            <h1 className="text-3xl font-black mb-2">Welcome Back</h1>
            <p className="text-slate-300">Sign in to your ShopHub account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                <span className="text-red-600 text-xl mt-0.5">⚠️</span>
                <p className="text-red-700 font-semibold">{error}</p>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition placeholder-slate-400"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl">✉️</span>
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition placeholder-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900 transition font-semibold text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-2 border-slate-300 rounded cursor-pointer"
                />
                <span className="text-slate-700 group-hover:text-slate-900 transition">
                  Remember me
                </span>
              </label>
              <Link
                to="#"
                className="text-slate-600 hover:text-slate-900 font-semibold transition"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-black hover:to-slate-900 text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block animate-spin">⏳</span>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="text-slate-500 text-sm font-semibold">OR</span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-xl py-3 font-semibold text-slate-700 transition flex items-center justify-center gap-2"
              >
                <span>🔵</span> Google
              </button>
              <button
                type="button"
                className="border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-xl py-3 font-semibold text-slate-700 transition flex items-center justify-center gap-2"
              >
                <span>📘</span> Facebook
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="bg-slate-50 border-t border-slate-200 px-8 py-6 text-center">
            <p className="text-slate-700">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-slate-900 hover:text-slate-700 transition"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex items-center justify-center gap-6 text-slate-600 text-sm">
          <div className="flex items-center gap-1">
            <span className="text-lg">🔒</span>
            <span>Secure Login</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg">✓</span>
            <span>SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg">⚡</span>
            <span>Fast Access</span>
          </div>
        </div>
      </div>
    </div>
  );
}