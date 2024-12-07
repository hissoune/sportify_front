import React from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/AuthSlice'; 

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
      };

  return (
    <nav className=" bg-gray-800 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className='w-96'>
            <h1 className="text-3xl font-extrabold text-white">
         <img src="/2bed3446db10b86af56e902479b3a9df-removebg-preview.png" alt="" />
      </h1>
        </div>
        
        <ul className="flex space-x-8">
          <li>
            <Link
              to="/home"
              className="text-xl font-semibold hover:text-blue-200 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/home/events"
              className="text-xl font-semibold hover:text-blue-200 transition duration-300"
            >
              My Events
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="text-xl font-semibold hover:text-blue-200 transition duration-300"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
