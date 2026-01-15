import { useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, title: "Product 1", price: 100 },
    { id: 2, title: "Product 2", price: 200 }
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id} className="flex justify-between border-b py-2">
              <span>{item.title} - ${item.price}</span>
              <button 
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
