import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/adminContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
  };

  return (
    <nav className="flex items-center justify-between bg-white shadow-md px-6 py-4 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <img src={assets.admin_logo} alt="Logo" className="w-16 h-16 object-contain" />
      </div>

      <div className="flex items-center gap-4">
        {aToken && (
          <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-medium hover:bg-blue-200 cursor-pointer transition duration-300">
            Admin
          </span>
        )}
        <button
          onClick={logout}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

