import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/slices/AuthSlice";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useNavigate } from "react-router-dom"; // For navigation

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    role: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state) => state.auth);

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validatePassword = (value) =>
    value.length >= 6 ? "" : "Password must be at least 6 characters.";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    switch (name) {
      case "email":
        setErrors({
          ...errors,
          email: validateEmail(value) ? "" : "Enter a valid email address.",
        });
        break;
      case "password":
        setErrors({ ...errors, password: validatePassword(value) });
        break;
      case "name":
        setErrors({
          ...errors,
          name: value ? "" : "Name cannot be empty.",
        });
        break;
      default:
        break;
    }
  };

  const handleSelectChange = (e) => {
    setForm({ ...form, gender: e.target.value });
  };

  const handleRoleSelectChange = (e) => {
    setForm({ ...form, role: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!errors.name && !errors.email && !errors.password) {
      const result = await dispatch(register(form));
      if (register.fulfilled.match(result)) {
        Swal.fire({
          title: `Hi, ${form.name}!`,
          text: "Your registration is successful. Click below to login.",
          icon: "success",
          confirmButtonText: "Go to Login",
        }).then(() => {
          navigate("/");
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-500 to-gray-800">
      <div className="w-full max-w-md bg-gray-300 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          <img
            src="/2bed3446db10b86af56e902479b3a9df-removebg-preview.png"
            alt=""
          />
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className={`w-full px-4 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
              value={form.name}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
              value={form.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
              value={form.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Gender
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleSelectChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="man">Man</option>
              <option value="woman">Woman</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              what role you want ??
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleRoleSelectChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="" disabled>
                Select role
              </option>
              <option value="participant">participant</option>
              <option value="organizer">organizer</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-semibold">
              Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-lg font-semibold text-white bg-gray-800 rounded-lg hover:shadow-lgtransition duration-300  hover:bg-gray-900 transform transition-all hover:scale-105 cursor-pointer"
            disabled={errors.name || errors.email || errors.password || isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/"
            className="text-blue-500 hover:underline hover:text-blue-600"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
