import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

function Navbar({ search, setSearch }) {
  const navigate = useNavigate();
  

  const token = localStorage.getItem("access");
  const username = localStorage.getItem("username");

  //  Handle Orders Click
  const handleOrders = () => {
    if (!token) {
      alert("Please login first");
      navigate("/login");
    } else {
      navigate("/orders");
    }
  };

  //  Logout
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-black text-white px-6 py-3 flex items-center justify-between">

      {/* LOGO */}
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        ShopX
      </h1>

      {/* SEARCH BAR */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-1/3 p-2 rounded text-black"
        placeholder="Search products..."
      />

      {/* MENU */}
      <div className="flex items-center gap-4">

        <Link to="/" className="hover:text-yellow-400">
          Products
        </Link>

        <Link to="/cart" className="hover:text-yellow-400">
          Cart
        </Link>

        {token ? (
          <>
            {/* ORDERS */}
            <button
              onClick={handleOrders}
              className="hover:text-yellow-400"
            >
              My Orders
            </button>

            {/* USER NAME */}
            <span className="text-yellow-300">
              👤 {username || "User"}
            </span>

            {/* LOGOUT */}
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-yellow-400">
              Login
            </Link>

            <Link to="/register" className="hover:text-yellow-400">
              Register
            </Link>
          </>
          
        )}
      </div>
    </div>
  );
}

export default Navbar;