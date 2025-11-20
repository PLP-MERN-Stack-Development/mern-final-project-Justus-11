import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const RelatedDoctors = ({ currentDocId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  // Memoized filtering for performance: Filters doctors by speciality and excludes the currently viewed doctor.
  const related = useMemo(
    () =>
      doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== currentDocId
      ),
    [doctors, speciality, currentDocId]
  );

  const handleDocClick = (docId) => {
    navigate(`/appointment/${docId}`);
    // Scroll to the top for a smooth transition experience
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Related Doctors
      </h2>
      
      {related.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {related.map((doc) => {
            const isAvailable = doc.available === true;
            const statusColor = isAvailable ? "text-green-600" : "text-red-500";
            const dotColor = isAvailable ? "bg-green-500" : "bg-red-500";
            const statusText = isAvailable ? "Available" : "Unavailable";

            return (
              <div
                key={doc._id}
                onClick={() => handleDocClick(doc._id)}
                className="bg-white border border-gray-100 rounded-3xl shadow-lg hover:shadow-2xl cursor-pointer transform hover:-translate-y-2 transition-all duration-500 overflow-hidden relative"
              >
                {/* Accent bar */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>

                {/* Doctor Image */}
                <div className="h-48 w-full overflow-hidden rounded-t-3xl">
                  <img
                    src={doc.image || "/default-doctor.png"}
                    alt={`Profile of Dr. ${doc.name}`}
                    className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="p-5 text-center">
                  <div
                    className={`flex items-center justify-center gap-2 text-sm mb-2 ${statusColor}`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`}></span>
                    <p>{statusText}</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{doc.name}</p>
                  <p className="text-sm text-gray-500">{doc.speciality}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click when the button is pressed
                      handleDocClick(doc._id);
                    }}
                    aria-label={`View profile of Dr. ${doc.name}`}
                    className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm px-6 py-2 rounded-full hover:from-blue-600 hover:to-blue-700 shadow-md transition-all duration-300"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8 text-lg">
          No related doctors found for this speciality.
        </p>
      )}
    </div>
  );
};

export default RelatedDoctors;