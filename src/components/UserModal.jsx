import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createParticipant } from "../redux/slices/ParticipantsSlice";
import Swal from "sweetalert2";

const UserModal = ({ currentUser, closeModal }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();

  // Prefill form if editing an existing user
  useEffect(() => {
    if (currentUser) {
      setForm({
        name: currentUser.name || "",
        email: currentUser.email || "",
        password: "", // Keep password empty for security
      });
      setErrors({ name: "", email: "", password: "" });
    }
  }, [currentUser]);

  // Validation functions
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validatePassword = (value) =>
    value.length >= 6 ? "" : "Password must be at least 6 characters.";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  console.log(form)
    // Check if there are no errors
    if (!errors.name && !errors.email && !errors.password) {
      const actionPayload = { ...form }; 
      console.log(actionPayload);
      
      const action = createParticipant(actionPayload);
      const result = await dispatch(action);
  
      if (createParticipant.fulfilled.match(result)) {
        Swal.fire({
          title: currentUser ? "User Updated!" : "User Created!",
          text: currentUser
            ? `${form.name}'s information has been updated.`
            : `User ${form.name} has been successfully created.`,
          icon: "success",
          confirmButtonText: "Close",
        }).then(() => {
          closeModal(); 
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">
          {currentUser ? "Update User" : "Add User"}
        </h2>
        <form onSubmit={handleSubmit} >
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold">
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
            <label htmlFor="email" className="block text-sm font-semibold">
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
            <label htmlFor="password" className="block text-sm font-semibold">
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
              required={!currentUser} // Password required only for new users
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              disabled={errors.name || errors.email || errors.password}
            >
              {currentUser ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;