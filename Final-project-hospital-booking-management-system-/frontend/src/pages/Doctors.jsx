import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { doctors } from "../assets/assets";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();
  const { docters } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const categories = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterlogist",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-white py-10 px-4 md:px-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text mb-3">
          Browse Doctors by Speciality
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Choose a speciality and find top-rated doctors ready to assist you.
        </p>
      </div>

      {/* Responsive Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar (turns horizontal on mobile) */}
        <aside className="md:w-1/4 bg-white rounded-2xl shadow-md border border-gray-100 p-4 md:p-5 h-fit">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 hidden md:block">
            Specialities
          </h2>

          {/* Mobile Scrollable Categories */}
          <div className="flex md:flex-col gap-3 overflow-x-auto scrollbar-hide md:overflow-visible">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  speciality === cat
                    ? navigate("/doctors")
                    : navigate(`/doctors/${cat}`)
                }
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  speciality === cat
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                    : "bg-gray-50 text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        {/* Doctors Grid */}
        <section className="flex-1">
          {filterDoc.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filterDoc.map((item, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/appointment/${item._id}`)}
                  className="bg-white border border-gray-100 rounded-3xl shadow-lg hover:shadow-2xl cursor-pointer transform hover:-translate-y-2 transition-all duration-500 overflow-hidden relative"
                >
                  {/* Accent bar */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>

                  {/* Doctor Image */}
                  <div className="h-52 sm:h-56 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-5 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-green-600 mb-2">
                      <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                      <p>Available</p>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">{item.speciality}</p>
                    <button className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm px-6 py-2 rounded-full hover:from-blue-600 hover:to-blue-700 shadow-md transition-all duration-300">
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-20 text-lg">
              No doctors available for this speciality right now.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Doctors;


