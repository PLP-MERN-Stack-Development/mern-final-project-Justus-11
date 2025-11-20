import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/adminContext"; // make sure this path is correct

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) getAllDoctors();
  }, [aToken]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">All Doctors</h1>

      <div className="space-y-4">
        {doctors.map((item) => (
          <div
            key={item?._id}
            className="flex items-center gap-5 p-4 rounded-xl bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={item?.image || "/placeholder.png"}
              alt={item?.name || "Doctor"}
              className="w-20 h-20 object-cover rounded-xl border"
            />
            <div className="flex-1">
              <p className="text-lg font-semibold text-gray-800">{item?.name || "No Name"}</p>
              <p className="text-sm text-gray-600">{item?.speciality || "No Speciality"}</p>
            </div>

            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!item?.available}
                  onChange={() => changeAvailability(item?._id)}
                  className="sr-only"
                />
                <div
                  className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                    item?.available ? "bg-blue-500" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    item?.available ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </label>
              <p className="text-sm">{item?.available ? "Available" : "Unavailable"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
