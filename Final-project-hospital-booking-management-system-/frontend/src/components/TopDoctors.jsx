import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <div className="flex flex-col items-center gap-6 my-16 text-gray-900 md:mx-10">
      {/* Title */}
      <h1 className="text-3xl font-semibold text-center">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm text-gray-600">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Doctors Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-8 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="border border-blue-200 rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white"
          >
            {/* Doctor Image */}
            <div className="w-full h-56 bg-blue-50">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Doctor Info */}
            <div className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-green-500 mb-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      <button
        onClick={() => {
          navigate("/doctors");
          window.scrollTo(0, 0);
        }}
        className="mt-8 bg-primary text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-colors"
      >
        View More Doctors
      </button>
    </div>
  );
};

export default TopDoctors;







