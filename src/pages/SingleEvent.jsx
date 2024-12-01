import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa'; 

const SingleEvent = () => {
  const { state } = useLocation();
  const { event } = state || {}; 

  if (!event) {
    return <div>Event not found</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
    });
  };

  const handleRemoveParticipant = (participantId,eventId) => {
    console.log("Removing participant with id:", participantId);
    console.log("Removing event with id:", eventId);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
        <img
          src={event.imagePath}
          alt={event.name}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h1 className="text-3xl font-bold text-center mb-6">{event.name}</h1>
        </div>
        <div className="p-4">
          <p className="text-gray-600 mb-1">
            <strong>Date:</strong> {formatDate(event.date)}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Location:</strong> {event.location}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Members: </strong> {event.participants.length}
          </p>
          <p className="text-gray-600">{event.description}</p>

          <h2 className="text-2xl font-semibold mb-4 mt-6">Participants</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {event.participants.map((participant) => (
                  <tr key={participant._id} className="border-b">
                    <td className="px-4 py-2">{participant.name}</td>
                    <td className="px-4 py-2">{participant.email}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleRemoveParticipant(participant._id ,event._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEvent;
