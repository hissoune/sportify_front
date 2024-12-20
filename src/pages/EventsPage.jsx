import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents, createEvent, updateEvent, deleteEvent } from "../redux/slices/EventSlice";
import EventModal from "../components/EventModal";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
const EventPage = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const handleOpenModal = (event = null) => {
    setCurrentEvent(event);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentEvent(null);
  };
  const handleNavigateToSinglePage = (oneevent) => {
    navigate('/dashboard/single-event', { state: { oneevent } });
  };
  const handleModalSubmit = (eventData) => {
    console.log("handeled data", eventData);

    if (currentEvent) {
      dispatch(updateEvent({ id: currentEvent._id, formData: eventData }))
        .unwrap()
        .then(() => {
          dispatch(getAllEvents());
          Swal.fire(
            'Updated!',
            'Your event has been updated successfully.',
            'success'
          );
        })
        .catch((err) => {
          console.error("Failed to update event:", err);
          Swal.fire(
            'Error!',
            'There was an issue updating the event.',
            'error'
          );
        });
    } else {
      dispatch(createEvent(eventData))
        .unwrap()
        .then(() => {
          dispatch(getAllEvents());
          Swal.fire(
            'Created!',
            'Your event has been created successfully.',
            'success'
          );
        })
        .catch((err) => {
          console.error("Failed to create event:", err);
          Swal.fire(
            'Error!',
            'There was an issue creating the event.',
            'error'
          );
        });
    }
    handleCloseModal();
  };


  const handleDelete = (id) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "This event will be deleted permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteEvent(id))
          .unwrap()
          .then(() => {
            dispatch(getAllEvents());
            Swal.fire(
              'Deleted!',
              'Your event has been deleted.',
              'success'
            );
          })
          .catch((err) => {
            console.error("Failed to delete event:", err);
            Swal.fire(
              'Error!',
              'There was an issue deleting the event.',
              'error'
            );
          });
      }
    });
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Event Management</h1>
      <div className="flex justify-between mb-6">
      <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm"
        />
        <button
          onClick={() => handleOpenModal()}
          className="ml-4 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transform transition-all hover:scale-105 cursor-pointer"
        >
          Create Event
        </button>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents?.map((event) => (
          <div
            key={event._id}
            className="bg-gray-200 shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 cursor-pointer"
          >
            <img
              src={event.imagePath}
              alt={event.name}
              className="w-full h-40 object-cover"
              onClick={() => handleNavigateToSinglePage(event)}

            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
              <p className="text-gray-600 mb-1">
                <strong>Date:</strong> {formatDate(event.date)}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Location:</strong> {event.location}
              </p>
              <p className="text-gray-600 mb-4">

                <strong>Members: </strong> {event.participants.length}
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleOpenModal(event)}
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
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
