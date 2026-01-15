import { useEffect, useState } from "react";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="text-center">
        <p className="text-red-600 text-2xl font-bold">❌ {error}</p>
      </div>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-slate-300 border-t-slate-900"></div>
        <p className="mt-6 text-2xl font-bold text-slate-700">Loading products...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 md:py-28">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-slate-700 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-700 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          {/* Logo Section */}
          <div className="mb-8 flex justify-center">
            <div className="bg-white rounded-2xl p-6 shadow-2xl border-4 border-white/10 backdrop-blur-sm">
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700">
                ShopHub
              </div>
              <p className="text-sm font-bold text-slate-600 mt-1 tracking-widest">PREMIUM PRODUCTS</p>
            </div>
          </div>

          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-black mb-4 leading-tight">
              Discover Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-white">
                Next Favorite
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto">
              Curated collection of premium products for modern living
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-8">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl text-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 shadow-2xl transition-all"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl text-slate-400">🔍</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-slate-900 mb-8">Explore Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-lg scale-105"
                    : "bg-white text-slate-900 border-2 border-slate-200 hover:border-slate-400 hover:shadow-md"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-2xl text-slate-600 font-semibold">No products found</p>
            <p className="text-slate-500 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-2xl font-bold text-slate-900">
                Showing <span className="text-slate-600">{filteredProducts.length}</span> products
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  onMouseEnter={() => setHoveredId(product._id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:border-slate-300 h-full flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-all duration-300"></div>
                    
                    {/* Category Badge */}
                    <span className="absolute top-4 right-4 bg-white text-slate-900 px-4 py-1 rounded-full text-xs font-bold shadow-md">
                      {product.category}
                    </span>

                    {/* Stock Badge */}
                    <span className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      In Stock
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-lg font-bold text-slate-900 line-clamp-2 mb-2 group-hover:text-slate-700 transition">
                      {product.title}
                    </h2>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-1">
                      {product.description}
                    </p>

                    {/* Price */}
                    <div className="mb-6 pt-4 border-t border-slate-200">
                      <p className="text-3xl font-black text-slate-900">
                        ${product.price}
                      </p>
                    </div>

                    {/* Button */}
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-slate-900 hover:bg-black text-white py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                    >
                      {hoveredId === product._id ? "✓ Add to Cart" : "Add to Cart"}
                    </button>
                  </div>

                  {/* Corner Detail */}
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-slate-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-tl-2xl"></div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer Section */}
      <div className="bg-slate-900 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Why Shop With Us</h3>
              <ul className="space-y-2 text-slate-300">
                <li>✓ Premium Quality Products</li>
                <li>✓ Fast & Free Shipping</li>
                <li>✓ 30-Day Money Back Guarantee</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Customer Support</h3>
              <ul className="space-y-2 text-slate-300">
                <li>24/7 Help Center</li>
                <li>Live Chat Support</li>
                <li>Email: support@shophub.com</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <ul className="space-y-2 text-slate-300">
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Twitter</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
            <p>&copy; 2026 ShopHub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;