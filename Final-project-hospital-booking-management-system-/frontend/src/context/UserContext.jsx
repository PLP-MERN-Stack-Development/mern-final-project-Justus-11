import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Make sure this is set in .env
  const [patient, setPatient] = useState(null);

  // REGISTER
  const registerPatient = async (data) => {
    try {
      const res = await axios.post(`${backendUrl}/api/patient/register`, data);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // LOGIN
  const loginPatient = async (data) => {
    try {
      const res = await axios.post(`${backendUrl}/api/patient/login`, data);
      setPatient(res.data.patient);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <UserContext.Provider value={{ patient, registerPatient, loginPatient }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
