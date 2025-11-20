import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-2xl flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-8 md:py-12 shadow-md overflow-hidden">
      
      {/* ---------- Left Section ---------- */}
      <div className="md:w-1/2 flex flex-col items-start gap-4 text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-bold leading-snug">
          Book an Appointment <br />
          with <span className="text-yellow-300">Trusted Doctors</span>
        </h1>

        <p className="text-sm md:text-base text-blue-100 leading-relaxed max-w-md">
          Find qualified doctors and book your appointments easily. Get reliable,
          friendly, and expert medical care right at your fingertips.
        </p>

        <div className="flex items-center gap-3 mt-2">
          <img
            className="w-24 drop-shadow-md"
            src={assets.group_profiles}
            alt="Doctors group"
          />
          <p className="text-xs text-blue-50">10,000+ patients served</p>
        </div>

        <a
          href="#speciality"
          className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-5 py-2 rounded-full mt-3 hover:bg-blue-100 transition-all duration-300 shadow-sm"
        >
          Book Appointment
          <img
            src={assets.arrow_icon}
            alt="Arrow icon"
            className="w-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>

      {/* ---------- Right Section ---------- */}
      <div className="relative md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
        <div className="absolute w-48 h-48 bg-blue-300 blur-3xl opacity-30 rounded-full -top-10 right-10 hidden md:block"></div>
        <img
          src={assets.header_img}
          alt="Doctor illustration"
          className="w-full max-w-sm md:max-w-md rounded-xl shadow-lg relative z-10"
        />
      </div>
    </header>
  );
};

export default Header;


