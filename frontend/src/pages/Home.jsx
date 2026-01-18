
import { useEffect, useState } from "react";
import { Search, ShoppingBag, ArrowRight, Heart, Filter, Star, Zap, Timer } from "lucide-react";
import SpinWheel from "../components/SpinWheel";

const Home = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/products");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  let filteredProducts = products.filter((p) =>
    selectedCategory === "All" ? true : p.category === selectedCategory
  );
  
  filteredProducts = filteredProducts.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-rose-100 max-w-md w-full">
        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-500">
           <Filter size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Connection Error</h3>
        <p className="text-slate-500 mb-6">{error}</p>
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-black transition">Retry</button>
      </div>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="inline-block animate-spin text-indigo-600 mb-4">
            <ShoppingBag size={48} />
        </div>
        <p className="text-lg font-bold text-slate-600 animate-pulse">Curating products...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
        <div className="absolute inset-0 overflow-hidden">
            <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" 
                alt="Fashion Background" 
                className="w-full h-full object-cover opacity-20" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center rounded-ull bg-indigo-500/10 px-3 py-1 text-sm font-semibold text-indigo-400 ring-1 ring-inset ring-indigo-500/20 mb-6 backdrop-blur-sm rounded-full">
            New Collection 2026. Available Now.
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Lifestyle</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
            Discover a curated collection of premium products designed for modern living. Quality, style, and innovation in every piece.
          </p>
          
          {/* Search Bar */}
          <div className="mt-10 max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-indigo-500 opacity-20 blur-xl rounded-2xl group-hover:opacity-30 transition-opacity"></div>
              <div className="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 shadow-2xl">
                <Search className="text-slate-400 ml-4" size={24} />
                <input
                  type="text"
                  placeholder="Search for products, categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border-none text-white placeholder-slate-400 focus:ring-0 text-lg px-4 py-3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <SpinWheel />

      {/* Special Offer Banner */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 overflow-hidden shadow-lg border-y border-white/10">
         <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
             <div className="flex items-center gap-3">
                 <div className="p-2 bg-white/20 rounded-lg animate-pulse">
                     <Zap size={20} fill="currentColor" />
                 </div>
                 <div>
                     <p className="font-bold text-lg leading-tight">Flash Sale Ending Soon!</p>
                     <p className="text-xs text-rose-100 font-medium opacity-90">Get 50% off select premium items</p>
                 </div>
             </div>
             
             <div className="hidden md:flex items-center gap-6 font-mono font-bold text-xl tracking-widest">
                 <div className="flex flex-col items-center"><span>02</span><span className="text-[10px] font-sans font-normal opacity-70">HRS</span></div>
                 <span>:</span>
                 <div className="flex flex-col items-center"><span>45</span><span className="text-[10px] font-sans font-normal opacity-70">MIN</span></div>
                 <span>:</span>
                 <div className="flex flex-col items-center"><span>12</span><span className="text-[10px] font-sans font-normal opacity-70">SEC</span></div>
             </div>

             <button className="bg-white text-rose-600 px-6 py-2 rounded-full font-bold text-sm hover:bg-rose-50 hover:scale-105 transition-all shadow-md">
                 Shop Now
             </button>
         </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
                <h2 className="text-3xl font-bold text-slate-900">Recommended For You</h2>
                <p className="text-slate-500 mt-1">Handpicked items based on current trends.</p>
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
                {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    selectedCategory === cat
                        ? "bg-slate-900 text-white shadow-lg transform scale-105"
                        : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                >
                    {cat}
                </button>
                ))}
            </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No products found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search terms or filters.</p>
            <button 
                onClick={() => {setSearchTerm(""); setSelectedCategory("All");}}
                className="mt-6 text-indigo-600 font-bold hover:underline"
            >
                Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                onMouseEnter={() => setHoveredId(product._id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative flex flex-col h-full"
              >
                {/* Image Card */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-100 mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-white/95 backdrop-blur-sm text-slate-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {product.category}
                    </span>
                  </div>

                  {/* Floating Action Button */}
                  <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <button className="bg-white text-rose-500 p-3 rounded-full shadow-lg hover:bg-rose-50 hover:scale-110 transition-transform">
                          <Heart size={20} />
                      </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                        {product.title}
                    </h3>
                    <div className="flex items-center text-amber-400 text-xs font-bold gap-1 bg-amber-50 px-1.5 py-0.5 rounded">
                        <Star size={12} fill="currentColor" />
                        4.8
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">
                    {product.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-4">
                     <p className="text-xl font-bold text-slate-900">${product.price}</p>
                     
                     {/* Dynamic quantity or Add button */}
                     {cart.filter(p => p._id === product._id).length > 0 ? (
                        <div className="flex items-center bg-slate-900 rounded-full p-1" >
                            <button
                                onClick={() => {
                                    const index = cart.findIndex(p => p._id === product._id);
                                    if (index !== -1) {
                                        const newCart = [...cart];
                                        newCart.splice(index, 1);
                                        setCart(newCart);
                                    }
                                }}
                                className="w-8 h-8 flex items-center justify-center bg-transparent text-white hover:bg-white/20 rounded-full transition font-medium"
                            >
                                -
                            </button>
                            <span className="w-6 text-center text-white font-bold text-sm">
                                {cart.filter(p => p._id === product._id).length}
                            </span>
                            <button
                                onClick={() => addToCart(product)}
                                className="w-8 h-8 flex items-center justify-center bg-white text-slate-900 rounded-full hover:bg-slate-200 transition font-medium"
                            >
                                +
                            </button>
                        </div>
                     ) : (
                        <button
                            onClick={() => addToCart(product)}
                            className="bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-900 px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 group/btn"
                        >
                            <ShoppingBag size={16} />
                            Add
                        </button>
                     )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;