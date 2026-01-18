import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Ticket, Check } from "lucide-react";

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState(
    cart.reduce((acc, item, idx) => ({ ...acc, [idx]: 1 }), {})
  );
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const applyCoupon = () => {
    if (!coupon) return;
    const code = coupon.toUpperCase();
    
    // Simulate API check
    const validCoupons = {
        'SAVE10': 0.10,
        'SAVE15': 0.15,
        'SAVE20': 0.20,
        'SAVE5': 0.05,
        'FREESHIP': 'FS'
    };

    if (validCoupons[code]) {
        setAppliedCoupon({ code, value: validCoupons[code] });
        if (validCoupons[code] === 'FS') {
           setDiscount(0); // Handled in shipping logic
        } else {
           const sub = calculateSubtotal();
           setDiscount(sub * validCoupons[code]);
        }
    } else {
        alert("Invalid coupon code");
    }
  };

  const removeCoupon = () => {
      setAppliedCoupon(null);
      setDiscount(0);
      setCoupon("");
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity > 0) {
      setQuantities({ ...quantities, [index]: newQuantity });
    }
  };

  const removeItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
    const newQuantities = { ...quantities };
    delete newQuantities[index];
    setQuantities(newQuantities);
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item, idx) => sum + item.price * (quantities[idx] || 1), 0);
  };

  const subtotal = calculateSubtotal();
  // Recalculate discount if items changed
  const currentDiscount = appliedCoupon && appliedCoupon.value !== 'FS' ? subtotal * appliedCoupon.value : 0;
  
  const tax = (subtotal - currentDiscount) * 0.1;
  const shipping = (subtotal - currentDiscount) > 100 || (appliedCoupon && appliedCoupon.value === 'FS') ? 0 : 10;
  const total = subtotal - currentDiscount + tax + shipping;

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      setCart([]);
      setQuantities({});
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-bounce">🛒</div>
          <h1 className="text-5xl font-black text-slate-900 mb-4">Your Cart is Empty</h1>
          <p className="text-slate-600 text-xl mb-8 max-w-md">
            Discover amazing products and start your shopping journey today
          </p>
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-slate-800 to-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-slate-400/30 transition-all transform hover:scale-105 hover:-translate-y-1"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black text-slate-900 mb-3">Shopping Cart</h1>
          <div className="flex items-center gap-3">
            <div className="h-1 w-20 bg-gradient-to-r from-slate-400 to-slate-600 rounded-full"></div>
            <p className="text-slate-600 text-lg">
              <span className="font-bold text-slate-900">{cart.length}</span> item{cart.length !== 1 ? 's' : ''} in your cart
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-400 shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Image */}
                    <div className="sm:w-32 sm:h-32 w-full h-40 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      
                      {/* Category Badge */}
                      <div className="mb-4">
                        <span className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold border border-slate-300">
                          {item.category}
                        </span>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <span className="text-slate-600 font-medium">Qty:</span>
                          <div className="flex items-center border border-slate-300 rounded-lg bg-slate-50">
                            <button
                              onClick={() => updateQuantity(index, (quantities[index] || 1) - 1)}
                              className="px-4 py-2 hover:bg-slate-200 transition font-semibold text-slate-700"
                            >
                              −
                            </button>
                            <span className="px-4 font-bold text-slate-900 border-l border-r border-slate-300">
                              {quantities[index] || 1}
                            </span>
                            <button
                              onClick={() => updateQuantity(index, (quantities[index] || 1) + 1)}
                              className="px-4 py-2 hover:bg-slate-200 transition font-semibold text-slate-700"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div>
                            <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider mb-1">Unit Price</p>
                            <p className="text-xl font-bold text-slate-900">
                              ${item.price}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider mb-1">Total</p>
                            <p className="text-2xl font-bold text-slate-900">
                              ${(item.price * (quantities[index] || 1)).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(index)}
                      className="self-start sm:self-center px-4 py-2 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 rounded-lg font-semibold transition-all transform hover:scale-110"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <Link
              to="/"
              className="inline-block mt-8 bg-slate-100 hover:bg-slate-200 text-slate-900 px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 border border-slate-300"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm sticky top-24 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Order Summary</h2>

              <div className="space-y-3">
                {/* Subtotal */}
                <div className="flex justify-between text-slate-600 pb-3 border-b border-slate-200">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>

                {appliedCoupon && appliedCoupon.value !== 'FS' && (
                    <div className="flex justify-between text-emerald-600 pb-3 border-b border-slate-200">
                        <span className="font-medium">Discount ({appliedCoupon.value * 100}%)</span>
                        <span className="font-semibold">-${currentDiscount.toFixed(2)}</span>
                    </div>
                )}

                {/* Tax */}
                <div className="flex justify-between text-slate-600 pb-3 border-b border-slate-200">
                  <span className="font-medium">Tax (10%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between text-slate-600 pb-3 border-b border-slate-200">
                  <span className="font-medium">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-emerald-600 font-bold">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                {/* Shipping Hint */}
                {shipping > 0 && (
                  <p className="text-xs text-slate-600 bg-slate-100 p-3 rounded-lg border border-slate-200">
                    💡 Add ${(100 - (subtotal - currentDiscount)).toFixed(2)} more for free shipping
                  </p>
                )}

                {/* Coupon Input */}
                <div className="pt-2">
                    {!appliedCoupon ? (
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                                placeholder="Coupon Code"
                                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase"
                            />
                            <button 
                                onClick={applyCoupon}
                                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-black transition"
                            >
                                Apply
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
                            <div className="flex items-center gap-2 text-emerald-700">
                                <Ticket size={16} />
                                <span className="font-bold text-sm tracking-wide">{appliedCoupon.code} Applied</span>
                            </div>
                            <button 
                                onClick={removeCoupon}
                                className="text-xs font-bold text-red-500 hover:text-red-700 underline"
                            >
                                Remove
                            </button>
                        </div>
                    )}
                </div>
              </div>

              {/* Total */}
              <div className="pt-4 border-t-2 border-slate-300">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900">Total</span>
                  <span className="text-4xl font-black text-slate-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button 
                onClick={() => navigate('/checkout', { state: { total } })}
                className="w-full bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                Proceed to Checkout
              </button>

              {/* Clear Cart Button */}
              <button
                onClick={clearCart}
                className="w-full bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 py-3 rounded-xl font-semibold transition-all border border-slate-300"
              >
                Clear Cart
              </button>

              {/* Benefits */}
              <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
                <div className="flex items-center gap-3 text-slate-600">
                  <span className="text-lg">✓</span>
                  <span className="text-sm font-medium">Secure Checkout</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <span className="text-lg">→</span>
                  <span className="text-sm font-medium">Fast & Free Shipping</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <span className="text-lg">↻</span>
                  <span className="text-sm font-medium">30-Day Easy Returns</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <span className="text-lg">✎</span>
                  <span className="text-sm font-medium">Money Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
