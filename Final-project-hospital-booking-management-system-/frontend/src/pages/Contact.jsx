import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-white text-gray-800">
      {/* Header */}
      <div className="text-center py-10 px-4">
        <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
          CONTACT <span className="text-blue-700">US</span>
        </p>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-sm md:text-base">
          Have questions or need assistance? We're here to help. Reach out to
          us anytime — our team will get back to you as soon as possible.
        </p>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-16 py-10">
        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <div className="w-full max-w-md md:max-w-lg overflow-hidden rounded-3xl shadow-lg border border-gray-100">
            <img
              src={assets.contact_image}
              alt="Contact"
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <p className="text-2xl md:text-3xl font-semibold text-blue-700">
            Get in Touch with Us
          </p>

          <p className="text-gray-600 leading-relaxed">
            Whether you have inquiries, feedback, or partnership ideas, we’d
            love to hear from you. Our support team is always ready to assist.
          </p>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-4">
            <p>
              📍 <b>Address:</b> Nairobi, Kenya
            </p>
            <p>
              📧 <b>Email:</b> support@docease.com
            </p>
            <p>
              ☎️ <b>Phone:</b> +254 700 000 000
            </p>
            <p>
              🕒 <b>Working Hours:</b> Mon - Fri, 8:00 AM - 6:00 PM
            </p>
            <p>
              💬 <b>Support:</b> 24/7 Live Chat Available
            </p>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-full shadow-md transition-transform transform hover:scale-105">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
