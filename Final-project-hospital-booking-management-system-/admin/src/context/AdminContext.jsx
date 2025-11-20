import { useState, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch all doctors
  const getAllDoctors = async (token = aToken) => {
    if (!token) return;

    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/all-doctors`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setDoctors(data.doctors || []);
      } else {
        if (data.message === "Token Invalid or Expired") {
          setAToken("");
          localStorage.removeItem("aToken");
          toast.error("Session expired. Please log in again.");
        } else {
          toast.error(data.message || "Failed to fetch doctors");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // Toggle doctor availability
  const changeAvailability = async (doctorId) => {
    if (!aToken) {
      toast.error("Not authorized. Please log in.");
      return;
    }

    if (!doctorId) {
      toast.error("Invalid doctor ID");
      return;
    }

    try {
      // Optimistic UI update
      setDoctors((prev) =>
        prev.map((doc) =>
          doc._id === doctorId ? { ...doc, available: !doc.available } : doc
        )
      );

      const { data } = await axios.post(
        `${backendUrl}/api/admin/change-availability`,
        { docId: doctorId },
        { headers: { Authorization: `Bearer ${aToken}` } }
      );

      if (!data.success) {
        toast.error(data.message || "Failed to update availability");

        // Revert UI if backend fails
        setDoctors((prev) =>
          prev.map((doc) =>
            doc._id === doctorId ? { ...doc, available: !doc.available } : doc
          )
        );
      }
    } catch (error) {
      console.error("Error changing availability:", error.response || error);
      toast.error(error.response?.data?.message || "Something went wrong");

      // Revert UI
      setDoctors((prev) =>
        prev.map((doc) =>
          doc._id === doctorId ? { ...doc, available: !doc.available } : doc
        )
      );
    }
  };

  const value = { aToken, setAToken, doctors, getAllDoctors, changeAvailability };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContextProvider;
