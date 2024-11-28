import React from 'react';
import { useSelector } from 'react-redux'; 
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const user = useSelector((state) => state.auth.user); 

  return (
    <div >
      <div className=" bg-gradient-to-t from-slate-400 to-slate-200">
        <Navbar/>      
        <div className="">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Home;
