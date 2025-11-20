// src/pages/Login.jsx
import React, { useState, useContext, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { registerPatient, loginPatient, patient } = useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (patient) navigate("/");
  }, [patient, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "Sign Up" && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formData = { name, phone, email, password };

    try {
      if (state === "Sign Up") {
        await registerPatient(formData);
        setState("Login");
      } else {
        const res = await loginPatient({ email, password });
        if (res) navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-white px-4 py-10">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-gray-200"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-3xl font-bold text-blue-600">
            {state === "Sign Up" ? "Create Account" : "Welcome Back"}
          </p>
          <p className="text-gray-500 mt-2 text-sm">
            {state === "Sign Up"
              ? "Please sign up to book your appointment"
              : "Login to continue booking your appointments"}
          </p>
        </div>

        {/* Full Name */}
        {state === "Sign Up" && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        )}

        {/* Phone */}
        {state === "Sign Up" && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <span
            className="absolute right-3 top-3 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password */}
        {state === "Sign Up" && (
          <div className="mb-6 relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <span
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition duration-300"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Toggle */}
        <p className="text-center text-sm text-gray-600 mt-4">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-600 font-bold cursor-pointer hover:underline"
                onClick={() => setState("Login")}
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                className="text-blue-600 font-bold cursor-pointer hover:underline"
                onClick={() => setState("Sign Up")}
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
