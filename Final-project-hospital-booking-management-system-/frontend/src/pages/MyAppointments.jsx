import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user appointments
  const getUserAppointments = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setAppointments(data.appointments || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserAppointments();
  }, [token]);

  // Cancel appointment
  const handleCancelAppointment = async (appointmentId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );
    if (!confirmCancel) return;

    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/user/appointments/${appointmentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Appointment canceled successfully.");
        setAppointments((prev) =>
          prev.map((app) =>
            app._id === appointmentId ? { ...app, status: "Cancelled" } : app
          )
        );
      } else {
        toast.error(data.message || "Failed to cancel appointment.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error canceling appointment.");
    }
  };

  if (loading)
    return <div className="text-center mt-20 text-gray-600">Loading...</div>;

  return (
    <div className="my-10 px-4 md:px-10">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        My Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          You have no appointments.
        </p>
      ) : (
        <div className="space-y-6">
          {appointments.map((item) => {
            const doctor = item.docData || {};
            return (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 border border-gray-200 rounded-2xl shadow-sm p-5 bg-white hover:shadow-md transition"
              >
                {/* Doctor image */}
                <div className="flex-shrink-0">
                  <img
                    src={doctor.image || "/default-doctor.png"}
                    alt={doctor.name || "Doctor"}
                    className="w-28 h-28 object-cover rounded-xl border"
                  />
                </div>

                {/* Appointment info */}
                <div className="flex-1 text-gray-700">
                  <p className="text-lg font-semibold">{doctor.name || "N/A"}</p>
                  <p className="text-sm text-blue-500 font-medium">
                    {doctor.speciality || "N/A"}
                  </p>
                  <p className="mt-2 text-sm">
                    <span className="font-medium text-gray-800">Date & Time:</span>{" "}
                    {item.slotDate || "N/A"} | {item.slotTime || "N/A"}
                  </p>
                  <p className="mt-2 text-sm">
                    <span className="font-medium text-gray-800">Status:</span>{" "}
                    {item.status || "Booked"}
                  </p>
                  <p className="mt-2 text-sm">
                    <span className="font-medium text-gray-800">Amount:</span>{" "}
                    ₹{item.amount || 0}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {item.status !== "Cancelled" && (
                    <>
                      {/* PAY ONLINE BUTTON */}
                      <button
                        onClick={() => navigate(`/pay/${item._id}`)}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Pay Online
                      </button>

                      {/* CANCEL BUTTON */}
                      <button
                        onClick={() => handleCancelAppointment(item._id)}
                        className="px-5 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition"
                      >
                        Cancel Appointment
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
