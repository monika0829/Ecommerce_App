import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [addedItems, setAddedItems] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const search = query.get("search") || "";

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((res) => {
        let data = res.data;
        if (search) {
          data = data.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
          );
        }

        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, [search]);

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("access");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/cart/add/",
        { product_id: productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAddedItems((prev) => ({
        ...prev,
        [productId]: true,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/product/${p.id}`)}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
          >
            {/* IMAGE */}
            <img
              src={p.image.startsWith("http") ? p.image : `http://127.0.0.1:8000${p.image}`}
              alt={p.name}
              className="h-40 w-full object-contain"
            />
            <h2 className="font-semibold mt-2">{p.name}</h2>
            <p className="text-green-600 font-bold">₹{p.price}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(p.id);
              }}
              className={`mt-3 w-full p-2 rounded font-semibold transition
                ${
                  addedItems[p.id]
                    ? "bg-green-500 text-white"
                    : "bg-yellow-400 hover:bg-yellow-500"
                }`}
            >
              {addedItems[p.id] ? "✔ Added" : "+ Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}