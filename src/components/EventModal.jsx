import React, { useState, useEffect } from "react";

const EventModal = ({ isOpen, onClose, onSubmit, currentEvent }) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    participants: "",
    image: null,
  });

  useEffect(() => {
    if (currentEvent) {
      setFormData({
        name: currentEvent.name || "",
        date: currentEvent.date
          ? new Date(currentEvent.date).toISOString().split("T")[0] 
          : "",
        location: currentEvent.location || "",
        participants: currentEvent.participants.join(", ") || "",
        image: null,
      });
    } else {
      setFormData({
        name: "",
        date: "",
        location: "",
        participants: "",
        image: null,
      });
    }
  }, [currentEvent]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      participants: formData.participants.split(",").map((p) => p.trim()),
    };
    onSubmit(formattedData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">
          {currentEvent ? "Update Event" : "Create Event"}
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-semibold">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-semibold">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="participants" className="block text-sm font-semibold">
              Members (comma-separated)
            </label>
            <input
              type="text"
              name="participants"
              value={formData.participants}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-semibold">
              Image URL
            </label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              {currentEvent ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
