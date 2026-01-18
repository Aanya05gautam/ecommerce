import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingBag, ShoppingCart, User, LogOut, Menu, X, LogIn } from "lucide-react";

const Navbar = ({ cart, user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm" 
          : "bg-white border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with Animation */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <ShoppingBag size={20} strokeWidth={2.5} />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-white animate-pulse"></div>
            </div>

            <div className="flex flex-col">
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 leading-none">
                ShopHub
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Premium Store
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`text-sm font-bold transition-all duration-200 ${
                isActive("/") ? "text-indigo-600" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Home
            </Link>
            
            <Link 
              to="/cart" 
              className={`group flex items-center gap-2 text-sm font-bold transition-all duration-200 ${
                isActive("/cart") ? "text-indigo-600" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <div className="relative">
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                    {cart.length}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </Link>

            <div className="w-px h-6 bg-slate-200 mx-2"></div>

            {user ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-full hover:bg-slate-50 transition-colors group cursor-pointer border border-transparent hover:border-slate-200"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 text-indigo-600 flex items-center justify-center font-bold text-sm border border-indigo-200">
                    {user.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-bold text-slate-700 leading-none mb-1">{user.name || "User"}</p>
                    <p className="text-[10px] font-medium text-slate-400 leading-none">View Profile</p>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-black text-white rounded-full font-bold text-sm transition-all transform hover:scale-105 shadow-md hover:shadow-lg active:scale-95"
              >
                <LogIn size={16} />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-lg animate-in fade-in slide-in-from-top-2">
            <div className="p-4 space-y-2">
              <Link 
                to="/" 
                className={`block px-4 py-3 rounded-xl font-semibold transition-colors ${
                  isActive("/") ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              <Link 
                to="/cart" 
                className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-colors ${
                  isActive("/cart") ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Cart</span>
                {cart.length > 0 && (
                  <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>

              <div className="h-px bg-slate-100 my-2"></div>

              {user ? (
                <>
                  <div className="px-4 py-3">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                        {user.name ? user.name.charAt(0).toUpperCase() : <User size={20} />}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{user.name || "User"}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      to="/dashboard"
                      className="block w-full text-center px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 mb-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-sm font-bold hover:bg-rose-100 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn size={18} />
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
