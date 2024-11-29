import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents, createEvent, updateEvent } from "../redux/slices/EventSlice";
import EventModal from "../components/EventModal";

const EventPage = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);

  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const handleOpenModal = (event = null) => {
    setCurrentEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentEvent(null);
  };

  const handleModalSubmit = (eventData) => {
    if (currentEvent) {
        
        dispatch(updateEvent({ id: currentEvent._id, formData: eventData }))
        .unwrap()
        .then(() => {
          dispatch(getAllEvents()); 
        })
        .catch((err) => {
          console.error("Failed to update event:", err);
        });
    } else {
      dispatch(createEvent(eventData))
        .unwrap()
        .then(() => {
          dispatch(getAllEvents());
        })
        .catch((err) => {
          console.error("Failed to create event:", err);
        });
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    console.log("Deleting event:", id);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
        {events?.map((event) => (
          <div
            key={event._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={event.imagePath}
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
                <strong>Members:</strong> {event.participants.join(", ")}
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

      <EventModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleModalSubmit}
        currentEvent={currentEvent}
      />
    </div>
  );
};

export default EventPage;
