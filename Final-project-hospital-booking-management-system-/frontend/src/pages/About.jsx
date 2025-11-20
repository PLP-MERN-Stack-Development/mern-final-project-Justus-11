import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-white text-gray-800">
      {/* Header */}
      <div className="text-center py-10 px-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-3">
          About Us
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          Learn more about who we are, our mission, and why we’re dedicated to
          improving healthcare access for everyone.
        </p>
      </div>

      {/* About Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-16 py-10">
        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <div className="w-full max-w-md md:max-w-lg overflow-hidden rounded-3xl shadow-lg border border-gray-100">
            <img
              src={assets.about_image}
              alt="About Us"
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Text */}
        <div className="md:w-1/2 space-y-5 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-700">
            Dedicated to Better Healthcare
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our platform connects patients with trusted healthcare professionals
            across multiple specialities. We make booking doctor appointments
            seamless, secure, and accessible — empowering you to take charge of
            your health from anywhere, anytime.
          </p>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <b className="text-lg text-blue-600">Our Vision</b>
            <p className="text-gray-600 mt-2 text-sm md:text-base leading-relaxed">
              To revolutionize the way people access healthcare by bridging the
              gap between doctors and patients through technology, trust, and
              transparency. We envision a world where healthcare is just one tap
              away — for everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-16 px-6 md:px-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "💬",
              title: "24/7 Support",
              desc: "Get round-the-clock support from our healthcare experts whenever you need assistance or information.",
            },
            {
              icon: "⚕️",
              title: "Trusted Specialists",
              desc: "We partner only with certified, experienced doctors across a wide range of specialities to ensure reliable care.",
            },
            {
              icon: "📅",
              title: "Easy Appointments",
              desc: "Book and manage your appointments easily through our intuitive platform — no long queues or paperwork.",
            },
            {
              icon: "🔒",
              title: "Secure Platform",
              desc: "Your privacy is our top priority. All your health information is encrypted and securely stored.",
            },
            {
              icon: "💡",
              title: "Innovative Technology",
              desc: "We integrate modern tools like online consultations and health tracking for a better experience.",
            },
            {
              icon: "🌍",
              title: "Global Reach",
              desc: "Access healthcare services from certified doctors wherever you are, without geographical limits.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="text-blue-600 text-4xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;

