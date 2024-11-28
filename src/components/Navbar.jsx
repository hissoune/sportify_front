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
    <nav className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-white">Event App</h1>
        <ul className="flex space-x-8">
          <li>
            <Link
              to="/home"
              className="text-lg font-semibold hover:text-blue-200 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/home/events"
              className="text-lg font-semibold hover:text-blue-200 transition duration-300"
            >
              My Events
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="text-lg font-semibold hover:text-blue-200 transition duration-300"
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
