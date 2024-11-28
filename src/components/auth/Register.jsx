import React, { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.name && !errors.email && !errors.password) {
      console.log("Registering with", form);
      // Add your registration logic here
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-500 to-indigo-800">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Create an Account
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
          <button
            type="submit"
            className="w-full py-2 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300"
            disabled={errors.name || errors.email || errors.password}
          >
            Register
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
