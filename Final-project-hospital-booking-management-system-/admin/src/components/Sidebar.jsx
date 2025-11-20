import React, { useContext } from 'react';
import { AdminContext } from '../context/adminContext';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  if (!aToken) return null;

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-2 p-3 rounded-lg transition-colors duration-200 ${
      isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-200'
    }`;

  return (
    <aside className="w-64 bg-gray-100 min-h-screen p-4">
      <ul className="flex flex-col gap-4">
        <NavLink to="/admin/dashboard" className={linkClasses}>
          <img src={assets.home_icon} alt="Dashboard" className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/appointments" className={linkClasses}>
          <img src={assets.appointment_icon} alt="Appointments" className="w-5 h-5" />
          <span>Appointments</span>
        </NavLink>

        <NavLink to="/admin/add-doctor" className={linkClasses}>
          <img src={assets.add_icon} alt="Add Doctor" className="w-5 h-5" />
          <span>Add Doctor</span>
        </NavLink>

        <NavLink to="/admin/doctors-list" className={linkClasses}>
          <img src={assets.people_icon} alt="Doctors List" className="w-5 h-5" />
          <span>Doctors List</span>
        </NavLink>
      </ul>
    </aside>
  );
};

export default Sidebar;

