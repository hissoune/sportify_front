import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (user?.role == 'organizer') {
      
      navigate("/dashboard");
    }else if (user?.role == 'participant'){
      navigate("/home");
    }else {
      navigate("/");
    }
  }, [user, navigate]);

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors({
      ...errors,
      email: validateEmail(value) ? "" : "Enter a valid email address.",
    });
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors({
      ...errors,
      password: value.length >= 6 ? "" : "Password must be at least 6 characters.",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.email && !errors.password) {
      dispatch(login({ email, password }));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-500 to-gray-800">
      <div className="w-full max-w-md bg-gray-300 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
         <img src="/2bed3446db10b86af56e902479b3a9df-removebg-preview.png" alt="" />
        </h2>
        {error && (
          <p className="text-center text-red-500 mb-4">
            {error.message || "Login failed!"}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
              value={email}
              onChange={handleEmailChange}
              required
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full py-2 text-lg font-semibold text-white rounded-lg hover:shadow-lg transition duration-300 ${
              isLoading || !email || !password || errors.email || errors.password
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            }`}
            disabled={isLoading || !email || !password || errors.email || errors.password}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline hover:text-blue-600">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
