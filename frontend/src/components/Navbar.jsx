import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ cart, user, setUser }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo with Animation */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group hover:opacity-80 transition-all transform hover:scale-105"
          >
            {/* Logo Icon */}
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-slate-400/50 transition-all transform group-hover:rotate-6">
                <span className="text-2xl">🛍️</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>

            {/* Logo Text */}
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-900 leading-tight group-hover:text-slate-700 transition">
                ShopHub
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-700 transition">
                Premium Store
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-slate-700 hover:text-slate-900 font-semibold transition-colors relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <Link 
              to="/cart" 
              className="relative group"
            >
              <span className="text-slate-700 hover:text-slate-900 font-semibold transition-colors flex items-center gap-2 relative">
                Cart
                {cart.length > 0 && (
                  <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gradient-to-br from-red-500 to-red-600 rounded-full group-hover:from-red-600 group-hover:to-red-700 transition-all shadow-md animate-pulse">
                    {cart.length}
                  </span>
                )}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {user ? (
              <div className="flex items-center gap-4 border-l border-slate-200 pl-4">
                <div className="flex items-center gap-2 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-900 flex items-center justify-center text-white font-bold group-hover:shadow-lg transition-all transform group-hover:scale-110">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-slate-900 group-hover:text-slate-700 transition">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-2 px-4 py-2 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-black hover:to-slate-900 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-slate-100 rounded-lg transition"
          >
            <span className={`block w-6 h-0.5 bg-slate-900 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-slate-900 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-slate-900 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white py-4 space-y-3 animate-in fade-in slide-in-from-top-2">
            <Link 
              to="/" 
              className="block px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg font-semibold transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            <Link 
              to="/cart" 
              className="block px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg font-semibold transition relative"
              onClick={() => setIsMenuOpen(false)}
            >
              Cart 
              {cart.length > 0 && (
                <span className="inline-block ml-2 w-5 h-5 text-xs font-bold text-white bg-gradient-to-br from-red-500 to-red-600 rounded-full text-center leading-5">
                  {cart.length}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <div className="px-4 py-3 border-y border-slate-200 space-y-2">
                  <p className="font-semibold text-slate-900">{user.name}</p>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-semibold transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-lg font-semibold text-center transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
