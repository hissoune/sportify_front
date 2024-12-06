import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUsers, FaCalendarAlt, FaTachometerAlt } from "react-icons/fa"; // Example icons
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/AuthSlice";

const Sidebar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
      };
  return (
    <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white shadow-lg transition-transform transform ease-in-out duration-300">
      <div className="flex items-center justify-center p-6 border-b border-blue-800">
        <h2 className="text-2xl font-extrabold">Dashboard</h2>
      </div>

      <nav className="mt-6">
        <ul className="space-y-4 px-4">
        <li>
            <Link to="/dashboard" className="flex items-center px-4 py-3 text-lg rounded-lg hover:bg-gradient-to-l from-violet-600 to-violet-400 transition-colors">
              <FaTachometerAlt className="mr-3 text-xl" />
              Dasboard
            </Link>
          </li>
          <li>
            <Link to="/dashboard/users" className="flex items-center px-4 py-3 text-lg rounded-lg hover:bg-gradient-to-l from-violet-600 to-violet-400  transition-colors">
              <FaUsers className="mr-3 text-xl" />
              Users
            </Link>
          </li>
          <li>
            <Link to="/dashboard/events" className="flex items-center px-4 py-3 text-lg rounded-lg hover:bg-gradient-to-l from-violet-600 to-violet-400  transition-colors">
              <FaCalendarAlt className="mr-3 text-xl" />
              Events
            </Link>
          </li>
         
          <li>
            <button
             onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-lg text-left rounded-lg hover:bg-gradient-to-l from-violet-600 to-violet-400  transition-colors">
              <span className="mr-3 text-xl">🔒</span>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
