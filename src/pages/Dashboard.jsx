import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/AuthSlice";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 p-6"> {/*  ml-64 ensures content is not hidden under the sidebar */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
