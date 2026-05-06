import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      alert("Login required");
      navigate("/login");
      return;
    }

    axios.get("http://127.0.0.1:8000/api/orders/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      setOrders(res.data);
    })
    .catch(err => {
      console.error(err);
      alert("Session expired, login again");
      localStorage.clear();
      navigate("/login");
    });

  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="bg-white p-4 mb-4 shadow rounded">
            <p><b>Order ID:</b> {order.id}</p>
            <p><b>Total:</b> ₹{order.total}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;