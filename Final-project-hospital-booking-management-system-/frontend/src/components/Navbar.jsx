import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { patient, setPatient } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const logout = () => {
    setPatient(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-300">
      <img onClick={() => navigate("/")} src={assets.logo} className="w-36 sm:w-44 cursor-pointer" />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">HOME</NavLink>
        <NavLink to="/doctors">ALL DOCTORS</NavLink>
        <NavLink to="/about">ABOUT</NavLink>
        <NavLink to="/contact">CONTACT</NavLink>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {patient ? (
          <div className="relative">
            <img
              className="w-8 rounded-full cursor-pointer"
              src={assets.profile_pic}
              alt="Profile"
              onClick={() => setShowDropdown(!showDropdown)}
            />

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg flex flex-col gap-2 p-3 z-50">
                <p className="cursor-pointer hover:text-blue-600" onClick={() => navigate("/my-profile")}>
                  My Profile
                </p>
                <p className="cursor-pointer hover:text-blue-600" onClick={() => navigate("/my-appointments")}>
                  My Appointments
                </p>
                <p className="cursor-pointer hover:text-red-600" onClick={logout}>
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            className="bg-primary text-white px-4 py-2 rounded-full"
            onClick={() => navigate("/login")}
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
