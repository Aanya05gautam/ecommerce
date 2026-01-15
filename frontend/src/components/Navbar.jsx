import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">E-Shop</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/cart" className="hover:text-gray-300">Cart</Link>
        <Link to="/login" className="hover:text-gray-300">Login</Link>
      </div>
    </nav>
  );
}
