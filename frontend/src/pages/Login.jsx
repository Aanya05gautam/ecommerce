
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
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
      setUser(data.user);

      navigate("/");
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Welcome back</h1>
            <p className="text-slate-500">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-lg text-sm font-medium flex items-center">
                <span className="mr-2">⚠️</span> {error}
              </div>
            )}

            <div className="space-y-4">
                {/* Email */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Email</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Mail size={18} />
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                            placeholder="Enter your email"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Lock size={18} />
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                            placeholder="••••••••"
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="ml-2 text-sm font-medium text-slate-600">Remember me</span>
              </label>
              <a href="#" className="text-sm font-bold text-indigo-600 hover:text-indigo-700">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-slate-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : "Sign in"}
            </button>

            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-slate-400 font-medium">Or continue with</span></div>
            </div>

            <button 
                type="button"
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl shadow-sm bg-white text-slate-700 text-sm font-bold hover:bg-slate-50 transition-all"
            >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
                Sign in with Google
            </button>

            <p className="text-center text-sm text-slate-500 mt-8">
              Don't have an account?{" "}
              <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-700">
                Sign up for free
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
            <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" 
                alt="Shopping" 
                className="w-full h-full object-cover opacity-60"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-16 text-white">
            <h2 className="text-4xl font-black mb-4 leading-tight">Curated style<br/>for modern living.</h2>
            <p className="text-lg text-slate-300 max-w-md">Join thousands of members who trust ShopHub for quality, reliability, and style.</p>
        </div>
      </div>
    </div>
  );
}