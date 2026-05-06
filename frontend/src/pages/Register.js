import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    phone:"",
  });

  const navigate = useNavigate();

  const register = async () => {
    try {
      const res=  await API.post("register/", data);
      console.log("SUCCESS:", res.data);
      alert("Account Created");
      navigate("/login");

    } catch (err) {
      alert("Error creating account");
      console.log("ERROR:", err.response.data); 
      alert(JSON.stringify(err.response.data)); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded shadow-md w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <input
          className="w-full border p-2 mb-4 rounded"
          placeholder="Username"
          onChange={e => setData({...data, username: e.target.value})}
        />

        <input
          className="w-full border p-2 mb-4 rounded"
          placeholder="Email"
          onChange={e => setData({...data, email: e.target.value})}
        />

        <input
          type="password"
          className="w-full border p-2 mb-4 rounded"
          placeholder="Password"
          onChange={e => setData({...data, password: e.target.value})}
        />
        <input
          className="w-full border p-2 mb-4 rounded"
          placeholder="Phone"
          onChange={e => setData({...data, phone: e.target.value})}
        />  
        <button
          onClick={register}
          className="w-full bg-yellow-400 hover:bg-yellow-500 p-2 rounded font-semibold"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Register;