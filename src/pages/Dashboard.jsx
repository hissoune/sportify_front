import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded text-sm hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4">Welcome, {user?.email}!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-xl font-semibold">Section 1</h3>
            <p className="text-gray-600 mt-2">Details about Section 1...</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-xl font-semibold">Section 2</h3>
            <p className="text-gray-600 mt-2">Details about Section 2...</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-xl font-semibold">Section 3</h3>
            <p className="text-gray-600 mt-2">Details about Section 3...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
