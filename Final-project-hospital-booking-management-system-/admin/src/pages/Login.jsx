import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AdminContext } from "../context/adminContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { setAToken, backendUrl } = useContext(AdminContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });

    if (data.success) {
  localStorage.setItem("aToken", data.token);
  setAToken(data.token);
  getAllDoctors(data.token); // Fetch doctors immediately
  setMessage({ type: "success", text: "Login successful!" });
  setTimeout(() => navigate("/admin/dashboard"), 1000);
}

    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: error.response?.data?.message || "Something went wrong" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <form onSubmit={onSubmitHandler} className="bg-white shadow-2xl rounded-2xl px-8 py-10 w-[90%] max-w-md border border-gray-100">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Admin Login</h1>

        {message && (
          <div
            className={`mb-4 text-center px-4 py-2 rounded-lg text-sm font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
