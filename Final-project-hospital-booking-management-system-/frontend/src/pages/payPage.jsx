import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PayPage = () => {
  const { appointmentId } = useParams(); // Pass appointmentId via URL
  const navigate = useNavigate();
  const {
    token,
    backendUrl,
    paypalClientId,
    createPaypalOrder,
    capturePaypalOrder,
  } = useContext(AppContext);

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch appointment details
  const fetchAppointment = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        const app = data.appointments.find((a) => a._id === appointmentId);
        setAppointment(app);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch appointment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, [appointmentId]);

  if (loading)
    return <div className="text-center mt-20 text-gray-600">Loading...</div>;

  if (!appointment)
    return <div className="text-center mt-20 text-red-600">Appointment not found</div>;

  return (
    <div className="max-w-3xl mx-auto my-10 p-5 bg-white rounded-xl shadow-md">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-5 text-center">
        Pay for Appointment
      </h2>
      <p className="text-gray-700 mb-2">
        Doctor: {appointment.docData?.name || "N/A"}
      </p>
      <p className="text-gray-700 mb-2">
        Date & Time: {appointment.slotDate} | {appointment.slotTime}
      </p>
      <p className="text-gray-700 mb-5">
        Amount: ₹{appointment.amount || 0}
      </p>

      <PayPalScriptProvider
        options={{
          "client-id": paypalClientId,
          currency: "USD",
        }}
      >
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={async (data, actions) => {
            const orderID = await createPaypalOrder(appointmentId);
            if (!orderID) throw new Error("Failed to create order");
            return orderID;
          }}
          onApprove={async (data, actions) => {
            const result = await capturePaypalOrder(data.orderID, appointmentId);
            if (result && result.success) {
              toast.success("Payment successful!");
              navigate("/my-appointments"); // Redirect after payment
            } else {
              toast.error("Payment failed or already processed.");
            }
          }}
          onError={(err) => {
            console.error("PayPal Button Error:", err);
            toast.error("Payment error occurred.");
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPage;
