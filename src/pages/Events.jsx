import React from 'react';
import { useSelector } from 'react-redux';

const Events = () => {
  const registeredEvents =[]; 

  return (
    <div className=" min-h-screen">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Registered Events</h1>
        {registeredEvents && registeredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {registeredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
                <p className="text-gray-600 mt-2">{event.date}</p>
                <p className="text-gray-500 text-sm mt-2">{event.description}</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700">You haven't registered for any events yet.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
