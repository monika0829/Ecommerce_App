import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const login = async () => {
    if (!data.username || !data.password) {
      alert("Please enter username and password");
      return;
    }

    try {
      const res = await API.post("login/", data);

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("username", data.username);

      alert("Login Successful");

      
      navigate("/");

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);
      alert("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded shadow-md w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        {/* USERNAME */}
        <input
          className="w-full border p-2 mb-4 rounded"
          placeholder="Username"
          value={data.username}
          onChange={e =>
            setData({ ...data, username: e.target.value })
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          className="w-full border p-2 mb-4 rounded"
          placeholder="Password"
          value={data.password}
          onChange={e =>
            setData({ ...data, password: e.target.value })
          }
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={login}
          className="w-full bg-yellow-400 hover:bg-yellow-500 p-2 rounded font-semibold"
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;