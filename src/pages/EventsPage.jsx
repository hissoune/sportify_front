import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const EventPage = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "React Workshop",
      date: "2024-06-20",
      location: "San Francisco",
      members: ["Alice", "Bob", "Charlie"],
      image: "https://www.eventbookings.com/wp-content/uploads/2024/01/Different-Types-of-Events-in-2024-Which-is-Right-for-You-2048x1365.jpg", // Placeholder image
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const handleOpenModal = (event = null) => {
    setCurrentEvent(event);
    setShowModal(true);
  };

  const handleSubmit = (eventData) => {
    if (currentEvent) {
      setEvents(events.map((e) => (e.id === currentEvent.id ? eventData : e)));
    } else {
      setEvents([...events, { ...eventData, id: events.length + 1 }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Event Management</h1>
      
      <button
        onClick={() => handleOpenModal()}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-6 hover:bg-blue-700"
      >
        Create Event
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
              <p className="text-gray-600 mb-1">
                <strong>Date:</strong> {event.date}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Location:</strong> {event.location}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Members:</strong> {event.members.join(", ")}
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleOpenModal(event)}
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">
              {currentEvent ? "Update Event" : "Create Event"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newEvent = {
                  name: formData.get("name"),
                  date: formData.get("date"),
                  location: formData.get("location"),
                  members: formData.get("members").split(","),
                  image: formData.get("image"),
                };
                handleSubmit(newEvent);
              }}
            >
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={currentEvent?.name || ""}
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
                  defaultValue={currentEvent?.date || ""}
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
                  defaultValue={currentEvent?.location || ""}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="members" className="block text-sm font-semibold">
                  Members (comma-separated)
                </label>
                <input
                  type="text"
                  name="members"
                  defaultValue={currentEvent?.members?.join(", ") || ""}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-semibold">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  defaultValue={currentEvent?.image || ""}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
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
      )}
    </div>
  );
};

export default EventPage;
