import { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });

  const token = localStorage.getItem("access");

  const fetchCart = () => {
    axios.get("http://127.0.0.1:8000/api/cart/", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setCart(res.data))
    .catch(() => alert("Error loading cart"));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = (id, action) => {
    axios.post("http://127.0.0.1:8000/api/cart/update/",
      { item_id: id, action },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(fetchCart);
  };

  const removeItem = (id) => {
    axios.post("http://127.0.0.1:8000/api/cart/remove/",
      { item_id: id },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(fetchCart);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">My Cart</h1>

      {cart.items.map(item => (
        <div key={item.id} className="flex gap-4 bg-white p-4 mt-4 shadow rounded">

          <img
            src={`http://127.0.0.1:8000${item.image}`}
            className="w-24 h-24 object-contain"
          />

          <div className="flex-1">
            <h2>{item.product}</h2>
            <p>₹{item.price}</p>

            <div className="flex gap-2 mt-2">
              <button onClick={() => updateQty(item.id, "dec")}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQty(item.id, "inc")}>+</button>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 mt-2"
            >
              Remove
            </button>
          </div>

          <div>
            <p>₹{item.subtotal}</p>
          </div>
        </div>
      ))}

      <h2 className="mt-6 text-xl font-bold">
        Total: ₹{cart.total}
      </h2>

      <button className="bg-yellow-400 p-3 mt-4 rounded">
        Proceed to Checkout
      </button>
    </div>
  );
}



