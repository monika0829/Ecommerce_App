import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/products/${id}/`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  
  const handleAddToCart = async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/cart/add/",
        { product_id: product.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAdded(true); // update UI

    } catch (err) {
      console.error(err.response?.data);
      alert("Error adding to cart");
    }
  };

  if (!product) return <h2 className="p-6">Loading...</h2>;

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded shadow grid grid-cols-2 gap-10">

        {/* IMAGE */}
        <img
          src={product.image}  
          alt={product.name}
          className="w-full h-96 object-contain"
        />

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-green-600 text-2xl font-semibold mt-3">
            ₹{product.price}
          </p>

          <p className="mt-4 text-gray-600 whitespace-pre-line">
            {product.description}
          </p>

          <button
            onClick={handleAddToCart}
            className={`mt-6 px-6 py-2 rounded font-semibold transition
              ${
                added
                  ? "bg-green-500 text-white"
                  : "bg-yellow-400 hover:bg-yellow-500"
              }`}
          >
            {added ? "✔ Added" : "+ Add to Cart"}
          </button>
        </div>

      </div>
    </div>
  );
}