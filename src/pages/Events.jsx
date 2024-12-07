import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsForParticipant } from '../redux/slices/EventSlice';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const Events = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const { events, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getEventsForParticipant());
  }, [dispatch]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
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
    <div className=" min-h-screen">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Registered Events</h1>
        <div className="flex justify-centert mb-10">
      <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full  px-4 py-2 border rounded-lg shadow-sm"
        />
      
      </div>
        {filteredEvents && filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
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
                
               </div>
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
