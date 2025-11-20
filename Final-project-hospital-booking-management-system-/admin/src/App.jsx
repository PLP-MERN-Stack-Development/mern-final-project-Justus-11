import React, { useEffect, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { AdminContext } from './context/adminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import Login from './pages/Login';

const App = () => {
  const { aToken, getAllDoctors } = useContext(AdminContext);

  // Fetch doctors after login automatically
  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  if (!aToken) {
    return (
      <>
        <Login />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="bg-[#F8F9FD] min-h-screen flex flex-col">
      <ToastContainer />
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/appointments" element={<AllAppointments />} />
            <Route path="/admin/add-doctor" element={<AddDoctor />} />
            <Route path="/admin/doctors-list" element={<DoctorsList />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
