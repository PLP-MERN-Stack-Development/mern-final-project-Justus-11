import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast, ToastContainer } from "react-toastify";
import RelatedDoctors from "../components/RelatedDoctors";
import "react-toastify/dist/ReactToastify.css";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors = [], backendUrl, patient, bookAppointment } = useContext(AppContext);
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  // Fetch doctor info
  const fetchDocInfo = async () => {
    setLoading(true);
    try {
      let doctor = Array.isArray(doctors) ? doctors.find(d => d._id === docId) : null;

      if (!doctor) {
        const res = await fetch(`${backendUrl}/api/doctor/${docId}`);
        if (!res.ok) throw new Error("Doctor not found");
        const data = await res.json();
        doctor = data.doctor;
      }

      setDocInfo(doctor);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load doctor info.");
    } finally {
      setLoading(false);
    }
  };

  // Generate available slots (10AM to 5PM)
  const getAvailableSlots = () => {
    if (!docInfo) return;
    const slots = [];
    const today = new Date();
    const bookedSlots = docInfo.slots_booked || {};

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const dateString = date.toDateString();
      const bookedTimes = bookedSlots[dateString] || [];

      const allTimes = [];
      for (let hour = 10; hour <= 17; hour++) {
        allTimes.push(`${hour.toString().padStart(2, "0")}:00`);
        allTimes.push(`${hour.toString().padStart(2, "0")}:30`);
      }

      const availableTimes = allTimes.filter(t => !bookedTimes.includes(t));
      slots.push({ date: dateString, times: availableTimes });
    }

    setDocSlots(slots);

    // Clear selected time if it's no longer available
    if (!slots[selectedDayIndex]?.times.includes(selectedTime)) {
      setSelectedTime("");
    }
  };

  // Handle booking
  const handleBooking = async () => {
    if (!patient) {
      toast.warning("Please login to book an appointment.");
      navigate("/login");
      return;
    }

    if (!selectedTime) {
      toast.error("Select a time slot.");
      return;
    }

    setBooking(true);

    try {
      const result = await bookAppointment({
        userId: patient.id,
        docId,
        slotDate: docSlots[selectedDayIndex].date,
        slotTime: selectedTime,
      });

      if (result.success) {
        toast.success(result.message || "Appointment booked successfully!");

        // Remove booked slot locally so it can't be double-booked
        setDocSlots(prev => {
          const newSlots = [...prev];
          const day = newSlots[selectedDayIndex];
          day.times = day.times.filter(t => t !== selectedTime);
          return newSlots;
        });

        setSelectedTime("");
        fetchDocInfo();
        navigate("/my-appointments");
      } else {
        toast.error(result.message || "Doctor not available.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error during booking.");
    } finally {
      setBooking(false);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!docInfo) return <div className="text-center mt-20">Doctor not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-white py-10 px-4 md:px-10">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center mb-8">{docInfo.name}</h1>

      {/* Doctor info */}
      <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
        <img
          src={docInfo.image || "/default-doctor.png"}
          alt={docInfo.name}
          className="w-64 h-64 md:w-72 md:h-72 rounded-2xl shadow-md border object-cover"
        />
        <div>
          <p><strong>Speciality:</strong> {docInfo.speciality}</p>
          <p><strong>Experience:</strong> {docInfo.experience}</p>
          <p><strong>Fees:</strong> ₹{docInfo.fees}</p>
          <p className="mt-2">{docInfo.about}</p>
        </div>
      </div>

      {/* Slots */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Select a Day</h2>
        <div className="flex gap-2 overflow-x-auto">
          {Array.isArray(docSlots) &&
            docSlots.map((day, idx) => (
              <button
                key={idx}
                onClick={() => { setSelectedDayIndex(idx); setSelectedTime(""); }}
                disabled={day.times.length === 0}
                className={`px-3 py-2 rounded-lg border ${
                  selectedDayIndex === idx ? "bg-blue-600 text-white" : "bg-white"
                } ${day.times.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {day.date.split(" ").slice(0, 3).join(" ")}
              </button>
            ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Select a Time</h2>
        <div className="flex flex-wrap gap-2">
          {Array.isArray(docSlots[selectedDayIndex]?.times) &&
            docSlots[selectedDayIndex].times.map((time, i) => (
              <button
                key={i}
                onClick={() => setSelectedTime(time)}
                disabled={booking}
                className={`px-3 py-2 rounded-lg border ${
                  selectedTime === time ? "bg-blue-600 text-white" : "bg-white"
                } ${booking ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {time}
              </button>
            ))}
        </div>
      </div>

      {selectedTime && (
        <div className="text-center mt-4">
          <button
            onClick={handleBooking}
            disabled={booking}
            className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {booking ? "Booking..." : `Confirm ${selectedTime}`}
          </button>
        </div>
      )}

      <div className="mt-10">
        <RelatedDoctors currentDocId={docId} speciality={docInfo.speciality} />
      </div>
    </div>
  );
};

export default Appointment;
