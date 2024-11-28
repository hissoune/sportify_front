import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/AuthSlice";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {



  return (
    <div className="flex min-h-screen bg-gradient-to-t from-slate-400 to-slate-200">
    
      <Sidebar />

     
      <div className="flex-1 ml-64 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
