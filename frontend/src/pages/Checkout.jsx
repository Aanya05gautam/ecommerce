
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";

// Replace with your actual Publishable Key
const stripePromise = loadStripe("pk_test_sample_key_replace_me");

const MockPaymentForm = ({ amount, onSuccess }) => {
  const [activeTab, setActiveTab] = useState("card");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
    upiId: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Simple formatting for card number
    if (name === "cardNumber") {
        const formatted = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
        setFormData({ ...formData, [name]: formatted });
    } else {
        setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex mb-6 border-b border-slate-200">
        <button
          className={`flex-1 pb-3 font-semibold text-sm transition-colors ${
            activeTab === "card"
              ? "text-slate-900 border-b-2 border-slate-900"
              : "text-slate-500 hover:text-slate-700"
          }`}
          onClick={() => setActiveTab("card")}
        >
          💳 Credit/Debit Card
        </button>
        <button
          className={`flex-1 pb-3 font-semibold text-sm transition-colors ${
            activeTab === "upi"
              ? "text-slate-900 border-b-2 border-slate-900"
              : "text-slate-500 hover:text-slate-700"
          }`}
          onClick={() => setActiveTab("upi")}
        >
          📱 UPI
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {activeTab === "card" ? (
          <>
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="0000 0000 0000 0000"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition font-mono"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Expiry</label>
                  <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">CVC</label>
                  <input
                    type="text"
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleChange}
                    placeholder="123"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition font-mono"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Cardholder Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
                  required
                />
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-4 animate-in fade-in py-4">
            <div>
               <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">UPI ID</label>
               <input
                 type="text"
                 name="upiId"
                 value={formData.upiId}
                 onChange={handleChange}
                 placeholder="username@bank"
                 className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
                 required
               />
               <p className="text-xs text-slate-500 mt-2">Enter your Virtual Payment Address (VPA)</p>
            </div>
            <div className="flex gap-2 justify-center py-4">
                <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600">GPay</span>
                <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600">PhonePe</span>
                <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600">Paytm</span>
            </div>
          </div>
        )}

        <button 
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all transform hover:scale-105 active:scale-95 disabled:bg-slate-400 disabled:cursor-not-allowed shadow-lg mt-6"
        >
            {loading ? (
                <span className="flex items-center justify-center gap-2">
                    <span className="inline-block animate-spin">⏳</span>
                    Processing Payment...
                </span>
            ) : (
                `Pay $${amount.toFixed(2)}`
            )}
        </button>
        <p className="text-center text-xs text-slate-400 mt-4">
            🔒 This is a secure simulation environment
        </p>
      </form>
    </div>
  );
};

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard`,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment succeeded!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      setMessage("Unexpected state.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement id="payment-element" />
      <button 
        disabled={isProcessing || !stripe || !elements} 
        id="submit"
        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed shadow-lg"
      >
        <span id="button-text">
          {isProcessing ? "Processing..." : `Pay $${amount.toFixed(2)}`}
        </span>
      </button>
      {message && (
        <div id="payment-message" className="bg-red-50 text-red-600 p-4 rounded-lg text-sm font-semibold border border-red-100">
          {message}
        </div>
      )}
    </form>
  );
};

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [isMock, setIsMock] = useState(false); // New state for mock mode
  const location = useLocation();
  const navigate = useNavigate();
  const { total } = location.state || { total: 0 };
  const [error, setError] = useState(null);

  useEffect(() => {
    if (total > 0) {
      const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");
      fetch(`${API_URL}/api/payment/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(total * 100) }),
      })
        .then(async (res) => {
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Failed to initialize payment");
            }
            return res.json();
        })
        .then((data) => {
            if (data.mock) {
                setIsMock(true); // Enable mock mode
            }
            setClientSecret(data.clientSecret);
        })
        .catch((err) => setError(err.message));
    }
  }, [total]);

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#0f172a',
    },
  };
  const options = {
    clientSecret,
    appearance,
  };
  
  const handleMockSuccess = () => {
      alert("Payment Successful! (Simulation)");
      navigate("/dashboard");
  };

  if (!location.state) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
             <div className="text-center">
                <p className="text-xl mb-4">No order details found.</p>
                <a href="/" className="text-indigo-600 font-bold">Return Home</a>
             </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 mb-8 text-center">Secure Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-fit sticky top-8">
                <h2 className="text-xl font-bold mb-6 text-slate-800">Order Summary</h2>
                <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-slate-600">
                        <span>Total Amount</span>
                        <span className="font-bold text-slate-900 text-xl">${total.toFixed(2)}</span>
                    </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600">
                    <p className="flex items-center gap-2">
                        <span>🔒</span> SSL Encrypted Payment
                    </p>
                </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
                {error ? (
                     <div className="text-center py-8">
                        <div className="text-4xl mb-4">⚠️</div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Payment Setup Failed</h3>
                        <p className="text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 mb-4">{error}</p>
                    </div>
                ) : isMock ? (
                    // Render Mock Form
                    <MockPaymentForm amount={total} onSuccess={handleMockSuccess} />
                ) : clientSecret ? (
                    // Render Stripe Form
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm amount={total} />
                    </Elements>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-slate-900 mb-4"></div>
                        <p className="font-semibold text-slate-600">Initializing secure payment...</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
